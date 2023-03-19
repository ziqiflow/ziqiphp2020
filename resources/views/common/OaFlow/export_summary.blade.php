<?php
if (!function_exists('show_summary_label')) {
    function show_summary_label($set, $item)
    {

        if (isset($item[$set['name']])) {

            $value = $item[$set['name']];

            switch ($set['_formset']['type']) {
                case 'table':
                    return count($value) . '行';
                    break;
                case 'switch':
                    if ($value === true) {
                        return '是';
                    } else {
                        return '否';
                    }
                    break;

                case 'custom':

                    if (in_array($set['_formset']['options']['componentName'], ['chose-users', 'chose-depts'])) {
                        if (is_array($value)) {
                            return collect($value)->map(function ($item) {
                                return $item['name']??'';
                            })->implode(',');
                        }
                    }

                    if($set['_formset']['options']['componentName']=='chose-contact'){

                        if (is_array($value)) {
                            return collect($value)->map(function ($item) {
                                return $item['name']??'';
                            })->implode(' or ');
                        }


                    }

                    break;


                default:

            }

            //return ($set['_formset']['type']);


            if (isset($set['_formset']['options']['options'])) {
                $formsetItem = $set['_formset'];
                $labelArr = [];
                if (is_array($value)) {
                    $valuelist = $value;
                } else {
                    $valuelist = [$value];
                }

                foreach ($valuelist as $key => $item) {
                    $hasfind = false;
                    foreach ($formsetItem['options']['options'] as $option) {
                        if ($item == $option['value']) {
                            $hasfind = true;
                            if ($formsetItem['options']['showLabel']) {
                                array_push($labelArr, isset($option['label']) ? $option['label'] : $option['value']);
                            } else {
                                array_push($labelArr, $option['value']);
                            }
                            break;
                        }
                    }
                    if (!$hasfind) {
                        array_push($labelArr, $item);
                    }
                }

                if (count($labelArr)) {
                    //return json_encode($labelArr,JSON_UNESCAPED_UNICODE);
                    try {
                        $back = implode(',', $labelArr);
                        return $back;
                    } catch (Exception $e) {
                        return json_encode($labelArr, JSON_UNESCAPED_UNICODE);
                    }
                }
                return '';
            }


            if (is_array($value)) {
                return \GuzzleHttp\json_encode($value, JSON_UNESCAPED_UNICODE);
            }
            return $value;
        }
        return '';

    }
}


if(!function_exists('get_show_row_count')){

    function get_show_row_count($data_set){

        return  collect($data_set)->filter(function ($set){

            if(
                !empty($set['_isformdata'])&&
                !$set['hide']&&
                $set['type']!='operate'){
                return true;
            }else{
                return false;
            }

        })->count();




    }

}

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

if(!function_exists('getmaxtablelength')){

    function getmaxtablelength($tables,$key){

        $max=0;

        foreach ($tables as $table){

            if(count($table['sontables'][$key]['list'])>$max){
                $max=count($table['sontables'][$key]['list']);
            }

        }

        return $max;



    }

}


