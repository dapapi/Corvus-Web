<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的任务</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text"
                               class="form-control"
                               @blur="changeTaskName"
                               id="inputPlaceholder"
                               v-model="taskNameSearch"
                               placeholder="请输入任务名称">
                    </div>
                    <div class="col-md-3 example float-left">
                        <Selectors :options="taskTypeArr" @change="changeTaskTypeSearch" placeholder="请选择任务类型"></Selectors>
                    </div>
                    <!-- todo 任务类型暂无 -->
                    <div class="col-md-3 example float-left">
                        <Selectors :options="taskStatusArr" @change="changeTaskStatusSearch" placeholder="请选择任务状态"></Selectors>
                    </div>
                    <!--<div class="col-md-3 example float-left">-->
                        <!--<button type="button"-->
                                <!--class="btn btn-default waves-effect waves-classic float-right"-->
                                <!--data-toggle="modal"-->
                                <!--data-target="#customizeContent"-->
                                <!--data-placement="right"-->
                                <!--title>自定义筛选-->
                        <!--</button>-->
                    <!--</div>-->
                </div>
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getTasks(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab">所有任务</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我参与的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我创建的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(4)">
                            <a class="nav-link"
                               data-toggle="tab"
                               href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false"
                               role="tab">我分配的</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white pb-0">
                    <div class="tab-pane animation-fade active" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                                data-child="tr"
                                data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">任务名称</th>
                                <th class="cell-300" scope="col">关联资源</th>
                                <th class="cell-300" scope="col">任务类型</th>
                                <th class="cell-300" scope="col">任务状态</th>
                                <th class="cell-300" scope="col">负责人</th>
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
                                <td>
                                    <template v-if="task.principal">{{ task.principal.data.name }}</template>
                                </td>
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
                <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addTask">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
            </button>
        </div>

        <div class="modal fade"
             id="addTask"
             aria-hidden="true"
             aria-labelledby="addLabelForm"
             role="dialog"
             data-backdrop="static"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增任务</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                <normal-linkage-selectors ref="linkage" v-if="linkData.length>0" :myData="linkData"
                                                          :data="linkData"
                                                          @change="addLinkage"></normal-linkage-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors :options="taskTypeArr" ref="taskType"
                                           @change="changeTaskType"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称" v-model="taskName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人</div>
                            <div class="col-md-5 float-left pl-0">
                                <InputSelectors :placeholder="'请选择负责人'" @change="principalChange"></InputSelectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <AddMember @change="participantChange"></AddMember>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0 require">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors
                                        :options="priorityArr"
                                        @change="changeTaskLevel"
                                        ref="taskLevel"
                                ></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker ref="startTime" @change="changeStartTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <!-- <Timepicker ref="startMinutes" :default="startMinutes"
                                            @change="changeStartMinutes"></Timepicker> -->
                                <TimeChoice @change="changeStartMinutes" ref="startMinutes"></TimeChoice>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker ref="endTime" @change="changeEndTime" :startDate="startTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <!-- <Timepicker ref="endMinutes" :default="endMinutes"
                                            @change="changeEndMinutes"></Timepicker> -->
                                <TimeChoice @change="changeEndMinutes" ref="endMinutes"></TimeChoice>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务说明</div>
                            <div class="col-md-10 float-left pl-0">
                        <textarea class="form-control"
                          name="taskDescription"
                          id
                          cols="30"
                          rows="5"
                          title
                          v-model="taskIntroduce"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addTask">确定</button>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    </div>
</template>
<script>
    import fetch from "../../assets/utils/fetch.js";
    import config from "../../assets/js/config";
    import Cookies from 'js-cookie'

    const taskStatusArr = [{name: "全部", value: ""}, ...config.taskStatusArr];
    export default {
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
                priorityArr:config.priorityArr,
                customizeInfo: config.customizeInfo,
                linkData: [],
                taskNameSearch: "", // 搜索的任务名称
                taskTypeSearch: "", // 搜索的任务类型
                taskStatusSearch: "", // 搜索的任务状态
                resourceType: "", // 资源type
                resourceableId: "", // 资源id
                user: {}, // 个人信息
                isLoading:true,
                my:''
            };
        },
        created() {
            this.getLinkData()
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

        methods: {
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
<style>
.panel{
    box-shadow: 0 0 0 0;
}

.page-item{
    cursor: pointer;
}
table tbody tr {
    cursor: pointer;
}
</style>

