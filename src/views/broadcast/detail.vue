<template>
    <div class="page">
        <div class="page-header page-header-bordered row">
            <i class="icon md-chevron-left" @click="goBack"></i>
            <h1 class="page-title col-md-2">公告&nbsp;&nbsp;({{broadCastInfo.length}})</h1>
            <i class="icon md-flower"></i>
        </div> 
        <div class="page-content container-fluid">
            <div class="panel " id="">
                <div class="panel-body">
                    <div class="panel-title col-md-12"><h4>{{currentData.title}}</h4></div>
                    <div class="panel-content col-md-12 row">
                        <div class="rounded-circle img-thumbnail messages-img" 
                            :style="{ backgroundImage: 'url('+currentData.cover+')'}"></div>
                        <span class=" col-md-1">{{currentData.name}}</span>
                        <span class="col-md-2">{{currentData.timeYMD}}&nbsp;&nbsp;{{currentData.timehms}}</span>
                        <span class="col-md-1">{{currentData.type}}</span>
                    </div>
                    <br>
                    <hr/>
                    <br>
                    <div class="panel-content">
                        <h5>{{currentData.text}}</h5>
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
    </div>   
</template>

<script>
import broadCastData from './broadcast.json'
export default {
    data(){
        return{
             broadCastInfo:{},
             currentId:'',
             currentData:{}
        } 
    },
    created() {
       this.broadCastInfo = broadCastData    
       this.dataInit() 
       this.getCurrentId()
       this.getCurrentData()
    },
    mounted(){
        
    },
    methods:{
        getCurrentId(){
            this.currentId = window.location.href.split('/').pop()
        },
        getCurrentData(){
            for (const key in this.broadCastInfo) {
                if (this.broadCastInfo[key].id==this.currentId) {
                    this.currentData = this.broadCastInfo[key]
                }
            }
        },
        //初始化数据
        dataInit(){
        for (const key in broadCastData) {
            let orignTime = broadCastData[key].time
            broadCastData[key].timeYMD = this.timeFormat(orignTime).formatYMD
            broadCastData[key].timehms = this.timeFormat(orignTime).formathms
        }
        this.broadCastInfo = broadCastData
        },
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
        }
    }
}

</script>

<style scoped>
.md-chevron-left{
    font-size: 30px;
    cursor: pointer;
    color:#CACACA;
}
.panel-content{
    top: -10px;
    margin-bottom: -15px;
    margin-left: 20px;
    margin-right: 20px;
}
h5{
    margin-bottom: 20px;
}
span{
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
}
.badge-dark{
    background-color: rgba(236, 236, 236, 1);
    color: #999999;
}
/* .row{
    margin-left: 20px;
    margin-right: 20px;
} */
.messages-img{
    width: 24px;
    height: 24px;
    background: #D8D8D8;
    border: 1px solid #979797;
    /* margin-right: 17px; */
    background-size: 24px 24px;
}
</style>
