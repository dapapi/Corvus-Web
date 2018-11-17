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
            taskTypeArr: config.taskTypeArr,
            taskLevelArr: config.taskLevelArr,
            taskType: '',
            taskName: '',
            taskLevel: '',
            startTime: '',
            startMinutes: '00:00',
            endTime: '',
            endMinutes: '00:00',
            taskIntroduce: '',
            artistTasksInfo: [],
            artistWorksInfo: [],
            artistProjectsInfo: '',
            artistWorkName: '',
            workReleaseTime: '',
            workTypeArr: config.workTypeArr,
            workType: '',
            character: '',
            coActor: '',
            isEdit: '',
            genderArr: config.genderArr,
            artistDesc: '',
            artistSourceArr: config.artistSourceArr,
            taiyangCommunicationStatusArr: config.taiyangCommunicationStatusArr,
            yesOrNoArr: config.yesOrNoArr,


        },

        mounted() {
            this.getArtist()
        },

        methods: {
            getArtist: function () {
                this.artistId = Tool.getParameterByName('artist_id');

                let data = {
                    include: 'broker,creator,tasks,affixes',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars/' + this.artistId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
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

            addTask: function () {
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }
                let data = {
                    // resource_type: '1718463094',
                    // resourceable_id: '1994731356',
                    // type: app.taskType,
                    // @todo 任务类型前端维护
                    title: app.taskName,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    priority: app.taskLevel,
                    start_at: app.startTime + ' ' + app.startMinutes,
                    end_at: app.endTime + ' ' + app.endMinutes,
                    desc: app.taskIntroduce
                };
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/tasks',
                    headers: config.getHeaders(),
                    data: data,
                    statusCode: {
                        400: function (response) {
                            toastr.error(response.responseJSON.message);
                        },
                    }
                }).done(function (response) {
                    console.log(response);
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    app.artistTasksInfo.push(response.data)

                })
            },

            addWork: function () {
                let data = {};

                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/tasks',
                    headers: config.getHeaders(),
                    data: data,
                    statusCode: {
                        400: function (response) {
                            toastr.error(response.responseJSON.message);
                        },
                    }
                }).done(function (response) {
                    console.log(response);
                    toastr.success('新增成功');
                    $('#addWork').modal('hide');
                    app.artistWorksInfo.push(response.data)

                })
            },

            addPrivacy: function () {

            },

            changeWorkReleaseTime: function (value) {
                app.workReleaseTime = value
            },

            changeWorkType: function (value) {
                app.workType = value
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

            changArtistName: function (value) {
                app.artistInfo.name = value
            },

            changeArtistGender: function (value) {
                app.artistInfo.gender = value
            },

            changeArtistDesc: function (value) {
                app.artistInfo.desc = value
            },

            changeArtistSource: function (value) {
                app.artistInfo.source = value
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

            changeArtistPhone: function (value) {
                app.artistInfo.phone = value
            },

            changeArtistWeixin: function (value) {
                app.artistInfo.wechat = value
            },

            changeArtistEmail: function (value) {
                app.artistInfo.email = value
            },

        }
    })
;