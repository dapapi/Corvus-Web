<template>
    <div class="page-content container-fluid" style="border-left:1px solid #e3e3e3">
        <div class="panel col-md-12 py-5 clearfix px-0 mb-0">
        <div class="float-left p-0" style="width: 100%">
            <calendar :gotoDate="selectedDate" v-show="!meetingRomeShow"></calendar>
            <MeetingRoomCalendar v-show="meetingRomeShow" @change="displayMeetingRoom"></MeetingRoomCalendar>
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
    .panel{
        box-shadow: 0 0 0 0;
    }

</style>