import config from "./config";
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
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
                this.taskStatus = 0;
                let data = {
                    page: pageNum,
                    include: 'principal,pTask,tasks,resource.resourceable,resource.resource,participants',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/my_all',
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.tasksInfo = response.data;
                    app.current_page = response.meta.pagination.current_page;
                    app.total = response.meta.pagination.total;
                    app.total_pages = response.meta.pagination.total_pages;
                })
            },

            getMyTasks: function (pageNum = 1, status = null) {
                if (status) {
                    app.taskStatus = status
                }

                let data = {
                    page: pageNum,
                    include: 'principal,pTask,tasks,resource.resourceable,resource.resource,participants',
                    status: app.taskStatus
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/my',
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.tasksInfo = response.data;
                    app.current_page = response.meta.pagination.current_page;
                    app.total = response.meta.pagination.total;
                    app.total_pages = response.meta.pagination.total_pages;
                })
            },

            addTask: function () {
                let data = {
                    // resource_id: '1718463094',
                    // resourceable_id: '1994731356',
                    title: app.taskName,
                    // type: app.taskType,
                    principal_id: app.principal,
                    priority: app.taskLevel,
                    start_at: app.startTime + ' ' + app.startMinutes,
                    end_at: app.endTime + ' ' + app.endMinutes,
                    desc: app.taskIntroduce,
                    participant_ids: app.participants
                };
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/tasks',
                    headers: config.getHeaders(),
                    data: data
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

            changeEndTime: function (value) {
                app.endTime = value
            },

            redirectTaskDetail: function (taskId) {
                redirect('detail?task_id=' + taskId);
            }
        }

    })
;