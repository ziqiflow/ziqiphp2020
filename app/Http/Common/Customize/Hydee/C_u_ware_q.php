<?php


namespace App\Http\Common\Customize\Hydee;


class C_u_ware_q
{


    public static function getwarebywareid($wareid){

        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        ['wareid','=',$wareid]
                    ]
            ]
        ];
        $back= Config::getconn()->sample_get(Config::$db_haidian_u_ware_q,'*',$where);

        if(count($back)==0){
            return null;
        }
        else{
            return $back[0];
        }

    }


}
