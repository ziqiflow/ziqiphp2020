<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <title>@yield('title',isset($title)?$title:$tablename_zh.'['.$tablename.']显示列表')</title>
</head>

@section('css')
    <link rel="stylesheet" href="/js/lib/FormMaking/FormMaking.css">
    <link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css">


    <style>
        body, td, th {
            font-size: 13px;
        }
    </style>

@show

@section('js_start')

    <script src="https://cdn.staticfile.org/vue/2.6.10/vue.min.js"></script>
    <script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js"></script>

    <script src="https://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js"></script>

    <script src="/js/lib/FormMaking/FormMaking.umd.js"></script>


@show

<body>
@yield('content')
</body>
</html>



<script>
    window.dbid={{$id}};
    window.ismongodb={{$ismongodb?'true':'false'}};
    window.routeid='<?php echo (Illuminate\Support\Facades\Route::currentRouteName()==null?'null':Illuminate\Support\Facades\Route::currentRouteName())?>';
    window.default=<?php echo json_encode($DefaultData) ?>;
    window.pageset=<?php echo json_encode($pageset)?>;

        for (var key in window.pageset){
        if(typeof window.pageset[key] =='string') {
            try {
                window.pageset[key] = JSON.parse(window.pageset[key]);
            } catch (e) {
            }
        }
    }

    window.SearchSubmitUrl='<?php echo $SearchSubmitUrl?>';
</script>


@section('js_end')
@show
