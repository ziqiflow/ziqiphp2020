<?php


namespace App\Http\Role;


use Illuminate\Support\Facades\Session;

class RAdmin extends RoleBase
{

    public  $id;
    public  $name;
    static $RoleIO=null;


    static function getInstance()
    {
        if (empty(self::$RoleIO)) {
            self::$RoleIO = new self;
            return self::$RoleIO;
        } else {
            return self::$RoleIO;
        }
    }




    public function init(){
        $AdminInfo=Session::get('AdminUserInfo');
        if(!$AdminInfo){
            return false;

        }
        $this->id=$AdminInfo['id'];
        $this->name=$AdminInfo['name'];
        return true;
    }



}