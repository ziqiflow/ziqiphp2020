(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-579f"],{"0JRH":function(t,e,i){"use strict";i.r(e);var n=i("lYLF"),o=i("USVN"),s={name:"CModelRevoke",props:{},data:function(){return{revokeModalStatus:!1,revokeReason:"",revokeList:[],loading:!1,flowmsgid:null}},mounted:function(){},watch:{},methods:{tran_dealtype:function(t){return Object(o.g)(t)},loadRevokeView:function(t){this.flowmsgid=t,this.init()},init:function(){var t=this;this.revokeModalStatus=!0,this.revokeList=[],this.revokeReason="",this.loading=!0,Object(n.z)({msg_id:this.flowmsgid}).then(function(e){var i=e.data;t.loading=!1,i.success?t.revokeList=i.data:t.$message.error(i.msg)}).catch(function(e){t.loading=!1})},revoketo:function(t){var e=this;this.$prompt("确定撤回到<"+t.NowFunName+">,撤回后，当前流程节点以及与撤回节点之间分发的节点都会被取消","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputValidator:function(t){return!!t},inputPlaceholder:"请输入撤回原因",inputErrorMessage:"撤回原因不可为空"}).then(function(i){var o=i.value;e.loading=!0,Object(n.A)({msg_id:e.flowmsgid,msg_to_id:t._id,reason:o}).then(function(t){var i=t.data;e.loading=!1,i.success?(e.$message.success(i.msg),e.$emit("on-revoke-success")):e.$message.error(i.msg)})}).catch(function(t){e.loading=!1})}}},a=(i("Gj4b"),i("KHd+")),d=Object(a.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{fullscreen:!t.isPc,title:"可撤回流程节点",visible:t.revokeModalStatus,width:"50%","append-to-body":""},on:{"update:visible":function(e){t.revokeModalStatus=e}}},[i("div",[i("table",{staticClass:"table table-bordered"},[i("tbody",[i("tr",[i("td",[t._v("节点名")]),t._v(" "),i("td",[t._v("处理人")]),t._v(" "),i("td",{staticStyle:{width:"140px"}},[t._v("时间")]),t._v(" "),i("td",{staticStyle:{width:"100px"}},[t._v("操作")])]),t._v(" "),t._l(t.revokeList,function(e,n){return i("tr",{key:n},[i("td",[t._v(t._s(e.NowFunName))]),t._v(" "),i("td",[t._v(t._s(e.toer))]),t._v(" "),i("td",{staticStyle:{width:"80px"}},[t._v(t._s(e.finished_at))]),t._v(" "),i("td",[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.revoketo(e)}}},[t._v("撤回到此处")])],1)])})],2)])])])},[],!1,null,"2d0ffd08",null);d.options.__file="CModalRevoke.vue";e.default=d.exports},Gj4b:function(t,e,i){"use strict";var n=i("McSW");i.n(n).a},McSW:function(t,e,i){}}]);