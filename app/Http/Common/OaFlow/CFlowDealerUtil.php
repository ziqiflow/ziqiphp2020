<?php


namespace App\Http\Common\OaFlow;

use App\Http\Common\Base\CDept;
use App\Http\Common\JsonMessage;
use \App\Http\Common\Base\Config as ConfigBase;

use App\Http\Tool\Evaluator;
use function foo\func;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;

class CFlowDealerUtil
{

    static public $SonFlowidList=[];


    static public function isBelongDeptbydept($nowdeptId,$dept_id){

        if ($dept_id==CDept::$default_root_d_id){
            return true;
        }

        if ($nowdeptId==$dept_id){
            return true;
        }

        $deptTree=CDept::getTreeDeptList();

        //dd($deptTree);

        //dd(static::findDeptInDeptTree($deptTree,$dept_id));

        return static::hasExistInDeptTree(
            static::findDeptInDeptTree($deptTree,$dept_id),
            $nowdeptId
        );

    }

    static public function isBelongDept($e_id,$dept_id,$coverageNum=9999){

        //Log::info('$coverageNum');
        //Log::info($coverageNum);

//        if ($dept_id==CDept::$default_root_d_id){
//            return true;
//        }

        //'name','_uuid','parent_id','index'
        //$deptList= CDept::getDeptList();

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['e_id','=',$e_id]
                    ]
            ]
        ];
        $getbacks= ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employee_department_rl,['d_id'],$where);

        if(count($getbacks)==0){
            return false;
        }
        //----->end

        //dd($getbacks);
        if($dept_id==CDept::$default_root_d_id){
            $deptTree= CDept::getTreeDeptList();
        }else{
            $deptTree=static::findDeptInDeptTree(CDept::getTreeDeptList(),$dept_id);
        }

        foreach ($getbacks as $mydept){

            $mydeptid=$mydept->d_id;

            if($mydeptid==$dept_id){
                return true;
            }


            //dd($deptTree);
            //dd(static::findDeptInDeptTree($deptTree,$dept_id));
            if($coverageNum>1&&static::hasExistInDeptTree(
                $deptTree,
                $mydeptid,
                $coverageNum-1
            )){
                return true;
            }
        }
        return false;
    }


    static private function findDeptInDeptTree($depttree,$dept_id){

        foreach ($depttree as $item){
            //var_dump($item->_uuid);
            if($item->_uuid==$dept_id){
                if(isset($item->children)){
                    return $item->children;
                }else
                {
                  return [];
                }
            }
            if(isset($item->children)){
                $back= static::findDeptInDeptTree($item->children,$dept_id);
                if(count($back)>0)return $back;
                //return
            }
        }

        return [];
    }


    static private function hasExistInDeptTree($depttree,$dept_id,$coverageNum=9999){

        $coverageNum--;

        foreach ($depttree as $item){


            if($item->_uuid==$dept_id){
               return true;
            }
            if(isset($item->children)){
                if($coverageNum>0){
                    if(static::hasExistInDeptTree($item->children,$dept_id)){
                        return true;
                    }

                }

                //return static::hasExistInDeptTree($item->children,$dept_id);
            }

        }

        return false;

    }





    static private function getChosedUserList($chosed,$FlowId,$FlowListid,$flowmsgid,$testData=null){

        if($chosed['type']=='fun'){


            if($chosed['id']=='directSuperByCreat'){

                return CConcatFunList::directSuperByCreat($FlowId,$FlowListid,$flowmsgid,$testData);
            }
        }


        if($chosed['type']=='dept'){

            if($chosed['id']==CDept::$default_root_d_id){

                $users= ConfigBase::getconn()->sample_get(
                    ConfigBase::$db_erp_employees,
                    ['_uuid as id']
                );
                return $users;
            }
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['d_id','=',$chosed['id']]
                        ]
                ]
            ];
            $users= ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employee_department_rl,['e_id as id'],$where);
            return $users;
        }

        if($chosed['type']=='user'){
            $data= new \stdClass();
            $data->id=$chosed['id'];
            return [$data];
        }

        if($chosed['type']=="role"){
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['r_id','=',$chosed['id']]
                        ]
                ]
            ];
            $users= ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employee_role_rl,['e_id as id'],$where);
            return $users;
        }
    }



    static private function CheckChosedPermission($e_id,$chosed,$realData=null,$testData=null){

         if(!!$testData){
            $data=$testData;
         }
         else{
            $data=$realData;
         }

        if($chosed['type']=='fun'){


//            if($chosed['id']=='directSuperByCreat'){

//                $backlist= CConcatFunList::directSuperByCreat($FlowId,$FlowListid,$flowmsgid,$testData);
//                foreach ($backlist as $item){
//                        if($e_id==$item->id){
//                            return true;
//                        }
//                }
//            }
            return false;
        }

        if($chosed['type']=='dept'){

            if(empty($chosed['data']['coverage'])||$chosed['data']['coverage']=='n'){
                if($chosed['id']==CDept::$default_root_d_id){

                    return true;
                }else{
                    return static::isBelongDept($e_id,$chosed['id']);
                }
            }else{
                return static::isBelongDept($e_id,$chosed['id'],$chosed['data']['coverage']);
            }

        }

        if($chosed['type']=='user'){
            if($chosed['id']==$e_id){
                return true;
            }else{
                return false;
            }
        }


        if($chosed['type']=="role"){
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['r_id','=',$chosed['id']],
                            ['e_id','=',$e_id]
                        ]
                ]
            ];
            return ConfigBase::getconn()->sample_count(ConfigBase::$db_erp_employee_role_rl,$where);
        }

        return false;
    }

    static private function chosedHasPermission($e_id
        ,$contact

        ,$realData=null
        ,$testData=null){

        if ($contact['chosetype'] == 'and') {
            foreach ($contact['chosed'] as $chosed) {
                if (!static::CheckChosedPermission($e_id, $chosed, $realData, $testData)) {
                    return false;
                }
            }

            return true;
        }

        if ($contact['chosetype'] == 'or') {

            foreach ($contact['chosed'] as $chosed) {
                if( static::CheckChosedPermission($e_id, $chosed, $realData, $testData)){
                    return true;
                }
            }
            return false;

        }

    }



    static public function contactHasPermission($e_id
        ,$contactdata
//        ,$FlowId
//        ,$FlowListid=null
//        ,$flowmsgid=null
        ,$realData=null
        ,$testData=null
    ){

        //$hasPerStatusRoot=false;
        foreach ($contactdata as $contact) {


           $backinfo=static::chosedHasPermission($e_id
                ,$contact
                ,$realData
                ,$testData);
           if($backinfo){
               return true;
           }
        }
        return false;
    }

    //model:input_1546170323000_3614
    //keyindex:1
    //key:"1546170323000_3614"
    //mongo:i_1(i+keyindex)

