<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CDept;
use App\Http\Common\JsonMessage;
use App\Http\Common\OaFlow\Export\FlowExport;
use App\Http\Common\utils\MongoDateTrans;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use MongoDB\BSON\ObjectId;

class CFlowAdmin
{

    static private function getSerchHeadList()
    {
        return json_decode(' [ { "type": "input", "name": "流程名称", "isoutdb": false, "icon": "regular/keyboard", "options": { "hideable": false, "width": null, "defaultValue": null, "required": false, "dataType": "string", "pattern": null, "placeholder": null, "remoteFunc": "func_1555338212000_41224" }, "key": "1555338212000_41224", "keyindex": 1, "model": "name", "rules": [ { "type": "string", "message": "流程名称格式不正确" } ], "searchMatch": "where:%like%" }, { "type": "input", "name": "流程描述", "isoutdb": false, "icon": "regular/keyboard", "options": { "hideable": false, "width": null, "defaultValue": null, "required": false, "dataType": "string", "pattern": null, "placeholder": null, "remoteFunc": "func_1555338213000_90531" }, "key": "1555338213000_90531", "keyindex": 2, "model": "desc", "rules": [ { "type": "string", "message": "流程描述格式不正确" } ], "searchMatch": "where:%like%" },{"type":"input","name":"文号","isoutdb":false,"icon":"regular/keyboard","options":{"hideable":false,"width":null,"defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","remoteFunc":"func_1556933665000_62731"},"key":"1556933665000_62731","keyindex":7,"model":"workname","rules":[{"type":"string","message":"单行文本格式不正确"}],"searchMatch":"where:="}, { "type": "date", "name": "创建时间", "isoutdb": false, "icon": "regular/calendar-alt", "options": { "hideable": false, "defaultValue": null, "readonly": false, "disabled": false, "editable": true, "clearable": true, "placeholder": null, "startPlaceholder": null, "endPlaceholder": null, "type": "datetimerange", "format": "yyyy-MM-dd", "timestamp": false, "required": false, "width": null, "remoteFunc": "func_1555338310000_66894" }, "key": "1555338310000_66894", "keyindex": 4, "model": "created_at", "rules": [], "searchMatch": "where:between" } ]', true);
    }

    static public function getFformList(&$list,$withtable=false)
    {

        $datalist = [];

        foreach ($list as $key => $item) {

            if ($item['type'] == 'grid' && isset($item['columns'])) {

                if (count($item['columns'])) {
                    foreach ($list[$key]['columns'] as $key2 => $list2) {
                        if (count($list[$key]['columns'][$key2]['list'])) {
                            $datalist = array_merge($datalist, static::getFformList($list[$key]['columns'][$key2]['list'],$withtable));
                        }
                    }
                }

            } else {


                if($item['type'] == 'placeholderhtml')continue;
                if(!$withtable&&$item['type'] == 'custom')continue;
                //if($item['type'] == 'placeholderhtml')continue;

                if ($withtable||$item['type'] != 'table') {
                    $item['model'] = 'formdata.i_' . $item['keyindex'];
                    $item['isoutdb'] = false;


                    //$item['type']=='input',textarea,  like
                    //number,radio,rate,color , select（options。multiple==false） ,switch==,slider(options.range==false)
                    //checkbox select（options。multiple==false） where in
                    //slider(options.range==true) , date(options.type=='datetimerange','daterange') where between
                    //time where ==
                    //date where ==
                    //
                    switch ($item['type']) {
                        case 'input':
                        case 'textarea':
                            $item['searchMatch'] = 'where:%like%';
                            break;
                        case 'number':
                        case 'radio':
                        case 'rate':
                        case 'color':
                        case 'switch':
                        case 'time':
                            $item['searchMatch'] = 'where:=';
                            break;
                        case 'checkbox':
                            $item['searchMatch'] = 'where:in';
                            break;
                        case 'select':

                            if($item['options']['multiple']){
                                $item['searchMatch'] = 'where:in';
                            }else{
                                $item['searchMatch'] = 'where:=';
                            }


                            break;
                        case 'date':

                            if(in_array($item['options']['type'],['datetimerange','daterange'])){
                                $item['searchMatch'] = 'where:between';
                            }else{
                                $item['searchMatch'] = 'where:=';
                            }

                            break;
                        case 'slider':
                            if($item['options']['range']){
                                $item['searchMatch'] = 'where:between';
                            }else{
                                $item['searchMatch'] = 'where:=';
                            }
                            break;
                        default:
                            $item['searchMatch'] = 'where:=';
                    }
                    array_push($datalist, $item);
                }
            }
        }

        return $datalist;


    }

