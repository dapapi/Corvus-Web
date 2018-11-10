import config from "./config";
import redirect from "./bootstrap"

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 0,
            total_pages: 0,
            customizeInfo: config.customizeInfo,
            clientTypeArr: config.clientTypeArr,
            clientLevelArr: config.clientLevelArr,
            clientsInfo: [],
            companiesArr: [],
            clientScaleArr: config.clientScaleArr,
            clientType: '',
            clientName: '',
            clientLevel: '',
            clientAddressDetail: '',
            clientPrincipal: '',
            clientContact: '',
            clientContactPhone: '',
            clientContactPosition: '',
            clientDecision: '',
            clientRemark: '',
        },

        mounted() {
            this.getClients();
            this.getCompanies();
        },

        methods: {

            getClients: function (pageNum = 1) {
                let data = {
                    page: pageNum,
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.clientsInfo = response.data;
                    app.current_page = response.meta.pagination.current_page;
                    app.total = response.meta.pagination.total;
                    app.total_pages = response.meta.pagination.total_pages;
                })
            },

            getCompanies: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/all',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response)
                    for (let i = 0; i < response.data.length; i++) {
                        app.companiesArr.push({
                            id: response.data[i].id,
                            name: response.data[i].company,
                            grade: response.data[i].grade
                        })
                    }
                })
            },

            addClient: function () {
                let data = {
                    type: app.clientType,
                    company: app.clientName,
                    grade: app.clientLevel,
                    // region_id: '',
                    address: 'test',
                    principal_id: app.clientPrincipal,
                    contact: {
                        name: app.clientContact,
                        phone: app.clientContactPhone,
                        position: app.clientContactPosition
                    },
                    keyman: app.clientDecision,
                    size: app.clientScale,
                    desc: app.clientRemark
                };
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/clients',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    toastr.success('创建成功');
                    redirect('detail?client_id=' + response.data.id)
                })
            },

            customize: function () {

            },

            redirectClientDetail: function (clientId) {
                redirect('detail?client_id=' + clientId)
            },

            changCompany: function (value) {
                console.log(value)
            },

            changeClientType: function (value) {
                console.log(value)
                app.clientType = value;
            },

            changeClientLevel: function (value) {
                app.clientLevel = value
            },

            changePrincipal: function (value) {
                app.clientPrincipal = value
            },

            changeClientScale: function (value) {
                app.clientScale = value
            }


        }

    })
;