<template>
    <input
            type="file"
            class="dropify"
            data-max-file-size="500M"
    />
</template>
<script>
    import config from "./../js/config";
    import * as qiniu from 'qiniu-js'

    export default {
        name: "file-uploader",
        props: [],
        mounted() {
            let self = this;

            $(this.$el).dropify({
                messages: {
                    'default': '请点击或者拖放一个文件到这里',
                    'replace': '拖放或者点击更新图片',
                    'remove': '删除',
                    'error': '上传出现错误'
                },
                error: {
                    'fileSize': '文件最大为 ({{ value }}).'
                }
            }).change(function (e) {
                let file = e.target.files[0];
                let putExtra = null;
                let type = file.type.split('/');
                let key = self.guid() + '.' + type[type.length - 1];
                let conf = null;
                self.getQiniuAccessToken((token) => {
                    var observable = qiniu.upload(file, key, token, putExtra, conf);
                    var subscription = observable.subscribe(function (res) {
                        //Next
                    }, function (error) {
                        console.log(error)
                    }, function (res) {
                        //Complate
                        let pictureUrl = config.imgUrl + res.key;
                        let pictureName = file.name;
                        self.$emit('change', pictureUrl, pictureName);
                        toastr.success('上传成功')
                    })
                });

            });

        },
        methods: {
            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },

            getQiniuAccessToken: function (callback) {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/services/get_qiniu_token',
                    headers: config.getHeaders(),
                    statusCode: config.getStatusCode()
                }).done(function (response) {
                    callback(response.token)
                })
            },
        }
    }
</script>

<style scoped>

</style>