<?php


Route::any('/dingtalk/login','AutoCtrl\RDingTalkCtrl@DingTalkLogin');
Route::any('/dingtalk/loginweb','AutoCtrl\RDingTalkCtrl@DingTalkLoginWeb');
Route::any('/dingtalk/loginweb_callback','AutoCtrl\RDingTalkCtrl@DingTalkLoginWebCallback');




Route::any('/autoexe/dingtalk/sync','AutoCtrl\RDingTalkCtrl@AutoDingtalkSync');



Route::group(['middleware' => ['web','CompanyEmployee']], function () {

    Route::any('/employee/dd/deleteuser/list','AutoCtrl\DDingtalkUserDelete@list')->name('dd.deleteuser.list');
    Route::post('/employee/dd/deleteuser/delete','AutoCtrl\DDingtalkUserDelete@delete')->name('dd.deleteuser.delete');

    Route::any('/employee/dd/deleterole/list','AutoCtrl\DDingtalkRoleDelete@list')->name('dd.deleterole.list');
    Route::post('/employee/dd/deleterole/delete','AutoCtrl\DDingtalkRoleDelete@delete')->name('dd.deleterole.delete');

    Route::any('/employee/dd/deletedept/list','AutoCtrl\DDingtalkDeptDelete@list')->name('dd.deletedept.list');
    Route::post('/employee/dd/deletedept/delete','AutoCtrl\DDingtalkDeptDelete@delete')->name('dd.deletedept.delete');

    Route::any('/employee/dd/deleterolegroup/list','AutoCtrl\DDingtalkRoleGroupDelete@list')->name('dd.deleterolegroup.list');
    Route::post('/employee/dd/deleterolegroup/delete','AutoCtrl\DDingtalkRoleGroupDelete@delete')->name('dd.deleterolegroup.delete');

    Route::post('/employee/dd/userdeptrolestoredatarest', 'AutoCtrl\ROaFlowCtrl@UserDeptRoleStoreDataRest')
        ->name('dept.restdata');

});
