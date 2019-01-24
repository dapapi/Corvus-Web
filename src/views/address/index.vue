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
                                            <div class="letter" >{{ key }}</div>
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
                    <img src="https://res-crm.papitube.com/image/address_bg.jpg" alt=""/>
                </div>
                <div class="col-md-12" style="margin-top: -70px;">
                    <div class="py-25 px-25 clearfix position-relative">
                        <div class="col-md-2 float-left head-img">
                            <Avatar :imgUrl="personalInfo.icon_url"
                                    style="width: 140px; height: 140px; font-size: 50px; font-weight: 400;"/>
                        </div>
                        <div class="col-md-10 float-left position-absolute" style="bottom: 25px;right: 0;">
                            <div class="clearfix mb-20">
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-yonghu pr-2"></i>
                                        <span class="font-weight-bold">姓名</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">
                                        {{ personalInfo.name ? personalInfo.name : ''}}
                                    </div>
                                </div>
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-gongwenbao1 pr-2"></i>
                                        <span class="font-weight-bold">职位</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">
                                        {{ personalInfo.position_name ? personalInfo.position_name : ''}}
                                    </div>
                                </div>
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-hierarchy pr-2"></i>
                                        <span class="font-weight-bold">部门</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">
                                        {{ personalInfo.department_name ? personalInfo.department_name : ''}}
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-weidu pr-2"></i>
                                        <span class="font-weight-bold">邮箱</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">
                                        {{ personalInfo.work_email ? personalInfo.work_email : ''}}
                                    </div>
                                </div>
                                <div class="col-md-4 float-left">
                                    <div class="float-left col-md-6">
                                        <i class="iconfont icon-dianhua pr-2"></i>
                                        <span class="font-weight-bold">电话</span>
                                    </div>
                                    <div class="float-left col-md-6 pl-0">
                                        {{ personalInfo.phone ? personalInfo.phone : ''}}
                                    </div>
                                </div>
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
                            <div class="list-wrap" v-for="(item, index) in tasks" :key="index" @click="taskDetail(item.id)">
                                <div class="flex">
                                    <Avatar class="small-avatar" :imgUrl="item.principal.data.icon_url"/>
                                    {{ item.title }}
                                </div>
                                <div class="">{{ item.start_at }}</div>
                            </div>
                            <div style="margin: 6rem auto;width: 100px" v-if="tasks.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>
                    <div class="panel mb-0 schedule-panel">
                        <div class="mx-30 py-10 title-wrap">
                            <h5>最近日程</h5>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0">
                            <div class="list-wrap" v-for="(item, index) in schedules" :key="index" @click="showScheduleModal(item.id)">
                                <div class="flex">
                                    <Avatar class="small-avatar" :imgUrl="item.creator.data.icon_url"/>
                                    {{ item.title }}
                                </div>
                                <div class="">{{ item.end_at }}</div>
                            </div>
                            <div style="margin: 6rem auto;width: 100px" v-if="schedules.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
         <div class="modal fade" id="checkSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content" v-if="getScheduleFinish">
                    <div class="modal-header">
                        <div style="order: 2">
                            <span v-show="!noPermission">
                                <i class="iconfont icon-bianji2 pr-4 font-size-16 pointer-content"
                                    aria-hidden="true"></i>
                                <FileUploader is-icon="true" class="float-left" @change="fileUpload"></FileUploader>
                                <i class="iconfont icon-shanchu1 pr-4 font-size-16 pointer-content" data-toggle="modal"
                                   data-target="#delModel" aria-hidden="true"></i>
                            </span>
                            <i class="iconfont icon-guanbi pointer-content" aria-hidden="true" data-dismiss="modal"></i>
                        </div>
                        <h5 class="modal-title">{{ scheduleData.calendar.data.title }}</h5>
                    </div>
                    <div class="modal-body px-40">
                        <div class="">
                            <h4 class="my-20">{{ scheduleData.title }}</h4>
                        </div>
                        <div class="example">
                            <div class="">
                                <div class="col-md-3 float-left px-0">
                                    <div class="">{{ (scheduleData.start_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (scheduleData.start_at.split(' ')[0]).split('-')[2] }}日
                                        {{ scheduleData.start_at|getWeek(scheduleData.start_at) }}
                                    </div>
                                    <div class="big-time">{{ (scheduleData.start_at.split(' ')[1]).slice(0,5) }}</div>
                                </div>
                                <div class="col-md-2 float-left pl-0">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time text-center"> -</div>
                                </div>
                                <div class="col-md-3 float-left px-0">
                                    <div class="">{{ (scheduleData.end_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (scheduleData.end_at.split(' ')[0]).split('-')[2] }}日
                                        {{ scheduleData.end_at|getWeek(scheduleData.end_at) }}
                                    </div>
                                    <div class="big-time">{{ (scheduleData.end_at.split(' ')[1]).slice(0,5) }}</div>
                                </div>
                                <div class="col-md-2 float-left" v-show="scheduleData.is_allday">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time font-size-18" style="line-height: 75px">全天</div>
                                </div>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.position">
                            <div class="col-md-2 px-0 float-left">地点</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.position }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.material">
                            <div class="col-md-2 px-0 float-left">资源</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.material.data.name }}</div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 px-0 float-left">组织人</div>
                            <div class="col-md-10 pl-0 float-left">
                                {{ scheduleData.creator.data.name }}
                            </div>
                        </div>
                        <div class="example"
                             v-if="((scheduleData.project && scheduleData.project.data.length > 0) || (scheduleData.task && scheduleData.task.data.length > 0)) && !noPermission">
                            <div class="col-md-2 px-0 float-left">关联资源</div>
                            <div class="col-md-10 pl-0 float-left">
                                <div class="pb-5" v-if="scheduleData.project"
                                     v-for="project in scheduleData.project.data">
                                    <span>项目 - {{ project.title }}</span>
                                </div>
                                <div class="pb-5" v-if="scheduleData.task" v-for="task in scheduleData.task.data">
                                    <span>任务 - {{ task.title }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.participants && !noPermission">
                            <div class="col-md-2 px-0 float-left">参与人</div>
                            <div class="col-md-10 pl-0 float-left">
                                <AddMember type="add" @change="changeScheduleParticipants"></AddMember>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.desc && !noPermission">
                            <div class="col-md-2 px-0 float-left">备注</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.desc }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.affixes && scheduleData.affixes.data.length > 0">
                            <div>附件</div>
                            <div>
                                <div class="col-md-3 float-left text-center position-relative file-item"
                                     v-for="(affix,index) in scheduleData.affixes.data" :key="index">
                                    <div><i class="iconfont icon-wenjian" style="font-size: 36px"></i></div>
                                    <div @click="openFile(affix.url)" class="pointer-content">{{ affix.title }}</div>
                                    <div class="del-affix">
                                        <i class="iconfont icon-liulan pointer-content mr-4"
                                           @click="openFile(affix.url)"></i>
                                        <i class="iconfont icon-shanchu1 pointer-content"
                                           @click="delAffix(affix.id)"></i>
                                    </div>
                                </div>
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
    import {mapState} from 'vuex'

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
                noPermission: false,
                scheduleData: '',
                scheduleParticipants: [],
                getScheduleFinish: false,
                isShow:true
            }
        },
        mounted() {
            const id = JSON.parse(Cookies.get('user')).id
            fetch('get', '/departments/crew').then(res => {
                this.normalUsers = res;
                this.setDefaultInfo(id)
            })
            this.getSchedules(id)
            let _this = this
            $('#checkSchedule').on('hide.bs.modal', function () {
                if (_this.scheduleType !== 'edit') {
                    _this.$store.dispatch('changeParticipantsInfo', {data: []});
                }
                _this.getScheduleFinish = false
            });
        },
        computed: {
            ...mapState([
                'department',
            ]),
        },

        filters: {
            getWeek: function (date) {
                let week = new Date(date).getDay();
                let value = '';
                switch (week) {
                    case 0:
                        value = '周日';
                        break;
                    case 1:
                        value = '周一';
                        break;
                    case 2:
                        value = '周二';
                        break;
                    case 3:
                        value = '周三';
                        break;
                    case 4:
                        value = '周四';
                        break;
                    case 5:
                        value = '周五';
                        break;
                    case 6:
                        value = '周六';
                        break;
                }
                return value;
            }
        },
        methods: {
            memberChange() {
                this.setDefaultInfo(this.$store.state.newPrincipalInfo.id)
            },
            handelMemberClick(index, data) {
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
            getSchedules(id) {
                fetch('get', `/users/${id}?include=tasks,schedules.creator`).then(res => {
                    this.tasks = res.data.tasks.data
                    this.schedules = res.data.schedules.data
                })
            },
            taskDetail(taskId){
                this.$router.push({path: '/tasks/' + taskId})
            },
            showScheduleModal: function (id) {
               
                let data = {
                    include: 'calendar,participants,creator,material,affixes,project,task',
                };
                fetch('get', '/schedules/' + id, data).then(response => {
                    this.noPermission = false;
                    this.scheduleData = response.data;
                    if (this.scheduleData.privacy) {
                        this.schedulePrivacy = true
                    }
                    if (this.scheduleData.is_allday) {
                        this.isScheduleAllday = true
                    }
                    this.scheduleParticipants = JSON.parse(JSON.stringify(response.data.participants.data));
                    this.$store.dispatch('changeParticipantsInfo', {data: response.data.participants.data});
                    this.getScheduleFinish = true
                });
                $('#checkSchedule').modal('show')
            },
            fileUpload: function (url, name, size) {
                let data = {
                    title: name,
                    url: url,
                    size: size,
                    type: 1
                };
                fetch('post', '/schedules/' + this.scheduleData.id + '/affix', data).then(response => {
                    toastr.success('上传成功');
                    if (this.scheduleData.affixes) {
                        this.scheduleData.affixes.data.push(response.data)
                    } else {
                        this.scheduleData.affixes = {data: []};
                        this.scheduleData.affixes.data.push(response.data)
                    }
                })
            },
            changeScheduleParticipants: function (value) {
                let data = {};
                if (value) {
                    data.participant_del_ids = [value];
                } else {
                    let participantsInfo = this.$store.state.newParticipantsInfo;
                    data.participant_ids = [];
                    data.participant_del_ids = [];
                    for (let i = 0; i < participantsInfo.length; i++) {
                        if (this.scheduleParticipants.map(item => item.id).indexOf(participantsInfo[i].id) === -1) {
                            data.participant_ids.push(participantsInfo[i].id)
                        }
                    }
                    for (let i = 0; i < this.scheduleParticipants.length; i++) {
                        if (participantsInfo.map(item => item.id).indexOf(this.scheduleParticipants[i].id) === -1) {
                            data.participant_del_ids.push(this.scheduleParticipants[i].id)
                        }
                    }
                }
                fetch('put', '/schedules/' + this.scheduleData.id, data).then(() => {
                    this.$refs.calendar.refresh();
                    this.scheduleParticipants = JSON.parse(JSON.stringify(this.$store.state.newParticipantsInfo));
                })
            },
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
        background: rgba(40, 53, 147, .03);
    }

    .letter {
        color: #cacaca;
        padding: 4px 0 4px 44px;
    }

    .mt-20 {
        padding: 0 30px 12px;
    }

    .checked {
        background: rgba(40, 53, 147, .03);
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
        overflow-y: auto;
    }

    .list-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }
    .list-wrap :hover{
        cursor: pointer;
    }
    .flex {
        display: flex;
        align-items: center;
    }
     .big-time {
        font-size: 48px;
        color: #3F51B5;
        font-weight: bold;
    }
</style>

