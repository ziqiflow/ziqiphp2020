<?php

namespace App\Http\Tool;
class CssJsLoader
{

    static public $jsbaseurl='';
    static public $cssbaseurl='';

    static public $ctrlbaseurl='/resOld/css_js_img/erp/ctrl/';
    //static public $ctrlbaseurl='/dist/js/erp/ctrl/';

    static public function ctrlload($arr){
        $str='';
        foreach($arr as $item){
            $str.=' <script type="text/javascript" src="'.static::$ctrlbaseurl.$item.'.js?v8"></script>
';
        }
        return $str;
    }

    static public function jsload($arr){



        $jslist=[
            'jquery'=>'/dist/js/lib/jquery-3.1.1.min.js',
            'jquery-ui'=>'/dist/js/lib/jquery-ui.min.js',
            'angular'=>'/dist/js/lib/angular.min.js',
            'global'=>'/dist/js/erp/global.js',
            'bootstrap'=>'/dist/js/lib/bootstrap.min.js',
            'ui-bootstrap-tpls'=>'/dist/js/lib/ui-bootstrap-tpls-2.5.0.min.js',

            'ui-layout'=>'/dist/js/lib/ui-layout-master/src/ui-layout.js',
            'ngDialog'=>'/dist/js/lib/ngDialog/js/ngDialog.min.js',
            'jquery.datetimepicker'=>'/dist/js/lib/datetimepicker-master/build/jquery.datetimepicker.full.min.js',
            //'angular.datetime'=>'dist/js/lib/angular.DatetimePicker-master/angular.datetime.js',
            //'angular.datetime2'=>'dist/js/lib/angular.DatetimePicker-master/angular.datetime2.js',
            'angular-drag'=>'/dist/js/lib/angular-drag-master/dist/angular-drag.js',
            'angular-validation'=>'/dist/js/lib/angular-validation-master/dist/angular-validation.js',
            'angular-validation-rule'=>'/dist/js/lib/angular-validation-master/dist/angular-validation-rule.js',
            'angular-ui-tree'=>'/dist/js/lib/angular-ui-tree-master/dist/angular-ui-tree.min.js',

            'angular-clipboard'=>'/dist/js/lib/angular-clipboard.js',

            'jquery.ui.ruler'=>'/dist/js/lib/jquery-ui.ruler-master/jqueryui-ruler/js/jquery.ui.ruler.js',
            //'jquery.tablesorter'=>'http://tablesorter.com/__jquery.tablesorter.min.js',//'dist/js/lib/__jquery.tablesorter.min.js',
            'jquery.tablesorter'=>'/dist/js/lib/__jquery.tablesorter.min.js',
            'jquery.searchable'=>'/dist/js/lib/jquery-searchable-master/jquery.searchable.js',
            'jquery.fancybox'=>'/dist/js/lib/fancybox-2.1.6/source/jquery.fancybox.js',
            'jquery.loadingoverlay'=>'/dist/js/lib/jquery-loading-overlay-master/src/loadingoverlay.js',
            'jquery.fancydialog'=>'/dist/js/lib/jquery.fancydialog-master/fancydialog/jquery.fancydialog.js',
            'jquery.treeview'=>'/dist/js/lib/jquery-treeview/jquery.treeview.js',

            'ui-sortable'=>'/dist/js/lib/ui-sortable-0.17.1/sortable.js',
            'colResizable'=>'/dist/js/lib/colresizable/colResizable-1.6.js',
            'jquery.scrollfix'=>'/dist/js/lib/scrollfix.js',
            'angular-moment'=>'/dist/js/lib/angular-moment-picker-master/dist/angular-moment-picker.js',
            'ZeroClipboard'=>'/dist/js/lib/ZeroClipboard/ZeroClipboard.js',
            'moment'=>'/dist/js/lib/moment.min.js',
            'chartjs'=>'/dist/js/lib/chart.js/dist/Chart.bundle.min.js',
            'isteven-multi-select'=>'/dist/js/lib/angular-multi-select-master/isteven-multi-select.js',



            'erp.expressTemplate'=>'/dist/js/erplib/express-template/expressTemplate.min.js',
            'erp.deliveryorderTemplate'=>'/dist/js/erplib/deliveryorder-template/deliveryorderTemplate.min.js',
            'erp.tableadmin'=>'/dist/js/erplib/deliveryorder-template/tableadmin.min.js',
            // 'erp.edit.common'=>'/css_js_img/erp/editdb.common.js',

            'erp.edit.common'=>'/dist/js/erp/editdb.common.js',
            'erp.searchform.common'=>'/dist/js/erp/searchform.common.js',
            'erp.kddprint.common'=>'/dist/js/erp/kddprint.common.js',
            'erp.chdprint.common'=>'/dist/js/erp/chdprint.common.js',
            'erp.depot.admin'=>'/dist/js/erp/depot.admin.js',
            'erp.depot.ware'=>'/dist/js/erp/depot.ware.js',
            'order.jiexi'=>'/dist/js/erp/order.jiexi.js',
            //'order.jiexi'=>'css_js_img/erp/order.jiexi.js',
            'Lodop'=>'/dist/js/erp/Lodop.js',



            'Gdirectives'=>'/dist/js/erp/Gdirectives.min.js',
            //'Gdirectives'=>'/dist/js/erp/Gdirectives.js',
            //'shouhouEditor'=>'/css_js_img/dbctrl/lib/erp.shouhou/shouhouEditor.js',
            'shouhouEditor'=>'/dist/js/erplib/erp.shouhou/shouhouEditor.min.js',
            'shouhouDefault'=>'/dist/js/erplib/erp.shouhou/shouhouDefault.min.js',
            //'shouhou.wuliuBox'=>'/dist/js/erplib/erp.shouhou/wuliuBox.min.js',
            'shouhou.wuliuBox'=>'/css_js_img/dbctrl/lib/erp.shouhou/wuliuBox.js',
            'ueditor.config'=>'/dist/js/lib/ueditor/ueditor.config.js',
            'ueditor.all'=>'/dist/js/lib/ueditor/ueditor.all.js',
            'jquery.jspanel'=>'/dist/js/lib/jsPanel-3.10.0/jquery.jspanel-compiled.min.js'

        ];


        $str='';
        foreach($arr as $item){
            $str.=' <script type="text/javascript" src="/resOld'.$jslist[$item].'?v8"></script>
';
        }
        return $str;
    }


