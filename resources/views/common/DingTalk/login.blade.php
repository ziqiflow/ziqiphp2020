@extends('common.base')

@section('title','钉钉登录页面')


@section('css')

@endsection

@section('js_start')
    <script src="https://cdn.staticfile.org/vue/2.6.10/vue.min.js"></script>


    <link href="https://cdn.staticfile.org/element-ui/2.7.2/theme-chalk/index.css" rel="stylesheet">
    <script src="https://cdn.staticfile.org/element-ui/2.7.2/index.js"></script>

    <script src="https://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js"></script>

    <script type="text/javascript" src="https://g.alicdn.com/dingding/dingtalk-pc-api/2.9.0/index.js"></script>
    <script src="https://cdn.staticfile.org/js-cookie/2.2.0/js.cookie.min.js"></script>

    <script src="https://cdn.staticfile.org/vConsole/3.3.0/vconsole.min.js"></script>
    <script>

        window.vConsole = new window.VConsole();
        console.info('欢迎使用 vConsole。vConsole 是一个由微信公众平台前端团队研发的 Web 前端开发者面板，可用于展示 console 日志，方便开发、调试。');

    </script>

@endsection

@section('content')
    <div  id="app">

        <div v-if="!!error">@{{error}}</div>
        <div v-else>
            config代码：
            <pre>@{{config}}</pre>
            返回信息：
            <pre>@{{info}}</pre>
        </div>
        <div v-if="!!code">
            会员识别码：
            @{{code}}
        </div>
    </div>
@endsection

@section('js_end')


    <script>
        window.config=<?php echo json_encode($config,JSON_UNESCAPED_UNICODE)?>;
    </script>

    <script src="/js/DingTalk/login.js"></script>



@endsection
