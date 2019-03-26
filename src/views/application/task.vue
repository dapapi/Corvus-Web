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
                               @blur="getTasks"
                               id="inputPlaceholder"
                               v-model="taskNameSearch"
                               placeholder="请输入任务名称">
                    </div>
                    <div class="col-md-3 example float-left">
                        <Selectors :options="taskTypeArr" @change="changeTaskTypeSearch"
                                   placeholder="请选择任务类型"></Selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <Selectors :options="taskStatusArr" @change="changeTaskStatusSearch"
                                   placeholder="请选择任务状态"></Selectors>
                    </div>
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
                                    <template
                                            v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.name">
                                        - {{ task.resource.data.resourceable.data.name }}
                                    </template>
                                    <template
                                            v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.nickname">
                                        - {{ task.resource.data.resourceable.data.nickname }}
                                    </template>
                                    <template
                                            v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.title">
                                        - {{ task.resource.data.resourceable.data.title }}
                                    </template>
                                    <template
                                            v-if="task.resource && task.resource.data.resourceable && task.resource.data.resourceable.data.company">
                                        - {{ task.resource.data.resourceable.data.company }}
                                    </template>
                                </td>
                                <td>{{ task.type ? task.type.data ? task.type.data.title : '' : '' }}</td>
                                <td>
                                    <template v-if="task.status === 1"><span style="color:#FF9800">进行中</span></template>
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
                        <div style="margin: 6rem auto;width: 100px" v-if="tasksInfo.length==0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
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
                <AddTask></AddTask>
            </div>
        </div>
    </div>
</template>
<script>
    import fetch from "../../assets/utils/fetch.js";
    import config from "../../assets/js/config";
    import Cookies from 'js-cookie'
    import common from '../../assets/js/common'

    const taskStatusArr = [{name: "全部", value: ""}, ...config.taskStatusArr];
    export default {
        name: "",
        data() {
            return {
                common: common,
                total: 0,
                current_page: 1,
                total_pages: 1,
                participants: [],
                multiple: false,
                tasksInfo: "",
                taskStatus: 0,
                newTask: {},
                taskType: "",
                taskFinishType: "",
                taskTypeArr: [],
                taskStatusArr: taskStatusArr,
                priorityArr: config.priorityArr,
                customizeInfo: config.customizeInfo,
                linkData: [],
                taskNameSearch: "", // 搜索的任务名称
                taskTypeSearch: "", // 搜索的任务类型
                taskStatusSearch: "", // 搜索的任务状态
                resourceType: "", // 资源type
                resourceableId: "", // 资源id
                user: {}, // 个人信息
                isLoading: true,
                my: ''
            };
        },
        mounted() {
            this.getTasks();
        },

        methods: {
            getTasks(pageNum = 1) {
                let params = {
                    page: pageNum,
                    my: this.my,
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
                this.my = my;
                this.getTasks()
            },

            changeTaskTypeSearch(value) {
                this.taskTypeSearch = value;
                this.getTasks();
            },
            changeTaskStatusSearch(value) {
                this.taskStatusSearch = value;
                this.getTasks();
            },
            // 获取任务类型列表
            getTaskType() {
                fetch('get', '/task_types').then(res => {
                    const data = res.data;
                    this.taskTypeArr = data.map(n => {
                        return {name: n.title, value: n.id}
                    });
                    this.taskTypeArr.unshift({name: '全部', value: ''})
                })
            },
            // 跳转
            taskDetail(taskId) {
                this.$router.push({path: '/tasks/' + taskId})
            },
        }
    };
</script>
<style>
    .panel {
        box-shadow: 0 0 0 0;
    }

    .page-item {
        cursor: pointer;
    }

    table tbody tr {
        cursor: pointer;
    }
</style>

