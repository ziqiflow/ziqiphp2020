webpackJsonp([4],{"5UQz":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("0CXz"),a=i("lVmZ"),n=i("SJcF"),o={name:"Cflowlist",components:{FlowCreat:a.a},mixins:[n.a],data:function(){return{cancreat:!1,searchFun:s.u,AllChecked:!1,nowItem:null,isEditMode:!1,nowCheckResult:[],shaixuanMode:!1,loading:!1}},mounted:function(){},watch:{AllChecked:function(e,t){if(this.AllChecked){var i=[];this.msgList.forEach(function(e){i.push(e._id)}),this.nowCheckResult=i}else this.nowCheckResult=[]},nowCheckResult:function(){this.AllChecked=this.nowCheckResult.length==this.msgList.length}},methods:{initresultdata:function(){var e=this,t=this.$route.query;t.showid&&this.msgList.forEach(function(i){i._id!=t.showid||i.hasdone||(console.log(i),e.gotonext(i))})},setDone:function(e){var t=this;e&&Object(s.b)({id:e._id}).then(function(i){i.data.success?(e.hasdone=!0,t.flowBadge.needcreat--,t.$message.success("标记成功")):t.$message.error("标记失败")})},CreatSuccessHander:function(){console.log("创建成功"),this.setDone(this.nowItem)},shaixuanRadioChanged:function(){localStorage.setItem("message.creatstatus","creat"==this.search.creatstatus?"all":this.search.creatstatus),this.searchdata(1)},initsearch:function(){var e=localStorage.getItem("message.creatstatus");this.inArray(e,["uncreat","creat","all"])&&!this.$route.query.showid||(e="uncreat"),this.$set(this.search,"creatstatus",e)},inArray:function(e,t){return t.some(function(t){return e===t})},setReaded:function(){var e=this;this.loading=!0,0!=this.nowCheckResult.length&&Object(s.b)({id:this.nowCheckResult.join("-")}).then(function(t){var i=t.data;e.loading=!1,i.success?(e.$message.success(i.msg),e.flowBadge.needcreat=e.flowBadge.needcreat-i.data,e.msgList.forEach(function(t){e.inArray(t._id,e.nowCheckResult)&&(t.hasdone=1)})):e.$message.error(i.msg),e.isEditMode=!1,e.nowCheckResult=[],e.AllChecked=!1})},gotonext:function(e){var t=this;this.isEditMode||(this.nowItem=e,this.cancreat=!1,setTimeout(function(){t.cancreat=!0,setTimeout(function(){t.$refs.flowcreat.creatform(e.flowid)},100)},100))}}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[e.cancreat?i("flow-creat",{ref:"flowcreat",on:{"on-success":e.CreatSuccessHander}}):e._e(),e._v(" "),i("div",{staticClass:"headerhandle"},[e.isEditMode?i("div",{staticClass:"pilian",on:{click:function(t){e.isEditMode=!1}}},[i("i",{staticClass:"el-icon-close"}),e._v("取消")]):i("div",{staticClass:"pilian",on:{click:function(t){e.isEditMode=!0}}},[i("i",{staticClass:"el-icon-edit"}),e._v("批量")]),e._v(" "),i("div",{staticClass:"v-search",staticStyle:{"padding-right":"46px"}},[i("van-search",{attrs:{placeholder:"搜索"},on:{search:function(t){return e.searchdata(1)},clear:function(t){return e.searchdata(1)}},model:{value:e.search.flowname,callback:function(t){e.$set(e.search,"flowname",t)},expression:"search.flowname"}})],1),e._v(" "),i("div",{staticClass:"shaixuan",on:{click:function(t){e.shaixuanMode=!e.shaixuanMode}}},[i("v-icon",{attrs:{name:"shaixuan"}}),e._v("筛选\n        ")],1)]),e._v(" "),e.shaixuanMode?i("div",{staticClass:"shaixuanBox"},[i("el-radio-group",{attrs:{size:"small"},on:{change:e.shaixuanRadioChanged},model:{value:e.search.creatstatus,callback:function(t){e.$set(e.search,"creatstatus",t)},expression:"search.creatstatus"}},[i("el-radio-button",{attrs:{label:"all"}},[e._v("全部")]),e._v(" "),i("el-radio-button",{attrs:{label:"uncreat"}},[e._v("未创建")]),e._v(" "),i("el-radio-button",{attrs:{label:"creat"}},[e._v("已创建")])],1)],1):e._e(),e._v(" "),i("van-pull-refresh",{on:{refresh:function(t){return e.searchdata(1)}},model:{value:e.pullloading,callback:function(t){e.pullloading=t},expression:"pullloading"}},[i("van-list",{attrs:{finished:this.page.finished,"finished-text":"没有更多了"},on:{load:e.listload},model:{value:e.listloading,callback:function(t){e.listloading=t},expression:"listloading"}},[i("van-checkbox-group",{model:{value:e.nowCheckResult,callback:function(t){e.nowCheckResult=t},expression:"nowCheckResult"}},e._l(e.msgList,function(t,s){return i("div",{key:s,staticClass:"msglist"},[i("div",{staticClass:"time"},[e._v(e._s(e.friendlytimejs(t.created_at)))]),e._v(" "),e.isEditMode?i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{name:t._id}})],1):e._e(),e._v(" "),i("div",{staticClass:"main",class:e.isEditMode?"editmode":""},[t.hasdone?e._e():i("div",{staticClass:"hasread"}),e._v(" "),i("div",{staticClass:"headerTitle"},[e._v("\n                            "+e._s(t.flowname)+"\n                        ")]),e._v(" "),i("div",{staticClass:"descTitle"},[e._v("\n                            "+e._s(t.desc)+"\n                            "),e.isEditMode?e._e():i("el-button",{staticStyle:{float:"right"},attrs:{size:"mini",type:"primary",plain:""},on:{click:function(i){return e.gotonext(t)}}},[e._v("创建")]),e._v(" "),i("div",{staticStyle:{clear:"both"}})],1)])])}),0)],1)],1),e._v(" "),e.isEditMode?i("div",{staticClass:"footer"},[i("van-checkbox",{staticStyle:{display:"inline-block",margin:"6px 0 0 10px"},model:{value:e.AllChecked,callback:function(t){e.AllChecked=t},expression:"AllChecked"}},[e._v("全选")]),e._v(" "),i("el-button",{staticStyle:{float:"right","margin-left":"10px"},attrs:{size:"small"},on:{click:function(t){e.isEditMode=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",disabled:!e.nowCheckResult.length,size:"small"},on:{click:e.setReaded}},[e._v("标记为已创建\n            "),e.nowCheckResult.length?i("span",[e._v("\n          ("+e._s(e.nowCheckResult.length)+")\n          ")]):e._e()])],1):e._e()],1)},staticRenderFns:[]};var r=i("VU/8")(o,l,!1,function(e){i("Ig1m")},"data-v-306b6e60",null);t.default=r.exports},DSPf:function(e,t){},Ig1m:function(e,t){},X5Du:function(e,t){},lVmZ:function(e,t,i){"use strict";var s=i("mvHQ"),a=i.n(s),n=i("Dd8w"),o=i.n(n),l=i("NYxO"),r=i("0CXz"),c=i("Xlh3"),d=i("Mpgp"),u=i("YFkb"),f=i("26O5"),h={name:"Cflowcreat",components:{FlowPreviewSubmit:d.a,FlowDealSuccess:u.a,FileList:f.a},computed:o()({},Object(l.c)({mydepts:function(e){return e.user.depts},userid:function(e){return e.user.id},username:function(e){return e.user.name}})),data:function(){return{PreviewModalStatus:!1,error:null,modalstatu:!1,title:null,flowid:null,loading:!1,designer:{nowfun:null},remoteFuncs:{},widgetForm:null,submitdata:null,widgetModels:{},flowdata:this.initFlowdata(),tempflowdata:null,tempwidgetModels:{},formDatatype:"new",successShow:!1,previewData:null,buttoninfo:null,btnindex:null,mydeptName:null,isFullScreen:!1,showgenerateForm:!1}},watch:{},mounted:function(){0==this.mydepts.length?(this.mydeptName="全公司",this.flowdata.dept="1"):1==this.mydepts.length&&(this.mydeptName=this.mydepts[0].n,this.flowdata.dept=this.mydepts[0].v)},methods:{initFlowdata:function(){return{Simulation_id:Date.parse(new Date)/1e3+""+Math.ceil(99999*Math.random()),desc:"",dept:null,fileList:[]}},shortSaveToggle:function(e){var t=this;this.formDatatype=e;var i=this.copyobject(this.$refs.generateForm.getDataWithOutValid()),s=this.copyobject(this.flowdata);this.widgetModels=this.copyobject(this.tempwidgetModels),this.flowdata=this.copyobject(this.tempflowdata),this.tempwidgetModels=i,this.tempflowdata=s,this.showgenerateForm=!1,setTimeout(function(){t.showgenerateForm=!0},100)},shortSaveClick:function(){var e=this;"new"==this.formDatatype&&this.tempflowdata&&!confirm("确定暂存当前表单内容吗？")||(this.loading=!0,Object(r.z)({type:"creat",flowid:this.flowid,flowdata:this.flowdata,inputdata:this.filterDisableItem(this.$refs.generateForm.getDataWithOutValid())}).then(function(t){var i=t.data;e.loading=!1,i.success?("new"==e.formDatatype&&(e.formDatatype="temp",e.tempflowdata=null,e.tempwidgetModels={}),e.$message.success(i.msg)):e.$message.error(i.msg)}))},toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},tran_dealtype:function(e){return Object(c.e)(e)},btnoksure:function(){var e=this;if(this.flowdata.desc){var t=this.$refs.flowpreviewsubmit.getdata(),i=t.funlist,s=t.sonflows;i&&(this.PreviewModalStatus=!1,this.$refs.generateForm.getData().then(function(t){var a=e.filterDisableItem(t);console.log(a),e.loading=!0,Object(r.f)({flowdata:e.flowdata,btnindex:e.btnindex,funid:e.designer.nowfun.id,flowid:e.flowid,inputdata:a,funlist:i,sonflows:s}).then(function(t){var i=t.data;e.loading=!1,i.success?(e.$notify({type:"success",title:"成功",message:i.msg}),e.submitdata=i,e.successShow=!0,e.$emit("on-success"),console.log(i)):e.$message.error(i.msg)})}).catch(function(t){console.log(t),console.log("有需求信息没有填写"),e.$message.error(t)}))}else this.$message.error("申请内容未填写")},btnok:function(e){var t=this;this.$refs.filelist.getUnuploadLen()&&!confirm("您有未上传的文件，建议上传后提交，确定忽略吗？")||(this.flowdata.desc?this.flowdata.dept?(this.previewData=null,console.log(this.designer.nowfun),this.buttoninfo=this.designer.nowfun.btnGroup[e],console.log("this.buttoninfo",this.buttoninfo),this.btnindex=e,this.$refs.generateForm.getData().then(function(i){var s=t.filterDisableItem(i);console.log(s),t.loading=!0,Object(r.g)({flowdata:t.flowdata,btnindex:e,funid:t.designer.nowfun.id,flowid:t.flowid,inputdata:s}).then(function(e){var i=e.data;t.loading=!1,i.success?(t.PreviewModalStatus=!0,t.previewData=i,console.log(i)):t.$message.error(i.msg)})}).catch(function(e){console.log(e),console.log("有需求信息没有填写"),t.$message.error(e)})):this.$message.error("所属部门不可为空"):this.$message.error("申请内容未填写"))},cancel:function(){this.modalstatu=!1},filterDisableItem:function(e){var t=this,i=function(e){for(var i=0;i<t.designer.datalist.length;i++){var s=t.designer.datalist[i];if(s.model==e)return s}return null},s={};for(var a in e)for(var n=i(a).key,o=0;o<this.designer.nowfun.formEditLimit.length;o++){var l=this.designer.nowfun.formEditLimit[o];if(l.key==n&&"canedit"==l.type){s[a]=e[a];break}}return s},leave_form_item_f2:function(e,t){for(var i=this,s=e.length-1;s>=0;s--){var a=e[s];if(a.columns)for(var n=0;n<a.columns.length;n++){var o=a.columns[n];this.leave_form_item_f2(o.list,t)}else{Object(c.d)(a),"table"==a.type&&(a.options.table_row_create={_createid:this.userid,_creater:this.username},a.options.table_row_update={_updateid:this.userid,_updater:this.username});var l=!1;if(t){var r=function(n){var o=t[n];if(!o.type)return"continue";if(a.key==o.key){switch(l=!0,"table"==a.type&&(a.options.table_delete=!!o.table_delete,a.options.table_add=!!o.table_add,a.options.table_edit=!!o.table_edit,a.options.tableset.forEach(function(e){var t=!1;o.son&&o.son.forEach(function(i){i.key==e.code&&(t=!0,e.required=i.required,e.limittype=i.type)}),t||(e.required=!1,e.limittype="readonly")})),o.type){case"canedit":console.log(o),a.options.disabled=!1,o.required?(a.options.required=!0,i.addrequiredrule(a.rules,a.name,a)):(a.options.required=!1,i.splicerequiredrule(a.rules));break;case"readonly":a.options.disabled=!0,a.options.required=!1,i.splicerequiredrule(a.rules);break;case"hidden":e.splice(s,1)}return"break"}};e:for(var d=0;d<t.length;d++){switch(r(d)){case"continue":continue;case"break":break e}}}l||(console.log("item",a),a.options.disabled=!0,a.options.required=!1,"table"==a.type&&(a.options.table_delete=!1,a.options.table_add=!1,a.options.table_edit=!1,a.options.tableset.forEach(function(e){e.limittype="readonly",e.required=!1})),this.splicerequiredrule(a.rules))}}},addrequiredrule:function(e,t,i){if(e){console.log("rules",e),console.log("name",t);for(var s=!1,a=0;a<e.length;a++){var n=e[a];void 0!==n.required&&(s=!0,n.required=!0)}if(!s){var o={required:!0,message:t+"必须填写"};e.push(o)}}},splicerequiredrule:function(e){if(e)for(var t=e.length-1;t>=0;t--){var i=e[t];void 0!==i.required&&(!0,i.required=!1)}},leave_form_item_f:function(e,t){for(var i=0;i<e.length;i++){var s=e[i];if(s.columns)for(var a=0;a<s.columns.length;a++){var n=s.columns[a];this.leave_form_item_f(n.list,t)}else{for(var o=!1,l=0;l<t.length;l++){var r=t[l];s.key==r&&(o=!0)}o||e.splice(i,1)}}},copyobject:function(e){return JSON.parse(a()(e))},initFromset:function(e){var t=null;if(!e.funlist)return null;e.funlist.forEach(function(e){e.is_start&&(t=e)});var i=this.copyobject(e.formset);if(t.formEditLimit)this.leave_form_item_f2(i.list,t.formEditLimit);else{if(0==t.requiredata.length)return null;t&&this.leave_form_item_f(i.list,t.requiredata)}return i},creatform:function(e){var t=this;this.widgetForm=null,this.modalstatu=!0,this.successShow=!1,this.flowid=e,this.title="加载中...",this.loading=!0,Object(r.n)({_id:e}).then(function(e){var i=e.data;if(t.loading=!1,i.success){if(!i.data)return void(t.error="没有查询到对应的流程");t.designer=i.data,console.log(t.designer),t.designer.funlist&&t.designer.funlist.forEach(function(e){e.is_start&&(t.designer.nowfun=e,console.log("fun",t.designer.nowfun))});var s=i.data.form_save;s&&(t.formDatatype="temp",t.tempflowdata=t.copyobject(t.flowdata),t.tempwidgetModels=t.copyobject(t.widgetModels),t.flowdata=s.flowdata,t.widgetModels=t.filterDisableItem(s.inputdata)),t.title="新建 "+t.designer.name,t.widgetForm=t.initFromset(t.designer),console.log("widgetForm",a()(t.widgetForm)),t.isPc||(t.widgetForm.config.labelWidth=null,t.widgetForm.config.labelPosition="top"),t.showgenerateForm=!0}else t.error=i.msg})}}},m={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"flowcreat"},[i("el-dialog",{attrs:{fullscreen:!e.isPc||e.isFullScreen,"close-on-click-modal":!1,title:e.title,visible:e.modalstatu,width:"75%"},on:{"update:visible":function(t){e.modalstatu=t}}},[e.isPc?i("span",{staticClass:"maxzoom"},[e.isFullScreen?i("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(t){return e.toggleFullScreen(t)}}}):i("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(t){return e.toggleFullScreen(t)}}})],1):e._e(),e._v(" "),i("el-dialog",{attrs:{fullscreen:!e.isPc,visible:e.PreviewModalStatus,title:"流程创建预览",width:"65%","append-to-body":""},on:{"update:visible":function(t){e.PreviewModalStatus=t}}},[e.previewData?i("div",[e.PreviewModalStatus?i("flow-preview-submit",{ref:"flowpreviewsubmit",attrs:{buttoninfo:e.buttoninfo,previewdata:e.previewData}}):e._e()],1):e._e(),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.PreviewModalStatus=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.btnoksure}},[e._v("确定提交")])],1)]),e._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[e.successShow?i("div",[i("flow-deal-success",{attrs:{data:e.submitdata}})],1):i("div",{staticClass:"flowcreatBox"},[e.tempflowdata?i("el-dropdown",{staticClass:"shortsave",attrs:{size:"mini","split-button":""},on:{click:e.shortSaveClick}},[e._v("\n                    暂存\n                    "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},["temp"==e.formDatatype?i("el-dropdown-item",{nativeOn:{click:function(t){return e.shortSaveToggle("new")}}},[e._v("恢复原表单内容")]):i("el-dropdown-item",{nativeOn:{click:function(t){return e.shortSaveToggle("temp")}}},[e._v("显示暂存内容")])],1)],1):i("el-button",{staticClass:"shortsave",attrs:{size:"mini"},on:{click:e.shortSaveClick}},[e._v("暂存")]),e._v(" "),i("el-form",{attrs:{"label-position":"top"}},[e.mydepts.length>1?i("el-form-item",{attrs:{required:"",label:"选择您所在的部门："}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.flowdata.dept,callback:function(t){e.$set(e.flowdata,"dept",t)},expression:"flowdata.dept"}},e._l(e.mydepts,function(e){return i("el-option",{key:e.v,attrs:{label:e.n,value:e.v}})}),1),e._v(" "),i("span",{staticClass:"fz12",staticStyle:{color:"red"}},[e._v("*由于您同时属于两个部门，先选择你提交此申请的部门")])],1):i("el-form-item",[e._v("\n\n                        您所在的部门：\n                        "),i("span",{staticClass:"mydeptname"},[e._v("\n                          "+e._s(e.mydeptName)+"\n                        ")])]),e._v(" "),i("el-form-item",{attrs:{required:"",label:"一句话简单描述："}},[i("el-input",{attrs:{placeholder:"请一句话介绍申请内容（必填）"},model:{value:e.flowdata.desc,callback:function(t){e.$set(e.flowdata,"desc",t)},expression:"flowdata.desc"}})],1)],1),e._v(" "),e.widgetForm?i("div",[i("el-card",{class:0==e.widgetForm.list.length?"nocard":""},[e.widgetForm.list.length>0?i("div",{staticStyle:{"margin-bottom":"10px",color:"#ff6600"}},[e._v("需填写内容：\n                            "),e._v(" "),i("hr")]):e._e(),e._v(" "),e.showgenerateForm?i("fm-generate-form",{ref:"generateForm",staticClass:"generateForm",attrs:{data:e.widgetForm,remote:e.remoteFuncs,value:e.widgetModels},on:{"update:data":function(t){e.widgetForm=t}},scopedSlots:e._u([{key:"blank",fn:function(t){return[e._v("\n                                宽度：\n                                "),i("el-input",{staticStyle:{width:"100px"},model:{value:t.model.blank.width,callback:function(i){e.$set(t.model.blank,"width",i)},expression:"scope.model.blank.width"}}),e._v("\n                                高度：\n                                "),i("el-input",{staticStyle:{width:"100px"},model:{value:t.model.blank.height,callback:function(i){e.$set(t.model.blank,"height",i)},expression:"scope.model.blank.height"}})]}}])}):e._e()],1),e._v(" "),i("el-card",{staticStyle:{"margin-top":"14px"},attrs:{shadow:"never"}},[i("div",{staticClass:"mg-b5",staticStyle:{"font-weight":"border"}},[e._v("文件附件：")]),e._v(" "),i("div",[i("file-list",{ref:"filelist",staticClass:"pd10",attrs:{flowlistid:e.flowdata.Simulation_id,flowdesignid:e.flowid,fileList:e.flowdata.fileList}})],1)])],1):e._e()],1)]),e._v(" "),e.loading?e._e():i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:e.cancel}},[e._v("取 消")]),e._v(" "),e.designer.nowfun&&!e.successShow?e._l(e.designer.nowfun.btnGroup,function(t,s){return i("el-button",{key:s,attrs:{size:"medium"},on:{click:function(t){return e.btnok(s)}}},[e._v(e._s(t.name))])}):e._e()],2)],1)],1)},staticRenderFns:[]};var v=i("VU/8")(h,m,!1,function(e){i("X5Du"),i("DSPf")},"data-v-49ef0112",null);t.a=v.exports}});