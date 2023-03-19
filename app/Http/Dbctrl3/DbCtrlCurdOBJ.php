<?php


namespace App\Http\Dbctrl3;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class DbCtrlCurdOBJ extends Controller
{

    protected $id;

    public $isMongoDb=false;
    public $primaryKey;
    public $connection = 'mysql';
    public $dbdriver='mysql';
    public $perPage = 32;
    public $HardDelete = false;
    public $SoftDeleteKey = 'deleted_at';
    public $HasDeleteKey = true;

    public $tablename;
    public $tablename_zh;


    public $edit_list;
    public $editFormSet;

    public $add_list;
    public $addFormSet;

    public $search_list;
    public $searchFormSet;

    public $show_list;
    public $showFormSet;

    public $orderby_list;

    public $display_list;
    public $display_set;

    public $table_default;
    public $search_default;


    public $SearchSubmitUrl = '';

    public $ForbidEditkey = [];

    public $AddDataBeforeEdit = [];
    public $AddDataBeforeAdd = [];
    public $OtherViewData = [];
    public $AddValidRule = [];





    public static $IsProductEnv = false;
    public static $ClassDisplayFilter = 'App\Http\Dbctrl3\DisplayFilter';


    public static $BladeWrong = 'common.Admin.dbctrl2.wrong';
    public static $BladeWarn = 'common.Admin.dbctrl2.warn';
    public static $BladeSuccess = 'common.Admin.dbctrl2.success';
    public static $BladeSearchform = 'common.Admin.dbctrl3.searchform';
    public static $BladeDelete = 'common.Admin.dbctrl2.delete';
    public static $BladeDisplayList = 'common.Admin.dbctrl2.displaylist';
    public static $BladeSortdb = 'erp.default.sortable';
    public static $BladeCommon = 'common.Admin.dbctrl.common';
    public static $BladeEditdb = 'common.Admin.dbctrl3.editform';
    public static $BladeEditSuccess = 'common.Admin.dbctrl2.success';
    public static $BladeNewSuccess = 'common.Admin.dbctrl2.success';

    public $BladeWrongL =null;
    public $BladeWarnL =null;
    public $BladeSuccessL =null;
    public $BladeSearchformL =null;
    public $BladeDeleteL =null;
    public $BladeDisplayListL =null;
    public $BladeSortdbL =null;
    public $BladeCommonL =null;

    public $BladeEditdbL = null;
    public $BladeEditSuccessL = null;
    public $BladeNewSuccessL = null;

    private function getBladeEditdb()
    {
        return $this->BladeEditdbL??static::$BladeEditdb;
    }

    private function getBladeEditSuccess()
    {
        return $this->BladeEditSuccessL??static::$BladeEditSuccess;
    }

    private function getBladeNewSuccess()
    {
        return $this->BladeNewSuccessL??static::$BladeNewSuccess;
    }

    private function getBladeWrong()
    {
        return $this->BladeWrongL??static::$BladeWrong;
    }

    private function getBladeWarn()
    {
        return $this->BladeWarnL??static::$BladeWarn;
    }

    private function getBladeSuccess()
    {
        return $this->BladeSuccessL??static::$BladeSuccess;
    }

    private function getBladeSearchform()
    {
        return $this->BladeSearchformL??static::$BladeSearchform;
    }

    private function getBladeDelete()
    {
        return $this->BladeDeleteL??static::$BladeDelete;
    }

    private function getBladeDisplayList()
    {
        return $this->BladeDisplayListL??static::$BladeDisplayList;
    }

    private function getBladeSortdb()
    {
        return $this->BladeSortdbL??static::$BladeSortdb;
    }

    private function getBladeCommon()
    {
        return $this->BladeCommonL??static::$BladeCommon;
    }






    public static $EditDBValidSession = false;
    public static $NewDBValidSession = false;

    public $SortData = [];
    public static $submitPrefix = 'data_';


    public $GlobalStaticSetSwitchOn=true;

    public static $BeforeGet = [];
    public static $BeforeCount = [];
    public static $BeforeUpdate = [];
    public static $BeforeDelete = [];


    public static $BeforeUpdateArr = [];
    public static $BeforeDeleteArr = [];
    public static $BeforeInsertArr = [];


    public $BeforeGetL=[];
    public $BeforeCountL=[];
    public $BeforeUpdateL=[];
    public $BeforeDeleteL=[];
    public $BeforeUpdateArrL=[];
    public $BeforeInsertArrL=[];//
    public $BeforeDeleteArrL=[];








    public static $OUTJOINStrict = false;

    public static $DBHasNotDelete = [];

    public static $useJsonData = true;


    public static $OtherKeysSearch = [
        'search_list',
        'searchFormSet',
        'orderby_list',
        'display_list',
        'display_set'];//'search_default'


    public static $OtherKeysEdit = ['edit_list','editFormSet'];
    public static $OtherKeysAdd = ['add_list','addFormSet'];


