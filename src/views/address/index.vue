<template>
    <div class="page page-aside-left">
        <div class="page-aside">
            <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical">
                <div data-role="container">
                    <div data-role="content" class="scrollable-content">
                        <section class="page-aside-section">
                            <h5 class="page-title pl-30 mb-40">通讯录</h5>
                            <div class="position-relative">
                                <div class="page-nav-tabs">
                                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                                        <li class="nav-item col-md-6" role="presentation">
                                            <a class="nav-link active" data-toggle="tab"
                                               href="#forum-team"
                                               aria-controls="forum-base"
                                               aria-expanded="true" role="tab"> 团队 </a>
                                        </li>
                                        <li class="nav-item col-md-6" role="presentation">
                                            <a class="nav-link" data-toggle="tab"
                                               href="#forum-department"
                                               aria-controls="forum-present"
                                               aria-expanded="false" role="tab"> 部门 </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="page-content tab-content nav-tabs-animate member-list" style="padding: 0;">
                                    <div class="tab-pane animation-fade active" id="forum-team" role="tabpanel">
                                        <div class="mt-20">
                                            <div class="input-search m-0">
                                                <button type="submit" class="input-search-btn">
                                                    <i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                                                </button>
                                                <input type="text" class="form-control" name="" placeholder="搜索成员..."
                                                       v-model="searchKeyWord">
                                            </div>
                                        </div>

                                        <div v-for="(value, key, index) in normalUsers" :key="index">
                                            <div class="letter">{{ key }}</div>
                                            <div class="users" v-for="(user, _index) in value"
                                                v-show="user.name.indexOf(searchKeyWord) > -1"
                                                :class="checkedIndex === (index + '' + _index) ? 'checked' : ''"
                                                @click="handelMemberClick(index + '' + _index, user)"
                                                :key='user.name+Math.random()'>
                                                <a class="avatar" href="javascript:void(0)">
                                                    <Avatar :imgUrl="user.icon_url" style="margin-right: 10px; "/>
                                                </a>
                                                <span class="pl-1 user-name">{{ user.name }}</span>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="tab-pane animation-fade" id="forum-department"
                                         role="tabpanel">
                                        <div v-for="item in department" :key='item.id + Math.random()'>
                                            <departments-item :data="item" @change="memberChange"
                                                              select-hidden="true"
                                                              member-type="principal"></departments-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false">
                    <div class="scrollable-bar-handle"></div>
                </div>
            </div>
        </div>
        <div class="page-main" style="background-color:#f3f4f5">
            <div class="panel" style="margin-bottom: 0;">
                <div class="col-md-12 p-0 top-bg">
                    <img src="https://res-crm.papitube.com/image/address_bg.jpg" alt="" />
                </div>
                <div class="col-md-12" style="margin-top: -70px;">
                    <div class="py-25 px-25 clearfix position-relative">
                        <div class="col-md-2 float-left head-img">
                            <Avatar :imgUrl="personalInfo.icon_url" style="width: 140px; height: 140px; font-size: 50px; font-weight: 400;" />
                        </div>
                        <div class="col-md-10 float-left position-absolute" style="bottom: 25px;right: 0;">
                            <div class="clearfix mb-20">
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-yonghu pr-2"></i>
                                        <span class="font-weight-bold">姓名</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">{{ personalInfo.name ? personalInfo.name : ''}}</div>
                                </div>
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-gongwenbao1 pr-2"></i>
                                        <span class="font-weight-bold">职位</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">{{ personalInfo.position ? personalInfo.position : ''}}</div>
                                </div>
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-hierarchy pr-2"></i>
                                        <span class="font-weight-bold">部门</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">{{ personalInfo.position ? personalInfo.position : ''}}</div>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-weidu pr-2"></i>
                                        <span class="font-weight-bold">邮箱</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">{{ personalInfo.work_email ? personalInfo.work_email : ''}}</div>
                                </div>
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-dianhua pr-2"></i>
                                        <span class="font-weight-bold">电话</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">{{ personalInfo.phone ? personalInfo.phone : ''}}</div>
                                </div>
                                <!-- <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-Wechat pr-2"></i>
                                        <span class="font-weight-bold">WeChat</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">XXX</div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-content container-fluid">
                <div class="clearfix">
                    <div class="panel mb-0 task-panel">
                        <div class="mx-30 py-10 title-wrap">
                            <h5>任务</h5>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0">
                            <div class="list-wrap" v-for="(item, index) in tasks" :key="index">
                                <div class="flex">
                                    <Avatar class="small-avatar" :imgUrl="item.principal.data.icon_url" />{{ item.title }}
                                </div>
                                <div class="">{{ item.start_at }}</div>
                            </div>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="tasks.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                            </div>
                        </div>
                    </div>
                    <div class="panel mb-0 schedule-panel">
                        <div class="mx-30 py-10 title-wrap">
                            <h5>最近日程</h5>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0">
                            <div class="list-wrap" v-for="(item, index) in schedules" :key="index">
                                <div class="flex">
                                    <Avatar class="small-avatar" :imgUrl="item.creator.data.icon_url" />{{ item.title }}
                                </div>
                                <div class="">{{ item.end_at }}</div>
                            </div>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="schedules.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import Cookies from 'js-cookie'
    import { mapState } from 'vuex'

    export default {
        name: 'portal',
        data() {
            return {
                searchKeyWord: '',
                normalUsers: '',
                personalInfo: {},
                checkedIndex: '',
                tasks: [], // 任务
                schedules: [], // 日程
            }
        },
        mounted() {
            const id = JSON.parse(Cookies.get('user')).id
            fetch('get', '/departments/crew').then(res => {
                this.normalUsers = res;
                this.setDefaultInfo(id)
            })
            this.getSchedules(id)
        },
        computed: {
            ...mapState([
                'department',
            ]),
        },
        methods: {
            memberChange() {
                this.setDefaultInfo(this.$store.state.newPrincipalInfo.id)
            },
            handelMemberClick (index, data) {
                this.checkedIndex = index
                this.personalInfo = data
                this.getSchedules(data.user_id)
            },
            // 设置默认信息
            setDefaultInfo(id) {
                let i = 0
                for (let item in this.normalUsers) {
                    let j = 0
                    for (let n of this.normalUsers[item]) {
                        if (n.user_id === id) {
                            this.checkedIndex = i + '' + j
                            this.personalInfo = n
                        }
                        j++
                    }
                    i++
                }
            },
            // 日程
            getSchedules (id) {
                fetch('get', `/users/${id}?include=tasks,schedules.creator`).then(res => {
                    this.tasks = res.data.tasks.data
                    this.schedules = res.data.schedules.data
                })
            }
        },
    }
