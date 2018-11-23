<template>
    <div class="site-menubar" style="height: 100%!important;top: 0;width: 100px">
        <div class="site-menubar-body">
            <div>
                <div>
                    <div class="py-10 menu-icon"
                         style="position: relative;background-color: #3f51b5">
                        <div class="icon-wrap">
                            <img src="https://res.papitube.com/corvus/images/taiyang-icon.png" alt="">
                        </div>
                    </div>
                    <ul class="site-menu" data-plugin="menu" style="transform: translate3d(0px, -1.03409px, 0px);">
                        <li class="site-menu-item" v-for="menu in menuData"
                            :class="{'has-sub': menu.data, 'active' : pageRoute === menu.code || ( menu.data && menu.data.find(item => item.code === pageRoute))}">
                            <template v-if="!menu.data">
                                <router-link :to="'/' + menu.code" class="animsition-link waves-effect waves-classic">
                                    <div>
                                        <span class="base-icon">
                                            <img :src="menu.image" alt="">
                                        </span>
                                        <span class="hover-icon">
                                            <img :src="menu.hoverImage" alt="">
                                        </span>
                                    </div>
                                    <span class="site-menu-title">{{ menu.name }}</span>
                                </router-link>
                            </template>
                            <template v-else>
                                <a class="animsition-link waves-effect waves-classic">
                                    <div>
                                        <span class="base-icon">
                                            <img :src="menu.image" alt="">
                                        </span>
                                        <span class="hover-icon">
                                            <img :src="menu.hoverImage" alt="">
                                        </span>
                                    </div>
                                    <span class="site-menu-title">{{ menu.name }}</span>
                                </a>
                                <ul class="site-menu-sub" style="">
                                    <li class="site-menu-item" v-for="subMenu in menu.data"
                                        :class="pageRoute === subMenu.code ? 'active': ''">
                                        <router-link :to="'/' + subMenu.code"
                                                     class="animsition-link waves-effect waves-classic">
                                            <span class="site-menu-title">{{ subMenu.name }}</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </template>
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
                    <div class="user-wrap">
                        <img src="https://res.papitube.com/no-icon.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "LeftMenu",
        data() {
            return {
                menuData: [
                    {
                        name: '消息',
                        code: 'messages',
                        image: 'https://res.papitube.com/corvus/images/xiaoxi.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-xiaoxi.png'
                    },
                    {
                        name: '日历',
                        code: 'calendar',
                        image: 'https://res.papitube.com/corvus/images/rili.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-rili.png'
                    },
                    {
                        name: 'Talent',
                        code: '',
                        image: 'https://res.papitube.com/corvus/images/talent.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-talent.png',
                        data: [
                            {
                                name: '艺人',
                                code: 'artists'
                            },
                            {
                                name: '博主',
                                code: 'blogger'
                            }
                        ]
                    },
                    {
                        name: 'CRM',
                        image: 'https://res.papitube.com/corvus/images/crm.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-crm.png',
                        data: [
                            {
                                name: '销售',
                                code: 'trails'
                            },
                            {
                                name: '客户',
                                code: 'clients'
                            },
                            {
                                name: '项目',
                                code: 'projects'
                            },
                            {
                                name: '任务',
                                code: 'tasks'
                            },
                            {
                                name: '合同',
                                code: 'contracts'
                            },
                            {
                                name: '报表',
                                code: 'reports'
                            },
                            {
                                name: '审批',
                                code: 'approval'
                            }
                        ]
                    },
                    {
                        name: '审批',
                        code: 'approval',
                        image: 'https://res.papitube.com/corvus/images/shenpi.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-shenpi.png',
                    },
                    {
                        name: '报表',
                        code: 'reports',
                        image: 'https://res.papitube.com/corvus/images/baobiao.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-baobiao.png',
                    },
                    {
                        name: '应用',
                        image: 'https://res.papitube.com/corvus/images/yingyong.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-yingyong.png',
                        data: [
                            {
                                name: '考勤',
                                code: 'attendance'
                            },
                            {
                                name: '公告',
                                code: 'announcement'
                            },
                            {
                                name: '简报',
                                code: 'briefing'
                            },
                            {
                                name: '在线编辑',
                                code: 'online-edit'
                            },
                            {
                                name: '网盘',
                                code: 'pan'
                            },
                            {
                                name: '员工档案',
                                code: 'staffs'
                            },
                            {
                                name: '通讯录',
                                code: 'address'
                            },
                            {
                                name: '任务',
                                code: 'tasks'
                            },
                            {
                                name: '我的',
                                code: 'my'
                            },
                        ]
                    },
                ],
                pageRoute: '',
            }
        },

        watch: {
            '$route'(to, from) {
                this.pageRoute = to.path.split('/')[1];
            },
        },
    }
</script>

<style scoped>
    .site-menu-item a img {
        width: 30%;
        height: auto;
    }

    .site-menu-item a span {
        display: block;
        margin-top: 3px;
    }

    .hover-icon {
        display: none !important;
    }

    .site-menu > .site-menu-item:hover .hover-icon {
        display: block !important;
    }

    .site-menu > .site-menu-item:hover .base-icon {
        display: none !important;
    }

    .menu-icon img {
        height: auto;
        width: 100%;
    }

    .menu-icon .icon-wrap {
        width: 50%;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 auto;
    }

    .user-wrap {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        overflow: hidden;
        position: absolute;
        bottom: 30px;
        left: 25px;
    }

    .user-wrap img {
        height: auto;
        width: 100%;
    }

    .active .base-icon {
        display: none !important;
    }

    .active .hover-icon {
        display: block !important;
    }

</style>
