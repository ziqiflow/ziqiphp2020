(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-08ff","RMcE","jpgC","Jqst","YvKV"],{"7xxi":function(t,e,o){},EXL7:function(t,e,o){"use strict";o.r(e);var r=o("P2sY"),n=o.n(r),s=o("glbJ"),a=o("fL+G"),i=o("Grqa"),l=o("uARZ"),c=o("Yfch"),u=o("JCNI"),m=o("t3Un");var p=o("YvKV"),d=o("RMcE"),f=o("jpgC"),h=o("Jqst"),v={status:"draft",title:"",content:"",content_short:"",source_uri:"",image_uri:"",display_time:void 0,id:void 0,platforms:["a-platform"],comment_disabled:!1,importance:0},g={name:"ArticleDetail",components:{Tinymce:s.a,MDinput:i.a,Upload:a.a,Sticky:l.a,Warning:p.default,CommentDropdown:d.default,PlatformDropdown:f.default,SourceUrlDropdown:h.default},props:{isEdit:{type:Boolean,default:!1}},data:function(){var t=this,e=function(e,o,r){""===o?(t.$message({message:e.field+"为必传项",type:"error"}),r(new Error(e.field+"为必传项"))):r()};return{postForm:n()({},v),loading:!1,userListOptions:[],rules:{image_uri:[{validator:e}],title:[{validator:e}],content:[{validator:e}],source_uri:[{validator:function(e,o,r){o?Object(c.a)(o)?r():(t.$message({message:"外链url填写不正确",type:"error"}),r(new Error("外链url填写不正确"))):r()},trigger:"blur"}]},tempRoute:{}}},computed:{contentShortLength:function(){return this.postForm.content_short.length},lang:function(){return this.$store.getters.language}},created:function(){if(this.isEdit){var t=this.$route.params&&this.$route.params.id;this.fetchData(t)}else this.postForm=n()({},v);this.tempRoute=n()({},this.$route)},methods:{fetchData:function(t){var e=this;Object(u.b)(t).then(function(t){e.postForm=t.data,e.postForm.title+="   Article Id:"+e.postForm.id,e.postForm.content_short+="   Article Id:"+e.postForm.id,e.setTagsViewTitle()}).catch(function(t){console.log(t)})},setTagsViewTitle:function(){var t="zh"===this.lang?"编辑文章":"Edit Article",e=n()({},this.tempRoute,{title:t+"-"+this.postForm.id});this.$store.dispatch("updateVisitedView",e)},submitForm:function(){var t=this;this.postForm.display_time=parseInt(this.display_time/1e3),console.log(this.postForm),this.$refs.postForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,t.$notify({title:"成功",message:"发布文章成功",type:"success",duration:2e3}),t.postForm.status="published",t.loading=!1})},draftForm:function(){0!==this.postForm.content.length&&0!==this.postForm.title.length?(this.$message({message:"保存成功",type:"success",showClose:!0,duration:1e3}),this.postForm.status="draft"):this.$message({message:"请填写必要的标题和内容",type:"warning"})},getRemoteUserList:function(t){var e=this;(function(t){return Object(m.a)({url:"/search/user",method:"get",params:{name:t}})})(t).then(function(t){t.data.items&&(e.userListOptions=t.data.items.map(function(t){return t.name}))})}}},_=(o("Ph8p"),o("KHd+")),b=Object(_.a)(g,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"createPost-container"},[o("el-form",{ref:"postForm",staticClass:"form-container",attrs:{model:t.postForm,rules:t.rules}},[o("sticky",{attrs:{"class-name":"sub-navbar "+t.postForm.status}},[o("CommentDropdown",{model:{value:t.postForm.comment_disabled,callback:function(e){t.$set(t.postForm,"comment_disabled",e)},expression:"postForm.comment_disabled"}}),t._v(" "),o("PlatformDropdown",{model:{value:t.postForm.platforms,callback:function(e){t.$set(t.postForm,"platforms",e)},expression:"postForm.platforms"}}),t._v(" "),o("SourceUrlDropdown",{model:{value:t.postForm.source_uri,callback:function(e){t.$set(t.postForm,"source_uri",e)},expression:"postForm.source_uri"}}),t._v(" "),o("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"margin-left":"10px"},attrs:{type:"success"},on:{click:t.submitForm}},[t._v("发布\n      ")]),t._v(" "),o("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{type:"warning"},on:{click:t.draftForm}},[t._v("草稿")])],1),t._v(" "),o("div",{staticClass:"createPost-main-container"},[o("el-row",[o("Warning"),t._v(" "),o("el-col",{attrs:{span:24}},[o("el-form-item",{staticStyle:{"margin-bottom":"40px"},attrs:{prop:"title"}},[o("MDinput",{attrs:{maxlength:100,name:"name",required:""},model:{value:t.postForm.title,callback:function(e){t.$set(t.postForm,"title",e)},expression:"postForm.title"}},[t._v("\n              标题\n            ")])],1),t._v(" "),o("div",{staticClass:"postInfo-container"},[o("el-row",[o("el-col",{attrs:{span:8}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{"label-width":"45px",label:"作者:"}},[o("el-select",{attrs:{"remote-method":t.getRemoteUserList,filterable:"",remote:"",placeholder:"搜索用户"},model:{value:t.postForm.author,callback:function(e){t.$set(t.postForm,"author",e)},expression:"postForm.author"}},t._l(t.userListOptions,function(t,e){return o("el-option",{key:t+e,attrs:{label:t,value:t}})}))],1)],1),t._v(" "),o("el-col",{attrs:{span:10}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{"label-width":"80px",label:"发布时间:"}},[o("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:t.postForm.display_time,callback:function(e){t.$set(t.postForm,"display_time",e)},expression:"postForm.display_time"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{staticClass:"postInfo-container-item",attrs:{"label-width":"60px",label:"重要性:"}},[o("el-rate",{staticStyle:{"margin-top":"8px"},attrs:{max:3,colors:["#99A9BF","#F7BA2A","#FF9900"],"low-threshold":1,"high-threshold":3},model:{value:t.postForm.importance,callback:function(e){t.$set(t.postForm,"importance",e)},expression:"postForm.importance"}})],1)],1)],1)],1)],1)],1),t._v(" "),o("el-form-item",{staticStyle:{"margin-bottom":"40px"},attrs:{"label-width":"45px",label:"摘要:"}},[o("el-input",{staticClass:"article-textarea",attrs:{rows:1,type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:t.postForm.content_short,callback:function(e){t.$set(t.postForm,"content_short",e)},expression:"postForm.content_short"}}),t._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:t.contentShortLength,expression:"contentShortLength"}],staticClass:"word-counter"},[t._v(t._s(t.contentShortLength)+"字")])],1),t._v(" "),o("el-form-item",{staticStyle:{"margin-bottom":"30px"},attrs:{prop:"content"}},[o("Tinymce",{ref:"editor",attrs:{height:400},model:{value:t.postForm.content,callback:function(e){t.$set(t.postForm,"content",e)},expression:"postForm.content"}})],1),t._v(" "),o("el-form-item",{staticStyle:{"margin-bottom":"30px"},attrs:{prop:"image_uri"}},[o("Upload",{model:{value:t.postForm.image_uri,callback:function(e){t.$set(t.postForm,"image_uri",e)},expression:"postForm.image_uri"}})],1)],1)],1)],1)},[],!1,null,"0ea6c9d0",null);b.options.__file="ArticleDetail.vue";e.default=b.exports},JCNI:function(t,e,o){"use strict";o.d(e,"c",function(){return n}),o.d(e,"b",function(){return s}),o.d(e,"d",function(){return a}),o.d(e,"a",function(){return i}),o.d(e,"e",function(){return l});var r=o("t3Un");function n(t){return Object(r.a)({url:"/article/list",method:"get",params:t})}function s(t){return Object(r.a)({url:"/article/detail",method:"get",params:{id:t}})}function a(t){return Object(r.a)({url:"/article/pv",method:"get",params:{pv:t}})}function i(t){return Object(r.a)({url:"/article/create",method:"post",data:t})}function l(t){return Object(r.a)({url:"/article/update",method:"post",data:t})}},Jqst:function(t,e,o){"use strict";o.r(e);var r={props:{value:{type:String,default:""}},computed:{source_uri:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},n=o("KHd+"),s=Object(n.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v("\n    外链\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),o("el-dropdown-menu",{staticClass:"no-padding no-border",staticStyle:{width:"400px"},attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{"label-width":"0px",prop:"source_uri"}},[o("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.source_uri,callback:function(e){t.source_uri=e},expression:"source_uri"}},[o("template",{slot:"prepend"},[t._v("填写url")])],2)],1)],1)],1)},[],!1,null,null,null);s.options.__file="SourceUrl.vue";e.default=s.exports},MSNs:function(t,e,o){"use strict";o.d(e,"a",function(){return n});var r=o("t3Un");function n(){return Object(r.a)({url:"/qiniu/upload/token",method:"get"})}},Ph8p:function(t,e,o){"use strict";var r=o("7xxi");o.n(r).a},RMcE:function(t,e,o){"use strict";o.r(e);var r={props:{value:{type:Boolean,default:!1}},computed:{comment_disabled:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},n=o("KHd+"),s=Object(n.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v(t._s(t.comment_disabled?"评论已关闭":"评论已打开")+"\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),o("el-dropdown-menu",{staticClass:"no-padding",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",[o("el-radio-group",{staticStyle:{padding:"10px"},model:{value:t.comment_disabled,callback:function(e){t.comment_disabled=e},expression:"comment_disabled"}},[o("el-radio",{attrs:{label:!0}},[t._v("关闭评论")]),t._v(" "),o("el-radio",{attrs:{label:!1}},[t._v("打开评论")])],1)],1)],1)],1)},[],!1,null,null,null);s.options.__file="Comment.vue";e.default=s.exports},Yfch:function(t,e,o){"use strict";function r(t){return/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(t)}o.d(e,"a",function(){return r})},YvKV:function(t,e,o){"use strict";o.r(e);var r=o("KHd+"),n=Object(r.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"warn-content"},[this._v("\n  创建和编辑页面是不能被keep-alive 缓存的，因为keep-alive 的include 目前不支持根据路由来缓存，所以目前都是基于component name 来缓存的，如果你想要实现缓存的效果，可以使用localstorage 等浏览器缓存方案。或者不要使用keep-alive\n  的include，直接缓存所有页面。详情见\n  "),e("a",{attrs:{href:"https://panjiachen.github.io/vue-element-admin-site/guide/essentials/tags-view.html",target:"_blank"}},[this._v("文档")])])}],!1,null,null,null);n.options.__file="Warning.vue";e.default=n.exports},jpgC:function(t,e,o){"use strict";o.r(e);var r={props:{value:{required:!0,default:function(){return[]},type:Array}},data:function(){return{platformsOptions:[{key:"a-platform",name:"a-platform"},{key:"b-platform",name:"b-platform"},{key:"c-platform",name:"c-platform"}]}},computed:{platforms:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},n=o("KHd+"),s=Object(n.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dropdown",{attrs:{"hide-on-click":!1,"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[t._v("\n    平台("+t._s(t.platforms.length)+")\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),o("el-dropdown-menu",{staticClass:"no-border",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-checkbox-group",{staticStyle:{padding:"5px 15px"},model:{value:t.platforms,callback:function(e){t.platforms=e},expression:"platforms"}},t._l(t.platformsOptions,function(e){return o("el-checkbox",{key:e.key,attrs:{label:e.key}},[t._v("\n        "+t._s(e.name)+"\n      ")])}))],1)],1)},[],!1,null,null,null);s.options.__file="Platform.vue";e.default=s.exports}}]);