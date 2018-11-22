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
                            <a class="list-group-item active" href="/initiate"><i class="icon md-view-dashboard" aria-hidden="true"></i>发起审批</a>
                            <a class="list-group-item " href="/application"><i class="icon md-view-dashboard" aria-hidden="true"></i>我的申请</a>
                            <a class="list-group-item" href="/my"><i class="icon md-assignment" aria-hidden="true"></i>我的审批</a>
                            <a class="list-group-item" href="/only"><i class="icon md-favorite" aria-hidden="true"></i>知会我的</a>
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

