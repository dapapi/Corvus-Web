<template>
<div class="page  page-aside-left">
    <second-left :leftData="leftData" :title="'工作台'"></second-left>
    <router-view/>
</div>
</template>

<script>
import fetch from '@/assets/utils/fetch'
import secondLeft from '@/components/SecondLeft.vue'
import config from '@/assets/js/config'
export default {
     components:{
       secondLeft
     },
     data(){
         return {
            leftData:[]
         }
     },
     mounted(){
        this.setData()
     },
     methods:{
        setData:function(){
            this.leftData =[
                {
                id:1,
                name:'我的消息',
                url:'/my/message',
                type:'link',
                level:1
                },
                {
                id:2,
                name:'我的项目',
                url:'/my/project',
                type:'link',
                level:1
                },
                {
                id:3,
                name:'我的任务',
                url:'/my/task',
                type:'link',
                level:1
                },
                 {
                id:4,
                name:'我的日程',
                url:'/my/schedule',
                type:'link',
                level:1
                },
                {
                id:5,
                name:'我审批的',
                url:'/my/approval',
                type:'link',
                level:1
                },
                {
                id:6,
                name:'我的公告',
                url:'/my/broadcast',
                type:'link',
                level:1
                }
            ]
        }
     }
}
</script>
<style scoped>
.router-link-active{
  background: #F1F1F1;
}
.panel{
  margin-bottom: 0;
  border-radius: 0;
}
</style>


