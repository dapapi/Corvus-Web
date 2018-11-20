import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';
import store from '../store/index.js';


let app = new Vue({
        el: '#root',
        store,
        data: {
            taskId: '',
            changeInfo: {},
            isEdit: false,
            projectInfo: '',
            trailInfo: {},
            taskTypeArr: config.taskTypeArr,
            taskLevelArr: config.taskLevelArr,
            taskLevel: '',
            taskName: '',
            startTime: '',
            endTime: '',
            startMinutes: '00:00',
            endMinutes: '00:00',
            taskIntroduce: '',
            projectTasksInfo: [],

        },

        mounted() {
            this.getProject()
        },

        watch: {},

        methods: {

            getProject: function () {
                this.projectId = Tool.getParameterByName('project_id');

                let data = {
                    include: 'principal',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/projects/' + this.projectId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.projectInfo = response.data
                })
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
                    app.projectTasksInfo.push(response.data)

                })

            },

            addPrivacy: function () {

            },

            editBaseInfo: function () {

            },

            changeProjectBaseInfo: function () {

            },

            cancelEdit: function () {
                app.isEdit = false;
                app.changeInfo = {};
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

            changeEndMinutes: function (value) {
                app.endMinutes = value
            },

            changeEndTime: function (value) {
                app.endTime = value
            },


        }

    })
;