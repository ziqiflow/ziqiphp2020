<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Media\CFiles;
use App\Http\Controllers\Controller;
use App\Http\Common\Base\CEmployeeLogin;
use App\Http\Common\JsonMessage;
use App\Http\Common\Log\MLog;
use App\Http\Middleware\ApiReplaceEmployee;
use App\Http\Tool\Tool1;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;
use App\Http\Common\Base\Config as BaseConfig;

class ROaFlowCtrl extends Controller
{
    public function UserDeptRoleStoreDataRest(){
        CFlowRunData::RunDataReSet();
        return JsonMessage::Creat(true, '数据生成重置成功');
    }


    public function AutoCheckExpired(){

        CFlowMessageTo::AutoExpiredMessage();
    }


    public function AutoSendMessage()
    {

        CFlowMessageTo::AutoSendMessage();

        CCreatAlert::AutoSendMessage();
    }

    public function TableFunCallback(){
        $fun= request()->input('fun');
        $paras=request()->json('paras');

        $data=null;

        if($fun=='trans_hydee_by_wareid'){
            $data= CTableFun::trans_hydee_by_wareid($paras);
        }

        return JsonMessage::Creat(true,'',$data);
    }
    public function TableFunFunList(){
        return CTableFun::_funList();
    }

    public function TableSet(){
        return [
          'funlist'=>CTableFun::_funList(),
          'localfun'=>CTableFun::_localfun()
        ];
    }


    public function defaultValue_format(){
        return JsonMessage::Creat(true,'',[
            ['n'=>'当前时间{年-月-日}','v'=>'${timeformat:YYYY-MM-DD}'],

            ['n'=>'当前时间{年-月-日 时:分:秒}','v'=>'${timeformat:YYYY-MM-DD HH:mm:ss}'],
            ['n'=>'当前时间{时:分:秒}','v'=>'${timeformat:HH:mm:ss}'],
            ['n'=>'填写者-人员选择器(字符串)','v'=>'${chose-user-str}'],
            ['n'=>'填写者-部门选择器(字符串)','v'=>'${chose-dept-str}'],
            ['n'=>'填写者-部门树选择器(字符串)[排除集团公司]','v'=>'${chose-dept-tree-str-exclude-jtgs}']
        ]);
    }


    public function formcustomlist(){

        return [
            ['n'=>'人员选择器(可联动)','v'=>'chose-users'],
            ['n'=>'部门选择器(可联动)','v'=>'chose-depts'],
            ['n'=>'人员选择器(字符串)','v'=>'chose-user-str'],
            ['n'=>'部门选择器(字符串)','v'=>'chose-dept-str'],
            ['n'=>'部门树选择器(字符串)[排除集团公司]','v'=>'chose-dept-tree-str-exclude-jtgs'],
            ['n'=>'通讯录选择器(可联动)','v'=>'chose-contact'],


//            ,
//            ['n'=>'','v'=>''],
//            ['n'=>'','v'=>'']
        ];

        return JsonMessage::Creat(true,'',[
            ['n'=>'人员选择器','v'=>'humanchose']
//            ,
//            ['n'=>'','v'=>''],
//            ['n'=>'','v'=>'']
        ]);
    }


    public function FlowAdminGetConf(){


        $id= request()->input('flowid');
        return CFlowAdmin::getConf($id);


    }

    public function FlowAdminSearchForm(){
        $id= request()->input('flowid');
        return CFlowAdmin::SearchForm($id);
    }

    public function FlowAdminSearchFormExport(){
        $id= request()->input('flowid');
        return CFlowAdmin::SearchFormExport($id);
    }




    public function ReplaceLoginUser(){
        ApiReplaceEmployee::handerin();

        $userid=request()->input('userid');
        return CEmployeeLogin::testloginuser($userid);
    }


    public function TestLoginUser(){
        $userid=request()->input('userid');
        return CEmployeeLogin::testloginuser($userid);
    }

    public function FlowDesignsAdd()
    {
        if(request()->isMethod("GET")){
            return JsonMessage::Creat(true,'',CFlowCategory::Get());
        }


        $data = [
            'name' => request()->input('name'),
            'canuse' => request()->input('canuse'),
            'description'=>request()->input('description'),

        ];

        $_id = CFlowDesigns::add($data);

        if (!$_id) {
            return JsonMessage::Creat(false, '创建失败');
        } else {

            CFlowCategory::WatchFlowItemChange($_id,request()->json('category',[]));
            return JsonMessage::Creat(true, '创建成功', ['_id' => $_id]);
        }

    }