?>
<table>
    <thead>

    <tr>
        <th colspan="{{9+get_show_row_count($data['set'])}}">主表</th>


        @foreach($data['tables'] as $table)


            <th></th>

                <th colspan="{{count($table['tableset'])+4}}">{{$table['name']}}</th>

        @endforeach




    </tr>

    <tr>
        <th>流程实例id</th>
        <th>文号</th>
        <th>流程名称</th>
        <th>状态</th>
        <th>取消次数</th>
        <th>未结束数量</th>
        <th>流程描述</th>
        <th>创建者</th>
        <th>创建时间</th>


        @foreach($data['set'] as $set)
            @if(!empty($set['_isformdata'])&&
            !$set['hide']&&
            $set['type']!='operate')
                <th>{{$set['zh_name']}}</th>
            @endif
        @endforeach


        @foreach($data['tables'] as $table)


            <th></th>


            @foreach($table['tableset'] as $tableitem)

                <th>{{$tableitem['name']}}</th>

            @endforeach

            <th>创建时间</th>
            <th>创建者</th>
            <th>更新时间</th>
            <th>更新者</th>



        @endforeach


    </tr>
    </thead>
    <tbody>




    @foreach($data['list'] as $key=> $list)



        <tr>
            <td>{{(string)$list['_id']}}</td>
            <td><b>{{isset($list['workname'])?(string)$list['workname'].'':''}}</b></td>
            <td>{{$list['name']}}</td>
            <td>
                @if(isset($list['isCancel'])&&$list['isCancel'])
                    已取消
                @elseif(empty($list['unFinishNum'])||$list['unFinishNum']==0)
                    已结束
                @else
                    未结束
                @endif
            </td>
            <td>
                @if(empty($list['CancelNum']))
                    0
                @else
                    {{$list['CancelNum']}}
                @endif
            </td>
            <td>
                @if(empty($list['unFinishNum']))
                    0
                @else
                    {{$list['unFinishNum']}}
                @endif

            </td>
            <td>{{$list['desc']}}</td>
            <td>{{$list['creater']}}</td>
            <td>{{\App\Http\Common\utils\MongoDateTrans::UTCToString($list['created_at'])}}</td>

            @foreach($data['set'] as $set)

                @if(
                !empty($set['_isformdata'])&&
                !$set['hide']
                &&$set['type']!='operate')

                    <td><?php echo show_summary_label($set, $list);?></td>

                @endif
            @endforeach



            @foreach($data['tables'] as $table)


                <td></td>



                @foreach($table['tableset'] as $tableitem)

                    <td>{{showtablelabel($table['sontables'][$key]['list'][0][$tableitem['code']]??'')}}</td>

                @endforeach

                <td>{{showtabletime($table['sontables'][$key]['list'][0]??'','_c_at')}}</td>
                <td>{{$table['sontables'][$key]['list'][0]['_creater']??''}}</td>
                <td>{{showtabletime($table['sontables'][$key]['list'][0]??'','_u_at')}}</td>
                <td>{{$table['sontables'][$key]['list'][0]['_updater']??''}}</td>

            @endforeach
        </tr>
            @for($index=1;$index<getmaxtablelength($data['tables'],$key);$index++)

                <tr>
                    <td>{{(string)$list['_id']}}</td>
                    <td><b>{{isset($list['workname'])?(string)$list['workname'].'':''}}</b></td>
                    <td>{{$list['name']}}</td>
                    <td>
                        @if(isset($list['isCancel'])&&$list['isCancel'])
                            已取消
                        @elseif($list['unFinishNum']==0)
                            已结束
                        @else
                            未结束
                        @endif
                    </td>
                    <td>
                        @if(empty($list['CancelNum']))
                            0
                        @else
                            {{$list['CancelNum']}}
                        @endif
                    </td>
                    <td>
                        @if(empty($list['unFinishNum']))
                            0
                        @else
                            {{$list['unFinishNum']}}
                        @endif

                    </td>
                    <td>{{$list['desc']}}</td>
                    <td>{{$list['creater']}}</td>
                    <td>{{\App\Http\Common\utils\MongoDateTrans::UTCToString($list['created_at'])}}</td>

                    @foreach($data['set'] as $set)

                        @if(
                        !empty($set['_isformdata'])&&
                        !$set['hide']
                        &&$set['type']!='operate')

                            <td><?php echo show_summary_label($set, $list);?></td>

                        @endif
                    @endforeach


                    @foreach($data['tables'] as $table)

                        <td></td>
                        @foreach($table['tableset'] as $tableitem)

                            <td>{{showtablelabel($table['sontables'][$key]['list'][$index][$tableitem['code']]??'')}}</td>

                        @endforeach

                        <td>{{showtabletime($table['sontables'][$key]['list'][$index]??'','_c_at')}}</td>
                        <td>{{$table['sontables'][$key]['list'][$index]['_creater']??''}}</td>
                        <td>{{showtabletime($table['sontables'][$key]['list'][$index]??'','_u_at')}}</td>
                        <td>{{$table['sontables'][$key]['list'][$index]['_updater']??''}}</td>

                    @endforeach



                </tr>

            @endfor








    @endforeach

    </tbody>
</table>