    static public function getConf($id)
    {


        if (!CFlowPermission::CheckPermission($id, Config::getUser()->id)) {
            return JsonMessage::Creat(false, '您没有管理此流程的权限');
        }


        $design = CFlowDesigns::get($id);

        if (!$design) {
            return JsonMessage::Creat(false, '流程不存在');
        }


        //$design['formset'];



        $pageset = [];



        $orderby_list = json_decode('[{"name":"created_at","zh_name":"创建时间"},{"name":"name","zh_name":"流程名称"},{"name":"unFinishNum","zh_name":"未结束消息"},{"name":"workname","zh_name":"文号"}]', true);

        foreach ($design['datalist'] as $data) {
            if ($data['type'] == 'table'||$data['type']=='placeholderhtml') {
                continue;
            }
            array_push($orderby_list, [
                'name' => 'formdata.i_' . $data['index'],
                'zh_name' => $data['name']
            ]);
        }


        $pageset['orderby_list'] = $orderby_list;

        $pageset['searchFormSet'] = [
            'config' => ['labelWidth' => $design['formset']['config']['labelWidth'], 'labelPosition' => "left"],
            'list' => array_merge(json_decode(
                    '[ { "type": "select", "name": "状态", "isoutdb": false, "icon": "regular/caret-square-down", "options": { "hideable": false, "defaultValue": "已结束", "multiple": false, "disabled": false, "clearable": false, "placeholder": null, "required": false, "showLabel": true, "width": null, "sourceType": "options", "remote": false, "options": [ { "value": "所有", "label": "所有" }, { "value": "未结束", "label": "未结束" }, { "value": "已结束", "label": "已结束" }, { "value": "取消作废", "label": "已取消" } ], "jsonOptions": [], "remoteOptions": [], "props": { "value": "v", "label": "n" }, "remoteFunc": "func_1555644481000_36866", "defaultType": "String" }, "key": "1555644481000_36866", "keyindex": 5, "model": "unFinishNum", "rules": [] }, { "type": "radio", "name": "包含取消", "isoutdb": false, "icon": "regular/dot-circle", "options": { "hideable": false, "inline": true, "defaultValue": "所有", "showLabel": true, "required": false, "width": "", "sourceType": "options", "options": [ { "value": "所有", "label": "所有" }, { "value": "是", "label": "是" }, { "value": "否", "label": "否" } ], "remote": false, "jsonOptions": [], "remoteOptions": [], "props": { "value": "v", "label": "n" }, "remoteFunc": "func_1555913794000_10821", "defaultType": "String" }, "key": "1555913794000_10821", "keyindex": 6, "model": "CancelNum", "rules": [] } ]'

                //
                , true),
                static::getSerchHeadList(),
                static::getFformList($design['formset']['list'])),


        ];

        $pageset['display_set'] = ['checkbox' => false, 'tablemaxheight' => '600', 'topbtns' => []];
        return JsonMessage::Creat(
            true,
            '',
            [
                'flowname'=>$design['name'],
                'pageset' => $pageset,
                'default' => ["table" => null, "search" => null]
            ]

        );


    }


    static public function checkHasPermissions($userid, $contactGroup)
    {

        return CFlowDealerUtil::contactHasPermission(
            $userid,
            $contactGroup,
            ['firstcreated_deptid' => null,
                'firstcreated_userid' => null,
                'lastmsgcreated_deptid' => null,
                'lastmsgcreated_id' => null]);


    }

    static public function searchformExport($id){



        $design = CFlowDesigns::get($id);

        $result= static::SearchForm($id,'export',0);


        if(!$result['success']){
            return $result;
        }

        return (new FlowExport($design['name'],$result))->download($design['name'].'.xlsx');
        //store
    }

