<?php


namespace App\Http\Common\Base;


class CCompanySet
{

    public static $Default_shop_flow_set='{"creat":true,"shendan":true,"kuaididan":true,"fapiao":true,"chuhuodan":true,"ludan":true,"daydata":true,"node1":true,"node2":true,"node3":false,"node1n":"测试","node2n":"打包","node3n":""}';
    public static $Default_work_manual='{"defaulturl":{},"nav":[]}';


    private static function getDefaultSet($value,$defaultValue=null){

        if(
        file_exists(base_path('company_set.json'))){
            $company_set=json_decode(file_get_contents(base_path('company_set.json')),true);
            if(isset($company_set[$value])){
                return $company_set[$value];
            }
        }

        switch ($value)
        {
            case 'shopflow':
                return static::$Default_shop_flow_set;
                break;
            case 'work_manual_nav':
                return static::$Default_work_manual;
                break;
            case 'autoludan':
                return '{"isopen":"0"}';
                break;
            case 'eADdate':
                return '{"isopen":"0"}';
                break;
            case 'eAVisit':
                return '{"isopen":"0"}';
                break;
            case 'eDFCase':
                return '{"isopen":"0"}';
                break;
            case 'orderNt':
                return '[简称]*[数量];';
                break;
            case 'orderNck':
                return '0';
                break;
            case 'shinput':
                return '{"c1":{"beizhu":"<p>普通备注内容</p>"},"c2":{"beizhu":"<p>补发备注内容</p>","depot_id":"","temp_id":""},"c3":{"beizhu":"<p>维修换货内容</p>","depot_id":"","temp_id":""},"c4":{"beizhu":"<p>退货内容</p>","depot_id":""},"c5":{"beizhu":"<p>返现内容</p>"}}';
                break;
            case 'tNavL':
                return '[ { "tid": 1 }, { "tid": 5 }, { "tid": 4 }, { "tid": 3 } ]';
                break;
            case 'vtptag':
                return '[{"n":"售前","tags":["不想买","想买","已买"]},{"n":"售后","tags":["普通售后【跟进】","差评风险","退货风险","完成"]}]';
                break;
            case 'comyeji':

                return '[{"n":11,"v":2},{"n":2,"v":0.01},{"n":3,"v":0.1},{"n":4,"v":0.05},{"n":5,"v":0.03},{"n":6,"v":0.03},{"n":7,"v":0.03},{"n":8,"v":0.3},{"n":9,"v":0.5}]';
                break;
            case 'tcmodel':

                return '[]';
                break;
            case 'fnotice':
                return '';
            case 'wareworth':

                return '[]';
                break;
            default:
                return $defaultValue;
        }
    }






    public static function getSet($value,$type='array',$defaultValue=null){


        //$arr=explode('.',$value);

        //$length=count($arr);

        //if($length<1){return;}

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['typename','=',$value],
                        ['company_id','=',CCompany::getCompanyId()]
                    ]
            ],
            ['a'=>'whereNull',
                'arr'=>
                    [
                        'deleted_at'
                    ]
            ]
        ];

        $returnval = Config::getconn()->sample_get(Config::$db_erp_company_sets,['json'],$where);
//        $query_companyset=DB::connection(DbCtrl::$Dbconfig)->table('erp_company_sets');
//        $returnval=$query_companyset->where([['typename','=',$arr[0]],['company_id','=',$company_id]])->whereNull('deleted_at')->get(['json']);

        if(count($returnval)==0){

            $default=static::getDefaultSet($value,$defaultValue);
            if(is_string($default)){
                if($type=='array'){
                    return json_decode($default,true);
                }
            }else{
                if($type!='array') {
                    return json_encode($default);
                }
            }
            return $default;
        }else{
            return ($type=='array'?json_decode($returnval[0]->json,true):$returnval[0]->json);

        }

        //return $defaultValue;

//        if($length<2){return $json;}
//        if($length<3){return $json[$arr[1]];}
//        if($length<4){return $json[$arr[1]][$arr[2]];}
//        if($length<5){return $json[$arr[1]][$arr[2]][$arr[3]];}
//        return $json[$arr[1]][$arr[2]][$arr[3]][$arr[4]];
    }

//    public static function insertset($name,$value,$company_id){

//        $insertarr=['company_id'=>$company_id,
//            'updated_id'=>1,'updated_at'=>date('Y-m-d H:i:s',time()),
//            'created_id'=>1,'created_at'=>date('Y-m-d H:i:s',time()),
//            'typename'=>$name,'json'=>$value
//        ];
//        $query_companyset=DB::connection(DbCtrl::$Dbconfig)->table('erp_company_sets');

//        return $query_companyset->insertGetId($insertarr);
//    }

    public static function editSet($name,$value){










        if(!is_string($value)){
            $value=json_encode($value,JSON_UNESCAPED_UNICODE);
        }
        //return $value;

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['typename','=',$name],
                        ['company_id','=',CCompany::getCompanyId()]
                    ]
            ],
            ['a'=>'whereNull',
                'arr'=>
                    [
                        'deleted_at'
                    ]
            ]
        ];

        $updatearr=['updated_id'=>Config::getUser()->id,'updated_at'=>date('Y-m-d H:i:s',time()),'json'=>$value];

        $updateback=Config::getconn()->sample_update(Config::$db_erp_company_sets,$where,$updatearr);

        //echo $query_companyset->toSql();
        if($updateback){
            return $updateback;
        }
//        if($query_companyset->count()){
//            return false;
//        }
        //echo 'dddd';

        $insertarr=[
            'company_id'=>CCompany::getCompanyId(),
            'updated_id'=>Config::getUser()->id,'updated_at'=>date('Y-m-d H:i:s',time()),
            'created_id'=>Config::getUser()->id,'created_at'=>date('Y-m-d H:i:s',time()),
            'typename'=>$name,'json'=>$value
        ];

        return Config::getconn()->sample_insert(Config::$db_erp_company_sets,$insertarr);
        //return $query_companyset->insertGetId($insertarr);




    }



}