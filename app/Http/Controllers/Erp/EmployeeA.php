<?php



namespace App\Http\Controllers\Erp;


use App\Http\Controllers\Controller;
use App\Http\Controllers\Platform\SUser;
use App\Http\Dbctrl\DataSource;
use App\Http\Dbctrl\DbCtrl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

class EmployeeA extends Controller
{

    public static $DBid=15;
    public static $inviteRouteName=201;


    public function binduser(){



        $validator=\Validator::make(request()->input(),
            ['email'=>'required|email','employee_id'=>'required|integer'],
            [ 'required'=>':attribute 为必填项'],
            ['email'=>'邮箱','employee_id'=>'员工ID']
        );

        if($validator->fails()){
            $errorarr=$validator->errors()->all();
            return ["isok"=>0,"telling"=>implode("|",$errorarr)];
        }


        $email=request()->input('email');
        $employee_id=request()->input('employee_id');
        //
        DbCtrl::$BeforeGet=[];

        $where=[
            ['a'=>'where','arr'=>[['email','=',$email],['isemail','=',1]]]
        ];

        $getuser=DbCtrl::sample_get('erp_users',['id'],$where);

        if(count($getuser)==0){
            return ["isok"=>0,"telling"=>'未查询到此账户信息,1.可能未注册.2可能未邮箱认证...'];
        }


        $userid=$getuser[0]->id;
        $where=[
            ['a'=>'where','arr'=>[['userid','=',$userid]]]
        ];
        if(DbCtrl::sample_count('erp_employees',$where)){
            return ["isok"=>0,"telling"=>'此账户已经被绑定过本公司员工账号'];
        }


        $where=[
            ['a'=>'where','arr'=>[['id','=',$employee_id],['status','=',2]]]
        ];

        if(DbCtrl::sample_update('erp_employees',$where,['userid'=>$userid])){
            return ["isok"=>1,"telling"=>'绑定成功'];
        }else{
            return ["isok"=>0,"telling"=>'绑定失败.可能员工状态非在职无法执行此操作'];
        }




    }


    public function creat(){
        DbCtrl::$BladeEditdb='erp.employee.editdb';

        DbCtrl::$OtherViewData=['title'=>'新建员工[人工方式:如需录需绑定邮箱]','successhtml'=>
            '<p>员工添加成功!<br>您还可以 <a href="/erp/employee/edit/{{id}}">编辑此员工</a>|<a href="/erp/employee/add">添加新的员工</a></p>'];

        if(request()->isMethod('POST')){

            if(request()->input(DbCtrl::$submitPrefix.'is_psd')==1){

                $password=request()->input('odata_password');
                $passconf=request()->input('odata_passconf');

                if($password==null){
                    return redirect()->back()->withInput()->withErrors('密码不可为空');
                }
                if($password!==$passconf){
                    return redirect()->back()->withInput()->withErrors('密码和确认密码不相同');
                }

                if(!preg_match('/^[a-zA-Z\d_]{6,16}$/',$password)){
                    return redirect()->back()->withInput()->withErrors('密码要求是6-16字符,字母[区分大小],数字,不含空格');
                }


                DbCtrl::$BeforeInsertArr=array_merge(
                    DbCtrl::$BeforeInsertArr,

                    ['password'=>sha1($password)]);
            }


            DbCtrl::$BeforeInsertArr=array_merge(DbCtrl::$BeforeInsertArr,['status'=>2,'jobid'=>$this->_getjobid()]);
        }

        return DbCtrl::newdb(static::$DBid);
    }


    public function editjobid(){


        $validator=\Validator::make(request()->input(),
            ['jobid'=>'required|integer','employee_id'=>'required'],
            [ 'required'=>':attribute 为必填项'],
            ['jobid'=>'员工工号','employee_id'=>'员工ID']
        );

        if($validator->fails()){
            $errorarr=$validator->errors()->all();
            return ["isok"=>0,"telling"=>implode("|",$errorarr)];
        }

        $jobid=request()->input('jobid');
        $employee_id=request()->input('employee_id');





        $where_count=[
            ['a'=>'where','arr'=>[['jobid','=',$jobid]]]
        ];

        if(DbCtrl::sample_count('erp_employees',$where_count))return ['isok'=>0,'telling'=>'公司已经存在相同的工号'];



        $where=[
            ['a'=>'where','arr'=>[['id','=',$employee_id]]]
        ];

        if(DbCtrl::sample_update('erp_employees',$where,['jobid'=>$jobid],false)){
            return ['isok'=>1,'telling'=>'员工工号修改成功'];
        }else{
            return ['isok'=>0,'telling'=>'员工工号修改失败'];
        }
    }



