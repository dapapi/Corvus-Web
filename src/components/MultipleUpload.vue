<template>
    <div id='dropifyFather'>
        <input type="file" id="inputFile">
        <label for="inputFile">
            <slot></slot>
        </label>
    </div>
</template>

<script>

    import config from "../assets/js/config";

    export default {

        name: "MultipleUpload",
        data() {
            return {
            }
        },
        mounted() {

            this.guid();

            this.getQiniuAccessToken((token) => {
                this.qiniuUploaderInit(token)
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

            qiniuUploaderInit: function (token) {

                let uploadFileNames = {};
                let $toatr = $('#toatr');

                Qiniu.uploader({
                    disable_statistics_report: false,                                   // 禁止自动发送上传统计信息到七牛，默认允许发送
                    runtimes: 'html5,flash,html4',                                      // 上传模式，依次退化
                    browse_button: 'inputFile',                             // 上传选择的点选按钮，必需
                    container: 'dropifyFather',                                 // 上传区域DOM ID，默认是browser_button的父元素
                    drop_element: 'dropifyFather',                              // 拖拽上传区域
                    max_file_size: '100mb',                                             // 最大文件体积限制
                    flash_swf_url: 'Moxie.swf',                                         // 引入flash，相对路径
                    chunk_size: '4mb',                                                  // 分块上传时，每块的体积
                    uptoken: token,                                                     // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置,uptoken是上传凭证，由其他程序生成;uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func;其优先级为uptoken > uptoken_url > uptoken_func
                    domain: 'https://res-crm.papitube.com/',                                // bucket域名，下载资源时用到，必需
                    get_new_uptoken: true,                                              // 设置上传文件的时候是否每次都重新获取新的uptoken
                    auto_start: true,                                                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    max_retries: 3,                                                     // 上传失败最大重试次数
                    save_key: false,
                    unique_names: false,
                    init: {
                        'FilesAdded': function (up, files) {
                            plupload.each(files, function (file) {
                            });
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                            $toatr.show();
                            $toatr.html("上传进度:" + file.percent + "%");
                        },
                        'FileUploaded': (up, file, info) => {
                            $toatr.hide();
                            let url = JSON.parse(info.response).key;
                            $('#dropify-avatar-father').css({
                                'background-image': "url('" + config.imgUrl + url + "?imageView2/1/w/200/h/200')",
                                'border': 'none'
                            });
                            this.$emit('change', url);
                            toastr.success('上传成功')
                        },
                        'Error': function (up, err, errTip) {
                            console.log('附件上传失败')
                        },
                        'UploadComplete': function () {
                            $toatr.hide();
                        },
                        'Key': (up, file) => {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效
                            let type = file.type.split('/');
                            let key = this.guid() + '.' + type[type.length - 1];
                            uploadFileNames.key = file.name;
                            return key;
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>