    function __construct($id = null, $otherkeysJosn = ['edit_list', 'search_list', 'orderby_list', 'display_list', 'display_set'])
    {

        if ($id == null) return;


        if (static::$useJsonData) {

            $Db_ctrlArr = (json_decode(file_get_contents(__DIR__ . '/Json/' . $id), true));


        }



        //dd(\GuzzleHttp\json_decode($Db_ctrlArr['table_default'],true));

        $this->id = $Db_ctrlArr['id'];
        $this->primaryKey = $Db_ctrlArr['primaryKey'];


        if($Db_ctrlArr['dbdriver']=='mongodb'){
            $this->isMongoDb=true;
            $this->connection='mongodb';
        }


        $isnullDefault = ['dbdriver','connection', 'perPage', 'HardDelete', 'SoftDeleteKey', 'HasDeleteKey'];
        foreach ($isnullDefault as $key) {

            if (strlen($Db_ctrlArr[$key]) != 0) $this->$key = $Db_ctrlArr[$key];
        }



        $otherkeys = ['tablename', 'tablename_zh'];

        foreach ($otherkeys as $key) {
            $this->$key = $Db_ctrlArr[$key];
        }

        //$otherkeysJosn=['edit_list','search_list','orderby_list','display_list','display_set'];

        foreach ($otherkeysJosn as $key) {
            //$this->$key=json_decode($Db_ctrlArr[$key],true);
            $this->$key = $Db_ctrlArr[$key];
        }


    }


    public static $EditDBCtrl = null;


    public $ReturnIsView = true;


    public function sortdb($dbname)
    {

        if (request()->method() == "POST") {
            //sortdata
            $validator = Validator::make(request()->input(),
                ['sortdata' => 'required|JSON'],
                ['required' => ':attribute 为必填项',
                    'JSON' => ':attribute 要求是json'
                ],
                ['sortdata' => '排序数据']
            );

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $sortdata = json_decode(request()->input('sortdata'), true);

            foreach ($sortdata as $item) {
                $where = [
                    ['a' => 'where',
                        'arr' =>
                            [['id', '=', $item['id']]]
                    ]
                ];
                DbCtrl::sample_update($dbname, $where, ['index' => $item['index']]);
            }

            return view(DbCtrl::$BladeSuccess, ['telling' => '排序修改成功']);

        } else {
            return view($this->getBladeSortdb(), $this->OtherViewData)
                ->with('data', count($this->SortData) == 0 ? DataSource::getdata('db:' . $dbname . '|name|id', 'array')['list'] : $this->SortData);
        }

    }


    public function editform($listid)
    {

        if (!request()->isMethod('POST')) return $this->editform_get($listid);

        return $this->editform_post($listid);

    }





    public function editform_get($listid)
    {

        $query = DB::connection($this->connection)->table($this->tablename);


        $query = $query->where($this->primaryKey, $listid);



        $select_arr = [];
        foreach ($this->edit_list as $item) {
            //if(!(isset($item['cnedit'])&&$item['cnedit']==true)){
            array_push($select_arr, $item['model']);
            //}
        }

        $query->select($select_arr);


        $datas = $this->db_get($query);


        //dd($datas);


        if (count($datas) != 1) return $this->_return_center(JsonMessage::Creat(false,$this->tablename_zh . '未查询到主键信息'));



        $Db_ctrlArr['oldvalue'] = json_decode(json_encode($datas), true)[0];



        foreach ($this->AddDataBeforeEdit as $key => $value) {
            $tmp = old($key);
            if ($tmp !== null) {
                //var_dump($tmp);
                $Db_ctrlArr['oldvalue'][$key] = $tmp;
            } else {
                $Db_ctrlArr['oldvalue'][$key] = $value;
            }
        }


        if(empty($Db_ctrlArr['oldvalue'])){
            $Db_ctrlArr['oldvalue']=new \stdclass();
        }


        //dd($Db_ctrlArr);
        return $this->_return_center(JsonMessage::Creat(true,'',array_merge(
            [
            'id' => $listid,
            'blade' =>$this->getBladeEditdb(),
            'isNewType' => false,
            'NeedValidS' => static::$EditDBValidSession

            ]
            , $Db_ctrlArr,
            ['tablename' => $this->tablename, 'tablename_zh' => $this->tablename_zh,
                'pageset' => $this->getObjData(static::$OtherKeysEdit)]
            , $this->OtherViewData)
        ));

    }


    public static function s_validcode()
    {

        $s_validcode = str_random(6);
        request()->session()->flash('s_validcode', $s_validcode);
        return self::JsonCreat(true,'',$s_validcode);
    }


    public function editform_post($listid)
    {
        if (static::$EditDBValidSession) {
            $s_validcode = request()->input('s_validcode');
            if ($s_validcode == null || request()->session()->pull('s_validcode') != $s_validcode) {
                return $this->_return_center(JsonMessage::Creat(false,'请勿重复提交页面'));
            }
        }

        //return request()->input();


        $dataarr = array();
        $rules = array();
        $customAttributes = array();

        $formdata= request()->json('formdata');

        foreach ($this->edit_list as $item) {
            //cnedit cannotedit
            if (!(isset($item['cnedit']) && $item['cnedit'] == true)) {


                if (in_array($item['model'], $this->ForbidEditkey)) continue;



                $dataarr[$item['model']] =  isset($formdata[$item['model']])?$formdata[$item['model']]:NULL;

                if($dataarr[$item['model']]===true)$dataarr[$item['model']]=1;
                if($dataarr[$item['model']]===false)$dataarr[$item['model']]=0;

                if(strlen($dataarr[$item['model']])==0)$dataarr[$item['model']]=null;



                //request()->input(static::$submitPrefix . $item['name'], NULL);
                //if($dataarr[$item['name']]=='')$dataarr[$item['name']]=NULL;

                if (isset($item['s_valid']) && $item['s_valid'] != null) {
                    $rules = array_merge($rules, [$item['model'] => $item['s_valid']]);
                }
                $customAttributes = array_merge($customAttributes, [$item['model'] => $item['name']]);
            }
        }

        //var_dump($rules);
        //var_dump($customAttributes);
        //exit;

        //$rules=['table_name'=>'bail|required|max:30|min:4','id'=>'required|exists:db_ctrls'];
        $messages = [];


        foreach ($this->AddValidRule as $key => $item) {
            $rules = array_merge($rules, [$key => $item]);
        }
        //dd($rules);

        $validator = Validator::make($formdata, $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            if ($this->ReturnIsView) {
                return redirect()->back()->withErrors($validator)->withInput();
            } else {
                $errorarr = $validator->errors()->all();
                return JsonMessage::Creat(
                    false,
                    implode("|", $errorarr),
                    ['redirect' => redirect()->back()->withErrors($validator)->withInput()]);
            }
        }


        $query = DB::connection($this->connection);
        $query = $query->table($this->tablename)->where($this->primaryKey, $listid);



        $getback = $this->db_update($query, $dataarr);


        if ($getback) {

            return static::_return_center(
                JsonMessage::Creat(true,'数据修改成功',
                    ['id' => $listid, 'blade' => $this->getBladeEditSuccess(),
                        'getback' => $getback]));
        } else {
            return static::_return_center(
                JsonMessage::Creat(false,'数据修改失败:可能数据未做修改',
                     ['blade' => $this->getBladeWrong(),
                         'getback' => $getback]));
        }


    }