    public function edit($listid){

        DbCtrl::$OtherViewData=['title'=>'编辑员工','successhtml'=>
'<p>员工修改成功!<br>您还可以 <a href="/erp/employee/edit/{{id}}">重新编辑</a>|<a href="/erp/employee/add">添加新的员工</a></p>
<br><timer time="3" action="refreshparent"></timer>'];
        DbCtrl::$BladeEditdb='erp.employee.editdb';

        if(request()->isMethod("POST")){



            //request()->input()

            if(request()->input(DbCtrl::$submitPrefix.'usercls')==1){

                //intval($listid)
//                 $tempget=DbCtrl::$BeforeGet;
//                DbCtrl::$BeforeGet=[
//                    ['a'=>'where','arr'=>[['id','=',SEmployee::$company_id]]]
//                ];
//                DbCtrl::sample_get('erp_companys',['created_id']);
//
//                DbCtrl::$BeforeGet=$tempget;
                $where=[
                    ['a'=>'where','arr'=>[['id','=',$listid]]]
                ];
                $tosetuser= DbCtrl::sample_get('erp_employees',['user_id'],$where);

                DbCtrl::$BeforeCount=[];
                $where=[
                    ['a'=>'where','arr'=>[['id','=',SEmployee::$company_id],['created_id','=',$tosetuser[0]->user_id]]]
                ];

                if(DbCtrl::sample_count('erp_companys',$where)){

                    return redirect()->back()->withInput()->withErrors('无法对公司创建者设置成普通员工');
                }
            }


            if(request()->input(DbCtrl::$submitPrefix.'is_psd')==1){

                $password=request()->input('odata_password');
                $passconf=request()->input('odata_passconf');

                if(!($password=='noneedchangepasswordbalabala'&&$password==$passconf)){
                    if($password==null){
                        return redirect()->back()->withInput()->withErrors('密码不可为空');
                    }
                    if($password!==$passconf){
                        return redirect()->back()->withInput()->withErrors('密码和确认密码不相同');
                    }

                    if(!preg_match('/^[a-zA-Z\d_]{6,16}$/',$password)){
                        return redirect()->back()->withInput()->withErrors('密码要求是6-16字符,字母[区分大小],数字,不含空格');
                    }


                    DbCtrl::$BeforeUpdateArr=array_merge(
                        DbCtrl::$BeforeUpdateArr,

                        ['password'=>sha1($password)]);
                    //dd(DbCtrl::$BeforeInsertArr);
                }
            }

        }

        return DbCtrl::editdb(static::$DBid,$listid);
    }

    public function creatbyinvite($code){





        DbCtrl::$BeforeGet=[];


        $where=[
            ['a'=>'where','arr'=>[['invitecode','=',$code]]]
        ];

        $getval=DbCtrl::sample_get('erp_companys',['id','name'],$where);

        if(count($getval)==0){
            return view(DbCtrl::$BladeWarn,['telling'=>'邀请加入页面不存在,请联系该公司重置邀请页面']);
        }

        //$getval[0]->id,
        //$getval[0]->name
        $selferror=null;




            $whereemployee=[
                ['a'=>'where','arr'=>[['userid','=',SUser::$id],
                    ['company_id','=',$getval[0]->id]]]
            ];

            if(DbCtrl::sample_count('erp_employees',$whereemployee)){

                if(request()->isMethod('POST')){
                    return view(DbCtrl::$BladeWarn,['telling'=>'您在'.$getval[0]->name.'已经提交过员工申请,麻烦联系公司负责人']);
                }else{
                    $selferror='您在'.$getval[0]->name.'已经提交过员工申请,麻烦联系公司负责人';
                }


            };



        $nowtime=date('Y-m-d H:i:s',time());
        DbCtrl::$BeforeInsertArr=[
            'company_id'=>$getval[0]->id,
        'updated_id'=>null,'updated_at'=>$nowtime,
            'created_id'=>null,'created_at'=>$nowtime];


//        DbCtrl::$BeforeInsertArr['company_id']=


        DbCtrl::$BeforeGet=DataSource::$BeforeGet=[
            ['a'=>'where',
                'arr'=>
                    [['company_id','=',$getval[0]->id]]
            ]
        ];

        DbCtrl::$BladeEditdb='erp.employee.inviteNew';
        DbCtrl::$NewDBCtrl=['id'=>static::$DBid,
            'zh_name_list'=>'[{"name":"id","zh_name":"id","editer":"text","cnedit":true},{"name":"company_id","zh_name":"company_id","editer":"text","cnedit":true,"cnsee":true},{"name":"name","zh_name":"员工昵称","editer":"text","f_valid":"required","s_valid":"required","tishi":"输入一个大家都叫的名字吧"},{"name":"sname","zh_name":"真实姓名","editer":"text","f_valid":"required","s_valid":"required","tishi":"请输入身份证上的名字"},{"name":"jobid","zh_name":"工号标识","editer":"text","s_valid":"unique:erp_employees,jobid|integer","tishi":"员工的工号，要求是数字，同时不可与其他同事一样","f_valid":"required,number","cnedit":true,"cnsee":true},{"name":"userid","zh_name":"用户账号","editer":"text","cnedit":true,"cnsee":true},{"name":"status","zh_name":"用户状态","editer":"select","datasource":"json:[{\"n\":\"申请待审核\",\"v\":1},{\"n\":\"在职\",\"v\":2},{\"n\":\"离职\",\"v\":3}]@1","f_valid":"required","s_valid":"required","cnedit":true,"cnsee":true},{"name":"created_at","zh_name":"创建时间","editer":"text","cnsee":false,"cnedit":true},{"name":"usercls","zh_name":"用户类型","editer":"select","datasource":"json:[{\"n\":\"普通用户\",\"v\":0},{\"n\":\"高级用户\",\"v\":9}]@0","cnedit":true},{"name":"flag_json","zh_name":"权限设置","editer":"text","cnedit":true,"tishi":"编写对应的组件工具"},{"name":"canlogin","zh_name":"临时允许登录","editer":"select","datasource":"json:[{\"n\":\"不允许\",\"v\":0},{\"n\":\"允许\",\"v\":1}]@1","cnedit":true},{"name":"is_psd","zh_name":"使用独立密码","editer":"select","datasource":"json:[{\"n\":\"不使用\",\"v\":0},{\"n\":\"使用\",\"v\":1}]@0"},{"name":"leave_at","zh_name":"离职时间","editer":"timepick","cnedit":true},{"name":"number_log","zh_name":"登录次数","editer":"text","cnedit":true},{"name":"password","zh_name":"密码：默认使用user里面的密码登录。也可以使用此密码登录，但是此密码获取的用户实例上一级是无法操作的","editer":"text","cnedit":true,"cnsee":true},{"name":"deleted_id","zh_name":"deleted_id","editer":"text","cnedit":true,"cnsee":true},{"name":"deleted_at","zh_name":"deleted_at","editer":"text","cnedit":true,"cnsee":true},{"name":"updated_at","zh_name":"更新时间","editer":"text","cnedit":true,"cnsee":true},{"name":"created_id","zh_name":"created_id","editer":"text","cnsee":true,"cnedit":true}]',
            'dbname'=>'erp_employees',
            'dbname_zh'=>'企业雇员表'];

        DbCtrl::$OtherViewData=['company_name'=>$getval[0]->name,'selferror'=>$selferror];


        if(request()->isMethod('POST')){


            if(request()->input(DbCtrl::$submitPrefix.'is_psd')==1){

                $password=request()->input('odata_password');
                $passconf=request()->input('odata_passconf');

                if($password==null){
                    return redirect()->back()->withInput()->withErrors('密码不可为空');
                }
                if($password!==$passconf){
                    return redirect()->back()->withInput()->withErrors('密码和确认密码不相同');
                }

                DbCtrl::$BeforeInsertArr=array_merge(
                    DbCtrl::$BeforeInsertArr,

                    ['password'=>sha1($password)]);
            }

            DbCtrl::$BeforeInsertArr=array_merge(
                DbCtrl::$BeforeInsertArr,

                ['userid'=>SUser::$id,'jobid'=>$this->_getjobid(),'status'=>1,'canlogin'=>0]);

            DbCtrl::$OtherViewData=['title'=>'员工邀请加入提交成功','successhtml'=>
                '<p>申请加入<'.$getval[0]->name.'>成功!<br>马上联系管理者审核'];

        }


        //=json_decode(json_encode($data));
        //echo DbCtrl::$NewDBCtrl->id;
        //dd(DbCtrl::$NewDBCtrl);

       //dd(DbCtrl::$BladeEditdb);
        return DbCtrl::newdb(static::$DBid);


    }

    protected function _getjobid(){


        $getval=DbCtrl::sample_get('erp_employees',['status','jobid'],[],null,'jobid',0);

        //dd($getval);

        if(count($getval)==0)return 1;
        $myjobid=1;
        foreach($getval as $item){
            if($item->status==2){
                $myjobid=$item->jobid+1;
            }else{
                if($myjobid==$item->jobid){
                    $myjobid++;
                }
            }
        }
        return $myjobid;



    }

    public function ReSetinviteCode(){


        DbCtrl::$BeforeUpdate=[];
        DbCtrl::$BeforeUpdateArr=[];

        $invitecode=md5(time() .SEmployee::$company_id. rand(1, 10000));

        $where=[
            ['a'=>'where','arr'=>[['id','=',SEmployee::$company_id]]]
        ];

        if(DbCtrl::sample_update('erp_companys',$where,['invitecode'=>$invitecode],false)){
            return ['isok'=>1,'data'=>route(static::$inviteRouteName,['code'=>$invitecode]),'telling'=>'Reset success'];
        }else{
            return ['isok'=>0,'telling'=>'重置失败,请重新试试'];
        }

    }

    public function reuse($id){

        if($id==SEmployee::$id)return view(DbCtrl::$BladeWarn,['telling'=>'不能重启自己']);

        $where=[
            ['a'=>'where','arr'=>[['id','=',$id],['status','=',3]]]
        ];
        if(DbCtrl::sample_update('erp_employees',$where,['status'=>2],false)){
            return view(DbCtrl::$BladeSuccess,['telling'=>'设置成功']);
        }else{
            return view(DbCtrl::$BladeWrong,['telling'=>'设置失败']);
        }
    }

    public function settoleave($id){

        if($id==SEmployee::$id)return view(DbCtrl::$BladeWarn,['telling'=>'不能设置自己为离职']);

        $where=[
            ['a'=>'where','arr'=>[['id','=',$id],['status','=',2]]]
        ];
        if(DbCtrl::sample_update('erp_employees',$where,['status'=>3,'leave_at'=>date('Y-m-d H:i:s',time())],false)){
            return view(DbCtrl::$BladeSuccess,['telling'=>'设置成功']);
        }else{
            return view(DbCtrl::$BladeWrong,['telling'=>'设置失败']);
        }
    }

    public function settoemployee($id){

        if($id==SEmployee::$id)return view(DbCtrl::$BladeWarn,['telling'=>'不能审核自己']);

        $where=[
            ['a'=>'where','arr'=>[['id','=',$id],['status','=',1]]]
        ];
        if(DbCtrl::sample_update('erp_employees',$where,['status'=>2,'canlogin'=>1],false)){

            return view(DbCtrl::$BladeSuccess,['telling'=>'设置成功']);
        }else{
            return view(DbCtrl::$BladeWrong,['telling'=>'设置失败']);
        }
    }

    public function updatelogin(){



        $validator=\Validator::make(request()->input(),
                ['canlogin'=>'required|json'],
            [ 'required'=>':attribute 为必填项',
                'json'=>':attribute 要求是json格式'
            ],
            ['canlogin'=>'允许登录列表']
        );

        if($validator->fails()){
            $errorarr=$validator->errors()->all();
            return ["isok"=>0,"telling"=>implode("|",$errorarr)];
        }


        $canlogindata=request()->input('canlogin');
        $json2=json_decode($canlogindata,true);

        foreach ($json2 as $val){
            $where=[
                ['a'=>'where',
                    'arr'=>
                        [['id','=',$val['id']]]
                ]
            ];
            DbCtrl::sample_update('erp_employees',$where,['canlogin'=>($val['val']==1)?1:0],false);
        }

        return ['isok'=>1,"telling"=>"修改登陆成功"];

    }

    public function canlogin(){

        DbCtrl::$SearchSubmitUrl='/erp/employee/loginlistdata';
        DbCtrl::$BladeSearchform='erp.employee.canlogin';

        DbCtrl::$hasDefault=false;

        return DbCtrl::searchform(static::$DBid);
    }

    public function loginlistdata(Request $request){

        DbCtrl::$BeforeCount=DbCtrl::$BeforeGet=[
            ['a'=>'where',
                'arr'=>
                    [['company_id','=',SEmployee::$company_id],['status','=',2]]
            ]
        ];
        DbCtrl::$SearchDisplayList='[{"name":"canlogin","zh_name":"允许登录","class":"label label-success","hide":false,"filter":""},{"name":"jobid","zh_name":"工号标识"},{"name":"name","zh_name":"员工昵称","hide":false,"class":"label label-primary"},{"name":"sname","zh_name":"真实姓名"}]';

        DbCtrl::$BladeDisplayList='erp.employee.logindisplaylist';
        return DbCtrl::search_data(static::$DBid,$request->input('currentPage',1));

    }

    public function admin(){



//        $invitecode=CompanySet::getset('InviteCode',$company_id,'string');
//        //dd($invitecode);
//        if($invitecode==null){

//            $invitecode=md5(time() .$company_id. rand(1, 10000));
//            CompanySet::insertset('InviteCode',$invitecode,$company_id);
//        }


//        DbCtrl::$BeforeGet=[
//            ['a'=>'where','arr'=>[['company_id','=',1]]]
//        ];

        $where_status1=[
            ['a'=>'where','arr'=>[['status','=',1]]]
        ];

        $applycount=DbCtrl::sample_count('erp_employees',$where_status1);



        $wherecompany=[
            ['a'=>'where','arr'=>[['id','=', SEmployee::$company_id]]]
        ];
        DbCtrl::$BeforeGet=[];
        $getval=DbCtrl::sample_get('erp_companys',['invitecode'],$wherecompany);



        DbCtrl::$SearchSubmitUrl='/erp/employee/listdata';
        DbCtrl::$BladeSearchform='erp.employee.admin';


        DbCtrl::$DefaultData=ErpDefaultData::getdefault(['search','table']);

        DbCtrl::$OtherViewData=['title'=>'员工管理','applycount'=>$applycount,
            'InviteCode'=> null
            //route(static::$inviteRouteName,
            //['code'=>count($getval)?$getval[0]->invitecode:null])
        ];

        return DbCtrl::searchform(static::$DBid);
    }




    public function lists(){
        DbCtrl::$OtherViewData=['title'=>'员工列表'];
        DbCtrl::$SearchSubmitUrl='/erp/employee/listdata';
        return DbCtrl::searchform(static::$DBid);

    }


    public function listdata(Request $request){



        $search_form_arr=json_decode($request->input('search_form_arr'),true);
        if(isset($search_form_arr['status'])){
            $status=$search_form_arr['status'];
        }else{
            $status=null;
        }


        DbCtrl::$OtherViewData=['nowStatus'=>$status];
        DbCtrl::$BladeDisplayList='erp.employee.displaylist';
        return DbCtrl::search_data(static::$DBid,$request->input('currentPage',1));

    }


    public function delete($listid){
        return DbCtrl::deletedb(static::$DBid,$listid);
    }
}