<template>
    <div class="calendar-container">
        <div id="calendar"></div>
    </div>
</template>

<script>
    import fetch from '../assets/utils/fetch.js'
    //isModel ===true  调用接口/schedules/all
    export default {
        props: ['calendars', 'gotoDate', 'meetingRomeList', 'isMeeting', 'isModel'],
        data() {
            return {
                startDate: '', //获取开始时间
                endDate: '',  //获取结束时间
                allScheduleInfo: '',
            }
        },
        watch: {
            gotoDate: function (newValue) {
                $(this.$el).fullCalendar('gotoDate', newValue)
            },
            startDate: function () {
                this.$emit('changeTime', this.startDate, this.startDate)
            },
            endDate: function () {
                this.$emit('changeTime', this.startDate, this.endDate)
            },
            calendars: function () {
                this.refresh();
            },
            meetingRomeList: function () {
                this.refresh();
            }
        },
        mounted() {
            let self = this;
            if (!this.calendars) {
                this.calendars = [];
            }
            $(this.$el).fullCalendar({
                header: {
                    right: 'prev,next today',
                    center: 'title',
                    left: 'month,agendaWeek,agendaDay'
                },
                defaultView: 'month', //设置默认显示月，周，日
                navLinks: true,
                editable: false,
                eventLimit: true,
                firstDay: 1,
                monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                allDayText: '全天',
                slotLabelFormat: 'H(:mm)a',
                timeFormat: 'H:mma',
                firstHour: '0',
                buttonText: {
                    today: '今天',
                    month: '月',
                    agendaWeek: '周',
                    agendaDay: '日'
                },
                views: {
                    month: {
                        titleFormat: 'YYYY年 MM月'
                    },
                    week: {
                        titleFormat: 'YYYY年 MM月 DD日'
                    },
                    day: {
                        titleFormat: 'YYYY年 MM月 DD日'
                    }
                },
                events: function (start, end, timezone, callback) {
                    self.startDate = self.timeReformat(start._d);
                    self.endDate = self.timeReformat(end._d);
                    let meetingRomeList = self.meetingRomeList;
                    let url
                    self.isModel == true ? url = '/schedules/all' : url = '/schedules'
                    if (!meetingRomeList) {
                        meetingRomeList = [];
                    }
                    if (self.calendars.length === 0 && meetingRomeList.length === 0) {
                        callback([]);
                        return
                    }
                    let data = {
                        start_date: self.startDate,
                        end_date: self.endDate,
                        include: 'calendar,creator,material'
                    };
                    if (meetingRomeList.length > 0) {
                        let materialsIds = [];
                        for (let i = 0; i < meetingRomeList.length; i++) {
                            materialsIds.push(meetingRomeList[i].id)
                        }
                        data.material_ids = materialsIds
                    } else {
                        data.calendar_ids = self.calendars
                    }

                    if (meetingRomeList.length > 0 || self.calendars.length > 0) {
                        fetch('get', url, data).then(response => {
                            self.allScheduleInfo = response.data;
                            let events = [];
                            for (let i = 0; i < response.data.length; i++) {
                                events.push({
                                    title: response.data[i].title,
                                    start: response.data[i].start_at,
                                    end: response.data[i].end_at,
                                    color: response.data[i].calendar.data.color,
                                    allDay: !!response.data[i].is_allday,
                                    id: response.data[i].id,
                                })
                            }
                            callback(events)
                        })
                    }
                },
                dayClick: function (date, allDay, jsEvent) {
                    let formatDate = self.timeReformat(date._d);
                    self.$emit('dayClick', formatDate);
                },
                eventClick: function (event, jsEvent, view) {
                    let data = self.allScheduleInfo.find(item => item.id === event.id);
                    // console.log(data)
                    self.$emit('scheduleClick', data)
                },
                eventMouseover: function (event, jsEvent, view) {
                    // console.log(jsEvent)
                    // console.log(view)
                }
            });

            $('.fc-agendaDay-button').click(function () {
                if (self.isMeeting) {
                    self.$emit('calendarDisplay')
                }
            })
        },
        methods: {
            refresh() {
                $(this.$el).fullCalendar('refetchEvents')
            },

            timeReformat(value) {
                let day = value.getDate();
                let month = value.getMonth() + 1;
                if (Number(day) < 10) {
                    day = '0' + day;
                }
                if (Number(month) < 10) {
                    month = '0' + month;
                }
                return `${value.getFullYear()}-` + month + '-' + day
            },

            changeView(value) {
                $(this.$el).fullCalendar('changeView', value)
            }
        }
    }
</script>

<style>


</style>