    public function newform()
    {

        if (!request()->isMethod('POST')) return $this->newform_get();
        return $this->newform_post();
    }

    public function newform_get()
    {


        $Db_ctrlArr['oldvalue'] = array();


        if(empty($Db_ctrlArr['oldvalue'])){
            $Db_ctrlArr['oldvalue']=new \stdclass();
        }




        return $this->_return_center(JsonMessage::Creat(true,'',array_merge(
                [
                    'blade' => $this->getBladeEditdb(),
                    'isNewType' => true,
                    'NeedValidS' => static::$EditDBValidSession

                ]
                , $Db_ctrlArr,
                ['tablename' => $this->tablename, 'tablename_zh' => $this->tablename_zh,
                    'pageset' => $this->getObjData(static::$OtherKeysAdd)]
                , $this->OtherViewData)
        ));

//        return view(static::$BladeEditdb, array_merge($Db_ctrlArr, $this->OtherViewData,
//            ['tablename' => $this->tablename,
//                'tablename_zh' => $this->tablename_zh,
//                'pageset' => $this->getObjData(static::$OtherKeysEdit)
//            ]))
//            ->with('isNewType', true)->with('NeedValidS', static::$NewDBValidSession);


    }

    public function newform_post()
    {

        if (static::$NewDBValidSession) {
            $s_validcode = request()->input('s_validcode');
            if ($s_validcode == null || request()->session()->pull('s_validcode') != $s_validcode) {
                return $this->_return_center(JsonMessage::Creat(false,'请勿重复提交页面'));
            }
        }


        $rules = array();
        $customAttributes = array();
        $dataarr = array();

        $formdata= request()->json('formdata');

        foreach ($this->add_list as $item) {
            if (!(isset($item['cnedit']) && $item['cnedit'] == true)) {


                if (in_array($item['model'], $this->ForbidEditkey)) continue;


                $dataarr[$item['model']] =  isset($formdata[$item['model']])?$formdata[$item['model']]:NULL;

                if(strlen($dataarr[$item['model']])==0)$dataarr[$item['model']]=null;

                if (isset($item['s_valid']) && $item['s_valid'] != null) {
                    $rules = array_merge($rules, [  $item['model'] => $item['s_valid']]);
                }
                $customAttributes = array_merge($customAttributes, [$item['model'] => $item['name']]);

            }
//            elseif($item['name']=='updated_at'||$item['name']=='created_at'){
//                $dataarr[$item['name']]=date('Y-m-d H:i:s',time());
//            }

        }

        $messages = [];



        foreach ($this->AddValidRule as $key => $item) {
            $rules = array_merge($rules, [$key => $item]);
        }

//        $verifier = App::make('validation.presence');
//        $verifier->setConnection($this->connection);
//        Validator::setPresenceVerifier($verifier);

        $validator = Validator::make($formdata, $rules, $messages, $customAttributes);

//        dd($validator->getPresenceVerifier());

//        $verifier = App::make('validation.presence');
//        $verifier->setConnection($this->connection);
//        $validator->setPresenceVerifier($verifier);
//        $validator->getPresenceVerifier()


        if ($validator->fails()) {
//            $errorarr=$validator->errors()->all();
//            return ["isok"=>0,"telling"=>implode("|",$errorarr)];
            if ($this->ReturnIsView) {
                return redirect()->back()->withErrors($validator)->withInput();
            } else {
                $errorarr = $validator->errors()->all();

                return JsonMessage::Creat(
                    false,
                    implode("|", $errorarr),
                    ['redirect' => redirect()->back()->withErrors($validator)->withInput()]);
//                return ["isok" => 0, "telling" => implode("|", $errorarr), 'redirect' => redirect()->back()->withErrors($validator)->withInput()];
            }

        }
        //dd($dataarr);

        $query = DB::connection($this->connection)->table($this->tablename);

//        foreach ($dataarr as $key => $value) {
//            if ($value === NULL) unset($dataarr[$key]);
//            if ($value == '') $dataarr[$key] = NULL;
//        }
        //dd($dataarr);

        $getback = $this->db_insert($query, $dataarr);
        //dd($getback);

        if ($getback) {

            return $this->_return_center(
                JsonMessage::Creat(true,'数据创建成功',
                    ['id' => $getback,'blade'=>$this->getBladeNewSuccess()]
                    )
            );
        } else {
            return $this->_return_center(
                JsonMessage::Creat(false,'数据创建失败',['id' => $getback,'blade'=>$this->getBladeWrong()])
           );
        }
    }

