(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ec0b"],{"6YAs":function(e,i,l){"use strict";var t=l("BU5R");l.n(t).a},BU5R:function(e,i,l){},"Ts+a":function(e,i,l){"use strict";l.r(i);var t=l("P2sY"),n=l.n(t),r={name:"CModelShowImages",props:{type:{type:String,default:function(){return"flowlog"}},filelistlog:{type:Array,default:function(){return[]}},files:{type:Array,default:function(){return[]}}},data:function(){return{image_preview_model:!1,preview_file:null}},mounted:function(){},methods:{showimage:function(e){var i=this,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=null;this.preview_file=null;var r=[];"flowlog"==this.type?(l&&(this.filelistlog=l),r=this.filelistlog):(l&&(this.files=l),r=[{files:this.files}]),r.forEach(function(l){l.files.forEach(function(r){r.fileid==e?(i.preview_file=n()({},r),i.preview_file.funname=l.funname?l.funname:null,i.preview_file.url=window.baseURL+"/file/oa/"+r.fileid+"/"+r.name,i.preview_file.previous_fileid=t):"jpeg"!=r.formats&&"jpg"!=r.formats&&"png"!=r.formats||(i.preview_file?i.preview_file.next_fileid||(i.preview_file.next_fileid=r.fileid):t=r.fileid)})}),this.image_preview_model=!0}}},s=(l("6YAs"),l("KHd+")),a=Object(s.a)(r,function(){var e=this,i=e.$createElement,l=e._self._c||i;return l("div",[l("el-dialog",{attrs:{fullscreen:!0,"append-to-body":"",title:e.preview_file?e.preview_file.name:"",visible:e.image_preview_model},on:{"update:visible":function(i){e.image_preview_model=i}}},[e.preview_file?l("div",[l("div",[l("div",{staticStyle:{float:"left"}},[e.preview_file.funname?l("div",[e._v("来自流程："+e._s(e.preview_file.funname))]):e._e(),e._v("\n     文件信息："+e._s(e.preview_file.name)),l("br"),e._v("\n     上传时间："+e._s(e.preview_file.created_at)),l("br"),e._v("\n     文件大小："+e._s(e.preview_file.size)),l("br")]),e._v(" "),l("div",{staticStyle:{float:"left",padding:"10px"}},[l("div",[l("el-button",{attrs:{size:"mini",disabled:!e.preview_file.previous_fileid,icon:"el-icon-arrow-left"},on:{click:function(i){e.showimage(e.preview_file.previous_fileid)}}}),e._v(" "),l("el-button",{attrs:{size:"mini",disabled:!e.preview_file.next_fileid},on:{click:function(i){e.showimage(e.preview_file.next_fileid)}}},[l("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)]),e._v(" "),l("div",{staticClass:"clear"})]),e._v(" "),l("div",{staticStyle:{"text-align":"center"}},[l("div",{staticStyle:{"min-height":"150px"}},[l("el-image",{staticStyle:{padding:"10px"},attrs:{src:e.preview_file.url}},[l("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v("\n        加载中"),l("span",{staticClass:"dot"},[e._v("...")])])])],1),e._v(" "),l("div",{staticStyle:{"margin-top":"20px"}},[l("el-button",{attrs:{size:"small",type:"primary",disabled:!e.preview_file.previous_fileid,icon:"el-icon-arrow-left"},on:{click:function(i){e.showimage(e.preview_file.previous_fileid)}}},[e._v("上一张图片")]),e._v(" "),l("el-button",{attrs:{size:"small",type:"primary",disabled:!e.preview_file.next_fileid},on:{click:function(i){e.showimage(e.preview_file.next_fileid)}}},[e._v("下一张图片"),l("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)])]):e._e()])],1)},[],!1,null,"554d0b3e",null);a.options.__file="CModalShowImages.vue";i.default=a.exports}}]);