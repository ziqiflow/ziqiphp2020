(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c5f2","chunk-75fa","chunk-32fc","chunk-92e0","chunk-7edf"],{"3YrE":function(t,e,s){"use strict";var l=s("bjYE");s.n(l).a},"4RtC":function(t,e,s){"use strict";s.r(e);var l=s("gDS+"),a=s.n(l),n=s("QbLZ"),i=s.n(n),o=s("gXqY"),r=s("N3UD"),c=s("o6J1"),u=s("TFLU"),d=s("hEBK"),p=s("HMF5"),v=s("L2JU"),m={name:"FlowSet",components:{Divider:o.default,ChoseContactGroupModal:r.default,FormLimit:c.default,FlowAutoAlert:u.default,FlowPermission:d.default,FlowWorkName:p.default},computed:i()({},Object(v.e)({flowset:function(t){return t.flowdesign.set},userByDepts:function(t){return t.contact.userByDepts}})),data:function(){return{exectimelist:[{n:"3小时",v:10800},{n:"6小时",v:21600},{n:"12小时",v:43200},{n:"24小时",v:86400},{n:"2天",v:172800},{n:"3天",v:259200},{n:"4天",v:345600},{n:"5天",v:432e3},{n:"一个星期",v:604800},{n:"2个星期",v:1209600},{n:"30天",v:2592e3},{n:"90天",v:7776e3},{n:"180天",v:15552e3},{n:"无限",v:0}],dealtypelist:[{n:"或签",v:"orsign"},{n:"会签",v:"andsign"}],DeptTree:[]}},mounted:function(){var t=this;console.log("flowset",this.flowset),0==this.userByDepts.length?this.getUserByDeptData().then(function(e){t.DeptTree=t.getdeptList(t.userByDepts),t.DeptTree.unshift({id:"1",label:"全公司"})}):(this.DeptTree=this.getdeptList(this.userByDepts),this.DeptTree.unshift({id:"1",label:"全公司"})),this.flowset.autoalerts||(this.flowset.autoalerts=[{type:"month",month:null,week:null,day:null,time:null,deptuser:[],disminutes:null}]),this.flowset.workname||(this.flowset.workname={auto_len:3,auto_name:"{Y}{M}{D}{H}{I}{S}{RUN}",auto_step:1})},methods:i()({},Object(v.b)(["getUserByDeptData"]),{copyobject:function(t){return JSON.parse(a()(t))},getdeptList:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],s=[],l=0;l<t.length;l++){var a=this.copyobject(e),n=t[l];if(n.deptname){var i={label:(a.join("-")?a.join("-")+"-":"")+n.deptname};if(a.push(n.deptname),i.id=n._uuid,s.push(i),n.children){if(!(n.children.length>0))continue;var o=this.getdeptList(n.children,a);o.length>0&&(s=s.concat(o))}}}return s}})},f=(s("3YrE"),s("RLTN"),s("KHd+")),h=Object(f.a)(m,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flowset"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[t._v("全局设置")])]),t._v(" "),s("div",[s("el-form",{attrs:{"label-width":"150px"}},[s("divider",{attrs:{title:"名称/文号"}}),t._v(" "),s("flow-work-name",{model:{value:t.flowset.workname,callback:function(e){t.$set(t.flowset,"workname",e)},expression:"flowset.workname"}}),t._v(" "),s("div",[s("divider",{attrs:{title:"显示表单配置"}}),t._v(" "),s("el-alert",{attrs:{title:"未设置的情况下会以只读的方式显示已填写的数据,应用于查看流程信息（包含通知，抄送）（默认为只读）",closable:!1,type:"warning"}}),t._v(" "),s("form-limit",{attrs:{usetype:"read"},model:{value:t.flowset.formEditLimit,callback:function(e){t.$set(t.flowset,"formEditLimit",e)},expression:"flowset.formEditLimit"}})],1),t._v(" "),s("div",[s("divider",{attrs:{title:"权限设置"}}),t._v(" "),s("div",[s("flow-permission",{model:{value:t.flowset.permissions,callback:function(e){t.$set(t.flowset,"permissions",e)},expression:"flowset.permissions"}})],1)],1),t._v(" "),s("div",[s("divider",{attrs:{title:"运行作用域"}}),t._v(" "),s("el-form-item",{attrs:{label:"部门Root："}},[s("el-select",{attrs:{filterable:"",multiple:"",placeholder:"默认是组织架构最高层<全公司>"},model:{value:t.flowset.runRoots,callback:function(e){t.$set(t.flowset,"runRoots",e)},expression:"flowset.runRoots"}},t._l(t.DeptTree,function(t){return s("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})),t._v("\n                        匹配Root模式\n                        "),s("el-select",{attrs:{placeholder:"默认模式是流程创建者"},model:{value:t.flowset.runRoottype,callback:function(e){t.$set(t.flowset,"runRoottype",e)},expression:"flowset.runRoottype"}},[s("el-option",{attrs:{label:"流程创建者",value:"creater"}}),t._v(" "),s("el-option",{attrs:{label:"按上一节点提交者",value:"lastuser"}})],1),t._v(" "),s("el-alert",{staticClass:"mg-t5",attrs:{closable:!1,type:"error",title:"*什么是部门ROOT?"}},[t._v("\n              部门Root是指该流程运行的组织架构中的环境；默认是全公司；\n                            "),s("br"),t._v("\n              比如组织架构上总公司->A分公司。\n              那么由A分公司员工创建的流程只在A分公司下; "),s("br"),t._v("\n              也可以在局部流程节点上设置。\n\n            ")]),t._v(" "),s("el-alert",{staticClass:"mg-t5",attrs:{closable:!1,type:"error",title:"*什么是匹配Root模式?"}},[t._v("\n              匹配模式是指在计算下一个节点接收人的时候，按创建者所在的部门计算 还是 上一个流程接受者所在的流程计算"),s("br"),t._v("\n              比如现有流程：A(属于宁波公司)->B(属于宁波公司)->C(属于杭州公司)，如果按创建者所在部门计算，那么C下一步的条件会在宁波公司下选人；如果是按上一审核人所在部门计算，那么C下一步的条件会在杭州公司下选人\n              \n            ")])],1)],1),t._v(" "),s("div",[s("divider",{attrs:{title:"外部流程设置"}}),t._v(" "),s("el-form-item",{attrs:{label:"可作为外部流程"}},[s("el-switch",{model:{value:t.flowset.canBeSonFlow,callback:function(e){t.$set(t.flowset,"canBeSonFlow",e)},expression:"flowset.canBeSonFlow"}})],1),t._v(" "),t.flowset.canBeSonFlow?s("el-card",[s("el-form-item",{attrs:{label:"外部流程的接受者"}},[s("chose-contact-group-modal",{attrs:{whitelist:["dept_user","role","conditions"],"test-type":"spread","dept-with-son":!1,"with-advance-set":!0,"group-list":t.flowset.dealers}})],1),t._v(" "),s("el-form-item",{attrs:{label:"执行方式"}},[s("el-select",{attrs:{size:"small"},model:{value:t.flowset.dealtype,callback:function(e){t.$set(t.flowset,"dealtype",e)},expression:"flowset.dealtype"}},t._l(t.dealtypelist,function(e){return s("el-option",{key:e.v,attrs:{label:e.n,value:e.v}},[t._v(t._s(e.n))])}))],1),t._v(" "),s("el-form-item",{attrs:{label:"执行时效"}},[s("el-select",{attrs:{size:"small"},model:{value:t.flowset.timeexpired,callback:function(e){t.$set(t.flowset,"timeexpired",e)},expression:"flowset.timeexpired"}},t._l(t.exectimelist,function(e){return s("el-option",{key:e.v,attrs:{label:e.n,value:e.v}},[t._v(t._s(e.n))])}))],1)],1):t._e()],1),t._v(" "),s("div",[s("divider",{attrs:{title:"提醒创建"}}),t._v(" "),s("el-form",{attrs:{"label-width":"150px"}},[s("el-form-item",{attrs:{label:"可提醒创建"}},[s("el-switch",{model:{value:t.flowset.canautoalert,callback:function(e){t.$set(t.flowset,"canautoalert",e)},expression:"flowset.canautoalert"}}),t._v(" "),s("span",{staticStyle:{"font-size":"12px",color:"red"}},[t._v("\n                                    会自动发通知给创建人，要求创建人创建。提醒人不易太多；\n                                ")])],1),t._v(" "),t.flowset.canautoalert?s("div",[s("flow-auto-alert",{model:{value:t.flowset.autoalerts,callback:function(e){t.$set(t.flowset,"autoalerts",e)},expression:"flowset.autoalerts"}})],1):t._e()],1)],1)],1)],1)])],1)},[],!1,null,"15c08512",null);h.options.__file="CFlowSet.vue";e.default=h.exports},"4SId":function(t,e,s){"use strict";var l=s("BZRN");s.n(l).a},AgE6:function(t,e,s){"use strict";var l=s("bPJ9");s.n(l).a},BZRN:function(t,e,s){},DHWE:function(t,e,s){},HMF5:function(t,e,s){"use strict";s.r(e);var l=s("529z"),a=s.n(l),n=s("wd/R"),i=s.n(n),o={name:"FlowWorkName",mixins:[a.a],props:{value:{type:Object,default:function(){return{auto_len:3,auto_name:"{Y}{M}{D}{H}{I}{S}{RUN}",auto_step:1}},isSync:!0}},data:function(){return{testWorkNameList:[],tabtype:"operator",dialogVisible:!1,customsList:[{str:"{Y}/{M}/{D} {H}:{I}:{S}",tips:"年月日时分秒"},{str:"{Y}{M}{D}{H}{I}{S}",tips:"年月日时分秒"},{str:"{Y}{M}{D}{H}{I}{S}{RUN}",tips:"年月日时分秒流水号"},{str:"{Y}-{M}-{D}",tips:"年月日"},{str:"{Y}-{M}-{D}-{RUN}",tips:"年月日流水号"},{str:"{Y}-{M}-{D}-{NY}",tips:"年月日按年顺序排"},{str:"{Y}-{M}-{D}-{NM}",tips:"年月日按月顺序排"}],operatorList:[{str:"Y",tips:"年"},{str:"M",tips:"月"},{str:"D",tips:"日"},{str:"H",tips:"时"},{str:"I",tips:"分"},{str:"S",tips:"秒"},{str:"F",tips:"流程名"},{str:"U",tips:"用户姓名"},{str:"SD",tips:"短部门"},{str:"LD",tips:"长部门"},{str:"RUN",tips:"流水号"},{str:"N",tips:"编号，通过编号计数器取值并自动增加计数值"},{str:"NY",tips:"编号，每过一年编号重置一次"},{str:"NM",tips:"编号，每过一月编号重置一次"},{str:"NW",tips:"编号，每过一周编号重置一次"},{str:"ND",tips:"编号，每过一天编号重置一次"}]}},mounted:function(){console.log("workname",this.sync_value)},computed:{},methods:{replaceAll:function(t,e,s){for(var l=t.split(e).length-1,a=0;a<l;a++)t=t.replace(e,s);return t},test:function(){this.dialogVisible=!0,this.testWorkNameList=[];for(var t=0,e=0,s=0,l=0,a=0,n=0,o=i()(),r=0;r<200;r++){t++;var c=Number(this.sync_value.auto_step<=0||!this.sync_value.auto_step?1:this.sync_value.auto_step);e=c,s+=c,l+=c,n+=c,a+=c;var u=o.format("MM"),d=o.format("YYYY"),p=o.format("WW"),v=o.format("DDDD"),m=this.sync_value.auto_name;console.log(m),m=this.replaceAll(m,"{Y}",o.format("YYYY")),m=this.replaceAll(m,"{M}",o.format("MM")),m=this.replaceAll(m,"{D}",o.format("DD")),m=this.replaceAll(m,"{H}",o.format("HH")),m=this.replaceAll(m,"{I}",o.format("mm")),m=this.replaceAll(m,"{S}",o.format("ss")),m=this.replaceAll(m,"{F}","流程名称"),m=this.replaceAll(m,"{SD}","X部门"),m=this.replaceAll(m,"{LD}","A公司-C部门-D部门"),m=this.replaceAll(m,"{RUN}",this.filling(t,this.sync_value.auto_len)),m=this.replaceAll(m,"{N}",this.filling(e,this.sync_value.auto_len)),m=this.replaceAll(m,"{NY}",this.filling(s,this.sync_value.auto_len)),m=this.replaceAll(m,"{NM}",this.filling(l,this.sync_value.auto_len)),m=this.replaceAll(m,"{NW}",this.filling(n,this.sync_value.auto_len)),m=this.replaceAll(m,"{ND}",this.filling(a,this.sync_value.auto_len)),this.testWorkNameList.push(m),(o=o.add(Math.ceil(45*Math.random()*360)*r,"seconds")).format("MM")!=u&&(l=0),o.format("YYYY")!=d&&(s=0),o.format("WW")!=p&&(n=0),o.format("DDDD")!=v&&(a=0)}console.log(this.testWorkNameList)},filling:function(t,e){var s=e-(t+"").length;if(s>0){for(var l="",a=0;a<s;a++)l+="0";return l+t}return t},addAt:function(t){var e=this.$refs.autoname.$el.getElementsByTagName("textarea")[0];e.focus();var s=e.selectionStart,l=e.selectionEnd,a=s,n=e.value;this.sync_value.auto_name=n.substring(0,s)+t+n.substring(l,n.length),a+=t.length,setTimeout(function(){e.selectionStart=e.selectionEnd=a},300)}}},r=(s("4SId"),s("KHd+")),c=Object(r.a)(o,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-dialog",{attrs:{title:"测试数据",visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("span",t._l(t.testWorkNameList,function(e,l){return s("div",{key:l},[t._v("\n                "+t._s(e)+"    \n            ")])})),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])],1)]),t._v(" "),s("el-form-item",{attrs:{label:"文号表达式："}},[s("el-input",{ref:"autoname",attrs:{type:"textarea",rows:2,placeholder:"输入文号表达式"},model:{value:t.sync_value.auto_name,callback:function(e){t.$set(t.sync_value,"auto_name",e)},expression:"sync_value.auto_name"}}),t._v(" "),s("el-tabs",{model:{value:t.tabtype,callback:function(e){t.tabtype=e},expression:"tabtype"}},[s("el-tab-pane",{attrs:{label:"可选符号",name:"operator"}},t._l(t.operatorList,function(e,l){return s("el-tooltip",{key:l,staticClass:"item",attrs:{effect:"dark",content:"提示"+e.tips,placement:"top"}},[s("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{size:"small"},on:{click:function(s){t.addAt("{"+e.str+"}")}}},[t._v(t._s(e.str))])],1)})),t._v(" "),s("el-tab-pane",{attrs:{label:"常用配置",name:"coutoms"}},t._l(t.customsList,function(e,l){return s("el-tooltip",{key:l,staticClass:"item",attrs:{effect:"dark",content:e.tips,placement:"top"}},[s("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{size:"small"},on:{click:function(s){t.sync_value.auto_name=e.str}}},[t._v(t._s(e.str))])],1)})),t._v(" "),s("el-tab-pane",{staticClass:"fz13",attrs:{label:"说明",name:"telling"}},[t._v("\n                {Y} ：表示年 {M} ：表示月 {D}：表示日"),s("br"),t._v("\n                        {H} ：表示时 {I} ：表示分 {S}：表示秒"),s("br"),t._v("\n                        {F} ：表示流程名 {U} ：表示用户姓名 {R}：表示角色"),s("br"),t._v("\n                        {FS}：表示流程分类名称 {SD}：表示短部门"),s("br"),t._v("\n                        {LD}：表示长部门 {RUN}：表示流水号"),s("br"),t._v("\n                        {N} ：表示编号，通过编号计数器取值并自动增加计数值"),s("br"),t._v("\n                        {NY} ：表示编号，每过一年编号重置一次"),s("br"),t._v("\n                        {NM} ：表示编号，每过一月编号重置一次"),s("br")])],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"编号计数步长："}},[s("el-input",{staticStyle:{width:"150px"},attrs:{min:"1",placeholder:"请输入编号计数步长",type:"number"},model:{value:t.sync_value.auto_step,callback:function(e){t.$set(t.sync_value,"auto_step",e)},expression:"sync_value.auto_step"}}),t._v(" "),s("span",{staticClass:"fz12",staticStyle:{color:"red"}},[t._v("包含{N},{NY},{NM},{NW},{ND}时有效,{RUN}时无效")])],1),t._v(" "),s("el-form-item",{attrs:{label:"编号位数："}},[s("el-input-number",{attrs:{size:"mini",min:0,max:30},model:{value:t.sync_value.auto_len,callback:function(e){t.$set(t.sync_value,"auto_len",e)},expression:"sync_value.auto_len"}}),t._v(" "),s("span",{staticClass:"fz12",staticStyle:{color:"red"}},[t._v("与{RUN},{N},{NY},{NM},{NW},{ND}时有效")])],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{size:"mini"},on:{click:t.test}},[t._v("测试")])],1)],1)},[],!1,null,"b11966ea",null);c.options.__file="CFlowWorkName.vue";e.default=c.exports},KCKT:function(t,e,s){"use strict";var l=s("DHWE");s.n(l).a},RLTN:function(t,e,s){"use strict";var l=s("w4eW");s.n(l).a},RnhZ:function(t,e,s){var l={"./af":"K/tc","./af.js":"K/tc","./ar":"jnO4","./ar-dz":"o1bE","./ar-dz.js":"o1bE","./ar-kw":"Qj4J","./ar-kw.js":"Qj4J","./ar-ly":"HP3h","./ar-ly.js":"HP3h","./ar-ma":"CoRJ","./ar-ma.js":"CoRJ","./ar-sa":"gjCT","./ar-sa.js":"gjCT","./ar-tn":"bYM6","./ar-tn.js":"bYM6","./ar.js":"jnO4","./az":"SFxW","./az.js":"SFxW","./be":"H8ED","./be.js":"H8ED","./bg":"hKrs","./bg.js":"hKrs","./bm":"p/rL","./bm.js":"p/rL","./bn":"kEOa","./bn.js":"kEOa","./bo":"0mo+","./bo.js":"0mo+","./br":"aIdf","./br.js":"aIdf","./bs":"JVSJ","./bs.js":"JVSJ","./ca":"1xZ4","./ca.js":"1xZ4","./cs":"PA2r","./cs.js":"PA2r","./cv":"A+xa","./cv.js":"A+xa","./cy":"l5ep","./cy.js":"l5ep","./da":"DxQv","./da.js":"DxQv","./de":"tGlX","./de-at":"s+uk","./de-at.js":"s+uk","./de-ch":"u3GI","./de-ch.js":"u3GI","./de.js":"tGlX","./dv":"WYrj","./dv.js":"WYrj","./el":"jUeY","./el.js":"jUeY","./en-SG":"zavE","./en-SG.js":"zavE","./en-au":"Dmvi","./en-au.js":"Dmvi","./en-ca":"OIYi","./en-ca.js":"OIYi","./en-gb":"Oaa7","./en-gb.js":"Oaa7","./en-ie":"4dOw","./en-ie.js":"4dOw","./en-il":"czMo","./en-il.js":"czMo","./en-nz":"b1Dy","./en-nz.js":"b1Dy","./eo":"Zduo","./eo.js":"Zduo","./es":"iYuL","./es-do":"CjzT","./es-do.js":"CjzT","./es-us":"Vclq","./es-us.js":"Vclq","./es.js":"iYuL","./et":"7BjC","./et.js":"7BjC","./eu":"D/JM","./eu.js":"D/JM","./fa":"jfSC","./fa.js":"jfSC","./fi":"gekB","./fi.js":"gekB","./fo":"ByF4","./fo.js":"ByF4","./fr":"nyYc","./fr-ca":"2fjn","./fr-ca.js":"2fjn","./fr-ch":"Dkky","./fr-ch.js":"Dkky","./fr.js":"nyYc","./fy":"cRix","./fy.js":"cRix","./ga":"USCx","./ga.js":"USCx","./gd":"9rRi","./gd.js":"9rRi","./gl":"iEDd","./gl.js":"iEDd","./gom-latn":"DKr+","./gom-latn.js":"DKr+","./gu":"4MV3","./gu.js":"4MV3","./he":"x6pH","./he.js":"x6pH","./hi":"3E1r","./hi.js":"3E1r","./hr":"S6ln","./hr.js":"S6ln","./hu":"WxRl","./hu.js":"WxRl","./hy-am":"1rYy","./hy-am.js":"1rYy","./id":"UDhR","./id.js":"UDhR","./is":"BVg3","./is.js":"BVg3","./it":"bpih","./it-ch":"bxKX","./it-ch.js":"bxKX","./it.js":"bpih","./ja":"B55N","./ja.js":"B55N","./jv":"tUCv","./jv.js":"tUCv","./ka":"IBtZ","./ka.js":"IBtZ","./kk":"bXm7","./kk.js":"bXm7","./km":"6B0Y","./km.js":"6B0Y","./kn":"PpIw","./kn.js":"PpIw","./ko":"Ivi+","./ko.js":"Ivi+","./ku":"JCF/","./ku.js":"JCF/","./ky":"lgnt","./ky.js":"lgnt","./lb":"RAwQ","./lb.js":"RAwQ","./lo":"sp3z","./lo.js":"sp3z","./lt":"JvlW","./lt.js":"JvlW","./lv":"uXwI","./lv.js":"uXwI","./me":"KTz0","./me.js":"KTz0","./mi":"aIsn","./mi.js":"aIsn","./mk":"aQkU","./mk.js":"aQkU","./ml":"AvvY","./ml.js":"AvvY","./mn":"lYtQ","./mn.js":"lYtQ","./mr":"Ob0Z","./mr.js":"Ob0Z","./ms":"6+QB","./ms-my":"ZAMP","./ms-my.js":"ZAMP","./ms.js":"6+QB","./mt":"G0Uy","./mt.js":"G0Uy","./my":"honF","./my.js":"honF","./nb":"bOMt","./nb.js":"bOMt","./ne":"OjkT","./ne.js":"OjkT","./nl":"+s0g","./nl-be":"2ykv","./nl-be.js":"2ykv","./nl.js":"+s0g","./nn":"uEye","./nn.js":"uEye","./pa-in":"8/+R","./pa-in.js":"8/+R","./pl":"jVdC","./pl.js":"jVdC","./pt":"8mBD","./pt-br":"0tRk","./pt-br.js":"0tRk","./pt.js":"8mBD","./ro":"lyxo","./ro.js":"lyxo","./ru":"lXzo","./ru.js":"lXzo","./sd":"Z4QM","./sd.js":"Z4QM","./se":"//9w","./se.js":"//9w","./si":"7aV9","./si.js":"7aV9","./sk":"e+ae","./sk.js":"e+ae","./sl":"gVVK","./sl.js":"gVVK","./sq":"yPMs","./sq.js":"yPMs","./sr":"zx6S","./sr-cyrl":"E+lV","./sr-cyrl.js":"E+lV","./sr.js":"zx6S","./ss":"Ur1D","./ss.js":"Ur1D","./sv":"X709","./sv.js":"X709","./sw":"dNwA","./sw.js":"dNwA","./ta":"PeUW","./ta.js":"PeUW","./te":"XLvN","./te.js":"XLvN","./tet":"V2x9","./tet.js":"V2x9","./tg":"Oxv6","./tg.js":"Oxv6","./th":"EOgW","./th.js":"EOgW","./tl-ph":"Dzi0","./tl-ph.js":"Dzi0","./tlh":"z3Vd","./tlh.js":"z3Vd","./tr":"DoHr","./tr.js":"DoHr","./tzl":"z1FC","./tzl.js":"z1FC","./tzm":"wQk9","./tzm-latn":"tT3J","./tzm-latn.js":"tT3J","./tzm.js":"wQk9","./ug-cn":"YRex","./ug-cn.js":"YRex","./uk":"raLr","./uk.js":"raLr","./ur":"UpQW","./ur.js":"UpQW","./uz":"Loxo","./uz-latn":"AQ68","./uz-latn.js":"AQ68","./uz.js":"Loxo","./vi":"KSF8","./vi.js":"KSF8","./x-pseudo":"/X5v","./x-pseudo.js":"/X5v","./yo":"fzPg","./yo.js":"fzPg","./zh-cn":"XDpg","./zh-cn.js":"XDpg","./zh-hk":"SatO","./zh-hk.js":"SatO","./zh-tw":"kOpN","./zh-tw.js":"kOpN"};function a(t){var e=n(t);return s(e)}function n(t){var e=l[t];if(!(e+1)){var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}return e}a.keys=function(){return Object.keys(l)},a.resolve=n,t.exports=a,a.id="RnhZ"},TFLU:function(t,e,s){"use strict";s.r(e);var l=s("QbLZ"),a=s.n(l),n=s("529z"),i=s.n(n),o=s("N3UD"),r=s("L2JU"),c={name:"FlowAutoRun",mixins:[i.a],components:{ChoseContactGroupModal:o.default},props:{value:{type:Array,default:function(){return[{type:"month",month:null,week:null,day:null,time:null,deptuser:[],disminutes:null}]},isSync:!0}},data:function(){return{}},watch:{sync_value:{handler:function(t,e){var s=this;this.sync_value.forEach(function(t){t.type,"month"==t.type&&(t.day&&t.time?t.disminutes=1440*Number(t.day-1)+s.minutesto(t.time):t.disminutes=null),"week"==t.type&&(t.week&&t.time?t.disminutes=1440*Number(t.week-1)+s.minutesto(t.time):t.disminutes=null),"day"==t.type&&(t.time?t.disminutes=s.minutesto(t.time):t.disminutes=null)})},deep:!0}},mounted:function(){},computed:a()({},Object(r.c)(["requireDataList"])),methods:{minutesto:function(t){if(!t)return 0;var e=t.split(":");return 2==e.length?60*Number(e[0])+Number(e[1]):0},addvalue:function(){this.sync_value.push({type:"month",month:null,week:null,day:null,time:null,deptuser:[],disminutes:null})},removeItem:function(t,e){t.splice(e,1)}}},u=(s("KCKT"),s("KHd+")),d=Object(u.a)(c,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-card",[t._l(t.sync_value,function(e,l){return s("div",{key:l,staticStyle:{position:"relative","border-bottom":"1px #9E9E9E solid","margin-bottom":"10px"}},[s("div",{staticClass:"index"},[t._v(t._s(l+1))]),t._v(" "),s("div",{staticClass:"romove"},[s("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(e){t.removeItem(t.sync_value,l)}}})],1),t._v(" "),s("el-form-item",{attrs:{label:"触发时间"}},[s("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择"},model:{value:e.type,callback:function(s){t.$set(e,"type",s)},expression:"item.type"}},[s("el-option",{attrs:{label:"按年触发",value:"year"}}),t._v(" "),s("el-option",{attrs:{label:"按月触发",value:"month"}}),t._v(" "),s("el-option",{attrs:{label:"按周触发",value:"week"}}),t._v(" "),s("el-option",{attrs:{label:"按天触发",value:"day"}})],1),t._v(" "),"year"==e.type?s("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"那个月"},model:{value:e.month,callback:function(s){t.$set(e,"month",s)},expression:"item.month"}},t._l(12,function(t){return s("el-option",{key:t,attrs:{label:"每年"+t+"月",value:t}})})):t._e(),t._v(" "),"month"==e.type||"year"==e.type?s("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"那一天"},model:{value:e.day,callback:function(s){t.$set(e,"day",s)},expression:"item.day"}},t._l(31,function(t){return s("el-option",{key:t,attrs:{label:"每月"+t+"号",value:t}})})):t._e(),t._v(" "),"week"==e.type?s("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"那一天"},model:{value:e.week,callback:function(s){t.$set(e,"week",s)},expression:"item.week"}},t._l(7,function(t){return s("el-option",{key:t,attrs:{label:"每周星期"+t,value:t}})})):t._e(),t._v(" "),s("el-time-select",{staticStyle:{width:"150px"},attrs:{"picker-options":{start:"00:00",step:"00:05",end:"24:00"},placeholder:"选择时间"},model:{value:e.time,callback:function(s){t.$set(e,"time",s)},expression:"item.time"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"通知员工"}},[s("chose-contact-group-modal",{attrs:{whitelist:["dept_user","role"],"dept-with-son":!0,"test-type":"onlyspread","with-advance-set":!1,"group-list":e.deptuser}})],1)],1)}),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"mini"},on:{click:t.addvalue}},[t._v("添加")])],1)],2)],1)},[],!1,null,"f6f5fbfc",null);d.options.__file="CFlowAutoAlert.vue";e.default=d.exports},bPJ9:function(t,e,s){},bjYE:function(t,e,s){},"gD++":function(t,e,s){},hEBK:function(t,e,s){"use strict";s.r(e);var l=s("gDS+"),a=s.n(l),n=s("QbLZ"),i=s.n(n),o=s("529z"),r=s.n(o),c=s("N3UD"),u=s("L2JU"),d={name:"FlowPermission",mixins:[r.a],components:{ChoseContactGroupModal:c.default},props:{value:{type:Array,default:function(){return[]},isSync:!0}},data:function(){return{DeptTree:[]}},mounted:function(){var t=this;0==this.userByDepts.length?this.getUserByDeptData().then(function(e){t.DeptTree=t.getdeptList(t.userByDepts),t.DeptTree.unshift({id:"1",label:"全公司"})}):(this.DeptTree=this.getdeptList(this.userByDepts),this.DeptTree.unshift({id:"1",label:"全公司"}))},computed:i()({},Object(u.c)(["requireDataList"]),Object(u.e)({userByDepts:function(t){return t.contact.userByDepts}})),methods:i()({},Object(u.b)(["getUserByDeptData"]),{minutesto:function(t){if(!t)return 0;var e=t.split(":");return 2==e.length?60*Number(e[0])+Number(e[1]):0},addvalue:function(){this.sync_value.push({allow:[],deptuser:[],admindept:[]})},removeItem:function(t,e){t.splice(e,1)},copyobject:function(t){return JSON.parse(a()(t))},getdeptList:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],s=[],l=0;l<t.length;l++){var a=this.copyobject(e),n=t[l];if(n.deptname){var i={label:(a.join("-")?a.join("-")+"-":"")+n.deptname};if(a.push(n.deptname),i.id=n._uuid,s.push(i),n.children){if(!(n.children.length>0))continue;var o=this.getdeptList(n.children,a);o.length>0&&(s=s.concat(o))}}}return s}})},p=(s("rqav"),s("KHd+")),v=Object(p.a)(d,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-card",[0==t.sync_value.length?s("el-form-item",[t._v("未指派给任何人权限")]):t._e(),t._v(" "),t._l(t.sync_value,function(e,l){return s("div",{key:l,staticStyle:{position:"relative","border-bottom":"1px #9E9E9E solid","margin-bottom":"10px"}},[s("div",{staticClass:"index"},[t._v(t._s(l+1))]),t._v(" "),s("div",{staticClass:"romove"},[s("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(e){t.removeItem(t.sync_value,l)}}})],1),t._v(" "),s("el-form-item",{attrs:{label:"允许权限"}},[s("el-select",{staticStyle:{width:"330px"},attrs:{clearable:"",multiple:"",placeholder:"请选择"},model:{value:e.allow,callback:function(s){t.$set(e,"allow",s)},expression:"item.allow"}},[s("el-option",{attrs:{label:"查看",value:"watch"}}),t._v(" "),s("el-option",{attrs:{label:"撤回",value:"revoke"}}),t._v(" "),s("el-option",{attrs:{label:"重发消息",value:"resend"}}),t._v(" "),s("el-option",{attrs:{label:"取消",value:"cancel"}}),t._v(" "),s("el-option",{attrs:{label:"导出",value:"export"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"参与员工"}},[s("chose-contact-group-modal",{attrs:{whitelist:["dept_user","role"],"dept-with-son":!0,"test-type":"onlyspread","with-advance-set":!1,"group-list":e.deptuser}})],1),t._v(" "),s("el-form-item",{attrs:{label:"管理部门"}},[s("el-select",{attrs:{filterable:"",multiple:"",placeholder:"为空默认为<全公司>"},model:{value:e.admindept,callback:function(s){t.$set(e,"admindept",s)},expression:"item.admindept"}},t._l(t.DeptTree,function(t){return s("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})),t._v(" "),s("span",{staticStyle:{"font-size":"12px",color:"red"}},[t._v("此项目一般和运行作用域关联\n                             "),s("el-tooltip",{attrs:{slot:"append",effect:"light",content:"比如创建者是A公司x部门,那么设置成全公司或A公司或x部门都可以看到此流程",placement:"top-start"},slot:"append"},[s("i",{staticClass:"el-icon-question"})])],1)],1)],1)}),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"mini"},on:{click:t.addvalue}},[t._v("添加权限组")])],1)],2)],1)},[],!1,null,"6c1f9d08",null);v.options.__file="CFlowPermission.vue";e.default=v.exports},o6J1:function(t,e,s){"use strict";s.r(e);var l=s("gDS+"),a=s.n(l),n=s("QbLZ"),i=s.n(n),o=s("529z"),r=s.n(o),c=s("L2JU"),u=(s("fHYj"),s("USVN")),d=(s("GB7V"),{name:"FormLimit",mixins:[r.a],components:{},props:{value:{type:Array,default:function(){return[]},isSync:!0},usetype:{type:String,default:"edit"}},data:function(){return{editlist:[],EditModalStatus:!1,canEditList:[],readonlyList:[],hiddenList:[],allcanedit:!1,allreadonly:!1,allhidden:!1}},watch:{sync_value:function(){this.init()}},mounted:function(){this.init()},computed:i()({},Object(c.c)(["requireDataList"]),Object(c.e)({formSet:function(t){return t.flowdesign.formSet}})),methods:{inittable:function(t,e){t||(t=[]),console.log("tableItem",Object(u.c)(this.formSet.list,e.key));var s=Object(u.c)(this.formSet.list,e.key);if(!s)return[];for(var l=s.options.tableset,a=t.length-1;a>=0;a--){for(var n=t[a],i=!1,o=0;o<l.length;o++){var r=l[o];if(r.code==n.key){i=!0,n.name=r.name;break}}i||t.splice(a,1)}return l.forEach(function(e){var s=!1;t.forEach(function(t){t.key==e.code&&(s=!0)}),s||t.push({name:e.name,key:e.code,type:null,required:!1,t:"tableItem"})}),t},init:function(){var t=this;console.log("console.log(this.requireDataList);",this.requireDataList),console.log("sync_value1",this.sync_value),this.sync_value||(this.sync_value=[]);for(var e=this.sync_value.length-1;e>=0;e--){for(var s=this.sync_value[e],l=!1,a=0;a<this.requireDataList.length;a++){var n=this.requireDataList[a];if(n.key==s.key){l=!0,s.name=n.name,s.t=n.type,"table"==s.t&&(s.son=this.inittable(s.son,n),console.log("ele.son",s.son));break}}l||this.sync_value.splice(e,1)}this.requireDataList.forEach(function(e){var s=!1;if(t.sync_value.forEach(function(t){t.key==e.key&&(s=!0)}),!s){var l={name:e.name,key:e.key,type:null,required:!1,t:e.type};"table"==e.type&&(l.son=t.inittable([],e),l.table_add=!1,l.table_edit=!1,l.table_delete=!1),t.sync_value.push(l)}}),console.log("sync_value2",this.sync_value),this.initdisplaydata()},whenRadioChange:function(){var t=0,e=0,s=0,l=this.editlist.length;this.editlist.forEach(function(a){switch(a.type){case"canedit":t++;break;case"readonly":e++;break;case"hidden":s++}"table"==a.t&&a.son&&(l+=a.son.length,a.son.forEach(function(l){switch(l.type){case"canedit":t++;break;case"readonly":e++;break;case"hidden":s++}}))}),this.allcanedit=l==t,this.allreadonly=l==e,this.allhidden=l==s},whencheckboxChange:function(t,e){var s=this;this.editlist.forEach(function(s){t?(s.type=e,"table"==s.t&&s.son&&s.son.forEach(function(s){s.type=t?e:null})):s.type=null}),setTimeout(function(){s.whenRadioChange()},100)},copyobject:function(t){return JSON.parse(a()(t))},initdisplaydata:function(){var t=this,e=[],s=[],l=[];this.sync_value&&this.sync_value.forEach(function(a){var n=t.copyobject(a);"table"==n.t&&(n.sonhidden=[],n.soncanedit=[],n.sonreadonly=[],n.son.forEach(function(t){"hidden"==t.type&&n.sonhidden.push(t),"canedit"==n.type&&n.soncanedit.push(t),"readonly"==n.type&&n.sonreadonly.push(t)})),"hidden"==n.type&&s.push(n),"canedit"==n.type&&e.push(n),"readonly"==n.type&&l.push(n)}),this.canEditList=e,this.hiddenList=s,this.readonlyList=l},tranname:function(t){for(var e=0;e<this.requireDataList.length;e++){var s=this.requireDataList[e];if(s.key==t)return s.name}return null},saveEdit:function(){this.sync_value=JSON.parse(a()(this.editlist)),this.initdisplaydata(),this.EditModalStatus=!1},editFormSet:function(){this.sync_value?this.editlist=JSON.parse(a()(this.sync_value)):this.editlist=[],this.EditModalStatus=!0}}}),p=(s("AgE6"),s("KHd+")),v=Object(p.a)(d,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cFormLimit"},[s("el-dialog",{attrs:{title:"编辑表单设置",visible:t.EditModalStatus,width:"500px"},on:{"update:visible":function(e){t.EditModalStatus=e}}},[s("el-alert",{attrs:{title:"未设置的情况下会以只读的方式显示已填写的数据",closable:!1,type:"warning"}}),t._v(" "),s("div",{staticClass:"formtabe"},[s("el-row",{staticClass:"row fz14",staticStyle:{"font-weight":"bolder"},attrs:{gutter:10}},[s("el-col",{attrs:{span:7}},[t._v("表单字段")]),t._v(" "),"read"!=t.usetype?s("el-col",{attrs:{span:5}},[s("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"canedit")}},model:{value:t.allcanedit,callback:function(e){t.allcanedit=e},expression:"allcanedit"}},[t._v("可编辑")])],1):t._e(),t._v(" "),"read"!=t.usetype?s("el-col",{attrs:{span:4}},[t._v("是否必填")]):t._e(),t._v(" "),s("el-col",{attrs:{span:4}},[s("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"readonly")}},model:{value:t.allreadonly,callback:function(e){t.allreadonly=e},expression:"allreadonly"}},[t._v("只读")])],1),t._v(" "),s("el-col",{attrs:{span:4}},[s("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"hidden")}},model:{value:t.allhidden,callback:function(e){t.allhidden=e},expression:"allhidden"}},[t._v("隐藏")])],1)],1),t._v(" "),t._l(t.editlist,function(e,l){return s("div",{key:l},[s("el-radio-group",{staticStyle:{"font-size":"13px",display:"block","line-height":"18px"},model:{value:e.type,callback:function(s){t.$set(e,"type",s)},expression:"item.type"}},[s("el-row",{staticClass:"row",attrs:{gutter:10}},[s("el-col",{attrs:{span:7}},["table"==e.t?s("span",[t._v("(表格)")]):t._e(),t._v(" "),"placeholderhtml"==e.t?s("span",[t._v("(文本)")]):t._e(),t._v("\n                            "+t._s(e.name))]),t._v(" "),"read"!=t.usetype?s("el-col",{attrs:{span:5}},["placeholderhtml"==e.t?s("div",[s("span",{staticStyle:{color:"white"}},[t._v("p")])]):s("el-radio",{attrs:{label:"canedit"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1):t._e(),t._v(" "),"read"!=t.usetype?s("el-col",{attrs:{span:4}},["canedit"!=e.type||"placeholderhtml"==e.t?s("div",[s("span",{staticStyle:{color:"white"}},[t._v("p")])]):s("el-checkbox",{attrs:{title:"显示"},model:{value:e.required,callback:function(s){t.$set(e,"required",s)},expression:"item.required"}})],1):t._e(),t._v(" "),s("el-col",{attrs:{span:4}},[s("el-radio",{attrs:{label:"readonly"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1),t._v(" "),s("el-col",{attrs:{span:4}},[s("el-radio",{attrs:{label:"hidden"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1)],1)],1),t._v(" "),"table"==e.t?s("div",{staticStyle:{"font-size":"12px","line-height":"25px","background-color":"rgb(239, 245, 186)"}},[s("el-row",{staticClass:"row",staticStyle:{"padding-left":"20px"}},[t._v("\n                        表单属性\n\n                        "),s("el-checkbox",{model:{value:e.table_add,callback:function(s){t.$set(e,"table_add",s)},expression:"item.table_add"}},[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可在表单中添加行",placement:"top-start"}},[s("span",{staticClass:"fz12"},[t._v("可添加")])])],1),t._v(" "),s("el-checkbox",{staticClass:"fz12",model:{value:e.table_edit,callback:function(s){t.$set(e,"table_edit",s)},expression:"item.table_edit"}},[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据编辑",placement:"top-start"}},[s("span",{staticClass:"fz12"},[t._v("可编辑")])])],1),t._v(" "),s("el-checkbox",{staticClass:"fz12",model:{value:e.table_delete,callback:function(s){t.$set(e,"table_delete",s)},expression:"item.table_delete"}},[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据进行删除",placement:"top-start"}},[s("span",{staticClass:"fz12"},[t._v("可删除")])])],1)],1),t._v(" "),t._l(e.son,function(e,l){return s("div",{key:l},[s("el-radio-group",{staticStyle:{"font-size":"13px",display:"block","line-height":"18px"},model:{value:e.type,callback:function(s){t.$set(e,"type",s)},expression:"item2.type"}},[s("el-row",{staticClass:"row",staticStyle:{"margin-top":"0px","margin-bottom":"0px"},attrs:{gutter:10}},[s("el-col",{attrs:{span:7}},[s("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(e.name))])]),t._v(" "),"read"!=t.usetype?s("el-col",{attrs:{span:5}},[s("el-radio",{attrs:{label:"canedit"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1):t._e(),t._v(" "),"read"!=t.usetype?s("el-col",{attrs:{span:4}},["canedit"!=e.type?s("div",[s("span",{staticStyle:{color:"white"}},[t._v("p")])]):s("el-checkbox",{attrs:{title:"显示"},model:{value:e.required,callback:function(s){t.$set(e,"required",s)},expression:"item2.required"}})],1):t._e(),t._v(" "),s("el-col",{attrs:{span:4}},[s("el-radio",{attrs:{label:"readonly"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1),t._v(" "),s("el-col",{attrs:{span:4}},[s("el-radio",{attrs:{label:"hidden"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1)],1)],1)],1)})],2):t._e()],1)})],2),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.EditModalStatus=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"可编辑项目:"}},[t._l(t.canEditList,function(e,l){return s("span",{key:l},[e.required?s("span",{staticStyle:{color:"red"}},[t._v("*")]):t._e(),t._v("\n        "+t._s(e.name)+"\n        "),"table"==e.t?s("span",[e.table_add?s("span",[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可在表单中添加行",placement:"top-start"}},[s("span",[t._v("(可添加)")])])],1):t._e(),t._v(" "),e.table_edit?s("span",[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据编辑",placement:"top-start"}},[s("span",[t._v("(可编辑)")])])],1):t._e(),t._v(" "),e.table_delete?s("span",[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据进行删除",placement:"top-start"}},[s("span",[t._v("(可删除)")])])],1):t._e()]):t._e(),t._v(" "),"table"==e.t&&e.soncanedit.length?s("span",[t._v("(\n            "),t._l(e.soncanedit,function(l,a){return s("span",{key:a},[l.required?s("span",{staticStyle:{color:"red"}},[t._v("*")]):t._e(),t._v(" "+t._s(l.name)+"\n        "),e.soncanedit.length-1!=a?s("span",[t._v("|")]):t._e()])}),t._v(")\n        ")],2):t._e(),t._v(" "),t.canEditList.length-1!=l?s("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.canEditList.length?s("span",[t._v("无")]):t._e()],2),t._v(" "),s("el-form-item",{attrs:{label:"只读项目:"}},[t._l(t.readonlyList,function(e,l){return s("span",{key:l},[t._v("\n                "+t._s(e.name)+" \n                "),t.readonlyList.length-1!=l?s("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.readonlyList.length?s("span",[t._v("无")]):t._e()],2),t._v(" "),s("el-form-item",{attrs:{label:"隐藏项目:"}},[t._l(t.hiddenList,function(e,l){return s("span",{key:l},[t._v("\n                "+t._s(e.name)+" \n                "),t.hiddenList.length-1!=l?s("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.hiddenList.length?s("span",[t._v("无")]):t._e()],2),t._v(" "),s("el-form-item",{attrs:{label:""}},[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.editFormSet}},[t._v("编辑表单设置")])],1)],1)},[],!1,null,"29669c6c",null);v.options.__file="CFormLimit.vue";e.default=v.exports},rqav:function(t,e,s){"use strict";var l=s("gD++");s.n(l).a},w4eW:function(t,e,s){}}]);