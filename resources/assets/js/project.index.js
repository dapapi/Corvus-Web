import config from "./config";
import redirect from "./bootstrap";
import store from '../store/index.js';

let app = new Vue({
        el: '#root',
        store,
        data: {
            total: 2,
            current_page: 1,
            total_pages: 1,
            companyArr: [],
            starsArr: [],
            projectName: '',
            projectTypeArr: config.projectTypeArr,
            projectFieldsArr: [],
            projectType: '',
            projectFields: '',
            projectsInfo: '',
            customizeInfo: config.customizeInfo,
            addInfoArr: {},
            levelArr: config.levelArr,
            visibleRangeArr: config.visibleRangeArr,

        },

        mounted() {
            this.getClients();
            this.getStars();
            this.getProjects();
        },

        methods: {

            getProjects: function (pageNum = 1) {
                let data = {
                    page: pageNum,
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/projects',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    app.projectsInfo = response.data
                })
            },

            getClients: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/all',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        app.companyArr.push({
                            name: response.data[i].company,
                            id: response.data[i].id,
                            grade: response.data[i].grade
                        })
                    }
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
                            name: response.data[i].name,
                            id: response.data[i].id,
                            value: response.data[i].id
                        })
                    }
                })
            },

            projectChange: function (e) {
                console.log(e)
            },

            projectPrincipalChange: function (e) {
                console.log(e)
            },

            customize: function (value) {
                console.log(value)
            },

            addProject: function () {

            },

            changeLinkageCompany: function (value) {
                console.log(value)
            },

            changeTargetArtist: function (value) {
                console.log(value)
            },

            redirectProjectDetail: function (projectId) {
                redirect('detail?project_id=' + projectId)
            },

            changeProjectType: function (value) {
                app.projectType = value
            },

            selectProjectType: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/project_fields',
                    headers: config.getHeaders(),
                    data: {
                        type: app.projectType
                    }
                }).done(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].field_type === 2) {
                            response.data[i].contentArr = [];
                            for (let j = 0; j < response.data[i].content.length; j++) {
                                response.data[i].contentArr.push({
                                    value: response.data[i].content[j],
                                    name: response.data[i].content[j]
                                })
                            }
                        }
                    }
                    app.projectFieldsArr = response.data
                })
                if (app.projectType !== 5) {
                    this.getTrail()
                }
            },

            getTrail: function () {
                //获取类型下的销售线索
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/trails',
                    headers: config.getHeaders(),
                    data: {
                        type: app.projectType
                    }
                }).done(function (response) {

                })
            },


            addInfo: function (value, name) {
                app.addInfoArr[name] = value
            }

        }

    })
;