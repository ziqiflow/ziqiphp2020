(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2b7a"],{"1rJ1":function(e,t,i){},"M+QQ":function(e,t,i){"use strict";i.r(t);var o=i("gDS+"),s=i.n(o),a=i("QbLZ"),n=i.n(a),l=i("L2JU"),r=i("lYLF"),d=i("USVN"),c=i("/AME"),u=i("anqC"),f=i("4Ita"),m={name:"Cflowcreat",components:{FlowPreviewSubmit:c.default,FlowDealSuccess:u.default,FileList:f.default},computed:n()({},Object(l.e)({mydepts:function(e){return e.user.depts},userid:function(e){return e.user.id},username:function(e){return e.user.name}})),data:function(){return{PreviewModalStatus:!1,error:null,modalstatu:!1,title:null,flowid:null,loading:!1,designer:{nowfun:null},remoteFuncs:{},widgetForm:null,submitdata:null,widgetModels:{},flowdata:this.initFlowdata(),tempflowdata:null,tempwidgetModels:{},formDatatype:"new",successShow:!1,previewData:null,buttoninfo:null,btnindex:null,mydeptName:null,isFullScreen:!1,showgenerateForm:!1}},watch:{},mounted:function(){0==this.mydepts.length?(this.mydeptName="全公司",this.flowdata.dept="1"):1==this.mydepts.length&&(this.mydeptName=this.mydepts[0].n,this.flowdata.dept=this.mydepts[0].v)},methods:{initFlowdata:function(){return{Simulation_id:Date.parse(new Date)/1e3+""+Math.ceil(99999*Math.random()),desc:"",dept:null,fileList:[]}},shortSaveToggle:function(e){var t=this;this.formDatatype=e;var i=this.copyobject(this.$refs.generateForm.getDataWithOutValid()),o=this.copyobject(this.flowdata);this.widgetModels=this.copyobject(this.tempwidgetModels),this.flowdata=this.copyobject(this.tempflowdata),this.tempwidgetModels=i,this.tempflowdata=o,this.showgenerateForm=!1,setTimeout(function(){t.showgenerateForm=!0},100)},shortSaveClick:function(){var e=this;"new"==this.formDatatype&&this.tempflowdata&&!confirm("确定暂存当前表单内容吗？")||(this.loading=!0,Object(r.D)({type:"creat",flowid:this.flowid,flowdata:this.flowdata,inputdata:this.filterDisableItem(this.$refs.generateForm.getDataWithOutValid())}).then(function(t){var i=t.data;e.loading=!1,i.success?("new"==e.formDatatype&&(e.formDatatype="temp",e.tempflowdata=null,e.tempwidgetModels={}),e.$message.success(i.msg)):e.$message.error(i.msg)}))},toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},tran_dealtype:function(e){return Object(d.f)(e)},btnoksure:function(){var e=this;if(this.flowdata.desc){var t=this.$refs.flowpreviewsubmit.getdata(),i=t.funlist,o=t.sonflows;i&&(this.PreviewModalStatus=!1,this.$refs.generateForm.getData().then(function(t){var s=e.filterDisableItem(t);console.log(s),e.loading=!0,Object(r.i)({flowdata:e.flowdata,btnindex:e.btnindex,funid:e.designer.nowfun.id,flowid:e.flowid,inputdata:s,funlist:i,sonflows:o}).then(function(t){var i=t.data;e.loading=!1,i.success?(e.$notify({type:"success",title:"成功",message:i.msg}),e.submitdata=i,e.successShow=!0,e.$emit("on-success"),console.log(i)):e.$message.error(i.msg)})}).catch(function(t){console.log(t),console.log("有需求信息没有填写"),e.$message.error(t)}))}else this.$message.error("申请内容未填写")},btnok:function(e){var t=this;this.$refs.filelist.getUnuploadLen()&&!confirm("您有未上传的文件，建议上传后提交，确定忽略吗？")||(this.flowdata.desc?this.flowdata.dept?(this.previewData=null,console.log(this.designer.nowfun),this.buttoninfo=this.designer.nowfun.btnGroup[e],console.log("this.buttoninfo",this.buttoninfo),this.btnindex=e,this.$refs.generateForm.getData().then(function(i){var o=t.filterDisableItem(i);console.log(o),t.loading=!0,Object(r.j)({flowdata:t.flowdata,btnindex:e,funid:t.designer.nowfun.id,flowid:t.flowid,inputdata:o}).then(function(e){var i=e.data;t.loading=!1,i.success?(t.PreviewModalStatus=!0,t.previewData=i,console.log(i)):t.$message.error(i.msg)})}).catch(function(e){console.log(e),console.log("有需求信息没有填写"),t.$message.error(e)})):this.$message.error("所属部门不可为空"):this.$message.error("申请内容未填写"))},cancel:function(){this.modalstatu=!1},filterDisableItem:function(e){var t=this,i=function(e){for(var i=0;i<t.designer.datalist.length;i++){var o=t.designer.datalist[i];if(o.model==e)return o}return null},o={};for(var s in e)for(var a=i(s).key,n=0;n<this.designer.nowfun.formEditLimit.length;n++){var l=this.designer.nowfun.formEditLimit[n];if(l.key==a&&"canedit"==l.type){o[s]=e[s];break}}return o},leave_form_item_f2:function(e,t){for(var i=this,o=e.length-1;o>=0;o--){var s=e[o];if(s.columns)for(var a=0;a<s.columns.length;a++){var n=s.columns[a];this.leave_form_item_f2(n.list,t)}else{Object(d.e)(s),"table"==s.type&&(s.options.table_row_create={_createid:this.userid,_creater:this.username},s.options.table_row_update={_updateid:this.userid,_updater:this.username});var l=!1;if(t){var r=function(a){var n=t[a];if(!n.type)return"continue";if(s.key==n.key){switch(l=!0,"table"==s.type&&(s.options.table_delete=!!n.table_delete,s.options.table_add=!!n.table_add,s.options.table_edit=!!n.table_edit,s.options.tableset.forEach(function(e){var t=!1;n.son&&n.son.forEach(function(i){i.key==e.code&&(t=!0,e.required=i.required,e.limittype=i.type)}),t||(e.required=!1,e.limittype="readonly")})),n.type){case"canedit":console.log(n),s.options.disabled=!1,n.required?(s.options.required=!0,i.addrequiredrule(s.rules,s.name,s)):(s.options.required=!1,i.splicerequiredrule(s.rules));break;case"readonly":s.options.disabled=!0,s.options.required=!1,i.splicerequiredrule(s.rules);break;case"hidden":e.splice(o,1)}return"break"}};e:for(var c=0;c<t.length;c++){switch(r(c)){case"continue":continue;case"break":break e}}}l||(console.log("item",s),s.options.disabled=!0,s.options.required=!1,"table"==s.type&&(s.options.table_delete=!1,s.options.table_add=!1,s.options.table_edit=!1,s.options.tableset.forEach(function(e){e.limittype="readonly",e.required=!1})),this.splicerequiredrule(s.rules))}}},addrequiredrule:function(e,t,i){if(e){console.log("rules",e),console.log("name",t);for(var o=!1,s=0;s<e.length;s++){var a=e[s];void 0!==a.required&&(o=!0,a.required=!0)}if(!o){var n={required:!0,message:t+"必须填写"};e.push(n)}}},splicerequiredrule:function(e){if(e)for(var t=e.length-1;t>=0;t--){var i=e[t];void 0!==i.required&&(!0,i.required=!1)}},leave_form_item_f:function(e,t){for(var i=0;i<e.length;i++){var o=e[i];if(o.columns)for(var s=0;s<o.columns.length;s++){var a=o.columns[s];this.leave_form_item_f(a.list,t)}else{for(var n=!1,l=0;l<t.length;l++){var r=t[l];o.key==r&&(n=!0)}n||e.splice(i,1)}}},copyobject:function(e){return JSON.parse(s()(e))},initFromset:function(e){var t=null;if(!e.funlist)return null;e.funlist.forEach(function(e){e.is_start&&(t=e)});var i=this.copyobject(e.formset);if(t.formEditLimit)this.leave_form_item_f2(i.list,t.formEditLimit);else{if(0==t.requiredata.length)return null;t&&this.leave_form_item_f(i.list,t.requiredata)}return i},creatform:function(e){var t=this;this.widgetForm=null,this.modalstatu=!0,this.successShow=!1,this.flowid=e,this.title="加载中...",this.loading=!0,Object(r.q)({_id:e}).then(function(e){var i=e.data;if(t.loading=!1,i.success){if(!i.data)return void(t.error="没有查询到对应的流程");t.designer=i.data,console.log(t.designer),t.designer.funlist&&t.designer.funlist.forEach(function(e){e.is_start&&(t.designer.nowfun=e,console.log("fun",t.designer.nowfun))});var o=i.data.form_save;o&&(t.formDatatype="temp",t.tempflowdata=t.copyobject(t.flowdata),t.tempwidgetModels=t.copyobject(t.widgetModels),t.flowdata=o.flowdata,t.widgetModels=t.filterDisableItem(o.inputdata)),t.title="新建 "+t.designer.name,t.widgetForm=t.initFromset(t.designer),console.log("widgetForm",s()(t.widgetForm)),t.isPc||(t.widgetForm.config.labelWidth=null,t.widgetForm.config.labelPosition="top"),t.showgenerateForm=!0}else t.error=i.msg})}}},p=(i("Zxe5"),i("ljLp"),i("KHd+")),g=Object(p.a)(m,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"flowcreat"},[i("el-dialog",{attrs:{fullscreen:!e.isPc||e.isFullScreen,"close-on-click-modal":!1,title:e.title,visible:e.modalstatu,width:"75%"},on:{"update:visible":function(t){e.modalstatu=t}}},[e.isPc?i("span",{staticClass:"maxzoom"},[e.isFullScreen?i("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(t){return e.toggleFullScreen(t)}}}):i("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(t){return e.toggleFullScreen(t)}}})],1):e._e(),e._v(" "),i("el-dialog",{attrs:{fullscreen:!e.isPc,visible:e.PreviewModalStatus,title:"流程创建预览",width:"65%","append-to-body":""},on:{"update:visible":function(t){e.PreviewModalStatus=t}}},[e.previewData?i("div",[e.PreviewModalStatus?i("flow-preview-submit",{ref:"flowpreviewsubmit",attrs:{buttoninfo:e.buttoninfo,previewdata:e.previewData}}):e._e()],1):e._e(),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.PreviewModalStatus=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.btnoksure}},[e._v("确定提交")])],1)]),e._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[e.successShow?i("div",[i("flow-deal-success",{attrs:{data:e.submitdata}})],1):i("div",{staticClass:"flowcreatBox"},[e.tempflowdata?i("el-dropdown",{staticClass:"shortsave",attrs:{size:"mini","split-button":""},on:{click:e.shortSaveClick}},[e._v("\n                    暂存\n                    "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},["temp"==e.formDatatype?i("el-dropdown-item",{nativeOn:{click:function(t){e.shortSaveToggle("new")}}},[e._v("恢复原表单内容")]):i("el-dropdown-item",{nativeOn:{click:function(t){e.shortSaveToggle("temp")}}},[e._v("显示暂存内容")])],1)],1):i("el-button",{staticClass:"shortsave",attrs:{size:"mini"},on:{click:e.shortSaveClick}},[e._v("暂存")]),e._v(" "),i("el-form",{attrs:{"label-position":"top"}},[e.mydepts.length>1?i("el-form-item",{attrs:{required:"",label:"选择您所在的部门："}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.flowdata.dept,callback:function(t){e.$set(e.flowdata,"dept",t)},expression:"flowdata.dept"}},e._l(e.mydepts,function(e){return i("el-option",{key:e.v,attrs:{label:e.n,value:e.v}})})),e._v(" "),i("span",{staticClass:"fz12",staticStyle:{color:"red"}},[e._v("*由于您同时属于两个部门，先选择你提交此申请的部门")])],1):i("el-form-item",[e._v("\n\n                        您所在的部门：\n                        "),i("span",{staticClass:"mydeptname"},[e._v("\n                          "+e._s(e.mydeptName)+"\n                        ")])]),e._v(" "),i("el-form-item",{attrs:{required:"",label:"一句话简单描述："}},[i("el-input",{attrs:{placeholder:"请一句话介绍申请内容（必填）"},model:{value:e.flowdata.desc,callback:function(t){e.$set(e.flowdata,"desc",t)},expression:"flowdata.desc"}})],1)],1),e._v(" "),e.widgetForm?i("div",[i("el-card",{class:0==e.widgetForm.list.length?"nocard":""},[e.widgetForm.list.length>0?i("div",{staticStyle:{"margin-bottom":"10px",color:"#ff6600"}},[e._v("需填写内容：\n                            "),e._v(" "),i("hr")]):e._e(),e._v(" "),e.showgenerateForm?i("fm-generate-form",{ref:"generateForm",staticClass:"generateForm",attrs:{data:e.widgetForm,remote:e.remoteFuncs,value:e.widgetModels},on:{"update:data":function(t){e.widgetForm=t}},scopedSlots:e._u([{key:"blank",fn:function(t){return[e._v("\n                                宽度：\n                                "),i("el-input",{staticStyle:{width:"100px"},model:{value:t.model.blank.width,callback:function(i){e.$set(t.model.blank,"width",i)},expression:"scope.model.blank.width"}}),e._v("\n                                高度：\n                                "),i("el-input",{staticStyle:{width:"100px"},model:{value:t.model.blank.height,callback:function(i){e.$set(t.model.blank,"height",i)},expression:"scope.model.blank.height"}})]}}])}):e._e()],1),e._v(" "),i("el-card",{staticStyle:{"margin-top":"14px"},attrs:{shadow:"never"}},[i("div",{staticClass:"mg-b5",staticStyle:{"font-weight":"border"}},[e._v("文件附件：")]),e._v(" "),i("div",[i("file-list",{ref:"filelist",staticClass:"pd10",attrs:{flowlistid:e.flowdata.Simulation_id,flowdesignid:e.flowid,fileList:e.flowdata.fileList}})],1)])],1):e._e()],1)]),e._v(" "),e.loading?e._e():i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:e.cancel}},[e._v("取 消")]),e._v(" "),e.designer.nowfun&&!e.successShow?e._l(e.designer.nowfun.btnGroup,function(t,o){return i("el-button",{key:o,attrs:{size:"medium"},on:{click:function(t){e.btnok(o)}}},[e._v(e._s(t.name))])}):e._e()],2)],1)],1)},[],!1,null,"b3ff61a8",null);g.options.__file="CFlowCreat.vue";t.default=g.exports},MgAA:function(e,t,i){},Zxe5:function(e,t,i){"use strict";var o=i("MgAA");i.n(o).a},ljLp:function(e,t,i){"use strict";var o=i("1rJ1");i.n(o).a}}]);