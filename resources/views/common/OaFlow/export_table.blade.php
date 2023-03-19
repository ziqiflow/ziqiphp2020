<?php
if(!function_exists('showtablelabel')){
function showtablelabel($val){
    if(is_array($val)){
        return implode(',',$val);
    }
    return $val;
}
}
if(!function_exists('showtabletime')){
function showtabletime($item,$key){
    if(isset($item[$key])){
        return date('Y-m-d H:i:s',$item[$key]);
    }
    return '';
}
}


?>
<table>
    <thead>
    <tr>
        <th>文号</th>
        <th>内容</th>
        @foreach($data['tableset'] as $tableset)
            <th>{{$tableset['name']}}</th>
            @endforeach
            <th>创建时间</th>
            <th>创建者</th>
            <th>更新时间</th>
            <th>更新者</th>
    </tr>
    </thead>

    <tbody>


        @foreach($data['sontables'] as $key=> $sontable)

            @if($key!=0)
                <tr>
                    <td></td>
                </tr>
            @endif


            @foreach($sontable['list'] as $item)

                <tr>
                    <td><b>{{!empty($sontable['workname'])?$sontable['workname']:$sontable['_id']}}</b></td>
                    <td>{{$sontable['desc']}}</td>
                @foreach($data['tableset'] as $tableset)
                    <td>{{isset($item[$tableset['code']])?showtablelabel($item[$tableset['code']]):''}}</td>
                @endforeach


                    <td>{{showtabletime($item,'_c_at')}}</td>
                    <td>{{isset($item['_creater'])?$item['_creater']:''}}</td>
                    <td>{{showtabletime($item,'_u_at')}}</td>
                    <td>{{isset($item['_updater'])?$item['_updater']:''}}</td>
                </tr>
                @endforeach




            @endforeach



    </tbody>
</table>