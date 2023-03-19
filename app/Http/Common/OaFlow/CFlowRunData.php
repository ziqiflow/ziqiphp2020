<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CDept;
use App\Http\Common\Base\CDeptTree;
use App\Http\Dbctrl2\DBCtrlOBJ;

class CFlowRunData
{


    static public function RunDataReSet(){


        DBCtrlOBJ::$BeforeInsertArr=['company_id','=', CCompany::getCompanyId()];

        DBCtrlOBJ::$BeforeCount =
        DBCtrlOBJ::$BeforeUpdate =
        DBCtrlOBJ::$BeforeDelete =
        DBCtrlOBJ::$BeforeGet = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['company_id', '=', CCompany::getCompanyId()]
                    ]
            ]
        ];


            CDeptTree::GetEmployeesByDept(true);
            CDept::getTreeDeptList(true);
            CFlowPermission::AllFlowReload();




        DBCtrlOBJ::$BeforeInsertArr=
        DBCtrlOBJ::$BeforeCount =
        DBCtrlOBJ::$BeforeUpdate =
        DBCtrlOBJ::$BeforeDelete =
        DBCtrlOBJ::$BeforeGet = [];

    }


}