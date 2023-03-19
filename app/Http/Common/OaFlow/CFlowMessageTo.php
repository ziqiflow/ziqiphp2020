<?php


namespace App\Http\Common\OaFlow;

use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CCompanySet;
use App\Http\Common\Base\CDept;
use App\Http\Common\Base\CEmployee;
use App\Http\Common\JsonMessage;
use App\Http\Common\OaFlow\Export\FlowMessageCheckExport;
use App\Http\Common\utils\MongoDateTrans;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use MongoDB\BSON\ObjectId;

class CFlowMessageTo
{

    static public $level_normal=0;
    static public $level_emergency=100;


    static public $status_waiting = 1;
    static public $status_cancel = 2;
    static public $status_cancel_for_revoke = 8;
    static public $status_finish = 3;
    static public $status_finish_or = 4;
    static public $status_finish_message = 5;
    static public $status_finish_cc = 6;
    static public $status_finish_sim = 7;

    static public $dealtype_message = 'message';
    static public $dealtype_orsign = 'orsign';
    static public $dealtype_andsign = 'andsign';
    static public $dealtype_wait_merge = 'wait_merge';

    public static $pagesize = 20;


    static public function simulation_id()
    {

//        return     static public $simulation_id='25904352988233942';
        return Config::getUser()->id;
    }

    static public function getlevel($level){
        switch ($level) {
            case static::$level_emergency:
                return static::$level_emergency;
                break;
            default:
                return static::$level_normal;
        }
    }

    static public function getdealtype($type)
    {

        switch ($type) {
            case static::$dealtype_message:
                return static::$dealtype_message;
                break;
            case static::$dealtype_orsign:
                return static::$dealtype_orsign;
                break;
            case static::$dealtype_andsign:
                return static::$dealtype_andsign;
                break;
            default:
                return static::$dealtype_andsign;
        }
    }

    static public function getdealtypeName($type,$status)
    {

        switch ($type) {
            case static::$dealtype_message:
                if($status==static::$status_finish_cc){
                    return '抄送';
                }
                return '通知';
                break;
            case static::$dealtype_orsign:
                return '或签';
                break;
            case static::$dealtype_andsign:
                return '会签';
                break;
            default:
                return '会签';
        }
    }

//    static public function

