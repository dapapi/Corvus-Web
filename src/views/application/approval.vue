<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的审批</h1>
        </div>
       <div class="page-content container-fluid">
           <div class="panel col-md-12 col-lg-12 py-5">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getTasks(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab">待审批</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getTasks(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">已审批</a>
                        </li>
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active pt-20" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                                data-child="tr"
                                data-selectable="selectable">
                                <tr class="animation-fade" style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">审批编号</th>
                                <th class="cell-300" scope="col">申请人</th>  
                                <th class="cell-300" scope="col">
                                    <div class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">类型</font></font></a>
                                    <div class="dropdown-menu" role="menu">
                                        <a class="dropdown-item" tabindex="-1" href="javascript:void(0)"> 不限 </a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" tabindex="-1" href="javascript:void(0)"> 工作室注册申请</a>
                                        <a class="dropdown-item" tabindex="-1" href="javascript:void(0)"> 报销</a>
                                        <a class="dropdown-item" tabindex="-1" href="javascript:void(0)"> 通用审批 </a>
                                    </div>
                                    </div>
                                </th>          
                                <th class="cell-300" scope="col">申请时间</th>
                                <th class="cell-300" scope="col">申请状态</th>
                            </tr>
                            <tbody>
                            <tr v-for="task in tasksInfo" :key="task.id">
                                <td class="pointer-content">
                                    {{task.number}}
                                </td>
                                <td>{{task.person}}</td>
                                <td>
                                    <template v-if="task.type === 0">工作室注册申请</template>
                                    <template v-if="task.type === 1">报销</template>
                                    <template v-if="task.type === 2">通用审批</template>
                                </td>
                                <td>
                                    {{task.time}}
                                </td>
                                <td>
                                    <template v-if="task.status === 0">
                                        <button class="btn btn-warning" type="submit" 
                                                data-toggle="modal" data-target="#addProject"  style="color:#fff"> 待审批
                                        </button>
                                    </template>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                            <template v-if="!taskStatus">
                            <Pagination :current_page="current_page" :method="getTasks" :total_pages="total_pages"
                                :total="total"></Pagination>
                            </template>
                            <template v-else>
                            <Pagination :current_page="current_page" :method="getMyTasks" :total_pages="total_pages"
                                :total="total"></Pagination>
                            </template>
                    </div>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
import fetch from '../../assets/utils/fetch.js';
import config from '../../assets/js/config';
import env from '../../assets/js/env';
import approval from "./approval.json";

export default {
  name: '',
  data () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                participants: [],
                multiple: false,
                taskIntroduce: '',
                startTime: '',
                startMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                tasksInfo: '',
                taskStatus: 0,
                newTask: {},
                taskType: '',
                taskFinishType: '',
                taskName: '',
                taskLevel: '',
                taskLevelArr: config.taskLevelArr,
                taskTypeArr: config.taskTypeArr,
                customizeInfo: config.customizeInfo,
            }


        },

  mounted() {
    this.getTasks();
  },

  methods: {
        getTasks (pageNum = 1) {
            let data = {
                page: pageNum,
                include: 'principal,pTask,tasks,resource.resourceable,resource.resource,participants',
            };
            let _this = this;

            fetch('get', '/tasks/my_all', data).then(function (response) {
                _this.tasksInfo = approval;
                _this.current_page = response.meta.pagination.current_page;
                _this.total = response.meta.pagination.total;
                _this.total_pages = response.meta.pagination.total_pages;
            });
        },

        getMyTasks (pageNum = 1, type = null) {
            let _this = this;
            if (type) {
            app.taskFinishType = type
        }

            let data = {
                page: pageNum,
                include: 'principal,pTask,tasks,resource.resourceable,resource.resource,participants',
                type: app.taskFinishType,
                status: 0
            };

            $.ajax({
                type: 'get',
                url: env.apiUrl + '/tasks/my',
                headers: env.getHeaders(),
                data: data
            }).done(function (response) {
                _this.tasksInfo = response.data;
                _this.current_page = response.meta.pagination.current_page;
                _this.total = response.meta.pagination.total;
                _this.total_pages = response.meta.pagination.total_pages;
            })
        },
        addTask () {
            let _this = this;
            let participant_ids = [];
            for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
            }
            let data = {
                // resource_type: '1718463094',
                // resourceable_id: '1994731356',
                // type: app.taskType,
                // @todo 任务类型前端维护
                title: _this.taskName,
                principal_id: this.$store.state.newPrincipalInfo.id,
                participant_ids: participant_ids,
                priority: _this.taskLevel,
                start_at: _this.startTime + ' ' + _this.startMinutes,
                end_at: _this.endTime + ' ' + _this.endMinutes,
                desc: _this.taskIntroduce
            };
            $.ajax({
                type: 'post',
                url: env.apiUrl + '/tasks',
                headers: env.getHeaders(),
                data: data,
                statusCode: {
                    400: function (response) {
                        toastr.error(response.responseJSON.message);
                    },
                }
            }).done(function (response) {
                toastr.success('创建成功');
                $('#addTask').modal('hide');
                redirect('detail?task_id=' + response.data.id)
            })
        },

        customize (value) {
            console.log(value)
        },

        changeLinkage (value) {
            console.log(value)
        },

        changeTaskType (value) {
            this.taskType = value
        },

        principalChange (value) {
            this.principal = value
        },

        participantChange (value) {
            let flagArr = [];
            for (let i = 0; i < value.length; i++) {
                flagArr.push(value[i].id)
            }
            this.participants = flagArr
        },

        changeTaskLevel (value) {
            this.taskLevel = value
        },

        changeStartTime (value) {
            this.startTime = value
        },

        changeStartMinutes (value) {
            this.startMinutes = value
        },

        changeEndTime (value) {
            this.endTime = value
        },

        changeEndMinutes (value) {
            this.endMinutes = value
        },
  },

};

</script>
<style>
.nav-link.dropdown-toggle{
  text-align: left;
  margin-top: -8px;
  margin-left: -15px;
  background: #fff;
}
.panel{
    box-shadow: 0 0 0 0;
}
</style>

