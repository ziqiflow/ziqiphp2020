<?php


namespace App\Http\Common\DingTalk;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CEmployeeLogin;
use \App\Http\Common\Base\Config as ConfigBase;
use App\Http\Common\JsonMessage;
use EasyDingTalk\Application;
use Illuminate\Support\Facades\Log;
use Psy\Util\Json;

class CDingtalkLogin
{


    public static function QrCodeUrl(){
        $QrCode_appid=Config::$QrCodeOptions['appId'];
        $REDIRECT_URI=Config::getSchemeAndHttpHost().'/dingtalk/loginweb_callback';
//        request()->getSchemeAndHttpHost().'/dingtalk/loginweb_callback';


        return "https://oapi.dingtalk.com/connect/qrconnect?appid=$QrCode_appid&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=$REDIRECT_URI";

    }




    public static function GetUserLoginbyQrCode($code){

        list($usec, $sec) = explode(" ", microtime());
        $timestamp= intval(round($sec*1000+$usec*1000));



        $s = hash_hmac('sha256', $timestamp, Config::$QrCodeOptions['appSecret'], true);
        $signature = base64_encode($s);
        //var_dump($signature);
        $urlencode_signature = urlencode($signature);
        //var_dump($urlencode_signature);
        $data=[
            'tmp_auth_code'=>$code
        ];

        $result=UDingtalk::getuserinfo_bycode(Config::$QrCodeOptions['appId'],$timestamp,$urlencode_signature,$data);

        if($result['errcode']!=0){
            return JsonMessage::Creat(false,$result['errmsg']);
        }

        $userinfo=$result['user_info'];

        $emp= static::getUserInfobyUnionid($userinfo['unionid']);

        if(empty($emp)){
            return JsonMessage::Creat(false,'您的账号未被企业同步，请同步后登录。');
        }
        return CEmployeeLogin::login($emp);
    }

    public static function checkUser($code){
        $app = new Application(Config::$DingTalkOptions);
        try{


            $user= $app->user->getUserInfo($code);
            Log::info($user);

            $userinfo=$app->user->get($user['userid']);
            Log::info($userinfo);

        }catch (\Exception $e){
            return null;

        }
        return $userinfo;
    }



    public static function checkUserLoginIn($code){

        $app = new Application(Config::$DingTalkOptions);

        try{
            $user= $app->user->getUserInfo($code);
            Log::info($user);
            $userinfo=$app->user->get($user['userid']);
            Log::info($userinfo);

        }catch (\Exception $e){

            return JsonMessage::Creat(false,'错误提示：'.$e->getMessage());
        }
        //$unionid=;
        //Log::info($user);
        //array (
        //  'userid' => '046400205224705098',
        //  'sys_level' => 1,
        //  'errmsg' => 'ok',
        //  'is_sys' => true,
        //  'deviceId' => 'a528a4621671fd97f55fc5b605102b44',
        //  'errcode' => 0,
        //)


        $emp= static::getUserInfobyUnionid($userinfo['unionid']);

        if(empty($emp)){
            return JsonMessage::Creat(false,'您的账号未被企业同步，请同步后登录。');
        }
        return CEmployeeLogin::login($emp);
    }

    protected static function getUserInfobyUnionid($unionid){

        $funcallback=function($query)use ($unionid){
            $query->where(ConfigBase::$db_erp_employees.'.company_id',CCompany::getCompanyId());
            $query->leftJoin(
                Config::$db_oa_rl_dingtalk_users,
                Config::$db_oa_rl_dingtalk_users.'._inner_uuid',
                '=',
                ConfigBase::$db_erp_employees.'._uuid');
            $query->where(Config::$db_oa_rl_dingtalk_users.'.unionid',$unionid);
        };

        $emps= Config::getconn()->sample_get(ConfigBase::$db_erp_employees,
            [
                ConfigBase::$db_erp_employees.'._uuid',
                ConfigBase::$db_erp_employees.'.company_id',
                ConfigBase::$db_erp_employees.'.name',
            ],null,$funcallback
        );


        if(count($emps)==0){
            return null;
        }

        return $emps[0];

    }


    public static function getConfig(){

        $nonceStr = 'abcdefg';
        $timeStamp=time();

        $url=Config::getScheme().'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        //self::curPageURL();
        $app = new Application(Config::$DingTalkOptions);


        $signature=$app->jssdk->signature($url,$nonceStr,$timeStamp);
        $config = array(
            'url' => $url,
            'nonceStr' => $nonceStr,
            'agentId' => Config::$AgentId,
            'timeStamp' => $timeStamp,
            'corpId' => Config::$corp_id,
            'signature' => $signature);
        return $config;
    }


}
