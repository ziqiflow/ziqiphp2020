(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3e93","chunk-34b5","chunk-5915"],{"2mSO":function(t,e,a){},CgH0:function(t,e,a){"use strict";var l=a("dBFg");a.n(l).a},FUue:function(t,e,a){"use strict";var l=a("2mSO");a.n(l).a},L1Ce:function(t,e,a){"use strict";a.r(e);var l=a("QbLZ"),s=a.n(l),n=a("Bs5o"),o=a("YCPF"),i=a("L2JU"),r={name:"Cmodaldealer",computed:s()({},Object(i.e)({flowBadge:function(t){return t.user.flowBadge}})),components:{FlowDealer:n.default,FlowDetail:o.default},data:function(){return{error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null,isFullScreen:!1}},watch:{},mounted:function(){},methods:{toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},revokeSuccess:function(){this.modalstatu=!1,this.flowBadge.waiting--,this.$emit("need-refresh")},dealSuccess:function(){this.flowBadge.waiting--,this.$emit("need-refresh")},cancelSuccess:function(){this.modalstatu=!1,this.flowBadge.waiting--,this.$emit("need-refresh")},cancel:function(){this.modalstatu=!1},loadmodal:function(t,e,a,l){this.flowOi_id=e,this.flowmsgid=t,this.title=a,this.modalstatu=!0,this.nowfunid=l,console.log("nowfunidmodal",l)}}},c=(a("CgH0"),a("KHd+")),u=Object(c.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{width:"75%",fullscreen:!t.isPc||t.isFullScreen,"close-on-click-modal":!1,title:t.title,visible:t.modalstatu},on:{"update:visible":function(e){t.modalstatu=e}}},[t.isPc?a("span",{staticClass:"maxzoom"},[t.isFullScreen?a("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}}):a("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}})],1):t._e(),t._v(" "),t.modalstatu?a("div",[t.successShow?t._e():a("div",[a("el-tabs",{attrs:{type:"card"},model:{value:t.tabname,callback:function(e){t.tabname=e},expression:"tabname"}},[a("el-tab-pane",{attrs:{label:"审核流程",name:"flow.dealer"}},["flow.dealer"==t.tabname?a("div",[a("flow-dealer",{attrs:{flowmsgid:t.flowmsgid},on:{"on-revoke-success":t.revokeSuccess,"on-deal-success":t.dealSuccess,"on-cancel-success":t.cancelSuccess,"update:flowmsgid":function(e){t.flowmsgid=e}}})],1):t._e()]),t._v(" "),a("el-tab-pane",{attrs:{label:"流程信息",name:"flow.detail"}},["flow.detail"==t.tabname?a("div",[a("flow-detail",{attrs:{nowfunid:t.nowfunid,"flow-oi-id":t.flowOi_id},on:{"update:nowfunid":function(e){t.nowfunid=e},"update:flowOiId":function(e){t.flowOi_id=e}}})],1):t._e()])],1)],1)]):t._e(),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})])],1)},[],!1,null,"337a8034",null);u.options.__file="CModalFlowDealer.vue";e.default=u.exports},Lp68:function(t,e,a){"use strict";var l=a("fDSt");a.n(l).a},dBFg:function(t,e,a){},fDSt:function(t,e,a){},lvaK:function(t,e,a){"use strict";a.r(e);var l=a("YEIV"),s=a.n(l),n=a("YCPF"),o=s()({name:"Cmodaldetail",props:{isAdmin:{type:Boolean,default:function(){return!1}}},components:{FlowDetail:n.default},data:function(){return{error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null,isFullScreen:!1}},watch:{},mounted:function(){},methods:{}},"methods",{cancel:function(){this.modalstatu=!1},toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},loadmodal:function(t,e,a){this.flowOi_id=t,console.log("flowOi_id",t),this.title=e,this.modalstatu=!0,this.nowfunid=a}}),i=(a("Lp68"),a("KHd+")),r=Object(i.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{fullscreen:!t.isPc||t.isFullScreen,title:t.title,width:"75%",visible:t.modalstatu,"close-on-click-modal":!1},on:{"update:visible":function(e){t.modalstatu=e}}},[t.isPc?a("span",{staticClass:"maxzoom"},[t.isFullScreen?a("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}}):a("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}})],1):t._e(),t._v(" "),t.modalstatu?a("div",[a("flow-detail",{attrs:{nowfunid:t.nowfunid,"flow-oi-id":t.flowOi_id,"is-admin":t.isAdmin},on:{"update:nowfunid":function(e){t.nowfunid=e},"update:flowOiId":function(e){t.flowOi_id=e}}})],1):t._e(),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancel}},[t._v("取 消")])],1)])],1)},[],!1,null,"1edda0f8",null);r.options.__file="CModalFlowDetail.vue";e.default=r.exports},uenu:function(t,e,a){"use strict";a.r(e);var l=a("lYLF"),s=a("wThw"),n=a("L1Ce"),o=a("lvaK"),i=a("Fnmp"),r={name:"Cflowlist",components:{ModalFlowDealer:n.default,ModalFlowDetail:o.default,FlowLog:i.default},mixins:[s.a],data:function(){return{searchFun:l.E}},activated:function(){},mounted:function(){},methods:{initsearch:function(){this.$set(this.search,"readstatus","all")},setAllRead:function(){var t=this;Object(l.B)({type:"waiting"}).then(function(e){var a=e.data;a.success?(t.$message.success("标记成功"),t.page.result.forEach(function(t){t.hasread=1})):t.$message.error("标记失败:"+a.msg)})}}},c=(a("FUue"),a("KHd+")),u=Object(c.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.error?a("el-alert",{attrs:{title:t.error,closable:!1,type:"error"}}):a("div",[a("el-card",{staticStyle:{"margin-bottom":"20px"},attrs:{"body-style":{padding:"0px"}}},[a("div",{staticClass:"clearfix",attrs:{slot:"header","body-style":{padding:"0px"}},slot:"header"},[a("span",[a("i",{staticClass:"el-icon-search"}),t._v("\n                  搜索栏")]),t._v(" "),t.searchbarShow?a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.toggleSearchbarShow}},[t._v("关闭")]):a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.toggleSearchbarShow}},[t._v("展开")])],1),t._v(" "),t.searchbarShow?a("el-form",{staticClass:"searchform_oa",staticStyle:{margin:"10px"},attrs:{size:"mini","label-width":"80px"}},[a("el-form-item",{attrs:{label:"流程名称"}},[a("el-input",{model:{value:t.search.flowname,callback:function(e){t.$set(t.search,"flowname",e)},expression:"search.flowname"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"文号"}},[a("el-input",{model:{value:t.search.workname,callback:function(e){t.$set(t.search,"workname",e)},expression:"search.workname"}})],1),t._v(" "),t.search.readstatus?a("el-form-item",{attrs:{label:"是否已读"}},[a("el-radio-group",{model:{value:t.search.readstatus,callback:function(e){t.$set(t.search,"readstatus",e)},expression:"search.readstatus"}},[a("el-radio",{attrs:{label:"read"}},[t._v("已读")]),t._v(" "),a("el-radio",{attrs:{label:"unread"}},[t._v("未读")]),t._v(" "),a("el-radio",{attrs:{label:"all"}},[t._v("全部")])],1)],1):t._e(),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.searchSummit}},[t._v("搜索")])],1)],1):t._e()],1),t._v(" "),a("el-card",[t.searchloading?a("div",{staticClass:"box  pd10 mg10 text-center"},[t._v("\n                正在加载中。。。\n            ")]):t._e(),t._v(" "),0!=t.page.result.length||t.searchloading?t._e():a("div",{staticClass:"box pd10 mg10 text-center"},[t._v("无任何记录")]),t._v(" "),0!=t.page.result.length?a("div",{staticClass:"box"},[a("div",[t._v("共搜索到\n                    "),a("span",[t._v(t._s(t.page.totalItems))]),t._v(" 条信息\n\n                    "),a("div",{staticStyle:{float:"right"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.setAllRead}},[t._v("全部标记已读")])],1)]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.page.result,stripe:""}},[a("el-table-column",{attrs:{label:"流程名称",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("strong",[t._v(t._s(e.row.flowname))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"流程描述",width:"230"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n                            "+t._s(a.flowlistOi.desc)+"\n                        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"文号",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n                            "+t._s(a.flowlistOi.workname)+"\n                        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n                            "+t._s(a.hasread?"已读":"未读")+"\n                        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"流程创建时间",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" 创建于 "+t._s(t.friendlytimejs(e.row.flowlistOi.created_at))+"\n                                "),a("span",{staticClass:"person"},[t._v(" "+t._s(e.row.flowlistOi.creater))])]),t._v(" "),a("div",{staticClass:"mg-t5"},[t._v("转到此处："+t._s(t.friendlytimejs(e.row.created_at))+"\n                                "),a("span",{staticClass:"person"},[t._v(" "+t._s(e.row.creater))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"处理节点",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"label warning"},[t._v("\n                "+t._s(e.row.NowFunName)+"\n              ")]),t._v("\n                            来自\n\n                            "),a("span",{staticClass:"label success fz12"},[t._v(t._s(e.row.PreFunName))]),t._v(" "),a("v-icon",{staticStyle:{cursor:"pointer","margin-left":"5px"},attrs:{name:"ios-git-network"},on:{click:t.showflowgraph}})]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("el-button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(e){t.dealflow_and_set_read(l,"waiting")}}},[t._v("处理")]),t._v(" "),a("el-button",{attrs:{type:"error",size:"small"},on:{click:function(e){t.seedetail_and_set_read(l,"waiting")}}},[t._v("查看流程")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-size":t.page.pageSize,total:t.page.totalItems,background:"",layout:"prev, pager, next"},on:{"current-change":t.handerPageChange}})],1):t._e()])],1),t._v(" "),t.candeal?a("modal-flow-dealer",{ref:"flowdealer",on:{"need-refresh":function(e){t.searchdata(1)}}}):t._e(),t._v(" "),a("modal-flow-detail",{ref:"flowdetail"})],1)},[],!1,null,"8fe8c4b6",null);u.options.__file="CFlowListWaiting.vue";e.default=u.exports},wThw:function(t,e,a){"use strict";var l=a("QbLZ"),s=a.n(l),n=a("L2JU"),o=a("k48p"),i=a("lYLF");e.a={name:"flowlist",computed:s()({},Object(n.e)({flowBadge:function(t){return t.user.flowBadge}})),components:{},data:function(){return{candeal:!1,searchFun:null,error:null,columns:[{title:"流程名称",slot:"flowdesignername"},{title:"流程描述",slot:"flow_desc"},{title:"流程创建时间",slot:"flow_created_at"},{title:"处理节点",slot:"flowstatusat"},{title:"可操作",slot:"action",width:150,align:"center"}],searchbarShow:!1,searchloading:!1,search_list:null,orderby_list:null,display_list:null,search:{s_isorder:null,s_orderby:null},page:{result:[],totalItems:0,pageSize:20,currentPage:1}}},methods:{initsearch:function(){},searchSummit:function(){this.searchdata(1)},friendlytimejs:function(t){return Object(o.a)(t,new Date)},seedetail:function(t){this.$refs.flowdetail.loadmodal(t.flowlistid,"查看 "+t.flowname+" 明细",t.NowFunid)},seedetail_and_set_read:function(t,e){var a=this;t.hasread||Object(i.C)({msgid:t._id}).then(function(l){l.data.success&&(t.hasread=1,"message"==e&&a.flowBadge.message--,"cc"==e&&a.flowBadge.cc--)}),this.seedetail(t)},dealflow_and_set_read:function(t,e){var a=this;t.hasread||Object(i.C)({msgid:t._id}).then(function(l){l.data.success&&(t.hasread=1,"message"==e&&a.flowBadge.message--,"cc"==e&&a.flowBadge.cc--)}),this.seedetail(t)},dealflow:function(t){var e=this;console.log("mesObj",t),this.candeal=!1,setTimeout(function(){e.candeal=!0,setTimeout(function(){e.$refs.flowdealer.loadmodal(t._id,t.flowlistid,"审批"+t.flowname+"<"+t.NowFunName+">",t.NowFunid)},100)},100)},handerPageChange:function(t){this.searchdata(t)},showflowgraph:function(){this.$message.info("此处后期显示流程图")},getflowfunByfunid:function(t,e){for(var a=0;a<t.funlist.length;a++){var l=t.funlist[a];if(l.id==e)return l}return null},initresultdata:function(){console.log(this.page)},searchdata:function(t){var e=this;this.searchloading?this.$message.warning("请勿重复提交表单"):(this.searchloading=!0,this.page.result=[],this.searchFun({nowpage:t,search:this.search}).then(function(t){var a=t.data;console.log(a),e.AfterSearch(a),e.searchloading=!1}))},AfterSearch:function(t){this.page=t.data,this.initresultdata()},toggleSearchbarShow:function(){this.searchbarShow=!this.searchbarShow,this.searchbarShow?window.localStorage.setItem("searchbarShow",1):window.localStorage.removeItem("searchbarShow")}},activated:function(){},mounted:function(){this.initsearch(),this.searchdata(1),this.searchbarShow=!!window.localStorage.getItem("searchbarShow")}}}}]);