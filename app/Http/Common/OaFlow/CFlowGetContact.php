<?php


namespace App\Http\Common\OaFlow;


use App\Http\Common\Base\CDept;
use App\Http\Common\Base\CDeptTree;
use Illuminate\Support\Facades\Log;
use \App\Http\Common\Base\Config as ConfigBase;

class CFlowGetContact
{

    public $firstcreated_deptid=null;
    public $firstcreated_userid=null;
    public $lastmsgcreated_deptid=null;
    public $lastmsgcreated_id=null;
    public $formdata=null;

    public $deptWithSon=null;

    public $flowset=null;

    public static $runtime=0;

    public $initdata=null;

    public function __construct($data=null,$deptWithSon=false,$flowset=null)
    {

        if ($deptWithSon === null) $deptWithSon = false;

        $this->deptWithSon=$deptWithSon;

        $this->flowset=$flowset;
//        Log::info('CFlowGetContact_init');

        if(isset($data)){
            $this->initdata=$data;
            $this->firstcreated_deptid=$data['firstcreated_deptid'];
            $this->firstcreated_userid=$data['firstcreated_userid'];
            $this->lastmsgcreated_deptid=$data['lastmsgcreated_deptid'];
            $this->lastmsgcreated_id=$data['lastmsgcreated_id'];
        }

        if(isset($data['formdata'])){
            $this->formdata=$data['formdata'];
        }

    }

    static private function getTreeUserList($tree,$coverageNum=99999){

        $coverageNum--;

        $userlist=[];
        foreach ($tree as $item){
            if($item['type']=='user'){
                array_push($userlist,$item['_uuid']);
            }
            if($item['type']=='dept'&&count($item['children'])>0){
                if($coverageNum>0){
                    $back=static::getTreeUserList($item['children'],$coverageNum);
                    if(count($back)){
                        $userlist=array_merge($userlist,$back);
                    }
                }
            }
        }
        return $userlist;
    }


    static public function getDeptTreeIdList($dept_id){
        return static::getDeptTreeIdname(CDept::getTreeDeptList(),$dept_id);
    }


    static private function getDeptTreeIdname($tree,$dept_id){
        $arr=[];
        foreach ($tree as $dept){
            $hasfind=false;
            if($dept->_uuid==$dept_id){
                array_push($arr,$dept->_uuid);
                $hasfind=true;
                break;
            }
            if(!$hasfind){
                $backarr=static::getDeptTreeIdname($dept->children,$dept_id);
                if(count($backarr)!=0){
                    $arr=array_merge([$dept->_uuid],$backarr);
                    break;
                }
            }
        }
        return $arr;
    }



    static private function filterRunBoots($RunBoots){



        foreach ($RunBoots as $root){
            if($root==CDept::$default_root_d_id){
                return [$root];
            }
        }

        $tree=CDept::getTreeDeptList();
        //return static::getDeptTreeIdname($tree,'25904352988233909');
        //dd($tree);
        $arr=[];
        foreach ($RunBoots as $root){
            array_push($arr,[
                'dept_id'=>$root,
                'dept_tree_idname'=>implode('-',static::getDeptTreeIdname($tree,$root))
            ]);
        }

        $toparr=[];

        Log::info($arr);


        foreach ($arr as $key=> $item){

            //$hasfind=true;
            //strpos("You love php, I love php too!","php");
            foreach ($arr as $key2=>$item2){
                if($key==$key2)continue;
                $spos=strpos($item['dept_tree_idname'],$item2['dept_tree_idname']);
                if($spos===0){
                    continue 2;
                }
                //if($item['dept_tree_idname'])
            }
            array_push($toparr,$item['dept_id']);

        }

        return $toparr;
    }



