(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ee6c","chunk-5c7e"],{Lp68:function(t,e,a){"use strict";var l=a("fDSt");a.n(l).a},dL6x:function(t,e,a){"use strict";var l=a("ros9");a.n(l).a},fDSt:function(t,e,a){},l2qp:function(t,e,a){"use strict";a.r(e);var l=a("lYLF"),n=a("wThw"),s={name:"Cflowlist",components:{ModalFlowDetail:a("lvaK").default},mixins:[n.a],data:function(){return{searchFun:l.p,columns:[{title:"流程名称",slot:"flowdesignername"},{title:"流程描述",slot:"flow_desc"},{title:"我的审批建议",slot:"flow_suggest"},{title:"我的Action",slot:"flow_action"},{title:"流程创建时间",slot:"flow_created_at"},{title:"处理节点",slot:"flowstatusat"},{title:"可操作",slot:"action",width:150,align:"center"}]}},activated:function(){},mounted:function(){},methods:{}},o=(a("dL6x"),a("KHd+")),i=Object(o.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.error?a("el-alert",{attrs:{title:t.error,closable:!1,type:"error"}}):a("div",[a("el-card",{staticStyle:{"margin-bottom":"20px"},attrs:{"body-style":{padding:"0px"}}},[a("div",{staticClass:"clearfix",attrs:{slot:"header","body-style":{padding:"0px"}},slot:"header"},[a("span",[a("i",{staticClass:"el-icon-search"}),t._v("\n                搜索栏")]),t._v(" "),t.searchbarShow?a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.toggleSearchbarShow}},[t._v("关闭")]):a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.toggleSearchbarShow}},[t._v("展开")])],1),t._v(" "),t.searchbarShow?a("el-form",{staticClass:"searchform_oa",staticStyle:{margin:"10px"},attrs:{size:"mini","label-width":"80px"}},[a("el-form-item",{attrs:{label:"流程名称"}},[a("el-input",{model:{value:t.search.flowname,callback:function(e){t.$set(t.search,"flowname",e)},expression:"search.flowname"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"文号"}},[a("el-input",{model:{value:t.search.workname,callback:function(e){t.$set(t.search,"workname",e)},expression:"search.workname"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.searchSummit}},[t._v("搜索")])],1)],1):t._e()],1),t._v(" "),a("el-card",[t.searchloading?a("div",{staticClass:"box  pd10 mg10 text-center"},[t._v("\n      正在加载中。。。\n    ")]):t._e(),t._v(" "),0!=t.page.result.length||t.searchloading?t._e():a("div",{staticClass:"box pd10 mg10 text-center"},[t._v("无任何记录")]),t._v(" "),0!=t.page.result.length?a("div",{staticClass:"box"},[a("div",[t._v("共搜索到\n      "),a("span",[t._v(t._s(t.page.totalItems))]),t._v(" 条信息")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.page.result,stripe:"","row-class-name":t.tableRowClassName}},[a("el-table-column",{attrs:{label:"流程名称",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("strong",[t._v(t._s(e.row.flowname))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"文号",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[100==l.level?a("span",{staticClass:"emergency_label"},[t._v("紧急")]):t._e(),t._v(" "),a("strong",[t._v(t._s(l.flowlistOi.workname))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"流程描述",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n            "+t._s(a.flowlistOi.desc)+"\n          ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"处理节点",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"label warning"},[t._v("\n              "+t._s(e.row.NowFunName)+"\n            ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"我的审批建议",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[l.log.suggest?a("span",[t._v(t._s(l.log.suggest))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"处理时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v("\n                "+t._s(t.friendlytimejs(e.row.finished_at))+"\n              ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"流程创建时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v("\n            创建于 "+t._s(t.friendlytimejs(e.row.flowlistOi.created_at))+"\n              "),a("span",{staticClass:"person"},[t._v(" "+t._s(e.row.flowlistOi.creater))])]),t._v(" "),a("div",{staticClass:"mg-t5"},[t._v("\n            转到你："+t._s(t.friendlytimejs(e.row.created_at)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("el-button",{attrs:{type:"error",size:"small"},on:{click:function(e){t.seedetail(l)}}},[t._v("查看当前")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.page.currentPage,"page-size":t.page.pageSize,total:t.page.totalItems,background:"",layout:"prev, pager, next"},on:{"current-change":t.handerPageChange}})],1):t._e()])],1),t._v(" "),a("modal-flow-detail",{ref:"flowdetail"})],1)},[],!1,null,"777911b6",null);i.options.__file="CFlowListFinish.vue";e.default=i.exports},lvaK:function(t,e,a){"use strict";a.r(e);var l=a("YEIV"),n=a.n(l),s=a("YCPF"),o=n()({name:"Cmodaldetail",props:{isAdmin:{type:Boolean,default:function(){return!1}}},components:{FlowDetail:s.default},data:function(){return{error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null,isFullScreen:!1}},watch:{},mounted:function(){},methods:{}},"methods",{cancel:function(){this.modalstatu=!1},toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},loadmodal:function(t,e,a){this.flowOi_id=t,console.log("flowOi_id",t),this.title=e,this.modalstatu=!0,this.nowfunid=a}}),i=(a("Lp68"),a("KHd+")),r=Object(i.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{fullscreen:!t.isPc||t.isFullScreen,title:t.title,width:"75%",visible:t.modalstatu,"close-on-click-modal":!1},on:{"update:visible":function(e){t.modalstatu=e}}},[t.isPc?a("span",{staticClass:"maxzoom"},[t.isFullScreen?a("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}}):a("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}})],1):t._e(),t._v(" "),t.modalstatu?a("div",[a("flow-detail",{attrs:{nowfunid:t.nowfunid,"flow-oi-id":t.flowOi_id,"is-admin":t.isAdmin},on:{"update:nowfunid":function(e){t.nowfunid=e},"update:flowOiId":function(e){t.flowOi_id=e}}})],1):t._e(),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancel}},[t._v("取 消")])],1)])],1)},[],!1,null,"1edda0f8",null);r.options.__file="CModalFlowDetail.vue";e.default=r.exports},ros9:function(t,e,a){},wThw:function(t,e,a){"use strict";var l=a("QbLZ"),n=a.n(l),s=a("L2JU"),o=a("k48p"),i=a("lYLF");e.a={name:"flowlist",computed:n()({},Object(s.e)({flowBadge:function(t){return t.user.flowBadge}})),components:{},data:function(){return{candeal:!1,searchFun:null,error:null,columns:[{title:"流程名称",slot:"flowdesignername"},{title:"流程描述",slot:"flow_desc"},{title:"流程创建时间",slot:"flow_created_at"},{title:"处理节点",slot:"flowstatusat"},{title:"可操作",slot:"action",width:150,align:"center"}],searchbarShow:!1,searchloading:!1,search_list:null,orderby_list:null,display_list:null,search:{s_isorder:null,s_orderby:null},page:{result:[],totalItems:0,pageSize:20,currentPage:1}}},methods:{tableRowClassName:function(t){var e=t.row;return e.level&&100==e.level?"emergency_row":""},initsearch:function(){},searchSummit:function(){this.searchdata(1)},friendlytimejs:function(t){return Object(o.a)(t,new Date)},seedetail:function(t){this.$refs.flowdetail.loadmodal(t.flowlistid,"查看 "+t.flowname+" 明细",t.NowFunid)},seedetail_and_set_read:function(t,e){var a=this;t.hasread||Object(i.C)({msgid:t._id}).then(function(l){l.data.success&&(t.hasread=1,"message"==e&&a.flowBadge.message--,"cc"==e&&a.flowBadge.cc--)}),this.seedetail(t)},dealflow:function(t){var e=this;console.log("mesObj",t),this.candeal=!1,setTimeout(function(){e.candeal=!0,setTimeout(function(){e.$refs.flowdealer.loadmodal(t._id,t.flowlistid,"审批"+t.flowname+"<"+t.NowFunName+">",t.NowFunid)},100)},100),t.hasread=1},handerPageChange:function(t){this.searchdata(t)},showflowgraph:function(){this.$message.info("此处后期显示流程图")},getflowfunByfunid:function(t,e){for(var a=0;a<t.funlist.length;a++){var l=t.funlist[a];if(l.id==e)return l}return null},initresultdata:function(){console.log(this.page)},searchdata:function(t){var e=this;this.searchloading?this.$message.warning("请勿重复提交表单"):(this.searchloading=!0,this.page.result=[],this.searchFun({nowpage:t,search:this.search}).then(function(t){var a=t.data;console.log(a),e.AfterSearch(a),e.searchloading=!1}).catch(function(t){e.searchloading=!1}))},AfterSearch:function(t){this.page=t.data,this.initresultdata()},toggleSearchbarShow:function(){this.searchbarShow=!this.searchbarShow,this.searchbarShow?window.localStorage.setItem("searchbarShow",1):window.localStorage.removeItem("searchbarShow")}},activated:function(){},mounted:function(){this.initsearch(),this.searchdata(1),this.searchbarShow=!!window.localStorage.getItem("searchbarShow")}}}}]);