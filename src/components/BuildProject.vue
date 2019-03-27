<template>
    <div class="modal fade" id="addProject" aria-hidden="true" aria-labelledby="addLabelForm"
         role="dialog" tabindex="-1" data-backdrop="static">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="iconfont icon-guanbi" aria-hidden="true" @click='refreshAddProjectModal'></i>
                    </button>
                    <h4 class="modal-title">新增项目</h4>
                </div>
                <div class="modal-body">
                    <div class="col-md-12 example clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0 require">销售线索</div>
                        <div class="col-md-10 float-left">
                            <Selectors :options="trailsArr" @change="addProjectTrail" ref="trails"
                                       selectable="true"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 my-20 clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0 require">项目来源</div>
                        <div class="col-md-10 float-left">
                            <div class="col-md-6 float-left pl-0">
                                <Selectors :options="trailOriginArr"
                                           @change="(value) => addProjectBaseInfo(value, 'resource_type')"
                                           ref="trailOrigin"></Selectors>
                            </div>
                            <div class="col-md-6 float-left pr-0">
                                <template v-if="trailOrigin == 1 || trailOrigin == 2 || trailOrigin == 3">
                                    <input type="text" class="form-control" title="" v-model="trailOriginContent">
                                </template>
                                <template v-else-if="trailOrigin == 4 || trailOrigin == 5">
                                    <InputSelectors type="selector"></InputSelectors>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left require px-0">项目名称</div>
                        <div class="col-md-10 float-left">
                            <EmitInput @change="(value) => addProjectBaseInfo(value, 'title')"
                                       ref="projectNameRef"></EmitInput>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0 require">项目负责人</div>
                        <div class="col-md-10 float-left">
                            <InputSelectors
                                    @change="(value) => addProjectBaseInfo(value, 'principal_id')"></InputSelectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0 require">目标艺人</div>
                        <div class="col-md-10 float-left">
                            <Selectors multiple="true" :options="starsArr" ref="intentionArtist"
                                       @change="(value) => addProjectBaseInfo(value, 'expectations')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0 require">优先级</div>
                        <div class="col-md-10 float-left">
                            <Selectors :options="levelArr" ref="priorityLevel"
                                       @change="(value) => addProjectBaseInfo(value, 'priority')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType == 5">
                        <div class="col-md-2 text-right float-left px-0 require">可见范围</div>
                        <div class="col-md-10 float-left">
                            <Selectors :options="visibleRangeArr" ref="visibleRange"
                                       @change="(value) => addProjectBaseInfo(value, 'privacy')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0 require">开始时间</div>
                        <div class="col-md-10 float-left">
                            <Datepicker @change="(value) => addProjectBaseInfo(value, 'start_at')"
                                        ref="startTime"></Datepicker>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0 require">截止时间</div>
                        <div class="col-md-10 float-left">
                            <Datepicker @change="(value) => addProjectBaseInfo(value, 'end_at')"
                                        ref="endTime" :startDate="startTime"></Datepicker>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0 require">预计支出</div>
                        <div class="col-md-10 float-left">
                            <NumberSpinner ref="projectExpenditureFee"
                                           @change="(value) => addProjectBaseInfo(value, 'projected_expenditure')"
                                           :min="0" :max="1000000000" :precision="2" :value="0"></NumberSpinner>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0 require">预计订单收入</div>
                        <div class="col-md-10 float-left">
                            <NumberSpinner ref="projectFee"
                                           @change="(value) => addProjectBaseInfo(value, 'fee')" :min="0"
                                           :max="1000000000" :precision="2" :value="0"></NumberSpinner>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType == 3">
                        <div class="col-md-2 text-right float-left px-0 require">合作类型</div>
                        <div class="col-md-10 float-left">
                            <Selectors ref="projectCooperation" :options="cooperationTypeArr"
                                       @change="(value) => addProjectBaseInfo(value, 'cooperation_type')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType == 3">
                        <div class="col-md-2 text-right float-left px-0 require">状态</div>
                        <div class="col-md-10 float-left">
                            <Selectors ref="projectTrailStatus" :options="trailStatusArr"
                                       @change="(value) => addProjectBaseInfo(value, 'status')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-for="field in projectFields" :key='field.key'>
                        <div class="col-md-2 text-right float-left px-0 require">{{ field.key }}</div>
                        <div class="col-md-10 float-left">
                            <template v-if="field.field_type === 1">
                                <EmitInput :default='newArray.find(item=>item.key === field.key)'
                                           @change="(value) => addInfo(value, field.id )"></EmitInput>
                            </template>
                            <template v-if="field.field_type === 2">
                                <Selectors :default='newArray.find(item=>item.key === field.key)'
                                           :options="field.contentArr"
                                           @change="(value) => addInfo(value, field.id )"></Selectors>
                            </template>
                            <template v-if="field.field_type === 4">
                                <Datepicker :default='newArray.find(item=>item.key === field.key)'
                                            @change="(value) => addInfo(value, field.id )"></Datepicker>
                            </template>
                            <template v-if="field.field_type === 5">
                                <NormalTextarea :default='newArray.find(item=>item.key == field.key)' title=""
                                                class="form-control"
                                                @change="(value) => addInfo(value, field.id )"></NormalTextarea>
                            </template>
                            <template v-if="field.field_type === 6">
                                <Selectors :default='newArray.find(item=>item.key === field.key)'
                                           :options="field.contentArr" :multiple="true"
                                           @change="(value) => addInfo(value.join('|'), field.id )"></Selectors>
                            </template>
                            <template v-if="field.field_type === 8">
                                <GroupDatepicker
                                        :default='newArray.find(item=>item.key === field.key)'
                                        @change="(from, to) => addInfo(from + ' | ' + to, field.id )"></GroupDatepicker>
                            </template>
                            <template v-if="field.field_type === 10">
                                <InputSelectors :default='newArray.find(item=>item.key === field.key)'
                                                @change="(value) => addInfo(value, field.id )"></InputSelectors>
                            </template>
                            <template v-if="field.field_type === 11">
                                <NumberSpinner :default='newArray.find(item=>item.key === field.key)'
                                               @change="(value) => addInfo(value, field.id )" :min="0" :max="1000000000"
                                               :precision="2" :value="0"></NumberSpinner>
                            </template>
                            <template v-if="field.field_type === 12">
                                <ApprovalCheckBoxGroup :optionData="platformLists" select-all='false'
                                                       @change="(value) => addInfo(value, field.id )" :isLine="true">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.name}}</span>
                                    </template>
                                </ApprovalCheckBoxGroup>
                            </template>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0">备注</div>
                        <div class="col-md-10 float-left">
                            <emit-input @change="(value) => addProjectBaseInfo(value, 'desc')"
                                        ref="desc"></emit-input>
                        </div>
                    </div>
                </div>
                <div class="col-md-12" v-if="projectType != 5">
                    <ApprovalProgress :formid='projectType'/>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click='refreshAddProjectModal'>
                        取消
                    </button>
                    <button class="btn btn-primary" type="submit" @click="addProject" :disabled="submitDisable">确定
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import config from '../assets/js/config.js';
    import fetch from '../assets/utils/fetch.js';
    import ApprovalProgress from '@/components/ForApproval/ApprovalProgress';
    import Cookies from 'js-cookie';
    import {mapState} from 'vuex';
    import ApprovalCheckBoxGroup from '@/components/ForApproval/ApprovalCheckBoxGroup';

    export default {
        components: {
            ApprovalProgress, ApprovalCheckBoxGroup,
        },
        name: 'BuildProject',
        // projectType 项目类型   projectFieldsArr 不同项目类型的数据
        props: ['projectType', 'projectFieldsArr', 'defaultData', 'mode'],
        data() {
            return {
                visibleRangeArr: config.visibleRangeArr,
                levelArr: config.levelArr,
                trailsArr: [],
                trailOrigin: '',
                // trailOriginArr: config.trailOrigin,
                trailStatusArr: config.trailStatusArr,
                cooperationTypeArr: config.cooperationTypeArr,
                starsArr: [],
                bloggerArr: [],
                startTime: '',
                trailOriginContent: '',
                trailsAllInfo: [],
                addInfoArr: {},
                projectBaseInfo: {
                    trail: {},
                    notice: [],
                },
                projectFields: [],
                approver: [],
                newArray: [],
                user: '',
                cooperationDefault: '',
                trailStatusDefault: '',
                submitDisable: false,
                platformLists: [
                    {
                        value: '全平台',
                        name: '全平台',
                    },
                    {
                        value: '抖音',
                        name: '抖音',
                    },
                    {
                        value: '小红书',
                        name: '小红书',
                    },
                    {
                        value: 'B站',
                        name: 'B站',
                    },
                ],
            };
        },
        created() {
            this.getStars();
        },
        mounted() {
            this.user = JSON.parse(Cookies.get('user'));
        },
        watch: {
            projectFieldsArr(newValue) {
                return this.projectFields = newValue;
            },
            projectType() {
                this.getTrail();
                this.defaultDataFilter();
            },
        },
        computed: {
            ...mapState([
                'userList',
            ]),
            trailOriginArr() {
                const organization_id = JSON.parse(Cookies.get('user')).organization_id;
                if (organization_id == 412) {
                    return config.trailBloggerOrigin;
                }
                return config.trailOrigin;
            },
        },
        methods: {
            defaultDataFilter() {
                if (!this.defaultData) {
                    return;
                }
                this.newArray = this.defaultData.fields.filter(params => params.hasOwnProperty('values'));
            },
            refreshAddProjectModal() {
                if (!this.$refs.trails) {
                    return;
                }
                this.$refs.trails.setValue('');
                this.$refs.projectNameRef.refresh();
                this.$refs.priorityLevel.setValue('');
                this.$refs.visibleRange.setValue('');
                this.$refs.intentionArtist.setValue('');
                this.$refs.startTime.setValue('');
                this.$refs.endTime.setValue('');
                this.$refs.desc.refresh();
                this.$refs.projectFee.setValue('');
                this.$refs.trailOrigin.setValue('');
                this.trailOriginContent = '';
                this.trailOrigin = '';
                this.projectBaseInfo = {trail: {}, notice: []};
                this.$store.dispatch('changePrincipal', {data: {}});
                this.$store.dispatch('changePrincipal', {type: 'selector', data: {}});
                this.$store.dispatch('changeParticipantsInfo', {data: []});
                this.projectFields = [];
            },
            setDefaultValue() {
                if (this.defaultData && this.$refs) {
                    this.$refs.projectNameRef.refresh(this.defaultData.list.title);
                    this.$refs.priorityLevel.setValue(this.defaultData.list.priority);
                    Object.assign(this.projectBaseInfo, {priority: this.defaultData.list.priority});
                    this.$refs.startTime.setValue(this.defaultData.list.start_at);
                    this.$refs.endTime.setValue(this.defaultData.list.end_at);
                    this.$refs.projectExpenditureFee.setValue(this.defaultData.list.projected_expenditure);
                    this.$store.dispatch('changePrincipal', this.defaultData.list.principal);
                }
            },
            addProjectTrail(value) {
                if (!value) {
                    return;
                }
                this.projectBaseInfo.trail = {
                    id: value[0],
                };
                const trailInfo = this.trailsAllInfo.find(item => item.id == value);
                this.$store.dispatch('changePrincipal', {
                    data: trailInfo.principal.data,
                });
                this.projectBaseInfo.principal_id = trailInfo.principal.data.id;
                const artistsArr = [];
                for (let i = 0; i < trailInfo.starexpectations.data.length; i++) {
                    artistsArr.push(`${trailInfo.starexpectations.data[i].flag}-${trailInfo.starexpectations.data[i].id}`);
                }
                for (let i = 0; i < trailInfo.bloggerexpectations.data.length; i++) {
                    artistsArr.push(`${trailInfo.bloggerexpectations.data[i].flag}-${trailInfo.bloggerexpectations.data[i].id}`);
                }
                this.$refs.intentionArtist.setValue(artistsArr);
                this.projectBaseInfo.expectations = artistsArr;
                this.$refs.priorityLevel.setValue(trailInfo.priority);
                this.projectBaseInfo.priority = trailInfo.priority;
                this.$refs.projectFee.setValue(trailInfo.fee);
                this.$refs.trailOrigin.setValue(trailInfo.resource_type);
                if (this.projectType == 3) {
                    this.$refs.projectCooperation.setValue(trailInfo.cooperation_type);
                    this.$refs.projectTrailStatus.setValue(trailInfo.status);
                }
                this.trailOrigin = trailInfo.resource_type;
                this.projectBaseInfo.trail.id = trailInfo.id;
                switch (trailInfo.resource_type) {
                    case 1:
                        this.trailOriginContent = JSON.parse(JSON.stringify(trailInfo.resource));
                        break;
                    case 2:
                        this.trailOriginContent = JSON.parse(JSON.stringify(trailInfo.resource));
                        break;
                    case 3:
                        this.trailOriginContent = JSON.parse(JSON.stringify(trailInfo.resource));
                        break;
                    case 4:
                        this.$store.dispatch('changePrincipal', {
                            type: 'selector',
                            data: this.memberFinder(trailInfo.resource),
                        });
                        break;
                    case 5:
                        this.$store.dispatch('changePrincipal', {
                            type: 'selector',
                            data: this.memberFinder(trailInfo.resource),
                        });
                        break;
                    default:
                        break;
                }
            },
            getStars() {
                fetch('get', '/starandblogger', {sign_contract_status: 2}).then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.starsArr.push({
                            name: response.data[i].name,
                            value: `${response.data[i].flag}-${response.data[i].id}`,
                        });
                    }
                });
            },
            getTrail() {
                const data = {
                    include: 'principal,starexpectations,bloggerexpectations',
                    type: this.projectType,
                };
                this.trailsArr = [];
                fetch('get', '/trails/all', data).then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.trailsArr.push({
                            name: response.data[i].title,
                            id: response.data[i].id,
                            value: response.data[i].id,
                        });
                    }
                    this.trailsAllInfo = response.data;
                    this.$refs.trails.refresh();
                    const _this = this;
                    if (_this.defaultData) {
                        _this.setDefaultValue();
                        _this.$nextTick(() => {
                            _this.$refs.trails.setValue(_this.defaultData.trailInfo.data.id);
                            _this.$nextTick(() => {
                                _this.addProjectTrail(_this.defaultData.trailInfo.data.id);
                            });
                        });
                    } else if (!_this.$store.state.newPrincipalInfo.id) {
                        _this.$store.dispatch('changePrincipal', {
                            data: {
                                id: _this.user.id,
                                name: _this.user.nickname,
                            },
                        });
                    }
                });
            },
            memberFinder(value) {
                return this.userList.find(item => item.id == value);
            },
            addProject() {
                if (this.projectBaseInfo.start_at > this.projectBaseInfo.end_at) {
                    toastr.error('结束时间必须晚于开始时间,请重新选择时间');
                    return;
                }
                this.projectBaseInfo.fields = this.addInfoArr;
                this.projectBaseInfo.type = this.projectType;
                if (this.projectBaseInfo.trail && this.projectBaseInfo.trail.resource_type) {
                    const resource = this.projectBaseInfo.trail.resource_type;
                    if (resource == 1 || resource == 2 || resource == 3) {
                        this.projectBaseInfo.trail.resource = this.trailOriginContent;
                    } else if (resource == 4 || resource == 5) {
                        this.projectBaseInfo.trail.resource = this.$store.state.selectPrincipalInfo.id;
                    }
                }
                const tempPart = this.$store.state.newParticipantsInfo;
                if (tempPart.length > 0) {
                    this.projectBaseInfo.notice = [];
                    for (const key in tempPart) {
                        if (tempPart[key].notice_id) {
                            this.projectBaseInfo.notice.push(tempPart[key].notice_id);
                        } else {
                            this.projectBaseInfo.notice.push(tempPart[key].id);
                        }
                    }
                }
                this.submitDisable = true;
                fetch('post', '/projects', this.projectBaseInfo).then(response => {
                    this.submitDisable = true;
                    $('#addProject').modal('hide');
                    $('#selectProjectType').modal('hide');
                    this.$router.push({path: `/projects/${response.data.id}`});
                });
            },
            addProjectBaseInfo(value, name) {
                switch (name) {
                    case 'principal_id':
                        value = this.$store.state.newPrincipalInfo.id;
                        break;
                    case 'start_at':
                        this.startTime = value;
                        break;
                    case 'fee':
                        this.projectBaseInfo.trail.fee = value;
                        return;
                    case 'resource_type':
                        this.trailOrigin = value;
                        this.projectBaseInfo.trail.resource_type = value;
                        return;
                    case 'expectations':
                        for (let i = 0; i < value.length; i++) {
                            const item = value[i].split('-');
                            value[i] = {
                                id: item[1],
                                flag: item[0],
                            };
                        }
                        this.projectBaseInfo.trail.expectations = value;
                        return;
                    case 'cooperation_type':
                        this.projectBaseInfo.trail.cooperation_type = value;
                        return;
                    case 'status':
                        this.projectBaseInfo.trail.status = value;
                        return;
                }
                this.projectBaseInfo[name] = value;
            },
            addInfo(value, name) {
                this.addInfoArr[name] = value;
            },
        },
    };
</script>

<style lang="css" scoped>
    .modal-body .example {
        display: flex;
        align-items: center;
    }
</style>
