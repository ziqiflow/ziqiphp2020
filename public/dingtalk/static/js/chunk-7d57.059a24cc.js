(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7d57","chunk-2253"],{"8iPY":function(t,e,s){},BEXP:function(t,e,s){"use strict";var n=s("tZa4");s.n(n).a},Fnmp:function(t,e,s){"use strict";s.r(e);var n=s("QbLZ"),a=s.n(n),l=s("USVN"),i=s("L2JU"),o=s("k48p"),r=s("rs8a"),u=s("lYLF"),c={name:"Cflowlog",components:{ModalSeeTable:r.default},props:{flowObj:{type:Object,default:function(){return null}},log:{type:Object,default:function(){return null}},designer:{type:Object,default:function(){return null}},showNext:{type:Boolean,default:function(){return!0}},isAdmin:{type:Boolean,default:function(){return!1}}},computed:a()({},Object(i.e)({userid:function(t){return t.user.id}}),{flowdetailherf:function(){return this.$router.resolve({path:"/flowdetail?flowlistid"}).href}}),data:function(){return{msgStatusModal:!1,statusloading:!1,msgList:[],nowStatusDealType:"",unDealNumList:[],unReadNumList:[],reSendLimit:window.conf.flowReSendLimit,nowProps:{}}},activated:function(){},mounted:function(){},methods:{reSendMessage:function(t){var e=this;if(0==t.length)return this.$message.error("无可发送消息");this.statusloading=!0;var s=this.nowProps,n=s.dealtype,a=s.funid,l=s.premsgid;FlowReSendMessage({msglist:t,dealtype:n,funId:a,preMsgId:l}).then(function(t){t.data;e.statusloading=!1})},canresendpermisson:function(){return!!this.isAdmin||(this.log.created_id==this.userid||!(!this.flowObj||this.flowObj.created_id!=this.userid))},canresend:function(t){return!!this.canresendpermisson()&&(!!t&&Date.parse(new Date(t))/1e3+3600*this.reSendLimit*24<Date.parse(new Date)/1e3)},tableRowClassName:function(t){var e=t.row;t.rowIndex;return-1!=["andsign","orsign"].indexOf(this.nowStatusDealType)?1==e.status&&this.canresend(e.sended_at)?"warning-row":"":"message"==this.nowStatusDealType&&(5==e.status||6==e.status)&&!e.hasread&&this.canresend(e.sended_at)?"warning-row":""},showdepts:function(t){var e=[];return t.forEach(function(t){e.push(t.n)}),0==e.length?"":e.join(",")},showtable:function(t){this.$refs.seetable.set_a_table("查看表格",t.str.set,t.v)},showv:function(t){return void 0===t.str?t.v:t.str},friendlytimejs:function(t){return Object(o.a)(t,new Date)},tran_dealtype:function(t){return Object(l.g)(t)},tran_msgstatus:function(t){return Object(l.h)(t)},downtable:function(){var t=this,e=this.nowProps,s=e.dealtype,n=e.funid,a=e.premsgid;this.statusloading=!0,Object(u.u)({type:"PermsgidFunid",dealtype:s,funId:n,preMsgId:a}).then(function(e){if(t.statusloading=!1,console.log(e),e.data&&e.data.constructor==ArrayBuffer){var s=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),n=URL.createObjectURL(s),a=document.createElement("a");document.body.appendChild(a),a.setAttribute("style","display:none"),a.setAttribute("href",n),a.setAttribute("download","流程状态导出"),a.click(),URL.revokeObjectURL(n)}else t.$message.error(e.data.msg)}).catch(function(e){t.statusloading=!1})},watchStatus:function(t,e,s,n){var a=this;this.nowProps={dealtype:t,funid:s,premsgid:n},this.msgStatusModal=!0,this.statusloading=!0,this.msgList=[],this.nowStatusDealType=e,Object(u.t)({type:"PermsgidFunid",dealtype:t,funId:s,preMsgId:n}).then(function(t){var e=t.data;a.statusloading=!1,e.success?(e.data.forEach(function(t){t.todeptstr||t.todepts&&(t.todeptstr=a.showdepts(t.todepts))}),a.msgList=e.data,-1!=["andsign","orsign"].indexOf(a.nowStatusDealType)&&(a.unDealNumList=a.msgList.filter(function(t){return 1==t.status&&a.canresend(t.sended_at)}).map(function(t){return t._id})),"message"==a.nowStatusDealType&&(a.unReadNumList=a.msgList.filter(function(t){return(5==t.status||6==t.status)&&(!t.hasread&&a.canresend(t.sended_at))}).map(function(t){return t._id}))):a.$message.error(e.msg)}).catch(function(t){a.statusloading=!1})}}},d=(s("nxun"),s("MgAE"),s("KHd+")),_=Object(d.a)(c,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.statusloading,expression:"statusloading"}],attrs:{fullscreen:!t.isPc,visible:t.msgStatusModal,title:"查看状态",width:"75%","append-to-body":""},on:{"update:visible":function(e){t.msgStatusModal=e}}},[s("el-button",{staticClass:"download-msg-list",attrs:{size:"mini",type:"text",icon:"el-icon-download"},on:{click:t.downtable}},[t._v("下载表格")]),t._v(" "),t.msgStatusModal?s("el-table",{staticClass:"msgStatusListTable",staticStyle:{width:"100%"},attrs:{data:t.msgList,"default-sort":{prop:"todeptstr",order:"descending"},"row-class-name":t.tableRowClassName}},[s("el-table-column",{attrs:{label:"部门",width:"180",prop:"todeptstr",sortable:""}}),t._v(" "),s("el-table-column",{attrs:{label:"处理人",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[t._v("\n                    "+t._s(s.toer)+"\n                ")]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[t._v("\n                    "+t._s(t.tran_msgstatus(s.status))+"\n                ")]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"通知状态",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.hassend?s("span",[t._v("已发")]):s("span",{staticStyle:{color:"red"}},[t._v("未发")])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"是否已读",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.hasread?s("span",[t._v("已读")]):s("span",{staticStyle:{color:"red"}},[t._v("未读")])]}}])}),t._v(" "),"message"!=t.nowStatusDealType?s("el-table-column",{attrs:{label:"结束时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[t._v("\n                    "+t._s(s.finished_at)+"\n                ")]}}])}):t._e(),t._v(" "),"message"!=t.nowStatusDealType?s("el-table-column",{attrs:{label:"处理结果",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[n.log?s("span",[t._v("\n                        点击了"+t._s(n.log.button)+"，审批建议："+t._s(n.log.suggest)+"\n                    ")]):t._e()]}}])}):t._e()],1):t._e(),t._v(" "),s("div",{staticStyle:{"margin-top":"10px"}},["message"!=t.nowStatusDealType&&t.unDealNumList.length>0?s("el-button",{attrs:{type:"warning"},on:{click:function(e){t.reSendMessage(t.unDealNumList)}}},[t._v("未处理重新发推送("+t._s(t.unDealNumList.length)+")")]):t._e(),t._v(" "),"message"==t.nowStatusDealType&&t.unReadNumList.length>0?s("el-button",{attrs:{type:"warning"},on:{click:function(e){t.reSendMessage(t.unReadNumList)}}},[t._v("未读的重新发推送("+t._s(t.unReadNumList.length)+")")]):t._e()],1),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.msgStatusModal=!1}}},[t._v("取 消")])],1)],1),t._v(" "),s("modal-see-table",{ref:"seetable",attrs:{"is-admin":t.isAdmin}}),t._v(" "),t.log?s("div",{staticClass:"log"},[s("div",[s("v-icon",{attrs:{name:"person"}}),t._v(" "),t.log.depts&&t.log.depts.length?s("span",[t._v("\n                ["),t._l(t.log.depts,function(e,n){return s("span",{key:e.v},[t._v(t._s(e.n)),n!=t.log.depts.length-1?s("span",[t._v("|")]):t._e()])}),t._v("]\n            ")],2):t._e(),t._v(" "),s("span",{staticClass:"logPerson"},[t._v("\n                "+t._s(t.log.creater))]),t._v(" "),s("span",{staticClass:"logType",staticStyle:{margin:"0 5px"}},[t._v(t._s(t.log.type))]),t._v(" "),s("span",{staticClass:"logCreated_at"},[t._v("于 "+t._s(t.log.created_at)+"\n                ")])],1),t._v(" "),3==t.log.type2||7==t.log.type2?s("div",[t.log.reason?s("div",[t._v("\n                取消原因：\n                "),s("span",{staticClass:"label info"},[t._v(" "+t._s(t.log.reason))])]):t._e(),t._v(" "),t.log.history?s("div",[t._v("\n\n                取消记录：\n                "),s("div",{staticStyle:{"margin-left":"10px"}},[s("table",{staticClass:"table table-bordered"},[s("tbody",[t._m(0),t._v(" "),t._l(t.log.history,function(e,n){return s("tr",{key:n},[s("td",[s("span",{staticClass:"label warning"},[t._v(t._s(e.NowFunName))])]),t._v(" "),s("td",[t._v(t._s(t.tran_dealtype(e.dealtype)))]),t._v(" "),s("td",t._l(e.group,function(e,n){return s("span",{key:n,staticStyle:{"margin-right":"5px"}},[t._v(t._s(e.toer))])}))])})],2)])])]):t._e()]):6==t.log.type2?s("div",[t.log.reason?s("div",[t._v("\n                撤回原因：\n                "),s("span",{staticClass:"label info"},[t._v(t._s(t.log.reason))])]):t._e(),t._v(" "),t.log.history?s("div",[t._v("\n\n                撤回记录：\n                "),s("table",{staticClass:"table table-bordered"},[s("tbody",[t._m(1),t._v(" "),s("tr",[s("td",[t._v("撤销前")]),t._v(" "),s("td",[t._v(" "+t._s(t.log.history.from.FunName))]),t._v(" "),s("td",[t._v(" "+t._s(t.log.history.from.toer))])]),t._v(" "),s("tr",[s("td",[t._v("撤销到")]),t._v(" "),s("td",[t._v(t._s(t.log.history.to.FunName))]),t._v(" "),s("td",[t._v(" "+t._s(t.log.history.to.toer))])])])])]):t._e()]):s("div",[t.log.formdata.length>0?s("div",{staticClass:"logForm"},[s("span",{staticClass:"text-underline"},[t._v(" 填写表单：")]),t._v(" "),t._l(t.log.formdata,function(e,n){return s("span",{key:n,staticStyle:{"margin-right":"8px"}},[t.isAdmin||!e.h?s("span",[t._v("\n\n                        "+t._s(e.n)+":\n\n                        "),"switch"==e.t?s("el-switch",{attrs:{disabled:"",size:"mini"},model:{value:e.v,callback:function(s){t.$set(e,"v",s)},expression:"data.v"}}):"table"==e.t?s("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(s){t.showtable(e)}}},[t._v("查看表格")]):s("span",[t._v(t._s(t.showv(e)))])],1):t._e()])})],2):t._e(),t._v(" "),s("div",{staticClass:"logSuggest"},[s("span",{staticClass:"text-underline"},[t._v("审批意见：")]),t._v(" "),t.log.suggest?s("span",{staticClass:"label info"},[t._v(t._s(t.log.suggest))]):s("span",[t._v("无")])]),t._v(" "),t.log.button?s("div",{staticClass:"logAction"},[s("span",{staticClass:"text-underline"},[t._v(" 点击按键：")]),t._v("「"+t._s(t.log.button)+"」\n                "),s("span",{staticStyle:{"margin-left":"10px"}},[t.log.PreFunName?s("span",{staticClass:"label success"},[t._v(" "+t._s(t.log.PreFunName)+" ")]):s("span",[t._v("/")]),t._v("\n                    ->\n                    "),t.log.NowFunName?s("span",{staticClass:"label warning"},[t._v("\n                        "+t._s(t.log.NowFunName)+"\n                    ")]):t._e()])]):t._e()]),t._v(" "),t.showNext?s("div",[3!=t.log.type2||6!=t.log.type2?s("div",[t.log.nextmsg&&0!=t.log.nextmsg.length?s("div",[s("span",{staticClass:"text-underline"},[t._v("已转发下一流程至：")]),t._v(" "),t._l(t.log.nextmsg,function(e,n){return s("div",{key:n,staticClass:"nextmsgList"},["wait_merge"==e.dealtype?s("div",[t._v("\n                     流程名称："),s("span",{staticClass:"label warning"},[t._v(t._s(e.funname))]),t._v(";\n                     等待以下流程合并：\n                     "),t._l(e.waitmergeFunids,function(e,n){return s("span",{key:n,staticClass:"label warning"},[t._v(t._s(e.name))])})],2):s("div",[t._v("\n                        流程名称：\n                        "),e.list.length>0&&e.level&&100==e.level?s("span",{staticClass:"label error"},[t._v("紧急")]):t._e(),t._v(" "),s("span",{staticClass:"label warning"},[t._v(t._s(e.funname))]),t._v("\n                        ;\n                        处理人： "),t._l(e.list,function(e,n){return s("span",{key:n,staticClass:"label success"},[t._v(t._s(e.name))])}),t._v(" "),0==e.list.length?s("span",[t._v("无")]):t._e(),t._v(" "),s("span",{staticClass:"label error"},[t._v(t._s(t.tran_dealtype(e.dealtype)))]),t._v(" "),t.log.flowmsgid&&e.list.length>0?s("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(s){t.watchStatus(e.dealtype,e.dealtype,e.funid,t.log.flowmsgid)}}},[t._v("查看状态")]):t._e()],2)])})],2):t._e(),t._v(" "),t.log.sonflow&&0!=t.log.sonflow.length?s("div",[s("span",{staticClass:"text-underline"},[t._v("已转发至外部流程：")]),t._v(" "),t._l(t.log.sonflow,function(e,n){return s("div",{key:n,staticClass:"sonflowList"},[t._v("\n                        流程名称："),s("span",{staticClass:"label dark"},[s("v-icon",{staticClass:"fz12",staticStyle:{color:"white"},attrs:{name:"md-git-branch"}}),t._v(" "),e.level&&100==e.level?s("span",{staticClass:"label error"},[t._v("紧急")]):t._e(),t._v("\n                            "+t._s(e.flowname)+"\n\n                        ")],1),t._v("\n                        状态："),e.flowlistid?s("span",[s("span",{staticClass:"label text"},[t._v("成功")]),t._v(" "),s("span",{staticClass:"msg"},[t._v(t._s(e.msg))]),s("a",{attrs:{target:"_blank",href:t.flowdetailherf+"="+e.flowlistid}},[t._v("查看")])]):s("span",[s("span",{staticClass:"label text"},[t._v("失败")]),s("span",{staticClass:"msg"},[t._v(t._s(e.msg))])])])})],2):t._e(),t._v(" "),t.log.nextcc&&0!=t.log.nextcc.length?s("div",[s("span",{staticClass:"text-underline"},[t._v("抄送至：")]),t._v(" "),t._l(t.log.nextcc,function(e,n){return s("div",{key:n,staticClass:"nextccList"},[t._v("\n                        流程名称：\n                        "),e.list.length>0&&e.level&&100==e.level?s("span",{staticClass:"label error"},[t._v("紧急")]):t._e(),t._v(" "),s("span",{staticClass:"label warning"},[t._v(t._s(e.funname))]),t._v("\n                        ;\n                        抄送人： "),t._l(e.list,function(e,n){return s("span",{key:n,staticClass:"label success"},[t._v(t._s(e.name))])}),t._v(" "),t.log.flowmsgid&&e.list.length>0?s("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(s){t.watchStatus("cc","message",e.funid,t.log.flowmsgid)}}},[t._v("查看状态")]):t._e(),t._v(" "),0==e.list.length?s("span",[t._v("无")]):t._e()],2)})],2):t._e()]):t._e()]):t._e(),t._v(" "),3!=t.log.type2||6!=t.log.type2?s("div",[t.log.msg?s("div",[t._v("\n                自动化备注：\n                "+t._s(t.log.msg)+"\n            ")]):t._e()]):t._e()]):t._e()],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",[this._v("流程节点")]),this._v(" "),e("td",[this._v("类型")]),this._v(" "),e("td",[this._v("相关人")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{width:"60px"}}),this._v(" "),e("td",[this._v("节点名称")]),this._v(" "),e("td",{staticStyle:{width:"80px"}},[this._v("处理人")])])}],!1,null,"fb3aad9a",null);_.options.__file="CFlowLog.vue";e.default=_.exports},MgAE:function(t,e,s){"use strict";var n=s("oVLT");s.n(n).a},k48p:function(t,e,s){"use strict";s.d(e,"a",function(){return n});var n=function(t,e){if(!t)return"";var s,n,a,l,i=new Date(e),o=t.split(/\s+/gi),r=function(t,e){try{return parseInt(t,10)}catch(t){return e}},u=function(t){return t<10?"0"+t:t};return o.length>=2?(s=o[0].split(/[\/\-]/gi),n=o[1].split(":"),(a=new Date).setYear(r(s[0],i.getFullYear())),a.setMonth(r(s[1],i.getMonth()+1)-1),a.setDate(r(s[2],i.getDate())),a.setHours(r(n[0],i.getHours())),a.setMinutes(r(n[1],i.getMinutes())),a.setSeconds(r(n[2],i.getSeconds())),(l=i.getTime()-a.getTime())<=6e3?"1分钟内":l<36e5?Math.floor(l/6e4)+"分钟前":l<864e5?Math.floor(l/36e5)+"小时前":l<2592e5?Math.floor(l/864e5)+"天前":i.getFullYear()!=a.getFullYear()?[u(a.getFullYear()),u(a.getMonth()+1),u(a.getDate())].join("-"):[u(a.getMonth()+1),u(a.getDate())].join("-")):""}},nxun:function(t,e,s){"use strict";var n=s("8iPY");s.n(n).a},oVLT:function(t,e,s){},rs8a:function(t,e,s){"use strict";s.r(e);var n={name:"CModelSeeTable",props:{isAdmin:{type:Boolean,default:function(){return!1}}},data:function(){return{title:null,showTableVisible:!1,tabledata:null,set:null,isFullScreen:!1}},mounted:function(){},methods:{toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},funtool_timetrans:function(t){return t?(t=new Date(1e3*t)).getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds()):""},showv:function(t){return t&&t.constructor==Array?t.join(","):t},set_a_table:function(t,e,s){this.title=t,this.tabledata=s,this.set=e,this.showTableVisible=!0}}},a=(s("BEXP"),s("KHd+")),l=Object(a.a)(n,function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showTableVisible?s("div",[s("el-dialog",{attrs:{fullscreen:!t.isPc||t.isFullScreen,title:t.title,visible:t.showTableVisible,width:"75%","append-to-body":""},on:{"update:visible":function(e){t.showTableVisible=e}}},[t.isPc?s("span",{staticClass:"maxzoom"},[t.isFullScreen?s("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"exit-fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}}):s("svg-icon",{staticClass:"fz12",staticStyle:{color:"grey"},attrs:{"icon-class":"fullscreen"},nativeOn:{click:function(e){return t.toggleFullScreen(e)}}})],1):t._e(),t._v(" "),s("el-table",{style:t.styles,attrs:{border:"",data:t.tabledata}},[t._l(t.set,function(e,n){return s("span",{key:n},[t.isAdmin||!e.hide?s("el-table-column",{attrs:{label:e.name,width:e.width},scopedSlots:t._u([{key:"default",fn:function(s){var n=s.row;return[t._v("\n                        "+t._s(t.showv(n[e.code]))+"\n                ")]}}])}):t._e()],1)}),t._v(" "),s("el-table-column",{attrs:{label:"创建者",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[s("div",{staticClass:"fz12"},[t._v(t._s(n._creater))]),t._v(" "),s("div",{staticClass:"fz12"},[t._v(" "+t._s(t.funtool_timetrans(n._c_at)))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"更新者",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[s("div",{staticClass:"fz12"},[t._v(t._s(n._updater))]),t._v(" "),s("div",{staticClass:"fz12"},[t._v(t._s(t.funtool_timetrans(n._u_at)))])]}}])})],2),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.showTableVisible=!1}}},[t._v("取 消")])],1)],1)],1):t._e()},[],!1,null,"e1251ba2",null);l.options.__file="CModalSeeTable.vue";e.default=l.exports},tZa4:function(t,e,s){}}]);