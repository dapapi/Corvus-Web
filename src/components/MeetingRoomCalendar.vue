<template>
    <div class="calendar-container calendar-material">
        <div class="fc-toolbar fc-header-toolbar">
            <div class="fc-left">
                <div class="fc-button-group">
                    <button type="button" class="fc-month-button fc-button fc-state-default fc-corner-left"
                            @click="displayMeetingRoom('month')">月
                    </button>
                    <button type="button" class="fc-agendaWeek-button fc-button fc-state-default"
                            @click="displayMeetingRoom('agendaWeek')">周
                    </button>
                    <button type="button"
                            class="fc-agendaDay-button fc-button fc-state-default fc-corner-right fc-state-active">日
                    </button>

                    <span class="ml-4 hover-content pointer-content" @click="returnNormalCalendar">回到日历</span>
                </div>
            </div>
            <div class="fc-right">
                <div class="fc-button-group">
                    <button type="button" class="fc-prev-button fc-button fc-state-default fc-corner-left"
                            @click="getBeforeDay"><span
                            class="fc-icon fc-icon-left-single-arrow"></span></button>
                    <button type="button" class="fc-next-button fc-button fc-state-default fc-corner-right"
                            @click="getNextDay"><span
                            class="fc-icon fc-icon-right-single-arrow"></span></button>
                </div>
                <button type="button"
                        class="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right"
                        :class="currentDate == numberDate? 'fc-state-disabled' : ''"
                        @click="getCurrentDay" :disabled="currentDate == numberDate">今天
                </button>
            </div>
            <div class="fc-center"><h2>{{ date }}</h2></div>
            <div class="fc-clear"></div>
        </div>
        <div id="calendar" class="mt-40">
            <div v-for="material in meetingRomeListInfo">
                <template v-if="material.events">
                    <h5 style="border-bottom: 1px solid #e3e3e3" class="pb-20">{{ material.name }}</h5>
                    <div v-for="event in material.events" class="example">
                        <div class="col-md-2 float-left pl-0">{{ event.start }} - {{ event.end }}</div>
                        <div class="col-md-8 float-left">{{ event.title }}</div>
                        <div class="col-md-2 float-right text-right pr-0">{{ event.creator }}</div>
                    </div>
                </template>
            </div>
            <div class="col-md-2" style="margin: 10rem auto" v-if="!isNothing">
                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                     style="width: 100%">
            </div>
        </div>
    </div>
</template>

<script>
    import fetch from '../assets/utils/fetch.js'

    export default {
        name: "MeetingRoomCalendar",
        props: ['meetingRomeList'],
        data() {
            return {
                numberDate: '',
                currentDate: '',
                meetingRomeListInfo: [],
                isNothing: false,
            }
        },

        mounted() {
            this.getCurrentDay()
        },

        computed: {
            date: function () {
                let dateArr = this.numberDate.split('-');
                return dateArr[0] + '年  ' + dateArr[1] + '月  ' + dateArr[2] + '日';
            },
        },

        watch: {
            meetingRomeList(newValue) {
                if (newValue) {
                    this.getSchedules();
                }
            }
        },

        methods: {
            displayMeetingRoom(value) {
                this.$emit('change', value)
            },

            setDate(value) {
                this.numberDate = value;
            },

            getSchedules(date) {
                if (!this.meetingRomeList) {
                    return
                }
                let materialsIds = [];
                for (let i = 0; i < this.meetingRomeList.length; i++) {
                    materialsIds.push(this.meetingRomeList[i].id)
                }
                let data = {
                    material_ids: materialsIds,
                    include: 'calendar,participants,creator,material'
                };
                if (!date) {
                    if (this.currentDate !== this.numberDate) {
                        data.start_date = this.numberDate;
                        data.end_date = this.numberDate;
                    } else {
                        data.start_date = this.currentDate;
                        data.end_date = this.currentDate;
                    }
                } else {
                    data.start_date = date;
                    data.end_date = date;
                }
                fetch('get', '/schedules', data).then(response => {
                    this.meetingRomeListInfo = [];
                    for (let i = 0; i < response.data.length; i++) {
                        let start_time = response.data[i].start_at.split(' ')[1];
                        let end_time = response.data[i].end_at.split(' ')[1];
                        start_time = start_time.split(':')[0] + ':' + start_time.split(':')[1];
                        end_time = end_time.split(':')[0] + ':' + end_time.split(':')[1];
                        let event = {
                            title: response.data[i].title,
                            start: start_time,
                            end: end_time,
                            color: response.data[i].calendar.data.color,
                            allDay: !!response.data[i].is_allday,
                            id: response.data[i].id,
                            creator: response.data[i].creator.data.name
                        };
                        let material = JSON.parse(JSON.stringify(this.meetingRomeList.find(item => item.id == response.data[i].material.data.id)));
                        if (material.events) {
                            material.events.push(event)
                        } else {
                            material.events = [event];
                        }
                        this.meetingRomeListInfo.push(material);
                    }
                    this.isNothing = response.data.length;
                })
            },

            getCurrentDay() {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                this.currentDate = year + '-' + month + '-' + strDate;
                this.numberDate = year + '-' + month + '-' + strDate;
                this.getSchedules()
            },

            getBeforeDay() {
                let d = this.numberDate;
                d = new Date(d);
                d = +d - 1000 * 60 * 60 * 24;
                d = new Date(d);
                let year = d.getFullYear();
                let mon = d.getMonth() + 1;
                let day = d.getDate();
                this.numberDate = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
                this.getSchedules(this.numberDate)
            },

            getNextDay() {
                let d = this.numberDate;
                d = new Date(d);
                d = +d + 1000 * 60 * 60 * 24;
                d = new Date(d);
                this.numberDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                this.getSchedules(this.numberDate)
            },

            returnNormalCalendar() {
                this.$emit('return', true)
            }
        }
    }
</script>

<style>
    .calendar-material {
        height: calc(100vh - 72px - 60px);
    }
</style>