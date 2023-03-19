@extends('base')
@section('title',isset($title)?$title:(($isNewType?'新增':'修改').'['.$dbname.']'.$dbname_zh.'的数据'))

@section('css')


    <?php echo loadcss('body',
            'bootstrap',
            'ngDialog',
            'ngDialog-theme-default',
            'font-awesome',
            'datetimepicker',
            'isteven-multi-select'
            );?>

@endsection


@section('js_start')

    <?php echo loadjs(
            'jquery',
            'global',
            'angular',
            'bootstrap',
            'ui-bootstrap-tpls',
            'ngDialog',
            'jquery.datetimepicker',
            //'angular.datetime',
            'angular-validation',
            'angular-validation-rule',
            'jquery.loadingoverlay',
            'isteven-multi-select'
    ) ?>

@endsection



@section('js_end')
    <?php echo loadjs('Gdirectives','ueditor.config','ueditor.all') ?>


@endsection