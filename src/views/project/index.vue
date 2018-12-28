<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">项目管理</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目昵称"
                               v-model="projectKeyword"
                               @blur="getFilterProjects(1)">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors @change="(value) => getFilterProjects(1, 'status', value)" placeholder="请选择项目状态"
                                   :options="projectStatusArr"></selectors>
                    </div>
                    <div class="col-md-3 example float-left" v-if="allUsers.length > 0">
                        <selectors @change="(value) => getFilterProjects(1, 'principal', value)" placeholder="请选择项目负责人"
                                   :options="allUsers" multiple="true"></selectors>
                    </div>
                    <!--<div class="col-md-3 example float-left">-->
                        <!--<button type="button" class="btn btn-default waves-effect waves-classic float-right"-->
                                <!--data-toggle="modal" data-target="#customizeContent"-->
                                <!--data-placement="right" title="">-->
                            <!--自定义筛选-->
                        <!--</button>-->
                    <!--</div>-->
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getProjects(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">所有项目</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjects(1, 2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjects(1, 3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我参与的</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr" data-selectable="selectable" v-if="projectsInfo.length > 0">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">项目名称</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">目标艺人</th>
                                <th class="cell-300" scope="col">优先级</th>
                                <th class="cell-300" scope="col">跟进时间</th>
                            </tr>
                            <tbody>
                            <tr v-for="project in projectsInfo ">
                                <td class="pointer-content" @click="redirectDetail(project.id)">
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
                                    <template v-if="project.priority">
                                        {{ levelArr.find(item => item.value == project.priority).name}}
                                    </template>
                                </td>
                                <td>{{ project.last_follow_up_at }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="col-md-1" style="margin: 6rem auto" v-if="projectsInfo.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>


            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <AddClientType type="project" @change="changeProjectType"></AddClientType>

        <BuildProject :project-fields-arr="projectFieldsArr" :project-type="projectType"></BuildProject>
    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    import {mapState} from 'vuex'

    const projectStatusArr = [{name: '全部', value: ''}, ...config.projectStatusArr];

    export default {

        data: function () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                companyArr: [],
                starsArr: [],
                projectName: '',
                projectTypeArr: config.projectTypeArr,
                projectFieldsArr: [],
                projectType: '',
                projectFields: '',
                projectsInfo: '',
                customizeInfo: config.customizeInfo,
                addInfoArr: {},
                levelArr: config.levelArr,
                trailsAllInfo: '',
                trailOriginContent: '',
                projectKeyword: '',
                paginationType: '',
                projectStatusArr: projectStatusArr,
                allUsers: [],
                principal_ids: '',
                keyword: '',
                status: '',
                isLoading: true,
            }
        },

        mounted() {
            this.getClients();
            this.getProjects();
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
            getProjects: function (pageNum = 1, type = null) {
                let data = {
                    page: pageNum,
                    include: 'principal,trail.expectations'
                };
                let url = '/projects';
                if (type) {
                    url = '/projects/my';
                    data.type = type;
                }
                this.paginationType = 'getProjects';
                fetch('get', url, data).then(response => {
                    this.projectsInfo = response.data;
                    this.total = response.meta.pagination.total;
                    this.current_page = response.meta.pagination.current_page;
                    this.total_pages = response.meta.pagination.total_pages;
                    this.isLoading = false;
                })
            },

            getFilterProjects: function (pageNum = 1, type, value) {
                let data = {
                    page: pageNum,
                    include: 'principal,trail.expectations'
                };
                if (type === 'status') {
                    this.status = value;
                    if (value) {
                        data.status = value;
                    }
                }
                if (type === 'principal' && value) {
                    this.principal_ids = value.join(',');
                    data.principal_ids = value.join(',');
                }
                if (this.projectKeyword) {
                    data.keyword = this.projectKeyword
                }
                if (this.status) {
                    data.status = this.status;
                }
                if (this.principal_ids) {
                    data.principal_ids = this.principal_ids
                }
                let _this = this;
                this.paginationType = 'getFilterProjects';
                fetch('get', '/projects/filter', data).then(function (response) {
                    _this.projectsInfo = response.data;
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
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
                console.log(value)
            },

            changeProjectType: function (value) {
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
        top: -400px!important;
    }
}
</style>

