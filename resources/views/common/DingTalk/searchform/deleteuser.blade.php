@extends('common.searchform')
@section('content')

    <div id="app" style="margin: 20px;">
        <h3>{{isset($title)?$title:$tablename_zh.'['.$tablename.']显示列表'}}</h3>
        <search-form-new v-loading="loading" :db-id="dbId" :page-set="pageset" :default="searchdefault">
            <div slot="aftersearchform">
                <el-alert
                        title="提示：删除前务必检查最近钉钉同步时间，如果今天没有同步，那么显示的并非必须要删除的哦;<?php echo $lastupdatetime==null?null:'最近同步：'.$lastupdatetime;?>"
                        type="error">
                </el-alert>

                <el-alert style="margin-top: 20px;"
                        title="审核删除成功后，请点击如下按键重新生成缓存数据"
                        type="success">
                        <el-button size="mini" @click="resetdata" type="warning">更新缓存数据</el-button>
                </el-alert>

            </div>
        </search-form-new>
    </div>


@endsection

@section('js_end')

    <script src="/js/admin/dbctrl3/searchForm.js"></script>
    <script src="/js/admin/dbctrl3/searchForm.mixin.js"></script>
    <script>
        Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

        const SearchFormNew={
            extends:window.searchForm,
            mixins: [window.searchFormMixin],
            mounted(){
                console.log('dddd');
            },
            methods: {
                // button_click_deleteuser(row){
                //
                //     console.log(row);
                //
                //
                //
                // }
            }
        }

        new Vue({
            el: '#app',
            components: {
                SearchFormNew:SearchFormNew
            },
            data: function() {
                return {
                    loading:false,
                    pageset: window.pageset,
                    searchdefault:window.default,
                    dbId:window.dbid,
                }
            },
            methods:{
                resetdata(){
                    this.loading=true
                    axios
                        .post('/employee/dd/userdeptrolestoredatarest')
                        .then(({
                                   data: res
                               }) => {
                            this.loading=false;
                                                        if(res.success){
                                this.$message.success(res.msg);
                            }else{
                                    this.$message.error(res.msg);
                            }
                            console.log(res);
                        })
                        .catch(err => {
                            this.loading=false;
                            this.$message.error(err.message);
                        });
                }
            }
        })
    </script>

@endsection