<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CDept;
use App\Http\Common\Base\CEmployee;
use App\Http\Common\JsonMessage;
use App\Http\Common\Media\CFiles;
use App\Http\Common\utils\MongoDateTrans;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;
use Psy\Util\Json;

class CFlowList
{
    public static $ObjectI = [];
    public static $pagesize=20;


   static public function ReloadUnfinishNumber(){

       $where=[
           ['a'=>'where',
               'arr'=>
                   [
                       ['unFinishNum','!=',0]
                   ]
           ]
       ];


       $list= Config::getmonconn()->sample_get(Config::$mongo_flowlists,['_id','name','desc'],$where);

       foreach ($list as $item){
            echo $item['name'].'-----'.$item['desc'].'------'.static::FlowUnFinishNumber((string)$item['_id']).'<br>';
       }


   }


   static public function FlowCancelNumber($flowlistid){
        //Log::info($flowlistid);
       $where=[
           ['a'=>'where',
               'arr'=>
                   [
                       ['flowlistid','=',$flowlistid],
                       ['type','=',1],
                   ]
           ]
       ];

       $num=Config::getmonconn()->sample_count(Config::$mongo_flowcancels,$where);

       $where=[
           ['a'=>'where',
               'arr'=>
                   [
                       ['_id','=',new ObjectId($flowlistid)]
                   ]
           ]
       ];

       if(Config::getmonconn()->sample_update(Config::$mongo_flowlists,$where,[
           'CancelNum'=>$num
       ])){

           return $num;
       }
       Log::info('更新失败:'.$num);

   }


   static public function FlowUnFinishNumber($flowlistid){

       //Log::info($flowlistid);
       $where=[
           ['a'=>'where',
               'arr'=>
                   [
                       ['flowlistid','=',new ObjectId($flowlistid)],
                       ['status', '=', CFlowMessageTo::$status_waiting],
                       ['dealtype', '!=', CFlowMessageTo::$dealtype_message],
                   ]
           ]
       ];
       $num=Config::getmonconn()->sample_count(Config::$mongo_flowsmessagetos,$where);

       $where=[
           ['a'=>'where',
               'arr'=>
                   [
                       ['_id','=',new ObjectId($flowlistid)]
                   ]
           ]
       ];

       $updatedata=[
           'unFinishNum'=>$num,
       ];
       if($num==0){
           $updatedata['finished_at']=date('Y-m-d H:i:s',time());
       }
       if(Config::getmonconn()->sample_update(Config::$mongo_flowlists,$where,$updatedata)){

           return $num;
       }
       Log::info('更新失败:'.$num);




   }

    static public function simulation_id(){

        //return static public $simulation_id='25904352988233942';
        return Config::getUser()->id;
    }
    //public static $simulation_id='25904352988233842';

