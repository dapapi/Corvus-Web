import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            taskId: '',
            changeInfo: {},
            isEdit: false,
            total: 0,
            current_page: 1,
            total_pages: 1,
            showChildTask: false,
            memberPlaceholder: '请选择负责人',
            multiple: false,
            taskInfo: '',
            participantsArr: [],
            newChildTask: {},
            taskName: '',
            taskIntroduce: '',
            taskType: '',
            principal: '',
            participants: '',
            taskLevel: '',
            startTime: '',
            endTime: '',
            startMinutes: '00:00',
            endMinutes: '00:00',
            taskLevelArr: [
                {
                    name: '请选择优先级',
                    value: 0
                },
                {
                    name: '高',
                    value: 1
                },
                {
                    name: '中',
                    value: 2
                },
                {
                    name: '低',
                    value: 3
                },
            ],
            taskTypeArr: [
                {
                    name: '请选择任务类型',
                    value: 0
                },
                {
                    name: '跑组',
                    value: 1
                },
                {
                    name: '试戏',
                    value: 2
                },
                {
                    name: '类型1',
                    value: 3
                },
            ],
            customizeInfo: [
                {
                    id: 0,
                    name: '选择条件',
                    value: 0,
                    child: [
                        {
                            name: '选择对应关系',
                            value: 0
                        }
                    ],
                    type: 'disable'
                },
                {
                    id: 1,
                    name: '负责人',
                    value: 1,
                    child: [
                        {
                            name: '等于',
                            value: 1
                        }
                    ],
                    type: 'person'
                },
                {
                    id: 2,
                    name: '下次跟进时间',
                    value: 2,
                    child: [
                        {
                            name: '等于',
                            value: 1
                        },
                        {
                            name: '大于',
                            value: 2
                        },
                    ],
                    type: 'date'
                },
                {
                    id: 3,
                    name: '未跟进天数',
                    value: 3,
                    child: [
                        {
                            name: '等于',
                            value: 1
                        },
                        {
                            name: '大于',
                            value: 2
                        },
                        {
                            name: '大于等于',
                            value: 2
                        },
                    ],
                    type: 'number'
                },
            ],
            priorityArr: [
                {
                    name: '高',
                    value: 1
                },
                {
                    name: '中',
                    value: 2
                },
                {
                    name: '低',
                    value: 3
                },
            ],
            taskStatusArr: [
                {
                    name: '进行中',
                    value: 1
                },
                {
                    name: '已完成',
                    value: 2
                },
                {
                    name: '已停止',
                    value: 3
                },
            ]
        },

        mounted() {
            this.getTask();
            $('#addChildTask').on('show.bs.modal', function () {
                app.showChildTask = true;
                app.isEdit = false;
            }).on('hidden.bs.modal', function () {
                app.showChildTask = false;
            })
        },

        watch: {
            'taskInfo.principal_id': function (newValue) {
                app.changeInfo.principal_id = newValue
            },
            'taskInfo.participant.data': function (newValue) {
                app.changeInfo.participant = newValue
            },
            'taskInfo.start_at': function (newValue) {
                app.changeInfo.start_at = newValue
            },
            'taskInfo.status': function (newValue) {
                app.changeInfo.status = newValue
            },
            'taskInfo.priority': function (newValue) {
                app.changeInfo.priority = newValue
            },
            'taskInfo.desc': function (newValue) {
                app.changeInfo.desc = newValue
            },
            'taskInfo.end_at': function (newValue) {
                app.changeInfo.end_at = newValue
            },
        },

        methods: {

            getTask: function () {
                this.taskId = Tool.getParameterByName('task_id');

                let data = {
                    include: 'creator,principal,pTask,tasks,resource.resourceable,resource.resource,affixes,participants',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/' + this.taskId,
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.taskInfo = response.data
                    for (let i = 0; i < response.data.participants.data.length; i++) {
                        app.participantsArr.push(response.data.participants.data[i].name)
                    }
                })
            },

            editBaseInfo: function () {
                app.isEdit = true;
                app.changeInfo = {};
            },

            customize: function (value) {
                console.log(value)
            },

            showSelectMember: function (value) {
                app.isInputSelectShow = value
            },

            cancelEdit: function () {
                app.isEdit = false;
            },

            changeTaskStatus: function (status) {
                $.ajax({
                    type: 'put',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/status',
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            console.log(response);
                            toastr.error(response.responseJSON.message);
                        }
                    },
                    data: {
                        status: status
                    }
                }).done(function (response) {
                    if (status === 2) {
                        app.taskInfo.status = status;
                        toastr.success("完成任务成功");

                    } else if (status === 3) {
                        toastr.success("暂停任务成功");
                    }
                    console.log(response)
                })
            },

            privacyTask: function () {
                $.ajax({
                    type: 'put',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/privacy',
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            console.log(response);
                            toastr.error(response.responseJSON.message);
                        }
                    }
                }).done(function (response) {
                    toastr.success("转私密成功");
                })
            },

            deleteTask: function () {
                $.ajax({
                    type: 'delete',
                    url: config.apiUrl + '/tasks/' + app.taskId,
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            toastr.error(response.responseJSON.message);
                        },
                        403: function (response) {
                            toastr.error(response.responseJSON.message);
                        }
                    }
                }).done(function (response) {
                    toastr.success("删除任务成功");
                    redirect('index')
                })
            },

            changeTaskBaseInfo: function () {
                $.ajax({
                    type: 'put',
                    url: config.apiUrl + '/tasks/' + app.taskId,
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            console.log(response);
                            toastr.error(response.responseJSON.message);
                        }
                    },
                    data: app.changeInfo
                }).done(function (response) {
                    toastr.success("修改成功");
                    app.isEdit = false;
                })
            },

            changeEndTime: function (value) {
                app.taskInfo.end_at = value
            },

            changeTaskIntroduce: function (value) {
                app.taskInfo.desc = value
            },

            changeTaskLevel: function (value) {
                app.taskInfo.priority = value
            },

            changeTaskStartTime: function (value) {
                app.taskInfo.start_at = value
            },

            changeTaskParticipants: function (value) {
                if (app.participants) {
                    app.participants.data = value
                }
                //    @todo 修改参与人  参数格式不确定
            },

            changeTaskPrincipal: function (value) {
                app.taskInfo.principal_id = value
                //    @todo 修改负责人  返回参数没有负责人
            },

            uploadAttachment: function (e) {
                Tool.uploadFile(e, (url, name, size) => {
                    console.log(url)
                    console.log(name)
                    console.log(size)
                })
                //    @todo 没有上传获取七牛token接口
            },

            deleteAttachment: function (attachmentId) {
                $.ajax({
                    type: 'delete',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/affixes/' + attachmentId,
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            console.log(response);
                            toastr.error(response.responseJSON.message);
                        }
                    },
                    data: app.changeInfo
                }).done(function (response) {
                    toastr.success("删除成功");
                })
            },

            downloadAttachment: function (attachmentId, attachmentUrl) {
                window.open(attachmentUrl, '_blank');
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/affixes/' + attachmentId + '/download',
                    headers: config.getHeaders(),
                }).done(function (response) {
                })
            },

            addChildTask: function () {
                let data = {
                    // resource_id: '1718463094',
                    // resourceable_id: '1994731356',
                    title: app.taskName,
                    // type: app.taskType,
                    // principal_id: app.principal,
                    priority: app.taskLevel,
                    start_at: app.startTime + ' ' + app.startMinutes,
                    end_at: app.endTime + ' ' + app.endMinutes,
                    desc: app.taskIntroduce,
                    participant_ids: app.participants
                };
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/subtask',
                    headers: config.getHeaders(),
                    // statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    toastr.success('添加成功');
                    $('#addChildTask').modal('hide')
                })
            },

            addTaskType: function (value) {
                app.taskType = value
            },

            addPrincipal: function (value) {
                app.principal = value
            },

            addParticipant: function (value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id)
                }
                app.participants = flagArr
            },

            addTaskLevel: function (value) {
                app.taskLevel = value
            },

            addStartTime: function (value) {
                app.startTime = value
            },

            addEndTime: function (value) {
                app.endTime = value
            },

            addLinkage: function (value) {

            }

        }

    })
;