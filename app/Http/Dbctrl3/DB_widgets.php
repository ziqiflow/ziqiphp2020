<?php


namespace App\Http\Dbctrl3;


use Illuminate\Support\Facades\Log;

class DB_widgets
{

    private static $whereArr=array();

    public static function loadwhere(\Illuminate\Database\Query\Builder $query,$where,$isMongodb){


        //echo $match;




        //$where['searchMatch']==

        $match=$where['searchMatch'];
        $value=$where['value'];
        $name=$where['name'];
        $type=$where['type'];


        switch ($match)
        {
        case 'where:=':
            $query->where($name,$value);
          break;
            case 'where:=%null':

                if($value=='notnull'){
                    $query->whereNotNull($name);
                }elseif($value=='isnull'){
                    $query->whereNull($name);
                }elseif($value=='all'){
                    //pass
                }else{
                    $query->where($name,$value);
                }
                break;
            case 'where:%like':
                $query->where($name,'like','%'.$value);
                break;
            case 'where:%like%':
                $query->where($name,'like','%'.$value.'%');
                break;
            case 'where:like%':
                $query->where($name,'like',$value.'%');
                break;
            case 'where:>':
                $query->where($name,'>',$value);
                break;
            case 'where:>=':
                $query->where($name,'>=',$value);
                break;
            case 'where:<':
                $query->where($name,'<',$value);
                break;
            case 'where:<=':
                $query->where($name,'<=',$value);
                break;


            default:


                //$query->where($name,$value);

        }





        if($match=='where:in'){



        }


        if($match=='where:between'){

//            Log::info('type');
//            Log::info($type);

            if($type=='date'&&is_array($value)){
                $query->where($name,'>=',$value[0]);
                $query->where($name,'<=',$value[1]);
            }


        }


        return $query;

    }

}