import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            artistId: '',
            artistInfo: '',

        },

        mounted() {
            this.getArtist()
        },

        methods: {
            getArtist: function () {
                this.artistId = Tool.getParameterByName('artists_id');

                let data = {
                    include: 'broker,creator',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars/' + this.artistId,
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.artistInfo = response.data;

                })
            },
        }
    })
;