    public function getObjData($list)
    {
        $arr = [];
        foreach ($list as $item) {
            $arr[$item] = $this->$item;
        }
        return $arr;
    }

    public function searchform()
    {
        $Db_ctrlArr['SearchSubmitUrl'] = $this->SearchSubmitUrl;
        $Db_ctrlArr['DefaultData'] = ['table' => $this->table_default, 'search' => $this->search_default];

        return $this->_return_center(JsonMessage::Creat(
            true,
            '',
            array_merge($Db_ctrlArr,
                ['blade'=>$this->getBladeSearchform(),'id' => $this->id,'ismongodb'=>$this->isMongoDb, 'tablename' => $this->tablename, 'tablename_zh' => $this->tablename_zh, 'pageset' => $this->getObjData(static::$OtherKeysSearch)],
                $this->OtherViewData)
            ));

        //return view(static::$BladeSearchform, );
    }


    static $dbMap = [
        ['name' => 'erp_employees', 'to' => 'erp_employees'],
        ['name' => 'erp_departments', 'to' => 'erp_departments'],
        ['name' => 'erp_roles', 'to' => 'erp_roles'],
        ['name' => 'erp_role_groups', 'to' => 'erp_role_groups'],




    ];

    public function tranDbname($outdb_name)
    {


        if (substr($outdb_name, 0, 1) == '@') {


            $name = substr($outdb_name, 1);

            foreach (static::$dbMap as $item) {

                if ($name == $item['name']) {
                    return $item['to'];
                }
            }

            return $name;
        }
        return $outdb_name;


    }


    //searchWithoutValida

    public function search_data($currentPage = 1, $search = null, $where = [], $callback = null)
    {



        $select_arr = [];
        $aggregete_select_arr=[];
        $outdb_arr = [];

        $outdbindex = 0;
        $tempdisplay_list = $this->display_list;





        //return ($tempdisplay_list);
        foreach ($tempdisplay_list as $key => $item) {

            //echo $key;


            if ($item['type'] == 'operate') {


                foreach ($item['operates'] as $operate) {
                    if (is_array($operate['repeatKeys'])) {

                        foreach ($operate['repeatKeys'] as $repeatKey) {
                            array_push($select_arr, ($this->isMongoDb?'':$this->tablename . '.') . $repeatKey);
                        }

                    }
                }

                continue;
            }

            if ($item['hasoutdb']) {


                if ($item['type'] == "forkey") {

                    if (empty($item['outdb_display_asname'])) {
                        $item['name'] = $item['outdb_asname'] . '_mt_' . $item['outdb_display'];
                        //$item['name']=$temparr[0].'_'.$temparr[1];
                    } else {
                        $item['name'] = $item['outdb_display_asname'];
                    }

                    if(!empty($item['aggregate'])){
                        array_push($aggregete_select_arr,[
                            'name'=>env('DB_PREFIX') . $item['outdb_asname'] . '.' . $item['outdb_display'],
                            'asname'=>$item['name'],
                            'type'=>$item['aggregate'],
                        ]);
                    }

                    array_push($select_arr, DB::raw(env('DB_PREFIX') . $item['outdb_asname'] . '.' . $item['outdb_display'] . ' as ' . $item['name']));
                    $tempdisplay_list[$key]['name'] = $item['name'];
                    continue;
                }


                //$temparr=explode('.',$item['outdb_match']);
                //$temparr2=explode('.',$item['outdb_display']);
                //if(count($temparr)!=2)continue;

                $astablename = empty($item['outdb_asname']) ? 'T' . $outdbindex : $item['outdb_asname'];


                // $outdb=;

                array_push($outdb_arr,
                    [
                        'outdb' => $this->tranDbname($item['outdb_name']),//$temparr[0],
                        'outdb_as' => $astablename,
                        'outdb_match' => $astablename . '.' . $item['outdb_key'],//$temparr[1],//$item['outdb_match'],
                        'selfname' => $item['name'],
                        'outdb_type' => $item['outdb_type']

                    ]);

                if (empty($item['outdb_display_asname'])) {
                    $item['name'] = $this->tranDbname($item['outdb_name']) . '_mt_' . $item['name'];
                    //$item['name']=$temparr[0].'_'.$temparr[1];
                } else {
                    $item['name'] = $item['outdb_display_asname'];
                }
                $tempdisplay_list[$key]['name'] = $item['name'];


                array_push($select_arr, DB::raw(env('DB_PREFIX') . $astablename . '.' . $item['outdb_display'] . ' as ' . $item['name']));
                //return $select_arr;

                if(!empty($item['aggregate'])){
                    array_push($aggregete_select_arr,[
                        'name'=>env('DB_PREFIX') . $astablename . '.' . $item['outdb_display'],
                        'asname'=>$item['name'],
                        'type'=>$item['aggregate'],
                    ]);
                }


                $outdbindex++;
                //array_push($select_arr,$item['outdb_display'].' as '.$item['name']);


            } else {

                array_push($select_arr, ($this->isMongoDb?'':$this->tablename . '.'). $item['name']);


                if(!empty($item['aggregate'])){
                    array_push($aggregete_select_arr,[
                        'name'=>($this->isMongoDb?'':$this->tablename . '.') . $item['name'],
                        'asname'=>$item['name'],
                        'type'=>$item['aggregate'],
                    ]);
                }


            }

        }


        //dd($select_arr);

        //return $outdb_arr;
        //dd($outdb_arr);

        $this->display_list = $tempdisplay_list;
        //var_dump($Db_ctrl->display_list);

        //dd(($Db_ctrl->display_set['operate_btn_list'] ));




        if ($this->primaryKey != null) {
            array_push($select_arr, ($this->isMongoDb?'':$this->tablename . '.') . $this->primaryKey);
        }

        $select_arr = array_unique($select_arr);


        $where_arr = [];

        //var_dump($search_form_arr);



        //$orderby='updated_at';
        //$isorder=1;
        $orderby = [];

        if (!empty($search)) {

            if (isset($search['orderby']) && is_array($search['orderby'])) {
                $orderby = [];
                foreach ($search['orderby'] as $item) {
                    if (empty($item['name'])) continue;
                    array_push($orderby, ['name' => $item['name'], 'by' => $item['by']]);
                }

            }


            if ($this->search_list != null && isset($search['form'])) {
                $search_form_arr = $search['form'];
                //return $search_form_arr;
                //var_dump($search_form_arr);
                if ($search_form_arr != null) {
                    foreach ($search_form_arr as $key => $val) {
                        //var_dump($key);
                        //var_dump($val);
                        //$val==null

                        if (is_array($val) || strlen($val) > 0) {

                            //return $key;
                            $searchobj = $this->_find_match($this->search_list, $key);
//                            Log::info($searchobj);
                            if(empty($searchobj))continue;
//                            var_dump($key);
//                            var_dump($searchobj);
                            array_push($where_arr,
                                ['name' => $searchobj['isoutdb'] ? str_replace('__and__', '.', $key) :($this->isMongoDb?'':$this->tablename . '.') . $key,
                                    'value' => $val,
                                    'type' => $searchobj['type'],
                                    'searchMatch' => isset($searchobj['searchMatch'])?$searchobj['searchMatch']:null
                                ]);

//                            Log::info($where_arr);


                        }
                    }
                }
            }

        }


        //return $outdb_arr;


        //return $aggregete_select_arr;



        $queryback = $this->_creat_sql2($this->tablename, $select_arr, $where_arr,$aggregete_select_arr, $outdb_arr, $currentPage, $this->perPage, $orderby, $where, $callback);
        //var_dump($queryback);

        //new \ReflectionClass();
        $objDisplay = new static::$ClassDisplayFilter();
        //$objDisplay=new \ReflectionClass(static::$ClassDisplayFilter);

        foreach ($this->display_list as $item) {
            if (isset($item['filter']) && $item['filter'] != null) {
                //var_dump(method_exists($objDisplay,$item['filter']));

                //keep_orig

                if(isset($item['keep_orig'])&&$item['keep_orig']){

                    foreach ($queryback['results'] as $key=>$result){
                        $queryback['results'][$key]->{'__original_'.$item['name']}= $result->{$item['name']};
                    }

                }

//                var_dump($objDisplay->getback($item['filter'], $item['name'], $queryback['results']));
                $objDisplay->getback($item['filter'], $item['name'], $queryback['results']);

            } elseif (isset($item['limit']) && $item['limit'] != null) {

                foreach ($queryback['results'] as &$val8889) {
                    $val8889->{$item['name']} = $this->cn_substr_utf8($val8889[$item['name']], $item['limit']);
                }

            }
        }


        return JsonMessage::Creat(true, '加载成功', array_merge([
            'pagedata' =>
                [
                    'result' => $queryback['results'],
                    'aggregete'=>$queryback['aggregete'],
                    'pageSize' => $this->perPage,
                    'totalItems' => $queryback['count'],
                    'currentPage' => $currentPage
                ],
            'pageset' => [
                'display_set' => $this->display_set,
                'display_list' => $this->display_list,
            ]
        ], $this->OtherViewData));

    }


