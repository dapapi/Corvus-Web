<template>
    <div class="calendar-container fc fc-unthemed fc-ltr">
        <div class="fc-toolbar fc-header-toolbar">
            <div class="fc-left">
                <div class="fc-button-group">
                    <button type="button" class="fc-month-button fc-button fc-state-default fc-corner-left"
                            @click="displayMeetingRoom('month')">月
                    </button>
                    <button type="button" class="fc-agendaWeek-button fc-button fc-state-default"
                            @click="displayMeetingRoom('week')">周
                    </button>
                    <button type="button"
                            class="fc-agendaDay-button fc-button fc-state-default fc-corner-right fc-state-active">日
                    </button>
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
        <div class="fc-view-container" style="overflow: scroll">
            <div class="fc-view fc-agendaWeek-view fc-agenda-view">
                <table style="min-width: 100%;width: auto;">
                    <thead class="fc-head">
                    <tr>
                        <td class="fc-head-container fc-widget-header">
                            <div class="fc-row fc-widget-header" style="margin-right: 14px;">
                                <table>
                                    <thead>
                                    <tr>
                                        <th class="fc-axis fc-widget-header" style="width: 36px;"></th>
                                        <th class="fc-day-header fc-widget-header fc-mon" style="width: 100px"
                                            v-for="meetingRome in meetingRomeList"><a
                                                data-goto="{&quot;date&quot;:&quot;2018-11-26&quot;,&quot;type&quot;:&quot;day&quot;}">{{
                                            meetingRome.name }}</a>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </td>
                    </tr>
                    </thead>
                    <tbody class="fc-body">
                    <tr>
                        <td class="fc-widget-content">
                            <div class="fc-day-grid fc-unselectable">
                                <div class="fc-row fc-week fc-widget-content"
                                     style=" margin-right: 14px;">
                                    <div class="fc-bg">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td class="fc-axis fc-widget-content" style="width: 36px;">
                                                    <span>全天</span></td>
                                                <td class="fc-day fc-widget-content fc-sun fc-future"
                                                    style="width: 101px"
                                                    v-for="meetingRome in meetingRomeList"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="fc-content-skeleton">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td class="fc-axis" style="width: 36px;"></td>
                                                <td v-for="meetingRome in meetingRomeList" style="width: 100px"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <hr class="fc-divider fc-widget-header">
                            <div class="fc-scroller fc-time-grid-container"
                                 style="height: 607px;">
                                <div class="fc-time-grid fc-unselectable">
                                    <div class="fc-bg">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td class="fc-axis fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-day fc-widget-content fc-sun fc-future"
                                                    v-for="meetingRome in meetingRomeList" style="width: 100px"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="fc-slats">
                                        <table>
                                            <tbody>
                                            <tr data-time="00:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>12am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="00:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="01:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>1am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="01:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="02:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>2am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="02:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="03:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>3am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="03:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="04:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>4am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="04:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="05:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>5am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="05:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="06:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>6am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="06:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="07:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>7am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="07:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="08:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>8am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="08:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="09:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>9am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="09:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="10:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>10am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="10:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="11:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>11am</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="11:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="12:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>12pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="12:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="13:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>1pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="13:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="14:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>2pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="14:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="15:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>3pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="15:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="16:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>4pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="16:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="17:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>5pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="17:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="18:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>6pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="18:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="19:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>7pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="19:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="20:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>8pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="20:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="21:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>9pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="21:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="22:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>10pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="22:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="23:00:00">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;">
                                                    <span>11pm</span></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            <tr data-time="23:30:00" class="fc-minor">
                                                <td class="fc-axis fc-time fc-widget-content" style="width: 36px;"></td>
                                                <td class="fc-widget-content"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr class="fc-divider fc-widget-header" style="display:none">
                                    <div class="fc-content-skeleton">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td class="fc-axis" style="width: 36px;"></td>
                                                <td v-for="meetingRome in meetingRomeList" style="width: 100px">
                                                    <div class="fc-content-col">
                                                        <div class="fc-event-container fc-helper-container"></div>
                                                        <div class="fc-event-container">
                                                            <a class="fc-time-grid-event fc-v-event fc-event fc-start fc-end fc-draggable fc-resizable"
                                                               style="top: 449px; bottom: -539px; z-index: 1; left: 0%; right: 0%; margin-right: 20px;background-color: red;border: red">
                                                                <div class="fc-content">
                                                                    <div class="fc-time" data-start="10:00"
                                                                         data-full="10:00 AM"><span>10:00</span></div>
                                                                    <div class="fc-title">Repeating Event</div>
                                                                </div>
                                                                <div class="fc-bg"></div>
                                                                <div class="fc-resizer fc-end-resizer"></div>
                                                            </a>
                                                        </div>
                                                        <div class="fc-highlight-container"></div>
                                                        <div class="fc-bgevent-container"></div>
                                                        <div class="fc-business-container"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="calendar"></div>
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
            }
        },

        mounted() {
            this.getCurrentDay()
        },

        computed: {
            date: function () {
                let dateArr = this.numberDate.split('-');
                return dateArr[0] + '年  ' + dateArr[1] + '月  ' + dateArr[2] + '日';
            }
        },

        watch: {
            meetingRomeList(newValue) {
                this.getSchedules();
            }
        },

        methods: {
            displayMeetingRoom(value) {
                this.$emit('change', value)
            },

            setDate(value) {
                this.numberDate = value;
            },

            getSchedules() {
                let materialsIds = [];
                for (let i = 0; i < this.meetingRomeList.length; i++) {
                    materialsIds.push(this.meetingRomeList[i].id)
                }
                let data = {
                    material_ids: materialsIds,
                    start_at: this.currentDate,
                    end_at: this.currentDate,
                };
                fetch('get', '/schedules', data).then(response => {
                    // self.allScheduleInfo = response.data;
                    // let events = [];
                    // for (let i = 0; i < response.data.length; i++) {
                    //     events.push({
                    //         title: response.data[i].title,
                    //         start: response.data[i].start_at,
                    //         end: response.data[i].end_at,
                    //         color: response.data[i].calendar.data.color,
                    //         allDay: !!response.data[i].is_allday,
                    //         id: response.data[i].id,
                    //     })
                    // }
                    // callback(events)
                    console.log(response)
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
            },

            getNextDay() {
                let d = this.numberDate;
                d = new Date(d);
                d = +d + 1000 * 60 * 60 * 24;
                d = new Date(d);
                this.numberDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

            }
        }
    }
</script>

<style scoped>

</style>