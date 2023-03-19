<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\JsonMessage;
use App\Http\Common\OaFlow\Export\FlowTimeOutExport;
use App\Http\Common\utils\MongoDateTrans;
use App\Http\Controllers\Controller;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use Illuminate\Support\Facades\Log;


class DFlowTimeoutSummary extends Controller
{
    public static $DBid=1559960108;

    static public function getpostdata(){
        $Curd= Config::getDbCtrlCurdOBJ(static::$DBid,DbCtrlCurdOBJ::$OtherKeysSearch);
        $Curd->ReturnIsView=false;

        $Curd->perPage=0;

        $search=request()->json('search');

        $whereboat=[];

        if(isset($search['form']['hasfinish'])){
            switch ($search['form']['hasfinish'])
            {
                case '未完成':
                    array_push($whereboat, ['hasfinish','=',0]);
                    break;
                case '完成':
                    array_push($whereboat, ['hasfinish','=',1]);
                    break;
                default:

            }
        }


        if(empty($search['form']['first_expired_at'])){
            return JsonMessage::Creat(false,'月份不可为空');
        }

        array_push($whereboat,[
            'first_expired_at','>', date('Y-m-01 0:0:0',strtotime($search['form']['first_expired_at']))
        ]);
        array_push($whereboat,[
            'first_expired_at','<=', date('Y-m-01 0:0:0',strtotime($search['form']['first_expired_at'].' +1 month'))
        ]);

//        Log::info($whereboat);

        if(count($whereboat)){
            $where=[
                ['a'=>'where',
                    'arr'=>
                        $whereboat
                ]
            ];
        }else{
            $where=[];
        }

        $backdata= $Curd->search_data(request()->input('currentPage',1),$search,$where);

        $result= $backdata['data']['pagedata']['result'];

        //return $result;

        foreach ($result as $key=>$item){
            MongoDateTrans::ObjtoString($result[$key]['created_at']);
            MongoDateTrans::ObjtoString($result[$key]['finished_at']);
            $result[$key]['msgid']=(string)$result[$key]['msgid'];
        }




        $colldata= collect($result);
        $userlist= $colldata->groupBy('to');

//        return $userlist;

        $objs= $userlist->map(function ($item){

            $data=collect();
            $data['toer']=$item[0]['toer'];


            $data['finishNum']=
                $item->filter(function ($item2){
                    return $item2['hasfinish'];
                })->count();

            $data['unfinishNum']=
                $item->filter(function ($item2){
                    return !$item2['hasfinish'];
                })->count();

            $data['expiredtimes']=$item->sum('expiredtimes');


            $data['expirealltime']=$item->sum(function ($item2){

                //Log::info($item2);

                if(isset($item2['first_expired_at'])){

                    if(empty($item2['finished_at'])){
                        return time()-strtotime($item2['first_expired_at']);
                    }else{
                        return strtotime($item2['finished_at'])-strtotime($item2['first_expired_at']);
                    }
                }else{

                    $secound=null;
                    if(empty($item2['finished_at'])){
                        $secound= time()-strtotime($item2['created_at']);
                    }else{
                        $secound= strtotime($item2['finished_at'])-strtotime($item2['created_at']);
                    }
                    $secound=$secound+($item2['expiredtimes']-1)*86400;
                    return $secound;
                }



            });

            return $data;
    });


        $list=[];
        foreach ($objs as $key=>$item){

            $item['uuid']=$key;
            array_push($list,$item);
        }


        return JsonMessage::Creat(true,'',$list);

    }




    static public function list(){


        if(request()->isMethod('POST')){
            return static::getpostdata();
        }




        $Curd= Config::getDbCtrlCurdOBJ(static::$DBid,DbCtrlCurdOBJ::$OtherKeysSearch);
        $Curd->ReturnIsView=false;

        $back=$Curd->searchform();
        return JsonMessage::Creat(true,'',[
            'pageset'=>$back['data']['pageset'],
            'DefaultData'=>$back['data']['DefaultData'],
        ]);


    }



}