(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4623"],{Vc1p:function(e,t,a){"use strict";var n=a("cUTT");a.n(n).a},WpV4:function(e,t,a){"use strict";a.r(t);var n=a("fHYj"),s={name:"FlowdesignLists",data:function(){return{error:null,searchloading:!1,search_list:null,orderby_list:null,display_list:null,search:{s_isorder:null,s_orderby:null},page:{result:[],totalItems:0,pageSize:20,currentPage:1}}},activated:function(){},mounted:function(){this.searchdata(1)},methods:{deleteflow:function(e){var t=this;this.$confirm("确定删除此条流程吗？谨慎删除，一旦删除，已经被创建的流程会失效").then(function(){Object(n.p)({id:t.page.result[e]._id}).then(function(a){var n=a.data;n.success?(t.$message.success(n.msg),t.page.result.splice(e,1)):t.$message.error(n.msg)})}).catch(function(){})},handerPageChange:function(e){this.searchdata(e)},edit:function(e){this.$router.push({path:"flowdesign_edit/"+this.page.result[e]._id})},editSenior:function(e){this.$router.push({path:"flowdesign_edit_senior/"+this.page.result[e]._id})},searchdata:function(e){var t=this;this.searchloading?this.$message.warning("请勿重复提交表单"):(this.searchloading=!0,this.page.result=[],Object(n.t)({nowpage:e}).then(function(e){var a=e.data;console.log(a),t.page=a.data,t.searchloading=!1}))}}},i=(a("Vc1p"),a("KHd+")),l=Object(i.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"box-card"},[e.error?a("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):a("div",[e.searchloading?a("div",{staticClass:"box  pd10 mg10 text-center"},[e._v("\n                正在加载中。。。\n            ")]):e._e(),e._v(" "),0!=e.page.result.length||e.searchloading?e._e():a("div",{staticClass:"box pd10 mg10 text-center"},[e._v("无任何记录")]),e._v(" "),0!=e.page.result.length?a("div",{staticClass:"box"},[a("div",[e._v("共搜索到\n                    "),a("span",[e._v(e._s(e.page.totalItems))]),e._v(" 条信息")]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.page.result}},[a("el-table-column",{attrs:{prop:"name",label:"流程名称",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"description",label:"简单介绍"}}),e._v(" "),a("el-table-column",{attrs:{label:"是否启用"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.canuse?a("span",[e._v("是")]):a("span",[e._v("否")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"_id",label:"_id"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){t.row;var n=t.$index;return[a("el-button",{staticClass:"mg-b5",attrs:{size:"mini"},on:{click:function(t){e.edit(n)}}},[e._v("基础编辑")]),e._v(" "),a("br"),e._v(" "),a("el-button",{staticClass:"mg-b5",attrs:{size:"mini"},on:{click:function(t){e.editSenior(n)}}},[e._v("高级编辑")]),e._v(" "),a("br"),e._v(" "),a("el-button",{staticClass:"mg-b5",attrs:{icon:"el-icon-delete",size:"mini",type:"danger"},on:{click:function(t){e.deleteflow(n)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.page.currentPage,"page-size":e.page.pageSize,total:e.page.totalItems,background:"",layout:"prev, pager, next"},on:{"current-change":e.handerPageChange}})],1):e._e()])],1)],1)},[],!1,null,null,null);l.options.__file="flowdesign.list.vue";t.default=l.exports},cUTT:function(e,t,a){}}]);