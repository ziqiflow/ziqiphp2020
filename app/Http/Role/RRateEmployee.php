<?php


namespace App\Http\Role;



use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class RRateEmployee extends RoleBase
{
    public  $id;
    public  $name;
    public  $info;
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
        $token=request()->input('_rateemployeetoken');
        //Log::info('$token');
        //Log::info($token);

        if(!$token)return false;


        $employee= Cache::get('rate'.$token);

//        Log::info('$employee,JSON_UNESCAPED_UNICODE');
//        Log::info(json_encode($employee,JSON_UNESCAPED_UNICODE));

        if(!$employee){
            return false;
        }


        $this->info=$employee;
        $this->id=$employee->_uuid;
        $this->name=$employee->d_name;

        return true;
    }


}
