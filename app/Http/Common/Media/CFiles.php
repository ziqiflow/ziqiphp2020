<?php


namespace App\Http\Common\Media;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Log\MLog;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CFiles
{

    public static function getDownFile($fileid,$source=null){
        //dd($fileid);
        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_uuid','=',$fileid],
                    ]
            ]
        ];

        if(!empty($source)){
            array_push($where[0]['arr'],['source','=',$source]);
        }

        //dd($where);
        $files=Config::getconn()->sample_get(Config::$db_files,'*',$where);
        if(count($files)==0){

            return false;
        }

        return $files[0];
    }


    public static function showDownFile($file,$inline=true){
//Log::info(json_encode($file->formats));

        $file_name=public_path($file->url);
        //$file_name=iconv("utf-8","gb2312","$file_name");
        if(!file_exists($file_name)){
            echo "文件不存在";
            exit();
        }
        $file_size=filesize($file_name);
        $fp=fopen($file_name,"r+");

//http://tool.oschina.net/commons/

        //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

        $ContentType=null;
        if($inline){

            switch ($file->formats)
            {

            case 'xlsx':
            case 'xls':
                $ContentType="Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                break;
//$ContentType="Content-type: application/x-xls";
//break;
            case 'doc':
                case 'docx':
                $ContentType="Content-type: application/msword";
                break;

                case 'jpeg':
                case 'jpg':
                $ContentType="Content-type: image/jpeg";
                    break;
                case 'png':
                    $ContentType="Content-type: image/png";
                    break;
            default:
            }

        }

        if(empty($ContentType)){
            $ContentType="Content-type: application/octet-stream";
        }
        Header($ContentType);
        //$file_name

       // Header("Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        Header("Accept-Ranges: bytes");

        Header("Accept-Length: ".$file_size);

        if($inline){
            Header("Content-Disposition: inline;");
        }else{
            Header("Content-Disposition: attachment; filename=".$file->title);
        }

        $buffer=1024;
        while(!feof($fp)){
            $file_data=fread($fp,$buffer);
            echo $file_data;
        }

        fclose($fp);
    }

    public static function savefile(\Illuminate\Http\UploadedFile $file,
        //$filename,
                                     $dir,
                                     $extend_data=[]
    ){
        $dir=Config::$fileRootFileDir.$dir;

//        Log::info('$file->getSize()/1024');
//
//        Log::info($file->getSize()/1024);

        if($file->getSize()/1024>1024*Config::$fileMaxSize)return null;

        $extension=$file->clientExtension();
        Log::info('$extension');
        Log::info($extension);

        if(!in_array($extension,Config::$fileTypeAllow))return null;


        $url=$dir.date('Y').'/'.date('m').'/'.date('d');
        $folder=public_path('/'.$dir.date('Y').'/'.date('m').'/'.date('d'));


        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $bigid=Config::get_uuid_short();

        $newurl=$folder.'/'.$bigid.'.'.$extension;


        $insert=[
            '_uuid'=>$bigid,
            'tags'=>$dir,
            'title'=>$file->getClientOriginalName(),
            'alt'=>$file->getClientOriginalName(),
            'formats'=>$extension,
//            'description'=>$description,
            'updated_at'=>date('Y-m-d H:i:s',time()),
            'created_at'=>date('Y-m-d H:i:s',time()),
            'updated_id'=>Config::getUser()->id,
            'created_id'=>Config::getUser()->id,
            'size'=>round($file->getSize()/1024,2),
            'url'=>$url.'/'.$bigid.'.'.$extension,
            'company_id'=>CCompany::getCompanyId()
        ];

        $insert=array_merge($insert,$extend_data);

        Log::info($folder);
        Log::info($bigid.'.'.$extension);

        if($file->move($folder,$bigid.'.'.$extension)){
            Config::getconn()->sample_insert(Config::$db_files,$insert);
            return [
                'fileid'=>$bigid.'',
                'name'=>$insert['title'],
                'url'=>$insert['url'],
                'created_at'=>$insert['created_at'],
                'creater'=>Config::getUser()->name,
                'created_id'=>Config::getUser()->id,
                'formats'=>$extension,
                'size'=>$insert['size']
            ];
        }else{
            return null;
        }


    }

    public static function delete($listid,$whereOther=[]){


        if(empty($listid))return false;


        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['_uuid','=',$listid]
                    ]
            ]
        ];

        $where=array_merge($where,$whereOther);

        $filelist=Config::getconn()->sample_get(Config::$db_files,['url'],$where);

        //Log::info($filelist);


        foreach($filelist as $file){
            //var_dump($file);
            $filefolder=public_path($file->url);

            $arr=explode('/',$file->url);
            $filename=array_pop($arr);

            $folder=public_path('_rm/'.implode('/',$arr));

            if (!file_exists($folder)) {
                mkdir($folder, 0777, true);
            }

            $newFile=$folder.'/'.$filename;
            @copy($filefolder,$newFile);
            @unlink($filefolder);
        }

        return Config::getconn()->sample_update(Config::$db_files,$where,[
            'deleted_at'=>date('Y-m-d H:i:s',time()),
            'deleted_id'=>Config::getUser()->id
        ]);
    }

    public static function creats($filename,$dir,$source,$extend_data=[]){
        //dir:company/resource/
        $idlist=[];
        $filelist=request()->file($filename);

//        Log::info($_FILES);
//
        Log::info('$filelist');
//
        Log::info($filelist);

        if($filelist==null){
            return $idlist;
        }

        if(!is_array($filelist)){
            Log::info('单文件');
            array_push($idlist,static::savefile($filelist,$dir,array_merge(['source'=>$source],$extend_data)));
        }else{
            Log::info('多文件');
            foreach($filelist as $file){
                //echo $file->getSize().'<br>';
                array_push($idlist,static::savefile($file,$dir,array_merge(['source'=>$source],$extend_data)));
            }
        }
        return $idlist;
    }


    static public function replaceFileSimulationID($SimulationID,$replaceId){

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['ext_data1','=',$SimulationID],
                        ['source','=','flow']
                    ]
            ]
        ];

        return Config::getconn()->sample_update(Config::$db_files,$where,['ext_data1'=>$replaceId]);
    }


    static public function autoDelete($allcheck=false){

//        $where=[
//            ['a'=>'where',
//                'arr'=>
//                    [
//                        ['filelistlog.files.fileid','=','25904352988237042']
//                    ]
//            ]
//        ];
        //dd(Config::getmonconn()->sample_get(\App\Http\Common\OaFlow\Config::$mongo_flowlists,'*',$where));

        $filename=CCompany::getCompanyPath().'files_auto_delete';

        if($allcheck==false&&Storage::disk()->exists($filename)){
            $lasttime=Storage::disk()->get($filename);
        }

        $where=[['a'=>'whereNull',
            'arr'=>
                [
                    'deleted_at'
                ]
        ]];

        if(isset($lasttime)){
            array_push($where,['a'=>'where',
                'arr'=>
                    [
                        ['created_at','>',date('Y-m-d H:i:s',$lasttime)]
                    ]
            ]);
        }

        $fileList= Config::getconn()->sample_get(Config::$db_files,['url','_uuid','id','source'],$where);

        $logdata=[];


        foreach ($fileList as $item){

            if($item->source=='flow'){

                $where=[
                    ['a'=>'where',
                        'arr'=>
                            [
                                ['filelistlog.files.fileid','=',$item->id]
                            ]
                    ]
                ];


                if(!Config::getmonconn()->sample_count(\App\Http\Common\OaFlow\Config::$mongo_flowlists,$where))
                {
//                    $where=[
//                        ['a'=>'where',
//                            'arr'=>
//                                [
//                                    ['id','=',$item->id]
//                                ]
//                        ]
//                    ];
//                    Config::getconn()->sample_update(Config::$db_files,$where,['deleted_at'=>date('Y-m-d H:i:s',time())]);
//
                    if(static::delete($item->_uuid)){
                        array_push($logdata,['url'=>$item->url]);
                    }
                    //array_push($logdata,['url'=>$item->url]);


                }

            }

        }



        Storage::disk()->put($filename,time());

        if(count($logdata)){
            MLog::info(['msg'=>'删除了'.count($logdata).'个文件','log'=>$logdata,'type'=>'auto.delete.file']);
            return;
        }
        return $logdata;





    }


}