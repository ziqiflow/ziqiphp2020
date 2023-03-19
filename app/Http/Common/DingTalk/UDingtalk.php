<?php


namespace App\Http\Common\DingTalk;


class UDingtalk
{

   private static function https_request($url,$data=null){
        $data=json_encode($data);

        $curl = curl_init();
        curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,FALSE);
        curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,FALSE);

        curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);


        curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));

        if(!empty($data)){
            curl_setopt($curl,CURLOPT_POST,1);
            curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
        }

        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }


    static public function getrolegroup($group_id,$ACCESS_TOKEN){
       return static::https_request("https://oapi.dingtalk.com/topapi/role/getrolegroup?access_token=$ACCESS_TOKEN",['group_id'=>1]);
    }

    static public function getrolelist($ACCESS_TOKEN,$size=100,$offset=0){
       return json_decode(static::https_request("https://oapi.dingtalk.com/topapi/role/list?access_token=$ACCESS_TOKEN",
          ['size'=>$size,'offset'=>$offset]
           ),true);
    }

    static public function setmessage($ACCESS_TOKEN,$data){
        return json_decode(static::https_request("https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=$ACCESS_TOKEN",
            $data
        ),true);
    }

    static public function messagestatus($ACCESS_TOKEN,$data){
        return json_decode(static::https_request("https://oapi.dingtalk.com/topapi/message/corpconversation/getsendprogress?access_token=$ACCESS_TOKEN",
            $data
        ),true);
    }

    static public function getuserinfo_bycode($accessKey,$timestamp,$signature,$data){
        return json_decode(static::https_request("https://oapi.dingtalk.com/sns/getuserinfo_bycode?signature=$signature&timestamp=$timestamp&accessKey=$accessKey",
            $data
        ),true);
    }

}