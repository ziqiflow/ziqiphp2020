<?php


namespace App\Http\Common\OaFlow;

use App\Http\Common\JsonMessage;
use App\Http\Common\Log\MLog;
use App\Http\Common\utils\MongoDateTrans;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;

class CFlowRevoke
{

    static public function timelinelist($msg_id){
          return static::revokelist($msg_id);
    }

    static public function revokelist($msg_id){
        $list=static::_revokelist($msg_id);

        $list=collect($list)->unique('_id');


        return $list->sortByDesc(function ($item){
//            Log::info(strtotime($item['finished_at']));
            return strtotime($item['finished_at']);
        })->values()->all();
    }

    static public function _revokelist($msg_id){

    $list=[];

    do{
        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',new ObjectId($msg_id)]
                    ]
            ]
        ];

        $msgs =Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,'*',$where)->all();
        if(count($msgs)==0)break;
        $msgs[0]['_id']=(string)$msgs[0]['_id'];
        MongoDateTrans::ObjtoString($msgs[0]['finished_at']);

        if($msgs[0]['status']!=CFlowMessageTo::$status_waiting){

            if($msgs[0]['dealtype']==CFlowMessageTo::$dealtype_andsign){


                $where2=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['PreMsgId','=',$msgs[0]['PreMsgId']],
                                ['status','!=',CFlowMessageTo::$status_waiting]
                            ]
                    ]
                ];

                $msgs =Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,'*',$where2)->all();

                foreach ($msgs as $key=>$msg){
                    $msgs[$key]['_id']=(string)$msgs[$key]['_id'];
                    MongoDateTrans::ObjtoString($msgs[$key]['finished_at']);
                }
                $list=array_merge($list,$msgs);

            }else{
                array_push($list,$msgs[0]);
            }
        }

        if(isset($msgs[0]['PreMsgIds'])){
            foreach ($msgs[0]['PreMsgIds'] as $preMsgId){
                $list=array_merge($list,static::_revokelist($preMsgId));
            }
            break;

        }else{
            $msg_id=$msgs[0]['PreMsgId'];
        }
        if(empty($msg_id))break;
    }
    while
    (1);

      return $list;
  }

  public static $cancelFlowlist=[];

  public static function getAllUnFinishMsgList($tomsg_id){



//      $where=[
//          ['a'=>'where',
//              'arr'=>
//                  [
//                      ['PreMsgId','=',$tomsg_id]
//                  ]
//          ]
//      ];

      $funcallback=function($query)use ($tomsg_id){
          $query->where(function($query) use ($tomsg_id){
              $query->orWhere('PreMsgId','=',$tomsg_id);
              $query->orWhere('PreMsgIds','=',$tomsg_id);
          });
      };

      $msgs= Config::getmonconn()->sample_get(
          Config::$mongo_flowsmessagetos,
          '*',
          null,
          $funcallback
      );

     if(count($msgs)==0){
         return;
     }

     foreach ($msgs as $item){
         if(
             $item['status']==CFlowMessageTo::$status_waiting||
             $item['status']==CFlowMessageTo::$status_finish_cc||
             $item['status']==CFlowMessageTo::$status_finish_message
         ){
             Log::info((string)$item['_id']);
             Log::info((string)$item['NowFunName']);

             array_push(static::$cancelFlowlist,(string)$item['_id']);
         }else{
             static::getAllUnFinishMsgList((string)$item['_id']);
         }
     }

  }


  public static function revoketo($nowmsg_id,$tomsg_id,$reason){
      $nowmsgObj= CFlowMessageTo::get($nowmsg_id);


      if(empty($nowmsgObj)){
          return JsonMessage::Creat(false,'不存在对应的当前节点'.$nowmsg_id);
      }


      $list= self::revokelist($nowmsg_id);
      $hasfind=false;
      $msgto=null;
      foreach ($list as $item){
          if($item['_id']==$tomsg_id){
              $hasfind=true;
              $msgto=$item;
              break;
          }
      }
      if(!$hasfind){
          return JsonMessage::Creat(false,'不存在对应的撤回节点'.$tomsg_id);
          //return false;
      }

      //$item
      unset($msgto['_id']);

      $insertData=
          ['created_at' => MongoDateTrans::intToUTC(time()),
              //'created_id' => Config::getUser()->id,
              //'creater'=>Config::getUser()->name,
              'hasread'=>0,
              'hassend'=>0,
              'status'=>CFlowMessageTo::$status_waiting,
              //'PreFunid'=>'',
              'PreMsgId'=>$nowmsg_id,
              'isRevoke'=>true,
              'revoked_id'=> Config::getUser()->id,
              'revoker'=> Config::getUser()->name,
              'PreFunid' => $nowmsgObj['NowFunid'],
                //       'PreMsgId'=>$flowmsgid,
              'PreFunName'=>'撤回来自['.$nowmsgObj['NowFunName'].']',
          ]+Config::return_user_info('revoked_id','revoker');

      if(!empty($msgto['timeexpired'])){
          $time=strtotime(MongoDateTrans::UTCToString($msgto['timeexpired']));
          $creattime= strtotime(MongoDateTrans::UTCToString($msgto['created_at']));
          $msgto['timeexpired']=MongoDateTrans::intToUTC($time-$creattime+time());
      }
      //MLog::info($msgto);
      $msgto=array_merge($msgto,$insertData);
      //MLog::info($msgto);

      if(empty($msgto['dealtype'])){

          $msgto['dealtype']=CFlowMessageTo::$dealtype_orsign;

      }

      static::$cancelFlowlist=[];

      self::getAllUnFinishMsgList($tomsg_id);

      CFlowCancel::$cancelType='cancelforrevoke';

      if(!CFlowCancel::cancel((string)$nowmsgObj['flowlistid'],static::$cancelFlowlist,'撤回操作后系统取消')){
          return JsonMessage::Creat(false,'取消流程失败：原因：'.json_encode(static::$cancelFlowlist));
          //return false;
      }

      if(!Config::getmonconn()->sample_insert(Config::$mongo_flowsmessagetos,$msgto)){
          return JsonMessage::Creat(false,'撤回失败，但是部分流程取消成功，请在已取消中恢复一下，后重新试试');
          //return false;
      }




//      CFlowCancel::cancel(,);
//      CFlowCancel::cancel($nowmsgObj['flowlistid'],);


      CFlowLog::CreatRevokeLog(
          (string)$nowmsgObj['flowid'],
          (string)$nowmsgObj['flowlistid'],
          $nowmsg_id,
          CFlowLog::$source_type_revoke,
          $reason,
          [
            'from'=>[
                    'msg_id'=>$nowmsg_id,
                'FunName'=>$nowmsgObj['NowFunName'],
                'FunId'=>$nowmsgObj['NowFunid'],
                'to'=>$nowmsgObj['to'],
                'toer'=>$nowmsgObj['toer']
                    ],
            'to'=>[
                'msg_id'=>$tomsg_id,
                'FunName'=>$msgto['NowFunName'],
                'FunId'=>$msgto['NowFunid'],
                'to'=>$msgto['to'],
                'toer'=>$msgto['toer']
            ]
          ]
      );
      CFlowList::FlowUnFinishNumber((string)$nowmsgObj['flowlistid']);
      return JsonMessage::Creat(true,'撤回成功');
  }




}
