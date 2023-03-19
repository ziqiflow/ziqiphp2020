<?php


Route::group(['middleware' => ['Api.Test.Employee']], function () {

    Route::post('/employeetest/getinfo', 'AutoCtrl\RBaseCtrl@employeeinfo');


    Route::post('/oatest/employee/testlogin', 'AutoCtrl\ROaFlowCtrl@TestLoginUser')
        ->name('user.testlogin')
        ;

    Route::post('/oatest/flow/tempform/save', 'AutoCtrl\ROaFlowCtrl@FlowTempFormSave');

    Route::post('/oatest/flow/getbycreat', 'AutoCtrl\ROaFlowCtrl@FlowGetbyCreat');
    Route::post('/oatest/flow/creat', 'AutoCtrl\ROaFlowCtrl@FlowCreat');
    Route::post('/oatest/flow/creatpreviewmode', 'AutoCtrl\ROaFlowCtrl@FlowCreatPreviewMode');
    Route::post('/oatest/flow/list/waiting', 'AutoCtrl\ROaFlowCtrl@FlowListWaiting');

    Route::post('/oatest/flow/needcreat', 'AutoCtrl\ROaFlowCtrl@FlowNeedCreat');
    Route::post('/oatest/flow/alertdone', 'AutoCtrl\ROaFlowCtrl@FlowAlertDone');



    Route::post('/oatest/flow/list/finish', 'AutoCtrl\ROaFlowCtrl@FlowListFinish');
    Route::post('/oatest/flow/list/icreat', 'AutoCtrl\ROaFlowCtrl@FlowListICreat');
    Route::post('/oatest/flow/list/cc', 'AutoCtrl\ROaFlowCtrl@FlowListCc');
    Route::post('/oatest/flow/list/message', 'AutoCtrl\ROaFlowCtrl@FlowListMessage');



    Route::post('/oatest/flow/message/hasread', 'AutoCtrl\ROaFlowCtrl@FlowMessageHasRead');
    Route::post('/oatest/flowdesigns/alltreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsAllTreeList');
    Route::post('/oatest/flowdesigns/cancreattreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsAllTreeList');

    Route::post('/oatest/flowdesigns/canadmintreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsAllTreeList');


    Route::post('/oatest/flow/checkmsgstatus', 'AutoCtrl\ROaFlowCtrl@FlowMessageCheckStatus');
    Route::post('/oatest/flow/checkmsgstatus/export', 'AutoCtrl\ROaFlowCtrl@FlowMessageCheckStatusExport');






    Route::post('/oatest/flow/list/number', 'AutoCtrl\ROaFlowCtrl@FlowListNumber');
    Route::post('/oatest/flow/setread', 'AutoCtrl\ROaFlowCtrl@FlowSetRead');
    Route::post('/oatest/flow/setallread', 'AutoCtrl\ROaFlowCtrl@FlowSetAllRead');


    Route::post('/oatest/flow/allinfo/bymsgid', 'AutoCtrl\ROaFlowCtrl@FlowDealByMsgid');

    Route::post('/oatest/flow/deal/bymsgid', 'AutoCtrl\ROaFlowCtrl@FlowDealByMsgid');


    Route::post('/oatest/flow/deal', 'AutoCtrl\ROaFlowCtrl@FlowDeal');
    Route::post('/oatest/flow/dealpreviewmode', 'AutoCtrl\ROaFlowCtrl@FlowDealPreviewMode');
    Route::post('/oatest/flow/detail', 'AutoCtrl\ROaFlowCtrl@FlowDetail');
    Route::post('/oatest/flow/detail_logs_msgs', 'AutoCtrl\ROaFlowCtrl@FlowDetailLogsMsgs');

    Route::post('/oatest/flow/resendmessage', 'AutoCtrl\ROaFlowCtrl@FlowReSendMessage');





    Route::post('/oatest/flow/uploadfile', 'AutoCtrl\ROaFlowCtrl@FlowFileUpload');
    Route::post('/oatest/flow/deletefile', 'AutoCtrl\ROaFlowCtrl@FlowFileDelete');
    Route::post('/oatest/flow/list/cancancel', 'AutoCtrl\ROaFlowCtrl@FlowListCanCancel');
    Route::post('/oatest/flow/cancel', 'AutoCtrl\ROaFlowCtrl@FlowCancel');
    Route::post('/oatest/flow/allcancel', 'AutoCtrl\ROaFlowCtrl@FlowAllCancel');

    Route::post('/oatest/flow/revokelist', 'AutoCtrl\ROaFlowCtrl@FlowRevokeList');
    Route::post('/oatest/flow/revoketo', 'AutoCtrl\ROaFlowCtrl@FlowRevokeTo');

    Route::post('/oatest/flow/ifstrtest', 'AutoCtrl\ROaFlowCtrl@ifstrtest');

    Route::post('/oatest/flow/admin/getconf','AutoCtrl\ROaFlowCtrl@FlowAdminGetConf');
    Route::post('/oatest/flow/admin/searchform','AutoCtrl\ROaFlowCtrl@FlowAdminSearchForm');

    Route::any('/oatest/flow/timeout/log', 'AutoCtrl\DFlowTimeout@list')->name('flow.timeout.log');

    Route::post('/oatest/flow/timeout/export', 'AutoCtrl\DFlowTimeout@export')->name('flow.timeout.summary');



});
