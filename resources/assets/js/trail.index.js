import config from "./config";
import redirect from "./bootstrap";
import store from '../store/index.js';

let app = new Vue({
        el: '#root',
        store,
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            trailsInfo: '',
            trailOrigin: '',
            trailType: '',
            trailTypeArr: config.trailTypeArr,
            companyType: config.companyType,
            companyArr: [],
            starsArr: [],
            customizeInfo: config.customizeInfo,
            clientLevelArr: config.clientLevelArr,
            trailOriginArr: config.trailOrigin,
            salesProgressText: '未确定合作',
            selectCompany: '',
            trailName: '',
            targetStars: '',
            recommendStars: '',
            trailPrincipal: '',
            trailContact: '',
            trailContactPhone: '',
            email: '',
            trailFee: '',
            trailDesc: '',
            brandName: '',
            trailOriginPerson: '',
            industriesArr: [],
            industry: '',

        },

        mounted() {
            this.getSales();
            this.getClients();
            this.getStars();
            this.getIndustries();
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
                    app.trailsInfo = response.data;
                    app.total = response.meta.pagination.total;
                    app.current_page = response.meta.pagination.current_page;
                    app.total_pages = response.meta.pagination.total_pages;
                })
            },


            getIndustries: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/industries/all',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        app.industriesArr.push({
                            id: response.data[i].id,
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
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
                    for (let i = 0; i < response.data.length; i++) {
                        app.starsArr.push({
                            id: response.data[i].id,
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
                })
            },

            customize: function () {

            },

            addTrail: function () {
                let data = {
                    title: app.trailName,
                    brand: app.brandName,
                    client: app.selectCompany,
                    resource_type: app.trailOrigin,
                    principal_id: app.trailPrincipal,
                    recommendations: app.recommendStars,
                    expectations: app.targetStars,
                    contact: {
                        name: app.trailContact,
                        phone: app.trailContactPhone
                    },
                    fee: app.trailFee,
                    desc: app.trailDesc,
                    industry_id: app.industry,
                    type: app.trailType
                };
                if (app.trailOrigin == 1 || app.trailOrigin == 2 || app.trailOrigin == 3) {
                    data.resource = app.email
                } else if (app.trailOrigin == 4 || app.trailOrigin == 5) {
                    data.resource = app.trailOriginPerson
                } else {
                    data.resource = ''
                }
                if (app.companyType !== '泰洋川禾') {
                    data.lock = app.trailIsLocked
                }
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/trails',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    redirect('detail?trail_id=' + response.data.id)
                })
            },

            redirectTrailDetail: function (trailId) {
                redirect('detail?trail_id=' + trailId)
            },

            changeTrailOrigin: function (value) {
                app.trailOriginPerson = value
            },

            changeTrailOriginType: function (value) {
                app.trailOrigin = value
            },

            changeCompanyName: function (value) {
                app.selectCompany = value
                //    todo 不知名原因数据错误
            },

            changePrincipal: function (value) {
                app.trailPrincipal = value
            },

            changeTargetStars: function (value) {
                app.targetStars = value
            },

            changeRecommendStars: function (value) {
                app.recommendStars = value
            },

            changeTrailFee: function (value) {
                app.trailFee = value
            },

            changeCheckbox: function (e) {
                app.trailIsLocked = e.target.checked
            },

            changeIndustry: function (value) {
                app.industry = value
            }


        }

    })
;