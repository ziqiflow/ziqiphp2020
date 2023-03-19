<?php


namespace App\Http\Common\Media;


use App\Http\Common\ConfigRoot;

class Config extends ConfigRoot
{


    public static $db_images='erp_images';

    public static $imageMaxSize=5;//1MB

    public static $imageRootFileDir='imgs/';

    public static $mode='lazy';

    public static $db_files='erp_files';
    public static $fileRootFileDir='files/';
    public static $fileMaxSize=15;//1MB
    public static $fileTypeAllow=['bin','ppt','pptx','pdf','zip','rar','txt','png','jpg','jpeg','doc','xlsx','xls','docx','doc'];




}
