<!DOCTYPE html>
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
@section('js_end')
@show
