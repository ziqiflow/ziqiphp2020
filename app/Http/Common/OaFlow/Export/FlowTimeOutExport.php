<?php

namespace App\Http\Common\OaFlow\Export;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;

class FlowTimeOutExport implements FromView
{
    use Exportable;

    public $data=null;

    public function __construct($data)
    {
        $this->data=$data;
    }


    public function view(): View
    {


        return view('common.OaFlow.export_timeout_log', [
            'data' => $this->data,
        ]);
    }



}