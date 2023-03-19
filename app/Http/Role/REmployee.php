<?php


namespace App\Http\Role;

use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\Config as ConfigBase;
use App\Http\Common\Base\Config;
use App\Http\Dbctrl\Jiami;
use App\Http\Tool\Tool1;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class REmployee extends RoleBase
{
    public $id;
    public $company_id;
    public $name;
    public $jobid;
    //public static $usercls;
    //public static $flag_list;
    public $is_admin;
    public $company_flag_str='all';
    public $user_flag_str;
    public $info;

    static public $cache_Prefix = 'em';

    static  $RoleIO = null;

    static $RoleIOReal = null;

    static $RoleIOReal_1 = null;




    static $RoleType=null;









    static function addRoleType($name){
        if(empty(REmployee::$RoleType)){
            REmployee::$RoleType=$name;
        }else{
            REmployee::$RoleType=REmployee::$RoleType.'.'.$name;
        }
        Log::info(REmployee::$RoleType);
    }


    public function requiredFlag($FlagName){


        if($FlagName==null)return true;


        if($this->company_flag_str=="all"){

            if($this->is_admin)return true;
            if(strrpos($this->user_flag_str,'-'.$FlagName.'-')!==false){
                return true;
            }else{
                return false;
            }
        }

        if(strrpos($this->company_flag_str,'-'.$FlagName.'-')!==false){

            if($this->is_admin)return true;
            if(strrpos($this->user_flag_str,'-'.$FlagName.'-')!==false){
                return true;
            }else{
                return false;
            }

        }else{
            return false;
        }





    }


    static function getInstance()
    {
        if (empty(self::$RoleIO)) {
            self::$RoleIO = new self;
            return self::$RoleIO;
        } else {
            return self::$RoleIO;
        }
    }




    static public function apicors_get_info($token)
    {

        $info = Cache::get(static::$cache_Prefix . "token:" . $token);

//        Log::info('$info');
//        Log::info(json_encode($info));
        if (!!$info) return $info;


        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['accesstoken', '=', $token],
                        ['platform', '=', Tool1::getplatform()],
//                        ['company_id', '=', CCompany::getCompanyId()],
                        ['expire', '>', time()]
                    ]
            ]
        ];


        $users = ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employee_tokens, ['userid'], $where, null,
            'expire',
            1,
            [0, 1]
        );


