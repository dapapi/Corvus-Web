<template>
    <!-- Page -->
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">员工档案</h1>
            <div class="page-header-actions">
                <router-link to="/staff/history">历史归档</router-link>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                     <div class="col-md-2 example float-left">
                        <selectors :options="[{value: '',name: '全部'}, ...hireShapeArr]" :defaultFirst="true" changeKey="hireShape" @select="changeState"></selectors>
                    </div>
                    <div class="col-md-2 example float-left">
                        <selectors :options="[{value: '',name: '全部'}, ...staffStatus]" :defaultFirst="true" changeKey="status" @select="changeState"></selectors>
                    </div>
                    <div class="col-md-2 example float-left">
                        <selectors :options="[{value: '',name: '全部'}, ...staffPositionStatus]" :defaultFirst="true" changeKey="positionType" @select="changeState"></selectors>
                    </div>
                   
                    <div class="col-md-3 example float-left">
                        <div class="input-search">
                            <button type="button" @click="getStaffList" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                            </button>
                            <input type="text" class="form-control" @keyup.enter="getStaffList" v-model="search" placeholder="请搜索姓名/手机号">
                        </div>
                    </div>
                    <div class="col-md-3 example float-left" 
                        style="height: 36px; line-height: 36px; text-align: right; font-size: 14px;"
                    >
                        <!-- 隐藏报表 -->
                        <!-- <span style="cursor: pointer; margin-right: 24px;" data-target="#examplePositionCenter" data-toggle="modal">报表</span> -->
                        <span style="cursor: pointer"><router-link to="/staff/apply">申请表</router-link></span>
                        <!-- <button class="btn btn-primary" data-target="#examplePositionCenter"  type="button">Generate</button> -->
                    </div>
                    <Modal 
                        id="examplePositionCenter"
                        title="选择报表字段"
                    >
                        <checkbox-group :option-data="filterConditions" @onchange="changeSelectOption" />
                    </Modal>
                </div>
                <div class="example" style="padding: 0 15px;">在职 {{ onJob }} 离职 {{ departure }}</div>
                <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade" data-child="tr"
                       data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <th class="cell-300" scope="col">姓名</th>
                        <th class="cell-300" scope="col">手机</th>
                        <!-- <th class="cell-300" scope="col">工号</th> -->
                        <th class="cell-300" scope="col">状态</th>
                        <th class="cell-300" scope="col">聘用形式</th>
                        <th class="cell-300" scope="col">部门</th>
                        <th class="cell-300" scope="col">入职日期</th>
                        <th class="cell-300" scope="col">操作</th>
                    </tr>
                    <tbody>
                    <tr v-for="(item, index) in staffList" :key="index">
                        <td><router-link :to="{name: 'staffDetail', params: { id: item.id }}">{{item.name}}</router-link></td>
                        <td>{{ item.phone }}</td>
                        <td>{{ staffStatus.find(n => n.value == item.status)?staffStatus.find(n => n.value == item.status).name:'' }}</td>
                        <td>{{ hireShapeArr.find(n => n.value == item.hire_shape)?hireShapeArr.find(n => n.value == item.hire_shape).name:'' }}</td>
                        <td>{{ item.company?item.company:'' }}</td>
                        <td>{{ item.entry_time }}</td>
                        <td>
                            <div class="dropdown show task-dropdown">
                                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                                   data-toggle="dropdown" aria-expanded="false" style="cursor: pointer"></i>
                                <div class="dropdown-menu dropdown-menu-left task-dropdown-item" aria-labelledby="taskDropdown"
                                     role="menu" x-placement="bottom-end" style="min-width: 0;">
                                    <a class="dropdown-item" role="menuitem" @click="changeStaffStatus(item, 2)">转正</a>
                                    <a class="dropdown-item" role="menuitem" @click="showEditPos(item.id)">调岗</a>
                                    <a class="dropdown-item" role="menuitem" @click="changeStaffStatus(item, 3)">离职</a>
                                    <a v-if="(item.hire_shape == 2 || item.hire_shape == 4) && item.status == 3" 
                                        class="dropdown-item" role="menuitem" @click="changeStaffStatus(item, 5)">归档</a>
                                    <!-- 劳务外包 -->
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <pagination :current_page="current_page" :method="getStaffList" :total_pages="total_pages"
                            :total="total"></pagination>
            </div>
            <div class="site-action">
                <router-link to="/staff/add">
                    <button type="button"
                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                        <!-- <i class="back-icon iconfont icon-tianjia animation-scale-up" aria-hidden="true"></i> -->
                    </button>
                </router-link>
            </div>

            <Modal id="move-department" title="调岗" @onOK="moveDepartment">
                <div class="example">
                    <DropDepartment :data="department" @change="selectDepartment"/>
                </div>
            </Modal>
        </div>

        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from "../../assets/js/config";
