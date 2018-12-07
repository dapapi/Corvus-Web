<template>
    <div>
        <input type="file" @change="uploadFile">
        <div class="progress progress-xs" v-if="progressShow">
                        <div class="progress-bar progress-bar-striped active" aria-valuemin="0" aria-valuemax="100" :style="'width:'+ uploadProgress+'%'" role="progressbar">
                          <span class="sr-only">90% Complete</span>
                        </div>
                      </div>
    </div>
</template>

<script>
    import config from '../assets/js/config';
    import * as qiniu from 'qiniu-js'


    export default {
        props:['id'],
        name: "FileUploader",
        data(){
            return{
                uploadProgress:0,
                progressShow:false,
            }
        },
        methods: {
            uploadFile(e) {
                this.progressShow = true
                this.uploadProgress = 0
                let _this = this
                let uploadGo = setInterval(() => {
                    _this.uploadProgress += 10
                    if(_this.uploadProgress == 80){
                        clearInterval('uploadGo')
                    }
                },500)
                let file = e.target.files[0];
                let putExtra = null;
                let type = file.type.split('/');
                if (type[type.length - 1] === 'vnd.ms-powerpoint') {
                    type[type.length - 1] = 'ppt';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.presentationml.presentation') {
                    type[type.length - 1] = 'pptx';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    type[type.length - 1] = 'xlsx';
                } else if (type[type.length - 1] === 'plain') {
                    type[type.length - 1] = 'txt';
                }
                let key = this.guid() + '.' + type[type.length - 1];
                let conf = null;
                let fileSize = file.size;
                this.getQiniuAccessToken((token) => {
                    let observable = qiniu.upload(file, key, token, putExtra, conf);
                    let subscription = observable.subscribe(function (res) {
                    }, function (error) {
                        console.log(error)
                    }, function (res) {
                        let fileUrl = config.imgUrl + res.key;
                        let fileName = file.name;
                        _this.uploadProgress = 100;
                        setTimeout(() => {
                            _this.progressShow = false
                        },1000)
                        _this.$emit('change', fileUrl, fileName, fileSize,_this.id);
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
    .progress{
        margin-top: 10px;
        width: 200px;
    }
</style>