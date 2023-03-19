<?php


namespace App\Http\Controllers\Erp;


use App\Http\Dbctrl\DbCtrl;
use App\Http\Dbctrl\Jiami;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class SEmployee
{
    public static $id;
    public static $company_id;
    public static $name;
    public static $jobid;
    //public static $usercls;
    //public static $flag_list;
    public static $isadmin;
    public static $company_flag_str;
    public static $user_flag_str;






    public static function init(){


        $ErpEmployeeInfo=Session::get('ErpEmployeeInfo');

        if(!$ErpEmployeeInfo){
            return false;

        }
        static::$id=$ErpEmployeeInfo->id;
        static::$company_id=$ErpEmployeeInfo->company_id;
        static::$name=$ErpEmployeeInfo->name;
        static::$jobid=$ErpEmployeeInfo->jobid;
        //static::$usercls=$ErpEmployeeInfo->usercls;
        //static::$key=$ErpEmployeeInfo->key;
        Jiami::$key=$ErpEmployeeInfo->key;
        static::$isadmin=($ErpEmployeeInfo->usercls==9);
        static::$company_flag_str=$ErpEmployeeInfo->company_flag_str;
        static::$user_flag_str=$ErpEmployeeInfo->user_flag_str;


        //var_dump($ErpEmployeeInfo->flag_list);



//        $query=DB::connection(DbCtrl::$Dbconfig)->table('erp_sys_permission_lists');
//

//        $getval=$query->select('uriidlist')->whereIn('id',explode('-',$ErpEmployeeInfo->flag_list))->get();
//

//        $str='-';
//        $len=count($getval);
//        foreach($getval as $key=>$item){
//            $str.=$item->uriidlist.'-';
//        }
//        static::$flag_list=$str;

        //var_dump( static::$flag_list);


        return true;
    }

    public static  function requiredRid($routeId){


        if($routeId==null||$routeId=='erp')return true;


        if(static::$company_flag_str=="all"){

            if(static::$isadmin)return true;
            if(strrpos(static::$user_flag_str,'-'.$routeId.'-')!==false){
                return true;
            }else{
               return false;
            }
        }

        if(strrpos(static::$company_flag_str,'-'.$routeId.'-')!==false){

            if(static::$isadmin)return true;
            if(strrpos(static::$user_flag_str,'-'.$routeId.'-')!==false){
                return true;
            }else{
                return false;
            }

        }else{
          return false;
        }





    }


}