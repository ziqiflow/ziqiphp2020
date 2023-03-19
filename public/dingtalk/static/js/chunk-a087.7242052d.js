(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a087"],{"4SId":function(t,s,e){"use strict";var a=e("BZRN");e.n(a).a},BZRN:function(t,s,e){},HMF5:function(t,s,e){"use strict";e.r(s);var a=e("529z"),l=e.n(a),n=e("wd/R"),r=e.n(n),i={name:"FlowWorkName",mixins:[l.a],props:{value:{type:Object,default:function(){return{auto_len:3,auto_name:"{Y}{M}{D}{H}{I}{S}{RUN}",auto_step:1}},isSync:!0}},data:function(){return{testWorkNameList:[],tabtype:"operator",dialogVisible:!1,customsList:[{str:"{Y}/{M}/{D} {H}:{I}:{S}",tips:"年月日时分秒"},{str:"{Y}{M}{D}{H}{I}{S}",tips:"年月日时分秒"},{str:"{Y}{M}{D}{H}{I}{S}{RUN}",tips:"年月日时分秒流水号"},{str:"{Y}-{M}-{D}",tips:"年月日"},{str:"{Y}-{M}-{D}-{RUN}",tips:"年月日流水号"},{str:"{Y}-{M}-{D}-{NY}",tips:"年月日按年顺序排"},{str:"{Y}-{M}-{D}-{NM}",tips:"年月日按月顺序排"}],operatorList:[{str:"Y",tips:"年"},{str:"M",tips:"月"},{str:"D",tips:"日"},{str:"H",tips:"时"},{str:"I",tips:"分"},{str:"S",tips:"秒"},{str:"F",tips:"流程名"},{str:"U",tips:"用户姓名"},{str:"SD",tips:"短部门"},{str:"LD",tips:"长部门"},{str:"RUN",tips:"流水号"},{str:"N",tips:"编号，通过编号计数器取值并自动增加计数值"},{str:"NY",tips:"编号，每过一年编号重置一次"},{str:"NM",tips:"编号，每过一月编号重置一次"},{str:"NW",tips:"编号，每过一周编号重置一次"},{str:"ND",tips:"编号，每过一天编号重置一次"}]}},mounted:function(){console.log("workname",this.sync_value)},computed:{},methods:{replaceAll:function(t,s,e){for(var a=t.split(s).length-1,l=0;l<a;l++)t=t.replace(s,e);return t},test:function(){this.dialogVisible=!0,this.testWorkNameList=[];for(var t=0,s=0,e=0,a=0,l=0,n=0,i=r()(),o=0;o<200;o++){t++;var c=Number(this.sync_value.auto_step<=0||!this.sync_value.auto_step?1:this.sync_value.auto_step);s=c,e+=c,a+=c,n+=c,l+=c;var u=i.format("MM"),j=i.format("YYYY"),p=i.format("WW"),m=i.format("DDDD"),v=this.sync_value.auto_name;console.log(v),v=this.replaceAll(v,"{Y}",i.format("YYYY")),v=this.replaceAll(v,"{M}",i.format("MM")),v=this.replaceAll(v,"{D}",i.format("DD")),v=this.replaceAll(v,"{H}",i.format("HH")),v=this.replaceAll(v,"{I}",i.format("mm")),v=this.replaceAll(v,"{S}",i.format("ss")),v=this.replaceAll(v,"{F}","流程名称"),v=this.replaceAll(v,"{SD}","X部门"),v=this.replaceAll(v,"{LD}","A公司-C部门-D部门"),v=this.replaceAll(v,"{RUN}",this.filling(t,this.sync_value.auto_len)),v=this.replaceAll(v,"{N}",this.filling(s,this.sync_value.auto_len)),v=this.replaceAll(v,"{NY}",this.filling(e,this.sync_value.auto_len)),v=this.replaceAll(v,"{NM}",this.filling(a,this.sync_value.auto_len)),v=this.replaceAll(v,"{NW}",this.filling(n,this.sync_value.auto_len)),v=this.replaceAll(v,"{ND}",this.filling(l,this.sync_value.auto_len)),this.testWorkNameList.push(v),(i=i.add(Math.ceil(45*Math.random()*360)*o,"seconds")).format("MM")!=u&&(a=0),i.format("YYYY")!=j&&(e=0),i.format("WW")!=p&&(n=0),i.format("DDDD")!=m&&(l=0)}console.log(this.testWorkNameList)},filling:function(t,s){var e=s-(t+"").length;if(e>0){for(var a="",l=0;l<e;l++)a+="0";return a+t}return t},addAt:function(t){var s=this.$refs.autoname.$el.getElementsByTagName("textarea")[0];s.focus();var e=s.selectionStart,a=s.selectionEnd,l=e,n=s.value;this.sync_value.auto_name=n.substring(0,e)+t+n.substring(a,n.length),l+=t.length,setTimeout(function(){s.selectionStart=s.selectionEnd=l},300)}}},o=(e("4SId"),e("KHd+")),c=Object(o.a)(i,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("el-dialog",{attrs:{title:"测试数据",visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(s){t.dialogVisible=s}}},[e("span",t._l(t.testWorkNameList,function(s,a){return e("div",{key:a},[t._v("\n                "+t._s(s)+"    \n            ")])})),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(s){t.dialogVisible=!1}}},[t._v("取 消")])],1)]),t._v(" "),e("el-form-item",{attrs:{label:"文号表达式："}},[e("el-input",{ref:"autoname",attrs:{type:"textarea",rows:2,placeholder:"输入文号表达式"},model:{value:t.sync_value.auto_name,callback:function(s){t.$set(t.sync_value,"auto_name",s)},expression:"sync_value.auto_name"}}),t._v(" "),e("el-tabs",{model:{value:t.tabtype,callback:function(s){t.tabtype=s},expression:"tabtype"}},[e("el-tab-pane",{attrs:{label:"可选符号",name:"operator"}},t._l(t.operatorList,function(s,a){return e("el-tooltip",{key:a,staticClass:"item",attrs:{effect:"dark",content:"提示"+s.tips,placement:"top"}},[e("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{size:"small"},on:{click:function(e){t.addAt("{"+s.str+"}")}}},[t._v(t._s(s.str))])],1)})),t._v(" "),e("el-tab-pane",{attrs:{label:"常用配置",name:"coutoms"}},t._l(t.customsList,function(s,a){return e("el-tooltip",{key:a,staticClass:"item",attrs:{effect:"dark",content:s.tips,placement:"top"}},[e("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{size:"small"},on:{click:function(e){t.sync_value.auto_name=s.str}}},[t._v(t._s(s.str))])],1)})),t._v(" "),e("el-tab-pane",{staticClass:"fz13",attrs:{label:"说明",name:"telling"}},[t._v("\n                {Y} ：表示年 {M} ：表示月 {D}：表示日"),e("br"),t._v("\n                        {H} ：表示时 {I} ：表示分 {S}：表示秒"),e("br"),t._v("\n                        {F} ：表示流程名 {U} ：表示用户姓名 {R}：表示角色"),e("br"),t._v("\n                        {FS}：表示流程分类名称 {SD}：表示短部门"),e("br"),t._v("\n                        {LD}：表示长部门 {RUN}：表示流水号"),e("br"),t._v("\n                        {N} ：表示编号，通过编号计数器取值并自动增加计数值"),e("br"),t._v("\n                        {NY} ：表示编号，每过一年编号重置一次"),e("br"),t._v("\n                        {NM} ：表示编号，每过一月编号重置一次"),e("br")])],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"编号计数步长："}},[e("el-input",{staticStyle:{width:"150px"},attrs:{min:"1",placeholder:"请输入编号计数步长",type:"number"},model:{value:t.sync_value.auto_step,callback:function(s){t.$set(t.sync_value,"auto_step",s)},expression:"sync_value.auto_step"}}),t._v(" "),e("span",{staticClass:"fz12",staticStyle:{color:"red"}},[t._v("包含{N},{NY},{NM},{NW},{ND}时有效,{RUN}时无效")])],1),t._v(" "),e("el-form-item",{attrs:{label:"编号位数："}},[e("el-input-number",{attrs:{size:"mini",min:0,max:30},model:{value:t.sync_value.auto_len,callback:function(s){t.$set(t.sync_value,"auto_len",s)},expression:"sync_value.auto_len"}}),t._v(" "),e("span",{staticClass:"fz12",staticStyle:{color:"red"}},[t._v("与{RUN},{N},{NY},{NM},{NW},{ND}时有效")])],1),t._v(" "),e("el-form-item",[e("el-button",{attrs:{size:"mini"},on:{click:t.test}},[t._v("测试")])],1)],1)},[],!1,null,"b11966ea",null);c.options.__file="CFlowWorkName.vue";s.default=c.exports},RnhZ:function(t,s,e){var a={"./af":"K/tc","./af.js":"K/tc","./ar":"jnO4","./ar-dz":"o1bE","./ar-dz.js":"o1bE","./ar-kw":"Qj4J","./ar-kw.js":"Qj4J","./ar-ly":"HP3h","./ar-ly.js":"HP3h","./ar-ma":"CoRJ","./ar-ma.js":"CoRJ","./ar-sa":"gjCT","./ar-sa.js":"gjCT","./ar-tn":"bYM6","./ar-tn.js":"bYM6","./ar.js":"jnO4","./az":"SFxW","./az.js":"SFxW","./be":"H8ED","./be.js":"H8ED","./bg":"hKrs","./bg.js":"hKrs","./bm":"p/rL","./bm.js":"p/rL","./bn":"kEOa","./bn.js":"kEOa","./bo":"0mo+","./bo.js":"0mo+","./br":"aIdf","./br.js":"aIdf","./bs":"JVSJ","./bs.js":"JVSJ","./ca":"1xZ4","./ca.js":"1xZ4","./cs":"PA2r","./cs.js":"PA2r","./cv":"A+xa","./cv.js":"A+xa","./cy":"l5ep","./cy.js":"l5ep","./da":"DxQv","./da.js":"DxQv","./de":"tGlX","./de-at":"s+uk","./de-at.js":"s+uk","./de-ch":"u3GI","./de-ch.js":"u3GI","./de.js":"tGlX","./dv":"WYrj","./dv.js":"WYrj","./el":"jUeY","./el.js":"jUeY","./en-SG":"zavE","./en-SG.js":"zavE","./en-au":"Dmvi","./en-au.js":"Dmvi","./en-ca":"OIYi","./en-ca.js":"OIYi","./en-gb":"Oaa7","./en-gb.js":"Oaa7","./en-ie":"4dOw","./en-ie.js":"4dOw","./en-il":"czMo","./en-il.js":"czMo","./en-nz":"b1Dy","./en-nz.js":"b1Dy","./eo":"Zduo","./eo.js":"Zduo","./es":"iYuL","./es-do":"CjzT","./es-do.js":"CjzT","./es-us":"Vclq","./es-us.js":"Vclq","./es.js":"iYuL","./et":"7BjC","./et.js":"7BjC","./eu":"D/JM","./eu.js":"D/JM","./fa":"jfSC","./fa.js":"jfSC","./fi":"gekB","./fi.js":"gekB","./fo":"ByF4","./fo.js":"ByF4","./fr":"nyYc","./fr-ca":"2fjn","./fr-ca.js":"2fjn","./fr-ch":"Dkky","./fr-ch.js":"Dkky","./fr.js":"nyYc","./fy":"cRix","./fy.js":"cRix","./ga":"USCx","./ga.js":"USCx","./gd":"9rRi","./gd.js":"9rRi","./gl":"iEDd","./gl.js":"iEDd","./gom-latn":"DKr+","./gom-latn.js":"DKr+","./gu":"4MV3","./gu.js":"4MV3","./he":"x6pH","./he.js":"x6pH","./hi":"3E1r","./hi.js":"3E1r","./hr":"S6ln","./hr.js":"S6ln","./hu":"WxRl","./hu.js":"WxRl","./hy-am":"1rYy","./hy-am.js":"1rYy","./id":"UDhR","./id.js":"UDhR","./is":"BVg3","./is.js":"BVg3","./it":"bpih","./it-ch":"bxKX","./it-ch.js":"bxKX","./it.js":"bpih","./ja":"B55N","./ja.js":"B55N","./jv":"tUCv","./jv.js":"tUCv","./ka":"IBtZ","./ka.js":"IBtZ","./kk":"bXm7","./kk.js":"bXm7","./km":"6B0Y","./km.js":"6B0Y","./kn":"PpIw","./kn.js":"PpIw","./ko":"Ivi+","./ko.js":"Ivi+","./ku":"JCF/","./ku.js":"JCF/","./ky":"lgnt","./ky.js":"lgnt","./lb":"RAwQ","./lb.js":"RAwQ","./lo":"sp3z","./lo.js":"sp3z","./lt":"JvlW","./lt.js":"JvlW","./lv":"uXwI","./lv.js":"uXwI","./me":"KTz0","./me.js":"KTz0","./mi":"aIsn","./mi.js":"aIsn","./mk":"aQkU","./mk.js":"aQkU","./ml":"AvvY","./ml.js":"AvvY","./mn":"lYtQ","./mn.js":"lYtQ","./mr":"Ob0Z","./mr.js":"Ob0Z","./ms":"6+QB","./ms-my":"ZAMP","./ms-my.js":"ZAMP","./ms.js":"6+QB","./mt":"G0Uy","./mt.js":"G0Uy","./my":"honF","./my.js":"honF","./nb":"bOMt","./nb.js":"bOMt","./ne":"OjkT","./ne.js":"OjkT","./nl":"+s0g","./nl-be":"2ykv","./nl-be.js":"2ykv","./nl.js":"+s0g","./nn":"uEye","./nn.js":"uEye","./pa-in":"8/+R","./pa-in.js":"8/+R","./pl":"jVdC","./pl.js":"jVdC","./pt":"8mBD","./pt-br":"0tRk","./pt-br.js":"0tRk","./pt.js":"8mBD","./ro":"lyxo","./ro.js":"lyxo","./ru":"lXzo","./ru.js":"lXzo","./sd":"Z4QM","./sd.js":"Z4QM","./se":"//9w","./se.js":"//9w","./si":"7aV9","./si.js":"7aV9","./sk":"e+ae","./sk.js":"e+ae","./sl":"gVVK","./sl.js":"gVVK","./sq":"yPMs","./sq.js":"yPMs","./sr":"zx6S","./sr-cyrl":"E+lV","./sr-cyrl.js":"E+lV","./sr.js":"zx6S","./ss":"Ur1D","./ss.js":"Ur1D","./sv":"X709","./sv.js":"X709","./sw":"dNwA","./sw.js":"dNwA","./ta":"PeUW","./ta.js":"PeUW","./te":"XLvN","./te.js":"XLvN","./tet":"V2x9","./tet.js":"V2x9","./tg":"Oxv6","./tg.js":"Oxv6","./th":"EOgW","./th.js":"EOgW","./tl-ph":"Dzi0","./tl-ph.js":"Dzi0","./tlh":"z3Vd","./tlh.js":"z3Vd","./tr":"DoHr","./tr.js":"DoHr","./tzl":"z1FC","./tzl.js":"z1FC","./tzm":"wQk9","./tzm-latn":"tT3J","./tzm-latn.js":"tT3J","./tzm.js":"wQk9","./ug-cn":"YRex","./ug-cn.js":"YRex","./uk":"raLr","./uk.js":"raLr","./ur":"UpQW","./ur.js":"UpQW","./uz":"Loxo","./uz-latn":"AQ68","./uz-latn.js":"AQ68","./uz.js":"Loxo","./vi":"KSF8","./vi.js":"KSF8","./x-pseudo":"/X5v","./x-pseudo.js":"/X5v","./yo":"fzPg","./yo.js":"fzPg","./zh-cn":"XDpg","./zh-cn.js":"XDpg","./zh-hk":"SatO","./zh-hk.js":"SatO","./zh-tw":"kOpN","./zh-tw.js":"kOpN"};function l(t){var s=n(t);return e(s)}function n(t){var s=a[t];if(!(s+1)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s}l.keys=function(){return Object.keys(a)},l.resolve=n,t.exports=l,l.id="RnhZ"}}]);