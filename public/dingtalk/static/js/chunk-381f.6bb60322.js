(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-381f"],{CgH0:function(e,t,l){"use strict";var n=l("dBFg");l.n(n).a},L1Ce:function(e,t,l){"use strict";l.r(t);var n=l("QbLZ"),s=l.n(n),o=l("Bs5o"),a=l("YCPF"),i=l("L2JU"),c={name:"Cmodaldealer",computed:s()({},Object(i.e)({flowBadge:function(e){return e.user.flowBadge}})),components:{FlowDealer:o.default,FlowDetail:a.default},data:function(){return{error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null,isFullScreen:!1}},watch:{},mounted:function(){},methods:{toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},revokeSuccess:function(){this.modalstatu=!1,this.flowBadge.waiting--,this.$emit("need-refresh")},dealSuccess:function(){this.flowBadge.waiting--,this.$emit("need-refresh")},cancelSuccess:function(){this.modalstatu=!1,this.flowBadge.waiting--,this.$emit("need-refresh")},cancel:function(){this.modalstatu=!1},loadmodal:function(e,t,l,n){this.flowOi_id=t,this.flowmsgid=e,this.title=l,this.modalstatu=!0,this.nowfunid=n,console.log("nowfunidmodal",n)}}},u=(l("CgH0"),l("KHd+")),d=Object(u.a)(c,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("el-dialog",{attrs:{width:"75%",fullscreen:!e.isPc||e.isFullScreen,"close-on-click-modal":!1,title:e.title,visible:e.modalstatu},on:{"update:visible":function(t){e.modalstatu=t}}},[e.isPc?l("span",{staticClass:"maxzoom"},[e.isFullScreen?l("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(t){return e.toggleFullScreen(t)}}}):l("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(t){return e.toggleFullScreen(t)}}})],1):e._e(),e._v(" "),e.modalstatu?l("div",[e.successShow?e._e():l("div",[l("el-tabs",{attrs:{type:"card"},model:{value:e.tabname,callback:function(t){e.tabname=t},expression:"tabname"}},[l("el-tab-pane",{attrs:{label:"审核流程",name:"flow.dealer"}},["flow.dealer"==e.tabname?l("div",[l("flow-dealer",{attrs:{flowmsgid:e.flowmsgid},on:{"on-revoke-success":e.revokeSuccess,"on-deal-success":e.dealSuccess,"on-cancel-success":e.cancelSuccess,"update:flowmsgid":function(t){e.flowmsgid=t}}})],1):e._e()]),e._v(" "),l("el-tab-pane",{attrs:{label:"流程信息",name:"flow.detail"}},["flow.detail"==e.tabname?l("div",[l("flow-detail",{attrs:{nowfunid:e.nowfunid,"flow-oi-id":e.flowOi_id},on:{"update:nowfunid":function(t){e.nowfunid=t},"update:flowOiId":function(t){e.flowOi_id=t}}})],1):e._e()])],1)],1)]):e._e(),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})])],1)},[],!1,null,"337a8034",null);d.options.__file="CModalFlowDealer.vue";t.default=d.exports},dBFg:function(e,t,l){}}]);