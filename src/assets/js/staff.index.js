import config from "./config";
import redirect from './bootstrap';

const { staffStatus, dateArr, stuffType } = config

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            // customizeInfo: config.customizeInfo,
            staffStatus: staffStatus,
            dateArr: dateArr,
            stuffType: stuffType,
            filterConditions: [
                {
                    name: '年龄',
                    id: 'age',
                    value: '0'
                },
                {
                    name: '入职日期',
                    id: 'entryDate',
                    value: '1'
                },{
                    name: '身份证号',
                    id: 'IDNum',
                    value: '2'
                },{
                    name: '离职日期',
                    id: 'resignationDate',
                    value: '3'
                },{
                    name: '视频植入',
                    id: 'video',
                    value: '4'
                }
            ],
            conditionArr: [],
            checkedNames: []
        },

        mounted() {
            this.getTasks()
        },
 
        methods: {
            // 改变报表筛选条件
            changeSelectOption (newArr) {
                this.checkedNames = newArr
            },
            // 下拉框改变事件
            projectChange () {
                // 
            },

            getProjects () {
                // 
            },
            getTasks: function (pageNum = 1) {
                // this.taskStatus = 0;
                // let data = {
                //     page: pageNum,
                // };

                // $.ajax({
                //     type: 'get',
                //     url: config.apiUrl + '/tasks/my_all',
                //     headers: config.getHeaders(),
                //     statusCode: config.getStatusCode(),
                //     data: data
                // }).done(function (response) {
                //     console.log(response)
                // })
            }
        }
    })
;