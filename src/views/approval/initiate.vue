<template>
  <div class="page">
    <div class="page-main">
      <div class="page-header">
        <h1 class="page-title">发起审批</h1>
      </div>
    </div>

    <div class="page-content container-fluid">
      <div class="page-header">
        <h1 class="page-title">泰洋人事审批</h1>
      </div>
      <div class="row py-5">
        <div class="col-lg-4" v-for="item in list" :key="item.id">
          <div class="card">
            <div class="card-block" data-toggle="modal" :data-target="'#'+item.dialogid">
              <i class="icon md-file float-left" style="font-size:3rem"></i>
              <p class="my-10">{{item.title}}</p>
            </div>
            <div class="modal fade" :id="item.dialogid" aria-hidden="true" aria-labelledby="addLabelForm"
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

                        <!-- <normal-linkage-selectors @change="changeLinkage"></normal-linkage-selectors> -->
                      </div>
                    </div>
                    <div class="example">
                      <div class="col-md-2 text-right float-left">任务类型</div>
                      <div class="col-md-10 float-left pl-0">
                        <selectors :options="taskTypeArr" :placeholder="'请选择任务类型'" @change="changeTaskType"></selectors>
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
                        <input-selectors :placeholder="'请选择负责人'" @change="principalChange"></input-selectors>
                      </div>
                    </div>
                    <div class="example">
                      <div class="col-md-2 text-right float-left">参与人</div>
                      <div class="col-md-10 float-left pl-0">
                        <add-member @change="participantChange"></add-member>
                      </div>
                    </div>
                    <div class="example">
                      <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                      <div class="col-md-10 float-left pl-0">
                        <selectors :options="taskLevelArr" :placeholder="'请选择任务优先级'" @change="changeTaskLevel"></selectors>
                      </div>
                    </div>
                    <div class="example">
                      <div class="col-md-2 text-right float-left">开始时间</div>
                      <div class="col-md-5 float-left pl-0">
                        <datepicker @change="changeStartTime"></datepicker>
                      </div>

                      <div class="col-md-5 float-left pl-0">
                        <timepicker :default="startMinutes" @change="changeStartMinutes"></timepicker>

                      </div>
                      <div class="col-md-12 example clearfix" v-for="field in projectFieldsArr">
                        <div class="col-md-2 text-right float-left pl-0">{{ field.key }}</div>
                        <div class="col-md-10 float-left">
                          <template v-if="field.field_type === 1">
                            <emit-input @change="(value) => addInfo(value, field.key )"></emit-input>
                          </template>
                          <template v-else-if="field.field_type === 2">
                            <selectors :options="field.contentArr" @change="(value) => addInfo(value, field.key )"></selectors>
                          </template>
                          <template v-else-if="field.field_type === 3">
                            <editable-search-box :options="starsArr" :multiple="true" @change="(value) => addInfo(value, field.key )"></editable-search-box>
                          </template>
                          <template v-else-if="field.field_type === 4">
                            <datepicker @change="(value) => addInfo(value, field.key )"></datepicker>
                          </template>
                          <template v-else-if="field.field_type === 5">
                            <textarea title="" class="form-control" @change="(value) => addInfo(value, field.key )"></textarea>
                          </template>
                          <template v-else-if="field.field_type === 6">
                            <selectors :options="field.contentArr" :multiple="true" @change="(value) => addInfo(value, field.key )"></selectors>
                          </template>
                          <template v-else-if="field.field_type === 8">
                            <group-datepicker @change="(value) => addInfo(value, field.key )"></group-datepicker>
                          </template>
                          <template v-else-if="field.field_type === 10">
                            <input-selectors @change="(value) => addInfo(value, field.key )"></input-selectors>
                          </template>
                          <template v-else-if="field.field_type === 11">
                            <number-spinner @change="(value) => addInfo(value, field.key )"></number-spinner>
                          </template>

                        </div>
                      </div>
                      <div class="example">
                        <div class="col-md-2 text-right float-left">截止时间</div>
                        <div class="col-md-5 float-left pl-0">
                          <datepicker @change="changeEndTime"></datepicker>
                        </div>
                        <div class="col-md-5 float-left pl-0">
                          <timepicker :default="endMinutes" @change="changeEndMinutes"></timepicker>
                        </div>
                      </div>
                      <div class="example">
                        <div class="col-md-2 text-right float-left">任务说明</div>
                        <div class="col-md-10 float-left pl-0">
                          <textarea class="form-control" name="taskDescription" id="" cols="30"
                            rows="5" title="" v-model="taskIntroduce"></textarea>
                        </div>
                        <div class="modal-footer">
                          <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                          <button class="btn btn-primary" type="submit" @click="selectProjectType"
                            data-toggle="modal" data-target="#addProject">确定
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <Modal :id="'recruit'" :title="'泰洋招聘申请'">
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">所属部门</div>
                                    <div class="col-md-10 float-left pl-0">
                                            <input type="text" class="form-control" placeholder="所属部门" >
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">招聘职位</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="招聘职位(必填)">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">招聘人数</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="招聘人数(必填)" >
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">现有人数</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="现有人数(必填)" >
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">工资标准</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="工资标准(必填)" >
                                    </div>
                                </div>
                       
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">职责要求</div>
                                    <div class="col-md-10 float-left pl-0">
                                    <textarea class="form-control" name="taskDescription" id="" cols="10"
                                          rows="5" title="" ></textarea>
                                </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">到岗日期</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <Datepicker ></Datepicker>
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
                            </Modal> -->
        </div>
      </div>
    </div>
  </div>


