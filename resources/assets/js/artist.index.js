import config from "./config";
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            artistStatusArr: config.artistStatusArr,
            artistStatus: '',

        },

        mounted() {
        },

        methods: {
            changeArtistStatus: function (value) {
                app.artistStatus = value
            },
        }
    })
;