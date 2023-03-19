<?php


namespace App\Http\Middleware;

use App\Http\Common\Base\CCompany;
use App\Http\Common\JsonMessage;

use App\Http\Dbctrl2\DBCtrlOBJ;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use App\Http\Role\REmployee;
use Closure;
use Illuminate\Support\Facades\Log;

class ApiEmployee
{

    public function handle($request, Closure $next)
    {


//        Log::info('SEmployee::init');
//        Log::info(SEmployee::init()?'true':'false');
        if(!REmployee::getInstance()->init()){

            return response()->json(JsonMessage::Creat(false,'登录过期'));
        }
        //none

        REmployee::addRoleType('normal');


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
