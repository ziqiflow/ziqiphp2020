@extends('common.base')

@section('title','页面跳转中')
@section('css')

@endsection

@section('js_start')
    <script src="https://cdn.staticfile.org/vue/2.6.10/vue.min.js"></script>

    <script src="https://cdn.staticfile.org/js-cookie/2.2.0/js.cookie.min.js"></script>

@endsection
@section('content')
    <div  id="app">
        跳转中
    </div>
@endsection

@section('js_end')


    <script>
        new Vue({
            el: '#app',
            data: {
                // visible: false,
                info:<?php echo json_encode($data,JSON_UNESCAPED_UNICODE)?>,
            },
            methods: {
               IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
                setToken:function (token){
                    var TOKEN_KEY = 'Admin-Token';
cookieExpires
                    var cookieExpires=(24-new Date().getHours()+3)/24+3;

                    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
                },

            },

            mounted(){
                if(!!this.info.token){
                    var token=this.info.token;
                    console.log(token);
                    this.setToken(token);
                }

                window.location.href=this.IsPC()?'/dingtalk/index.html':'/dingtalkMobie/index.html';

            }
        })
    </script>

@endsection
