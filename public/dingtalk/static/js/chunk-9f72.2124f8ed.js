(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9f72"],{"8K6i":function(i,t,n){},Tc8D:function(i,t,n){"use strict";n.r(t);var o=n("lYLF"),e={name:"Cmodaldealer",components:{FlowDetail:n("YCPF").default},data:function(){return{loading:!1,error:null,modalstatu:!1,title:null,successShow:!1,tabname:"flow.dealer",flowmsgid:null,flowOi_id:null,nowfunid:null,showMessageBox:!1}},watch:{},mounted:function(){var i=this;console.log("query",this.$route.query);var t=this.$route.query;t.type&&Object(o.v)({msg_id:t.msgid}).then(function(t){var n=t.data;i.showMessageBox=1!=n.data&&null!==n.data}),this.loadmodal(this.$route.query)},methods:{setread:function(){var i=this;this.loading=!0,Object(o.C)({msgid:this.flowmsgid}).then(function(t){var n=t.data;i.loading=!1,n.success&&(i.showMessageBox=!1)})},cancelSuccess:function(){this.modalstatu=!1},cancel:function(){this.modalstatu=!1},loadmodal:function(i){this.flowOi_id=i.flowlistid?i.flowlistid:null,this.flowmsgid=i.msgid?i.msgid:null,this.nowfunid=i.nowfunid?i.nowfunid:null}}},s=(n("vj2D"),n("KHd+")),l=Object(s.a)(e,function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticStyle:{height:"100%"}},[!i.successShow&&i.flowOi_id?n("div",{staticStyle:{margin:"10px 10px 50px"}},[n("flow-detail",{attrs:{nowfunid:i.nowfunid,"flow-oi-id":i.flowOi_id},on:{"update:nowfunid":function(t){i.nowfunid=t},"update:flowOiId":function(t){i.flowOi_id=t}}})],1):i._e(),i._v(" "),i.showMessageBox?n("div",{staticClass:"showMessageBox"},[n("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"primary"},on:{click:i.setread}},[i._v("标记为已读")])],1):i._e()])},[],!1,null,"08905ff9",null);l.options.__file="FlowDetail.vue";t.default=l.exports},vj2D:function(i,t,n){"use strict";var o=n("8K6i");n.n(o).a}}]);