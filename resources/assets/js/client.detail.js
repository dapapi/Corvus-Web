import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';

let app = new Vue({
        el: '#root',
        data: {
            clientId: '',
            changeInfo: '',
            clientTypeArr: config.clientTypeArr,
            isEdit: false,
            clientInfo: '',
            clientTasksInfo: [],
            clientTrailsInfo: [],
            clientContactsInfo: [],
            contactName: '',
            contactPhone: '',
            contactPosition: '',
        },

        mounted() {

            this.getClient();
            this.getClientTrail();
        },

        watch: {},

        methods: {

            getClient: function () {
                this.clientId = Tool.getParameterByName('client_id');

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/' + this.clientId,
                    headers: config.getHeaders(),
                }).done(function (response) {
                    console.log(response)
                    app.clientInfo = response.data
                })
            },

            getClientTrail: function () {
                if (this.clientTrailsInfo.length > 0) {
                    return
                }

                this.clientId = Tool.getParameterByName('client_id');

                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/trails/search',
                    headers: config.getHeaders(),
                    data: {
                        type: 'clients',
                        id: this.clientId
                    }
                }).done(function (response) {
                    app.clientTrailsInfo = response.data

                })
            },

            getClientTask: function () {
                if (this.clientTasksInfo.length > 0) {
                    return
                }
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/' + this.clientId + '/tasks',
                    headers: config.getHeaders(),
                    data: {
                        type: 'clients',
                        id: app.clientId
                    }
                }).done(function (response) {
                    app.clientTasksInfo = response.data
                })
            },

            getClientProject: function () {

            },

            getClientContact: function () {
                if (app.clientContactsInfo.length > 0) {
                    return
                }
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/' + this.clientId + '/contacts',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    app.clientContactsInfo = response.data
                })
            },

            addContact: function () {
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/clients/' + this.clientId + '/contacts',
                    headers: config.getHeaders(),
                    data: {
                        name: app.contactName,
                        phone: app.contactPhone,
                        position: app.contactPosition
                    }
                }).done(function (response) {
                    console.log(response)
                    app.clientContactsInfo.push(response.data);
                    $('#addContact').modal('hide')
                })
            },

            changeClientBaseInfo: function () {

            },

            editBaseInfo: function () {
                app.isEdit = true
            },

            cancelEdit: function () {
                app.isEdit = false
            }

        }

    })
;