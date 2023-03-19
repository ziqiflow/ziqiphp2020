<?php


namespace App\Http\Common\DingTalk;


use App\Http\Common\JsonMessage;
use App\Http\Controllers\Controller;
use App\Http\Tool\Tool1;
use Illuminate\Support\Facades\Log;


class RDingTalkCtrl extends Controller
{

    public function employeeGetDataFormDingtalk()
    {
        $type = request()->input('type');
        return CDingtalk::SyncAutoEntryOne($type);
    }

    public function SyncFromDingtalkByUserid(){

        $uuid=request()->input('uuid');
        $result=CDingtalk::SyncFromDingtalkByUserid($uuid);

        if($result){
//            CDeptTree::GetEmployeesByDept(true);
//            CDept::getTreeDeptList(true);

            return JsonMessage::Creat(true, '内部数据同步成功,请点击页面上的重新生成缓存数据按键完成数据更新', $result);
        }
        return JsonMessage::Creat(false,'没有查询到此会员');
    }


    function DingTalkLoginWebCallback(){

        $code=request()->input('code');
        $result= CDingtalkLogin::GetUserLoginbyQrCode($code);

        if(!$result['success']){
            return '错误提示：'.$result['msg'];
        }
        return view('common.DingTalk.afterScan',['data'=>$result['data']]);
//        dd(request()->all());
    }
    function DingTalkLoginWeb(){

        return redirect(CDingtalkLogin::QrCodeUrl());
    }

    function DingTalkLogin(){
        if(request()->isMethod('POST')){

            $code=request()->input('code');
            return CDingtalkLogin::checkUserLoginIn($code);
        }else{

//            Log::info($_SERVER);
            //Log::info('dddd');
//            Log::info(Tool1::isMobile());
            return view(Tool1::isMobile()?'common.DingTalk.mobilelogin':'common.DingTalk.login',['config'=>CDingtalkLogin::getConfig()]);
        }
    }


    public function AutoDingtalkSync()
    {
        if(env('WechatWorkCrop',false)){
            CDingtalk::SyncAutoEntry();
        }else{
            $type = request()->input('type');
            CDingtalk::SyncAutoEntryOne($type);
        }
        //employee/contact/getdataformdingtalk
    }



}
