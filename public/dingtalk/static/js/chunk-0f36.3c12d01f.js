(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0f36"],{"8Ix4":function(e,t,o){"use strict";var n=o("F4bG");o.n(n).a},"BE+3":function(e,t,o){"use strict";o.r(t);var n=o("QbLZ"),l=o.n(n),i=o("Bs5o"),a=o("YCPF"),s=o("L2JU"),u={name:"Cmodaldealer",components:{FlowDealer:i.default,FlowDetail:a.default},data:function(){return{error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null}},computed:l()({},Object(s.e)({flowBadge:function(e){return e.user.flowBadge}})),watch:{},mounted:function(){console.log(this.$route.query),this.loadmodal(this.$route.query.msgid,this.$route.query.flowlistid,this.$route.query.nowfunid)},methods:{revokeSuccess:function(){this.flowBadge.waiting--,this.flowBadge.waitingListRefresh=!0},dealSuccess:function(){this.flowBadge.waiting--,this.flowBadge.waitingListRefresh=!0},cancelSuccess:function(){this.flowBadge.waiting--,this.flowBadge.waitingListRefresh=!0},loadmodal:function(e,t,o){console.log(e),this.flowOi_id=t,this.flowmsgid=e,this.nowfunid=o}}},d=(o("8Ix4"),o("KHd+")),c=Object(d.a)(u,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticStyle:{margin:"10px"}},[!e.successShow&&e.flowmsgid?o("div",[o("el-tabs",{attrs:{type:"card"},model:{value:e.tabname,callback:function(t){e.tabname=t},expression:"tabname"}},[o("el-tab-pane",{attrs:{label:"审核流程",name:"flow.dealer"}},["flow.dealer"==e.tabname?o("div",[o("flow-dealer",{attrs:{flowmsgid:e.flowmsgid},on:{"on-revoke-success":e.revokeSuccess,"on-deal-success":e.dealSuccess,"on-cancel-success":e.cancelSuccess,"update:flowmsgid":function(t){e.flowmsgid=t}}})],1):e._e()]),e._v(" "),o("el-tab-pane",{attrs:{label:"流程信息",name:"flow.detail"}},["flow.detail"==e.tabname?o("div",[o("flow-detail",{attrs:{nowfunid:e.nowfunid,"flow-oi-id":e.flowOi_id},on:{"update:nowfunid":function(t){e.nowfunid=t},"update:flowOiId":function(t){e.flowOi_id=t}}})],1):e._e()])],1)],1):e._e()])},[],!1,null,null,null);c.options.__file="FlowDealer.vue";t.default=c.exports},F4bG:function(e,t,o){}}]);