<template>
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
                                            v-if="item.stick">置顶</span>
                                        <span class="broadcast-new-flag" v-if="item.readflag">
                                            <strong>NEW</strong>
                                        </span>
                                    </td>
                                    <td>{{classifyArr.find(classifyArr => classifyArr.value == item.classify).name}}</td>
                                    <td></td>
                                    <td>
                                        <span>{{item.created_at}}</span>
                                        <i class="icon md-time ml-10" aria-hidden="true"></i>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        {{item.creator_id}}      
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script>
import fetch from '../../assets/utils/fetch.js'
import config from '../../assets/js/config'
export default {
    data(){
        return{
             broadCastInfo:{},
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
            })
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
        // getBroadCast(){
        //      let _this = this
        //         fetch('get', '/users').then(function (response) {
        //                  _this.memberList = response.data
        //         })
        // }
    }
}

</script>
<style>
.broadcast-title-div{
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.broadcast-top-flag{
    margin-left: 20px;
    margin-right: 20px;
    color: #3298DC !important;
}
.broadcast-new-flag{
    color: #F44336;
}
.panel{
    box-shadow: 0 0 0 0;
}
</style>

