<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use App\Http\Common\JsonMessage;
use App\Http\Common\utils\MongoDateTrans;
use function GuzzleHttp\Psr7\str;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;

class CFlowCancel
{

    static $cancelType='normal';




    static public function checkPermission($flowOi_id){


        return true;
    }

    static public function cancel($flowlistid,$flowmsgIdList,$cancelReason){

        Log::info($flowmsgIdList);


        foreach ($flowmsgIdList as $key=>$item){
            $flowmsgIdList[$key]=new ObjectId($item);
        }

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowlistid','=',new ObjectId($flowlistid)]
                    ]
            ],
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_id',$flowmsgIdList]
                    ]
            ]
        ];
        //return $where;
        Log::info('cancelwhere');
        Log::info($where);

        return static::cancelbywhere($flowlistid,$where,$cancelReason,true);

    }


    static public function CanAllCancel($flowlistid){
        $flowObj=CFlowList::get($flowlistid);
        if(empty($flowObj)){
            return JsonMessage::Creat(false,'流程不存在');
        }

        if(isset($flowObj['isCancel'])&&$flowObj['isCancel']){
            return JsonMessage::Creat(false,'取消失败，因为已经全流程取消了');
        }


        if($flowObj['unFinishNum']==0&&empty($flowObj['CancelNum'])){

            return JsonMessage::Creat(false,'流程已经结束');
        }

        if($flowObj['unFinishNum']==0
            &&
            $flowObj['CancelNum']>0
            &&
            isset($flowObj['finished_at'])
            &&
            time()> strtotime($flowObj['finished_at'])+604800
        ){
            return JsonMessage::Creat(false,'流程撤销超过7天，无法撤销');
        }
        return JsonMessage::Creat(true);
    }



    static public function AllCancel($flowlistid,$cancelReason){



//        $where=[
//            ['a'=>'where',
//                'arr'=>
//                    [
//                        ['_id','=',new ObjectId($flowlistid)],
//                        ['isCancel','=',true],
//                    ]
//            ]
//        ];
//        if(
//        Config::getmonconn()->sample_count(Config::$mongo_flowlists,$where)){

//        }


       $cancancel= static::CanAllCancel($flowlistid);

       if(!$cancancel['success']){
           return $cancancel;
       }

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowlistid','=',new ObjectId($flowlistid)]
                    ]
            ],
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['status',
                            [
                                //CFlowMessageTo::$status_finish,
                                CFlowMessageTo::$status_waiting,
                                CFlowMessageTo::$status_finish_cc,
                                CFlowMessageTo::$status_finish_message,
                                //CFlowMessageTo::$status_cancel
                            ]]

                    ]
            ]
        ];

        $back=static::cancelbywhere($flowlistid,$where,$cancelReason);

        if($back){

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['_id','=',new ObjectId($flowlistid)]
                        ]
                ]
            ];
            Config::getmonconn()->sample_update(Config::$mongo_flowlists,$where,[
                'isCancel'=>true
            ]);
        }

        if($back){
            return JsonMessage::Creat(true,'取消成功');
        }else{
            return JsonMessage::Creat(true,'取消失败');
        }

    }

    static private function Creat($flowname,$flowid,$flowlistid,$reason,$history){

        if(static::$cancelType=='cancelforrevoke'){
            $type=2;
        }else{
            $type=1;
        }

        return Config::getmonconn()->sample_insert(Config::$mongo_flowcancels,
            [
                'type'=>$type,
                'flowname'=>$flowname,
                'flowid'=>$flowid,
                'flowlistid'=>$flowlistid,
                'reason'=>$reason,
                'history'=>$history,

                "company_id" => CCompany::getCompanyId(),
                'created_at' => MongoDateTrans::intToUTC(time()),
                'created_id' => Config::getUser()->id,
                'creater' => Config::getUser()->name,
            ]+Config::return_user_info('created_id','creater'));

    }

    //
    static private function cancelbywhere($flowlistid,$where,$cancelReason,$musthasmsg=false){

        $msgList= Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,['*'],$where)->all();

        if($musthasmsg&&!count($msgList)){
            return false;
        }
//        if(!count($msgList)){
//            return false;
//        }

