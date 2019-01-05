<template>
    <div class="upload col-md-12 pl-0 ">
        <div class="col-md-2 text-right pl-0" :class="data[0].required===1?'require':''">{{data[0].control_title}}</div>
        <figure v-for="(item, index) in fileInfo" :key="index" >
            <div class="image-show" v-if="fileInfo.length > 0" :style="'backgroundImage:url('+item.fileUrl+')'"></div>
            <p>{{item.fileName}}</p>
        </figure>
        <div class="image-show">
            <span class="plus-icon">+</span>
            <input type="file" @change="uploadFile" accept="image/png,image/gif,image/jpeg,image/tiff,application/pdf" />
         </div>
         <DocPreview />
    </div>
</template>

<script>
import config from '@/assets/js/config'
import * as qiniu from 'qiniu-js'

export default {
    props:['data','clear'],
    name: 'ApprovalImageUploader',
    data(){
        return{
            fileInfo:[],
        }
    },
    mounted () {
    },
    computed:{
    },
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
            } else if (type[type.length - 1] === 'plain') {
                type[type.length - 1] = 'txt';
            }
            let key = this.guid() + '.' + type[type.length - 1];
            let conf = null;
            let fileSize = file.size;
            let _this = this;
            this.getQiniuAccessToken((token) => {
                let observable = qiniu.upload(file, key, token, putExtra, conf);
                let subscription = observable.subscribe(function (res) {
                }, function (error) {
                    console.log(error)
                }, function (res) {
                    let fileUrl = config.imgUrl + res.key;
                    let fileName = file.name;
                    let {id} = _this.data[0]
                    _this.$emit('change',{key:id,value:fileUrl,type:null})
                    _this.fileInfo.push({fileUrl, fileName, fileSize})
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
    },
    watch:{
         clear:function(value){
            if(value===true){
                this.fileInfo = []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
p{
    text-align: center;
}
figure{

}
.image-show{
    cursor: pointer;
    background-size: 80px;
    background-repeat: no-repeat;
    width: 80px;
    height: 80px;
    border: 1px solid rgba(7,17,27,0.2);
    display:flex;
    justify-content: center;
}
.plus-icon{
    font-size: 50px;
}
.upload {
    position: relative;
    display: flex;
    input[type="file"] {
        opacity: 0;
        position: absolute;
        width: 80px;
        height: 80px;
        z-index: 10;
    }
}
</style>
