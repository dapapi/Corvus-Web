import config from "./config";
import redirect from './bootstrap';

// const { staffStatus, dateArr, stuffType } = config

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            // customizeInfo: config.customizeInfo,
        },

        mounted() {
            this.getTasks()
        },
 
        methods: {
            getTasks: function (pageNum = 1) {
                // this.taskStatus = 0;
                // let data = {
                //     page: pageNum,
                // };

                // $.ajax({
                //     type: 'get',
                //     url: config.apiUrl + '/tasks/my_all',
                //     headers: config.getHeaders(),
                //     statusCode: config.getStatusCode(),
                //     data: data
                // }).done(function (response) {
                //     console.log(response)
                // })
            }
        }
    })
;