//    static public function


    static public function tranModalToMongo($FormData,$dataList,$requireData=null){
        $newFormData=[];
        foreach ($FormData  as $key=>$value){
            $hasfind=false;
            foreach ($dataList as $item){
                if($item['model']==$key){
                    $hasfind=true;
                    if($requireData===null){

                        $newFormData['i_'.$item['index']]=$value;

                    }else{

                        foreach ($requireData as $reqdata){
                            if($reqdata==$item['key']){
                                $newFormData['i_'.$item['index']]=$value;
                                break;
                            }
                        }

                    }

                    break;
                }
            }
            if($hasfind==false){
                Log::alert('报错：发现其中有表单值没有被查询到;key:'.$key);
                //$newFormData[$key]=$value;
            }
        }
        return $newFormData;
    }



    static public function tranModalToMongo2($FormData,$dataList,$formEditLimit=null){
        $newFormData=[];
        foreach ($FormData  as $key=>$value){
            $hasfind=false;
            foreach ($dataList as $item){
                if($item['model']==$key){
                    $hasfind=true;
                    if($formEditLimit===null){

                        $newFormData['i_'.$item['index']]=$value;

                    }else{

                        foreach ($formEditLimit as $formEdit){
                            if($formEdit['key']==$item['key']&&$formEdit['type']=='canedit'){
                                $newFormData['i_'.$item['index']]=$value;
                                break;
                            }
                        }

                    }

                    break;
                }
            }
            if($hasfind==false){
                Log::alert('报错：发现其中有表单值没有被查询到;key:'.$key);
                //$newFormData[$key]=$value;
            }
        }
        return $newFormData;
    }

    static public function tranMongoToKey($FormData,$dataList){
        $newFormData=[];
        foreach ($FormData  as $key=>$value){
            $hasfind=false;
            foreach ($dataList as $item){
                if('i_'.$item['index']==$key){
                    $hasfind=true;
                    $newFormData[$item['key']]=$value;
                }
            }
            if($hasfind==false){
                Log::alert('报错：发现其中有表单值没有被查询到');
                $newFormData[$key]=$value;
            }
        }
        return $newFormData;
    }


    //
    static public function tranMongoToModel($FormData,$dataList){
        $newFormData=[];
        foreach ($FormData  as $key=>$value){
            $hasfind=false;
            foreach ($dataList as $item){
                if('i_'.$item['index']==$key){
                    $hasfind=true;
                    $newFormData[$item['model']]=$value;
                }
            }
            if($hasfind==false){
                Log::alert('报错：发现其中有表单值没有被查询到');
                $newFormData[$key]=$value;
            }
        }
        return $newFormData;
    }

    static public function tranMongo_to_list($submitformdata,$dataList){

        foreach ($dataList as $key=>$list){

            $dataList[$key]['value']=null;
            foreach ($submitformdata as $key2=>$value2){

                if('i_'.$list['index']==$key2){
                    $dataList[$key]['value']=$value2;
                    break;
                }

            }

        }
        return $dataList;
    }

    static function creatSonFlow($nextSonFlows,$flowname){
        if(CFlowPreview::$isPreviewMode){
            return [];
        }
        //$SonFlowlimit
        $history=[];
        foreach ($nextSonFlows as $sonFlow){

            //Log::info($sonFlow['v']);
            //Log::info('hasInPreviewSonFlow'.!CFlowPreview::hasInPreviewSonFlow($sonFlow['v']));


            list($can, $level)=CFlowPreview::hasInPreviewSonFlow($sonFlow['v']);

            if(!$can)continue;



            foreach (static::$SonFlowidList as $item){
                if($item==$sonFlow['v']){

                    return $history;
                }
            }

            array_push(static::$SonFlowidList,$sonFlow['v']);



           // CFlowList::$CreatMode=CFlowList::$CreatModeSystem;
            //Config::getUser()->id=null;


            try{
                $FlowInfo=CFlowList::CreatBySystem(
                    $sonFlow['v'],
                    $level,
                    '【系统创建|属子流程】来自'.$flowname
                );
            }catch (\Exception $e){
                Log::error($e->getFile().'------'.$e->getMessage().'-------'.$e->getLine());
                $FlowInfo=JsonMessage::Creat(false,$e->getMessage());
            }

            //CFlowList::$CreatMode=CFlowList::$CreatModeUser;

            //Config::getUser()->init();

            array_push($history,[
                'flowid'=>$sonFlow['v'],
                'msg'=>$FlowInfo['msg'],
                'level'=>$level,
                'flowname'=>$sonFlow['n'],
                'flowlistid'=>$FlowInfo['success']?$FlowInfo['data']['flowlistid']:null
            ]);
        }
        //Log::info('history');
        //Log::info($history);
        //dd('dd');
        return $history;
    }



    static function getnowfun_nextfun($designer,$nowfunID,$BtnIndex,$formdata){
        $nowfun=null;
        if(!$nowfunID){
            foreach ($designer['funlist'] as $item){
                if($item['is_start']){
                    $nowfun=$item;
                }
            }
        }else{
            foreach ($designer['funlist'] as $item){
                if($item['id']==$nowfunID){
                    $nowfun=$item;
                }
            }
        }


        if (empty($nowfun)){
            return [null,[],[]];
        }


        if(!isset($nowfun['btnGroup'][$BtnIndex])){
            return [null,[],[]];
        }


        if(!$nowfun['is_start']&&$nowfun['dealtype']==CFlowMessageTo::$dealtype_message){
            return [$nowfun,[],[]];
        }

        $ClickBtn=$nowfun['btnGroup'][$BtnIndex];
        CFlowPreview::initbtninfo($ClickBtn);

        $nextFunIdList=[];
        $nextSonFlowList=[];

        $formdataList=static::tranMongo_to_list($formdata,$designer['datalist']);
        Log::info('$formdataList');
        Log::info($formdataList);

        if(count($ClickBtn['NextFun'])){
            //
            foreach ($ClickBtn['NextFun'] as $mayNextfun){
                if(static::evelfunif($mayNextfun['if'],$formdataList)){
                    $nextFunIdList=array_merge($nextFunIdList,$mayNextfun['funId']);

                    if(!empty($mayNextfun['SonFlowId'])){
                        $nextSonFlowList=array_merge($nextSonFlowList,$mayNextfun['SonFlowId']);
                    }
                    //array_push($nextFunIdList,$mayNextfun['funId']);
                    //break;
                }
            }
        }


        if(
            count($nextFunIdList)==0&&count($nextSonFlowList)==0
        ){


            if(!empty($ClickBtn['defaultFunId'])){

                if(!is_array($ClickBtn['defaultFunId'])){
                    $ClickBtn['defaultFunId']=[$ClickBtn['defaultFunId']];
                }
                $nextFunIdList=array_merge($nextFunIdList,$ClickBtn['defaultFunId']);
    //            array_push($nextFunIdList,$ClickBtn['defaultFunId']);
            }


            if(!empty($ClickBtn['defaultSonFlowId'])) {

                $nextSonFlowList = array_merge($nextSonFlowList, $ClickBtn['defaultSonFlowId']);
                //            array_push($nextFunIdList,$ClickBtn['defaultFunId']);
            }
        }

        if(isset($ClickBtn['handler'])&&isset($ClickBtn['handler']['funId'])){
            $nextFunIdList=array_merge($nextFunIdList,$ClickBtn['handler']['funId']);
        }

        if(isset($ClickBtn['handler'])&&isset($ClickBtn['handler']['SonFlowId'])){
            $nextSonFlowList=array_merge($nextSonFlowList,$ClickBtn['handler']['SonFlowId']);
        }



        //Log::info('$nextFunIdList');
        //Log::info($nextFunIdList);
        //Log::info('$nextSonFlowList');
        //Log::info($nextSonFlowList);



        if(count($nextFunIdList)==0)
        {
            return [$nowfun,[],$nextSonFlowList];
        }
//       Log::info($nextFunIdList);
        $nextFunIdList=array_unique($nextFunIdList);

        $nextfun=[];
        foreach ($nextFunIdList as $item)
        {
            foreach ($designer['funlist'] as $fun){
                if($item==$fun['id']){
                    array_push($nextfun,$fun);
                    break;
                }
            }
        }
        return [$nowfun,$nextfun,$nextSonFlowList];

    }

    private static function findFunById($funlist,$id){

        foreach ($funlist as $fun){
            if($fun['id']==$id)
            {
               return $fun;
            }
        }
        return null;
    }

    private static function getAllNextFun($fun){

        if(!$fun['is_start'] && $fun['dealtype']=='message')return [];

        $funids=[];

        foreach ($fun['btnGroup'] as $k=>$btn){

            $funids =array_merge($funids,$btn['defaultFunId']);

            if(isset($btn['NextFun'])){
                foreach ($btn['NextFun'] as $NextFun){
                    $funids =array_merge($funids,$NextFun['funId']);
                }
            }

            if(isset($btn['handler']['funId'])){
                $funids =array_merge($funids,$btn['handler']['funId']);
            }

        }

       return array_values(array_unique($funids));


    }


    private static $FindNextFunTimer=0;

    private static function hasInNextFun($funlist,$unFinishedFunId,$tofunids,$fathers=[]){
        static::$FindNextFunTimer++;
        Log::info('当前查找'.$unFinishedFunId);
        if(in_array($unFinishedFunId,$tofunids))return true;
        if(in_array($unFinishedFunId,$fathers))return false;


        $unFinishedFun=static::findFunById($funlist,$unFinishedFunId);

        if(empty($unFinishedFun))return false;

        $nextfunids= static::getAllNextFun($unFinishedFun);
        if(in_array($unFinishedFunId,$nextfunids)){
            $nextfunids=array_values(array_diff($nextfunids,[$unFinishedFunId]));
        }
        Log::info('他的所有下一级流程节点');
        Log::info($nextfunids);


        foreach ($nextfunids as $funid){
            if(in_array($funid,$tofunids)){
                return true;
            }
            else{
                array_push($fathers,$unFinishedFunId);
                if(static::hasInNextFun($funlist,$funid,$tofunids,$fathers)){
                    return true;
                }
            }
        }
        return false;
    }



    static function getFinishedMergeMsgIds($flowlistid,$merge_list,$PreviousFun){



        $where_merge=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowlistid','=',new ObjectId($flowlistid)],
                        ['nextmsg.dealtype','=',CFlowMessageTo::$dealtype_wait_merge],
                    ]
            ],
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['NowFunId',  array_values(array_diff($merge_list,[$PreviousFun['id']]))],



                    ]
            ]
        ];
        //Log::info($where_merge);


        $flowlogs= Config::getmonconn()->sample_get(Config::$mongo_flowlogs,[
            'PreFunName','NowFunName',
            'PreFunId','NowFunId',
            'flowmsgid','created_at'
        ],$where_merge,null,'created_at',1);


        //Log::info($flowlogs);

        $finished_logs=[];

        foreach ($flowlogs as $flowlog)
        {



            foreach ($finished_logs as $finished){
                if(
                    $finished['PreFunId']==$flowlog['PreFunId']
                    &&
                    $finished['NowFunId']==$flowlog['NowFunId']
                ){
                    continue 2;
                }
            }

            array_push($finished_logs,$flowlog);
        }

        return collect($finished_logs)->map(function($item){


            return (string)$item['flowmsgid'];
        })->all();

    }








    static function getMaybeFlowFunToHere($funlist,$tofunids,$flowlistid,$nowfun){

        Log::info('合并节点的前几个节点（不包含当前自己）：');
        Log::info($tofunids);

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['status', '=', CFlowMessageTo::$status_waiting],
                        ['dealtype', '!=', CFlowMessageTo::$dealtype_message],
                        ['NowFunid','!=',$nowfun['id']],
                        ['flowlistid','=',new ObjectId($flowlistid)]
                    ]
            ]
        ];

        $funcallback=function($query){
                $query->groupBy('NowFunid');
        };

        $UnFinishedFunIds= Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,['NowFunid'],$where,$funcallback);

        Log::info('UnFinishedFunIds');
        Log::info($UnFinishedFunIds);

        $maybeFunids=[];

        foreach ($UnFinishedFunIds as $unFinishedFunId){
            static::$FindNextFunTimer=0;

            if(static::hasInNextFun($funlist,$unFinishedFunId['NowFunid'],$tofunids))array_push($maybeFunids,$unFinishedFunId['NowFunid']);
            Log::info($unFinishedFunId['NowFunid'].'执行了'.static::$FindNextFunTimer.'次');
            Log::info($maybeFunids);
        }
        return $maybeFunids;
    }






    static function getMergeList($funid,$funlist,$mergelist){





        $perfunids=[];
        foreach ($funlist as $fun){

            if(!$fun['is_start'] && $fun['dealtype']=='message')continue;

            foreach ($fun['btnGroup'] as $k=>$btn){

                if(in_array($funid,$btn['defaultFunId'])){
                    array_push($perfunids,$fun['id']);
                }

                if(isset($btn['NextFun'])){
                    foreach ($btn['NextFun'] as $NextFun){
                        if(in_array($funid, $NextFun['funId'])){
                            array_push($perfunids,$fun['id']);
                        }
                    }
                }

                if(isset($btn['handler']['funId'])&&in_array($funid,$btn['handler']['funId'])){
                    array_push($perfunids,$fun['id']);
                }

            }

        }

       return array_intersect($perfunids,$mergelist);
    }



    static public function evalusefun($if_str,$binddata){
        $list=[];
        preg_match_all( '/#\[.+?\]\(.+?\)/',$if_str,$list);
        Log::info('$if_str_list');
        Log::info($list);

        foreach ($list[0] as $item){

            Log::info($item);


            if(
                strpos($item,'#[包含strpos]')!==false
            ){


                $parastr=str_replace('#[包含strpos](','',$item);
                $parastr=substr($parastr,0,-1);

                //Log::info($parastr);
                $param1=substr($parastr,0,strpos($parastr,','));
                $param2=substr($parastr,strpos($parastr,',')+1);

                if(in_array(substr($param2,0,1),['"',"'"])){
                    $param2= substr($param2,1);
                }

                if(in_array(substr($param2,-1,1),['"',"'"])){
                    $param2=substr($param2,0,-1);
                }

                $value=0;
                if(isset($binddata[$param1])){
                    $inputdata=$binddata[$param1];
                    $value=strpos($inputdata,$param2)!==false?1:0;
                }
                $if_str=str_replace($item,$value,$if_str);

                Log::info('包含strpos后'.$if_str);

            }

            if(
                strpos($item,'#[包含inAarray]')!==false
            ){


                $parastr=str_replace('#[包含inAarray](','',$item);
                $parastr=substr($parastr,0,-1);

                //Log::info($parastr);
                $param1=substr($parastr,0,strpos($parastr,','));
                $param2=substr($parastr,strpos($parastr,',')+1);

                if(in_array(substr($param2,0,1),['"',"'"])){
                    $param2= substr($param2,1);
                }

                if(in_array(substr($param2,-1,1),['"',"'"])){
                    $param2=substr($param2,0,-1);
                }

                $value=0;
                if(isset($binddata[$param1])){
                    $inputdata=$binddata[$param1];
                    if(is_numeric($binddata[$param1])||is_string($binddata[$param1])){
                        $inputdata=explode(',',$inputdata);
                    }
                    $value=in_array($param2,$inputdata)?1:0;
                }
                $if_str=str_replace($item,$value,$if_str);

                Log::info('包含inAarray后'.$if_str);

            }



        }

        return $if_str;

    }
    static public function evelfunif($if_str,$formdataList,$witherrormsg=false){

        $if_str=str_replace('“','"',$if_str);
        $if_str=str_replace('”','"',$if_str);

        $list=[];
        preg_match_all( '/@\[.+?\]/',$if_str,$list);

        $list[0]=array_unique($list[0]);

        $varlist=[];
        foreach ($list[0] as $item){
            $list2=[];
            preg_match_all( '/\d{13}_\d{1,}/',$item,$list2);

            if(isset($list2[0][0])){
                array_push($varlist,['replace'=>$item,'key'=>$list2[0][0]]);
            }else{
                array_push($varlist,['replace'=>$item,'key'=>null]);
            }
        }

//        Log::info('$varlist');
//        Log::info($varlist);

        foreach ($varlist as $key=>$item){
            $varlist[$key]['value']=null;
            foreach ($formdataList as $item2){
                if($item['key']==$item2['key']){
                    $varlist[$key]['value']=$item2['value'];
                    break;
                }
            }
        }

        //return $varlist;
//        Log::info($varlist);

        $binddata=[];
        foreach ($varlist as $key=> $var){
            $if_str= str_replace($var['replace'],'$var_'.$key,$if_str);
            $binddata['$var_'.$key]=!!$var['value']?$var['value']:0;
        }

//        Log::info('$if_str');
//        Log::info($if_str);
//        Log::info($binddata);

        $if_str=static::evalusefun($if_str,$binddata);

        Log::info($if_str);

        try{
            $Eval= new Evaluator($if_str);
            return $Eval->evaluate($binddata);
        }catch (\Exception $e){
            if($witherrormsg){
                return JsonMessage::Creat(false,$e->getMessage());
            }
            return false;
        }
    }






    static public function evelfunifwithkeyform($if_str,$formdataList,$witherrormsg=false){

        $if_str=str_replace('“','"',$if_str);
        $if_str=str_replace('”','"',$if_str);

        $list=[];
        preg_match_all( '/@\[.+?\]/',$if_str,$list);

        $list[0]=array_unique($list[0]);

        $varlist=[];
        foreach ($list[0] as $item){
            $list2=[];
            preg_match_all( '/\d{13}_\d{1,}/',$item,$list2);

            if(isset($list2[0][0])){
                array_push($varlist,['replace'=>$item,'key'=>$list2[0][0]]);
            }else{
                array_push($varlist,['replace'=>$item,'key'=>null]);
            }
        }


        foreach ($varlist as $key=>$item){
            $varlist[$key]['value']=null;
            foreach ($formdataList as $key2=>$item2){
                if($item['key']==$key2){
                    $varlist[$key]['value']=$item2;
                    break;
                }
            }
        }

        //return $varlist;


        $binddata=[];
        foreach ($varlist as $key=> $var){
            $if_str= str_replace($var['replace'],'$var_'.$key,$if_str);
            $binddata['$var_'.$key]=!!$var['value']?$var['value']:0;
        }


        //Log::info($if_str);
        //Log::info($binddata);


        $if_str=static::evalusefun($if_str,$binddata);



        try{
            $Eval= new Evaluator($if_str);
            return $Eval->evaluate($binddata);
        }catch (\Exception $e){
            if($witherrormsg){
                return JsonMessage::Creat(false,$e->getMessage());
            }
            return false;
        }
    }






}
