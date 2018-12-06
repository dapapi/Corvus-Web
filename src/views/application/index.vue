<template>
<div class="page">
    <div class="page-header page-header-bordered mt-0 mb-0">
        <h1 class="page-title">工作台</h1>
    </div>
    <div class="page-content container-fluid p-20" style="height:auto">
          <div class="panel col-md-12 p-20 clearfix " style="height:auto ">
          <div class=" float-left py-0" style="width: 15%; height:100%; position: relative;">
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
          <div class=" float-left py-0" style="width:80%; height:100%;">
           <router-view></router-view>
          </div>
          </div>
    </div> 
</div>


</template>

<script>
  export default{

}
</script>
<style scoped>

.page-aside{
  margin:90px 0 0 20px;
}
.router-link-active{
  background: #F1F1F1;
}
.panel{
  margin-bottom: 0;
}
</style>


