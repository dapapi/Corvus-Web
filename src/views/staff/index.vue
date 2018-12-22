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
                        <selectors :options="staffStatus" :value="1" changeKey="status" @select="changeState"></selectors>
                    </div>
                    <div class="col-md-2 example float-left">
                        <selectors :options="monthArr" :value="month" changeKey="month" @select="changeState"></selectors>
                    </div>
                    <div class="col-md-2 example float-left">
                        <selectors :options="staffTypeArr" changeKey="staffType" @select="changeState"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <div class="input-search">
                            <button type="button" @click="getStaffList" class="input-search-btn"><i class="md-search" aria-hidden="true"></i>
                            </button>
                            <input type="text" class="form-control" @keyup.enter="getStaffList" v-model="search" placeholder="请搜索姓名/手机号/职位">
                        </div>
                    </div>
                    <div class="col-md-3 example float-left" 
                        style="height: 36px; line-height: 36px; text-align: right; font-size: 14px;"
                    >
                        <span style="cursor: pointer; margin-right: 24px;" data-target="#examplePositionCenter" data-toggle="modal">报表</span>
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
                        <td>{{ workStatus[item.status] }}</td>
                        <td>{{ employment[item.hire_shape] }}</td>
                        <td>{{ item.department }}</td>
                        <td>{{ item.entry_time }}</td>
                        <td>
                            <div class="dropdown show task-dropdown">
                                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                                   data-toggle="dropdown" aria-expanded="false" style="cursor: pointer"></i>
                                <div class="dropdown-menu dropdown-menu-left task-dropdown-item" aria-labelledby="taskDropdown"
                                     role="menu" x-placement="bottom-end" style="min-width: 0;">
                                    <a v-if="item.status !== 2" class="dropdown-item" role="menuitem" @click="changeStaffStatus(item.id, 1)">转正</a>
                                    <a class="dropdown-item" role="menuitem" @click="changeStaffStatus(item.id, 3)">调岗</a>
                                    <a class="dropdown-item" role="menuitem" @click="changeStaffStatus(item.id, 2)">离职</a>
                                    <a class="dropdown-item" role="menuitem" @click="changeStaffStatus(item.id, 6)">归档</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <pagination :current_page="currentPage" :method="getStaffList" :total_pages="totalPages"
                            :total="total"></pagination>
            </div>
            <div class="site-action">
                <router-link to="/staff/add">
                    <button type="button"
                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                        <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                        <!-- <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i> -->
                    </button>
                </router-link>
            </div>
        </div>

        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>

<script>
import config from "../../assets/js/config";
// import redirect from './bootstrap';
const { staffStatus, staffType, employment, workStatus } = config;
import fetch from "../../assets/utils/fetch";

const monthArr = Array.from(new Array(12)).map((n, i) => {
    let obj = {}
    obj.name = (i + 1) + '月'
    obj.value = i + 1
    return obj
})

export default {
    name: 'Staff',
    data() {
        return {
            total: 0,
            current_page: 1,
            total_pages: 1,
            currentPage: 1,
            totalPages: 1,
            total: 1,
            // customizeInfo: config.customizeInfo,
            staffStatus: staffStatus,
            monthArr: monthArr,
            staffTypeArr: staffType,
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
            staffType: staffType[0].value,
            month: new Date().getMonth() + 1, // 1-12月份，
            status: 1, // 1在职， 2离职，全部 '',
            page: 1, // 分页
            employment: employment, // 聘用形式
            workStatus: workStatus, // 当前工作状态
        };
    },

  mounted() {
    this.getStaffList();
  },

  methods: {
    // 改变data的值
    changeState (name, value) {
        this[name] = value
        this.getStaffList()
    },

    getStaffList() {
        const params = {
            // position_type: this.status,
            // status: this.staffType,
            // page: this.page,
            // search: this.search,
            // entry_time: this.month
        }
        fetch("get", "/personnel_list", params).then(result => {
            this.staffList = result.data;
            const meta = result.meta
            this.currentPage = meta.pagination.current_page || 1;
            this.totalPages = meta.pagination.total_pages || 1;
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
    changeStaffStatus (useId, status) {
        const params = {
            status: status // 1.转正，2.离职，3.调岗，6.归档
        }
        fetch('put', `/personnel/${useId}/status`, params).then((data) => {
            toastr.success('操作成功');
            this.getStaffList()
        })
    }
  }
};
</script>

<style>
@import '../../assets/css/staff.scss';
</style>
