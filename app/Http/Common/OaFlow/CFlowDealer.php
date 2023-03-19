<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CDept;
use App\Http\Common\JsonMessage;
use App\Http\Common\Media\CFiles;
use App\Http\Common\utils\MongoDateTrans;
use \App\Http\Common\Base\Config as ConfigBase;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;
use Psy\Util\Json;

class CFlowDealer
{






    static function dealMsg($flowmsgid, $flowdata, $inputdata, $btnindex)
    {



        $msgObj = CFlowMessageTo::get_waiting($flowmsgid);



        if(!$flowdata['ignoreFormMd5']&&md5(json_encode($msgObj['flowlistOi']['formdata']))!=$flowdata['formmd5']){
            return JsonMessage::Creat(false, '表单内容发生了变化（可能其他人修改了），建议刷新后重新提交','formmd5error');

        }


        if ($msgObj == null) {
            return JsonMessage::Creat(false, '当前环节不允许审核操作或者流程不存在');
        }

        $flowlistid= $msgObj['flowlistOi']['_id'];

        $designs = $msgObj['flowdesigner'];

        if (empty($designs)) {
            return JsonMessage::Creat(false, '不存在对应的流程');
        }


        $nowfun = null;
        $prefun = null;


        foreach ($designs['funlist'] as $fun) {
            if ($msgObj['NowFunid'] == $fun['id']) {
                $nowfun = $fun;
            }
            if ($msgObj['PreFunid'] == $fun['id']) {
                $prefun = $fun;
            }
        }





//        $submitformdata = CFlowDealerUtil::tranModalToMongo($inputdata, $designs['datalist'], $nowfun['requiredata']);
//

//        //return $submitformdata;
//

//        $formdata = array_merge(CFlowDealerUtil::tranModalToMongo($msgObj['flowlistOi']['formdata'], $designs['datalist']),
//            $submitformdata
//        );

        //return $designs['datalist'];
        $submitformdata = CFlowDealerUtil::tranModalToMongo2($inputdata, $designs['datalist'], $nowfun['formEditLimit']);
        //return $submitformdata;


        //return $submitformdata;


        $formdata = array_merge(CFlowDealerUtil::tranModalToMongo2($msgObj['flowlistOi']['formdata'], $designs['datalist']),
            $submitformdata
        );


        if ($nowfun['dealtype'] == CFlowMessageTo::$dealtype_andsign) {
            $btnindex = 0;
        }


        list($nowfun, $nextfuns, $nextSonFlows) = CFlowDealerUtil::getnowfun_nextfun(
            $designs,
            $msgObj['NowFunid'],
            $btnindex,
            $formdata);




        //return $nowfun;
//      return $nextfuns;
        //$flowdata


        //return $suggests;

        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['_id', '=', new ObjectId($flowlistid)]
                    ]
            ]
        ];
        //Log::info('$flowlistid');
        //Log::info($flowlistid);
        //Log::info('$flowmsgid');
        //Log::info($flowmsgid);




        if (!CFlowPreview::$isPreviewMode) {

            $suggests = isset($msgObj['flowlistOi']['suggests']) ? $msgObj['flowlistOi']['suggests'] : [];

            if(!empty($flowdata['suggest'])&&!empty(trim($flowdata['suggest']))){
                array_push($suggests,
                    [
                        'funid' => $msgObj['NowFunid'],
                        'text' => $flowdata['suggest'],
                        'msgid' => $flowmsgid,
                        'uid' => Config::getUser()->id,
                        'user' => Config::getUser()->name,
                        'created_at'=>date('Y-m-d H:i:s',time())
                        //,
                        //'uname'=>SEmployee::$name
                    ]+Config::return_user_info('uid','user')
                );
            }



            $filelistlog = isset($msgObj['flowlistOi']['filelistlog']) ? $msgObj['flowlistOi']['filelistlog'] : [];


            if (isset($flowdata['fileList']) && count($flowdata['fileList'])) {

                array_push($filelistlog, [
                    'funname' => $nowfun['name'],
                    'funid' => $nowfun['id'],
                    'created_id' => Config::getUser()->id,
                    'creater' => Config::getUser()->name,
                    'created_at' => date('Y-m-d H:i:s', time()),
                    'files' => $flowdata['fileList']
                ]+Config::return_user_info('created_id','creater')
                );


            }


            if (!Config::getmonconn()->sample_update(Config::$mongo_flowlists,
                $where,
                [
                    'formdata' => $formdata,
                    'updated_at' => MongoDateTrans::intToUTC(time()),
                    'updated_id' => Config::getUser()->id,
                    'suggests' => $suggests,
                    'filelistlog' => $filelistlog
                ]+Config::return_user_info('updated_id','updated_at')
            )) {
                return JsonMessage::Creat(false, '修改数据失败，请重新试试');
            }
        }

        //

        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['_id', '=', new ObjectId($flowmsgid)]
                    ]
            ]
        ];

        if (isset($nowfun['btnGroup'][$btnindex])) {
            $buttonname = $nowfun['btnGroup'][$btnindex]['name'];
        } else {
            $buttonname = null;
        }

        if (!CFlowPreview::$isPreviewMode) {
            if (!
            Config::getmonconn()->sample_update(Config::$mongo_flowsmessagetos,
                $where,
                [
                    'status' => CFlowMessageTo::$status_finish,
                    'finished_id' => Config::getUser()->id,
                    'finished_at' => MongoDateTrans::intToUTC(time()),
                    'todeptstr'=>CDept::getName($flowdata['dept']),
                    'todept'=>$flowdata['dept'],
                    'log' => ['suggest' => $flowdata['suggest'], 'button' => $buttonname]

                ]+Config::return_user_info('finished_id')
            )) {
                return JsonMessage::Creat(false, '修改数据失败，请重新试试');
            }
            CFormTempSave::deleteByDeal($flowmsgid);
        }


        $FlowLog = new CFlowLog();
        $FlowLog->FlowId = $designs['_id'];
        $FlowLog->FlowListid = $flowlistid;
        $FlowLog->FlowMsgid = $flowmsgid;
        $FlowLog->type = CFlowLog::$source_type_sure;

        //Log::info('$submitformdata');
        //Log::info($submitformdata);
        $FlowLog->FormData = CFlowDealerUtil::tranMongoToModel($submitformdata, $designs['datalist']);

        //return $FlowLog->FormData;

        $FlowLog->suggest = $flowdata['suggest'];
        $FlowLog->buttonname = $buttonname;

        $FlowLog->PreFunName = $prefun['name'];
        $FlowLog->NowFunName = $nowfun['name'];

        $FlowLog->PreFunId = $prefun['id'];
        $FlowLog->NowFunId = $nowfun['id'];

        $FlowLog->deptid=$flowdata['dept'];

        //$FlowLog->nextmsg,
        //$FlowLog->nextcc




        if ($nowfun['dealtype'] == CFlowMessageTo::$dealtype_andsign) {


            $where = [
                ['a' => 'where',
                    'arr' =>
                        [
                            ['flowlistid', '=', new ObjectId($flowlistid)],
                            ['PreFunid', '=', $prefun['id']],
                            ['NowFunid', '=', $nowfun['id']],
                            ['dealtype', '=', CFlowMessageTo::$dealtype_andsign],
                            ['status', '=', CFlowMessageTo::$status_waiting]
                        ]
                ]
            ];


            $tos = Config::getmonconn()->sample_get(Config::$mongo_flowsmessagetos, ['to'], $where);

            $FlowLog->type = CFlowLog::$source_type_sure_and;
            $tolength = count($tos);
            if (CFlowPreview::$isPreviewMode) {
                $tolength--;
            }

            if ($tolength == 0) {

            } else {

                $tolist = [];
                foreach ($tos as $to) {
                    array_push($tolist, $to['to']);
                }
                $where = [
                    ['a' => 'whereIn',
                        'arr' =>
                            [
                                ['_uuid', $tolist]
                            ]
                    ]
                ];
                $tos = ConfigBase::getconn()->sample_get(ConfigBase::$db_erp_employees, ['_uuid', 'name'], $where);

                $FlowLog->msg = '还需' . count($tos) . '人同意';

                $FlowLog->logInfo();

                if(!CFlowPreview::$isPreviewMode){
                    CFlowList::FlowUnFinishNumber($flowlistid);
                }

                if (CFlowPreview::$isPreviewMode) return JsonMessage::Creat(true, '当您审核通过后，还需要' . $tolength . '人同意', $tos);

                return JsonMessage::Creat(true, '审核通过，还需要' . count($tos) . '人同意', $tos);

            }
        }


        if ($nowfun['dealtype'] == CFlowMessageTo::$dealtype_orsign) {

            $FlowLog->type = CFlowLog::$source_type_sure_or;
            if (!CFlowPreview::$isPreviewMode) {
                $where = [
                    ['a' => 'where',
                        'arr' =>
                            [
                                ['flowlistid', '=', new ObjectId($flowlistid)],
                                ['PreFunid', '=', $prefun['id']],
                                ['NowFunid', '=', $nowfun['id']],
                                ['dealtype', '=', CFlowMessageTo::$dealtype_orsign],
                                ['status', '=', CFlowMessageTo::$status_waiting]
                            ]
                    ]
                ];


                $update_num = Config::getmonconn()->sample_update(Config::$mongo_flowsmessagetos,
                    $where,
                    [
                        'status' => CFlowMessageTo::$status_finish_or,
                        'finished_id' => Config::getUser()->id,
                        'finished_at' => MongoDateTrans::intToUTC(time())
                    ]+Config::return_user_info('finished_id')
                );

                if ($update_num != 0) {
                    $FlowLog->addmsg("其中 $update_num 条或签审批自动标记完成");
                }
            }
        }



        if (count($nextfuns) == 0) {


            $FlowLog->addmsg('流程结束');
            $FlowLog->logInfo();

            if(!CFlowPreview::$isPreviewMode){
                CFlowList::FlowUnFinishNumber($flowlistid);
            }

            return JsonMessage::Creat(true, '流程结束');
        }
