<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CEmployeeLogin;
use App\Http\Role\REmployee;

class CSimulationTest
{


    public static function login(){

        \App\Http\Common\Base\Config::$db_erp_employee_tokens='erp_employee_tokens_test';
        REmployee::$HeaderTokenKey='X-Token-Test';
        REmployee::$postTokenKey='_employeetoken_test';
        REmployee::$CookieTokenKey='Admin-Token-Test';
        REmployee::$IdTag='employee_id_test';


        $result=CEmployeeLogin::testloginuser(Config::getUser()->id);

        if($result['success']){

            $result['data']['gotourl']='/dingtalkTest/index.html';

            $result['data']['tokenkey']=REmployee::$CookieTokenKey;

        }
        return $result;


    }


}