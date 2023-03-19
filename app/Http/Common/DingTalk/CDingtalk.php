<?php



namespace App\Http\Common\DingTalk;

use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CDept;
use \App\Http\Common\Base\Config as ConfigBase;
use App\Http\Common\JsonMessage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CDingtalk
{



    static public $logfileuser='dingtalk_log_user';
    static public $logfiledept='dingtalk_log_dept';
    static public $logfilerole='dingtalk_log_role';


    static public function getconn(){

        return Config::getconn('c');
    }

    static public function saveLastUpdateTime($type){
        $filename=CCompany::getCompanyPath().$type.'.json';

        return Storage::disk()->put($filename,json_encode(['last_update_time'=>time()]));

    }
    static public function getLastUpdateTime($type){
        $filename=CCompany::getCompanyPath().$type.'.json';
        if(!Storage::disk()->exists($filename)){
            return null;
        }
        try{
           return json_decode(Storage::disk()->get($filename),true)['last_update_time'];
        }catch (\Exception $e){
            return null;
        }
    }









    static private function getroles(){


        $app = Config::getConcactWork();

        $rolelist=[];

        $offset=0;

        do {
            //$nowget= $app->role->list(100,$offset)['result'];



            $nowget= UDingtalk::getrolelist($app['credential']->token(),100,$offset)['result'];


            $offset+=100;

            if(count($nowget['list'])>0){
                $rolelist= array_merge($rolelist,$nowget['list']);
            }

        } while ($nowget['hasMore']);

        return $rolelist;
    }


    static private function getusersBydepartid($dept_id){

        $app = Config::getConcactWork();

        $userlist=[];

        $offset=0;

        do {

            $nowget= $app->user->list($dept_id,100,$offset);
            sleep(1);
            Log::info($nowget);
            $offset+=100;

            foreach ($nowget['userlist'] as $item){
                array_push($userlist,$item['userid']);
            }

//            if(count($nowget['userlist'])>0){
//                $userlist= array_merge($userlist,$nowget['userlist']);
//            }

        } while ($nowget['hasMore']);

        return $userlist;
    }


    static public function SyncAutoEntry(){




    }


    static public function SyncAutoEntryOne($type){

        set_time_limit(0);
        $ClassConnOBJ=static::getconn();
        $ClassConnOBJ->BeforeInsertArrL=['company_id'=>CCompany::getCompanyId()];
        $ClassConnOBJ->BeforeCountL =
        $ClassConnOBJ->BeforeUpdateL =
        $ClassConnOBJ->BeforeDeleteL =
        $ClassConnOBJ->BeforeGetL = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['company_id', '=', CCompany::getCompanyId()]
                    ]
            ]
        ];

        $result=null;

        try {
            switch ($type) {
                case 'dept':
                    $result = static::GetDeptDataFormDingtalk();
                    break;
                case 'role':
                    $result = static::GetRoleDataFormDingtalk();
                    break;
//            case 'rolegroup':

//                break;
                case 'user':
                    $result = static::GetUserDataFormDingtalk();
                    break;
                default:
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return JsonMessage::Creat(false, $e->getMessage());
        }

        Config::AfterSyncAutoHandler();

        return JsonMessage::Creat(true, '更新成功', $result);

    }

    static public function SyncFromDingtalkByUserid($uuid){

        $app = Config::getConcactWork();
        $usersdetail=[];
        //foreach ($userlist as $userid){
        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_inner_uuid','=',$uuid]
                    ]
            ]
        ];
       $users=  static::getconn()->sample_get(Config::$db_oa_rl_dingtalk_users,['userid','name'],$where);
       if(!count($users)){
           return false;
       }
       Log::info('用户编号：'.$users[0]->userid.'；名称：'.$users[0]->name);
            array_push($usersdetail,$app->user->get($users[0]->userid));
        //}
        static::SynchronizeUser($usersdetail);

        return $usersdetail;
    }


