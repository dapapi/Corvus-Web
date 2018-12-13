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
                                                    <i class="icon md-search" aria-hidden="true"></i>
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
                                                    <img src="https://res.papitube.com/no-icon.png" alt="...">
                                                </a>
                                                <span class="pl-1 user-name">{{ user.name }}</span>
                                            </div>
                                        </div>
                                        

                                    </div>
                                    <div class="tab-pane animation-fade" id="forum-department"
                                         role="tabpanel">
                                        <div v-for="department in departmentUsers" :key='department.id + Math.random()'>
                                            <departments-item :data="department" @change="memberChange"
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
            <div class="page-content container-fluid">
                <div class="panel">
                    <div class="col-md-12">
                        <div class="py-25 clearfix position-relative">
                            <div class="col-md-2 float-left head-img">
                                <img :src="personalInfo.icon_url ? personalInfo.icon_url : 'https://res.papitube.com/no-icon.png'" alt="">
                            </div>
                            <div class="col-md-10 float-left position-absolute" style="bottom: 25px;right: 0;">
                                <div class="clearfix mb-20">
                                    <div class="col-md-4 float-left">
                                        <div class="float-left col-md-6">
                                            <i class="icon md-plus pr-2"></i>
                                            <span class="font-weight-bold">姓名</span>
                                        </div>
                                        <div class="float-left col-md-6 pl-0">{{ personalInfo.name ? personalInfo.name : ''}}</div>
                                    </div>
                                    <div class="col-md-4 float-left">
                                        <div class="float-left col-md-6">
                                            <i class="icon md-plus pr-2"></i>
                                            <span class="font-weight-bold">职位</span>
                                        </div>
                                        <div class="float-left col-md-6 pl-0">{{ personalInfo.position ? personalInfo.position : ''}}</div>
                                    </div>
                                    <div class="col-md-4 float-left">
                                        <div class="float-left col-md-6">
                                            <i class="icon md-plus pr-2"></i>
                                            <span class="font-weight-bold">部门</span>
                                        </div>
                                        <div class="float-left col-md-6 pl-0">{{ personalInfo.position ? personalInfo.position : ''}}</div>
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="col-md-4 float-left">
                                        <div class="float-left col-md-6">
                                            <i class="icon md-email pr-2"></i>
                                            <span class="font-weight-bold">邮箱</span>
                                        </div>
                                        <div class="float-left col-md-6 pl-0">{{ personalInfo.work_email ? personalInfo.work_email : ''}}</div>
                                    </div>
                                    <div class="col-md-4 float-left">
                                        <div class="float-left col-md-6">
                                            <i class="icon md-phone pr-2"></i>
                                            <span class="font-weight-bold">电话</span>
                                        </div>
                                        <div class="float-left col-md-6 pl-0">{{ personalInfo.phone ? personalInfo.phone : ''}}</div>
                                    </div>
                                    <div class="col-md-4 float-left">
                                        <div class="float-left col-md-6">
                                            <i class="icon md-plus pr-2"></i>
                                            <span class="font-weight-bold">WeChat</span>
                                        </div>
                                        <div class="float-left col-md-6 pl-0">XXX</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel task-panel">
                    <div class="px-30 py-10 title-wrap">
                        <h5>任务</h5>
                    </div>
                    <div class="col-md-12">
                        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-toggle="tab"
                                   href="#forum-tasking"
                                   aria-controls="forum-base"
                                   aria-expanded="true" role="tab">正在进行</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab"
                                   href="#forum-task"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">待完成</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab"
                                   href="#forum-task-finish"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">已完成</a>
                            </li>
                        </ul>
                    </div>
                    <div class="page-content tab-content nav-tabs-animate">
                        <div class="tab-pane animation-fade active" id="forum-tasking" role="tabpanel">
                            <div class="clearfix pb-10">
                                <div class="col-md-6 float-left pl-0">任务1</div>
                                <div class="col-md-6 float-left">任务1所在项目</div>
                            </div>
                            <div class="clearfix pb-10">
                                <div class="col-md-6 float-left pl-0">任务2</div>
                                <div class="col-md-6 float-left">任务2所在项目</div>
                            </div>
                            <div class="clearfix pb-10">
                                <div class="col-md-6 float-left pl-0">任务3</div>
                                <div class="col-md-6 float-left">任务3所在项目</div>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade" id="forum-task" role="tabpanel">
                            待完成
                        </div>
                        <div class="tab-pane animation-fade" id="forum-task-finish" role="tabpanel">
                            已完成
                        </div>
                    </div>
                </div>
                <div class="panel schedule-panel">
                    <div class="px-30 py-10 title-wrap">
                        <h5>最近日程</h5>
                    </div>
                    <div class="page-content tab-content nav-tabs-animate">
                        <div class="clearfix pb-10">
                            <div class="col-md-6 float-left pl-0">日程1</div>
                            <div class="col-md-6 float-left">2018-09-23 11：22</div>
                        </div>
                        <div class="clearfix pb-10">
                            <div class="col-md-6 float-left pl-0">日程2</div>
                            <div class="col-md-6 float-left">2018-09-23 11：22</div>
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

    export default {
        name: 'portal',
        data() {
            return {
                searchKeyWord: '',
                normalUsers: '',
                departmentUsers: '',
                personalInfo: {},
                checkedIndex: '',
            }
        },
        mounted() {
            fetch('get', '/departments').then(response => {
                this.departmentUsers = response.data;
            });
            fetch('get', '/departments/crew').then(res => {
                this.normalUsers = res;
                this.setDefaultInfo(JSON.parse(Cookies.get('user')).id)
            })
        },
        methods: {
            memberChange() {
                this.setDefaultInfo(this.$store.state.newPrincipalInfo.id)
            },
            handelMemberClick (index, data) {
                this.checkedIndex = index
                this.personalInfo = data
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
            getSchedules () {
                // todo
            }
            // 任务  todo
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
</style>

