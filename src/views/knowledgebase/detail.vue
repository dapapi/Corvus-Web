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
        <div class="page-header page-header-bordered">
            <h1 class="page-title">
                <i class="md-chevron-left" @click="goBack"></i>知识库&nbsp;&nbsp;</h1>
            <i class="md-flower"
            data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#addNewBroadcast"
            aria-hidden="true"
            data-backdrop="static"></i>
        </div> 
        <div class="page-content container-fluid">
            <div class="panel" id="">
                <div class="panel-body">
                    <div class="panel-title"><i class="iconfont icon-T"></i><h4>{{currentData.title}}</h4></div>
                    <div class="panel-content info" v-if="currentData.creator">
                        <div class="rounded-circle img-thumbnail messages-img" 
                            :style="{ backgroundImage: 'url('+currentData.cover+')'}">
                            {{currentData.cover?'':currentData.creator.data.name.slice(-1)}}
                            </div>
                        <span class="">{{currentData.creator.data.name}}</span>
                        <span class="">{{currentData.created_at}}</span>
                        <span v-if="classifyArr[0]" class="">{{classifyArr.find(classifyArr => classifyArr.value == currentData.classify).name}}</span>
                    </div>
                    <br>
                    <hr/>
                    <br>
                    <div class="panel-content" v-if="currentData.scope && department">
                        <h5 v-html="currentData.desc" class="broadcast-content"></h5>
                        <div v-if="currentData.accessory"><a :href="currentData.accessory">查看附件</a></div>
                        <h5 class="">公告范围
                            <span  v-for=" item in currentData.scope.data" :key="item.department_id">&nbsp;&nbsp;
                                <span v-if="department[0]" class="badge badge-round badge-dark">{{department.find(department => department.id == item.department_id).name}}</span>
                            </span>
                            <div class="float-right row mr-20">
                                <div class="mr-80 add-comment" @click='addComment'><i class="iconfont icon-pinglun"></i>评论</div>
                                <div class="mr-80"><i class="iconfont icon-weidu"></i>未读 0</div>
                                <div><i class="iconfont icon-yiduxiaoxi"></i>已读 0</div>
                            </div>
                        </h5>
                        <hr>
                        
                            <change-size-input @change="commentSubmit" :addcomment="isComment" />

                        <div class="col-md-1" style="margin: 6rem auto">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddModifyBroadCast :notedata='currentData' position='broadCast' @goback='goBack' @refresh='dataInit' />
    </div>   
</template>

<script>
import { mapState, mapActions } from 'vuex'
import fetch from '../../assets/utils/fetch.js'
import config from '../../assets/js/config'
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
            isComment:false,
        } 
    },
    created() { 
        this.getCurrentId()
        this.dataInit()

    },
    mounted(){
        if (this.department.length === 0) {
            this.getDepartment()
        }
    },
    computed: {
        ...mapState([
            'department',
        ]),
    },

    methods:{
        ...mapActions([
            'getDepartment', // 获取部门数据
        ]),
        //初始化数据
        dataInit(){
            let _this = this
                fetch('get', '/announcements/'+this.currentId+'?include=scope,creator').then(function (response) {
                    _this.currentData = response.data
                    _this.isLoading = false
            })
        },
        //获取公告id
        getCurrentId(){
            this.currentId = this.$route.params.id
        },
        //后退
        goBack(){
            history.go(-1)
        },

        addComment(){
            this.isComment = !this.isComment;
        },
        commentSubmit(value){
            console.log(value);
        }
    }
}

</script>

<style scoped>
.add-comment{
    cursor: pointer;
}
.loader-overlay{
        margin-left: 100px;
        background-color: rgba(7, 17, 27, 0.2)
    }
.broadcast-content{
    min-height: 200px;
}
.md-flower{
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
.info span{
    margin-left: 20px;
}
span{
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
/* margin-left: 20px; */
}
.badge-dark{
    background-color: rgba(236, 236, 236, 1);
    color: #999999;
}
.messages-img{
    line-height: 16px;
    font-weight: 700;
    display: inline-flex;
    width: 24px;
    height: 24px;
    background: #D8D8D8;
    border: 1px solid #979797;
    background-size: 24px 24px;
}
</style>
