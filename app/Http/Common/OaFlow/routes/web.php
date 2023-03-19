<?php

//Route::any('/flow/timeout/list','AutoCtrl\DFlowTimeoutLog@list');
//Route::any('/flow/timeout/summary','AutoCtrl\DFlowTimeoutSummary@list');

Route::any('/file/oa/{fileid}/{filename?}','AutoCtrl\ROaFlowCtrl@oafiles');



Route::any('/autoexe/oaflow/sendmessage','AutoCtrl\ROaFlowCtrl@AutoSendMessage');

Route::any('/autoexe/oaflow/checkexpired','AutoCtrl\ROaFlowCtrl@AutoCheckExpired');

Route::any('/autoexe/oaflow/timeout_set_finish_from_table','AutoCtrl\DFlowTimeoutLog@autoSetFinishFromTimeoutTable');

Route::any('/autoexe/oaflow/timeout_set_finish_from_last_message','AutoCtrl\DFlowTimeoutLog@autoSetFinishFromLastFinishMessage');




Route::any('/skip/{funname}',function ($funname) {
    //$camel = camel_case('foo_bar');
    //fooBar
    $funname=camel_case($funname);
    return App\Http\Controllers\Platform\Skip::$funname();
});
