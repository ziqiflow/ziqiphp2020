<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\JsonMessage;
use App\Http\Common\OaFlow\Export\FlowTimeOutExport;
use App\Http\Common\utils\MongoDateTrans;
use App\Http\Controllers\Controller;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use Illuminate\Support\Facades\Log;


class DFlowTimeoutLog extends Controller
{
    public static $DBid=1559960107;

    static public function autoSetFinishFromTimeoutTable(){


       $pagesize = request()->input('pagesize',0);

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['hasfinish','=',0]
                    ]
            ]
        ];

        $funcallback=function ($query)use ($pagesize){
            if($pagesize!=0){
                $query->offset(0)->limit((int)$pagesize);
            }
        };


        $list=Config::getmonconn()->sample_get(Config::$mongo_flowtimeoutlogs,['msgid'],$where,$funcallback,'$natural',1);
        //dd($list);
        foreach ($list as $item){
            //dd((string)$item['msgid']);
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['_id','=',$item['msgid']]
                        ]
                ]
            ];


            $msgs= Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,['finished_at','status'],$where);

//            dd($msgs);

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['hasfinish','=',0],
                            ['msgid','=',$item['msgid']],
                        ]
                ]
            ];
            echo $item['msgid'];
            if(count($msgs)==0){
                echo '没查询到标记为不存在<br>';
                Config::getmonconn()->sample_update(Config::$mongo_flowtimeoutlogs,$where,['hasfinish'=>2]);
            }else{
                if(!empty($msgs[0]['finished_at'])){
                    echo '已经完成，标记为完成<br>';
                    Config::getmonconn()->sample_update(Config::$mongo_flowtimeoutlogs,$where,['hasfinish'=>1,'finished_at'=>$msgs[0]['finished_at']]);
                    continue;
                }

                if($msgs[0]['status']==CFlowMessageTo::$status_cancel){
                    echo '已经取消，标记为取消<br>';
                    Config::getmonconn()->sample_update(Config::$mongo_flowtimeoutlogs,$where,['hasfinish'=>3]);
                    continue;
                }
                if($msgs[0]['status']==CFlowMessageTo::$status_cancel_for_revoke){
                    echo '已经撤回，标记为撤回<br>';
                    Config::getmonconn()->sample_update(Config::$mongo_flowtimeoutlogs,$where,['hasfinish'=>4]);
                    continue;
                }
                echo '未完成，无法标记<br>';
            }
        }
    }


    static public function autoSetFinishFromLastFinishMessage(){


        $lastdate= request()->input('lastdate',null);

        if(empty($lastdate))
        {
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['finished_at','>',MongoDateTrans::intToUTC(strtotime('-1 hours'))],
                            ['expiredtimes','>',0],
                        ]
                ]
            ];
        }
        else{
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['finished_at','>',MongoDateTrans::intToUTC(strtotime($lastdate))],
                            ['expiredtimes','>',0],
                        ]
                ]
            ];
        }



        $msgs= Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,
            //'*'
            ['_id','finished_at']
            ,$where);


//        dd($msgs);

        foreach ($msgs as $item){

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['msgid','=',$item['_id']],
                        ]
                ]
            ];

            if(Config::getmonconn()->sample_update(Config::$mongo_flowtimeoutlogs,$where,['hasfinish'=>1,'finished_at'=>$item['finished_at']])){
                echo 'msgid:'.$item['_id'].'标记完成<br>';
            }
        }









    }


    static public function export(){


        $Curd= Config::getDbCtrlCurdOBJ(static::$DBid,DbCtrlCurdOBJ::$OtherKeysSearch);

        $search=request()->json('search');

        if (!empty($search['form']['created_at']) && count($search['form']['created_at']) == 2) {
            $search['form']['created_at'][0] = MongoDateTrans::StringToUTC($search['form']['created_at'][0]);
            $search['form']['created_at'][1] = MongoDateTrans::StringToUTC($search['form']['created_at'][1]);
        }


        $Curd->perPage=0;


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['expiredtimes','>',0]
                    ]
            ]
        ];

        if(isset($search['form']['hasfinish'])){


            switch ($search['form']['hasfinish'])
            {
                case '未完成':
                    $where=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['hasfinish','=',0],
                                    ['expiredtimes','>',0]
                                ]
                        ]
                    ];
                    break;
                case '完成':

                    $where=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['hasfinish','=',1],
                                    ['expiredtimes','>',0]
                                ]
                        ]
                    ];

                    break;
                default:

            }

        }

        $backdata= $Curd->search_data(request()->input('currentPage',1),$search,$where);

        $result= $backdata['data']['pagedata']['result'];


        foreach ($result as $key=>$item){
          MongoDateTrans::ObjtoString($result[$key]['created_at']);
            MongoDateTrans::ObjtoString($result[$key]['finished_at']);
            $result[$key]['msgid']=(string)$result[$key]['msgid'];

        }

        return (new FlowTimeOutExport($result))->download('表单导出.xlsx');





    }



    static public function list(){

        //DbCtrlCurdOBJ::$BladeSearchform='common.DingTalk.searchform.deleteuser';


        $Curd= Config::getDbCtrlCurdOBJ(static::$DBid,DbCtrlCurdOBJ::$OtherKeysSearch);
        //$lastupdatetime= CDingtalk::getLastUpdateTime(CDingtalk::$logfilerole);

        $Curd->ReturnIsView=false;
        if(request()->isMethod('POST')){

            $search=request()->json('search');

            if (!empty($search['form']['created_at']) && count($search['form']['created_at']) == 2) {
                $search['form']['created_at'][0] = MongoDateTrans::StringToUTC($search['form']['created_at'][0]);
                $search['form']['created_at'][1] = MongoDateTrans::StringToUTC($search['form']['created_at'][1]);
            }

            $where=[];

            if(isset($search['form']['hasfinish'])){

                switch ($search['form']['hasfinish'])
                {
                case '未完成':
                    $where=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['hasfinish','=',0]
                                ]
                        ]
                    ];
                  break;
                case '完成':

                    $where=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['hasfinish','=',1]
                                ]
                        ]
                    ];
                  break;
                default:

                }

            }


            return $Curd->search_data(request()->input('currentPage',1),$search,$where);
        }

        $back=$Curd->searchform();
        return JsonMessage::Creat(true,'',[
            'pageset'=>$back['data']['pageset'],
            'DefaultData'=>$back['data']['DefaultData'],
        ]);


    }



}