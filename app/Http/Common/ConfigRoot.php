<?php


namespace App\Http\Common;

use App\Http\Dbctrl2\DBCtrlOBJ;
use App\Http\Dbctrl3\DbCtrlCurdOBJ;
use App\Http\Role\REmployee;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class ConfigRoot
{


    public static $db_set_db_ctrl2s='set_db_ctrl2s';
    public static $db_set_microdatas='set_microdatas';


    public static $db_sys_permission_lists='sys_permission_lists';
    public static $db_sys_roles='sys_roles';


    public static $User=null;


    public static function getUser()
    //:REmployee
    {
        if(empty(static::$User)){
            static::$User=REmployee::getInstance();
        }
        return static::$User;
    }


    public static $connname='mysql';


    static function uuid($prefix = '')
    {
        $chars = md5(uniqid(mt_rand(), true));
        $uuid  = substr($chars,0,8) . '-';
        $uuid .= substr($chars,8,4) . '-';
        $uuid .= substr($chars,12,4) . '-';
        $uuid .= substr($chars,16,4) . '-';
        $uuid .= substr($chars,20,12);
        return $prefix . $uuid;
    }

    static protected $ConnIO=[];

    static public function getconn($alias='conn',$withdelete=false,$connname=null){//$HasDeleteKey
        //static::getRole()
        if(empty($connname))$connname=static::$connname;
        $name=$connname.($withdelete?$alias.'_withdelete':$alias);
        if(isset(static::$ConnIO[$name])){
            return static::$ConnIO[$name];
        }
        static::$ConnIO[$name]=new DBCtrlOBJ($connname,$withdelete);
        return static::$ConnIO[$name];
    }

    static public function  get_uuid_short($connname=null){



        list($msec, $sec) = explode(' ', microtime());
        $msectime = (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
        return (int)($msectime .(random_int(10000,99999)));
    }


    static protected $MonConnIO=[];

    static public function getmonconn($alias='monconn',$withdelete=false){//$HasDeleteKey
        $name=$withdelete?$alias.'_withdelete':$alias;
        if(isset(static::$MonConnIO[$name])){
            return static::$MonConnIO[$name];
        }
        static::$MonConnIO[$name]=new DBCtrlOBJ('mongodb',$withdelete,true);
        return static::$MonConnIO[$name];
    }

    static public function getScheme(){
        return "https";
    }
    static public function getSchemeAndHttpHost(){
        return static::getScheme().'://'.request()->getHttpHost();
    }


    static public function setLogPath($path){


        config(['logging.channels'=>[
            'newSetPath' => [
                'driver' => 'daily',
                'path' => storage_path('logs/'.$path.'/l.log'),
                'level' => 'debug',
                'days' => 7,
            ],
        ]]);
        Log::setDefaultDriver('newSetPath');


    }



    static public function addConnon($name,$set){
        $database=config('database.connections');
        $database[$name]=$set;
        config(['database.connections'=>
            $database
        ]);
    }

    static public function getDbCtrlCurdOBJ($id=null, $otherkeysJosn=['edit_list', 'search_list', 'orderby_list', 'display_list', 'display_set']){

        return new DbCtrlCurdOBJ($id,$otherkeysJosn);
    }



}
