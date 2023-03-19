<?php


namespace App\Http\Common\OaFlow\Middleware;

use App\Http\Common\Base\CCompany;
use App\Http\Common\JsonMessage;

use App\Http\Dbctrl2\DBCtrlOBJ;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use App\Http\Role\REmployee;
use Closure;
use Illuminate\Support\Facades\Log;

class ApiReplaceEmployee
{

    static function handerin(){

        REmployee::$cache_Prefix='em_replace_';
        \App\Http\Common\Base\Config::$db_erp_employee_tokens='erp_employee_tokens_replace';
        REmployee::$HeaderTokenKey='X-Token-REEMP';
        REmployee::$postTokenKey='_replaceemployeetoken';
        REmployee::$CookieTokenKey='Admin-Token-REEMP';
        REmployee::$IdTag='employee_id_replace';

    }

    public function handle($request, Closure $next)
    {

        static::handerin();

        if(!REmployee::$RoleIO->requiredFlag('oa.replace_emp')){
            return response()->json(JsonMessage::Creat(false,'没有操作权限'));
        }

        if(!empty(REmployee::$RoleIOReal)){
            REmployee::$RoleIOReal_1=REmployee::$RoleIOReal;
        }
        REmployee::$RoleIOReal=REmployee::$RoleIO;

        REmployee::$RoleIO=null;



//        Log::info('SEmployee::init');
//        Log::info(SEmployee::init()?'true':'false');

        DbCtrlCurdOBJ::$BeforeGet=
        DbCtrlCurdOBJ::$BeforeCount=
        DbCtrlCurdOBJ::$BeforeUpdate=
        DbCtrlCurdOBJ::$BeforeDelete=


        DBCtrlOBJ::$BeforeCount=
        DBCtrlOBJ::$BeforeUpdate=
        DBCtrlOBJ::$BeforeDelete=
        DBCtrlOBJ::$BeforeGet=[];



        if(!REmployee::getInstance()->init()){

            return response()->json(JsonMessage::Creat(false,'登录过期'));
        }
        //none

        REmployee::addRoleType('super_seeother');


//        Log::info(REmployee::$RoleIO2->user_flag_str);
//        Log::info(REmployee::$RoleIO->user_flag_str);

        DbCtrlCurdOBJ::$BeforeGet=
        DbCtrlCurdOBJ::$BeforeCount=
        DbCtrlCurdOBJ::$BeforeUpdate=
        DbCtrlCurdOBJ::$BeforeDelete=


        DBCtrlOBJ::$BeforeCount=
        DBCtrlOBJ::$BeforeUpdate=
        DBCtrlOBJ::$BeforeDelete=
        DBCtrlOBJ::$BeforeGet=[
               ['a'=>'where',
                   'arr'=>
                       [
                           ['company_id','=',CCompany::getCompanyId()]
                       ]
               ]
        ];



        return $next($request);

    }
}