    public function deletedb_get($listid)
    {



        $query = DB::connection($this->connection)->table($this->tablename);




        $query = $query->whereIn($this->primaryKey, explode('_', $listid));


        $datas = $this->db_get($query);


        if (count($datas) == 0) return view($this->getBladeWrong(), array_merge(['telling' => $this->tablename_zh . '未查询到id信息'], $this->OtherViewData));

        $Db_ctrlArr['tablelist'] = json_decode(json_encode($datas), true);

        $objDisplay = new static::$ClassDisplayFilter();
        foreach ($this->display_list as $item) {
            if (isset($item['filter']) && $item['filter'] != null) {

                //var_dump(method_exists($objDisplay,$item['filter']));
                $objDisplay->getback($item['filter'], $item['name'], $Db_ctrlArr['tablelist']);


            } elseif (isset($item['limit']) && $item['limit'] != null) {

                foreach ($Db_ctrlArr['tablelist'] as &$val9889) {
                    $val9889[$item['name']] = static::cn_substr_utf8($val9889[$item['name']], $item['limit']);
                }

            }
        }


        return view($this->getBladeDelete(), array_merge($Db_ctrlArr, $this->OtherViewData, ['display_list' => $this->display_list]));

    }

    public function deletedb_post($listid)
    {



        if (!$this->HardDelete) {

            $query = DB::connection($this->connection)
                ->table($this->tablename)
                ->whereIn($this->primaryKey, explode('_', $listid));


            $deleteback = $this->db_softdelete($query, [$this->SoftDeleteKey => date('Y-m-d H:i:s', time())]);



        } else {
            $query = DB::connection($this->connection)
                ->table($this->tablename)
                ->whereIn($this->primaryKey, explode('_', $listid));
            $deleteback = $this->db_delete($query);

        }


        if ($deleteback) {

            return static::_return_center(array_merge(['isok' => 1, 'id' => $listid, 'blade' => $this->getBladeEditSuccess(), 'getback' => $deleteback, 'telling' => ($this->HardDelete ? 'h' : 's') . '共删除了' . $deleteback . '条记录'], $this->OtherViewData));
        } else {
            return static::_return_center(array_merge(['isok' => 0, 'id' => $listid, 'blade' => $this->getBladeWrong(), 'getback' => $deleteback, 'telling' => ($this->HardDelete ? 'h' : 's') . '删除失败'], $this->OtherViewData));
        }

    }

