<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <!-- <Loading :is-loading="isLoading"></Loading> -->
        <div class="page-header page-header-bordered my-1 ">
            <h1 class="page-title">目标管理</h1>
            <!-- <div class="float-right goals-range">2019年Q1季度</div> -->
            <div class="page-header-actions dropdown show task-dropdown float-right" style="z-index:999000">
                <div class="" aria-hidden="true" style="cursor: pointer" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false">{{periods.data[0].name}}</div>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" style="width:400px"  aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                      <table class="table table-hover is-indent " data-plugin="animateList" data-animate="fade">
                    <tr>
                        <td class="cell-300">周期名称</td>
                        <td class="cell-300">开始时间</td>
                        <td class="cell-300">结束时间</td>
                    </tr>
                    <tr v-for="(item, index) in periods.data" :key="index">
                        <td><input class="" type="radio" /> {{item.name}}</td>
                        <td>{{item.start_at}}</td>
                        <td>{{item.end_at}}</td>
                    </tr>
                      </table>
                    <!-- <a class="dropdown-item" role="menuitem" @click="changeTaskStatus(3)" v-show="oldInfo.status == 1">终止</a>
                    <a class="dropdown-item" role="menuitem" @click="changeTaskStatus(1)" v-show="oldInfo.status != 1">激活</a>
                    <a class="dropdown-item" role="menuitem" @click="changeTaskStatus(2)" v-show="oldInfo.status == 1">完成</a>
                    <a class="dropdown-item" role="menuitem" @click="privacyTask(oldInfo.privacy ? 0 : 1)">
                        {{oldInfo.privacy ? '转公开':'转私密'}}</a> -->
                    <!-- <a class="dropdown-item" role="menuitem" @click>删除</a> -->
                </div>
            </div>
            <div class="float-right goals-add mr-50"  data-toggle="modal" 
            data-target="#goals-add" >+新建目标</div>
             
        </div>
        <div class="page-header page-header-bordered py-0">
            <ul class="nav nav-tabs nav-tabs-line" role="tablist" style="position: relative;">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab" @click="tabHandler(1)">我的</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present" 
                               aria-expanded="false" role="tab" @click="tabHandler(2)" >部门</a>
                        </li>
                         <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab" @click="tabHandler(3)">公司</a>
                        </li>
                         <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab" @click="tabHandler(4)">全部</a>
                        </li>
                    </ul>
        </div>
        <div class="row mx-20" v-if="tabNumber !== 4">
            <div class="col-md-5 pl-25 mr-0 pr-0">
                <div class="panel row float-left  " style="width:100%">
                    <dir class="col-md-4">
                        <div class="total-goals-logo">456个</div>
                        <div class="total-goals-title">目标总数</div>
                    </dir>
                    <div class="col-md-8 py-20">
                        <div class="py-10 progress-bar-test">
                            <div class="progress progress-sm py-0 my-0">
                                <div class="progress-bar progress-bar-indicating active" style="width: 40%;" role="progressbar"></div>
                            </div>
                            <div>
                                <span>已完成<span style="color:#00bcd4"> 1个</span></span>
                                <span class="float-right">待完成800个</span>
                            </div>
                        </div>
                        <div class="py-10 progress-bar-test">
                            <div class="progress progress-sm py-0 my-0">
                                <div class="progress-bar progress-bar-indicating active" style="width: 40%;" role="progressbar"></div>
                            </div>
                            <div>
                                <span>近七天更新<span style="color:#00bcd4"> 100个</span></span>
                            </div>
                        </div>
                        <div class="py-10 progress-bar-test">
                            <div class="progress progress-sm py-0 my-0">
                                <div class="progress-bar progress-bar-indicating active" style="width: 23%;" role="progressbar"></div>
                            </div>
                            <div>
                                <span>平均完成度<span style="color:#00bcd4;">23%</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="panel px-30" style="height:183px;font-size:18px;">
                    <div class="py-20"><span style="color:#ff9800;">你真棒！</span>请继续努力～</div>
                    <div class="mx-5 row " style="width:100%;height:100px;border-radius:50px;background-color:rgba(7,17,27,0.04);">
                        <div class="goals-percent-logo">74%</div>
                        <span class="ml-20" style="line-height:100px">今年较去年目标完成度同期增长/降低<span><strong> 23%</strong></span></span></div>
                </div>
            </div>
        </div>
        <div class="page-content container-fluid pt-0 mt-0">
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text"
                               class="form-control"
                               @blur="changeTaskName"
                               id="inputPlaceholder"
                               v-model="taskNameSearch"
                               placeholder="请输入目标名称">
                    </div>
                    <div class="col-md-3 example float-left">
                         <DropDepartment :data="department" @change='(params)=>changeHandeler(params,"department")'/>
                    </div>
                    <!-- todo 任务类型暂无 -->
                    <div class="col-md-3 example float-left">
                        <Selectors :options="taskStatusArr" @change="changeTaskStatusSearch" placeholder="请选择负责人"></Selectors>
                    </div>
                    <div class="col-md-3 example float-right pl-40 pt-5 pr-0 mr-0">
                        <span class="col-md-5" style="color:#3f51b5;font-size:16px;cursor:pointer">进行中</span>
                        <span class="col-md-5" style="font-size:16px;cursor:pointer">已结束</span>
                        <!--<button type="button"-->
                                <!--class="btn btn-default waves-effect waves-classic float-right"-->
                                <!--data-toggle="modal"-->
                                <!--data-target="#customizeContent"-->
                                <!--data-placement="right"-->
                                <!--title>自定义筛选-->
                        <!--</button>-->
                    </div>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white pt-0">
                    <div class="tab-pane animation-fade active" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                                data-child="tr"
                                data-selectable="selectable">
                            <tr class="animation-fade" 
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms; border-bottom:1px solid rgba(7,17,27,0.2);">
                                <th class="cell-300" scope="col">目标名称</th>
                                <th class="cell-300" scope="col">父/子</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">进度</th>
                                <!-- <th class="cell-300" scope="col">负责人</th> -->
                                <th class="cell-300" scope="col">截止时间</th>
                            </tr>
                            <tbody>
                            <tr v-for="task in tasksInfo" :key="task.id" @click="taskDetail(task.id)">
                                <td class="pointer-content">
                                    <router-link :to="{name:'tasks/detail', params: {id: task.id}}">{{ task.title }}
                                    </router-link>
                                </td>
                                <td>{{task.resource ? task.resource.data.resource.data.title : ''}}
                                    <template v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.name">
                                        -  {{ task.resource.data.resourceable.data.name }}
                                    </template>
                                    <template v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.nickname">
                                        -  {{ task.resource.data.resourceable.data.nickname }}
                                    </template>
                                    <template v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.title">
                                        - {{ task.resource.data.resourceable.data.title }}
                                    </template>
                                    <template v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.company">
                                        - {{ task.resource.data.resourceable.data.company }}
                                    </template>
                                </td>
                                <!-- <td>暂无</td> -->
                                <td>{{ task.type ? task.type.data ? task.type.data.title : '' : '' }}</td>
                                <td>
                                    <template v-if="task.status === 1"><span style="color:#FF9800">进行中</span> </template>
                                    <template v-if="task.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                    <template v-if="task.status === 3"><span style="color:#9E9E9E">已停止</span></template>
                                    <template v-if="task.status === 4"><span style="color:#F44336">延期</span></template>
                                </td>
                                <!-- <td>
                                    <template v-if="task.principal">{{ task.principal.data.name }}</template>
                                </td> -->
                                <td>{{ task.end_at }}</td>
                            </tr>
                            </tbody>
                        </table>
                            <div style="margin: 6rem auto;width: 100px"  v-if="tasksInfo.length==0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                        <template v-if="!taskStatus">
                            <Pagination :current_page="current_page" :method="getTasks" :total_pages="total_pages"
                                        :total="total"></Pagination>
                        </template>
                        <template v-else>
                            <Pagination :current_page="current_page" :method="getOther" :total_pages="total_pages"
                                        :total="total"></Pagination>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <addGoals />
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import fetch from "../../assets/utils/fetch.js";
    import config from "../../assets/js/config";
    import Cookies from 'js-cookie'
    import addGoals from "./addGoals"
    const taskStatusArr = [{name: "全部", value: ""}, ...config.taskStatusArr];
    export default {
        components:{
            addGoals
        },
        name: "",
        data() {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                participants: [],
                multiple: false,
                taskIntroduce: "",
                startTime: "",
                startMinutes: "00:00",
                endTime: "",
                endMinutes: "00:00",
                tasksInfo: "",
                taskStatus: 0,
                newTask: {},
                taskType: "",
                taskFinishType: "",
                taskName: "",
                taskLevel: "",
                taskTypeArr: [],
                taskStatusArr: taskStatusArr,
                taskLevelArr: config.taskLevelArr,
                customizeInfo: config.customizeInfo,
                linkData: [],
                taskNameSearch: "", // 搜索的任务名称
                taskTypeSearch: "", // 搜索的任务类型
                taskStatusSearch: "", // 搜索的任务状态
                resourceType: "", // 资源type
                resourceableId: "", // 资源id
                user: {}, // 个人信息
                isLoading:true,
                my:'',
                tabNumber:'',
                periods:[],
            };
        },
        created() {
            this.getLinkData()
            this.getPeriods()
        },
        mounted() {
            this.getTasks();
            this.user = JSON.parse(Cookies.get('user'))
            // 负责人默认值的设置
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            })
            this.getTaskType()
            $('#addTask').on('hidden.bs.modal', () => {
                // 清空state
                this.closeAddTask()
            })
        },
        computed:{
              ...mapState([
            'department',
        ]),
        _department () {
            return this.department
        }
        },
        methods: {
            tabHandler(params){
                // console.log(params);
                this.tabNumber = params
            },
            getPeriods(){
                fetch('get','/periods/all').then((params) => {
                    console.log(params)
                    this.periods = params
                })
            },
            getTasks(pageNum = 1) {
                let params = {
                    page: pageNum,
                    my:this.my,
                    include:
                        "principal,pTask,tasks,resource.resourceable,resource.resource,participants"
                };
                let url = "/tasks";

                if (this.taskNameSearch) {
                    params.keyword = this.taskNameSearch;
                }
                if (this.taskStatusSearch) {
                    params.status = this.taskStatusSearch;
                }
                if (this.taskTypeSearch) {
                    params.type_id = this.taskTypeSearch;
                }

                if (this.taskNameSearch || this.taskStatusSearch || this.taskTypeSearch) {
                    url = "/tasks/filter";
                }

                fetch("get", url, params).then(response => {
                    this.tasksInfo = response.data;
                    this.isLoading = false;
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                });
            },

            getMyTasks(my) {
                this.my = my
                this.getTasks(1)
                
            },

            addTask() {
                // 校验
                if (!this.taskName) {
                    toastr.error('请填写任务名称！')
                    return
                }
                if (!this.$store.state.newPrincipalInfo.id) {
                    toastr.error('请选择负责人！')
                    return
                }
                if (!this.taskType) {
                    toastr.error('请选择任务类型！')
                    return
                }
                if (!this.taskLevel) {
                    toastr.error('请选择任务优先级！')
                    return
                }
                if (!this.startTime || !this.endTime) {
                    toastr.error('请选择时间!')
                    return
                }
                if ((this.startTime + " " + this.startMinutes) > (this.endTime + " " + this.endMinutes)) {
                    toastr.error('开始时间不能晚于截止时间');
                    return
                }

                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id);
                }

                let data = {
                    // resource_type: this.resourceType ,
                    // resourceable_id: this.resourceableId,
                    type: this.taskType,
                    title: this.taskName,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    priority: this.taskLevel,
                    start_at: this.startTime + " " + this.startMinutes,
                    end_at: this.endTime + " " + this.endMinutes,
                    desc: this.taskIntroduce
                };

                if (this.resourceType) {
                    data.resource_type = this.resourceType
                }
                if (this.resourceableId) {
                    data.resourceable_id = this.resourceableId
                }

                fetch('post', '/tasks', data).then(res => {
                    toastr.success("创建成功");
                    $("#addTask").modal("hide");
                    this.$router.push({path: '/tasks/' + res.data.id});
                })
            },

            customize(value) {
                console.log(value);
            },

            changeLinkage(value) {
                console.log(value);
            },

            changeTaskType(value) {
                this.taskType = value;
            },

            principalChange(value) {
                this.principal = value;
            },

            participantChange(value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id);
                }
                this.participants = flagArr;
            },

            changeTaskLevel(value) {
                this.taskLevel = value;
            },

            changeStartTime(value) {
                this.startTime = value;
            },

            changeStartMinutes(value) {
                this.startMinutes = value;
            },

            changeEndTime(value) {
                this.endTime = value;
            },

            changeEndMinutes(value) {
                this.endMinutes = value;
            },
            changeTaskName() {
                this.getTasks();
            },
            changeTaskTypeSearch(value) {
                this.taskTypeSearch = value;
                this.getTasks();
            },
            changeTaskStatusSearch(value) {
                this.taskStatusSearch = value;
                this.getTasks();
            },
            addLinkage: function (type, value, id, index) {
                if (type === 'father') {
                    this.getChildLinkData(value, index)
                    this.resourceType = id
                } else if (type === 'child') {
                    this.resourceableId = value
                }
            },
            // 获取关联父资源数据
            getLinkData() {
                fetch('get', '/resources').then(res => {
                    // let code = 0
                    this.linkData = res.data.map((n, i) => {
                        // if (i === 0) {
                        //     code = n.code
                        // }
                        return {
                            name: n.title,
                            id: n.type,
                            value: n.code,
                            // type: n.type,
                            child: []
                        }
                    })
                    this.linkData.unshift({
                            name: '暂不关联任何资源',
                            id: '',
                            value: '',
                            // type: n.type,
                            child: []
                        })
                    if (this.linkData[0].child.length === 0) {
                        this.getChildLinkData('', 0)
                    }
                })
            },
            // 获取关联子资源数据
            getChildLinkData(url, index) {
                if (url) {
                    fetch('get', `/${url}`).then(res => {
                        const temp = this.linkData[index]
                        temp.child = res.data.map(n => {
                            return {
                                name: n.name || n.nickname || n.title || n.company,
                                id: n.id,
                                value: n.id,
                            }
                        })
                        this.resourceableId = temp.child[0].id
                        this.$set(this.linkData, index, temp)
                        setTimeout(() => {
                            this.$refs.linkage.refresh()
                        }, 100)
                    })
                } else {
                    const temp = this.linkData[index]
                    temp.child = [{
                        name: '暂不关联任何资源',
                        id: '',
                        value: '',
                    }]
                    this.resourceableId = temp.child[0].id
                    this.$set(this.linkData, index, temp)
                    
                }
            },
            // 获取任务类型列表
            getTaskType() {
                fetch('get', '/task_types').then(res => {
                    const data = res.data
                    this.taskTypeArr = data.map(n => {
                        return {name: n.title, value: n.id}
                    })
                    this.taskTypeArr.unshift({name: '全部', value: ''})
                })
            },
            // 关闭新增任务
            closeAddTask() {
                this.taskName = ''
                this.taskLevel = ''
                this.$refs.taskLevel.setValue('')
                this.taskType = ''
                this.$refs.taskType.setValue('')
                this.startTime = ''
                this.endTime = ''
                this.startMinutes = ''
                this.endMinutes = ''
                this.taskIntroduce = ''
                this.$refs.startTime.setValue('')
                this.$refs.startMinutes.setValue('0')
                this.$refs.endTime.setValue('')
                this.$refs.endMinutes.setValue('0')
                this.linkData = []
                this.getLinkData()
                this.setDefaultPrincipal()
            },
            // 设置默认负责人
            setDefaultPrincipal() {
                this.$store.commit('changeNewPrincipal', {
                    name: this.user.nickname,
                    id: this.user.id
                })
                this.$store.commit('changeNewParticipantsInfo', [])
            },
            // 跳转
            taskDetail(taskId){
                this.$router.push({path: '/tasks/' + taskId})
            },
        }
    };
