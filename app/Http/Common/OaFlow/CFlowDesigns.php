<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CCompanySet;
use App\Http\Common\Base\CDept;
use App\Http\Common\JsonMessage;
use App\Http\Common\Media\CFiles;
use App\Http\Common\Media\CImages;
use App\Http\Common\utils\MongoDateTrans;
use \App\Http\Common\Base\Config as ConfigBase;
use function GuzzleHttp\Psr7\str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use MongoDB\BSON\ObjectId;
use Psy\Util\Json;

class CFlowDesigns
{

    public static $pagesize=20;

    public static $ObjectI=[];



    static public function CheckData(){



        $list=json_decode(static::getCacheAllList(),true);
        //dd($list);
        $loglist=[];

        //hasstart
        //dd($list);
        foreach ($list as $design){
            $log=[];

            if(!isset($design['funlist'])){
                $log['hasfunlist']=false;
                array_push($loglist,$log);
                continue;
            }


            $log['hasstart']=false;
            foreach ($design['funlist'] as $fun){
                if($fun['is_start']){
                    $log['hasstart']=true;
                    break;
                }
            }


            $log['keymodel']=true;
            foreach ($design['datalist'] as $data){
                if(strpos($data['model'],$data['key'])===false){
                    $log['keymodel']=false;
                    break;
                }
            }


            $log['keyreplace']=false;
            $keylist=[];
            foreach ($design['datalist'] as $data){
                array_push($keylist,$data['key']);
            }
            if(count(array_values(array_unique($keylist)))!=count($design['datalist'])){
                $log['keyreplace']=true;
            }


            $log['indexreplace']=false;
            $indexlist=[];
            foreach ($design['datalist'] as $data){
                array_push($indexlist,$data['index']);
            }
            if(count(array_values(array_unique($indexlist)))!=count($design['datalist'])){
                $log['indexreplace']=true;
            }

            $log['undefinedFormItem']=[];

            //set.formEditLimit
            //funlist.formEditLimit

            foreach ($design['funlist'] as $fun){
                $log['undefinedFormItem']=array_merge($log['undefinedFormItem'],static::getUndefineFormItem($fun['formEditLimit'],$design['datalist']));
            }
            if(isset($design['set']['formEditLimit'])){
                $log['undefinedFormItem']=array_merge($log['undefinedFormItem'],static::getUndefineFormItem($design['set']['formEditLimit'],$design['datalist']));
            }






            array_push($loglist,$log);
        }

        return $loglist;





    }

    static private function getUndefineFormItem($formEditLimit,$formlist){

        $list=[];
        foreach ($formEditLimit as $limitItem){
                $hasfind=false;
                foreach ($formlist as $item){
                    if($limitItem['key']==$item['key'])
                    {
                        $hasfind=true;
                        break;
                    }
                }
                if(!$hasfind){
                    array_push($list,$limitItem);
                }
        }
        return $list;
    }

    static public function split_dept_user($str){
        if(empty($str)){
            return [null,null];
        }
        $arr=explode('__',$str);
        if(count($arr)==1){
            $arr[1]=CDept::$default_root_d_id;
        }
        return $arr;
    }


    static public function testContact($flowset,$groupList,$testType,$testData){

        //Log::info($groupList);
//        lastuser_id
//        created_id
        //return $testData;

        if($testType=='onlyspread'){




            $testData=['firstcreated_deptid'=>null,
                'firstcreated_userid'=>null,
                'lastmsgcreated_deptid'=>null,
                'lastmsgcreated_id'=>null,
                'formdata'=>null
            ];


            $ContactExplan= new CFlowGetContact($testData,true,$flowset);

            $userlist= $ContactExplan->contacttousers($groupList);

            if(count($userlist)==0){
                return [];
            }
            $where=[
                ['a'=>'whereIn',
                    'arr'=>
                        [
                            ['_uuid',$userlist]
                        ]
                ]
            ];

            return  ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employees,
                ['name','_uuid']
                ,$where
            );

        }

