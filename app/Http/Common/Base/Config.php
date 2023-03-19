<?php


namespace App\Http\Common\Base;

use App\Http\Common\ConfigRoot;

class Config extends ConfigRoot
{
    public static $tokenkey="niubi";
    public static $connname='mysql';



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













    }