    public function contacttousers(
        $contactdata
//,//$realData=null,
//                                          $FlowId=null,
//                                          $FlowListid=null,
//                                          $flowmsgid=null,
//                                          $firstcreated_deptid=null,
//                                          $lastmsgcreated_deptid=null,
        //$testData=null)
    )
    {
        //static::$flowset=$flowset;

        $useridlist=[];

//        if(!!$testData){
//            $data=$testData;
//        }else{
//            $data=$realData;
//        }
//        Log::info('data');
//        Log::info($data);

        foreach ($contactdata as $contact) {

            $userchosedlist = [];


            $scopeRunBoots=empty($flowset['runRoots'])
                ?
                [CDept::$default_root_d_id]
                :
                $flowset['runRoots'];
            if(!empty($contact['runRoots'])&&count($contact['runRoots'])>0){
                $scopeRunBoots=$contact['runRoots'];
            }
            if(count($scopeRunBoots)==0){
                $scopeRunBoots=[CDept::$default_root_d_id];
            }
            $scopeRuntype=empty($flowset['runRoottype'])?'creater':$flowset['runRoottype'];
            if(!empty($contact['runRoottype'])){
                $scopeRuntype=$contact['runRoottype'];
            }
            switch ($scopeRuntype)
            {
                case 'creater':
                    break;
                case 'lastuser':
                    break;
                default:
                    $scopeRuntype='creater';
            }

            $scopeRunBoots=static::filterRunBoots($scopeRunBoots);
            Log::info($scopeRuntype);

            $need_dept_id=null;
            if($scopeRuntype=='creater')
            {

                //Log::info($data['firstcreated_deptid']);
                $need_dept_id=$this->firstcreated_deptid;//$data['firstcreated_deptid'];
                //Log::info($need_dept_id);
                //Log::info($scopeRuntype);
            }

            if($scopeRuntype=="lastuser"){
                $need_dept_id=$this->lastmsgcreated_deptid;//$data['lastmsgcreated_deptid'];
            }
            $bootdeptid=null;
//            Log::info('$need_dept_id');
//            Log::info($need_dept_id);
//            Log::info('$scopeRunBoots');
//            Log::info($scopeRunBoots);
            foreach ($scopeRunBoots as $boot){
                if(CFlowDealerUtil::isBelongDeptbydept($need_dept_id,$boot)) {
                    $bootdeptid = $boot;
                    break;
                }
            }
            if(empty($bootdeptid)){

                Log::alert('如果创建者或上一节点的创建人 并不属于 boot节点的人的话，那么就会出现创建为空的情况');
                return [];
            }
            Log::info('$bootdeptid');
            Log::info($bootdeptid);


            $boottree=CDeptTree::findDeptInDeptTree(CDeptTree::GetEmployeesByDept(),
                CDept::$default_root_d_id,
                $bootdeptid);
            Log::info('$boottree');
            //Log::info($boottree);

            foreach ($contact['chosed'] as $index=> $chosed) {

                $data=[
                    'rootTree'=>$boottree,
                    'rootdeptid'=>$bootdeptid,
                    'chosed'=>$chosed,
//                    'testData'=>$testData,
//                    'realData'=>$realData
                ];
                static::$runtime=0;
                $nowuserlist = $this->getChosedUserList2($data);
                //return $nowuserlist;
                //dd($nowuserlist);
                Log::info('$nowuserlist');
                Log::info($nowuserlist);


                //$nowuserlist = [];
//                foreach ($userlist as $item) {
//                    array_push($nowuserlist, $item->id);
//                }

                if ($contact['chosetype'] == 'and') {
                    if (count($userchosedlist) == 0 && $index==0) {
                        $userchosedlist = $nowuserlist;
                    } else {
                        $userchosedlist = array_intersect($userchosedlist, $nowuserlist);
                    }
                }

                if ($contact['chosetype'] == 'or') {
                    $userchosedlist = array_merge($userchosedlist, $nowuserlist);
                }
            }

            $useridlist = array_merge($useridlist, $userchosedlist);

            //dd($useridlist);



//            foreach ($contact['chosed'] as $chosed) {
//                $userlist = static::getChosedUserList($chosed, $FlowId, $FlowListid, $flowmsgid,$testData);

//                $nowuserlist = [];
//                foreach ($userlist as $item) {
//                    array_push($nowuserlist, $item->id);
//                }
//

//                    if (count($userchosedlist) == 0) {
//                        $userchosedlist = $nowuserlist;
//                    } else {
//                        $userchosedlist = array_intersect($userchosedlist, $nowuserlist);
//                    }
//                }
//
//                if ($contact['chosetype'] == 'or') {
//                    $userchosedlist = array_merge($userchosedlist, $nowuserlist);
//                }
//            }
//            $useridlist = array_merge($useridlist, $userchosedlist);
            //

        }

        //dd($useridlist);
        return array_values(array_unique($useridlist));
    }

