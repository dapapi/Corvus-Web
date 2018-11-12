import config from "./config";
import redirect from "./bootstrap"
import Tool from "./tool";

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 0,
            total_pages: 0,
            trailId: '',
            trailInfo: '',
            trailOrigin: '',
            taskName: '',
            taskIntroduce: '',
            multiple: false,
            isEdit: false,
            memberPlaceholder: '请选择负责人',
            companyType: config.companyType,
            customizeInfo: config.customizeInfo,
            taskTypeArr: config.taskTypeArr,
            taskLevelArr: config.taskLevelArr,
            startMinutes: '00:00',
            endMinutes: '00:00',
            trailTasksInfo: [],
            clientLevelArr: config.clientLevelArr,
            trailOriginArr: config.trailOrigin,
            salesProgressText: '未确定合作',
            changeInfo: {},

        },

        mounted() {
            this.getTrail();
        },
        watch: {
            'trailInfo.title': function (newValue) {
                app.changeInfo.title = newValue
            },
            'trailInfo.principal.data': {
                handler(newValue, oldValue) {
                    if (newValue && oldValue) {
                        app.changeInfo.principal = newValue
                    }
                },
                deep: true
            },
            'trailInfo.fee': function (newValue) {
                app.changeInfo.fee = newValue
            },
            'trailInfo.brand': function (newValue) {
                app.changeInfo.brand = newValue
            },
            'trailInfo.client.data.company': function (newValue) {
                if (app.changeInfo.client) {
                    app.changeInfo.client.data.company = newValue
                } else {
                    app.changeInfo.client = {
                        data: {
                            company: newValue
                        }
                    }
                }

            },
            'trailInfo.contact.data.name': function (newValue) {
                if (app.changeInfo.contact) {
                    app.changeInfo.contact.data.name = newValue
                } else {
                    app.changeInfo.contact = {
                        data: {
                            name: newValue
                        }
                    }
                }
            },
            'trailInfo.contact.data.phone': function (newValue) {
                if (app.changeInfo.contact) {
                    app.changeInfo.contact.data.phone = newValue
                } else {
                    app.changeInfo.contact = {
                        data: {
                            phone: newValue
                        }
                    }
                }},
            'trailInfo.desc': function (newValue) {
                app.changeInfo.desc = newValue
            },
            //    @todo 修改目标艺人、推荐艺人
        },

        methods: {

            getTrail: function (pageNum = 1) {

                this.trailId = Tool.getParameterByName('trail_id');

                let data = {
                    page: pageNum,
                    include: 'principal,client,contact,recommendations',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/trails/' + this.trailId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response.data);
                    app.trailInfo = response.data;
                })
            },

            changeTrailOrigin: function (value) {
                this.trailOrigin = value
            },

            changeTrailBaseInfo: function () {
                $.ajax({
                    type: 'put',
                    url: config.apiUrl + '/trails/' + this.trailId,
                    headers: config.getHeaders(),
                    data: app.changeInfo
                }).done(function (response) {
                    console.log(response.data);
                })
            },

            editBaseInfo: function () {
                this.isEdit = true;
            },

            cancelEdit: function () {
                app.isEdit = false;
            },

            getTrailTask: function () {
                if (app.trailTasksInfo.length > 0) {
                    return
                }
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/trails/' + app.trailId + '/tasks',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response)
                    app.trailTasksInfo = response.data
                })
            },

            addTask: function () {
                let data = {
                    resource_type: 5,
                    resourceable_id: app.trailId,
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
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    app.trailTasksInfo.push(response.data);
                })
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

            taskPrincipalChange: function (value) {
                app.taskPrincipal.data = value
            },

            taskParticipantChange: function (value) {
                app.taskParticipant.data = value
            },

            changeTrailName: function (value) {
                app.trailInfo.title = value
            },

            changeTrailPrincipal: function (value) {
                console.log(value);
                app.trailInfo.principal.data = value
            },

            changeTrailFee: function (value) {
                app.trailInfo.fee = value
            },

            changeTrailBrand: function (value) {
                app.trailInfo.brand = value
            },

            changeTrailCompany: function (value) {
                app.trailInfo.client.data.company = value
            },

            changeTrailCompanyLevel: function (value) {
                app.trailInfo.client.data.grade = value
            },

            changeTrailContact: function (value) {
                app.trailInfo.contact.data.name = value
            },

            changeTrailContactPhone: function (value) {
                app.trailInfo.contact.data.phone = value
            },

            changeTrailExpectations: function (value) {

            },

            changeTrailRecommend: function (value) {

            },

            changeTrailDesc: function (value) {
                app.trailInfo.desc = value
            },


        }

    })
;