//        var_dump($msgList);
//        var_dump((string)$msgList[0]['flowid']);
//        exit();


        $canlist=[];
        $newmsgidlist=[];


        foreach ($msgList as $item){
            array_push($newmsgidlist,$item['_id']);
            $hasfind=false;
            foreach ($canlist as $key=> $can){

                if($can['PreMsgId']==$item['PreMsgId']&&$can['NowFunid']==$item['NowFunid']){
                    $hasfind=true;
                    array_push($canlist[$key]['group'],
                        ['_id'=>(string)$item['_id'],
                            'toer'=>$item['toer'],
                            'to'=>$item['to'],
                            'status'=>$item['status']
                        ]
                    );
                }
            }
            if(!$hasfind){
                //
                array_push($canlist,
                    //$item
                    [
                        'PreMsgId'=>$item['PreMsgId'],
                        'NowFunid'=>$item['NowFunid'],
                        'NowFunName'=>$item['NowFunName'],
                        'dealtype'=>$item['dealtype'],
                        'group'=>[
                            [
                            '_id'=>(string)$item['_id'],
                            'toer'=>$item['toer'],
                            'to'=>$item['to'],
                            'status'=>$item['status']]
                        ]
                    ]
                );
            }
        }



//        $newmsgidlist=[];
//
//
//        foreach ($msgList as $msg){
//            array_push(
//                $olddata,
//                [
//                    '_id'=>(string)$msg['_id'],
//                    'status'=>$msg['status']
//                ]
//            );
//            array_push($newmsgidlist,$msg['_id']);
//        }
        $successnum=0;
        if(count($newmsgidlist)>0){

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['flowlistid','=',new ObjectId($flowlistid)]
                        ]
                ],
                ['a'=>'whereIn',
                    'arr'=>
                        [
                            ['_id',$newmsgidlist]
                        ]
                ]
            ];

            if(static::$cancelType=='cancelforrevoke'){
                $stauts=CFlowMessageTo::$status_cancel_for_revoke;
            }else{
                $stauts=CFlowMessageTo::$status_cancel;
            }

            $successnum=Config::getmonconn()->sample_update(Config::$mongo_flowsmessagetos,
                $where,
                [
                    'status'=>$stauts,
                    'finished_id'=>Config::getUser()->id,
                    'finished_at'=> MongoDateTrans::intToUTC(time()),
                ]+Config::return_user_info('finished_id')
            );

        }

        if(
            ($musthasmsg&&$successnum)
            ||
            (!$musthasmsg)
        ){

            //

            Log::info($flowlistid);

            if(static::$cancelType=='cancelforrevoke'){
                $type=CFlowLog::$source_type_cancelforrevoke;
            }else{
                $type=CFlowLog::$source_type_cancel;
            }


            $flowobj= CFlowList::get((string)$flowlistid);
            CFlowLog::CreatCancelLog(
                (string) $flowobj['flowid'],
                $flowlistid,
                $type,
                $cancelReason,
                $canlist,
                $newmsgidlist
            );

            static::Creat(
                $flowobj['name'],
                (string) $flowobj['flowid'],
                $flowlistid,
                $cancelReason,
                $canlist);

            CFlowList::FlowUnFinishNumber($flowlistid);
            CFlowList::FlowCancelNumber($flowlistid);

            return true;
        }
        return false;
    }


    static public function cancelList($flowlistid){



        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowlistid','=',new ObjectId($flowlistid)]
                    ]
            ],
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['status',
                            [
                                //CFlowMessageTo::$status_finish,
                                CFlowMessageTo::$status_waiting,
//                                CFlowMessageTo::$status_finish_cc,
//                                CFlowMessageTo::$status_finish_message,
                                //CFlowMessageTo::$status_cancel
                            ]]

                    ]
            ]
        ];


        $result_msg=Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,['*'],
            $where,
            null,
            'created_at',
            1
        )->all();


        foreach ($result_msg as $key=>$item) {
            $result_msg[$key]['_id'] = (string)$result_msg[$key]['_id'];
            MongoDateTrans::ObjtoString($result_msg[$key]['created_at']);
            //$result_msg[$key]['_id'] = (string)$result_msg[$key]['_id'];
        }

        $canlist=[];


        foreach ($result_msg as $item){

//            if(

            //

            $hasfind=false;
            foreach ($canlist as $key=> $can){

                if($can['PreMsgId']==$item['PreMsgId']&&$can['NowFunid']==$item['NowFunid']){
                    $hasfind=true;
                    array_push($canlist[$key]['group'],
                        $item);
                }
            }
            if(!$hasfind){
                //
                array_push($canlist,
                    //$item
                    [
                        'PreMsgId'=>$item['PreMsgId'],
                        'NowFunid'=>$item['NowFunid'],
                        'NowFunName'=>$item['NowFunName'],
                        'dealtype'=>$item['dealtype'],
                        'group'=>[
                            $item
                        ]
                    ]
                );
            }
        }

        //}

        return $canlist;

    }




}
