<template>
<div class="page  page-aside-left">
    <second-left :leftData="leftData" :title="'工作台'"></second-left>
    <router-view/>
    <!-- <div class="page-header page-header-bordered mt-0 mb-0">
        <h1 class="page-title">工作台</h1>
    </div> -->
    <!-- <div class="page-content container-fluid pt-30" style="height:auto">
          <div class="panel col-md-12 p-20 clearfix " style="height:auto ">
          <div class="col-md-2 float-left py-0" >
            <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical" style="position: relative;">
            <div data-role="container" class="scrollable-container" >
            <div data-role="content" class="scrollable-content">
              <section class="page-aside-section pt-0 m-0">
                <div class="list-group text-left mb-0">
                  <router-link class="list-group-item " to="/my/project" >我的项目</router-link>
                  <router-link class="list-group-item " to="/my/task">我的任务</router-link>
                  <router-link class="list-group-item " to="/my/schedule">我的日程</router-link>
                  <router-link class="list-group-item " to="/my/approval">我的审批</router-link>
                  <router-link class="list-group-item " to="/my/broadcast">我的公告</router-link>
                </div>
              </section>
            </div> 
          </div> 
          </div>    
          </div> 
          <div class="col-md-10  float-left py-0 pr-0">
           <router-view></router-view>
          </div>
          </div>
    </div>  -->
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
            leftData:{
               topData:[]
            },
         }
     },
     mounted(){
        this.setData()
     },
     methods:{
        setData:function(){
            this.leftData.topData =[
                {
                value:1,
                name:'我的消息',
                url:'/my/message'
                },
                {
                value:2,
                name:'我的项目',
                url:'/my/project'
                },
                {
                value:3,
                name:'我的任务',
                url:'/my/task'
                },
                 {
                value:4,
                name:'我的日程',
                url:'/my/schedule'
                },
                {
                value:5,
                name:'我审批的',
                url:'/my/approval'
                },
                {
                value:6,
                name:'我的公告',
                url:'/my/broadcast'
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