    public function deletedb($listid)
    {
        if (!request()->isMethod('POST')) return $this->deletedb_get($listid);
        return $this->deletedb_post($listid);
    }

    private function db_delete(Builder $query)
    {


        if($this->GlobalStaticSetSwitchOn){
            $query = $this->_excu_query(static::$BeforeDelete, $query);
        }

        $query = $this->_excu_query($this->BeforeDeleteL, $query);

        return $query->delete();
    }


    private function db_softdelete(Builder $query, $array)
    {


        if ($this->HasDeleteKey) {
            $query->whereNull($this->tablename . '.' . $this->SoftDeleteKey);
        }

        if($this->GlobalStaticSetSwitchOn){
            $query = $this->_excu_query(static::$BeforeDelete, $query);
        }
        $query = $this->_excu_query($this->BeforeDeleteL, $query);

        return $query->update(array_merge($array,
            $this->GlobalStaticSetSwitchOn?static::$BeforeDeleteArr:[],
            $this->BeforeDeleteArrL
        )

        );
    }


    public function cn_substr_utf8($str, $length, $append = '...', $start = 0)
    {
        if (strlen($str) < $start + 1) {
            return '';
        }
        preg_match_all("/./su", $str, $ar);
        $str2 = '';
        $tstr = '';
        //www.phpernote.com
        for ($i = 0; isset($ar[0][$i]); $i++) {
            if (strlen($tstr) < $start) {
                $tstr .= $ar[0][$i];
            } else {
                if (strlen($str2) < $length + strlen($ar[0][$i])) {
                    $str2 .= $ar[0][$i];
                } else {
                    break;
                }
            }
        }
        return $str == $str2 ? $str2 : $str2 . $append;
    }


    private function _find_match($arrList, $patch)
    {


        //var_dump($arrList);
        foreach ($arrList as $item) {
            //var_dump($item['model']);
            //var_dump($patch);
            if ($item['model'] == $patch) {
//                Log::info('=======================');
//                Log::info($patch);
//                Log::info($item['model']);
                return $item;
            }
        }
        return null;
    }

    private function _creat_sql2($dbname, $select_arr, $where_arr, $aggregete_select_arr,$outdb_arr, $pagenum = 1, $eachpagenum = 32, $orderby, $where, $callback = null)
    {


        if ($this->isMongoDb){
            $query =  DB::connection($this->connection)->collection($dbname);
        }else{
            $query = DB::connection($this->connection)->table($dbname);
        }


        //dd($select_arr);
        $query->select($select_arr);


        foreach ($where_arr as $item) {
            $query = DB_widgets::loadwhere($query, $item,$this->isMongoDb);
        }

        if ($callback != null) {
            call_user_func($callback, $query);
        }

        $query = $this->_excu_query($where, $query);


        foreach ($outdb_arr as $item) {

            switch ($item['outdb_type']) {
                case 'innerjoin':
                case 'join':

                    $query->join($item['outdb'] . ' as ' . $item['outdb_as'], function ($join) use ($dbname, $item) {
                        $join->on($dbname . '.' . $item['selfname'], '=', $item['outdb_match']);
                        if (static::$OUTJOINStrict) {
                            if (!in_array($item['outdb'], static::$DBHasNotDelete)) {
                                $join->whereNull($item['outdb_as'] . '.deleted_at');
                            }
                        }
                    });


                    break;
                case 'leftjoin':


                    $query->leftJoin($item['outdb'] . ' as ' . $item['outdb_as'], function ($join) use ($dbname, $item) {
                        $join->on($dbname . '.' . $item['selfname'], '=', $item['outdb_match']);
//                if (!in_array($item['outdb'],static::$DBHasNotCompanyid)) {
//                    $leftjoin->where($item['outdb_as'] . '.company_id', '=', SEmployee::$company_id);
//                }
                        if (static::$OUTJOINStrict) {
                            if (!in_array($item['outdb'], static::$DBHasNotDelete)) {
                                $join->whereNull($item['outdb_as'] . '.deleted_at');
                            }
                        }
                        //->whereNull($item['outdb'].'.deleted_at');
                    });


                    break;
                case 'rightjoin':

                    $query->rightJoin($item['outdb'] . ' as ' . $item['outdb_as'], function ($join) use ($dbname, $item) {
                        $join->on($dbname . '.' . $item['selfname'], '=', $item['outdb_match']);
                        if (static::$OUTJOINStrict) {
                            if (!in_array($item['outdb'], static::$DBHasNotDelete)) {
                                $join->whereNull($item['outdb_as'] . '.deleted_at');
                            }
                        }
                    });

                    break;
//                case 'fulljoin':
//
//                    $query->
//
//                    break;

                default:

            }


        }


        $querycount = $this->db_count($query);

        $aggregete=$this->db_aggregate($query,$aggregete_select_arr);




        //var_dump($querycount);
        Log::info($orderby);
        if ($orderby != null) {
            foreach ($orderby as $item) {
                $query->orderBy(($this->isMongoDb?'':$dbname . '.') . $item['name'], $item['by'] == 'desc' ? 'DESC' : 'ASC');
            }
        }

        if($eachpagenum>0){
            $query->offset($eachpagenum * ($pagenum - 1))->limit((int)$eachpagenum);
        }




        //dd($results);
        Log::info($query->toSql());



        if($this->isMongoDb){
            $results = $this->db_get($query)->all();

                $hasdot=[];
                foreach ($this->display_list as  $item) {
                    if(strpos($item['name'],'.')!==false){
                        array_push($hasdot,$item['name']);
                    }
                }


                foreach ($results as $key=>$item){

                    $results[$key]['_id']=(string)$results[$key]['_id'];
                    foreach ($hasdot as $dotitem){

                        try{
                            $evalstr='["'.implode('"]["',explode('.',$dotitem)).'"]';
                            //var_dump('return $results['.$key.']'.$evalstr.';');
                            $results[$key][$dotitem]=@eval('return $results['.$key.']'.$evalstr.';');
                        }catch (\Exception $e){
                            $results[$key][$dotitem]=null;
                        }

                    }

                }

        }else{
            $results = $this->db_get($query);
        }



        return [
            'results' => $results, //json_decode(json_encode($results), true)
            'count' => $querycount,
            'aggregete'=>$aggregete
        ];


    }


