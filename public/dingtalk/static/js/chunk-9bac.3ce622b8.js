(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9bac"],{dCMJ:function(e,t,r){},lUb6:function(e,t,r){"use strict";r.r(t);var a=r("lYLF"),o={name:"FlowTimeOutSummary",components:{searchFormCommon:{extends:r("HWK0").default,props:{},methods:{funtool_timetrans:function(e){return(e=new Date(1e3*e)).getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},filterfun_int_to_datetime:function(e,t,r){if(!e[t])return null;try{return this.funtool_timetrans(e[t].$date.$numberLong/1e3)}catch(e){return console.log(e),null}},button_click_showdetail:function(e){console.log("row",e),this.$refs.flowdetail.loadmodal(e.flowlistid.$oid,"查看 "+e.flowname+" 明细")},showexport:function(){return!0},exportData:function(){var e=this;this.$confirm("确定导出数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$refs.generateForm.getData().then(function(t){e.search.form=t;var r=e.getpostdata();Object(a.H)(r).then(function(t){if(console.log(t),t.data&&t.data.constructor==ArrayBuffer){var r=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),a=URL.createObjectURL(r),o=document.createElement("a");document.body.appendChild(o),o.setAttribute("style","display:none"),o.setAttribute("href",a),o.setAttribute("download","超时日志"),o.click(),URL.revokeObjectURL(a)}else e.$message.error(t.data.msg)})}).catch(function(e){console.log(e),console.log("有需求信息没有填写")})}).catch(function(){})},search_submit:function(){var e=this;this.searchloading=!0,this.searchinfo={type:"default",info:"加载中"},this.$refs.generateForm.getData().then(function(t){e.search.form=t;var r=e.getpostdata();r.flowid=e.flowid,Object(a.J)(r).then(function(t){var r=t.data;if(e.searchloading=!1,e.$emit("afterSearch",r),!r.success)return e.$message.error(r.msg),void(e.searchinfo={type:"error",info:r.msg});e.searchinfo={type:"info",info:r.msg},setTimeout(function(){e.searchinfo.info=null},3e3)})}).catch(function(e){console.log(e),console.log("有需求信息没有填写")})}}}},data:function(){return{loading:!1,error:null,aftersearcherror:null,summaryresult:[]}},mounted:function(){var e=this;this.loading=!0,Object(a.I)({}).then(function(t){var r=t.data;e.loading=!1,e.pageset=r.data.pageset,e.searchdefault=r.data.DefaultData;var a=new Date;e.searchdefault.search={form:{first_expired_at:a.getFullYear()+"-"+(a.getMonth()+1)+"-01"},orderby:[]}})},methods:{dateCount:function(e){var t=e/3600/24,r=Math.floor(t),a=24*(t-r),o=Math.floor(a),n=60*(a-o),l=Math.floor(n),s=60*(n-l),i=(Math.floor(s),"");return r&&(i+=Math.abs(r)+"天"),o&&(i+=o+"小时"),l&&(i+=l+"分钟"),i},filtertimes:function(e){},afterSearch:function(e){var t=this;if(console.log("afres",e),!e.success)return this.$message.error(e.msg),void(this.aftersearcherror=e.msg);this.aftersearcherror=null,e.data.forEach(function(e){e.expirealltimeMinute=Math.floor(e.expirealltime/60),e.expirealltimeStr=t.dateCount(e.expirealltime)}),this.summaryresult=e.data}}},n=(r("vUqS"),r("KHd+")),l=Object(n.a)(o,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{margin:"10px"}},[e.error?r("el-alert",{attrs:{closable:!1,title:e.error,type:"error"}}):r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[e.pageset?r("div",[r("h3",{staticStyle:{margin:"10px"}},[e._v("流程超时汇总")]),e._v(" "),e.pageset?r("search-form-common",{attrs:{"page-set":e.pageset,default:e.searchdefault},on:{afterSearch:e.afterSearch}},[r("div",{attrs:{slot:"searchresult"},slot:"searchresult"},[e.aftersearcherror?r("el-alert",{attrs:{closable:!1,title:e.aftersearcherror,type:"error"}}):r("div",[r("el-card",[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.summaryresult,"default-sort":{prop:"toer",order:"descending"}}},[r("el-table-column",{attrs:{prop:"toer",label:"姓名",sortable:"",width:"130"}}),e._v(" "),r("el-table-column",{attrs:{prop:"finishNum",label:"完成数量",sortable:"",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"unfinishNum",label:"未完成数量",sortable:"",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"expiredtimes",label:"超时次数",sortable:"",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"expirealltimeMinute",label:"超时总时长(分钟)",sortable:"",width:"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"expirealltimeStr",label:"超时总时长",width:"120"}})],1)],1)],1)],1)]):e._e()],1):e._e()])],1)},[],!1,null,null,null);l.options.__file="FlowTimeoutSummary.vue";t.default=l.exports},vUqS:function(e,t,r){"use strict";var a=r("dCMJ");r.n(a).a}}]);