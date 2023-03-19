<?php

if (! function_exists('getMicroDefault')) {

    function getMicroDefault($str){
        $arr=explode('@',$str);
        if(count($arr)>1)return $arr[1];
        return null;
    }

}


if (! function_exists('loadcss')) {

    function loadcss(){
        return App\Http\Tool\CssJsLoader::cssload(func_get_args());
    }
}

if (! function_exists('loadjs')) {
    function loadjs(){
        return App\Http\Tool\CssJsLoader::jsload(func_get_args());
    }
}

if (! function_exists('loadctrl')) {
    function loadctrl(){
        return App\Http\Tool\CssJsLoader::ctrlload(func_get_args());
    }
}

if (! function_exists('transwdata')) {
    function transwdata($data){
        if(isset($data['data'])){
            $getdata=\App\Http\Dbctrl\DataSource::getdata($data['data'],'array');
            $data['data']='json:'.json_encode($getdata['list']).'@'.$getdata['default'];
        }
        return json_encode($data);
    }
}

if (! function_exists('transwdata2')) {
    function transwdata2($data){
        if(isset($data['data'])){
            $getdata=\App\Http\Dbctrl2\DataSource::getdata($data['data'],'array');
            $data['data']='json:'.json_encode($getdata['list']).'@'.$getdata['default'];
        }
        return json_encode($data);
    }
}

if (! function_exists('transwgetdata')) {
    function transwgetdata($data){
        //如果采用页面后加载这个数据的话,把下面的if注销即可
        //判断
        if(strpos($data,'json')===0)return $data;
        //dd($data);
        $getdata=\App\Http\Dbctrl\DataSource::getdata($data,'array');
        return 'json:'.json_encode($getdata['list']).'@'.$getdata['default'];
    }
}


if (! function_exists('transwgetdata2')) {
    function transwgetdata2($data){
        if(strpos($data,'json')===0)return $data;
        //dd($data);
        $getdata=\App\Http\Dbctrl2\DataSource::getdata($data,'array');
        return 'json:'.json_encode($getdata['list']).'@'.$getdata['default'];
    }
}


if (! function_exists('loadnpm')) {
    function loadnpm(){
        return App\Http\Tool\LoadNpmLoader::load(func_get_args());
    }
}
