<template>
    <div class="page">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">
                <i class="icon md-chevron-left" @click="goBack"></i>公告&nbsp;&nbsp;({{broadCastInfo.length}})</h1>
            <i class="icon md-flower" 
            data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#addNewBroadcast"
            aria-hidden="true"
            data-backdrop="static"></i>
        </div> 
        <div class="page-content container-fluid">
            <div class="panel" id="">
                <div class="panel-body">
                    <div class="panel-title"><h4>{{currentData.title}}</h4></div>
                    <div class="panel-content info">
                        <div class="rounded-circle img-thumbnail messages-img" 
                            :style="{ backgroundImage: 'url('+currentData.cover+')'}"></div>
                        <span class="">{{currentData.creator_id}}</span>
                        <span class="">{{currentData.created_at}}</span>
                        <span class="">{{classifyArr.find(classifyArr => classifyArr.value == currentData.classify).name}}</span>
                    </div>
                    <br>
                    <hr/>
                    <br>
                    <div class="panel-content">
                        <h5 v-html="currentData.desc"></h5>
                        <h5>公告范围
                            <span  v-for=" item in currentData.range" :key="item">&nbsp;&nbsp;
                                <span class="badge badge-round badge-dark">{{item}}</span>
                            </span>
                        </h5>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
        <AddModifyBroadCast :noteData='currentData' position='broadCast' @sendnote='getNote' />
    </div>   
</template>

<script>
import fetch from '../../assets/utils/fetch.js'
import config from '../../assets/js/config'
export default {
    data(){
        return{
            broadCastInfo:{},
            currentId:'',
            currentData:{},
            classifyArr:config.classifyArr,
        } 
    },
    created() { 
       this.dataInit()

    },
    mounted(){
        
    },
    methods:{
        //初始化数据
        dataInit(){
            let _this = this
                fetch('get', '/announcements').then(function (response) {
                    console.log(response.data);
                    _this.broadCastInfo = response.data
                    _this.getCurrentId()
                    _this.getCurrentData()
            })
        },
        //获取公告id
        getCurrentId(){
            this.currentId = this.$route.params.id
            // this.currentId = window.location.href.split('/').pop()
        },
        //获取公告内容
        getCurrentData(){
            for (const key in this.broadCastInfo) {
                if (this.broadCastInfo[key].id==this.currentId) {
                    this.currentData = this.broadCastInfo[key]
                }
            }
        },
        //初始化数据
        // dataInit(ref){
        //     // console.log(ref);
        //     for (const key in ref) {
        //         let orignTime = ref[key].time
        //         ref[key].timeYMD = this.timeFormat(orignTime).formatYMD
        //         ref[key].timehms = this.timeFormat(orignTime).formathms
        //     }
        //     this.broadCastInfo = ref
        // },
        //日期格式化
        timeFormat(ref){
            let date = new Date(ref);
            let Y = date.getFullYear()
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
            let D = date.getDate()
            let h = date.getHours()
            let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()):date.getMinutes())
            let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds())
            let formatYMD = Y+'-'+M+'-'+D
            let formathms = h+':'+m+':'+s
            return{
                formatYMD,formathms
            }
        },
        goBack(){
            history.go(-1)
        },
        getNote(ref){
            let orignTime = ref.time
            ref.timeYMD = this.timeFormat(orignTime).formatYMD
            ref.timehms = this.timeFormat(orignTime).formathms
            this.currentData = ref
        }
    }
}

</script>

<style scoped>
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
    display: inline-flex;
    width: 24px;
    height: 24px;
    background: #D8D8D8;
    border: 1px solid #979797;
    background-size: 24px 24px;
}
</style>
