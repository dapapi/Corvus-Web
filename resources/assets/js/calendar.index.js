import config from "./config";
import redirect from "./bootstrap";
import store from '../store/index.js';

let app = new Vue({
        el: '#root',
        store,
        data: {},

        mounted() {

        },

        methods: {

            getClients: function () {


                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response)
                })
            },

            addSchedule: function () {

            }


        }

    })
;