//    static public  function GetDataFormDingtalk(){
//    }


     static public  function GetDeptDataFormDingtalk(){

         Log::setDefaultDriver('dingtalk');

         set_time_limit(0);

         $filename=CCompany::getCompanyPath().'dd.deptsdetail'.date('Y_m_d',time()).'.json';

         if(Storage::disk()->exists($filename)){
             $deptsdetail=json_decode(Storage::disk()->get($filename),true);
         }

         if(empty($deptsdetail)){

             $app = Config::getConcactWork();
             //return $app->user->simpleList(1);
         //return '97809189';
         //return $app->user->admin();

         $departments=$app->department->list(0)['department'];
         //https://open-doc.dingtalk.com/microapp/serverapi2/dubakq#-1

         //return $departments;

         foreach ($departments as $key=> $depart)
         {


//             $departments[$key]['userlist']=$app->user->list($depart['id']);

             $departments[$key]['info']=$app->department->get($depart['id']);
             $departments[$key]['order']=$departments[$key]['info']['order'];
         }

        // static::findsondepart($departments,1);
         $deptsdetail=static::findsondepart($departments,1);
         Storage::disk()->put($filename,json_encode($deptsdetail,JSON_UNESCAPED_UNICODE));

         }


         $lasttime= static::getLastUpdateTime(static::$logfiledept);

         if($lasttime!=null&&date('Y-m-d',time())==date('Y-m-d',$lasttime)){
             //dd($deptsdetail);
             return $deptsdetail;
         }

         Log::info('开启部门同步：');

         static::SynchronizeDept($deptsdetail,1,1);


         static::saveLastUpdateTime(static::$logfiledept);
         Log::info('部门信息同步成功');
         return $deptsdetail;
     }


    static public  function GetUserDataFormDingtalk(){

        Log::setDefaultDriver('dingtalk');

        set_time_limit(0);

        $filename=CCompany::getCompanyPath().'dd.usersdetail'.date('Y_m_d',time()).'.json';

        if(Storage::disk()->exists($filename)){
            $usersdetail=json_decode(Storage::disk()->get($filename),true);
        }
        if(empty($usersdetail)){


            $app = Config::getConcactWork();

            $departments=$app->department->list(0)['department'];

            $userlist=static::getusersBydepartid(1);
            //Log::info($userlist);

            foreach ($departments as $key=> $depart)
            {

                $userlist=array_merge($userlist,static::getusersBydepartid($depart['id']));
                //break;
            }

            $userlist=array_unique($userlist);

            $usersdetail=[];
            $index=0;
            Log::info('开始获取用户信息。'.count($userlist));
            foreach ($userlist as $userid){
                array_push($usersdetail,$app->user->get($userid));
                $index++;
                if($index%2==0){
                    sleep(1);
                    Log::info('睡眠;index:'.$index);
                }
            }

            //return $usersdetail;

            Log::info('获取人员信息成功；共计'.count($usersdetail).'条');

            Storage::disk()->put($filename,json_encode($usersdetail,JSON_UNESCAPED_UNICODE));

        }

        $lasttime= static::getLastUpdateTime(static::$logfileuser);

        if($lasttime!=null&&date('Y-m-d',time())==date('Y-m-d',$lasttime)){
            return $usersdetail;
        }

        Log::info('开启人员同步：');
        static::SynchronizeUser($usersdetail);


        static::saveLastUpdateTime(static::$logfileuser);
        Log::info('人员信息同步成功');
        return $usersdetail;
    }



    static public  function GetRoleDataFormDingtalk(){

        Log::setDefaultDriver('dingtalk');

        set_time_limit(0);


        $filename=CCompany::getCompanyPath().'dd.rolesdetail'.date('Y_m_d',time()).'.json';

        if(Storage::disk()->exists($filename)){
            $rolesdetail=json_decode(Storage::disk()->get($filename),true);
        }
        if(empty($rolesdetail)) {


            $app = Config::getConcactWork();


            $rolesdetail = static::getroles();



            Storage::disk()->put($filename,json_encode($rolesdetail,JSON_UNESCAPED_UNICODE));

        }

        $lasttime= static::getLastUpdateTime(static::$logfilerole);

        if($lasttime!=null&&date('Y-m-d',time())==date('Y-m-d',$lasttime)){
            return $rolesdetail;
        }

        Log::info('开启角色同步：');
        static::SynchronizeRoleGroup($rolesdetail);
        static::saveLastUpdateTime(static::$logfilerole);
        Log::info('角色信息同步成功');
        return $rolesdetail;

    }

    static private function SynchronizeUser($userlist){

        foreach ($userlist as $item){

            //if(!$item['active'])continue;

            if(!isset($item['position'])){
                $item['position']=null;
            }
            if(!isset($item['jobnumber'])){
                $item['jobnumber']=null;
            }
            if(!isset($item['name'])){
                $item['name']=null;
            }


            Log::info('同步user：'.$item['name']);
            $_inner_uuid=null;
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
//                             ['company_id','=',CCompany::getCompanyId()],
                            ['unionid','=',$item['unionid']]
                        ]
                ]
            ];

            $users= ConfigBase::getconn()->sample_get(Config::$db_oa_rl_dingtalk_users,['_inner_uuid'],$where);



            if(count($users)==0){


                Log::info('之前未插入过钉钉关联表');
                Log::info('插入数据到员工表');
                $_inner_uuid= static::creatEmployeeByDingTalk($item);
                Log::info('获取到的员工uuid'.$_inner_uuid);

                Log::info('插入数据到钉钉oa-user表');
                static::getconn()->sample_insert(Config::$db_oa_rl_dingtalk_users,[
                    'company_id'=>CCompany::getCompanyId(),
                    '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,
                    'jobnumber'=>$item['jobnumber'],

                    'userid'=>$item['userid'],

                    'name'=>$item['name'],
                    'unionid'=>$item['unionid'],
                    //'roles'=>json_encode($item['roles']),
                    'position'=>$item['position'],
                    'mobile'=>$item['mobile']??null,
                    'isAdmin'=>$item['isAdmin']?1:0,
                    'isBoss'=>$item['isBoss']?1:0,
                    'isSenior'=>$item['isSenior']?1:0,
                    //'department'=>$item['department'],
                ]);



            }else{

                if(empty($users[0]->_inner_uuid)){

                    Log::info('表示钉钉关联表插入了，但是没有创建inner_id');

                    Log::info('插入数据到会员表');
                    $_inner_uuid= static::creatEmployeeByDingTalk($item);
                    Log::info('获取到的会员uuid'.$_inner_uuid);


                    Log::info('更新数据到钉钉oa-user表');

                    static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_users,$where,[
                        '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,
                        'userid'=>$item['userid'],
                        'jobnumber'=>$item['jobnumber'],
                        'name'=>$item['name'],
                        'unionid'=>$item['unionid'],
                        //'roles'=>json_encode($item['roles']),
                        'mobile'=>$item['mobile']??null,
                        'position'=>$item['position'],
                        'isAdmin'=>$item['isAdmin']?1:0,
                        'isBoss'=>$item['isBoss']?1:0,
                        'isSenior'=>$item['isSenior']?1:0,
                            'updated_at'=>date('Y-m-d H:i:s',time())
                        //'department'=>$item['department'],

                    ]);




                }else{

                    Log::info('对钉钉关联表和 员工表进行更新数据');


                    $_inner_uuid=$users[0]->_inner_uuid;

                    static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_users,$where,[
                        'jobnumber'=>$item['jobnumber'],
                        'name'=>$item['name'],
                        'unionid'=>$item['unionid'],
                        'userid'=>$item['userid'],
                        //'roles'=>json_encode($item['roles']),
                        'mobile'=>$item['mobile']??null,
                        'position'=>$item['position'],
                        'isAdmin'=>$item['isAdmin']?1:0,
                        'isBoss'=>$item['isBoss']?1:0,
                        'isSenior'=>$item['isSenior']?1:0,

                        'updated_at'=>date('Y-m-d H:i:s',time())
                        //'department'=>$item['department']

                    ]);

                    static::editEmployeeByDingTalk($_inner_uuid,$item);


                }
            }










        }


    }

    static private function SynchronizeRoleGroup($roletree){

        foreach ($roletree as  $item){

            Log::info('同步group：'.$item['name']);
            $_inner_uuid=null;
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
//                             ['company_id','=',CCompany::getCompanyId()],
                            ['groupId','=',$item['groupId']]
                        ]
                ]
            ];

            $groups= static::getconn()->sample_get(Config::$db_oa_rl_dingtalk_rolegroups,['_inner_uuid'],$where);



            if(count($groups)==0){


                Log::info('之前未插入过钉钉关联表');
                Log::info('插入数据到组表');
                $_inner_uuid= static::creatRoleGroupByDingTalk($item['name']);
                Log::info('获取到的角色组uuid'.$_inner_uuid);

                Log::info('插入数据到钉钉oa-rolegroup表');
                static::getconn()->sample_insert(Config::$db_oa_rl_dingtalk_rolegroups,[
                    'groupId'=>$item['groupId'],
                    'company_id'=>CCompany::getCompanyId(),
                    'name'=>$item['name'],
                    '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,
                ]);



            }else{

                if(empty($groups[0]->_inner_uuid)){

                    Log::info('表示钉钉关联表插入了，但是没有创建inner_id');

                    Log::info('插入数据到角色组表');
                    $_inner_uuid= static::creatRoleGroupByDingTalk($item['name']);
                    Log::info('获取到的角色组uuid'.$_inner_uuid);


                    Log::info('更新数据到钉钉oa-rolegroup表');

                    static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_rolegroups,$where,[
                        'name'=>$item['name'],
                        '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,

                        'updated_at'=>date('Y-m-d H:i:s',time())
                    ]);




                }else{

                    Log::info('对钉钉关联表和 角色组进行更新数据');


                    $_inner_uuid=$groups[0]->_inner_uuid;

                    static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_rolegroups,$where,[
                        'name'=>$item['name'],
                        'updated_at'=>date('Y-m-d H:i:s',time())
                    ]);

                    $where3=[
                        ['a'=>'where',
                            'arr'=>
                                [
//                                     ['company_id','=',CCompany::getCompanyId()],
                                    ['_uuid','=',$groups[0]->_inner_uuid]
                                ]
                        ]
                    ];

                    static::getconn()->sample_update(ConfigBase::$db_employee_role_groups,$where3,[
                        'groupname'=>$item['name'],

                    ]);
                }
            }

            static::SynchronizeRole($item['roles'],!!$_inner_uuid?$_inner_uuid:null,$item['groupId']);

        }


    }

    static private function SynchronizeRole($roles,$group_uuid,$groupID){

        foreach ($roles as $item){



                Log::info('同步role：'.$item['name']);
                $_inner_uuid=null;
                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [
//                             ['company_id','=',CCompany::getCompanyId()],
                                ['id','=',$item['id']]
                            ]
                    ]
                ];

                $roles= static::getconn()->sample_get(Config::$db_oa_rl_dingtalk_roles,['_inner_uuid'],$where);



                if(count($roles)==0){


                    Log::info('之前未插入过钉钉关联表');
                    Log::info('插入数据到角色表');
                    $_inner_uuid= static::creatRoleByDingTalk($item['name'],$group_uuid);
                    Log::info('获取到的角色uuid'.$_inner_uuid);

                    Log::info('插入数据到钉钉oa-role表');
                    static::getconn()->sample_insert(Config::$db_oa_rl_dingtalk_roles,[
                        'id'=>$item['id'],
                        'company_id'=>CCompany::getCompanyId(),
                        'name'=>$item['name'],
                        'groupId'=>$groupID,
                        '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,
                    ]);



                }else{

                    if(empty($roles[0]->_inner_uuid)){

                        Log::info('表示钉钉关联表插入了，但是没有创建inner_id');

                        Log::info('插入数据到角色表');
                        $_inner_uuid= static::creatRoleByDingTalk($item['name'],$group_uuid);
                        Log::info('获取到的角色uuid'.$_inner_uuid);


                        Log::info('更新数据到钉钉oa-role表');


                        static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_roles,$where,[
                            'name'=>$item['name'],
                            'groupId'=>$groupID,
                            '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,

                            'updated_at'=>date('Y-m-d H:i:s',time())
                        ]);




                    }else{

                        Log::info('对钉钉关联表和 角色表进行更新数据');


                        $_inner_uuid=$roles[0]->_inner_uuid;

                        static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_roles,$where,[
                            'name'=>$item['name'],
                            'groupId'=>$groupID,

                            'updated_at'=>date('Y-m-d H:i:s',time())
                        ]);

                        $where3=[
                            ['a'=>'where',
                                'arr'=>
                                    [
//                                     ['company_id','=',CCompany::getCompanyId()],
                                        ['_uuid','=',$roles[0]->_inner_uuid]
                                    ]
                            ]
                        ];

                        static::getconn()->sample_update(ConfigBase::$db_employee_roles,$where3,[
                            'name'=>$item['name'],
                            'group_id'=>$group_uuid
                        ]);
                    }
                }





        }
    }

     static private function SynchronizeDept($deptTree,$parentid,$parentuuid){

         foreach ($deptTree as  $item){

             Log::info('同步：'.$item['name']);
             $_inner_uuid=null;
             $where=[
                 ['a'=>'where',
                     'arr'=>
                         [
//                             ['company_id','=',CCompany::getCompanyId()],
                             ['id','=',$item['id']]
                         ]
                 ]
             ];

             $departs= static::getconn()->sample_get(Config::$db_oa_rl_dingtalk_depts,['_inner_uuid'],$where);

             if(count($departs)==0){


                 Log::info('之前未插入过钉钉关联表');
                 Log::info('插入数据到部门表');
                 $_inner_uuid= static::creatDeptByDingTalk($item['name'],$parentuuid,$item['order']);
                 Log::info('获取到的部门表uuid'.$_inner_uuid);

                 Log::info('插入数据到钉钉oa-Dept表');
                 static::getconn()->sample_insert(Config::$db_oa_rl_dingtalk_depts,[
                     'id'=>$item['id'],
                     'company_id'=>CCompany::getCompanyId(),
                     'name'=>$item['name'],
                     'order'=>$item['order'],
                     'parentid'=>$parentid,
                     '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,
                 ]);



             }else{

                 if(empty($departs[0]->_inner_uuid)){

                     Log::info('表示钉钉关联表插入了，但是没有创建inner_id');

                     Log::info('插入数据到部门表');
                    $_inner_uuid= static::creatDeptByDingTalk($item['name'],$parentuuid,$item['order']);
                     Log::info('获取到的部门表uuid'.$_inner_uuid);


                     Log::info('更新数据到钉钉oa-Dept表');

                     static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_depts,$where,[
                         'name'=>$item['name'],
                         'order'=>$item['order'],
                         'parentid'=>$parentid,
                         '_inner_uuid'=>!!$_inner_uuid?$_inner_uuid:null,

                         'updated_at'=>date('Y-m-d H:i:s',time())
                     ]);




                 }else{

                     Log::info('对钉钉关联表和 部门表进行更新数据');
                     $_inner_uuid=$departs[0]->_inner_uuid;




                     $wherex=[
                         ['a'=>'where',
                             'arr'=>
                                 [
                                     ['_uuid','=',$_inner_uuid]
                                 ]
                         ]
                     ];
                     if(static::getconn()->sample_count(ConfigBase::$db_departments,$wherex)){

                         $where3=[
                             ['a'=>'where',
                                 'arr'=>
                                     [
//                                     ['company_id','=',CCompany::getCompanyId()],
                                         ['_uuid','=',$departs[0]->_inner_uuid]
                                     ]
                             ]
                         ];

                         static::getconn()->sample_update(ConfigBase::$db_departments,$where3,[
                             'name'=>$item['name'],
                             'index'=>$item['order'],
                             'parent_id'=>$parentuuid,
                         ]);

                     }else{
                         $_inner_uuid= static::creatDeptByDingTalk($item['name'],$parentuuid,$item['order']);
                     }

                     static::getconn()->sample_update(Config::$db_oa_rl_dingtalk_depts,$where,[
                         'name'=>$item['name'],
                         'order'=>$item['order'],
                         'parentid'=>$parentid,
                         '_inner_uuid'=>$_inner_uuid,
                         'updated_at'=>date('Y-m-d H:i:s',time())

                     ]);



                 }
             }


             if(count($item['son'])>0){
                 static::SynchronizeDept($item['son'],$item['id'],!!$_inner_uuid?$_inner_uuid:null);
             }

         }


     }



     static private function findsondepart($departments,$parentid){
         $son=[];
         foreach ($departments as $item){

             if(!isset($item['parentid']))continue;

             if($parentid==$item['parentid']){
                 $item['son']=static::findsondepart($departments,$item['id']);
                 array_push($son,$item);
             }
         }
         return $son;
     }



    static private function creatDeptByDingTalk($name,$parent_id,$index){

        $_uuid=ConfigBase::get_uuid_short();

        if(static::getconn()->sample_insert(ConfigBase::$db_departments,[
            '_uuid'=>$_uuid,
            'index'=>$index,
            'parent_id'=>$parent_id,
            'name'=>$name,
            'company_id'=>CCompany::getCompanyId(),
            'created_at'=>date('Y-m-d H:i:s',time()),
        ])){
            return $_uuid;
        }
        return false;
    }


    static private function creatRoleGroupByDingTalk($name){

        $_uuid=ConfigBase::get_uuid_short();

        if(static::getconn()->sample_insert(ConfigBase::$db_employee_role_groups,[
            '_uuid'=>$_uuid,
            'company_id'=>CCompany::getCompanyId(),
            'groupname'=>$name,
            'created_at'=>date('Y-m-d H:i:s',time()),
        ])){
            return $_uuid;
        }
        return false;


    }


    static private function creat_employee_role_relation($employee_id,$role_id){



        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['r_id','=',$role_id],
                        ['e_id','=',$employee_id]
                    ]
            ]
        ];

        static::getconn()->sample_delete(ConfigBase::$db_erp_employee_role_rl,$where);

        static::getconn()->sample_insert(ConfigBase::$db_erp_employee_role_rl,
            ['company_id'=>CCompany::getCompanyId(),
                'r_id'=>$role_id,
                'e_id'=>$employee_id]
        );

    }


    static private function creat_employee_dept_relation($employee_id,$dept_id,$isSupervisor=false){



        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['d_id','=',$dept_id],
                        ['e_id','=',$employee_id]
                    ]
            ]
        ];

        static::getconn()->sample_delete(ConfigBase::$db_erp_employee_department_rl,$where);

        static::getconn()->sample_insert(ConfigBase::$db_erp_employee_department_rl,
            ['company_id'=>CCompany::getCompanyId(),
                'd_id'=>$dept_id,
                'e_id'=>$employee_id]
        );

    }



    static function ext_json_decode($str, $mode=false){
        if(preg_match('/\w:/', $str)){
            $str = preg_replace('/(\w+):/is', '"$1":', $str);
        }
        return json_decode($str, $mode);
    }



    //isLeaderInDepts: "{97816143:true}"
    //isLeaderInDepts: "{97816143:false}"
    static private function getuser_is_leader_in_dept($isLeaderInDepts){

        //Log::info($isLeaderInDepts);

        $isLeaderInDepts=static::ext_json_decode($isLeaderInDepts,true);
        //Log::info($isLeaderInDepts);

        if(!is_array($isLeaderInDepts))return null;

        $arr=[];

        foreach ($isLeaderInDepts as  $dd_dept_id => $stauts){

            if(!$stauts)continue;


            if($dd_dept_id==1){
                array_push($arr,1);
                continue;
            }



            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['id','=',$dd_dept_id]
                        ]
                ]
            ];

            $oadepts= static::getconn()->sample_get(Config::$db_oa_rl_dingtalk_depts,['_inner_uuid'],$where);

            if(count($oadepts)==1){
                array_push($arr,$oadepts[0]->_inner_uuid);
            }
        }

        if(count($arr))return json_encode($arr);
        return null;
    }



    static private function creatEmployeeByDingTalk($dduser,$uuid=null){


        $_uuid=$uuid?$uuid:ConfigBase::get_uuid_short();
        if(static::getconn()->sample_insert(ConfigBase::$db_erp_employees,array_merge([
            '_uuid'=>$_uuid,
            'company_id'=>CCompany::getCompanyId(),
            'jobid'=>isset($dduser['jobnumber'])?$dduser['jobnumber']:null,
            'name'=>$dduser['name'],
            'is_admin'=>$dduser['isAdmin']?1:0,
            'is_senior'=>$dduser['isSenior']?1:0,
            'is_leader_in_dept'=>static::getuser_is_leader_in_dept($dduser['isLeaderInDepts']),

            'created_at'=>date('Y-m-d H:i:s',time()),
        ],Config::$InsertEmployeeData))){

            static::Sync_emp_dept_role_relation($dduser,$_uuid);

            return $_uuid;
        }
        return false;
    }


    static private function editEmployeeByDingTalk($uuid,$dduser){


        //Log::info($dduser);
        //Log::info(static::getuser_is_leader_in_dept($dduser['isLeaderInDepts']));


        $where3=[
            ['a'=>'where',
                'arr'=>
                    [
                        //['company_id','=',CCompany::getCompanyId()],
                        ['_uuid','=',$uuid]
                    ]
            ]
        ];

        if(static::getconn()->sample_update(ConfigBase::$db_erp_employees,$where3,[

            'jobid'=>isset($dduser['jobnumber'])?$dduser['jobnumber']:null,
            'name'=>$dduser['name'],
            'is_admin'=>$dduser['isAdmin']?1:0,
            'is_senior'=>$dduser['isSenior']?1:0,
            'updated_at'=>date('Y-m-d H:i:s',time()),
            'is_leader_in_dept'=>static::getuser_is_leader_in_dept($dduser['isLeaderInDepts']),


        ])){
            Log::info('关联角色部门表');
            static::Sync_emp_dept_role_relation($dduser,$uuid);
        }else{


            Log::info('更新失败：此员工可能不存在');
            if(!static::getconn()->sample_count(ConfigBase::$db_erp_employees,$where3)){
                Log::info('此员工不存在，重新创建');
                self::creatEmployeeByDingTalk($dduser,$uuid);

                self::editEmployeeByDingTalk($uuid,$dduser);
            }
        }


    }





    static private function Sync_emp_dept_role_relation($dduser,$uuid){




        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['e_id','=',$uuid]
                    ]
            ]
        ];
        static::getconn()->sample_delete(ConfigBase::$db_erp_employee_department_rl,$where);
        static::getconn()->sample_delete(ConfigBase::$db_erp_employee_role_rl,$where);



        foreach ($dduser['department'] as $dept_id){
            CDept::$default_root_d_id;
            if($dept_id==1){

                static::creat_employee_dept_relation($uuid,1);
            }else{

                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['id','=',$dept_id]
                            ]
                    ]
                ];
                $dd_depts=static::getconn()->sample_get(Config::$db_oa_rl_dingtalk_depts,['_inner_uuid'],$where);
                if(count($dd_depts)>0){
                    static::creat_employee_dept_relation($uuid,$dd_depts[0]->_inner_uuid);
                }
            }
        }

        //Log::info($dduser);

        if(isset($dduser['roles'])){
            foreach ($dduser['roles'] as $role){
                 $where=[
                     ['a'=>'where',
                         'arr'=>
                             [
                                 ['id','=',$role['id']]
                             ]
                     ]
                 ];
                    $dd_roles=static::getconn()->sample_get(Config::$db_oa_rl_dingtalk_roles,['_inner_uuid'],$where);
                    if(count($dd_roles)>0){
                        static::creat_employee_role_relation($uuid,$dd_roles[0]->_inner_uuid);
                    }
            }
        }

    }

    static private function creatRoleByDingTalk($name,$group_uuid){

        $_uuid=ConfigBase::get_uuid_short();

        if(static::getconn()->sample_insert(ConfigBase::$db_employee_roles,[
            '_uuid'=>$_uuid,
            'company_id'=>CCompany::getCompanyId(),

            'group_id'=>$group_uuid,
            'name'=>$name,
            'created_at'=>date('Y-m-d H:i:s',time()),
        ])){
            return $_uuid;
        }
        return false;


    }


}
