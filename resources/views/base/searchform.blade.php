<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <title>@yield('title',isset($title)?$title:$dbname_zh.'['.$dbname.']显示列表')</title>


</head>

@section('css')

    <?php echo loadcss(
           'bootstrap',
            'body',
            'font-awesome',
            'datetimepicker','jquery.fancybox');?>
    <style type="text/css">
        .label{
            text-align: left;
            white-space: normal;
            display: inline-block;
            line-height: 18px;
        }

        #displayhtml table tr td,tr th{
            padding: 5px !important;
        }
        #displayhtml tr td{position: relative}

        table.JColResizer{
            cursor: auto !important;
        }
        .JColResizer {
            cursor: ew-resize !important;
        }
    </style>


@show

@section('js_start')

    <?php echo loadjs(
            'jquery',
            'global',
            'angular',
            'ui-bootstrap-tpls',
            'jquery.datetimepicker',
            'colResizable','jquery.fancybox','jquery.fancydialog');?>

@show

<body style="background-color: ">
@yield('content')
</body>
</html>



<script>
    window.orderby_list=<?php echo json_encode($orderby_list)?>;
    window.dbid={{$id}};
    window.routeid='<?php echo (Illuminate\Support\Facades\Route::currentRouteName()==null?'null':Illuminate\Support\Facades\Route::currentRouteName())?>';
    window.default=<?php echo json_encode($DefaultData) ?>;

    window.get_datasource_url='/erp/post_get_datasource';
    window.SearchSubmitUrl='<?php echo $SearchSubmitUrl?>';
</script>


@section('js_end')
@show
<?php echo loadjs('erp.searchform.common','Gdirectives')?>
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?32d3a7c9ddb3010f1f1db9bfcdc71d94";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>