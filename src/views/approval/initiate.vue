<template>
    <div class="" style="background-color:#f3f4f5">
      <div class="page-header page-header-bordered mb-0">
        <h1 class="page-title">发起审批</h1>
      </div>
    
    <div class="page-content container-fluid ">
      <div class="page-header">
        <h4 class="">泰洋人事审批</h4>
      </div>
      <div class="row py-5">
        <div class="col-lg-4 approval-module" v-for="item in dailog" :key="item.id">
          <div class="card" @click="addAproval(item)">
            <div class="card-block" data-toggle="modal" data-target="#approval">
              <i class="md-file float-left" style="font-size:3rem"></i>
              <p class="my-10">{{item.key}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" aria-hidden="true" aria-labelledby="addLabelForm"
         role="dialog" tabindex="-1" id="approval">
      <div class="modal-dialog modal-simple">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
              <i class="md-close" aria-hidden="true"></i>
            </button>
            <h4 class="modal-title">{{selectedInfo.key}}</h4>
          </div>
          <div class="modal-body">
            <div class="col-md-12 example clearfix" v-for="field in selectedInfo.data " :key="field.id">
              <div class="col-md-2 text-right float-left pl-0">{{field.key }}</div>
              <div class="col-md-10 float-left lb">
                <template v-if="field.field_type === 1">
                  <emit-input @change="(value) => addInfo(value, field.key )"
                              :placeholder="field.key"></emit-input>
                </template>
                <template v-else-if="field.field_type === 2">
                  <selectors :options="field.contentArr"
                             @change="(value) => addInfo(value, field.key )"></selectors>
                </template>
                <template v-else-if="field.field_type === 3">
                  <editable-search-box :options="starsArr" :multiple="true"
                                       @change="(value) => addInfo(value, field.key )"></editable-search-box>
                </template>
                <template v-else-if="field.field_type === 4">
                  <datepicker @change="(value) => addInfo(value, field.key )"></datepicker>
                </template>
                <template v-else-if="field.field_type === 5">
                                    <textarea title="" class="form-control"
                                              @change="(value) => addInfo(value, field.key )"></textarea>
                </template>
                <template v-else-if="field.field_type === 6">
                  <selectors :options="field.contentArr" :multiple="true"
                             @change="(value) => addInfo(value, field.key )"></selectors>
                </template>
                <template v-else-if="field.field_type === 8">
                  <group-datepicker
                    @change="(value) => addInfo(value, field.key )"></group-datepicker>
                </template>
                <template v-else-if="field.field_type === 10">
                  <input-selectors
                    @change="(value) => addInfo(value, field.key )"></input-selectors>
                </template>
                <template v-else-if="field.field_type === 11">
                  <number-spinner
                    @change="(value) => addInfo(value, field.key )"></number-spinner>
                </template>
                <template v-else-if="field.field_type === 12">
                  <Upload @change='getUploadUrl' class="upload-image">
                    <div class="puls" :style="{ backgroundImage: 'url(' + uploadUrl + ')' }" v-if="uploadUrl">
                    </div>
                    <div class="puls" v-if="!uploadUrl">
                      <span>+</span>
                    </div>
                  </Upload>
                </template>
                <template v-else-if="field.field_type === 13">
                  <Upload><a href="javascript:;" style="color:#linegreen">上传文件</a></Upload>
                </template>
              </div>
            </div>
            <div class="col-md-2 text-right float-left">审批人</div>
            <div class="pearls row">
              <div class="pearl done col-2">
                <div class="pearl-icon">我</div>
              </div>
              <div class="pearl done col-2">
                <div class="pearl-icon">静静</div>
              </div>
              <div class="pearl disabled col-2">
                <div class="pearl-icon">海平</div>
              </div>
            </div>
          </div>
          <div class="example">
            <div class="col-md-2 text-right float-left">知会人</div>
            <AddMember @change="participantChange"></AddMember>
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
</template>
<script>
  import fetch from "../../assets/utils/fetch.js";
  import config from "../../assets/js/config";
  import Modal from "../../components/Modal.vue";

  export default {
    data: function () {
      return {
        uploadUrl:'',
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
        selectedInfo: '',
        dailog: [
          {
            id: 1,
            key: "泰洋招聘申请",
            data: [
              {id: 1, key: "所属部门", field_type: 1},
              {id: 2, key: "招聘职务", field_type: 1},
              {id: 3, key: "招聘人数", field_type: 1},
              {id: 4, key: "现有人数", field_type: 1},
              {id: 5, key: "工资标准", field_type: 1},
              {id: 6, key: "职责要求", field_type: 1},
              {id: 7, key: "到岗日期", field_type: 4}
            ]
          },
          {
            id: 2,
            key: "工作室注册审批",
            data: [
              {id: 1, key: "申请人姓名", field_type: 1},
              {id: 2, key: "部门", field_type: 1},
              {id: 3, key: "工作室法人(艺人)", field_type: 1},
              {id: 4, key: "法人身份证号", field_type: 1},
              {id: 5, key: "联系方式(手机)", field_type: 1},
              {id: 6, key: "学历", field_type: 4},
              {id: 7, key: "年收入范围", field_type: 1},
              {id: 8, key: "图片", field_type: 12},
              {id: 9, key: "附件", field_type: 13}
            ]
          },
          {
            id: 3,
            key: "泰洋招聘申请",
            data: [
              {id: 1, key: "离职员工姓名", field_type: 1},
              {id: 2, key: "入职日期", field_type: 1},
              {id: 3, key: "离职日期", field_type: 1},
              {id: 4, key: "所属岗位", field_type: 1},
              {id: 5, key: "交换人员", field_type: 1},
              {id: 6, key: "离职原因", field_type: 4},
              {id: 7, key: "所需交接事项", field_type: 4},
              {id: 8, key: "所在部门", field_type: 1}
            ]
          },
          {
            id: 4,
            key: "泰洋招聘申请",
            data: [
              {id: 1, key: "所属部门", field_type: 1},
              {id: 2, key: "招聘职务", field_type: 1},
              {id: 3, key: "招聘人数", field_type: 1},
              {id: 4, key: "现有人数", field_type: 1},
              {id: 5, key: "工资标准", field_type: 1},
              {id: 6, key: "职责要求", field_type: 1},
              {id: 7, key: "到岗日期", field_type: 4}
            ]
          },
          {
            id: 5,
            key: "工作室注册审批",
            data: [
              {id: 1, key: "申请人姓名", field_type: 1},
              {id: 2, key: "部门", field_type: 1},
              {id: 3, key: "工作室法人(艺人)", field_type: 1},
              {id: 4, key: "法人身份证号", field_type: 1},
              {id: 5, key: "联系方式(手机)", field_type: 1},
              {id: 6, key: "学历", field_type: 4},
              {id: 7, key: "年收入范围", field_type: 1},
              {id: 8, key: "图片", field_type: 12},
              {id: 9, key: "附件", field_type: 13}
            ]
          },
          {
            id: 6,
            key: "泰洋招聘申请",
            data: [
              {id: 1, key: "离职员工姓名", field_type: 1},
              {id: 2, key: "入职日期", field_type: 1},
              {id: 3, key: "离职日期", field_type: 1},
              {id: 4, key: "所属岗位", field_type: 1},
              {id: 5, key: "交换人员", field_type: 1},
              {id: 6, key: "离职原因", field_type: 4},
              {id: 7, key: "所需交接事项", field_type: 4},
              {id: 8, key: "所在部门", field_type: 1}
            ]
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
      getUploadUrl(res){
        this.uploadUrl = res
      },
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

      addProject: function () {
      },

      changeLinkageCompany: function (value) {
        console.log(value);
      },

      changeTargetArtist: function (value) {
        console.log(value);
      },

      changeProjectType: function (value) {
        app.projectType = value;
      },
      participantChange: function (value) {
        let flagArr = [];
        for (let i = 0; i < value.length; i++) {
          flagArr.push(value[i].id)
        }
        this.participants = flagArr
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
        }).then(function () {
        });
      },

      addInfo: function (value, name) {
        this.addInfoArr[name] = value;
      },

      addAproval: function (value) {
        this.selectedInfo = value
      }
    }
  };
</script>
<style scoped>
 .upload-image{
  display: flex;
  width: 500px;
  height: 100px;
}
  .page {
    position: absolute;
    left: 210px;
    top: 0;
  }
  .page-header{
    padding: 20px;
  }
  .puls {
    display: inline-block;
    background-size: 100px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;

  }
  .page-content{
    padding: 10px 20
  }
  .puls span {
    font-size: 30px;
  }

  .pearl-icon {
    font-size: 12px;
  }
  .addMember {
    padding-left: 20px;
  }

  .example {
    margin-top: 0;
  }
  .lb{
      padding-left: 0;
  }
  .pearl.done .pearl-icon, .pearl.done .pearl-number{
      margin-left: -30px;
  }
  .approval-module{
    cursor: pointer;
  }
  .card-block:hover{
    box-shadow:4px 4px 12px 1px rgba(7,17,27,0.2);
  }
</style>
