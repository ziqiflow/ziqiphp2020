<?php


Route::any('/oa/table/set', 'AutoCtrl\ROaFlowCtrl@TableSet');
Route::any('/oa/tablefun/funlist', 'AutoCtrl\ROaFlowCtrl@TableFunFunList');
Route::any('/oa/tablefun/callback', 'AutoCtrl\ROaFlowCtrl@TableFunCallback');
Route::any('/oa/formcustomlist', 'AutoCtrl\ROaFlowCtrl@formcustomlist');
Route::any('/oa/defaultValue_format', 'AutoCtrl\ROaFlowCtrl@defaultValue_format');

Route::group(['middleware' => ['Api.Employee']], function () {

    Route::post('/replace_emp/employee/login', 'AutoCtrl\ROaFlowCtrl@ReplaceLoginUser')->name('oa.replace_emp');



    if(env('APP_DEBUG')){
        Route::post('/oa/employee/testlogin', 'AutoCtrl\ROaFlowCtrl@TestLoginUser')
            ->name('user.testlogin')
            ;
    }

    Route::post('/oa/flow/tempform/save', 'AutoCtrl\ROaFlowCtrl@FlowTempFormSave');
    Route::post('/oa/flow/getbycreat', 'AutoCtrl\ROaFlowCtrl@FlowGetbyCreat');

    Route::post('/oa/flow/creat', 'AutoCtrl\ROaFlowCtrl@FlowCreat');
    Route::post('/oa/flow/creatpreviewmode', 'AutoCtrl\ROaFlowCtrl@FlowCreatPreviewMode');
    Route::post('/oa/flow/list/waiting', 'AutoCtrl\ROaFlowCtrl@FlowListWaiting');

    Route::post('/oa/flow/needcreat', 'AutoCtrl\ROaFlowCtrl@FlowNeedCreat');

    Route::post('/oa/flow/alertdone', 'AutoCtrl\ROaFlowCtrl@FlowAlertDone');

    Route::post('/oa/flow/list/finish', 'AutoCtrl\ROaFlowCtrl@FlowListFinish');
    Route::post('/oa/flow/list/icreat', 'AutoCtrl\ROaFlowCtrl@FlowListICreat');
    Route::post('/oa/flow/list/cc', 'AutoCtrl\ROaFlowCtrl@FlowListCc');
    Route::post('/oa/flow/list/message', 'AutoCtrl\ROaFlowCtrl@FlowListMessage');

    Route::post('/oa/flow/message/hasread', 'AutoCtrl\ROaFlowCtrl@FlowMessageHasRead');


    Route::post('/oa/flow/list/number', 'AutoCtrl\ROaFlowCtrl@FlowListNumber');
    Route::post('/oa/flow/setread', 'AutoCtrl\ROaFlowCtrl@FlowSetRead');
    Route::post('/oa/flow/setallread', 'AutoCtrl\ROaFlowCtrl@FlowSetAllRead');

    Route::post('/oa/flow/allinfo/bymsgid', 'AutoCtrl\ROaFlowCtrl@FlowDealByMsgid');

    Route::post('/oa/flow/deal/bymsgid', 'AutoCtrl\ROaFlowCtrl@FlowDealByMsgid');
    Route::post('/oa/flow/deal', 'AutoCtrl\ROaFlowCtrl@FlowDeal');
    Route::post('/oa/flow/dealpreviewmode', 'AutoCtrl\ROaFlowCtrl@FlowDealPreviewMode');
    Route::post('/oa/flow/detail', 'AutoCtrl\ROaFlowCtrl@FlowDetail');
    Route::post('/oa/flow/detail_logs_msgs', 'AutoCtrl\ROaFlowCtrl@FlowDetailLogsMsgs');

    Route::post('/oa/flow/resendmessage', 'AutoCtrl\ROaFlowCtrl@FlowReSendMessage');

    Route::post('/oa/flow/uploadfile', 'AutoCtrl\ROaFlowCtrl@FlowFileUpload');
    Route::post('/oa/flow/deletefile', 'AutoCtrl\ROaFlowCtrl@FlowFileDelete');
    Route::post('/oa/flow/list/cancancel', 'AutoCtrl\ROaFlowCtrl@FlowListCanCancel');
    Route::post('/oa/flow/cancel', 'AutoCtrl\ROaFlowCtrl@FlowCancel');
    Route::post('/oa/flow/allcancel', 'AutoCtrl\ROaFlowCtrl@FlowAllCancel');

    Route::post('/oa/flow/revokelist', 'AutoCtrl\ROaFlowCtrl@FlowRevokeList');
    Route::post('/oa/flow/revoketo', 'AutoCtrl\ROaFlowCtrl@FlowRevokeTo');

    Route::post('/oa/flow/ifstrtest', 'AutoCtrl\ROaFlowCtrl@ifstrtest');


    Route::any('/oa/flow/timeout/log', 'AutoCtrl\DFlowTimeoutLog@list');
    Route::post('/oa/flow/timeout/log/export', 'AutoCtrl\DFlowTimeoutLog@export');


    Route::any('/oa/flow/timeout/summary', 'AutoCtrl\DFlowTimeoutSummary@list');
    Route::post('/oa/flow/timeout/summary/export', 'AutoCtrl\DFlowTimeoutSummary@export');







});




