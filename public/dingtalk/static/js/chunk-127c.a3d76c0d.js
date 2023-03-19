(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-127c","jujd"],{"0VxU":function(e,s,i){"use strict";var t=i("eNrJ");i.n(t).a},eNrJ:function(e,s,i){},jujd:function(e,s,i){"use strict";i.r(s);var t={computed:{roles:function(){return this.$store.getters.roles},switchRoles:{get:function(){return this.roles[0]},set:function(e){var s=this;this.$store.dispatch("ChangeRoles",e).then(function(){s.$emit("change")})}}}},n=i("KHd+"),a=Object(n.a)(t,function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",[i("div",{staticStyle:{"margin-bottom":"15px"}},[e._v(e._s(e.$t("permission.roles"))+"： "+e._s(e.roles))]),e._v("\n  "+e._s(e.$t("permission.switchRoles"))+"：\n  "),i("el-radio-group",{model:{value:e.switchRoles,callback:function(s){e.switchRoles=s},expression:"switchRoles"}},[i("el-radio-button",{attrs:{label:"editor"}}),e._v(" "),i("el-radio-button",{attrs:{label:"admin"}})],1)],1)},[],!1,null,null,null);a.options.__file="SwitchRoles.vue";s.default=a.exports},qZ8X:function(e,s,i){"use strict";i.r(s);var t=i("Q4Eu"),n=i("Q2AE");var a={name:"DirectivePermission",components:{SwitchRoles:i("jujd").default},directives:{permission:t.a},data:function(){return{key:1}},methods:{checkPermission:function(e){if(e&&e instanceof Array&&e.length>0){var s=n.a.getters&&n.a.getters.roles,i=e,t=s.some(function(e){return i.includes(e)});return s.includes("super_admin")&&(t=!0),!!t}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1},handleRolesChange:function(){this.key++}}},r=(i("0VxU"),i("KHd+")),o=Object(r.a)(a,function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",{staticClass:"app-container"},[i("switch-roles",{on:{change:e.handleRolesChange}}),e._v(" "),i("div",{key:e.key,staticStyle:{"margin-top":"30px"}},[i("div",[i("span",{directives:[{name:"permission",rawName:"v-permission",value:["admin"],expression:"['admin']"}],staticClass:"permission-alert"},[e._v("\n        Only\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("admin")]),e._v(" can see this\n      ")],1),e._v(" "),i("el-tag",{directives:[{name:"permission",rawName:"v-permission",value:["admin"],expression:"['admin']"}],staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("v-permission=\"['admin']\"")])],1),e._v(" "),i("div",[i("span",{directives:[{name:"permission",rawName:"v-permission",value:["editor"],expression:"['editor']"}],staticClass:"permission-alert"},[e._v("\n        Only\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("editor")]),e._v(" can see this\n      ")],1),e._v(" "),i("el-tag",{directives:[{name:"permission",rawName:"v-permission",value:["editor"],expression:"['editor']"}],staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("v-permission=\"['editor']\"")])],1),e._v(" "),i("div",[i("span",{directives:[{name:"permission",rawName:"v-permission",value:["admin","editor"],expression:"['admin','editor']"}],staticClass:"permission-alert"},[e._v("\n        Both\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("admin")]),e._v(" and\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("editor")]),e._v(" can see this\n      ")],1),e._v(" "),i("el-tag",{directives:[{name:"permission",rawName:"v-permission",value:["admin","editor"],expression:"['admin','editor']"}],staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("v-permission=\"['admin','editor']\"")])],1)]),e._v(" "),i("div",{key:"checkPermission"+e.key,staticStyle:{"margin-top":"60px"}},[i("code",[e._v("\n      "+e._s(e.$t("permission.tips"))+"\n      "),i("br"),e._v(" e.g.\n    ")]),e._v(" "),i("el-tabs",{staticStyle:{width:"550px"},attrs:{type:"border-card"}},[e.checkPermission(["admin"])?i("el-tab-pane",{attrs:{label:"Admin"}},[e._v("\n        Admin can see this\n        "),i("el-tag",{staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("v-if=\"checkPermission(['admin'])\"")])],1):e._e(),e._v(" "),e.checkPermission(["editor"])?i("el-tab-pane",{attrs:{label:"Editor"}},[e._v("\n        Editor can see this\n        "),i("el-tag",{staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("v-if=\"checkPermission(['editor'])\"")])],1):e._e(),e._v(" "),e.checkPermission(["admin","editor"])?i("el-tab-pane",{attrs:{label:"Admin-OR-Editor"}},[e._v("\n        Both admin or editor can see this\n        "),i("el-tag",{staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("v-if=\"checkPermission(['admin','editor'])\"")])],1):e._e()],1)],1)],1)},[],!1,null,"081be6fd",null);o.options.__file="directive.vue";s.default=o.exports}}]);