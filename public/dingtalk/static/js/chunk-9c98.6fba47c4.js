(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9c98"],{DHWE:function(e,t,l){},KCKT:function(e,t,l){"use strict";var n=l("DHWE");l.n(n).a},TFLU:function(e,t,l){"use strict";l.r(t);var n=l("QbLZ"),i=l.n(n),a=l("529z"),o=l.n(a),s=l("N3UD"),u=l("L2JU"),r={name:"FlowAutoRun",mixins:[o.a],components:{ChoseContactGroupModal:s.default},props:{value:{type:Array,default:function(){return[{type:"month",month:null,week:null,day:null,time:null,deptuser:[],disminutes:null}]},isSync:!0}},data:function(){return{}},watch:{sync_value:{handler:function(e,t){var l=this;this.sync_value.forEach(function(e){e.type,"month"==e.type&&(e.day&&e.time?e.disminutes=1440*Number(e.day-1)+l.minutesto(e.time):e.disminutes=null),"week"==e.type&&(e.week&&e.time?e.disminutes=1440*Number(e.week-1)+l.minutesto(e.time):e.disminutes=null),"day"==e.type&&(e.time?e.disminutes=l.minutesto(e.time):e.disminutes=null)})},deep:!0}},mounted:function(){},computed:i()({},Object(u.c)(["requireDataList"])),methods:{minutesto:function(e){if(!e)return 0;var t=e.split(":");return 2==t.length?60*Number(t[0])+Number(t[1]):0},addvalue:function(){this.sync_value.push({type:"month",month:null,week:null,day:null,time:null,deptuser:[],disminutes:null})},removeItem:function(e,t){e.splice(t,1)}}},c=(l("KCKT"),l("KHd+")),m=Object(c.a)(r,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("el-card",[e._l(e.sync_value,function(t,n){return l("div",{key:n,staticStyle:{position:"relative","border-bottom":"1px #9E9E9E solid","margin-bottom":"10px"}},[l("div",{staticClass:"index"},[e._v(e._s(n+1))]),e._v(" "),l("div",{staticClass:"romove"},[l("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(t){e.removeItem(e.sync_value,n)}}})],1),e._v(" "),l("el-form-item",{attrs:{label:"触发时间"}},[l("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择"},model:{value:t.type,callback:function(l){e.$set(t,"type",l)},expression:"item.type"}},[l("el-option",{attrs:{label:"按年触发",value:"year"}}),e._v(" "),l("el-option",{attrs:{label:"按月触发",value:"month"}}),e._v(" "),l("el-option",{attrs:{label:"按周触发",value:"week"}}),e._v(" "),l("el-option",{attrs:{label:"按天触发",value:"day"}})],1),e._v(" "),"year"==t.type?l("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"那个月"},model:{value:t.month,callback:function(l){e.$set(t,"month",l)},expression:"item.month"}},e._l(12,function(e){return l("el-option",{key:e,attrs:{label:"每年"+e+"月",value:e}})})):e._e(),e._v(" "),"month"==t.type||"year"==t.type?l("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"那一天"},model:{value:t.day,callback:function(l){e.$set(t,"day",l)},expression:"item.day"}},e._l(31,function(e){return l("el-option",{key:e,attrs:{label:"每月"+e+"号",value:e}})})):e._e(),e._v(" "),"week"==t.type?l("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"那一天"},model:{value:t.week,callback:function(l){e.$set(t,"week",l)},expression:"item.week"}},e._l(7,function(e){return l("el-option",{key:e,attrs:{label:"每周星期"+e,value:e}})})):e._e(),e._v(" "),l("el-time-select",{staticStyle:{width:"150px"},attrs:{"picker-options":{start:"00:00",step:"00:05",end:"24:00"},placeholder:"选择时间"},model:{value:t.time,callback:function(l){e.$set(t,"time",l)},expression:"item.time"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"通知员工"}},[l("chose-contact-group-modal",{attrs:{whitelist:["dept_user","role"],"dept-with-son":!0,"test-type":"onlyspread","with-advance-set":!1,"group-list":t.deptuser}})],1)],1)}),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"mini"},on:{click:e.addvalue}},[e._v("添加")])],1)],2)],1)},[],!1,null,"f6f5fbfc",null);m.options.__file="CFlowAutoAlert.vue";t.default=m.exports}}]);