    private function getChoseDUserList2($data){

        $chosed=$data['chosed'];
        $rootdeptid=$data['rootdeptid'];
        $rootTree=$data['rootTree'];

        Log::info('$chosed');
        Log::info($chosed);



        if($chosed['type']=='formif'){

//            Log::info('static::$formdata');
//            Log::info(static::$formdata);
            if(!empty($chosed['data']['ifstr'])
                &&!empty($chosed['data']['to'])
                &&count($chosed['data']['to'])
                &&static::$runtime==0
            ){
                Log::info($chosed['data']['ifstr']);
                if(CFlowDealerUtil::evelfunifwithkeyform($chosed['data']['ifstr'], $this->formdata))
                {
                    Log::info($chosed['data']['to']);
                    static::$runtime++;





                    $ContactExplan= new CFlowGetContact($this->initdata,$this->deptWithSon);
                    $back=$ContactExplan->contacttousers($chosed['data']['to']);
                    //$back= CFlowGetContact::contacttousers(null,$chosed['data']['to']);




                    return $back;
                }
            }
        }

        if($chosed['type']=='form'){


            $nowformdata=[];
            if(isset($this->formdata[$chosed['id']])){
                $nowformdata=$this->formdata[$chosed['id']];
            }
            //[]
            //deptid: "1"
            //id: "25904352988235030"

            $idlist=[];
            if($chosed['data']=='chose-users'){
                foreach ($nowformdata as $item){
                    if(isset($item['id'])){
                        array_push($idlist,$item['id']);
                    }
                }
            }


            if($chosed['data']=='chose-contact'){

                $ContactExplan= new CFlowGetContact($this->initdata,true);

                Log::info('nowformdata');
                Log::info($nowformdata);

                $idlist=$ContactExplan->contacttousers($nowformdata);

            }


            if($chosed['data']=='chose-depts'){

                // name:dept.label,
                // deptid:dept.id
                foreach ($nowformdata as $item){
                    //$item['deptid']
                    //$boottree=;
                    $users=static::getTreeUserList(
                        CDeptTree::findDeptInDeptTree(
                            CDeptTree::GetEmployeesByDept(),
                            CDept::$default_root_d_id,
                            $item['deptid']),
                        1);
                    $idlist=array_merge($idlist,$users);

                }
            }
//            Log::info('$idlist');
//            Log::info($idlist);

            return $idlist;
        }

        if($chosed['type']=='fun'){


//            if($chosed['id']=='directSuperByCreat'){

//                return CConcatFunList::directSuperByCreat2($data);
//            }
            return $this->entry($data);
//            Log::info('CConcatFunList::entry($data)');
//            Log::info($list);
//            return $list;

        }


        if($chosed['type']=='dept'){



//------------------------

            if($chosed['id']!=CDept::$default_root_d_id) {
//            if($rootdeptid!=$chosed['id']){
                $rootTree = CDeptTree::findDeptInDeptTree($rootTree, $rootdeptid, $chosed['id']);
//            }
            }
            $users=[];
//            if(static::$deptWithSon){

//                $users=static::getTreeUserList($rootTree);
//                //dd($users);
//            }else{
//                foreach ($rootTree as $item){
//                    if($item['type']=='user'){
//                        array_push($users,$item['_uuid']);
//                    }
//                }
//            }

            if(empty($chosed['data']['coverage'])){

                if($this->deptWithSon){
                    $users=static::getTreeUserList($rootTree);
                }else{
                    $users=static::getTreeUserList($rootTree,1);
                }
            }else{

                if($chosed['data']['coverage']=='n'){
                    $users=static::getTreeUserList($rootTree);
                }else{
//                    Log::info('coverage');
//                    Log::info($chosed['data']['coverage']);
                    $users=static::getTreeUserList($rootTree,$chosed['data']['coverage']);
                }
            }

            return $users;
        }

        if($chosed['type']=='user'){

            if(CDeptTree::userHasExistInDeptTree($rootTree,$chosed['id'])){
                return [$chosed['id']];
            }
            Log::info('不BCZ');
            return [];
        }

        if($chosed['type']=="role"){

            $userlist= CDeptTree::findUserbyRoleId($rootTree,$chosed['id']);
            $users=[];
            foreach ($userlist as $item){
                array_push($users,$item['_uuid']);
            }
            return $users;
        }

        return [];



    }


    private function entry($data){
        $chosed=$data['chosed'];
//        $rootdeptid=$data['rootdeptid'];
//        $rootTree=$data['rootTree'];

        switch ($chosed['id'])
        {
            case 'CreatID':

//                if(!!$data['testData']){
//                    $data=$data['testData'];
//                }else{
//                    $data=$data['realData'];
//                }



                if(empty($this->firstcreated_userid)){
                    return [];
                }
                return [$this->firstcreated_userid];
                break;

            case 'LastUserID':

//                if(!!$data['testData']){
//                    $data=$data['testData'];
//                }else{
//                    $data=$data['realData'];
//                }

                if(empty($this->lastmsgcreated_id)){
                    return [];
                }
                return [$this->lastmsgcreated_id];
                break;

            case 'directSuperByCreat':

                //Log::info('directSuperByCreat2334');

                $set=[
                    'chosetype'=>'creater',
                    'findtype'=>'direct',
                    'roles'=>[],
                    'depts'=>[]];
                return static::Super($set,$data);


                break;
            case 'SupersByCreat':

                $set=[
                    'chosetype'=>'creater',
                    'findtype'=>'tree',
                    'roles'=>[],
                    'depts'=>[]];
                return static::Super($set,$data);

                break;
            case 'directSuperByLastUser':

                $set=[
                    'chosetype'=>'lastuser',
                    'findtype'=>'direct',
                    'roles'=>[],
                    'depts'=>[]];
                return static::Super($set,$data);

                break;
            case 'SuperByLastUser':
                $set=[
                    'chosetype'=>'lastuser',
                    'findtype'=>'tree',
                    'roles'=>[],
                    'depts'=>[]];
                return static::Super($set,$data);

                break;
            case 'SuperByLastUser=role':

                $set=[
                    'chosetype'=>'lastuser',
                    'findtype'=>'tree',
                    'roles'=>$chosed['data']['roles'],
                    'depts'=>[]];
                return static::Super($set,$data);
                break;
            case 'SuperByLastUser=dept':

                $set=[
                    'chosetype'=>'lastuser',
                    'findtype'=>'tree',
                    'roles'=>[],
                    'depts'=>$chosed['data']['depts']];

//                $list= static::Super($set,$data);
//                Log::info('$list');
//                Log::info($list);
//                return $list;
                return static::Super($set,$data);

                break;
            case 'Super':

                $set=$chosed['data'];
                //Log::info('set');
                //Log::info($set);

//                Log::info('$data');
//                Log::info($data);
                return static::Super($set,$data);

                break;
            default:

        }

    }


