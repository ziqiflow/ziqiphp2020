<?php


namespace App\Http\Dbctrl3;

use App\Http\Dbctrl3\DataSource;

class DisplayFilter
{

    public function none($name,&$data){
        //var_dump($data);
    }

    public function getback($filter,$name,&$data){







        //var_dump($filter);
        $pos = strpos($filter,'@');
        $pos2=strpos($filter,'#');



        if($pos===false){
            if($pos2===false){
                $filterFun=$filter;
                return $this->$filterFun($name,$data);
            }else{
                $filterFun=substr($filter,0,$pos2);
                $paradata=substr($filter,$pos2+1);
                return $this->$filterFun($name,$data,explode('#',$paradata));
            }
        }



        if($pos2===false){
            $filterFun=substr($filter,0,$pos);
            $dataSource=substr($filter,$pos+1);
        }else{
            //dd($pos);
//            var_dump($pos2);
            $filterFun=substr($filter,0,$pos);
//            var_dump($filterFun);
            $dataSource=substr($filter,$pos+1,$pos2-$pos-1);
        }
//        var_dump($filterFun);
//        var_dump($dataSource);

//        dd($dataSource);
        $Sdata=DataSource::getdata($dataSource,'array')['list'];//
//        var_dump($Sdata);

        //dd($name);
//        dd($data);
//        dd($Sdata);
        //var_dump($name);

        //var_dump($item);
        foreach($data as $key=>$val){
            foreach($Sdata as $item){
                if($item['v']==$val->{$name}){
//                    var_dump($item['v']);
//                    var_dump($val->{$name});
//                     return $item['n'];
                    $data[$key]->{$name}=$item['n'];
                    break;
                    //var_dump($data[$key]);
                }
            }
        }

        //dd($data);

        //var_dump($Sdata);
        if($pos2===false){
            return $this->$filterFun($name,$data);
        }else{
            $paradata=substr($filter,$pos2+1);
            return $this->$filterFun($name,$data,explode('#',$paradata));
        }
    }




    public function htmlsubstr100($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}=mb_substr(strip_tags($data[$key]->{$name}),0,100,'utf-8');
        }
    }
    public function htmlsubstr30($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}=mb_substr(strip_tags($data[$key]->{$name}),0,30,'utf-8');
        }
    }


    public function targetlinkto($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<a target="_blank" href="'.$data[$key]->{$name}.'">查看</a>';
        }
    }

    public function img($name,&$data,$para){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<a target="_blank" href="'.$data[$key]->{$name}.'"><img style="width:'.$para[0].'px" src="'.$data[$key]->{$name}.'" /><span style="display:none">1</span></a>';
        }
    }
    //publicimg#100
    public function publicimg($name,&$data,$para){
        foreach($data as $key=>$val){
            if(empty($data[$key]->{$name}))continue;
            $data[$key]->{$name}='<a target="_blank" href="/public/'.$data[$key]->{$name}.'"><img style="width:'.$para[0].'px" src="/public/'.$data[$key]->{$name}.'" /><span style="display:none">1</span></a>';
        }
    }

    public function replacestr($name,&$data,$para){
        foreach($data as $key=>$val){
            if(empty($data[$key]->{$name}))continue;
            $data[$key]->{$name}=str_replace('$replace$',$data[$key]->{$name},$para[0]);
        }
    }



    public function appurlwithreplace($name,&$data,$para){
        foreach($data as $key=>$val){
            if(empty($data[$key]->{$name}))continue;
            $data[$key]->{$name}=request()->getScheme().'://'.$_SERVER['HTTP_HOST'].str_replace('$replace$',$data[$key]->{$name},$para[0]);
        }
    }


    public function linkid($name,&$data,$para){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<a target="'.$para[1].'" href="'.$para[0].$val['id'].'">'.$data[$key]->{$name}.'</a>';
        }
    }

    public function tospandata($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}="<span class='noremove tospandata' data-json='".$data[$key]->{$name}."'></span>";
        }
    }


    public function toimage100thumb_withlink($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<a target="_blank" href="'.$data[$key]->{$name}.'"><img style="width:100px" src="'.$data[$key]->{$name}.'" /><span style="display:none">1</span></a>';
        }
    }

    public function addeditbtn($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<div style="position: relative"><span class="td-data-val">'.$data[$key]->{$name}.'</span><a data-id="'.$val['id'].'" data-val="'.$data[$key]->{$name}.'" class="fa fa-edit table_td_editbtn"></a></div>';
        }
    }

    public function timetodate($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<span title="'.$data[$key]->{$name}.'">'.substr ( $data[$key]->{$name} , 0 ,10 ).'</span>';
        }
    }

    public function tocheckbox($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<div>
  <input data-ckd="'.$data[$key]->{$name}.'" '.($data[$key]->{$name}==1?'checked="checked"':'').' value="'.$val['id'].'"  type="checkbox" name="checkbox_'.$val['id'].'" id="checkbox_'.$val['id'].'">';
        }
    }

    public function ordermessage($name,&$data){
        foreach($data as $key=>$val){
            $data[$key]->{$name}='<p>买家留言：'.$val['buyer_message'].'<p>'
                .'<p>卖家留言：'.$val['seller_message'].'<p>';
        }
    }

    public function displaytime($name,&$data){
        //var_dump($data);

        foreach($data as $key=>$val){
                    $data[$key]->{$name}='<p>开始：'.$val['created_at'].'<p>'
                        .'<p>发货：'.$val['sended_at'].'<p>';
            }
    }







//call_user_func_array(
//array($objDisplay, $item['filter']),
//array($val[$item['name']],$val)

    public function test($name,&$data){
        foreach($data as $key=>$item){
            $data[$key]->{$name}='<a style="color: white" href="www.baidu.com">'.$item[$name].'</a>';
        }
    }

    public function microdataDisplay($val,$allarr){

        $arr=json_decode($val);

        $str='';
        foreach($arr as $key=>$val){
            $str.='<span class="label label-info">'.json_encode($arr[$key],JSON_UNESCAPED_UNICODE).'</span><br><br>';
        }
        return $str;
    }
}
