(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e527"],{"3mcD":function(e,t,o){"use strict";var a=o("5Qgu");o.n(a).a},"5Qgu":function(e,t,o){},yjdc:function(e,t,o){"use strict";o.r(t);var a=o("gDS+"),r=o.n(a),i=o("fHYj"),n={name:"FlowdesignAdd",data:function(){return{flowid:null,error:null,edittype:"",editloading:!1,category:[],formItem:{name:"",description:"",canuse:!1,category:[]},ruleValidate:{name:[{required:!0,message:"流程名称不可为空",trigger:"blur"}],description:[{required:!0,message:"流程简述不可为空",trigger:"blur"}]}}},activated:function(){console.log("activated")},mounted:function(){var e=this;console.log("mounted");var t=null,o=this.$route.params.id;this.flowid=o,o?(this.edittype="edit",this.editloading=!0,Object(i.s)({_id:o}).then(function(t){var o=t.data;if(console.log(o),o.success){if(!o.data)return void(e.error="没有查询到对应的流程");for(var a in console.log(o.data),e.formItem)void 0!==o.data[a]&&(e.formItem[a]=o.data[a]);e.formItem._id=o.data._id}else e.error=o.msg}),t=i.r):(this.edittype="add",t=i.o),t({}).then(function(t){var o=t.data;e.editloading=!1,o.success&&(e.formItem.category=[],e.category=e.getCatList(o.data)),console.log("category",e.category)})},methods:{copyobject:function(e){return JSON.parse(r()(e))},getCatList:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=[],a=0;a<e.length;a++){var r=this.copyobject(t),i=e[a];if("edit"==this.edittype&&i.flowlist&&i.flowlist.includes(this.flowid)&&this.formItem.category.push(i.id),i.name){var n={label:(r.join("-")?r.join("-")+"-":"")+i.name};if(r.push(i.name),n.id=i.id,o.push(n),i.lists){if(!(i.lists.length>0))continue;var l=this.getCatList(i.lists,r);l.length>0&&(o=o.concat(l))}}}return o},handleSubmit:function(){var e=this;this.editloading=!0,this.$refs.FormID.validate(function(t){if(e.editloading=!1,console.log(t),t){if("edit"==e.edittype)return void Object(i.q)(e.formItem).then(function(t){var o=t.data;o.success?(e.$message.info("更新成功"),e.$router.push({path:"/oaset/flowdesign_list"})):e.$message.error(o.msg),console.log(o)});Object(i.n)(e.formItem).then(function(t){var o=t.data;o.success?(e.$message.info("创建成功"),e.$router.push({path:"/oaset/flowdesign_list"})):e.$message.error(o.msg),console.log(o)})}else e.$message.error("格式不符合规定!")})},handleDelete:function(e){console.log(e)}}},l=(o("3mcD"),o("KHd+")),s=Object(l.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-card",{directives:[{name:"loading",rawName:"v-loading",value:e.editloading,expression:"editloading"}],staticClass:"box-card"},[e.error?o("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):o("el-form",{ref:"FormID",staticStyle:{width:"500px"},attrs:{model:e.formItem,rules:e.ruleValidate,"status-icon":"","label-width":"150px"}},[o("el-form-item",{attrs:{label:"流程名称",prop:"name"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:"Enter something..."},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"一句话简单介绍",prop:"description"}},[o("el-input",{attrs:{placeholder:"请一句话简单描述此流程用途，方便申请者快速理解",type:"textarea"},model:{value:e.formItem.description,callback:function(t){e.$set(e.formItem,"description",t)},expression:"formItem.description"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"是否启用",prop:"canuse"}},[o("el-checkbox",{model:{value:e.formItem.canuse,callback:function(t){e.$set(e.formItem,"canuse",t)},expression:"formItem.canuse"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"所属分类"}},[e.category.length>0?o("el-select",{attrs:{filterable:"",multiple:"",placeholder:"选择分类"},model:{value:e.formItem.category,callback:function(t){e.$set(e.formItem,"category",t)},expression:"formItem.category"}},e._l(e.category,function(e){return o("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})):o("router-link",{attrs:{to:"/oaset/flowdesign_category"}},[o("el-button",{attrs:{type:"text"}},[e._v("\n             点击编辑分类\n          ")])],1)],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},["add"==e.edittype?o("span",[e._v("添加")]):o("span",[e._v("保存")])])],1)],1)],1)],1)},[],!1,null,null,null);s.options.__file="flowdesign.edit.vue";t.default=s.exports}}]);