<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use Illuminate\Support\Facades\Log;

class CFormTempSave
{

    static $type_creat=1;
    static $type_deal=2;

    static public function deleteBycreat($flowid){

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['type','=',static::$type_creat],
                        ['c_id','=',Config::getUser()->id],
                        ['flowid','=',(string)$flowid]
                    ]
            ]
        ];
//        Log::info('deleteBycreat');
//        Log::info($where);
        return static::delete($where);
    }

    static public function deleteByDeal($msgid){

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['type','=',static::$type_deal],
                        ['c_id','=',Config::getUser()->id],
                        ['msgid','=',(string)$msgid]
                    ]
            ]
        ];
        return static::delete($where);
    }

    static public function delete($where){

       return Config::getmonconn()->sample_delete(Config::$mongo_flowformtempsaves,$where);

    }



    static public function deleteByAuto(){


    }

    static public function saveFromDeal($msgid,$flowdata,$inputdata){


        unset($flowdata['ignoreFormMd5']);





        $update=[
            'flowdata'=>$flowdata,
            'inputdata'=>$inputdata,
            'updated_at'=>date('Y-m-d H:i:s',time()),
        ];



        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['type','=',static::$type_deal],
                        ['c_id','=',Config::getUser()->id],
                        ['msgid','=',$msgid]
                    ]
            ]
        ];

        if(Config::getmonconn()->sample_count(Config::$mongo_flowformtempsaves,$where)){


            return Config::getmonconn()->sample_update(Config::$mongo_flowformtempsaves,$where,$update);


        }else{

            $update['type']=static::$type_deal;

            $update['c_id']=Config::getUser()->id;

            $update['msgid']=$msgid;

            $update['company_id']=CCompany::getCompanyId();

            $update=$update+Config::return_user_info('c_id');

            return  Config::getmonconn()->sample_insert(Config::$mongo_flowformtempsaves,$update);

        }




    }



    static public function saveFromCreat($flowid,$flowdata,$inputdata){




        $update=[
            'flowdata'=>$flowdata,
            'inputdata'=>$inputdata,
            'updated_at'=>date('Y-m-d H:i:s',time()),
        ];



        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['type','=',static::$type_creat],
                        ['c_id','=',Config::getUser()->id],
                        ['flowid','=',$flowid]
                    ]
            ]
        ];

        if(Config::getmonconn()->sample_count(Config::$mongo_flowformtempsaves,$where)){


            return Config::getmonconn()->sample_update(Config::$mongo_flowformtempsaves,$where,$update);


        }else{

            $update['type']=static::$type_creat;

            $update['c_id']=Config::getUser()->id;

            $update['flowid']=$flowid;

            $update['company_id']=CCompany::getCompanyId();

            $update=$update+Config::return_user_info('c_id');

           return  Config::getmonconn()->sample_insert(Config::$mongo_flowformtempsaves,$update);

        }


    }


    static public function getTempbyDeal($msgid){

        //Log::info($flowid);

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['msgid','=',$msgid],
                        ['type','=',static::$type_deal],
                        ['c_id','=',Config::getUser()->id]
                    ]
            ]
        ];

        return static::getTemp($where);

    }

    static public function getTempbyCreat($flowid){

        //Log::info($flowid);

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowid','=',$flowid],
                        ['type','=',static::$type_creat],
                        ['c_id','=',Config::getUser()->id]
                    ]
            ]
        ];

        return static::getTemp($where);

    }


    static public function getTemp($where){
        $list= Config::getmonconn()->sample_get(Config::$mongo_flowformtempsaves,'*',$where,
             null,'updated_at',1,[0,1]
             );

        //Log::info($list);

        if(count($list)==0)
        {
            return null;
        }
        return $list[0];
    }

    static public function getTemps($where){
        return Config::getmonconn()->sample_get(Config::$mongo_flowformtempsaves,'*',$where);
    }

}