</script>

<style scoped>
    .member-list {
        overflow-y: auto;
        position: relative;
        top: 45px;
        padding-top: 0;
        padding-bottom: 0;
        height: calc(100vh - 114px);
    }

    .schedule-panel {
        width: calc(50% - 15px);
        float: left;
        margin-left: 30px;
    }

    .task-panel {
        width: calc(50% - 15px);
        float: left;
    }

    .title-wrap {
        border-bottom: 1px solid #e3e3e3;
    }

    #forum-team {
        padding-bottom: 40px;
    }
    .user-name {
        color: #333;
    }
    .users {
        padding: 10px 0 10px 40px;
    }
    .users:hover {
        background: rgba(40,53,147,.03);
    }
    .letter {
        color: #cacaca;
        padding: 4px 0 4px 44px;
    }
    .mt-20{
        padding: 0 30px 12px;
    }
    .checked {
        background: rgba(40,53,147,.03);
    }
    .checked .user-name {
        color: #3f51b5;
    }
    .head-img img {
        width: 117px;
        height: 130px;
    }
    #forum-department {
        padding-bottom: 30px;
    }
    .small-avatar {
        margin-right: 10px;
    }
    .top-bg {
        width: 100%;
    }
    .top-bg img {
        width: 100%;
    }
    .overflowY {
        height: calc(100vh - 400px);
        overflow-y: scroll;
    }
    .list-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }
    .flex {
        display: flex;
        align-items: center;
    }
</style>