</template>
<script>
  import fetch from "../../assets/utils/fetch.js";
  import config from "../../assets/js/config";
  import Modal from "../../components/Modal.vue";
  export default {
    data: function () {
      return {
        total: 2,
        current_page: 1,
        total_pages: 1,
        companyArr: [],
        starsArr: [],
        projectName: "",
        projectTypeArr: config.projectTypeArr,
        projectFieldsArr: [],
        projectType: "",
        projectFields: "",
        projectsInfo: "",
        customizeInfo: config.customizeInfo,
        addInfoArr: {},
        levelArr: config.levelArr,
        visibleRangeArr: config.visibleRangeArr,
        list: [{
            id: 1,
            dialogid: "recruit",
            title: "泰洋招聘申请"
          },
          {
            id: 2,
            dialogid: "register",
            title: "工作室注册审批"
          },
          {
            id: 3,
            dialogid: "quit",
            title: "泰洋离职申请单"
          },
          {
            id: 4,
            dialogid: "recruit",
            title: "泰洋招聘申请"
          },
          {
            id: 5,
            dialogid: "register",
            title: "工作室注册审批"
          },
          {
            id: 6,
            dialogid: "quit",
            title: "泰洋离职申请单"
          }
        ]
      };
    },

    mounted() {
      this.getClients();
      this.getStars();
      this.getProjects();
    },

    methods: {
      getProjects: function (pageNum = 1) {
        let data = {
          page: pageNum
        };
        let _this = this;
        fetch("get", "/projects", data).then(function (response) {
          _this.projectsInfo = response.data;
        });
      },

      getClients: function () {
        let _this = this;
        fetch("get", "/clients/all").then(function (response) {
          for (let i = 0; i < response.data.length; i++) {
            _this.companyArr.push({
              name: response.data[i].company,
              id: response.data[i].id,
              grade: response.data[i].grade
            });
          }
        });
      },

      getStars: function () {
        let _this = this;
        fetch("get", "/stars/all").then(function (response) {
          for (let i = 0; i < response.data.length; i++) {
            _this.starsArr.push({
              name: response.data[i].name,
              id: response.data[i].id,
              value: response.data[i].id
            });
          }
        });
      },

      projectChange: function (e) {
        console.log(e);
      },

      projectPrincipalChange: function (e) {
        console.log(e);
      },

      customize: function (value) {
        console.log(value);
      },

      addProject: function () {},

      changeLinkageCompany: function (value) {
        console.log(value);
      },

      changeTargetArtist: function (value) {
        console.log(value);
      },

      changeProjectType: function (value) {
        app.projectType = value;
      },

      selectProjectType: function () {
        let _this = this;
        fetch("get", "/project_fields", {
          type: app.projectType
        }).then(function (response) {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].field_type === 2) {
              response.data[i].contentArr = [];
              for (let j = 0; j < response.data[i].content.length; j++) {
                response.data[i].contentArr.push({
                  value: response.data[i].content[j],
                  name: response.data[i].content[j]
                });
              }
            }
          }
          _this.projectFieldsArr = response.data;
        });
        if (_this.projectType !== 5) {
          this.getTrail();
        }
      },

      getTrail: function () {
        fetch("get", "/trails", {
          type: this.projectType
        }).then(function () {});
      },

      addInfo: function (value, name) {
        this.addInfoArr[name] = value;
      }
    }
  };
</script>
<style scoped>
  .page {
    position: absolute;
    left: 210px;
    top: 0;
  }
</style>