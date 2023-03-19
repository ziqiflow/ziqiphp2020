<?php


namespace App\Http\Common\DingTalk;

use App\Http\Common\Base\CCompany;
use App\Http\Common\Log\MLog;
use App\Http\Common\OaFlow\CFlowMessageTo;
use EasyDingTalk\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CDingtalkMessager
{
    static $MessagerIO = null;


    public $UserPlatform = 'dingtalk';


    static function getInstance()
    {
        if (empty(self::$MessagerIO)) {
            self::$MessagerIO = new self;
            return self::$MessagerIO;
        } else {
            return self::$MessagerIO;
        }
    }



    function get_db_oa_rl__users()
    {
        return Config::$db_oa_rl_dingtalk_users;
    }


    function senderror($message, $type, $ThresholdTime = 30)
    {



        $filename = CCompany::getCompanyPath() . 'dd_error_' . $type;
        if (
        Storage::disk()->exists($filename)
        ) {

            $lasttime = Storage::disk()->get($filename);
            if (time() - $lasttime < 30 * 60) {
                return;
            }
        }


        Storage::disk()->put($filename, time());

        $app = new Application(Config::$DingTalkOptions);

        //dd($app['credential']->token());
        $message = [
            "msgtype" => "markdown",
            "markdown" => [
                'title' => '警告：' . $message,
                'text' => $message]
        ];


        return UDingtalk::setmessage(
            $app['credential']->token(),
            [
                'agent_id' => Config::$AgentId,
                'userid_list' => Config::$error_message_toer,//$item['dduserid'],
                'msg' => $message
            ]
        );

    }



    function sendOaNeedCreat($item)
    {

        $httphost = Config::getSchemeAndHttpHost();//request()->getSchemeAndHttpHost();
        Log::info('http类型：' . request()->getSchemeAndHttpHost());


        $app = new Application(Config::$DingTalkOptions);

        $message = [
            "msgtype" => "markdown",
            "markdown" => [
                'title' => '提示创建-' . $item['flowname'],
                'text' => '## 提示创建-' . $item['flowname'] . '

' . $item['desc'] . '

[点击查看](' . $httphost . '/skip/dd_msg_need_creat?_id=' . $item['_id'] . '&timestamp=' . time() . ')',
            ]
        ];


        //dd($message);

        $result = UDingtalk::setmessage(
            $app['credential']->token(),
            [
                'agent_id' => Config::$AgentId,
                'userid_list' => $item['userid'],//'046400205224705098',//$item['dduserid'],//
                'msg' => $message
            ]
        );


        MLog::info(['tag' => 'dd.sendOaNeedCreat', 'message' => $message, 'result' => $result]);

        if ($result['errcode'] == 0) {
            return $result['task_id'];
        } else {
            Log::alert($result);
            return false;
        }


    }


//    function sendOaMsgEntrustWaiting(){
//
//    }









    function sendOaWaiting($item, $titlePrefix = '', $sourcetype = 'dd.sendOaWaiting', $paras = [])
    {



//       $item['_id'];
//        $item['flowlistid'];
//        $item['NowFunid'];

        $httphost = Config::getSchemeAndHttpHost();//request()->getSchemeAndHttpHost();


        $app = new Application(Config::$DingTalkOptions);

        $dealtypeName = CFlowMessageTo::getdealtypeName($item['dealtype'], $item['status']);
        //dd($app['credential']->token());

        $urlparams = [
            'sourcetype' => $sourcetype,
            'dealtype' => $item['dealtype'],
            'msgid' => $item['_id'],
            'flowlistid' => $item['flowlistid'],
            'timestamp' => time(),
            'nowfunid' => $item['NowFunid']
        ]+$paras;

        $message =
            [
                'agent_id' => Config::$AgentId,
                'userid_list' => env('IS_DEV') ? '046400205224705098' : $item['userid'],//'046400205224705098',//
                'msg' => [
                    "msgtype" => "markdown",
                    "markdown" => [
                        'title' => $titlePrefix . $item['NowFunName'] . '-' . $item['flowname'] . '【' . $dealtypeName . '】',
                        'text' => '## ' . $titlePrefix . $item['flowname'] . '【' . $dealtypeName . '】

#### 处理节点：' . $item['NowFunName'] . ' 来自：' . $item['PreFunName'] . '

描述：' . $item['flowlistOi']['desc'] . '

[点击查看](' . $httphost . '/skip/dd_msg_waiting?'.http_build_query($urlparams).')',
                    ]
                ]
            ];


        $result = UDingtalk::setmessage(
            $app['credential']->token(),
            $message
        );


        MLog::info(['tag' => $sourcetype, 'message' => $message, 'result' => $result]);

        if ($result['errcode'] == 0) {
            return $result['task_id'];
        } else {
            Log::alert($result);
            return false;
        }


    }


    function sendEmployeeCare($sendinfo)
    {

        $app = new Application(Config::$DingTalkOptions);

        $httphost = Config::getSchemeAndHttpHost();

        $message = [
            "msgtype" => "action_card",
            "action_card" => [
                "title" => $sendinfo['title'],
                "markdown" => '![](' . $httphost . $sendinfo['imageurl'] . ')
### ' . $sendinfo['title'] . '
' . $sendinfo['description'],
                "single_title" => "查看详情",
                "single_url" => $httphost . '/employee_care/message/' . (string)$sendinfo['_id']
            ]
        ];

        $task_list = [];

        foreach ($sendinfo['user_id_list'] as $id_list) {

            $toinfo = [
                'agent_id' => Config::$AgentId,
                'userid_list' => $id_list,//'046400205224705098',//
                'msg' => $message
            ];

            $result = UDingtalk::setmessage(
                $app['credential']->token(),
                $toinfo
            );

            MLog::info(['tag' => 'dd.sendEmployeeCare', 'message' => $toinfo, 'result' => $result]);

            if ($result['errcode'] == 0) {
                array_push($task_list, $result['task_id']);
//                return $result['task_id'];
            } else {

                Log::alert($result);
                return false;
            }
        }

        return $task_list;


    }
}
