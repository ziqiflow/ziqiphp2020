(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9bce"],{"1GiH":function(t,n,e){},"9vLS":function(t,n,e){"use strict";var o=e("HmCC");e.n(o).a},HmCC:function(t,n,e){},IBe4:function(t,n,e){"use strict";var o=e("1GiH");e.n(o).a},Yfch:function(t,n,e){"use strict";function o(t){return/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(t)}e.d(n,"a",function(){return o})},ntYl:function(t,n,e){"use strict";e.r(n);e("Yfch");var o={name:"Login",components:{LangSelect:e("ETGp").a},data:function(){return{thirdPlatform:window.conf.thirdPlatform,loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:function(t,n,e){e()}}],password:[{required:!0,trigger:"blur",validator:function(t,n,e){n.length<6?e(new Error("密码必须大于6个字符")):e()}}]},passwordType:"password",loading:!1,showDialog:!1,redirect:void 0}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},beforeCreate:function(){},created:function(){console.log("created")},destroyed:function(){},mounted:function(){this.isDingTalk()&&"dingtalk"==this.thirdPlatform?window.location.href="/dingtalk/login":this.isWechatWork()&&"wechatwork"==this.thirdPlatform&&(window.location.href="/wechatwork/login")},methods:{isWechatWork:function(){return-1!=window.navigator.userAgent.toLowerCase().indexOf("wxwork")},isDingTalk:function(){return-1!=window.navigator.userAgent.toLowerCase().indexOf("dingtalk")},showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var t=this;this.$refs.loginForm.validate(function(n){if(!n)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("LoginByUsername",t.loginForm).then(function(){t.loading=!1,t.$router.push({path:t.redirect||"/"})}).catch(function(n){t.loading=!1,t.$message.error(n)})})},afterQRScan:function(){}}},i=(e("IBe4"),e("9vLS"),e("KHd+")),a=Object(i.a)(o,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v(t._s(t.$t("login.title")))]),t._v(" "),e("lang-select",{staticClass:"set-language"})],1),t._v(" "),e("el-form-item",{attrs:{prop:"username"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),t._v(" "),e("el-input",{attrs:{placeholder:t.$t("login.username"),name:"username",type:"text","auto-complete":"on"},model:{value:t.loginForm.username,callback:function(n){t.$set(t.loginForm,"username",n)},expression:"loginForm.username"}})],1),t._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),t._v(" "),e("el-input",{attrs:{type:t.passwordType,placeholder:t.$t("login.password"),name:"password","auto-complete":"on"},nativeOn:{keyup:function(n){return"button"in n||!t._k(n.keyCode,"enter",13,n.key,"Enter")?t.handleLogin(n):null}},model:{value:t.loginForm.password,callback:function(n){t.$set(t.loginForm,"password",n)},expression:"loginForm.password"}}),t._v(" "),e("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[e("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),t._v(" "),e("el-button",{staticStyle:{width:"100%","margin-bottom":"10px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),t.handleLogin(n)}}},[t._v(t._s(t.$t("login.logIn")))]),t._v(" "),"dingtalk"==t.thirdPlatform?e("a",{attrs:{href:"/dingtalk/loginweb",target:"_blank"}},[e("el-button",{staticStyle:{width:"100%","margin-left":"0px"},attrs:{type:"success",plain:""},on:{click:function(n){t.showDialog=!0}}},[e("v-icon",{attrs:{name:"dingtalk"}}),t._v("\n  使用钉钉登录")],1)],1):t._e(),t._v(" "),"wechatwork"==t.thirdPlatform?e("a",{attrs:{href:"/wechatwork/loginweb",target:"_blank"}},[e("el-button",{staticStyle:{width:"100%","margin-left":"0px"},attrs:{type:"success",plain:""},on:{click:function(n){t.showDialog=!0}}},[e("v-icon",{attrs:{name:"dingtalk"}}),t._v("\n  使用企业微信登录")],1)],1):t._e()],1)],1)},[],!1,null,"859b7b0c",null);a.options.__file="index.vue";n.default=a.exports}}]);