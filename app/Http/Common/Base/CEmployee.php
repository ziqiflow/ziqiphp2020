<?php


namespace App\Http\Common\Base;


use App\Http\Common\JsonMessage;


class CEmployee
{



    static $status_waiting=1;
    static $status_working=2;
    static $status_leaved=3;


    static public function getEmployeeById($uid,$select=['name','_uuid']){

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_uuid','=',$uid]
                    ]
            ]
        ];

        $res= Config::getconn()->sample_get(Config::$db_erp_employees,$select, $where);
        if($res->count()==0)return null;
        return $res[0];
    }


    static public  function getEmployeeByIdList($e_id_list){

        if(count($e_id_list)==0){
            return collect([]);
        }

        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_uuid',$e_id_list]
                    ]
            ]
        ];

        return Config::getconn()->sample_get(Config::$db_erp_employees,['name','_uuid']
            ,
            $where
        );
    }




    static public function GetInfo(){

        //Log::info(json_encode(SEmployee::$info));
        //Config::getUser()->
        return JsonMessage::Creat(true,'',Config::getUser()->info);
    }



}
