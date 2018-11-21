@extends('layouts.master')

@section('title','日历')
@section('body-class','dashboard')

@section('body')
    @include('layouts.left-nav')


    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">日历</h1>
            <div class="page-header-actions" data-toggle="modal" data-target="#addCalendar">
                <i class="icon md-plus font-size-20" aria-hidden="true"></i>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5">

                <calendar></calendar>

            </div>
        </div>

        <div class="modal fade" id="addSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新建日程</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">标题</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入标题"
                                       v-model="scheduleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">日历</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :placeholder="'请选择日历'"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="startMinutes" @change="changeStartMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left">结束时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="endMinutes" @change="changeEndMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="isAllDay" @change="changeIsAllDay">
                                    <label for="isAllDay">全天</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix pt-10">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="onlyParticipantVisible"
                                           @change="changeParticipantVisible">
                                    <label for="onlyParticipantVisible">仅参与人可见</label>
                                </div>
                            </div>
                        </div>
                        <div v-if="showMore">
                            <div class="pt-10 mb-20 clearfix">
                                <div class="col-md-2 text-right float-left">会议室</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="meetingRomeArr" :placeholder="'请选择会议室'"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">提醒</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="remindArr" :placeholder="''"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">重复</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="repeatArr" :placeholder="''"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">位置</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" class="form-control" title="" v-model="eventPlace">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">备注</div>
                                <div class="col-md-10 float-left pl-0">
                                    <textarea class="form-control" title="" v-model="eventDesc"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 text-right pointer-content hover-content" @click="isShowMore">
                            <template v-if="showMore">隐藏更多选项</template>
                            <template v-else>添加更多选项</template>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addSchedule">确定</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="addCalendar" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新建日程</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">标题</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入标题"
                                       v-model="scheduleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">可见范围</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="visibleRangeArr"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :multiple="true" :options="starsArr"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member @change="participantChange"></add-member>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                            <button class="btn btn-primary" type="submit" @click="addCalendar">确定</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- End Page -->

@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/calendar.index.js') }}"></script>

@endsection






