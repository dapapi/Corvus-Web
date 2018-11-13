import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';
import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        participantsInfo: [],
        participantsIdArr: [],
        principalInfo: {},
    },
    mutations: {
        changeParticipantsArr(state, data) {
            state.participantsInfo = data
        },
        changeParticipantsIdArr(state, data) {
            state.participantsIdArr = data
        },

        changePrincipal(state, data) {
            state.principalInfo = data
        }
    },
    actions: {
        changeParticipantsArr: function (data, params) {
            data.commit('changeParticipantsArr', params);
        },

        changeParticipantsIdArr: function (data, params) {
            data.commit('changeParticipantsIdArr', params);
        },

        changePrincipal: function (data, params) {
            data.commit('changePrincipal', params)
        }
    }
});

let app = new Vue({
        el: '#root',
        store,
        data: {
            taskId: '',
            changeInfo: {},
            isEdit: false,
            total: 0,
            current_page: 1,
            total_pages: 1,
            showChildTask: false,
            taskInfo: '',
            participantsArr: [],
            participantsIdArr: [],
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
            customizeInfo: config.customizeInfo,
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
            'taskInfo.participants.data': {
                handler(newValue, oldValue) {
                    if (newValue && oldValue) {
                        app.changeInfo.participant = newValue
                    }
                },
                deep: true
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

                let _this = this;

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/' + this.taskId,
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    if (response.data.affixes) {
                        for (let i = 0; i < response.data.affixes.data.length; i++) {
                            let size = response.data.affixes.data[i].size;
                            response.data.affixes.data[i].size = _this.unitConversion(size)
                        }
                    }

                    app.taskInfo = response.data;
                    store.dispatch('changeParticipantsArr', response.data.participants.data);
                    store.dispatch('changePrincipal', response.data.principal.data)

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
                })
            },

            privacyTask: function () {
                $.ajax({
                    type: 'put',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/privacy',
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
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
                }).done(function () {
                    toastr.success("删除任务成功");
                    redirect('index')
                })
            },

            unitConversion: function (size) {
                if (size < 1024) {
                    size = size + "B"
                } else if (size < 1024 * 1024) {
                    size = (size / 1024).toFixed(2) + "KB"
                } else if (size < 1024 * 1024 * 1024) {
                    size = (size / (1024 * 1024)).toFixed(2) + "MB"
                } else {
                    size = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB"
                }
                let sizeStr = size + "";
                let index = sizeStr.indexOf(".");
                let dou = sizeStr.substr(index + 1, 2);
                if (dou === "00") {
                    size = sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
                }
                return size
            },

            changeTaskBaseInfo: function () {
                $.ajax({
                    type: 'put',
                    url: config.apiUrl + '/tasks/' + app.taskId,
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            toastr.error(response.responseJSON.message);
                        }
                    },
                    data: app.changeInfo
                }).done(function () {
                    toastr.success("修改成功");
                    app.isEdit = false;
                });

                if (app.changeInfo.participant) {
                    let participant_ids = [];
                    for (let i = 0; i < app.changeInfo.participant.length; i++) {
                        participant_ids.push(app.changeInfo.participant[i].id)
                    }

                    $.ajax({
                        type: 'post',
                        url: config.apiUrl + '/tasks/' + app.taskId + '/participant',
                        headers: config.getHeaders(),
                        statusCode: {
                            400: function (response) {
                                toastr.error(response.responseJSON.message);
                            }
                        },
                        data: {
                            person_ids: participant_ids
                        }
                    }).done(function () {
                        toastr.success("修改参与人成功");
                    })
                }
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
                app.participantsArr = [];
                for (let i = 0; i < value.length; i++) {
                    app.participantsArr.push(value[i].name)
                }
                if (app.taskInfo.participants) {
                    app.taskInfo.participants.data = value
                }
            },

            changeTaskPrincipal: function (value) {
                app.taskInfo.principal_id = value
                //    @todo 修改负责人  返回参数没有负责人
            },

            uploadAttachment: function (url, name, size) {
                let _this = this;
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/affix',
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            console.log(response);
                            toastr.error(response.responseJSON.message);
                        }
                    },
                    data: {
                        title: name,
                        url: url,
                        size: size,
                        type: 1
                    }
                }).done(function (response) {
                    toastr.success("上传成功");
                    response.data.size = _this.unitConversion(response.data.size);
                    app.taskInfo.affixes.data.push(response.data)
                })
            },

            deleteAttachment: function (attachmentId) {
                $.ajax({
                    type: 'delete',
                    url: config.apiUrl + '/tasks/' + app.taskId + '/affixes/' + attachmentId,
                    headers: config.getHeaders(),
                    statusCode: {
                        400: function (response) {
                            toastr.error(response.responseJSON.message);
                        }
                    },
                    data: app.changeInfo
                }).done(function (response) {
                    toastr.success("删除成功");
                    let index = app.taskInfo.affixes.data.indexOf(app.taskInfo.affixes.data.find(item => item.id == attachmentId));
                    app.taskInfo.affixes.data.splice(index, 1);
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
                    principal_id: app.principal,
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
                    data: data
                }).done(function (response) {
                    toastr.success('添加成功');
                    $('#addChildTask').modal('hide');
                    app.taskInfo.tasks.data.push(response.data)
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

            },

            redirectTaskDetail: function (taskId) {
                redirect('detail?task_id=' + taskId)
            }

        }

    })
;