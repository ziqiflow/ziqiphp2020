<?php


namespace App\Http\Common\OaFlow;


use Illuminate\Support\Facades\Log;

class CFlowPreview
{
    static $isPreviewMode=false;
    static $PreviewFunList=[];


    static $PreviewSonFlows=[];


    static public function hasInPreviewFunList($funid){



//        if(count(static::$PreviewSonFlows)==0){
//            return true;
//        }
        foreach (static::$PreviewFunList as $fun){
            if($fun['funid']==$funid){
                return [(!static::$canchoseflow)?true:(!!$fun['flowcheck']),
                    $fun['msgcheck'],$fun['cccheck'],
                    CFlowMessageTo::getlevel($fun['msglevel']??CFlowMessageTo::$level_normal),
                    CFlowMessageTo::getlevel($fun['cclevel']??CFlowMessageTo::$level_normal)];

            }
        }
        return [true,null,null,CFlowMessageTo::$level_normal,CFlowMessageTo::$level_normal];

    }

    static public function hasInPreviewSonFlow($flowid){


//        Log::info('$PreviewSonFlows');
//        Log::info(static::$PreviewSonFlows);
//        Log::info(static::$canchoseflow);


        $level=CFlowMessageTo::$level_normal;
        foreach (static::$PreviewSonFlows as $sonFlow){
            if($sonFlow['flowid']==$flowid){
                $level=  CFlowMessageTo::getlevel($sonFlow['level']??CFlowMessageTo::$level_normal);
            }
        }

        if(!static::$canchoseflow)return [true,$level];
//        if(count(static::$PreviewSonFlows)==0){
//            return true;
//        }


        foreach (static::$PreviewSonFlows as $sonFlow){
            if($sonFlow['flowid']==$flowid){
                return [
                    !!$sonFlow['check'],
                    $level
                ];
            }
        }

        return [true,$level];
    }



    static public $canchoseflow=false;
    static public $canchoseorer=true;
    static public $canchoseander=false;
    static public $canchosecc=true;

    static public function initbtninfo($buttoninfo){
        if(isset($buttoninfo['canchosecc'])){
            static::$canchosecc=$buttoninfo['canchosecc'];
        }

        if(isset($buttoninfo['canchoseflow'])){
            static::$canchoseflow=$buttoninfo['canchoseflow'];
        }

        if(isset($buttoninfo['canchoseorer'])){
            static::$canchoseorer=$buttoninfo['canchoseorer'];
        }

        if(isset($buttoninfo['canchoseander'])){
            static::$canchoseander=$buttoninfo['canchoseander'];
        }

    }



}