    public function FlowDesignSeniorCopy(){

        $nowflowid=request()->input('nowflowid');


        $fromflowid=request()->input('fromflowid');

        $fromFlowDesign = CFlowDesigns::get($fromflowid);

        if(empty($fromFlowDesign)){
            return JsonMessage::Creat(false,'复制的流程不存在');
        }

        $nowFlowDesign=CFlowDesigns::get($nowflowid);

        if(empty($nowFlowDesign)){
            return JsonMessage::Creat(false,'被复制的流程不存在');
        }

        $copylist=['remark','formset','funlist','datalist','set','layoutset'];

        $data=[];
        $olddata=[];
        foreach ($copylist as $copy){
            if(isset($fromFlowDesign[$copy])){
                $data[$copy]=$fromFlowDesign[$copy];
            }

            if(isset($nowFlowDesign[$copy])){
                $olddata[$copy]=$nowFlowDesign[$copy];
            }
        }

        MLog::info(['tag'=>'flow.copy','nowflowid'=>$nowflowid,'fromflowid'=>$fromflowid,'olddata'=>$olddata]);

        $success = CFlowDesigns::edit($nowflowid, $data);

        if (!$success) {
            return JsonMessage::Creat(false, '复制失败');
        } else {
            return JsonMessage::Creat(true, '复制成功');
        }

    }

    public function FlowDesignSeniorEdit(){

        $data = [
            'remark' => request()->input('remark'),
            'formset' => request()->json('formset'),
            'funlist' => request()->json('funlist'),
            'datalist' => request()->json('datalist'),
            'set'=>request()->json('set'),
            'layoutset'=>request()->json('layoutset')
        ];
        //Log::info($data);

        if(!isset($data['set']['formEditLimit'])){
            $data['set']['formEditLimit']=[];
        }



        $_id = request()->input('_id');


        $success = CFlowDesigns::edit($_id, $data);
//        return $success;
        if (!$success) {
            return JsonMessage::Creat(false, '修改失败');
        } else {
            return JsonMessage::Creat(true, '修改成功', ['_id' => $_id]);
        }
    }


    public function FlowDesignsEdit()
    {
        if(request()->isMethod("GET")){
            return JsonMessage::Creat(true,'',CFlowCategory::Get());
        }
        //Log::info(request()->all());
        $data = [
            'name' => request()->input('name'),
            'description' => request()->input('description'),
            'canuse' => request()->input('canuse'),

        ];
        //Log::info($data);
        $_id = request()->input('_id');
        $success = CFlowDesigns::edit($_id, $data);
//        return $success;
        if (!$success) {
            return JsonMessage::Creat(false, '修改失败');
        } else {

            CFlowCategory::WatchFlowItemChange($_id,request()->json('category',[]));


            return JsonMessage::Creat(true, '修改成功', ['_id' => $_id]);
        }
    }

    public function FlowDesignsGet()
    {

        $_id = request()->input('_id');
        return JsonMessage::Creat(true, '', CFlowDesigns::get($_id));


    }

    public function FlowDesignsSetCategory(){

        if(request()->isMethod('POST')){

            $tree=request()->json('tree');


            if(CFlowCategory::Save($tree)){
                return JsonMessage::Creat(true,'保存流程分类成功');
            }else{
                return JsonMessage::Creat(false,'保存失败，请重新试试');
            }

        }else{

            return JsonMessage::Creat(true,'',[
                'allList'=>CFlowDesigns::AllSampleList(),
                'CatTreeList'=>CFlowCategory::Get()
            ]);
        }

    }



    public function FlowDesignsAllTreeList(){
        CFlowCategory::$displayType='all';
        return JsonMessage::Creat(true,'',CFlowCategory::getCanTreeList());
    }

    public function FlowDesignsTreeListCanAdmin(){
        CFlowCategory::$displayType='canadmin';
        return JsonMessage::Creat(true,'',CFlowCategory::getCanTreeList());
    }

    public function FlowDesignsTreeListCanCreat(){



        return JsonMessage::Creat(true,'',CFlowCategory::getCanTreeList());
    }

