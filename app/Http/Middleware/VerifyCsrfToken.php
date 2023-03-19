<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{

    protected $except = [
        //
//        '/api/*',
        '/wechatwork/app/serve',
        '/ecom/chinamed/v3/wechat',
        '/test/*',
        '/ecom/chinamedadmin/im/upload',


//        'api/ecom/chinamed/im/upload'
    ];
}
