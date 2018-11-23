<template>
    <div class="calendar-container">
        <div id="calendar"></div>
    </div>
</template>

<script>
    export default {
        props: ['gotoDate'],
        data() {
            return {}
        },
        watch: {
            gotoDate: function (newValue) {
                console.log(newValue);
                // newValue = newValue.split('-');
                $(this.$el).fullCalendar('gotoDate', newValue)
            }
        },
        mounted() {

            $(this.$el).fullCalendar({
                header: {
                    right: 'prev,next today',
                    center: 'title',
                    left: 'month,agendaWeek,agendaDay'
                },
                defaultView: 'agendaWeek',
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
                events: [
                    {
                        title: 'All Day Event',
                        start: '2018-10-01',
                    },
                    {
                        title: 'Long Event',
                        start: '2018-10-07',
                        end: '2018-10-10',
                        color: 'white',
                        backgroundColor: 'red',
                        textColor: 'white'

                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2018-11-19T16:00:00'
                    },
                    {
                        title: 'Repeating Event',
                        start: '2018-11-19T15:00:00'
                    },
                    {
                        title: 'Repeating Event',
                        start: '2018-11-19T14:00:00'
                    },
                    {
                        title: 'Repeating Event',
                        start: '2018-11-19T13:00:00'
                    },
                    {
                        title: 'Repeating Event',
                        start: '2018-11-19T12:00:00'
                    },
                    {
                        title: 'Repeating Event',
                        start: '2018-11-19T11:00:00'
                    },
                    {
                        title: 'Repeating Event',
                        start: '2018-11-19T10:00:00'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2018-10-16T16:00:00'
                    },
                    {
                        title: 'Conference',
                        start: '2018-10-11',
                        end: '2018-10-13'
                    },
                    {
                        title: 'Meeting',
                        start: '2018-03-12T10:30:00',
                        end: '2018-03-12T12:30:00'
                    },
                    {
                        title: 'Lunch',
                        start: '2018-03-12T12:00:00'
                    },
                    {
                        title: 'Meeting',
                        start: '2018-03-12T14:30:00'
                    },
                    {
                        title: 'Happy Hour',
                        start: '2018-03-12T17:30:00'
                    },
                    {
                        title: 'Dinner',
                        start: '2018-03-12T20:00:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2018-03-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2018-03-28'
                    }
                ],
                dayClick: function (date, allDay, jsEvent) {
                    console.log(date)
                    console.log(allDay)
                    console.log(jsEvent)
                    $('#addSchedule').modal('show')
                },
                eventClick: function (event, jsEvent, view) {
                    console.log(event)
                    console.log(jsEvent)
                    console.log(view)
                },
            });

        },
        methods: {}
    }
</script>

<style>



</style>