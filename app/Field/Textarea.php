<?php


namespace App\Http\Field;


class Textarea extends \Encore\Admin\Form\Field\Textarea implements IFlowField
{
    use FlowFieldCommon {
        render as TraitRender;
    }

    public function render()
    {
        $this->isFull = true;
        return $this->TraitRender()->with(['rows' => $this->rows]);
    }
}
