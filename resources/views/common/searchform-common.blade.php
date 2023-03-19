@extends('common.searchform')
@section('content')
    <div id="app" style="margin: 20px;">
        <h3>{{isset($title)?$title:$tablename_zh.'['.$tablename.']显示列表'}}</h3>
        <search-form :is-mongodb='ismongodb' :db-id="dbId" :page-set="pageset" :default="searchdefault">
            <div slot="toppageset"></div>
        </search-form>
    </div>
@endsection

@section('js_end')

    <script src="/js/admin/dbctrl3/searchForm.js"></script>


    <script>
        Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
        new Vue({
            el: '#app',
            data: function() {
                return {
                    pageset: window.pageset,
                    searchdefault:window.default,
                    dbId:window.dbid,
                    ismongodb:window.ismongodb
                }
            },
            mounted(){
                console.log('ddddd');
            },
            methods:{
            }
        })
    </script>

@endsection