    static public function SearchForm($id,$allow='watch',$pagesize=60)
    {

        if (!CFlowPermission::CheckPermission($id, Config::getUser()->id)) {
            return JsonMessage::Creat(false, '您没有管理此流程的权限');
        }


        $design = CFlowDesigns::get($id);

        if (!$design) {
            return JsonMessage::Creat(false, '流程不存在');
        }

        //$design['set']['permissions']
        //[]
        //admindept: ["1"]
        //allow: ["watch"]
        if (!isset($design['set']['permissions']) || count($design['set']['permissions']) == 0) {
            return JsonMessage::Creat(false, '流程未设置完整');
        }

        $canwatchdeptlist = [];
        $newPermissions = [];

        if (isset($design['set']['permissions'])) {

            foreach ($design['set']['permissions'] as $permission) {

                if (in_array($allow, $permission['allow'])) {
                    if (static::checkHasPermissions(Config::getUser()->id, $permission['deptuser'])) {

                        if (empty($permission['admindept'])) {

                            CDept::$default_root_d_id;
                            array_push($newPermissions, ['admindept' => ['1'], 'allow' => $permission['allow']]);
                            array_push($canwatchdeptlist, '1');
                        } else {
                            array_push($newPermissions, ['admindept' => $permission['admindept'], 'allow' => $permission['allow']]);
                            $canwatchdeptlist = array_merge($canwatchdeptlist, $permission['admindept']);
                        }
                    }
                }

            }
        }

        if (count($canwatchdeptlist) == 0) {
            return JsonMessage::Creat(false, '您没有管理此流程的权限!');
        }




        $Curd =  Config::getDbCtrlCurdOBJ();
        $Curd->perPage=$pagesize;


        $search = request()->json('search');

        //return $search;
//        foreach ($search['form'] as $key){
//            if(strpos($key,'formdatai_')===0){
//                $search['form'][str_replace("formdatai_","formdata.i_",$key)]=$search['form'][$key];
//                unset($search['form'][$key]);
//            }
//        }
//        foreach ($search['orderby'] as $key=>$item){
//            if(strpos($item['name'],'formdatai_')===0){
//                $search['orderby'][$key]['name']=str_replace("formdatai_","formdata.i_",$item['name']);
//            }
//        }
        $Curd->connection = 'mongodb';
        $Curd->isMongoDb = true;
        $Curd->dbdriver = 'mongodb';

//        $adddisplay_list=[
//            ['name'=>'_id','zh_name'=>'_id','hide'=>'']
//        ];

        $display_list = json_decode(
            '[{"type":"key","operates":[],"name":"isCancel","zh_name":"是否取消","aggregate":null,"hide":true,"class":null,"style":null,"width":null,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"_id","zh_name":"实例id","aggregate":null,"hide":true,"class":null,"style":null,"width":null,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"CancelNum","zh_name":"取消数量","aggregate":null,"hide":true,"class":null,"style":null,"width":null,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"dept_id_list","zh_name":"部门路径列表","aggregate":null,"hide":true,"class":null,"style":null,"width":null,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"flowid","zh_name":"流程id","aggregate":null,"hide":true,"class":null,"style":null,"width":null,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"workname","zh_name":"文号","aggregate":null,"hide":false,"class":"","style":"","width":231,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":"left","hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"name","zh_name":"流程名称","aggregate":null,"hide":false,"class":null,"style":null,"width":197,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"unFinishNum","zh_name":"状态","aggregate":null,"hide":false,"class":null,"style":null,"width":89,"limit":null,"filter":null,"keep_orig":false,"jsfilter":"filterfun_to_flowstatus","fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"desc","zh_name":"流程描述","aggregate":null,"hide":false,"class":null,"style":null,"width":260,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"created_id","zh_name":"创建者id","aggregate":null,"hide":true,"class":null,"style":null,"width":null,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"creater","zh_name":"创建者","aggregate":null,"hide":false,"class":null,"style":null,"width":111,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null},{"type":"key","operates":[],"name":"created_at","zh_name":"创建时间","aggregate":null,"hide":false,"class":null,"style":null,"width":220,"limit":null,"filter":null,"keep_orig":false,"jsfilter":"filterfun_int_to_datetime","fixedtype":null,"hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null}]'



            , true);


        $formlist = static::getFformList($design['formset']['list'],true);


        foreach ($formlist as $item) {

            //$item['type']=='input',textarea,  like
            //number,radio,rate,color , select（options。multiple==false） ,switch==,slider(options.range==false)
            //checkbox select（options。multiple==false） where in
            //slider(options.range==true) , date(options.type=='datetimerange','daterange') where between
            //time where ==
            //date where ==
            //


            array_push($display_list,
                [
                    '_isformdata' => true,
                    '_formset' => $item,
                    'aggregate' => null,
                    'class' => null,
                    'filter' => null,
                    'fixedtype' => null,
                    'hasoutdb' => false,
                    'hide' => false,
                    'jsfilter' => 'filterfun_formdata_type',
                    'keep_orig' => false,
                    'limit' => null,
                    'name' => 'formdata.i_' . $item['keyindex'],
                    'operates' => [],
                    'outdb_asname' => null,
                    'outdb_display' => null,
                    'outdb_display_asname' => null,
                    'outdb_key' => null,
                    'outdb_name' => null,
                    'outdb_type' => "leftjoin",
                    'style' => null,
                    'type' => "key",
                    'width' => null,
                    'zh_name' => $item['name'],
                ]
            );


        }

        array_push($display_list, json_decode(
            '{"type":"operate","operates":[{"type":"button","btnclass":null,"customName":null,"name":"查看","funName":"button_click_watch","url":null,"urltarget":null,"dialogwidth":null,"dialogheight":null,"repeatKeys":[],"batchupdate":false,"icon":null,"hide":false,"showFunName":"button_show_watch"},{"type":"button","btnclass":null,"customName":null,"name":"撤回","funName":"button_click_revoke","url":null,"urltarget":null,"dialogwidth":null,"dialogheight":null,"repeatKeys":[],"batchupdate":false,"icon":null,"hide":false,"showFunName":"button_show_revoke"},{"type":"button","btnclass":null,"customName":null,"name":"取消","funName":"button_click_cancel","url":null,"urltarget":null,"dialogwidth":null,"dialogheight":null,"repeatKeys":[],"batchupdate":false,"icon":null,"hide":false,"showFunName":"button_show_cancel"}],"name":"@operate_1555373323","zh_name":"操作","aggregate":null,"hide":false,"class":null,"style":null,"width":225,"limit":null,"filter":null,"keep_orig":false,"jsfilter":null,"fixedtype":"right","hasoutdb":false,"outdb_type":"leftjoin","outdb_name":null,"outdb_asname":null,"outdb_key":null,"outdb_display":null,"outdb_display_asname":null}',

            //,
            true));


        $Curd->display_list = $display_list;
        $Curd->tablename = Config::$mongo_flowlists;

        $Curd->display_set = ['checkbox' => false, 'tablemaxheight' => 600, 'topbtns' => []];


        $Curd->search_list = array_merge(static::getSerchHeadList(), static::getFformList($design['formset']['list']));

        $Curd->HasDeleteKey = false;

        $where = [];

        $whereboat = [
            ['flowid','=',new ObjectId($id)]
        ];

        if (!empty($search['form']['_id'])) {
            array_push($whereboat, ['_id', '=', new ObjectId($search['form']['_id'])]);
        }

        if (!empty($search['form']['created_at']) && count($search['form']['created_at']) == 2) {
            $search['form']['created_at'][0] = MongoDateTrans::StringToUTC($search['form']['created_at'][0]);
            $search['form']['created_at'][1] = MongoDateTrans::StringToUTC($search['form']['created_at'][1]);
        }

        if (isset($search['form']['unFinishNum'])) {
            switch ($search['form']['unFinishNum']) {
                case '已结束':
                    array_push($whereboat, ['unFinishNum', '=', 0]);
                    break;
                case '已取消':
                    array_push($whereboat, ['isCancel', '=', true]);
                    break;
                case '未结束':
                    array_push($whereboat, ['unFinishNum', '>', 0]);
                    break;
                default:
            }
        }

        if (isset($search['form']['CancelNum'])) {
            switch ($search['form']['CancelNum']) {
                case '是':
                    array_push($whereboat, ['CancelNum', '>', 0]);
                    break;
                case '否':
                    array_push($whereboat, ['CancelNum', '=', 0]);
                    break;
                default:
            }
        }



        if (count($whereboat)) {
            $where = [
                ['a' => 'where',
                    'arr' =>
                        $whereboat
                ]
            ];
        }

        if (!in_array('1', $canwatchdeptlist)) {
            array_push($where,
                ['a' => 'whereIn',
                    'arr' =>
                        [
                            ['dept_id_list', array_unique($canwatchdeptlist)]
                        ]
                ]
            );
        }


        $result = $Curd->search_data(request()->input('currentPage', 1), $search, $where);



        foreach ($result['data']['pagedata']['result'] as $key=>$item){
            $result['data']['pagedata']['result'][$key]['_id']=new ObjectId($result['data']['pagedata']['result'][$key]['_id']);
        }


        $result['data']['pagedata']['permissions'] = $newPermissions;


//        foreach ($Curd->display_list as $key=>$item){
//            if(!empty($item['isformdata'])){
//                $Curd->display_list[$key]['name']=str_replace("formdata.i_","formdatai_",$item['name']);
//            }
//        }
//
//        $result['data']['pageset']['display_list']=$Curd->display_list;

//        foreach ($result['data']['pagedata']['result'] as $key=>$item){
//            //var_dump($key);
//            foreach ($item['formdata'] as $key2=>$item2){
//                var_dump($result['data']['pagedata']['result'][$key]);
//                $result['data']['pagedata']['result'][$key]['formdata'.$key2]='';//$item['formdata'][$key2];
//            }
//        }
        //formdata

        return $result;

    }

}
