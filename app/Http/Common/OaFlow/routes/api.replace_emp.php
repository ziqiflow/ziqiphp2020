<?php


Route::group(['middleware' => ['Api.Employee','Api.Replace.Employee']], function () {

    Route::any('/replace_emp/employee/getinfo', 'AutoCtrl\RBaseCtrl@employeeinfo');






    Route::post('/replace_emp/flow/tempform/save', 'AutoCtrl\ROaFlowCtrl@FlowTempFormSave');

    Route::post('/replace_emp/flow/getbycreat', 'AutoCtrl\ROaFlowCtrl@FlowGetbyCreat');
    Route::post('/replace_emp/flow/creat', 'AutoCtrl\ROaFlowCtrl@FlowCreat');
    Route::post('/replace_emp/flow/creatpreviewmode', 'AutoCtrl\ROaFlowCtrl@FlowCreatPreviewMode');
    Route::post('/replace_emp/flow/list/waiting', 'AutoCtrl\ROaFlowCtrl@FlowListWaiting');

    Route::post('/replace_emp/flow/needcreat', 'AutoCtrl\ROaFlowCtrl@FlowNeedCreat');
    Route::post('/replace_emp/flow/alertdone', 'AutoCtrl\ROaFlowCtrl@FlowAlertDone');



    Route::post('/replace_emp/flow/list/finish', 'AutoCtrl\ROaFlowCtrl@FlowListFinish');
    Route::post('/replace_emp/flow/list/icreat', 'AutoCtrl\ROaFlowCtrl@FlowListICreat');
    Route::post('/replace_emp/flow/list/cc', 'AutoCtrl\ROaFlowCtrl@FlowListCc');
    Route::post('/replace_emp/flow/list/message', 'AutoCtrl\ROaFlowCtrl@FlowListMessage');



    Route::post('/replace_emp/flow/message/hasread', 'AutoCtrl\ROaFlowCtrl@FlowMessageHasRead');
    Route::post('/replace_emp/flowdesigns/alltreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsAllTreeList');
    Route::post('/replace_emp/flowdesigns/cancreattreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsTreeListCanCreat');

    Route::post('/replace_emp/flowdesigns/canadmintreelist', 'AutoCtrl\ROaFlowCtrl@FlowDesignsTreeListCanAdmin');


    Route::post('/replace_emp/flow/checkmsgstatus', 'AutoCtrl\ROaFlowCtrl@FlowMessageCheckStatus');
    Route::post('/replace_emp/flow/checkmsgstatus/export', 'AutoCtrl\ROaFlowCtrl@FlowMessageCheckStatusExport');






    Route::post('/replace_emp/flow/list/number', 'AutoCtrl\ROaFlowCtrl@FlowListNumber');
    Route::post('/replace_emp/flow/setread', 'AutoCtrl\ROaFlowCtrl@FlowSetRead');
    Route::post('/replace_emp/flow/setallread', 'AutoCtrl\ROaFlowCtrl@FlowSetAllRead');


    Route::post('/replace_emp/flow/allinfo/bymsgid', 'AutoCtrl\ROaFlowCtrl@FlowDealByMsgid');

    Route::post('/replace_emp/flow/deal/bymsgid', 'AutoCtrl\ROaFlowCtrl@FlowDealByMsgid');


    Route::post('/replace_emp/flow/deal', 'AutoCtrl\ROaFlowCtrl@FlowDeal');
    Route::post('/replace_emp/flow/dealpreviewmode', 'AutoCtrl\ROaFlowCtrl@FlowDealPreviewMode');
    Route::post('/replace_emp/flow/detail', 'AutoCtrl\ROaFlowCtrl@FlowDetail');
    Route::post('/replace_emp/flow/detail_logs_msgs', 'AutoCtrl\ROaFlowCtrl@FlowDetailLogsMsgs');

    Route::post('/replace_emp/flow/resendmessage', 'AutoCtrl\ROaFlowCtrl@FlowReSendMessage');





    Route::post('/replace_emp/flow/uploadfile', 'AutoCtrl\ROaFlowCtrl@FlowFileUpload');
    Route::post('/replace_emp/flow/deletefile', 'AutoCtrl\ROaFlowCtrl@FlowFileDelete');
    Route::post('/replace_emp/flow/list/cancancel', 'AutoCtrl\ROaFlowCtrl@FlowListCanCancel');
    Route::post('/replace_emp/flow/cancel', 'AutoCtrl\ROaFlowCtrl@FlowCancel');
    Route::post('/replace_emp/flow/allcancel', 'AutoCtrl\ROaFlowCtrl@FlowAllCancel');

    Route::post('/replace_emp/flow/revokelist', 'AutoCtrl\ROaFlowCtrl@FlowRevokeList');
    Route::post('/replace_emp/flow/revoketo', 'AutoCtrl\ROaFlowCtrl@FlowRevokeTo');

    Route::post('/replace_emp/flow/ifstrtest', 'AutoCtrl\ROaFlowCtrl@ifstrtest');

    Route::post('/replace_emp/flow/admin/getconf','AutoCtrl\ROaFlowCtrl@FlowAdminGetConf');
    Route::post('/replace_emp/flow/admin/searchform','AutoCtrl\ROaFlowCtrl@FlowAdminSearchForm');

    Route::any('/replace_emp/flow/timeout/log', 'AutoCtrl\DFlowTimeout@list')->name('flow.timeout.log');

    Route::post('/replace_emp/flow/timeout/export', 'AutoCtrl\DFlowTimeout@export')->name('flow.timeout.summary');



});
