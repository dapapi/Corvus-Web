<template>
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
                    <div class="col-md-12 example clearfix" v-show="projectType != 5 && trailsArr.length > 0">
                        <div class="col-md-2 text-right float-left px-0">销售线索</div>
                        <div class="col-md-10 float-left">
                            <Selectors :options="trailsArr" @change="addProjectTrail" ref="trails"
                                       placeholder="请选择销售线索" selectable="true"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0">项目来源</div>
                        <div class="col-md-10 float-left">
                            <div class="col-md-6 float-left pl-0" v-if="trailOriginArr.length > 0">
                                <Selectors :options="trailOriginArr"
                                           @change="(value) => addProjectBaseInfo(value, 'resource_type')"
                                           ref="trailOrigin" placeholder="请选择项目来源"></Selectors>
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
                        <div class="col-md-2 text-right float-left px-0">项目名称</div>
                        <div class="col-md-10 float-left">
                            <EmitInput @change="(value) => addProjectBaseInfo(value, 'title')"
                                       ref="projectNameRef"></EmitInput>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0">项目负责人</div>
                        <div class="col-md-10 float-left">
                            <InputSelectors
                                    @change="(value) => addProjectBaseInfo(value, 'principal_id')"></InputSelectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType != 5 && starsArr.length > 0">
                        <div class="col-md-2 text-right float-left px-0">目标艺人</div>
                        <div class="col-md-10 float-left">
                            <Selectors multiple="true" :options="starsArr" ref="intentionArtist"
                                       placeholder="请选择目标艺人"
                                       @change="(value) => addProjectBaseInfo(value, 'expectations')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0">优先级</div>
                        <div class="col-md-10 float-left">
                            <Selectors :options="levelArr" ref="priorityLevel" placeholder="请选择优先级"
                                       @change="(value) => addProjectBaseInfo(value, 'priority')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType == 5">
                        <div class="col-md-2 text-right float-left px-0">可见范围</div>
                        <div class="col-md-10 float-left">
                            <Selectors :options="visibleRangeArr" placeholder="请选择可见范围" ref="visibleRange"
                                       @change="(value) => addProjectBaseInfo(value, 'privacy')"></Selectors>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0">开始时间</div>
                        <div class="col-md-10 float-left">
                            <Datepicker @change="(value) => addProjectBaseInfo(value, 'start_at')"
                                        ref="startTime"></Datepicker>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix">
                        <div class="col-md-2 text-right float-left px-0">截止时间</div>
                        <div class="col-md-10 float-left">
                            <Datepicker @change="(value) => addProjectBaseInfo(value, 'end_at')"
                                        ref="endTime" :startDate="startTime"></Datepicker>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0">预计支出</div>
                        <div class="col-md-10 float-left">
                            <NumberSpinner ref="projectExpenditureFee"
                                           @change="(value) => addProjectBaseInfo(value, 'expenditure_fee')"></NumberSpinner>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-show="projectType != 5">
                        <div class="col-md-2 text-right float-left px-0">合同金额</div>
                        <div class="col-md-10 float-left">
                            <NumberSpinner ref="projectFee"
                                           @change="(value) => addProjectBaseInfo(value, 'fee')"></NumberSpinner>
                        </div>
                    </div>
                    <div class="col-md-12 example clearfix" v-for="field in projectFields">
                        <div class="col-md-2 text-right float-left px-0">{{ field.key }}</div>
                        <div class="col-md-10 float-left">
                            <template v-if="field.field_type === 1">
                                <EmitInput @change="(value) => addInfo(value, field.id )"></EmitInput>
                            </template>
                            <template v-if="field.field_type === 2">
                                <Selectors :options="field.contentArr" :placeholder="'请选择' + field.key"
                                           @change="(value) => addInfo(value, field.id )"></Selectors>
                            </template>
                            <template v-if="field.field_type === 3">
                                <EditableSearchBox :options="starsArr" :multiple="true"
                                                   @change="(value) => addInfo(value, field.id )"></EditableSearchBox>
                            </template>
                            <template v-if="field.field_type === 4">
                                <Datepicker @change="(value) => addInfo(value, field.id )"></Datepicker>
                            </template>
                            <template v-if="field.field_type === 5">
                                <NormalTextarea title="" class="form-control"
                                                @change="(value) => addInfo(value, field.id )"></NormalTextarea>
                            </template>
                            <template v-if="field.field_type === 6">
                                <Selectors :options="field.contentArr" :multiple="true"
                                           :placeholder="'请选择' + field.key"
                                           @change="(value) => addInfo(value.join('|'), field.id )"></Selectors>
                            </template>
                            <template v-if="field.field_type === 8">
                                <GroupDatepicker
                                        @change="(from, to) => addInfo(from + '|' + to, field.id )"></GroupDatepicker>
                            </template>
                            <template v-if="field.field_type === 10">
                                <InputSelectors @change="(value) => addInfo(value, field.id )"></InputSelectors>
                            </template>
                            <template v-if="field.field_type === 11">
                                <NumberSpinner @change="(value) => addInfo(value, field.id )"></NumberSpinner>
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
                <ApprovalProgress :approver='approver' />

                <div class="modal-footer">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                    <button class="btn btn-primary" type="submit" @click="addProject">确定</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import config from '../assets/js/config.js'
    import fetch from '../assets/utils/fetch.js'
    import ApprovalProgress from '@/components/ForApproval/ApprovalProgress'
    export default {
        components:{
            ApprovalProgress
        },
        name: "BuildProject",
        props: ['projectType', 'projectFieldsArr'],
        data() {
            return {
                visibleRangeArr: config.visibleRangeArr,
                levelArr: config.levelArr,
                trailsArr: [],
                trailOrigin: '',
                trailOriginArr: config.trailOrigin,
                starsArr: [],
                startTime: '',
                trailOriginContent: '',
                trailsAllInfo: '',
                addInfoArr: {},
                projectBaseInfo: {
                    trail: {}
                },
                projectFields: [],
                approver:[],
            }
        },
        watch: {
            projectFieldsArr(newValue) {
                return this.projectFields = newValue
            },
            projectType(newValue){
                this.getApprover()
            }
        },
        mounted() {
            this.getStars();
            this.getTrail();
            // this.getApprover();
            let _this = this;
            $('#addProject').on('hidden.bs.modal', function () {
                _this.refreshAddProjectModal()
            })
        },
        methods: {
            getApprover(){
                let _this = this
                fetch('get','/approvals/chains?form_id='+this.projectType+'&change_type=222&value').then((params) => {
                    _this.approver = params.data
                })
            },
            refreshAddProjectModal: function () {
                if (!this.$refs.trails) {
                    return
                }
                this.$refs.trails.setValue('');
                this.$refs.projectNameRef.refresh();
                this.$refs.priorityLevel.setValue('');
                this.$refs.visibleRange.setValue('');
                this.$refs.intentionArtist.setValue('');
                this.$refs.startTime.setValue('');
                this.$refs.endTime.setValue('');
                this.$refs.desc.refresh();
                this.$refs.projectFee.setValue('0');
                this.$refs.trailOrigin.setValue('');
                this.trailOriginContent = '';
                this.trailOrigin = '';
                this.projectBaseInfo = {trail: {}};
                this.$store.dispatch('changePrincipal', {data: {}});
                this.$store.dispatch('changePrincipal', {type: 'selector', data: {}});
                this.projectFields = [];
            },

            addProjectTrail: function (value) {
                console.log(value);
                if (!value) {
                    return
                }
                this.projectBaseInfo.trail = {
                    id: value[0]
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
                this.$refs.projectFee.setValue(trailInfo.fee);
                this.$refs.trailOrigin.setValue(trailInfo.resource_type);
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
                        this.$store.dispatch('changePrincipal', {type: 'selector', data: trailInfo.resource});
                        break;
                    case 5:
                        this.$store.dispatch('changePrincipal', {type: 'selector', data: trailInfo.resource});
                        break;
                    default:
                        break;
                }
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

            addProject: function () {
                this.projectBaseInfo.fields = this.addInfoArr;
                this.projectBaseInfo.type = this.projectType;
                if (this.projectBaseInfo.trail && this.projectBaseInfo.trail.resource_type) {
                    let resource = this.projectBaseInfo.trail.resource_type;
                    if (resource == 1 || resource == 2 || resource == 3) {
                        this.projectBaseInfo.trail.resource = this.trailOriginContent;
                    } else if (resource == 4 || resource == 5) {
                        this.projectBaseInfo.trail.resource = this.$store.state.selectPrincipalInfo.id
                    }
                }
                let _this = this;
                fetch('post', '/projects', this.projectBaseInfo).then(function (response) {
                    $('#addProject').modal('hide');
                    $('#selectProjectType').modal('hide');
                    _this.$router.push({path: '/projects/' + response.data.id});
                })
            },

            addProjectBaseInfo: function (value, name) {
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
                        return
                }
                this.projectBaseInfo[name] = value
            },

            addInfo: function (value, name) {
                this.addInfoArr[name] = value
            },
        }
    }
</script>

<style scoped>

</style>