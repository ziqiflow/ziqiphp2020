(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2623"],{AgE6:function(t,e,a){"use strict";var n=a("bPJ9");a.n(n).a},bPJ9:function(t,e,a){},o6J1:function(t,e,a){"use strict";a.r(e);var n=a("gDS+"),s=a.n(n),i=a("QbLZ"),l=a.n(i),o=a("529z"),c=a.n(o),r=a("L2JU"),d=(a("fHYj"),a("USVN")),p=(a("GB7V"),{name:"FormLimit",mixins:[c.a],components:{},props:{value:{type:Array,default:function(){return[]},isSync:!0},usetype:{type:String,default:"edit"}},data:function(){return{editlist:[],EditModalStatus:!1,canEditList:[],readonlyList:[],hiddenList:[],allcanedit:!1,allreadonly:!1,allhidden:!1}},watch:{sync_value:function(){this.init()}},mounted:function(){this.init()},computed:l()({},Object(r.c)(["requireDataList"]),Object(r.e)({formSet:function(t){return t.flowdesign.formSet}})),methods:{inittable:function(t,e){t||(t=[]),console.log("tableItem",Object(d.d)(this.formSet.list,e.key));var a=Object(d.d)(this.formSet.list,e.key);if(!a)return[];for(var n=a.options.tableset,s=t.length-1;s>=0;s--){for(var i=t[s],l=!1,o=0;o<n.length;o++){var c=n[o];if(c.code==i.key){l=!0,i.name=c.name;break}}l||t.splice(s,1)}return n.forEach(function(e){var a=!1;t.forEach(function(t){t.key==e.code&&(a=!0)}),a||t.push({name:e.name,key:e.code,type:null,required:!1,t:"tableItem"})}),t},init:function(){var t=this;console.log("console.log(this.requireDataList);",this.requireDataList),console.log("sync_value1",this.sync_value),this.sync_value||(this.sync_value=[]);for(var e=this.sync_value.length-1;e>=0;e--){for(var a=this.sync_value[e],n=!1,s=0;s<this.requireDataList.length;s++){var i=this.requireDataList[s];if(i.key==a.key){n=!0,a.name=i.name,a.t=i.type,"table"==a.t&&(a.son=this.inittable(a.son,i),console.log("ele.son",a.son));break}}n||this.sync_value.splice(e,1)}this.requireDataList.forEach(function(e){var a=!1;if(t.sync_value.forEach(function(t){t.key==e.key&&(a=!0)}),!a){var n={name:e.name,key:e.key,type:null,required:!1,t:e.type};"table"==e.type&&(n.son=t.inittable([],e),n.table_add=!1,n.table_edit=!1,n.table_delete=!1),t.sync_value.push(n)}}),console.log("sync_value2",this.sync_value),this.initdisplaydata()},whenRadioChange:function(){var t=0,e=0,a=0,n=this.editlist.length;this.editlist.forEach(function(s){switch(s.type){case"canedit":t++;break;case"readonly":e++;break;case"hidden":a++}"table"==s.t&&s.son&&(n+=s.son.length,s.son.forEach(function(n){switch(n.type){case"canedit":t++;break;case"readonly":e++;break;case"hidden":a++}}))}),this.allcanedit=n==t,this.allreadonly=n==e,this.allhidden=n==a},whencheckboxChange:function(t,e){var a=this;this.editlist.forEach(function(a){t?(a.type=e,"table"==a.t&&a.son&&a.son.forEach(function(a){a.type=t?e:null})):a.type=null}),setTimeout(function(){a.whenRadioChange()},100)},copyobject:function(t){return JSON.parse(s()(t))},initdisplaydata:function(){var t=this,e=[],a=[],n=[];this.sync_value&&this.sync_value.forEach(function(s){var i=t.copyobject(s);"table"==i.t&&(i.sonhidden=[],i.soncanedit=[],i.sonreadonly=[],i.son.forEach(function(t){"hidden"==t.type&&i.sonhidden.push(t),"canedit"==i.type&&i.soncanedit.push(t),"readonly"==i.type&&i.sonreadonly.push(t)})),"hidden"==i.type&&a.push(i),"canedit"==i.type&&e.push(i),"readonly"==i.type&&n.push(i)}),this.canEditList=e,this.hiddenList=a,this.readonlyList=n},tranname:function(t){for(var e=0;e<this.requireDataList.length;e++){var a=this.requireDataList[e];if(a.key==t)return a.name}return null},saveEdit:function(){this.sync_value=JSON.parse(s()(this.editlist)),this.initdisplaydata(),this.EditModalStatus=!1},editFormSet:function(){this.sync_value?this.editlist=JSON.parse(s()(this.sync_value)):this.editlist=[],this.EditModalStatus=!0}}}),h=(a("AgE6"),a("KHd+")),u=Object(h.a)(p,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cFormLimit"},[a("el-dialog",{attrs:{title:"编辑表单设置",visible:t.EditModalStatus,width:"500px"},on:{"update:visible":function(e){t.EditModalStatus=e}}},[a("el-alert",{attrs:{title:"未设置的情况下会以只读的方式显示已填写的数据",closable:!1,type:"warning"}}),t._v(" "),a("div",{staticClass:"formtabe"},[a("el-row",{staticClass:"row fz14",staticStyle:{"font-weight":"bolder"},attrs:{gutter:10}},[a("el-col",{attrs:{span:7}},[t._v("表单字段")]),t._v(" "),"read"!=t.usetype?a("el-col",{attrs:{span:5}},[a("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"canedit")}},model:{value:t.allcanedit,callback:function(e){t.allcanedit=e},expression:"allcanedit"}},[t._v("可编辑")])],1):t._e(),t._v(" "),"read"!=t.usetype?a("el-col",{attrs:{span:4}},[t._v("是否必填")]):t._e(),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"readonly")}},model:{value:t.allreadonly,callback:function(e){t.allreadonly=e},expression:"allreadonly"}},[t._v("只读")])],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-checkbox",{on:{change:function(e){return t.whencheckboxChange(e,"hidden")}},model:{value:t.allhidden,callback:function(e){t.allhidden=e},expression:"allhidden"}},[t._v("隐藏")])],1)],1),t._v(" "),t._l(t.editlist,function(e,n){return a("div",{key:n},[a("el-radio-group",{staticStyle:{"font-size":"13px",display:"block","line-height":"18px"},model:{value:e.type,callback:function(a){t.$set(e,"type",a)},expression:"item.type"}},[a("el-row",{staticClass:"row",attrs:{gutter:10}},[a("el-col",{attrs:{span:7}},["table"==e.t?a("span",[t._v("(表格)")]):t._e(),t._v(" "),"placeholderhtml"==e.t?a("span",[t._v("(文本)")]):t._e(),t._v("\n                            "+t._s(e.name))]),t._v(" "),"read"!=t.usetype?a("el-col",{attrs:{span:5}},["placeholderhtml"==e.t?a("div",[a("span",{staticStyle:{color:"white"}},[t._v("p")])]):a("el-radio",{attrs:{label:"canedit"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1):t._e(),t._v(" "),"read"!=t.usetype?a("el-col",{attrs:{span:4}},["canedit"!=e.type||"placeholderhtml"==e.t?a("div",[a("span",{staticStyle:{color:"white"}},[t._v("p")])]):a("el-checkbox",{attrs:{title:"显示"},model:{value:e.required,callback:function(a){t.$set(e,"required",a)},expression:"item.required"}})],1):t._e(),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-radio",{attrs:{label:"readonly"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-radio",{attrs:{label:"hidden"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1)],1)],1),t._v(" "),"table"==e.t?a("div",{staticStyle:{"font-size":"12px","line-height":"25px","background-color":"rgb(239, 245, 186)"}},[a("el-row",{staticClass:"row",staticStyle:{"padding-left":"20px"}},[t._v("\n                        表单属性\n\n                        "),a("el-checkbox",{model:{value:e.table_add,callback:function(a){t.$set(e,"table_add",a)},expression:"item.table_add"}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可在表单中添加行",placement:"top-start"}},[a("span",{staticClass:"fz12"},[t._v("可添加")])])],1),t._v(" "),a("el-checkbox",{staticClass:"fz12",model:{value:e.table_edit,callback:function(a){t.$set(e,"table_edit",a)},expression:"item.table_edit"}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据编辑",placement:"top-start"}},[a("span",{staticClass:"fz12"},[t._v("可编辑")])])],1),t._v(" "),a("el-checkbox",{staticClass:"fz12",model:{value:e.table_delete,callback:function(a){t.$set(e,"table_delete",a)},expression:"item.table_delete"}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据进行删除",placement:"top-start"}},[a("span",{staticClass:"fz12"},[t._v("可删除")])])],1)],1),t._v(" "),t._l(e.son,function(e,n){return a("div",{key:n},[a("el-radio-group",{staticStyle:{"font-size":"13px",display:"block","line-height":"18px"},model:{value:e.type,callback:function(a){t.$set(e,"type",a)},expression:"item2.type"}},[a("el-row",{staticClass:"row",staticStyle:{"margin-top":"0px","margin-bottom":"0px"},attrs:{gutter:10}},[a("el-col",{attrs:{span:7}},[a("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(e.name))])]),t._v(" "),"read"!=t.usetype?a("el-col",{attrs:{span:5}},[a("el-radio",{attrs:{label:"canedit"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1):t._e(),t._v(" "),"read"!=t.usetype?a("el-col",{attrs:{span:4}},["canedit"!=e.type?a("div",[a("span",{staticStyle:{color:"white"}},[t._v("p")])]):a("el-checkbox",{attrs:{title:"显示"},model:{value:e.required,callback:function(a){t.$set(e,"required",a)},expression:"item2.required"}})],1):t._e(),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-radio",{attrs:{label:"readonly"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-radio",{attrs:{label:"hidden"},on:{change:t.whenRadioChange}},[t._v(t._s(""))])],1)],1)],1)],1)})],2):t._e()],1)})],2),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.EditModalStatus=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"可编辑项目:"}},[t._l(t.canEditList,function(e,n){return a("span",{key:n},[e.required?a("span",{staticStyle:{color:"red"}},[t._v("*")]):t._e(),t._v("\n        "+t._s(e.name)+"\n        "),"table"==e.t?a("span",[e.table_add?a("span",[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可在表单中添加行",placement:"top-start"}},[a("span",[t._v("(可添加)")])])],1):t._e(),t._v(" "),e.table_edit?a("span",[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据编辑",placement:"top-start"}},[a("span",[t._v("(可编辑)")])])],1):t._e(),t._v(" "),e.table_delete?a("span",[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可对表单中之前的数据进行删除",placement:"top-start"}},[a("span",[t._v("(可删除)")])])],1):t._e()]):t._e(),t._v(" "),"table"==e.t&&e.soncanedit.length?a("span",[t._v("(\n            "),t._l(e.soncanedit,function(n,s){return a("span",{key:s},[n.required?a("span",{staticStyle:{color:"red"}},[t._v("*")]):t._e(),t._v(" "+t._s(n.name)+"\n        "),e.soncanedit.length-1!=s?a("span",[t._v("|")]):t._e()])}),t._v(")\n        ")],2):t._e(),t._v(" "),t.canEditList.length-1!=n?a("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.canEditList.length?a("span",[t._v("无")]):t._e()],2),t._v(" "),a("el-form-item",{attrs:{label:"只读项目:"}},[t._l(t.readonlyList,function(e,n){return a("span",{key:n},[t._v("\n                "+t._s(e.name)+" \n                "),t.readonlyList.length-1!=n?a("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.readonlyList.length?a("span",[t._v("无")]):t._e()],2),t._v(" "),a("el-form-item",{attrs:{label:"隐藏项目:"}},[t._l(t.hiddenList,function(e,n){return a("span",{key:n},[t._v("\n                "+t._s(e.name)+" \n                "),t.hiddenList.length-1!=n?a("span",[t._v("|")]):t._e()])}),t._v(" "),0==t.hiddenList.length?a("span",[t._v("无")]):t._e()],2),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.editFormSet}},[t._v("编辑表单设置")])],1)],1)},[],!1,null,"29669c6c",null);u.options.__file="CFormLimit.vue";e.default=u.exports}}]);