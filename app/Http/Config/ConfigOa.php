<?php


namespace App\Http\Config;


use App\Http\Dbctrl2\DBCtrlOBJ;

class ConfigOa extends ConfigBase
{

    static $db_oa_rl_dingtalk_depts='oa_rl_dingtalk_depts';

    static $db_oa_rl_dingtalk_users='oa_rl_dingtalk_users';

    static $db_oa_rl_dingtalk_rolegroups='oa_rl_dingtalk_rolegroups';

    static $db_oa_rl_dingtalk_roles='oa_rl_dingtalk_roles';


    static $mongo_flowdesigns='flowdesigns';
    static $mongo_flowlists='flowlists';
    static $mongo_flowlogs='flowlogs';
    static $mongo_flowsmessagetos='flowmessagetos';






    static public function getmonconn($withdelete=false){//$HasDeleteKey
        return new DBCtrlOBJ('mongodb',$withdelete,true);
    }




}