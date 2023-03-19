<?php


namespace App\Http\Common\Media;


use App\Http\Common\Base\CCompany;
use App\Http\Common\Log\MLog;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class CImages
{



    public static function delete($listid)
    {


        if (empty($listid)) return false;

        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['_uuid', '=', $listid]
                    ]
            ]
        ];

        $imagelist = Config::getconn()->sample_get(Config::$db_images, ['url'], $where);


        foreach ($imagelist as $image) {
            $file = public_path($image->url);

            $arr = explode('/', $image->url);
            $filename = array_pop($arr);

            $folder = public_path('_rm/' . implode('/', $arr));

            if (!file_exists($folder)) {
                mkdir($folder, 0777, true);
            }

            $newFile = $folder . '/' . $filename;
            @copy($file, $newFile);
            @unlink($file);
        }

        return Config::getconn()->sample_update(Config::$db_images, $where, [
                'deleted_id' => Config::getUser()->id,
                'deleted_at' => date('Y-m-d H:i:s', time())]
        );
    }

    public static function creats($filename, $dir, $source, $extend_data = [])
    {
        //dir:company/resource/
        $idlist = [];
        $filelist = request()->file($filename);

        if ($filelist == null) {
            return $idlist;
        }

        if (!is_array($filelist)) {

            $filelist = [$filelist];

        }
        foreach ($filelist as $file) {
            //echo $file->getSize().'<br>';
//                array_push($idlist,static::saveimage($file,$dir,array_merge(['source'=>$source],$extend_data)));

            $res = static::saveimage($file, $dir, array_merge(['source' => $source], $extend_data));
            if (is_array($res)) {
                array_push($idlist, $res);
            } else {
                if (Config::$mode == 'strict') {
                    array_push($idlist, ['error' => $res]);
                    return $idlist;
                }
            }
        }

        return $idlist;
    }


    public static function creat($filename, $dir, $source)
    {
        //dir:company/resource/

        $file = request()->file($filename);

        if ($file == null) {
            return null;
        }

        $image = static::saveimage($file, $dir, ['source' => $source]);

        if(is_array($image)){
            return $image;
        }

        if(Config::$mode=='strict'){
            return $image;
        }
        return null;

    }

    public static function saveimage(\Illuminate\Http\UploadedFile $file,
        //$filename,
                                     $dir,
                                     $extend_data = []
    )
    {

        $dir = Config::$imageRootFileDir . $dir;

        $image = Image::make($file);



        //dd($file->getSize()/1024>1024);

        //Log::info($file->getClientOriginalName().'----'.($file->getSize()/1024));

        if ($file->getSize() / 1024 > 1024 * Config::$imageMaxSize) return '图片大小超过限制' . Config::$imageMaxSize;


        $extension = $file->clientExtension() == 'jpeg' ? 'jpg' : $file->clientExtension();

        $url = $dir . date('Y') . '/' . date('m') . '/' . date('d');
        $folder = public_path('/' . $dir . date('Y') . '/' . date('m') . '/' . date('d'));


        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $bigid = Config::get_uuid_short();

        $newurl = $folder . '/' . $bigid . '.' . $extension;



        $insert = [
            '_uuid' => $bigid,
            'tags' => $dir,
            'title' => $file->getClientOriginalName(),
            'alt' => $file->getClientOriginalName(),
            'formats' => $extension,
//            'description'=>$description,
            'updated_at' => date('Y-m-d H:i:s', time()),
            'created_at' => date('Y-m-d H:i:s', time()),
            'updated_id' => Config::getUser()->id,
            'created_id' => Config::getUser()->id,
            'size' => round($file->getSize() / 1024, 2),
            'height' => $image->getHeight(),
            'width' => $image->getWidth(),
            'url' => $url . '/' . $bigid . '.' . $extension,
            'company_id' => CCompany::getCompanyId()
        ];

        $insert = array_merge($insert, $extend_data);


        if ($extension == 'gif' || $extension == 'ico') {
            if ($file->move($folder, $bigid . '.' . $extension)) {
                Config::getconn()->sample_insert(Config::$db_images, $insert);
                return ['imgid' => $bigid . '', 'url' => $insert['url']];
            } else {
                return '数据保存出错';
            }
        } else {

            if ($image->save($newurl)) {
                Config::getconn()->sample_insert(Config::$db_images, $insert);
                return ['imgid' => $bigid . '', 'url' => $insert['url']];
            } else {
                return '数据保存出错';
            }
        }
    }


    static public function autoDelete($allcheck = false)
    {

        $filename = CCompany::getCompanyPath() . 'images_auto_delete';
        if ($allcheck == false && Storage::disk()->exists($filename)) {
            $lasttime = Storage::disk()->get($filename);
        }
        $where = [['a' => 'whereNull',
            'arr' =>
                [
                    'deleted_at'
                ]
        ]];

        if (isset($lasttime)) {
            array_push($where, ['a' => 'where',
                'arr' =>
                    [
                        ['created_at', '>', date('Y-m-d H:i:s', $lasttime)]
                    ]
            ]);
        }

        $imageList = Config::getconn()->sample_get(Config::$db_images, ['url', '_uuid', 'id', 'source'], $where);

        $logdata = [];


        //dd($imageList);


        foreach ($imageList as $item) {

            if ($item->source == 'flowdesign') {

                $where = [
                    ['a' => 'where',
                        'arr' =>
                            [
                                ['remark', 'like', '%' . $item->url . '%']
                            ]
                    ]
                ];

                if (!Config::getmonconn()->sample_count(\App\Http\Common\OaFlow\Config::$mongo_flowdesigns, $where)) {


//                       $where=[
//                           ['a'=>'where',
//                               'arr'=>
//                                   [
//                                       ['id','=',$item->id]
//                                   ]
//                           ]
//                       ];
//                       Config::getconn()->sample_update(Config::$db_images,$where,['deleted_at'=>date('Y-m-d H:i:s',time())]);

                    if (static::delete($item->_uuid)) {
                        array_push($logdata, ['url' => $item->url]);
                    }


                }

            }

        }


        Storage::disk()->put($filename, time());

        if (count($logdata)) {
            MLog::info(['msg' => '删除了' . count($logdata) . '张照片', 'log' => $logdata, 'type' => 'auto.delete.image']);
            return;
        }
        return $logdata;


    }


}
