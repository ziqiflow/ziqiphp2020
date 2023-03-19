<?php


namespace App\Http\Common\OaFlow;

use App\Http\Common\Customize\Hydee\C_u_ware_q;
use App\Http\Common\Customize\Hydee\H_u_ware_q;
use App\Http\Common\JsonMessage;

class CTableFun
{

   static function _localfun(){
       return
           [
                [
                    'placeholder'=> '百分比转换成数字,参数1为要转换的带有%的字符串，比如12.12%会转换0.1212',
                'funname'=> '百分比转数字',
                'funeval'=>
<<<EOT
(paras)=>{

                    if(paras[0].indexOf('%')!=-1){
                        paras[0]=paras[0].replace("%","");
                        paras[0]=paras[0]/100;
                    }
                    return paras[0];
                }
EOT
                    ],
                [
                 'placeholder'=> '将输入的数据四舍五入后保留N位数，默认保留2位。参数1是要转换的数据，参数2是保留的位数，默认是2',
                'funname'=> '四舍五入保留小数',
                'funeval'=>
                    <<<EOT
(paras)=>{
                    console.log('paras',paras)

                    let num = Number(eval(paras[0])).toFixed(paras.length>1?paras[1]:2)
    		        return num;
                }
EOT
                ]
            ];

   }

   static function _funList(){
        return [
            [
                'name'=>'海典商品',
                'prefix'=>'',
                'api'=>'',
                'fields'=>[

                    ['name'=>'商品名','value'=>'warename'],
                    ['name'=>'条形码','value'=>'barcode'],
                    ['name'=>'生产厂家','value'=>'producer'],
                    ['name'=>'商品规格','value'=>'warespec'],
                    ['name'=>'集团管理级别分类','value'=>'group_a_class_name'],
                    ['name'=>'最低批发毛利率','value'=>'leastprice']
                ],
                'funlist'=>
                    [
                        [
                            'placeholder'=>'转换为海典的商品字段，第一个参数是商品id，第二个参数是要转换的字段，使用方式实例：#[转为海典商品字段](@[商品ID],商品名)',
                            'funname'=>'转为海典商品字段',
                            'fun'=>'trans_hydee_by_wareid',
                            'frontfun'=>'uri_merge_para0'



                            //'keyvaluetable'=>1
                            ,
                            //
                        ],
                    ]
            ],

        ];






    }






   static function trans_hydee_by_wareid($paras){
        //return C_u_ware_q::getwarebywareid($paras[0]);
        return H_u_ware_q::getwarebywareid($paras[0]);

//


    }



}
