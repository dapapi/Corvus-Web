<template>
      <div class="page-main">
        <div class="page-header" style="left:100px">
          <h1 class="page-title">审批</h1>
        </div>
         <div class="page">
        <div class="page-aside">
                <div class="page-aside-switch">
                <i class="icon md-chevron-left" aria-hidden="true"></i>
                <i class="icon md-chevron-right" aria-hidden="true"></i>
                </div>
               <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical" style="position: relative;">
                    <div data-role="container" class="scrollable-container" style="height: 691px; width: 219px;">
                        <div data-role="content" class="scrollable-content" style="width: 219px;">
                        <section class="page-aside-section" style="paddingTop:0">
                            <div class="list-group">
                            <router-link to="/approval/initiate" style="text-decoration:none">
                               <a class="list-group-item" href=""><i class="icon md-view-dashboard" aria-hidden="true"></i>发起审批</a>
                            </router-link>
                            <router-link to="/approval/application" style="text-decoration:none">
                                <a class="list-group-item " href=""><i class="icon md-view-dashboard" aria-hidden="true"></i>我的申请</a>
                            </router-link >
                             <router-link to="/approval/my" style="text-decoration:none">
                               <a class="list-group-item " href=""><i class="icon md-view-dashboard" aria-hidden="true"></i>我的审批</a>
                            </router-link>
                            <router-link to="/approval/only" style="text-decoration:none">
                                <a class="list-group-item " href=""><i class="icon md-view-dashboard" aria-hidden="true"></i>知会我的</a>
                            </router-link>
                            </div>
                        </section>
                        <section class="page-aside-section">
                            <h5 class="page-aside-title">审批报表</h5>
                            <h5 class="page-aside-title">审批汇总</h5>
                        </section>
                        </div>
                    </div>
                 <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false"><div class="scrollable-bar-handle"></div></div></div>
            </div>
            
        </div>
    </div>
</template>
<style>
  .page-content{
        padding: 20px;
    }
    .page-header{
        padding: 20px;
    }
</style>




