(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7776","chunk-fa18"],{"4FPG":function(e,t,i){},fjxl:function(e,t,i){"use strict";var n=i("4FPG");i.n(n).a},fneM:function(e,t,i){},lZxQ:function(e,t,i){"use strict";i.r(t);var n=i("QbLZ"),s=i.n(n),r=i("529z"),a=i.n(r),l=i("cCY5"),o=i.n(l),u=(i("VCwm"),i("L2JU")),c=i("fe1z"),d=i("X4fA"),f={name:"Contacts",mixins:[a.a],components:{Treeselect:o.a},props:{value:{type:String,default:function(){return null},isSync:!0}},data:function(){return{loading:!1,error:null,tabtype:"dept",singleDeptTree:[],LEAF_PRIORITY:"LEAF_PRIORITY",deptcolumns:[{text:"部门名称",value:"deptname",width:"250px"},{text:"员工名称",value:"username",width:"100px"},{text:"员工工号",value:"userjobid",width:"80px"}]}},computed:s()({},Object(u.e)({userByDepts:function(e){return e.contact.userByDepts}})),methods:s()({},Object(u.b)(["GetRoleTree","getUserByDeptData"]),{getnowUserdeptList:function(e,t){for(var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"1",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=[],r=0;r<e.length;r++){var a=e[r];if(a.deptname){var l={label:a.deptname};if(l.id="multiple"==t?a._uuid:null,a.children){if(!(a.children.length>0))continue;l.children=this.getnowUserdeptList(a.children,t,a._uuid,a.deptname)}s.push(l)}a.username&&s.push({id:i+"__"+a._uuid,label:(n?"<"+n+">":"")+a.username})}return s},initUserList:function(){var e=this;this.userList=[],this.userByDepts.forEach(function(t){e.userList.push(t)})},changetouser:function(e){var t=this;if(e){var i=e.split("__");Object(c.b)({userid:i[1]}).then(function(e){var i=e.data;console.log(i,"res"),i.success?(Object(d.e)(i.data.token,window.env[window.envname].CookieTokenKey),window.history.go(0)):t.$message.error(i.msg)})}else alert("用户名编号不可为空")},importDataFormDingtalk:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"dept";this.loading=!0,GetDataFormDingtalk(t).then(function(t){var i=t.data;e.loading=!1,i.success?e.$message.success(i.msg):e.$message.error(i.msg),console.log(i)})}}),activated:function(){console.log("activated")},mounted:function(){var e=this;0==this.userByDepts.length?this.getUserByDeptData().then(function(t){e.singleDeptTree=e.getnowUserdeptList(e.userByDepts,"single")}):this.singleDeptTree=this.getnowUserdeptList(this.userByDepts,"single")}},p=(i("wBQA"),i("KHd+")),h=Object(p.a)(f,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[e.error?i("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):i("div",[i("treeselect",{staticStyle:{"line-height":"35px"},attrs:{"disable-branch-nodes":!0,"value-consists-of":e.LEAF_PRIORITY,multiple:!1,options:e.singleDeptTree,placeholder:"请输入要切换人的姓名"},model:{value:e.sync_value,callback:function(t){e.sync_value=t},expression:"sync_value"}})],1)],1)},[],!1,null,null,null);h.options.__file="CchangeUser2.vue";t.default=h.exports},npKU:function(e,t,i){"use strict";i.r(t);var n=i("lZxQ"),s=i("X4fA"),r=(i("LvDl"),i("bDny")),a=i.n(r),l=i("fe1z"),o={name:"FlowSeeEmployee",destroyed:function(){window.onresize=null},components:{ChangeUser2:n.default,VueFriendlyIframe:a.a},data:function(){return{dialogVisible:!1,error:null,userid:null,wrapperHeight:null,iframeSrc:"/dingtalkReplace/index.html#/replace_employee"}},mounted:function(){},methods:{initiframe:function(){this.wrapperHeight=this.$refs.iframevue.parentElement.offsetHeight;var e=this;window.onresize=_.debounce(function(){console.log("onresize:"),e.wrapperHeight=e.$refs.iframevue.parentElement.offsetHeight},400)},queryData:function(){var e=this;if(this.userid){var t=this.userid.split("__");Object(l.a)({userid:t[1]}).then(function(t){var i=t.data;i.success?(Object(s.e)(i.data.token,window.env.replace_emp.CookieTokenKey),e.dialogVisible=!0,setTimeout(function(){e.initiframe()},500)):e.$message.error(i.msg)})}else this.$message.error("未选择员工")}}},u=(i("fjxl"),i("KHd+")),c=Object(u.a)(o,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"FlowSeeEmployee",staticStyle:{margin:"10px"}},[e.error?i("el-alert",{attrs:{closable:!1,title:e.error,type:"error"}}):e._e(),e._v(" "),i("div",[e._v("\n        选择员工：\n        "),i("div",{staticStyle:{"line-height":"36px"}},[i("change-user2",{staticStyle:{width:"300px",display:"inline-block",float:"left"},model:{value:e.userid,callback:function(t){e.userid=t},expression:"userid"}}),e._v(" "),i("el-button",{staticStyle:{"margin-left":"10px"},on:{click:e.queryData}},[e._v("查询")])],1)]),e._v(" "),i("el-dialog",{attrs:{title:"查看员工oa记录",visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{ref:"iframevue",staticClass:"iframevue"},[e.iframeSrc?i("vue-friendly-iframe",{staticStyle:{height:"650px"},attrs:{src:e.iframeSrc}}):e._e()],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)])],1)},[],!1,null,null,null);c.options.__file="FlowSeeEmployee.vue";t.default=c.exports},wBQA:function(e,t,i){"use strict";var n=i("fneM");i.n(n).a}}]);