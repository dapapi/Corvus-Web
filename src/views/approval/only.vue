<template>
<div class="page"> 
    <div class="page-main">
        <div class="page-header">
          <h1 class="page-title">只会我的</h1>
        </div>
    </div>
    <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="col-md-5 py-20">
                <div class="input-search">
                      <i class="input-search-icon md-search" aria-hidden="true"></i>
                      <input type="text" class="form-control" name="" placeholder="输入编号、类型、申请人">
                      <button type="button" class="input-search-close icon md-close" aria-label="Close"></button>
                </div>
                </div>
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getTasks(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">待审批</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1,3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已审批</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">审批编号</th>
                                <th class="cell-300" scope="col">申请人</th>
                                <th class="cell-300" scope="col">类型</th>
                                <th class="cell-300" scope="col">申请时间</th>
                                <th class="cell-300" scope="col">申请状态</th>
                            </tr>
                            <tr v-for="task in tasksInfo">
                                <td class="pointer-content">
                                    <router-link :to="{name:'tasks/detail', params: {id: task.id}}">{{ task.title }}
                                    </router-link>
                                </td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td>
                                    <template v-if="task.status === 1">进行中</template>
                                    <template v-if="task.status === 2">已完成</template>
                                    <template v-if="task.status === 3">已停止</template>
                                </td>
                                <td>
                                    <template v-if="task.principal">{{ task.principal.data.name }}</template>
                                </td>
                             
                            </tr>
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

        <CustomizeFilter :data="customizeInfo" @change="customize"></CustomizeFilter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addTask">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增任务</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                <!-- todo 未关联资源-->
                                <!--<normal-linkage-selectors @change="changeLinkage"></normal-linkage-selectors>-->
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors :options="taskTypeArr" :placeholder="'请选择任务类型'"
                                           @change="changeTaskType"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称" v-model="taskName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-5 float-left pl-0">
                                <InputSelectors :placeholder="'请选择负责人'"
                                                @change="principalChange"></InputSelectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <AddMember @change="participantChange"></AddMember>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors :options="taskLevelArr" :placeholder="'请选择任务优先级'"
                                           @change="changeTaskLevel"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker @change="changeStartTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <Timepicker :default="startMinutes" @change="changeStartMinutes"></Timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker @change="changeEndTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <Timepicker :default="endMinutes" @change="changeEndMinutes"></Timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务说明</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" name="taskDescription" id="" cols="30"
                                          rows="5" title="" v-model="taskIntroduce"></textarea>
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

</template>

<script>

export default {

}
</script>
<style scoped>
.page{
    position: absolute;
    left:210px;
    top:0;
}

</style>