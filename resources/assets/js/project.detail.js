import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            taskId: '',
            changeInfo: {},
            isEdit: false,
        },

        mounted() {
            this.getProject()
        },

        watch: {},

        methods: {

            getProject: function () {
                this.taskId = Tool.getParameterByName('project_id');

                let data = {
                    include: '',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/projects/' + this.taskId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                })
            },


        }

    })
;