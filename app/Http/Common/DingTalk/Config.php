<?php


namespace App\Http\Common\DingTalk;

use App\Http\Common\Base\CEmployee;
use App\Http\Common\ConfigRoot;
use App\Http\Common\OaFlow\CFlowRunData;
use EasyDingTalk\Application;


class Config extends ConfigRoot
{
    static $db_oa_rl_dingtalk_depts='oa_rl_dingtalk_depts';
    static $db_oa_rl_dingtalk_users='oa_rl_dingtalk_users';
    static $db_oa_rl_dingtalk_rolegroups='oa_rl_dingtalk_rolegroups';
    static $db_oa_rl_dingtalk_roles='oa_rl_dingtalk_roles';

    static $db_oa_rl_dingtalk_crops='oa_rl_dingtalk_crops';


    static $InsertEmployeeData=[
        'canlogin'=>1,
        'status'=>2,
    ];

    static public $AgentId='219355539';
    static public $DingTalkOptions = [
        'appkey' => '',
        'appsecret' => '',

    ];
    static public $corp_id='';


    static public $QrCodeOptions=[
        'appId'=>'',
        'appSecret'=>''
    ];

    static public $error_message_toer='';

    static public function getConcactWork(){
        if(env('DingtalkCrop',false)){

        }else{

            return new Application(static::$DingTalkOptions);
        }
    }

    static public function AfterSyncAutoHandler(){

        CFlowRunData::RunDataReSet();

    }




}
