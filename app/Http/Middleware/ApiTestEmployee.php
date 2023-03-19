<?php

namespace App\Http\Middleware;
use App\Http\Common\Base\CCompany;
use App\Http\Common\JsonMessage;

use App\Http\Common\OaFlow\Config;
use App\Http\Dbctrl2\DBCtrlOBJ;
use App\Http\Role\REmployee;
use Closure;
use Illuminate\Support\Facades\Log;

class ApiTestEmployee
{

    public function handle($request, Closure $next)
    {


        Config::$mongo_flowformtempsaves='test_flowformtempsaves';

        Config::$mongo_flowlists='test_flowlists';
        Config::$mongo_flowlogs='test_flowlogs';
        Config::$mongo_flowsmessagetos='test_flowmessagetos';
        Config::$mongo_flowcancels='test_flowcancels';
        Config::$mongo_flowtimeoutlogs='test_flowtimeoutlogs';
        Config::$isTestMode=true;

        Config::$canSendMessage=false;

        REmployee::$cache_Prefix='em_test_';
        \App\Http\Common\Base\Config::$db_erp_employee_tokens='erp_employee_tokens_test';


        REmployee::$HeaderTokenKey='X-Token-Test';
        REmployee::$postTokenKey='_employeetoken_test';
        REmployee::$CookieTokenKey='Admin-Token-Test';
        REmployee::$IdTag='employee_id_test';




//        Log::info('SEmployee::init');
//        Log::info(SEmployee::init()?'true':'false');
        if(!REmployee::getInstance()->init()){

            return response()->json(JsonMessage::Creat(false,'登录过期'));
        }
        //none

        REmployee::addRoleType('normal');



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
