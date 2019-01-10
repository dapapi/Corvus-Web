<template>

    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">应用管理</h1>
        </div>
        <div class="page-content container-fluid ">
            <ul class="site-menu p-0" data-plugin="menu" style="transform: translate3d(0px, -1.03409px, 0px);">
                <li class="site-menu-item mt-20" v-for="menu in menuData">
                    <template>
                        <router-link :to="'/' + menu.code" class=" py-20">
                            <div class="pr-10 pl-20">
                                <span class="base-icon">
                                    <i class="iconfont" :class="menu.icon"></i>
                                </span>
                            </div>
                            <span class="site-menu-title">{{ menu.name }}</span>
                            <!-- <em><i class="iconfont icon-shezhi"></i></em> -->
                        </router-link>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
         data() {
            return {
                menuData: [
                    {
                        name: 'Talent',
                        code: 'apps/talent',
                        icon: 'icon-huangguan1'
                    },
                    {
                        name: '线索',
                        code: 'apps/clue',
                        icon: 'icon-clue-xiansuo'
                    },
                    {
                        name: '客户',
                        code: 'apps/customer',
                        icon: 'icon-kehu'
                    },
                    {
                        name: '项目',
                        code: 'apps/project',
                        icon: 'icon-xiangmu1'
                    },
                    {
                        name: '任务',
                        code: 'apps/task',
                        icon: 'icon-qizi'
                    },
                    {
                        name: '日历',
                        code: 'apps/calendar',
                        icon: 'icon-rili'
                    },
                    {
                        name: '审批',
                        code: 'apps/approval',
                        icon: 'icon-shenpi4'
                    }
                ],
                pageRoute: '',
            }
        },
    }
</script>
<style>
    li{
        list-style:none;
    }
    .site-menu>.site-menu-item>a {
        display: flex;
        padding: 12px;
        margin: 0;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        border: 0;
        background: #fff;
    }
    .site-menu>.site-menu-item:hover>a {
        color: rgba(117,117,117,.9);
    }
</style>