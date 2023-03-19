<?php


namespace App\Http\Common\Customize\Hydee;


use Illuminate\Support\Facades\Log;

class H_u_ware_q
{


    public static function getChinaMedList(){

//        Config::getconn()->sample_get(Config::$db_haidian_u_ware_q,'*',$where);

        return  Config::getconn('sqlsrv',false,'sqlsrv')->getRawConn()->select("
        select a.wareid,
	a.abc,
	a.warename,
	a.warespec,
	a.producer,
	a.waretype,
	a.purprice,
	a.saleprice from u_ware_q a left join u_ware_class b on a.wareid=b.wareid and b.parentcode='01'
   where a.status = 1
   and (LEFT(b.classcode,4) in ('0201','0203'))
   and a.wareid not in('20203097','20202872','20203382','20203069','20202870','20202871',
   '20203379','20202869','20202873','20203390','20203127','20201992','20203094')
        ");



    }


    static public function SyncFromHaidian(){

        set_time_limit(0);





        $conn= Config::getconn();
        $conn->beginTransaction();
        $conn->getRawConn()->table(Config::$db_haidian_u_ware_q_cache)->delete();

        $offset=0;
        while (true){

            $funback=function ($query)use ($offset){
                $query->offset($offset)->limit(1000);
                $query->orderBy(Config::$db_hydee_u_ware_q.'.wareid');
                    //  $query->orderBy($orderby, $isorder==1?'DESC':'ASC')
            };
            $back=static::getware([],$funback);
            $offset+=1000;

            if($back->count()==0){
                break;
            }

            Log::info('Offset:'.$offset);


//        dd($back->map(function ($value) {
//            return (array)$value;
//        })->toArray());

            $conn->getRawConn()->table(Config::$db_haidian_u_ware_q_cache)->insert($back->map(function ($value) {
                return (array)$value;
            })->toArray());

        }
        $conn->commit();

    }




    public static function getware($where=[],$funback=null){
        $funcallback=function($query)use ($funback){

            $query->leftJoin(Config::$db_hydee_u_ware_class, function ($join)  {
                $join->on(Config::$db_hydee_u_ware_q.'.wareid', '=', Config::$db_hydee_u_ware_class.'.wareid');
                $join->where(Config::$db_hydee_u_ware_class.'.parentcode','=','12');
            });


            $query->leftJoin(Config::$db_hydee_c_class, function ($join)  {
                $join->on(Config::$db_hydee_u_ware_class.'.classcode', '=', Config::$db_hydee_c_class.'.classcode');
                $join->where(Config::$db_hydee_c_class.'.parentcode','=','12');
            });


            if($funback!=null){
                call_user_func($funback, $query);
            }



//            $query->leftJoin(Config::$db_hydee_u_ware_class, Config::$db_hydee_u_ware_q.'.wareid', '=', Config::$db_hydee_u_ware_class.'.wareid');
//            $query->leftJoin(Config::$db_hydee_c_class, Config::$db_hydee_u_ware_class.'.classcode', '=', Config::$db_hydee_c_class.'.classcode');
        };

        $back= Config::getconn('sqlsrv',false,'sqlsrv')->sample_get(Config::$db_hydee_u_ware_q,[
            Config::$db_hydee_u_ware_q.'.wareid',
            Config::$db_hydee_u_ware_q.'.warename',
            Config::$db_hydee_u_ware_q.'.barcode',
            Config::$db_hydee_u_ware_q.'.producer',
            Config::$db_hydee_u_ware_q.'.warespec',
            Config::$db_hydee_u_ware_q.'.leastprice',
            Config::$db_hydee_u_ware_q.'.purprice',

            Config::$db_hydee_u_ware_q.'.saleprice',


            Config::$db_hydee_c_class.'.classname as group_a_class_name'

        ],$where,$funcallback);

        $back->each(function ($item){
//            Log::info('leastprice'.$item->leastprice);
            $item->leastprice=($item->leastprice*100)."%";
        });

        return $back;
    }


    public static function getwarebywareid($wareid){


        if (Config::$u_ware_q_use_cache){

            $where=[
                ['a'=>'where',
                    'arr'=>
                        [
                            ['wareid','=',$wareid],
                        ]
                ]
            ];

            $back=Config::getconn()->sample_get(Config::$db_haidian_u_ware_q_cache,'*',$where);

//            return $back;
            if(count($back)==0){
                return null;
            }
            else{
                return $back[0];
            }
//            Config::getconn()->getconn(Config::$connname)
        }




        $where=[
            ['a'=>'where',
                'arr'=>
                    [
                        [Config::$db_hydee_u_ware_q.'.wareid','=',$wareid],
//                        [Config::$db_hydee_u_ware_class.'.parentcode','=','12'],
//                        [Config::$db_hydee_c_class.'.parentcode','=','12'],
                    ]
            ]
        ];

        $back=static::getware($where);


        if(count($back)==0){
            return null;
        }
        else{
            return $back[0];
        }

    }






}
