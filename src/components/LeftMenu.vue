<template>
    <div class="site-menubar" style="height: 100%!important;top: 0;width: 100px">
        <div class="site-menubar-body">
            <div>
                <div>
                    <div class="font-size-24 font-weight-bold text-center py-20"
                         style="color: white;background-color: #3f51b5;z-index: 2;position: relative">
                        泰洋系
                    </div>
                    <ul class="site-menu" data-plugin="menu" style="transform: translate3d(0px, -1.03409px, 0px);">
                        <li class="site-menu-item">
                            <router-link to="">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">消息</span>
                                </a>
                            </router-link>
                        </li>
                        <li class="site-menu-item">
                            <router-link to="/calendar">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">日历</span>
                                </a>
                            </router-link>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">Talent</span>
                            </a>
                            <ul class="site-menu-sub" style="">
                                <li class="site-menu-item">
                                    <router-link to="/artists">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">艺人</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="/blogger">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">博主</span>
                                        </a>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">CRM</span>
                            </a>
                            <ul class="site-menu-sub" style="">
                                <li class="site-menu-item">
                                    <router-link to="/trails">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">销售</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="/clients">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">客户</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="/projects">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">项目</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="/tasks">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">任务</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">合同</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">报表</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">审批</span>
                                        </a>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="site-menu-item">
                            <router-link to="">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">审批</span>
                                </a>
                            </router-link>
                        </li>
                        <li class="site-menu-item">
                            <router-link to="">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">报表</span>
                                </a>
                            </router-link>
                        </li>
                        <li class="site-menu-item">
                            <a class="animsition-link waves-effect waves-classic">
                                <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                <span class="site-menu-title">应用</span>
                            </a>
                            <ul class="site-menu-sub" style="">
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">考勤</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">公告</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">简报</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">在线编辑</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">网盘</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">员工档案</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">通讯录</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">任务</span>
                                        </a>
                                    </router-link>
                                </li>
                                <li class="site-menu-item">
                                    <router-link to="">
                                        <a class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">我的</span>
                                        </a>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                         <li class="site-menu-item">
                            <router-link to="/approval">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">审批</span>
                                </a>
                            </router-link>
                        </li>
                        <li class="site-menu-item">
                            <router-link to="/messages">
                                <a class="animsition-link waves-effect waves-classic">
                                    <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                                    <span class="site-menu-title">消息</span>
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