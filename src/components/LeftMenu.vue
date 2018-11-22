<template>
    <div class="site-menubar" style="height: 100%!important;top: 0;width: 100px">
        <div class="site-menubar-body">
            <div>
                <div>
                    <div class="font-size-24 font-weight-bold text-center py-20"
                         style="color: white;background-color: #3f51b5">
                        泰洋系
                    </div>
                    <ul class="site-menu" data-plugin="menu" style="transform: translate3d(0px, -1.03409px, 0px);">
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic" href="/project/index">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">项目</span>
                            </a>
                        </li>
                        <li class="site-menu-item">
                            <router-link to="/staff">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">档案</span>
                                </a>
                            </router-link>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic" href="/tasks">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">任务</span>
                            </a>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic" href="/trail/index">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">销售</span>
                            </a>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic" href="/client/index">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">客户</span>
                            </a>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic" href="/artist/index">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">博主</span>
                            </a>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic" href="/artist/taiyang">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">艺人</span>
                            </a>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic" href="/calendar/index">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">日历</span>
                            </a>
                        </li>
                         <li class="site-menu-item">
                            <router-link to="/approval">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">审批</span>
                                </a>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "LeftMenu"
    }
</script>

<style scoped>

</style>