<template>
    <input type="file" @change="uploadFile">
</template>

<script>
    import config from '../js/config';
    import * as qiniu from 'qiniu-js'


    export default {
        name: "file-uploader",
        methods: {
            uploadFile(e) {
                let file = e.target.files[0];
                let putExtra = null;
                let type = file.type.split('/');
                if (type[type.length - 1] === 'vnd.ms-powerpoint') {
                    type[type.length - 1] = 'ppt';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.presentationml.presentation') {
                    type[type.length - 1] = 'pptx';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    type[type.length - 1] = 'xlsx';
                }
                let key = this.guid() + '.' + type[type.length - 1];
                let conf = null;
                let fileSize = file.size;
                let _this = this;
                this.getQiniuAccessToken((token) => {
                    console.log(token);
                    let observable = qiniu.upload(file, key, token, putExtra, conf);
                    let subscription = observable.subscribe(function (res) {
                    }, function (error) {
                        console.log(error)
                    }, function (res) {
                        let fileUrl = config.imgUrl + res.key;
                        let fileName = file.name;
                        _this.$emit('change', fileUrl, fileName, fileSize);
                    })
                });
            },

            getQiniuAccessToken: function (callback) {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/services/request_qiniu_token',
                    headers: config.getHeaders(),
                    // statusCode: config.getStatusCode()
                }).done(function (response) {
                    callback(response.data.token)
                })
            },

            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },
        }
    }
</script>

<style scoped>

</style>