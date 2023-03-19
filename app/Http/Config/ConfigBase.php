<?php


namespace App\Http\Config;


use App\Http\Dbctrl2\DBCtrlOBJ;
use Illuminate\Support\Facades\DB;

class ConfigBase
{
    public static $user=null;

    public static $tokenkey="niubi";

    public static $connname='mysql';



    public static $db_sys_permission_lists='erp_sys_permission_lists';


    public static $db_users='erp_users';
    public static $db_user_emails='erp_user_emails';
    public static $db_user_mobiles='erp_user_mobiles';
    public static $db_user_logs='erp_user_logs';
    public static $db_user_signlists='erp_user_signlists';


    public static $db_erp_employees='erp_employees';
    public static $db_erp_employee_signlists='erp_employee_signlists';
    public static $db_erp_employee_default_datas='erp_employee_default_datas';
    public static $db_erp_employee_tokens='erp_employee_tokens';



    public static $db_employee_roles='erp_roles';
    public static $db_employee_role_groups='erp_role_groups';


    public static $db_departments='erp_departments';



    public static $db_erp_employee_department_rl='erp_employee_department_rl';
    public static $db_erp_employee_role_rl='erp_employee_role_rl';




    public static $db_erp_companys='erp_companys';
    public static $db_erp_company_sets='erp_company_sets';



















    function xxx(){

        for($x=0;$x<200;$x++){
            echo uniqid().PHP_EOL;
        }

    }

    function uuid($prefix = '')
    {
        $chars = md5(uniqid(mt_rand(), true));
        $uuid  = substr($chars,0,8) . '-';
        $uuid .= substr($chars,8,4) . '-';
        $uuid .= substr($chars,12,4) . '-';
        $uuid .= substr($chars,16,4) . '-';
        $uuid .= substr($chars,20,12);
        return $prefix . $uuid;
    }

    static public function getconn($withdelete=false){//$HasDeleteKey
        return new DBCtrlOBJ(static::$connname,$withdelete);
    }

    static public function  get_uuid_short(){
       $data= DB::connection(static::$connname)->select('select uuid_short() as _uuid');
       return $data[0]->_uuid;
    }



    }