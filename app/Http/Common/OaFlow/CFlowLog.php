<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CDept;
use App\Http\Common\utils\MongoDateTrans;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;

class CFlowLog
{

    static public $ObjectI = [];

    public $FlowId = null;
    public $FlowListid = null;
    public $FlowMsgid = null;
    public $type = null;
    public $FormData = null;
    public $suggest = null;
    public $buttonname = null;
    public $nextmsg = null;
    public $nextcc = null;
    public $sonFlows=null;

    public $PreFunName = null;
    public $NowFunName = null;
    public $PreFunId = null;
    public $NowFunId = null;


    public $msg = null;
    public $msgList = [];
    public $deptid=null;


    public function addmsg($msg)
    {
        array_push($this->msgList, $msg);
        return $this;
    }

    public function __construct()
    {
    }

    public function logInfo()
    {
        return static::CreatLog(
            $this->FlowId,
            $this->FlowListid,
            $this->FlowMsgid,
            $this->type,
            $this->FormData,
            $this->PreFunName,
            $this->NowFunName,
            $this->PreFunId,
            $this->NowFunId,
            $this->suggest,
            $this->buttonname,
            $this->nextmsg,
            $this->nextcc,
            $this->sonFlows,
            $this->msg . (count($this->msgList) == 0 ? '' : (!!$this->msg ? '|' : '') . implode('|', $this->msgList)),
            $this->deptid
        );
    }


    static $pagesize = 20;

    static $source_type_creat = [1,'创建'];
    static $source_type_sure = [2,'审核'];
    static $source_type_cancel = [3,'取消'];
    static $source_type_cancelforrevoke = [7,'撤回后系统取消'];

    static $source_type_sure_or = [4,'或签审核'];
    static $source_type_sure_and = [5,'会签审核'];
    static $source_type_revoke = [6,'撤回'];




    static public function formSetToDataList($list){
        $datalist = [];
        foreach ($list as $key => $item) {
            if ($item['type'] == 'grid' && isset($item['columns'])) {
                if (count($item['columns'])) {
                    foreach ($list[$key]['columns'] as $key2 => $list2) {
                        if (count($list[$key]['columns'][$key2]['list'])) {
                            $datalist = array_merge($datalist, static::formSetToDataList($list[$key]['columns'][$key2]['list']));
                        }
                    }
                }

            } else {

                if($item['type'] == 'placeholderhtml')continue;
                array_push($datalist, $item);
            }
        }
        return $datalist;
    }


    static public function tranformDataTo($FormData, $designs)
    {
        //$designs['formset']
        $dataList=static::formSetToDataList($designs['formset']['list']);

        Log::info('$FormData');
        Log::info($FormData);
        Log::info('$dataList');
        Log::info($dataList);

        $newFormData = [];
        foreach ($FormData as $key => $value) {
            $hasfind = false;
            foreach ($dataList as $item) {
                if ($item['model'] == $key) {
                    $hasfind = true;


                    $nowLimitItem=null;
                    if(isset($designs['set']['formEditLimit'])){
                        foreach ($designs['set']['formEditLimit'] as $limititem){
                            if($limititem['key']==$item['key']){
                                $nowLimitItem=$limititem;
                                //$defaultTableSon=$item['son'];
                                break;
                            }
                        }
                    }



                    $v=self::trans_str($item,$value,$nowLimitItem);
                    $insert=['n' => $item['name'],
                        'h'=>!empty($nowLimitItem)?(($nowLimitItem['type']=='hidden')?1:0):0,
                        'v' => $value,
                        'm' => $key ,
                        't'=>$item['type']];
                    //'str'=>self::trans_str($item,$value)
                    if($v!=$value){
                        $insert['str']=$v;
                    }
                    array_push($newFormData, $insert);
                }
            }
            if ($hasfind == false) {
                Log::alert('报错：发现其中有表单值没有被查询到');
                array_push($newFormData, ['n' => '', 'v' => $value, 'm' => $key]);
            }
        }
        return $newFormData;
    }


