@extends('common.base')

@section('title','钉钉登录页面')

@section('css')

@endsection

@section('js_start')

    <script src="https://cdn.staticfile.org/vue/2.6.10/vue.min.js"></script>

    <script src="https://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js"></script>

    <script type="text/javascript" src="https://g.alicdn.com/dingding/open-develop/2.3.0/dingtalk.js"></script>

    <script src="https://cdn.staticfile.org/js-cookie/2.2.0/js.cookie.min.js"></script>

@endsection

@section('content')
    <div  id="app">

        <div v-if="!!error">@{{error}}</div>
        <div v-else>
            登录中。。。
        </div>
    </div>
@endsection

@section('js_end')

    <script>
        window.config=<?php echo json_encode($config,JSON_UNESCAPED_UNICODE)?>;
    </script>
    <script src="/js/DingTalk/mobilelogin.js"></script>

@endsection
