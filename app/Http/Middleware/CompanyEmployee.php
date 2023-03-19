<?php


namespace App\Http\Middleware;

use App\Http\Common\Base\CCompanySet;
use App\Http\Common\ConfigRoot;
use App\Http\Controllers\Erp\Employee;
use App\Http\Controllers\Erp\SEmployee;
use App\Http\Controllers\Platform\SUser;
use App\Http\Cron\Cron;
use App\Http\Dbctrl\DataSource;
use App\Http\Dbctrl\DbCtrl;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use App\Http\Dbctrl3\DBCtrlOBJ;
use App\Http\Role\REmployee;
use Closure;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class CompanyEmployee
{

    public function defaultLoginUrl(){
        if(
        CCompanySet::getSet('UserPlatform','string')=='dingtalk'){
            return '/dingtalk/index.html';
        }
        if(
            CCompanySet::getSet('UserPlatform','string')=='wechatwork'){
            return '/wechatwork/index.html';
        }
    }

    public function handle($request, Closure $next)
    {
//        $cron=new Cron();
//        $cron->check(route('cronrun'));

//        header_remove('X-Frame-Options');
//        header('X-Frame-Options: ALLOW-FROM http://localhost:9527/');


//        header('X-Frame-Options:ALLOW-FROM');
        //response()->header('X-Frame-Options','ALLOW-FROM');

//        \response()->headers->remove('X-Frame-Options');
//        \response()->headers->set('X-Frame-Options', 'ALLOW-FROM', 'http://localhost:9527');




        if(!REmployee::getInstance()->init()){
            //Request::path() path
//            if(Request::path()=='com'||Request::path()=='register'){

//                return $next($request);
//            }
            //dd(Request::path());

            $logincode=$request->cookie('logincode');



            $urlto=base64_encode(ConfigRoot::getScheme().'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);

            //var_dump($logincode);
            //exit();
            if($logincode==null){
                if(SUser::init()){

                    return redirect(route('myinfo').'?urlto='.$urlto);
                }else{

                    return redirect($this->defaultLoginUrl());
                    //return redirect(route('sign').'?midware=cemp&urlto='.$urlto);
                }
            }else{
                //
                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [['logincode','=',$logincode]]
                    ]
                ];
                //dd(DbCtrl::sample_count('erp_companys',$where));
                if(DbCtrl::sample_count('erp_companys',$where)){
                    return redirect(route('comlogin',['logincode'=>$logincode]).'?urlto='.$urlto);
                }else{

                    if(SUser::init()){

                        return redirect(route('myinfo').'?urlto='.$urlto);
                    }else{
                        return redirect($this->defaultLoginUrl());

                        //return redirect(route('sign').'?midware=cemp&urlto='.$urlto);
                    }

                }


            }
            //return redirect('sign?wantgo=http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
        }





        $company_id= REmployee::getInstance()->company_id;
        $employee_id=REmployee::getInstance()->id;

        SEmployee::$id=$employee_id;
        SEmployee::$company_id=$company_id;

//        dd(REmployee::getInstance());
        SEmployee::$company_flag_str=REmployee::getInstance()->company_flag_str;
        SEmployee::$user_flag_str=REmployee::getInstance()->user_flag_str;
        SEmployee::$isadmin=REmployee::getInstance()->is_admin;


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
                        ['company_id','=',$company_id]
                    ]
            ]
        ];



        //DbCtrl::$BladeEditSuccess='';
        //DbCtrl::$BladeNewSuccess='';


        $nowtime=date('Y-m-d H:i:s',time());






        $routeId=Route::currentRouteName();



        //dd(SEmployee::$company_flag_str);
        if(SEmployee::$company_flag_str==null||SEmployee::$company_flag_str=='-')
        {
            return response()->view(DbCtrl::$BladeWrong,['telling'=>'您未购买任务服务,无法使用本系统']);
        }

        if($routeId==null||$routeId=='erp')return $next($request);




        if(SEmployee::$company_flag_str=="all"){

           if(SEmployee::$isadmin)return $next($request);
            if(strrpos(SEmployee::$user_flag_str,'-'.$routeId.'-')!==false){
                return $next($request);
            }else{
                return response()->view(DbCtrl::$BladeWrong,['telling'=>'无访问此页面的权限']);
            }
        }

        if(strrpos(SEmployee::$company_flag_str,'-'.$routeId.'-')!==false){

            if(SEmployee::$isadmin)return $next($request);
            if(strrpos(SEmployee::$user_flag_str,'-'.$routeId.'-')!==false){
                return $next($request);
            }else{
                return response()->view(DbCtrl::$BladeWrong,['telling'=>'无访问此页面的权限']);
            }

        }else{
            return response()->view(DbCtrl::$BladeWrong,['telling'=>'您未订购相关产品']);
        }






        //dd( $request);






    }
}
