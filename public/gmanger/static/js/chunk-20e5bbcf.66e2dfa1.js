(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20e5bbcf"],{"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"total, sizes, prev, pager, next, jumper",pagination:e.pagination,"page-size":e.pagination.pageSize,"current-page":e.pagination.currentPage,total:e.pagination.total,"page-sizes":e.pagination.pageSizes},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)},r=[],i={props:{pagination:{type:Object,default:function(){return{pageSizes:[],pageSize:10,currentPage:1,total:0}}}},methods:{handleCurrentChange:function(e){this.pagination.currentPage=e},handleSizeChange:function(e){this.pagination.pageSize=e}}},l=i,o=(a("5c29"),a("2877")),s=Object(o["a"])(l,n,r,!1,null,null,null);t["a"]=s.exports},4442:function(e,t,a){},"5c29":function(e,t,a){"use strict";var n=a("90b0"),r=a.n(n);r.a},"90b0":function(e,t,a){},"92d5":function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return l})),a.d(t,"e",(function(){return o})),a.d(t,"a",(function(){return s}));var n=a("b775");function r(e){return Object(n["a"])({url:"/system/department/page",method:"post",data:e})}function i(){return Object(n["a"])({url:"/system/department/list",method:"post"})}function l(e){return Object(n["a"])({url:"/system/department/get/".concat(e),method:"get"})}function o(e){return Object(n["a"])({url:"/system/department/save",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/system/department/delete/".concat(e),method:"post"})}},cd93:function(e,t,a){"use strict";var n=a("4442"),r=a.n(n);r.a},ff78:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"div-tree"},[a("el-tree",{attrs:{data:e.treeData,"node-key":"id","default-expand-all":"","expand-on-click-node":!1},scopedSlots:e._u([{key:"default",fn:function(t){t.node;var n=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(n.name))]),e._v(" "),a("span",[a("el-button",{staticClass:"el-icon-edit",attrs:{type:"text",size:"mini"},on:{click:function(){return e.addOrUpdate(n)}}}),e._v(" "),a("el-button",{staticClass:"el-icon-delete",attrs:{type:"text",size:"mini"},on:{click:function(){return e.del(n)}}})],1)])}}])})],1),e._v(" "),a("div",{staticClass:"div-table"},[a("div",{staticClass:"search-form",staticStyle:{"margin-bottom":"15px"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{size:"small",clearable:"",placeholder:"请输入机构名称"},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(){return e.fetchData()}}},[e._v("\n        查询\n      ")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(){return e.addOrUpdate()}}},[e._v("\n        新增\n      ")])],1),e._v(" "),a("el-table",{attrs:{data:e.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.$index+1)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.name)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"上级机构"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.parentName||"--"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"机构编码"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.code)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"机构描述"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.remark)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{"class-name":"status-col",label:"状态",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("statusTypeFilter")(t.row.enable)}},[e._v(e._s(e._f("statusFilter")(t.row.enable)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-time"}),e._v(" "),a("span",[e._v(e._s(t.row.createTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建人"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(){return e.addOrUpdate(t.row)}}},[e._v("编辑\n          ")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(){return e.del(t.row)}}},[e._v("删除\n          ")])]}}])})],1),e._v(" "),a("div",[a("pagination",{attrs:{pagination:e.pagination}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.activeTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.form,rules:e.formrules}},[a("el-form-item",{attrs:{label:"上级机构","label-width":e.formLabelWidth,prop:"parentId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",fliterable:"",placeholder:"请选择"},model:{value:e.form.parentId,callback:function(t){e.$set(e.form,"parentId",t)},expression:"form.parentId"}},e._l(e.departlist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"机构名称","label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{attrs:{clearable:"",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机构编码",clearable:"","label-width":e.formLabelWidth,prop:"code"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系人",clearable:"","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.linkman,callback:function(t){e.$set(e.form,"linkman",t)},expression:"form.linkman"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机构描述",clearable:"","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":e.formLabelWidth}},[a("el-radio-group",{model:{value:e.form.enable,callback:function(t){e.$set(e.form,"enable",t)},expression:"form.enable"}},[a("el-radio",{attrs:{label:1}},[e._v("启用")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("禁用")])],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.save}},[e._v("确 定")])],1)],1)],1)},r=[],i=a("db72"),l=a("333d"),o=a("92d5"),s=a("ed08"),c=a("83d6"),u={components:{pagination:l["a"]},filters:{typeFilter:function(e){var t={1:"目录",2:"菜单"};return t[e]},statusFilter:function(e){var t={1:"启用",0:"禁用"};return t[e]},statusTypeFilter:function(e){var t={1:"success",0:"danger"};return t[e]}},data:function(){return{treeData:null,list:null,listLoading:!0,departlist:null,defaultProps:{children:"children",label:"name",id:"id"},searchForm:{name:"",rows:"10",page:"1"},activeTitle:"新增机构",dialogFormVisible:!1,formLabelWidth:"100px",form:{name:"",parentId:"",code:"",remark:"",linkman:"",enable:1},formrules:{parentId:[{required:!0,message:"请选择上级机构",trigger:"change"}],name:[{required:!0,message:"请输入机构名称",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],code:[{required:!0,message:"请输入机构编码",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}]},pagination:c["pageParams"]}},watch:{"pagination.currentPage":function(){this.searchForm.page=this.pagination.currentPage,this.fetchData()},"pagination.pageSize":function(){this.searchForm.rows=this.pagination.pageSize,this.searchForm.page=1,this.fetchData()}},created:function(){this.fetchData(),this.fetchTreeData()},methods:{fetchData:function(){var e=this;this.listLoading=!0,Object(o["c"])(Object(i["a"])({},this.searchForm)).then((function(t){e.list=t.data.rows,e.pagination.total=t.data.records,e.listLoading=!1}))},fetchTreeData:function(){var e=this;this.listLoading=!0,Object(o["d"])().then((function(t){e.departlist=t.data,e.treeData=Object(s["b"])(t.data),e.listLoading=!1}))},del:function(e){var t=this;this.$confirm("是否确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["a"])(e.id).then((function(e){0===e.code?(t.$message({message:"删除成功",type:"success"}),t.dialogFormVisible=!1,t.fetchData(),t.fetchTreeData()):t.$message({message:e.msg,type:"error"})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},addOrUpdate:function(e){var t=this;this.resetFileds(),this.form={name:"",parentId:"",code:"",remark:"",linkman:"",enable:1},this.dialogFormVisible=!0,this.activeTitle="新增机构",e&&(this.activeTitle="编辑机构",Object(o["b"])(e.id).then((function(e){t.form=e.data,delete t.form.childs})))},save:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return!1;Object(o["e"])(e.form).then((function(t){0===t.code?(e.$message({message:"操作成功",type:"success"}),e.dialogFormVisible=!1,e.fetchData(),e.fetchTreeData()):e.$message({message:t.msg,type:"error"})}))}))},resetFileds:function(){this.$refs["ruleForm"]&&this.$refs["ruleForm"].resetFields()}}},d=u,m=(a("cd93"),a("2877")),f=Object(m["a"])(d,n,r,!1,null,"164f5640",null);t["default"]=f.exports}}]);