<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我审批的</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                        </button>
                        <input v-model="keywords" type="text" class="form-control project-search" placeholder="输入编号、类型或申请人"
                               @blur="getList">
                    </div>
                </div>
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getList(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">待审批</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getList(2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已审批</a>
                        </li>
                    </ul>
                    <div class="page-content tab-content nav-tabs-animate bg-white">
                        <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                            <table class="table table-hover is-indent mb-20"
                                   data-plugin="animateList" data-animate="fade"
                                   data-child="tr"
                                   data-selectable="selectable">
                                <tr>
                                    <th class="cell-300" scope="col">审批编号</th>
                                    <!-- <th class="cell-300" scope="col">合同名称</th> -->
                                    <th class="cell-300" scope="col">申请人</th>
                                    <!-- <th class="cell-300 position-relative" scope="col">类型
                                        <i class="iconfont icon-gengduo1" aria-hidden="true"
                                           id="taskDropdown" data-toggle="dropdown" aria-expanded="false"></i>
                                        <div class="dropdown-menu" aria-labelledby="taskDropdown" role="menu">
                                            <a class="dropdown-item" role="menuitem" v-for="(item, index) in contractList" :key="index">{{item.value}}</a>
                                        </div>
                                    </th> -->
                                     <th class="cell-300 position-relative" scope="col">类型
                                        <!-- <span class="icon md-caret-right font-size-20 mr-10 leftImg anmite"
                                        id="taskDropdown" data-toggle="dropdown" aria-expanded="false"></span> -->
                                        <div class="dropdown-menu" aria-labelledby="taskDropdown" role="menu">
                                            <a class="dropdown-item" role="menuitem" >此处等</a>
                                            <a class="dropdown-item" role="menuitem" >后端</a>
                                            <a class="dropdown-item" role="menuitem" >表单</a>
                                            <a class="dropdown-item" role="menuitem" >数据</a>
                                        </div>
                                    </th>
                                    <th class="cell-300" scope="col">申请时间</th>
                                    <th class="cell-300" scope="col">审批状态</th>
                                </tr>
                                <tbody>
                                <tr v-for="project in projectsInfo" :key=project.id @click="goDetail(project.form_instance_number)" style="cursor: pointer;">
                                    <router-link :to="{path:'/approval/'+project.form_instance_number,query:{mode:'approver'}}"><td>{{project.form_instance_number}}</td></router-link>
                                     <!-- <td>{{project.form_instance_number}}</td>                               -->
                                    <!-- <td>{{project.title}}</td> -->
                                    <td>{{project.name}}</td>
                                    <td>{{project.group_name}}</td>
                                    <td>{{common.timeProcessing(project.created_at)}}</td>
                                    <td>{{getProgressName(project.form_status)}}</td>
                                </tr>
                                </tbody>
                            </table>

                            <div v-if="projectsInfo.length === 0" style="margin: 6rem auto;width: 100px">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                            <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PROJECT_CONFIG } from '@/views/approval/project/projectConfig.js';
import fetch from '@/assets/utils/fetch.js';
import common from '@/assets/js/common';

export default {
  name: 'my',
  data() {
    return {
      common,
      total: 1,
      current_page: 1,
      total_pages: 1,
      keywords: '',
      projectsInfo: [],
      projectProgress: PROJECT_CONFIG.approvalProgress,
      pageType: 1,
      status: 1,
    };
  },
  mounted() {
    this.getList(1);
  },
  computed: {

    getProgressName() {
      return function (params) {
        return this.projectProgress.find(item => item.id == params).value;
      };
    },
  },
  methods: {
    goDetail(num) {
      console.log(num);
      this.$router.push({
        path: `/approval/${num}`,
        query: { mode: 'approver' },
      });
    },
    getProjects(pageNum = 1, signStatus) {
      const _this = this;
      const data = {
        page: pageNum,
        include: 'principal,trail.expectations',
        status: this.pageType,
      };
      if (signStatus) {
        data.sign_contract_status = signStatus;
      }
      fetch('get', '/approvals_general/approval', data).then((response) => {
        _this.projectsInfo = response.data;
        _this.total = Number(response.meta.pagination.total);
        _this.current_page = Number(response.meta.pagination.current_page);
        _this.total_pages = Number(response.meta.pagination.total_pages);
      });
    },
    getList(params) {
      const _this = this;
      let currentStatus = params;
      if (isNaN(params)) {
        currentStatus = this.status;
      } else {
        this.status = currentStatus;
      }
      this.pageType = currentStatus;
      fetch('get', `/approvals_general/approval?status=${currentStatus}&keywords=${this.keywords}`).then((params) => {
        _this.projectsInfo = params.data;
        _this.total = Number(params.meta.pagination.total);
        _this.current_page = Number(params.meta.pagination.current_page);
        _this.total_pages = Number(params.meta.pagination.total_pages);
      });
    },
  },
};
</script>

<style >
    .project-search::-webkit-input-placeholder{
        font-weight: 200;
    }
</style>
