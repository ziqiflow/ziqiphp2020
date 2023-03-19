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

class DDingtalkUserDelete extends Controller
{
    public static $DBid=1554516328;


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



        // Config::$db_oa_rl_dingtalk_users.

        $result=Config::getconn()->sample_get(Config::$db_oa_rl_dingtalk_users,[
           '_inner_uuid',
            'name',
            '__id'
        ],$where);


        $user_inner_list=[];
        $dd_user_list=[];


        $log=[];

        foreach ($result as $item){
            if(!empty($item->_inner_uuid)){
                array_push($user_inner_list,$item->_inner_uuid);
            }
            if(!empty($item->__id)){
                array_push($dd_user_list,$item->__id);
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





//        $num_employ=1;
//        $num_dingtalk=1;


        $sessionid=time().rand(0,9999);

        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_uuid',$user_inner_list]
                    ]
            ]
        ];

        $num_employ=Config::getconn()->sample_delete(BaseConfig::$db_erp_employees,$where,true,$sessionid);

        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['__id',$dd_user_list]
                    ]
            ]
        ];

        $num_dingtalk=Config::getconn()->sample_delete(Config::$db_oa_rl_dingtalk_users,$where,true,$sessionid);


        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['e_id',$user_inner_list]
                    ]
            ]
        ];


        Config::getconn()->sample_delete(BaseConfig::$db_erp_employee_role_rl,$where,true,$sessionid);
        Config::getconn()->sample_delete(BaseConfig::$db_erp_employee_department_rl,$where,true,$sessionid);

        $msg='删除成功,删除内部员工表'.$num_employ.'人;删除钉钉关联员工表'.$num_dingtalk.'人;';
        MLog::deleteInfo(['tag'=>'dd.user.delete','msg'=>$msg,'sid'=>$sessionid]);
        return JsonMessage::Creat(true,$msg);
    }

    static public function list(){


        $Curd= Config::getDbCtrlCurdOBJ(static::$DBid,DbCtrlCurdOBJ::$OtherKeysSearch);

        $Curd->BladeSearchformL='common.DingTalk.searchform.deleteuser';

        $lastupdatetime= CDingtalk::getLastUpdateTime(CDingtalk::$logfileuser);

        $Curd->OtherViewData=['title'=>'钉钉被删除用户确认删除','lastupdatetime'=>$lastupdatetime==null?null:date('Y-m-d H:i:s',$lastupdatetime)];

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