   static public function cssload($arr){

       $csslist=[
           'body'=>'/dist/css/erp/body.css',
           'bootstrap'=>'/dist/js/lib/bootstrap-3.3.7-dist/css/bootstrap.css',
           'ui-layout'=>'/dist/js/lib/ui-layout-master/src/ui-layout.css',

           'ngDialog'=>'/dist/js/lib/ngDialog/css/ngDialog.min.css',
           'ngDialog-theme-default'=>'/dist/js/lib/ngDialog/css/ngDialog-theme-default.min.css',
           'font-awesome'=>'/dist/css/font-awesome-4.7.0/css/font-awesome.min.css',
           'datetimepicker'=>'/dist/js/lib/datetimepicker-master/jquery.datetimepicker.css',
           'isteven-multi-select'=>'/dist/js/lib/angular-multi-select-master/isteven-multi-select.css',
           'jquery-ui'=>'//cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.css',
           'jquery.ui.ruler'=>'/dist/js/lib/jquery-ui.ruler-master/jqueryui-ruler/css/jquery.ui.ruler.css',
           'jquery.fancybox'=>'/dist/js/lib/fancybox-2.1.6/source/jquery.fancybox.css',
           'deliveryorderTemplate'=>'/dist/js/erplib/deliveryorder-template/deliveryorderTemplate.css',
           'expressTemplate'=>'/dist/js/erplib/express-template/expressTemplate.css',
           'deliveryorderTemplate'=>'/dist/js/erplib/deliveryorder-template/deliveryorderTemplate.css',
           'angular-moment'=>'/dist/js/lib/angular-moment-picker-master/dist/angular-moment-picker.css',
           'angular-ui-tree'=>'/dist/js/lib/angular-ui-tree-master/examples/source/angular-ui-tree.css',
           'jquery.treeview'=>'/dist/js/lib/jquery-treeview/jquery.treeview.css',
           'jquery.jspanel'=>'/dist/js/lib/jsPanel-3.10.0/jquery.jspanel.css'
       ];

       $str='';
        foreach($arr as $item){
            $str.='<link rel="stylesheet" type="text/css" href="/resOld'.$csslist[$item].'?v8"/>
';
        }
        return $str;
   }



}