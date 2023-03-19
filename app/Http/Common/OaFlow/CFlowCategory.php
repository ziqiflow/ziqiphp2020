<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Base\CCompanySet;
use App\Http\Common\utils\MongoDateTrans;
use App\Http\Dbctrl2\DBCtrlOBJ;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Common\Base\Config as BaseConfig;

class CFlowCategory
{


    static public $displayType='cancreat';
    //1.cancreat.2,all,4.canadmin；---3.canuse
//    static public $withcantuse=false;




    static public function Get(){

        //CCompanySet::editSet('flowCategory',[8,9,11]);
        return CCompanySet::getSet('flowCategory');
    }

    static public function Save($data){

        $back=CCompanySet::editSet('flowCategory',$data);

        static::ClearCache();
//        if($back){
//            static::getCanTreeList(true);
//        }
        return $back;


    }

    static private function F_tran_flowname(&$cat,&$allFlowList){
        for ($key=count($cat)-1;$key>=0;$key--){
        //foreach ($cat as $key=>$item){

//            if(count($cat[$key]['flowlist'])>0){


                if(isset($cat[$key]['lists'])&&count($cat[$key]['lists'])){
                    static::F_tran_flowname($cat[$key]['lists'],$allFlowList);
                }

                foreach ($cat[$key]['flowlist'] as $flowid){

                    $hasfind=false;
                    foreach ($allFlowList as $key2=>$item2){
                        if($item2['_id']==$flowid){
                            $hasfind=$item2;
                            $allFlowList[$key2]['hasuse']=true;

//                            if(isset($hasfind['canuse'])){
//                                $allFlowList[$key2]['hasuse']=$data['canuse'];
//                            }
//
//                            if(isset($data['created_at'])){
//                                $allFlowList[$key2]['hasuse']=$data['created_at'];
//                            }

                            break;
                        }
                    }

                    if($hasfind===false){

                    }else{

//                        Log::info($item['name']);
                        //Log::info($cat[$key]);
                        if(!isset($cat[$key]['lists'])){
                            $cat[$key]['lists']=[];
                        }

                        $data=[
                            'id'=>$hasfind['_id'],
                            'name'=>$hasfind['name'],
                            'desc'=>$hasfind['description'],
                            'isleaf'=>1
                        ];

                        //Log::info(static::$withcantuse);

                        if(isset($hasfind['canuse'])){
                            $data['canuse']=$hasfind['canuse'];
                        }

                        if(isset($hasfind['created_at'])){
                            $data['created_at']=MongoDateTrans::UTCToString($hasfind['created_at']);
                        }
                        //Log::info($data);

                        array_push($cat[$key]['lists'],$data);
                    }
                }

                if(!isset($cat[$key]['lists'])||count($cat[$key]['lists'])==0){

                    array_splice($cat,$key,1);
                }

//                Log::info($item['name']);
//                Log::info($item['flowlist']);
//                Log::info($cat[$key]);
//            }
        }
    }

