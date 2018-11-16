import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            taskId: '',
            changeInfo: {},
            isEdit: false,
            projectInfo: '',
        },

        mounted() {
            this.getProject()
        },

        watch: {},

        methods: {

            getProject: function () {
                this.projectId = Tool.getParameterByName('project_id');

                let data = {
                    include: 'principal',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/projects/' + this.projectId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.projectInfo = response.data
                })
            },

            addTask: function () {

            }


        }

    })
;