        if($testType=='spread'){


            if(request()->has('deptWithSon')){
                 $deptWithSon= request()->input('deptWithSon');
                Log::info('$deptWithSon');
                Log::info($deptWithSon);
            }



            list($firstcreated_deptid,$firstcreated_userid)=static::split_dept_user(isset($testData['created_id'])?$testData['created_id']:null);
            list($lastmsgcreated_deptid,$lastmsgcreated_id)=static::split_dept_user(isset($testData['lastuser_id'])?$testData['lastuser_id']:null);



            $testData=['firstcreated_deptid'=>$firstcreated_deptid,
                'firstcreated_userid'=>$firstcreated_userid,
                'lastmsgcreated_deptid'=>$lastmsgcreated_deptid,
                'lastmsgcreated_id'=>$lastmsgcreated_id,
                'formdata'=>$testData['formdata']
            ];

            if(isset($deptWithSon)){
                $ContactExplan= new CFlowGetContact($testData,$deptWithSon,$flowset);
            }else{
                $ContactExplan= new CFlowGetContact($testData,null,$flowset);
            }



           // Log::info('$testData');
            //Log::info($testData);

            $userlist= $ContactExplan->contacttousers($groupList);

            if(count($userlist)==0){
                return [];
            }
            $where=[
                ['a'=>'whereIn',
                    'arr'=>
                        [
                            ['_uuid',$userlist]
                        ]
                ]
            ];

            return  ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employees,
            ['name','_uuid']
            ,$where
            );

        }


        if($testType=='permission'){



            //return $testData['permission_id'];
            $useridlist=[];
            foreach ($testData['permission_id'] as $item){
                list(,$userid)=static::split_dept_user($item);
                array_push($useridlist,$userid);
                //$useridlist
            }

            $where=[
                ['a'=>'whereIn',
                    'arr'=>
                        [
                            ['_uuid',$useridlist]
                        ]
                ]
            ];

            $userlist=  ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employees,
                ['name','_uuid']
                ,$where
            );

            //return $userlist;


            foreach ($userlist as $key=>$user){

                $userlist[$key]->hasPermission=CFlowDealerUtil::contactHasPermission(
                    $user->_uuid,
                    $groupList,
                    null,
                    $testData
                );

            }

            return $userlist;
        }
    }

    static public function add($data){

        Log::info($data);

        return Config::getmonconn()->sample_insert(Config::$mongo_flowdesigns,
            [
                'name'=>$data['name'],
                'created_at'=> MongoDateTrans::intToUTC(time()),
                'updated_at'=>MongoDateTrans::intToUTC(time()),
                "company_id"=>CCompany::getCompanyId(),
                'description'=>$data['description'],
                'canuse'=>$data['canuse'],
                //date('Y-m-01 H:i:s',time())
            ]
        );

    }



    static public function son_lists($search=null){




        $result=Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['_id','name'],
            null,
            null,
            'created_at',
            1
        )->all();

        foreach ($result as $key=>$item){
            $result[$key]['_id']= (string) $result[$key]['_id'];
//            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }

        return $result;

    }

    static public function getCacheAllList(){

        $lasts=Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['updated_at'],[],null,'updated_at',1,[0,1])->all();


        $filename=CCompany::getCompanyPath().'allFlowDesigns.json';
        if(Storage::disk()->exists($filename)){

            if(count($lasts)>0){
                if(isset($lasts[0]['updated_at'])&&
                    Storage::disk()->getTimestamp($filename)>
                    strtotime(MongoDateTrans::UTCToString($lasts[0]['updated_at']))
                ){


                    $filetext= Storage::disk()->get($filename);
                    if(!empty($filetext)){
                        return $filetext;
                    }

                }
            }



        }

        $lists=Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['*'],[],null,'updated_at',1)->all();

        Storage::disk()->put($filename,json_encode($lists,JSON_UNESCAPED_UNICODE));
        $filetext= Storage::disk()->get($filename);
        return $filetext;
    }

    static public function all_lists($search=null){


        $result=Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['_id','name'],
            $search,
            null,
            'created_at',
            1
        )->all();

        foreach ($result as $key=>$item){
            $result[$key]['_id']= (string) $result[$key]['_id'];
//            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }

        return $result;

    }












    static public function AllSampleList($where=[],$select=['_id','name','canuse']){

        $result=Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,$select,
            $where,
            null,
            'update_at',
            1
        )->all();

        foreach ($result as $key=>$item){
            $result[$key]['_id']= (string) $result[$key]['_id'];
        }

        return $result;
    }


    static public function lists($nowpage,$search=null){

        $nowpage=!!$nowpage?$nowpage:1;

        $totalItems=Config::getmonconn()->sample_count(Config::$mongo_flowdesigns);

        $result=Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['*'],
            $search,
            null,
            'created_at',
            1,
            [($nowpage-1)*static::$pagesize,static::$pagesize]
        )->all();



        foreach ($result as $key=>$item){
            $result[$key]['_id']= (string) $result[$key]['_id'];
            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }

        return [
        'result'=>$result,
        'totalItems'=>$totalItems,
        'pageSize'=>static::$pagesize,
        'currentPage'=>$nowpage];

