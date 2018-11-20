import config from "./config";
import redirect from "./bootstrap";
import store from '../store/index.js';

let app = new Vue({
        el: '#root',
        store,
        data: {
            scheduleName: '',
            startTime: '',
            startMinutes: '00:00',
            endTime: '',
            endMinutes: '00:00',
            remindArr: config.remindArr,
            meetingRomeArr: config.meetingRomeArr,
            repeatArr: config.repeatArr,
            visibleRangeArr: config.visibleRangeArr,
            showMore: false,
            eventPlace: '',
            eventDesc: '',
            starsArr: [],
        },

        mounted() {
            this.getStars();
        },

        methods: {

            getClients: function () {


                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response)
                })
            },

            getStars: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars/all',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        app.starsArr.push({
                            value: response.data[i].id,
                            name: response.data[i].name
                        })
                    }
                })
            },

            addSchedule: function () {

            },

            changeStartTime: function (value) {
                app.startTime = value
            },

            changeStartMinutes: function (value) {
                app.startMinutes = value
            },

            changeEndTime: function (value) {
                app.endTime = value
            },

            changeEndMinutes: function (value) {
                app.endMinutes = value
            },

            changeIsAllDay: function (value) {
                console.log(value)
            },

            changeParticipantVisible: function (value) {
                console.log(value)
            },

            isShowMore: function () {
                app.showMore = !app.showMore
            },

            addCalendar: function () {

            },

            participantChange: function () {

            }


        }

    })
;