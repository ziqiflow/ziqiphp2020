<?php

namespace App\Http\Common\OaFlow\Export;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;

class FlowMessageCheckExport implements FromView
{
    use Exportable;

    public $data=null;
    public $dealtype=null;
    public function __construct($data,$dealtype)
    {
        $this->data=$data;
        $this->dealtype=$dealtype;
    }

    private function  showdepts($depts) {
        $arr = [];

        foreach ($depts as $dept){
            Log::info($dept);
            array_push($arr,$dept['n']);
        }

        return implode(',',$arr);

    }


    public function view(): View
    {


        foreach ($this->data as $key=> $item)

        {
            $this->data[$key]['status_str']=$this->tran_msgstatus($item['status']);

            if(empty($item['todeptstr'])){

                if(!empty($item['todepts'])){
                    $this->data[$key]['todeptstr']=$this->showdepts($item['todepts']);
                }else{
                    $this->data[$key]['todeptstr']='';
                }


            }

        }
//        Log::info(view('common.OaFlow.export_check_msg_list', [
//            'data' => $this->data,
//            'dealtype'=>$this->dealtype
//        ])->render());

        return view('common.OaFlow.export_check_msg_list', [
            'data' => $this->data,
            'dealtype'=>$this->dealtype
        ]);
    }


    private function tran_msgstatus($status)
    {

        $statuslist = [
            [
                'n' => '待处理', 'v' => 1
            ],
            [
                'n' => '取消',
                'v' => 2
            ],
            [
                'n' => '撤回',
                'v' => 8
            ],
            [
                'n' => '处理结束',
                'v' => 3
            ],
            [
                'n' => '或签结束',
                'v' => 4
            ],
            [
                'n' => '消息模式',
                'v' => 5
            ],
            [
                'n' => '抄送模式',
                'v' => 6
            ],
            [
                'n' => '结束s',
                'v' => 7
            ]
        ];


        foreach ($statuslist as $item){
            if($item['v']==$status){
                return $item['n'];
            }
        }

        return '无';

    }


}