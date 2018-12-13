<template>
  <div class="">
    <div class="" style="background-color:#f3f4f5">
      <div class="page-header  page-header-bordered mb-0">
        <h1 class="page-title">我的审批</h1>
      </div>
    </div>
    <div class="page-content container-fluid mt-20">
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
              <a class="nav-link active" data-toggle="tab" href="#forum-task" aria-controls="forum-base"
                aria-expanded="true" role="tab">待审批</a>
            </li>
            <li class="nav-item" role="presentation" @click="getMyTasks(1,3)">
              <a class="nav-link" data-toggle="tab" href="#forum-task" aria-controls="forum-present"
                aria-expanded="false" role="tab">已审批</a>
            </li>
          </ul>
        </div>

        <div class="page-content tab-content nav-tabs-animate bg-white">
          <div class="tab-pane animation-fade active pt-20" id="forum-task" role="tabpanel">
            <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
              data-child="tr" data-selectable="selectable">
              <tr class="animation-fade head" style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                <th class="cell-200 pt-20" scope="col">审批编号</th>
                <th class="cell-200 pt-20" scope="col">申请人</th>  
                  <th class="cell-200 pt-20" scope="col">
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
                   
                <th class="cell-200 pt-20" scope="col">申请时间</th>
                <th class="cell-200 pt-20" scope="col">申请状态</th>
              </tr>
              <tr v-for="task in tasksInfo">
                <td class="pointer-content cell-200">
                  <router-link :to="{name:'approval/detail', params: {id: task.id}}">{{ task.title }}
                  </router-link>
                </td>
                <td class="cell-200">暂无</td>
                <td class="cell-200">暂无</td>
                <td class="cell-200">
                  <template v-if="task.status === 1">进行中</template>
                  <template v-if="task.status === 2">已完成</template>
                  <template v-if="task.status === 3">已停止</template>
                </td>
                <td class="cell-200">
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
      <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
        <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
        <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
      </button>
    </div>

    <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
      tabindex="-1">
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
                <Selectors :options="taskTypeArr" :placeholder="'请选择任务类型'" @change="changeTaskType"></Selectors>
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
              <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
              <div class="col-md-10 float-left pl-0">
                <Selectors :options="taskLevelArr" :placeholder="'请选择任务优先级'" @change="changeTaskLevel"></Selectors>
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
                <textarea class="form-control" name="taskDescription" id="" cols="30" rows="5"
                  title="" v-model="taskIntroduce"></textarea>
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
import fetch from "../../assets/utils/fetch.js";
import config from "../../assets/js/config";

export default {
  name: "",
  data: function() {
    return {
      total: 0,
      current_page: 1,
      total_pages: 1,
      memberPlaceholder: "请选择负责人",
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
      taskLevelArr: config.taskLevelArr,
      taskTypeArr: config.taskTypeArr,
      customizeInfo: config.customizeInfo
    };
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    getTasks: function(pageNum = 1) {
      let data = {
        page: pageNum,
        include:
          "principal,pTask,tasks,resource.resourceable,resource.resource,participants"
      };
      let _this = this;

      fetch("get", "/tasks/my_all", data).then(function(response) {
        _this.tasksInfo = response.data;
        _this.current_page = response.meta.pagination.current_page;
        _this.total = response.meta.pagination.total;
        _this.total_pages = response.meta.pagination.total_pages;
      });
    },

    getMyTasks: function(pageNum = 1, type = null) {
      let _this = this;
      if (type) {
        app.taskFinishType = type;
      }

      let data = {
        page: pageNum,
        include:
          "principal,pTask,tasks,resource.resourceable,resource.resource,participants",
        type: app.taskFinishType,
        status: 0
      };

      $.ajax({
        type: "get",
        url: config.apiUrl + "/tasks/my",
        headers: config.getHeaders(),
        data: data
      }).done(function(response) {
        _this.tasksInfo = response.data;
        _this.current_page = response.meta.pagination.current_page;
        _this.total = response.meta.pagination.total;
        _this.total_pages = response.meta.pagination.total_pages;
      });
    },

    addTask: function() {
      let _this = this;
      let participant_ids = [];
      for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
        participant_ids.push(this.$store.state.newParticipantsInfo[i].id);
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
        start_at: _this.startTime + " " + _this.startMinutes,
        end_at: _this.endTime + " " + _this.endMinutes,
        desc: _this.taskIntroduce
      };
      $.ajax({
        type: "post",
        url: config.apiUrl + "/tasks",
        headers: config.getHeaders(),
        data: data,
        statusCode: {
          400: function(response) {
            toastr.error(response.responseJSON.message);
          }
        }
      }).done(function(response) {
        toastr.success("创建成功");
        $("#addTask").modal("hide");
        redirect("detail?task_id=" + response.data.id);
      });
    },

    customize: function(value) {
      console.log(value);
    },

    changeLinkage: function(value) {
      console.log(value);
    },

    changeTaskType: function(value) {
      this.taskType = value;
    },

    principalChange: function(value) {
      this.principal = value;
    },

    participantChange: function(value) {
      let flagArr = [];
      for (let i = 0; i < value.length; i++) {
        flagArr.push(value[i].id);
      }
      this.participants = flagArr;
    },

    changeTaskLevel: function(value) {
      this.taskLevel = value;
    },

    changeStartTime: function(value) {
      this.startTime = value;
    },

    changeStartMinutes: function(value) {
      this.startMinutes = value;
    },

    changeEndTime: function(value) {
      this.endTime = value;
    },

    changeEndMinutes: function(value) {
      this.endMinutes = value;
    }
  }
};
</script>

<style scoped>
.page {
  position: absolute;
  left: 140px;
  top: 0;
}
a {
  text-decoration: none;
}
.nav-item a{
  color: #757575;
}
.nav-link.dropdown-toggle{
  text-align: left;
  margin-top: -8px;
  margin-left: -15px;
}
.page-content{
  padding: 0 20px; 
}
tr:hover {
    background-color: #f5f5f5;
    cursor: pointer;
}
.head:hover{
    background-color: #fff;
}
</style>