</script>
<style scoped>
.goals-add{
    position: relative;
    width: 100px;
    height: 30px;
    right: 50px;
    bottom: 30px;
    font-size: 16px;
    background-color: #3f51b5;
    color: #fff;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
.goals-range{
    position: relative;
    line-height: 30px;
    cursor: pointer;
    font-size: 16px;
    right: 20px;
    bottom: 30px;
}
.progress-bar-test{
    font-size: 10px;
}
.total-goals-logo{
    background-image: url('../../assets/img/project_total.png');
    width: 100px;
    height: 100px;
    background-size: contain;
    margin:10px 0 0 10px;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
    color: #3f51b5;
    font-weight: 600;
}
.total-goals-title{
    font-size: 10px;
    text-align: center;
    margin-left: 5px;
    margin-top: 5px;
}
.goals-percent-logo{
    background-image:url('../../assets/img/goals_percent.png');
    width:80px;
    height:80px;
    margin: 10px 0 0 20px;
    font-size: 20px;
    font-weight: 600;
    line-height: 80px;
    text-align: center;
    color: #ff9800;
    background-size: contain;
}
.panel{
    box-shadow: 0 0 0 0;
}

.page-item{
    cursor: pointer;
}
table tbody tr {
    cursor: pointer;
}
td{
    text-align: center;
}
</style>

