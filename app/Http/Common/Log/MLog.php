<?php


namespace App\Http\Common\Log;


use App\Http\Common\utils\MongoDateTrans;
use Illuminate\Support\Facades\Log;

class MLog
{






    static public function deleteDetailInfo($data){
        $data['_type']='delete_detail';
        return self::Login($data);
    }

    static public function deleteInfo($data){
        $data['_type']='delete';
        return self::Login($data);
    }

    static public function info($data){
        if(is_string($data)){
            $data=['msg'=>$data];
        }
        $data['_type']='info';
       return self::Login($data);
    }


    static public function error($data){
        if(is_string($data)){
            $data=['msg'=>$data];
        }
        $data['_type']='error';
        return static::Login($data);

    }


    static public function Login($data){
        $data['created_at']=MongoDateTrans::intToUTC(time());
        if(Config::$usemongodb){
           return Config::getmonconn()->sample_insert(Config::$db_mongo_logs,$data);
        }
        return Log::info($data);
    }




}