    public function FlowDesignsCanList(){

        $nowpage = request()->input('nowpage');

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['canuse','=',true]
                    ]
            ]
        ];

        return JsonMessage::Creat(true, '获取成功', CFlowDesigns::lists($nowpage,$where));
    }

//    public function FlowDesignsAllList(){
//
//

//
////        $nowpage = request()->input('nowpage');
////
////        $where=[
////            ['a'=>'where',
////                'arr'=>
////                    [
////                        ['canuse','=',true]
////                    ]
////            ]
////        ];
////

//
//    }

    public function FlowDesignsList()
    {
        $nowpage = request()->input('nowpage');

//        $where=[
//            ['a'=>'where',
//                'arr'=>
//                    [
//                        ['canuse','=',true]
//                    ]
//            ]
//        ];

        return JsonMessage::Creat(true, '获取成功', CFlowDesigns::lists($nowpage));
    }


    public function FlowMessageCheckStatusExport(){

        $type= request()->input('type');

        switch ($type)
        {
            case 'PermsgidFunid':

                $dealtype= request()->input('dealtype');
                $preMsgId= request()->input('preMsgId');
                $funId= request()->input('funId');

                return CFlowMessageTo::checkMsgStatusByPermsgidFunidExport($dealtype,$preMsgId,$funId);

                break;
            default:
                break;
        }

        return JsonMessage::Creat(false,'未找到正确的解析方法');

    }

    public function FlowMessageCheckStatus(){

        $type= request()->input('type');

        switch ($type)
        {
            case 'PermsgidFunid':

                $dealtype= request()->input('dealtype');
                $preMsgId= request()->input('preMsgId');
                $funId= request()->input('funId');

                $result= CFlowMessageTo::checkMsgStatusByPermsgidFunid($dealtype,$preMsgId,$funId);
                return JsonMessage::Creat(true,'',$result);
                break;
            default:
                break;
        }

        return JsonMessage::Creat(false,'未找到正确的解析方法');


    }


    public function FlowDesignsDelete()
    {

        $_id = request()->input('id');
        $back = CFlowDesigns::delete($_id);
        if ($back) {
            return JsonMessage::Creat(true,
                '删除生成');
        }
        return JsonMessage::Creat(false,
            '删除失败，请重新试试');

    }


    public function FlowDesignsTestContact()
    {
        $flowset=request()->json('flowset');

        $groupList = request()->json('groupList');

        $testType = request()->input('testType');

        $testData = request()->json('testData');



        return JsonMessage::Creat(true,
            '测试成功',
            CFlowDesigns::testContact($flowset,$groupList, $testType, $testData)
        );

    }

    public function FlowGetbyCreat()
    {

        $_id = request()->input('_id');

        return JsonMessage::Creat(true, '',
            array_merge(CFlowDesigns::get($_id),['form_save'=>CFormTempSave::getTempbyCreat($_id)])
        );
    }



    public function FlowTempFormSave(){


        $type=request()->input('type');
        $flowdata=request()->json('flowdata');
        $inputdata=request()->json('inputdata');




        if($type=='creat'){

            $back= CFormTempSave::saveFromCreat(request()->input('flowid'),$flowdata,$inputdata);

        }else{


            $back= CFormTempSave::saveFromDeal(request()->input('msgid'),$flowdata,$inputdata);


        }


        if($back){
            return JsonMessage::Creat(true,'暂存成功');
        }else{
            return JsonMessage::Creat(false,'暂存失败');
        }







    }

    function oafiles($fileid,$filename=null){
        //date('Y-m-d H:i:s',time());

        $data= request()->all();
        $sign= request()->input('sign');

        $platform= Tool1::getplatform($data['agent']);

        if(count($data)==0){
            return '错误的参数';
        }


        if(time()-$data['time']>60*15){
            return '访问超时，资源访问需要从页面中重新打开(同时检查您的电脑时间是否正确)';
        }

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['platform','=',$platform],
                        ['userid','=',$data['uid']],
                        ['expire', '>', time()]
                    ]
            ]
        ];
        Log::info('$where');
        Log::info($where);

