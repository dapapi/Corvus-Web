<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
        <h1 class="page-title">管理部门</h1>
        </div>

        <div class="page-content container-fluid">
        <div class="panel col-md-12 clearfix py-5">
            <div class="clearfix">
            <div class="col-md-12 example float-left">
                <template v-for="(item, index) in department">
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
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
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
                        placeholder="请输入部门名称"
                        v-model="departmentName"
                    >
                </div>
                </div>
                <div class="example">
                    <div class="col-md-2 text-right float-left">负责人</div>
                    <div class="col-md-10 float-left">
                        <InputSelectors :placeholder="'请选择负责人'" @change="principalChange"></InputSelectors>
                    </div>
                </div>
                <div class="example">
                    <div class="col-md-2 text-right float-left">部门城市</div>
                    <div class="col-md-10 float-left">
                        <selectors ref="departmentCity" :options="cityArr" @change="changeCity"></selectors>
                    </div>
                </div>
                <div class="example">
                    <div class="col-md-2 text-right float-left">部门所属</div>
                    <div class="col-md-10 float-left">
                        <DropDepartment :data="department" @change="selectDepartment"/>
                    </div>
                </div>
                <div class="example">
                    <div class="col-md-2 text-right float-left require">组织</div>
                    <div class="col-md-10 float-left">
                        <Selectors
                            ref="company"
                            :options="companyArr"
                            @change=" item => companyId = item"
                        />
                        <!-- @change="item => changeState('gender', item)" -->
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
                    <div class="col-md-2 text-right float-left">负责人</div>
                    <div class="col-md-10 float-left">
                        <InputSelectors :placeholder="'请选择负责人'" @change="principalChange"></InputSelectors>
                    </div>
                </div>
                <div class="example">
                    <div class="col-md-2 text-right float-left">部门所属</div>
                    <div class="col-md-10 float-left">
                        <DropDepartment :data="department" @change="selectDepartment"/>
                    </div>
                </div>
                <div class="example">
                    <div class="col-md-2 text-right float-left require">组织</div>
                    <div class="col-md-10 float-left">
                        <Selectors
                            ref="company"
                            :options="companyArr"
                            @change=" item => companyId = item"
                        />
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
                    <DropDepartment :data="department" :dIndex="dIndex" @change="selectDepartment"/>
                </div>
            </Modal>

            <flag @confirmFlag="sureDel"/>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import fetch from "../../assets/utils/fetch.js";
import config from '../../assets/js/config'

export default {
    data() {
        return {
            keyword: "", // 搜索
            departmentName: "", // 部门名称
            departmentId: 0, // 部门id
            departmentPId: 0, // 父级部门id
            city: "",
            isEdit: false,
            moveDepartmentId: 0,
            dIndex: -1,
            principalName: '', // 负责人名字
            principalId: '', // 负责人id
            cityArr: config.departmentCityArr, // 部门城市
            companyArr: [], // 公司
            companyId: '', // 公司id
            companyName: '', // 公司name
        };
    },

    mounted() {
        $('#add-department').on('hidden.bs.modal', () => {
            // 清空state
            this.cancelAdd()
        })
        $('#check-member').on('hidden.bs.modal', () => {
            // 清空state
            this.$store.commit("changeNewParticipantsInfo", []);
        })
        $('#add-child-department').on('hidden.bs.modal', () => {
            // 清空state
            this.cancelAdd()
        })
        this.getCompany()
        
        if (this.department.length > 0) {
            this.departmentPId = this.department[0].department_pid;
            this.departmentId = this.department[0].id;
        }
    },
    
    computed: {
        ...mapState([
            'department',
        ]),
        _department () {
            return this.department
        }
    },

    watch: {
        _department () {
            this.departmentPId = this.department[0].department_pid;
            this.departmentId = this.department[0].id;
        }
    },

    methods: {
        ...mapActions([
            'getDepartment', // 获取部门数据
        ]),
        // 添加部门
        addDepartment(id) {
            if (!this.departmentName) {
                toastr.error("请填写部门名称");
                return;
            }
            if (!this.companyId) {
                toastr.error("请选择组织");
                return;
            }
            const params = {
                department_pid: !this.isEdit ? this.departmentId : this.departmentPId, // 这里对应的是departmentId
                name: this.departmentName,
                city: this.city,
                user_id: this.principalId,
                company_id: this.companyId
            };

            fetch(
                !this.isEdit ? "post" : "put",
                `/departments${!this.isEdit ? "" : "/" + this.departmentId}`,
                params
            ).then(res => {
                toastr.success(!this.isEdit ? "添加成功" : "修改成功");
                $("#add-department").modal("hide");
                setTimeout(() => {
                    this.getDepartment();
                }, 100)
            });
        },
        selectDepartment(data) {
            if (!this.isEdit) {
                this.departmentId = data.id;
                this.departmentPId = data.pId;
            } else {
                this.departmentPId = data.id;
            }
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
            if (val.is_department_principal === 1) {
                this.principalName = val.is_department_username
                this.principalId = val.is_department_user_id
            } else {
                this.principalName = ''
                this.principalId = ''
            }
            if (val.company_id) {
                this.companyName = val.company
                this.companyId = val.company_id
                this.$refs.company.setValue(this.companyId)
            }

            //   departmentCity todo
            //   this.city = val.
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
            this.$store.commit("changeNewParticipantsInfo", JSON.parse(JSON.stringify(data.users.data)));
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
            if (!this.departmentName) {
                toastr.error("请填写部门名称");
                return;
            }
            if (!this.companyId) {
                toastr.error("请选择组织");
                return;
            }
            const params = {
                department_pid: this.departmentId,
                name: this.departmentName,
                user_id: this.principalId,
                company_id: this.companyId
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
        },
        // 改变城市
        changeCity (val, name) {
            this.city = name
        },
        cancelAdd () {
            this.$refs.departmentCity.setValue('')
            this.city = ''
            this.principalName = ''
            this.principalId = ''
            this.departmentName = "" // 部门名称
            this.departmentId = 0 // 部门id
            this.departmentPId = 0 // 父级部门id
            this.$store.commit('changeNewPrincipal', {
                name: '',
                id: ''
            })
            this.companyId = ''
        },
        getCompany () {
            fetch('get', '/company').then(res => {
                this.companyArr = res.data.map( n => {
                    return {
                        name: n.name,
                        value: n.id
                    }
                })
            })
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
