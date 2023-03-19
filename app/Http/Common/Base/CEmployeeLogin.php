<?php

namespace App\Http\Common\Base;

use App\Http\Common\JsonMessage;
use App\Http\Role\REmployee;
use App\Http\Tool\Tool1;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use ParagonIE\EasyRSA\EasyRSA;
use ParagonIE\EasyRSA\KeyPair;
use ParagonIE\EasyRSA\PrivateKey;
use ParagonIE\EasyRSA\PublicKey;

class CEmployeeLogin
{
   static $sourcetype=[
       'api'=>1,
       'web'=>2,
       'android'=>3,
       'ios'=>4
   ];





   static function testloginuser($userid){
       //
       $where=[
           ['a'=>'where',
               'arr'=>
                   [
                       ['_uuid','=',$userid]
                   ]
           ]
       ];
       $employees= Config::getconn()->sample_get(Config::$db_erp_employees,['_uuid','name','company_id'],$where);

       if(count($employees)==0){
           return JsonMessage::Creat(false,'用户不存在');
       }

       return static::login($employees[0]);

   }

   static public function getKey($username){


       $cachename='key'.request()->ip().Tool1::getplatform().$username;
       $key= Cache::get($cachename);

       if(empty($key)) {

           $keyPair = KeyPair::generateKeyPair();
           $secretKey = $keyPair->getPrivateKey();
           $publicKey = $keyPair->getPublicKey();

           Cache::put($cachename,
               [
                   'public' => $publicKey->getKey(),
                   'secret' => $secretKey->getKey()
               ],
               3600 * 7
           );

           $key = Cache::get($cachename);

       }
       return $key;
   }

   static public function getPublicKey($username){
       //return $key;
       return base64_encode(static::getKey($username)['public']);
   }


    static public function authPasswordLogin($userName,$password){


        $secretKey=static::getKey($userName)['secret'];
        //$publicKey=static::getKey($userName)['public'];
        openssl_private_decrypt(base64_decode($password), $decrypted, $secretKey);
        $password= $decrypted;
//
//        $message = "test";
//        /** @var \ParagonIE\EasyRSA\PublicKey $publicKey */
//        /** @var \ParagonIE\EasyRSA\PrivateKey $secretKey */
//
//        $ciphertext = EasyRSA::encrypt($message, new PublicKey($publicKey));
//
//        return $ciphertext;
//
//        return base64_encode(bin2hex($ciphertext));
//
//
//        $password= EasyRSA::decrypt($password,new PrivateKey($secretKey));
//
//        return $password;
//
//        Log::info($password);


        $companyid=CCompany::getCompanyId();

        $funCallback1=function($query)use($companyid,$password,$userName){
            $query->where('password','=',sha1($password));
            $query->where('company_id','=',$companyid);

            $query->where(function($query)use ($userName) {
                $query->orWhere('username','=',$userName);
                $query->orWhere('jobid','=',$userName);

            });
        };



        $employees= Config::getconn()->sample_get(Config::$db_erp_employees,['_uuid','name','company_id'],[],$funCallback1);


        if(count($employees)==0){
            return JsonMessage::Creat(false,'用户不存在或密码错误');
        }

        return static::login($employees[0]);
    }

    static public function logout(){

        if(env('ApiCors')){
        }else{
            return  Session::flush();
        }

    }

   static public function login($employee){


        ////   userName,
        //    password
//        session()->put('xuzhonda','xuzhonda');
//        dd(session()->all());


       if(env('ApiCors')){
       }else{
           session()->put('companyid',$employee->company_id);

       }
       CCompany::setId($employee->company_id);

       $companyid=$employee->company_id;


       if(env('ApiCors')) {
           $token = static::GetToken(
               $employee->_uuid,
               $companyid,
               static::$sourcetype['api']
           );

           $data=['token'=>$token,'name'=>$employee->name];
       }else{

           //SEmployee::getSessionEmployeeInfo($employees[0]->_uuid);
           session()->put(REmployee::$IdTag,$employee->_uuid);
//           Log::info(session()->all());

           //'employee_id'

           $data=['name'=>$employee->name,'token'=>'user_apicors'];
       }

        static::after_sign_node(
            $employee->_uuid,
            $companyid,
            static::$sourcetype['api']
        );
        return JsonMessage::Creat(true,'登录成功',$data);
    }

   static private function GetToken($uuid,$company_id,$sourcetype){


       $expiretime=time()+604800;
       $token=md5(Config::$tokenkey.$expiretime.$uuid);

       Config::getconn()->sample_insert(Config::$db_erp_employee_tokens,
            [
                'company_id'=>$company_id,
                'userid'=>$uuid,
                'platform'=>Tool1::getplatform(),
                'sourcetype'=>$sourcetype,
                'expire'=>$expiretime,
                'created_at'=>date('Y-m-d H:i:s',time()),
                'accesstoken'=>$token,
                'ip'=>request()->ip()
            ]
        );

        return $token;
    }

   static protected function before_sign_node(){

   }
   static protected function after_sign_node($uuid,$company_id,$sourcetype){


       Config::getconn()->sample_insert(Config::$db_erp_employee_signlists,
           [
               'company_id'=>$company_id,
               'userid'=>$uuid,
               'ip'=>request()->ip(),
               'type'=>$sourcetype,
               'sign_at'=>date('Y-m-d H:i:s',time())
           ]
       );

   }










}
