<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的任务</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getTasks(1,0)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab">所有任务</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getOther(1,3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getOther(1,2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我参与的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getOther(1,1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我创建的</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white ">
                    <div class="tab-pane animation-fade active pt-20" id="forum-task" role="tabpanel">
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
                            <tr v-for="task in taskInfo" :key="task.id">
                                <td class="pointer-content">
                                    <router-link :to="{name:'tasks/detail', params: {id: task.id}}">{{ task.title }}
                                    </router-link>
                                </td>
                                <td>{{task.resource ? task.resource.data.resource.data.title : ''}}</td>
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
                            <div class="col-md-1" style="margin: 6rem auto"  v-if="taskInfo.length==0">
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
    </div>
</template>
<script>
import fetch from '../../assets/utils/fetch.js';
import config from '../../assets/js/config';
export default {
  name: '',
  data () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                memberPlaceholder: '请选择负责人',
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
                taskInfo:'',//数据
                myType:'',
            }


        },

  mounted() {
    this.getTasks();
    this.getOther();
  },

  methods: {
            //获取任务数据
            getTasks: function (page = 1,signStatus) {
                let data={
                    include:'creator,principal,pTask,tasks,resource.resourceable,resource.resource,affixes,participants',
                    status:this.taskStatus
                }
                let _this = this;
                if(signStatus){
                    this.taskStatus = signStatus
                }
                data.page = page
                fetch('get', '/tasks/my_all', data).then(function (response) {             
                    _this.taskInfo = response.data;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                });
            },
            //获取其他数据
            getOther: function (page = 1,type) {
                let data={
                    include:'creator,principal,pTask,tasks,resource.resourceable,resource.resource,affixes,participants',
                    status:this.taskStatus
                }
                let _this = this;
                if(type){
                    this.myType = type
                }
                data.type=this.myType
                fetch('get', '/tasks/my', data).then(function (response) { 
                    _this.taskInfo = response.data;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                });
            },
  }
}
</script>
<style>
.panel{
    box-shadow: 0 0 0 0;
}
.tab-content{
    padding: 10px 0 10px 20px;
}
.page-item{
    cursor: pointer;
}
</style>

