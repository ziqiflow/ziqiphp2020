<?php


namespace App\Http\Common\Base;


class Crole
{
    static public function getRoleTree(){

        $group=Config::getconn()->sample_get(Config::$db_employee_role_groups,
            ['_uuid','groupname']
        );


        foreach ($group as $key=>$item){

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['group_id','=',$item->_uuid]
                        ]
                ]
            ];
            $group[$key]->children=Config::getconn()->sample_get(Config::$db_employee_roles,[
                '_uuid','name as rolename'
            ],$where);
        }

        return $group;


    }
    static public function GetEmployeesByRole(){

//        if(!empty(static::$ObjectIRoleTree)){
//            return static::$ObjectIRoleTree;
//        }


        $group=Config::getconn()->sample_get(Config::$db_employee_role_groups,
            ['_uuid','groupname']
        );


        foreach ($group as $key=>$item){

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['group_id','=',$item->_uuid]
                        ]
                ]
            ];
            $group[$key]->children=Config::getconn()->sample_get(Config::$db_employee_roles,[
                '_uuid','name as rolename'
            ],$where);



            foreach ($group[$key]->children as $key2=>$role){


                $where2=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                [Config::$db_erp_employee_role_rl.".r_id",'=',$role->_uuid]]
                    ]
                ];

                $funcallback=function($query){
                    $query->join(Config::$db_erp_employees,
                        Config::$db_erp_employee_role_rl.'.e_id', '=',
                        Config::$db_erp_employees.'._uuid');
                };

                $group[$key]->children[$key2]->children=Config::getconn()->sample_get(
                    Config::$db_erp_employee_role_rl,
                    [
                        Config::$db_erp_employees.'.jobid as userjobid',
                        Config::$db_erp_employees.'._uuid',
                        Config::$db_erp_employees.'.name as username',
                    ],
                    $where2,
                    $funcallback
                );


            }


        }

        return $group;


    }
}