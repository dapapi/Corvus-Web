<template>
    <div class="site-menubar" style="height: 100%!important;top: 0;width: 100px" @click="hideBackModel">
        <div class="site-menubar-body">
            <div class="py-10 menu-icon"
                 style="position: relative;background-color: #3f51b5;z-index: 2">
                <div class="icon-wrap" @click.stop="showBackModel">
                    <label>
                        <img src="https://res.papitube.com/corvus/images/taiyang-icon.png" alt="">
                    </label>
                </div>
            </div>
            <ul class="site-menu" @click.stop="hideBackModel" data-plugin="menu"
                style="transform: translate3d(0px, -1.03409px, 0px);">
                <li class="site-menu-item" v-for="menu in menuData"
                    :class="{'has-sub': menu.data, 'active' : pageRoute === menu.code || ( menu.data && menu.data.find(item => item.code === pageRoute))}">
                    <template v-if="!menu.data">
                        <router-link :to="'/' + menu.code" class="animsition-link">
                            <div>
                                <span class="base-icon"><img :src="menu.image" alt=""></span>
                                <span class="hover-icon"><img :src="menu.hoverImage" alt=""></span>
                            </div>
                            <span class="site-menu-title">{{ menu.name }}</span>
                            <span v-if="menu.name =='我的'&&unReadMsg>0" class="unRead ml-5">{{unReadMsg}}</span>
                        </router-link>
                    </template>
                    <template v-else>
                        <a class="animsition-link">
                            <div>
                                <span class="base-icon"><img :src="menu.image" alt=""></span>
                                <span class="hover-icon"><img :src="menu.hoverImage" alt=""></span>
                            </div>
                            <span class="site-menu-title">{{ menu.name }}</span>
                        </a>
                        <ul class="site-menu-sub" style="">
                            <li class="site-menu-item" v-for="subMenu in menu.data"
                                :class="pageRoute === subMenu.code ? 'active': ''">
                                <router-link :to="'/' + subMenu.code" class="animsition-link">
                                    <span class="site-menu-title">{{ subMenu.name }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </template>
                </li>
                <li class="site-menu-item" style="height: 150px;">&nbsp;</li>
            </ul>
            <div class="user-wrap">
                <Avatar :imgUrl="avatar" style="width: 40px; height: 40px; font-size: 14px"/>
            </div>
            <div class="console" v-if="visible">
                <ul>
                    <li @click="goManagement">进入企业后台</li>
                    <li @click="layout">退出当前账号</li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import Cookies from 'js-cookie'

    export default {
        name: "LeftMenu",
        data() {
            return {
                menuData: [
                    {
                        name: '我的',
                        code: 'my',
                        image: 'https://res.papitube.com/corvus/images/gongzuotai.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-gongzuotai.png'
                    },
                    {
                        name: '日历',
                        code: 'calendar',
                        image: 'https://res.papitube.com/corvus/images/rili.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-rili.png'
                    },
                    {
                        name: 'Talent',
                        code: 'talent',
                        image: 'https://res.papitube.com/corvus/images/talent.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-talent.png',
                        // data: [
                        //     {
                        //         name: '艺人',
                        //         code: 'artists'
                        //     },
                        //     {
                        //         name: '博主',
                        //         code: 'blogger'
                        //     }
                        // ]
                    },
                    {
                        name: 'CRM',
                        image: 'https://res.papitube.com/corvus/images/crm.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-crm.png',
                        data: [
                            {
                                name: '项目',
                                code: 'projects'
                            },
                            {
                                name: '线索',
                                code: 'trails'
                            },
                            {
                                name: '线索公海池',
                                code: 'publictrails'
                            },
                            {
                                name: '客户',
                                code: 'clients'
                            },
                            {
                                name: '任务',
                                code: 'tasks'
                            },
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
                            // {
                            //     name: '考勤',
                            //     code: 'attendance'
                            // },
                            {
                                name: '公告',
                                code: 'broadcast'
                            },
                            // {
                            //     name: '简报',
                            //     code: 'brief'
                            // },
                            {
                                name: '通讯录',
                                code: 'address'
                            },
                            // {
                            //     name: '知识库',
                            //     code: 'knowledgebase'
                            // },
                        ]
                    },
                ],
                pageRoute: '',
                visible: false,
                avatar: ''
            }
        },
        computed: {
            ...mapState([
                'unReadMsg',
                'canPassBack' // 能否进入后台
            ])
        },
        mounted() {
            this.avatar = JSON.parse(Cookies.get('user')).avatar;
            document.body.onclick = () => {
                this.visible = false
            }
        },
        watch: {
            '$route'(to, from) {
                this.pageRoute = to.path.split('/')[1];
            },
        },
        methods: {
            showBackModel() {
                this.visible = !this.visible
            },
            // 退出登录
            layout() {
                this.visible = false
                Cookies.remove('user');
                Cookies.remove('CORVUS-ACCESS-TOKEN');
                Cookies.remove('selectedCalendar');
                window.location.href = '/login'
            },
            goManagement() {
                this.visible = false
                if (this.canPassBack) {
                    window.open('/apps')
                } else {
                    toastr.error('您没有进入后台的权限！')
                }
            },
            hideBackModel() {
                this.visible = false
            }
        }
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

    .menu-icon .icon-wrap label {
        margin: 0;
    }

    .menu-icon .icon-wrap img {
        cursor: pointer;
    }

    .user-wrap {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        position: absolute;
        bottom: 24px;
        left: 30px;
    }

    .active .base-icon {
        display: none !important;
    }

    .active .hover-icon {
        display: block !important;
    }

    .console {
        padding: 10px 0;
        width: 200px;
        background: #fff;
        position: absolute;
        top: 10px;
        left: 101px;
        z-index: 100000;
        border: 1px solid #f7f7f7;
    }

    .console ul li {
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
    }

    .console ul li a {
        color: rgba(117, 117, 117, 0.9);
    }

    .console ul li:hover, .console ul li:hover a {
        cursor: pointer;
        color: #3f51b5;
        background: rgba(40, 53, 147, .03);
    }

    .unRead {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-color: red;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: 16px;
        border-radius: 50%;
        position: absolute;
        top: 8px;
        right: 26px;
    }

    .site-menu-item {
        position: relative;
    }
</style>
