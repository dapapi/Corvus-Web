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
                        <Selectors :options="taskTypeArr" @change="changeTaskTypeSearch"
                                   placeholder="请选择任务类型"></Selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <Selectors :options="taskStatusArr" @change="changeTaskStatusSearch"
                                   placeholder="请选择任务状态"></Selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <DropDepartment :data="department" :showUser="true" @change="selectDepartment"/>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getMyTasks()">
                            <a class="nav-link"
                               data-toggle="tab"
                               href="#forum-task"
                               aria-controls="forum-base"
                               aria-expanded="true"
                               role="tab">所有任务</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(3)">
                            <a class="nav-link active"
                               data-toggle="tab"
                               href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false"
                               role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(2)">
                            <a class="nav-link"
                               data-toggle="tab"
                               href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false"
                               role="tab">我参与的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1)">
                            <a class="nav-link"
                               data-toggle="tab"
                               href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false"
                               role="tab">我创建的</a>
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
                        <table class="table table-hover is-indent"
                               data-plugin="animateList"
                               data-animate="fade"
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
                            <tr v-for="(task, index) in tasksInfo" :key="index" @click="goDetail(task.id)">
                                <td class="pointer-content">
                                    {{ task.title }}
                                </td>
                                <td>
                                    <template v-if="task.resource_type">
                                        {{ task.resource_type }} - {{ task.resource_name }}
                                    </template>
                                </td>
                                <!-- <td>暂无</td> -->
                                <td>
                                    {{ task.type_name }}
                                </td>
                                <td>
                                    <template v-if="task.status === 1"><span style="color:#FF9800">进行中</span></template>
                                    <template v-if="task.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                    <template v-if="task.status === 3"><span style="color:#9E9E9E">已停止</span></template>
                                    <template v-if="task.status === 4"><span style="color:#F44336">延期</span></template>
                                </td>
                                <td>
                                    {{ task.principal_name }}
                                </td>
                                <td>{{ task.end_at }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div style="margin: 6rem auto;width: 100px" v-if="tasksInfo.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <Pagination :current_page="current_page"
                                    :method="getTasks"
                                    :total_pages="total_pages"
                                    :total="total"></Pagination>
                    </div>
                </div>
            </div>
        </div>

        <CustomizeFilter v-if="canShow" :data="customizeInfo" @change="customize"></CustomizeFilter>

        <div v-if="canShow"  class="site-action" data-plugin="actionBtn" data-toggle="modal" @click="handleAdd">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
            </button>
        </div>

        <AddTask v-if="canShow" ></AddTask>

    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js';
    import config from '../../assets/js/config';
    import Cookies from 'js-cookie';
    import {mapState} from 'vuex';

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
                tasksInfo: "",
                taskStatus: 0,
                newTask: {},
                taskFinishType: "",
                taskName: "",
                taskTypeArr: [],
                taskStatusArr: taskStatusArr,
                customizeInfo: config.customizeInfo,
                linkData: [],
                taskNameSearch: "", // 搜索的任务名称
                taskTypeSearch: "", // 搜索的任务类型
                taskStatusSearch: "", // 搜索的任务状态
                resourceType: "", // 资源type
                user: {}, // 个人信息
                isLoading: true,
                priorityArr: config.priorityArr,
                my: 3,//tasks 筛选  3我负责的 2 我参与的 1我创建的 4我分配的
                linkCurrentPage: 2, // 关联资源当前页数
                linkTotalPage: 1, // 关联资源总页数
                linkCode: '', // 关联资源父数据的code
                linkIndex: 0, //
                canLoadMore: false, // 关联资源是否可以加载更多
                searchDepartment: '', // 搜索部门
                searchUser: '', // 搜索部门成员
                canShow:false,
            };
        },
        computed: {
            ...mapState([
                'listPower',
                'department',
            ])
        },
        created () {
            this.getTasks();
        },
        mounted() {
            // this.getTasks();
            this.user = JSON.parse(Cookies.get('user'))
            
            // 负责人默认值的设置
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            })
            this.getTaskType();
        },

        methods: {

            // 任务列表的请求都用url = /tasks  上下联动筛选
            getTasks(pageNum = 1) {
                const params = {
                    page: pageNum,
                    my: this.my,
                    // include: 'principal,pTask,tasks,resource.resourceable,resource.resource,participants',
                };

               
                if (this.searchDepartment) {
                    params.department = this.searchDepartment
                }

                if (this.searchUser) {
                    params.user = this.searchUser
                }

                let url = '/task/all';

                if (this.taskNameSearch) {
                    params.keyword = this.taskNameSearch;
                }
                if (this.taskStatusSearch) {
                    params.status = this.taskStatusSearch;
                }
                if (this.taskTypeSearch) {
                    params.type_id = this.taskTypeSearch;
                }
                fetch('get', url, params).then((response) => {
                    this.isLoading = false;
                    this.tasksInfo = response.data;
                    this.current_page = response.current_page;
                    this.total = response.total;
                    this.total_pages = response.per_page != 0 ? Math.ceil(response.total / response.per_page) : 1;
                    this.canShow = true
                }).catch(() => {
                    this.isLoading = false;
                })
            },
            // 任务我的筛选
            getMyTasks(my) {
                this.my = my;
                this.getTasks(1);
            },

            customize(value) {
                console.log(value);
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
            goDetail(id) {
                this.$router.push('/tasks/' + id)
            },

            handleAdd() {
                if (this.listPower.task.add == 'false') {
                    toastr.error('您没有新增任务的权限！')
                    return
                }
                $('#addTask').modal('show')
            },
            // 选择成员或部门
            selectDepartment(data) {
                if (data.type === 'department') {
                    this.searchUser = ''
                    this.searchDepartment = data.id
                } else if (data.type === 'user') {
                    this.searchUser = data.id
                    this.searchDepartment = ''
                }
                this.getTasks()
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
        }
    };
</script>

<style lang="scss" scoped>
    table td {
        position: relative;
        a:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: inline-block;
        }
    }

    table tbody tr {
        cursor: pointer;
    }

</style>
