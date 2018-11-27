<template>
    <div class="page-main">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">考勤日历</h1>
            <div class="page-header-actions" data-toggle="modal" data-target="#addCalendar">
                <i class="icon md-plus font-size-20" aria-hidden="true"></i>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5 clearfix px-0 mb-0">
                <!-- <div class=" float-left py-30" style="width: 20%;">
                    <div style="border-bottom: 1px solid #D8D8D8;width: 90%;margin: 0 auto">
                        <InlineDatepicker @change="selectDate"></InlineDatepicker>
                    </div>
                    <div class="calendar-list">
                        <div>
                            <div class="calendar-title"><i class="icon md-calendar pr-5"></i>所有日历</div>
                            <ul>
                                <li v-for="calendar in calendarList" class="clearfix">
                                    <div class="calendar-checkbox float-left pointer-content"
                                         :style="'background-color:' + calendar.color"
                                         @click="checkCalendar(calendar.id)">
                                        <i class="icon md-check"
                                           v-show="selectedCalendar.indexOf(calendar.id) > -1"></i>
                                    </div>
                                    <div class="float-left ml-10">{{ calendar.name }}</div>
                                    <div class="float-right">
                                        <i class="icon md-more" aria-hidden="true" id="taskDropdown"
                                           data-toggle="dropdown" aria-expanded="false"></i>
                                        <div class="dropdown-menu" aria-labelledby="taskDropdown">
                                            <a class="dropdown-item" @click="editCalendar" data-target="#changeCalendar"
                                               data-toggle="modal">编辑</a>
                                            <a class="dropdown-item" data-target="#delModel" data-toggle="modal"
                                               @click="delCalendar(calendar)">删除</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="px-20">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="inputUnchecked" @change="selectAllCalendar">
                                    <label for="inputUnchecked">全选</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="calendar-title"><i class="icon md-calendar pr-5"></i>会议室</div>
                            <div class="text-center">
                                <span class="pointer-content hover-content" @click="checkMeetingRoom">会议室占用情况</span>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="float-left p-0" style="width: 100%">
                    <calendar :gotoDate="selectedDate" v-show="!meetingRomeShow"></calendar>
                    <MeetingRoomCalendar v-show="meetingRomeShow" @change="displayMeetingRoom"></MeetingRoomCalendar>
                </div>

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

        <div class="modal fade" id="changeSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">修改日程</h4>
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
                                    <input type="checkbox" id="isAllDay1" @change="changeIsAllDay">
                                    <label for="isAllDay1">全天</label>
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
                                    <input type="checkbox" id="onlyParticipantVisible1"
                                           @change="changeParticipantVisible">
                                    <label for="onlyParticipantVisible1">仅参与人可见</label>
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
                        <h4 class="modal-title">添加日历</h4>
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
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <ul class="color-selector calendar-color-list">
                                    <li v-for="color in colorArr" :style="'background-color: #' + color"
                                        @click="changeCalendarColor(color)">
                                        <i class="icon md-check" v-if="color === checkColor"></i>
                                    </li>
                                </ul>
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

        <div class="modal fade" id="changeCalendar" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">添加日历</h4>
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
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <ul class="color-selector calendar-color-list">
                                    <li v-for="color in colorArr" :style="'background-color: #' + color"
                                        @click="changeCalendarColor(color)">
                                        <i class="icon md-check" v-if="color === checkColor"></i>
                                    </li>
                                </ul>
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

        <div class="modal fade" id="delModel" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i
                                aria-hidden="true" class="md-close"></i></button>
                        <h4 class="modal-title">确认删除</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <p>确认删除日历 “{{ delCalendarInfo.name }}” </p>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" @click="deleteCalendar">确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        data: function () {
            return {
                scheduleName: '',
                startTime: '',
                startMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                remindArr: config.remindArr,
                meetingRomeArr: config.meetingRomeArr,
                repeatArr: config.repeatArr,
                visibleRangeArr: config.visibleRangeArr,
                colorArr: config.colorArr,
                showMore: false,
                eventPlace: '',
                eventDesc: '',
                starsArr: [],
                checkColor: '',
                selectedDate: '',
                calendarColor: '',
                selectedCalendar: [],
                delCalendarInfo: '',
                meetingRomeShow: false,
                calendarList: [
                    {
                        name: '艺人日历',
                        id: 1,
                        color: '#FB8C00'
                    },
                    {
                        name: '个人日历',
                        id: 2,
                        color: '#E53935'
                    },
                    {
                        name: '公告日历',
                        id: 3,
                        color: '#8E25AA'
                    },
                    {
                        name: '某某日程',
                        id: 4,
                        color: '#546E7A'
                    },
                ]
            }
        },

        mounted() {
            this.getStars();
            let _this = this;
            $('#addCalendar').on('hidden.bs.modal', function () {
                _this.$store.dispatch('changeParticipantsInfo', {data: []});
            });
            $('#addSchedule').on('hidden.bs.modal', function () {
                _this.$store.dispatch('changeParticipantsInfo', {data: []});
            })
        },

        methods: {

            getClients: function () {
                fetch('get', '/clients').then(function (response) {
                    console.log(response)
                })
            },

            getStars: function () {
                let _this = this;
                fetch('get', '/stars/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.starsArr.push({
                            value: response.data[i].id,
                            name: response.data[i].name
                        })
                    }
                })
            },

            addSchedule: function () {

            },

            changeStartTime: function (value) {
                this.startTime = value
            },

            changeStartMinutes: function (value) {
                this.startMinutes = value
            },

            changeEndTime: function (value) {
                this.endTime = value
            },

            changeEndMinutes: function (value) {
                this.endMinutes = value
            },

            changeIsAllDay: function (value) {
                console.log(value)
            },

            changeParticipantVisible: function (value) {
                console.log(value)
            },

            isShowMore: function () {
                this.showMore = !this.showMore
            },

            addCalendar: function () {

            },

            participantChange: function () {

            },

            changeCalendarColor: function (value) {
                this.checkColor = value;
            },

            selectDate: function (value) {
                this.selectedDate = value
            },

            checkCalendar: function (value) {
                let index = this.selectedCalendar.indexOf(value);
                if (index > -1) {
                    this.selectedCalendar.splice(index, 1)
                } else {
                    this.selectedCalendar.push(value)
                }
            },

            editCalendar: function () {

            },

            selectAllCalendar: function (e) {
                this.selectedCalendar = [];
                if (e.target.checked) {
                    for (let i = 0; i < this.calendarList.length; i++) {
                        this.selectedCalendar.push(this.calendarList[i].id)
                    }
                }
            },

            delCalendar: function (calendar) {
                this.delCalendarInfo = calendar
            },

            deleteCalendar: function () {
                toastr.success('删除成功');
                $('#delModel').modal('hide')
            },

            checkMeetingRoom: function () {
                this.meetingRomeShow = true
            },

            displayMeetingRoom: function (value) {
                console.log(value)
                this.meetingRomeShow = false
            }


        }
    }
</script>

<style>
    li {
        list-style: none;
    }

    .calendar-color-list li {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin-right: 10px;
    }

    .calendar-color-list li i {
        line-height: 20px;
        color: white;
        text-align: center;
        position: absolute;
        left: 5px;
    }

    .calendar-checkbox {
        width: 20px;
        height: 20px;
        border-radius: 2px;
    }

    .calendar-title {
        padding: 20px 20px 10px;
    }

    .calendar-list ul li {
        padding: 7px 0;
        border-bottom: 1px solid #E0E0E0;
    }

    .calendar-list ul {
        padding: 0 20px;
        margin-top: 10px;
    }

    .calendar-list ul li .calendar-checkbox i {
        color: white;
        text-align: center;
        left: 5px;
    }
    .page-main{
        background-color:#f3f4f5 !important;
    }

</style>
