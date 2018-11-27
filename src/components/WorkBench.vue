<template>
     
     <div class="page-aside" style="width:240px;top:90px;left:20px;">
      <div class="page-aside-switch">
        <i class="icon wb-chevron-left" aria-hidden="true"></i>
        <i class="icon wb-chevron-right" aria-hidden="true"></i>
      </div>
      <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical" style="position: relative;">
        <div data-role="container" class="scrollable-container" style="height: 691px; width: 259px;">
          <div data-role="content" class="scrollable-content" style="width: 259px;">
            <section class="page-aside-section pt-0">
              <div class="list-group">
                <router-link class="list-group-item" to="/approval/initiate">我的项目</router-link>
                <router-link class="list-group-item" to="/approval/application">我的任务</router-link>
                <router-link class="list-group-item" to="/approval/my">我的日程</router-link>
                <router-link class="list-group-item" to="/approval/only">我的审批</router-link>
                <router-link class="list-group-item" to="/approval/only">我的公告</router-link>
              </div>
            </section>
          </div> 
        </div> 
        </div>    
      </div>
      
</template>
