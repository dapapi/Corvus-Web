<template>
    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">员工档案</h1>
            <div class="page-header-actions">
                <a href="/staff/history">历史归档</a>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-2 example float-left">
                        <selectors :options="staffStatus" @change="projectChange" :defaultValue="0"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="dateArr" @change="projectChange"></selectors>
                    </div>
                    <div class="col-md-2 example float-left">
                        <selectors :options="stuffType" @change="projectChange"></selectors>
                    </div>
                    <div class="col-md-4 example float-left">
                        <div class="input-search">
                            <button type="submit" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                            </button>
                            <input type="text" class="form-control" name="" placeholder="请搜索姓名/手机号/职位">
                        </div>
                    </div>
                    <div class="col-md-1 example float-left" 
                        style="height: 36px; line-height: 36px; text-align: right;"
                    >
                        <span style="cursor: pointer" data-target="#examplePositionCenter" data-toggle="modal">报表</span>
                        <!-- <button class="btn btn-primary" data-target="#examplePositionCenter"  type="button">Generate</button> -->
                    </div>
                    <Modal 
                        id="examplePositionCenter"
                        title="选择报表字段"
                    >
                        <checkbox-group :option-data="filterConditions" @onchange="changeSelectOption" />
                    </Modal>
                </div>
                <div class="example" style="padding: 0 15px;">在职 23 离职 2</div>
                <table class="table is-indent example" data-plugin="animateList" data-animate="fade" data-child="tr"
                       data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <th class="pre-cell"></th>
                        <th class="cell-300" scope="col">序号</th>
                        <th class="cell-300" scope="col">姓名</th>
                        <th class="cell-300" scope="col">手机</th>
                        <!-- <th class="cell-300" scope="col">工号</th> -->
                        <th class="cell-300" scope="col">状态</th>
                        <th class="cell-300" scope="col">聘用形式</th>
                        <th class="cell-300" scope="col">部门</th>
                        <th class="cell-300" scope="col">入职日期</th>
                        <th class="cell-300" scope="col">操作</th>
                        <th class="suf-cell"></th>
                    </tr>
                    <tr v-for="(item, index) in staffList" :key="index">
                        <td class="pre-cell"></td>
                        <td scope="row">{{index + 1}}</td>
                        <td><router-link to="/staff/detail">{{item.name}}</router-link></td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.hire_shape }}</td>
                        <td>{{ item.department }}</td>
                        <td>{{ item.entry_time }}</td>
                        <td>
                            <div class="dropdown show task-dropdown">
                                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                                data-toggle="dropdown" aria-expanded="false"></i>
                                <div class="dropdown-menu dropdown-menu-left task-dropdown-item" aria-labelledby="taskDropdown"
                                    role="menu" x-placement="bottom-end" style="min-width: 0;">
                                    <a class="dropdown-item" role="menuitem" @click="">转正</a>
                                    <a class="dropdown-item" role="menuitem" @click="">调岗</a>
                                    <a class="dropdown-item" role="menuitem" @click="">离职</a>
                                    <a class="dropdown-item" role="menuitem" @click="">归档</a>
                                </div>
                            </div>
                        </td>
                        <td class="suf-cell"></td>
                    </tr>
                </table>

                <pagination :current_page="currentPage" :method="getStaffList" :total_pages="totalPages"
                            :total="total"></pagination>
            </div>
            <div class="site-action">
                <a href="/staff/add">
                    <button type="button"
                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                        <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                        <!-- <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i> -->
                    </button>
                </a>
            </div>
        </div>

        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>

<script>
// import config from "../asconfig";
import config from "../../assets/js/config";
// import redirect from './bootstrap';
const { staffStatus, dateArr, stuffType } = config;
import fetch from "../../assets/utils/fetch";
import axios from 'axios'

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
            dateArr: dateArr,
            stuffType: stuffType,
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
            staffList: []
        };
    },

  mounted() {
    this.getStaffList();
  },

  methods: {
    getStaffList() {
        const params = {
            status: 1
        }
        fetch("get", "/personnel_list", params).then(result => {
            this.staffList = result.data;
            this.currentPage = result.meta.pagination.current_page || 1;
            this.totalPages = result.meta.pagination.total_pages || 1;
            this.total = result.meta.pagination.total || 1;
        });
    },
    // 改变报表筛选条件
    changeSelectOption(newArr) {
      this.checkedNames = newArr;
    },
    // 下拉框改变事件
    projectChange() {},
    getProjects() {}
  }
};
</script>

<style>
@import '../../assets/css/staff.scss';
</style>
