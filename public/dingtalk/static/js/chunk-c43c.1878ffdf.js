(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c43c"],{UdD4:function(e,t,o){},VYzt:function(e,t,o){"use strict";o.r(t);var n=o("HWK0"),s=o("lYLF"),a=o("fHYj"),i=o("cCY5"),l=o.n(i),r=(o("VCwm"),{name:"FlowAdmin",components:{searchFormCommon:n.default,Treeselect:l.a},data:function(){return{show:!1,flowid:null,error:null,flowname:null,choseAdminShow:!1,pageset:null,searchdefault:null,LEAF_PRIORITY:"LEAF_PRIORITY",nowchoseflowid:null,CatTreeList:null,normalizer:function(e){return{id:e.id,label:e.name,children:e.lists}}}},mounted:function(){var e=this;this.flowid=this.$route.params.id,console.log(this.$route.params.id),Object(s.b)({flowid:this.flowid}).then(function(t){var o=t.data;e.loading=!1,o.success?(e.flowname=o.data.flowname,e.pageset=o.data.pageset,e.searchdefault=o.data.default):(e.$message.error(o.msg),e.error=o.msg)})},methods:{changetoOther:function(){this.nowchoseflowid?(this.choseAdminShow=!1,this.$router.push({name:"flowadmin",params:{id:this.nowchoseflowid}})):this.$message.error("还未选择流程")},changeAdmin:function(){var e=this;this.CatTreeList?this.choseAdminShow=!0:Object(a.e)({}).then(function(t){var o=t.data;e.searchloading=!1,o.success?(e.CatTreeList=o.data,e.choseAdminShow=!0):e.$message.error(o.msg)}).catch(function(t){console.log("error",t),e.$message.error(t.message)})}}}),c=(o("rVco"),o("KHd+")),d=Object(c.a)(r,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticStyle:{margin:"10px"}},[o("el-dialog",{attrs:{title:"提示",visible:e.choseAdminShow,width:"40%"},on:{"update:visible":function(t){e.choseAdminShow=t}}},[o("treeselect",{staticStyle:{"line-height":"35px"},attrs:{"disable-branch-nodes":!0,"value-consists-of":e.LEAF_PRIORITY,multiple:!1,options:e.CatTreeList,placeholder:"请输入要切换的流程名称",normalizer:e.normalizer},model:{value:e.nowchoseflowid,callback:function(t){e.nowchoseflowid=t},expression:"nowchoseflowid"}}),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.choseAdminShow=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.changetoOther}},[e._v("切 换")])],1)],1),e._v(" "),e.error?o("el-alert",{attrs:{closable:!1,title:e.error,type:"error"}}):o("div",[o("h3",{staticStyle:{margin:"10px"}},[e._v("管理流程 ~"+e._s(e.flowname)+"  "),o("a",{on:{click:e.changeAdmin}},[e._v("切换")])]),e._v(" "),e.pageset?o("search-form-common",{attrs:{flowname:e.flowname,flowid:e.flowid,"page-set":e.pageset,default:e.searchdefault}}):e._e()],1)],1)},[],!1,null,null,null);d.options.__file="FlowAdmin.vue";t.default=d.exports},rVco:function(e,t,o){"use strict";var n=o("UdD4");o.n(n).a}}]);