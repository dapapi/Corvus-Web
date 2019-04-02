<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">项目管理</h1>
            <div class="page-header-actions">
                <ImportAndExport class="float-left" :type="'export'" :moduleName="'projects'" :power="'project'" :params="exportParams">
                    <i class="iconfont icon-daochu px-5 font-size-20 pr-20 pointer-content" aria-hidden="true" title="导出项目管理"></i>
                </ImportAndExport>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目名称"
                               v-model="projectKeyword"
                               @blur="filterGo">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors @change="(value) => getProjectSearch('project_type', value)" placeholder="请选择项目类型"
                                   :options="projectTypeArr"></selectors>
                    </div>
                    <div class="col-md-3 example float-left" v-if="allUsers.length > 0">
                        <selectors @change="(value) => getProjectSearch('principal_ids', value)" placeholder="请选择项目负责人"
                                   :options="allUsers" multiple="true"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                                data-toggle="modal" data-target="#customizeContent" @click='getField'
                                data-placement="right" title="">
                            自定义筛选
                        </button>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getMyProjects()">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">所有项目</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyProjects('my_principal')">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyProjects('my_participant')">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我参与的</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white pb-0">
                    <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr" data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">项目名称</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">目标艺人</th>
                                <th class="cell-300" scope="col">预计订单收入</th>
                                <th class="cell-300" scope="col">跟进时间</th>
                            </tr>
                            <tbody>
                            <tr v-for="project in projectsInfo" @click="redirectDetail(project.id)" :key='project.id'>
                                <td class="pointer-content">
                                    {{ project.title }}
                                </td>
                                <td>
                                    <template v-if="project.principal">
                                        {{ project.principal.data.name }}
                                    </template>
                                </td>
                                <td>
                                    <template v-if="project.trail && project.trail.data.expectations">
                                        <template v-for="expectation in project.trail.data.expectations.data">
                                            <template v-if="expectation.name">
                                                {{ expectation.name }}
                                            </template>
                                            <template v-else>
                                                {{ expectation.nickname }}
                                            </template>
                                        </template>
                                    </template>
                                </td>
                                <td>
                                    <template v-if="project.trail">
                                        <template v-if="project.trail.data.fee === 'privacy'">
                                            **
                                        </template>
                                        <template v-else>
                                            {{ project.trail.data.fee ? project.trail.data.fee : 0 }}
                                        </template>
                                        元
                                    </template>
                                </td>
                                <td>{{ common.timeProcessing(project.last_follow_up_at) }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div style="margin: 6rem auto;width: 100px" v-if="projectsInfo.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <pagination :current_page="current_page" :method="getFilterProjects" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>


            </div>

        </div>

        <customize-filter v-if="canShow" :data="customizeInfo" @change="customize" :stararr='starsArr' :cleanup="cleanUp"
                          @cleanupdone='cleanUp=false' ref='customize' :nodepartment='true'></customize-filter>

        <AddClientType v-if="canShow" type="project" @change="changeProjectType"></AddClientType>

        <BuildProject v-if="canShow" :project-fields-arr="projectFieldsArr" :project-type="projectType"></BuildProject>
    </div>

</template>

<script>
import fetch from '../../assets/utils/fetch.js';
import config from '../../assets/js/config';
import common from '../../assets/js/common';
import { mapState } from 'vuex';
import Cookies from 'js-cookie';
import ImportAndExport from '../../components/ImportAndExport.vue';

const projectStatusArr = [{ name: '全部', value: '' }, ...config.projectStatusArr];
const projectTypeArr = [{ name: '全部', value: '' }, ...config.projectTypeArr];

export default {

  data () {
            return {
                common: common,
                total: 0,
                current_page: 1,
                total_pages: 1,
                companyArr: [],
                starsArr: [],
                projectName: '',
                projectTypeArr: projectTypeArr,
                projectFieldsArr: [],
                projectType: '',
                projectFields: '',
                projectsInfo: '',
                customizeInfo: {},
                addInfoArr: {},
                levelArr: config.levelArr,
                trailsAllInfo: '',
                trailOriginContent: '',
                projectKeyword: '',
                projectStatusArr: projectStatusArr,
                allUsers: [],
                principal_ids: [],
                keyword: '',
                status: '',
                isLoading: true,
                projectSearchType: '',
                getProjectStatus: 'my_principal',
                cleanUp: false,
                exportParams: {},//导出参数
                fetchData: {},
                customizeCondition: {},
                canShow:false,
            }
        },

  mounted() {
    // this.getClients();
    // this.getStars();
    // this.getFilterProjects();
    this.getMyProjects('my_principal');
    // this.getField();
    if (this.userList.length > 0) {
      for (let i = 0; i < this.userList.length; i++) {
        this.allUsers.push({
          name: this.userList[i].name,
          value: this.userList[i].id,
        });
      }
    }
  },

  computed: {
    ...mapState([
      'userList',
    ]),
    _userList() {
      return this.userList;
    },
  },
  components: {
    ImportAndExport,
  },
  watch: {
    _userList() {
      for (let i = 0; i < this.userList.length; i++) {
        this.allUsers.push({
          name: this.userList[i].name,
          value: this.userList[i].id,
        });
      }
    },
  },

  methods: {
    getField() {
      const _this = this;
      fetch('get', '/projects/filter_fields').then((params) => {
        _this.customizeInfo = params.data;
        _this.$refs.customize.refresh()
        this.$nextTick((params) => {
            $('.selectpicker').selectpicker('refresh')
            
        })
      });
    },
    getMyProjects (value) {
                this.getProjectStatus = value;
                this.fetchHandler('post','/projects/filter','filter')
                // this.getFilterProjects();
    },
    filterGo:function(){
        this.fetchData.keyword = this.projectKeyword
        this.fetchHandler('post','/projects/filter','filter')
    },
    getProjectSearch: function (type, value) {
        if (type === 'principal_ids') {
            this.principal_ids = value.join(',');
        } else if (type === 'project_type') {
            this.projectSearchType = value
        }
        // this.getFilterProjects();
        this.fetchHandler('post','/projects/filter','filter')
    },

    getFilterProjects (pageNum = 1) {
                let data = {
                    page: pageNum,
                    include: 'principal,trail.expectations'
                };
                if (this.getProjectStatus) {
                    data.my = this.getProjectStatus;
                }
                if (this.projectSearchType) {
                    if (this.projectSearchType == 3) {
                        this.projectSearchType = '3,4'
                    }
                    data.project_type = this.projectSearchType
                }
                if (this.projectKeyword) {
                    data.keyword = this.projectKeyword
                }
                if (this.principal_ids.length > 0) {
                    data.principal_ids = this.principal_ids;
                }
                //导出参数
                this.exportParams = data;
                fetch('get', '/projects', data).then(response => {
                    this.projectsInfo = response.data;
                    this.total = response.meta.pagination.total;
                    this.current_page = response.meta.pagination.current_page;
                    this.total_pages = response.meta.pagination.total_pages;
                    this.isLoading = false;
                })
            },

    getClients () {
                let _this = this;
                // fetch('get', '/clients/all').then(function (response) {
                //     _this.canShow = true
                //     for (let i = 0; i < response.data.length; i++) {
                //         _this.companyArr.push({
                //             name: response.data[i].company,
                //             id: response.data[i].id,
                //             grade: response.data[i].grade
                //         })
                //     }

                // })
            },

    redirectDetail (projectId) {
                this.$router.push({path: '/projects/' + projectId})
            },
            fetchHandler(methods, url, type) {
                let _this = this,
                    fetchData = this.fetchData,
                    newUrl
                this.fetchData.include = '&include=principal,trail.expectations'
                this.fetchData.page = 'page=1'
                if (type == 'filter') {
                    fetchData = this.customizeCondition
                    let keyword, type, principal_ids,my
                    if (this.fetchData.keyword) {
                        keyword = '&keyword=' + this.projectKeyword
                    } else {
                        keyword = ''
                    }
                    if (this.principal_ids.length > 0) {
                        this.customizeCondition.principal_ids = this.principal_ids
                    }
                    if (this.projectSearchType) {
                        type = '&project_type=' + this.projectSearchType
                    } else {
                        type = ''
                    }
                    if (this.getProjectStatus) {
                        my = '&my=' + this.getProjectStatus;
                    }else{
                        my = ''
                    }
                    newUrl = url + '?' + this.fetchData.page  + this.fetchData.include + keyword + type + my
                }
                this.exportParams = {
                    keyword: this.fetchData.keyword,
                    type: this.projectSearchTypes,
                    principal_ids: this.principal_ids,
                    my:this.getProjectStatus
                }
                fetch(methods, newUrl || url, fetchData).then((response) => {
                    _this.canShow = true
                    _this.projectsInfo = response.data
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.cleanUp = true
                    _this.isLoading = false;
                })
            },
            customize: function (value) {
                this.customizeCondition = value
                this.fetchHandler('post','/projects/filter','filter')
            },

    changeProjectType (value) {
                if(this.$store.state.listPower.project.add !=='true'){
                    toastr.error('当前用户没有权限新增项目')
                    return
                }
                let organization_id = JSON.parse(Cookies.get('user')).organization_id
                if (value == 3) {
                    if (organization_id == 411) {
                        value = 3
                    } else if (organization_id == 412) {
                        value = 4
                    }
                }
                this.projectType = value;

                this.selectProjectType();
                $('#addProject').modal('show');
            },

    selectProjectType () {
                this.projectFieldsArr = [];
                if (this.projectType == 5) {
                    return
                }
                let _this = this;
                fetch('get', '/project_fields', {
                    type: _this.projectType,
                    status: 1,
                }).then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].field_type === 2 || response.data[i].field_type === 6) {
                            response.data[i].contentArr = [];
                            for (let j = 0; j < response.data[i].content.length; j++) {
                                response.data[i].contentArr.push({
                                    value: response.data[i].content[j],
                                    name: response.data[i].content[j]
                                })
                            }
                        }
                    }
                    _this.projectFieldsArr = response.data

                });
            },

            addInfo (value, name) {
                this.addInfoArr[name] = value
            },
            getStars () {
                // if (this.starsArr.length > 0) {
                //     return
                // }
                // fetch('get', '/starandblogger', {sign_contract_status: 2}).then(response => {
                //     for (let i = 0; i < response.data.length; i++) {
                //         this.starsArr.push({
                //             name: response.data[i].name,
                //             value: response.data[i].flag + ',' + response.data[i].id,
                //         })
                //     }
                // })
            },  

  },
};
</script>

<style lang="scss" scoped>
    /deep/ .addMember {
        .addMember-trigger-dropdown {
            top: -400px !important;
        }
    }

    table tbody tr {
        cursor: pointer;
    }
</style>
