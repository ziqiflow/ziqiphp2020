<?php


namespace App\Http\Common\OaFlow\Export;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class FlowExport  implements WithMultipleSheets
{
    use Exportable;

    public $result;
    public $title;

//    protected $year;
    public function __construct($title,$result)
    {
        $this->title=$title;
        $this->result=$result;
    }

    public function sheets(): array
    {



        $result=$this->result['data']['pagedata']['result'];
        $permissions=$this->result['data']['pagedata']['permissions'];

        $display_list=$this->result['data']['pageset']['display_list'];

        $tables=[];

        foreach ($display_list as $item){
            if(empty($item['_isformdata'])){
                continue;
            }
            if($item['_formset']['type']=='table'){
                array_push($tables,
                    [
                        'key'=>$item['name'],
                        'name'=>$item['_formset']['name'],
                        'tableset'=>$item['_formset']['options']['tableset'],
                        'sontables'=>[]
                    ]
                );
            }
        }

        foreach ($tables as $tablekey => $tableitem){


            foreach ($result as $item){

                if(isset($item[$tableitem['key']])){

                    array_push($tables[$tablekey]['sontables'],
                        [
                            'list'=>$item[$tableitem['key']],
                            '_id'=>(string)$item['_id'],
                            'desc'=>$item['desc'],
                            'workname'=>isset($item['workname'])?$item['workname']:null,
                        ]
                    );
                }



            }


        }

        $sheets = [];




        libxml_use_internal_errors(true);
        $sheets[]=new FlowSheet( $this->title.'-汇总表','summary',['list'=>$result,'set'=>$display_list,'tables'=>$tables]);


        $sheets[]=new FlowSheet( $this->title.'-主表','main',['list'=>$result,'set'=>$display_list]);
//        $sheets[0]->setColumnFormat(array(
//            'B' => '@',
//        ));

        foreach ($tables as $table){
            $sheets[] = new FlowSheet('子表-'.$table['name'],'table',$table);
        }

        return $sheets;
    }
}
