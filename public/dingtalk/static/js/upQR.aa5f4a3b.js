(window.webpackJsonp=window.webpackJsonp||[]).push([["upQR"],{upQR:function(e,n,o){"use strict";o.r(n);o("L2JU");var t=o("tumI"),c=(o("3EzZ"),{name:"ChoseContactModal",components:{ChoseContact:t.default},props:{chosed:{type:Array,default:function(){return[]}}},data:function(){return{modal1:!1}},mounted:function(){},methods:{ok:function(){this.$Message.info("Clicked ok")},cancel:function(){this.$Message.info("Clicked cancel")}}}),a=o("KHd+"),s=Object(a.a)(c,function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("span",{on:{click:function(n){e.modal1=!0}}},[0==e.chosed.length?o("a",[e._v("当前未选中任何角色或人员，点击选择")]):e._e(),e._v(" "),e._l(e.chosed,function(n){return o("a",{key:n.id},["role"==n.type?o("span",[e._v("[角色]"+e._s(n.name)+";")]):e._e(),e._v(" "),"user"==n.type?o("span",[e._v("[个人]"+e._s(n.name)+";")]):e._e()])})],2),e._v(" "),o("Modal",{attrs:{title:"选择人员"},on:{"on-ok":e.ok,"on-cancel":e.cancel},model:{value:e.modal1,callback:function(n){e.modal1=n},expression:"modal1"}},[o("chose-contact",{attrs:{chosed:e.chosed}})],1)],1)},[],!1,null,null,null);s.options.__file="chose-contact-modal.vue";n.default=s.exports}}]);