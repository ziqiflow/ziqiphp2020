(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9381","chunk-1574","chunk-0f0c","chunk-5760","chunk-3890","chunk-43ec","chunk-f75e"],{"0JRH":function(t,e,n){"use strict";n.r(e);var i=n("lYLF"),s=n("USVN"),a={name:"CModelRevoke",props:{},data:function(){return{revokeModalStatus:!1,revokeReason:"",revokeList:[],loading:!1,flowmsgid:null}},mounted:function(){},watch:{},methods:{tran_dealtype:function(t){return Object(s.f)(t)},loadRevokeView:function(t){this.flowmsgid=t,this.init()},init:function(){var t=this;this.revokeModalStatus=!0,this.revokeList=[],this.revokeReason="",this.loading=!0,Object(i.z)({msg_id:this.flowmsgid}).then(function(e){var n=e.data;t.loading=!1,n.success?t.revokeList=n.data:t.$message.error(n.msg)})},revoketo:function(t){var e=this;this.$prompt("确定撤回到<"+t.NowFunName+">,撤回后，当前流程节点以及与撤回节点之间分发的节点都会被取消","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputValidator:function(t){return!!t},inputPlaceholder:"请输入撤回原因",inputErrorMessage:"撤回原因不可为空"}).then(function(n){var s=n.value;e.loading=!0,Object(i.A)({msg_id:e.flowmsgid,msg_to_id:t._id,reason:s}).then(function(t){var n=t.data;e.loading=!1,n.success?(e.$message.success(n.msg),e.$emit("on-revoke-success")):e.$message.error(n.msg)})}).catch(function(){})}}},o=(n("0x9A"),n("KHd+")),l=Object(o.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{fullscreen:!t.isPc,title:"可撤回流程节点",visible:t.revokeModalStatus,width:"50%","append-to-body":""},on:{"update:visible":function(e){t.revokeModalStatus=e}}},[n("div",[n("table",{staticClass:"table table-bordered"},[n("tbody",[n("tr",[n("td",[t._v("节点名")]),t._v(" "),n("td",[t._v("处理人")]),t._v(" "),n("td",[t._v("时间")]),t._v(" "),n("td",{staticStyle:{width:"100px"}},[t._v("操作")])]),t._v(" "),t._l(t.revokeList,function(e,i){return n("tr",{key:i},[n("td",[t._v(t._s(e.NowFunName))]),t._v(" "),n("td",[t._v(t._s(e.toer))]),t._v(" "),n("td",{staticStyle:{width:"80px"}},[t._v(t._s(e.finished_at))]),t._v(" "),n("td",[n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){t.revoketo(e)}}},[t._v("撤回到此处")])],1)])})],2)])])])},[],!1,null,"24ec3418",null);l.options.__file="CModalRevoke.vue";e.default=l.exports},"0x9A":function(t,e,n){"use strict";var i=n("AUDN");n.n(i).a},"79Hv":function(t,e,n){"use strict";n.r(e);var i={name:"Divider",props:{title:{type:String,default:function(){return""}}}},s=(n("YnOI"),n("KHd+")),a=Object(s.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ivu-divider ivu-divider-horizontal ivu-divider-with-text-center"},[e("span",{staticClass:"ivu-divider-inner-text"},[this._v("\n    "+this._s(this.title)+"\n  ")])])},[],!1,null,null,null);a.options.__file="CDivider.vue";e.default=a.exports},AUDN:function(t,e,n){},Bxsd:function(t,e,n){"use strict";var i=n("SBzw");n.n(i).a},H9at:function(t,e,n){},HTgY:function(t,e,n){"use strict";var i=n("t96F");n.n(i).a},HWK0:function(t,e,n){"use strict";n.r(e);var i=n("GQeE"),s=n.n(i),a=n("P2sY"),o=n.n(a),l=n("gDS+"),r=n.n(l),c=n("kquR"),u=n("79Hv"),d=n("EJiy"),f=n.n(d),h=n("lYLF"),m=n("k48p"),p={data:function(){return{myPermissions:null}},props:{flowid:{type:String},flowname:{type:String}},methods:{showexport:function(){return this.myPermissions.some(function(t){return t.allow.some(function(t){return"export"==t})})},exportData:function(){var t=this;this.showexport()?this.$confirm("确定导出数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$refs.generateForm.getData().then(function(e){t.search.form=e;var n=t.getpostdata();n.flowid=t.flowid,Object(h.d)(n).then(function(e){if(console.log(e),e.data&&e.data.constructor==ArrayBuffer){var n=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),i=URL.createObjectURL(n),s=document.createElement("a");document.body.appendChild(s),s.setAttribute("style","display:none"),s.setAttribute("href",i),s.setAttribute("download",t.flowname),s.click(),URL.revokeObjectURL(i)}else t.$message.error(e.data.msg)})}).catch(function(t){console.log(t),console.log("有需求信息没有填写")})}).catch(function(){}):this.$message.error("您没有导出的权限")},watchTable:function(t,e){var n=this.CopyObject(t._formset);n.model=t._formset.type+"_"+t._formset.key,n.options.table_edit=!1,n.options.table_add=!1,n.options.table_delete=!1,n.options.disabled=!0;var i={config:{labelWidth:160,labelPosition:"top"},list:[n]},s={};s[t._formset.type+"_"+t._formset.key]=e[t.name],console.log(i),console.log(s),this.$refs.watchform.set_a_table("查看表格",i,s)},button_show_watch:function(t){return!0},checkUserHasPermission:function(t,e,n){for(var i=0;i<e.length;i++){var s=e[i];if(s.allow.some(function(t){return t==n})&&s.admindept.some(function(e){return"1"==e||t.some(function(t){return t==e})}))return!0}return!1},button_show_revoke:function(t){return!1},button_show_cancel:function(t){return!t.isCancel&&t.CancelNum?this.checkUserHasPermission(t.dept_id_list,this.myPermissions,"cancel"):0!=t.unFinishNum&&this.checkUserHasPermission(t.dept_id_list,this.myPermissions,"cancel")},button_click_watch:function(t){console.error(this.$refs.flowdetail),this.$refs.flowdetail.loadmodal(t._id.$oid,"查看 "+t.name+" 明细")},cancelSuccess:function(){this.search_submit()},revokeSuccess:function(){this.search_submit()},button_click_revoke:function(t){this.checkUserHasPermission(t.dept_id_list,this.myPermissions,"revoke")||this.$message.error("您没有操作撤回的权限")},button_click_cancel:function(t){this.checkUserHasPermission(t.dept_id_list,this.myPermissions,"cancel")?this.$refs.cancelflow.loadCancelView(t._id.$oid):this.$message.error("您没有操作取消的权限")},filterfun_formdata_type:function(t,e){for(var n=this,i=function(i){var a=n.pageset.display_list[i];if(e!=a.name)return"continue";if(s()(a._formset.options).indexOf("options")>=0&&0==a._formset.options.remote){var o=[];return(t[e]&&t[e].constructor==Array?t[e]:[t[e]]).forEach(function(t){for(var e=!1,n=0;n<a._formset.options.options.length;n++){var i=a._formset.options.options[n];if(t==i.value){e=!0,a._formset.options.showLabel?o.push(i.label?i.label:i.value):o.push(i.value);break}}e||o.push(t)}),o.length?{v:o.join(",")}:{v:""}}switch(a._formset.type){case"custom":if(-1!=["chose-depts","chose-users"].indexOf(a._formset.options.componentName)&&t[e]&&t[e].constructor==Array)return{v:t[e].map(function(t){return t.name}).join(",")}}},a=0;a<this.pageset.display_list.length;a++){var o=i(a);switch(o){case"continue":continue;default:if("object"===(void 0===o?"undefined":f()(o)))return o.v}}return t[e]},filterfun_to_flowstatus:function(t,e){return t.isCancel?"已取消":0==t[e]?"已结束"+(t.CancelNum?"(取消"+t.CancelNum+"次)":""):"未结束("+t[e]+")"},filterfun_int_to_datetime:function(t,e,n){try{return this.funtool_timetrans(t[e].$date.$numberLong/1e3)}catch(t){return console.log(t),null}},filterfun_to_friendlytimejs:function(t,e,n){try{return Object(m.a)(this.funtool_timetrans(t[e].$date.$numberLong/1e3),new Date)}catch(t){return console.log(t),null}},funtool_timetrans:function(t){return(t=new Date(1e3*t)).getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())},search_submit:function(){var t=this;this.searchloading=!0,this.searchinfo={type:"default",info:"加载中"},this.$refs.generateForm.getData().then(function(e){t.search.form=e;var n=t.getpostdata();n.flowid=t.flowid,Object(h.c)(n).then(function(e){var n=e.data;t.searchloading=!1,t.AfterSearch(n),console.log(n),n.success&&(t.myPermissions=n.data.pagedata.permissions)})}).catch(function(t){console.log(t),console.log("有需求信息没有填写")})}}},_=n("lvaK"),g=n("jR6w"),v=n("pqUY"),b=n("0JRH"),y={name:"searchFormCommon",mixins:[p],components:{OrderBy:c.default,Divider:u.default,ModalFlowDetail:_.default,ModalWatchForm:g.default,ModalCancel:v.default,ModalRevoke:b.default},props:{isMongodb:{type:Boolean,default:function(){return!1}},pageSet:{type:Object},default:{type:Object},dbId:{type:String},submitUrl:{type:String,default:function(){return""}}},data:function(){return{mongo_split_str:"___________",js_filter_mark_str:"_______js_filter",iframedialogVisible:!1,iframewidth:null,iframeheight:null,iframesrc:null,multipleSelection:[],MulpOperates:[],searchinfo:{type:"",info:""},currentPage:1,searchloading:!0,afterinit:!1,display_set:null,search:{form:{},orderby:[]},page:{result:[],totalItems:0,pageSize:20,currentPage:1},pageset:{display_set:{},display_list:[]},orderby_list:[],remoteFuncs:{},widgetForm:null}},mounted:function(){var t=this;console.log("pageSet"),console.log("pageSet",this.pageSet),this.initdata(),this.afterinit=!0,setTimeout(function(){t.search_submit()},19)},computed:{hasMulp:function(){return this.MulpOperates.some(function(t){return t.batchupdate})}},methods:{button_click_creat:function(){this.$message.info("创建")},button_click_sort:function(){this.$message.info("排序")},addclass:function(t){var e=document.createElement("style");e.type="text/css";try{e.appendChild(document.createTextNode(t))}catch(n){e.styleSheet.cssText=t}window.document.getElementsByTagName("head")[0].appendChild(e)},openiframe:function(t,e,n){var i=this;console.log(e),console.log(n),this.iframesrc=t,this.iframewidth=e,this.iframewidth&&(this.iframewidth+="",this.addclass(".iframeDialog{width:"+this.iframewidth+"px}")),setTimeout(function(){i.iframedialogVisible=!0},300),this.iframeheight=n?n+"px":"500px"},topx:function(t){},toggleTable:function(){var t=this;this.page.result.forEach(function(e){e.___type||t.$refs.multipleTable.toggleRowSelection(e)})},handleSelectionChange:function(t){this.multipleSelection=t},replaceAll:function(t,e,n){for(var i=t.split(e).length-1,s=0;s<i;s++)t=t.replace(e,n);return t},replaceUrlkey:function(t,e){if(t.constructor===Array&&t.length>0)for(var n in t[0])if(console.log(-1!=e.indexOf("$["+n+"]")),-1!=e.indexOf("$["+n+"]")){for(var i=[],s=0;s<t.length;s++){var a=t[s];i.push(a[n])}console.log(i),e=this.replaceAll(e,"$["+n+"]",r()(i))}if(t.constructor===Object)for(var o in t)e=this.replaceAll(e,"$["+o+"]",t[o]);return e},outlink_click:function(t,e){var n=this.replaceUrlkey(t,e.url);"_blank"!=e.urltarget?"dialog"!=e.urltarget?window.location.href=n:this.openiframe(n,e.dialogwidth,e.dialogheight):window.open(n,"_blank")},innerlink_click:function(t,e){console.log(e),this.$router&&this.$router.push(this.replaceUrlkey(t,e.url))},showpic2:function(t){if(t.constructor===Array){var e="";t.forEach(function(t){e+=t.name}),this.$message.info(e)}t.constructor===Object&&this.$message.info(t.name)},button_show:function(t,e){return!e||(console.log("funName",e),!this[e]||this[e](t))},button_click:function(t,e){switch(e){case"showpic":this.$message.info("showpic");break;default:this[e]&&this[e](t)}},filterFun:function(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;switch(t){case"pic":return e[n]+"pic"+i.join("---");default:return this[t]?this[t](e,n,i):e[n]}},GetDataSource:function(t){var e=t.indexOf(":"),n=t.substr(0,e),i=t.substr(e+1);switch(n){case"json":try{return JSON.parse(i)}catch(t){return console.log(t),null}}return null},tranfilterResult:function(t){var e=this;this.pageset.display_list.forEach(function(n){n.hide||"operate"==n.type||t.forEach(function(t){!t.___type&&n.jsfilter&&(t[n.name+e.js_filter_mark_str]=e.tranfilter(t,n.name,n.jsfilter))})}),console.log("tranfilterResult",t)},tranfilter:function(t,e,n){if(!n)return t[e];console.log("jsfilter",n);var i=n.indexOf("@"),s=n.indexOf("#");if(-1==i){if(-1==s)return this.filterFun(n,t,e);var a=n.substr(0,s),o=n.substr(s+1);return this.filterFun(a,t,e,o.split("#"))}var l=null,r=null;-1==s?(l=n.substr(0,i),r=n.substr(i+1)):(l=n.substr(0,i),r=n.substr(i+1,s-i-1));var c=this.GetDataSource(r);if(c&&c.forEach(function(n){n.v==t[e]&&(t[e]=n.n)}),-1==s)return this.filterFun(l,t,e);var u=n.substr(s+1);return this.filterFun(l,t,e,u.split("#"))},getAggregateName:function(t,e){switch(t){case"sum":return"对"+e+"列 的 汇总（SUM）";case"average":return"对"+e+"列 的 平均（Average）";default:return""}},tableRowClassName:function(t){var e=t.row;t.rowIndex;return e.___type?(console.log("___type",e),"aggregete-row"):""},checkboxT:function(t,e){return console.log(t),t.___type?0:1},toJSON:function(t){if(!t)return null;try{return JSON.parse(t)}catch(t){return console.log(t),null}},initdata:function(){this.widgetForm=this.initFormset(this.pageSet.searchFormSet),this.orderby_list=this.pageSet.orderby_list,this.display_set=this.pageSet.display_set,this.default.search&&(this.search=o()(this.search,this.default.search)),0==this.search.orderby.length&&this.orderby_list.length>0&&this.search.orderby.push({name:this.orderby_list[0].name,by:"desc"})},CopyObject:function(t){return JSON.parse(r()(t))},splicerequiredrule:function(t){if(t)for(var e=t.length-1;e>=0;e--){var n=t[e];void 0!==n.required&&(!0,n.required=!1)}},FormItemRest:function(t){for(var e=t.length-1;e>=0;e--){var n=t[e];if("grid"==n.type&&n.columns){if(n.columns.length)for(var i=0;i<n.columns.length;i++){var s=n.columns[i];this.FormItemRest(s.list)}}else this.initFormSetItem(n),"table"==n.type||"placeholderhtml"==n.type?t.splice(e,1):(n.model=this.replaceAll(n.model,".",this.mongo_split_str),n.options.required=!1,this.splicerequiredrule(n.rules))}},initFormSetItem:function(t){if(t.rules||(t.rules=[]),s()(t.options).indexOf("options")>=0&&0==t.options.remote){var e=t.options.options.map(function(t){return t.value});if(t.options.defaultValue){if(t.options.defaultValue.constructor==Array)for(var n=function(n){var i=t.options.defaultValue[n];e.some(function(t){return t==i})||t.options.defaultValue.splice(n,1)},i=t.options.defaultValue.length-1;i>=0;i--)n(i);t.options.defaultValue.constructor==String&&(e.some(function(e){return e==t.options.defaultValue})||(t.options.defaultValue=null))}}console.log("调整后的表单设置",t)},initFormset:function(t){return this.FormItemRest(t.list),t},handleCurrentChange:function(t){this.currentPage=t,this.search_submit()},DropDownSaveSearch:function(){},DropDownClearSearch:function(){},DropDownSaveTable:function(){},DropDownClearTable:function(){},DropDownGotoedit:function(){window.open("/admin/dbctrl3/edit/"+this.dbId,"_blank")},AfterSearch:function(t){var e=this;if(!t.success)return this.$message.error(t.msg),void(this.searchinfo={type:"error",info:t.msg});this.searchinfo={type:"info",info:t.msg},setTimeout(function(){e.searchinfo.info=null},3e3);var n=t.data,i=n.pageset,s=n.pagedata;this.pageset=i,this.multipleSelection=[],this.tranfilterResult(s.result),this.page={result:s.result,totalItems:s.totalItems,pageSize:s.pageSize,currentPage:s.currentPage},this.display_list=i.display_list,this.MulpOperates=[],this.display_list.forEach(function(t){t.hide||"operate"==t.type&&(e.MulpOperates=e.MulpOperates.concat(t.operates))}),console.log("MulpOperates",this.MulpOperates),this.page.result.length>0&&s.aggregete&&s.aggregete.length&&(s.aggregete[0].___type="a",this.page.result.push(s.aggregete[0]))},getpostdata:function(){var t={search:this.CopyObject(this.search),currentPage:this.currentPage};for(var e in t.search.form)console.log(e),-1!=e.indexOf(this.mongo_split_str)&&(t.search.form[this.replaceAll(e,this.mongo_split_str,".")]=t.search.form[e],delete t.search.form[e]);return t}}},w=(n("NtOR"),n("IQWq"),n("KHd+")),k=Object(w.a)(y,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"searchForm"},[n("modal-watch-form",{ref:"watchform"}),t._v(" "),n("modal-cancel",{ref:"cancelflow",on:{"on-cancel-success":t.cancelSuccess}}),t._v(" "),n("modal-revoke",{ref:"revokeflow",on:{"on-revoke-success":t.revokeSuccess}}),t._v(" "),n("modal-flow-detail",{ref:"flowdetail",attrs:{"is-admin":!0}}),t._v(" "),t.afterinit?n("el-card",[t.widgetForm&&t.widgetForm.list.length>0?n("div",{staticClass:"searchWidget"},[n("fm-generate-form",{ref:"generateForm",staticClass:"generateForm",attrs:{data:t.widgetForm,remote:t.remoteFuncs,value:t.search.form}})],1):t._e(),t._v(" "),n("divider",{attrs:{title:"排序"}}),t._v(" "),n("order-by",{staticStyle:{"margin-left":"100px"},attrs:{orderbylist:t.orderby_list},model:{value:t.search.orderby,callback:function(e){t.$set(t.search,"orderby",e)},expression:"search.orderby"}}),t._v(" "),n("div",{staticStyle:{"margin-left":"100px","margin-top":"15px"}},[n("el-button",{staticClass:"searchbutton",attrs:{type:"primary"},on:{click:t.search_submit}},[t._v("搜索")]),t._v(" "),t.searchinfo.info?n("span",{class:t.searchinfo.type},[t._v(t._s(t.searchinfo.info))]):t._e()],1),t._v(" "),t._t("aftersearchform"),t._v(" "),n("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.searchloading,expression:"searchloading"}],staticStyle:{"margin-top":"20px","min-height":"200px"}},[t.display_set?n("div",{staticStyle:{"margin-bottom":"10px"}},t._l(t.display_set.topbtns,function(e,i){return n("span",{key:i,staticClass:"topbtns"},["button"==e.type?n("span",{staticClass:"topbtn_item"},[n("el-button",{attrs:{icon:e.icon,size:"mini",type:e.btnclass},on:{click:function(n){t.button_click({},e.funName)}}},[t._v(t._s(e.name))])],1):t._e(),t._v(" "),"custom"==e.type?n("span",{staticClass:"topbtn_item"},[n(e.customName,{tag:"component",attrs:{showname:e.name}})],1):t._e(),t._v(" "),"outlink"==e.type?n("span",{staticClass:"topbtn_item"},[n("el-button",{attrs:{icon:e.icon,size:"mini",type:e.btnclass},on:{click:function(n){t.outlink_click({},e)}}},[t._v(t._s(e.name))])],1):t._e(),t._v(" "),"innerlink"==e.type?n("span",{staticClass:"topbtn_item"},[n("el-button",{attrs:{icon:e.icon,size:"mini",type:e.btnclass},on:{click:function(n){t.innerlink_click({},e)}}},[t._v(t._s(e.name))])],1):t._e()])})):t._e(),t._v(" "),t.searchloading?t._e():n("div",{staticClass:"result"},[n("div",{staticStyle:{"margin-bottom":"10px"}},[t._v("\n                    \n                    共搜索到\n                    "),n("span",{staticClass:"totalItems"},[t._v(t._s(t.page.totalItems))]),t._v("条记录\n\n                    "),t.showexport()?n("el-button",{attrs:{type:"text",size:"mini"},on:{click:t.exportData}},[t._v("根据当前搜索内容导出数据")]):t._e()],1),t._v(" "),t.page.totalItems?n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.page.result,stripe:"",border:"","max-height":t.pageset.display_set.tablemaxheight,"row-class-name":t.tableRowClassName},on:{"selection-change":t.handleSelectionChange}},[t.pageset.display_set.checkbox?n("el-table-column",{attrs:{selectable:t.checkboxT,type:"selection",width:"35"}}):t._e(),t._v(" "),t._l(t.pageset.display_list,function(e,i){return e.hide?t._e():n("el-table-column",{key:i,attrs:{label:e.zh_name,prop:e.name,fixed:e.fixedtype,width:e.width},scopedSlots:t._u([{key:"default",fn:function(i){return[i.row.___type?n("div",[e.aggregate?n("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:t.getAggregateName(e.aggregate,e.name),placement:"top"}},[n("span",[t._v(t._s(i.row[e.name]))])]):t._e()],1):n("div",{class:e.class,style:t.toJSON(e.style)},["operate"==e.type?t._l(e.operates,function(e,s){return n("span",{key:s,staticClass:"operates"},[!e.hide&&t.button_show(i.row,e.showFunName)?n("span",["button"==e.type?n("span",{staticClass:"operate_item"},[n("el-button",{attrs:{size:"mini",type:e.btnclass},on:{click:function(n){t.button_click(i.row,e.funName)}}},[t._v(t._s(e.name))])],1):t._e(),t._v(" "),"custom"==e.type?n("span",{staticClass:"operate_item"},[n(e.customName,{tag:"component",attrs:{data:t.row,showname:e.name}})],1):t._e(),t._v(" "),"outlink"==e.type?n("span",{staticClass:"operate_item"},[n("el-button",{attrs:{size:"mini",type:e.btnclass},on:{click:function(n){t.outlink_click(i.row,e)}}},[t._v(t._s(e.name))])],1):t._e(),t._v(" "),"innerlink"==e.type?n("span",{staticClass:"operate_item"},[n("el-button",{attrs:{size:"mini",type:e.btnclass},on:{click:function(n){t.innerlink_click(i.row,e)}}},[t._v(t._s(e.name))])],1):t._e()]):t._e()])}):["operate"!=e.type?n("span",[e._isformdata?["switch"==e._formset.type?n("el-switch",{attrs:{disabled:""},model:{value:i.row[e.name],callback:function(n){t.$set(i.row,e.name,n)},expression:"scope.row[item.name]"}}):"table"==e._formset.type?n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){t.watchTable(e,i.row)}}},[t._v("查看表格")]):n("span",[t._v(t._s(i.row[e.name+t.js_filter_mark_str]))])]:e.jsfilter&&i.row[e.name+t.js_filter_mark_str]?[t._v("\n                        "+t._s(i.row[e.name+t.js_filter_mark_str])+"\n                    ")]:[t._v("\n                             "+t._s(i.row[e.name])+"\n                    ")]],2):t._e()]],2)]}}])})})],2):t._e(),t._v(" "),n("div",{staticStyle:{margin:"10px 0",padding:"10px 0"}},[n("div",{staticStyle:{float:"left"}},[t.hasMulp?n("el-button",{attrs:{size:"mini"},on:{click:t.toggleTable}},[t._v("全选/全不选")]):t._e(),t._v(" "),t._l(t.MulpOperates,function(e,i){return n("span",{key:i,staticClass:"MulpOperates"},[e.batchupdate&&!e.hide&&t.button_show(t.multipleSelection,e.showFunName)?n("span",["button"==e.type?n("span",{staticClass:"MulpOperate_item"},[n("el-button",{attrs:{disabled:!t.multipleSelection.length,size:"mini",type:e.btnclass},on:{click:function(n){t.button_click(t.multipleSelection,e.funName)}}},[t._v(t._s(e.name)+"("+t._s(t.multipleSelection.length)+")")])],1):t._e(),t._v(" "),"custom"==e.type?n("span",{staticClass:"MulpOperate_item"},[n(e.customName,{tag:"component",attrs:{disabled:!t.multipleSelection.length,showname:e.name,data:t.multipleSelection}})],1):t._e(),t._v(" "),"outlink"==e.type?n("span",{staticClass:"MulpOperate_item"},[n("el-button",{attrs:{disabled:!t.multipleSelection.length,size:"mini",type:e.btnclass},on:{click:function(n){t.outlink_click(t.multipleSelection,e)}}},[t._v(t._s(e.name)+"("+t._s(t.multipleSelection.length)+")")])],1):t._e(),t._v(" "),"innerlink"==e.type?n("span",{staticClass:"MulpOperate_item"},[n("el-button",{attrs:{disabled:!t.multipleSelection.length,size:"mini",type:e.btnclass},on:{click:function(n){t.innerlink_click(t.multipleSelection,e)}}},[t._v(t._s(e.name)+"("+t._s(t.multipleSelection.length)+")")])],1):t._e()]):t._e()])})],2),t._v(" "),n("div",{staticStyle:{float:"right"}},[n("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-size":t.page.pageSize,"pager-count":5,background:"",total:t.page.totalItems,layout:"prev, pager, next"},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),n("div",{staticClass:"clear"})])],1)])],2):t._e(),t._v(" "),t.iframedialogVisible?n("div",[n("el-dialog",{attrs:{"custom-class":"iframeDialog","append-to-body":"",visible:t.iframedialogVisible,width:t.iframewidth},on:{"update:visible":function(e){t.iframedialogVisible=e}}},[n("iframe",{staticStyle:{width:"100%"},style:{height:t.iframeheight},attrs:{src:t.iframesrc,frameborder:"0"}})])],1):t._e()],1)},[],!1,null,"18beb9c3",null);k.options.__file="searchFormCommon.vue";e.default=k.exports},IQWq:function(t,e,n){"use strict";var i=n("cB5V");n.n(i).a},Lp68:function(t,e,n){"use strict";var i=n("fDSt");n.n(i).a},NtOR:function(t,e,n){"use strict";var i=n("v2A1");n.n(i).a},RQ3R:function(t,e,n){"use strict";var i=n("ozoO");n.n(i).a},SBzw:function(t,e,n){},YnOI:function(t,e,n){"use strict";var i=n("H9at");n.n(i).a},cB5V:function(t,e,n){},fDSt:function(t,e,n){},jR6w:function(t,e,n){"use strict";n.r(e);var i={name:"CModelWatchForm",props:{},data:function(){return{widgetForm:null,remoteFuncs:[],widgetModels:null,title:null,dialogVisible:!1}},mounted:function(){},methods:{set_a_table:function(t,e,n){var i=this;this.widgetForm=null,this.title=t,this.dialogVisible=!0,setTimeout(function(){i.widgetForm=e,i.widgetModels=n},100)}}},s=(n("HTgY"),n("KHd+")),a=Object(s.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-dialog",{attrs:{fullscreen:!t.isPc,title:t.title,visible:t.dialogVisible,width:"75%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[t.widgetForm&&t.widgetForm.list.length>0?n("div",[n("fm-generate-form",{ref:"generateForm",staticClass:"generateForm",attrs:{data:t.widgetForm,remote:t.remoteFuncs,value:t.widgetModels}})],1):t._e(),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")])],1)])],1)},[],!1,null,"bcbc203c",null);a.options.__file="CModalWatchForm.vue";e.default=a.exports},kquR:function(t,e,n){"use strict";n.r(e);var i={name:"COrderBy",props:{orderbylist:{},value:{type:Array,default:function(){return[{name:"",by:"desc"}]}}},data:function(){return{}},mounted:function(){this.value[0].name||this.orderbylist.length&&(this.value[0].name=this.orderbylist[0].name)},methods:{remove:function(t){this.value.splice(t,1)},addorderby:function(){this.value.push({name:"",by:"desc"})}}},s=(n("Bxsd"),n("KHd+")),a=Object(s.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.orderbylist.length>0?n("div",t._l(t.value,function(e,i){return n("div",{key:i,staticStyle:{"margin-bottom":"5px"}},[t._v("\n\n            项目:\n            "),n("el-select",{staticStyle:{width:"150px"},model:{value:e.name,callback:function(n){t.$set(e,"name",n)},expression:"item.name"}},t._l(t.orderbylist,function(t){return n("el-option",{key:t.name,attrs:{label:t.zh_name,value:t.name}})})),t._v("\n            顺序：\n            "),n("el-select",{staticStyle:{width:"80px"},model:{value:e.by,callback:function(n){t.$set(e,"by",n)},expression:"item.by"}},[n("el-option",{attrs:{label:"↓",value:"desc"}}),t._v(" "),n("el-option",{attrs:{label:"↑",value:"asc"}})],1),t._v(" "),0!=i?n("el-tooltip",{staticStyle:{"margin-left":"5px"},attrs:{effect:"dark",content:"删除排序",placement:"top-start"}},[n("i",{staticClass:"el-icon-remove-outline",staticStyle:{cursor:"pointer"},on:{click:function(e){t.remove(i)}}})]):t._e(),t._v(" "),i==t.value.length-1?n("el-tooltip",{staticStyle:{"margin-left":"5px"},attrs:{effect:"dark",content:"添加排序",placement:"top-start"}},[n("i",{staticClass:"el-icon-circle-plus-outline",staticStyle:{cursor:"pointer"},on:{click:t.addorderby}})]):t._e()],1)})):t._e()])},[],!1,null,"084016fe",null);a.options.__file="COrderBy.vue";e.default=a.exports},lvaK:function(t,e,n){"use strict";n.r(e);var i=n("YEIV"),s=n.n(i),a=n("YCPF"),o=s()({name:"Cmodaldetail",props:{isAdmin:{type:Boolean,default:function(){return!1}}},components:{FlowDetail:a.default},data:function(){return{error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null,isFullScreen:!1}},watch:{},mounted:function(){},methods:{}},"methods",{cancel:function(){this.modalstatu=!1},toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},loadmodal:function(t,e,n){this.flowOi_id=t,console.log("flowOi_id",t),this.title=e,this.modalstatu=!0,this.nowfunid=n}}),l=(n("Lp68"),n("KHd+")),r=Object(l.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-dialog",{attrs:{fullscreen:!t.isPc||t.isFullScreen,title:t.title,width:"75%",visible:t.modalstatu,"close-on-click-modal":!1},on:{"update:visible":function(e){t.modalstatu=e}}},[t.isPc?n("span",{staticClass:"maxzoom"},[t.isFullScreen?n("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}}):n("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}})],1):t._e(),t._v(" "),t.modalstatu?n("div",[n("flow-detail",{attrs:{nowfunid:t.nowfunid,"flow-oi-id":t.flowOi_id,"is-admin":t.isAdmin},on:{"update:nowfunid":function(e){t.nowfunid=e},"update:flowOiId":function(e){t.flowOi_id=e}}})],1):t._e(),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancel}},[t._v("取 消")])],1)])],1)},[],!1,null,"1edda0f8",null);r.options.__file="CModalFlowDetail.vue";e.default=r.exports},ozoO:function(t,e,n){},pqUY:function(t,e,n){"use strict";n.r(e);var i=n("lYLF"),s=n("USVN"),a={name:"CModelCancel",props:{},data:function(){return{cancelModalStatus:!1,canCancelList:[],CancelCheckedNum:0,cancelReason:"",loading:!1,flowlistid:null,canAllCancel:!1,error:null}},mounted:function(){},watch:{canCancelList:{handler:function(t,e){var n=0;this.canCancelList.forEach(function(t){n+=t.check.length}),this.CancelCheckedNum=n},deep:!0}},methods:{tran_dealtype:function(t){return Object(s.f)(t)},loadCancelView:function(t){this.flowlistid=t,this.init()},init:function(){var t=this;this.cancelModalStatus=!0,this.loading=!0,this.canCancelList=[],this.CancelCheckedNum=0,this.cancelReason="",this.error=null,Object(i.g)({flowOi_id:this.flowlistid}).then(function(e){var n=e.data;if(t.loading=!1,n.success){var i=n.data.list;t.canAllCancel=n.data.canAllCancel,i.forEach(function(t){t.allcheck=!0,t.check=[],t.indeterminate=!1,t.group.forEach(function(e){t.check.push(e._id)})}),t.canCancelList=i}else t.$message.error(n.msg),t.error=n.msg})},getcanCancelChecked:function(){var t=[];return this.canCancelList.forEach(function(e){t=t.concat(e.check)}),t},sureCancelFlow:function(){var t=this;if(this.cancelReason){var e=this.getcanCancelChecked();0!=e.length&&(this.loading=!0,Object(i.w)({flowOi_id:this.flowlistid,flowmsgIdList:e,cancelReason:this.cancelReason}).then(function(e){var n=e.data;t.loading=!1,n.success?(t.cancelModalStatus=!1,t.$message.success(n.msg),t.$emit("on-cancel-success")):t.$message.error(n.msg)}))}else this.$message.warning("请输入取消原因")},whenAllCheckChange:function(t){if(t.indeterminate=!1,1==t.allcheck){var e=[];t.group.forEach(function(t){e.push(t._id)}),t.check=e}else t.check=[]},whenCheckChange:function(t){if(0==t.check.length)return t.allcheck=!1,void(t.indeterminate=!1);t.check.length==t.group.length?(t.allcheck=!0,t.indeterminate=!1):t.indeterminate=!0},sureAllCancelFlow:function(){var t=this;this.cancelReason?this.$confirm("此操作会把本流程相关的所有的通知、抄送、下发流程取消, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error"}).then(function(){t.loading=!0,Object(i.a)({flowOi_id:t.flowlistid,cancelReason:t.cancelReason}).then(function(e){var n=e.data;t.loading=!1,n.success?(t.cancelModalStatus=!1,t.$message.success(n.msg),t.$emit("on-cancel-success")):t.$message.error(n.msg)})}).catch(function(){}):this.$message.warning("请输入取消原因")}}},o=(n("RQ3R"),n("KHd+")),l=Object(o.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"padding-bottom":"0"},attrs:{fullscreen:!t.isPc,title:"可取消流程列表",visible:t.cancelModalStatus,width:"50%","append-to-body":""},on:{"update:visible":function(e){t.cancelModalStatus=e}}},[t.cancelModalStatus?n("div",[t.error?n("el-alert",{attrs:{closable:!1,title:t.error,type:"error"}}):n("div",[t.canAllCancel||0!=t.canCancelList.length?t._e():n("div",[t._v("无可取消消息")]),t._v(" "),t._l(t.canCancelList,function(e,i){return n("div",{key:i,staticClass:"pd5"},[n("el-checkbox",{attrs:{border:"",indeterminate:e.indeterminate,size:"medium"},on:{change:function(n){t.whenAllCheckChange(e)}},model:{value:e.allcheck,callback:function(n){t.$set(e,"allcheck",n)},expression:"item.allcheck"}},[t._v("\n                    "+t._s(e.NowFunName)+"——"+t._s(t.tran_dealtype(e.dealtype))+"\n                ")]),t._v(" "),n("el-checkbox-group",{staticClass:"cancheckbox_to",staticStyle:{"margin-left":"20px"},on:{change:function(n){t.whenCheckChange(e)}},model:{value:e.check,callback:function(n){t.$set(e,"check",n)},expression:"item.check"}},t._l(e.group,function(e){return n("el-checkbox",{key:e._id,attrs:{size:"mini",label:e._id}},[t._v(t._s(e.toer))])}))],1)}),t._v(" "),n("hr"),t._v(" "),0!=t.canCancelList.length||t.canAllCancel?n("div",{staticClass:"pd10"},[n("el-form",[n("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{required:"",label:"取消原因"}},[n("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入取消原因"},model:{value:t.cancelReason,callback:function(e){t.cancelReason=e},expression:"cancelReason"}})],1)],1)],1):t._e(),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.canAllCancel?n("el-tooltip",{attrs:{effect:"light",content:"取消该流程发出去的所有流程，包含通知与抄送，并标记为作废",placement:"top-start"}},[n("el-button",{staticClass:"text-right",attrs:{size:"small",type:"error"},on:{click:t.sureAllCancelFlow}},[t._v("全流程作废取消（包含通知与抄送）")])],1):t._e(),t._v(" "),0!=t.canCancelList.length?n("el-tooltip",{attrs:{effect:"light",content:"只取消上面勾选的流程",placement:"top-start"}},[t._v(t._s(t.CancelCheckedNum)+"\n                "),n("el-button",{attrs:{size:"small",type:"danger",disabled:0==t.CancelCheckedNum},on:{click:t.sureCancelFlow}},[t._v("\n                    确定取消\n                    "),t.CancelCheckedNum>0?n("span",[t._v("("+t._s(t.CancelCheckedNum)+")")]):t._e()])],1):t._e()],1)],2)],1):t._e()])},[],!1,null,"36314446",null);l.options.__file="CModalCancel.vue";e.default=l.exports},t96F:function(t,e,n){},v2A1:function(t,e,n){}}]);