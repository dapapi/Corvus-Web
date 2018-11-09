import config from "./config";
import redirect from "./bootstrap"

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            trailsInfo: '',
            trailOrigin: '',
            memberPlaceholder: '请选择负责人',
            companyType: config.companyType,
            companyArr: [],
            starsArr: [],
            customizeInfo: config.customizeInfo,
            clientLevelArr: [
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
            this.getSales();
            this.getClients();
            this.getStars();
            this.trailOriginArr = config.trailOrigin();
        },

        methods: {

            getSales: function (pageNum = 1) {
                let data = {
                    page: pageNum,
                    include: 'principal,client',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/trails',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response.data);
                    app.trailsInfo = response.data;
                    app.total = response.meta.pagination.total;
                    app.current_page = response.meta.pagination.current_page;
                    app.total_pages = response.meta.pagination.total_pages;
                })
            },

            getClients: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/all',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response.data);
                    app.companyArr = response.data
                })
            },

            getStars: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars/all',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response.data);
                    app.starsArr = response.data
                })
            },

            customize: function () {

            },

            addTrail: function () {

            },

            redirectTrailDetail: function (trailId) {
                redirect('detail?trail_id=' + trailId)
            },

            changeTrailOrigin: function (value) {
                this.trailOrigin = value
            }


        }

    })
;