    static public function list_i_creat($nowpage = 1, $search = []){
        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['created_id', '=', static::simulation_id()]
                    ]
            ]
        ];
        $where = array_merge($where, $search);
        return static::list($nowpage, $where);
    }

    static public function list($nowpage, $where = null)
    {
        $nowpage = !!$nowpage ? $nowpage : 1;
        $totalItems = Config::getmonconn()->sample_count(Config::$mongo_flowlists, $where);

        $result = Config::getmonconn()->sample_get(Config::$mongo_flowlists, ['*'],
            $where,
            null,
            'created_at',
            1,
            [($nowpage - 1) * static::$pagesize, static::$pagesize]
        )->all();


        foreach ($result as $key => $item) {
            $result[$key]['_id'] = (string)$result[$key]['_id'];


            $result[$key]['flowid'] = (string)$result[$key]['flowid'];

            MongoDateTrans::ObjtoString($result[$key]['created_at']);
            MongoDateTrans::ObjtoString($result[$key]['updated_at']);
            //return  CFlowDesigns::get('5c21b66ff376dd00ae00fe72');

//            $result[$key]['flowdesigner'] = CFlowDesigns::get((string)$result[$key]['flowid']);
//            $result[$key]['formdata'] = CFlowDealerUtil::tranMongo_to_list(
//                $result[$key]['formdata'], $result[$key]['flowdesigner']['datalist']
//            );




            $result[$key]['lastlog']=CFlowLog::getlastLog($result[$key]['_id']);
        }

        return [
            'result' => $result,
            'totalItems' => $totalItems,
            'pageSize' => static::$pagesize,
            'currentPage' => $nowpage];
    }

    static public function detail($_id,$withmsg=false,$withlog=false){

        if($_id==null){
            return null;
        }

        $FlowOi=static::get($_id);
        $FlowOi['designer']=CFlowDesigns::get($FlowOi['flowid']);


        if(!isset($FlowOi['formdata'])){
            $FlowOi['formdata']=[];
        }
        $FlowOi['formdata'] = CFlowDealerUtil::tranMongoToModel(
            $FlowOi['formdata'],
            $FlowOi['designer']['datalist']
        );

        //$FlowOi['loglist']

        if($withlog){
            $FlowOi['logList']=static::getDetailLogs($_id);
        }else{
            $FlowOi['logList']=[];
        }

        if($withmsg){
            $FlowOi['msgList']=static::getDetailMsgs($_id);
        }else{
            $FlowOi['msgList']=[];
        }
        return $FlowOi;
    }


    static public function getDetailMsgs($flowlistid){


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
                        ['status',[CFlowMessageTo::$status_finish,
                            CFlowMessageTo::$status_waiting,
                            CFlowMessageTo::$status_cancel,
                            CFlowMessageTo::$status_cancel_for_revoke,
                            CFlowMessageTo::$status_finish_sim,


                            CFlowMessageTo::$status_finish_cc,
                            CFlowMessageTo::$status_finish_message,

                        ]]

                    ]
            ]
        ];
