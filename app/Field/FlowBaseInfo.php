<?php


namespace App\Http\Field;


use Encore\Admin\Form\Field;

class FlowBaseInfo extends Field
{
    private $userFlow;

    public function __construct($userFlow)
    {
        $this->userFlow = $userFlow;
    }

    public function render()
    {
        return view("field.flow-base-info")
            ->with("userFlow", $this->userFlow);
    }
}
