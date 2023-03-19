<?php


namespace App\Http\Common\DingTalk;


use App\Http\Common\Log\MLog;
use App\Http\Common\OaFlow\CFlowDesigns;
use App\Http\Controllers\Controller;
use App\Http\Common\JsonMessage;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Common\Base\Config as BaseConfig;

class DDingtalkDeptDelete extends Controller
{
    public static $DBid=1554787984;


    static public function delete(){

        $ids= request()->json('ids');

        if(count($ids)==0){
            return JsonMessage::Creat(false,'不可为空');
        }



        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['__id',$ids]
                    ]
            ]
        ];

        $result=Config::getconn()->sample_get(Config::$db_oa_rl_dingtalk_depts,[
           '_inner_uuid',
            'name',
            '__id'
        ],$where);


        $dept_inner_list=[];
        $dd_dept_list=[];


        $log=[];

        foreach ($result as $item){
            if(!empty($item->_inner_uuid)){
                array_push($dept_inner_list,$item->_inner_uuid);
            }
            if(!empty($item->__id)){
                array_push($dd_dept_list,$item->__id);
            }
        }
        //return $result;



        $allFlowText= json_decode(CFlowDesigns::getCacheAllList(),true);
        $rejectList=[];

        foreach ($result as $item)
        {
            foreach ($allFlowText as $flow){
                unset($flow['created_id']);
                unset($flow['updated_id']);
                $str=json_encode($flow,JSON_UNESCAPED_UNICODE);
//                Log::info('1-'.$str);
//                Log::info('2-'.$item->_inner_uuid);
//                Log::info('3-'.stripos($str,''.$item->_inner_uuid));
                if(!stripos($str,''.$item->_inner_uuid)===false){
                    //Log::info($flow['name']);
                    $hasfind=false;
                    foreach ($rejectList as $key=>$reject){
                        if($reject['uuid']==$item->_inner_uuid){
                            $hasfind=true;
                            array_push($rejectList[$key]['list'],['flowid'=>$flow['_id'],'flowname'=>$flow['name']]);
                            break;
                        }
                    }
                    if(!$hasfind){
                        array_push($rejectList,[
                            'uuid'=>$item->_inner_uuid,
                            'name'=>$item->name,
                            'list'=>
                                [
                                ['flowid'=>$flow['_id'],'flowname'=>$flow['name']]
                                ]
                        ]);
                    }
                }
            }
        }

        if(count($rejectList)){

            return JsonMessage::Creat(false,'reject',$rejectList);
            //return $rejectList;
        }



//        return $dd_dept_list;

        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['parent_id',$dept_inner_list]
                    ]
            ]
        ];

        $getSonDept=Config::getconn()->sample_get(BaseConfig::$db_departments,['name','_uuid','parent_id'],$where);

        //return $getSonDept;

        if(count($getSonDept)){

            $rejectList=[];


            foreach ($result as $item)
            {

                foreach ($getSonDept as $son){

                    if($son->parent_id==$item->_inner_uuid){


                        $hasfind=false;
                        foreach ($rejectList as $key=>$reject){
                            if($reject['uuid']==$item->_inner_uuid){

                                $hasfind=true;
                                array_push($rejectList[$key]['son'],['uuid'=>$son->_uuid,'name'=>$son->name]);
                                break;
                            }
                        }

                        if(!$hasfind){
                            array_push($rejectList,[
                                'uuid'=>$item->_inner_uuid,
                                'name'=>$item->name,
                                'son'=>
                                    [
                                        ['uuid'=>$son->_uuid,'name'=>$son->name]
                                    ]
                            ]);
                        }



                    }



                }




            }
            //

            return JsonMessage::Creat(false,'reject_with_son',$rejectList);
        }
        //return $rejectList;








//        $num_employ=1;
//        $num_dingtalk=1;


        $sessionid=time().rand(0,9999);

        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_uuid',$dept_inner_list]
                    ]
            ]
        ];

        $num_employ=Config::getconn()->sample_delete(BaseConfig::$db_departments,$where,true,$sessionid);

        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['__id',$dd_dept_list]
                    ]
            ]
        ];

        $num_dingtalk=Config::getconn()->sample_delete(Config::$db_oa_rl_dingtalk_depts,$where,true,$sessionid);

        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['d_id',$dd_dept_list]
                    ]
            ]
        ];

         Config::getconn()->sample_delete(BaseConfig::$db_erp_employee_department_rl,$where,true,$sessionid);


        $msg='删除成功,删除内部部门表'.$num_employ.'部门;删除钉钉关联部门表'.$num_dingtalk.'部门;';
        MLog::deleteInfo(['tag'=>'dd.dept.delete','msg'=>$msg,'sid'=>$sessionid]);
        return JsonMessage::Creat(true,$msg);
    }

    static public function list(){


        $Curd= Config::getDbCtrlCurdOBJ(static::$DBid,DbCtrlCurdOBJ::$OtherKeysSearch);

        $Curd->BladeSearchformL='common.DingTalk.searchform.deleteuser';

        $lastupdatetime= CDingtalk::getLastUpdateTime(CDingtalk::$logfiledept);

        $Curd->OtherViewData=['title'=>'钉钉被删除部门确认删除','lastupdatetime'=>$lastupdatetime==null?null:date('Y-m-d H:i:s',$lastupdatetime)];

        if(request()->isMethod('POST')){
            if($lastupdatetime==null){
                return JsonMessage::Creat(false,'最近无同步记录，无法判断哪些属于删除');
            }
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['updated_at','<',date('Y-m-d 0:0:0',$lastupdatetime)]

                        ]
                ]
            ];

            return $Curd->search_data(request()->input('currentPage',1),request()->json('search'),$where);
        }
        return $Curd->searchform();


    }



}