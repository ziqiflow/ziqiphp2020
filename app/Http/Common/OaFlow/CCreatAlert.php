<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\utils\MongoDateTrans;
use Illuminate\Support\Facades\Log;
use \App\Http\Common\Base\Config as ConfigBase;
use MongoDB\BSON\ObjectId;

class CCreatAlert
{

    static $pagesize=20;


    static function setdone($id){

        if(!is_array($id)){
            $list=[$id];
        }else{
            $list=$id;
        }

        foreach ($list as $key=>$item){
            $list[$key]=new ObjectId($item);
        }


        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['userid', '=', Config::getUser()->id],
                        ['hasdone', '=', false]
                    ]
            ],
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_id',$list]
                    ]
            ]
        ];

        return Config::getmonconn()->sample_update(
            Config::$mongo_flowcreatalerts,
            $where,
            [
                'hasdone'   => true,
                'doneat'    => MongoDateTrans::intToUTC(time())
            ],
            false
        );

    }


    static function list($nowpage = 1, $search = []){



        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['userid', '=',Config::getUser()->id],
//                        ['hasdone', '=', false],
//                        ['status', '=', static::$status_finish],
//                        ['dealtype', '!=', static::$dealtype_message],

                    ]
            ]
        ];

        $where = array_merge($where, $search);


        $totalItems = Config::getmonconn()->sample_count(Config::$mongo_flowcreatalerts, $where);

        $result = Config::getmonconn()->sample_get(
            Config::$mongo_flowcreatalerts,
            ['*'],
            $where,
            null,
            'created_at',
            1,
            [($nowpage - 1) * static::$pagesize, static::$pagesize])->all();


        foreach ($result as $key => $item) {
            $result[$key]['_id'] = (string)$result[$key]['_id'];
            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }

        return [
            'result' => $result,
            'totalItems' => $totalItems,
            'pageSize' => static::$pagesize,
            'currentPage' => $nowpage];
    }


    static function CreatAlert($flowid, $flowname, $desc,$contact)
    {

        $testData = ['firstcreated_deptid' => null,
            'firstcreated_userid' => null,
            'lastmsgcreated_deptid' => null,
            'lastmsgcreated_id' => null,
            'formdata' => null
        ];

        $ContactExplan= new CFlowGetContact($testData,true);

        $userlist = $ContactExplan->contacttousers($contact);

        if (count($userlist) == 0) {
            return false;
        }

//        $where=[
//            ['a'=>'whereIn',
//                'arr'=>
//                    [
//                        ['_uuid',$userlist]
//                    ]
//            ]
//        ];
//        return  ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employees,
//            ['name','_uuid']
//            ,$where
//        );


        $arr=[];

        foreach ($userlist as $userid) {

            $where = [
                ['a' => 'where',
                    'arr' =>
                        [
                            ['userid', '=', $userid],
                            ['flowid', '=', $flowid],
                            ['created_at', '>', MongoDateTrans::intToUTC(time() - Config::$CreatAlertInterval)]
                        ]
                ]
            ];

            if (Config::getmonconn()->sample_count(Config::$mongo_flowcreatalerts, $where)) {

                Log::info($where);
                Log::info($flowname . '已经创建');
                continue;
            }


            $where = [
                ['a' => 'where',
                    'arr' =>
                        [
                            ['_uuid', '=', $userid]
                        ]
                ]
            ];


            $employees = ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employees,
                ['name', '_uuid']
                , $where
            );

            if (count($employees) == 0) {
                continue;
            }

            $_id=Config::getmonconn()->sample_insert(Config::$mongo_flowcreatalerts,
                [
                    'flowname' => $flowname,
                    'flowid' => $flowid,
                    'desc'=>$desc,
                    'created_at' => MongoDateTrans::intToUTC(time()),
                    'userid' => $userid,
                    'username' => $employees[0]->name,
                    'hasdone' => false,
                    'hassend' => false
                ]
            );
            if($_id){
                array_push($arr,$_id);
            }
//        $mongo_flowcreatalerts
        }

        return $arr;



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
                            ['hassend', '=', false],
                            ['hasdone', '=', false]
                        ]
                ]
            ];


            $result = Config::getmonconn()->sample_get(Config::$mongo_flowcreatalerts,
                ['*'],
                $where,
                null,
                'created_at',
                1,
                [0,120]
            )->all();




            foreach ($result as $key => $item) {

                $result[$key]['_id'] = (string)$result[$key]['_id'];

                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['_inner_uuid','=',$item['userid']]
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
                }

                $result[$key]['userid']=$users[0]->userid;

                MongoDateTrans::ObjtoString($result[$key]['created_at']);

//                //return  CFlowDesigns::get('5c21b66ff376dd00ae00fe72');