    static public function get_waiting($_id, $search = [])
    {

        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['_id', '=', new ObjectId($_id)]
                    ]
            ]
        ];

        $where = array_merge($where, $search);

        $data = static::list_waiting(1, $where);

        if (count($data['result']) == 0) {
            return null;
        }

        $msg= $data['result'][0];


        //$result[$key]['flowdesigner'] = CFlowDesigns::get((string)$result[$key]['flowid']);
        $msg['flowdesigner']=CFlowDesigns::get((string)$msg['flowid']);

        $msg['flowlistOi']['formdata'] = CFlowDealerUtil::tranMongoToModel(
            $msg['flowlistOi']['formdata'], $msg['flowdesigner']['datalist']
        );


        return $msg;
    }


    static private $ObjectI = [];


    static public function hasRead($_id){

        $info= static::get($_id);
        //$info['']

        if(
        ($info['status']==static::$status_finish_message
            || $info['status']==static::$status_finish_cc)
        &&$info['to']==Config::getUser()->id
        &&$info['dealtype']==static::$dealtype_message
        ){
            return $info['hasread'];
        }
        return null;

    }



    static public function get($_id, $ForcedRefresh = false, $select = ['*'])
    {

        //dd($_id);
        if (!$ForcedRefresh && isset(static::$ObjectI[$_id])) {
            return static::$ObjectI[$_id];
        }
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['_id', '=', new ObjectId($_id)]
                    ]
            ]
        ];

        $result = Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos, $select,
            $where
        )->all();


        foreach ($result as $key => $item) {
            $result[$key]['_id'] = (string)$result[$key]['_id'];
            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }

        if (count($result) == 0) {
            return null;
        } else {
            static::$ObjectI[$_id] = $result[0];
            return static::$ObjectI[$_id];
        }
    }


    static public function list_finish($nowpage = 1, $search = [])
    {

        //$where=['status'=>static::$status_waiting,'to'=>SEmployee::$id];
//        DBCtrlOBJ::$BeforeGet=array_merge(DBCtrlOBJ::$BeforeGet,$where);
//        DBCtrlOBJ::$BeforeCount=array_merge(DBCtrlOBJ::$BeforeCount,$where);
        //return DBCtrlOBJ::$BeforeCount;
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_finish],
                        ['dealtype', '!=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];


        $where = array_merge($where, $search);
        return static::list($nowpage, $where,'','finished_at');
    }

    static public function MessageAllSetRead()
    {
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_finish_message],
                        ['dealtype', '=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];


        return Config::getmonconn()->sample_update(
            Config::$mongo_flowsmessagetos,
            $where,
            ['hasread' => 1]
        );
    }

    static public function WaitingSetRead(){

        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_waiting],
                        ['dealtype', '!=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];


        return Config::getmonconn()->sample_update(
            Config::$mongo_flowsmessagetos,
            $where,
            ['hasread' => 1]
        );

    }

    static public function CcAllSetRead()
    {
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_finish_cc],
                        ['dealtype', '=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];


        return Config::getmonconn()->sample_update(
            Config::$mongo_flowsmessagetos,
            $where,
            ['hasread' => 1]
        );


    }

    static public function setread($msgid)
    {

        if(!is_array($msgid)){
            $msglist=[$msgid];
        }else{
            $msglist=$msgid;
        }

        foreach ($msglist as $key=>$item){
            $msglist[$key]=new ObjectId($item);
        }


        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        //['_id', '=', new ObjectId($msgid)],
                        ['to', '=', static::simulation_id()],
                        ['hasread', '=', 0]
                    ]
            ],
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_id',$msglist]
                    ]
            ]
        ];

        return Config::getmonconn()->sample_update(
            Config::$mongo_flowsmessagetos,
            $where,
            ['hasread' => 1],
            false
        );

    }

    static public function badgeNumber()
    {

        $wherecc = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_finish_cc],
                        ['dealtype', '=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()],
                        ['hasread', '=', 0]
                    ]
            ]
        ];

        $wheremessage = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_finish_message],
                        ['dealtype', '=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()],
                        ['hasread', '=', 0]
                    ]
            ]
        ];

        $wherewaiting = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_waiting],
                        ['dealtype', '!=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];

        $whereneedcreat = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['userid', '=',static::simulation_id()],
                        ['hasdone', '=', false]
                    ]
            ]
        ];



        return [
            'message' => Config::getmonconn()->sample_count(Config::$mongo_flowsmessagetos, $wheremessage),
            'cc' => Config::getmonconn()->sample_count(Config::$mongo_flowsmessagetos, $wherecc),
            'waiting' => Config::getmonconn()->sample_count(Config::$mongo_flowsmessagetos, $wherewaiting),
            'needcreat'=>Config::getmonconn()->sample_count(Config::$mongo_flowcreatalerts, $whereneedcreat)
        ];
    }

    static public function list_cc($nowpage = 1, $search = [],$funcall=null,$dev='pc')
    {
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_finish_cc],
                        ['dealtype', '=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];

//        $funcall=function ($query){
//             $query->orderByDesc('level');
//        };


        $where = array_merge($where, $search);
        $data = static::list($nowpage, $where,$funcall);

        if($dev=='pc') {
            foreach ($data['result'] as $key => $item) {
                $data['result'][$key]['lastlog'] = CFlowLog::getlastLog($item['flowlistid']);

            }
        }

        return $data;
    }

    static public function list_message($nowpage = 1, $search = [],$funcall=null,$dev='pc')
    {
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_finish_message],
                        ['dealtype', '=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];

        $where = array_merge($where, $search);

//        $funcall=function ($query){
//            $query->orderByDesc('level');
//        };


        $data = static::list($nowpage, $where,$funcall);
//        Log::info('end'.time());

        if($dev=='pc'){
            foreach ($data['result'] as $key => $item) {

                $data['result'][$key]['lastlog'] = CFlowLog::getlastLog($item['flowlistid']);

            }
        }

//        Log::info('lastend'.time());

        return $data;
    }


    static public function list_waiting($nowpage = 1, $search = [])
    {
        //$where=['status'=>static::$status_waiting,'to'=>SEmployee::$id];
//        DBCtrlOBJ::$BeforeGet=array_merge(DBCtrlOBJ::$BeforeGet,$where);
//        DBCtrlOBJ::$BeforeCount=array_merge(DBCtrlOBJ::$BeforeCount,$where);
        //return DBCtrlOBJ::$BeforeCount;
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', static::$status_waiting],
                        ['dealtype', '!=', static::$dealtype_message],
                        ['to', '=', static::simulation_id()]
                    ]
            ]
        ];

        $where = array_merge($where, $search);

        $funcall=function ($query){
            $query->orderByDesc('level');
        };

        return static::list($nowpage, $where,$funcall);
    }

    static public function list($nowpage, $where = null,$funcall=null,$orderby='created_at')
    {
        $nowpage = !!$nowpage ? $nowpage : 1;
        $totalItems = Config::getmonconn()->sample_count(Config::$mongo_flowsmessagetos, $where,$funcall);
//        $funcall=function ($query){
//            $query->raw(function ($collection){
//                return $collection->aggregate(
//                    [[
//                        '$lookup' => [
//                            'as'=>'inventory_docs',
//                            'from'=>'flowdesigns',
//                            'foreignField'=>'_id',
//                            'localField'=>'flowid'
//                        ]
//                    ]]
//                );
//            });
//        };
        $result = Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,
            ['*'],
            $where,
            $funcall,
            $orderby,
            1,
            [($nowpage - 1) * static::$pagesize, static::$pagesize]
        )->all();

        // return $result;


        foreach ($result as $key => $item) {
            $result[$key]['_id'] = (string)$result[$key]['_id'];
            $result[$key]['flowlistid'] = (string)$result[$key]['flowlistid'];
            $result[$key]['flowid'] = (string)$result[$key]['flowid'];


            MongoDateTrans::ObjtoString($result[$key]['created_at']);
            MongoDateTrans::ObjtoString($result[$key]['timeexpired']);
            MongoDateTrans::ObjtoString($result[$key]['finished_at']);
            //return  CFlowDesigns::get('5c21b66ff376dd00ae00fe72');

            //$result[$key]['flowdesigner'] = CFlowDesigns::get((string)$result[$key]['flowid']);


            $result[$key]['flowlistOi'] = CFlowList::get((string)$result[$key]['flowlistid']);

        }

        return [
            'result' => $result,
            'totalItems' => $totalItems,
            'pageSize' => static::$pagesize,
            'currentPage' => $nowpage];

    }

    //userlist->'name','_uuid'

    static public function simulataion_first_creat($startfun,
                                                   $FlowOi,
                                                   $Designer,
                                                   $userlist,
                                                   $extra_data
    )
    {
//        Log::info($userlist);




        $historymessage=[];
        if (!CFlowPreview::$isPreviewMode) {


            $insertData = [
                //'flowid' => new ObjectId($Designer['_id']),

                'flowname' => $Designer['name'],
                'workname'=> $FlowOi['workname']??null,
                'flowid' => new ObjectId($Designer['_id']),
                'flowlistid' => new ObjectId($FlowOi['_id']),
                'PreFunName' => '',
                'NowFunName' => $startfun['name'],
                'PreFunid' => null,
                'NowFunid' => $startfun['id'],

                'dept_id' => $FlowOi['dept_id'],
                'PreMsgId' => null,

                //'flowlistid' => new ObjectId($FlowOi['_id']),
                'created_at' => MongoDateTrans::intToUTC(time()),
                'created_id' => Config::getUser()->id,
                'creater' => Config::getUser()->name,
                'finished_id' => null,
                'finished_at' => null,
                "company_id" => CCompany::getCompanyId(),
                //"hassend" => 0,
                //'hasfinish'=>'',
                'hasread' => 0,
                //'to' => $item,
                'dealtype' => static::$dealtype_orsign,



                'timeexpired' => null,
                'expiredtimes'=>0,

                ///
                //'status' => static::$status_finish_sim,

            ]+Config::return_user_info('created_id','creater');

            $insertData=array_merge($insertData,$extra_data);

            $insertList=[];


            $message=[];
            foreach ($userlist as $item){

                $insertData['to']=$item['_uuid'];
                $insertData['toer']=$item['name'];
                $insertData['todepts']=CDept::getMyDepts($item['_uuid']);


                $msgid = Config::getmonconn()->sample_insert(Config::$mongo_flowsmessagetos,
                    $insertData
                );
                array_push($message,
                    ['to' => $item['_uuid'],
                        'msgid'=>$msgid,
                        'name' => $item['name'],
                        'NowFunid' => $startfun['id'],
                        'PreFunid' => null]
                );


                array_push($insertList,$insertData);

                $insertList[count($insertList)-1]['_id']=(string)$msgid;


            }

            array_push($historymessage, [
                'dealtype' => $insertData['dealtype'],
                'funname' => $startfun['name'],
                'funid' => $startfun['id'],
                'list' => $message,
                'level'=>$insertData['level']??CFlowMessageTo::$level_normal
            ]);


        } else {

            $insertList=[
                ['_id'=>null]
            ];

        }
        return [$insertList,$historymessage];
    }



