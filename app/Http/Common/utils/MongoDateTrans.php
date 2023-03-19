<?php


namespace App\Http\Common\utils;


use MongoDB\BSON\UTCDateTime;

class MongoDateTrans
{
    static public function testtr(){
        $utc= MongoDateTrans::StringToUTC(date('Y-m-d H:i:s',time()));

        $times= MongoDateTrans::UTCToString($utc);

        echo '当前时间：'.$times.'<br>如错误的话，那么就说明是时间转换有问题';
    }
    static public function UTCToInt($utc){
        $date = $utc->toDateTime();
        $date->setTimezone(new \DateTimeZone(date_default_timezone_get()));
        return $date->getTimestamp();
    }
    static public function UTCToString($utc,$format='Y-m-d H:i:s'){
        $date = $utc->toDateTime();
        $date->setTimezone(new \DateTimeZone(date_default_timezone_get()));
        return $date->format($format);
    }


    static public function StringToUTC($str){

        return new UTCDateTime(strtotime($str)*1000);
    }
    static public function intToUTC($time){
        return new UTCDateTime($time*1000);
    }

    static public function ObjtoString(&$UtcObj){
        if (isset($UtcObj)&&$UtcObj instanceof UTCDateTime) {
            $UtcObj=MongoDateTrans::UTCToString($UtcObj);
        }
    }









}
