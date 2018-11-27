<template>
    <div class="page">
        <div class="page-header page-header-bordered row">
            <h1 class="page-title col-md-2">公告&nbsp;&nbsp;({{broadCastInfo.length}})</h1>
        </div> 
        <div class="page-content container-fluid">
            <div class="panel " id="">
                <div class="panel-body">
                    <div class="">
                        <div class="table-responsive">
                            <table class="table table-hover" data-role="content" data-plugin="selectable" data-row-selectable="true">
                                <thead class="">
                                <tr>
                                    <td class="broadcast-title"><strong>标题</strong>
                                    </td>
                                    <td>
                                        <strong>分类</strong> 
                                    </td>
                                    <td></td>
                                    <td>
                                    <strong>发布时间</strong>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                    <strong>发布人</strong>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="broadcast-tr" v-for="item in broadCastInfo" :key="item.id">
                                    <td class="broadcast-title">
                                        <span class="broadcast-title-div">
                                            <router-link :to="{name:'broadcast/detail', params: {id: item.id}}">
                                                <span class="">{{item.title}}</span>
                                            </router-link>
                                        </span>
                                        <span class="broadcast-top-flag badge badge-outline badge-info" 
                                            v-if="item.topflag">置顶</span>
                                        <span class="broadcast-new-flag" v-if="item.readflag">
                                            <strong>NEW</strong>
                                        </span>
                                    </td>
                                    <td>{{item.type}}</td>
                                    <td></td>
                                    <td>
                                        <span>{{item.timeYMD}} {{item.timehms}}</span>
                                        <i class="icon md-time ml-10" aria-hidden="true"></i>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        {{item.name}}      
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddModifyBroadCast />
        </div>
    </div>
</template>

<script>
import broadCastData from './broadcast.json'
export default {
    data(){
        return{
             broadCastInfo:{}
        }
          
    },
    created() {
       this.broadCastInfo = broadCastData    
       this.dataInit()    
    },
    mounted(){

    },
    methods:{
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
    }
}
</script>

<style scoped>
.broadcast-title{
    /* width: 500px; */
    display: flex;
}
.broadcast-title-div{
    display: inline-block;
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.broadcast-top-flag{
    margin-left: 20px;
    color: #3298DC !important;
}
.broadcast-new-flag{
    margin-left: 20px;
    color: #F44336;
}
</style>
