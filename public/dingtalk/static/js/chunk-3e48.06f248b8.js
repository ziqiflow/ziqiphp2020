(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3e48","chunk-8c85","chunk-0171"],{"3sUU":function(t,e,n){},AgE6:function(t,e,n){"use strict";var a=n("bPJ9");n.n(a).a},BzDd:function(t,e,n){"use strict";n.r(e);var a=n("gDS+"),i=n.n(a),o=n("QbLZ"),s=n.n(o),l=n("Qtz6"),r=n("yWzC"),d=n("gXqY"),c=n("o6J1"),u=n("USVN"),h=n("N3UD"),f=n("FRYs"),p=n.n(f),v=n("L2JU"),m=n("7Qib"),_={name:"FlowNodeManger",components:{diagram:l.default,ChoseContactGroupModal:h.default,Divider:d.default,btnGroup:r.default,draggable:p.a,FormLimit:c.default},data:function(){return{showformlimit:!0,dealtypelist:[{n:"或签",v:"orsign"},{n:"会签",v:"andsign"},{n:"通知",v:"message"}],execdolist:[{n:"不执行",v:"null"}],exectimelist:[{n:"3小时",v:10800},{n:"6小时",v:21600},{n:"12小时",v:43200},{n:"24小时",v:86400},{n:"2天",v:172800},{n:"3天",v:259200},{n:"4天",v:345600},{n:"5天",v:432e3},{n:"一个星期",v:604800},{n:"2个星期",v:1209600},{n:"30天",v:2592e3},{n:"90天",v:7776e3},{n:"180天",v:15552e3},{n:"无限",v:0}],choseIndex:0,nowfun:null,nowrequiredata:[],canseedata:[],lastDiagramDataStr:"",showDiagram:!1,diagramData:{nodeDataArray:[{key:1,text:"Alpha",color:"lightblue"},{key:2,text:"Beta",color:"orange"},{key:3,text:"Gamma",color:"lightgreen"},{key:4,text:"Delta",color:"pink"}],linkDataArray:[{from:1,to:2},{from:1,to:3},{from:3,to:4}]}}},watch:{choseIndex:function(){this.initnowdata()},funlist:{handler:function(t,e){this.initnowdata()},deep:!0}},mounted:function(){var t=this;Object(m.d)(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){t.showDiagram=!0}),console.log("modmomo"),console.log("this.diagramData222",this.diagramData),this.initnowdata()},computed:s()({},Object(v.e)({funlist:function(t){return t.flowdesign.funList},layoutset:function(t){return t.flowdesign.layoutset}})),methods:s()({},Object(v.d)(["setLayOutSet"]),{ToggleFormLimit:function(){var t=this;this.showformlimit=!1,setTimeout(function(){t.showformlimit=!0},100)},tran_dealtype:function(t){for(var e=0;e<this.dealtypelist.length;e++){var n=this.dealtypelist[e];if(n.v==t)return n.n}return"无"},getLayoutInfo:function(){var t=[];return console.log("this.diagramData",this.diagramData),this.diagramData.nodeDataArray.forEach(function(e){e.loc&&t.push({key:e.key,loc:e.loc})}),t.length&&(this.setLayOutSet(t),console.log("setLayOutSet2222")),console.log("layoutset",t),t},initnowdata:function(){console.log("initnowdata"),console.log(this.funlist.length),this.nowfun=this.funlist[this.choseIndex]?this.funlist[this.choseIndex]:null,console.log("funlist",this.funlist),this.getLayoutInfo();var t=Object(u.b)(this.funlist,this.layoutset),e=t.linkDataArray,n=t.nodeDataArray,a=i()({nodeDataArray:n,linkDataArray:e});a!=this.lastDiagramDataStr&&(this.lastDiagramDataStr=a,this.diagramData={nodeDataArray:n,linkDataArray:e})},deletefun:function(t){confirm("确定删除此流程节点")&&(this.funlist[t].is_start&&!confirm("此为开始节点，删除后务必重新创建，确定删除")||this.funlist.splice(t,1))},is_start:function(){for(var t=0;t<this.funlist.length;t++){if(this.funlist[t].is_start)return!1}return!0},creatFunNode:function(){var t=(new Date).getTime()+""+parseInt(1e5*Math.random());this.funlist.push({id:t,name:"流程节点:"+t,desc:"",is_start:this.is_start(),formEditLimit:[],btnGroup:[{name:"同意",defaultFunId:[],defaultSonFlowId:[],NextFun:[],handler:{funId:[],SonFlowId:[]}}],creatPermission:[{chosetype:"or",chosed:[{type:"dept",id:"1",name:"全公司",data:{coverage:"n"}}],runRoots:[],runRoottype:null,runRoot:""}],Previous:[],timeexpired:0,expireddo:[],cc:[],dealtype:"orsign",dealers:[]}),this.choseIndex=this.funlist.length-1,this.initnowdata()}})},g=(n("F/V9"),n("rweH"),n("KHd+")),y=Object(g.a)(_,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nodemanger"},[t.showDiagram?n("diagram",{ref:"diag",staticStyle:{border:"solid 1px black",width:"100%",height:"250px"},attrs:{"model-data":t.diagramData}}):t._e(),t._v(" "),n("div",{staticClass:"mt20"},[n("ul",{staticClass:"leftlist"},[n("li",{staticClass:"head"},[t._v("已创建的节点")]),t._v(" "),0==t.funlist.length?n("li",[t._v("未创建任何流程")]):t._e(),t._v(" "),n("draggable",{model:{value:t.funlist,callback:function(e){t.funlist=e},expression:"funlist"}},t._l(t.funlist,function(e,a){return n("li",{key:e.id},[n("a",{class:{nowchose:t.choseIndex==a},on:{click:function(e){t.choseIndex=a}}},[t._v("\n              > "),t.choseIndex==a?n("span",[t._v(">")]):t._e(),t._v(" "),e.is_start?n("span",[t._v("【开始节点】")]):t._e(),t._v("\n              "+t._s(e.name)+"\n            ")]),t._v(" "),n("v-icon",{staticStyle:{cursor:"pointer",position:"absolute",right:"0px",top:"3px"},attrs:{name:"Trash"},on:{click:function(e){t.deletefun(a)}}})],1)})),t._v(" "),n("div",{staticStyle:{"margin-top":"20px"}},[n("el-button",{attrs:{icon:"el-icon-plus",type:"danger",size:"small",round:""},on:{click:t.creatFunNode}},[t._v("创建流程节点")])],1)],1),t._v(" "),n("div",{staticClass:"editbox"},[0==t.funlist.length?n("div",{staticClass:"pd10"},[t._v("当前未创建任何节点")]):n("div",[t.nowfun?n("div",[n("div",{staticClass:"title pd10"},[t._v("编辑 "),n("b",[t._v(t._s(t.nowfun.name))]),t._v(" 节点")]),t._v(" "),n("el-form",{staticClass:"form",staticStyle:{padding:"0px 20px"},attrs:{"label-position":"right","label-width":"120px"}},[n("Divider",{attrs:{title:"基本信息"}}),t._v(" "),n("el-form-item",{attrs:{label:"是否开始流程："}},[t.nowfun.is_start?n("span",[t._v("是（start）")]):n("span",[t._v("否")])]),t._v(" "),n("el-form-item",{attrs:{required:"",label:"流程名称："}},[n("el-input",{staticStyle:{width:"190px"},attrs:{size:"small",placeholder:"请输入流程名称"},model:{value:t.nowfun.name,callback:function(e){t.$set(t.nowfun,"name",e)},expression:"nowfun.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"流程说明："}},[n("el-input",{attrs:{type:"textarea",placeholder:"可输入流程说明"},model:{value:t.nowfun.desc,callback:function(e){t.$set(t.nowfun,"desc",e)},expression:"nowfun.desc"}})],1),t._v(" "),t.nowfun.is_start||"message"!=t.nowfun.dealtype?n("div",[n("Divider",{attrs:{title:"表单设置"}}),t._v(" "),t.showformlimit?n("form-limit",{model:{value:t.nowfun.formEditLimit,callback:function(e){t.$set(t.nowfun,"formEditLimit",e)},expression:"nowfun.formEditLimit"}}):t._e()],1):t._e(),t._v(" "),t.nowfun.is_start||"message"!=t.nowfun.dealtype?n("div",[n("Divider",{attrs:{title:"流程走向"}}),t._v(" "),n("el-form-item",{attrs:{label:"按键组："}},[n("btn-group",{attrs:{group:t.nowfun.btnGroup},on:{"update:group":function(e){t.$set(t.nowfun,"btnGroup",e)}}}),t._v(" "),n("span",{staticStyle:{color:"red"}},[t._v("*会签只能有一个按键哦。如多个按键只显示第一个按键")])],1)],1):t._e(),t._v(" "),n("Divider",{attrs:{title:"流程配置"}}),t._v(" "),t.nowfun.is_start?n("div",[n("el-form-item",{attrs:{required:"",label:"允许创建人："}},[n("chose-contact-group-modal",{attrs:{whitelist:["dept_user","role"],"test-type":"onlyspread","with-advance-set":!1,"dept-with-son":!0,"group-list":t.nowfun.creatPermission}})],1)],1):n("div",[n("el-form-item",{attrs:{required:"",label:"接受者："}},[n("chose-contact-group-modal",{attrs:{"test-type":"spread","dept-with-son":!1,"with-advance-set":!0,"group-list":t.nowfun.dealers}})],1),t._v(" "),n("el-form-item",{attrs:{label:"抄送人："}},[n("chose-contact-group-modal",{attrs:{"test-type":"spread","dept-with-son":!1,"with-advance-set":!0,"group-list":t.nowfun.cc}})],1),t._v(" "),n("el-form-item",{attrs:{required:"",label:"执行方式："}},[n("el-select",{staticStyle:{width:"100%"},attrs:{size:"small"},model:{value:t.nowfun.dealtype,callback:function(e){t.$set(t.nowfun,"dealtype",e)},expression:"nowfun.dealtype"}},t._l(t.dealtypelist,function(e){return n("el-option",{key:e.v,attrs:{label:e.n,value:e.v}},[t._v(t._s(e.n))])}))],1),t._v(" "),"message"!=t.nowfun.dealtype?n("div",[n("el-form-item",{attrs:{required:"",label:"执行时效："}},[n("el-select",{staticStyle:{width:"100%"},attrs:{size:"small"},model:{value:t.nowfun.timeexpired,callback:function(e){t.$set(t.nowfun,"timeexpired",e)},expression:"nowfun.timeexpired"}},t._l(t.exectimelist,function(e){return n("el-option",{key:e.v,attrs:{label:e.n,value:e.v}},[t._v(t._s(e.n))])}))],1)],1):t._e(),t._v(" "),n("Divider",{attrs:{title:"触发节点事件"}}),t._v(" "),n("el-form-item",{attrs:{label:"处理后："}},[t._v(" 后期根据功能加入，暂时不做功能")])],1)],1)],1):n("div",{directives:[{name:"loading",rawName:"v-loading",value:!0,expression:"true"}],staticStyle:{height:"500px"}})])])])],1)},[],!1,null,"27c5eed6",null);y.options.__file="CFlowNodeManger.vue";e.default=y.exports},"F/V9":function(t,e,n){"use strict";var a=n("3sUU");n.n(a).a},Hbfb:function(t,e,n){},Qtz6:function(t,e,n){"use strict";n.r(e);var a,i=n("YEIV"),o=n.n(i),s=n("7Qib"),l=(a={name:"",props:["modelData"]},o()(a,"props",{modelData:{type:Object,default:function(){return{}}},angle:{type:Number,default:function(){return 0}},readonly:{type:Boolean,default:function(){return!1}}}),o()(a,"data",function(){return{diagram:null}}),o()(a,"computed",{}),o()(a,"watch",{modelData:function(t){this.updateModel(t)}}),o()(a,"mounted",function(){var t=this;window.go?this.init():Object(s.d)(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){t.init()})}),o()(a,"methods",{init:function(){console.log("window.go"),console.log(window.go);var t=window.go.GraphObject.make,e=this,n=t(window.go.Diagram,this.$el,{initialContentAlignment:window.go.Spot.Center,allowZoom:!0,isReadOnly:this.readonly,"toolManager.mouseWheelBehavior":window.go.ToolManager.WheelZoom,"undoManager.isEnabled":!0,ModelChanged:function(t){e.$emit("model-changed",t)},ChangedSelection:function(t){e.$emit("changed-selection",t)}});n.nodeTemplate=t(window.go.Node,"Auto",new window.go.Binding("location","loc",window.go.Point.parse).makeTwoWay(window.go.Point.stringify),t(window.go.Shape,"RoundedRectangle",{fill:"white",strokeWidth:0,portId:"",fromLinkable:!1,toLinkable:!1,cursor:"pointer"},new window.go.Binding("fill","color")),t(window.go.TextBlock,{margin:8,editable:!0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text").makeTwoWay())),n.linkTemplate=t(window.go.Link,{},t(window.go.Shape),t(window.go.Shape,{toArrow:"OpenTriangle"})),this.diagram=n,this.updateModel(this.modelData)},model:function(){return this.diagram.model},updateModel:function(t){if(console.log("updateModel",t),window.go)if(console.log(t instanceof window.go.Model),console.log(window.go),t instanceof window.go.Model)this.diagram.model=t;else{var e=new window.go.GraphLinksModel;if(t)for(var n in t)e[n]=t[n];this.diagram.model=e}},updateDiagramFromData:function(){this.diagram.startTransaction(),this.diagram.updateAllRelationshipsFromData(),this.diagram.updateAllTargetBindings(),this.diagram.commitTransaction("updated")}}),a),r=(n("hSLB"),n("KHd+")),d=Object(r.a)(l,function(){var t=this.$createElement;return(this._self._c||t)("div")},[],!1,null,null,null);d.options.__file="GoDiagramTreeLayout.vue";e.default=d.exports},"RU/L":function(t,e,n){n("Rqdy");var a=n("WEpk").Object;t.exports=function(t,e,n){return a.defineProperty(t,e,n)}},Rqdy:function(t,e,n){var a=n("Y7ZC");a(a.S+a.F*!n("jmDH"),"Object",{defineProperty:n("2faE").f})},SEkw:function(t,e,n){t.exports={default:n("RU/L"),__esModule:!0}},YEIV:function(t,e,n){"use strict";e.__esModule=!0;var a=function(t){return t&&t.__esModule?t:{default:t}}(n("SEkw"));e.default=function(t,e,n){return e in t?(0,a.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},bPJ9:function(t,e,n){},hSLB:function(t,e,n){"use strict";var a=n("xTI2");n.n(a).a},o6J1:function(t,e,n){"use strict";n.r(e);var a=n("gDS+"),i=n.n(a),o=n("QbLZ"),s=n.n(o),l=n("529z"),r=n.n(l),d=n("L2JU"),c=(n("fHYj"),n("USVN")),u=(n("GB7V"),{name:"FormLimit",mixins:[r.a],components:{},props:{value:{type:Array,default:function(){return[]},isSync:!0},usetype:{type:String,default:"edit"}},data:function(){return{editlist:[],EditModalStatus:!1,canEditList:[],readonlyList:[],hiddenList:[],allcanedit:!1,allreadonly:!1,allhidden:!1}},watch:{sync_value:function(){this.init()}},mounted:function(){this.init()},computed:s()({},Object(d.c)(["requireDataList"]),Object(d.e)({formSet:function(t){return t.flowdesign.formSet}})),methods:{inittable:function(t,e){t||(t=[]),console.log("tableItem",Object(c.c)(this.formSet.list,e.key));var n=Object(c.c)(this.formSet.list,e.key);if(!n)return[];for(var a=n.options.tableset,i=t.length-1;i>=0;i--){for(var o=t[i],s=!1,l=0;l<a.length;l++){var r=a[l];if(r.code==o.key){s=!0,o.name=r.name;break}}s||t.splice(i,1)}return a.forEach(function(e){var n=!1;t.forEach(function(t){t.key==e.code&&(n=!0)}),n||t.push({name:e.name,key:e.code,type:null,required:!1,t:"tableItem"})}),t},init:function(){var t=this;console.log("console.log(this.requireDataList);",this.requireDataList),console.log("sync_value1",this.sync_value),this.sync_value||(this.sync_value=[]);for(var e=this.sync_value.length-1;e>=0;e--){for(var n=this.sync_value[e],a=!1,i=0;i<this.requireDataList.length;i++){var o=this.requireDataList[i];if(o.key==n.key){a=!0,n.name=o.name,n.t=o.type,"table"==n.t&&(n.son=this.inittable(n.son,o),console.log("ele.son",n.son));break}}a||this.sync_value.splice(e,1)}this.requireDataList.forEach(function(e){var n=!1;if(t.sync_value.forEach(function(t){t.key==e.key&&(n=!0)}),!n){var a={name:e.name,key:e.key,type:null,required:!1,t:e.type};"table"==e.type&&(a.son=t.inittable([],e),a.table_add=!1,a.table_edit=!1,a.table_delete=!1),t.sync_value.push(a)}}),console.log("sync_value2",this.sync_value),this.initdisplaydata()},whenRadioChange:function(){var t=0,e=0,n=0,a=this.editlist.length;this.editlist.forEach(function(i){switch(i.type){case"canedit":t++;break;case"readonly":e++;break;case"hidden":n++}"table"==i.t&&i.son&&(a+=i.son.length,i.son.forEach(function(a){switch(a.type){case"canedit":t++;break;case"readonly":e++;break;case"hidden":n++}}))}),this.allcanedit=a==t,this.allreadonly=a==e,this.allhidden=a==n},whencheckboxChange:function(t,e){var n=this;this.editlist.forEach(function(n){t?(n.type=e,"table"==n.t&&n.son&&n.son.forEach(function(n){n.type=t?e:null})):n.type=null}),setTimeout(function(){n.whenRadioChange()},100)},copyobject:function(t){return JSON.parse(i()(t))},initdisplaydata:function(){var t=this,e=[],n=[],a=[];this.sync_value&&this.sync_value.forEach(function(i){var o=t.copyobject(i);"table"==o.t&&(o.sonhidden=[],o.soncanedit=[],o.sonreadonly=[],o.son.forEach(function(t){"hidden"==t.type&&o.sonhidden.push(t),"canedit"==o.type&&o.soncanedit.push(t),"readonly"==o.type&&o.sonreadonly.push(t)})),"hidden"==o.type&&n.push(o),"canedit"==o.type&&e.push(o),"readonly"==o.type&&a.push(o)}),this.canEditList=e,this.hiddenList=n,this.readonlyList=a},tranname:function(t){for(var e=0;e<this.requireDataList.length;e++){var n=this.requireDataList[e];if(n.key==t)return n.name}return null},saveEdit:function(){this.sync_value=JSON.parse(i()(this.editlist)),this.initdisplaydata(),this.EditModalStatus=!1},editFormSet:function(){this.sync_value?this.editlist=JSON.parse(i()(this.sync_value)):this.editlist=[],this.EditModalStatus=!0}}}),h=(n("AgE6"),n("KHd+")),f=Object(h.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cFormLimit"},[n("el-dialog",{attrs:{title:"编辑表单设置",visible:t.EditModalStatus,width:"500px"},on:{"update:visible":function(e){t.EditModalStatus=e}}},[n("el-alert",{attrs:{title:"未设置的情况下会以只读的方式显示已填写的数据",closable:!1,type:"warning"}}),t._v(" "),n("div",{staticClass:"formtabe"},[n("el-row",{staticClass:"row fz14",staticStyle:{"font-weight":"bolder"},attrs:{gutter:10}},[n("el-col",{attrs:{span:7}},[t._v("表单字段")]),t._v(" "),"read"!=t.usetype?n("el-col",{attrs:{span:5}},[n("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"canedit")}},model:{value:t.allcanedit,callback:function(e){t.allcanedit=e},expression:"allcanedit"}},[t._v("可编辑")])],1):t._e(),t._v(" "),"read"!=t.usetype?n("el-col",{attrs:{span:4}},[t._v("是否必填")]):t._e(),t._v(" "),n("el-col",{attrs:{span:4}},[n("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"readonly")}},model:{value:t.allreadonly,callback:function(e){t.allreadonly=e},expression:"allreadonly"}},[t._v("只读")])],1),t._v(" "),n("el-col",{attrs:{span:4}},[n("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"hidden")}},model:{value:t.allhidden,callback:function(e){t.allhidden=e},expression:"allhidden"}},[t._v("隐藏")])],1)],1),t._v(" "),t._l(t.editlist,function(e,a){return n("div",{key:a},[n("el-radio-group",{staticStyle:{"font-size":"13px",display:"block","line-height":"18px"},model:{value:e.type,callback:function(n){t.$set(e,"type",n)},expression:"item.type"}},[n("el-row",{staticClass:"row",attrs:{gutter:10}},[n("el-col",{attrs:{span:7}},["table"==e.t?n("span",[t._v("(表格)")]):t._e(),t._v(" "),"placeholderhtml"==e.t?n("span",[t._v("(文本)")]):t._e(),t._v("\n                            "+t._s(e.name))]),t._v(" "),"read"!=t.usetype?n("el-col",{attrs:{span:5}},["placeholderhtml"==e.t?n("div",[n("span",{staticStyle:{color:"white"}},[t._v("p")])]):n("el-radio",{attrs:{label:"canedit"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1):t._e(),t._v(" "),"read"!=t.usetype?n("el-col",{attrs:{span:4}},["canedit"!=e.type||"placeholderhtml"==e.t?n("div",[n("span",{staticStyle:{color:"white"}},[t._v("p")])]):n("el-checkbox",{attrs:{title:"显示"},model:{value:e.required,callback:function(n){t.$set(e,"required",n)},expression:"item.required"}})],1):t._e(),t._v(" "),n("el-col",{attrs:{span:4}},[n("el-radio",{attrs:{label:"readonly"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1),t._v(" "),n("el-col",{attrs:{span:4}},[n("el-radio",{attrs:{label:"hidden"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1)],1)],1),t._v(" "),"table"==e.t?n("div",{staticStyle:{"font-size":"12px","line-height":"25px","background-color":"rgb(239, 245, 186)"}},[n("el-row",{staticClass:"row",staticStyle:{"padding-left":"20px"}},[t._v("\n                        表单属性\n\n                        "),n("el-checkbox",{model:{value:e.table_add,callback:function(n){t.$set(e,"table_add",n)},expression:"item.table_add"}},[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可在表单中添加行",placement:"top-start"}},[n("span",{staticClass:"fz12"},[t._v("可添加")])])],1),t._v(" "),n("el-checkbox",{staticClass:"fz12",model:{value:e.table_edit,callback:function(n){t.$set(e,"table_edit",n)},expression:"item.table_edit"}},[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据编辑",placement:"top-start"}},[n("span",{staticClass:"fz12"},[t._v("可编辑")])])],1),t._v(" "),n("el-checkbox",{staticClass:"fz12",model:{value:e.table_delete,callback:function(n){t.$set(e,"table_delete",n)},expression:"item.table_delete"}},[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据进行删除",placement:"top-start"}},[n("span",{staticClass:"fz12"},[t._v("可删除")])])],1)],1),t._v(" "),t._l(e.son,function(e,a){return n("div",{key:a},[n("el-radio-group",{staticStyle:{"font-size":"13px",display:"block","line-height":"18px"},model:{value:e.type,callback:function(n){t.$set(e,"type",n)},expression:"item2.type"}},[n("el-row",{staticClass:"row",staticStyle:{"margin-top":"0px","margin-bottom":"0px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:7}},[n("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(e.name))])]),t._v(" "),"read"!=t.usetype?n("el-col",{attrs:{span:5}},[n("el-radio",{attrs:{label:"canedit"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1):t._e(),t._v(" "),"read"!=t.usetype?n("el-col",{attrs:{span:4}},["canedit"!=e.type?n("div",[n("span",{staticStyle:{color:"white"}},[t._v("p")])]):n("el-checkbox",{attrs:{title:"显示"},model:{value:e.required,callback:function(n){t.$set(e,"required",n)},expression:"item2.required"}})],1):t._e(),t._v(" "),n("el-col",{attrs:{span:4}},[n("el-radio",{attrs:{label:"readonly"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1),t._v(" "),n("el-col",{attrs:{span:4}},[n("el-radio",{attrs:{label:"hidden"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1)],1)],1)],1)})],2):t._e()],1)})],2),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.EditModalStatus=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"可编辑项目:"}},[t._l(t.canEditList,function(e,a){return n("span",{key:a},[e.required?n("span",{staticStyle:{color:"red"}},[t._v("*")]):t._e(),t._v("\n        "+t._s(e.name)+"\n        "),"table"==e.t?n("span",[e.table_add?n("span",[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可在表单中添加行",placement:"top-start"}},[n("span",[t._v("(可添加)")])])],1):t._e(),t._v(" "),e.table_edit?n("span",[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据编辑",placement:"top-start"}},[n("span",[t._v("(可编辑)")])])],1):t._e(),t._v(" "),e.table_delete?n("span",[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据进行删除",placement:"top-start"}},[n("span",[t._v("(可删除)")])])],1):t._e()]):t._e(),t._v(" "),"table"==e.t&&e.soncanedit.length?n("span",[t._v("(\n            "),t._l(e.soncanedit,function(a,i){return n("span",{key:i},[a.required?n("span",{staticStyle:{color:"red"}},[t._v("*")]):t._e(),t._v(" "+t._s(a.name)+"\n        "),e.soncanedit.length-1!=i?n("span",[t._v("|")]):t._e()])}),t._v(")\n        ")],2):t._e(),t._v(" "),t.canEditList.length-1!=a?n("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.canEditList.length?n("span",[t._v("无")]):t._e()],2),t._v(" "),n("el-form-item",{attrs:{label:"只读项目:"}},[t._l(t.readonlyList,function(e,a){return n("span",{key:a},[t._v("\n                "+t._s(e.name)+" \n                "),t.readonlyList.length-1!=a?n("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.readonlyList.length?n("span",[t._v("无")]):t._e()],2),t._v(" "),n("el-form-item",{attrs:{label:"隐藏项目:"}},[t._l(t.hiddenList,function(e,a){return n("span",{key:a},[t._v("\n                "+t._s(e.name)+" \n                "),t.hiddenList.length-1!=a?n("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.hiddenList.length?n("span",[t._v("无")]):t._e()],2),t._v(" "),n("el-form-item",{attrs:{label:""}},[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.editFormSet}},[t._v("编辑表单设置")])],1)],1)},[],!1,null,"29669c6c",null);f.options.__file="CFormLimit.vue";e.default=f.exports},rweH:function(t,e,n){"use strict";var a=n("Hbfb");n.n(a).a},xTI2:function(t,e,n){}}]);