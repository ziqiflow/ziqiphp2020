(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0cd0"],{"6Ab9":function(e,n,t){},KcEr:function(e,n,t){"use strict";var c=t("6Ab9");t.n(c).a},pqUY:function(e,n,t){"use strict";t.r(n);var c=t("lYLF"),a=t("USVN"),l={name:"CModelCancel",props:{},data:function(){return{cancelModalStatus:!1,canCancelList:[],CancelCheckedNum:0,cancelReason:"",loading:!1,flowlistid:null,canAllCancel:!1,error:null}},mounted:function(){},watch:{canCancelList:{handler:function(e,n){var t=0;this.canCancelList.forEach(function(e){t+=e.check.length}),this.CancelCheckedNum=t},deep:!0}},methods:{tran_dealtype:function(e){return Object(a.g)(e)},loadCancelView:function(e){this.flowlistid=e,this.init()},init:function(){var e=this;this.cancelModalStatus=!0,this.loading=!0,this.canCancelList=[],this.CancelCheckedNum=0,this.cancelReason="",this.error=null,Object(c.f)({flowOi_id:this.flowlistid}).then(function(n){var t=n.data;if(e.loading=!1,t.success){var c=t.data.list;e.canAllCancel=t.data.canAllCancel,c.forEach(function(e){e.allcheck=!0,e.check=[],e.indeterminate=!1,e.group.forEach(function(n){e.check.push(n._id)})}),e.canCancelList=c}else e.$message.error(t.msg),e.error=t.msg}).catch(function(n){e.loading=!1})},getcanCancelChecked:function(){var e=[];return this.canCancelList.forEach(function(n){e=e.concat(n.check)}),e},sureCancelFlow:function(){var e=this;if(this.cancelReason){var n=this.getcanCancelChecked();0!=n.length&&(this.loading=!0,Object(c.x)({flowOi_id:this.flowlistid,flowmsgIdList:n,cancelReason:this.cancelReason}).then(function(n){var t=n.data;e.loading=!1,t.success?(e.cancelModalStatus=!1,e.$message.success(t.msg),e.$emit("on-cancel-success")):e.$message.error(t.msg)}).catch(function(n){e.loading=!1}))}else this.$message.warning("请输入取消原因")},whenAllCheckChange:function(e){if(e.indeterminate=!1,1==e.allcheck){var n=[];e.group.forEach(function(e){n.push(e._id)}),e.check=n}else e.check=[]},whenCheckChange:function(e){if(0==e.check.length)return e.allcheck=!1,void(e.indeterminate=!1);e.check.length==e.group.length?(e.allcheck=!0,e.indeterminate=!1):e.indeterminate=!0},sureAllCancelFlow:function(){var e=this;this.cancelReason?this.$confirm("此操作会把本流程相关的所有的通知、抄送、下发流程取消, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error"}).then(function(){e.loading=!0,Object(c.a)({flowOi_id:e.flowlistid,cancelReason:e.cancelReason}).then(function(n){var t=n.data;e.loading=!1,t.success?(e.cancelModalStatus=!1,e.$message.success(t.msg),e.$emit("on-cancel-success")):e.$message.error(t.msg)})}).catch(function(){e.loading=!1}):this.$message.warning("请输入取消原因")}}},i=(t("KcEr"),t("KHd+")),s=Object(i.a)(l,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{"padding-bottom":"0"},attrs:{fullscreen:!e.isPc,title:"可取消流程列表",visible:e.cancelModalStatus,width:"50%","append-to-body":""},on:{"update:visible":function(n){e.cancelModalStatus=n}}},[e.cancelModalStatus?t("div",[e.error?t("el-alert",{attrs:{closable:!1,title:e.error,type:"error"}}):t("div",[e.canAllCancel||0!=e.canCancelList.length?e._e():t("div",[e._v("无可取消消息")]),e._v(" "),e._l(e.canCancelList,function(n,c){return t("div",{key:c,staticClass:"pd5"},[t("el-checkbox",{attrs:{border:"",indeterminate:n.indeterminate,size:"medium"},on:{change:function(t){e.whenAllCheckChange(n)}},model:{value:n.allcheck,callback:function(t){e.$set(n,"allcheck",t)},expression:"item.allcheck"}},[e._v("\n                    "+e._s(n.NowFunName)+"——"+e._s(e.tran_dealtype(n.dealtype))+"\n                ")]),e._v(" "),t("el-checkbox-group",{staticClass:"cancheckbox_to",staticStyle:{"margin-left":"20px"},on:{change:function(t){e.whenCheckChange(n)}},model:{value:n.check,callback:function(t){e.$set(n,"check",t)},expression:"item.check"}},e._l(n.group,function(n){return t("el-checkbox",{key:n._id,attrs:{size:"mini",label:n._id}},[e._v(e._s(n.toer))])}))],1)}),e._v(" "),t("hr"),e._v(" "),0!=e.canCancelList.length||e.canAllCancel?t("div",{staticClass:"pd10"},[t("el-form",[t("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{required:"",label:"取消原因"}},[t("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入取消原因"},model:{value:e.cancelReason,callback:function(n){e.cancelReason=n},expression:"cancelReason"}})],1)],1)],1):e._e(),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e.canAllCancel?t("el-tooltip",{attrs:{effect:"light",content:"取消该流程发出去的所有流程，包含通知与抄送，并标记为作废",placement:"top-start"}},[t("el-button",{staticClass:"text-right",attrs:{size:"small",type:"error"},on:{click:e.sureAllCancelFlow}},[e._v("全流程作废取消（包含通知与抄送）")])],1):e._e(),e._v(" "),0!=e.canCancelList.length?t("el-tooltip",{attrs:{effect:"light",content:"只取消上面勾选的流程",placement:"top-start"}},[e._v(e._s(e.CancelCheckedNum)+"\n                "),t("el-button",{attrs:{size:"small",type:"danger",disabled:0==e.CancelCheckedNum},on:{click:e.sureCancelFlow}},[e._v("\n                    确定取消\n                    "),e.CancelCheckedNum>0?t("span",[e._v("("+e._s(e.CancelCheckedNum)+")")]):e._e()])],1):e._e()],1)],2)],1):e._e()])},[],!1,null,"2e14b19c",null);s.options.__file="CModalCancel.vue";n.default=s.exports}}]);