    private function db_aggregate(Builder $query,$aggregete_select_arr)
    {

        if(count($aggregete_select_arr)==0){
            return null;
        }


        $query2 = clone($query);

        if ($this->HasDeleteKey) {
            //dd($this->tablename.'.'.$this->SoftDeleteKey);
            $query2->whereNull($this->tablename . '.' . $this->SoftDeleteKey);
        }


        if($this->GlobalStaticSetSwitchOn){
            $query2 = $this->_excu_query(static::$BeforeCount, $query2);
        }
        $query2 = $this->_excu_query($this->BeforeCountL, $query2);

        if($this->isMongoDb){

            $back=[];
            $val=new \stdClass();

            foreach ($aggregete_select_arr as $item){
                switch ($item['type'])
                {
                    case 'sum':
                        //var_dump($item['name']);
                        //$val->{$item['asname']}=$query2->aggregate('sum',['desc']);
                        $val->{$item['asname']}=$query2->sum($item['name']);
                        //var_dump($val);
                        break;
                    case 'average':
                        $val->{$item['asname']}=$query2->average($item['name']);
                        break;
                    default:
                }
            }

            array_push($back,$val);
            return $back;
        }

        $list=[];

        foreach ($aggregete_select_arr as $item){
            switch ($item['type'])
            {
                case 'sum':
                    array_push($list,DB::raw('sum('.$item['name'].') as '.$item['asname']));
                    break;
                case 'average':
                    array_push($list,DB::raw('AVG('.$item['name'].') as '.$item['asname']));
                    break;
                default:
            }
        }


        //var_dump( $query2->select($list)->toSql());
        $back= $query2->select($list)->get();//->all();
        //var_dump($back);


        foreach ($back as $key=> $item){
            foreach ($aggregete_select_arr as $item2){
                //dd($back[$key]);
                //dd($item2['asname']);
//                dd($back[$key]->{$item2['asname']});
                $back[$key]->{$item2['asname']}=round( $back[$key]->{$item2['asname']},2);
            }
        }

        return $back;



    }

    private function db_count(Builder $query)
    {

        $query2 = clone($query);

        if ($this->HasDeleteKey) {
            //dd($this->tablename.'.'.$this->SoftDeleteKey);
            $query2->whereNull($this->tablename . '.' . $this->SoftDeleteKey);
        }

        if($this->GlobalStaticSetSwitchOn) {
            $query2 = $this->_excu_query(static::$BeforeCount, $query2);
        }
        $query2 = $this->_excu_query($this->BeforeCountL, $query2);


        return $query2->count();

    }

    private function db_get(Builder $query)
    {

        if ($this->HasDeleteKey) {
            $query->whereNull($this->tablename . '.' . $this->SoftDeleteKey);
        }
        if($this->GlobalStaticSetSwitchOn) {
            $query = $this->_excu_query(static::$BeforeGet, $query);
        }
        $query = $this->_excu_query($this->BeforeGetL, $query);

        //Log::info($query->toSql());

        return $query->get();
    }

    private function db_update(Builder $query, $array)
    {


        if ($this->HasDeleteKey) {
            $query->whereNull($this->tablename . '.' . $this->SoftDeleteKey);
        }
        if($this->GlobalStaticSetSwitchOn) {
            $query = $this->_excu_query(static::$BeforeUpdate, $query);
        }

        $query = $this->_excu_query($this->BeforeUpdateL, $query);


        if($this->GlobalStaticSetSwitchOn) {
            foreach (static::$BeforeUpdateArr as $key => $item) {
                if (is_array($item)) {
                    static::$BeforeUpdateArr[$key] = call_user_func_array($item['callback'], $item['arr']);
                }
            }
        }

        foreach ($this->BeforeUpdateArrL as $key => $item) {
            if (is_array($item)) {
                $this->BeforeUpdateArrL[$key] = call_user_func_array($item['callback'], $item['arr']);
            }
        }

        //echo $query->toSql();
        //dd(array_merge($array,static::$BeforeUpdateArr));
        return $query->update(array_merge($array,
            $this->GlobalStaticSetSwitchOn?static::$BeforeUpdateArr:[],
            $this->BeforeUpdateArrL
        ));
    }

