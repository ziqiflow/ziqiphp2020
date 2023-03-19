<?php


namespace App\Http\Common\Base;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CDept
{
    static public $default_root_d_id='1';


    static public $ObjectI=null;
    static public $ObjectITree=null;

    static public function getDeptList(){

        if(empty(static::$ObjectI)){
            static::$ObjectI= Config::getconn()->sample_get(Config::$db_departments,['name','_uuid','parent_id','index'],
                [],
                null,
                'index');
        }
        return static::$ObjectI;
    }


    static public function storage_filename(){
        return  CCompany::getCompanyPath().'dept_tree.json';

    }



    static public function getTreeDeptList($refresh=false){

        if($refresh&&Storage::disk()->exists(static::storage_filename())){
            Storage::disk()->delete(static::storage_filename());
        }

        if(empty(static::$ObjectITree)){
            if(!$refresh&&Storage::disk()->exists(static::storage_filename())){
                $tree= json_decode(Storage::disk()->get(static::storage_filename()),false);
                //Log::info($tree);
                if(!empty($tree)){
                    static::$ObjectITree=$tree;
                    return $tree;
                }
            }
            $deptList=static::getDeptList();
            static::$ObjectITree= static::creatDeptTree($deptList,static::$default_root_d_id);
            Log::info(static::$ObjectITree);
            Storage::disk()->put(static::storage_filename(),json_encode(static::$ObjectITree));
        }
        return static::$ObjectITree;
    }


    static private function creatDeptTree($list,$parent_id){
        $tree=[];
        foreach ($list as $key=> $dept){
            if($dept->parent_id==$parent_id){
                $list[$key]->children=static::creatDeptTree($list,$dept->_uuid);
                array_push($tree,$list[$key]);
            }
        }
        return $tree;
    }

    public static $ObjectNameI = [];

    static public function getName($uuid,$ForcedRefresh = false){
        if ($uuid == null) {
            return null;
        }
        if (!$ForcedRefresh && isset(static::$ObjectNameI[$uuid])) {
            return static::$ObjectNameI[$uuid];
        }
        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_uuid','=',$uuid]
                    ]
            ]
        ];
        $depts= Config::getconn()->sample_get(Config::$db_departments,['name'],$where);
        if(count($depts)==0){
            return null;
        }
        static::$ObjectNameI[$uuid] = $depts[0]->name;

        return static::$ObjectNameI[$uuid];
    }


    static public function getMyDeptsWithDeptTree($user_id){

       $myDepts=  static::getMyDepts($user_id);

       foreach ($myDepts as $key=>$dept){
           $myDepts[$key]->depttree=static::getDeptTreeSampleNodeList(
               static::getTreeDeptList(),
               $dept->v
           );
       }
       return $myDepts;
    }

    static public function getMyDepts($user_id){


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        [Config::$db_erp_employee_department_rl.'.e_id','=',$user_id]
                    ]
            ]
        ];
        $funcallback=function($query){
                $query->leftJoin(Config::$db_departments,
                    Config::$db_erp_employee_department_rl.'.d_id',
                    '=',
                    Config::$db_departments.'._uuid');
        };

        $back=Config::getconn()->sample_get(
            Config::$db_erp_employee_department_rl,
            [
                //Config::$db_departments.'._uuid as v',
                Config::$db_departments.'.name as n',
                Config::$db_erp_employee_department_rl.'.d_id as v'
            ],
            $where,
            $funcallback
        )->toArray();
//        return $back;
        CDept::$default_root_d_id;
        foreach ($back as $key=>$item){
            $back[$key]->v=$item->v.'';
            if($item->v==1){
                $back[$key]->n='全公司';
            }
            static::$ObjectNameI[$item->v]=$back[$key]->n;
        }

        return $back;
    }


    static public  function getTreeDeptsWithusers(){
    }



    static private function getDeptTreeSampleNodeList($tree,$dept_id){
        $arr=[];
        foreach ($tree as $dept){
            $hasfind=false;
            if($dept->_uuid==$dept_id){
                array_push($arr,[
                    'name'=>$dept->name,
                    '_uuid'=>$dept->_uuid
                ]);
                $hasfind=true;
                break;
            }
            if(!$hasfind){
                $backarr=static::getDeptTreeSampleNodeList($dept->children,$dept_id);
                if(count($backarr)!=0){
                    $arr=array_merge([[
                        'name'=>$dept->name,
                        '_uuid'=>$dept->_uuid
                    ]],$backarr);
                    break;
                }
            }
        }
        return $arr;
    }

    static public function getDeptsByIDs($ids){

        if(is_string($ids)){
            $ids=[$ids];
        }
        $where=[
            ['a'=>'whereIn',
                'arr'=>
                    [
                        ['_uuid',$ids]
                    ]
            ]
        ];
        $depts= Config::getconn()->sample_get(Config::$db_departments,['name','_uuid'],$where);
        return $depts;
    }


    static public  function getDeptNamesByIDs($ids){
        $depts= static::getDeptsByIDs($ids);

        $list=[];
        foreach ($depts as $dept){
            $list[]=$dept->name;
        }
        return $list;
    }

}
