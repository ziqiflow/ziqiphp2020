(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-29a4"],{Q4YA:function(e,t,n){},"VW/F":function(e,t,n){"use strict";n.r(t);var o=n("bDny"),i=n.n(o),a=(n("LvDl"),{name:"Deptmanage",props:["url"],components:{vueFriendlyIframe:i.a},data:function(){return{wrapperHeight:null,iframedata:{src:null}}},methods:{onDocumentLoad:function(){console.log("onDocumentLoad")},onLoad:function(){console.log("onLoad")}},destroyed:function(){window.onresize=null},mounted:function(){this.url&&(this.iframedata.src=this.url),this.wrapperHeight=this.$refs.iframevue.parentElement.offsetHeight;var e=this;window.onresize=_.debounce(function(){console.log("onresize:"),e.wrapperHeight=e.$refs.iframevue.parentElement.offsetHeight},400)}}),r=(n("tIS9"),n("KHd+")),s=Object(r.a)(a,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"iframevue",staticClass:"iframevue",style:{height:this.wrapperHeight+"px"}},[this.iframedata.src?t("vue-friendly-iframe",{staticStyle:{height:"100%"},attrs:{src:this.iframedata.src},on:{load:this.onLoad,"document-load":this.onDocumentLoad}}):this._e()],1)},[],!1,null,null,null);s.options.__file="iframebox.vue";t.default=s.exports},tIS9:function(e,t,n){"use strict";var o=n("Q4YA");n.n(o).a}}]);