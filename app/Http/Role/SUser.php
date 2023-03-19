<?php


namespace App\Http\Role;


use Illuminate\Support\Facades\Session;

class SUser
{
    public static $id;
    public static $nickname;

    public static function init(){

        $userinfo=Session::get('ErpUserInfo');

        if(!$userinfo){
            return false;

        }
        static::$id=$userinfo->id;
        static::$nickname=$userinfo->nickname;
        return true;
    }

}