//                $result[$key]['flowlistOi'] = CFlowList::get((string)$result[$key]['flowlistid']);
////            $result[$key]['flowlistOi']['formdata'] = CFlowDealerUtil::tranMongoToModel(
////                $result[$key]['flowlistOi']['formdata'], $result[$key]['flowdesigner']['datalist']
////            );

                $sendback=Config::Messager()->sendOaNeedCreat($result[$key]);

                ///static::SendMessage($result[$key]);
                //var_dump($sendback);
                //dd($sendback);
                if($sendback){
                    $where2=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['_id','=',new ObjectId($item['_id'])]
                                ]
                        ]
                    ];

                    $update=['hassend'=>true];

                    if(Config::Messager()->UserPlatform=='dingtalk'){
                        $update['dd_task_id']=$sendback;
                    }


                    Config::getmonconn()->sample_update(Config::$mongo_flowcreatalerts,$where2,$update);
                }



            }

            dd($result);

        }catch (\Exception $e){
            Config::Messager()->senderror($e->getMessage(),'oamessage');
        }
        //dd($result);
    }




    static public function AutoCreatAlert(){

//



        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['canuse', '=', true]
                        ,
                        ['set.canautoalert', '=', true]
                    ]
            ]
        ];


        $result = Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,
            ['set.autoalerts','name'],
            $where
        )->all();

        foreach ($result as $item){
            $item['_id']=(string)$item['_id'];
            if(!isset($item['set']['autoalerts'])){
                continue;
            }

            foreach ($item['set']['autoalerts'] as $alert){

                if(!(isset($alert['deptuser'])&&count($alert['deptuser'])>0)){
                    continue;
                }

                $alerttimestamp=null;
                $desc=null;

                switch ($alert['type'])
                {
                    case 'year':

                        if(
                            empty($alert['month'])
                            ||empty($alert['day'])
                            ||empty($alert['time'])){
                            continue 2;
                        }

//                        dd(date('Y-'.$alert['month'].'-'.$alert['day'].' '.$alert['time'],time()));
                        //var_dump(date('Y-'.$alert['month'].'-'.$alert['day'].' '.$alert['time'],time()));
                        $alerttimestamp=strtotime(date('Y-'.$alert['month'].'-'.$alert['day'].' '.$alert['time'],time()));
                        $desc='每年'.$alert['month'].'月'.$alert['day'].'号'.$alert['time'];
//                        if(-time())<Config::$CreatAlertInterval){

//                            $backinfo=CCreatAlert::CreatAlert($item['_id'],$item['name'],$alert['deptuser']);
//                            Log::info($backinfo);
//                            var_dump($backinfo);
//                        }

                        break;
                    case 'month':


//                        date('Y-m-d H:i:s',));

                        if(
                            empty($alert['day'])
                            ||empty($alert['time'])
                            ||empty($alert['disminutes'])
                        ){
                            continue 2;
                        }
                        $alerttimestamp=mktime(0,0,0,date('m'),1,date('Y'))+60*$alert['disminutes'];

//                        if((-time())<Config::$CreatAlertInterval){
//                            $backinfo=CCreatAlert::CreatAlert($item['_id'],$item['name'],$alert['deptuser']);
//                            Log::info($backinfo);
//                            var_dump($backinfo);
//                        }
                        $desc='每月'.$alert['day'].'号'.$alert['time'];
//




                        break;
                    case 'week':


                        if(
                            empty($alert['week'])
                            ||empty($alert['time'])
                            ||empty($alert['disminutes'])
                        ){
                            continue 2;
                        }

                        $alerttimestamp=mktime(0,0,0,date('m'),date('d')-date('w')+1,date('Y'))+60*$alert['disminutes'];

                        $desc='每周星期'.$alert['week'].' '.$alert['time'];

//                        date('Y-m-d H:i:s',mktime(0,0,0,date('m'),date('d')-date('w')+1,date('Y')));
//                        if((-time())<Config::$CreatAlertInterval){
//                            $backinfo=CCreatAlert::CreatAlert($item['_id'],$item['name'],$alert['deptuser']);
//                            Log::info($backinfo);
//                            var_dump($backinfo);
//                        }

                        break;

                    case 'day':


                        //dd($alert);

                        if(
                            empty($alert['time'])
                            ||empty($alert['disminutes'])
                        ){
                            continue 2;
                        }

                        $alerttimestamp=mktime(0,0,0,date('m'),date('d'),date('Y'))+60*$alert['disminutes'];
//                        date('Y-m-d H:i:s',mktime(0,0,0,date('m'),date('d'),date('Y')));
                        $desc='每日'.$alert['time'];
//dd($alerttimestamp);


                        break;

                    default:

                }

                if(!$alerttimestamp)continue;
                var_dump($alerttimestamp);
                var_dump(date('Y-m-d H:i:s',$alerttimestamp));

                if($alerttimestamp>time()&&$alerttimestamp-time()<Config::$CreatAlertInterval){
                    $backinfo=static::CreatAlert($item['_id'],
                        $item['name'],
                        $desc,
                        $alert['deptuser']);
                    Log::info($backinfo);
                    var_dump($backinfo);
                }


            }



        }



        dd($result);


    }






}
