(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6eb5"],{"gD++":function(e,t,l){},hEBK:function(e,t,l){"use strict";l.r(t);var n=l("gDS+"),i=l.n(n),a=l("QbLZ"),o=l.n(a),s=l("529z"),r=l.n(s),c=l("N3UD"),u=l("L2JU"),p={name:"FlowPermission",mixins:[r.a],components:{ChoseContactGroupModal:c.default},props:{value:{type:Array,default:function(){return[]},isSync:!0}},data:function(){return{DeptTree:[]}},mounted:function(){var e=this;0==this.userByDepts.length?this.getUserByDeptData().then(function(t){e.DeptTree=e.getdeptList(e.userByDepts),e.DeptTree.unshift({id:"1",label:"全公司"})}):(this.DeptTree=this.getdeptList(this.userByDepts),this.DeptTree.unshift({id:"1",label:"全公司"}))},computed:o()({},Object(u.c)(["requireDataList"]),Object(u.e)({userByDepts:function(e){return e.contact.userByDepts}})),methods:o()({},Object(u.b)(["getUserByDeptData"]),{minutesto:function(e){if(!e)return 0;var t=e.split(":");return 2==t.length?60*Number(t[0])+Number(t[1]):0},addvalue:function(){this.sync_value.push({allow:[],deptuser:[],admindept:[]})},removeItem:function(e,t){e.splice(t,1)},copyobject:function(e){return JSON.parse(i()(e))},getdeptList:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],l=[],n=0;n<e.length;n++){var i=this.copyobject(t),a=e[n];if(a.deptname){var o={label:(i.join("-")?i.join("-")+"-":"")+a.deptname};if(i.push(a.deptname),o.id=a._uuid,l.push(o),a.children){if(!(a.children.length>0))continue;var s=this.getdeptList(a.children,i);s.length>0&&(l=l.concat(s))}}}return l}})},d=(l("rqav"),l("KHd+")),v=Object(d.a)(p,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("el-card",[0==e.sync_value.length?l("el-form-item",[e._v("未指派给任何人权限")]):e._e(),e._v(" "),e._l(e.sync_value,function(t,n){return l("div",{key:n,staticStyle:{position:"relative","border-bottom":"1px #9E9E9E solid","margin-bottom":"10px"}},[l("div",{staticClass:"index"},[e._v(e._s(n+1))]),e._v(" "),l("div",{staticClass:"romove"},[l("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(t){e.removeItem(e.sync_value,n)}}})],1),e._v(" "),l("el-form-item",{attrs:{label:"允许权限"}},[l("el-select",{staticStyle:{width:"330px"},attrs:{clearable:"",multiple:"",placeholder:"请选择"},model:{value:t.allow,callback:function(l){e.$set(t,"allow",l)},expression:"item.allow"}},[l("el-option",{attrs:{label:"查看",value:"watch"}}),e._v(" "),l("el-option",{attrs:{label:"撤回",value:"revoke"}}),e._v(" "),l("el-option",{attrs:{label:"重发消息",value:"resend"}}),e._v(" "),l("el-option",{attrs:{label:"取消",value:"cancel"}}),e._v(" "),l("el-option",{attrs:{label:"导出",value:"export"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"参与员工"}},[l("chose-contact-group-modal",{attrs:{whitelist:["dept_user","role"],"dept-with-son":!0,"test-type":"onlyspread","with-advance-set":!1,"group-list":t.deptuser}})],1),e._v(" "),l("el-form-item",{attrs:{label:"管理部门"}},[l("el-select",{attrs:{filterable:"",multiple:"",placeholder:"为空默认为<全公司>"},model:{value:t.admindept,callback:function(l){e.$set(t,"admindept",l)},expression:"item.admindept"}},e._l(e.DeptTree,function(e){return l("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})),e._v(" "),l("span",{staticStyle:{"font-size":"12px",color:"red"}},[e._v("此项目一般和运行作用域关联\n                             "),l("el-tooltip",{attrs:{slot:"append",effect:"light",content:"比如创建者是A公司x部门,那么设置成全公司或A公司或x部门都可以看到此流程",placement:"top-start"},slot:"append"},[l("i",{staticClass:"el-icon-question"})])],1)],1)],1)}),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"mini"},on:{click:e.addvalue}},[e._v("添加权限组")])],1)],2)],1)},[],!1,null,"6c1f9d08",null);v.options.__file="CFlowPermission.vue";t.default=v.exports},rqav:function(e,t,l){"use strict";var n=l("gD++");l.n(n).a}}]);