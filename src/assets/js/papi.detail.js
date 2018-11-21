import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';
import store from '../store/index.js';

let app = new Vue({
        el: '#root',
        store,
        data: {
            artistId: '',
            artistInfo: '',
            artistWorkProportion: '',
            yesOrNoArr: config.yesOrNoArr,
            videoUrl: '',
            artistWorksInfo: [],
            taskTypeArr: config.taskTypeArr,
            taskName: '',
            taskLevelArr: config.taskLevelArr,
            taskType: '',
            taskLevel: '',
            startTime: '',
            startMinutes: '00:00',
            endTime: '',
            endMinutes: '00:00',
            taskIntroduce: '',
            artistWorkName: '',
            isEdit: false,
            papiCommunicationStatusArr: config.papiCommunicationStatusArr
        },

        mounted() {
            this.getArtist()
        },

        methods: {
            getArtist: function () {
                this.artistId = Tool.getParameterByName('artist_id');

                let data = {
                    include: 'creator,tasks,affixes,producer,type',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/bloggers/' + this.artistId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.artistInfo = response.data;
                })
            },

            getArtistProjects: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars/' + this.artistId,
                    headers: config.getHeaders(),
                }).done(function (response) {
                    app.artistProjectsInfo = response.data;
                })
            },

            getArtistTasks: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars/' + this.artistId,
                    headers: config.getHeaders(),
                }).done(function (response) {
                    app.artistTasksInfo = response.data;
                })
            },

            getArtistWorks: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars/' + this.artistId,
                    headers: config.getHeaders(),
                }).done(function (response) {
                    app.artistWorksInfo = response.data;
                })
            },

            addPrivacy: function () {

            },

            editBaseInfo: function () {
                app.isEdit = true;
                app.changeInfo = [];
            },

            cancelEdit: function () {
                app.isEdit = false
            },

            changeArtistBaseInfo: function () {

            },


            changeWorkAd: function () {

            },

            addWork: function () {

            },

            addTask: function () {

            },

            changeTaskType: function (value) {
                app.taskType = value
            },

            principalChange: function (value) {

            },

            participantChange: function (value) {

            },

            changeTaskLevel: function (value) {
                app.taskLevel = value
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

            changeWorkReleaseTime: function (value) {
                app.workReleaseTime = value
            },

            changArtistName: function (value) {
                app.artistInfo.name = value
            },

            changeArtistCommunication: function (value) {
                app.artistInfo.communication_status = value
            },

            changeArtistIntention: function (value) {
                app.artistInfo.intention = value
            },

            changeArtistSignStatus: function (value) {
                app.artistInfo.sign_contract_other = value
            },

            changeArtistDesc: function (value) {
                app.artistInfo.desc = value
            },


        }
    })
;