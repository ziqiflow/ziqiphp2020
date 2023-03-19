<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\utils\MongoDateTrans;
use function foo\func;
use MongoDB\BSON\ObjectId;

class CTest
{

    static public function test1(){
        $funcallback=function($query){
            $query->where(function($query) {
                $query->orWhere('PreMsgId','=','5d4514c5f376dd007a4e57f4');
                $query->orWhere('PreMsgIds','=','5d4514c5f376dd007a4e57f4');
            });
        };


        $msgs= Config::getmonconn()->sample_get(
            Config::$mongo_flowsmessagetos,
            '*',
            null,
            $funcallback
        );

        dd($msgs);


        $where_merge=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowlistid','=',new ObjectId('5d4514aff376dd007d04be8c')],
                        ['nextmsg.dealtype','=',CFlowMessageTo::$dealtype_wait_merge],
                    ]
            ],
//            ['a'=>'whereIn',
//                'arr'=>
//                    [
//                        ['NowFunId',  array_values(array_diff($merge_list,[$PreviousFun['id']]))],



//                    ]
//            ]
        ];
        //Log::info($where_merge);


        $flowlogs= Config::getmonconn()->sample_get(Config::$mongo_flowlogs,[
            'PreFunName','NowFunName',
            'PreFunId','NowFunId',
            'flowmsgid','created_at'
        ],$where_merge,null,'created_at',1);


        dd($flowlogs);



        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['status', '=', CFlowMessageTo::$status_waiting],
                        ['dealtype', '!=', CFlowMessageTo::$dealtype_message],
                        ['timeexpired','<',MongoDateTrans::intToUTC(time())],

                        //['timeexpired','>',MongoDateTrans::intToUTC(time())]


                    ]
            ]
        ];

        $funcallback=function($query){

            $query->where(function($query) {
                $query->orWhere('expiredtimes','<',10);
                $query->orWhere('node_do_id200','=',SEmployee::$id);
            });

        };




        $result = Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,
            ['*'],
            $where,
            null,
            'created_at',
            1,
            [0,120]
        )->all();

        dd($result);






    }


    static public function retabledate(){

        set_time_limit(0);

         $where=[];

        $id= request()->input('_id');
        $update= request()->input('update');


        if(!empty($id)){
           $where=[
               ['a'=>'where',
                   'arr'=>
                       [
                           ['_id','=',new ObjectId($id)]
                       ]
               ]
           ];
       }

       //dd($where);


        $alldesigns= Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,'*',$where);

       //dd($alldesigns);

        $updatetime=0;
        $updatesuccesstime=0;



        foreach ($alldesigns as $design){

            if(!isset($design['datalist']))continue;

            foreach ($design['datalist'] as $data){

                //var_dump($data);

                if(!isset($data['type']))continue;
                if($data['type']=='table'){

                    $where=[
                        ['a'=>'where',
                            'arr'=>
                                [
                                    ['flowid','=',$design['_id']]
                                ]
                        ]
                    ];

                    $flowlist=  Config::getmonconn()->sample_get(Config::$mongo_flowlists,'*',$where);
                    //dd($data);

                    //dd($flowlist);

                    foreach ($flowlist as $flowitem){

                        $form_index='i_'.$data['index'];


                        if(isset($flowitem['formdata'][$form_index])){

                            if(is_array($flowitem['formdata'][$form_index])){

                                //dd($flowitem['formdata'][$form_index]);


                                $hasfind=false;

                                foreach ($flowitem['formdata'][$form_index] as $key=>$item){

                                    foreach ($flowitem['formdata'][$form_index][$key] as $key2=>$item2){

                                        if (preg_match("/T16\:00\:00\.000Z$/", $item2)) {
                                            $hasfind=true;
                                            $flowitem['formdata'][$form_index][$key][$key2]=date('Y-m-d',strtotime($item2));
                                        }elseif (preg_match("/\.000Z$/", $item2)){
                                            echo '特殊情况:error';
                                            var_dump($data);
                                            var_dump($item2);
                                            echo PHP_EOL;

                                        }
                                        //$flowitem['formdata'][$form_index][$key]

                                    }

                                }


                                if($hasfind){

                                    $where=[
                                        ['a'=>'where',
                                            'arr'=>
                                                [
                                                    ['_id','=',$flowitem['_id']]
                                                ]
                                        ]
                                    ];


                                    echo '修改'.(string)$flowitem['_id'].PHP_EOL;
                                    echo 'formdata:'.json_encode($flowitem['formdata'],JSON_UNESCAPED_UNICODE).PHP_EOL;
                                    //dd($flowitem['formdata']);

                                    $updatetime++;



                                    if($update){
                                        if(                                    Config::getmonconn()->sample_update(Config::$mongo_flowlists,$where,['formdata'=>$flowitem['formdata']])){
                                            $updatesuccesstime++;
                                            echo '修改成功'.PHP_EOL;
                                        }else{
                                            echo '修改失败'.PHP_EOL;
                                        }

                                    }

                                }










                            }



                        }


                    }






                }


            }



        }

        echo '修改次数:'.$updatetime.PHP_EOL;
        echo '修改成功次数:'.$updatesuccesstime.PHP_EOL;
        //dd($alldesigns);
        //dd($flowlist);


    }


    static public function testdesc(){

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowid','=',new ObjectId('5ccc0790f93f8391e20ebd82')]
                    ]
            ]
        ];



        $xxx=Config::getmonconn()->sample_get(Config::$mongo_flowlists,['_id','RunIndex'],$where,null,'$natural',1);
        return $xxx;

    }


    static public function reset_timeoutlog(){



       $utc= MongoDateTrans::StringToUTC(date('Y-m-d H:i:s',time()));

      $times= MongoDateTrans::UTCToString($utc);

       echo $times;

//        $where=[
//            ['a'=>'whereNull',
//                'arr'=>
//                    [
//                        'msgid'
//                    ]
//            ]
//        ];
//
//        $list=Config::getmonconn()->
//sample_get(Config::$mongo_flowtimeoutlogs,'*',$where,null,'created_at',1,[0,9000]);



    }
    static public function rebindmsgsworkname(){


        $where=[
            ['a'=>'whereNull',
                'arr'=>
                    [
                        'workname'
                    ]
            ]
        ];

        $msgs=Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos,'*',$where,null,'created_at',1,[0,1000]);