Route::group(['middleware' => ['Api.Employee']], function () {

    Route::any('/goto_oatest','AutoCtrl\ROaFlowCtrl@gotoOaTest')->name('user.cantest');




    Route::any('/employee/contact/getdataformdingtalk', 'AutoCtrl\RDingTalkCtrl@employeeGetDataFormDingtalk')
        ->name('dd.import');

    Route::any('/employee/contact/getdataformwechatwork', 'AutoCtrl\RWechatWorkCtrl@employeeGetDataFormWechatWork')
        ->name('wechatwork.import');

    Route::post('/employee/contact/syncdataformdingtalkbyuserid', 'AutoCtrl\RDingTalkCtrl@SyncFromDingtalkByUserid')->name('dd.import');

    Route::post('/employee/contact/userdeptrolestoredatarest', 'AutoCtrl\ROaFlowCtrl@UserDeptRoleStoreDataRest')
        ->name('dept.restdata');


    Route::post('/dept/contact/getlists', 'AutoCtrl\RBaseCtrl@GetdeptList')->name('dept.list');

    Route::post('/dept/contact/gettree', 'AutoCtrl\RBaseCtrl@GetdeptTree');



    Route::any('/employee/contact/getusersbydept.js', 'AutoCtrl\RBaseCtrl@GetUsersByDept');
    Route::any('/employee/contact/getusersbyrole.js', 'AutoCtrl\RBaseCtrl@GetUsersByRole');
    Route::any('/employee/contact/getroletree.js', 'AutoCtrl\RBaseCtrl@GetRoleTree');

    Route::any('/employee/contact/getusersbydept', 'AutoCtrl\RBaseCtrl@GetUsersByDept');
    Route::any('/employee/contact/getusersbyrole', 'AutoCtrl\RBaseCtrl@GetUsersByRole');
    Route::any('/employee/contact/getroletree', 'AutoCtrl\RBaseCtrl@GetRoleTree');

    Route::post('/oa/flowdesigns/canlist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsCanList');

    Route::post('/oa/flowdesigns/cancreattreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsTreeListCanCreat');

    Route::post('/oa/flowdesigns/canadmintreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsTreeListCanAdmin');

    Route::post('/oa/flow/checkmsgstatus', 'AutoCtrl\ROaFlowCtrl@FlowMessageCheckStatus');

    Route::post('/oa/flow/checkmsgstatus/export', 'AutoCtrl\ROaFlowCtrl@FlowMessageCheckStatusExport');



    Route::post('/oa/flowdesigns/alltreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsAllTreeList');


    Route::any('/oa/flowdesigns/setCategory', 'AutoCtrl\ROaFlowCtrl@FlowDesignsSetCategory')->name('flowdesign.setcat');


    Route::post('/oa/flowdesigns/list', 'AutoCtrl\ROaFlowCtrl@FlowDesignsList')->name('flowdesign.list');
    Route::post('/oa/flow/alllist', 'AutoCtrl\ROaFlowCtrl@FlowAllList');
    Route::any('/oa/flowdesigns/add', 'AutoCtrl\ROaFlowCtrl@FlowDesignsAdd')->name('flowdesign.add');
    Route::any('/oa/flowdesigns/edit', 'AutoCtrl\ROaFlowCtrl@FlowDesignsEdit')->name('flowdesign.edit');

    Route::post('/oa/flowdesigns/edit_senior', 'AutoCtrl\ROaFlowCtrl@FlowDesignSeniorEdit')->name('flowdesign.editsenior');

    Route::post('/oa/flowdesigns/copy_senior', 'AutoCtrl\ROaFlowCtrl@FlowDesignSeniorCopy')->name('flowdesign.editsenior');
    //flowdesign.copysenior


    Route::post('/oa/flowdesigns/get', 'AutoCtrl\ROaFlowCtrl@FlowDesignsGet');

    Route::post('/oa/flowdesigns/delete', 'AutoCtrl\ROaFlowCtrl@FlowDesignsDelete')->name('flowdesign.delete');


    Route::post('/oa/flowdesigns/testconcactset', 'AutoCtrl\ROaFlowCtrl@FlowDesignsTestContact');



    Route::post('/oa/flowdesigns/cansonlist', 'AutoCtrl\ROaFlowCtrl@FlowCanSonList');

    Route::post('/oa/flowdesigns/uploadimage', 'AutoCtrl\ROaFlowCtrl@FlowImageUpload');





    Route::post('/oa/flow/admin/getconf','AutoCtrl\ROaFlowCtrl@FlowAdminGetConf');
    Route::post('/oa/flow/admin/searchform','AutoCtrl\ROaFlowCtrl@FlowAdminSearchForm');

    Route::any('/oa/flow/admin/searchformExport','AutoCtrl\ROaFlowCtrl@FlowAdminSearchFormExport');




    Route::post('/oa/flow/uploadfile', 'AutoCtrl\ROaFlowCtrl@FlowFileUpload');
    Route::post('/oa/flow/deletefile', 'AutoCtrl\ROaFlowCtrl@FlowFileDelete');

//    Route::post('/dbctrl2/getdbset', 'AutoCtrl\RBaseCtrl@GetDbctrl2DbSet');
//    Route::post('/dbctrl2/searchdata', 'AutoCtrl\RBaseCtrl@Dbctrl2SearchData');

});
