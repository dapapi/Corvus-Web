import config from "./config";
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            genderArr: config.genderArr,
            artistSourceArr: config.artistSourceArr,
            customizeInfo: config.customizeInfo,
            projectStatus: config.projectStatus,
            yesOrNoArr: config.yesOrNoArr,
            artistStatusArr: config.artistStatusArr,
            taiyangCommunicationStatusArr: config.taiyangCommunicationStatusArr,
            attachmentTypeArr: config.attachmentTypeArr,
            artistEmail: '',
            artistPhone: '',
            artistWeiXin: '',
            artistsInfo: '',
            artistStatus: '',
            artistName: '',
            artistGender: '',
            artistBirthday: '',
            artistSource: '',
            artistType: '',
            communicationStatus: '',
            weiboUrl: '',
            weiboFansNum: '',
            douyinId: '',
            douyinFansNum: '',
            xhsUrl: '',
            xhsFansNum: '',
            platformType: '',
            signIntention: 1,
            signCompany: '',
            artistDesc: '',
            baikeUrl: '',
            baikeFansNum: '',
            qitaUrl: '',
            qitaFansNum: '',
            artistScoutName: '',
            artistLocation: '',
            notSignReason: '',
            selectedArtistsArr: [],

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
                    app.artistsInfo = response.data;
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
                app.communicationStatus = value
            },

            changeSignIntention: function (value) {
                app.signIntention = parseInt(value)
            },

            isSignCompany: function (value) {
                app.signCompany = value
            },

            changeGender: function (value) {
                app.artistGender = value
            },

            changeBirthday: function (value) {
                app.artistBirthday = value
            },

            changeSource: function (value) {
                app.artistSource = value
            },

            addArtist: function () {
                let data = {
                    name: app.artistName,
                    gender: app.artistGender,
                    birthday: app.artistBirthday,
                    source: app.artistSource,
                    email: app.artistEmail,
                    phone: app.artistPhone,
                    wechat: app.artistWeiXin,
                    communication_status: app.communicationStatus,
                    intention: app.signIntention,
                    intention_desc: app.notSignReason,
                    sign_contract_other: app.signCompany,
                };
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/stars',
                    headers: config.getHeaders(),
                    data: data,
                    statusCode: {
                        400: function (response) {
                            toastr.error(response.responseJSON.message);
                        },
                    }
                }).done(function (response) {
                    toastr.success('创建成功');
                    $('#addArtist').modal('hide');
                    redirect('taiyang/detail?artist_id=' + response.data.id)
                })
            },

            changeAttachmentType: function (value) {

            },

            redirectArtistDetail: function (artistId) {
                redirect('taiyang/detail?artist_id=' + artistId)
            },

            selectArtists: function (value) {
                if (value === 'all') {
                    app.selectedArtistsArr = [];
                    for (let i = 0; i < app.artistsInfo.length; i++) {
                        app.selectedArtistsArr.push(app.artistsInfo[i].id)
                    }
                } else {
                    let index = app.selectedArtistsArr.indexOf(value);
                    if (index > -1) {
                        app.selectedArtistsArr.splice(index, 1)
                    } else {
                        app.selectedArtistsArr.push(value)
                    }
                }
            }
        }
    })
;