<template>
    <mavon-editor
            :defaultOpen="init.defaultOpen"
            :subfield="init.subfield"
            @change="save"
            @save="save"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            ref="md"
            v-model="content"
    >

    </mavon-editor>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import config from "./../js/config";
    import * as qiniu from 'qiniu-js'

    export default {
        props: ['data'],
        name: 'markdown',
        components: {
            mavonEditor
        },

        data() {
            return {
                init: {
                    scrollStyle: true,
                    defaultOpen: 'preview',
                    subfield: false
                }
            }
        },
        computed: {
            content: {
                get: function () {
                    return this.data
                },
                set: function () {
                    return this.data
                }
            }
        },
        mounted() {

        },
        methods: {
            $imgAdd(pos, $file){
                console.log($file)
                // 第一步.将图片上传到服务器.
                let file = $file
                let putExtra = null;
                let type = file.type.split('/');
                let key = this.guid() + '.' + type[type.length - 1];
                let conf = null;
                this.getQiniuAccessToken((token) => {
                    var observable = qiniu.upload(file, key, token, putExtra, conf);
                    var subscription = observable.subscribe((res) => {
                        //Next
                    }, (error) => {
                        console.log(error)
                    }, (res) => {
                        //Complate
                        toastr.success('上传图片成功')
                        let pictureUrl = config.imgUrl + res.key;
                        this.$refs.md.$img2Url(pos, pictureUrl)
                    })
                });
            },
            save: function (value, render) {
                console.log('markdown')
                this.$emit('change', value)
            },
            $imgDel: function () {

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

<style>

</style>