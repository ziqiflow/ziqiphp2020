<table>
    <thead>
    <tr>
        <th width="200">文号</th>
        <th  width="250">流程名称</th>
        <th>当前流程节点名称</th>
        <th >接受者</th>
        <th >超时次数</th>
        <th>创建时间</th>
        <th>是否完成</th>
        <th>结束时间</th>
        <th>查看</th>
    </tr>
    </thead>
    <tbody>
    @foreach($data as $log)
        <tr>
            <td><b>{{$log['workname']??null}}</b></td>

            <td>{{$log['flowname']??null}}</td>

            <td>{{$log['NowFunName']??null}}</td>

            <td>{{$log['toer']??null}}</td>

            <td>{{$log['expiredtimes']??null}}</td>

            <td>{{(string)($log['created_at']??null)}}</td>

            <td>{{empty($log['hasfinish'])?'未完成':'完成'}}</td>

            <td>{{(string)($log['finished_at']??null)}}</td>


        </tr>
    @endforeach
    </tbody>
</table>