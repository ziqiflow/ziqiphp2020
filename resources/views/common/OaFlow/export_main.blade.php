<?php
if (!function_exists('show_main_label')) {
    function show_main_label($set, $item)
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
}?>
<table>
    <thead>
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
    </tr>
    </thead>
    <tbody>

    @foreach($data['list'] as $list)

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


                    <td><?php echo show_main_label($set, $list);?></td>



                @endif
            @endforeach

        </tr>

    @endforeach

    </tbody>
</table>