//        Log::info($users);

        if (count($users) == 0) {
            return false;
        }


        $info = static::getSessionEmployeeInfo($users[0]->userid);
        //dd($info);


        Cache::put(static::$cache_Prefix . "token:" . $token, $info, 30);

        return $info;
    }

    public static function session_get_info($employee_id)
    {

        if (!$employee_id) return false;

        $info = Cache::get(static::$cache_Prefix . "session:" . $employee_id);

        if (!!$info) return $info;



        $info = static::getSessionEmployeeInfo($employee_id);

        if (!$info) return false;

        Cache::put(static::$cache_Prefix . "session:" . $employee_id, $info, 30);

        return $info;
    }

    private static function getSessionEmployeeInfo($employee_id)
    {


        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['_uuid', '=', $employee_id],
                        //['company_id', '=', CCompany::getCompanyId()],
                    ]
            ]
        ];



        $Employees = ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employees, ['_uuid',
            'jobid',
            'username',
            'company_id',
            'user_id',
            'name',
            'usercls',
            'is_admin',
            'is_senior',
            'flag_list'
        ], $where);

        if (count($Employees) == 0) return false;

        static::initflaginfo($Employees[0]);

        return $Employees[0];

    }

    static private function _getcompany_flag(&$employee)
    {


        return 'all';

        $funcallback = function ($query) {

            $query->leftJoin('erp_buyserveitems', 'erp_buyserveitems.id', '=', 'erp_company_servelists.serve_id');
//            $query->leftJoin('erp_employees',function($leftjoin){
//                $leftjoin->on( 'erp_employees.userid', '=', 'erp_depots.updated_id')
//                    ->where('erp_employees.company_id','=',1)
//                    ->whereNull('erp_employees.deleted_at');
//            });
            $query->groupBy('erp_company_servelists.serve_id');

        };
        $where = [
            ['a' => 'where',
                'arr' =>
                    [['company_id', '=', $employee->company_id], ['endtime', '>', date('Y-m-d H:i:s', time())]]
            ]
        ];
        $getserveinfo = DbCtrl::sample_get('erp_company_servelists', [
            'erp_company_servelists.serve_id',
            'erp_buyserveitems.RidList'
        ], $where, $funcallback);

        $ridarr = [];
        foreach ($getserveinfo as $item) {
            if ($item->serve_id == null) continue;
            if ($item->RidList == null) {
                return 'all';
            }
            $ridarr = array_merge($ridarr, explode('-', $item->RidList));
        }



        $ridarr = array_unique($ridarr);
        $employee->companyRidarr = $ridarr;
        //dd($ridarr);

        $where = [
            ['a' => 'whereIn',
                'arr' => [
                    ['id', $ridarr]
                ]]
        ];

        $getpermission1 = DbCtrl::sample_get(Config::$db_sys_permission_lists, ['uriidlist'], $where);

        $company_flag_str = '-';
        foreach ($getpermission1 as $key => $item) {
            $company_flag_str .= $item->uriidlist . '-';
        }

        return $company_flag_str;

    }


    static private function initflaginfo(&$employee)
    {
        //dd($getserveinfo);


        $employee->company_flag_str = static::_getcompany_flag($employee);


        //explode('-',$ErpEmployeeInfo->flag_list


        if ($employee->usercls != 9) {

            $employee->is_admin = 0;

            //explode('-',$employee->flag_list)
            $flaglist = explode('-', $employee->flag_list);

            if ($employee->company_flag_str != 'all') {

                $flaglist = array_intersect($employee->companyRidarr, $flaglist);
            }

            if (count($flaglist) == 0) {
                $getpermission2 = [];
            } else {
                $where = [
                    ['a' => 'whereIn',
                        'arr' => [
                            ['id', $flaglist]
                        ]]];

                $getpermission2 = ConfigBase::getconn()->sample_get(ConfigBase::$db_sys_permission_lists, ['uriidlist'], $where);


            }

            $user_flag_str = '-';
            foreach ($getpermission2 as $key => $item) {
                $user_flag_str .= $item->uriidlist . '-';
            }
        } else {
            $employee->is_admin = 1;
            $user_flag_str = '';
        }

        $employee->user_flag_str = $user_flag_str;

        //dd($employee);



        //




    }


    static public $HeaderTokenKey = 'X-Token';
    static public $postTokenKey = '_employeetoken';
    static public $CookieTokenKey = 'Admin-Token';
    static public $IdTag = 'employee_id';




    public function init_temp_replace($uid,$alias){

        $ErpEmployeeInfo = Cache::get($alias . "uid:" .$uid );

        if(empty($ErpEmployeeInfo)){
            $ErpEmployeeInfo = static::getSessionEmployeeInfo($uid);
            Cache::put($alias . "uid:" .$uid , $ErpEmployeeInfo, 20);
        }


        if(empty($ErpEmployeeInfo))return false;

        CCompany::setId($ErpEmployeeInfo->company_id);


        if (!$ErpEmployeeInfo) return false;

        $this->info = $ErpEmployeeInfo;
        $this->id = $ErpEmployeeInfo->_uuid;
        $this->name = $ErpEmployeeInfo->name;
        $this->company_id = CCompany::getCompanyId();

        $this->company_flag_str = $ErpEmployeeInfo->company_flag_str;
        $this->user_flag_str = $ErpEmployeeInfo->user_flag_str;

        $this->is_admin = $ErpEmployeeInfo->is_admin;


        return true;


    }

    public function init()
    {





        if (env('ApiCors')) {

            $token = request()->header(static::$HeaderTokenKey);

            if (!$token) {
                $token = request()->input(static::$postTokenKey);
            }

            //dd($token);

            if (!$token && !!$_COOKIE) {
                $token = isset($_COOKIE[static::$CookieTokenKey]) ? $_COOKIE[static::$CookieTokenKey] : null;
            };
            if (!$token) return false;

//            Log::info($token);
            $ErpEmployeeInfo = static::apicors_get_info($token);

        } else {

            $employee_id = session()->get(static::$IdTag);
            Log::info('$employee_id');
            Log::info($employee_id);

            if (empty($employee_id)) return false;
            $ErpEmployeeInfo = static::getSessionEmployeeInfo($employee_id);
        };

        if(empty($ErpEmployeeInfo))return false;

        CCompany::setId($ErpEmployeeInfo->company_id);

//        Log::info('ErpEmployeeInfo');
//        Log::info(json_encode($ErpEmployeeInfo,JSON_UNESCAPED_UNICODE));

//        dd($ErpEmployeeInfo);


        if (!$ErpEmployeeInfo) return false;

        $this->info = $ErpEmployeeInfo;
        $this->id = $ErpEmployeeInfo->_uuid;
        $this->name = $ErpEmployeeInfo->name;
        $this->company_id = CCompany::getCompanyId();

        $this->company_flag_str = $ErpEmployeeInfo->company_flag_str;
        $this->user_flag_str = $ErpEmployeeInfo->user_flag_str;

        $this->is_admin = $ErpEmployeeInfo->is_admin;






        //var_dump($ErpEmployeeInfo->flag_list);




        //var_dump( static::$flag_list);
        return true;
    }



}
