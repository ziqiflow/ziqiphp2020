(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7fe9","chunk-ec0b"],{"4Ita":function(e,t,i){"use strict";i.r(t);var n=i("FRYs"),o=i.n(n),s=i("lYLF"),r=i("Ts+a"),l={name:"FileList",components:{draggable:o.a,ModelShowImages:r.default},props:{fileList:{type:Array},flowlistid:{type:String},flowdesignid:{type:String},maxsize:{type:Number,default:function(){return 10}}},data:function(){return{extend_data:{},nowfileList:[],NowFileList:[],loading:!1}},methods:{showimage:function(e,t){this.$refs.showimages.showimage(e,t)},submitUpload:function(){var e=this;if(0!=this.NowFileList.length){var t=new FormData;for(var i in this.NowFileList.forEach(function(e){t.append("filename[]",e.raw,e.raw.filename)}),this.extend_data)t.append(i,this.extend_data[i]);this.loading=!0,Object(s.o)(t).then(function(t){var i=t.data;e.loading=!1,i.success?(e.setfileList(i.data),e.nowfileList=[],e.NowFileList=[]):e.$message.error(i.msg)}).catch(function(t){console.log("err",t),e.$message.error("上传失败，请重新上传;"+t.message)})}},getUnuploadLen:function(){return this.NowFileList.length},handleChange:function(e,t){console.log("fileList",t),console.log("nowfileList",this.nowfileList);for(var i=t.length-1;i>=0;i--){var n=t[i];n.size/1024/1024>=this.maxsize&&(this.$message.error(n.raw.name+"文件大于"+this.maxsize+"M"),t.splice(i,1))}this.nowfileList=t,this.NowFileList=t},handlePreview:function(e){this.$message.info("查看文件"+e.name)},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},handleRemove:function(e,t){console.log(e),console.log(t),this.nowfileList=t,this.NowFileList=t},handleError:function(e,t,i){this.$message.error("上传错误,请重新试试")},handleSuccess:function(e,t){console.log("response",e)},setfileList:function(e){var t=this;e.forEach(function(e){t.fileList.push(e)})},removefile:function(e){var t=this,i=this.fileList[e];this.$confirm("此操作将永久删除该文件["+i.name+"], 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deletefile(e)}).catch(function(){})},deletefile:function(e){var t=this;Object(s.n)({fileid:this.fileList[e].fileid}).then(function(i){var n=i.data;n.success?(t.$message.success(n.msg),t.fileList.splice(e,1)):t.$message.error(n.msg)}).catch(function(e){t.$message.error("删除文件失败")})}},mounted:function(){this.extend_data={flowlistid:this.flowlistid,flowdesign_id:this.flowdesignid}}},a=(i("nMr8"),i("KHd+")),c=Object(a.a)(l,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[0==e.fileList.length?i("div",{staticClass:"fz13",staticStyle:{"padding-bottom":"10px"}},[e._v("当前未添加任何文件")]):i("div",{staticStyle:{"padding-bottom":"10px"}},[i("model-show-images",{ref:"showimages",attrs:{type:"files",files:e.fileList}}),e._v(" "),i("draggable",{model:{value:e.fileList,callback:function(t){e.fileList=t},expression:"fileList"}},e._l(e.fileList,function(t,n){return i("div",{key:n,staticClass:"fz12 pd5"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),"jpeg"==t.formats||"jpg"==t.formats||"png"==t.formats?i("i",{staticClass:"el-icon-picture-outline mg-r5 image_file_preview",staticStyle:{cursor:"pointer"},on:{click:function(i){e.showimage(t.fileid,e.fileList)}}}):e._e(),e._v(" "),i("a",{staticClass:"mg-r5",attrs:{target:e.isPc?"_blank":"_self",href:"/file/oa/"+t.fileid+"/"+t.name}},[i("v-icon",{attrs:{name:"eye"}})],1),e._v(" "),i("v-icon",{staticClass:"pointer",attrs:{name:"Trash"},on:{click:function(t){e.removefile(n)}}})],1)}))],1),e._v(" "),i("el-upload",{ref:"upload",staticClass:"editor-slide-upload",attrs:{"on-remove":e.handleRemove,action:"","on-change":e.handleChange,"on-success":e.handleSuccess,"auto-upload":!1,"file-list":e.nowfileList,multiple:""}},[i("el-button",{attrs:{slot:"trigger",size:"mini",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),e.NowFileList.length?i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini",type:"success"},on:{click:e.submitUpload}},[e._v("上传到服务器（"+e._s(e.NowFileList.length)+"）")]):e._e(),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("可上传word,excel,图片等格式(txt/png/jpg/jpeg/doc/xlsx/xls/docx/doc)，且不超过"+e._s(e.maxsize)+"Mb")])],1)],1)},[],!1,null,null,null);c.options.__file="CFileList.vue";t.default=c.exports},"6YAs":function(e,t,i){"use strict";var n=i("BU5R");i.n(n).a},BU5R:function(e,t,i){},FRYs:function(e,t,i){"use strict";"function"==typeof Symbol&&Symbol.iterator;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};function o(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}!function(){Array.from||(Array.from=function(e){return[].slice.call(e)});var t=i("U/5H");e.exports=function(e){function t(e){e.parentElement.removeChild(e)}function i(e,t,i){var n=0===i?e.children[0]:e.children[i-1].nextSibling;e.insertBefore(t,n)}function s(e,t){var i=this;this.$nextTick(function(){return i.$emit(e.toLowerCase(),t)})}var r=["Start","Add","Remove","Update","End"],l=["Choose","Sort","Filter","Clone"],a=["Move"].concat(r,l).map(function(e){return"on"+e}),c=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(e){return e}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(e){var t=this.$slots.default;if(t&&1===t.length){var i=t[0];i.componentOptions&&"transition-group"===i.componentOptions.tag&&(this.transitionMode=!0)}var n=0,s=t,r=this.$slots,l=r.header,a=r.footer;l&&(n=l.length,s=s?[].concat(o(l),o(s)):[].concat(o(l))),a&&(s=s?[].concat(o(s),o(a)):[].concat(o(a))),this.headerOffset=n;var c=null,u=function(e,t){c=function(e,t,i){return void 0==i?e:((e=null==e?{}:e)[t]=i,e)}(c,e,t)};if(u("attrs",this.$attrs),this.componentData){var f=this.componentData,d=f.on,h=f.props;u("on",d),u("props",h)}return e(this.element,c,s)},mounted:function(){var t=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var i={};r.forEach(function(e){i["on"+e]=function(e){var t=this;return function(i){null!==t.realList&&t["onDrag"+e](i),s.call(t,e,i)}}.call(t,e)}),l.forEach(function(e){i["on"+e]=s.bind(t,e)});var o=n({},this.options,i,{onMove:function(e,i){return t.onDragMove(e,i)}});!("draggable"in o)&&(o.draggable=">*"),this._sortable=new e(this.rootContainer,o),this.computeIndexes()},beforeDestroy:function(){void 0!==this._sortable&&this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(e){for(var t in e)-1==a.indexOf(t)&&this._sortable.option(t,e[t])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var e=this.$slots.default;return this.transitionMode?e[0].child.$slots.default:e},computeIndexes:function(){var e=this;this.$nextTick(function(){e.visibleIndexes=function(e,t,i){if(!e)return[];var n=e.map(function(e){return e.elm}),s=[].concat(o(t)).map(function(e){return n.indexOf(e)});return i?s.filter(function(e){return-1!==e}):s}(e.getChildrenNodes(),e.rootContainer.children,e.transitionMode)})},getUnderlyingVm:function(e){var t=function(e,t){return e.map(function(e){return e.elm}).indexOf(t)}(this.getChildrenNodes()||[],e);return-1===t?null:{index:t,element:this.realList[t]}},getUnderlyingPotencialDraggableComponent:function(e){var t=e.__vue__;return t&&t.$options&&"transition-group"===t.$options._componentTag?t.$parent:t},emitChanges:function(e){var t=this;this.$nextTick(function(){t.$emit("change",e)})},alterList:function(e){if(this.list)e(this.list);else{var t=[].concat(o(this.value));e(t),this.$emit("input",t)}},spliceList:function(){var e=arguments,t=function(t){return t.splice.apply(t,e)};this.alterList(t)},updatePosition:function(e,t){var i=function(i){return i.splice(t,0,i.splice(e,1)[0])};this.alterList(i)},getRelatedContextFromMoveEvent:function(e){var t=e.to,i=e.related,o=this.getUnderlyingPotencialDraggableComponent(t);if(!o)return{component:o};var s=o.realList,r={list:s,component:o};if(t!==i&&s&&o.getUnderlyingVm){var l=o.getUnderlyingVm(i);if(l)return n(l,r)}return r},getVmIndex:function(e){var t=this.visibleIndexes,i=t.length;return e>i-1?i:t[e]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(e){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[e].data=null;var t=this.getComponent();t.children=[],t.kept=void 0}},onDragStart:function(e){this.context=this.getUnderlyingVm(e.item),e.item._underlying_vm_=this.clone(this.context.element),c=e.item},onDragAdd:function(e){this.updateEvenemt(e);var i=e.item._underlying_vm_;if(void 0!==i){t(e.item);var n=this.getVmIndex(e.newIndex);this.spliceList(n,0,i),this.computeIndexes();var o={element:i,newIndex:n};this.emitChanges({added:o})}},onDragRemove:function(e){if(this.updateEvenemt(e),i(this.rootContainer,e.item,e.oldIndex),this.isCloning)t(e.clone);else{var n=this.context.index;this.spliceList(n,1);var o={element:this.context.element,oldIndex:n};this.resetTransitionData(n),this.emitChanges({removed:o})}},onDragUpdate:function(e){this.updateEvenemt(e),t(e.item),i(e.from,e.item,e.oldIndex);var n=this.context.index,o=this.getVmIndex(e.newIndex);this.updatePosition(n,o);var s={element:this.context.element,oldIndex:n,newIndex:o};this.emitChanges({moved:s})},updateEvenemt:function(e){this.updateProperty(e,"newIndex"),this.updateProperty(e,"oldIndex")},updateProperty:function(e,t){e.hasOwnProperty(t)&&(e[t]+=this.headerOffset)},computeFutureIndex:function(e,t){if(!e.element)return 0;var i=[].concat(o(t.to.children)).filter(function(e){return"none"!==e.style.display}),n=i.indexOf(t.related),s=e.component.getVmIndex(n);return-1==i.indexOf(c)&&t.willInsertAfter?s+1:s},onDragMove:function(e,t){var i=this.move;if(!i||!this.realList)return!0;var o=this.getRelatedContextFromMoveEvent(e),s=this.context,r=this.computeFutureIndex(o,e);return n(s,{futureIndex:r}),n(e,{relatedContext:o,draggedContext:s}),i(e,t)},onDragEnd:function(e){this.computeIndexes(),c=null}}}}(t)}()},"Ts+a":function(e,t,i){"use strict";i.r(t);var n=i("P2sY"),o=i.n(n),s={name:"CModelShowImages",props:{type:{type:String,default:function(){return"flowlog"}},filelistlog:{type:Array,default:function(){return[]}},files:{type:Array,default:function(){return[]}}},data:function(){return{image_preview_model:!1,preview_file:null}},mounted:function(){},methods:{showimage:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=null;this.preview_file=null;var s=[];"flowlog"==this.type?(i&&(this.filelistlog=i),s=this.filelistlog):(i&&(this.files=i),s=[{files:this.files}]),s.forEach(function(i){i.files.forEach(function(s){s.fileid==e?(t.preview_file=o()({},s),t.preview_file.funname=i.funname?i.funname:null,t.preview_file.url=window.baseURL+"/file/oa/"+s.fileid+"/"+s.name,t.preview_file.previous_fileid=n):"jpeg"!=s.formats&&"jpg"!=s.formats&&"png"!=s.formats||(t.preview_file?t.preview_file.next_fileid||(t.preview_file.next_fileid=s.fileid):n=s.fileid)})}),this.image_preview_model=!0}}},r=(i("6YAs"),i("KHd+")),l=Object(r.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{attrs:{fullscreen:!0,"append-to-body":"",title:e.preview_file?e.preview_file.name:"",visible:e.image_preview_model},on:{"update:visible":function(t){e.image_preview_model=t}}},[e.preview_file?i("div",[i("div",[i("div",{staticStyle:{float:"left"}},[e.preview_file.funname?i("div",[e._v("来自流程："+e._s(e.preview_file.funname))]):e._e(),e._v("\n     文件信息："+e._s(e.preview_file.name)),i("br"),e._v("\n     上传时间："+e._s(e.preview_file.created_at)),i("br"),e._v("\n     文件大小："+e._s(e.preview_file.size)),i("br")]),e._v(" "),i("div",{staticStyle:{float:"left",padding:"10px"}},[i("div",[i("el-button",{attrs:{size:"mini",disabled:!e.preview_file.previous_fileid,icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}}),e._v(" "),i("el-button",{attrs:{size:"mini",disabled:!e.preview_file.next_fileid},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[i("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)]),e._v(" "),i("div",{staticClass:"clear"})]),e._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("div",{staticStyle:{"min-height":"150px"}},[i("el-image",{staticStyle:{padding:"10px"},attrs:{src:e.preview_file.url}},[i("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v("\n        加载中"),i("span",{staticClass:"dot"},[e._v("...")])])])],1),e._v(" "),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-button",{attrs:{size:"small",type:"primary",disabled:!e.preview_file.previous_fileid,icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}},[e._v("上一张图片")]),e._v(" "),i("el-button",{attrs:{size:"small",type:"primary",disabled:!e.preview_file.next_fileid},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[e._v("下一张图片"),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)])]):e._e()])],1)},[],!1,null,"554d0b3e",null);l.options.__file="CModalShowImages.vue";t.default=l.exports},nMr8:function(e,t,i){"use strict";var n=i("vEcc");i.n(n).a},vEcc:function(e,t,i){}}]);