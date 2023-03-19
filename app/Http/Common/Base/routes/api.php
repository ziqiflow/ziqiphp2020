<?php
Route::any('/employee/logout','AutoCtrl\RBaseCtrl@employeeloginout');
Route::post('/employee/login','AutoCtrl\RBaseCtrl@employeelogin');
Route::post('/employee/login/getpkey','AutoCtrl\RBaseCtrl@getpublickey');


Route::group(['middleware' => ['Api.Employee']], function () {
    Route::get('/employee/getinfo', 'AutoCtrl\RBaseCtrl@employeeinfo');
});