//        dd($msgs);


        echo '共计'.count($msgs).'条<br>';

        foreach ($msgs as $msg){
            $flowlist=CFlowList::get((string)$msg['flowlistid']);
            if(!!$flowlist){
                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['_id','=',$msg['_id']]
                            ]
                    ]
                ];
                if(Config::getmonconn()->sample_update(Config::$mongo_flowsmessagetos,$where,['workname'=>$flowlist['workname']??null])){
                 echo $msg['_id'].'修改成功'.($flowlist['workname']??null).'<br>';
                }
            }


        }






    }


    static public function rest(){
        $list= Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,'*')->all();

        foreach ($list as $item){
            static::resetfunlist_btngroup((string)$item['_id']);
        }
    }


    static public function resetfunlist_btngroup(){


        $id=request()->input('id');
        $design= CFlowDesigns::get($id);


        if(!isset($design['funlist'])){
            return null;
        }

        foreach ($design['funlist'] as $key=>$funlist){
            foreach ($design['funlist'][$key]['btnGroup'] as $key2=>$btn){
                $design['funlist'][$key]['btnGroup'][$key2]['canchoseander']=0;
            }
        }


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',new ObjectId($id)]
                    ]
            ]
        ];
        Config::getmonconn()->sample_update(Config::$mongo_flowdesigns,$where,[
            'funlist'=>$design['funlist']
        ]);

        dd($design);

    }


    static $index=1;


    static public function resetFormIndex(){


        $id=request()->input('id');
        $design= CFlowDesigns::get($id);

        static::Fresetindex($design['formset']['list']);

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',new ObjectId($id)]
                    ]
            ]
        ];
        Config::getmonconn()->sample_update(Config::$mongo_flowdesigns,$where,[
            'formset'=>$design['formset']
        ]);

        dd($design);

    }


    static public function Fresetindex(&$list){

        foreach ($list as $key=>$item){


            if(isset($list[$key]['keyindex'])){
                $list[$key]['keyindex']=static::$index;
                static::$index++;
            }

            if(isset($list[$key]['columns'])){
                foreach ($list[$key]['columns'] as $key2=>$item2){
                    static::Fresetindex($list[$key]['columns'][$key2]['list']);
                }
            }

        }

    }





    static public function resetDesign(){

        $list= Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,'*')->all();
        //return $list;

        foreach ($list as $key=>$item){

            foreach ($item['funlist'] as $key2=>$item2){
                $list[$key]['funlist'][$key2]['formEditLimit']=[];
            }

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['_id','=',$item['_id']]
                        ]
                ]
            ];
            //dd($list[$key]['funlist']);
            Config::getmonconn()->sample_update(Config::$mongo_flowdesigns,$where,['funlist'=>$list[$key]['funlist']]);


        }
    }

}