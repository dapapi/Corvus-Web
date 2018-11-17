import config from "./config";
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            total: 0,
            current_page: 1,
            total_pages: 1,
            customizeInfo: config.customizeInfo,
            projectStatus: config.projectStatus,
            yesOrNoArr: config.yesOrNoArr,
            artistStatusArr: config.artistStatusArr,
            papiCommunicationStatusArr: config.papiCommunicationStatusArr,
            artistsInfo: '',
            artistStatus: '',
            artistName: '',
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
            artistTypeArr: '',
            signCompanyName: '',
        },

        mounted() {
            this.getArtists()
        },

        methods: {
            getArtists: function (page = 1) {
                let data = {
                    page: page,
                    include: 'creator,tasks,affixes,producer,type',
                };

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/bloggers',
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

            changeWeiboFansNum: function (value) {
                app.weiboFansNum = value
            },

            changeDouyinFansNum: function (value) {
                app.douyinFansNum = value
            },

            changeXHSFansNum: function (value) {
                app.xhsFansNum = value
            },

            addArtist: function () {
                let data = {
                    // 没有平台,微博,抖音,小红书
                    nickname: app.artistName,
                    gender: app.artistGender,
                    type_id: '1994731356',
                    communication_status: app.communicationStatus,
                    intention: app.signIntention,
                    intention_desc: app.notSignReason,
                    sign_contract_other: app.signCompany,
                    sign_contract_other_name: app.signCompanyName,
                };
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/bloggers',
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
                    redirect('papi/detail?artist_id=' + response.data.id)
                })
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
            },

            changeArtistType: function (value) {
                console.log(value)
            },

            redirectArtistDetail: function (artistId) {
                redirect('papi/detail?artist_id=' + artistId)
            }
        }
    })
;