<?php


namespace App\Http\Common\utils;


use Illuminate\Support\Facades\Log;

class Curl
{


    static function asyncPost($url,$postFields,$timeout=1){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_FAILONERROR, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_TIMEOUT,$timeout);


        if(strlen($url) > 5 && strtolower(substr($url,0,5)) == "https" ) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        }

        if (is_array($postFields) && 0 < count($postFields))
        {

            $data_string=json_encode($postFields,JSON_UNESCAPED_UNICODE);
            Log::info("上传数据：".$data_string);
            $header = array(
                'Content-Type: application/json; charset=utf-8',
                'Content-Length: ' . strlen($data_string),
            );
            curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string);

        }
        $reponse = curl_exec($ch);



        return $reponse;


    }

    static function Post($url,$postFields){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FAILONERROR, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


        if(strlen($url) > 5 && strtolower(substr($url,0,5)) == "https" ) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        }

        if (is_array($postFields) && 0 < count($postFields))
        {

            $data_string=json_encode($postFields,JSON_UNESCAPED_UNICODE);
            Log::info("上传数据：".$data_string);
            $header = array(
                'Content-Type: application/json; charset=utf-8',
                'Content-Length: ' . strlen($data_string),
            );
            curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string);

        }
        $reponse = curl_exec($ch);



        return $reponse;


    }

}
