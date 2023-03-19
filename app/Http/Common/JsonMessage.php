<?php


namespace App\Http\Common;


use Illuminate\Support\Facades\Log;

class JsonMessage
{

    static function Creat($success,$message='',$data=null,$code=200){

        //Log::info(request()->ip().'-------------------------------------------------------------------');


        //Log::info(request()->all());
        //Log::info(['success'=>$success, 'msg'=>$message, 'code'=>$code, 'data'=>$data]);
        //Log::info('-------------------------------------------------------------------');

        return [
            'success'=>$success,
            'msg'=>$message,
            'code'=>$code,
            'data'=>$data
        ];
    }

}