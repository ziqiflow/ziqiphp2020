(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5bc9","chunk-2ff1","chunk-6643","chunk-0844"],{"0mAM":function(e,t,i){},Qtz6:function(e,t,i){"use strict";i.r(t);var n,o=i("YEIV"),a=i.n(o),l=i("7Qib"),r=(n={name:"",props:["modelData"]},a()(n,"props",{modelData:{type:Object,default:function(){return{}}},angle:{type:Number,default:function(){return 0}},readonly:{type:Boolean,default:function(){return!1}}}),a()(n,"data",function(){return{diagram:null}}),a()(n,"computed",{}),a()(n,"watch",{modelData:function(e){this.updateModel(e)}}),a()(n,"mounted",function(){var e=this;window.go?this.init():Object(l.d)(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){e.init()})}),a()(n,"methods",{init:function(){console.log("window.go"),console.log(window.go);var e=window.go.GraphObject.make,t=this,i=e(window.go.Diagram,this.$el,{initialContentAlignment:window.go.Spot.Center,allowZoom:!0,isReadOnly:this.readonly,"toolManager.mouseWheelBehavior":window.go.ToolManager.WheelZoom,"undoManager.isEnabled":!0,ModelChanged:function(e){t.$emit("model-changed",e)},ChangedSelection:function(e){t.$emit("changed-selection",e)}});i.nodeTemplate=e(window.go.Node,"Auto",new window.go.Binding("location","loc",window.go.Point.parse).makeTwoWay(window.go.Point.stringify),e(window.go.Shape,"RoundedRectangle",{fill:"white",strokeWidth:0,portId:"",fromLinkable:!1,toLinkable:!1,cursor:"pointer"},new window.go.Binding("fill","color")),e(window.go.TextBlock,{margin:8,editable:!0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text").makeTwoWay())),i.linkTemplate=e(window.go.Link,{},e(window.go.Shape),e(window.go.Shape,{toArrow:"OpenTriangle"})),this.diagram=i,this.updateModel(this.modelData)},model:function(){return this.diagram.model},updateModel:function(e){if(console.log("updateModel",e),window.go)if(console.log(e instanceof window.go.Model),console.log(window.go),e instanceof window.go.Model)this.diagram.model=e;else{var t=new window.go.GraphLinksModel;if(e)for(var i in e)t[i]=e[i];this.diagram.model=t}},updateDiagramFromData:function(){this.diagram.startTransaction(),this.diagram.updateAllRelationshipsFromData(),this.diagram.updateAllTargetBindings(),this.diagram.commitTransaction("updated")}}),n),s=(i("hSLB"),i("KHd+")),d=Object(s.a)(r,function(){var e=this.$createElement;return(this._self._c||e)("div")},[],!1,null,null,null);d.options.__file="GoDiagramTreeLayout.vue";t.default=d.exports},"RU/L":function(e,t,i){i("Rqdy");var n=i("WEpk").Object;e.exports=function(e,t,i){return n.defineProperty(e,t,i)}},Rqdy:function(e,t,i){var n=i("Y7ZC");n(n.S+n.F*!i("jmDH"),"Object",{defineProperty:i("2faE").f})},RxXT:function(e,t,i){"use strict";i.r(t);var n,o=i("YEIV"),a=i.n(o),l=i("7Qib"),r=(n={name:"",props:["modelData"]},a()(n,"props",{modelData:{type:Object,default:function(){return{}}},angle:{type:Number,default:function(){return 0}}}),a()(n,"data",function(){return{diagram:null}}),a()(n,"computed",{}),a()(n,"watch",{modelData:function(e){this.updateModel(e)}}),a()(n,"mounted",function(){var e=this;window.go?this.init():Object(l.d)(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){e.init()})}),a()(n,"methods",{init:function(){var e=window.go.GraphObject.make;console.log(window.go);var t=this,i=e(window.go.Diagram,this.$el,{initialContentAlignment:window.go.Spot.Center,allowZoom:!0,isReadOnly:!0,layout:e(window.go.TreeLayout,{angle:this.angle,arrangement:window.go.TreeLayout.ArrangementHorizontal}),"undoManager.isEnabled":!0,"toolManager.mouseWheelBehavior":window.go.ToolManager.WheelZoom,ModelChanged:function(e){t.$emit("model-changed",e)},ChangedSelection:function(e){t.$emit("changed-selection",e)}});i.nodeTemplate=e(window.go.Node,"Auto",e(window.go.Shape,"RoundedRectangle",{fill:"white",strokeWidth:0,portId:"",fromLinkable:!1,toLinkable:!1,cursor:"pointer"},new window.go.Binding("fill","color")),e(window.go.Panel,"Table",{maxSize:new window.go.Size(230,999),margin:new window.go.Margin(3,3,0,3),defaultAlignment:window.go.Spot.Left},e(window.go.RowColumnDefinition,{column:5,width:4}),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),row:0,column:0,stroke:"#ff6600",font:"bold 10pt sans-serif"},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","title").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:1,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","to")),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:2,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","dealtype").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:3,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","PreFunName").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:4,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","content").makeTwoWay()))),i.linkTemplate=e(window.go.Link,{curve:window.go.Link.Bezier,adjusting:window.go.Link.Stretch,relinkableFrom:!0,relinkableTo:!0,reshapable:!0},e(window.go.Shape),e(window.go.Shape,{toArrow:"OpenTriangle"})),this.diagram=i,this.updateModel(this.modelData)},model:function(){return this.diagram.model},updateModel:function(e){if(window.go)if(e instanceof window.go.Model)this.diagram.model=e;else{var t=new window.go.GraphLinksModel;if(e)for(var i in e)t[i]=e[i];this.diagram.model=t}},updateDiagramFromData:function(){this.diagram.startTransaction(),this.diagram.updateAllRelationshipsFromData(),this.diagram.updateAllTargetBindings(),this.diagram.commitTransaction("updated")}}),n),s=(i("f5R0"),i("KHd+")),d=Object(s.a)(r,function(){var e=this.$createElement;return(this._self._c||e)("div")},[],!1,null,null,null);d.options.__file="GoDiagramTreeBox.vue";t.default=d.exports},SEkw:function(e,t,i){e.exports={default:i("RU/L"),__esModule:!0}},"Ts+a":function(e,t,i){"use strict";i.r(t);var n=i("P2sY"),o=i.n(n),a=i("QbLZ"),l=i.n(a),r=i("L2JU"),s=i("X4fA"),d={name:"CModelShowImages",props:{type:{type:String,default:function(){return"flowlog"}},filelistlog:{type:Array,default:function(){return[]}},files:{type:Array,default:function(){return[]}}},data:function(){return{image_preview_model:!1,preview_file:null,preview_rotate:0}},computed:l()({},Object(r.e)({userid:function(e){return e.user.id}}),{preview_style:function(){return{transform:"rotate("+this.preview_rotate+"deg)"}}}),mounted:function(){},methods:{rotateImage:function(){this.preview_rotate=(this.preview_rotate+90)%360},showimage:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=null;this.preview_file=null;var a=[];"flowlog"==this.type?(i&&(this.filelistlog=i),a=this.filelistlog):(i&&(this.files=i),a=[{files:this.files}]);var l=Object(s.b)(this.userid);a.forEach(function(i){i.files.forEach(function(a){a.fileid==e?(t.preview_file=o()({},a),t.preview_file.funname=i.funname?i.funname:null,t.preview_file.url=window.baseURL+"/file/oa/"+a.fileid+"/"+a.name+"?"+l,t.preview_file.previous_fileid=n,t.preview_rotate=0):"jpeg"!=a.formats&&"jpg"!=a.formats&&"png"!=a.formats||(t.preview_file?t.preview_file.next_fileid||(t.preview_file.next_fileid=a.fileid):n=a.fileid)})}),this.image_preview_model=!0}}},c=(i("Wrx9"),i("KHd+")),u=Object(c.a)(d,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{attrs:{fullscreen:!0,title:e.preview_file?e.preview_file.name:"",visible:e.image_preview_model,"append-to-body":""},on:{"update:visible":function(t){e.image_preview_model=t}}},[e.preview_file?i("div",[i("div",[i("div",{staticStyle:{float:"left"}},[e.preview_file.funname?i("div",[e._v("来自流程："+e._s(e.preview_file.funname))]):e._e(),e._v("\n          文件信息："+e._s(e.preview_file.name)),i("br"),e._v("\n          上传时间："+e._s(e.preview_file.created_at)),i("br"),e._v("\n          文件大小："+e._s(e.preview_file.size)),i("br")]),e._v(" "),i("div",{staticStyle:{float:"left",padding:"10px"}},[i("div",[i("el-button",{attrs:{disabled:!e.preview_file.previous_fileid,size:"mini",icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}}),e._v(" "),i("el-button",{attrs:{disabled:!e.preview_file.next_fileid,size:"mini"},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[i("i",{staticClass:"el-icon-arrow-right el-icon--right"})]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:e.rotateImage}},[i("i",{staticClass:"el-icon-refresh-right"})])],1)]),e._v(" "),i("div",{staticClass:"clear"})]),e._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("div",{staticStyle:{"min-height":"150px"}},[i("el-image",{staticStyle:{padding:"10px"},style:e.preview_style,attrs:{src:e.preview_file.url}},[i("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v("\n              加载中"),i("span",{staticClass:"dot"},[e._v("...")])]),e._v(" "),i("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[i("i",{staticClass:"el-icon-picture-outline"}),e._v("图片加载失败\n          ")])])],1),e._v(" "),i("div",{staticStyle:{position:"fixed",bottom:"10px",width:"100%"}},[i("el-button",{attrs:{disabled:!e.preview_file.previous_fileid,size:"small",type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}},[e._v("上一张图片")]),e._v(" "),i("el-button",{attrs:{disabled:!e.preview_file.next_fileid,size:"small",type:"primary"},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[e._v("下一张图片"),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})]),e._v(" "),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rotateImage}},[e._v("旋转"),i("i",{staticClass:"el-icon-refresh-right el-icon--left"})])],1)])]):e._e()])],1)},[],!1,null,"5adf9084",null);u.options.__file="CModalShowImages.vue";t.default=u.exports},W2Fo:function(e,t,i){!function(e){"use strict";!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i=" .timeline { padding: 0; position: relative; list-style: none; font-family: PingFangSC-light, Avenir, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif; -webkit-font-smoothing: antialiased; margin: 10px 20px; } .timeline:after { position: absolute; content: ''; left: 0; top: 0; width: 1px; height: 100%; background-color: var(--timelineTheme); } .timeline-item { position: relative; margin: 1.5em 0 0 28px; padding-bottom: 1.5em; border-bottom: 1px dotted var(--timelineTheme); } .timeline-item:last-child { border-bottom: none; } .timeline-circle { position: absolute; top: .28em; left: -34px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--timelineTheme); background-color: var(--timelineTheme); z-index: 1; box-sizing: content-box; } .timeline-circle.hollow { background-color: var(--timelineBg); } .timeline-title { position: relative; display: inline-block; /** * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素） */ cursor: crosshair; margin: -.15em 0 15px 28px } .timeline-title:not(:first-child) { margin-top: 28px; } .timeline-title-circle { left: -36px; top: .15em; width: 16px; height: 16px; } .timeline-others { width: 40px; height: auto; top: .2em; left: -48px; line-height: 1; padding: 2px 0; text-align: center; border: none; background-color: var(--timelineBg); } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}}();var t={render:function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{ref:"timeline",staticClass:"timeline"},[this._t("default")],2)},staticRenderFns:[],name:"Timeline",props:{timelineTheme:{type:String,default:"#dbdde0"},timelineBg:{type:String,default:"#fff"}},mounted:function(){var e=this.$refs.timeline;e.style.setProperty("--timelineTheme",this.timelineTheme),e.style.setProperty("--timelineBg",this.timelineBg)}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var i={name:"TimelineItemBase",props:{bgColor:{type:String,default:""},lineColor:{type:String,default:""},hollow:{type:Boolean,default:!1},fontColor:{type:String,default:"#37414a"}},data:function(){return{slotOthers:!1}},computed:{circleStyle:function(){if(this.bgColor||this.lineColor||this.hollow){var e={};return this.bgColor&&(e={"border-color":this.bgColor,"background-color":this.bgColor}),this.lineColor&&(e=Object.assign({},e,{"border-color":this.lineColor})),e}},itemStyle:function(){return{color:this.fontColor}},slotClass:function(){var e="";return this.slotOthers?e="timeline-others":this.hollow&&(e="hollow"),e}},mounted:function(){this.slotOthers=!!this.$refs.others.innerHTML}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-item",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-title",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle timeline-title-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};"undefined"!=typeof window&&window.Vue&&(window.Vue.component(t.name,t),window.Vue.component(n.name,n),window.Vue.component(o.name,o)),e.Timeline=t,e.TimelineItem=n,e.TimelineTitle=o,Object.defineProperty(e,"__esModule",{value:!0})}(t)},WRrL:function(e,t,i){"use strict";i.r(t);var n=i("QbLZ"),o=i.n(n),a=i("L2JU"),l=i("X4fA"),r=i("W2Fo"),s=i("Ts+a"),d=i("k48p"),c={name:"Cflowlog",components:{Timeline:r.Timeline,TimelineItem:r.TimelineItem,TimelineTitle:r.TimelineTitle,ModelShowImages:s.default},props:{filelistlog:{type:Array,default:function(){return[]}}},computed:o()({},Object(a.e)({userid:function(e){return e.user.id}})),data:function(){return{}},activated:function(){},mounted:function(){},methods:{filedown:function(e){window.open(window.baseURL+"/file/oa/"+e.fileid+"/"+e.name+"?"+Object(l.b)(this.userid),this.isPc?"_blank":"_self")},showimage:function(e){this.$refs.showimages.showimage(e)},friendlytimejs:function(e){return Object(d.a)(e,new Date)}}},u=(i("f2f8"),i("KHd+")),f=Object(u.a)(c,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.filelistlog?i("div",{staticClass:"log"},[i("model-show-images",{ref:"showimages",attrs:{filelistlog:e.filelistlog,type:"flowlog"}}),e._v(" "),i("timeline",e._l(e.filelistlog,function(t){return i("timeline-item",{key:t._id,attrs:{color:"green"}},[i("div",{staticClass:"fz13"},[i("v-icon",{attrs:{name:"person"}}),e._v(" "),i("span",[e._v(e._s(t.creater))]),e._v(" "),i("span",{staticClass:"funname"},[e._v(e._s(t.funname))]),e._v(" "),i("span",{staticClass:"fz12",staticStyle:{"margin-right":"5px"}},[e._v(e._s(e.friendlytimejs(t.created_at)))])],1),e._v(" "),i("div",e._l(t.files,function(t,n){return i("div",{key:n,staticClass:"fz12"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),"jpeg"==t.formats||"jpg"==t.formats||"png"==t.formats?i("i",{staticClass:"el-icon-picture-outline mg-r5 image_file_preview",staticStyle:{cursor:"pointer"},on:{click:function(i){e.showimage(t.fileid,e.filelistlog)}}}):e._e(),e._v(" "),i("i",{staticClass:"el-icon-download filedown mg-r5",on:{click:function(i){e.filedown(t)}}})])}))])}))],1):e._e()])},[],!1,null,"c022809c",null);f.options.__file="CFlowFileLog.vue";t.default=f.exports},Wrx9:function(e,t,i){"use strict";var n=i("w3TN");i.n(n).a},"X+cG":function(e,t,i){"use strict";var n=i("0mAM");i.n(n).a},XE86:function(e,t,i){},YCPF:function(e,t,i){"use strict";i.r(t);var n=i("GQeE"),o=i.n(n),a=i("gDS+"),l=i.n(a),r=i("lYLF"),s=i("W2Fo"),d=i("USVN"),c=i("k48p"),u=i("Qtz6"),f=i("RxXT"),m=i("Fnmp"),g=i("WRrL"),p=i("i7/w"),w=i.n(p),h=i("EJiy"),v=i.n(h),_=function e(t,i){if(!(this instanceof e))return new e(t,i);this.options=this.extend({noPrint:".no-print"},i),"string"==typeof t?this.dom=document.querySelector(t):(this.isDOM(t),this.dom=this.isDOM(t)?t:t.$el),this.init()};_.prototype={init:function(){var e=this.getStyle()+this.getHtml();this.writeIframe(e)},extend:function(e,t){for(var i in t)e[i]=t[i];return e},getStyle:function(){for(var e="",t=document.querySelectorAll("style,link"),i=0;i<t.length;i++)e+=t[i].outerHTML;return e+="<style>"+(this.options.noPrint?this.options.noPrint:".no-print")+"{display:none;}</style>"},getHtml:function(){for(var e=document.querySelectorAll("input"),t=document.querySelectorAll("textarea"),i=document.querySelectorAll("select"),n=0;n<e.length;n++)"checkbox"==e[n].type||"radio"==e[n].type?1==e[n].checked?e[n].setAttribute("checked","checked"):e[n].removeAttribute("checked"):(e[n].type,e[n].setAttribute("value",e[n].value));for(var o=0;o<t.length;o++)"textarea"==t[o].type&&(t[o].innerHTML=t[o].value);for(var a=0;a<i.length;a++)if("select-one"==i[a].type){var l=i[a].children;for(var r in l)"OPTION"==l[r].tagName&&(1==l[r].selected?l[r].setAttribute("selected","selected"):l[r].removeAttribute("selected"))}return this.dom.outerHTML},writeIframe:function(e){var t,i,n=document.createElement("iframe"),o=document.body.appendChild(n);n.id="myIframe",n.setAttribute("style","position:absolute;width:0;height:0;top:-10px;left:-10px;"),t=o.contentWindow||o.contentDocument,(i=o.contentDocument||o.contentWindow.document).open(),i.write(e),i.close();var a=this;n.onload=function(){a.toPrint(t),setTimeout(function(){},100)}},toPrint:function(e){try{setTimeout(function(){e.focus();try{e.document.execCommand("print",!1,null)||e.print()}catch(t){e.print()}e.close()},10)}catch(e){console.log("err",e)}},isDOM:"object"===("undefined"==typeof HTMLElement?"undefined":v()(HTMLElement))?function(e){return e instanceof HTMLElement}:function(e){return e&&"object"===(void 0===e?"undefined":v()(e))&&1===e.nodeType&&"string"==typeof e.nodeName}};var y={install:function(e,t){e.prototype.$print=_}},b=y;w.a.use(b);var k={name:"Cflowdetail",components:{diagram:u.default,diagrambox:f.default,FlowLog:m.default,Timeline:s.Timeline,TimelineItem:s.TimelineItem,TimelineTitle:s.TimelineTitle,FlowFileLog:g.default},props:{flowOiId:{type:String,default:function(){return""}},nowfunid:{type:String},isAdmin:{type:Boolean,default:function(){return!1}}},data:function(){return{error:null,title:null,loading:!1,flowOi:null,designer:null,logList:[],msgList:[],remoteFuncs:{},widgetModels:{},widgetForm:null,activeName:"表单",msgsdiagramDataTest:{nodeDataArray:[{key:1,text:"Alpha",color:"lightblue",loc:"355 85"},{key:2,text:"Beta",color:"orange",loc:"355 85"},{key:3,text:"Gamma",color:"lightgreen",loc:"355 85"},{key:4,text:"Delta",color:"pink",loc:"355 85"}],linkDataArray:[{from:1,to:2},{from:1,to:3},{from:3,to:4}]},diagramData:{nodeDataArray:[],linkDataArray:[]},msgsdiagramData:{nodeDataArray:[],linkDataArray:[]}}},watch:{},mounted:function(){this.getinfo(this.flowOiId)},methods:{friendlytimejs:function(e){return Object(c.a)(e,new Date)},isDingTalk:function(){return-1!=window.navigator.userAgent.toLowerCase().indexOf("dingtalk")},print:function(){var e=this;this.isDingTalk()?this.$confirm("当前位于钉钉浏览器，由于钉钉暂不支持打印，是否前往浏览器打印?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){window.open(window.location.href,"_blank")}).catch(function(){e.$message({type:"info",message:"程序猿已经尽力了😢"})}):this.$print(this.$refs.printData)},creatMsgDiagramData:function(e,t,i){var n=function(e){var t=[];return e.forEach(function(e){t.push(e.n)}),0==t.length?"":"["+t.join("|")+"]"},o=[],a=[],l=function t(i){e.forEach(function(e){e.PreMsgId==i&&(a.push({from:i,to:e._id}),console.log("linkDataArray",a),o.push(function(e){var t="无";e.log&&(t="点击<"+e.log.button+">");var i="",o="#515a6e";switch(e.status){case 1:i="等待处理",o="#ff9900";break;case 2:i="取消",o="#a7a7a7";break;case 3:case 4:i="结束",o="#61afff";break;case 5:case 6:i="";break;case 7:i="结束",o="#61afff";break;case 8:i="撤回后取消",o="#a7a7a7"}i&&(i="[状态:"+i+"]");var a="";"message"==e.dealtype&&(a="["+(0==e.hasread?"未读":"已读")+"]");var l="";return 100==e.level&&(l="[紧急]"),{key:e._id,title:i+e.NowFunName+a+l,PreFunName:"上一节点："+e.PreFunName,content:"处理内容："+t,dealtype:"处理方式："+Object(d.f)(e.dealtype),to:"处理人："+(e.todepts?n(e.todepts):"")+e.toer,color:o,stroke:"white"}}(e)),t(e._id))})};return console.log("msgList",e),e.forEach(function(e){e.PreMsgId||(console.log("msg",e),o.push({key:e._id,title:"[开始节点]"+e.NowFunName,PreFunName:"上一节点：无",content:"处理内容：无",dealtype:"处理方式：无",to:"申请人："+(e.todepts?n(e.todepts):"")+e.creater,color:"#67c23a",stroke:"white"}),l(e._id))}),{nodeDataArray:o,linkDataArray:a}},tran_dealtype:function(e){return Object(d.f)(e)},creatdiag:function(e){var t=Object(d.b)(this.funlist,this.nowfunid),i=t.linkDataArray,n=t.nodeDataArray;this.diagramData={nodeDataArray:n,linkDataArray:i}},initsuggests:function(e,t){e.forEach(function(e){for(var i=0;i<t.length;i++){var n=t[i];if(n.id==e.funid){e.funname=n.name;break}}})},getinfo:function(e){var t=this;this.modalstatu=!0,this.successShow=!1,this.title="加载中...",this.loading=!0,Object(r.m)({flowOi_id:e}).then(function(e){var i=e.data;if(console.log(i),t.loading=!1,i.success){if(!i.data)return void(t.error="没有查询到对应的流程");console.log("this.flowOi",i.data),t.flowOi=i.data;var n=t.flowOi,o=n.designer,a=n.logList,r=n.msgList;t.flowOi.suggests&&t.initsuggests(t.flowOi.suggests,o.funlist),t.designer=o,t.logList=a,t.msgList=r,t.logList.forEach(function(e){e.msgobj=null,e.flowmsgid&&t.msgList.forEach(function(t){e.flowmsgid==t._id&&(e.msgobj=t)})}),t.diagramData=Object(d.b)(t.flowOi.designer.funlist,t.flowOi.designer.layoutset,t.nowfunid),t.msgsdiagramData=t.creatMsgDiagramData(t.flowOi.msgList,t.flowOi.logList,t.designer.funlist),console.log("msgsdiagramData",t.msgsdiagramData),t.widgetForm=t.initFromset(t.designer,t.flowOi.formdata),t.isPc||(t.widgetForm.config.labelWidth=null,t.widgetForm.config.labelPosition="top"),console.log("this.widgetForm ",t.widgetForm),console.log("this.widgetForm ",l()(t.widgetForm)),t.widgetModels=t.copyobject(t.flowOi.formdata)}else t.error=i.msg})},cancel:function(){this.modalstatu=!1},copyobject:function(e){return JSON.parse(l()(e))},initFromset:function(e,t){var i=this.copyobject(e.formset);return console.log("formdata",t),this.leave_form_item_f2(i.list,e.set.formEditLimit,t),i},leave_form_item_f2:function(e,t,i){for(var n=this,a=function(a){var l=e[a];if(l.columns)for(var r=0;r<l.columns.length;r++){var s=l.columns[r];n.leave_form_item_f2(s.list,t,i)}else{Object(d.e)(l);var c=!1;if(!n.isAdmin&&t){var u=function(i){var o=t[i];if(!o.type)return"continue";if(l.key==o.key){switch(c=!0,"table"==l.type&&(l.options.table_delete=!1,l.options.table_add=!1,l.options.table_edit=!1,l.options.tableset.forEach(function(e){var t=!1;o.son&&o.son.forEach(function(i){i.key==e.code&&(t=!0,e.required=i.required,e.limittype=i.type)}),t||(e.required=!1,e.limittype="readonly")})),o.type){case"canedit":console.log(o),l.options.disabled=!1,o.required?(l.options.required=!0,n.addrequiredrule(l.rules,l.name)):(l.options.required=!1,n.splicerequiredrule(l.rules));break;case"readonly":l.options.disabled=!0,l.options.required=!1,n.splicerequiredrule(l.rules);break;case"hidden":e.splice(a,1)}return"break"}};e:for(var f=0;f<t.length;f++){switch(u(f)){case"continue":continue;case"break":break e}}}c||(o()(i).some(function(e){return e==l.model})?(l.options.disabled=!0,l.options.required=!1,"table"==l.type&&(l.options.table_delete=!1,l.options.table_add=!1,l.options.table_edit=!1,l.options.tableset.forEach(function(e){e.limittype="readonly",e.required=!1})),n.splicerequiredrule(l.rules)):e.splice(a,1))}},l=e.length-1;l>=0;l--)a(l)},addrequiredrule:function(e,t){if(e){console.log("rules",e),console.log("name",t);for(var i=!1,n=0;n<e.length;n++){var o=e[n];void 0!==o.required&&(i=!0,o.required=!0)}i||e.push({required:!0,message:t+"必须填写"})}},splicerequiredrule:function(e){if(e)for(var t=e.length-1;t>=0;t--){var i=e[t];void 0!==i.required&&(!0,i.required=!1)}},leave_form_item_f:function(e,t){for(var i=e.length-1;i>=0;i--){var n=e[i];if(n.columns)for(var o=0;o<n.columns.length;o++){var a=n.columns[o];this.leave_form_item_f(a.list,t)}else for(var l in t)n.options.disabled=!0,n.options.required=!1,n.rules=[]}}}},x=(i("f96S"),i("X+cG"),i("KHd+")),T=Object(x.a)(k,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"flowdetail"},[i("div",[e.error?i("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):i("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"表单",name:"表单"}},[e.flowOi?i("div",[i("div",{ref:"printData",staticClass:"printData",attrs:{id:"printData"}},[i("el-button",{staticClass:"no-print printbtn",attrs:{size:"mini",icon:"el-icon-printer"},on:{click:e.print}},[e._v("打印")]),e._v(" "),e.flowOi.workname?i("el-alert",{staticStyle:{"margin-bottom":"10px","font-weight":"bolder"},attrs:{title:"文号："+e.flowOi.workname,closable:!1,type:"error"}}):e._e(),e._v(" "),e.flowOi.desc?i("div",[i("el-alert",{staticStyle:{"margin-bottom":"10px","font-weight":"bolder"},attrs:{title:"流程描述："+e.flowOi.desc,closable:!1,type:"success"}})],1):e._e(),e._v(" "),e.widgetForm&&e.widgetForm.list.length>0?i("div",[i("fm-generate-form",{ref:"generateForm",staticClass:"generateForm",attrs:{data:e.widgetForm,remote:e.remoteFuncs,value:e.widgetModels}})],1):e._e(),e._v(" "),i("el-form",{staticStyle:{"margin-top":"20px"},attrs:{"label-position":"top"}},[e.flowOi.suggests&&e.flowOi.suggests.length>0?i("el-form-item",{attrs:{label:"历史审批建议"}},[i("timeline",e._l(e.flowOi.suggests,function(t,n){return i("span",{key:n},[t.text?i("timeline-item",{attrs:{color:"green"}},[i("div",{staticClass:"fz12"},[i("v-icon",{attrs:{name:"person"}}),e._v(" "),t.todeptstr?i("span",[e._v("["+e._s(t.todeptstr)+"]")]):e._e(),e._v(" "),i("span",[e._v("\n                "+e._s(t.user))]),e._v(" "),i("span",[e._v("于"+e._s(e.friendlytimejs(t.created_at)))]),e._v(" "),t.funname?i("span",{staticClass:"label warning"},[e._v(e._s(t.funname))]):e._e()],1),e._v(" "),i("div",[i("span",{staticStyle:{"font-weight":"bolder"}},[e._v("\n                                          "+e._s(t.text))])])]):e._e()],1)}))],1):e._e()],1)],1),e._v(" "),e.flowOi.filelistlog&&e.flowOi.filelistlog.length>0?i("el-collapse",{attrs:{accordion:"",value:"4"}},[i("el-collapse-item",{attrs:{name:"4"}},[i("template",{slot:"title"},[e._v("\n                                文件上传日志\n                            ")]),e._v(" "),i("flow-file-log",{attrs:{filelistlog:e.flowOi.filelistlog}})],2)],1):e._e()],1):e._e()]),e._v(" "),i("el-tab-pane",{attrs:{label:"日志",name:"日志"}},[i("timeline",e._l(e.logList,function(t){return i("timeline-item",{key:t._id,attrs:{color:"green"}},[i("flow-log",{attrs:{log:t,designer:e.designer,"flow-obj":e.flowOi,"is-admin":e.isAdmin}})],1)}))],1),e._v(" "),i("el-tab-pane",{attrs:{label:"消息实例图",name:"消息实例图"}},["消息实例图"==e.activeName?i("diagrambox",{ref:"diag2",staticStyle:{border:"solid 1px black",width:"100%",height:"500px"},attrs:{angle:90,"model-data":e.msgsdiagramData}}):e._e()],1),e._v(" "),i("el-tab-pane",{attrs:{label:"设计流程图",name:"设计流程图"}},["设计流程图"==e.activeName?i("diagram",{ref:"diag",staticStyle:{border:"solid 1px black",width:"100%",height:"500px"},attrs:{readonly:!0,angle:90,"model-data":e.diagramData}}):e._e()],1),e._v(" "),i("el-tab-pane",{attrs:{label:"设计备注",name:"设计备注"}},["设计备注"==e.activeName?i("div",[i("div",{staticClass:"remarkbox",domProps:{innerHTML:e._s(e.designer.remark)}}),e._v(" "),i("div",{staticClass:"fileList"},e._l(e.designer.fileList,function(t,n){return i("div",{key:n,staticClass:"fz12"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),i("a",{staticClass:"mg-r5",attrs:{target:"_blank",href:t.url}},[i("v-icon",{attrs:{name:"eye"}})],1)])}))]):e._e()])],1)],1)])},[],!1,null,"a766e5a2",null);T.options.__file="CFlowDetail.vue";t.default=T.exports},YEIV:function(e,t,i){"use strict";t.__esModule=!0;var n=function(e){return e&&e.__esModule?e:{default:e}}(i("SEkw"));t.default=function(e,t,i){return t in e?(0,n.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},f2f8:function(e,t,i){"use strict";var n=i("wfC3");i.n(n).a},f5R0:function(e,t,i){"use strict";var n=i("XE86");i.n(n).a},f96S:function(e,t,i){"use strict";var n=i("kzlK");i.n(n).a},hSLB:function(e,t,i){"use strict";var n=i("xTI2");i.n(n).a},kzlK:function(e,t,i){},w3TN:function(e,t,i){},wfC3:function(e,t,i){},xTI2:function(e,t,i){}}]);