//    static public function get($_id,$ForcedRefresh=false,$select=['*'])
//    {
//    }



    static public function CreatMessage($Designer,
                                        CFlowGetContact $ContactExplan,
                                        $FlowOi,
                                        $PreviousFun,
                                        $toFuns,
                                        $msgObj = null,
                                        $dept_id)
    {
        $flowmsgid = null;


        if (isset($msgObj['_id'])) $flowmsgid = $msgObj['_id'];
        ///Log::info('$flowmsgid');
        //Log::info($flowmsgid);


        //Log::info('$FlowOi');
        //Log::info($FlowOi);

        //Log::info('$PreviousFun');
        //Log::info($PreviousFun);

        //Log::info($toFuns);
        $historymessage = [];
        $historycc = [];

        foreach ($toFuns as $fun) {


            //if(!))continue;
            list($can, $msgcheck, $cccheck,$msglevel,$cclevel) = CFlowPreview::hasInPreviewFunList($fun['id']);

            //Log::info('$can');
            // Log::info($can);
            //Log::info($msgcheck);
            //Log::info($cccheck);

            //return 'ddd';

            if (!$can) continue;

            $needMerge=false;
            $funhasMerge=false;


            if(isset($fun['merge_set']['funs'])
                &&is_array($fun['merge_set']['funs'])
                &&count($fun['merge_set']['funs'])>1){


                $merge_list= CFlowDealerUtil::getMergeList($fun['id'],$Designer['funlist'],$fun['merge_set']['funs']);


                if(count($merge_list)>1){
                    //$needMerge=true;
                    $funhasMerge=true;
                    Log::info('$merge_list');
                    Log::info($merge_list);


                    $waitmergeFunids= CFlowDealerUtil::getMaybeFlowFunToHere($Designer['funlist'],
                        array_values(array_diff($merge_list,[$PreviousFun['id']])),

                        $FlowOi['_id'],$PreviousFun);

                    Log::info('waitmergeFunids');
                    Log::info($waitmergeFunids);

                    if(count($waitmergeFunids)>0)$needMerge=true;


                }
            }






            $message = [];
            $cc = [];





            if($needMerge==false){

            $tousers = CEmployee::getEmployeeByIdList($ContactExplan->contacttousers($fun['dealers']));

//            Log::info('timeexpired');
//            Log::info($fun['timeexpired']);
            //return $fun['timeexpired'];

            //Log::info('$Designer');
            //Log::info($Designer);

            $insertData = [
                //'flowid' => new ObjectId($Designer['_id']),


                'flowname' => $Designer['name'],
                'workname'=> $FlowOi['workname']??null,
//                'flowoicreatd_at'=>$FlowOi['created_at'],
                'PreFunName' => $PreviousFun['name'],
                'NowFunName' => $fun['name'],
                'PreFunid' => $PreviousFun['id'],
                'NowFunid' => $fun['id'],
                'dept_id' => $dept_id,
                'PreMsgId' => $flowmsgid,


                //'flowlistid' => new ObjectId($FlowOi['_id']),
                'created_at' => MongoDateTrans::intToUTC(time()),
                'created_id' => Config::getUser()->id,
                'creater' => Config::getUser()->name,

                'finished_id' => null,
                'finished_at' => null,
                "company_id" => CCompany::getCompanyId(),
//                        'hasfinish'=>'',
                'hasread' => 0,
                //'to' => $item,
                'dealtype' => static::getdealtype($fun['dealtype']),
                'hassend' => 0,



                'timeexpired' => ($fun['timeexpired'] == 0) ? null : MongoDateTrans::intToUTC(time() + $fun['timeexpired']),
                'expiredtimes'=>0,




            ]+Config::return_user_info('created_id','creater');

//            Log::info('PreMsgIds:');
//            Log::info(CFlowDealerUtil::getFinishedMergeMsgIds($FlowOi['_id'],$merge_list,$PreviousFun));
            //Log::info('$insertData');
            //Log::info($insertData);
            //Log::info('$isPreviewMode');
            Log::info(CFlowPreview::$isPreviewMode ? '预览模式' : '真实环境');
            if (!CFlowPreview::$isPreviewMode) {
                $insertData['flowid'] = new ObjectId($Designer['_id']);
                $insertData['flowlistid'] = new ObjectId($FlowOi['_id']);
                if($funhasMerge){
                    $insertData['PreMsgIds'] =CFlowDealerUtil::getFinishedMergeMsgIds($FlowOi['_id'],$merge_list,$PreviousFun);
                    array_push($insertData['PreMsgIds'],$flowmsgid);
                }
            }


            $insertData['status'] = $fun['dealtype'] == static::$dealtype_message ?
                static::$status_finish_message : static::$status_waiting;


            $insertData['level']=$msglevel;




            foreach ($tousers as $item) {


                if ($msgcheck !== null) {
                    if (!(
                           ($fun['dealtype'] == static::$dealtype_andsign&& !CFlowPreview::$canchoseander)
                        || ($fun['dealtype'] == static::$dealtype_orsign && !CFlowPreview::$canchoseorer)
                        || ($fun['dealtype'] == static::$dealtype_message && !CFlowPreview::$canchosecc))) {

                        if (!in_array($item->_uuid, $msgcheck)) {
                            continue;
                        }

                    }
                }


//                if(!($msgcheck==null
//                    ||$fun['dealtype']==static::$dealtype_andsign
//                    ||($fun['dealtype']==static::$dealtype_orsign&&!CFlowPreview::$canchoseorer)
//                    ||($fun['dealtype']==static::$dealtype_message&&!CFlowPreview::$canchosecc)
//                )
//                ){
//                    if(!in_array($item->_uuid,$msgcheck)){
//                        continue;
//                    }
//                }




                if (CFlowPreview::$isPreviewMode) {
                    $msgid = 1;
                } else {

                    $msgid = Config::getmonconn()->sample_insert(Config::$mongo_flowsmessagetos,
                        array_merge($insertData,
                            [
                                'to' => $item->_uuid,
                                'toer' => $item->name,
                                'todepts'=>CDept::getMyDepts($item->_uuid),
                            ])
                    );
                }

                array_push($message,
                    ['to' => $item->_uuid,
                        'name' => $item->name,
                        'msgid'=>$msgid,
                        'NowFunid' => $fun['id'],
                        'PreFunid' => $PreviousFun['id']]
                );


                //Log::info($msgid);
            }

                array_push($historymessage, [
                    'dealtype' => $insertData['dealtype'],
                    'funname' => $fun['name'],
                    'funid' => $fun['id'],
                    'list' => $message,
                    'level'=>$msglevel,
                ]);

            }else{
                //$needMerge==true

                $waitmergeList=[];

                foreach ($waitmergeFunids as $waitmergeFunid){
                    foreach ($Designer['funlist'] as $funItem){
                        if($funItem['id']==$waitmergeFunid){
                            array_push(
                            $waitmergeList,
                                ['id'=>$funItem['id'],'name'=>$funItem['name']]
                                );
                            break;
                        }
                    }
                }

                array_push($historymessage, [
                    'dealtype' => static::$dealtype_wait_merge,
                    'funname' => $fun['name'],
                    'funid' => $fun['id'],
                    'waitmergeFunids' => $waitmergeList,
                    'list'=>[],
                    'level'=>$msglevel,
                ]);
            }

            $ccusers = CEmployee::getEmployeeByIdList($ContactExplan->contacttousers(
                $fun['cc']
            ));


            $insertData['status'] = static::$status_finish_cc;
            $insertData['dealtype'] = static::$dealtype_message;


            $insertData['level']=$cclevel;

            foreach ($ccusers as $item) {


                if ($cccheck !== null) {
                    if (CFlowPreview::$canchoseorer) {
                        if (!in_array($item->_uuid, $cccheck)) {
//                            Log::info('$cccheck');
//                            Log::info($cccheck);
                            continue;
                        }
                    }
                }

//                if(!($cccheck==null
//                    ||!CFlowPreview::$canchosecc)
//                ){
//                    if(!in_array($item->_uuid,$cccheck)){
//                        Log::info('$cccheck');
//                        Log::info($cccheck);
//                        continue;
//                    }
//                }

                if (!CFlowPreview::$isPreviewMode) {
                    $msgid = Config::getmonconn()->sample_insert(Config::$mongo_flowsmessagetos,
                        array_merge($insertData,
                            [
                                'to' => $item->_uuid,
                                'toer' => $item->name,
                                'todepts'=>CDept::getMyDepts($item->_uuid),
                                'dealtype' => static::$dealtype_message,
                                'timeexpired' => null,
                                'status' => static::$status_finish_cc
                            ])
                    );
                } else {
                    $msgid = 1;
                }

                array_push($cc, ['to' => $item->_uuid,
                    'msgid'=>$msgid,
                    'name' => $item->name,
                    'NowFunid' => $fun['id'],
                    'PreFunid' => $PreviousFun['id']]);

                //Log::info($msgid);
            }

            array_push($historycc, [
                'funname' => $fun['name'],
                'level'=>$cclevel,
                'funid' => $fun['id'],
                'list' => $cc]);
        }


        return [$historymessage, $historycc];
    }


    static private function hasPermissonReSend(){



    }


    static public function ReSendMessage($msglist,$dealtype,$preMsgId,$funId){

        //ReSendMessage





        $arrmsg=[];
        foreach ($msglist as $item){
            array_push($arrmsg,new ObjectId($item));
        }



        if($dealtype=='cc'){
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['PreMsgId','=',$preMsgId],
                            ['NowFunid','=',$funId],
                            ['dealtype','=',static::$dealtype_message],
                            ['status','=',static::$status_finish_cc]
                        ]
                ]
            ];
        }else{

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['PreMsgId','=',$preMsgId],
                            ['NowFunid','=',$funId],
                            ['dealtype','=',$dealtype]
                        ]
                ]
            ];

        }

        array_push($where,

            ['a'=>'where',
                'arr'=>
                    [
                        ['sended_at','<',MongoDateTrans::intToUTC(time()-CCompanySet::getSet('flowReSendLimit','number')*3600*24)]
                    ]
            ]

        );


        array_push($where,

            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_id',$arrmsg],

                    ]
            ]

        );








        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['sended_at','<',MongoDateTrans::intToUTC(time()-CCompanySet::getSet('flowReSendLimit','number')*3600*24)]
                    ]
            ]
            ,
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_id',$arrmsg],

                    ]
            ],
        ];

        $funcallback=function($query){

            $query->where(function($query) {
                $query->orWhere('node_do_id100','=',SEmployee::$id);
                $query->orWhere('node_do_id200','=',SEmployee::$id);
            });

        };

        $msgList=Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,'*',$where);








        if(!Config::getmonconn()->sample_count(Config::$mongo_flowlists,$where)){
            return JsonMessage::Creat(false,'');
        }





        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['name','=',$value]
                    ]
            ]
        ];



        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',new ObjectId($flowlistid)],
                        ['created_id','=',Config::getUser()->id]
                    ]
            ]
        ];

        if(!Config::getmonconn()->sample_count(Config::$mongo_flowlists,$where)){
            return JsonMessage::Creat(false,'');
        }










    }


    static public function checkMsgStatusByPermsgidFunidExport($dealtype,$preMsgId,$funId){

        $result= static::checkMsgStatusByPermsgidFunid($dealtype,$preMsgId,$funId);

        if($dealtype=='cc')$dealtype='message';

        return (new FlowMessageCheckExport($result,$dealtype))->download('表单导出.xlsx');


    }

    static public function checkMsgStatusByPermsgidFunid($dealtype,$preMsgId,$funId){



        if($dealtype=='cc'){
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['PreMsgId','=',$preMsgId],
                            ['NowFunid','=',$funId],
                            ['dealtype','=',static::$dealtype_message],
                            ['status','=',static::$status_finish_cc]
                        ]
                ]
            ];
        }else{

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['PreMsgId','=',$preMsgId],
                            ['NowFunid','=',$funId],
                            ['dealtype','=',$dealtype]
                        ]
                ]
            ];

        }


       $result= Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,'*',$where)->all();

       foreach ($result as $key=>$item){
           $result[$key]['_id'] = (string)$result[$key]['_id'];
          MongoDateTrans::ObjtoString($result[$key]['finished_at']);
           MongoDateTrans::ObjtoString($result[$key]['sended_at']);
       }

       return $result;






    }


    static public function AutoExpiredMessage(){

        try{

            if(!Config::$canSendMessage){
                return ;
            }

            $where = [
                ['a' => 'where',
                    'arr' =>
                        [
                            ['status', '=', static::$status_waiting],
                            ['dealtype', '!=', static::$dealtype_message],
                            ['timeexpired','<',MongoDateTrans::intToUTC(time())],
                            ['expiredtimes','<',10]
                            //['timeexpired','>',MongoDateTrans::intToUTC(time())]


                        ]
                ]
            ];




            $result = Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,
                ['*'],
                $where,
                null,
                'created_at',
                1,
                [0,120]
            )->all();

            //dd($result);


            foreach ($result as $key => $item) {


                CCompany::setId($item['company_id']);

                $result[$key]['_id'] = (string)$result[$key]['_id'];
                $result[$key]['flowlistid'] = (string)$result[$key]['flowlistid'];
                $result[$key]['flowid'] = (string)$result[$key]['flowid'];

                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['_inner_uuid','=',$item['to']]
                            ]
                    ]
                ];

                $users= Config::getconn()->sample_get(
                    Config::Messager()->get_db_oa_rl__users(),
                    ['userid'],
                    $where
                );


                if(count($users)==0){
                    continue;
                }else{
                    Log::info('用户：'.$item['toer'].';'.$item['to'].'没有查询到');
                    echo ('用户：'.$item['toer'].';'.$item['to'].'没有查询到<br>');
                }

                //dd($users);

                $result[$key]['userid']=$users[0]->userid;

                MongoDateTrans::ObjtoString($result[$key]['created_at']);

                $result[$key]['flowlistOi'] = CFlowList::get((string)$result[$key]['flowlistid']);

                //dd($result);

                $sendback=Config::Messager()->sendOaWaiting($result[$key],'【超时重发】');
                //$sendback=static::SendMessage($result[$key]);
                var_dump($sendback);
                //dd($sendback);
                if($sendback){

                    $where2=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['_id','=',$item['_id']]
                                ]
                        ]
                    ];
                    $expiredtimes=1;
                    if(isset($item['expiredtimes'])){
                        $expiredtimes=$item['expiredtimes']+1;
                    }
                    $timeexpires=[];
                    if(isset($item['timeexpires'])){
                        $timeexpires=$item['timeexpires'];
                    }else{
                        $timeexpires=[MongoDateTrans::UTCToString($item['timeexpired'])];
                    }
                    array_push($timeexpires,date('Y-m-d H:i:s',time()+86400));

                    Config::getmonconn()->sample_update(Config::$mongo_flowsmessagetos,$where2,[
                        'expiredtimes'=>$expiredtimes,
                        'timeexpires'=>$timeexpires,
                        'timeexpired'=>MongoDateTrans::intToUTC(time()+86400)]);


                    $where3=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['msgid','=',$item['_id']]
                                ]
                        ]
                    ];

                    Config::getmonconn()->sample_delete(Config::$mongo_flowtimeoutlogs,$where3,true);




                    Config::getmonconn()->sample_insert(Config::$mongo_flowtimeoutlogs,[
                        'to'=> $item['to'],
                        'toer'=> $item['toer'],
                        'expiredtimes'=>$expiredtimes,
                        'created_at'=> MongoDateTrans::intToUTC(time()),
                        'hasfinish'=>0,
                        'finished_at'=>null,


                        'msgid'=>$item['_id'],
                        'flowlistid'=>$item['flowlistid'],

                        'first_expired_at'=>$timeexpires[0],
                        'flowid'=>$item['flowid'],

                        'flowname'=>$item['flowname'],
                        'NowFunName'=>$item['NowFunName'],
                        'workname'=> $item['workname']??null,

                        'company_id'=>CCompany::getCompanyId()
                        //'interval'=>
                    ]);


                }



            }





            echo '执行结束：<br>';
            echo json_encode($result);


        }catch (\Exception $e){


            Config::Messager()->senderror($e->getMessage(),'oamsgexpired');


        }





    }


    static public function AutoSendMessage()
    {
        try{

        if(!Config::$canSendMessage){
            return ;
        }

        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['hassend', '=', 0]


                    ]
            ],
            ['a'=>'whereNull',
                'arr'=>
                    [
                        'finished_at'
                    ]
            ]
        ];


        $result = Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,
            ['*'],
            $where,
            null,
            'created_at',
            1,
            [0,120]
        )->all();

        //dd($result);

        //$UserPlatform= Config::Messager()->UserPlatform;
        //$db_oa_rl__users='';



        foreach ($result as $key => $item) {

            $result[$key]['_id'] = (string)$result[$key]['_id'];
            $result[$key]['flowlistid'] = (string)$result[$key]['flowlistid'];
            $result[$key]['flowid'] = (string)$result[$key]['flowid'];

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['_inner_uuid','=',$item['to']]
                        ]
                ]
            ];

            //dd(Config::Messager()->get_db_oa_rl__users());
            $users= Config::getconn()->sample_get(
                Config::Messager()->get_db_oa_rl__users(),
                ['userid'],
                $where
            );




            if(count($users)==0){
                continue;
            }



            $result[$key]['userid']=$users[0]->userid;

            MongoDateTrans::ObjtoString($result[$key]['created_at']);

            //return  CFlowDesigns::get('5c21b66ff376dd00ae00fe72');

            $result[$key]['flowlistOi'] = CFlowList::get((string)$result[$key]['flowlistid']);
//            $result[$key]['flowlistOi']['formdata'] = CFlowDealerUtil::tranMongoToModel(
//                $result[$key]['flowlistOi']['formdata'], $result[$key]['flowdesigner']['datalist']
//            );


            $sendback=Config::Messager()->sendOaWaiting($result[$key]);//1;
            ///static::SendMessage($result[$key]);
            var_dump($sendback);
            if($sendback){
                $where2=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['_id','=',new ObjectId($item['_id'])]
                            ]
                    ]
                ];


                $update=['hassend'=>1,'sended_at'=>MongoDateTrans::intToUTC(time())];


                if(Config::Messager()->UserPlatform=='dingtalk'){
                    $update['dd_task_id']=$sendback;
                }


                Config::getmonconn()->sample_update(Config::$mongo_flowsmessagetos,$where2,$update);
            }



        }

        dd($result);

        }catch (\Exception $e){
            Config::Messager()->senderror($e->getMessage(),'oamessage');
        }
        //dd($result);
    }





//    static public function SendMessage($item)
//    {
//        return
//    }











}
