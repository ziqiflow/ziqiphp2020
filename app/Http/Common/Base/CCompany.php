<?php


namespace App\Http\Common\Base;



class CCompany
{

    static private $id=null;

    static public function setId($id){
        static::$id=(string)$id;


        return static::$id;
    }

    static public function getCompanyId(){
        // return static::$id;
        if(empty(static::$id)){
            if(env('MultipleCompany',false)){

                if(env('ApiCors')){
                    return null;
                }else{
                    return static::setId(session()->get('companyid',null));
                }


            }else{

                if(!!env('CompanyId'))
                {
                    return static::setId(env('CompanyId'));
                }

                if(env('ApiCors')){
                    return null;
                }
                return static::setId(session()->get('companyid',null));
            }

        }
        return static::$id;
    }

    static public function getCompanyPath(){
            if(empty(CCompany::getCompanyId())){
                return '';
            }else{
                return CCompany::getCompanyId().'/';
            }
    }

}