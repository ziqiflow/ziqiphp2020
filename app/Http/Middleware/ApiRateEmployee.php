<?php


namespace App\Http\Middleware;
use App\Http\Common\Base\CCompany;
use App\Http\Common\JsonMessage;
use App\Http\Dbctrl2\DBCtrlOBJ;
use App\Http\Role\RRateEmployee;
use Closure;

class ApiRateEmployee
{


    public function handle($request, Closure $next)
    {
        //RRateEmployee::getInstance()->test();

        if(!RRateEmployee::getInstance()->init()){

            //RRateEmployee::getInstance()->test();
            return response()->json(JsonMessage::Creat(false,'登录过期'));
        }


        //none


        DBCtrlOBJ::$BeforeInsertArr=['company_id'=>CCompany::getCompanyId()];

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
