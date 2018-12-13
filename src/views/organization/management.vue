<template>
  <div class="page-main" style="background-color:#f3f4f5">
    <div class="page-header page-header-bordered">
      <h1 class="page-title">管理部门</h1>
    </div>

    <div class="page-content container-fluid">
      <div class="panel col-md-12 clearfix py-5">
        <div class="clearfix">
          <div class="col-md-12 example float-left">
            <template v-for="(item, index) in data">
              <Department
                :data="item"
                :dIndex="index"
                :bgColor="dIndex === index"
                :editDepartment="editDepartment"
                :delDepartment="delDepartment"
                :checkMember="checkMember"
                :addChildDepartment="showChild"
                :moveDepartment="showMove"
                :key="index"
                @changeIndex="changeIndex"
                :isEdit="true"
              />
            </template>
          </div>

          <div
            class="site-action"
            data-plugin="actionBtn"
            data-toggle="modal"
            data-target="#add-department"
            @click="editStatus(false)"
          >
            <button
              type="button"
              class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic"
            >
              <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
              <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
          </div>

          <!-- 新增部门/编辑 -->
          <Modal id="add-department" :title="isEdit?'编辑部门' : '添加部门'" @onOK="addDepartment">
            <div class="example">
              <div class="col-md-2 text-right float-left require">部门名称</div>
              <div class="col-md-10 float-left">
                <input
                  type="text"
                  title
                  class="form-control"
                  placeholder="请输部门名称"
                  v-model="departmentName"
                >
              </div>
            </div>
            <div class="example">
              <div class="col-md-2 text-right float-left require">负责人</div>
              <div class="col-md-10 float-left">
                <InputSelectors :placeholder="'请选择负责人'" @change="principalChange"></InputSelectors>
              </div>
            </div>
            <div class="example">
              <div class="col-md-2 text-right float-left">部门城市</div>
              <div class="col-md-10 float-left">
                <input type="text" title class="form-control" placeholder="请选择" v-model="city">
              </div>
            </div>
            <div class="example">
              <div class="col-md-2 text-right float-left">部门所属</div>
              <div class="col-md-10 float-left">
                <DropDepartment :data="data" @change="selectDepartment"/>
              </div>
            </div>
          </Modal>

          <!-- 新增子部门 -->
          <Modal id="add-child-department" title="添加子部门" @onOK="addChildDepartment">
            <div class="example">
              <div class="col-md-2 text-right float-left require">部门名称</div>
              <div class="col-md-10 float-left">
                <input
                  type="text"
                  title
                  class="form-control"
                  placeholder="请输部门名称"
                  v-model="departmentName"
                >
              </div>
            </div>
            <div class="example">
              <div class="col-md-2 text-right float-left require">负责人</div>
              <div class="col-md-10 float-left">
                <InputSelectors :placeholder="'请选择负责人'" @change="principalChange"></InputSelectors>
              </div>
            </div>
            <div class="example">
              <div class="col-md-2 text-right float-left">部门所属</div>
              <div class="col-md-10 float-left">
                <DropDepartment :data="data" @change="selectDepartment"/>
              </div>
            </div>
          </Modal>

          <!-- 选择成员 -->
          <Modal id="check-member" title="选择成员" @onOK="sureCheckMember">
            <ListSelectMember/>
          </Modal>
          <!-- 移动部门 -->
          <Modal id="move-department" title="移动部门" @onOK="moveDepartment">
            <div class="example">
              <DropDepartment :data="data" :dIndex="dIndex" @change="selectDepartment"/>
            </div>
          </Modal>

          <flag @confirmFlag="sureDel"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from "../../assets/utils/fetch.js";

export default {
  data() {
    return {
      keyword: "", // 搜索
      data: [],
      count: 0, // 人数
      departmentName: "", // 部门名称
      departmentId: 0, // 部门id
      departmentPId: 0, // 父级部门id
      city: "",
      isEdit: false,
      moveDepartmentId: 0,
      dIndex: -1
    };
  },

  mounted() {
    this.getDepartment();
  },

  methods: {
    // 获取部门数据
    getDepartment() {
      fetch("get", "/departments").then(res => {
        this.data = res.data;
        this.departmentPId = res.data[0].department_pid;
        this.departmentId = res.data[0].id;
      });
    },
    // 添加部门
    addDepartment(id) {
      if (!this.departmentName) {
        toastr.error("请填写部门名称");
        return;
      }
      if (!this.principalId) {
        toastr.error("请选择部门负责人");
        return;
      }
      const params = {
        department_pid: this.departmentPId,
        name: this.departmentName,
        city: this.city,
        user_id: this.principalId
      };

      fetch(
        !this.isEdit ? "post" : "put",
        `/departments${!this.isEdit ? "" : "/" + this.departmentId}`,
        params
      ).then(res => {
        toastr.success(this.isEdit ? "添加成功" : "修改成功");
        $("#add-department").modal("hide");
        this.getDepartment();
      });
    },
    selectDepartment(data) {
      this.departmentId = data.id;
      this.departmentPId = data.department_pid;
    },
    // 负责人
    principalChange(val) {
      this.principalId = val.id;
    },
    // 编辑部门
    editDepartment(val) {
      this.editStatus(true);
      this.departmentName = val.name;
      this.departmentId = val.id;
      this.departmentPId = val.department_pid;
      $("#add-department").modal();
    },
    // 切换编辑状态
    editStatus(status = false) {
      this.isEdit = status;
    },
    // 确认删除
    sureDel() {
      fetch("delete", `/departments/remove/${this.departmentId}`).then(res => {
        toastr.success("删除成功");
        this.getDepartment();
      });
    },
    // 删除部门
    delDepartment(val) {
      this.departmentId = val.id;
      $("#confirmFlag").modal();
    },
    // 选择
    checkMember(data) {
      this.departmentId = data.id;
      this.$store.commit("changeNewParticipantsInfo", data.users.data);
      $("#check-member").modal();
    },
    // 选择成员
    sureCheckMember() {
      const params = {
        user: this.$store.state.newParticipantsInfo.map(n => n.id)
      };
      fetch("put", `/departments/member/${this.departmentId}`, params).then(
        res => {
          toastr.success("成员选择成功");
          this.getDepartment();
          $("#check-member").modal("hide");
        }
      );
    },
    // 弹出子部门
    showChild(data) {
      $("#add-child-department").modal();
      this.departmentId = data.id;
    },
    // 新增子部门
    addChildDepartment() {
      const params = {
        department_pid: this.departmentId,
        name: this.departmentName,
        user_id: this.principalId
      };
      fetch("post", `/departments`, params).then(res => {
        toastr.success("添加成功");
        $("#add-child-department").modal("hide");
        this.getDepartment();
      });
    },
    // 展示移动部门
    showMove(data) {
      $("#move-department").modal();
      this.moveDepartmentId = data.id;
    },
    // 移动部门
    moveDepartment() {
      const params = {
        department_pid: this.departmentId
      };
      fetch("put", `/departments/mobile/${this.moveDepartmentId}`, params).then(
        res => {
          toastr.success("移动成功");
          $("#move-department").modal("hide");
          this.getDepartment();
        }
      );
    },
    // index
    changeIndex(index) {
      this.dIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.color999 {
  color: #999;
}

.input-search i {
  cursor: pointer;
}
</style>
