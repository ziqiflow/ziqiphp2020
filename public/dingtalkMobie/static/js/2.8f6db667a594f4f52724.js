webpackJsonp([2],{"+tnW":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("0CXz"),o={name:"Cmodaldealer",components:{FlowDetail:i("jIR3").a},data:function(){return{loading:!1,error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null,showMessageBox:!1}},watch:{},mounted:function(){var e=this;console.log("query",this.$route.query);var t=this.$route.query;t.type&&Object(n.s)({msg_id:t.msgid}).then(function(t){var i=t.data;e.showMessageBox=1!=i.data&&null!==i.data}),this.loadmodal(this.$route.query)},methods:{setread:function(){var e=this;this.loading=!0,Object(n.y)({msgid:this.flowmsgid}).then(function(t){var i=t.data;e.loading=!1,i.success&&(e.showMessageBox=!1)})},cancelSuccess:function(){this.modalstatu=!1},cancel:function(){this.modalstatu=!1},loadmodal:function(e){this.flowOi_id=e.flowlistid?e.flowlistid:null,this.flowmsgid=e.msgid?e.msgid:null,this.nowfunid=e.nowfunid?e.nowfunid:null}}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{position:"relative"}},[!e.successShow&&e.flowOi_id?i("div",{staticStyle:{margin:"10px 10px 50px"}},[i("flow-detail",{attrs:{nowfunid:e.nowfunid,"flow-oi-id":e.flowOi_id},on:{"update:nowfunid":function(t){e.nowfunid=t},"update:flowOiId":function(t){e.flowOi_id=t},"update:flow-oi-id":function(t){e.flowOi_id=t}}})],1):e._e(),e._v(" "),e.showMessageBox?i("div",{staticClass:"showMessageBox"},[i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"primary"},on:{click:e.setread}},[e._v("标记为已读")])],1):e._e()])},staticRenderFns:[]};var a=i("VU/8")(o,r,!1,function(e){i("wPKX")},"data-v-76492274",null);t.default=a.exports},"4WTo":function(e,t,i){var n=i("NWt+");e.exports=function(e,t){var i=[];return n(e,!1,i.push,i,t),i}},"5T1I":function(e,t,i){"use strict";var n=i("Dd8w"),o=i.n(n),r=i("NYxO"),a=i("TIfe"),l=i("6dj7"),s=i("ffXQ"),d=i("Webv"),c={name:"Cflowlog",components:{Timeline:l.Timeline,TimelineItem:l.TimelineItem,TimelineTitle:l.TimelineTitle,ModelShowImages:s.a},props:{filelistlog:{type:Array,default:function(){return[]}}},computed:o()({},Object(r.d)({userid:function(e){return e.user.id}})),data:function(){return{}},activated:function(){},mounted:function(){},methods:{filedown:function(e){window.open(window.baseURL+"/file/oa/"+e.fileid+"/"+e.name+"?"+Object(a.b)(this.userid),this.isPc?"_blank":"_self")},showimage:function(e){this.$refs.showimages.showimage(e)},friendlytimejs:function(e){return Object(d.a)(e,new Date)}}},u={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.filelistlog?i("div",{staticClass:"log"},[i("model-show-images",{ref:"showimages",attrs:{filelistlog:e.filelistlog,type:"flowlog"}}),e._v(" "),i("timeline",e._l(e.filelistlog,function(t){return i("timeline-item",{key:t._id,attrs:{color:"green"}},[i("div",{staticClass:"fz13"},[i("v-icon",{attrs:{name:"person"}}),e._v(" "),i("span",[e._v(e._s(t.creater))]),e._v(" "),i("span",{staticClass:"funname"},[e._v(e._s(t.funname))]),e._v(" "),i("span",{staticClass:"fz12",staticStyle:{"margin-right":"5px"}},[e._v(e._s(e.friendlytimejs(t.created_at)))])],1),e._v(" "),i("div",e._l(t.files,function(t,n){return i("div",{key:n,staticClass:"fz12"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),"jpeg"==t.formats||"jpg"==t.formats||"png"==t.formats?i("i",{staticClass:"el-icon-picture-outline mg-r5 image_file_preview",staticStyle:{cursor:"pointer"},on:{click:function(i){return e.showimage(t.fileid,e.filelistlog)}}}):e._e(),e._v(" "),i("i",{staticClass:"el-icon-download filedown mg-r5",on:{click:function(i){return e.filedown(t)}}})])}),0)])}),1)],1):e._e()])},staticRenderFns:[]};var f=i("VU/8")(c,u,!1,function(e){i("Q1Cy")},"data-v-35aa0a7d",null);t.a=f.exports},"6dj7":function(e,t,i){(function(e){"use strict";!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i=" .timeline { padding: 0; position: relative; list-style: none; font-family: PingFangSC-light, Avenir, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif; -webkit-font-smoothing: antialiased; margin: 10px 20px; } .timeline:after { position: absolute; content: ''; left: 0; top: 0; width: 1px; height: 100%; background-color: var(--timelineTheme); } .timeline-item { position: relative; margin: 1.5em 0 0 28px; padding-bottom: 1.5em; border-bottom: 1px dotted var(--timelineTheme); } .timeline-item:last-child { border-bottom: none; } .timeline-circle { position: absolute; top: .28em; left: -34px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--timelineTheme); background-color: var(--timelineTheme); z-index: 1; box-sizing: content-box; } .timeline-circle.hollow { background-color: var(--timelineBg); } .timeline-title { position: relative; display: inline-block; /** * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素） */ cursor: crosshair; margin: -.15em 0 15px 28px } .timeline-title:not(:first-child) { margin-top: 28px; } .timeline-title-circle { left: -36px; top: .15em; width: 16px; height: 16px; } .timeline-others { width: 40px; height: auto; top: .2em; left: -48px; line-height: 1; padding: 2px 0; text-align: center; border: none; background-color: var(--timelineBg); } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}}();var t={render:function(){var e=this.$createElement;return(this._self._c||e)("ul",{ref:"timeline",staticClass:"timeline"},[this._t("default")],2)},staticRenderFns:[],name:"Timeline",props:{timelineTheme:{type:String,default:"#dbdde0"},timelineBg:{type:String,default:"#fff"}},mounted:function(){var e=this.$refs.timeline;e.style.setProperty("--timelineTheme",this.timelineTheme),e.style.setProperty("--timelineBg",this.timelineBg)}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var i={name:"TimelineItemBase",props:{bgColor:{type:String,default:""},lineColor:{type:String,default:""},hollow:{type:Boolean,default:!1},fontColor:{type:String,default:"#37414a"}},data:function(){return{slotOthers:!1}},computed:{circleStyle:function(){if(this.bgColor||this.lineColor||this.hollow){var e={};return this.bgColor&&(e={"border-color":this.bgColor,"background-color":this.bgColor}),this.lineColor&&(e=Object.assign({},e,{"border-color":this.lineColor})),e}},itemStyle:function(){return{color:this.fontColor}},slotClass:function(){var e="";return this.slotOthers?e="timeline-others":this.hollow&&(e="hollow"),e}},mounted:function(){this.slotOthers=!!this.$refs.others.innerHTML}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-item",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-title",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle timeline-title-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};"undefined"!=typeof window&&window.Vue&&(window.Vue.component(t.name,t),window.Vue.component(n.name,n),window.Vue.component(o.name,o)),e.Timeline=t,e.TimelineItem=n,e.TimelineTitle=o,Object.defineProperty(e,"__esModule",{value:!0})})(t)},"7Doy":function(e,t,i){var n=i("EqjI"),o=i("7UMu"),r=i("dSzd")("species");e.exports=function(e){var t;return o(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!o(t.prototype)||(t=void 0),n(t)&&null===(t=t[r])&&(t=void 0)),void 0===t?Array:t}},"7Uky":function(e,t){},"9Bbf":function(e,t,i){"use strict";var n=i("kM2E");e.exports=function(e){n(n.S,e,{of:function(){for(var e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return new this(t)}})}},"9C8M":function(e,t,i){"use strict";var n=i("evD5").f,o=i("Yobk"),r=i("xH/j"),a=i("+ZMJ"),l=i("2KxR"),s=i("NWt+"),d=i("vIB/"),c=i("EGZi"),u=i("bRrM"),f=i("+E39"),m=i("06OY").fastKey,g=i("LIJb"),h=f?"_s":"size",p=function(e,t){var i,n=m(t);if("F"!==n)return e._i[n];for(i=e._f;i;i=i.n)if(i.k==t)return i};e.exports={getConstructor:function(e,t,i,d){var c=e(function(e,n){l(e,c,t,"_i"),e._t=t,e._i=o(null),e._f=void 0,e._l=void 0,e[h]=0,void 0!=n&&s(n,i,e[d],e)});return r(c.prototype,{clear:function(){for(var e=g(this,t),i=e._i,n=e._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete i[n.i];e._f=e._l=void 0,e[h]=0},delete:function(e){var i=g(this,t),n=p(i,e);if(n){var o=n.n,r=n.p;delete i._i[n.i],n.r=!0,r&&(r.n=o),o&&(o.p=r),i._f==n&&(i._f=o),i._l==n&&(i._l=r),i[h]--}return!!n},forEach:function(e){g(this,t);for(var i,n=a(e,arguments.length>1?arguments[1]:void 0,3);i=i?i.n:this._f;)for(n(i.v,i.k,this);i&&i.r;)i=i.p},has:function(e){return!!p(g(this,t),e)}}),f&&n(c.prototype,"size",{get:function(){return g(this,t)[h]}}),c},def:function(e,t,i){var n,o,r=p(e,t);return r?r.v=i:(e._l=r={i:o=m(t,!0),k:t,v:i,p:n=e._l,n:void 0,r:!1},e._f||(e._f=r),n&&(n.n=r),e[h]++,"F"!==o&&(e._i[o]=r)),e},getEntry:p,setStrong:function(e,t,i){d(e,t,function(e,i){this._t=g(e,t),this._k=i,this._l=void 0},function(){for(var e=this._k,t=this._l;t&&t.r;)t=t.p;return this._t&&(this._l=t=t?t.n:this._t._f)?c(0,"keys"==e?t.k:"values"==e?t.v:[t.k,t.v]):(this._t=void 0,c(1))},i?"entries":"values",!i,!0),u(t)}}},"9bBU":function(e,t,i){i("mClu");var n=i("FeBl").Object;e.exports=function(e,t,i){return n.defineProperty(e,t,i)}},ALrJ:function(e,t,i){var n=i("+ZMJ"),o=i("MU5D"),r=i("sB3e"),a=i("QRG4"),l=i("oeOm");e.exports=function(e,t){var i=1==e,s=2==e,d=3==e,c=4==e,u=6==e,f=5==e||u,m=t||l;return function(t,l,g){for(var h,p,w=r(t),v=o(w),y=n(l,g,3),_=a(v.length),b=0,k=i?m(t,_):s?m(t,0):void 0;_>b;b++)if((f||b in v)&&(p=y(h=v[b],b,w),e))if(i)k[b]=p;else if(p)switch(e){case 3:return!0;case 5:return h;case 6:return b;case 2:k.push(h)}else if(c)return!1;return u?-1:d||c?c:k}}},BDhv:function(e,t,i){var n=i("kM2E");n(n.P+n.R,"Set",{toJSON:i("m9gC")("Set")})},C4MV:function(e,t,i){e.exports={default:i("9bBU"),__esModule:!0}},HpRW:function(e,t,i){"use strict";var n=i("kM2E"),o=i("lOnJ"),r=i("+ZMJ"),a=i("NWt+");e.exports=function(e){n(n.S,e,{from:function(e){var t,i,n,l,s=arguments[1];return o(this),(t=void 0!==s)&&o(s),void 0==e?new this:(i=[],t?(n=0,l=r(s,arguments[2],2),a(e,!1,function(e){i.push(l(e,n++))})):a(e,!1,i.push,i),new this(i))}})}},LIJb:function(e,t,i){var n=i("EqjI");e.exports=function(e,t){if(!n(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},Q1Cy:function(e,t){},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var n,o=i("C4MV"),r=(n=o)&&n.__esModule?n:{default:n};t.default=function(e,t,i){return t in e?(0,r.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},cozg:function(e,t){},ioQ5:function(e,t,i){i("HpRW")("Set")},jIR3:function(e,t,i){"use strict";var n=i("fZjL"),o=i.n(n),r=i("mvHQ"),a=i.n(r),l=i("0CXz"),s=i("6dj7"),d=i("Xlh3"),c=i("Webv"),u=i("bOdI"),f=i.n(u),m=i("//Fk"),g=i.n(m),h=(i("lHA8"),i("c/Tr"),i("pFYg")),p=i.n(h);var w,v=function(e){return new g.a(function(t,i){var n=document.createElement("script");n.src=e,n.type="text/javascript",document.body.appendChild(n),n.onload=function(){t()}})},y=(w={name:"",props:["modelData"]},f()(w,"props",{modelData:{type:Object,default:function(){return{}}},angle:{type:Number,default:function(){return 0}},readonly:{type:Boolean,default:function(){return!1}}}),f()(w,"data",function(){return{diagram:null}}),f()(w,"computed",{}),f()(w,"watch",{modelData:function(e){this.updateModel(e)}}),f()(w,"mounted",function(){var e=this;window.go?this.init():v(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){e.init()})}),f()(w,"methods",{init:function(){console.log("window.go"),console.log(window.go);var e=window.go.GraphObject.make,t=this,i=e(window.go.Diagram,this.$el,{initialContentAlignment:window.go.Spot.Center,allowZoom:!0,isReadOnly:this.readonly,"toolManager.mouseWheelBehavior":window.go.ToolManager.WheelZoom,"undoManager.isEnabled":!0,ModelChanged:function(e){t.$emit("model-changed",e)},ChangedSelection:function(e){t.$emit("changed-selection",e)}});i.nodeTemplate=e(window.go.Node,"Auto",new window.go.Binding("location","loc",window.go.Point.parse).makeTwoWay(window.go.Point.stringify),e(window.go.Shape,"RoundedRectangle",{fill:"white",strokeWidth:0,portId:"",fromLinkable:!1,toLinkable:!1,cursor:"pointer"},new window.go.Binding("fill","color")),e(window.go.TextBlock,{margin:8,editable:!0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text").makeTwoWay())),i.linkTemplate=e(window.go.Link,{},e(window.go.Shape),e(window.go.Shape,{toArrow:"OpenTriangle"})),this.diagram=i,this.updateModel(this.modelData)},model:function(){return this.diagram.model},updateModel:function(e){if(console.log("updateModel",e),window.go)if(console.log(e instanceof window.go.Model),console.log(window.go),e instanceof window.go.Model)this.diagram.model=e;else{var t=new window.go.GraphLinksModel;if(e)for(var i in e)t[i]=e[i];this.diagram.model=t}},updateDiagramFromData:function(){this.diagram.startTransaction(),this.diagram.updateAllRelationshipsFromData(),this.diagram.updateAllTargetBindings(),this.diagram.commitTransaction("updated")}}),w),_={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var b,k=i("VU/8")(y,_,!1,function(e){i("7Uky")},null,null).exports,x=(b={name:"",props:["modelData"]},f()(b,"props",{modelData:{type:Object,default:function(){return{}}},angle:{type:Number,default:function(){return 0}}}),f()(b,"data",function(){return{diagram:null}}),f()(b,"computed",{}),f()(b,"watch",{modelData:function(e){this.updateModel(e)}}),f()(b,"mounted",function(){var e=this;window.go?this.init():v(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){e.init()})}),f()(b,"methods",{init:function(){var e=window.go.GraphObject.make;console.log(window.go);var t=this,i=e(window.go.Diagram,this.$el,{initialContentAlignment:window.go.Spot.Center,allowZoom:!0,isReadOnly:!0,layout:e(window.go.TreeLayout,{angle:this.angle,arrangement:window.go.TreeLayout.ArrangementHorizontal}),"undoManager.isEnabled":!0,"toolManager.mouseWheelBehavior":window.go.ToolManager.WheelZoom,ModelChanged:function(e){t.$emit("model-changed",e)},ChangedSelection:function(e){t.$emit("changed-selection",e)}});i.nodeTemplate=e(window.go.Node,"Auto",e(window.go.Shape,"RoundedRectangle",{fill:"white",strokeWidth:0,portId:"",fromLinkable:!1,toLinkable:!1,cursor:"pointer"},new window.go.Binding("fill","color")),e(window.go.Panel,"Table",{maxSize:new window.go.Size(230,999),margin:new window.go.Margin(3,3,0,3),defaultAlignment:window.go.Spot.Left},e(window.go.RowColumnDefinition,{column:5,width:4}),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),row:0,column:0,stroke:"#ff6600",font:"bold 10pt sans-serif"},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","title").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:1,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","to")),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:2,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","dealtype").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:3,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","PreFunName").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:4,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","content").makeTwoWay()))),i.linkTemplate=e(window.go.Link,{curve:window.go.Link.Bezier,adjusting:window.go.Link.Stretch,relinkableFrom:!0,relinkableTo:!0,reshapable:!0},e(window.go.Shape),e(window.go.Shape,{toArrow:"OpenTriangle"})),this.diagram=i,this.updateModel(this.modelData)},model:function(){return this.diagram.model},updateModel:function(e){if(window.go)if(e instanceof window.go.Model)this.diagram.model=e;else{var t=new window.go.GraphLinksModel;if(e)for(var i in e)t[i]=e[i];this.diagram.model=t}},updateDiagramFromData:function(){this.diagram.startTransaction(),this.diagram.updateAllRelationshipsFromData(),this.diagram.updateAllTargetBindings(),this.diagram.commitTransaction("updated")}}),b),T={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var O=i("VU/8")(x,T,!1,function(e){i("cozg")},null,null).exports,C=i("lTq0"),S=i("5T1I"),M=i("lRwf"),D=i.n(M),B=function e(t,i){if(!(this instanceof e))return new e(t,i);this.options=this.extend({noPrint:".no-print"},i),"string"==typeof t?this.dom=document.querySelector(t):(this.isDOM(t),this.dom=this.isDOM(t)?t:t.$el),this.init()};B.prototype={init:function(){var e=this.getStyle()+this.getHtml();this.writeIframe(e)},extend:function(e,t){for(var i in t)e[i]=t[i];return e},getStyle:function(){for(var e="",t=document.querySelectorAll("style,link"),i=0;i<t.length;i++)e+=t[i].outerHTML;return e+="<style>"+(this.options.noPrint?this.options.noPrint:".no-print")+"{display:none;}</style>"},getHtml:function(){for(var e=document.querySelectorAll("input"),t=document.querySelectorAll("textarea"),i=document.querySelectorAll("select"),n=0;n<e.length;n++)"checkbox"==e[n].type||"radio"==e[n].type?1==e[n].checked?e[n].setAttribute("checked","checked"):e[n].removeAttribute("checked"):(e[n].type,e[n].setAttribute("value",e[n].value));for(var o=0;o<t.length;o++)"textarea"==t[o].type&&(t[o].innerHTML=t[o].value);for(var r=0;r<i.length;r++)if("select-one"==i[r].type){var a=i[r].children;for(var l in a)"OPTION"==a[l].tagName&&(1==a[l].selected?a[l].setAttribute("selected","selected"):a[l].removeAttribute("selected"))}return this.dom.outerHTML},writeIframe:function(e){var t,i,n=document.createElement("iframe"),o=document.body.appendChild(n);n.id="myIframe",n.setAttribute("style","position:absolute;width:0;height:0;top:-10px;left:-10px;"),t=o.contentWindow||o.contentDocument,(i=o.contentDocument||o.contentWindow.document).open(),i.write(e),i.close();var r=this;n.onload=function(){r.toPrint(t),setTimeout(function(){document.body.removeChild(n)},100)}},toPrint:function(e){try{setTimeout(function(){e.focus();try{e.document.execCommand("print",!1,null)||e.print()}catch(t){e.print()}e.close()},10)}catch(e){console.log("err",e)}},isDOM:"object"===("undefined"==typeof HTMLElement?"undefined":p()(HTMLElement))?function(e){return e instanceof HTMLElement}:function(e){return e&&"object"===(void 0===e?"undefined":p()(e))&&1===e.nodeType&&"string"==typeof e.nodeName}};var j={install:function(e,t){e.prototype.$print=B}},E=j;D.a.use(E);var A={name:"Cflowdetail",components:{diagram:k,diagrambox:O,FlowLog:C.a,Timeline:s.Timeline,TimelineItem:s.TimelineItem,TimelineTitle:s.TimelineTitle,FlowFileLog:S.a},props:{flowOiId:{type:String,default:function(){return""}},nowfunid:{type:String},isAdmin:{type:Boolean,default:function(){return!1}}},data:function(){return{error:null,title:null,loading:!1,flowOi:null,designer:null,logList:[],msgList:[],remoteFuncs:{},widgetModels:{},widgetForm:null,activeName:"表单",msgsdiagramDataTest:{nodeDataArray:[{key:1,text:"Alpha",color:"lightblue",loc:"355 85"},{key:2,text:"Beta",color:"orange",loc:"355 85"},{key:3,text:"Gamma",color:"lightgreen",loc:"355 85"},{key:4,text:"Delta",color:"pink",loc:"355 85"}],linkDataArray:[{from:1,to:2},{from:1,to:3},{from:3,to:4}]},diagramData:{nodeDataArray:[],linkDataArray:[]},msgsdiagramData:{nodeDataArray:[],linkDataArray:[]}}},watch:{},mounted:function(){this.getinfo(this.flowOiId)},methods:{friendlytimejs:function(e){return Object(c.a)(e,new Date)},isDingTalk:function(){return-1!=window.navigator.userAgent.toLowerCase().indexOf("dingtalk")},print:function(){var e=this;this.isDingTalk()?this.$confirm("当前位于钉钉浏览器，由于钉钉暂不支持打印，是否前往浏览器打印?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){window.open(window.location.href,"_blank")}).catch(function(){e.$message({type:"info",message:"程序猿已经尽力了😢"})}):this.$print(this.$refs.printData)},creatMsgDiagramData:function(e,t,i){var n=function(e){var t=[];return e.forEach(function(e){t.push(e.n)}),0==t.length?"":"["+t.join("|")+"]"},o=function(e){var t="无";e.log&&(t="点击<"+e.log.button+">");var i="",o="#515a6e";switch(e.status){case 1:i="等待处理",o="#ff9900";break;case 2:i="取消",o="#a7a7a7";break;case 3:case 4:i="结束",o="#61afff";break;case 5:case 6:i="";break;case 7:i="结束",o="#61afff";break;case 8:i="撤回后取消",o="#a7a7a7"}i&&(i="[状态:"+i+"]");var r="";"message"==e.dealtype&&(r="["+(0==e.hasread?"未读":"已读")+"]");var a="";return 100==e.level&&(a="[紧急]"),{key:e._id,title:i+e.NowFunName+r+a,PreFunName:"上一节点："+e.PreFunName,content:"处理内容："+t,dealtype:"处理方式："+Object(d.e)(e.dealtype),to:"处理人："+(e.todepts?n(e.todepts):"")+e.toer,color:o,stroke:"white"}},r=function(e,t){e.some(function(e){return e.key==t.key})||e.push(t)},a=[],l=[];return e.forEach(function(t){t.PreMsgId||(a.push({key:t._id,title:"[开始节点]"+t.NowFunName,PreFunName:"上一节点：无",content:"处理内容：无",dealtype:"处理方式：无",to:"申请人："+(t.todepts?n(t.todepts):"")+t.creater,color:"#67c23a",stroke:"white"}),function t(i){e.forEach(function(e){e.PreMsgIds?e.PreMsgIds.some(function(e){return e==i})&&(l.push({from:i,to:e._id}),console.log("linkDataArray1111",l),r(a,o(e)),t(e._id)):e.PreMsgId==i&&(l.push({from:i,to:e._id}),console.log("linkDataArray",l),r(a,o(e)),t(e._id))})}(t._id))}),{nodeDataArray:a,linkDataArray:l}},tran_dealtype:function(e){return Object(d.e)(e)},creatdiag:function(e){var t=Object(d.b)(this.funlist,this.nowfunid),i=t.linkDataArray,n=t.nodeDataArray;this.diagramData={nodeDataArray:n,linkDataArray:i}},initsuggests:function(e,t){e.forEach(function(e){for(var i=0;i<t.length;i++){var n=t[i];if(n.id==e.funid){e.funname=n.name;break}}})},getinfo:function(e){var t=this;this.modalstatu=!0,this.successShow=!1,this.title="加载中...",this.loading=!0,Object(l.j)({flowOi_id:e}).then(function(e){var i=e.data;if(console.log(i),t.loading=!1,i.success){if(!i.data)return void(t.error="没有查询到对应的流程");console.log("this.flowOi",i.data),t.flowOi=i.data;var n=t.flowOi,o=n.designer,r=n.logList,l=n.msgList;t.flowOi.suggests&&t.initsuggests(t.flowOi.suggests,o.funlist),t.designer=o,t.logList=r,t.msgList=l,t.logList.forEach(function(e){e.msgobj=null,e.flowmsgid&&t.msgList.forEach(function(t){e.flowmsgid==t._id&&(e.msgobj=t)})}),t.diagramData=Object(d.b)(t.flowOi.designer.funlist,t.flowOi.designer.layoutset,t.nowfunid),t.msgsdiagramData=t.creatMsgDiagramData(t.flowOi.msgList,t.flowOi.logList,t.designer.funlist),console.log("msgsdiagramData",t.msgsdiagramData),t.widgetForm=t.initFromset(t.designer,t.flowOi.formdata),t.isPc||(t.widgetForm.config.labelWidth=null,t.widgetForm.config.labelPosition="top"),console.log("this.widgetForm ",t.widgetForm),console.log("this.widgetForm ",a()(t.widgetForm)),t.widgetModels=t.copyobject(t.flowOi.formdata)}else t.error=i.msg})},cancel:function(){this.modalstatu=!1},copyobject:function(e){return JSON.parse(a()(e))},initFromset:function(e,t){var i=this.copyobject(e.formset);return console.log("formdata",t),this.leave_form_item_f2(i.list,e.set.formEditLimit,t),i},leave_form_item_f2:function(e,t,i){for(var n=this,r=function(r){var a=e[r];if(a.columns)for(var l=0;l<a.columns.length;l++){var s=a.columns[l];n.leave_form_item_f2(s.list,t,i)}else{Object(d.d)(a);var c=!1;if(!n.isAdmin&&t){var u=function(i){var o=t[i];if(!o.type)return"continue";if(a.key==o.key){switch(c=!0,"table"==a.type&&(a.options.table_delete=!1,a.options.table_add=!1,a.options.table_edit=!1,a.options.tableset.forEach(function(e){var t=!1;o.son&&o.son.forEach(function(i){i.key==e.code&&(t=!0,e.required=i.required,e.limittype=i.type)}),t||(e.required=!1,e.limittype="readonly")})),o.type){case"canedit":console.log(o),a.options.disabled=!1,o.required?(a.options.required=!0,n.addrequiredrule(a.rules,a.name)):(a.options.required=!1,n.splicerequiredrule(a.rules));break;case"readonly":a.options.disabled=!0,a.options.required=!1,n.splicerequiredrule(a.rules);break;case"hidden":e.splice(r,1)}return"break"}};e:for(var f=0;f<t.length;f++){switch(u(f)){case"continue":continue;case"break":break e}}}c||(o()(i).some(function(e){return e==a.model})?(a.options.disabled=!0,a.options.required=!1,"table"==a.type&&(a.options.table_delete=!1,a.options.table_add=!1,a.options.table_edit=!1,a.options.tableset.forEach(function(e){e.limittype="readonly",e.required=!1})),n.splicerequiredrule(a.rules)):e.splice(r,1))}},a=e.length-1;a>=0;a--)r(a)},addrequiredrule:function(e,t){if(e){console.log("rules",e),console.log("name",t);for(var i=!1,n=0;n<e.length;n++){var o=e[n];void 0!==o.required&&(i=!0,o.required=!0)}i||e.push({required:!0,message:t+"必须填写"})}},splicerequiredrule:function(e){if(e)for(var t=e.length-1;t>=0;t--){var i=e[t];void 0!==i.required&&(!0,i.required=!1)}},leave_form_item_f:function(e,t){for(var i=e.length-1;i>=0;i--){var n=e[i];if(n.columns)for(var o=0;o<n.columns.length;o++){var r=n.columns[o];this.leave_form_item_f(r.list,t)}else for(var a in t)n.options.disabled=!0,n.options.required=!1,n.rules=[]}}}},F={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"flowdetail"},[i("div",[e.error?i("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):i("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"表单",name:"表单"}},[e.flowOi?i("div",[i("div",{ref:"printData",staticClass:"printData",attrs:{id:"printData"}},[i("el-button",{staticClass:"no-print printbtn",attrs:{size:"mini",icon:"el-icon-printer"},on:{click:e.print}},[e._v("打印")]),e._v(" "),e.flowOi.workname?i("el-alert",{staticStyle:{"margin-bottom":"10px","font-weight":"bolder"},attrs:{title:"文号："+e.flowOi.workname,closable:!1,type:"error"}}):e._e(),e._v(" "),e.flowOi.desc?i("div",[i("el-alert",{staticStyle:{"margin-bottom":"10px","font-weight":"bolder"},attrs:{title:"流程描述："+e.flowOi.desc,closable:!1,type:"success"}})],1):e._e(),e._v(" "),e.widgetForm&&e.widgetForm.list.length>0?i("div",[i("fm-generate-form",{ref:"generateForm",staticClass:"generateForm",attrs:{data:e.widgetForm,remote:e.remoteFuncs,value:e.widgetModels}})],1):e._e(),e._v(" "),i("el-form",{staticStyle:{"margin-top":"20px"},attrs:{"label-position":"top"}},[e.flowOi.suggests&&e.flowOi.suggests.length>0?i("el-form-item",{attrs:{label:"历史审批建议"}},[i("timeline",e._l(e.flowOi.suggests,function(t,n){return i("span",{key:n},[t.text?i("timeline-item",{attrs:{color:"green"}},[i("div",{staticClass:"fz12"},[i("v-icon",{attrs:{name:"person"}}),e._v(" "),t.todeptstr?i("span",[e._v("["+e._s(t.todeptstr)+"]")]):e._e(),e._v(" "),i("span",[e._v("\n                                                    "+e._s(t.user))]),e._v(" "),i("span",[e._v("于"+e._s(e.friendlytimejs(t.created_at)))]),e._v(" "),t.funname?i("span",{staticClass:"label warning"},[e._v(e._s(t.funname))]):e._e()],1),e._v(" "),i("div",[i("span",{staticStyle:{"font-weight":"bolder"}},[e._v("\n                                                    "+e._s(t.text))])])]):e._e()],1)}),0)],1):e._e()],1)],1),e._v(" "),e.flowOi.filelistlog&&e.flowOi.filelistlog.length>0?i("el-collapse",{attrs:{accordion:"",value:"4"}},[i("el-collapse-item",{attrs:{name:"4"}},[i("template",{slot:"title"},[e._v("\n                                文件上传日志\n                            ")]),e._v(" "),i("flow-file-log",{attrs:{filelistlog:e.flowOi.filelistlog}})],2)],1):e._e()],1):e._e()]),e._v(" "),i("el-tab-pane",{attrs:{label:"日志",name:"日志"}},[i("timeline",e._l(e.logList,function(t){return i("timeline-item",{key:t._id,attrs:{color:"green"}},[i("flow-log",{attrs:{log:t,designer:e.designer,"flow-obj":e.flowOi,"is-admin":e.isAdmin}})],1)}),1)],1),e._v(" "),i("el-tab-pane",{attrs:{label:"消息实例图",name:"消息实例图"}},["消息实例图"==e.activeName?i("diagrambox",{ref:"diag2",staticStyle:{border:"solid 1px black",width:"100%",height:"500px"},attrs:{angle:90,"model-data":e.msgsdiagramData}}):e._e()],1),e._v(" "),i("el-tab-pane",{attrs:{label:"设计流程图",name:"设计流程图"}},["设计流程图"==e.activeName?i("diagram",{ref:"diag",staticStyle:{border:"solid 1px black",width:"100%",height:"500px"},attrs:{readonly:!0,angle:90,"model-data":e.diagramData}}):e._e()],1),e._v(" "),i("el-tab-pane",{attrs:{label:"设计备注",name:"设计备注"}},["设计备注"==e.activeName?i("div",[i("div",{staticClass:"remarkbox",domProps:{innerHTML:e._s(e.designer.remark)}}),e._v(" "),i("div",{staticClass:"fileList"},e._l(e.designer.fileList,function(t,n){return i("div",{key:n,staticClass:"fz12"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),i("a",{staticClass:"mg-r5",attrs:{target:"_blank",href:t.url}},[i("v-icon",{attrs:{name:"eye"}})],1)])}),0)]):e._e()])],1)],1)])},staticRenderFns:[]};var L=i("VU/8")(A,F,!1,function(e){i("vrlt"),i("pGUO")},"data-v-2b831688",null);t.a=L.exports},lHA8:function(e,t,i){e.exports={default:i("pPW7"),__esModule:!0}},m9gC:function(e,t,i){var n=i("RY/4"),o=i("4WTo");e.exports=function(e){return function(){if(n(this)!=e)throw TypeError(e+"#toJSON isn't generic");return o(this)}}},mClu:function(e,t,i){var n=i("kM2E");n(n.S+n.F*!i("+E39"),"Object",{defineProperty:i("evD5").f})},oNmr:function(e,t,i){i("9Bbf")("Set")},oeOm:function(e,t,i){var n=i("7Doy");e.exports=function(e,t){return new(n(e))(t)}},pGUO:function(e,t){},pPW7:function(e,t,i){i("M6a0"),i("zQR9"),i("+tPU"),i("ttyz"),i("BDhv"),i("oNmr"),i("ioQ5"),e.exports=i("FeBl").Set},qo66:function(e,t,i){"use strict";var n=i("7KvD"),o=i("kM2E"),r=i("06OY"),a=i("S82l"),l=i("hJx8"),s=i("xH/j"),d=i("NWt+"),c=i("2KxR"),u=i("EqjI"),f=i("e6n0"),m=i("evD5").f,g=i("ALrJ")(0),h=i("+E39");e.exports=function(e,t,i,p,w,v){var y=n[e],_=y,b=w?"set":"add",k=_&&_.prototype,x={};return h&&"function"==typeof _&&(v||k.forEach&&!a(function(){(new _).entries().next()}))?(_=t(function(t,i){c(t,_,e,"_c"),t._c=new y,void 0!=i&&d(i,w,t[b],t)}),g("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(e){var t="add"==e||"set"==e;e in k&&(!v||"clear"!=e)&&l(_.prototype,e,function(i,n){if(c(this,_,e),!t&&v&&!u(i))return"get"==e&&void 0;var o=this._c[e](0===i?0:i,n);return t?this:o})}),v||m(_.prototype,"size",{get:function(){return this._c.size}})):(_=p.getConstructor(t,e,w,b),s(_.prototype,i),r.NEED=!0),f(_,e),x[e]=_,o(o.G+o.W+o.F,x),v||p.setStrong(_,e,w),_}},ttyz:function(e,t,i){"use strict";var n=i("9C8M"),o=i("LIJb");e.exports=i("qo66")("Set",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{add:function(e){return n.def(o(this,"Set"),e=0===e?0:e,e)}},n)},vrlt:function(e,t){},wPKX:function(e,t){}});