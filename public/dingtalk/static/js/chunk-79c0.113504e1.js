(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-79c0"],{XCCW:function(e,t,s){"use strict";var n=s("skHz");s.n(n).a},c8JH:function(e,t,s){"use strict";s.r(t);var n=s("QbLZ"),i=s.n(n),u=s("cCY5"),l=s.n(u),r=(s("VCwm"),s("L2JU")),c=s("529z"),a={name:"choseUser",mixins:[s.n(c).a],components:{Treeselect:l.a},computed:i()({},Object(r.e)({userByDepts:function(e){return e.contact.userByDepts}})),props:{value:{type:Object,default:function(){return{deptid:null,userid:null}},isSync:!0}},data:function(){return{singleDeptTree:[],LEAF_PRIORITY:"LEAF_PRIORITY",user:null}},watch:{user:function(){if(this.user){var e=this.user.split("__");this.sync_value.deptid=e[0],this.sync_value.userid=e[1]}}},mounted:function(){var e=this;this.sync_value||(this.sync_value={deptid:null,userid:null,deptname:null,username:null}),this.sync_value.deptid&&this.sync_value.userid&&(this.user=this.sync_value.deptid+"__"+this.sync_value.userid),console.log("user",this.user),0==this.userByDepts.length?this.getUserByDeptData().then(function(t){e.singleDeptTree=e.getnowUserdeptList(e.userByDepts,"single")}):this.singleDeptTree=this.getnowUserdeptList(this.userByDepts,"single")},methods:i()({},Object(r.b)(["getUserByDeptData"]),{getnowUserdeptList:function(e,t){for(var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"1",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=[],u=0;u<e.length;u++){var l=e[u];if(l.deptname){var r={label:l.deptname};if(r.id="multiple"==t?l._uuid:null,l.children){if(!(l.children.length>0))continue;r.children=this.getnowUserdeptList(l.children,t,l._uuid,l.deptname)}i.push(r)}l.username&&i.push({id:s+"__"+l._uuid,label:(n?"<"+n+">":"")+l.username})}return i}})},d=(s("XCCW"),s("KHd+")),o=Object(d.a)(a,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("treeselect",{attrs:{"value-consists-of":e.LEAF_PRIORITY,multiple:!1,options:e.singleDeptTree,placeholder:"请输入人员"},model:{value:e.user,callback:function(t){e.user=t},expression:"user"}})],1)},[],!1,null,null,null);o.options.__file="CChoseUser.vue";t.default=o.exports},skHz:function(e,t,s){}}]);