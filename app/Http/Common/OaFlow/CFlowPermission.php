<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use App\Http\Common\utils\MongoDateTrans;

class CFlowPermission
{

    static public function CheckPermission($flowid,$userid){


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowid','=',$flowid],
                        ['canwatch','=',$userid],
                    ]
            ]
        ];
        return Config::getmonconn()->sample_count(Config::$mongo_flowpermission,$where);

    }



    //sample_get，sample_update，sample_insert
    static public function AllFlowReload(){
//       $where=null;
//       Config::getmonconn()->sample_delete(Config::$mongo_flowpermission,$where);

       $list= CFlowDesigns::AllSampleList();

       foreach ($list as $item){
           static::FlowReload($item['_id']);
       }
    }

    static public function FlowReload($flowid){

        $flowdesign= CFlowDesigns::get($flowid);


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['flowid','=',$flowid]
                    ]
            ]
        ];

        $canCreat=[];
        if(isset($flowdesign['funlist'])){
            foreach ($flowdesign['funlist'] as $fun){
                if ($fun['is_start']) {
                    $canCreat=static::getUsers($fun['creatPermission']);
                }
            }
        }
        //return $canCreat;

        $canWatch=[];
        //set.permissions[0].deptuser


        if(isset($flowdesign['set'])&&isset($flowdesign['set']['permissions'])){
            foreach ($flowdesign['set']['permissions'] as $permission){
                if(
                in_array('watch',$permission['allow'])
                ){
                    $canWatch=array_merge($canWatch,static::getUsers($permission['deptuser']));
                }
            }
        }
        $canWatch=array_values(array_unique($canWatch));

        $update=[
            'cancreat'=>$canCreat,
            'canwatch'=>$canWatch,
            'updated_at'=>MongoDateTrans::intToUTC(time()),
        ];

        //dd($update);

        if(!Config::getmonconn()->sample_update(Config::$mongo_flowpermission,$where,$update)){
            $update['flowid']=$flowid;
            $update['company_id']=CCompany::getCompanyId();
            return Config::getmonconn()->sample_insert(Config::$mongo_flowpermission,$update);
        }
        //dd($update);
        return true;
    }

    static private function getUsers($groupList){


        $ContactExplan= new CFlowGetContact(['firstcreated_deptid'=>null,
            'firstcreated_userid'=>null,
            'lastmsgcreated_deptid'=>null,
            'lastmsgcreated_id'=>null,
            'formdata'=>null
        ],true);


        $idlist=  $ContactExplan->contacttousers($groupList);

        foreach ($idlist as $key=>$item){
            $idlist[$key]=''.$item;
        }

        return $idlist;

    }






}