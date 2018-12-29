<template>
    <div class="site-menubar col-md-1.5 p-0" style="height: 100%!important;top: 0;width: 200px">
        <div class="site-menubar-body">
            <div class="pt-10 menu-icon"
                 style="position: relative;background-color: #3f51b5;z-index: 2">
                <div class="icon-wrap pl-20" >
                    <label for="console-model" >
                        <img src="https://res.papitube.com/corvus/images/taiyang-icon.png" alt="" style="border-radius:5px" @click="back">
                    </label>
                </div>
            </div>
            <ul class="site-menu" data-plugin="menu" style="transform: translate3d(0px, -1.03409px, 0px);">
                <li class="site-menu-item " v-for="menu in menuData"
                    :class="{'has-sub': menu.data, 'active' : pageRoute === menu.code || ( menu.data && menu.data.find(item => item.code === pageRoute))}">
                    <template v-if="!menu.data">
                        <router-link :to="'/' + menu.code" class="animsition-link py-20">
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
                        <a class="animsition-link" >
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
                                             class="animsition-link">
                                    <span class="site-menu-title">{{ subMenu.name }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </template>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: "LeftManage",
        data() {
            return {
                menuData: [
                    {
                        name: '应用管理',
                        code: 'appmanagement',
                        image: 'https://res.papitube.com/corvus/images/xiaoxi.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-xiaoxi.png'
                    },
                    {
                        name: '角色管理',
                        code: 'rolemanagement',
                        image: 'https://res.papitube.com/corvus/images/rili.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-rili.png'
                    },
                    {
                        name: '组织架构',
                        code: 'organization',
                        image: 'https://res.papitube.com/corvus/images/talent.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-talent.png',
                    },
                    {
                        name: '员工档案',
                        code: 'staff',
                        image: 'https://res.papitube.com/corvus/images/baobiao.png',
                        hoverImage: 'https://res.papitube.com/corvus/images/select-baobiao.png',
                    }
                ],
                pageRoute: '',
            }
        },
        methods: {
            back(){
                window.location.href='/my/message'
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
        width: 70%;
    }

    .menu-icon .icon-wrap {
        width: 50%;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 auto;
    }

     .menu-icon .icon-wrap img {
        cursor: pointer;
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
    #console-model {
        opacity: 0;
        position: absolute;
        z-index: -1000;
    }
    .site-menu-item>a{
        display: flex;
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
    .console ul li:hover {
        cursor: pointer;
        color: #3f51b5;
        background: rgba(40,53,147,.03);
    }
     .console ul li a {
        color: rgba(117, 117, 117, 0.9);
     }
</style>