//        Log::info('msgobj');
//        Log::info($msgObj);



        $lastmsgcreated_deptid = null;

        $lastmsgcreated_id = Config::getUser()->id;
        CFlowList::$CBSFirstcreated_deptid=$msgObj['flowlistOi']['dept_id'];
        CFlowList::$CBSLastmsgcreated_deptid= $lastmsgcreated_deptid= $flowdata['dept'];


        //CFlowGetContact::initdata();





        $ContactExplan= new CFlowGetContact(
            ['firstcreated_deptid' => $msgObj['flowlistOi']['dept_id'],
            'firstcreated_userid' => $msgObj['flowlistOi']['created_id'],
            'lastmsgcreated_deptid' => $lastmsgcreated_deptid,
            'lastmsgcreated_id' => $lastmsgcreated_id,
            'formdata'=>CFlowDealerUtil::tranMongoToKey($formdata,$designs['datalist'])
            ],
            null,
            $designs['set']);


        list($messages, $messagescc) = CFlowMessageTo::CreatMessage(
            $designs,
            $ContactExplan,
            $msgObj['flowlistOi'],
            //$msgObj['NowFunid'],
            $nowfun,
            $nextfuns,
//            $flowmsgid,
            $msgObj,
            $flowdata['dept']
        );

        $nextSonFlowsHistory = CFlowDealerUtil::creatSonFlow($nextSonFlows, $designs['name']);
        $FlowLog->sonFlows = $nextSonFlowsHistory;


        $FlowLog->nextcc = $messagescc;
        $FlowLog->nextmsg = $messages;

        if (count($messages) == 0) {

            if(!CFlowPreview::$isPreviewMode){
                CFlowList::FlowUnFinishNumber($flowlistid);
            }

            $FlowLog->addmsg('由于流程设计有问题，无下发环节（联系人）')->logInfo();

            return JsonMessage::Creat(
                true,
                '由于流程设计有问题，无下发环节（联系人）；请联系管理员编辑流程设置',
                [
                    'flowname' => $designs['name'],
                    'flowlistid' => $flowlistid,
                    'nextmessage' => $messages,
                    'cc' => $messagescc,
                    'nextSonFlows' => $nextSonFlows,
                    'sonflows' => $nextSonFlowsHistory
                ]
            );
        } else {

            if(!CFlowPreview::$isPreviewMode){
                CFlowList::FlowUnFinishNumber($flowlistid);
            }


            $FlowLog->logInfo();

            return JsonMessage::Creat(true, CFlowPreview::$isPreviewMode ? '下一流程可创建' : '转发下一流程成功',
                [
                    'flowname' => $designs['name'],
                    'flowlistid' => $flowlistid,
                    'nextmessage' => $messages,
                    'cc' => $messagescc,
                    'nextSonFlows' => $nextSonFlows,
                    'sonflows' => $nextSonFlowsHistory
                ]
            );
        }


    }

    static public function fileUpload($flowlistid = null, $flowdesign_id = null)
    {
       //Log::info($flowlistid);
       // Log::info($flowdesign_id);



        $fileback = CFiles::creats('filename', 'flow/', 'flow', [
            'ext_data1' => $flowlistid,
            'ext_data2' => $flowdesign_id,
        ]);
        //Log::info($fileback);
        //return $fileback;

        $httphost = Config::getSchemeAndHttpHost();//request()->getSchemeAndHttpHost();
        for ($k=count($fileback)-1;$k>=0;$k--){
            if(empty($fileback[$k])){
                array_splice($fileback,$k,1);
                continue;
            }
            unset($fileback[$k]['url']);//$httphost . '/' . $fileback[$k]['url'];
        }
//        foreach ($fileback as $key => $item) {
//            if(empty($item)){

//            }
//            $fileback[$key]['url'] = $httphost . '/' . $fileback[$key]['url'];
//        }

        if (count($fileback) == 0) {
            return JsonMessage::Creat(false, '文件上传失败', $fileback);
        }


        return JsonMessage::Creat(true, '文件上传成功', $fileback);
        //fileid


    }


    static public function deleteFile($fileid)
    {


        $where = [
            ['a' => 'where',
                'arr' =>
                    [
                        ['source', '=', 'flow'],
                        ['created_id', '=', Config::getUser()->id]
                    ]
            ]
        ];

        if (CFiles::delete($fileid, $where)) {
            return JsonMessage::Creat(true, '删除成功', $fileid);
        } else {
            return JsonMessage::Creat(false, '刷新后重新试试');
        }

    }


}