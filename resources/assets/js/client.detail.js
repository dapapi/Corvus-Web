import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            clientId: '',
            changeInfo: {},
            isEdit: false,
        },

        mounted() {
            this.getClient()
        },

        watch: {},

        methods: {

            getClient: function () {
                this.clientId = Tool.getParameterByName('client_id');

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/' + this.clientId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                })
            },


        }

    })
;