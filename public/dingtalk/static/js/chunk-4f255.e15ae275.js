(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4f255","chunk-4f25"],{"89yw":function(e,t,i){"use strict";var n=i("raxx");i.n(n).a},W2Fo:function(e,t,i){!function(e){"use strict";!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i=" .timeline { padding: 0; position: relative; list-style: none; font-family: PingFangSC-light, Avenir, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif; -webkit-font-smoothing: antialiased; margin: 10px 20px; } .timeline:after { position: absolute; content: ''; left: 0; top: 0; width: 1px; height: 100%; background-color: var(--timelineTheme); } .timeline-item { position: relative; margin: 1.5em 0 0 28px; padding-bottom: 1.5em; border-bottom: 1px dotted var(--timelineTheme); } .timeline-item:last-child { border-bottom: none; } .timeline-circle { position: absolute; top: .28em; left: -34px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--timelineTheme); background-color: var(--timelineTheme); z-index: 1; box-sizing: content-box; } .timeline-circle.hollow { background-color: var(--timelineBg); } .timeline-title { position: relative; display: inline-block; /** * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素） */ cursor: crosshair; margin: -.15em 0 15px 28px } .timeline-title:not(:first-child) { margin-top: 28px; } .timeline-title-circle { left: -36px; top: .15em; width: 16px; height: 16px; } .timeline-others { width: 40px; height: auto; top: .2em; left: -48px; line-height: 1; padding: 2px 0; text-align: center; border: none; background-color: var(--timelineBg); } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}}();var t={render:function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{ref:"timeline",staticClass:"timeline"},[this._t("default")],2)},staticRenderFns:[],name:"Timeline",props:{timelineTheme:{type:String,default:"#dbdde0"},timelineBg:{type:String,default:"#fff"}},mounted:function(){var e=this.$refs.timeline;e.style.setProperty("--timelineTheme",this.timelineTheme),e.style.setProperty("--timelineBg",this.timelineBg)}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var i={name:"TimelineItemBase",props:{bgColor:{type:String,default:""},lineColor:{type:String,default:""},hollow:{type:Boolean,default:!1},fontColor:{type:String,default:"#37414a"}},data:function(){return{slotOthers:!1}},computed:{circleStyle:function(){if(this.bgColor||this.lineColor||this.hollow){var e={};return this.bgColor&&(e={"border-color":this.bgColor,"background-color":this.bgColor}),this.lineColor&&(e=Object.assign({},e,{"border-color":this.lineColor})),e}},itemStyle:function(){return{color:this.fontColor}},slotClass:function(){var e="";return this.slotOthers?e="timeline-others":this.hollow&&(e="hollow"),e}},mounted:function(){this.slotOthers=!!this.$refs.others.innerHTML}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-item",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-title",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle timeline-title-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};"undefined"!=typeof window&&window.Vue&&(window.Vue.component(t.name,t),window.Vue.component(n.name,n),window.Vue.component(l.name,l)),e.Timeline=t,e.TimelineItem=n,e.TimelineTitle=l,Object.defineProperty(e,"__esModule",{value:!0})}(t)},WRrL:function(e,t,i){"use strict";i.r(t);var n=i("W2Fo"),l=i("k48p"),o={name:"Cflowlog",components:{Timeline:n.Timeline,TimelineItem:n.TimelineItem,TimelineTitle:n.TimelineTitle},props:{filelistlog:{type:Array,default:function(){return[]}}},data:function(){return{}},activated:function(){},mounted:function(){},methods:{friendlytimejs:function(e){return Object(l.a)(e,new Date)}}},s=(i("89yw"),i("KHd+")),r=Object(s.a)(o,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.filelistlog?i("div",{staticClass:"log"},[i("timeline",e._l(e.filelistlog,function(t){return i("timeline-item",{key:t._id,attrs:{color:"green"}},[i("div",{staticClass:"fz13"},[i("v-icon",{attrs:{name:"person"}}),e._v(" "),i("span",[e._v(e._s(t.creater))]),e._v(" "),i("span",{staticClass:"fz12",staticStyle:{"margin-right":"5px"}},[e._v(e._s(e.friendlytimejs(t.created_at)))])],1),e._v(" "),i("div",e._l(t.files,function(t,n){return i("div",{key:n,staticClass:"fz12"},[i("span",[e._v(e._s(t.name)+" ")]),e._v(" "),i("a",{staticClass:"mg-r5",attrs:{target:"_blank",href:"/file/oa/"+t.fileid}},[i("v-icon",{attrs:{name:"eye"}})],1)])}))])}))],1):e._e()])},[],!1,null,"68cc8abb",null);r.options.__file="CFlowFileLog.vue";t.default=r.exports},k48p:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(e,t){if(!e)return"";var i,n,l,o,s=new Date(t),r=e.split(/\s+/gi),a=function(e,t){try{return parseInt(e,10)}catch(e){return t}},c=function(e){return e<10?"0"+e:e};return r.length>=2?(i=r[0].split(/[\/\-]/gi),n=r[1].split(":"),(l=new Date).setYear(a(i[0],s.getFullYear())),l.setMonth(a(i[1],s.getMonth()+1)-1),l.setDate(a(i[2],s.getDate())),l.setHours(a(n[0],s.getHours())),l.setMinutes(a(n[1],s.getMinutes())),l.setSeconds(a(n[2],s.getSeconds())),(o=s.getTime()-l.getTime())<=6e3?"1分钟内":o<36e5?Math.floor(o/6e4)+"分钟前":o<864e5?Math.floor(o/36e5)+"小时前":o<2592e5?Math.floor(o/864e5)+"天前":s.getFullYear()!=l.getFullYear()?[c(l.getFullYear()),c(l.getMonth()+1),c(l.getDate())].join("-"):[c(l.getMonth()+1),c(l.getDate())].join("-")):""}},raxx:function(e,t,i){}}]);