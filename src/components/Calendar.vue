<template>
    <div class="calendar-container">
        <div id="calendar"></div>
    </div>
</template>

<script>
    import fetch from '../assets/utils/fetch.js'

    export default {
        props: ['calendars', 'gotoDate'],
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
            calendars: function (newValue) {
                // console.log(newValue);
                // $(this.$el).fullCalendar('refetchEvents')
            },
        },
        mounted() {
            let self = this;

            $(this.$el).fullCalendar({
                header: {
                    right: 'prev,next today',
                    center: 'title',
                    left: 'month,agendaWeek,agendaDay'
                },
                defaultView: 'month', //设置默认显示月，周，日
                navLinks: true,
                editable: true,
                eventLimit: true,
                firstDay: 1,
                monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                allDayText: '全天',
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
                    this.startTime = start._d;
                    this.endTime = start._d;
                    self.startDate = `${start._d.getFullYear()}-${start._d.getMonth() + 1}-${start._d.getDate()}`;
                    self.endDate = `${end._d.getFullYear()}-${end._d.getMonth() + 1}-${end._d.getDate()}`;
                    let data = {
                        calendar_ids: self.calendars,
                        start_date: self.startDate,
                        end_date: self.endDate,
                        include: 'calendar'
                    };
                    fetch('get', '/schedules', data).then(response => {
                        self.allScheduleInfo = response.data;
                        let events = [];
                        for (let i = 0; i < response.data.length; i++) {
                            events.push({
                                title: response.data[i].title,
                                start: response.data[i].start_at,
                                end: response.data[i].end_at,
                                color: response.data[i].calendar.data.color,
                                allDay: response.data[i].is_allday,
                                id: response.data[i].id,
                            })
                        }
                        callback(events)
                    })

                },
                dayClick: function (date, allDay, jsEvent) {
                    $('#addSchedule').modal('show')
                },
                eventClick: function (event, jsEvent, view) {
                    let data = self.allScheduleInfo.find(item => item.id === event.id);
                    self.$emit('scheduleClick', data)
                },
            });

        },
        methods: {}
    }
</script>

<style>


</style>