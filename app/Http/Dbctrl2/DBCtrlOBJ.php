<?php

namespace App\Http\Dbctrl2;
use App\Http\Common\Log\MLog;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;


class DBCtrlOBJ
{

    public $Dbconfig='mysql';
    public $InsertGetid=true;
    public $SoftDeleteKey='deleted_at';
    public $HasDeleteKey=true;
    public $isMongoDb=false;


    public static $BladeWrong='admin.dbctrl2.wrong';
    public static $BladeWarn='admin.dbctrl2.warn';
    public static $BladeSuccess='admin.dbctrl2.success';



    public $GlobalStaticSetSwitchOn=true;

    static public $BeforeGet=[];
    static public $BeforeCount=[];
    static public $BeforeAggregate=[];
    static public $BeforeUpdate=[];
    static public $BeforeDelete=[];
    static public $BeforeUpdateArr=[];
    static public $BeforeInsertArr=[];




    public $BeforeGetL=[];
    public $BeforeCountL=[];
    public $BeforeAggregateL=[];
    public $BeforeUpdateL=[];
    public $BeforeDeleteL=[];
    public $BeforeUpdateArrL=[];
    public $BeforeInsertArrL=[];//




    function __construct($Dbconfig='mysql',$HasDeleteKey=false,$isMongoDb=false){
        $this->Dbconfig=$Dbconfig;
        $this->HasDeleteKey=$HasDeleteKey;
        $this->isMongoDb=$isMongoDb;
    }
    static function nowtimestr(){
        return date('Y-m-d H:i:s',time());
    }

    public  function _excu_query($beforarr,$query,$newdbname=''){

        if(!$beforarr)return $query;

        $dbname=$newdbname;
        if($dbname!='')$dbname.='.';
        //var_dump($beforarr);

        if($this->isMongoDb){
            $dbname='';
        }
        //Log::info($dbname);

        foreach($beforarr as $item){
            //var_dump($item);
            if($item['a']=='where'){
                foreach($item['arr'] as $idx){
                    $query=$query->where($dbname.$idx[0],$idx[1],$idx[2]);
                }
                //dd($query->toSql());
            }
            if($item['a']=='whereIn'){

                foreach($item['arr'] as $idx){
                    $query=$query->whereIn($dbname.$idx[0],$idx[1]);
                }
                //dd($query->toSql());
            }
            //whereIn

            if($item['a']=='whereNull'){
                foreach($item['arr'] as $idx){
                    $query=$query->whereNull($dbname.$idx);
                }
                //dd($query->toSql());
            }
            if($item['a']=='whereNotNull'){
                foreach($item['arr'] as $idx){
                    $query=$query->whereNotNull($dbname.$idx);
                }
                //dd($query->toSql());
            }


            if($item['a']=='wherefun'){
                $query->where($item['arr']);
            }
        }
        return $query;
    }

    public function sample_get($dbname,$select=[],$where=[],$funCallback=null,$orderby=null,$isorder=1,$limit=null){

        $query=$this->getconn($dbname);

        $query->select($select);

        $query=$this->_excu_query($where,$query);

        if($this->HasDeleteKey){
            $query->whereNull($dbname.'.'.$this->SoftDeleteKey);
        }
        if($this->GlobalStaticSetSwitchOn){
            $query=$this->_excu_query(static::$BeforeGet,$query,$dbname);
        }


        $query=$this->_excu_query($this->BeforeGetL,$query,$dbname);


        if($funCallback!=null){
            call_user_func($funCallback, $query);
        }

        if($orderby!=null){
            //Log::info($orderby);
            $query->orderBy($orderby, $isorder==1?'DESC':'ASC');
        }
        if($limit!=null)$query->offset((int)$limit[0])->limit((int)$limit[1]);
        Log::info($query->toSql());
//        var_dump($query->toSql());
        $backdata= $query->get();

//        dd($backdata);


        if($backdata->count()>0){
            if(is_array($backdata[0])){
                if(isset($backdata[0]['_uuid'])){
                    $backdata->map(function($item){
                        $item['_uuid'].='';
                    });
                }
            }elseif (is_object($backdata[0])&&property_exists($backdata[0],'_uuid')){

                $backdata->map(function($item){
                   $item->_uuid.='';
                });

            }
        }

//        Log::info('$backdata');
//        Log::info($backdata);


        return $backdata;
        //sta::db_update($query);
    }

    public function sample_crement($dbname,$where,$key,$type='in',$step=1,$extra=[]){
        $query=$this->getconn($dbname);

        $query=$this->_excu_query($where,$query);

        if($this->HasDeleteKey){
            $query->whereNull($dbname.'.'.$this->SoftDeleteKey);
        }
        if($this->GlobalStaticSetSwitchOn) {
            $query = $this->_excu_query(static::$BeforeUpdate, $query, $dbname);
        }
        $query=$this->_excu_query($this->BeforeUpdateL,$query,$dbname);

        // echo $query->toSql();

        if($type=='in'){
            return $query->increment($key,$step,$extra);
        }else{
            return $query->decrement($key,$step,$extra);
        }
    }

