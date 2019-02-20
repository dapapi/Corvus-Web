<template>
    <div class="page">
        <div class="loader-overlay" v-if="isLoading">
            <div class="loader-content">
                <div class="loader-index">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
        </div>
      </div>
      </div>
        <div class="page-header page-header-bordered pb-25">
            <h1 class="page-title">
                <i class="md-chevron-left" @click="goBack"></i>
                <span class="mx-20" style='color:#000'>返回</span>
            </h1>
            <i class="iconfont icon-gengduo1" aria-hidden="true"
            id="taskDropdown" data-toggle="dropdown" aria-expanded="false"  v-if="my_id === creator_id"></i>
            <div class="dropdown-menu" aria-labelledby="taskDropdown" role="menu">
                <a class="dropdown-item" role="menuitem" data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#confirmFlag"
            aria-hidden="true"
            data-backdrop="static"
            v-if="my_id === creator_id">删除</a>
                <a class="dropdown-item" role="menuitem" data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#addNewBroadcast"
            aria-hidden="true"
            data-backdrop="static"
            v-if="my_id === creator_id">修改</a>
            </div>
             <!-- <i class="iconfont icon-shanchu1 mr-30"
            data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#confirmFlag"
            aria-hidden="true"
            data-backdrop="static"
            v-if="my_id === creator_id"></i>
            <i class="iconfont icon-bianji2"
            data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#addNewBroadcast"
            aria-hidden="true"
            data-backdrop="static"
            v-if="my_id === creator_id"></i> -->
        </div> 
        <div class="page-content container-fluid">
            <div class="panel" id="">
                <div class="panel-body">
                    <h4 class="pt-20 pb-12">{{currentData.title}}</h4>
                    <div class="" v-if="currentData.creator" style='display:flex;line-height:28px;'>
                        <div class="rounded-circle messages-img" 
                            :style="{ backgroundImage: 'url('+userList.find(item=>item.id === creator_id).icon_url+')'}">
                        </div>
                        <span class="ml-6">{{currentData.creator.data.name}}</span>
                        <span class="">{{currentData.created_at}}</span>
                        <span v-if="classifyArr[0]" class="ml-20">{{classifyArr.find(classifyArr => classifyArr.value == currentData.classify).name}}</span>
                    </div>
                    <br>
                    <hr/>
                    <br>
                    <div class="panel-content" v-if="currentData.scope && department">
                        <h5 v-html="currentData.desc" class="broadcast-content"></h5>
                        <div v-if="currentData.affixes.data.length > 0"
                        data-plugin="actionBtn" 
                        data-toggle="modal" 
                        @click='previewHandler()'
                        aria-hidden="true"
                        ><a href="#" >查看附件</a></div>
                        <DocPreview :url='previewUrl' :givenfilename='currentData.accessory_name' />
                        <h5>公告范围
                            <span  v-for=" item in currentData.scope.data" :key="item.department_id" v-if="item.department_id">&nbsp;&nbsp;
                                <span v-if="department[0]" class="badge badge-round badge-dark">{{department.find(department => department.id == item.department_id).name}}</span>
                            </span>
                        </h5>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
        <AddModifyBroadCast :notedata='currentData' position='broadCast' @goback='goBack' @refresh='dataInit' :givenfilename='currentData.accessory_name'/>
        <div class="modal fade  bootbox" id="docPreviewSelector" aria-labelledby="docPreviewPositionCenter" data-backdrop="static"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple modal-center modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">请选择要预览的文件</h4>
                    </div>
                    <div class="modal-body">
                        <div v-for="(item, index) in previewUrlArr" :key="index" @click='previewHandler(item)'>
                            {{item}}
                            <!-- <figure>
                                <img class="ml-20 mt-20 float-left" :src="item" style='max-width:400px;border:1px solid rgba(7,17,27,0.5)' :alt="item" >
                            </figure> -->
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round" data-dismiss="modal">关闭</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import { mapState } from 'vuex'
import fetch from '@/assets/utils/fetch.js'
import config from '@/assets/js/config'

export default {
    data(){
        return{
            broadCastInfo:{},
            currentId:'',
            currentData:{},
            classifyArr:config.classifyArr,
            broadCastPost:{},
            paramsId:'',
            isLoading:true,
            creator_id:'',
            my_id:'',
            previewUrlArr:[],
            previewUrl:'',
        } 
    },
    created() { 
        this.whoami()
        this.getCurrentId()
        this.dataInit()
    },
    mounted(){
        // console.log(window.history);
    },
    computed: {
        ...mapState([
            'department',
            'userList'
        ]),
         
    },
    methods:{
        //初始化数据
        dataInit(){
            let _this = this
                fetch('get', '/announcements/'+this.currentId+'?include=scope,creator,affixes').then(function (response) {
                    _this.currentData = response.data
                    let {creator:{data:{id='-'}}} = response.data
                    _this.creator_id = id
                    _this.isLoading = false
                    _this.docPreviewHandler()

            })
        },
        docPreviewHandler(){
            let temp = this.currentData.affixes.data
            let tempArr = []
            this.previewUrlArr = []
            for (const key in temp) {
                console.log(temp[key].url);
                this.previewUrlArr.push(temp[key].url)
                // if (object.hasOwnProperty(key)) {
                //     const element = object[key];
                    
                // }
            }
        },
        previewHandler(params) {
            this.docPreviewHandler()
            $('#docPreviewSelector').modal('hide')
            if(params){
                this.previewUrlArr = String(params).split(',')
            }
            if (this.previewUrlArr.length === 1) {
                $('#docPreview').modal('show')
                console.log(this.previewUrlArr);
                this.previewUrl = this.previewUrlArr[0]
            } else {
                $('#docPreviewSelector').modal('show')
            }
        },
        //获取公告id
        getCurrentId(){
            this.currentId = this.$route.params.id
        },
        //后退
        goBack(){
            history.go(-1)
        },
        whoami(){
            let _this = this
            fetch('get','/users/my').then((params) => {
                _this.my_id = params.data.id
            })
        },
    }
}

</script>

<style scoped>
hr{
    margin: 0 !important;
}
iframe{
    position: fixed;

}
.page{
    margin-left: 260px !important;
}
.loader-overlay{
        margin-left: 100px;
        background-color: rgba(7, 17, 27, 0.2)
    }
.broadcast-content{
    min-height: 200px;
}
.iconfont{
    position: absolute;
    right: 41px;
    top: 28px;
    cursor: pointer;
}
.md-chevron-left{
    font-size: 30px;
    cursor: pointer;
    color:#CACACA;
}
.panel-content{
    margin-left: 20px;
    margin-right: 20px; 
}
.panel-title{
    padding-left: 10px;
}
h5{
    margin-bottom: 20px;
    line-height: 25px;
}
/* .info span{
    margin-left: 6px;
} */
span{
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
margin-left: 6px;
}
.badge-dark{
    background-color: rgba(236, 236, 236, 1);
    color: #999999;
}
.messages-img{
    display: inline-flex;
    width: 28px;
    height: 28px;
    background-size: 28px 28px;
}
</style>
