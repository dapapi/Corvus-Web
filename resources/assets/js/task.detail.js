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
            total: 0,
            current_page: 0,
            total_pages: 0,
            showChildTask: false,
            taskInfo: '',
            participantsArr: [],
            flagParticipantsIdArr: [],
            changeParticipantInfo: '',
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
            taskLevelArr: config.taskLevelArr,
            taskTypeArr: config.taskTypeArr,
            customizeInfo: config.customizeInfo,
            priorityArr: config.priorityArr,
            taskStatusArr: config.taskStatusArr
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
                        app.changeParticipantInfo = newValue
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

        computed: {
            principalName: function () {
                return this.$store.state.principalInfo.name
            }
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
                    for (let i = 0; i < response.data.participants.data.length; i++) {
                        app.flagParticipantsIdArr.push(response.data.participants.data[i].id)
                    }
                    let params = {
                        type: 'change',
                        data: response.data.participants.data
                    };
                    store.dispatch('changeParticipantsInfo', params);
                    params.data = response.data.principal.data;
                    store.dispatch('changePrincipal', params)

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
                let _this = this;
                if (app.changeInfo) {
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
                        app.isEdit = false;
                        if (app.changeInfo.principal_id) {
                            app.taskInfo.principal.data = _this.$store.state.principalInfo
                        }
                    });
                }
                // @todo 修改时间组件

                if (app.changeParticipantInfo) {
                    let changeInfo = app.changeParticipantInfo;
                    let participant_ids = [];
                    for (let i = 0; i < changeInfo.length; i++) {
                        participant_ids.push(changeInfo[i].id)
                    }

                    let flagInfo = app.flagParticipantsIdArr;
                    let del_participant_ids = [];
                    for (let j = 0; j < flagInfo.length; j++) {
                        if (changeInfo.map(item => item.id).indexOf(flagInfo[j]) === -1) {
                            del_participant_ids.push(flagInfo[j])
                        }
                    }
                    let data = {
                        person_ids: participant_ids,
                        del_person_ids: del_participant_ids
                    };
                    $.ajax({
                        type: 'post',
                        url: config.apiUrl + '/tasks/' + app.taskId + '/participant',
                        headers: config.getHeaders(),
                        statusCode: {
                            400: function (response) {
                                toastr.error(response.responseJSON.message);
                            }
                        },
                        data: data
                    }).done(function () {
                        app.isEdit = false;
                    })
                }

                toastr.success('修改成功')

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

            changeTaskPrincipal: function () {
                app.taskInfo.principal_id = this.$store.state.principalInfo.id;
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
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }
                let data = {
                    // resource_id: '1718463094',
                    // resourceable_id: '1994731356',
                    title: app.taskName,
                    // type: app.taskType,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    priority: app.taskLevel,
                    start_at: app.startTime + ' ' + app.startMinutes,
                    end_at: app.endTime + ' ' + app.endMinutes,
                    desc: app.taskIntroduce,
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

            addStartMinutes: function (value) {
                app.startMinutes = value
            },

            addEndMinutes: function (value) {
                app.endMinutes = value
            },
            redirectTaskDetail: function (taskId) {
                redirect('detail?task_id=' + taskId)
            }

        }

    })
;