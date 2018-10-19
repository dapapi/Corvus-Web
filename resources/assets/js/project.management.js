import config from "./config";

let app = new Vue({
        el: '#root',
        data: {
            total: 2,
            current_page: 1,
            total_pages: 1,
            projectType: [
                {
                    value: '',
                    name: '请选择类型',
                },
                {
                    value: 1,
                    name: '未确定合作',
                },
                {
                    value: 2,
                    name: '已确定合作',
                }
            ],
            projectPrincipalType: [
                {
                    value: '',
                    name: '请选择负责人'
                },
                {
                    value: 'test',
                    name: 'test'
                }
            ],
            projectsInfo: [
                {
                    id: '123',
                    name: '星巴克代言',
                    principal: '测试',
                    progress: '正在跟进',
                    sign_time: '2018-09-23',
                    delivery: '直播',
                    follow_time: '2018-09-23'
                },
                {
                    id: '123',
                    name: 'bigger研究所',
                    principal: '测试',
                    progress: '正在跟进',
                    sign_time: '2018-09-23',
                    delivery: '直播',
                    follow_time: '2018-09-23'
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

        },

        methods: {

            getProjects: function (pageNum = 1) {
                let data = {
                    page: pageNum,
                    include: 'user, gift, express',
                };

                if (this.searchContent) {
                    data.search = this.searchContent
                }

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/portal/orders',
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    app.orderInfo = response.data;
                    let pageInfo = response.meta.pagination;
                    app.total = pageInfo.total;
                    app.current_page = pageInfo.current_page;
                    app.total_pages = pageInfo.total_pages;
                })
            },

            projectChange: function (e) {
                console.log(e)
            },

            projectPrincipalChange: function (e) {
                console.log(e)
            },

            customize: function () {

            }

        }

    })
;