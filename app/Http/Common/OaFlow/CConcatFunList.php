<?php


namespace App\Http\Common\OaFlow;

use App\Http\Common\Base\CDeptTree;
use \App\Http\Common\Base\Config as ConfigBase;
use Illuminate\Support\Facades\Log;

class CConcatFunList
{



    static public function isInRoles($nowroles,$setroles){




        //Log::info('$nowroles');
        //Log::info($nowroles);
        //Log::info('$setroles');
        //Log::info($setroles);


        foreach ($nowroles as $role){

            foreach ($setroles as $setrole){

                if($setrole==$role['_uuid']){
                    return true;
                }

            }
        }

        return false;



    }
    static public function isInDepts($dept_id,$list){
        return in_array($dept_id, $list);
    }



    static public function isSupervisor2($roles){

        foreach ($roles as $role){
            if($role['rolename']=='主管'){
                return true;
            }
        }
        return false;
    }
    static public function isSupervisor($userinfo,$parent_dept_id){




        if(empty($userinfo['is_leader_in_dept']))return false;

        foreach ($userinfo['is_leader_in_dept'] as $item){
            if($item==$parent_dept_id)return true;
        }
        return false;
    }


    static public function directSuperByCreat2($data){
        //

        $chosed=$data['chosed'];
        $rootdeptid=$data['rootdeptid'];
        $rootTree=$data['rootTree'];


        if(!!$data['testData']){
            $data=$data['testData'];
        }else{
            $data=$data['testData'];
        }

        if (!$data['firstcreated_deptid']){
            return [];
        }

//       if($rootdeptid==$data['firstcreated_deptid']){
//           $tree=$rootTree;
//       }else{
        $tree=CDeptTree::findDeptInDeptTree($rootTree,$rootdeptid,$data['firstcreated_deptid']);
        //}

        $user=[];
        $ismyself=false;
        foreach ($tree as $item){

            if($item['type']=='user'){
                if(static::isSupervisor2($item['roles'])){
                    array_push($user,$item['_uuid']);
                    if($item['_uuid']==$data['firstcreated_id']){
                        $ismyself=true;
                        break;
                    }
                }
            }

        }
        if(!$ismyself){
            return $user;
        }

        $tree=CDeptTree::findFatherDeptByDeptId($rootTree,$data['firstcreated_deptid']);
        $user=[];

        if(empty($tree)){
            return [];
        }
        foreach ($tree as $item){
            if($item['type']=='user'){
                if(static::isSupervisor2($item['roles'])){
                    array_push($user,$item['_uuid']);
                }
            }
        }

        return $user;
    }

    static public function directSuperByCreat($FlowId,$FlowListid,$flowmsgid,$testData=null){




        if($testData==null){
            $created_id=$testData['created_id'];
        }else {
            $flowListOj=CFlowList::get($FlowListid);
            if(empty($flowListOj)){
                return [];
            }


            $created_id=$flowListOj['created_id'];
        }

        //
        $funcallback=function($query)use ($created_id){
            $query->where(ConfigBase::$db_erp_employee_role_rl.'.e_id','=',$created_id);
            $query->where(ConfigBase::$db_employee_roles.'.name','=','主管');
            $query->leftJoin(ConfigBase::$db_employee_roles,
                ConfigBase::$db_employee_roles.'._uuid',
                '=',
                ConfigBase::$db_erp_employee_role_rl.'.r_id');
        };
        $accept_dept_id=null;

        if(ConfigBase::getconn()->sample_count(
            ConfigBase::$db_erp_employee_role_rl,null,$funcallback
        ))
        {

            $funcallback=function($query){
                $query->leftJoin(ConfigBase::$db_departments,
                    ConfigBase::$db_departments.'.uuid',
                    '=',
                    ConfigBase::$db_erp_employee_department_rl.'.d_id');
            };
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            [ ConfigBase::$db_erp_employee_department_rl.'.e_id',
                                '=',
                                $created_id]
                        ]
                ]
            ];

            $depts= ConfigBase::getconn()->sample_get(
                ConfigBase::$db_erp_employee_department_rl,
                [ConfigBase::$db_erp_employee_department_rl.'.d_id',
                    ConfigBase::$db_departments.'.parentid'
                ],
                $where,$funcallback);


            if(count($depts)){
                if($depts[0]->parentid==1){


                    $accept_dept_id=$depts[0]->d_id;
                }else{
                    $accept_dept_id=$depts[0]->parentid;
                }

            }

        }
        if($accept_dept_id==null){

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            [ 'e_id', '=', $created_id]
                        ]
                ]
            ];

            $depts= ConfigBase::getconn()->sample_get(
                ConfigBase::$db_erp_employee_department_rl,
                ['d_id'],
                $where);

            if(count($depts)==0){
                return [];

            }else{
                $accept_dept_id=$depts[0]->d_id;
            }
        }





        $funcallback=function($query)use ($accept_dept_id){
            $query->where(ConfigBase::$db_erp_employee_department_rl.'.d_id','=',$accept_dept_id);
            $query->where(ConfigBase::$db_employee_roles,'=','主管');
            //$query->leftJoin(ConfigBase::$db_erp_employees, ConfigBase::$db_erp_employees.'._uuid', '=', ConfigBase::$db_erp_employee_department_rl.'.e_id');
            $query->leftJoin(ConfigBase::$db_erp_employee_department_rl, ConfigBase::$db_erp_employee_department_rl.'.e_id', '=', ConfigBase::$db_erp_employee_role_rl.'.e_id');
            $query->leftJoin(ConfigBase::$db_employee_roles, ConfigBase::$db_erp_employee_role_rl.'.r_id', '=', ConfigBase::$db_employee_roles.'._uuid');
        };
        return ConfigBase::getconn()->sample_get(
            ConfigBase::$db_erp_employee_department_rl,
            [
                ConfigBase::$db_erp_employee_department_rl.'.e_id as id',
//                ConfigBase::$db_employee_roles.'.name as rolename',
//                ConfigBase::$db_erp_employees.'.name as ename'
            ],
            null,
            $funcallback
        );






    }




}
