(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d02d","chunk-120a","chunk-9c40","chunk-2ff5","chunk-b2dd","chunk-3326","chunk-481e"],{"/AME":function(e,t,n){"use strict";n.r(t);var i=n("79Hv"),s=n("USVN"),a={name:"CFlowPreviewSubmit",components:{Divider:i.default},props:{previewdata:{type:Object,default:function(){return null}},buttoninfo:{type:Object,default:function(){return null}}},data:function(){return{nextFlowList:[],nextSonFlowList:[],minishownumber:30}},activated:function(){},mounted:function(){this.initdata()},methods:{whenmsgcheckchange:function(e){if(console.log("whenmsgcheckchange"),0==e.msgcheck.length)return e.allmsgcheck=!1,void(e.msgisIndeterminate=!1);e.msgcheck.length==e.msglist.length?(e.allmsgcheck=!0,e.msgisIndeterminate=!1):e.msgisIndeterminate=!0},whencccheckchange:function(e){if(console.log("whencccheckchange"),0==e.cccheck.length)return e.allcccheck=!1,void(e.ccisIndeterminate=!1);e.cccheck.length==e.cclist.length?(e.allcccheck=!0,e.ccisIndeterminate=!1):e.ccisIndeterminate=!0},whenallmsgcheckchange:function(e){if(e.msgisIndeterminate=!1,1==e.allmsgcheck){var t=[];e.msglist.forEach(function(e){t.push(e.to)}),e.msgcheck=t}else e.msgcheck=[]},whenallcccheckchange:function(e){if(e.ccisIndeterminate=!1,1==e.allcccheck){var t=[];e.cclist.forEach(function(e){t.push(e.to)}),e.cccheck=t}else e.cccheck=[]},getdata:function(){var e=this,t=[];this.nextFlowList.forEach(function(e){t.push({funid:e.funid,dealtype:e.dealtype,funname:e.funname,cccheck:e.cccheck,msgcheck:e.msgcheck,flowcheck:e.check})});var n=!1;return t.forEach(function(t){t.flowcheck&&("orsign"==t.dealtype&&0==t.msgcheck.length&&(n=!0,e.$message.error("<"+t.funname+">或签不可为空")),"andsign"==t.dealtype&&0==t.msgcheck.length&&(n=!0,e.$message.error("<"+t.funname+">会签不可为空")))}),n?{}:{funlist:t,sonflows:this.nextSonFlowList}},tran_dealtype:function(e){return Object(s.f)(e)},getcheckboxlist:function(e){var t=[];return e.forEach(function(e){t.push(e.to)}),t},initdata:function(){var e=this;this.nextSonFlowList=[],this.previewdata.data&&this.previewdata.data.nextSonFlows&&this.previewdata.data.nextSonFlows.forEach(function(t){e.nextSonFlowList.push({flowname:t.n,flowid:t.v,check:!0})}),this.nextFlowList=[],this.previewdata.data&&this.previewdata.data.nextmessage&&this.previewdata.data.nextmessage.forEach(function(t){for(var n=!1,i=0;i<e.nextFlowList.length;i++){if(e.nextFlowList[i].funid==t.funid){n=!0;break}}n?(e.nextFlowList[i].msglist=t.list,e.nextFlowList[i].msgcheck=e.getcheckboxlist(t.list),e.nextFlowList[i].hidemsg=t.list.length>e.minishownumber):e.nextFlowList.push({allmsgcheck:!0,msgisIndeterminate:!1,ccisIndeterminate:!1,allcccheck:!0,check:!0,hidemsg:t.list.length>e.minishownumber,hidecc:!1,dealtype:t.dealtype,funname:t.funname,funid:t.funid,msglist:t.list,msgcheck:e.getcheckboxlist(t.list),cclist:[],cccheck:[]})}),this.previewdata.data&&this.previewdata.data.cc&&this.previewdata.data.cc.forEach(function(t){for(var n=!1,i=0;i<e.nextFlowList.length;i++){if(e.nextFlowList[i].funid==t.funid){n=!0;break}}n?(e.nextFlowList[i].cclist=t.list,e.nextFlowList[i].cccheck=e.getcheckboxlist(t.list),e.nextFlowList[i].hidecc=t.list.length>e.minishownumber):e.nextFlowList.push({allmsgcheck:!0,allcccheck:!0,msgisIndeterminate:!1,ccisIndeterminate:!1,check:!0,hidemsg:!1,hidecc:t.list.length>e.minishownumber,dealtype:"",funname:t.funname,funid:t.funid,cclist:t.list,cccheck:e.getcheckboxlist(t.list),msglist:[],msgcheck:[]})})}}},o=(n("i8Vn"),n("KHd+")),l=Object(o.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cflowpreviewsubmit"},[n("el-form",{attrs:{"label-width":e.isPc?"180px":null}},[n("el-form-item",{attrs:{label:"状态:"}},[e._v("\n        "+e._s(e.previewdata.msg)+"\n      ")]),e._v(" "),e.previewdata.data?n("el-form-item",{attrs:{label:"流程名称:"}},[e._v("\n        "+e._s(e.previewdata.data.flowname)+"\n      ")]):e._e(),e._v(" "),0==e.nextFlowList.length&&e.nextSonFlowList.length?n("div",[n("Divider",{staticClass:"fz13",attrs:{title:"无下一步环节"}})],1):e._e(),e._v(" "),e.nextSonFlowList.length>0?n("Divider",{staticStyle:{"margin-bottom":"0px"},attrs:{title:"下一步转交其他流程"}}):e._e(),e._v(" "),n("el-form-item",{staticClass:"fz12"},e._l(e.nextSonFlowList,function(t,i){return n("div",{key:i},[n("el-checkbox",{attrs:{disabled:!e.buttoninfo.canchoseflow},model:{value:t.check,callback:function(n){e.$set(t,"check",n)},expression:"flow.check"}},[n("span",{staticClass:"fz13"},[e._v("转发外部流程< "+e._s(t.flowname)+">")])])],1)})),e._v(" "),e.nextFlowList.length>0?n("Divider",{staticStyle:{"margin-bottom":"0px"},attrs:{title:"下一步转交流程"}}):e._e(),e._v(" "),e._l(e.nextFlowList,function(t,i){return n("el-form-item",{key:i,staticClass:"fz12",staticStyle:{"border-bottom":"1px dashed #c1c1c0"}},[n("div",[n("el-checkbox",{attrs:{disabled:!e.buttoninfo.canchoseflow},model:{value:t.check,callback:function(n){e.$set(t,"check",n)},expression:"flow.check"}},[n("span",{staticClass:"fz13"},[e._v("转发流程< "+e._s(t.funname)+">")])])],1),e._v(" "),t.msglist.length>0?n("div",{staticStyle:{"padding-left":"20px"}},[e._v("\n          转交处理人"),n("span",{staticClass:"label error"},[e._v(e._s(e.tran_dealtype(t.dealtype)))]),e._v(" "),n("br"),e._v(" "),n("el-checkbox",{attrs:{disabled:"andsign"==t.dealtype&&!e.buttoninfo.canchoseander||!t.check||"orsign"==t.dealtype&&!e.buttoninfo.canchoseorer||"message"==t.dealtype&&!e.buttoninfo.canchosecc,indeterminate:t.msgisIndeterminate},on:{change:function(n){e.whenallmsgcheckchange(t)}},model:{value:t.allmsgcheck,callback:function(n){e.$set(t,"allmsgcheck",n)},expression:"flow.allmsgcheck"}},[e._v("全/反选")]),e._v(" "),n("div",{staticClass:"accordionBox",class:{mustshow:t.msglist.length<e.minishownumber,hide:t.hidemsg,show:!t.hidemsg}},[n("el-checkbox-group",{attrs:{disabled:"andsign"==t.dealtype&&!e.buttoninfo.canchoseander||!t.check||"orsign"==t.dealtype&&!e.buttoninfo.canchoseorer||"message"==t.dealtype&&!e.buttoninfo.canchosecc},on:{change:function(n){e.whenmsgcheckchange(t)}},model:{value:t.msgcheck,callback:function(n){e.$set(t,"msgcheck",n)},expression:"flow.msgcheck"}},e._l(t.msglist,function(t,i){return n("span",{key:i,staticClass:"namelist fz12"},[n("el-checkbox",{attrs:{label:t.to}},[e._v(e._s(t.name))])],1)})),e._v(" "),n("div",{staticClass:"accordionHandler",on:{click:function(e){t.hidemsg=!t.hidemsg}}},[t.hidemsg?n("i",{staticClass:"el-icon-arrow-down"}):n("i",{staticClass:"el-icon-arrow-up"})])],1)],1):e._e(),e._v(" "),t.cclist.length>0?n("div",{staticStyle:{"padding-left":"20px"}},[e._v("\n          抄送人："),n("br"),e._v(" "),n("el-checkbox",{attrs:{disabled:!t.check||!e.buttoninfo.canchosecc,indeterminate:t.ccisIndeterminate},on:{change:function(n){e.whenallcccheckchange(t)}},model:{value:t.allcccheck,callback:function(n){e.$set(t,"allcccheck",n)},expression:"flow.allcccheck"}},[e._v("全/反选")]),e._v(" "),n("div",{staticClass:"accordionBox",class:{mustshow:t.cclist.length<e.minishownumber,hide:t.hidecc,show:!t.hidecc}},[n("el-checkbox-group",{attrs:{disabled:!t.check||!e.buttoninfo.canchosecc},on:{change:function(n){e.whencccheckchange(t)}},model:{value:t.cccheck,callback:function(n){e.$set(t,"cccheck",n)},expression:"flow.cccheck"}},e._l(t.cclist,function(t,i){return n("span",{key:i,staticClass:"namelist fz12"},[n("el-checkbox",{attrs:{label:t.to}},[e._v("\n                  "+e._s(t.name)+"\n                ")])],1)})),e._v(" "),n("div",{staticClass:"accordionHandler",on:{click:function(e){t.hidecc=!t.hidecc}}},[t.hidecc?n("i",{staticClass:"el-icon-arrow-down"}):n("i",{staticClass:"el-icon-arrow-up"})])],1)],1):e._e()])})],2)],1)},[],!1,null,"7ce29c48",null);l.options.__file="CFlowPreviewSubmit.vue";t.default=l.exports},"4Ita":function(e,t,n){"use strict";n.r(t);var i=n("FRYs"),s=n.n(i),a=n("lYLF"),o=n("Ts+a"),l={name:"FileList",components:{draggable:s.a,ModelShowImages:o.default},props:{fileList:{type:Array},flowlistid:{type:String},flowdesignid:{type:String},maxsize:{type:Number,default:function(){return 10}}},data:function(){return{extend_data:{},nowfileList:[],NowFileList:[],loading:!1}},methods:{showimage:function(e,t){this.$refs.showimages.showimage(e,t)},submitUpload:function(){var e=this;if(0!=this.NowFileList.length){var t=new FormData;for(var n in this.NowFileList.forEach(function(e){t.append("filename[]",e.raw,e.raw.filename)}),this.extend_data)t.append(n,this.extend_data[n]);this.loading=!0,Object(a.o)(t).then(function(t){var n=t.data;e.loading=!1,n.success?(e.setfileList(n.data),e.nowfileList=[],e.NowFileList=[]):e.$message.error(n.msg)}).catch(function(t){console.log("err",t),e.$message.error("上传失败，请重新上传;"+t.message)})}},getUnuploadLen:function(){return this.NowFileList.length},handleChange:function(e,t){console.log("fileList",t),console.log("nowfileList",this.nowfileList);for(var n=t.length-1;n>=0;n--){var i=t[n];i.size/1024/1024>=this.maxsize&&(this.$message.error(i.raw.name+"文件大于"+this.maxsize+"M"),t.splice(n,1))}this.nowfileList=t,this.NowFileList=t},handlePreview:function(e){this.$message.info("查看文件"+e.name)},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},handleRemove:function(e,t){console.log(e),console.log(t),this.nowfileList=t,this.NowFileList=t},handleError:function(e,t,n){this.$message.error("上传错误,请重新试试")},handleSuccess:function(e,t){console.log("response",e)},setfileList:function(e){var t=this;e.forEach(function(e){t.fileList.push(e)})},removefile:function(e){var t=this,n=this.fileList[e];this.$confirm("此操作将永久删除该文件["+n.name+"], 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deletefile(e)}).catch(function(){})},deletefile:function(e){var t=this;Object(a.n)({fileid:this.fileList[e].fileid}).then(function(n){var i=n.data;i.success?(t.$message.success(i.msg),t.fileList.splice(e,1)):t.$message.error(i.msg)}).catch(function(e){t.$message.error("删除文件失败")})}},mounted:function(){this.extend_data={flowlistid:this.flowlistid,flowdesign_id:this.flowdesignid}}},c=(n("nMr8"),n("KHd+")),r=Object(c.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[0==e.fileList.length?n("div",{staticClass:"fz13",staticStyle:{"padding-bottom":"10px"}},[e._v("当前未添加任何文件")]):n("div",{staticStyle:{"padding-bottom":"10px"}},[n("model-show-images",{ref:"showimages",attrs:{type:"files",files:e.fileList}}),e._v(" "),n("draggable",{model:{value:e.fileList,callback:function(t){e.fileList=t},expression:"fileList"}},e._l(e.fileList,function(t,i){return n("div",{key:i,staticClass:"fz12 pd5"},[n("span",[e._v(e._s(t.name)+" ")]),e._v(" "),"jpeg"==t.formats||"jpg"==t.formats||"png"==t.formats?n("i",{staticClass:"el-icon-picture-outline mg-r5 image_file_preview",staticStyle:{cursor:"pointer"},on:{click:function(n){e.showimage(t.fileid,e.fileList)}}}):e._e(),e._v(" "),n("a",{staticClass:"mg-r5",attrs:{target:e.isPc?"_blank":"_self",href:"/file/oa/"+t.fileid+"/"+t.name}},[n("v-icon",{attrs:{name:"eye"}})],1),e._v(" "),n("v-icon",{staticClass:"pointer",attrs:{name:"Trash"},on:{click:function(t){e.removefile(i)}}})],1)}))],1),e._v(" "),n("el-upload",{ref:"upload",staticClass:"editor-slide-upload",attrs:{"on-remove":e.handleRemove,action:"","on-change":e.handleChange,"on-success":e.handleSuccess,"auto-upload":!1,"file-list":e.nowfileList,multiple:""}},[n("el-button",{attrs:{slot:"trigger",size:"mini",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),e.NowFileList.length?n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini",type:"success"},on:{click:e.submitUpload}},[e._v("上传到服务器（"+e._s(e.NowFileList.length)+"）")]):e._e(),e._v(" "),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("可上传word,excel,图片等格式(txt/png/jpg/jpeg/doc/xlsx/xls/docx/doc)，且不超过"+e._s(e.maxsize)+"Mb")])],1)],1)},[],!1,null,null,null);r.options.__file="CFileList.vue";t.default=r.exports},"6alh":function(e,t,n){"use strict";var i=n("N4zm");n.n(i).a},"79Hv":function(e,t,n){"use strict";n.r(t);var i={name:"Divider",props:{title:{type:String,default:function(){return""}}}},s=(n("YnOI"),n("KHd+")),a=Object(s.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ivu-divider ivu-divider-horizontal ivu-divider-with-text-center"},[t("span",{staticClass:"ivu-divider-inner-text"},[this._v("\n    "+this._s(this.title)+"\n  ")])])},[],!1,null,null,null);a.options.__file="CDivider.vue";t.default=a.exports},Eyo1:function(e,t,n){"use strict";var i=n("R0gy");n.n(i).a},FRYs:function(e,t,n){"use strict";"function"==typeof Symbol&&Symbol.iterator;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}!function(){Array.from||(Array.from=function(e){return[].slice.call(e)});var t=n("U/5H");e.exports=function(e){function t(e){e.parentElement.removeChild(e)}function n(e,t,n){var i=0===n?e.children[0]:e.children[n-1].nextSibling;e.insertBefore(t,i)}function a(e,t){var n=this;this.$nextTick(function(){return n.$emit(e.toLowerCase(),t)})}var o=["Start","Add","Remove","Update","End"],l=["Choose","Sort","Filter","Clone"],c=["Move"].concat(o,l).map(function(e){return"on"+e}),r=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(e){return e}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(e){var t=this.$slots.default;if(t&&1===t.length){var n=t[0];n.componentOptions&&"transition-group"===n.componentOptions.tag&&(this.transitionMode=!0)}var i=0,a=t,o=this.$slots,l=o.header,c=o.footer;l&&(i=l.length,a=a?[].concat(s(l),s(a)):[].concat(s(l))),c&&(a=a?[].concat(s(a),s(c)):[].concat(s(c))),this.headerOffset=i;var r=null,u=function(e,t){r=function(e,t,n){return void 0==n?e:((e=null==e?{}:e)[t]=n,e)}(r,e,t)};if(u("attrs",this.$attrs),this.componentData){var d=this.componentData,h=d.on,f=d.props;u("on",h),u("props",f)}return e(this.element,r,a)},mounted:function(){var t=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var n={};o.forEach(function(e){n["on"+e]=function(e){var t=this;return function(n){null!==t.realList&&t["onDrag"+e](n),a.call(t,e,n)}}.call(t,e)}),l.forEach(function(e){n["on"+e]=a.bind(t,e)});var s=i({},this.options,n,{onMove:function(e,n){return t.onDragMove(e,n)}});!("draggable"in s)&&(s.draggable=">*"),this._sortable=new e(this.rootContainer,s),this.computeIndexes()},beforeDestroy:function(){void 0!==this._sortable&&this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(e){for(var t in e)-1==c.indexOf(t)&&this._sortable.option(t,e[t])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var e=this.$slots.default;return this.transitionMode?e[0].child.$slots.default:e},computeIndexes:function(){var e=this;this.$nextTick(function(){e.visibleIndexes=function(e,t,n){if(!e)return[];var i=e.map(function(e){return e.elm}),a=[].concat(s(t)).map(function(e){return i.indexOf(e)});return n?a.filter(function(e){return-1!==e}):a}(e.getChildrenNodes(),e.rootContainer.children,e.transitionMode)})},getUnderlyingVm:function(e){var t=function(e,t){return e.map(function(e){return e.elm}).indexOf(t)}(this.getChildrenNodes()||[],e);return-1===t?null:{index:t,element:this.realList[t]}},getUnderlyingPotencialDraggableComponent:function(e){var t=e.__vue__;return t&&t.$options&&"transition-group"===t.$options._componentTag?t.$parent:t},emitChanges:function(e){var t=this;this.$nextTick(function(){t.$emit("change",e)})},alterList:function(e){if(this.list)e(this.list);else{var t=[].concat(s(this.value));e(t),this.$emit("input",t)}},spliceList:function(){var e=arguments,t=function(t){return t.splice.apply(t,e)};this.alterList(t)},updatePosition:function(e,t){var n=function(n){return n.splice(t,0,n.splice(e,1)[0])};this.alterList(n)},getRelatedContextFromMoveEvent:function(e){var t=e.to,n=e.related,s=this.getUnderlyingPotencialDraggableComponent(t);if(!s)return{component:s};var a=s.realList,o={list:a,component:s};if(t!==n&&a&&s.getUnderlyingVm){var l=s.getUnderlyingVm(n);if(l)return i(l,o)}return o},getVmIndex:function(e){var t=this.visibleIndexes,n=t.length;return e>n-1?n:t[e]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(e){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[e].data=null;var t=this.getComponent();t.children=[],t.kept=void 0}},onDragStart:function(e){this.context=this.getUnderlyingVm(e.item),e.item._underlying_vm_=this.clone(this.context.element),r=e.item},onDragAdd:function(e){this.updateEvenemt(e);var n=e.item._underlying_vm_;if(void 0!==n){t(e.item);var i=this.getVmIndex(e.newIndex);this.spliceList(i,0,n),this.computeIndexes();var s={element:n,newIndex:i};this.emitChanges({added:s})}},onDragRemove:function(e){if(this.updateEvenemt(e),n(this.rootContainer,e.item,e.oldIndex),this.isCloning)t(e.clone);else{var i=this.context.index;this.spliceList(i,1);var s={element:this.context.element,oldIndex:i};this.resetTransitionData(i),this.emitChanges({removed:s})}},onDragUpdate:function(e){this.updateEvenemt(e),t(e.item),n(e.from,e.item,e.oldIndex);var i=this.context.index,s=this.getVmIndex(e.newIndex);this.updatePosition(i,s);var a={element:this.context.element,oldIndex:i,newIndex:s};this.emitChanges({moved:a})},updateEvenemt:function(e){this.updateProperty(e,"newIndex"),this.updateProperty(e,"oldIndex")},updateProperty:function(e,t){e.hasOwnProperty(t)&&(e[t]+=this.headerOffset)},computeFutureIndex:function(e,t){if(!e.element)return 0;var n=[].concat(s(t.to.children)).filter(function(e){return"none"!==e.style.display}),i=n.indexOf(t.related),a=e.component.getVmIndex(i);return-1==n.indexOf(r)&&t.willInsertAfter?a+1:a},onDragMove:function(e,t){var n=this.move;if(!n||!this.realList)return!0;var s=this.getRelatedContextFromMoveEvent(e),a=this.context,o=this.computeFutureIndex(s,e);return i(a,{futureIndex:o}),i(e,{relatedContext:s,draggedContext:a}),n(e,t)},onDragEnd:function(e){this.computeIndexes(),r=null}}}}(t)}()},H9at:function(e,t,n){},N4zm:function(e,t,n){},Pzxp:function(e,t,n){"use strict";var i=n("t69L");n.n(i).a},R0gy:function(e,t,n){},"Ts+a":function(e,t,n){"use strict";n.r(t);var i=n("P2sY"),s=n.n(i),a={name:"CModelShowImages",props:{type:{type:String,default:function(){return"flowlog"}},filelistlog:{type:Array,default:function(){return[]}},files:{type:Array,default:function(){return[]}}},computed:{preview_style:function(){return{transform:"rotate("+this.preview_rotate+"deg)"}}},data:function(){return{image_preview_model:!1,preview_file:null,preview_rotate:0}},mounted:function(){},methods:{rotateImage:function(){this.preview_rotate=(this.preview_rotate+90)%360},showimage:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=null;this.preview_file=null;var a=[];"flowlog"==this.type?(n&&(this.filelistlog=n),a=this.filelistlog):(n&&(this.files=n),a=[{files:this.files}]),a.forEach(function(n){n.files.forEach(function(a){a.fileid==e?(t.preview_file=s()({},a),t.preview_file.funname=n.funname?n.funname:null,t.preview_file.url=window.baseURL+"/file/oa/"+a.fileid+"/"+a.name,t.preview_file.previous_fileid=i,t.preview_rotate=0):"jpeg"!=a.formats&&"jpg"!=a.formats&&"png"!=a.formats||(t.preview_file?t.preview_file.next_fileid||(t.preview_file.next_fileid=a.fileid):i=a.fileid)})}),this.image_preview_model=!0}}},o=(n("Pzxp"),n("KHd+")),l=Object(o.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-dialog",{attrs:{fullscreen:!0,"append-to-body":"",title:e.preview_file?e.preview_file.name:"",visible:e.image_preview_model},on:{"update:visible":function(t){e.image_preview_model=t}}},[e.preview_file?n("div",[n("div",[n("div",{staticStyle:{float:"left"}},[e.preview_file.funname?n("div",[e._v("来自流程："+e._s(e.preview_file.funname))]):e._e(),e._v("\n     文件信息："+e._s(e.preview_file.name)),n("br"),e._v("\n     上传时间："+e._s(e.preview_file.created_at)),n("br"),e._v("\n     文件大小："+e._s(e.preview_file.size)),n("br")]),e._v(" "),n("div",{staticStyle:{float:"left",padding:"10px"}},[n("div",[n("el-button",{attrs:{size:"mini",disabled:!e.preview_file.previous_fileid,icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}}),e._v(" "),n("el-button",{attrs:{size:"mini",disabled:!e.preview_file.next_fileid},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[n("i",{staticClass:"el-icon-arrow-right el-icon--right"})]),e._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:e.rotateImage}},[n("i",{staticClass:"el-icon-refresh-right"})])],1)]),e._v(" "),n("div",{staticClass:"clear"})]),e._v(" "),n("div",{staticStyle:{"text-align":"center"}},[n("div",{staticStyle:{"min-height":"150px"}},[n("el-image",{staticStyle:{padding:"10px"},style:e.preview_style,attrs:{src:e.preview_file.url}},[n("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v("\n        加载中"),n("span",{staticClass:"dot"},[e._v("...")])])])],1),e._v(" "),n("div",{staticStyle:{position:"fixed",bottom:"10px",width:"100%"}},[n("el-button",{attrs:{size:"small",type:"primary",disabled:!e.preview_file.previous_fileid,icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}},[e._v("上一张图片")]),e._v(" "),n("el-button",{attrs:{size:"small",type:"primary",disabled:!e.preview_file.next_fileid},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[e._v("下一张图片"),n("i",{staticClass:"el-icon-arrow-right el-icon--right"})]),e._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rotateImage}},[e._v("旋转"),n("i",{staticClass:"el-icon-refresh-right el-icon--left"})])],1)])]):e._e()])],1)},[],!1,null,"58701459",null);l.options.__file="CModalShowImages.vue";t.default=l.exports},VLhH:function(e,t,n){},YnOI:function(e,t,n){"use strict";var i=n("H9at");n.n(i).a},anqC:function(e,t,n){"use strict";n.r(t);var i=n("USVN"),s={name:"CFlowDealSuccess",components:{},props:{data:{type:Object,default:function(){return null}}},data:function(){return{successMsg:"",nextMessages:[],nextCC:[],nextFlows:[],newGetFlowId:null}},activated:function(){},mounted:function(){this.initdata()},methods:{tran_dealtype:function(e){return Object(i.f)(e)},initdata:function(){var e=this.data;this.successMsg=e.msg,e.data&&(e.data.nextmessage&&(this.nextMessages=e.data.nextmessage),e.data.cc&&(this.nextCC=e.data.cc),e.data.sonflows&&(this.nextFlows=e.data.sonflows),e.data.flowlistid&&(this.newGetFlowId=e.data.flowlistid))}}},a=(n("6alh"),n("KHd+")),o=Object(a.a)(s,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cflowdealsuccess fz13",staticStyle:{"line-height":"22px"}},[n("div",[e._v(e._s(e.successMsg)+"\n        "),e.newGetFlowId?n("span"):e._e(),e._v(" "),0!=e.nextMessages.length?n("div",{staticStyle:{"margin-top":"10px"}},[e._v("\n            已转发下一流程至：\n            "),e._l(e.nextMessages,function(t,i){return n("div",{key:i,staticClass:"nextmsgList"},[e._v("\n                流程名称："),n("span",{staticClass:"label warning"},[e._v(e._s(t.funname))]),e._v(";\n                处理人： "),e._l(t.list,function(t,i){return n("span",{key:i,staticClass:"label success"},[e._v(e._s(t.name))])}),e._v(" "),0==t.list.length?n("span",[e._v("无")]):e._e(),e._v(" "),n("span",{staticClass:"label error"},[e._v(e._s(e.tran_dealtype(t.dealtype)))])],2)})],2):e._e(),e._v(" "),0!=e.nextCC.length?n("div",{staticStyle:{"margin-top":"10px"}},[e._v("\n            抄送至：\n            "),e._l(e.nextCC,function(t,i){return n("div",{key:i,staticClass:"nextccList"},[e._v("\n                流程名称："),n("span",{staticClass:"label warning"},[e._v(e._s(t.funname))]),e._v(";\n                抄送人："),e._l(t.list,function(t,i){return n("span",{key:i,staticClass:"label success"},[e._v(e._s(t.name))])}),e._v(" "),0==t.list.length?n("span",[e._v("无")]):e._e()],2)})],2):e._e(),e._v(" "),0!=e.nextFlows.length?n("div",{staticStyle:{"margin-top":"10px"}},[n("span",{staticClass:"text-underline"},[e._v("已转发至外部流程：")]),e._v(" "),e._l(e.nextFlows,function(t,i){return n("div",{key:i,staticClass:"sonflowList"},[e._v("\n                流程名称："),n("span",{staticClass:"label dark"},[n("v-icon",{staticClass:"fz12",staticStyle:{color:"white"},attrs:{name:"md-git-branch"}}),e._v("\n            "+e._s(t.flowname))],1),e._v("\n                状态："),t.flowlistid?n("span",[n("span",{staticClass:"label text"},[e._v("成功")]),n("span",{staticClass:"msg"},[e._v(e._s(t.msg))]),n("a",[e._v("查看")])]):n("span",[n("span",{staticClass:"label text"},[e._v("失败")]),n("span",{staticClass:"msg"},[e._v(e._s(t.msg))])])])})],2):e._e()])])},[],!1,null,"16563269",null);o.options.__file="CFlowDealSuccess.vue";t.default=o.exports},i8Vn:function(e,t,n){"use strict";var i=n("VLhH");n.n(i).a},k48p:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(e,t){if(!e)return"";var n,i,s,a,o=new Date(t),l=e.split(/\s+/gi),c=function(e,t){try{return parseInt(e,10)}catch(e){return t}},r=function(e){return e<10?"0"+e:e};return l.length>=2?(n=l[0].split(/[\/\-]/gi),i=l[1].split(":"),(s=new Date).setYear(c(n[0],o.getFullYear())),s.setMonth(c(n[1],o.getMonth()+1)-1),s.setDate(c(n[2],o.getDate())),s.setHours(c(i[0],o.getHours())),s.setMinutes(c(i[1],o.getMinutes())),s.setSeconds(c(i[2],o.getSeconds())),(a=o.getTime()-s.getTime())<=6e3?"1分钟内":a<36e5?Math.floor(a/6e4)+"分钟前":a<864e5?Math.floor(a/36e5)+"小时前":a<2592e5?Math.floor(a/864e5)+"天前":o.getFullYear()!=s.getFullYear()?[r(s.getFullYear()),r(s.getMonth()+1),r(s.getDate())].join("-"):[r(s.getMonth()+1),r(s.getDate())].join("-")):""}},nMr8:function(e,t,n){"use strict";var i=n("vEcc");n.n(i).a},qmOR:function(e,t,n){"use strict";n.r(t);var i=n("lYLF"),s=n("wThw"),a={name:"Cflowlist",components:{FlowCreat:n("M+QQ").default},mixins:[s.a],data:function(){return{cancreat:!1,searchFun:i.x,nowItem:null}},activated:function(){},mounted:function(){},methods:{initresultdata:function(){var e=this,t=this.$route.query;t.showid&&this.page.result.forEach(function(n){n._id!=t.showid||n.hasdone||e.creatflow(n)})},initsearch:function(){this.$set(this.search,"creatstatus","uncreat")},CreatSuccessHander:function(){console.log("创建成功"),this.setDone(this.nowItem)},setDone:function(e){var t=this;e&&Object(i.e)({id:e._id}).then(function(n){n.data.success?(e.hasdone=!0,t.flowBadge.needcreat--,t.$message.success("标记成功")):t.$message.error("标记失败")})},creatflow:function(e){var t=this;this.nowItem=e,this.cancreat=!1,setTimeout(function(){t.cancreat=!0,setTimeout(function(){t.$refs.flowcreat.creatform(e.flowid)},100)},100)}}},o=(n("Eyo1"),n("KHd+")),l=Object(o.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.cancreat?n("flow-creat",{ref:"flowcreat",on:{"on-success":e.CreatSuccessHander}}):e._e(),e._v(" "),e.error?n("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):n("div",[n("el-card",{staticStyle:{"margin-bottom":"20px"},attrs:{"body-style":{padding:"0px"}}},[n("div",{staticClass:"clearfix",attrs:{slot:"header","body-style":{padding:"0px"}},slot:"header"},[n("span",[n("i",{staticClass:"el-icon-search"}),e._v("\n            搜索栏\n          ")]),e._v(" "),e.searchbarShow?n("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:e.toggleSearchbarShow}},[e._v("关闭")]):n("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:e.toggleSearchbarShow}},[e._v("展开")])],1),e._v(" "),e.searchbarShow?n("el-form",{staticClass:"searchform_oa",staticStyle:{margin:"10px"},attrs:{size:"mini","label-width":"120px"}},[n("el-form-item",{attrs:{label:"流程名称"}},[n("el-input",{model:{value:e.search.flowname,callback:function(t){e.$set(e.search,"flowname",t)},expression:"search.flowname"}})],1),e._v(" "),e.search.creatstatus?n("el-form-item",{attrs:{label:"是否已创建"}},[n("el-radio-group",{model:{value:e.search.creatstatus,callback:function(t){e.$set(e.search,"creatstatus",t)},expression:"search.creatstatus"}},[n("el-radio",{attrs:{label:"creat"}},[e._v("已创建")]),e._v(" "),n("el-radio",{attrs:{label:"uncreat"}},[e._v("未创建")]),e._v(" "),n("el-radio",{attrs:{label:"all"}},[e._v("全部")])],1)],1):e._e(),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.searchSummit}},[e._v("搜索")])],1)],1):e._e()],1),e._v(" "),n("el-card",[e.searchloading?n("div",{staticClass:"box pd10 mg10 text-center"},[e._v("正在加载中。。。")]):e._e(),e._v(" "),0!=e.page.result.length||e.searchloading?e._e():n("div",{staticClass:"box pd10 mg10 text-center"},[e._v("无任何记录")]),e._v(" "),0!=e.page.result.length?n("div",{staticClass:"box"},[n("div",[e._v("\n                    共搜索到\n                    "),n("span",[e._v(e._s(e.page.totalItems))]),e._v("条信息\n                ")]),e._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.page.result,stripe:""}},[n("el-table-column",{attrs:{label:"流程名称",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("strong",[e._v(e._s(t.row.flowname))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"提醒时间",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.friendlytimejs(t.row.created_at)))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"描述",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.desc))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.hasdone?"已创建":"未创建"))]}}])}),e._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("el-button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){e.creatflow(i)}}},[e._v("创建")]),e._v(" "),i.hasdone?e._e():n("el-button",{attrs:{size:"mini"},on:{click:function(t){e.setDone(i)}}},[e._v("标记为完成")])]}}])})],1),e._v(" "),n("el-pagination",{attrs:{"current-page":e.page.currentPage,"page-size":e.page.pageSize,total:e.page.totalItems,background:"",layout:"prev, pager, next"},on:{"current-change":e.handerPageChange}})],1):e._e()])],1)],1)},[],!1,null,"71a90d5c",null);l.options.__file="CFlowListNeedCreat.vue";t.default=l.exports},t69L:function(e,t,n){},vEcc:function(e,t,n){},wThw:function(e,t,n){"use strict";var i=n("QbLZ"),s=n.n(i),a=n("L2JU"),o=n("k48p"),l=n("lYLF");t.a={name:"flowlist",computed:s()({},Object(a.e)({flowBadge:function(e){return e.user.flowBadge}})),components:{},data:function(){return{candeal:!1,searchFun:null,error:null,columns:[{title:"流程名称",slot:"flowdesignername"},{title:"流程描述",slot:"flow_desc"},{title:"流程创建时间",slot:"flow_created_at"},{title:"处理节点",slot:"flowstatusat"},{title:"可操作",slot:"action",width:150,align:"center"}],searchbarShow:!1,searchloading:!1,search_list:null,orderby_list:null,display_list:null,search:{s_isorder:null,s_orderby:null},page:{result:[],totalItems:0,pageSize:20,currentPage:1}}},methods:{initsearch:function(){},searchSummit:function(){this.searchdata(1)},friendlytimejs:function(e){return Object(o.a)(e,new Date)},seedetail:function(e){this.$refs.flowdetail.loadmodal(e.flowlistid,"查看 "+e.flowname+" 明细",e.NowFunid)},seedetail_and_set_read:function(e,t){var n=this;e.hasread||Object(l.C)({msgid:e._id}).then(function(i){i.data.success&&(e.hasread=1,"message"==t&&n.flowBadge.message--,"cc"==t&&n.flowBadge.cc--)}),this.seedetail(e)},dealflow_and_set_read:function(e,t){var n=this;e.hasread||Object(l.C)({msgid:e._id}).then(function(i){i.data.success&&(e.hasread=1,"message"==t&&n.flowBadge.message--,"cc"==t&&n.flowBadge.cc--)}),this.dealflow(e)},dealflow:function(e){var t=this;console.log("mesObj",e),this.candeal=!1,setTimeout(function(){t.candeal=!0,setTimeout(function(){t.$refs.flowdealer.loadmodal(e._id,e.flowlistid,"审批"+e.flowname+"<"+e.NowFunName+">",e.NowFunid)},100)},100)},handerPageChange:function(e){this.searchdata(e)},showflowgraph:function(){this.$message.info("此处后期显示流程图")},getflowfunByfunid:function(e,t){for(var n=0;n<e.funlist.length;n++){var i=e.funlist[n];if(i.id==t)return i}return null},initresultdata:function(){console.log(this.page)},searchdata:function(e){var t=this;this.searchloading?this.$message.warning("请勿重复提交表单"):(this.searchloading=!0,this.page.result=[],this.searchFun({nowpage:e,search:this.search}).then(function(e){var n=e.data;console.log(n),t.AfterSearch(n),t.searchloading=!1}))},AfterSearch:function(e){this.page=e.data,this.initresultdata()},toggleSearchbarShow:function(){this.searchbarShow=!this.searchbarShow,this.searchbarShow?window.localStorage.setItem("searchbarShow",1):window.localStorage.removeItem("searchbarShow")}},activated:function(){},mounted:function(){this.initsearch(),this.searchdata(1),this.searchbarShow=!!window.localStorage.getItem("searchbarShow")}}}}]);