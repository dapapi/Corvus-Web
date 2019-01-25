<template>
    <div class="upload col-md-12 pl-0 ">
        <div class="col-md-2 text-right pl-0" :class="consdata[0].required===1?'require':''">{{consdata[0].control_title}}</div>
        <figure v-for="(item, index) in fileInfo" :key="index" style="margin-right:0px;width:100px;overfolw:hidden;" class="ml-10">
            <!-- <div class="image-show" v-if="fileInfo.length > 0" style="backgroundImage:url(../../../assets/img/attachment.png)"></div> -->
            <figure style="text-align:center;margin-top:30px;" class="attachdetail"> 
                <img src="@/assets/img/attachment.png" alt="" style="width:40px">
                <p style='text-overflow: ellipsis;'>{{item.fileName}}</p>
                <div class="img-control">
                    <!-- <hr> -->
                    <div class="icon-control">
                        <a :href="item.fileUrl" target="_blank">
                            <i class="iconfont icon-liulan"></i>
                        </a>
                        <i class="iconfont icon-shanchu1" @click="imgDelete(item)"></i>
                    </div>
                </div>
            </figure>
            
            <!-- <p>{{item.fileName.split('.')[0]}}</p> -->
        </figure>
        <div class="image-show">
            <span class="plus-icon">+</span>
            <input type="file" @change="uploadFile" accept="image/png,image/gif,image/jpeg,image/tiff,application/pdf" />
         </div>
         <DocPreview :url="fileUrl" :givenFileName="givenFileName" />
    </div>
</template>

<script>
import config from '@/assets/js/config'
import * as qiniu from 'qiniu-js'

export default {
    props:['consdata','clear'],
    name: 'ApprovalImageUploader',
    data(){
        return{
            fileInfo:[],
            fileExt:'',
            imgExt:['png','jpg','bmp','tif','gif'],
            fileUrl:'',
            givenFileName:'',
        }
    },
    mounted () {

    },
    computed:{
        // imageUrl(){
        //     switch (this.fileExt) {
        //         case 'json':
                    
        //             return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSdZjBgpqTiu5p0In6sbJDl_bvjX5BwDCSvhiEKJ3nmgwc_-k'

        //         case 'js':

        //             return 'data:image/png;base64,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'
                
        //         default:
        //             break;
        //     }
        // }
    },
    methods: {
        hoverHandler(){
            $('.img-control').css('display','block')
        },
        outHandler(){
            $('.img-control').css('display','none')
        },
        imgDelete(params){
            let {id} = this.consdata[0]
            let {related_field} = this.consdata[0]
            this.$delete(this.fileInfo,this.fileInfo.indexOf(this.fileInfo.find(item=>item.fileName === params.fileName)))
            this.$emit('change',{key:id,value:this.fileInfo,type:related_field})
        },
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
                    // _this.$emit('change', fileUrl, fileName, fileSize,_this.fileExt,_this.id);
                    let {id} = _this.consdata[0]
                    let {related_field} = _this.consdata[0]
                    
                    _this.fileInfo.push({fileUrl, fileName, fileSize})
                    _this.$emit('change',{key:id,value:_this.fileInfo,type:related_field})
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

        getFileExt(){
            this.fileExt = this.fileInfo.name.split('.').pop()
        }
    },
    watch:{
        fileInfo:function(val,oldval){
            if(val !== oldval){
                this.getFileExt()
            }
        },
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
    margin-bottom: 0 !important;
    text-overflow: ellipsis;
    overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
.icon-control{
    display: flex;
    justify-content: space-around;
    padding: 0 5px 0 5px;
}
.image-show{
    cursor: pointer;
    background-size: 80px;
    background-repeat: no-repeat;
    width: 80px;
    height: 80px;
    background-position-y: 60%;
    // border: 1px solid rgba(7,17,27,0.2);
    display:flex;
    align-items: center;
    justify-content: center;
}
hr{
    margin: 2px;    
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
