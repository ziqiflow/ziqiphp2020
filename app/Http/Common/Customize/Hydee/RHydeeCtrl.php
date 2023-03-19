<?php


namespace App\Http\Common\Customize\Hydee;


use App\Http\Common\ConfigRoot;
use App\Http\Controllers\Controller;

class RHydeeCtrl extends Controller
{

    function SyncUware(){
        H_u_ware_q::SyncFromHaidian();
        $this->SyncUware2();
    }

    function SyncUware2(){

        $database=config('database.connections');
        $mysql=$database['mysql'];
        $mysql['database']="dataman";
        $database['xuzhonda']=$mysql;
        config(['database.connections'=>
            $database
        ]);

        ConfigRoot::$connname='xuzhonda';

        H_u_ware_q::SyncFromHaidian();
    }



}