    static public function trans_str($formsetItem,$value,$nowLimitItem){



        switch ($formsetItem['type'])
        {
            case 'custom':

                if(is_array($value)&&in_array($formsetItem['options']['componentName'],['chose-depts','chose-users'])){

                    return collect($value)->map(function ($item) {
                        return $item['name']??'';
                    })->implode(',');

//                    $strlist=[];
//                    foreach ($value as $item){
//                        $strlist[]=$item['name'];
//                    }
//                    return implode(',',$strlist);
                }

                if(is_array($value)&&$formsetItem['options']['componentName']=='chose-contact'){

                        return collect($value)->map(function ($item) {
                            return $item['name']??'';
                        })->implode(' or ');


                }

                break;
        case 'table':

            $newtableset=[];

            if(empty($nowLimitItem)){
                $defaultTableSon=[];
            }else{
                $defaultTableSon=$nowLimitItem['son'];
            }

            foreach ($formsetItem['options']['tableset'] as $item){
                $show=true;
                foreach ($defaultTableSon as $son){
                    if($son['key']==$item['code']){
                        if($son['type']=='hidden'){
                            $show=false;
                        }
                        break;
                    }
                }
                array_push($newtableset,['hide'=>!$show,'code'=>$item['code'],'name'=>$item['name'],'width'=>$item['width']]);
            }
            return [
                'set'=>$newtableset
            ];
            break;
        default:
        }



        //$formsetItem

        if(isset($formsetItem['options']['options'])){

            $labelArr=[];

            if(is_array($value)){
                $valuelist=$value;
            }else{
                $valuelist=[$value];
            }

            foreach ($valuelist as $key=>$item){
                $hasfind=false;
                foreach ($formsetItem['options']['options'] as $option){
                    if($item==$option['value']){
                        $hasfind=true;
                        if($formsetItem['options']['showLabel']){
                            array_push($labelArr,isset($option['label'])?$option['label']:$option['value']);
                        }
                        break;
                    }
                }
                if(!$hasfind){
                    array_push($labelArr,$item);
                }
            }
            //if(count($labelArr)){
                return implode(',',$labelArr);
            //}
        }
        return $value;
    }


    static public function lists($nowpage, $where = null, $pagesize = null)
    {

        $nowpage = !!$nowpage ? $nowpage : 1;

        $pagesize = $pagesize === null ? static::$pagesize : $pagesize;

        $totalItems = Config::getmonconn()->sample_count(Config::$mongo_flowlogs);


        $result = Config::getmonconn()->sample_get(Config::$mongo_flowlogs, ['*'],
            $where,
            null,
            'created_at',
            1,
            [($nowpage - 1) * $pagesize, $pagesize]
        )->all();


        static::filterResult($result);

        return [
            'result' => $result,
            'totalItems' => $totalItems,
            'pageSize' => static::$pagesize,
            'currentPage' => $nowpage];

//        $totalItems= await ctx.mongo.db('oa').collection('flowdesigns').find().count();
//        DB::connection('mongodb')->collection('flowdesigns')->get()
    }


    static public function filterResult(&$result)
    {
        foreach ($result as $key => $item) {
            $result[$key]['_id'] = (string)$result[$key]['_id'];
            $result[$key]['flowid'] = (string)$result[$key]['flowid'];
            $result[$key]['flowlistid'] = (string)$result[$key]['flowlistid'];
            if(isset($result[$key]['flowmsgid'])){
                $result[$key]['flowmsgid'] = (string)$result[$key]['flowmsgid'];
            }

            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }
    }


