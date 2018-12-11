<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">管理部门</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-12 example float-left">
                        <h1 class="page-title">泰洋系 <span class="color999">（{{count}}人）</span></h1>
                        <template v-for="(item, index) in data">
                            <Department 
                                :data="item" :bgColor="true" 
                                :editDepartment="editDepartment" 
                                :delDepartment="delDepartment"
                                :checkMember="checkMember"
                                :addChildDepartment="showChild"
                                :key="index" 
                                :isEdit="true" />
                        </template>
                    </div>

                    <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#add-department" @click="editStatus(false)">
                        <button type="button"
                                class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                            <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                            <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
                        </button>
                    </div>

                    <!-- 新增部门/编辑 -->
                    <Modal id="add-department" :title="isEdit?'编辑部门' : '添加部门'" @onOK="addDepartment">
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">部门名称</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control"
                                       placeholder="请输入联系人" v-model="departmentName">
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
                                <input type="text" title="" class="form-control" placeholder="请选择" v-model="city">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">部门所属</div>
                            <div class="col-md-10 float-left">
                                <DropDepartment 
                                    :data="data" 
                                    @change="selectDepartment"
                                />
                            </div>
                        </div>
                    </Modal>

                    <!-- 新增子部门 -->
                    <Modal id="add-child-department" title="添加子部门'" @onOK="addChildDepartment">
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">部门名称</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control"
                                       placeholder="请输入联系人" v-model="departmentName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors :placeholder="'请选择负责人'" @change="principalChange"></InputSelectors>
                            </div>
                        </div>
                        <!-- <div v-if="isChild" class="example">
                            <div class="col-md-2 text-right float-left">部门城市</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control" placeholder="请选择" v-model="city">
                            </div>
                        </div> -->
                        <div class="example">
                            <div class="col-md-2 text-right float-left">部门所属</div>
                            <div class="col-md-10 float-left">
                                <DropDepartment 
                                    :data="data" 
                                    @change="selectDepartment"
                                />
                            </div>
                        </div>
                    </Modal>

                    <!-- 选择成员 -->
                    <Modal id="check-member" title="选择成员" @onOk="sureCheckMember">
                        <ListSelectMember />
                    </Modal>

                    <flag @confirmFlag="sureDel" />
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    // import config from '../../assets/js/config'

    export default {
        data() {
            return {
                keyword: '', // 搜索
                data: [],
                count: 0, // 人数
                // editData: {} // 每次改变时的数据
                departmentName: '', // 部门名称
                departmentId: 0, // 部门id
                departmentPId: 0, // 父级部门id
                city: '',
                isEdit: false,
                userId: '',
                delId: '',
                checkMemberData: null,
                isChild: false,
                childData: null
            }
        },

        mounted() {
            this.getDepartment()
            // this.user = JSON.parse(Cookies.get('user'))
            this.userId = JSON.parse(Cookies.get('user')).id
            console.log(this.userId)
        },

        methods: {
            // 获取部门数据
            getDepartment () {
                fetch('get', '/departments').then(res => {
                    this.data = res.data
                    this.count = this.countNum(this.data)
                })
            },
            countNum (data) {
                let count = 0
                data.map(n => {
                    count += n.users.data.length + this.countNum(n.departments.data)
                })
                return count
            },
            // 添加部门
            addDepartment (id) {
                if (!this.departmentName) {
                    toastr.error('请填写部门名称')
                    return
                }
                if (!this.principalId) {
                    toastr.error('请选择部门负责人')
                    return
                }
                const params = {
                    department_pid: this.departmentPId,
                    name: this.departmentName,
                    city: this.city,
                    user_id: this.principalId,
                }
         
                fetch(!this.isEdit?'post':'put', `/departments${!this.isEdit?'':'/'+this.departmentId}`, params).then(res => {
                    console.log(res)
                })
            },
            selectDepartment (data) {
                console.log(data)
                this.departmentId = data.id
                this.departmentPId = data.pId
            },
            // 负责人
            principalChange (val) {
                this.principalId = val.id
            },
            // 编辑部门
            editDepartment (val) {
                this.editStatus(true)
                this.departmentName = val.name
                this.departmentId = val.id
                this.departmentPId = val.department_pid
                console.log(val)
                $('#add-department').modal()
            },
            // 切换编辑状态
            editStatus (status = false) {
                this.isEdit = status
                this.isChild = false
            },
            // 确认删除
            sureDel () {
                fetch('delete', `/departments/remove/${this.delId}`).then(res => {
                    toastr.success('删除成功')
                })
            },
            // 删除部门
            delDepartment (val) {
                this.delId = val.id
                $('#confirmFlag').modal()
            },
            // 选择
            checkMember (data) {
                this.checkMemberData = data
                $('#check-member').modal()
            },
            // 选择成员
            sureCheckMember () {
                alert(1)
                console.log(this.checkMemberData)
            },
            // 弹出子部门
            showChild (data) {
                $('#add-child-department').modal()
                this.childData = data
            },
            // 新增子部门
            addChildDepartment () {
                const params = {
                    department_pid: this.childData.id,
                    name: this.departmentName,
                    user_id: this.principalId,
                }
                fetch('post', `/departments`, params).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .color999 {
        color: #999;
    }
    .input-search i {
        cursor: pointer;
    }
</style>