    private function _excu_query($beforarr, Builder $query, $nosysdbname = false, $newdbname = '')
    {
        if($this->isMongoDb){

            $dbname='';

        }else{

            if ($nosysdbname) {
                $dbname = $newdbname;
                if ($dbname != '') {
                    $dbname .= '.';
                }
            } else {
                $dbname = $this->tablename . '.';
            }

        }



        //var_dump($beforarr);
        foreach ($beforarr as $item) {
            //var_dump($item);
            if ($item['a'] == 'where') {
                foreach ($item['arr'] as $idx) {
                    $query = $query->where($dbname . $idx[0], $idx[1], $idx[2]);
                }
                //dd($query->toSql());
            }
            if ($item['a'] == 'whereIn') {

                foreach ($item['arr'] as $idx) {
                    $query = $query->whereIn($dbname . $idx[0], $idx[1]);
                }
                //dd($query->toSql());
            }

            if ($item['a'] == 'whereNull') {
                foreach ($item['arr'] as $idx) {
                    $query = $query->whereNull($dbname . $idx);
                }
                //dd($query->toSql());
            }
            if ($item['a'] == 'whereNotNull') {
                foreach ($item['arr'] as $idx) {
                    $query = $query->whereNotNull($dbname . $idx);
                }
                //dd($query->toSql());
            }


            if ($item['a'] == 'wherefun') {
                $query->where($item['arr']);
            }
        }
        return $query;
    }

    private function db_insert(Builder $query, $array)
    {

        if($this->GlobalStaticSetSwitchOn){
            foreach (static::$BeforeInsertArr as $key => $item) {
                if (is_array($item)) {
                    static::$BeforeInsertArr[$key] = call_user_func_array($item['callback'], $item['arr']);
                }
            }
        }



        foreach ($this->BeforeInsertArrL as $key => $item) {
            if (is_array($item)) {
                $this->BeforeInsertArrL[$key] = call_user_func_array($item['callback'], $item['arr']);
            }
        }

//        if(static::$InsertGetid){
        if ($this->primaryKey == 'id') {
            return $query->insertGetId(array_merge($array,
                $this->GlobalStaticSetSwitchOn?static::$BeforeInsertArr:[],
                $this->BeforeInsertArrL
            ));
        }
        //}
        return $query->insert(array_merge($array,
            $this->GlobalStaticSetSwitchOn?static::$BeforeInsertArr:[],
            $this->BeforeInsertArrL
        ));
    }


    private function _return_center($JsonMessage)
    {
        //$data
        //$data

        $data=$JsonMessage['data'];


        if (!isset($data['blade'])) {
            if ($JsonMessage['success']) {
                $data['blade'] = $this->getBladeSuccess();
            } else {
                $data['blade'] = $this->getBladeWrong();
            }
        }

        $data = array_merge($data, $this->OtherViewData);


        if ($this->ReturnIsView) {
            return view($data['blade'], $data);
        } else {
            return $JsonMessage;
        }
    }

    static function JsonCreat($success, $message = '', $data = null, $code = 200)
    {
        return [
            'success' => $success,
            'msg' => $message,
            'code' => $code,
            'data' => $data
        ];
    }

    static function nowtimestr()
    {
        return date('Y-m-d H:i:s', time());
    }


    public static function resetdefaulttablesearch()
    {
        $validator = Validator::make(request()->input(),
            ['id' => 'required|exists:set_db_ctrl2s'],
            ['required' => ':attribute 为必填项',
                'exists' => ':attribute 未创建'
            ]
        );

        if ($validator->fails()) {
            $errorarr = $validator->errors()->all();
            return ["isok" => 0, "telling" => implode("|", $errorarr)];
        }


        if (Db_ctrl::where('id', request()->input('id'))->update(
            ['table_default' => null, 'search_default' => null])) {
            DbCtrlAdmin::creatjsondata();
            return ["isok" => 1, "telling" => "修改成功,time:" . date('Y-m-d H:i:s', time())];
        }

    }

    public static function post_save_default_table()
    {
        $validator = Validator::make(request()->input(),
            ['id' => 'required|exists:set_db_ctrl2s',
                'table_list' => 'required|json'],
            ['required' => ':attribute 为必填项',
                'exists' => ':attribute 未创建',
                'json' => ':attribute 要求是json格式'
            ],
            ['table_list' => '列表的位置宽度']
        );

        if ($validator->fails()) {
            $errorarr = $validator->errors()->all();
            return ["isok" => 0, "telling" => implode("|", $errorarr)];
        }

        //dd(request()->input('table_list'));


        if (Db_ctrl::where('id', request()->input('id'))->update(
            ['table_default' => request()->input('table_list')])) {
            DbCtrlAdmin::creatjsondata();
            return ["isok" => 1, "telling" => "修改成功,time:" . date('Y-m-d H:i:s', time())];
        }


    }

    public static function post_save_default_search()
    {
        $validator = Validator::make(request()->input(),
            ['id' => 'required|exists:set_db_ctrl2s',
                'search_form_arr' => 'required|json'],
            ['required' => ':attribute 为必填项',
                'exists' => ':attribute 未创建',
                'json' => ':attribute 要求是json格式'
            ],
            ['search_form_arr' => '搜索列表默认填写']
        );

        if ($validator->fails()) {
            $errorarr = $validator->errors()->all();
            return ["isok" => 0, "telling" => implode("|", $errorarr)];
        }


        if (Db_ctrl::where('id', request()->input('id'))->update(
            ['search_default' => request()->input('search_form_arr')])) {
            DbCtrlAdmin::creatjsondata();
            return ["isok" => 1, "telling" => "修改成功,time:" . date('Y-m-d H:i:s', time())];
        }
    }

}
