<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <title>@yield('title')</title>
</head>

@section('css')
@show

@section('js_start')
@show

<body>
@yield('content')
</body>
</html>
 <script>
     window.routeid='<?php echo (Illuminate\Support\Facades\Route::currentRouteName()==null?'null':Illuminate\Support\Facades\Route::currentRouteName())?>';
 </script>
@section('js_end')
@show