     private function Super($set,$data){


        //

        $chosed=$data['chosed'];
        $rootdeptid=$data['rootdeptid'];
        $rootTree=$data['rootTree'];


//        if(!!$data['testData']){
//            $data=$data['testData'];
//        }else{
//            $data=$data['realData'];
//        }

        if($set['chosetype']=='creater'&&!$this->firstcreated_deptid){
            return [];
        }
        if($set['chosetype']=='lastuser'&&!$this->lastmsgcreated_deptid){
            return [];
        }

        if($set['chosetype']=='creater'){
            $nowdeptid=$this->firstcreated_deptid;
            $nowuserid=$this->firstcreated_userid;
        }
        if($set['chosetype']=='lastuser'){
            $nowdeptid=$this->lastmsgcreated_deptid;
            $nowuserid=$this->lastmsgcreated_id;
        }






        $tree=CDeptTree::findDeptInDeptTree($rootTree,$rootdeptid,$nowdeptid);

        //Log::info('$tree');
        //Log::info($tree);

        $user=[];
        $runtime=0;
        do {
            //
            //Log::info('$nowdeptid');
            //Log::info($nowdeptid);
            $needtouptree=$set['findtype']=='tree';

            $runtime++;
            if($runtime>20){
                Log::info('系统bug');
                break;
            }
//            Log::info('$tree');
//            Log::info($tree);
//            if($runtime==2)break;



            foreach ($tree as $item){

                if($item['type']=='user'){

                    //if(count($set['roles'])>0&&)
                    //Log::info($item);
                    if(CConcatFunList::isSupervisor($item,$nowdeptid)){


//                        Log::info('$nowdeptid');
//                        Log::info($nowdeptid);
//
//                        Log::info('$rootdeptid');
//                        Log::info($rootdeptid);
                        //Log::info($nowdeptid);
                        //Log::info($set['depts']);

                        if(count($set['depts'])>0&&!CConcatFunList::isInDepts($nowdeptid,$set['depts'])){
                            continue;
                        }
                        //Log::info($nowdeptid);
//                        Log::info('$setdepts');
//                        Log::info($set['roles']);
//                        Log::info($item);
                        if(count($set['roles'])>0&&!CConcatFunList::isInRoles($item['roles'],$set['roles'])){
                            continue;
                        }


                        array_push($user,$item['_uuid']);
                        //Log::info('$user');
                        //Log::info($user);
//                        if($item['_uuid']==$data['firstcreated_id']){
//                            $ismyself=true;
//                            break;
//                        }
                    }
                }

            }
//            if(!$ismyself){

//            }

            if(count($user)>0){


                //Log::info('$nowuserid');
                //Log::info($nowuserid);
                if(in_array($nowuserid,$user)){
                    //Log::info('$nowuserid3333');
                    $user=[];
                    $needtouptree=true;

                }else{
                    //Log::info('$nowuserid444');
                    break;
                }
            }


            if($needtouptree){

//                if($rootdeptid==$nowdeptid){

//                }
                if($rootdeptid==$nowdeptid)break;


                //Log::info($nowdeptid);
                $tree=CDeptTree::findFatherDeptByDeptId($rootTree,$nowdeptid);
                //Log::info('ddd');
//                Log::info($tree);


                if(count($tree)==0){
                    return [];
                }
                foreach ($tree as $item){
                    if($item['type']=='dept'){
                        $nowdeptid=$item['parent_id'];
                        break;
                    }
                }

            }else{
                break;
            }



        } while (1);

        //Log::info('$user');
        //Log::info($user);
        return $user;
    }


}
