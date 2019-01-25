<template>
    <div class="" >
        <div style="display:flex">
            <label :for="`fileUploader${mulId}`" :class="isIcon ? 'md-attachment-alt pr-4': 'btn btn-default waves-effect waves-light waves-round'" style='height:35px'>
                <template v-if="!isIcon">
                    上传附件
                </template>
            </label>
            <figure style="text-align:center;" class="attachdetail ml-20" v-if="broadcast"> 
                <img src="@/assets/img/attachment.png" alt="" style="width:40px" v-if="fileName || givenfilename ">
                <p class="pt-10">{{fileName || givenfilename ||"未选择任何附件"}}</p>
                <div class="img-control" v-if="fileName || givenfilename ">
                    <div class="icon-control">
                        <a :href="fileUrl" target="_blank">
                            <i class="iconfont icon-liulan"></i>
                        </a>
                        <i class="iconfont icon-shanchu1" @click="imgDelete"></i>
                    </div>
                </div>
            </figure>
        </div>
        <span v-show="!isIcon && !broadcast">&nbsp;&nbsp;{{fileName || givenfilename ||"未选择任何附件"}}</span>
        <input type="file" @change="uploadFile" title='123' :id="`fileUploader${mulId}`" v-show="false">
        <div class="progress progress-xs pl-88" v-if="progressShow" v-show="!isIcon">
            <div class="progress-bar progress-bar-striped active" aria-valuemin="0" aria-valuemax="100"
                 :style="'width:'+ uploadProgress+'%'" role="progressbar">
                <span class="sr-only">Uploading</span>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../assets/js/config';
    import * as qiniu from 'qiniu-js'

    export default {
        props: ['id', 'givenfilename', 'isIcon','mulId','broadcast'],
        name: "FileUploader",
        data() {
            return {
                uploadProgress: 0,
                progressShow: false,
                fileName: '',
                fileUrl:'',
            }
        },
        methods: {
            imgDelete(){
                this.fileName = ''
                this.$emit('deleteAttachment')
            },
            uploadFile(e) {
                this.progressShow = true
                this.uploadProgress = 0
                let _this = this
                let uploadGo = setInterval(() => {
                    _this.uploadProgress += 10
                    if (_this.uploadProgress == 80) {
                        clearInterval('uploadGo')
                    }
                }, 500)
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
                        }, 1000)
                        _this.$emit('change', fileUrl, fileName, fileSize, _this.id);
                        _this.$emit('changePlus', {fileUrl, fileName, fileSize})
                        _this.fileName = fileName
                        _this.fileUrl = fileUrl
                    })
                });
            },

            getQiniuAccessToken: function (callback) {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/services/request_qiniu_token',
                    headers: config.getHeaders(),
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
    .progress {
        margin-top: 10px;
        width: 200px;
    }
    .icon-control{
        display: flex;
        justify-content: space-around;
    }
</style>