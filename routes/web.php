<?php
@include  ("../app/routes.php");

Route::get('/', function () {
    return view('welcome');
});


Route::get('/hello', function () {
    return view('welcome');
});


@include_once 'web/erp.php';

if(env('CANADMIN',false)){
    @include_once 'web/admin.php';
}

@include_once ("../app/Http/Common/Base/routes/web.php");

@include_once ("../app/Http/Common/Customize/Hydee/routes/web.php");

@include_once ("../app/Http/Common/DingTalk/routes/web.php");

@include_once ("../app/Http/Common/Media/routes/web.php");

@include_once ("../app/Http/Common/OaFlow/routes/web.php");











































