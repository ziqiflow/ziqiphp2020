<table>
    <thead>
    <tr>
        <th>部门</th>
        <th>处理人</th>
        <th>状态</th>


        <th >通知状态</th>
        <th >通知时间</th>

        <th>是否已读</th>


        @if($dealtype!='message')
        <th>结束时间</th>
        @endif

        @if($dealtype!='message')
            <th>点击按键</th>
        @endif

        @if($dealtype!='message')
            <th>审批建议</th>
        @endif


    </tr>

    </thead>

    <tbody>


    @foreach($data as $msg)
        <tr>
            <td>{{$msg['todeptstr']}}</td>

            <td>{{$msg['toer']}}</td>

            <td>{{$msg['status_str']}}</td>

            <td>{{$msg['hassend']?'已发':'未发'}}</td>

            <td>{{$msg['sended_at']}}</td>


            <td>{{$msg['hasread']?'已读':'未读'}}</td>



        @if($dealtype!='message')

            <td>{{$msg['finished_at']}}</td>

        @endif

            @if($dealtype!='message')

                <td>
                    @if(isset($msg['log']['button']))
                        {{$msg['log']['button']}}
                    @endif

                    </td>

            @endif

            @if($dealtype!='message')

                <td>  @if(isset($msg['log']['suggest']))
                        {{$msg['log']['suggest']}}
                    @endif</td>

            @endif
        </tr>
    @endforeach
    </tbody>
</table>