//        $totalItems= await ctx.mongo.db('oa').collection('flowdesigns').find().count();
//        DB::connection('mongodb')->collection('flowdesigns')->get()
    }



    static public function edit($_id,$data){
//        Log::info($_id);
//        Log::info($data);

        $data['updated_at']=MongoDateTrans::intToUTC(time());
        $object_id=new ObjectId($_id);
        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',$object_id]
                    ]
            ]
        ];
        $back= Config::getmonconn()->sample_update(Config::$mongo_flowdesigns,$where,$data);

        if($back){
            CFlowPermission::FlowReload($_id);
        }

        return $back;
    }

    static public function get($_id,$ForcedRefresh=false,$select=['*']){

        //dd($_id);
        if(!$ForcedRefresh&&isset(static::$ObjectI[$_id])){
            return static::$ObjectI[$_id];
        }
        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                       ['_id','=',new ObjectId($_id)]
                    ]
            ]
        ];

        $result=Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,$select,
            $where
        )->all();


        foreach ($result as $key=>$item){
            $result[$key]['_id']= (string) $result[$key]['_id'];
            MongoDateTrans::ObjtoString($result[$key]['created_at']);
        }

        if(count($result)==0){
            return null;
        }else{
            static::$ObjectI[$_id]=$result[0];
            return static::$ObjectI[$_id];
        }
    }

    static public function delete($_id){

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',new ObjectId($_id)]
                    ]
            ]
        ];


        return Config::getmonconn()->sample_delete(Config::$mongo_flowdesigns,$where);




    }


    static public function imageUpload($flowid=null){


        $imageback=CImages::creats('filename','flowdesign/','flowdesign',['ext_data1'=>$flowid]);

        $httphost=Config::getSchemeAndHttpHost();//request()->getSchemeAndHttpHost();
        foreach ($imageback as $key=>$item){
            $imageback[$key]['url']=$httphost.'/'.$imageback[$key]['url'];
        }

        return JsonMessage::Creat(true,'',$imageback);
//        return CImages::creats('filename','company/cat/');
    }

    static public function fileUpload($flowid){


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',new ObjectId($flowid)]
                    ]
            ]
        ];

        $Designers= Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['fileList','_id'],$where);
        if(count($Designers)==0){
            return JsonMessage::Creat(false,'未发现对应的流程id'.$flowid);
        }
        $Designer=$Designers[0];

        if (!isset($Designer['fileList'])){
            $Designer['fileList']=[];
        }

//        return ($Designers[0]['_id']);

        $fileback=CFiles::creats('filename','flowdesign/','flowdesign',['ext_data1'=>$flowid]);

        //return $fileback;

        $httphost=Config::getSchemeAndHttpHost();//request()->getSchemeAndHttpHost();

        for ($k=count($fileback)-1;$k>=0;$k--){
            if(empty($fileback[$k])){
                array_splice($fileback,$k,1);
                continue;
            }
            $fileback[$k]['url'] = $httphost . '/' . $fileback[$k]['url'];
        }
//
//        foreach ($fileback as $key=>$item){
//            $fileback[$key]['url']=$httphost.'/'.$fileback[$key]['url'];
//        }



        if(count($fileback)>0){
            $Designer['fileList']= array_merge($Designer['fileList'],$fileback);
            if(
            !Config::getmonconn()->sample_update(Config::$mongo_flowdesigns,$where,[
                "fileList"=>$Designer['fileList']
            ])){
                return JsonMessage::Creat(false,'刷新后重新试试');
            }
        }
        return JsonMessage::Creat(true,'文件上传成功',$Designer['fileList']);
        //fileid


    }


    static public  function deleteFile($flowid,$fileid){


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_id','=',new ObjectId($flowid)]
                    ]
            ]
        ];
        $Designers= Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['fileList','_id'],$where);
        if(count($Designers)==0){
            return JsonMessage::Creat(false,'未发现对应的流程id'.$flowid);
        }
        $Designer=$Designers[0];

        if (!isset($Designer['fileList'])){
            $Designer['fileList']=[];
        }




        foreach ( $Designer['fileList'] as $key=> $item){
            if($item['fileid']==$fileid){

                if(CFiles::delete($fileid)){
                    array_splice( $Designer['fileList'],$key,1);
                }
            }
        }
//        return $Designer['fileList'];

        if(
        !Config::getmonconn()->sample_update(Config::$mongo_flowdesigns,$where,[
            "fileList"=>$Designer['fileList']
        ])){
            return JsonMessage::Creat(false,'刷新后重新试试');
        }

        return JsonMessage::Creat(true,'删除成功',$Designer['fileList']);


    }



}