import fetch from "../../assets/utils/fetch";

export default {
    name: 'Staff',
    data() {
        return {
            total: 0,
            current_page: 1,
            total_pages: 1,
            total: 1,
            staffStatus: config.staffStatus, // 员工状态
            hireShapeArr: config.hireShape, // 聘用形式
            staffPositionStatus: config.staffPositionStatus, // 员工在职状态
            filterConditions: [
                {
                    name: '年龄',
                    id: 'age',
                    value: '0'
                },
                {
                    name: '入职日期',
                    id: 'entryDate',
                    value: '1'
                },
                {
                    name: '身份证号',
                    id: 'IDNum',
                    value: '2'
                },
                {
                    name: '离职日期',
                    id: 'resignationDate',
                    value: '3'
                },
                {
                    name: '视频植入',
                    id: 'video',
                    value: '4'
                }
            ],
            conditionArr: [],
            checkedNames: [],
            staffList: [],
            onJob: 0,
            departure: 0,
            search: '',
            entryTime: '',
            status: '', // 员工状态 1在职， 2离职，全部 '',
            page: 1, // 分页
            // hireShape: config.hireShape[0].value, // 聘用形式
            hireShape: '', // 聘用形式
            positionType: '', // 在职状态
            departmentPId: '',
            departmentId: '',
            useId: '',
        };
    },

    computed: {
        ...mapState([
            'department'
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

    mounted() {
        this.getStaffList()
        this.getDepartment()
        if (this.department.length === 0) {
            this.getDepartment()
        } else {
            this.departmentPId = this.department[0].department_pid;
            this.departmentId = this.department[0].id;
        }
    },

    methods: {
        ...mapActions([
            'getDepartment', // 获取部门数据
        ]),
        // 改变data的值
        changeState (name, value) {
            this[name] = value
            this.getStaffList()
        },

        getStaffList (page = 1) {
            const params = {
                status: this.status,
                position_type: this.positionType,
                hire_shape: this.hireShape,
                page: page,
                search: this.search,
            }
            fetch("get", "/personnel_list", params).then(result => {
                this.staffList = result.data;
                const meta = result.meta
                this.current_page = meta.pagination.current_page || 1;
                this.total_pages = meta.pagination.total_pages || 1;
                this.total = meta.pagination.total || 1;
                this.onJob = meta.date.onjob || 0
                this.departure = meta.date.departure || 0
            });
        },
        // 改变报表筛选条件
        changeSelectOption(newArr) {
            this.checkedNames = newArr;
        },
        // 改变员工状态
        changeStaffStatus (user, status) {
            const params = {
                status: status // 2.转正，3.离职，5.归档
            }
            if (status == 2) {
                if (user.status == 2|| user.status == 3) {
                    toastr.success('当前状态不可转正！')
                    return
                }
            } else if (status == 3) {
                if (user.status == 3) {
                    toastr.success('当前状态不可离职！')
                    return
                }
            }
            fetch('put', `/personnel/${user.id}`, params).then((data) => {
                toastr.success('操作成功');
                this.getStaffList()
            })
        },
        // 展示部门
        showEditPos (id) {
            this.useId = id
            $('#move-department').modal()
        },
        // 选择部门
        selectDepartment (data) {
            this.departmentId = data.id;
        },
        // 移动部门
        moveDepartment () {
            const params = {
                department_id: this.departmentId
            };
            fetch("put", `/personnel/position/${this.useId}`, params).then( res => {
                toastr.success("调岗成功");
                $("#move-department").modal("hide");
                this.getDepartment();
                this.getStaffList()
            });
        }
    }
};
</script>

<style lang="css" scoped>
@import '../../assets/css/staff.scss';
.table td, .table th {
    vertical-align: middle;
}
.page {
    margin-left: 0px!important;
}
</style>

