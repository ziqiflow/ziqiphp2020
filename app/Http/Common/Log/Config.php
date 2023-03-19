<?php


namespace App\Http\Common\Log;


use App\Http\Common\ConfigRoot;

class Config extends ConfigRoot
{
    static $db_mongo_logs='logs';


    static public $usemongodb=true;


}