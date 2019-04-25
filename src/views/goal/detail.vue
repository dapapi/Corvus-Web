<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <!-- <Loading :is-loading="isLoading"></Loading> -->
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">目标详情</h1>
             <i class="iconfont icon-gengduo1 float-right" aria-hidden="true"
            id="taskDropdown" data-toggle="dropdown" aria-expanded="false" ></i>
            <div class="dropdown-menu" aria-labelledby="taskDropdown" role="menu" >
                <a class="dropdown-item" role="menuitem" data-plugin="actionBtn" 
                    data-toggle="modal" 
                    data-target="#link-project"
                    aria-hidden="true"
                    data-backdrop="static"
                    >关联项目</a>
                <a class="dropdown-item" role="menuitem" data-plugin="actionBtn" 
                    data-toggle="modal" 
                    data-target="#goals-add"
                    aria-hidden="true"
                    data-backdrop="static"
                    >编辑</a>
                     <a class="dropdown-item" role="menuitem" data-plugin="actionBtn" 
                    data-toggle="modal" 
                    aria-hidden="true" v-if="goalInfo.status !== 1"
                    data-backdrop="static" @click='finishGoal'
                    >完成</a>
                     <a class="dropdown-item" role="menuitem" data-plugin="actionBtn" 
                    data-toggle="modal" 
                    aria-hidden="true"
                    data-backdrop="static"  @click="deleteGoal"
                    >删除</a>
            </div>
        </div>
        
        <div class="page-content container-fluid">
            <div style="display: flex; justify-content: space-between; align-items: flex-start">
                <div class="panel" style="width: calc(66% - 15px);z-index: 100;float:left;margin-right:30px">
                    <div class="col-md-12 py-20 px-20">
                        <h4 class="nav nav-tabs nav-tabs-line" role="tablist">
                            {{goalInfo.title}}
                        </h4>
                    </div>
                    <div class="px-35 col-md-12 row py-0 mx-5">
                        <div class="progress progress-sm col-md-11 px-0">
                          <div class="progress-bar progress-bar-indicating active" :style="'width:'+goalInfo.percentage+'%;'" role="progressbar"></div>
                        </div>
                        <div class="col-md-1" style="color:#00bcd4;font-size:18px;line-height:10px;font-weight:700">{{goalInfo.percentage}}%</div>
                    </div>
                    <div class="col-md-12 mx-40 pb-0">
                        <button v-if="!inputProgress" type="button" @click='inputProgress = true' class="btn btn-block btn-default waves-effect waves-light waves-round col-md-2 px-0" style='font-size:10px'>更新当前进度</button>
                        <input v-if="inputProgress" type="number" oninput="if(value>100)value=100;if(value<0)value=0;" v-model="currentProgress">
                        <button type="button" class="btn btn-block btn-default waves-effect waves-light waves-round col-md-1 mx-10 my-0 px-0" style='font-size:10px;color:#00bcd4' :disabled='submitDisable' @click="progressUpdate">{{submitDisable?'':'更新'}}<CircleLoading style="margin:0 auto;width:20px;height:20px;" v-if="submitDisable"/></button>
                    </div>
                    <div>
                        <div class="row px-20">
                            <div class="col-md-12 mt-20 pt-0 mt-0" >
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        目标类型
                                    </div>
                                    <div class="col-md-8 float-left detail-value" v-if="goalInfo.type">
                                        {{selectorData.goalSort.find(item=>item.value === goalInfo.type).name}}                                        
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        金额类型
                                    </div>
                                    <div class="col-md-8 float-left detail-value" v-if="goalInfo.amount_type">
                                        {{selectorData.countSort.find(item=>item.value === goalInfo.amount_type).name}}                                        
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        目标金额
                                    </div>
                                    <div class="col-md-8 float-left detail-value">
                                        {{goalInfo.amount}}                                        
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        维度
                                    </div>
                                    <div class="col-md-8 float-left detail-value" v-if=" goalInfo.position">
                                        {{selectorData.Dimensions.find(item=>item.value === goalInfo.position).name}}                                        
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        艺人级别
                                    </div>
                                    <div class="col-md-8 float-left detail-value" v-if="goalInfo.talent_level">
                                        {{selectorData.levelArr.find(item=>item.value === goalInfo.talent_level).name}}                                        
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        目标级别
                                    </div>
                                    <div class="col-md-8 float-left detail-value" v-if="goalInfo.aim_level">
                                        {{selectorData.levelArr.find(item=>item.value === goalInfo.aim_level).name}}
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        目标周期
                                    </div>
                                    <div class="col-md-8 float-left detail-value">
                                        {{goalInfo.period_name}}
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        截止时间
                                    </div>
                                    <div class="col-md-8 float-left detail-value">
                                        {{goalInfo.deadline}}
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        更新时间
                                    </div>
                                    <div class="col-md-8 float-left detail-value">
                                        {{goalInfo.updated_at}}
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        负责人
                                    </div>
                                    <div class="col-md-8 float-left detail-value">
                                        {{goalInfo.principal_name}}
                                    </div>
                                </div>
                                <div class="col-md-12 my-5 px-0 float-left" >
                                    <div class="col-md-2 float-left text-right detail-key mx-0 noselect">
                                        目标描述
                                    </div>
                                    <div class="col-md-10 float-left detail-value">
                                        {{goalInfo.desc}}
                                    </div>
                                </div>
                                <div class="col-md-12 my-5 px-0 float-left" >
                                    <div class="col-md-2 float-left text-right detail-key mx-0 noselect">
                                        关联项目
                                    </div>
                                    <div class="col-md-10 float-left detail-value" v-if="goalInfo.relate_projects">
                                        {{goalInfo.relate_projects.data.flatMap((x)=>[x.title]).join(',')}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-20 pt-0 mt-0 mb-50" >

                                <div class="example mx-40 px-40" style='border-bottom:1px dashed rgba(7,17,27,0.2);width:100%'></div>
                                    <div class="col-md-6 my-5 px-0 float-left" >
                                        <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                            父目标
                                        </div>
                                        <div class="col-md-8 float-left detail-value">
                                             <p v-for="(item, index) in goalInfo.parents.data" :key="index">
                                                {{item.name}}
                                             </p>
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left" >
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        子目标
                                    </div>
                                    <div class="col-md-8 float-left detail-value">
                                        <p v-for="(item, index) in goalInfo.children.data" :key="index">
                                            {{item.name}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel" style="width: calc(34% - 15px);" v-if="projectId">
                    <div class="col-md-12">
                        <div class="card col-md-12">
                            <div class="card-header card-header-transparent card-header-bordered p-10"
                                 style="font-size: 16px;font-weight: bold;">
                                <div>项目跟进</div>
                            </div>
                            <div class="card-block">
                                <div class="col-md-12 pl-0">
                                    <TaskFollowUp :follow-type="'目标'" :trailId="projectId"
                                                  trailType="aims" ref="projectFollow"></TaskFollowUp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="canShow" class="modal fade" id="addLinkage" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">关联资源</h4>
                    </div>
                    <div class="modal-body">
                        <div class="tab-pane p-20" role="tabpanel">
                            <div class="nav-tabs-vertical" data-plugin="tabs"
                                 style="margin: 0 -20px -30px  -20px ">
                                <ul class="nav nav-tabs nav-tabs-line mr-25" role="tablist">
                                    <li class="nav-item" role="presentation"
                                        @click="selectProjectLinkage('project')">
                                        <a class="nav-link active" data-toggle="tab" href="#projectsPane"
                                           aria-controls="exampleTabsLineLeftOne" role="tab"
                                           aria-selected="false">
                                            项目</a>
                                    </li>
                                    <li class="nav-item" role="presentation"
                                        @click="selectProjectLinkage('task')">
                                        <a class="nav-link" data-toggle="tab" href="#tasksPane"
                                           aria-controls="exampleTabsLineLeftOne" role="tab"
                                           aria-selected="false">
                                            任务</a>
                                    </li>
                                </ul>
                                <div class="tab-content" style="max-height: 70vh;overflow-y: auto">
                                    <div class="tab-pane active" id="projectsPane" role="tabpanel">
                                        <div class="input-search mb-20" style="width: 70%">
                                            <button type="submit" class="input-search-btn">
                                                <i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" class="form-control" name=""
                                                   placeholder="搜索关键字..."
                                                   v-model="searchKeyWord">
                                        </div>
                                        <ul class="nav">
                                            <li class="nav-link pointer-content" style="width: 95%"
                                                v-for="project in allProjectsInfo"
                                                v-show="project.title.indexOf(searchKeyWord) > -1"
                                                @click="selectResource('projects', project.id)">{{ project.title
                                                }}
                                                <span class="float-right"
                                                      v-show="linkageSelectedIds.projects.indexOf(project.id) > -1">
                                                    <i class="iconfont icon-queren-zhengque"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane" id="tasksPane" role="tabpanel">
                                        <div class="input-search mb-20" style="width: 70%">
                                            <button type="submit" class="input-search-btn">
                                                <i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" class="form-control" name=""
                                                   placeholder="搜索关键字..."
                                                   v-model="searchKeyWord">
                                        </div>
                                        <ul class="nav">
                                            <li class="nav-link pointer-content" style="width: 95%"
                                                v-for="task in allTasksInfo"
                                                v-show="task.title.indexOf(searchKeyWord) > -1"
                                                @click="selectResource('tasks', task.id)">{{ task.title }}
                                                <span class="float-right"
                                                      v-show="linkageSelectedIds.tasks.indexOf(task.id) > -1">
                                                    <i class="iconfont icon-queren-zhengque"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addLinkageResource">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <Flag v-if="canShow" :typeText="changeProjectStatusText" @confirmFlag='changeProjectStatus'/> -->
        <addGoals :goalperiod='periods.data' @submitDone='submitDone' mode='modify' :defaultdata='goalInfo'/>
           <div class="modal fade" id="link-project" aria-labelledby="approval-great-module" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalTitle">关联项目</h4>
                    </div>
                    <div class="example px-50">
                         <Selectors ref="trails" :options='projectList' @change='linkProjectChanged' :multiple='true'
                                        selectable="true"></Selectors>
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-primary waves-effect waves-light waves-round" style="overflow:hidden" 
                         :disabled='submitLoading' @click="linkProjectSubmit"
                                >{{submitLoading?'':'确定'}}<CircleLoading style="" v-if="submitLoading"/>
                        </button>
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round"
                                data-dismiss="modal" >取消
                        </button>
                       
                    </div>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js';
    import config from '../../assets/js/config';
    import Cookies from 'js-cookie';
import addGoals from "./addGoals"

    export default {
         components:{
            addGoals
        },
        data() {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                isLoading: true,
                projectId: '',
                isBillButtonDisable: false,
                canShow: false,
                goalInfo:{},
                selectorData:{
                    levelArr:config.taskLevelArr,
                    goalRanger:config.goalRanger,
                    goalSort:config.goalSort,
                    countSort:config.countSort,
                    Dimensions:config.Dimensions,
                },
                currentProgress:'',
                inputProgress:false,
                periods:[],
                submitDisable:false,
                submitLoading:false,
                projectList:[],
                linkProject:''
            }
        },
        created(){
            this.getGoalDeatail()
            this.getPeriods()
            this.getProjectList()
        },
        mounted() {
            this.projectId = this.$route.params.id;
            this.user = JSON.parse(Cookies.get('user'));
        },
        watch: {
           
        },
        computed: {
            
        },

        methods: {
            linkProjectChanged(params){
                this.linkProject = params
            },
            linkProjectSubmit(){
                fetch('post',`/aims/${this.$route.params.id}/project`,{project_ids:this.linkProject}).then((params) => {
                    toastr.success('项目关联成功')
                    $('#link-project').modal('hide')
                    
                })
            },
            getProjectList(){
                fetch('get','/projects').then((params) => {
                    console.log(params);
                    this.projectList = params.data
                })
            },
            deleteGoal(){
                fetch('delete',`/aims/${this.$route.params.id}`).then((params) => {
                    toastr.success('删除成功')
                    this.$router.push('/my/goal')
                })
            },
            finishGoal(){
                fetch('put',`/aims/${this.$route.params.id}/status`,{status:1}).then((params) => {
                    toastr.success('标记完成成功')
                })
            },
            submitDone(){
                $('#goals-add').modal('hide')
            },
             getPeriods(){
                fetch('get','/periods/all').then((params) => {
                    this.periods = params
                })
            },
            progressUpdate(){
                if(this.inputProgress==false){
                    return
                }
                this.submitDisable = true

                this.inputProgress = false
                fetch('put',`/aims/${this.$route.params.id}?include=parents,children,relate_projects`,{percentage:this.currentProgress}).then((params) => {
                    toastr.success('进度更新成功');
                    this.submitDisable = false
                    console.log(params);
                    this.goalInfo = params.data
                }).catch((params) => {
                    this.goalInfo = params.data
                    
                })
            },
            getGoalDeatail(){
                fetch('get',`/aims/${this.$route.params.id}?include=parents,children,relate_projects`).then((params) => {
                    this.goalInfo = params.data
                })
            },
           

            getProjectContract(callback) {
                fetch('get', '/approvals_contract/projectList', {project_id: this.projectId}).then(response => {
                    this.projectContractInfo = response.data;
                    this.total = response.meta.pagination.total;
                    this.current_page = response.meta.pagination.current_page;
                    this.total_pages = response.meta.pagination.total_pages;
                    if (callback) {
                        callback(response.data)
                    }
                });
            },


            getProjectsReturned() {
                if (!this.projectContractInfo) {
                    this.getProjectContract((data) => {
                        this.getProjectReturned(data[0].form_instance_number);
                    })
                } else {
                    this.getProjectReturned(this.projectContractInfo[0].form_instance_number);
                }

                if (this.payMethodsArr.length > 0) {
                    return
                }

                fetch('get', '/money/type').then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].type === 1) {
                            this.payMethodsArr.push({
                                name: response.data[i].plan_returned_money,
                                value: response.data[i].id
                            })
                        } else if (response.data[i].type === 2) {
                            this.invoiceTypeArr.push({
                                name: response.data[i].plan_returned_money,
                                value: response.data[i].id
                            })
                        }
                    }
                })
            },

            changeProjectProgress(status) {
                this.projectProgress = status;
                $('#changeProjectProgress').modal('show')
            },

            addProjectProgress() {
                fetch('put', '/projects/' + this.projectId + '/course', {status: this.projectProgress}).then(response => {
                    let flagInfo = this.projectProgressInfo.find(item => item.status == this.projectProgress);
                    flagInfo['finisher'] = response.data.user;
                    flagInfo['finish_at'] = response.data.updated_at;
                    flagInfo['isFinish'] = 1;
                    this.coursesLength += 1;
                    this.getProjectProgress();
                    this.$refs.projectFollow.getTrail();
                })
            },

            getProjectProgress() {
                fetch('get', '/projects/' + this.projectId + '/course').then(response => {
                    if (response.data.length > 0) {
                        let courses = response.data;
                        this.coursesLength = response.data.length
                        let flagArr = [];
                        for (let i = 0; i < courses.length; i++) {
                            let projectProgress = this.projectProgressInfo.find(item => item.status == courses[i].content);
                            projectProgress.isFinish = 1;
                            projectProgress['finish_at'] = courses[i].updated_at;
                            projectProgress['finisher'] = courses[i].user;
                            flagArr.push(projectProgress);
                        }
                        for (let i = 0; i < this.projectProgressInfo.length; i++) {
                            if (!flagArr.find(item => item.status == this.projectProgressInfo[i].status)) {
                                flagArr.push(this.projectProgressInfo[i])
                            }
                        }
                        this.projectProgressInfo = flagArr;
                    }
                })
            },

            addProjectReturn(value, name) {
                if (name === 'principal_id') {
                    value = this.$store.state.newPrincipalInfo.id
                }
                this.projectReturnData[name] = value
            },

            addProjectPayback: function () {
                this.isPaybackDisable = true;
                this.projectReturnData.contract_id = this.contractId;
                this.projectReturnData.principal_id = this.user.id;
                this.projectReturnData.issue_name = this.paybackLength;
                fetch('post', '/projects/' + this.projectId + '/returned/money', this.projectReturnData).then(() => {
                    this.isPaybackDisable = false;
                    $('#addPaybackTime').modal('hide');
                    toastr.success('添加成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            editProjectPayback() {
                fetch('put', '/returned/money/' + this.projectReturnId, this.projectReturnData).then(() => {
                    $('#addPaybackTime').modal('hide');
                    $('#addPayback').modal('hide');
                    $('#addInvoice').modal('hide');
                    toastr.success('修改成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            delProjectPayback(paybackId) {
                this.delPaybackId = paybackId
            },

            delProjectPaybackCallback() {
                fetch('delete', '/returned/money/' + this.delPaybackId).then(() => {
                    toastr.success('删除成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            editProjectPaybackTime(type, payback) {
                if (type === false && this.projectInfo.powers.add_returned_money !== 'true') {
                    // $('#addPaybackTime').modal('')
                    toastr.error('当前用户没有新建回款期次权限')
                    return
                }
                else if (type === true && this.projectInfo.powers.edit_returned_money !== 'true') {
                    toastr.error('当前用户没有编辑回款期次权限')
                    return
                } else {
                    $('#addPaybackTime').modal('show')
                }


                this.isEditProjectPayback = type;
                if (type) {
                    this.projectReturnName = payback.issue_name;
                    this.projectReturnDesc = payback.desc;
                    this.$refs.paybackMoney.setValue(payback.plan_returned_money);
                    this.$refs.paybackTime.setValue(payback.plan_returned_time);
                    this.projectReturnId = payback.id;
                }
            },

            addProjectPaybackTime() {
                if (!this.projectReturnData.project_returned_money_type_id) {
                    toastr.error('请选择票据类型或付款方式')
                    return
                }
                this.isPaybackButtonDisable = true;
                this.projectReturnData.contract_id = this.contractId;
                this.projectReturnData.principal_id = this.user.id;
                fetch('post', '/projects/' + this.projectId + '/returned/' + this.paybackTime.id + '/money', this.projectReturnData).then(() => {
                    this.isPaybackButtonDisable = false;
                    $('#addPayback').modal('hide');
                    $('#addInvoice').modal('hide');
                    toastr.success('添加成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            redirectContract(contractId) {
                this.$router.push({path: '/approval/' + contractId})
            },

            selectedPaybackTime(payback) {
                this.paybackTime = payback;
            },

            editProjectPaybackRecording(recording, payback, type) {
                this.isEditProjectPaybackTime = true;
                this.projectReturnName = recording.issue_name;
                this.projectReturnDesc = recording.desc;
                if (type === 'payback') {
                    this.$refs.paybackMoney1.setValue(recording.plan_returned_money);
                    this.$refs.paybackTime1.setValue(recording.plan_returned_time);
                    this.$refs.payMethod.setValue(recording.type.data.id);
                } else {
                    this.$refs.paybackMoney2.setValue(recording.plan_returned_money);
                    this.$refs.paybackTime2.setValue(recording.plan_returned_time);
                    this.$refs.payMethod1.setValue(recording.type.data.id);
                }
                this.projectReturnId = recording.id;
                this.paybackTime = payback;
            },

            setTaskPrincipal() {
                this.$store.dispatch('changePrincipal', {data: {id: this.user.id, name: this.user.nickname}})
            },

            redirectTask(taskId) {
                this.$router.push({path: '/tasks/' + taskId})
            },

            redirectTrail(trailId) {
                this.$router.push({path: '/trails/' + trailId})
            },

            redirectProject(projectId) {
                this.$router.push({path: '/projects/' + projectId})
            },

            filterProjectFee(value) {
                this.filterFee = value;
            },

            changeTrailOrigin(value) {
                this.trailInfo.resource = '';
                this.email = '';
                this.changeInfo.resource_type = value;
            },

            addTask: function (response) {
                this.projectTasksInfo.push(response.data);
                this.getProject();
            },

            getTaskType() {
                fetch('get', '/task_types').then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.taskTypeArr.push({
                            name: response.data[i].title,
                            value: response.data[i].id
                        })
                    }
                })
            },

            getAllProjects() {
                fetch('get', '/projects/all').then(response => {
                    this.allProjectsInfo = response.data
                })
            },

            getAllTasks() {
                fetch('get', '/tasksAll').then(response => {
                    this.allTasksInfo = response.data
                })
            },
            editBaseInfo() {
                if (this.projectInfo.powers.edit_project !== 'true') {
                    toastr.error('当前用户没有编辑项目的权限')
                    return
                }
                this.isEdit = true;
                this.changeInfo = {};
                this.addInfoArr = {};
            },

            changeProjectBaseInfo(value, name) {
                switch (name) {
                    case 'principal_id':
                        if (value === this.projectInfo.principal.data.id) {
                            return
                        }
                        value = this.$store.state.principalInfo.id;
                        break;
                    case 'participant_ids':
                        let participants = this.$store.state.participantsInfo;
                        let participantsArr = [];
                        for (let i = 0; i < participants.length; i++) {
                            participantsArr.push(participants[i].id)
                        }
                        value = participantsArr;
                        break;
                    case 'fee':
                        if (value == this.projectInfo.trail.data.fee) {
                            return
                        }
                        if (this.changeInfo.trail) {
                            this.changeInfo.trail.fee = value
                        } else {
                            this.changeInfo['trail'] = {
                                id: this.projectInfo.trail.data.id,
                                fee: value
                            };
                        }
                        return;
                    case 'projected_expenditure':
                        if (value == this.projectInfo.projected_expenditure) {
                            return
                        }
                        break;
                    case 'expectations':
                        for (let i = 0; i < value.length; i++) {
                            let item = value[i].split('-');
                            value[i] = {
                                id: item[1],
                                flag: item[0]
                            };
                        }
                        if (this.projectInfo.trail.data.expectations.data.length === 0 && value.length === 0) {
                            return
                        }
                        if (this.changeInfo.trail) {
                            this.changeInfo.trail.expectations = value
                        } else {
                            this.changeInfo['trail'] = {
                                id: this.projectInfo.trail.data.id,
                                expectations: value
                            };
                        }
                        return;
                    case 'resource_type':
                        if (value == this.projectInfo.trail.data.resource_type) {
                            return
                        }
                        if (this.changeInfo.trail) {
                            this.changeInfo.trail.resource_type = value
                        } else {
                            this.changeInfo['trail'] = {
                                id: this.projectInfo.trail.data.id,
                                resource_type: value
                            };
                        }
                        return;
                    case 'resource':
                        if (value == this.projectInfo.trail.data.resource) {
                            if (this.changeInfo.trail && this.changeInfo.trail.resource) {
                                delete this.changeInfo.trail.resource
                            }
                            return
                        }
                        if (this.changeInfo.trail) {
                            this.changeInfo.trail.resource = value
                        } else {
                            this.changeInfo['trail'] = {
                                id: this.projectInfo.trail.data.id,
                                resource: value
                            };
                        }
                        return;
                    case 'cooperation_type':
                        if (value == this.projectInfo.trail.data.cooperation_type) {
                            if (this.changeInfo.trail && this.changeInfo.trail.cooperation_type) {
                                delete this.changeInfo.trail.cooperation_type
                            }
                            return
                        }
                        if (this.changeInfo.trail) {
                            this.changeInfo.trail.cooperation_type = value
                        } else {
                            this.changeInfo['trail'] = {
                                id: this.projectInfo.trail.data.id,
                                cooperation_type: value
                            };
                        }
                        return;
                    case 'status':
                        if (value == this.projectInfo.trail.data.status) {
                            if (this.changeInfo.trail && this.changeInfo.trail.status) {
                                delete this.changeInfo.trail.status
                            }
                            return
                        }
                        if (this.changeInfo.trail) {
                            this.changeInfo.trail.status = value
                        } else {
                            this.changeInfo['trail'] = {
                                id: this.projectInfo.trail.data.id,
                                status: value
                            };
                        }
                        return;
                    default:
                        break
                }
                this.changeInfo[name] = value
            },

            changeProjectInfo() {
                let data = this.changeInfo;
                if (data.start_at) {
                    if (data.end_at && (data.start_at > data.end_at)) {
                        toastr.error('开始时间不能晚于截止时间')
                        return
                    } else if (!data.end_at && (data.start_at > this.projectInfo.end_at)) {
                        toastr.error('开始时间不能晚于截止时间')
                        return
                    }
                }
                if (data.end_at) {
                    if (data.start_at && (data.start_at > data.end_at)) {
                        toastr.error('开始时间不能晚于截止时间')
                        return
                    } else if (!data.start_at && (data.start_at > this.projectInfo.end_at)) {
                        toastr.error('开始时间不能晚于截止时间')
                        return
                    }
                }
                if (JSON.stringify(this.addInfoArr) !== "{}") {
                    data.fields = this.addInfoArr;
                }
                let participantsInfo = this.$store.state.participantsInfo;
                data.participant_ids = [];
                data.participant_del_ids = [];
                for (let i = 0; i < participantsInfo.length; i++) {
                    if (this.projectInfo.participants.data.map(item => item.id).indexOf(participantsInfo[i].id) === -1) {
                        data.participant_ids.push(participantsInfo[i].id)
                    }
                }
                for (let i = 0; i < this.projectInfo.participants.data.length; i++) {
                    if (participantsInfo.map(item => item.id).indexOf(this.projectInfo.participants.data[i].id) === -1) {
                        data.participant_del_ids.push(this.projectInfo.participants.data[i].id)
                    }
                }
                if (data.participant_del_ids.length === 0) {
                    delete data.participant_del_ids;
                }
                if (data.participant_ids.length === 0) {
                    delete data.participant_ids;
                }
                if (JSON.stringify(data) === "{}") {
                    this.isEdit = false;
                    return
                }
                fetch('put', '/projects/' + this.projectId, data).then(() => {
                    toastr.success('修改成功');
                    this.isEdit = false;
                    this.getProject()
                })
            },

            cancelEdit() {
                this.projectInfo = this.oldInfo.data;
                let fieldsArr = this.oldInfo.meta.fields.data;
                this.metaInfo = this.oldInfo.meta;
                for (let i = 0; i < fieldsArr.length; i++) {
                    if (fieldsArr[i].field_type === 2 || fieldsArr[i].field_type === 6) {
                        fieldsArr[i].contentArr = [];
                        for (let j = 0; j < fieldsArr[i].content.length; j++) {
                            fieldsArr[i].contentArr.push({
                                name: fieldsArr[i].content[j],
                                value: fieldsArr[i].content[j],
                            })
                        }
                    }
                }
                this.oldInfo.data.fields = fieldsArr;
                let params = {
                    type: 'change',
                };
                params.data = this.oldInfo.data.principal.data;
                this.$store.dispatch('changePrincipal', params);
                if (this.oldInfo.data.participants) {
                    this.flagParticipantsIdArr = [];
                    for (let i = 0; i < this.oldInfo.data.participants.data.length; i++) {
                        this.flagParticipantsIdArr.push(this.oldInfo.data.participants.data[i].id)
                    }
                    params.data = JSON.parse(JSON.stringify(this.oldInfo.data.participants.data));
                    this.$store.dispatch('changeParticipantsInfo', params);
                }
                this.linkageSelectedIds.tasks = [];
                this.linkageSelectedIds.projects = [];
                for (let i = 0; i < this.oldInfo.data.relate_tasks.data.length; i++) {
                    this.linkageSelectedIds.tasks.push(this.oldInfo.data.relate_tasks.data[i].id)
                }
                for (let i = 0; i < this.oldInfo.data.relate_projects.data.length; i++) {
                    this.linkageSelectedIds.projects.push(this.oldInfo.data.relate_projects.data[i].id)
                }
                if (this.oldInfo.data.trail) {
                    this.selectedExpectationsArr = [];
                    for (let i = 0; i < this.oldInfo.data.trail.data.expectations.data.length; i++) {
                        this.selectedExpectationsArr.push(this.oldInfo.data.trail.data.expectations.data[i].moduleable_type + '-' + this.oldInfo.data.trail.data.expectations.data[i].id)
                    }
                }
                this.isEdit = false;
                this.changeInfo = {};
                this.addInfoArr = {};
            },

            changeTaskType(value) {
                this.taskType = value
            },

            principalChange(value) {

            },

            participantChange(value) {

            },

            changeTaskLevel(value) {
                this.taskLevel = value
            },

            changeStartTime(value) {
                this.startTime = value
            },

            changeStartMinutes(value) {
                this.startMinutes = value
            },

            changeEndMinutes(value) {
                this.endMinutes = value
            },

            changeEndTime(value) {
                this.endTime = value
            },

            doWithdrawal(value) {

            },

            addInfo(value, name) {
                if (name === this.cooperationKeyId) {
                    this.cooperationOther = value;
                }
                if (this.projectInfo.fields.find(item => item.id == name).values.data.value == value) {
                    return
                }
                this.addInfoArr[name] = value
            },

            changeToastrText(status) {
                if (status === 2) {
                    this.changeProjectStatusText = '完成 " ' + this.projectInfo.title + ' " 项目吗？'
                } else if (status === 3) {
                    this.changeProjectStatusText = '撤单 " ' + this.projectInfo.title + ' " 项目吗？'
                } else if (status === 1) {
                    this.changeProjectStatusText = '激活 " ' + this.projectInfo.title + ' " 项目吗？'
                }
                this.projectChangeStatus = status
            },

            changeProjectStatus() {
                let _this = this;
                fetch('put', '/projects/' + this.projectId + '/status', {status: this.projectChangeStatus}).then(function () {
                    toastr.success('修改成功');
                    _this.projectInfo.status = _this.projectChangeStatus
                })
            },

            selectProjectLinkage(value) {
                this.linkageResource = value;
                if (!this.allProjectsInfo) {
                    this.getAllProjects()
                }
                if (!this.allTasksInfo) {
                    this.getAllTasks()
                }
            },

            selectResource(type, value) {
                let index = this.linkageSelectedIds[type].indexOf(value);
                if (index > -1) {
                    this.linkageSelectedIds[type].splice(index, 1)
                } else {
                    this.linkageSelectedIds[type].push(value)
                }
            },

            addLinkageResource() {
                let _this = this;
                fetch('post', '/projects/' + this.projectId + '/relates', this.linkageSelectedIds).then(function () {
                    toastr.success('关联成功');
                    $('#addLinkage').modal('hide');
                    _this.getProject()
                })
            },

        },
    };
</script>

<style lang="scss" scoped>
    .task-dropdown {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2;
    }

    .task-dropdown-item {
        position: absolute;
        transform: translate3d(299px, 36px, 0px);
        top: 0;
        left: 0;
        will-change: transform;
    }

    .dividing-line {
        width: 100%;
        height: 1px;
        background-color: #E0E0E0;
    }

    .project-time-item {
        position: relative;
    }

    .project-time-line {
        width: 100%;
        height: 2px;
        background-color: #3f51b5;
    }

    .project-time-circle {
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 100%;
        border: 1px solid #e0e0e0;
        position: absolute;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }

    .project-progress {
        width: 11%;
        float: left;
    }

    .image-wraper {
        width: 30px;
        height: 30px;
    }

    .image-wraper img {
        width: 100%;
    }

    .project-progress .points {
        width: 3px;
        height: 3px;
        border-radius: 100%;
        position: relative;
        top: 1.5px;
    }

    .project-progress .line {
        width: 100%;
        height: 1px;
    }

    .finish-color {
        background-color: #3298DC;
    }

    .unfinish-color {
        background-color: #EEEEEE;
    }

    .finish-font-color {
        color: #3298DC;
    }

    .card-block .card-text {
        display: flex;
        align-items: center;
    }

    .bar-wrap {
        height: 50px;
        width: 80px;
        position: relative;
        ul {
            list-style: none;
            li {
                list-style: none;
                width: 1px;
                height: 3px;
                background-color: red;
                transform-origin: center 25px;
                position: absolute;
                border-radius: 2px;
            }
        }
        .percent {
            font-size: 10px;
            line-height: 25px;
            text-align: center;
        }
    }
</style>
