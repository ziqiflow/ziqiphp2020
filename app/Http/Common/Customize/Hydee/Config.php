<?php


namespace App\Http\Common\Customize\Hydee;
use App\Http\Common\ConfigRoot;

class Config extends ConfigRoot
{
    static $db_haidian_u_ware_q='haidian_u_ware_q';

    static $db_hydee_u_ware_q='u_ware_q';
    static $db_hydee_u_ware_class='u_ware_class';
    static $db_hydee_c_class='c_class';

//    public static $connname='sqlsrv';


    static $u_ware_q_use_cache=true;

    static $db_haidian_u_ware_q_cache='haidian_u_ware_q_cache';

}
