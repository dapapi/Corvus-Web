import config from "./config";
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            genderArr: config.genderArr,
            artistOriginArr: config.artistOriginArr,
            customizeInfo: config.customizeInfo,
            projectStatus: config.projectStatus,
            yesOrNoArr: config.yesOrNoArr,
            artistStatusArr: config.artistStatusArr,
            papiCommunicationStatusArr: config.papiCommunicationStatusArr,
            attachmentTypeArr: config.attachmentTypeArr,
            artistEmail: '',
            artistPhone: '',
            artistWeiXin: '',
            artistsInfo: '',
            artistStatus: '',
            artistName: '',
            artistType: '',
            weiboUrl: '',
            weiboFansNum: '',
            douyinId: '',
            douyinFansNum: '',
            xhsUrl: '',
            xhsFansNum: '',
            platformType: '',
            signIntention: '',
            signCompany: '',
            artistDesc: '',
            baikeUrl: '',
            baikeFansNum: '',
            qitaUrl: '',
            qitaFansNum: '',
            artistScoutName: '',
            artistLocation: '',

        },

        mounted() {
            this.getArtists()
        },

        methods: {
            getArtists: function (page = 1) {
                let data = {
                    page: page,
                    include: 'broker,creator',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/stars',
                    headers: config.getHeaders(),
                    data: data
                }).done(function (response) {
                    console.log(response)
                    app.clientsInfo = response.data;
                    app.current_page = response.meta.pagination.current_page;
                    app.total = response.meta.pagination.total;
                    app.total_pages = response.meta.pagination.total_pages;
                })
            },

            customize: function (value) {

            },

            changeArtistStatus: function (value) {
                app.artistStatus = value
            },

            changeCheckbox: function (value) {
                console.log(value)
                app.platformType = value
            },

            changeCommunicationType: function (value) {
                console.log(value)
            },

            changeSignIntention: function (value) {
                app.signIntention = parseInt(value)
            },

            isSignCompany: function (value) {
                app.signCompany = value
            },

            addArtist: function () {

            },

            changeAttachmentType: function (value) {

            },
        }
    })
;