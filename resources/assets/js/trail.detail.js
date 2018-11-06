import config from "./config";
import redirect from "./bootstrap"
import Tool from "./tool";

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
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
            companyLevelArr: [
                {
                    name: '请选择级别',
                    value: 0,
                },
                {
                    name: '直客',
                    value: 1,
                },
                {
                    name: '代理公司',
                    value: 2,
                },
            ],
            trailOriginArr: [],
            salesProgressText: '未确定合作'
        },

        mounted() {
            this.getTrail();
            this.trailOriginArr = config.trailOrigin();
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
                    // statusCode: config.getStatusCode(),
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

            },

            editBaseInfo: function () {
                this.isEdit = true;
            },

            cancelEdit: function () {
                app.isEdit = false;
            },

            addTask: function () {
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
                    url: config.apiUrl + '/tasks',
                    headers: config.getHeaders(),
                    // statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    redirect('detail?task_id=' + response)
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


        }

    })
;