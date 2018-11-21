import config from "./config";

// const { staffStatus, dateArr, stuffType } = config

let app = new Vue({
        el: '#root',
        data: {
        },

        mounted() {
            this.getTasks()
        },
 
        methods: {
            getTasks: function (pageNum = 1) {
            }
        }
    })
;