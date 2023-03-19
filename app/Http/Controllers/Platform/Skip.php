<?php


namespace App\Http\Controllers\Platform;


use App\Http\Common\ConfigRoot;
use App\Http\Common\OaFlow\CFlowMessageTo;
use App\Http\Controllers\Controller;
use App\Http\Tool\Tool1;

class Skip extends Controller
{


     static public function ddmessage(){
         return static::ddMsgWaiting();
     }

//dd_msg_waiting
     static private function MsgWaiting($type='dingtalk'){

         $dealtype= request()->input('dealtype');
         $sourcetype=request()->input('sourcetype');



         $param=[
             'msgid'=>request()->input('msgid'),
             'flowlistid'=>request()->input('flowlistid'),
             'nowfunid'=>request()->input('nowfunid'),
         ];

//         $url='?msgid='.request()->input('msgid').
//             '&flowlistid='.request()->input('flowlistid').
//             '&nowfunid='.request()->input('nowfunid');

         if($dealtype==CFlowMessageTo::$dealtype_orsign||$dealtype==CFlowMessageTo::$dealtype_andsign){


             if($sourcetype=='dd.sendOaMsgEntrust'||$sourcetype=='dd.resendOaMsgEntrust'){
                 $msgid= request()->input('msgid');
                 $url='#/undertaking?tourl='.urlencode('/dingtalk/msg_entrust.html?msgid='.$msgid.'&uid='.request()->input('uid').'&a=1#/flowdeal_msg_entrust?'
                 .http_build_query($param));
//                 msgid='.$msgid
//                         .'&flowlistid='.request()->input('flowlistid').'
//&nowfunid='.request()->input('nowfunid'));
             }elseif($sourcetype=='dd.sendOaFlowEntrust'||$sourcetype=='dd.resendOaFlowEntrust')
             {
                 //https://localhost:8099/skip/dd_msg_waiting?
                 //sourcetype=dd.sendOaFlowEntrust&
                 //dealtype=andsign&msgid=5ee5dd0878027601df40c0b4&
                 //flowlistid=5cde1689f376dd007c03f532&timestamp=1593936651&
                 //nowfunid=155583265420010146&
                 //flow_entrust_user_id=25904352988235792
                 $param['flow_entrust_from']=request()->input('flow_entrust_from');
                 $param['dealtype']=request()->input('dealtype');//类型；

                 $url='#/myentrusts?'.http_build_query($param);
             }else{
                 $url='#/flowdeal?'.http_build_query($param);
             }

         }else{
             //如果是if($sourcetype=='dd.sendOaMsgEntrust'||$sourcetype=='dd.resendOaMsgEntrust'){; 也是采用这个模式
             //因为消息的阅读是没有权限限制的哦。（这可能是个bug）

             if($sourcetype=='dd.sendOaMsgEntrust'||$sourcetype=='dd.resendOaMsgEntrust'){
                 $url='#/undertaking?action=flowdetail&'.http_build_query($param+['msg_id'=>request()->input('msg_id')]);
             }elseif($sourcetype=='dd.sendOaFlowEntrust'||$sourcetype=='dd.resendOaFlowEntrust')
             {
                 $param['flow_entrust_from']=request()->input('flow_entrust_from');
                 $url='#/myentrusts?'.http_build_query($param);
             }else{
                 $url='#/flowdetail?'.http_build_query($param).'&type=message';
             }

         }



         //dd($url);
         // /dingtalk/index.html#/flowdetail?msgid=5c6cc545f376dd008464d794&flowlistid=5c63d6a4f376dd00cc76e742&nowfunid=154993036313290804&type=message
         //http://localhost:8099/dingtalk/index.html#/flowdetail?msgid=5c6cc545f376dd008464d794&flowlistid=5c63d6a4f376dd00cc76e742&nowfunid=154993036313290804&type=message
         //http://localhost:8099/skip/dd_msg_waiting?sourcetype=dd.sendOaMsgEntrust&dealtype=orsign&msgid=5d2309cbf376dd00c90c4048&flowlistid=5d2309cbf376dd00c90c4046&timestamp=1591954149&nowfunid=156023708478591205&uid=25904352988235792

         if(Tool1::isMobile()){
             //跳转
             return redirect(ConfigRoot::getSchemeAndHttpHost().'/'.$type.'Mobie/index.html'.$url);
         }else{
             //dd('/dingtalk/index.html'.$url);
             return redirect(ConfigRoot::getSchemeAndHttpHost().'/'.$type.'/index.html'.$url);
         }
     }



    static private function MsgNeedCreat($type='dingtalk'){
        $_id=request()->input('_id');
        //return redirect('/dingtalkMobie/index.html#/flowneedcreat?showid='.$_id);
        if(Tool1::isMobile()){
            //跳转
            return redirect(ConfigRoot::getSchemeAndHttpHost().'/'.$type.'Mobie/index.html#/flowneedcreat?showid='.$_id);
        }else{
            //dd('/dingtalk/index.html'.$url);
            return redirect(ConfigRoot::getSchemeAndHttpHost().'/'.$type.'/index.html#/dashboard?tab=needcreat&showid='.$_id);
        }
    }

    //dd_msg_need_creat
    static public function ddMsgNeedCreat(){
        return static::MsgNeedCreat('dingtalk');
    }

    static public function wwMsgNeedCreat(){
        return static::MsgNeedCreat('wechatwork');
    }

    static public function ddMsgWaiting(){
        return self::MsgWaiting('dingtalk');
    }

    static public function wwMsgWaiting(){
        return self::MsgWaiting('wechatwork');
    }



}
