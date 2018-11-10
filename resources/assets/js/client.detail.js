import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            clientId: '',
            changeInfo: {},
            clientTypeArr: config.clientTypeArr,
            clientLevelArr: config.clientLevelArr,
            clientScaleArr: config.clientScaleArr,
            taskTypeArr: config.taskTypeArr,
            taskLevelArr: config.taskLevelArr,
            multiple: false,
            taskType: '',
            taskName: '',
            taskPrincipal: '',
            taskParticipant: '',
            taskIntroduce: '',
            taskStartTime: '',
            startMinutes: '00:00',
            endMinutes: '00:00',
            taskEndTime: '',
            taskLevel: '',
            isEdit: false,
            clientInfo: '',
            clientTasksInfo: [],
            clientTrailsInfo: [],
            clientContactsInfo: [],
            contactName: '',
            contactPhone: '',
            contactPosition: '',
        },

        mounted() {

            this.getClient();
            this.getClientTrail();
        },

        watch: {
            'clientInfo.company': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                app.changeInfo.company = newValue
            },
            'clientInfo.type': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                app.changeInfo.type = newValue
            },
            'clientInfo.grade': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                app.changeInfo.grade = newValue
            },
            'clientInfo.keyman': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                app.changeInfo.keyman = newValue
            },
            'clientInfo.size': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                app.changeInfo.size = newValue
            },
            'clientInfo.desc': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                app.changeInfo.desc = newValue
            },
        },

        methods: {

            getClient: function () {
                this.clientId = Tool.getParameterByName('client_id');

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/' + this.clientId,
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response)
                    app.clientInfo = response.data
                })
            },

            getClientTrail: function () {
                if (this.clientTrailsInfo.length > 0) {
                    return
                }

                this.clientId = Tool.getParameterByName('client_id');

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/trails/search',
                    headers: config.getHeaders(),
                    data: {
                        type: 'clients',
                        id: this.clientId
                    }
                }).done(function (response) {
                    app.clientTrailsInfo = response.data

                })
            },

            getClientTask: function () {
                if (this.clientTasksInfo.length > 0) {
                    return
                }
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/' + this.clientId + '/tasks',
                    headers: config.getHeaders(),
                    data: {
                        type: 'clients',
                        id: app.clientId
                    }
                }).done(function (response) {
                    app.clientTasksInfo = response.data
                })
            },

            getClientProject: function () {

            },

            getClientContact: function () {
                if (app.clientContactsInfo.length > 0) {
                    return
                }
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/' + this.clientId + '/contacts',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    app.clientContactsInfo = response.data
                })
            },

            addContact: function () {
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/clients/' + this.clientId + '/contacts',
                    headers: config.getHeaders(),
                    data: {
                        name: app.contactName,
                        phone: app.contactPhone,
                        position: app.contactPosition
                    }
                }).done(function (response) {
                    console.log(response)
                    app.clientContactsInfo.push(response.data);
                    $('#addContact').modal('hide')
                })
            },

            // TODO 地区省市级联动没有做
            changeClientBaseInfo: function () {
                $.ajax({
                    type: 'put',
                    url: config.apiUrl + '/clients/' + this.clientId,
                    headers: config.getHeaders(),
                    data: app.changeInfo
                }).done(function (response) {
                    console.log(response)
                    app.isEdit = false;
                    toastr.success('修改成功')
                })
            },

            editBaseInfo: function () {
                app.isEdit = true
            },

            cancelEdit: function () {
                app.isEdit = false
            },

            changeClientType: function (value) {
                app.clientInfo.type = value
            },

            changClientName: function (value) {
                app.clientInfo.company = value
            },

            changeClientLevel: function (value) {
                app.clientInfo.grade = value
            },

            changeClientDecision: function (value) {
                app.clientInfo.keyman = value
            },

            changeClientScale: function (value) {
                app.clientInfo.size = value
            },

            changeClientDesc: function (value) {
                app.clientInfo.desc = value
            },

            addTask: function () {
                let data = {
                    resource_type: 4,
                    resourceable_id: app.clientId,
                    title: app.taskName,
                    // type: 4,
                    principal_id: app.principal,
                    priority: app.taskLevel,
                    start_at: app.taskStartTime + ' ' + app.startMinutes,
                    end_at: app.taskEndTime + ' ' + app.endMinutes,
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
                    app.clientTasksInfo.push(response.data)
                })
            //    @todo 列表请求回来的数据为空，不知道是没添加上还是接口有问题
            },

            changeTaskType: function (value) {
                app.taskType = value
            },

            taskPrincipalChange: function (value) {
                app.taskPrincipal = value
            },

            taskParticipantChange: function (value) {
                app.taskParticipant = value
            },

            changeStartTime: function (value) {
                app.taskStartTime = value
            },

            changeEndTime: function (value) {
                app.taskEndTime = value
            },

            changeTaskLevel: function (value) {
                app.taskLevel = value
            }

        }

    })
;