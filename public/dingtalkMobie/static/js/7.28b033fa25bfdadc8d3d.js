webpackJsonp([7],{"1LgG":function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t("0CXz"),i={name:"Cflowlist",components:{},mixins:[t("SJcF").a],data:function(){return{searchFun:a.d,AllChecked:!1,isEditMode:!1,nowCheckResult:[],loading:!1,shaixuanMode:!1}},mounted:function(){},watch:{AllChecked:function(e,s){if(this.AllChecked){var t=[];this.msgList.forEach(function(e){t.push(e._id)}),this.nowCheckResult=t}else this.nowCheckResult=[]},nowCheckResult:function(){this.AllChecked=this.nowCheckResult.length==this.msgList.length}},methods:{shaixuanRadioChanged:function(){localStorage.setItem("cc.readstatus","read"==this.search.readstatus?"all":this.search.readstatus),this.searchdata(1)},initsearch:function(){var e=localStorage.getItem("cc.readstatus");this.inArray(e,["unread","read","all"])||(e="unread"),this.$set(this.search,"readstatus",e)},inArray:function(e,s){return s.some(function(s){return e===s})},setReaded:function(){var e=this;this.loading=!0,0!=this.nowCheckResult.length&&Object(a.z)({msgid:this.nowCheckResult.join("-")}).then(function(s){var t=s.data;e.loading=!1,t.success?(e.$message.success(t.msg),e.flowBadge.cc=e.flowBadge.cc-t.data,e.msgList.forEach(function(s){e.inArray(s._id,e.nowCheckResult)&&(s.hasread=1)})):e.$message.error(t.msg),e.isEditMode=!1,e.nowCheckResult=[],e.AllChecked=!1})},gotonext:function(e){var s=this;this.isEditMode||(e.hasread||Object(a.z)({msgid:e._id}).then(function(t){t.data.success&&(e.hasread=1,s.flowBadge.cc--)}),this.$router.push({name:"flowdetail",query:{msgid:e._id,flowlistid:e.flowlistid,nowfunid:e.NowFunid}}))}}},n={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[t("div",{staticClass:"headerhandle"},[e.isEditMode?t("div",{staticClass:"pilian",on:{click:function(s){e.isEditMode=!1}}},[t("i",{staticClass:"el-icon-close"}),e._v("取消")]):t("div",{staticClass:"pilian",on:{click:function(s){e.isEditMode=!0}}},[t("i",{staticClass:"el-icon-edit"}),e._v("批量")]),e._v(" "),t("div",{staticClass:"v-search",staticStyle:{"padding-right":"46px"}},[t("van-search",{attrs:{placeholder:"搜索"},on:{search:function(s){return e.searchdata(1)},clear:function(s){return e.searchdata(1)}},model:{value:e.search.flowname,callback:function(s){e.$set(e.search,"flowname",s)},expression:"search.flowname"}})],1),e._v(" "),t("div",{staticClass:"shaixuan",on:{click:function(s){e.shaixuanMode=!e.shaixuanMode}}},[t("v-icon",{attrs:{name:"shaixuan"}}),e._v("筛选\n        ")],1)]),e._v(" "),e.shaixuanMode?t("div",{staticClass:"shaixuanBox"},[t("el-radio-group",{attrs:{size:"small"},on:{change:e.shaixuanRadioChanged},model:{value:e.search.readstatus,callback:function(s){e.$set(e.search,"readstatus",s)},expression:"search.readstatus"}},[t("el-radio-button",{attrs:{label:"all"}},[e._v("全部")]),e._v(" "),t("el-radio-button",{attrs:{label:"unread"}},[e._v("未读")]),e._v(" "),t("el-radio-button",{attrs:{label:"read"}},[e._v("已读")])],1)],1):e._e(),e._v(" "),t("van-pull-refresh",{on:{refresh:function(s){return e.searchdata(1)}},model:{value:e.pullloading,callback:function(s){e.pullloading=s},expression:"pullloading"}},[t("van-list",{attrs:{finished:this.page.finished,"finished-text":"没有更多了"},on:{load:e.listload},model:{value:e.listloading,callback:function(s){e.listloading=s},expression:"listloading"}},[t("van-checkbox-group",{model:{value:e.nowCheckResult,callback:function(s){e.nowCheckResult=s},expression:"nowCheckResult"}},e._l(e.msgList,function(s,a){return t("div",{key:a,staticClass:"msglist"},[t("div",{staticClass:"time"},[e._v(e._s(e.friendlytimejs(s.created_at)))]),e._v(" "),e.isEditMode?t("div",{staticClass:"checkbox"},[t("van-checkbox",{attrs:{name:s._id}})],1):e._e(),e._v(" "),t("div",{staticClass:"main",class:e.isEditMode?"editmode":"",on:{click:function(t){return e.gotonext(s)}}},[s.hasread?e._e():t("div",{staticClass:"hasread"}),e._v(" "),e.isEditMode?e._e():t("div",{staticClass:"arrow-right"},[t("i",{staticClass:"el-icon-arrow-right",staticStyle:{"font-size":"20px"}})]),e._v(" "),t("div",{staticClass:"headerTitle"},[100==s.level?t("span",{staticClass:"label emergency_label"},[e._v("紧急")]):e._e(),e._v("\n                            "+e._s(s.flowname)+"\n                        ")]),e._v(" "),t("div",{staticClass:"descTitle"},[e._v("\n                            描述：\n                            "),s.flowlistOi.desc?t("span",[e._v(e._s(s.flowlistOi.desc))]):t("span",[e._v("无")]),e._v(" "),t("span",{staticClass:"person"},[t("v-icon",{staticStyle:{"font-size":"12px"},attrs:{name:"person"}}),e._v(" "+e._s(s.flowlistOi.creater))],1)]),e._v(" "),t("div",{staticClass:"detail"},[t("div",[t("span",{staticClass:"label warning"},[e._v("  "+e._s(s.NowFunName))]),e._v("\n                                来自 "),t("span",{staticClass:"label success fz12"},[e._v(e._s(s.PreFunName))])])]),e._v(" "),t("div",{staticClass:"workname"},[e._v("文号:"+e._s(s.flowlistOi.workname))])])])}),0)],1)],1),e._v(" "),e.isEditMode?t("div",{staticClass:"footer"},[t("van-checkbox",{staticStyle:{display:"inline-block",margin:"6px 0 0 10px"},model:{value:e.AllChecked,callback:function(s){e.AllChecked=s},expression:"AllChecked"}},[e._v("全选")]),e._v(" "),t("el-button",{staticStyle:{float:"right","margin-left":"10px"},attrs:{size:"small"},on:{click:function(s){e.isEditMode=!1}}},[e._v("取消")]),e._v(" "),t("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",disabled:!e.nowCheckResult.length,size:"small"},on:{click:e.setReaded}},[e._v("标记为已读\n            "),e.nowCheckResult.length?t("span",[e._v("\n          ("+e._s(e.nowCheckResult.length)+")\n          ")]):e._e()])],1):e._e()],1)},staticRenderFns:[]};var l=t("VU/8")(i,n,!1,function(e){t("VDLq")},"data-v-f6dfee60",null);s.default=l.exports},VDLq:function(e,s){}});