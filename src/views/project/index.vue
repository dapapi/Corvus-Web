<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">项目管理</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目昵称"
                               v-model="projectKeyword"
                               @blur="getFilterProjects(1)" style="width: 220px">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors @change="(value) => getFilterProjects(1, 'status', value)"
                                   :options="projectStatusArr"
                                   :placeholder="'请选择项目状态'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left" v-if="allUsers.length > 0">
                        <selectors @change="(value) => getFilterProjects(1, 'principal', value)"
                                   :options="allUsers" multiple="true"
                                   :placeholder="'请选择项目负责人'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                                data-toggle="modal" data-target="#customizeContent"
                                data-placement="right" title="">
                            自定义筛选
                        </button>
                    </div>
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
                                            {{ expectation.name }}
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
                        <pagination :current_page="current_page" :method="paginationType" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>


            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#selectProjectType">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="selectProjectType" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增项目</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">项目类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="projectTypeArr" @change="changeProjectType"
                                           :placeholder="'请选择项目类型'"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="selectProjectType" data-toggle="modal"
                                data-target="#addProject">确定
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="addProject" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增项目</h4>
                    </div>
                    <div class="modal-body">
                        <!-- todo 默认带出的东西 添加的对象里没有 -->
                        <div class="col-md-12 example clearfix" v-show="projectType != 5 && trailsArr.length > 0">
                            <div class="col-md-2 text-right float-left pl-0">销售线索</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="trailsArr" @change="addProjectTrail" ref="trails"
                                           placeholder="请选择销售线索" multiple="true"></Selectors>
                            </div>
                        </div>
                        <!--<div class="col-md-12 example clearfix" v-if="projectType != 5">-->
                        <!--<div class="col-md-2 text-right float-left pl-0">项目来源</div>-->
                        <!--<div class="col-md-10 float-left">-->
                        <!--<div class="float-left" v-if="trailOriginArr.length > 0">-->
                        <!--<Selectors :options="trailOriginArr" @change="changeTrailOriginType"></Selectors>-->
                        <!--</div>-->
                        <!--<template v-if="trailOrigin === '1' || trailOrigin === '2' || trailOrigin === '3'">-->
                        <!--<div class="col-md-5 float-left pr-0">-->
                        <!--<input type="text" class="form-control" title="" v-model="email">-->
                        <!--</div>-->
                        <!--</template>-->
                        <!--<template v-else-if="trailOrigin === '4' || trailOrigin === '5'">-->
                        <!--<div class="col-md-5 float-left pr-0">-->
                        <!--<InputSelectors></InputSelectors>-->
                        <!--</div>-->
                        <!--</template>-->
                        <!--</div>-->
                        <!--</div>-->
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">项目名称</div>
                            <div class="col-md-10 float-left">
                                <EmitInput @change="(value) => addProjectBaseInfo(value, 'title')"
                                           ref="projectNameRef"></EmitInput>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">项目负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors
                                        @change="(value) => addProjectBaseInfo(value, 'principal_id')"></InputSelectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix" v-show="projectType != 5 && starsArr.length > 0">
                            <div class="col-md-2 text-right float-left pl-0">目标艺人</div>
                            <div class="col-md-10 float-left">
                                <Selectors multiple="true" :options="starsArr" ref="intentionArtist"
                                           placeholder="请选择目标艺人"
                                           @change="(value) => addProjectBaseInfo(value, 'expectations')"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">优先级</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="levelArr" ref="priorityLevel" placeholder="请选择优先级"
                                           @change="(value) => addProjectBaseInfo(value, 'priority')"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix" v-show="projectType == 5">
                            <div class="col-md-2 text-right float-left pl-0">可见范围</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="visibleRangeArr" placeholder="请选择可见范围" ref="visibleRange"
                                           @change="(value) => addProjectBaseInfo(value, 'privacy')"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">开始时间</div>
                            <div class="col-md-10 float-left">
                                <Datepicker @change="(value) => addProjectBaseInfo(value, 'start_at')"
                                            ref="startTime"></Datepicker>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">截止时间</div>
                            <div class="col-md-10 float-left">
                                <Datepicker @change="(value) => addProjectBaseInfo(value, 'end_at')"
                                            ref="endTime" :startDate="startTime"></Datepicker>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix" v-for="field in projectFieldsArr">
                            <div class="col-md-2 text-right float-left pl-0">{{ field.key }}</div>
                            <div class="col-md-10 float-left">
                                <template v-if="field.field_type === 1">
                                    <EmitInput @change="(value) => addInfo(value, field.id )"></EmitInput>
                                </template>
                                <template v-else-if="field.field_type === 2">
                                    <Selectors :options="field.contentArr" :placeholder="'请选择' + field.key"
                                               @change="(value) => addInfo(value, field.id )"></Selectors>
                                </template>
                                <template v-else-if="field.field_type === 3">
                                    <EditableSearchBox :options="starsArr" :multiple="true"
                                                       @change="(value) => addInfo(value, field.id )"></EditableSearchBox>
                                </template>
                                <template v-else-if="field.field_type === 4">
                                    <Datepicker @change="(value) => addInfo(value, field.id )"></Datepicker>
                                </template>
                                <template v-else-if="field.field_type === 5">
                                    <NormalTextarea title="" class="form-control"
                                                    @change="(value) => addInfo(value, field.id )"></NormalTextarea>
                                </template>
                                <template v-else-if="field.field_type === 6">
                                    <Selectors :options="field.contentArr" :multiple="true"
                                               :placeholder="'请选择' + field.key"
                                               @change="(value) => addInfo(value.join('|'), field.id )"></Selectors>
                                </template>
                                <template v-else-if="field.field_type === 8">
                                    <GroupDatepicker
                                            @change="(from, to) => addInfo(from + '|' + to, field.id )"></GroupDatepicker>
                                </template>
                                <template v-else-if="field.field_type === 10">
                                    <InputSelectors @change="(value) => addInfo(value, field.id )"></InputSelectors>
                                </template>
                                <template v-else-if="field.field_type === 11">
                                    <NumberSpinner @change="(value) => addInfo(value, field.id )"></NumberSpinner>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">备注</div>
                            <div class="col-md-10 float-left">
                                <emit-input @change="(value) => addProjectBaseInfo(value, 'desc')"
                                            ref="desc"></emit-input>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addProject">确定</button>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

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
                visibleRangeArr: config.visibleRangeArr,
                trailOriginArr: config.trailOrigin,
                trailsArr: [],
                projectBaseInfo: {},
                trailsAllInfo: '',
                trailOrigin: '',
                email: '',
                projectKeyword: '',
                paginationType: '',
                projectStatusArr: config.projectStatusArr,
                allUsers: [],
                startTime: '',

            }
        },

        mounted() {
            this.getClients();
            this.getStars();
            this.getProjects();
            this.getTrail();
            this.getAllMembers();
            let _this = this;
            $('#addProject').on('hidden.bs.modal', function () {
                _this.refreshAddProjectModal()
            })
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
                let _this = this;
                fetch('get', url, data).then(function (response) {
                    _this.projectsInfo = response.data

                })
            },

            getFilterProjects: function (pageNum = 1, type, value) {
                let data = {
                    page: pageNum,
                    include: 'principal,trail.expectations'
                };
                if (this.projectKeyword) {
                    data.keyword = this.projectKeyword
                }
                if (type === 'status') {
                    data.status = value
                }
                if (type === 'principal' && value) {
                    data.principal_ids = value.join(',')
                }
                let _this = this;
                this.paginationType = 'getFilterProjects';
                fetch('get', '/projects/filter', data).then(function (response) {
                    _this.projectsInfo = response.data
                })
            },

            getAllMembers: function () {
                let _this = this;
                fetch('get', '/users').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.allUsers.push({
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
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

            getStars: function () {
                let _this = this;
                fetch('get', '/stars/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.starsArr.push({
                            name: response.data[i].name,
                            id: response.data[i].id,
                            value: response.data[i].id
                        })
                    }

                })
            },

            refreshAddProjectModal: function () {
                this.$refs.projectNameRef.refresh();
                this.$refs.priorityLevel.setValue('');
                this.$refs.visibleRange.setValue('');
                this.$refs.intentionArtist.setValue('');
                this.$refs.startTime.setValue('');
                this.$refs.endTime.setValue('');
                this.$refs.desc.refresh();
                this.$store.dispatch('changePrincipal', {data: {}});
            },

            redirectDetail: function (projectId) {
                this.$router.push({path: '/projects/' + projectId})
            },

            customize: function (value) {
                console.log(value)
            },

            addProject: function () {
                this.projectBaseInfo.fields = this.addInfoArr;
                this.projectBaseInfo.type = this.projectType;
                let _this = this;
                fetch('post', '/projects', this.projectBaseInfo).then(function (response) {
                    $('#addProject').modal('hide');
                    $('#selectProjectType').modal('hide');
                    _this.$router.push({path: 'projects/' + response.data.id});
                })
            },

            changeProjectType: function (value) {
                this.projectType = value;
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

            getTrail: function () {
                let _this = this;
                fetch('get', '/trails/all', {include: 'principal,expectations'}).then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.trailsArr.push({
                            name: response.data[i].title,
                            id: response.data[i].id,
                            value: response.data[i].id
                        })
                    }
                    _this.trailsAllInfo = response.data;
                })
            },


            addInfo: function (value, name) {
                this.addInfoArr[name] = value
            },

            addProjectTrail: function (value) {
                this.projectBaseInfo.trail = {
                    id: value
                };
                let trailInfo = this.trailsAllInfo.find(item => item.id == value);
                this.$store.dispatch('changePrincipal', {
                    data: trailInfo.principal.data
                });
                this.projectBaseInfo.principal_id = trailInfo.principal.data.id;
                let artistsArr = [];
                for (let i = 0; i < trailInfo.expectations.data.length; i++) {
                    artistsArr.push(trailInfo.expectations.data[i].id)
                }
                this.$refs.intentionArtist.setValue(artistsArr);
                this.projectBaseInfo.expectations = artistsArr;
                this.$refs.priorityLevel.setValue(trailInfo.priority);
                this.projectBaseInfo.priority = trailInfo.priority;
            },

            addProjectBaseInfo: function (value, name) {
                if (name === 'principal_id') {
                    value = this.$store.state.newPrincipalInfo.id;
                }
                if (name === 'start_at') {
                    this.startTime = value
                }
                this.projectBaseInfo[name] = value
            },

            changeTrailOriginType: function (value) {
                this.trailOrigin = value
            }

        }
    }
</script>
