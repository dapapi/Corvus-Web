<template>
    <div class="calendar-container">
        <div id="calendar"></div>
    </div>
</template>

<script>
    import fetch from '../assets/utils/fetch.js'
    //isModel ===true  调用接口/schedules/all 艺人和博主都用这个接口 
    export default {
        props: ['calendars', 'gotoDate', 'meetingRomeList', 'isMeeting', 'isModel', 'calendarView', 'showToast'],
        data() {
            return {
                startDate: '', //获取开始时间
                endDate: '',  //获取结束时间
                allScheduleInfo: '',
                defaultView: 'month',
                firstClickTime: 0,
                clickDate: '',
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
            },
            calendarView: function (newValue) {
                this.changeView(newValue)
            }
        },
        created() {
            if (this.calendarView) {
                this.defaultView = this.calendarView
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
                defaultView: self.defaultView, //设置默认显示月，周，日
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
                nextDayThreshold: '00:00:00',
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
                    if (!meetingRomeList) {
                        meetingRomeList = [];
                    }
                    if (self.isModel) {
                        url = '/schedules/all'
                        if (self.calendars.length === 0) {
                            return
                        }
                    } else {
                        if (meetingRomeList.length === 0) {
                            url = '/schedules/list'
                        } else {
                            url = '/schedules'
                        }
                    }

                    let data = {
                        start_date: self.startDate,
                        end_date: self.endDate,
                        include: 'calendar'
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

                    fetch('get', url, data).then(response => {
                        self.allScheduleInfo = response.data;
                        let events = [];
                        for (let i = 0; i < response.data.length; i++) {
                            if (response.data[i].is_allday) {
                                let end_at = response.data[i].end_at.split(' ')[0].split('-');
                                end_at[2] = Number(end_at[2]) + 1;
                                if (end_at[2] < 10) {
                                    end_at[2] = '0' + end_at[2]
                                }
                                response.data[i].end_at = end_at.join('-') + ' 00:00'
                            }
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

                },
                dayClick: function (date, allDay, jsEvent) {
                    let currentDate = new Date();
                    let currentClickTime = currentDate.getTime();
                    let formatDate = self.timeReformat(date._d);
                    let flag = self.firstClickTime;
                    self.clickDate = formatDate;
                    self.firstClickTime = currentClickTime;
                    if (currentClickTime - flag < 500) {
                        let now = new Date();
                        let hour = now.getHours();
                        let minutes = now.getMinutes();
                        let remainder = minutes % 10;
                        let start_minutes = minutes;
                        let start_hour = hour;
                        let end_minutes = '';
                        let end_hour = hour;
                        if (remainder) {
                            start_minutes = start_minutes - remainder + 10;
                            if (start_minutes === 60) {
                                start_minutes = 0;
                                start_hour += 1;
                                end_hour += 1;
                            }
                        }
                        if (start_minutes < 30) {
                            end_minutes = start_minutes + 30
                        } else {
                            end_minutes = start_minutes + 30 - 60;
                            end_hour += 1
                        }
                        let alreadyRemainder = false;
                        if (start_hour >= 24) {
                            start_hour -= 24;
                            formatDate = self.addOneDay(formatDate);
                            alreadyRemainder = true;
                        }
                        let endDay = formatDate;
                        let increment = false;
                        if (end_hour >= 24) {
                            end_hour -= 24;
                            if (!alreadyRemainder) {
                                increment = true;
                            }
                        }
                        // 处理日期
                        formatDate = self.timeJudgment(formatDate);
                        if (increment) {
                            endDay = self.timeJudgment(self.addOneDay(endDay));
                        }
                        let formatTime = {
                            start_day: formatDate,
                            end_day: endDay,
                            start_time: (start_hour + ',' + start_minutes).split(','),
                            end_time: (end_hour + ',' + end_minutes).split(','),
                        };
                        self.$emit('dayClick', formatTime);
                    } else {
                        setTimeout(() => {
                            self.$emit('showToast', allDay.pageX, allDay.pageY)
                        }, 200)
                    }
                },
                eventClick: function (event, jsEvent, view) {
                    let data = self.allScheduleInfo.find(item => item.id === event.id);
                    self.$emit('scheduleClick', data)
                },
                eventMouseover: function (event, jsEvent, view) {
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
            },

            timeJudgment(value) {
                value = value.split('-');
                for (let i = 0; i < value.length; i++) {
                    value[i] = Number(value[i])
                }
                let lastDay = new Date(value[0], value[1], 0).getDate();
                if (value[2] > lastDay) {
                    value[2] -= lastDay;
                    if (value[2] === 0) {
                        value[2] = 1;
                    }
                    value[1] += 1;
                    if (value[1] > 12) {
                        value[1] = value[1] - 12;
                        value[0] += 1;
                    }
                }
                if (value[1] < 10) {
                    value[1] = '0' + value[1]
                }
                if (value[2] < 10) {
                    value[2] = '0' + value[2]
                }
                return value.join('-');
            },

            addOneDay(value) {
                value = value.split('-');
                value[2] = Number(value[2]) + 1;
                if (value[2] < 10) {
                    value[2] = '0' + value[2]
                }
                return value.join('-')
            }
        }
    }
</script>

<style>

    .fc-button.fc-state-active, .fc-button.fc-state-hover {
        background-color: #e5e5e5;
    }

    .fc-button.fc-prev-button, .fc-button.fc-next-button {
        background-color: #fff;
    }

</style>