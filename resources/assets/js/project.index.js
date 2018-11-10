import config from "./config";
import redirect from "./bootstrap"

let app = new Vue({
        el: '#root',
        data: {
            total: 2,
            current_page: 1,
            total_pages: 1,
            companyArr: [],
            starsArr: [],
            projectName: '',
            projectTypeArr: config.projectTypeArr,
            projectFieldArr: [],
            projectType: '',
            projectFields: '',
            projectStatus: [
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
                    value: 'test',
                    name: 'test'
                }
            ],
            projectsInfo: '',
            customizeInfo: config.customizeInfo,

        },

        mounted() {
            this.getClients();
            this.getStars();
            this.getProjects();
            this.getProjectFields();
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
                    console.log(response)
                    app.projectsInfo = response.data
                })
            },

            getProjectFields: function () {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/project_fields',
                    headers: config.getHeaders(),
                    data: {
                        type: 1
                    }
                }).done(function (response) {
                    console.log('fields')
                    console.log(response)
                    app.projectFields = response.data
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
                $('#selectProjectType').modal('hide');
                $('#addProject').modal('show');
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/project_fields',
                    headers: config.getHeaders(),
                    data: {
                        type: app.projectType
                    }
                }).done(function (response) {
                    console.log(response)
                })
            }

        }

    })
;