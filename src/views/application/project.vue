<template>
   <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的项目</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目名称"
                               v-model="projectKeyword"
                               @blur="getFilterProjects()">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors @change="(value) => getProjectSearch('project_type', value)" placeholder="请选择项目类型"
                                   :options="projectTypeArr"></selectors>
                    </div>
                    <div class="col-md-3 example float-left" v-if="allUsers.length > 0">
                        <selectors @change="(value) => getProjectSearch('principal_ids', value)" placeholder="请选择项目负责人"
                                   :options="allUsers" multiple="true"></selectors>
                    </div>
                    <!-- <div class="col-md-3 example float-left">
                        <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                                data-toggle="modal" data-target="#customizeContent"
                                data-placement="right" title="">
                            自定义筛选
                        </button>
                    </div> -->
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

        <customize-filter :data="customizeInfo" @change="customize" :stararr='starsArr' :cleanup="cleanUp"
                          @cleanupdone='cleanUp=false'></customize-filter>

        <AddClientType type="project" @change="changeProjectType"></AddClientType>

        <BuildProject :project-fields-arr="projectFieldsArr" :project-type="projectType"></BuildProject>
    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    import {mapState} from 'vuex'
    import Cookies from 'js-cookie'
    import common from '../../assets/js/common'

    const projectStatusArr = [{name: '全部', value: ''}, ...config.projectStatusArr];
    const projectTypeArr = [{name: '全部', value: ''}, ...config.projectTypeArr];

    export default {

        data: function () {
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
                getProjectStatus: 'principal_id',
                cleanUp: false,
            }
        },

        mounted() {
            this.getField()
            this.getClients();
            // this.getFilterProjects();
            this.getMyProjects('my_principal')
            if (this.userList.length > 0) {
                for (let i = 0; i < this.userList.length; i++) {
                    this.allUsers.push({
                        name: this.userList[i].name,
                        value: this.userList[i].id
                    })
                }
            }
        },

        computed: {
            ...mapState([
                'userList'
            ]),
            _userList() {
                return this.userList
            }
        },

        watch: {
            _userList() {
                for (let i = 0; i < this.userList.length; i++) {
                    this.allUsers.push({
                        name: this.userList[i].name,
                        value: this.userList[i].id
                    })
                }
            }
        },

        methods: {
            getField() {
                let _this = this
                fetch('get', '/projects/filter_fields').then((params) => {
                    _this.customizeInfo = params.data
                })
            },
            getMyProjects: function (value) {
                this.getProjectStatus = value;
                this.getFilterProjects();
            },

            getProjectSearch: function (type, value) {
                if (type === 'principal_ids') {
                    this.principal_ids = value.join(',');
                } else if (type === 'project_type') {
                    this.projectSearchType = value
                }
                this.getFilterProjects();
            },

            getFilterProjects: function (pageNum = 1) {
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
                    data.type = this.projectSearchType
                }
                if (this.projectKeyword) {
                    data.keyword = this.projectKeyword
                }
                if (this.principal_ids.length > 0) {
                    data.principal_ids = this.principal_ids;
                }
                fetch('get', '/projects', data).then(response => {
                    this.projectsInfo = response.data;
                    this.total = response.meta.pagination.total;
                    this.current_page = response.meta.pagination.current_page;
                    this.total_pages = response.meta.pagination.total_pages;
                    this.isLoading = false;
                })
            },

            getClients: function () {
                let _this = this;
                fetch('get', '/clients/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.companyArr.push({
                            name: response.data[i].company,
                            id: response.data[i].id,
                            grade: response.data[i].grade
                        })
                    }

                })
            },

            redirectDetail: function (projectId) {
                this.$router.push({path: '/projects/' + projectId})
            },

            customize: function (value) {
                let _this = this
                fetch('post', '/projects/filter?include=principal,trail.expectations', value).then((params) => {
                    _this.projectsInfo = params.data
                    _this.total = params.meta.pagination.total;
                    _this.total_pages = params.meta.pagination.total_pages;
                    _this.current_page = params.meta.pagination.current_page
                    _this.cleanUp = true
                })

            },

            changeProjectType: function (value) {
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

            selectProjectType: function () {
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

            addInfo: function (value, name) {
                this.addInfoArr[name] = value
            },

        }
    }
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