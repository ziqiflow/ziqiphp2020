<?php


namespace App\Http\Common\Base;


use App\Http\Common\JsonMessage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class RBaseCtrl extends Controller
{

    public function employeeloginout(){
        return JsonMessage::Creat(true,'',CEmployeeLogin::logout());
    }

    public function getpublickey(){
        $userName = request()->input('userName');
        return JsonMessage::Creat(true,'',CEmployeeLogin::getPublicKey($userName));
    }

    public function employeelogin()
    {
        $userName = request()->input('userName');
        $password = request()->input('password');
        return CEmployeeLogin::authPasswordLogin($userName, $password);
    }


    public function Dbctrl2SearchData(){
        $dbid=request()->input('id');
        $currentPage=request()->input('currentPage',1);
        $backdata=CDbCtrl2::searchdata($dbid,$currentPage);
        if($backdata['isok']){
            return JsonMessage::Creat(true,'',$backdata);
        }else{
            return JsonMessage::Creat(false,$backdata['telling']);
        }

    }

    public function GetDbctrl2DbSet(){

        $dbid=request()->input('dbid');

        $back= CDbCtrl2::getDbSet($dbid);

        if(empty($back)){
            return JsonMessage::Creat(false,'不存在对应的dbid');
        }
        return JsonMessage::Creat(true,'',[
            'dbid'=>$dbid,
            'set'=>$back
        ]);
    }



    public static $starttime=null;
    public static function wasttime(){
        if(static::$starttime==null)
        {
            static::$starttime=time();
            Log::error("employeeinfo:耗时:start");
            return;
        }else{
            Log::error("employeeinfo:耗时:".(time()-static::$starttime));
            static::$starttime=time();
        }
    }

    public function employeeinfo()
    {

        //Log::info(request()->all());

        static::wasttime();
        $res = CEmployee::GetInfo();
        static::wasttime();
        //dd('abc');


        $res['data']->depts=CDept::getMyDeptsWithDeptTree($res['data']->_uuid);
        static::wasttime();


        $res['data']->avatar = 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png';
        $res['data']->introduction = $res['data']->name;

        $res['data']->user_id = $res['data']->_uuid;
        //$res['data']->access = ['super_admin'];//$res['data']->user_flag_str;
        //$res['data']->roles = ['admin'];//$res['data']->user_flag_str;

        $res['data']->roles=$res['data']->is_admin?'super_admin':$res['data']->user_flag_str;



        //$res['data']->dddd=9223372036854775807;
        return $res;
    }




    public function GetUsersByDept(){
        return '{"success":true,"msg":"","code":200,"data":'.CDeptTree::GetEmployeesByDeptForjs().'}';
        //return JsonMessage::Creat(true, '', CDeptTree::GetEmployeesByDeptForjs());
    }

    public function GetRoleTree(){
        //return '{"success":true,"msg":"","code":200,"data":'.CDeptTree::GetEmployeesByDeptForjs().'}';
        return JsonMessage::Creat(true, '',Crole::getRoleTree());
    }


    public function GetUsersByRole(){
        //return '{"success":true,"msg":"","code":200,"data":'.CDeptTree::GetEmployeesByDeptForjs().'}';
        return JsonMessage::Creat(true, '',Crole::GetEmployeesByRole());
    }


    public function GetdeptList()
    {
        return JsonMessage::Creat(true, '', CDept::getDeptList());
    }

    public function GetdeptTree()
    {
        return JsonMessage::Creat(true, '', CDept::getTreeDeptList());
    }


}
