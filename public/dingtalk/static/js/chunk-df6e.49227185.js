(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-df6e"],{Enus:function(e,t,n){"use strict";var s=n("GKos");n.n(s).a},GKos:function(e,t,n){},U4CV:function(e,t,n){},uDpL:function(e,t,n){"use strict";var s=n("U4CV");n.n(s).a},uvN0:function(e,t,n){"use strict";n.r(t);var s=n("fHYj"),a={name:"FlowdesignLists",components:{},data:function(){return{filterText:"",CatTreeList:[],expandedKeys:[],defaultProps:{children:"lists",label:"name"},error:null,searchloading:!1,cancreat:!1}},activated:function(){},mounted:function(){var e=this;this.searchloading=!0,Object(s.d)({}).then(function(t){var n=t.data;e.searchloading=!1,n.success?(e.expandedKeys=[],n.data.forEach(function(t){e.expandedKeys.push(t.id)}),console.log(e.expandedKeys),e.CatTreeList=n.data):e.$message.error(n.msg)}).catch(function(t){console.log("error",t),e.$message.error(t.message)})},watch:{filterText:function(e){this.$refs.tree2.filter(e)}},methods:{edit:function(e){this.$router.push({path:"flowdesign_edit/"+e})},editSenior:function(e){this.$router.push({path:"flowdesign_edit_senior/"+e})},deleteflow:function(e){var t=this;this.$confirm("确定删除此条流程吗？谨慎删除，一旦删除，已经被创建的流程会失效").then(function(){Object(s.p)({id:e}).then(function(e){var n=e.data;n.success?(t.$message.success(n.msg),window.location.reload()):t.$message.error(n.msg)})}).catch(function(){})},filterNode:function(e,t){return!e||-1!==t.name.indexOf(e)},creatflow:function(e){var t=this;this.cancreat=!1,setTimeout(function(){t.cancreat=!0,setTimeout(function(){t.$refs.flowcreat.creatform(e)},100)},100)}}},i=(n("Enus"),n("uDpL"),n("KHd+")),o=Object(i.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flowChose"},[e.error?n("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):n("div",[e.searchloading?n("div",{staticClass:"box  pd10 mg10 text-center"},[e._v("\n            正在加载中。。。\n    ")]):n("div",[n("el-input",{attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),e.CatTreeList.length>0?n("el-tree",{ref:"tree2",staticClass:"filter-tree pd10",attrs:{"node-key":"id","default-expanded-keys":e.expandedKeys,data:e.CatTreeList,props:e.defaultProps,"filter-node-method":e.filterNode},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.node,a=t.data;return n("div",{staticClass:"custom-tree-node"},[n("div",{class:a.isleaf?"tree-item":"tree-cat"},[n("span",{staticClass:"title"},[a.isleaf?n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",content:a.desc}},[n("span",[a.canuse?n("span",{staticClass:"used"},[e._v("已启用")]):e._e(),e._v(" "),a.canuse?e._e():n("span",{staticClass:"unused"},[e._v("未启用")]),e._v("\n        "+e._s(s.label)+"\n        "),n("span",{staticStyle:{"font-size":"12px",padding:"0 10px"}},[e._v(" 创建于"+e._s(a.created_at))])])]):n("span",[e._v(e._s(s.label))])],1),e._v(" "),a.isleaf?n("span",[n("el-button",{staticStyle:{"margin-left":"5px"},attrs:{size:"mini"},on:{click:function(t){e.edit(a.id)}}},[e._v("\n            普通编辑\n          ")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"5px"},attrs:{size:"mini"},on:{click:function(t){e.editSenior(a.id)}}},[e._v("\n            高级编辑\n          ")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"5px"},attrs:{icon:"el-icon-delete",size:"mini",type:"danger"},on:{click:function(t){e.deleteflow(a.id)}}},[e._v("\n            删除\n          ")])],1):e._e()])])}}])}):e._e()],1)])],1)},[],!1,null,"084f5211",null);o.options.__file="flowdesign.chose.vue";t.default=o.exports}}]);