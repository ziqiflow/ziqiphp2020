(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-71f7"],{"E/Aj":function(e,t,l){"use strict";l.r(t);var a=l("m1cH"),n=l.n(a),s=l("U/5H"),r=l.n(s),c={name:"DragSelect",props:{value:{type:Array,required:!0}},computed:{selectVal:{get:function(){return[].concat(n()(this.value))},set:function(e){this.$emit("input",[].concat(n()(e)))}}},mounted:function(){this.setSort()},methods:{setSort:function(){var e=this,t=this.$refs.dragSelect.$el.querySelectorAll(".el-select__tags > span")[0];this.sortable=r.a.create(t,{ghostClass:"sortable-ghost",setData:function(e){e.setData("Text","")},onEnd:function(t){var l=e.value.splice(t.oldIndex,1)[0];e.value.splice(t.newIndex,0,l)}})}}},o=(l("iKVo"),l("KHd+")),u=Object(o.a)(c,function(){var e=this,t=e.$createElement;return(e._self._c||t)("el-select",e._g(e._b({ref:"dragSelect",staticClass:"drag-select",attrs:{multiple:""},model:{value:e.selectVal,callback:function(t){e.selectVal=t},expression:"selectVal"}},"el-select",e.$attrs,!1),e.$listeners),[e._t("default")],2)},[],!1,null,"058f7b2e",null);u.options.__file="index.vue";var i={name:"DragSelectDemo",components:{ElDragSelect:u.exports},data:function(){return{value:["Apple","Banana","Orange"],options:[{value:"Apple",label:"Apple"},{value:"Banana",label:"Banana"},{value:"Orange",label:"Orange"},{value:"Pear",label:"Pear"},{value:"Strawberry",label:"Strawberry"}]}}},p=Object(o.a)(i,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"components-container"},[l("el-drag-select",{staticStyle:{width:"500px"},attrs:{multiple:"",placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),l("div",{staticStyle:{"margin-top":"30px"}},e._l(e.value,function(t){return l("el-tag",{key:t,staticStyle:{"margin-right":"15px"}},[e._v(e._s(t))])}))],1)},[],!1,null,null,null);p.options.__file="dragSelect.vue";t.default=p.exports},f6Kz:function(e,t,l){},iKVo:function(e,t,l){"use strict";var a=l("f6Kz");l.n(a).a}}]);