//        dd($where);


        $tokens= Config::getconn()->sample_get(BaseConfig::$db_erp_employee_tokens,['accesstoken'],$where,null,
            'expire',
            1,
            [0, 3]);

        if(count($tokens)==0){
            return '鉴权过期';
        }


        $data1=[
            'agent'=>$data['agent'],
            'uid'=>$data['uid'],
            'time'=>$data['time']
        ];

//        if(md5(http_build_query($data1).'&token='.$tokens[0]->accesstoken)!=$sign){

//        }

        $hasfind=false;
        foreach ($tokens as $token){
            if(md5(http_build_query($data1).'&token='.$token->accesstoken)==$sign){
                $hasfind=true;
                break;
            }
        }
        if(!$hasfind)
        {
            return '鉴权错误';
        }

//http://localhost:8099/file/oa/25904352988237454
//public/files/flow/2019/06/02

//

//        if(file_exists(public_path('files/flow/2019/06/02/25904352988237454.xlsx'))){
//            header('location:http://'.$down_host.'files/flow/2019/06/02/25904352988237454.xlsx');
//        }else{
//            header('HTTP/1.1 404 Not Found');
//        }
//        return;

        $back=CFiles::getDownFile($fileid,'flow');
        if(!$back){
            echo '文件不存在，或文件禁止被访问';
            return;
        }

        CFiles::showDownFile($back,!empty($filename));
    }






    public function FlowCreat()
    {
        CFlowPreview::$isPreviewMode=false;

        $flowid = request()->input('flowid');
        $inputdata = request()->json('inputdata');
        $flowdata = request()->json('flowdata');
        //[dept,desc]



        $btnindex = request()->input('btnindex');

        CFlowPreview::$PreviewFunList=request()->json('funlist');
        CFlowPreview::$PreviewSonFlows=request()->json('sonflows');
        //$funid=request()->input('funid');return;

        return CFlowList::creat($flowid, $flowdata, $inputdata, $btnindex);
    }

    public function FlowCreatPreviewMode(){

        CFlowPreview::$isPreviewMode=true;
        $flowid = request()->input('flowid');
        $inputdata = request()->json('inputdata');
        $flowdata = request()->json('flowdata');

        //[dept,desc]
        $btnindex = request()->input('btnindex');
//        $funid=request()->input('funid');
        return CFlowList::creat($flowid, $flowdata, $inputdata, $btnindex);

    }


    public function ifstrtest()
    {

        $ifstr = request()->input('ifstr');
        $iformdatalist = request()->json('formdatalist');
//        foreach ($iformdatalist as $key=>$item){
//            $iformdatalist[$key]['value']=1;
//        }
//        return  $iformdatalist;
        $result = CFlowDealerUtil::evelfunif($ifstr, $iformdatalist, true);

        if (is_array($result)) {
            return JsonMessage::Creat(false, '格式有错误，请检查：系统报错内容：' . $result['msg']);
        }
        return JsonMessage::Creat(true, '计算结果是' . $result);
    }


    public function FlowListWaiting()
    {

        $search=request()->json('search');
        $whereboat=[];

        if(
        !empty($search['readstatus'])
        ){
            switch ($search['readstatus'])
            {
                case 'read':
                    array_push($whereboat,['hasread','=',1]);
                    break;
                case 'unread':
                    array_push($whereboat,['hasread','=',0]);
                    break;
                default:
            }
        }


        if(
        !empty($search['desc'])
        ){

            array_push($whereboat,['flowname','like','%'.$search['flowname'].'%']);
        }


        if(
        !empty($search['flowname'])
        ){
            array_push($whereboat,['flowname','like','%'.$search['flowname'].'%']);
        }

        if(
        !empty($search['workname'])
        ){
            array_push($whereboat,['workname','=',$search['workname']]);
        }


        if(count($whereboat)==0){
            $where=[];
        }else{
            $where=[
                ['a'=>'where',
                    'arr'=>
                        $whereboat
                ]
            ];
        }


        $nowpage = request()->input('nowpage');
        return JsonMessage::Creat(true, '获取成功', CFlowMessageTo::list_waiting($nowpage,$where));

    }


    public function FlowNeedCreat(){


        $search=request()->json('search');
        $whereboat=[];
        if(
        !empty($search['flowname'])
        ){
            array_push($whereboat,['flowname','like','%'.$search['flowname'].'%']);
        }

        if(
        !empty($search['creatstatus'])
        ){
            switch ($search['creatstatus'])
            {
                case 'creat':
                    array_push($whereboat,['hasdone','=',true]);
                    break;
                case 'uncreat':
                    array_push($whereboat,['hasdone','=',false]);
                    break;
                default:
            }
        }

        if(count($whereboat)==0){
            $where=[];
        }else{
            $where=[
                ['a'=>'where',
                    'arr'=>
                        $whereboat
                ]
            ];
        }


        $nowpage = request()->input('nowpage');
        return JsonMessage::Creat(true, '获取成功', CCreatAlert::list($nowpage,$where));
    }





    public function FlowListFinish()
    {

        $search=request()->json('search');
        $whereboat=[];
        if(
        !empty($search['flowname'])
        ){
            array_push($whereboat,['flowname','like','%'.$search['flowname'].'%']);
        }


        if(
        !empty($search['workname'])
        ){
            array_push($whereboat,['workname','=',$search['workname']]);
        }

        if(count($whereboat)==0){
            $where=[];
        }else{
            $where=[
                ['a'=>'where',
                    'arr'=>
                        $whereboat
                ]
            ];
        }


        $nowpage = request()->input('nowpage');
        return JsonMessage::Creat(true, '获取成功', CFlowMessageTo::list_finish($nowpage,$where));
    }

    public function FlowListICreat()
    {

        $search=request()->json('search');
        $whereboat=[];
        if(
        !empty($search['flowname'])
        ){
            array_push($whereboat,['name','like','%'.$search['flowname'].'%']);
        }

        if(
        !empty($search['workname'])
        ){
            array_push($whereboat,['workname','=',$search['workname']]);
        }

        if(count($whereboat)==0){
            $where=[];
        }else{
            $where=[
                ['a'=>'where',
                    'arr'=>
                        $whereboat
                ]
            ];
        }

        $nowpage = request()->input('nowpage');
        return JsonMessage::Creat(true, '获取成功', CFlowList::list_i_creat($nowpage,$where));
    }

    static function getDevName(){
        return strpos($_SERVER["HTTP_REFERER"],'dingtalkMobie')===false?'pc':'mobile';
    }

    public function FlowListMessage()
    {




        $search=request()->json('search');
        $whereboat=[];
        if(
        !empty($search['flowname'])
        ){
            array_push($whereboat,['flowname','like','%'.$search['flowname'].'%']);
        }

        if(
        !empty($search['workname'])
        ){
            array_push($whereboat,['workname','=',$search['workname']]);
        }

        $funcall=null;
        if(
        !empty($search['readstatus'])
        ){
            switch ($search['readstatus'])
            {
                case 'read':
                    array_push($whereboat,['hasread','=',1]);
                    break;
                case 'unread':
                    array_push($whereboat,['hasread','=',0]);

                    $funcall=function ($query){
                          $query->orderByDesc('level');
                    };
                    break;
                default:
            }
        }

        if(count($whereboat)==0){
            $where=[];
        }else{
            $where=[
                ['a'=>'where',
                    'arr'=>
                        $whereboat
                ]
            ];
        }

        $nowpage = request()->input('nowpage');

        return JsonMessage::Creat(true, '获取成功',
            CFlowMessageTo::list_message(
                $nowpage,
                $where,
                $funcall,
                static::getDevName())
        );
    }

    public function FlowReSendMessage(){

        //request()->input('')

        $msglist= request()->input('msglist');

        $dealtype= request()->input('dealtype');
        $preMsgId= request()->input('preMsgId');
        $funId= request()->input('funId');




        return CFlowMessageTo::ReSendMessage($msglist,$dealtype,$preMsgId,$funId);





    }


    public function FlowListCc()
    {

        $search=request()->json('search');
        $whereboat=[];
        if(
        !empty($search['flowname'])
        ){
            array_push($whereboat,['flowname','like','%'.$search['flowname'].'%']);
        }

        if(
        !empty($search['workname'])
        ){
            array_push($whereboat,['workname','=',$search['workname']]);
        }

        $funcall=null;
        if(
        !empty($search['readstatus'])
        ){
            switch ($search['readstatus'])
            {
                case 'read':
                    array_push($whereboat,['hasread','=',1]);
                    break;
                case 'unread':
                    array_push($whereboat,['hasread','=',0]);

                    $funcall=function ($query){
                        $query->orderByDesc('level');
                    };
                    break;
                default:
            }
        }


        if(count($whereboat)==0){
            $where=[];
        }else{
            $where=[
                ['a'=>'where',
                    'arr'=>
                        $whereboat
                ]
            ];
        }

        $nowpage = request()->input('nowpage');
        return JsonMessage::Creat(true, '获取成功', CFlowMessageTo::list_cc(
            $nowpage,
            $where,
            $funcall,
            static::getDevName()
        ));
    }

    public function FlowMessageHasRead(){
        //type=message;
        //type=cc
        //message
        $msg_id = request()->input('msg_id');

        return JsonMessage::Creat(true,'',CFlowMessageTo::hasRead($msg_id));

    }



    public function FlowListNumber()
    {
        return JsonMessage::Creat(true, '', CFlowMessageTo::badgeNumber());
    }

    public function FlowAlertDone()
    {
        $id = request()->input('id');

        $result=CCreatAlert::setdone(explode('-',$id));
        return JsonMessage::Creat($result?true:false,'标记'.$result.'条成功',$result);
    }

    public function FlowSetRead()
    {
        $msgid = request()->input('msgid');

        $result=CFlowMessageTo::setread(explode('-',$msgid));

        return JsonMessage::Creat($result?true:false,'标记'.$result.'条成功',$result);
    }

    public function FlowSetAllRead()
    {
        $type = request()->input('type');

        if ($type == 'waiting') {
            return JsonMessage::Creat(CFlowMessageTo::WaitingSetRead());
        }

        if ($type == 'cc') {
            return JsonMessage::Creat(CFlowMessageTo::CcAllSetRead());
        }
        if ($type == 'message') {
            return JsonMessage::Creat(CFlowMessageTo::MessageAllSetRead());
        }
        return JsonMessage::Creat(false, '未匹配设置类型');
    }

    public function FlowAllList()
    {
        return JsonMessage::Creat(true, '', CFlowDesigns::all_lists());
    }

    public function FlowCanSonList(){
        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['set.canBeSonFlow','=',true]
                    ]
            ]
        ];
        return JsonMessage::Creat(true,'',CFlowDesigns::all_lists($where));
    }





    function Log_msectime($tag) {
       list($msec, $sec) = explode(' ', microtime());
       $msectime = (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
        Log::info($tag.'：'.$msectime);
    }


    public function FlowDealByMsgid()
    {
        $_id = request()->input('_id');
//        $this->Log_msectime('1');
        $msgObj = CFlowMessageTo::get_waiting($_id);//0.2s
//        $this->Log_msectime('2');
        if ($msgObj == null) {
            return JsonMessage::Creat(false, '流程已经被处理，或流程不存在或当前环节不允许操作', null);
        }


        if(empty($msgObj['hasread'])){
            $msgObj['hasread']=CFlowMessageTo::setread($_id)?1:0;
        }


//        $this->Log_msectime('3');
        $msgObj['timeline']=CFlowRevoke::timelinelist($_id);
//        $this->Log_msectime('4');

        $msgObj['formmd5'] =md5(json_encode($msgObj['flowlistOi']['formdata']));


//        $this->Log_msectime('5');
        $msgObj['form_save']=CFormTempSave::getTempbyDeal($_id);
//        $this->Log_msectime('7');
        return JsonMessage::Creat(true, '获取成功', $msgObj);
    }



    public function FlowDeal()
    {


        CFlowPreview::$isPreviewMode=false;

        CFlowPreview::$PreviewFunList=request()->json('funlist');
        CFlowPreview::$PreviewSonFlows=request()->json('sonflows');


        $flowmsgid = request()->input('flowmsgid');
        $inputdata = request()->json('inputdata');
        $flowdata = request()->json('flowdata');
        $btnindex = request()->input('btnindex');

        return CFlowDealer::dealMsg($flowmsgid,
            $flowdata,
            $inputdata,
            $btnindex
        );

    }

    public function FlowDealPreviewMode()
    {


        CFlowPreview::$isPreviewMode=true;

        $flowmsgid = request()->input('flowmsgid');
        $inputdata = request()->json('inputdata');
        $flowdata = request()->json('flowdata');
        $btnindex = request()->input('btnindex');

        return CFlowDealer::dealMsg($flowmsgid,
            $flowdata,
            $inputdata,
            $btnindex
        );

    }


    public function FlowDetailLogsMsgs(){

        $flowOi_id = request()->input('flowOi_id');

        if(empty($flowOi_id)){
            return JsonMessage::Creat(false,'流程实例id不可为空');
        }

        $msgs = CFlowList::getDetailMsgs($flowOi_id);
        $logs = CFlowList::getDetailLogs($flowOi_id);

        return JsonMessage::Creat(true, '获取成功', [
            "flowOi_id"=>$flowOi_id,
            "logList"=>$logs,
            "msgList"=>$msgs,
        ]);

    }

    public function FlowDetail()
    {
        $flowOi_id = request()->input('flowOi_id');

        $detail = CFlowList::detail($flowOi_id);
        if ($detail == null) {
            return JsonMessage::Creat(false, '没有查询到对应的流程明细');
        }
        return JsonMessage::Creat(true, '获取成功', $detail);
    }

    public function FlowListCanCancel(){
        $flowOi_id = request()->input('flowOi_id');
        $CanAllCancel=CFlowCancel::CanAllCancel($flowOi_id);
        $list=CFlowCancel::cancelList($flowOi_id);

        if(!$CanAllCancel['success']&&count($list)==0){
            return JsonMessage::Creat(false,$CanAllCancel['msg']);
        }


        return JsonMessage::Creat(true,'',[
            'canAllCancel'=>$CanAllCancel['success'],
            'list'=>$list
        ]);
    }

    public function FlowCancel(){
        $flowOi_id = request()->input('flowOi_id');
        $flowmsgIdList = request()->input('flowmsgIdList');
        $cancelReason=request()->input('cancelReason');

        if(empty($cancelReason)){
            return JsonMessage::Creat(false,'取消原因不可为空');
        }

        if(!CFlowCancel::checkPermission($flowOi_id)){
            return JsonMessage::Creat(false,'没有操作的权限');
        }

        $result=CFlowCancel::cancel(
            $flowOi_id,
            $flowmsgIdList,
            $cancelReason
        );

        if($result)
        {
            return JsonMessage::Creat(true,'取消成功');
        }else{
            return JsonMessage::Creat(true,'取消失败');
        }
    }


    public function FlowAllCancel(){

        $flowOi_id = request()->input('flowOi_id');
        $cancelReason=request()->input('cancelReason');

        if(empty($cancelReason)){
            return JsonMessage::Creat(false,'取消原因不可为空');
        }

        if(!CFlowCancel::checkPermission($flowOi_id)){
            return JsonMessage::Creat(false,'没有操作的权限');
        }


        $result=CFlowCancel::AllCancel(
            $flowOi_id,
            $cancelReason
        );

        return $result;

//        if($result){

//        }else{

//        }

    }


    public function FlowRevokeList(){

        $msg_id = request()->input('msg_id');
//        $flowlist_id=request()->input('flowOi_id');

        return JsonMessage::Creat(true,'',CFlowRevoke::revokelist($msg_id));

    }

    public function FlowRevokeTo(){

        $msg_id = request()->input('msg_id');
        $msg_to_id = request()->input('msg_to_id');
        $reason= request()->input('reason');
//        $flowlist_id=request()->input('flowOi_id');

        return CFlowRevoke::revoketo($msg_id,$msg_to_id,$reason);

    }



    public function FlowImageUpload()
    {  $flowid=request()->input('flowid');
        return CFlowDesigns::imageUpload($flowid);
    }

    public function FlowEditFileUpload(){
        $flowid=request()->input('flowid');
        return CFlowDesigns::fileUpload($flowid);

    }

    public function FlowEditFileDelete(){

        $flowid=request()->input('flowid');
        $fileid=request()->input('fileid');

        return CFlowDesigns::deleteFile($flowid,$fileid);

    }


    public function FlowFileUpload(){
        $flowlistid=request()->input('flowlistid');
        $flowdesign_id=request()->input('flowdesign_id');
        return CFlowDealer::fileUpload($flowlistid,$flowdesign_id);
    }

    public function FlowFileDelete(){



        $fileid=request()->input('fileid');
        return CFlowDealer::deleteFile($fileid);

    }

    public function gotoOaTest(){


        return CSimulationTest::login();
    }








}
