import config from "./config";
import redirect from './bootstrap';
import store from '../store/index.js';

let app = new Vue({
        el: '#root',
        store,
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            memberPlaceholder: '请选择负责人',
            participants: [],
            multiple: false,
            taskIntroduce: '',
            startTime: '',
            startMinutes: '00:00',
            endTime: '',
            endMinutes: '00:00',
            tasksInfo: '',
            taskStatus: 0,
            newTask: {},
            taskType: '',
            taskFinishType: '',
            taskName: '',
            taskLevel: '',
            taskLevelArr: config.taskLevelArr,
            taskTypeArr: config.taskTypeArr,
            customizeInfo: config.customizeInfo,

        },

        mounted() {
            this.getTasks()
        },

        methods: {

            getTasks: function (pageNum = 1) {
                let data = {
                    page: pageNum,
                    include: 'principal,pTask,tasks,resource.resourceable,resource.resource,participants',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/my_all',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    app.tasksInfo = response.data;
                    app.current_page = response.meta.pagination.current_page;
                    app.total = response.meta.pagination.total;
                    app.total_pages = response.meta.pagination.total_pages;
                })
            },

            getMyTasks: function (pageNum = 1, type = null) {
                if (type) {
                    app.taskFinishType = type
                }

                let data = {
                    page: pageNum,
                    include: 'principal,pTask,tasks,resource.resourceable,resource.resource,participants',
                    type: app.taskFinishType,
                    status: 0
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/my',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    app.tasksInfo = response.data;
                    app.current_page = response.meta.pagination.current_page;
                    app.total = response.meta.pagination.total;
                    app.total_pages = response.meta.pagination.total_pages;
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
                    redirect('detail?task_id=' + response.data.id)
                })
            },

            customize: function (value) {
                console.log(value)
            },

            changeLinkage: function (value) {
                console.log(value)
            },

            changeTaskType: function (value) {
                app.taskType = value
            },

            principalChange: function (value) {
                app.principal = value
            },

            participantChange: function (value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id)
                }
                app.participants = flagArr
            },

            changeTaskLevel: function (value) {
                app.taskLevel = value
            },

            changeStartTime: function (value) {
                app.startTime = value
            },

            changeStartMinutes: function (value) {
                console.log(value);
                app.startMinutes = value
            },

            changeEndTime: function (value) {
                app.endTime = value
            },

            changeEndMinutes: function (value) {
                app.endMinutes = value
            },

            redirectTaskDetail: function (taskId) {
                redirect('detail?task_id=' + taskId);
            }
        }

    })
;