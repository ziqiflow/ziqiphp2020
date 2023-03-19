<?php


namespace App\Http\Common\OaFlow\Export;

//use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithTitle;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Support\Facades\Log;

class FlowSheet  implements FromView,WithTitle
{
   public $title=null;
   public $type=null;
   public $data=null;

    public function __construct($title,$type,$data)
    {
        $this->title=$title;
        $this->type=$type;
        $this->data=$data;


    }

//    public function array(): array
//    {
//        return [
//            [1, 2, 3],
//            [4, 5, 6]
//        ];
//    }


    public function view(): View
    {

        if($this->type=='summary'){




            return view('common.OaFlow.export_summary', [
                'data' =>$this->data
            ]);

        }

        if($this->type=='table'){

            return view('common.OaFlow.export_table', [
                'data' =>$this->data
            ]);

        }

        if($this->type=='main'){

            return view('common.OaFlow.export_main', [
                'data' =>$this->data
            ]);

        }
//        return view('exports.invoices', [
//            'invoices' => Invoice::all()
//        ]);
    }



    public function title(): string
    {
        return $this->title;
    }
}
