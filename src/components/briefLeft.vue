<template>
    <div class="page-aside">
        <div class="page-aside-switch">
          <i class="icon wb-chevron-left" aria-hidden="true"></i>
          <i class="icon wb-chevron-right" aria-hidden="true"></i>
        </div>
        <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical" style="position: relative;">
          <div data-role="container" class="scrollable-container" style="height: 691px; width: 259px;">
            <div data-role="content" class="scrollable-content" style="width: 259px;">
              <section class="page-aside-section">
                <h5 class="page-aside-title">简报</h5>
                <div class="list-group">
                  
                  <router-link class="list-group-item" to="{ path: '/brief/home'}">提交简报</router-link>
                  <router-link class="list-group-item" to="{ path: '/brief/home'}">我审批的</router-link>
                  <router-link class="list-group-item" to="{ path: '/brief/home'}">跟进的问题</router-link>
                </div>
              </section>
              <section class="page-aside-section">
                <ul class="site-menu" data-plugin="menu">
                    <li class="site-menu-item has-sub">
                         <a class="site-menu-title" href="">我的简报</a>
                         <ul class="site-menu-sub">
                            <li class="site-menu-item">
                                 我的周报
                            </li>
                            <li class="site-menu-item">
                                 我的月报
                            </li>
                            <li class="site-menu-item">
                            
                            </li>
                         </ul>
                    </li>
                    <li class="site-menu-item has-sub">
                         <a class="site-menu-title" href="">成员简报</a>
                         <ul class="site-menu-sub">
                            <li class="site-menu-item">

                            </li>
                         </ul>
                    </li>
                    <li class="site-menu-item has-sub">
                         <a class="site-menu-title" href="">简报统计</a>
                         <ul class="site-menu-sub">
                            <li class="site-menu-item">

                            </li>
                         </ul>
                    </li>
                </ul>
              </section>
            </div>
          </div>
        <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false"><div class="scrollable-bar-handle"></div></div>
        </div>
      </div>
</template>
