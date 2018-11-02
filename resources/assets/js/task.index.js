import config from "./config";

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
            newTask: {},
            taskType: '',
            taskName: '',
            taskLevel: '',
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
        },

        mounted() {
            this.getTasks()
        },

        methods: {

            getTasks: function (pageNum = 1) {
                let data = {
                    page: pageNum,
                    include: 'creator,principal,pTask,tasks,resource.resourceable,resource.resource,affixes,participants',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/my_all',
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                })
            },

            addTask: function () {
                let data = {
                    resource_id: '1718463094',
                    resourceable_id: '1994731356',
                    title: app.taskName,
                    type: app.taskType,
                    principal_id: app.principal,
                    priority: app.taskLevel,
                    start_at: app.startTime + ' ' + app.startMinutes,
                    end_at: app.endTime + ' ' + app.endMinutes,
                    desc: app.taskIntroduce
                };
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/tasks',
                    headers: config.getHeaders(),
                    // statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    console.log(response)
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
                console.log(value)
                app.startTime = value
            },

            changeEndTime: function (value) {
                app.endTime = value
            },

        }

    })
;