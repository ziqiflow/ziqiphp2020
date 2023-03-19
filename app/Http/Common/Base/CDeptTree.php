<?php


namespace App\Http\Common\Base;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CDeptTree
{

    static public $ObjectITree=null;


    static public function storage_filename(){
        return CCompany::getCompanyPath().'dept_tree_es.json';

    }





    static function findDeptInDeptTree($depttree,$depttree_id,$dept_id){

        if ($depttree_id==$dept_id){
            return $depttree;
        }
        return static::findDeptInDeptTree_Fin($depttree,$dept_id);
        //self::findDeptInDeptTree($depttree,$dept_id);
    }


    static public function findFatherDeptByDeptId($depttree,$dept_id){

        //dd($depttree);

        foreach ($depttree as $item){
            if($item['type']!="dept")continue;

            if($item['_uuid']==$dept_id){
                return $depttree;
            }
            if(isset($item['children'])){
                $back= static::findFatherDeptByDeptId($item['children'],$dept_id);
                if(count($back)!=0){
                    return $back;
                }
                //return
            }
        }
        return [];

    }



    static private function findDeptInDeptTree_Fin($depttree,$dept_id){

        foreach ($depttree as $item){
            if($item['type']!="dept")continue;
            //var_dump($item->_uuid);
            if($item['_uuid']==$dept_id){
                if(isset($item['children'])){
                    return $item['children'];
                }else
                {
                    return [];
                }
            }
            if(isset($item['children'])){
                $back= static::findDeptInDeptTree_Fin($item['children'],$dept_id);
                if(count($back)>0)return $back;
                //return
            }
        }

        return [];

    }


    static public function findUserbyRoleId($tree,$role_id){
        //dd($tree);
        $arr=[];
        foreach ($tree as $item){

            if($item['type']=="user"){
                //var_dump($item);
                foreach ($item['roles'] as $role){
                    if($role['_uuid']==$role_id){
                        array_push($arr,$item);
                        //dd($arr);
                        break;
                    }
                }
            }

            if($item['type']=="dept"){
                //dd($item['type']);
                if(isset($item['children'])){
                    $back=static::findUserbyRoleId($item['children'],$role_id);
                    //dd($back);
                    $arr=array_merge($arr,$back);
                }
            }
        }

        return $arr;

    }




    static public function userHasExistInDeptTree($depttree,$user_id){

        foreach ($depttree as $item){
            if($item['type']=='user'){
                if($item['_uuid']==$user_id){
                    return true;
                }
            }
            if($item['type']=='dept'&&isset($item['children'])){
                if(static::userHasExistInDeptTree($item['children'],$user_id)){
                    return true;
                }
            }
        }

        return false;
    }

    static public function GetEmployeesByDeptForjs(){
        if(Storage::disk()->exists(static::storage_filename())){
            return Storage::disk()->get(static::storage_filename());
        }else{
            return json_encode(static::GetEmployeesByDept());
        }
    }


    static public function GetEmployeesByDept($refresh=false){







        if($refresh&&Storage::disk()->exists(static::storage_filename())){
            Storage::disk()->delete(static::storage_filename());
        }

        if(!empty(static::$ObjectITree)){
            return static::$ObjectITree;
        }
        if(!$refresh&&Storage::disk()->exists(static::storage_filename())){

            $tree= json_decode(Storage::disk()->get(static::storage_filename()),true);
            if(!empty($tree)){
                static::$ObjectITree=$tree;
                return $tree;
            }
        }

        $depts= Config::getconn()->sample_get(Config::$db_departments,[
            '_uuid','name as deptname','parent_id',
            DB::raw("'dept' as type")
        ]);

        foreach ($depts as  $key=>$dept){
            $depts[$key]->children= static::getuserbydept_id($dept->_uuid);
        }

        //return static::_getdeptTree($depts,1);
        //return  static::_getdeptTree($depts,1);
        //return get_class(static::_getdeptTree($depts,1));
        //return static::_getdeptTree($depts,1);

        $tree= static::_getdeptTree($depts,CDept::$default_root_d_id)->merge(static::getuserbydept_id(CDept::$default_root_d_id));
        Storage::disk()->put(static::storage_filename(),$tree);
        $tree= json_decode(Storage::disk()->get(static::storage_filename()),true);
        static::$ObjectITree=$tree;
        return $tree;

    }


    static private function getuserbydept_id($d_id){
        $where2=[
            ['a'=>'where',
                'arr'=>
                    [
                        [Config::$db_erp_employee_department_rl.".d_id",'=',$d_id]]
            ]
        ];
        $funcallback=function($query){
            $query->join(Config::$db_erp_employees,
                Config::$db_erp_employee_department_rl.'.e_id', '=',
                Config::$db_erp_employees.'._uuid');
        };
        $emps= Config::getconn()->sample_get(
            Config::$db_erp_employee_department_rl,
            [
                Config::$db_erp_employees.'.jobid as userjobid',
                Config::$db_erp_employees.'._uuid',
                Config::$db_erp_employees.'.is_leader_in_dept',
                DB::raw("'user' as type"),
                Config::$db_erp_employees.'.name as username',
            ],
            $where2,
            $funcallback
        );

        foreach ($emps as $key=> $item){

            if(empty($emps[$key]->is_leader_in_dept)){
                unset($emps[$key]->is_leader_in_dept);
            }else{
                $emps[$key]->is_leader_in_dept=json_decode($emps[$key]->is_leader_in_dept,true);
            }

            $where2=[
                ['a'=>'where',
                    'arr'=>
                        [
                            [Config::$db_erp_employee_role_rl.".e_id",'=',$item->_uuid]]
                ]
            ];

            $funcallback=function($query){
                $query->join(
                    Config::$db_employee_roles,
                    Config::$db_erp_employee_role_rl.'.r_id', '=',
                    Config::$db_employee_roles.'._uuid');
            };

            $emps[$key]->roles=Config::getconn()->sample_get(
                Config::$db_erp_employee_role_rl,
                [Config::$db_employee_roles.'._uuid',
                    DB::raw("'role' as type" ),
                    Config::$db_employee_roles.'.name as rolename'],
                $where2,
                $funcallback
            );

        }

        return $emps;

    }


    static private function _getdeptTree($list,$parent_id){

        $tree=collect();
        foreach ($list as $item){
            if($item->parent_id==$parent_id){

                $item->children= $item->children->merge(static::_getdeptTree($list,$item->_uuid));
                //array_push($item->children,);
                //array_push($item->children,static::_getdeptTree($list,$item->_uuid));
                //Log::info($item);
                $tree->push($item);
                //array_push($tree,$item);
            }
        }
//        Log::info(json_encode($tree));

        return $tree;
    }



}