//        $funcallback=function($query){
//                $query->where(function ($query){
//                    $query->orWhere('status',CFlowMessageTo::$status_finish);
//                    $query->orWhere('status',CFlowMessageTo::$status_waiting);
//                    $query->orWhere('status',CFlowMessageTo::$status_cancel);
//                });
//        };

        $result_msg=Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,['*'],
            $where,
            null,
            'created_at',
            1
        )->all();


        foreach ($result_msg as $key=>$item) {
            $result_msg[$key]['_id'] = (string)$result_msg[$key]['_id'];
            MongoDateTrans::ObjtoString($result_msg[$key]['created_at']);
        }

        return $result_msg;

    }

    static public function getDetailLogs($flowlistid){


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowlistid','=',new ObjectId($flowlistid)]
                    ]
            ]
        ];
        $result_log=Config::getmonconn()->sample_get(Config::$mongo_flowlogs,['*'],
            $where,
            null,
            'created_at',
            1
        )->all();

        CFlowLog::filterResult($result_log);

        return $result_log;

    }



    static public function get($_id, $ForcedRefresh = false, $select = ['*'])
    {
        if ($_id == null) {
            return null;
        }

//        Log::info($_id);
//        Log::info(static::$ObjectI);

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

        $result = Config::getmonconn()->sample_get(Config::$mongo_flowlists, $select,
            $where
        )->all();


        foreach ($result as $key => $item) {
            $result[$key]['_id'] = (string)$result[$key]['_id'];
            $result[$key]['flowid'] = (string)$result[$key]['flowid'];

            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }

        if (count($result) == 0) {
            return null;
        } else {
            static::$ObjectI[$_id] = $result[0];
            return static::$ObjectI[$_id];
        }
    }



     static $CBSFirstcreated_deptid=null;
     static $CBSLastmsgcreated_deptid=null;

    static function CreatBySystem($flowid,$level=0,$desc){



        $Designer= CFlowDesigns::get($flowid);


        //dd($Designer);

        if(!$Designer['set']['canBeSonFlow']){
           return JsonMessage::Creat(false,'此流程不支持作为外部流程创建');
        }

        if(empty($Designer['set']['dealtype'])){
            $Designer['set']['dealtype']=CFlowMessageTo::$dealtype_orsign;
        }


        $nowfun=null;
        foreach ($Designer['funlist'] as $item){
            if($item['is_start']){
                $nowfun=$item;
            }
        }

        if(empty($nowfun)){
            return JsonMessage::Creat(false,'不存在开始流程');
        }
        $defaultRunRoottype=empty($Designer['set']['runRoottype'])?'creater':$Designer['set']['runRoottype'];

        if(count($Designer['set']['dealers'])==1){
            if(!empty($Designer['set']['dealers'][0]['runRoottype'])){
                $defaultRunRoottype=$Designer['set']['dealers'][0]['runRoottype'];
            }
        }

        $dept_id=$defaultRunRoottype=='creater'?
            static::$CBSFirstcreated_deptid:
            static::$CBSLastmsgcreated_deptid;


        $deptIdList=CFlowGetContact::getDeptTreeIdList($dept_id);


        $insertdata=[
            'flowid' => new ObjectId($flowid),
            'name' => $Designer['name'],
            'created_at' => MongoDateTrans::intToUTC(time()),
            'created_id' => Config::getUser()->id,
            'creater'=>Config::getUser()->name,
            'dept_id'=>$dept_id,
            'dept_id_list'=>$deptIdList,
            "company_id" => CCompany::getCompanyId(),
            'formdata' => new \stdClass(),
            'level'=>$level,
            'desc' => $desc
            //date('Y-m-01 H:i:s',time())
        ]+Config::return_user_info('created_id','creater');


        if(!CFlowPreview::$isPreviewMode){



            $whereboat=static::getWorkName($Designer,$insertdata);

            if(count($whereboat)){
                $whereboat[]=['flowid','=',$insertdata['flowid']];
                $where_run_index=[
                    ['a'=>'where',
                        'arr'=>
                            $whereboat
                    ]
                ];
                if(Config::getmonconn()->sample_count(Config::$mongo_flowlists,$where_run_index)){
                    return JsonMessage::Creat(false,'外部子流程创建失败,出现重复文号，请稍等重新提交试试');
                }
            }

            $FlowListid = Config::getmonconn()->sample_insert(Config::$mongo_flowlists,
                $insertdata
            );


        }else{
            $FlowListid=1;
        }

        if (empty($FlowListid)) {
            return JsonMessage::Creat(false, '外部子流程创建失败，请重新试试');
        }

        $insertdata['_id']=$FlowListid;
        $insertdata['created_at']=MongoDateTrans::ObjtoString($insertdata['created_at']);
        $FlowOi=$insertdata;




        $ContactExplan= new CFlowGetContact(null,null,$Designer['set']);


        $userlist= CEmployee::getEmployeeByIdList($ContactExplan->contacttousers( $Designer['set']['dealers']))->all();

        $userlist=json_decode(json_encode($userlist),true);

        list($msgObjList,$historymessage)=CFlowMessageTo::simulataion_first_creat(
            $nowfun,
            $FlowOi,
            $Designer,
            $userlist,
            [
                'level'=>$level,
                'dept_id'=>$dept_id,
                'hassend'=>0,
                'status'=>CFlowMessageTo::$status_waiting,
                'dealtype'=>empty($Designer['set']['dealtype'])?:$Designer['set']['dealtype'],
                'timeexpired' => (empty($Designer['set']['timeexpired'])||$Designer['set']['timeexpired'] == 0) ? null : MongoDateTrans::intToUTC(time() + $Designer['set']['timeexpired'])
            ]
            );

        CFlowLog::CreatLog(
            $flowid,
            $FlowListid,
            null,
            CFlowLog::$source_type_creat,
            [],
            null,
            $nowfun['name'],
            null,
            $nowfun['id'],
            null,
            null,
            $historymessage,
            null,
            null,
            null,
            $dept_id
        );

        if(!CFlowPreview::$isPreviewMode){
            static::FlowUnFinishNumber($FlowListid);
        }


        if(count($historymessage)==0){
            return JsonMessage::Creat(true,
                '外部流程可创建;但是由于流程设计有问题，无下发环节（联系人）；请联系管理员编辑流程设置',
                ['flowlistid'=>$FlowListid]
            );
        }else
        {
            return JsonMessage::Creat(
                true,
                '外部子流程创建成功',
                [
                    'flowname'=>$Designer['name'],
                    'flowlistid' => $FlowListid,
                    'nextmessage' => $historymessage,
                    'level'=>$level
                ]
            );

        }
    }



    static function initflowlevel(){

        $level=null;

        foreach (CFlowPreview::$PreviewFunList as $fun){


            if($fun['msgcheck']!=null){
                if($level==null||$level==$fun['msglevel']){
                    $level=$fun['msglevel'];
                }else{
                    return false;
                }
            }

            if($fun['cccheck']!=null){
                if($level==null||$level==$fun['cclevel']){
                    $level=$fun['cclevel'];
                }else{
                    return false;
                }
            }
        }

        return $level;
    }









    static function Creat($flowid,
                          $flowdata,
                          $inputdata,
                          $btnindex
                        )
    {





        if(isset($flowdata['level'])){
            if($flowdata['level']==CFlowMessageTo::$level_normal){

                $levels=static::initflowlevel();
                if($levels!==false){
                    $flowdata['level']=$levels;
                }
            }
        }else{
            $flowdata['level']=CFlowMessageTo::$level_normal;
        }



        //return  Config::getUser()->id;

        //Log::info('SEmployee::$id');
        //Log::info(SEmployee::$id);
        //return SEmployee::$id;
        $designs = CFlowDesigns::get($flowid);
        if (empty($designs)) {
            return JsonMessage::Creat(false, '不存在对应的流程');
        }




        if(!Config::$isTestMode&&!$designs['canuse']){
            return JsonMessage::Creat(false, '['.$designs['name'].']此流程未启用');
        }
        $nowfun = null;
        foreach ($designs['funlist'] as $fun) {
            if ($fun['is_start']) {
                $nowfun = $fun;
            }
        }
        if (empty($nowfun)) {
            return JsonMessage::Creat(false, '['.$designs['name'].']不存在对应的开始流程，请联系管理员检查流程设置');
        }


        if (!CFlowDealerUtil::contactHasPermission(
            Config::getUser()->id,
            $nowfun['creatPermission'],
            ['firstcreated_deptid'=>$flowdata['dept'],
                'firstcreated_userid'=>Config::getUser()->id,
                'lastmsgcreated_deptid'=>null,
                'lastmsgcreated_id'=>null]
        )) {
            return JsonMessage::Creat(false, '没有创建['.$designs['name'].']流程的权限');
        }

        //return $inputdata;
        //return $designs['datalist'];



//        $formdata = CFlowDealerUtil::tranModalToMongo(
//            $inputdata,
//            $designs['datalist'],
//            $nowfun['requiredata']
//        );



        $formdata = CFlowDealerUtil::tranModalToMongo2(
            $inputdata,
            $designs['datalist'],
            $nowfun['formEditLimit']
        );





        //return $formdata;


        list($nowfun, $nextfuns,$nextSonFlows) = CFlowDealerUtil::getnowfun_nextfun(
            $designs,
            null,
            $btnindex,
            $formdata
        );

        //$nowfun['btnGroup'][$btnindex];
//        Log::info('formdata');
//        Log::info($formdata);
//        Log::info('nowfun');
//        Log::info($nowfun);
//        Log::info('$nextfuns');
//        Log::info($nextfuns);




        if (count($nextfuns) == 0) {
            return JsonMessage::Creat(false, $designs['name'].'流程设计有问题，无下一个环节/步骤');
        }


        $filelistlog=[];
        if(!CFlowPreview::$isPreviewMode){

             if(isset($flowdata['fileList'])&&count($flowdata['fileList'])){

                 array_push($filelistlog,[
                     'funname'=>$nowfun['name'],
                     'funid'=>$nowfun['id'],
                     'created_id'=>Config::getUser()->id,
                     'creater'=>Config::getUser()->name,
                     'created_at'=>date('Y-m-d H:i:s',time()),
                     'files'=>$flowdata['fileList']
                 ]+Config::return_user_info('created_id','creater'));


             }

        }
//        else{

//
//        }
        //end file manger


       $deptIdList=CFlowGetContact::getDeptTreeIdList($flowdata['dept']);



        $insertdata=[
            'flowid' => new ObjectId($flowid),
            'name' => $designs['name'],
            'created_at' => MongoDateTrans::intToUTC(time()),
            'created_id' => Config::getUser()->id,
            'creater'=>Config::getUser()->name,
            'dept_id'=>$flowdata['dept'],

            'dept_id_list'=>$deptIdList,
            "company_id" => CCompany::getCompanyId(),
            'formdata' => $formdata,
            'desc' => $flowdata['desc'],
            'level'=> $flowdata['level'],
            'filelistlog'=>$filelistlog

            //date('Y-m-01 H:i:s',time())
        ]+Config::return_user_info('created_id','creater');



        //$whereboat=static::getWorkName($designs,$insertdata);
        //return $insertdata;


        if(!CFlowPreview::$isPreviewMode){

           $whereboat=static::getWorkName($designs,$insertdata);

//           Log::info($insertdata);
//           Log::info($whereboat);

            if(count($whereboat)){
                $whereboat[]=['flowid','=',$insertdata['flowid']];

                $where_run_index=[
                    ['a'=>'where',
                        'arr'=>
                            $whereboat
                    ]
                ];
                Log::info('$where_run_index');
                Log::info($where_run_index);

                if(Config::getmonconn()->sample_count(Config::$mongo_flowlists,$where_run_index)){
                    return JsonMessage::Creat(false,'出现重复文号['.$insertdata['workname'].']，请稍等重新提交试试');
                }
            }


            $FlowListid = Config::getmonconn()->sample_insert(Config::$mongo_flowlists,
                $insertdata
            );

            if(!!$FlowListid){
                CFormTempSave::deleteBycreat($insertdata['flowid']);
            }

            if(count($filelistlog)){
                CFiles::replaceFileSimulationID($flowdata['Simulation_id'],$FlowListid);
            }

        }else{
            $FlowListid=1;
        }
        //
        if (empty($FlowListid)) {
            return JsonMessage::Creat(false, '创建失败，请重新试试');
        }
        //$FlowOi=static::get($FlowListid);
        $insertdata['_id']=$FlowListid;
        $insertdata['created_at']=MongoDateTrans::ObjtoString($insertdata['created_at']);
        $FlowOi=$insertdata;

        Log::info('写入日志');


        list($msgObjlist)=CFlowMessageTo::simulataion_first_creat(
            $nowfun,
            $FlowOi,
            $designs,
            [[
                '_uuid'=>Config::getUser()->id,
                'name'=>Config::getUser()->name
            ]],
            [
                'hassend'=>1,
                'status'=>CFlowMessageTo::$status_finish_sim,
                'level'=>CFlowMessageTo::getlevel($flowdata['level'])
                //''
            ]
            );

        $firstmsgObj=$msgObjlist[0];


        //$lastmsgcreated_deptid = null;
        //$lastmsgcreated_id = null;
        //if (isset($firstmsgObj['dept_id'])) $lastmsgcreated_deptid = $firstmsgObj['dept_id'];
        //if (isset($firstmsgObj['created_id'])) $lastmsgcreated_id = $firstmsgObj['created_id'];


        static::$CBSLastmsgcreated_deptid=$flowdata['dept'];
        static::$CBSFirstcreated_deptid=$FlowOi['dept_id'];

        $ContactExplan= new CFlowGetContact(
            ['firstcreated_deptid' => $FlowOi['dept_id'],
                'firstcreated_userid' => $FlowOi['created_id'],
//            'lastmsgcreated_deptid' => $FlowOi['dept_id'],
////            'lastmsgcreated_id' => $FlowOi['created_id'],
                'lastmsgcreated_deptid' => $flowdata['dept'],
                'lastmsgcreated_id' => Config::getUser()->id,

                'formdata'=>CFlowDealerUtil::tranMongoToKey($formdata,$designs['datalist'])
            ],
            null,
            $designs['set']);



        list($messages, $messagescc) = CFlowMessageTo::CreatMessage(
            $designs,
            $ContactExplan,
            $FlowOi,
            $nowfun,
            $nextfuns,
            $firstmsgObj,
            $flowdata['dept']
        );


        $nextSonFlowsHistory=CFlowDealerUtil::creatSonFlow($nextSonFlows,$designs['name']);



        if(isset($nowfun['btnGroup'][$btnindex])){
            $buttonname=$nowfun['btnGroup'][$btnindex]['name'];
        }else{
            $buttonname=null;
        }

        CFlowLog::CreatLog(
            $flowid,
            $FlowListid,
            $firstmsgObj['_id'],
            CFlowLog::$source_type_creat,
            $inputdata,
            null,
            $nowfun['name'],
            null,
            $nowfun['id'],
            null,
            $buttonname,
            $messages,
            $messagescc,
            $nextSonFlowsHistory,
            null,
            $flowdata['dept']
        );



        if(!CFlowPreview::$isPreviewMode){
            static::FlowUnFinishNumber($FlowListid);
        }


        if (count($messages) == 0) {
            return JsonMessage::Creat(
                true,
                CFlowPreview::$isPreviewMode
                    ? '流程可创建;但是由于流程设计有问题，无下发环节（联系人）；请联系管理员编辑流程设置'
                    :'流程创建成功;但是由于流程设计有问题，无下发环节（联系人）；请联系管理员编辑流程设置',
                [
                    'flowname'=>$designs['name'],
                    'flowlistid' => $FlowListid,
                    'nextmessage' => $messages,
                    'cc' => $messagescc,
                    'nextSonFlows'=>$nextSonFlows,
                    'sonflows'=>$nextSonFlowsHistory
                ]
            );
        } else {

            return JsonMessage::Creat(true, CFlowPreview::$isPreviewMode?'流程可创建':'流程创建成功',
                [
                    'flowname'=>$designs['name'],
                    'flowlistid' => $FlowListid,
                    'nextmessage' => $messages,
                    'cc' => $messagescc,
                    'nextSonFlows'=>$nextSonFlows,
                    'sonflows'=>$nextSonFlowsHistory
                ]
            );
        }


    }



