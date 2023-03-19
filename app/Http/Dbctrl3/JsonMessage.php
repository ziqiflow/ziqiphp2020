<?php


namespace App\Http\Dbctrl3;


class JsonMessage
{

    static function Creat($success,$message='',$data=null,$code=200){


        return [
            'success'=>$success,
            'msg'=>$message,
            'code'=>$code,
            'data'=>$data
        ];
    }

}
