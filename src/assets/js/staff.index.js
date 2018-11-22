import config from "./config";
import redirect from './bootstrap';

const { staffStatus, dateArr, stuffType } = config
import fetch from '../utils/fetch'

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            currentPage: 1,
            totalPages: 1,
            total: 1,
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
            checkedNames: [],
            staffList: []
        },

        mounted() {
            this.getTasks()
            this.getStaffList()
        },
 
        methods: {
            getStaffList () {
                fetch('get', '/personnel_list?status=1').then((result) => {
                    console.log(result)
                    this.staffList = result.data
                    this.currentPage = result.meta.pagination.current_page || 1
                    this.totalPages = result.meta.pagination.total_pages || 1
                    this.total = result.meta.pagination.total || 1
                })
            },
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
            }
        }
    })
;