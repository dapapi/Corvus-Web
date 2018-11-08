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
            clientsInfo: [],
        },

        mounted() {
            this.getClients();
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
                    app.clientsInfo = response.data
                })
            },

            addClient: function () {

            },

            customize: function () {

            },

            redirectClientDetail: function (clientId) {
                redirect('detail?client_id=' + clientId)
            }

        }

    })
;