//    filling(value, len) {
//            let difflen = len - (value + '').length;
//            if (difflen > 0) {
//                let str = '';
//                for (let i = 0; i < difflen; i++) {
//                    str += '0';
//                }
//                return str + value;
//            }
//            return value;
//        },

    static private function fillFullZero($value,$len){
        $difflen=$len-strlen($value);//null -1 =-1
        if($difflen>0){
            $str='';
            for ($x=0;$x<$difflen;$x++){
                $str.='0';
            }
            return $str.$value;
        }
        return $value;
    }

    static public function getWorkName($designs,&$insertData){


        $whereBoat=[];

        //$RunIndex=null;//null+10=10

        if(isset($designs['set']['workname'])){
            $workNameSet=$designs['set']['workname'];
        }else{

            $workNameSet=[
                'auto_name'=>'{Y}{M}{D}{H}{I}{S}{RUN}',
                'auto_len'=>4,
                'auto_step'=>1,
            ];
        }

//        date('Y-m-d H:i:s',time())
        if(strpos($workNameSet['auto_name'],"{Y}")!==false){
            $workNameSet['auto_name']=str_replace('{Y}',date('Y',time()),$workNameSet['auto_name']);
        }

        if(strpos($workNameSet['auto_name'],"{M}")!==false) {
            $workNameSet['auto_name']=str_replace('{M}',date('m',time()),$workNameSet['auto_name']);
        }


        if(strpos($workNameSet['auto_name'],"{D}")!==false) {
            $workNameSet['auto_name']=str_replace('{D}',date('d',time()),$workNameSet['auto_name']);
        }

        if(strpos($workNameSet['auto_name'],"{H}")!==false) {
            $workNameSet['auto_name']=str_replace('{H}',date('H',time()),$workNameSet['auto_name']);
        }

        if(strpos($workNameSet['auto_name'],"{I}")!==false) {
            $workNameSet['auto_name']=str_replace('{I}',date('i',time()),$workNameSet['auto_name']);
        }

        if(strpos($workNameSet['auto_name'],"{S}")!==false) {
            $workNameSet['auto_name']=str_replace('{S}',date('s',time()),$workNameSet['auto_name']);
        }


        if(strpos($workNameSet['auto_name'],"{F}")!==false) {
            $workNameSet['auto_name']=str_replace('{F}',$designs['name'],$workNameSet['auto_name']);
        }

        if(strpos($workNameSet['auto_name'],"{U}")!==false) {
            $workNameSet['auto_name']=str_replace('{U}',$insertData['creater'],$workNameSet['auto_name']);
        }

        if(strpos($workNameSet['auto_name'],"{SD}")!==false) {
            $workNameSet['auto_name']=str_replace('{SD}',implode('',CDept::getDeptNamesByIDs($insertData['dept_id'])),$workNameSet['auto_name']);
        }

        if(strpos($workNameSet['auto_name'],"{LD}")!==false) {
            $workNameSet['auto_name']=str_replace('{LD}',implode('-',CDept::getDeptNamesByIDs($insertData['dept_id_list'])),$workNameSet['auto_name']);
        }







        $select=[];
        if(strpos($workNameSet['auto_name'],"{RUN}")!==false){
            $select[]='RunIndex';
        }
        if(strpos($workNameSet['auto_name'],"{N}")!==false){
            $select[]='RunIndexN';
        }
        if(strpos($workNameSet['auto_name'],"{NY}")!==false){
            $select[]='RunIndexNY';
        }
        if(strpos($workNameSet['auto_name'],"{NM}")!==false){
            $select[]='RunIndexNM';
        }
        if(strpos($workNameSet['auto_name'],"{NW}")!==false){
            $select[]='RunIndexNW';
        }
        if(strpos($workNameSet['auto_name'],"{ND}")!==false){
            $select[]='RunIndexND';
        }



        if(
            count($select)>0
        ) {
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['flowid','=',$insertData['flowid']]
                        ]
                ]
            ];
            $select[]='created_at';

            $returns= Config::getmonconn()->sample_get(Config::$mongo_flowlists,
                $select,
                $where,
                null,
                '$natural',
                1,
                [0,1]
            );

            Log::info('$returns2');
            Log::info($returns);

            if(count($returns)==0){

                $lastItem=[
                    'created_at'=>MongoDateTrans::intToUTC(time()),
                ];
            }else{
                $lastItem=$returns[0];
            }



            if(strpos($workNameSet['auto_name'],"{RUN}")!==false){
                $RunIndex=null;
                if(isset($lastItem['RunIndex'])){
                    $RunIndex=$lastItem['RunIndex'];
                }
                $RunIndex++;
                $whereBoat[]=['RunIndex','=',$RunIndex];
                $workNameSet['auto_name']=str_replace('{RUN}',static::fillFullZero($RunIndex,$workNameSet['auto_len']),$workNameSet['auto_name']);
            }

            $auto_step=(!isset($workNameSet['auto_step'])||$workNameSet['auto_step']<=0)?1:$workNameSet['auto_step'];

            if(strpos($workNameSet['auto_name'],"{N}")!==false){
                $RunIndexN=null;
                if(isset($lastItem['RunIndexN'])){
                    $RunIndexN=$lastItem['RunIndexN'];
                }
                $RunIndexN+=$auto_step;
                $whereBoat[]=['RunIndexN','=',$RunIndexN];
                $workNameSet['auto_name']=str_replace('{N}',static::fillFullZero($RunIndexN,$workNameSet['auto_len']),$workNameSet['auto_name']);
            }

            $tolist=[
                ['key'=>'RunIndexNY','str'=>"{NY}",'datestr'=>'Y'],
                ['key'=>'RunIndexNM','str'=>"{NM}",'datestr'=>'m'],
                ['key'=>'RunIndexNW','str'=>"{NW}",'datestr'=>'W'],
                ['key'=>'RunIndexND','str'=>"{ND}",'datestr'=>'z'],
            ];

            foreach ($tolist as $to){

                if(strpos($workNameSet['auto_name'],$to['str'])!==false){
                    $RunIndex=null;
                    if(isset($lastItem[$to['key']])){
                        $RunIndex=$lastItem[$to['key']];
                    }
                    if(MongoDateTrans::UTCToString($lastItem['created_at'],$to['datestr'])!=date($to['datestr'],time())){
                        $RunIndex=0;
                    }
                    $RunIndex+=$auto_step;
                    $whereBoat[]=[$to['key'],'=',$RunIndex];
                    $workNameSet['auto_name']=str_replace($to['str'],static::fillFullZero($RunIndex,$workNameSet['auto_len']),$workNameSet['auto_name']);
                }

            }



        }


        $insertData['workname']=$workNameSet['auto_name'];
        foreach ($whereBoat as $item){
            $insertData[$item[0]]=$item[2];
        }

        $addwhereBoat=[];

        foreach ($whereBoat as $item){

            if(
            $item[0]=='RunIndexNY'
            ){


                $addwhereBoat[]=['created_at','>=',MongoDateTrans::intToUTC(mktime(0,0,0,1,1,date('Y')))];
                $addwhereBoat[]=['created_at','<',MongoDateTrans::intToUTC(mktime(0,0,0,1,1,date('Y')+1))];

            }

            if(
                $item[0]=='RunIndexNM'
            ){


                $addwhereBoat[]=['created_at','>=',MongoDateTrans::intToUTC(mktime(0,0,0,date('m'),1,date('Y')))];
                $addwhereBoat[]=['created_at','<',MongoDateTrans::intToUTC(mktime(0,0,0,date('m')+1,1,date('Y')))];
            }


            if(
                $item[0]=='RunIndexNW'
            ){


                $addwhereBoat[]=['created_at','>=',MongoDateTrans::intToUTC(mktime(0,0,0,date('m'),date('d')-date('w')+1,date('Y')))];
                $addwhereBoat[]=['created_at','<',MongoDateTrans::intToUTC(mktime(0,0,0,date('m'),date('d')-date('w')+8,date('Y')))];
            }

            if(
                $item[0]=='RunIndexND'
            ){


                $addwhereBoat[]=['created_at','>=',MongoDateTrans::intToUTC(mktime(0,0,0,date('m'),date('d'),date('Y')))];
                $addwhereBoat[]=['created_at','<',MongoDateTrans::intToUTC(mktime(0,0,0,date('m'),date('d')+1,date('Y')))];
            }



        }






        return array_merge($whereBoat,$addwhereBoat);


    }


}