    static public function getlastLog($flowlistid)
    {

        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['flowlistid', '=', new ObjectId($flowlistid)]
                    ]
            ]
        ];

        $result = Config::getmonconn()->sample_get(Config::$mongo_flowlogs, ['*'],
            $where,null,'$natural',1,[0,1]
        )->all();


        static::filterResult($result);

        foreach ($result as $key=>$item){

            unset($result[$key]['nextmsg']);
            unset($result[$key]['nextcc']);
        }

        if (count($result)) {
            return $result[0];
        } else {
            return null;
        }

    }

    static public function get($_id, $ForcedRefresh = false, $select = ['*'])
    {
        if ($_id == null) {
            return null;
        }
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


        $result = Config::getmonconn()->sample_get(Config::$mongo_flowlogs, $select,
            $where
        )->all();


        static::filterResult($result);

        if (count($result) == 0) {
            return null;
        } else {
            static::$ObjectI[$_id] = $result[0];
            return static::$ObjectI[$_id];
        }
    }

    //
    static public function CreatRevokeLog($FlowId,$FlowListid,$FlowMsgid,
                                          $type,
                                          $reason,
                                          $history){

        if(CFlowPreview::$isPreviewMode)return;

        $FlowLogid = Config::getmonconn()->sample_insert(Config::$mongo_flowlogs,
            [
                'flowid' => new ObjectId($FlowId),//null,//
                'flowlistid' => new ObjectId($FlowListid),
                'flowmsgid' => empty($FlowMsgid)?null:new ObjectId($FlowMsgid),
                'type' => $type[1],
                'type2' => $type[0],
                'reason'=>$reason,
                'history'=>$history,
                'created_at' => MongoDateTrans::intToUTC(time()),
                'created_id' => Config::getUser()->id,
                'dept'=>CDept::getMyDepts(Config::getUser()->id),
                'creater' => Config::getUser()->name,
                "company_id" => CCompany::getCompanyId(),
                //date('Y-m-01 H:i:s',time())
            ]+Config::return_user_info('created_id','creater')
        );
        return $FlowLogid;

    }

    static public function CreatCancelLog($FlowId,$FlowListid,$type,$reason,$history,$newmsgidlist){

        if(CFlowPreview::$isPreviewMode)return;

        $FlowLogid = Config::getmonconn()->sample_insert(Config::$mongo_flowlogs,
            [
                'flowid' => new ObjectId($FlowId),
                'flowlistid' => new ObjectId($FlowListid),
                'flowmsgids' => $newmsgidlist,
                'type' => $type[1],
                'type2' => $type[0],
                'reason'=>$reason,
                'history'=>$history,

                'created_at' => MongoDateTrans::intToUTC(time()),
                'created_id' => Config::getUser()->id,
                'creater' => Config::getUser()->name,
                'dept'=>CDept::getMyDepts(Config::getUser()->id),
                "company_id" => CCompany::getCompanyId(),
                //date('Y-m-01 H:i:s',time())
            ]+Config::return_user_info('created_id','creater')
        );
        return $FlowLogid;

    }


    static public function CreatLog($FlowId,
                                    $FlowListid,
                                    $FlowMsgid,
                                    $type,
                                    $FormData,
                                    $PreFunName = null,
                                    $NowFunName = null,
                                    $PreFunId=null,
                                    $NowFunId=null,
                                    $suggest = null,
                                    $buttonname = null,
                                    $nextmsg = null,
                                    $nextcc = null,
                                    $sonFlow=null,
                                    $msg = null,
                                    $deptid=null
    )
    {
        if(CFlowPreview::$isPreviewMode)return;


        $designs = CFlowDesigns::get($FlowId);




////        Log::info(Config::getUser()->id);
////        Log::info(CDept::getMyDepts(Config::getUser()->id));
////
        $deptname= CDept::getName($deptid);
        if(empty($deptname)){
            $depts=CDept::getMyDepts(Config::getUser()->id);
        }else{
            $depts=[['v'=>$deptid,'n'=>$deptname]];
        }


        $insertdata= [
            'flowid' => new ObjectId($FlowId),
            'flowlistid' => new ObjectId($FlowListid),
            'flowmsgid' => empty($FlowMsgid)?null:new ObjectId($FlowMsgid),
            'button' => $buttonname,
            'PreFunName' => $PreFunName,
            'NowFunName' => $NowFunName,
            'PreFunId'=>$PreFunId,
            'NowFunId'=>$NowFunId,
            'created_at' => MongoDateTrans::intToUTC(time()),
            'created_id' => Config::getUser()->id,
            'creater' => Config::getUser()->name,
            'depts'=>$depts,
            "company_id" => CCompany::getCompanyId(),
            'formdata' =>//CFlowDealerUtil::tranModalToMongo($FormData,$designs['datalist']),
                static::tranformDataTo($FormData, $designs),
            'suggest' => $suggest,
            'type' => $type[1],
            'type2' => $type[0],
            'nextmsg' => $nextmsg,
            'nextcc' => $nextcc,
            'msg' => $msg,
            'sonflow'=>$sonFlow
            //date('Y-m-01 H:i:s',time())
        ]+Config::return_user_info('created_id','creater');

//        Log::info($insertdata);


        $FlowLogid = Config::getmonconn()->sample_insert(Config::$mongo_flowlogs,
            $insertdata
        );
        return $FlowLogid;
    }

}
