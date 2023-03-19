<?php


namespace App\Http\Common\Media;


use App\Http\Controllers\Controller;

class RMediaCtrl extends Controller
{

    public function AutoDeleteFiles()
    {
        return CFiles::autoDelete();
    }

    public function AutoDeleteImgs()
    {
        return CImages::autoDelete();
    }




}