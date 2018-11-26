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
                    <button type="button" class="fc-prev-button fc-button fc-state-default fc-corner-left"><span
                            class="fc-icon fc-icon-left-single-arrow"></span></button>
                    <button type="button" class="fc-next-button fc-button fc-state-default fc-corner-right"><span
                            class="fc-icon fc-icon-right-single-arrow"></span></button>
                </div>
                <button type="button"
                        class="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-disabled"
                        disabled="">今天
                </button>
            </div>
            <div class="fc-center"><h2>2018年 11月 26日</h2></div>
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
                                                        <div class="fc-event-container"></div>
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
    export default {
        name: "MeetingRoomCalendar",
        data() {
            return {
                meetingRomeList: [
                    {
                        name: '会议室1',
                        id: 1,
                    },
                    {
                        name: '会议室2',
                        id: 2,
                    },
                    {
                        name: '会议室3',
                        id: 3,
                    },
                    {
                        name: '会议室4',
                        id: 4,
                    },
                    {
                        name: '会议室5',
                        id: 5,
                    },
                    {
                        name: '会议室6',
                        id: 6,
                    },
                    {
                        name: '会议室7',
                        id: 7,
                    },
                    {
                        name: '会议室8',
                        id: 8,
                    },
                    {
                        name: '会议室9',
                        id: 9,
                    },
                    {
                        name: '会议室10',
                        id: 10,
                    },
                    {
                        name: '会议室10',
                        id: 10,
                    },
                    {
                        name: '会议室10',
                        id: 10,
                    },
                    {
                        name: '会议室10',
                        id: 10,
                    },
                    {
                        name: '会议室10',
                        id: 10,
                    },
                    {
                        name: '会议室10',
                        id: 10,
                    },


                ]
            }
        },

        methods: {
            displayMeetingRoom(value) {
                this.$emit('change', value)
            }
        }
    }
</script>

<style scoped>

</style>