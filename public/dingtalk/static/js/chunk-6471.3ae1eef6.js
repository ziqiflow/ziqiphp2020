(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6471","chunk-5c8d","chunk-5520","chunk-d780","chunk-b367"],{"0mAM":function(e,t,i){},"5o4n":function(e,t,i){},"9N40":function(e,t,i){},"9hly":function(e,t,i){"use strict";var n=i("wFxQ");i.n(n).a},AmLy:function(e,t,i){"use strict";i.r(t);var n=i("7Qib"),o=i("wd/R"),a=i.n(o),s={name:"CGantt",props:{tasks:{type:Array,default:function(){return[]}}},data:function(){return{gantt_chart:null}},activated:function(){},mounted:function(){var e=this;Object(n.d)(window.baseURL+"/dist/lib/gantt/gantt.min.js").then(function(){e.init()})},methods:{change_view:function(e){this.gantt_chart.change_view_mode(e)},dateCount:function(e){if(!e)return"0秒";var t=e/24/60/60,i=Math.floor(t),n=(e-24*i*60*60)/60/60,o=Math.floor(n),a=(e-24*i*60*60-60*o*60)/60,s=Math.floor(a),r=e-60*i*60*24-60*o*60-60*s,l="";return i&&(l+=Math.abs(i)+"天"),o&&(l+=o+"小时"),s&&(l+=s+"分"),!l&&r&&(l+=r+"秒"),l},init:function(){var e=this;console.log(this.tasks),this.gantt_chart=new Gantt("#gantt-target",this.tasks,{custom_popup_html:function(t){var i=a()(t.end).format("YYYY-MM-DD HH:mm:ss"),n=a()(t.start).format("YYYY-MM-DD HH:mm:ss");return'<div class="close">x</div>\n        <div class="gantt-details-container" style="width:200px;">\n          <h5>'+t.name+"</h5>\n          <p>开始："+n+" </p>\n          <p>结束："+i+"</p>\n          "+(t.isplan?"":"<p>实际"+(t.isplan||t.isfinish?"":"已")+"用时："+e.dateCount(a()(t.end).diff(a()(t.start))/1e3)+"</p>")+"\n        </div>\n      "},on_click:function(e){console.log(e)},on_date_change:function(e,t,i){console.log(e,t,i)},on_progress_change:function(e,t){console.log(e,t)},on_view_change:function(e){console.log(e)},view_mode:"Day",language:"zh",popup_trigger:"mouseover"})}}},r=(i("OU/J"),i("KHd+")),l=Object(r.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{attrs:{id:"gantt-target"}}),e._v(" "),i("el-button-group",[i("el-button",{on:{click:function(t){e.change_view("Quarter Day")}}},[e._v("6小时")]),e._v(" "),i("el-button",{on:{click:function(t){e.change_view("Half Day")}}},[e._v("12小时")]),e._v(" "),i("el-button",{on:{click:function(t){e.change_view("Day")}}},[e._v("天")]),e._v(" "),i("el-button",{on:{click:function(t){e.change_view("Week")}}},[e._v("周")]),e._v(" "),i("el-button",{on:{click:function(t){e.change_view("Month")}}},[e._v("月")])],1)],1)},[],!1,null,"6bb62507",null);l.options.__file="CGantt.vue";t.default=l.exports},CpCM:function(e,t,i){"use strict";var n=i("9N40");i.n(n).a},Lhkx:function(e,t,i){},"OU/J":function(e,t,i){"use strict";var n=i("Lhkx");i.n(n).a},Qtz6:function(e,t,i){"use strict";i.r(t);var n,o=i("YEIV"),a=i.n(o),s=i("7Qib"),r=(n={name:"",props:["modelData"]},a()(n,"props",{modelData:{type:Object,default:function(){return{}}},angle:{type:Number,default:function(){return 0}},readonly:{type:Boolean,default:function(){return!1}}}),a()(n,"data",function(){return{diagram:null}}),a()(n,"computed",{}),a()(n,"watch",{modelData:function(e){this.updateModel(e)}}),a()(n,"mounted",function(){var e=this;window.go?this.init():Object(s.d)(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){e.init()})}),a()(n,"methods",{init:function(){console.log("window.go"),console.log(window.go);var e=window.go.GraphObject.make,t=this,i=e(window.go.Diagram,this.$el,{initialContentAlignment:window.go.Spot.Center,allowZoom:!0,isReadOnly:this.readonly,"toolManager.mouseWheelBehavior":window.go.ToolManager.WheelZoom,"undoManager.isEnabled":!0,ModelChanged:function(e){t.$emit("model-changed",e)},ChangedSelection:function(e){t.$emit("changed-selection",e)}});i.nodeTemplate=e(window.go.Node,"Auto",new window.go.Binding("location","loc",window.go.Point.parse).makeTwoWay(window.go.Point.stringify),e(window.go.Shape,"RoundedRectangle",{fill:"white",strokeWidth:0,portId:"",fromLinkable:!1,toLinkable:!1,cursor:"pointer"},new window.go.Binding("fill","color")),e(window.go.TextBlock,{margin:8,editable:!0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text").makeTwoWay())),i.linkTemplate=e(window.go.Link,{},e(window.go.Shape),e(window.go.Shape,{toArrow:"OpenTriangle"})),this.diagram=i,this.updateModel(this.modelData)},model:function(){return this.diagram.model},updateModel:function(e){if(console.log("updateModel",e),window.go)if(console.log(e instanceof window.go.Model),console.log(window.go),e instanceof window.go.Model)this.diagram.model=e;else{var t=new window.go.GraphLinksModel;if(e)for(var i in e)t[i]=e[i];this.diagram.model=t}},updateDiagramFromData:function(){this.diagram.startTransaction(),this.diagram.updateAllRelationshipsFromData(),this.diagram.updateAllTargetBindings(),this.diagram.commitTransaction("updated")}}),n),l=(i("hSLB"),i("KHd+")),d=Object(l.a)(r,function(){var e=this.$createElement;return(this._self._c||e)("div")},[],!1,null,null,null);d.options.__file="GoDiagramTreeLayout.vue";t.default=d.exports},"RU/L":function(e,t,i){i("Rqdy");var n=i("WEpk").Object;e.exports=function(e,t,i){return n.defineProperty(e,t,i)}},RnhZ:function(e,t,i){var n={"./af":"K/tc","./af.js":"K/tc","./ar":"jnO4","./ar-dz":"o1bE","./ar-dz.js":"o1bE","./ar-kw":"Qj4J","./ar-kw.js":"Qj4J","./ar-ly":"HP3h","./ar-ly.js":"HP3h","./ar-ma":"CoRJ","./ar-ma.js":"CoRJ","./ar-sa":"gjCT","./ar-sa.js":"gjCT","./ar-tn":"bYM6","./ar-tn.js":"bYM6","./ar.js":"jnO4","./az":"SFxW","./az.js":"SFxW","./be":"H8ED","./be.js":"H8ED","./bg":"hKrs","./bg.js":"hKrs","./bm":"p/rL","./bm.js":"p/rL","./bn":"kEOa","./bn.js":"kEOa","./bo":"0mo+","./bo.js":"0mo+","./br":"aIdf","./br.js":"aIdf","./bs":"JVSJ","./bs.js":"JVSJ","./ca":"1xZ4","./ca.js":"1xZ4","./cs":"PA2r","./cs.js":"PA2r","./cv":"A+xa","./cv.js":"A+xa","./cy":"l5ep","./cy.js":"l5ep","./da":"DxQv","./da.js":"DxQv","./de":"tGlX","./de-at":"s+uk","./de-at.js":"s+uk","./de-ch":"u3GI","./de-ch.js":"u3GI","./de.js":"tGlX","./dv":"WYrj","./dv.js":"WYrj","./el":"jUeY","./el.js":"jUeY","./en-SG":"zavE","./en-SG.js":"zavE","./en-au":"Dmvi","./en-au.js":"Dmvi","./en-ca":"OIYi","./en-ca.js":"OIYi","./en-gb":"Oaa7","./en-gb.js":"Oaa7","./en-ie":"4dOw","./en-ie.js":"4dOw","./en-il":"czMo","./en-il.js":"czMo","./en-nz":"b1Dy","./en-nz.js":"b1Dy","./eo":"Zduo","./eo.js":"Zduo","./es":"iYuL","./es-do":"CjzT","./es-do.js":"CjzT","./es-us":"Vclq","./es-us.js":"Vclq","./es.js":"iYuL","./et":"7BjC","./et.js":"7BjC","./eu":"D/JM","./eu.js":"D/JM","./fa":"jfSC","./fa.js":"jfSC","./fi":"gekB","./fi.js":"gekB","./fo":"ByF4","./fo.js":"ByF4","./fr":"nyYc","./fr-ca":"2fjn","./fr-ca.js":"2fjn","./fr-ch":"Dkky","./fr-ch.js":"Dkky","./fr.js":"nyYc","./fy":"cRix","./fy.js":"cRix","./ga":"USCx","./ga.js":"USCx","./gd":"9rRi","./gd.js":"9rRi","./gl":"iEDd","./gl.js":"iEDd","./gom-latn":"DKr+","./gom-latn.js":"DKr+","./gu":"4MV3","./gu.js":"4MV3","./he":"x6pH","./he.js":"x6pH","./hi":"3E1r","./hi.js":"3E1r","./hr":"S6ln","./hr.js":"S6ln","./hu":"WxRl","./hu.js":"WxRl","./hy-am":"1rYy","./hy-am.js":"1rYy","./id":"UDhR","./id.js":"UDhR","./is":"BVg3","./is.js":"BVg3","./it":"bpih","./it-ch":"bxKX","./it-ch.js":"bxKX","./it.js":"bpih","./ja":"B55N","./ja.js":"B55N","./jv":"tUCv","./jv.js":"tUCv","./ka":"IBtZ","./ka.js":"IBtZ","./kk":"bXm7","./kk.js":"bXm7","./km":"6B0Y","./km.js":"6B0Y","./kn":"PpIw","./kn.js":"PpIw","./ko":"Ivi+","./ko.js":"Ivi+","./ku":"JCF/","./ku.js":"JCF/","./ky":"lgnt","./ky.js":"lgnt","./lb":"RAwQ","./lb.js":"RAwQ","./lo":"sp3z","./lo.js":"sp3z","./lt":"JvlW","./lt.js":"JvlW","./lv":"uXwI","./lv.js":"uXwI","./me":"KTz0","./me.js":"KTz0","./mi":"aIsn","./mi.js":"aIsn","./mk":"aQkU","./mk.js":"aQkU","./ml":"AvvY","./ml.js":"AvvY","./mn":"lYtQ","./mn.js":"lYtQ","./mr":"Ob0Z","./mr.js":"Ob0Z","./ms":"6+QB","./ms-my":"ZAMP","./ms-my.js":"ZAMP","./ms.js":"6+QB","./mt":"G0Uy","./mt.js":"G0Uy","./my":"honF","./my.js":"honF","./nb":"bOMt","./nb.js":"bOMt","./ne":"OjkT","./ne.js":"OjkT","./nl":"+s0g","./nl-be":"2ykv","./nl-be.js":"2ykv","./nl.js":"+s0g","./nn":"uEye","./nn.js":"uEye","./pa-in":"8/+R","./pa-in.js":"8/+R","./pl":"jVdC","./pl.js":"jVdC","./pt":"8mBD","./pt-br":"0tRk","./pt-br.js":"0tRk","./pt.js":"8mBD","./ro":"lyxo","./ro.js":"lyxo","./ru":"lXzo","./ru.js":"lXzo","./sd":"Z4QM","./sd.js":"Z4QM","./se":"//9w","./se.js":"//9w","./si":"7aV9","./si.js":"7aV9","./sk":"e+ae","./sk.js":"e+ae","./sl":"gVVK","./sl.js":"gVVK","./sq":"yPMs","./sq.js":"yPMs","./sr":"zx6S","./sr-cyrl":"E+lV","./sr-cyrl.js":"E+lV","./sr.js":"zx6S","./ss":"Ur1D","./ss.js":"Ur1D","./sv":"X709","./sv.js":"X709","./sw":"dNwA","./sw.js":"dNwA","./ta":"PeUW","./ta.js":"PeUW","./te":"XLvN","./te.js":"XLvN","./tet":"V2x9","./tet.js":"V2x9","./tg":"Oxv6","./tg.js":"Oxv6","./th":"EOgW","./th.js":"EOgW","./tl-ph":"Dzi0","./tl-ph.js":"Dzi0","./tlh":"z3Vd","./tlh.js":"z3Vd","./tr":"DoHr","./tr.js":"DoHr","./tzl":"z1FC","./tzl.js":"z1FC","./tzm":"wQk9","./tzm-latn":"tT3J","./tzm-latn.js":"tT3J","./tzm.js":"wQk9","./ug-cn":"YRex","./ug-cn.js":"YRex","./uk":"raLr","./uk.js":"raLr","./ur":"UpQW","./ur.js":"UpQW","./uz":"Loxo","./uz-latn":"AQ68","./uz-latn.js":"AQ68","./uz.js":"Loxo","./vi":"KSF8","./vi.js":"KSF8","./x-pseudo":"/X5v","./x-pseudo.js":"/X5v","./yo":"fzPg","./yo.js":"fzPg","./zh-cn":"XDpg","./zh-cn.js":"XDpg","./zh-hk":"SatO","./zh-hk.js":"SatO","./zh-tw":"kOpN","./zh-tw.js":"kOpN"};function o(e){var t=a(e);return i(t)}function a(e){var t=n[e];if(!(t+1)){var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}return t}o.keys=function(){return Object.keys(n)},o.resolve=a,e.exports=o,o.id="RnhZ"},Rqdy:function(e,t,i){var n=i("Y7ZC");n(n.S+n.F*!i("jmDH"),"Object",{defineProperty:i("2faE").f})},RxXT:function(e,t,i){"use strict";i.r(t);var n,o=i("YEIV"),a=i.n(o),s=i("7Qib"),r=(n={name:"",props:["modelData"]},a()(n,"props",{modelData:{type:Object,default:function(){return{}}},angle:{type:Number,default:function(){return 0}}}),a()(n,"data",function(){return{diagram:null}}),a()(n,"computed",{}),a()(n,"watch",{modelData:function(e){this.updateModel(e)}}),a()(n,"mounted",function(){var e=this;window.go?this.init():Object(s.d)(window.baseURL+"/dist/lib/go-js/go-debug.js").then(function(){e.init()})}),a()(n,"methods",{init:function(){var e=window.go.GraphObject.make;console.log(window.go);var t=this,i=e(window.go.Diagram,this.$el,{initialContentAlignment:window.go.Spot.Center,allowZoom:!0,isReadOnly:!0,layout:e(window.go.TreeLayout,{angle:this.angle,arrangement:window.go.TreeLayout.ArrangementHorizontal}),"undoManager.isEnabled":!0,"toolManager.mouseWheelBehavior":window.go.ToolManager.WheelZoom,ModelChanged:function(e){t.$emit("model-changed",e)},ChangedSelection:function(e){t.$emit("changed-selection",e)}});i.nodeTemplate=e(window.go.Node,"Auto",e(window.go.Shape,"RoundedRectangle",{fill:"white",strokeWidth:0,portId:"",fromLinkable:!1,toLinkable:!1,cursor:"pointer"},new window.go.Binding("fill","color")),e(window.go.Panel,"Table",{maxSize:new window.go.Size(230,999),margin:new window.go.Margin(3,3,0,3),defaultAlignment:window.go.Spot.Left},e(window.go.RowColumnDefinition,{column:5,width:4}),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),row:0,column:0,stroke:"#ff6600",font:"bold 10pt sans-serif"},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","title").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:1,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","to")),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:2,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","dealtype").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:3,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","PreFunName").makeTwoWay()),e(window.go.TextBlock,{margin:new window.go.Margin(3,0,0,6),editable:!0,row:4,column:0},new window.go.Binding("stroke","stroke"),new window.go.Binding("text","content").makeTwoWay()))),i.linkTemplate=e(window.go.Link,{curve:window.go.Link.Bezier,adjusting:window.go.Link.Stretch,relinkableFrom:!0,relinkableTo:!0,reshapable:!0},e(window.go.Shape),e(window.go.Shape,{toArrow:"OpenTriangle"})),this.diagram=i,this.updateModel(this.modelData)},model:function(){return this.diagram.model},updateModel:function(e){if(window.go)if(e instanceof window.go.Model)this.diagram.model=e;else{var t=new window.go.GraphLinksModel;if(e)for(var i in e)t[i]=e[i];this.diagram.model=t}},updateDiagramFromData:function(){this.diagram.startTransaction(),this.diagram.updateAllRelationshipsFromData(),this.diagram.updateAllTargetBindings(),this.diagram.commitTransaction("updated")}}),n),l=(i("f5R0"),i("KHd+")),d=Object(l.a)(r,function(){var e=this.$createElement;return(this._self._c||e)("div")},[],!1,null,null,null);d.options.__file="GoDiagramTreeBox.vue";t.default=d.exports},SEkw:function(e,t,i){e.exports={default:i("RU/L"),__esModule:!0}},"Ts+a":function(e,t,i){"use strict";i.r(t);var n=i("P2sY"),o=i.n(n),a=i("QbLZ"),s=i.n(a),r=i("L2JU"),l=i("X4fA"),d={name:"CModelShowImages",props:{type:{type:String,default:function(){return"flowlog"}},filelistlog:{type:Array,default:function(){return[]}},files:{type:Array,default:function(){return[]}}},data:function(){return{image_preview_model:!1,preview_file:null,preview_rotate:0}},computed:s()({},Object(r.e)({userid:function(e){return e.user.__realobj.id}}),{preview_style:function(){return{transform:"rotate("+this.preview_rotate+"deg)"}}}),mounted:function(){},methods:{rotateImage:function(){this.preview_rotate=(this.preview_rotate+90)%360},showimage:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=null;this.preview_file=null;var a=[];"flowlog"==this.type?(i&&(this.filelistlog=i),a=this.filelistlog):(i&&(this.files=i),a=[{files:this.files}]);var s=Object(l.b)(this.userid);a.forEach(function(i){i.files.forEach(function(a){a.fileid==e?(t.preview_file=o()({},a),t.preview_file.funname=i.funname?i.funname:null,t.preview_file.url=window.baseURL+"/file/oa/"+a.fileid+"/"+encodeURI(a.name)+"?"+s,t.preview_file.previous_fileid=n,t.preview_rotate=0):"jpeg"!=a.formats&&"jpg"!=a.formats&&"png"!=a.formats||(t.preview_file?t.preview_file.next_fileid||(t.preview_file.next_fileid=a.fileid):n=a.fileid)})}),this.image_preview_model=!0}}},c=(i("CpCM"),i("KHd+")),u=Object(c.a)(d,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{attrs:{fullscreen:!0,title:e.preview_file?e.preview_file.name:"",visible:e.image_preview_model,"append-to-body":""},on:{"update:visible":function(t){e.image_preview_model=t}}},[e.preview_file?i("div",[i("div",[i("div",{staticStyle:{float:"left"}},[e.preview_file.funname?i("div",[e._v("来自流程："+e._s(e.preview_file.funname))]):e._e(),e._v("\n          文件信息："+e._s(e.preview_file.name)),i("br"),e._v("\n          上传时间："+e._s(e.preview_file.created_at)),i("br"),e._v("\n          文件大小："+e._s(e.preview_file.size)),i("br")]),e._v(" "),i("div",{staticStyle:{float:"left",padding:"10px"}},[i("div",[i("el-button",{attrs:{disabled:!e.preview_file.previous_fileid,size:"mini",icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}}),e._v(" "),i("el-button",{attrs:{disabled:!e.preview_file.next_fileid,size:"mini"},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[i("i",{staticClass:"el-icon-arrow-right el-icon--right"})]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:e.rotateImage}},[i("i",{staticClass:"el-icon-refresh-right"})])],1)]),e._v(" "),i("div",{staticClass:"clear"})]),e._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("div",{staticStyle:{"min-height":"150px"}},[i("el-image",{staticStyle:{padding:"10px"},style:e.preview_style,attrs:{src:e.preview_file.url}},[i("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v("\n              加载中"),i("span",{staticClass:"dot"},[e._v("...")])]),e._v(" "),i("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[i("i",{staticClass:"el-icon-picture-outline"}),e._v("图片加载失败\n          ")])])],1),e._v(" "),i("div",{staticStyle:{position:"fixed",bottom:"10px",width:"100%"}},[i("el-button",{attrs:{disabled:!e.preview_file.previous_fileid,size:"small",type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){e.showimage(e.preview_file.previous_fileid)}}},[e._v("上一张图片")]),e._v(" "),i("el-button",{attrs:{disabled:!e.preview_file.next_fileid,size:"small",type:"primary"},on:{click:function(t){e.showimage(e.preview_file.next_fileid)}}},[e._v("下一张图片"),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})]),e._v(" "),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rotateImage}},[e._v("旋转"),i("i",{staticClass:"el-icon-refresh-right el-icon--left"})])],1)])]):e._e()])],1)},[],!1,null,"099bd1da",null);u.options.__file="CModalShowImages.vue";t.default=u.exports},W2Fo:function(e,t,i){!function(e){"use strict";!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i=" .timeline { padding: 0; position: relative; list-style: none; font-family: PingFangSC-light, Avenir, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif; -webkit-font-smoothing: antialiased; margin: 10px 20px; } .timeline:after { position: absolute; content: ''; left: 0; top: 0; width: 1px; height: 100%; background-color: var(--timelineTheme); } .timeline-item { position: relative; margin: 1.5em 0 0 28px; padding-bottom: 1.5em; border-bottom: 1px dotted var(--timelineTheme); } .timeline-item:last-child { border-bottom: none; } .timeline-circle { position: absolute; top: .28em; left: -34px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--timelineTheme); background-color: var(--timelineTheme); z-index: 1; box-sizing: content-box; } .timeline-circle.hollow { background-color: var(--timelineBg); } .timeline-title { position: relative; display: inline-block; /** * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素） */ cursor: crosshair; margin: -.15em 0 15px 28px } .timeline-title:not(:first-child) { margin-top: 28px; } .timeline-title-circle { left: -36px; top: .15em; width: 16px; height: 16px; } .timeline-others { width: 40px; height: auto; top: .2em; left: -48px; line-height: 1; padding: 2px 0; text-align: center; border: none; background-color: var(--timelineBg); } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}}();var t={render:function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{ref:"timeline",staticClass:"timeline"},[this._t("default")],2)},staticRenderFns:[],name:"Timeline",props:{timelineTheme:{type:String,default:"#dbdde0"},timelineBg:{type:String,default:"#fff"}},mounted:function(){var e=this.$refs.timeline;e.style.setProperty("--timelineTheme",this.timelineTheme),e.style.setProperty("--timelineBg",this.timelineBg)}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var i={name:"TimelineItemBase",props:{bgColor:{type:String,default:""},lineColor:{type:String,default:""},hollow:{type:Boolean,default:!1},fontColor:{type:String,default:"#37414a"}},data:function(){return{slotOthers:!1}},computed:{circleStyle:function(){if(this.bgColor||this.lineColor||this.hollow){var e={};return this.bgColor&&(e={"border-color":this.bgColor,"background-color":this.bgColor}),this.lineColor&&(e=Object.assign({},e,{"border-color":this.lineColor})),e}},itemStyle:function(){return{color:this.fontColor}},slotClass:function(){var e="";return this.slotOthers?e="timeline-others":this.hollow&&(e="hollow"),e}},mounted:function(){this.slotOthers=!!this.$refs.others.innerHTML}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-item",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-title",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle timeline-title-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};"undefined"!=typeof window&&window.Vue&&(window.Vue.component(t.name,t),window.Vue.component(n.name,n),window.Vue.component(o.name,o)),e.Timeline=t,e.TimelineItem=n,e.TimelineTitle=o,Object.defineProperty(e,"__esModule",{value:!0})}(t)},WRrL:function(e,t,i){"use strict";i.r(t);var n=i("QbLZ"),o=i.n(n),a=i("L2JU"),s=i("X4fA"),r=i("W2Fo"),l=i("Ts+a"),d=i("k48p"),c={name:"Cflowlog",components:{Timeline:r.Timeline,TimelineItem:r.TimelineItem,TimelineTitle:r.TimelineTitle,ModelShowImages:l.default},props:{filelistlog:{type:Array,default:function(){return[]}}},computed:o()({},Object(a.e)({userid:function(e){return e.user.__realobj.id}})),data:function(){return{}},activated:function(){},mounted:function(){},methods:{filedown:function(e){window.open(window.baseURL+"/file/oa/"+e.fileid+"/"+encodeURI(e.name)+"?"+Object(s.b)(this.userid),this.isPc?"_blank":"_self")},showimage:function(e){this.$refs.showimages.showimage(e)},friendlytimejs:function(e){return Object(d.a)(e,new Date)}}},u=(i("mugL"),i("KHd+")),f=Object(u.a)(c,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.filelistlog?i("div",{staticClass:"log"},[i("model-show-images",{ref:"showimages",attrs:{filelistlog:e.filelistlog,type:"flowlog"}}),e._v(" "),i("timeline",e._l(e.filelistlog,function(t){return i("timeline-item",{key:t._id,attrs:{color:"green"}},[i("div",{staticClass:"fz13"},[i("v-icon",{attrs:{name:"person"}}),e._v(" "),i("span",[e._v(e._s(t.creater))]),e._v(" "),i("span",{staticClass:"funname"},[e._v(e._s(t.funname))]),e._v(" "),i("span",{staticClass:"fz12",staticStyle:{"margin-right":"5px"}},[e._v(e._s(e.friendlytimejs(t.created_at)))])],1),e._v(" "),i("div",e._l(t.files,function(t,n){return i("div",{key:n,staticClass:"fz12"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),"jpeg"==t.formats||"jpg"==t.formats||"png"==t.formats?i("i",{staticClass:"el-icon-picture-outline mg-r5 image_file_preview",staticStyle:{cursor:"pointer"},on:{click:function(i){e.showimage(t.fileid,e.filelistlog)}}}):e._e(),e._v(" "),i("i",{staticClass:"el-icon-download filedown mg-r5",on:{click:function(i){e.filedown(t)}}})])}))])}))],1):e._e()])},[],!1,null,"557eec42",null);f.options.__file="CFlowFileLog.vue";t.default=f.exports},"X+cG":function(e,t,i){"use strict";var n=i("0mAM");i.n(n).a},XE86:function(e,t,i){},YCPF:function(e,t,i){"use strict";i.r(t);var n=i("GQeE"),o=i.n(n),a=i("gDS+"),s=i.n(a),r=i("EJiy"),l=i.n(r),d=i("lYLF"),c=i("W2Fo"),u=i("USVN"),f=i("k48p"),m=i("Qtz6"),g=i("RxXT"),h=i("Fnmp"),p=i("WRrL"),w=i("i7/w"),v=i.n(w),_=i("wd/R"),b=i.n(_),y=i("AmLy"),j=function e(t,i){if(!(this instanceof e))return new e(t,i);this.options=this.extend({noPrint:".no-print"},i),"string"==typeof t?this.dom=document.querySelector(t):(this.isDOM(t),this.dom=this.isDOM(t)?t:t.$el),this.init()};j.prototype={init:function(){var e=this.getStyle()+this.getHtml();this.writeIframe(e)},extend:function(e,t){for(var i in t)e[i]=t[i];return e},getStyle:function(){for(var e="",t=document.querySelectorAll("style,link"),i=0;i<t.length;i++)e+=t[i].outerHTML;return e+="<style>"+(this.options.noPrint?this.options.noPrint:".no-print")+"{display:none;}</style>"},getHtml:function(){for(var e=document.querySelectorAll("input"),t=document.querySelectorAll("textarea"),i=document.querySelectorAll("select"),n=0;n<e.length;n++)"checkbox"==e[n].type||"radio"==e[n].type?1==e[n].checked?e[n].setAttribute("checked","checked"):e[n].removeAttribute("checked"):(e[n].type,e[n].setAttribute("value",e[n].value));for(var o=0;o<t.length;o++)"textarea"==t[o].type&&(t[o].innerHTML=t[o].value);for(var a=0;a<i.length;a++)if("select-one"==i[a].type){var s=i[a].children;for(var r in s)"OPTION"==s[r].tagName&&(1==s[r].selected?s[r].setAttribute("selected","selected"):s[r].removeAttribute("selected"))}return this.dom.outerHTML},writeIframe:function(e){var t,i,n=document.createElement("iframe"),o=document.body.appendChild(n);n.id="myIframe",n.setAttribute("style","position:absolute;width:0;height:0;top:-10px;left:-10px;"),t=o.contentWindow||o.contentDocument,(i=o.contentDocument||o.contentWindow.document).open(),i.write(e),i.close();var a=this;n.onload=function(){a.toPrint(t),setTimeout(function(){},100)}},toPrint:function(e){try{setTimeout(function(){e.focus();try{e.document.execCommand("print",!1,null)||e.print()}catch(t){e.print()}e.close()},10)}catch(e){console.log("err",e)}},isDOM:"object"===("undefined"==typeof HTMLElement?"undefined":l()(HTMLElement))?function(e){return e instanceof HTMLElement}:function(e){return e&&"object"===(void 0===e?"undefined":l()(e))&&1===e.nodeType&&"string"==typeof e.nodeName}};var k={install:function(e,t){e.prototype.$print=j}},x=k;v.a.use(x);var D={name:"Cflowdetail",components:{diagram:m.default,diagrambox:g.default,FlowLog:h.default,Timeline:c.Timeline,TimelineItem:c.TimelineItem,TimelineTitle:c.TimelineTitle,FlowFileLog:p.default,Gantt:y.default},props:{flowOiId:{type:String,default:function(){return""}},nowfunid:{type:String},isAdmin:{type:Boolean,default:function(){return!1}}},data:function(){return{error:null,title:null,loading:!1,flowOi:null,designer:null,log_msg_list_has_load:!1,log_msg_list_has_loading:!1,logList:[],msgList:[],remoteFuncs:{},widgetModels:{},widgetForm:null,activeName:"表单",msgsdiagramDataTest:{nodeDataArray:[{key:1,text:"Alpha",color:"lightblue",loc:"355 85"},{key:2,text:"Beta",color:"orange",loc:"355 85"},{key:3,text:"Gamma",color:"lightgreen",loc:"355 85"},{key:4,text:"Delta",color:"pink",loc:"355 85"}],linkDataArray:[{from:1,to:2},{from:1,to:3},{from:3,to:4}]},diagramData:{nodeDataArray:[],linkDataArray:[]},msgsdiagramData:{nodeDataArray:[],linkDataArray:[]},ganttData:null}},watch:{activeName:function(){console.log(this.activeName),["日志","消息实例图","甘特图"].includes(this.activeName)&&this.whenlog_msg_change()}},mounted:function(){this.getinfo(this.flowOiId)},methods:{whenlog_msg_change:function(){var e=this;this.log_msg_list_has_load||this.log_msg_list_has_loading||(this.log_msg_list_has_loading=!0,Object(d.n)({flowOi_id:this.flowOiId}).then(function(t){var i=t.data;if(e.log_msg_list_has_loading=!1,e.log_msg_list_has_load=!0,i.success){var n=i.data,o=n.logList,a=n.msgList;e.logList=o,e.msgList=a,e.flowOi.msgList=a,e.flowOi.logList=o,e.logList.forEach(function(t){t.msgobj=null,t.flowmsgid&&e.msgList.forEach(function(e){t.flowmsgid==e._id&&(t.msgobj=e)})}),e.msgsdiagramData=e.creatMsgDiagramData(e.flowOi.msgList,e.flowOi.logList,e.designer.funlist),e.ganttData=e.creatGanttData(e.flowOi.msgList,e.designer.funlist)}else e.$message.error(i.msg)}))},friendlytimejs:function(e){return Object(f.a)(e,new Date)},dateCount:function(e){if(!e)return"";var t=e/24/60/60,i=Math.floor(t),n=(e-24*i*60*60)/60/60,o=Math.floor(n),a=(e-24*i*60*60-60*o*60)/60,s=Math.floor(a),r="";return i&&(r+=Math.abs(i)+"天"),o&&(r+=o+"小时"),s&&(r+=s+"分钟"),r},isDingTalk:function(){return-1!=window.navigator.userAgent.toLowerCase().indexOf("dingtalk")},print:function(){var e=this;this.isDingTalk()?this.$confirm("当前位于钉钉浏览器，由于钉钉暂不支持打印，是否前往浏览器打印?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){window.open(window.location.href,"_blank")}).catch(function(){e.$message({type:"info",message:"程序猿已经尽力了😢"})}):this.$print(this.$refs.printData)},creatGanttData:function(e,t){var i=this,n=function(e,n){var a=0;t.forEach(function(t){t.id==e.NowFunid&&(a=t.timeexpired)}),o.push({start:e.created_at,end:b()(e.created_at).add(a,"seconds").format("YYYY-MM-DD HH:mm:ss"),name:"[计划"+i.dateCount(a)+"]"+e.NowFunName+"[ "+e.creater+" ]["+Object(u.g)(e.dealtype)+"]",id:"_"+e._id,progress:100,isplan:!0,dependencies:"_"+n});var s=e.finished_at;s&&"object"==(void 0===s?"undefined":l()(s))&&(s=b()(s.$date.$numberLong,"x").format("YYYY-MM-DD HH:mm:ss"));var r=0;s&&(console.log("end",s),r=b()(s).diff(b()(e.created_at))/1e3);var d="fill:#67c23a";a>0&&r>a&&(d="fill:#ec0352"),1==e.status?o.push({start:e.created_at,end:b()().format("YYYY-MM-DD HH:mm:ss"),isplan:!1,name:"[未完成][实际]                                "+e.NowFunName+" [ "+e.creater+"]["+Object(u.g)(e.dealtype)+"]",id:e._id,style:d,progress:0,isfinish:!1}):o.push({start:e.created_at,end:s,isplan:!1,name:"[实际"+i.dateCount(r)+"]\n                                "+e.NowFunName+" [ "+e.creater+"]["+Object(u.g)(e.dealtype)+"]",id:e._id,style:d,progress:e.finished_at?100:0,isfinish:!!e.finished_at})},o=[];return e.forEach(function(t){t.PreMsgId||(o.push({start:t.created_at,end:t.created_at,name:"[开始节点]"+t.NowFunName+"["+t.creater+"]",id:"_"+t._id,isplan:!0,progress:100}),o.push({start:t.created_at,end:t.created_at,name:"[开始节点]"+t.NowFunName+"["+t.creater+"]",id:t._id,isplan:!1,progress:100,isfinish:!0}),function t(i){e.forEach(function(e){console.log("msg",e),1!=e.status&&3!=e.status||"message"!=e.dealtype&&(e.PreMsgIds?e.PreMsgIds.some(function(e){return e==i})&&(n(e,i),t(e._id)):e.PreMsgId==i&&(n(e,i),t(e._id)))})}(t._id))}),o.forEach(function(e){e.end&&"object"==l()(e.end)?e.end=b()(e.end.$date.$numberLong,"x").format("YYYY-MM-DD HH:mm:ss"):e.end||(e.end=e.start)}),console.log(o),o},creatMsgDiagramData:function(e,t,i){var n=function(e){var t=[];return e.forEach(function(e){t.push(e.n)}),0==t.length?"":"["+t.join("|")+"]"},o=function(e){var t="无";e.log&&(t="点击<"+e.log.button+">");var i="",o="#515a6e";switch(e.status){case 1:i="等待处理",o="#ff9900";break;case 2:i="取消",o="#a7a7a7";break;case 3:case 4:i="结束",o="#61afff";break;case 5:case 6:i="";break;case 7:i="结束",o="#61afff";break;case 8:i="撤回后取消",o="#a7a7a7"}i&&(i="[状态:"+i+"]");var a="";"message"==e.dealtype&&(a="["+(0==e.hasread?"未读":"已读")+"]");var s="";return 100==e.level&&(s="[紧急]"),{key:e._id,title:i+e.NowFunName+a+s,PreFunName:"上一节点："+e.PreFunName,content:"处理内容："+t,dealtype:"处理方式："+Object(u.g)(e.dealtype),to:"处理人："+(e.todepts?n(e.todepts):"")+e.toer,color:o,stroke:"white"}},a=function(e,t){e.some(function(e){return e.key==t.key})||e.push(t)},s=[],r=[];return e.forEach(function(t){t.PreMsgId||(s.push({key:t._id,title:"[开始节点]"+t.NowFunName,PreFunName:"上一节点：无",content:"处理内容：无",dealtype:"处理方式：无",to:"申请人："+(t.todepts?n(t.todepts):"")+t.creater,color:"#67c23a",stroke:"white"}),function t(i){e.forEach(function(e){e.PreMsgIds?e.PreMsgIds.some(function(e){return e==i})&&(r.push({from:i,to:e._id}),a(s,o(e)),t(e._id)):e.PreMsgId==i&&(r.push({from:i,to:e._id}),a(s,o(e)),t(e._id))})}(t._id))}),{nodeDataArray:s,linkDataArray:r}},tran_dealtype:function(e){return Object(u.g)(e)},creatdiag:function(e){var t=Object(u.c)(this.funlist,this.nowfunid),i=t.linkDataArray,n=t.nodeDataArray;this.diagramData={nodeDataArray:n,linkDataArray:i}},initsuggests:function(e,t){e.forEach(function(e){for(var i=0;i<t.length;i++){var n=t[i];if(n.id==e.funid){e.funname=n.name;break}}})},getinfo:function(e){var t=this;this.modalstatu=!0,this.successShow=!1,this.title="加载中...",this.loading=!0,Object(d.m)({flowOi_id:e}).then(function(e){var i=e.data;if(t.loading=!1,i.success){if(!i.data)return void(t.error="没有查询到对应的流程");t.flowOi=i.data;var n=t.flowOi.designer;t.flowOi.suggests&&t.initsuggests(t.flowOi.suggests,n.funlist),t.designer=n,t.diagramData=Object(u.c)(t.flowOi.designer.funlist,t.flowOi.designer.layoutset,t.nowfunid),t.widgetForm=t.initFromset(t.designer,t.flowOi.formdata),t.isPc||(t.widgetForm.config.labelWidth=null,t.widgetForm.config.labelPosition="top"),t.widgetModels=t.copyobject(t.flowOi.formdata)}else t.error=i.msg})},cancel:function(){this.modalstatu=!1},copyobject:function(e){return JSON.parse(s()(e))},initFromset:function(e,t){var i=this.copyobject(e.formset);return this.leave_form_item_f2(i.list,e.set.formEditLimit,t),i},leave_form_item_f2:function(e,t,i){for(var n=this,a=function(a){var s=e[a];if(s.columns)for(var r=0;r<s.columns.length;r++){var l=s.columns[r];n.leave_form_item_f2(l.list,t,i)}else{Object(u.f)(s);var d=!1;if(!n.isAdmin&&t){var c=function(i){var o=t[i];if(!o.type)return"continue";if(s.key==o.key){switch(d=!0,"table"==s.type&&(s.options.table_delete=!1,s.options.table_add=!1,s.options.table_edit=!1,s.options.tableset.forEach(function(e){var t=!1;o.son&&o.son.forEach(function(i){i.key==e.code&&(t=!0,e.required=i.required,e.limittype=i.type)}),t||(e.required=!1,e.limittype="readonly")})),o.type){case"canedit":s.options.disabled=!1,o.required?(s.options.required=!0,n.addrequiredrule(s.rules,s.name)):(s.options.required=!1,n.splicerequiredrule(s.rules));break;case"readonly":s.options.disabled=!0,s.options.required=!1,n.splicerequiredrule(s.rules);break;case"hidden":e.splice(a,1)}return"break"}};e:for(var f=0;f<t.length;f++){switch(c(f)){case"continue":continue;case"break":break e}}}d||(o()(i).some(function(e){return e==s.model})?(s.options.disabled=!0,s.options.required=!1,"table"==s.type&&(s.options.table_delete=!1,s.options.table_add=!1,s.options.table_edit=!1,s.options.tableset.forEach(function(e){e.limittype="readonly",e.required=!1})),n.splicerequiredrule(s.rules)):e.splice(a,1))}},s=e.length-1;s>=0;s--)a(s)},addrequiredrule:function(e,t){if(e){for(var i=!1,n=0;n<e.length;n++){var o=e[n];void 0!==o.required&&(i=!0,o.required=!0)}i||e.push({required:!0,message:t+"必须填写"})}},splicerequiredrule:function(e){if(e)for(var t=e.length-1;t>=0;t--){var i=e[t];void 0!==i.required&&(!0,i.required=!1)}},leave_form_item_f:function(e,t){for(var i=e.length-1;i>=0;i--){var n=e[i];if(n.columns)for(var o=0;o<n.columns.length;o++){var a=n.columns[o];this.leave_form_item_f(a.list,t)}else for(var s in t)n.options.disabled=!0,n.options.required=!1,n.rules=[]}}}},O=(i("9hly"),i("X+cG"),i("KHd+")),C=Object(O.a)(D,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"flowdetail"},[i("div",[e.error?i("el-alert",{attrs:{title:e.error,closable:!1,type:"error"}}):i("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"表单",name:"表单"}},[e.flowOi?i("div",[i("div",{ref:"printData",staticClass:"printData",attrs:{id:"printData"}},[i("el-button",{staticClass:"no-print printbtn",attrs:{size:"mini",icon:"el-icon-printer"},on:{click:e.print}},[e._v("打印")]),e._v(" "),e.flowOi.workname?i("el-alert",{staticStyle:{"margin-bottom":"10px","font-weight":"bolder"},attrs:{title:"文号："+e.flowOi.workname,closable:!1,type:"error"}}):e._e(),e._v(" "),e.flowOi.desc?i("div",[i("el-alert",{staticStyle:{"margin-bottom":"10px","font-weight":"bolder"},attrs:{title:"流程描述："+e.flowOi.desc,closable:!1,type:"success"}})],1):e._e(),e._v(" "),e.widgetForm&&e.widgetForm.list.length>0?i("div",[i("fm-generate-form",{ref:"generateForm",staticClass:"generateForm",attrs:{data:e.widgetForm,remote:e.remoteFuncs,value:e.widgetModels}})],1):e._e(),e._v(" "),i("el-form",{staticStyle:{"margin-top":"20px"},attrs:{"label-position":"top"}},[e.flowOi.suggests&&e.flowOi.suggests.length>0?i("el-form-item",{attrs:{label:"历史审批建议"}},[i("timeline",e._l(e.flowOi.suggests,function(t,n){return i("span",{key:n},[t.text?i("timeline-item",{attrs:{color:"green"}},[i("div",{staticClass:"fz12"},[i("v-icon",{attrs:{name:"person"}}),e._v(" "),t.todeptstr?i("span",[e._v("["+e._s(t.todeptstr)+"]")]):e._e(),e._v(" "),i("span",[e._v("\n                                                    "+e._s(t.user))]),e._v(" "),i("span",[e._v("于"+e._s(e.friendlytimejs(t.created_at)))]),e._v(" "),t.funname?i("span",{staticClass:"label warning"},[e._v(e._s(t.funname))]):e._e()],1),e._v(" "),i("div",[i("span",{staticStyle:{"font-weight":"bolder"}},[e._v("\n                                                    "+e._s(t.text))])])]):e._e()],1)}))],1):e._e()],1)],1),e._v(" "),e.flowOi.filelistlog&&e.flowOi.filelistlog.length>0?i("el-collapse",{attrs:{accordion:"",value:"4"}},[i("el-collapse-item",{attrs:{name:"4"}},[i("template",{slot:"title"},[e._v("\n                                文件上传日志\n                            ")]),e._v(" "),i("flow-file-log",{attrs:{filelistlog:e.flowOi.filelistlog}})],2)],1):e._e()],1):e._e()]),e._v(" "),i("el-tab-pane",{attrs:{label:"日志",name:"日志"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.log_msg_list_has_loading,expression:"log_msg_list_has_loading"}],staticStyle:{"min-height":"80px"}},[e.log_msg_list_has_load?i("div",[i("timeline",e._l(e.logList,function(t){return i("timeline-item",{key:t._id,attrs:{color:"green"}},[i("flow-log",{attrs:{log:t,designer:e.designer,"flow-obj":e.flowOi,"is-admin":e.isAdmin}})],1)}))],1):e._e()])]),e._v(" "),i("el-tab-pane",{attrs:{label:"消息实例图",name:"消息实例图"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.log_msg_list_has_loading,expression:"log_msg_list_has_loading"}],staticStyle:{"min-height":"80px"}},[e.log_msg_list_has_load?i("div",["消息实例图"==e.activeName?i("diagrambox",{ref:"diag2",staticStyle:{border:"solid 1px black",width:"100%",height:"500px"},attrs:{angle:90,"model-data":e.msgsdiagramData}}):e._e()],1):e._e()])]),e._v(" "),i("el-tab-pane",{attrs:{label:"甘特图",name:"甘特图"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.log_msg_list_has_loading,expression:"log_msg_list_has_loading"}],staticStyle:{"min-height":"80px"}},[e.log_msg_list_has_load?i("div",["甘特图"==e.activeName?i("gantt",{attrs:{tasks:e.ganttData}}):e._e()],1):e._e()])]),e._v(" "),i("el-tab-pane",{attrs:{label:"设计流程图",name:"设计流程图"}},["设计流程图"==e.activeName?i("diagram",{ref:"diag",staticStyle:{border:"solid 1px black",width:"100%",height:"500px"},attrs:{readonly:!0,angle:90,"model-data":e.diagramData}}):e._e()],1),e._v(" "),i("el-tab-pane",{attrs:{label:"设计备注",name:"设计备注"}},["设计备注"==e.activeName?i("div",[i("div",{staticClass:"remarkbox",domProps:{innerHTML:e._s(e.designer.remark)}}),e._v(" "),i("div",{staticClass:"fileList"},e._l(e.designer.fileList,function(t,n){return i("div",{key:n,staticClass:"fz12"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),i("a",{staticClass:"mg-r5",attrs:{target:"_blank",href:t.url}},[i("v-icon",{attrs:{name:"eye"}})],1)])}))]):e._e()])],1)],1)])},[],!1,null,"08ee7902",null);C.options.__file="CFlowDetail.vue";t.default=C.exports},YEIV:function(e,t,i){"use strict";t.__esModule=!0;var n=function(e){return e&&e.__esModule?e:{default:e}}(i("SEkw"));t.default=function(e,t,i){return t in e?(0,n.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},f5R0:function(e,t,i){"use strict";var n=i("XE86");i.n(n).a},hSLB:function(e,t,i){"use strict";var n=i("xTI2");i.n(n).a},mugL:function(e,t,i){"use strict";var n=i("5o4n");i.n(n).a},wFxQ:function(e,t,i){},xTI2:function(e,t,i){}}]);