    static public function getCanTreeList($refresh=false){


        //Log::info(DBCtrlOBJ::$BeforeGet=[]);
        $lastdesigen= Config::getmonconn()->sample_get(Config::$mongo_flowdesigns,['updated_at'],[],null,'updated_at',1,[0,1]);

//        Log::info('$lastdesigen');
//        Log::info($lastdesigen);




        if(!$refresh&&Storage::disk()->exists(static::storage_CanTreeListfilename())){


            if(count($lastdesigen)>0){
                if(isset($lastdesigen[0]['updated_at'])&&
                    Storage::disk()->getTimestamp(static::storage_CanTreeListfilename())>
                    strtotime(MongoDateTrans::UTCToString($lastdesigen[0]['updated_at']))
                ){


                    $tree= json_decode(Storage::disk()->get(static::storage_CanTreeListfilename()),true);
                    if(!empty($tree)){
                        return $tree;
                    }

                }
            }

        }



        if(static::$displayType=='all'){
            $where=null;
            $select=['_id','name','description','canuse','created_at'];

        }else{


            if(static::$displayType=='canadmin'){
                $where=[];
            }else{
                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['canuse','=',true]
                            ]
                    ]
                ];
            }

            $select=['_id','name','description'];
        }



        $allFlowList= CFlowDesigns::AllSampleList($where,$select);

        $tree= CCompanySet::getSet('flowCategory');

        if(static::$displayType=='cancreat') {

            $where = [
                ['a' => 'where',
                    'arr' =>
                        [
                            ['cancreat', '=', Config::getUser()->id]
                        ]
                ]
            ];
            //dd($where);
            $cancreat= Config::getmonconn()->sample_get(Config::$mongo_flowpermission, ['flowid'], $where);

            for ($x=count($allFlowList)-1;$x>=0;$x--){
                $hasfind=false;
                foreach ($cancreat as $item){
                    if($allFlowList[$x]['_id']==$item['flowid']){
                        $hasfind=true;
                        break;
                    }
                }
                if(!$hasfind){
                    array_splice($allFlowList,$x,1);
                }
            }
        }

        if(static::$displayType=='canadmin') {

            $where = [
                ['a' => 'where',
                    'arr' =>
                        [
                            ['canwatch', '=', Config::getUser()->id]
                        ]
                ]
            ];
            //dd($where);
            $canwatch= Config::getmonconn()->sample_get(Config::$mongo_flowpermission, ['flowid'], $where);

            for ($x=count($allFlowList)-1;$x>=0;$x--){
                $hasfind=false;
                foreach ($canwatch as $item){
                    if($allFlowList[$x]['_id']==$item['flowid']){
                        $hasfind=true;
                        break;
                    }
                }
                if(!$hasfind){
                    array_splice($allFlowList,$x,1);
                }
            }
        }


        static::F_tran_flowname($tree,$allFlowList);



        $uncatflow=[];
        foreach ($allFlowList as $item){
            if(!isset($item['hasuse'])){

                $data=[
                    'id'=>$item['_id'],
                    'name'=>$item['name'],
                    'desc'=>$item['description'],
                    'isleaf'=>1
                ];

                if(isset($item['canuse'])){
                    $data['canuse']=$item['canuse'];
                }

                if(isset($item['created_at'])){
                    $data['created_at']=MongoDateTrans::UTCToString($item['created_at']);
                }

                array_push($uncatflow,$data);
            }
        }
        if(count($uncatflow)){
            array_push($tree,
                [
                    'id'=>'10000',
                    'name'=>'未分类',
                    'lists'=>$uncatflow
                ]
            );
        }


        //Log::info('$tree');
        //Log::info($tree);


        Storage::disk()->put(static::storage_CanTreeListfilename(),json_encode($tree,JSON_UNESCAPED_UNICODE));
        $tree= json_decode(Storage::disk()->get(static::storage_CanTreeListfilename()),true);
        return $tree;

    }

    static private function storage_CanTreeListfilename(){
        if (static::$displayType=='all'){
            return CCompany::getCompanyPath().'oaflowcat/canTreeList_all.json';
        }

        return CCompany::getCompanyPath().'oaflowcat/'.Config::getUser()->id.'_canTreeList_'.static::$displayType.'.json';
    }

    static public function ClearCache(){
       return Storage::disk()->deleteDir(CCompany::getCompanyPath().'oaflowcat');
    }


    static $catTreeHasChange=false;

    static public function WatchFlowItemChange($flowid,$updatedata){

//        if(count($updatedata)==0){
//            return null;
//        }

        $CatTree=static::Get();

        static::$catTreeHasChange=false;
        static::F_change_flowInfo($CatTree,$flowid,$updatedata);


        //Log::info($CatTree);

        if(static::$catTreeHasChange){


            //Log::info($CatTree);
            static::Save($CatTree);
            return true;
        }

        return true;






    }

    static private function F_change_flowInfo(&$cat,$flowid,$updatedata){

        foreach ($cat as $key=>$item){

            //if(count($item['flowlist'])>0){

                if(isset($item['lists'])&&count($item['lists'])){
                    static::F_change_flowInfo($cat[$key]['lists'],$flowid,$updatedata);
                }

                if(in_array($item['id'],$updatedata)){

                    if(!in_array($flowid,$cat[$key]['flowlist'])){
                        array_push($cat[$key]['flowlist'],$flowid);
                        static::$catTreeHasChange=true;
                    }

                }else{

                    foreach ($cat[$key]['flowlist'] as $key2=>$item2){
                        if($item2==$flowid){
                            array_splice($cat[$key]['flowlist'],$key2,1);
                            static::$catTreeHasChange=true;
                            break;
                        }
                    }

                }



//                Log::info($item['name']);
//                Log::info($item['flowlist']);
//                Log::info($cat[$key]);




           // }

        }




    }


}
