(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9e26"],{"4lcx":function(e,t,a){"use strict";var s=a("R0le");a.n(s).a},R0le:function(e,t,a){},TJHm:function(e,t,a){"use strict";a.r(t);var s={i18nView:{title:"切换语言",note:"本项目国际化基于 vue-i18n",datePlaceholder:"请选择日期",selectPlaceholder:"请选择",tableDate:"日期",tableName:"姓名",tableAddress:"地址",default:"默认按钮",primary:"主要按钮",success:"成功按钮",info:"信息按钮",warning:"警告按钮",danger:"危险按钮",one:"一",two:"二",three:"三"}},l={i18nView:{title:"Switch Language",note:"The internationalization of this project is based on vue-i18n",datePlaceholder:"Pick a day",selectPlaceholder:"Select",tableDate:"tableDate",tableName:"tableName",tableAddress:"tableAddress",default:"default:",primary:"primary",success:"success",info:"info",warning:"warning",danger:"danger",one:"One",two:"Two",three:"Three"}},i={i18nView:{title:"Switch Language",note:"The internationalization of this project is based on vue-i18n",datePlaceholder:"Pick a day",selectPlaceholder:"Select",tableDate:"tableDate",tableName:"tableName",tableAddress:"tableAddress",default:"default:",primary:"primary",success:"success",info:"info",warning:"warning",danger:"danger",one:"One",two:"Two",three:"Three"}},n={name:"I18n",data:function(){return{date:"",tableData:[{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles"}],options:[],value:""}},computed:{lang:{get:function(){return this.$store.state.app.language},set:function(e){this.$i18n.locale=e,this.$store.dispatch("setLanguage",e)}}},watch:{lang:function(){this.setOptions()}},created:function(){this.$i18n.getLocaleMessage("en").i18nView||(this.$i18n.mergeLocaleMessage("en",l),this.$i18n.mergeLocaleMessage("zh",s),this.$i18n.mergeLocaleMessage("es",i)),this.setOptions()},methods:{setOptions:function(){this.options=[{value:"1",label:this.$t("i18nView.one")},{value:"2",label:this.$t("i18nView.two")},{value:"3",label:this.$t("i18nView.three")}]}}},r=(a("4lcx"),a("KHd+")),o=Object(r.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"40px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("svg-icon",{attrs:{"icon-class":"international"}}),e._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(e.$t("i18nView.title")))])],1),e._v(" "),a("div",[a("el-radio-group",{attrs:{size:"small"},model:{value:e.lang,callback:function(t){e.lang=t},expression:"lang"}},[a("el-radio",{attrs:{label:"zh",border:""}},[e._v("简体中文")]),e._v(" "),a("el-radio",{attrs:{label:"en",border:""}},[e._v("English")]),e._v(" "),a("el-radio",{attrs:{label:"es",border:""}},[e._v("Español")])],1),e._v(" "),a("el-tag",{staticStyle:{"margin-top":"15px",display:"block"},attrs:{type:"info"}},[e._v(e._s(e.$t("i18nView.note")))])],1)]),e._v(" "),a("el-row",{staticStyle:{margin:"100px 15px 50px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:12,xs:24}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{placeholder:e.$t("i18nView.datePlaceholder"),type:"date"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-select",{attrs:{placeholder:e.$t("i18nView.selectPlaceholder")},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("div",{staticClass:"block"},[a("el-button",{staticClass:"item-btn",attrs:{size:"small"}},[e._v(e._s(e.$t("i18nView.default")))]),e._v(" "),a("el-button",{staticClass:"item-btn",attrs:{size:"small",type:"primary"}},[e._v(e._s(e.$t("i18nView.primary")))]),e._v(" "),a("el-button",{staticClass:"item-btn",attrs:{size:"small",type:"success"}},[e._v(e._s(e.$t("i18nView.success")))]),e._v(" "),a("el-button",{staticClass:"item-btn",attrs:{size:"small",type:"info"}},[e._v(e._s(e.$t("i18nView.info")))]),e._v(" "),a("el-button",{staticClass:"item-btn",attrs:{size:"small",type:"warning"}},[e._v(e._s(e.$t("i18nView.warning")))]),e._v(" "),a("el-button",{staticClass:"item-btn",attrs:{size:"small",type:"danger"}},[e._v(e._s(e.$t("i18nView.danger")))])],1)]),e._v(" "),a("el-col",{attrs:{span:12,xs:24}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,fit:"","highlight-current-row":"",border:""}},[a("el-table-column",{attrs:{label:e.$t("i18nView.tableName"),prop:"name",width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.tableDate"),prop:"date",width:"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.tableAddress"),prop:"address"}})],1)],1)],1)],1)},[],!1,null,"7224b880",null);o.options.__file="index.vue";t.default=o.exports}}]);