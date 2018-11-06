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
        },

        watch: {},

        methods: {

            getTask: function () {
                this.taskId = Tool.getParameterByName('task_id');

                let data = {
                    include: '',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/tasks/' + this.taskId,
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.taskInfo = response.data;
                    for (let i = 0; i < response.data.participants.data.length; i++) {
                        app.participantsArr.push(response.data.participants.data[i].name);
                        app.participantsIdArr.push(response.data.participants.data[i].id)
                    }
                })
            },


        }

    })
;