<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{

    protected $middleware = [

        \App\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        \App\Http\Middleware\TrustProxies::class,
    ];

    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            'throttle:200,1',
            'bindings',
            \Barryvdh\Cors\HandleCors::class,
        ],
    ];

    protected $routeMiddleware = [
        'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,

        'Web.AdminUser'=>\App\Http\Middleware\WebAdminUser::class,
        'Web.ErpUser'=>\App\Http\Middleware\WebErpUser::class,
        'Web.CompanyEmployee'=>\App\Http\Middleware\WebCompanyEmployee::class,

        'Api.Employee'=>\App\Http\Middleware\ApiEmployee::class,
        'Api.Test.Employee'=>\App\Http\Middleware\ApiTestEmployee::class,
        'Api.Replace.Employee'=>\App\Http\Middleware\ApiReplaceEmployee::class,

        'Api.RateEmployee'=>\App\Http\Middleware\ApiRateEmployee::class,


        'CompanyEmployee'=>\App\Http\Middleware\CompanyEmployee::class,

    ];
}