    public function sample_update($dbname,$where,$update,$withGupdateArr=false,$funCallback=null){
        $query=$this->getconn($dbname);

        $query=$this->_excu_query($where,$query);

        if($funCallback!=null){
            call_user_func($funCallback, $query);
        }

        if($this->HasDeleteKey){
            $query->whereNull($dbname.'.'.$this->SoftDeleteKey);
        }
        if($this->GlobalStaticSetSwitchOn) {
            $query = $this->_excu_query(static::$BeforeUpdate, $query, $dbname);
        }
        $query=$this->_excu_query($this->BeforeUpdateL,$query,$dbname);

        return $query->update(array_merge($update,
            $withGupdateArr&&$this->GlobalStaticSetSwitchOn?static::$BeforeUpdateArr:[],
            $this->BeforeUpdateArrL));
        //return static::db_update($query,$update);
        //sta::db_update($query);
    }

    public function sample_insert($dbname,$array=[],$withGinsertArr=false){
        $query=$this->getconn($dbname);

        //dd(array_merge($array,$withGinsertArr?static::$BeforeInsertArr:[]));
        //Log::info('sample_insert');
        //Log::info($query->toSql());

        if($this->InsertGetid){
            $data= $query->insertGetId(array_merge($array,
                $withGinsertArr&&$this->GlobalStaticSetSwitchOn?static::$BeforeInsertArr:[],
                $this->BeforeInsertArrL));
        }else{
            $data= $query->insert(array_merge($array,
                $withGinsertArr&&$this->GlobalStaticSetSwitchOn?static::$BeforeInsertArr:[],
                $this->BeforeInsertArrL));
        }
        if(class_exists('MongoDB\BSON\ObjectId')){
            if($data instanceof ObjectID){
                return (string) $data;
            }
        }
        return $data;
        //sta::db_update($query);
    }

    public function sample_aggregate($type,$dbname,$column,$where=[],$funCallback=null){
        $query=$this->getconn($dbname);

        if($this->HasDeleteKey){
            $query->whereNull($dbname.'.'.$this->SoftDeleteKey);
        }

        $query=$this->_excu_query($where,$query);
        if($this->GlobalStaticSetSwitchOn) {
            $query = $this->_excu_query(static::$BeforeAggregate, $query, $dbname);
        }
        $query=$this->_excu_query($this->BeforeAggregateL,$query,$dbname);

        // echo $query->toSql();
        if($funCallback!=null){
            call_user_func($funCallback, $query);
        }

        switch ($type)
        {
            case 'max':
                return $query->max($column);
                break;
            case 'sum':
                return $query->sum($column);
                break;
            case 'count':
                return $query->count($column);
                break;
            default:
                return null;
        }


    }

    public function sample_count($dbname,$where=[],$funCallback=null){
        $query=$this->getconn($dbname);

        if($this->HasDeleteKey){
            $query->whereNull($dbname.'.'.$this->SoftDeleteKey);
        }

        $query=$this->_excu_query($where,$query);
        if($this->GlobalStaticSetSwitchOn) {
            $query = $this->_excu_query(static::$BeforeCount, $query, $dbname);
        }
        //echo $query->toSql();
        $query=$this->_excu_query($this->BeforeCountL,$query,$dbname);
        //echo $query->toSql();


        if($funCallback!=null){
            call_user_func($funCallback, $query);
        }

        Log ::info($query->toSql());

        return $query->count();
    }

    public function sample_delete($dbname,$where,$withLog=false,$sid=null){

        $query=$this->getconn($dbname);
        $query=$this->_excu_query($where,$query);
        if($this->GlobalStaticSetSwitchOn) {
            $query = $this->_excu_query(static::$BeforeDelete, $query, $dbname);
        }
        $query=$this->_excu_query($this->BeforeDeleteL,$query,$dbname);

        $query_clone = clone($query);

        if($withLog){
            $rows=$query_clone->select('*')->get()->all();
        }

        $back= $query->delete();

        if($back){
            if($withLog){

                MLog::deleteDetailInfo(['tag'=>'delete','sid'=>$sid,'dbname'=>$dbname,'rows'=>$rows]);
            }
        }
        return $back;

    }

    public function getconn($dbname=''){
        if($this->isMongoDb){
            return DB::connection($this->Dbconfig)->collection($dbname);
        }else{
            return DB::connection($this->Dbconfig)->table($dbname);
        }
    }

    public function getRawConn($dbname=''){
        if($this->isMongoDb){
            return DB::connection($this->Dbconfig);
        }else{
            return DB::connection($this->Dbconfig);
        }
    }


    public function beginTransaction(){
         DB::connection($this->Dbconfig)->beginTransaction();
    }

    public function rollBack(){
        DB::connection($this->Dbconfig)->rollBack();
    }

    public function commit(){
        DB::connection($this->Dbconfig)->commit();
    }

    public function getConnParam($paramname){
        return config()['database']['connections'][$this->Dbconfig][$paramname];
    }


}







