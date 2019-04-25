<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <!-- <Loading :is-loading="isLoading"></Loading> -->
        <div class="page-header page-header-bordered my-1 ">
            <h1 class="page-title">目标管理</h1>
            
            <!-- <div class="float-right goals-range">2019年Q1季度</div> -->
            <div class="page-header-actions dropdown show task-dropdown float-right" style="z-index:999000">
                <div class="" aria-hidden="true" style="cursor: pointer" id="taskDropdown"
                   data-toggle="dropdown" v-if="!periods.data" aria-expanded="false"><CircleLoading /></div>
                <div class="" aria-hidden="true" style="cursor: pointer" id="taskDropdown"
                   data-toggle="dropdown" v-if="periods.data" aria-expanded="false">{{(periodSelected && periods.data.find(params=>params.id === periodSelected).name )|| periods.data[0].name}}</div>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" style="width:400px;"  aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                      <table class="table table-hover is-indent " style="height:20px;overflow:auto" data-plugin="animateList" data-animate="fade">
                    <tr>
                        <td class="cell-300">周期名称</td>
                        <td class="cell-300">开始时间</td>
                        <td class="cell-300">结束时间</td>
                    </tr>
                      </table>
                      <div style="height:180px;overflow:auto" >
                      <table class="table table-hover is-indent " data-plugin="animateList" data-animate="fade">
                    
                    <tr  v-for="(item, index) in periods.data" :key="index">
                        <td><input style="cursor:pointer" :checked='periodSelected === item.id' @change='(params)=>filterHandler(item.id,"periodSelected")' :id='String("periodSelector")+index' name="periodSelector" class="" type="radio" /><label :for="String('periodSelector')+index"> {{item.name}}</label></td>
                        <td><label style="cursor:pointer" :for="String('periodSelector')+index">{{item.start_at}}</label></td>
                        <td><label style="cursor:pointer" :for="String('periodSelector')+index">{{item.end_at}}</label></td>
                    </tr>
                    </table>
                    </div>
                </div>
            </div>
            <div class="float-right goals-add mr-50"  data-toggle="modal" 
            data-target="#goals-add" >+新建目标</div>
             
        </div>
        <div class="page-header page-header-bordered py-0">
            <ul class="nav nav-tabs nav-tabs-line" role="tablist" style="position: relative;">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base" :class="tabNumber===1?'active':''"
                               aria-expanded="true" role="tab" @click="tabHandler(1)">我的</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present"  :class="tabNumber===2?'active':''"
                               aria-expanded="false" role="tab" @click="tabHandler(2)" >部门</a>
                        </li>
                         <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present" :class="tabNumber===3?'active':''"
                               aria-expanded="false" role="tab" @click="tabHandler(3)">公司</a>
                        </li>
                         <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present" :class="tabNumber===4?'active':''"
                               aria-expanded="false" role="tab" @click="tabHandler(4)">全部</a>
                        </li>
                    </ul>
        </div>
        <div class="row mx-20" v-if="tabNumber !== 4">
            <div class="col-md-5 pl-25 mr-0 pr-0">
                <div class="panel row float-left  " style="width:100%">
                    <dir class="col-md-4" style="justify-content:center;">
                        <div class="total-goals-logo" style="color:#00bcd4;"><CircleLoading style="display:inline-block;width:40px;height:40px;margin-top:30px;" v-if="countLoading"/><span v-if="!countLoading"> {{totalNumberCurrent}}</span></div>
                        <div class="total-goals-title">目标总数</div>
                    </dir>
                    <div class="col-md-8 py-20">
                        <div class="py-10 progress-bar-test">
                            <div class="progress progress-sm py-0 my-0">
                                <div class="progress-bar progress-bar-info progress-bar-indicating active" :style="'width:'+finishedNumber" role="progressbar"></div>
                            </div>
                            <div>
                                <span>已完成<span style="color:#00bcd4"> {{finishedGoalNum}}</span></span>
                                <span class="float-right">待完成{{totalNumber}}个</span>
                            </div>
                        </div>
                        <div class="py-10 progress-bar-test">
                            <div class="progress progress-sm py-0 my-0">
                                <div class="progress-bar progress-bar-info progress-bar-indicating active" :style="'width:'+sevenDaysNumber" role="progressbar"></div>
                            </div>
                            <div>
                                
                                <span>近七天更新<span style="color:#00bcd4"> {{recentUpdateNum}}个</span></span>
                            </div>
                        </div>
                        <div class="py-10 progress-bar-test">
                            <div class="progress progress-sm py-0 my-0">
                                <div class="progress-bar progress-bar-info progress-bar-indicating active" :style="'width:'+averageNumber" role="progressbar"></div>
                            </div>
                            <div>
                                <span>平均完成度<span style="color:#00bcd4;">{{finishedGoalAve}}%</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="panel px-30" style="height:183px;font-size:18px;">
                    <div class="py-20"><span style="color:#ff9800;">你真棒！</span>请继续努力～</div>
                    <div class="mx-5 row " style="width:100%;height:100px;border-radius:50px;background-color:rgba(7,17,27,0.04);">
                        <div class="goals-percent-logo"><CircleLoading style="display:inline-block;width:30px;height:30px;margin-top:20px;" v-if="countLoading"/><span v-if="!countLoading"> {{finishedGoalAve}}</span>%</div>
                        <span class="ml-20" style="line-height:100px">{{goalTypeHandler[0]}}<span><strong><CircleLoading style="display:inline-block;width:20px;height:20px" v-if="countLoading"/><span v-if="!countLoading">  {{percent}}</span>%</strong></span> {{goalTypeHandler[1]}}</span></div>
                </div>
            </div>
        </div>
        <div class="page-content container-fluid pt-0 mt-0">
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="clearfix">
                    <div class="col-md-2 example float-left">
                        <input type="text"
                               class="form-control"
                                @change='(params)=>filterHandler(params.target.value,"keyword")'
                               id="inputPlaceholder"
                               placeholder="请输入目标名称">
                    </div>
                    <div class="col-md-2 example float-left">
                         <DropDepartment :data="department" @change='(params)=>filterHandler(params,"departmentId")'/>
                    </div>
                    <!-- todo 任务类型暂无 -->
                    <div class="col-md-2 example float-left">
                        <Selectors placeholder="请选择负责人" @change='(params)=>filterHandler(params,"principal_id")'></Selectors>
                    </div>
                     <div class="col-md-2 example float-left" v-if="tabNumber===4" >
                        <Selectors :options='goalRanger' placeholder="请选择范围" @change='(params)=>filterHandler(params,"goalRange")'></Selectors>
                    </div>
                    <div class="col-md-3 example float-right pl-40 pt-5 pr-0 mr-0">
                        <span class="col-md-5" :style="tabStatus===0?'color:#3f51b5;font-size:16px;cursor:pointer;':'font-size:16px;cursor:pointer;'" @click="tabStatusHandler(0)">进行中</span>
                        <span class="col-md-5" :style="tabStatus===1?'color:#3f51b5;font-size:16px;cursor:pointer;':'font-size:16px;cursor:pointer;'" @click="tabStatusHandler(1)">已结束</span>
                        <!--<button type="button"-->
                                <!--class="btn btn-default waves-effect waves-classic float-right"-->
                                <!--data-toggle="modal"-->
                                <!--data-target="#customizeContent"-->
                                <!--data-placement="right"-->
                                <!--title>自定义筛选-->
                        <!--</button>-->
                    </div>
                </div>
                <div class="px-0 page-content tab-content nav-tabs-animate bg-white pt-0">
                    <div class="tab-pane animation-fade active" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                                data-child="tr"
                                data-selectable="selectable">
                            <tr class="animation-fade " 
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms; border-bottom:1px solid rgba(7,17,27,0.2);">
                                <th class="cell-300" scope="col">目标名称</th>
                                <!-- <th class="cell-300" scope="col">父/子</th> -->
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">进度</th>
                                <th class="cell-300" scope="col">截止时间</th>
                            </tr>
                            <tbody>
                            <tr v-for="(item, index) in goalList" :key="index" @click="goDetail(item.id)">
                                <td class="pointer-content">
                                    {{item.title}}
                                </td>
                                <td>
                                    {{item.principal_name}}
                                </td>
                                <td>
                                    {{item.percentage}}%
                                </td>
                                <td>
                                    {{item.deadline}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                            <div style="margin: 6rem auto;width: 100px"  >
                                <!-- <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%"> -->
                        </div>
                        <!-- <template v-if="!taskStatus">
                            <Pagination :current_page="current_page" :method="getTasks" :total_pages="total_pages"
                                        :total="total"></Pagination>
                        </template> -->
                            <Pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                        :total="total"></Pagination>
                    </div>
                </div>
            </div>
        </div>
        <addGoals :goalperiod='periods.data' @submitDone='submitDone'/>
       

    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import fetch from "../../assets/utils/fetch.js";
    import config from "../../assets/js/config";
    import Cookies from 'js-cookie'
    import addGoals from "./addGoals"
    const taskStatusArr = [{name: "全部", value: ""}, ...config.taskStatusArr];
    export default {
        components:{
            addGoals
        },
        name: "",
        data() {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                participants: [],
                multiple: false,
                taskIntroduce: "",
                startTime: "",
                startMinutes: "00:00",
                endTime: "",
                endMinutes: "00:00",
                tasksInfo: "",
                taskStatus: 0,
                newTask: {},
                taskType: "",
                taskFinishType: "",
                taskName: "",
                taskLevel: "",
                taskTypeArr: [],
                taskStatusArr: taskStatusArr,
                taskLevelArr: config.taskLevelArr,
                customizeInfo: config.customizeInfo,
                linkData: [],
                taskNameSearch: "", // 搜索的任务名称
                taskTypeSearch: "", // 搜索的任务类型
                taskStatusSearch: "", // 搜索的任务状态
                resourceType: "", // 资源type
                resourceableId: "", // 资源id
                user: {}, // 个人信息
                isLoading:true,
                my:'',
                tabNumber:Number(localStorage.getItem('tabNumber')) || 1 ,
                periods:[],
                totalNumber:undefined,
                totalNumberCurrent:0,
                finishedNumber:0,
                sevenDaysNumber:0,
                goalList:[],
                averageNumber:0,
                tabStatus:0,
                goalRanger:config.goalRanger,
                goalRange:'',
                departmentId:'',
                keyword:'',
                periodSelected:'',
                finishedGoalNum:undefined,
                recentUpdateNum:undefined,
                finishedGoalAve:undefined,
                percent:undefined,
                submitLoading:false,
                countLoading:false,
            };
        },
        created() {
            this.periodSelected = Number(localStorage.getItem('periodSelected'))
            this.getPeriods()
            this.getGoal()
        },
        mounted() {

        },
        computed:{
            goalTypeHandler(){
                switch(this.tabNumber){
                    case 1:
                        if(this.percent > 50){
                            return ['你已打败本部门','你真棒']
                        }else{
                            return ['你已打败本部门','你得加油']
                        }
                        break
                    case 2:
                    if(this.percent > 50){
                            return ['本部门已打败','的其他部门,你真棒']
                        }else{
                            return ['本部门已打败','的其他部门,你得加油']
                        }
                        break;
                    case 3:
                    
                        return ['今年较去年目标完成度同期增长']
                }
            },
              ...mapState([
            'department',
        ]),
        _department () {
            return this.department
        }
        },
        methods: {
          
            getGoalNum(){
                this.countLoading = true
                fetch('get',`/aims/count?period_id=${this.periodSelected}&tab=${this.tabNumber}`).then((params) => {
                    this.totalNumber = params.data.total
                    this.finishedGoalNum = params.data.complete_count
                    this.finishedGoalAve = params.data.percentage_avg
                    this.recentUpdateNum = params.data.latest_count
                    this.percent = params.data.percent
                    this.totalHandler()
                    this.countLoading = false
                })
            },
            filterHandler(params,type){
                if(type === 'periodSelected'){
                    localStorage.setItem('periodSelected',params)
                }
                this[type] = params
                this.getGoal()
            },
            tabStatusHandler(params){
                this.tabStatus = params
                this.getGoal()
            },
            goDetail(params){
                 this.$router.push('/my/goal/' + params)
            },
            getProjects: function (pageNum = 1, signStatus) {
                let _this = this
                let data = {
                    page: pageNum,
                    // include: 'principal,trail.expectations',
                    // status:this.pageType
                };
                fetch('get','aims', data).then(response => {
                    _this.projectsInfo = response.data
                    _this.total = Number(response.meta.pagination.total);
                    _this.current_page = Number(response.meta.pagination.current_page);
                    _this.total_pages = Number(response.meta.pagination.total_pages);
                })
            },
            getGoal(){
                let data = {
                    tab : this.tabNumber,
                    status : this.tabStatus,
                    range : this.goalRange,
                    department_id:this.departmentId.id,
                    principal_id:this.principalId,
                    keyword : this.keyword,
                    period_id:this.periodSelected
                }
                this.getGoalNum()
                fetch('get','aims',data).then((params) => {
                    this.goalList = params.data
                    this.total = Number(params.meta.pagination.total);
                    this.current_page = Number(params.meta.pagination.current_page);
                    this.total_pages = Number(params.meta.pagination.total_pages);
                })
            },
            submitDone(){
                $('#goals-add').modal('hide')
            },
            totalHandler(){
                this.totalNumberCurrent += 7
                if(this.totalNumberCurrent+7 < this.totalNumber){
                    setTimeout(() => {
                        this.totalHandler()
                    }, 1);
                }else{
                    this.totalNumberCurrent = this.totalNumber
                }
                setTimeout(() => {
                    if(this.totalNumber > 0){
                        this.finishedNumber = (this.finishedGoalNum/this.totalNumber)*100 + '%'
                        this.sevenDaysNumber = (this.recentUpdateNum/this.totalNumber)*100 +'%'
                    }else{
                        this.finishedNumber = 0
                        this.sevenDaysNumber = 0
                    }
                    this.averageNumber = this.finishedGoalAve + '%'
                }, 500);
            },
            tabHandler(params){
                localStorage.setItem('tabNumber',params)
                this.tabNumber = params
                this.getGoal()

            },
            getPeriods(){
                fetch('get','/periods/all').then((params) => {
                    this.periods = params
                })
            },
        }
    };
</script>
<style scoped>
.goals-add{
    position: relative;
    width: 100px;
    height: 30px;
    right: 50px;
    bottom: 30px;
    font-size: 16px;
    background-color: #3f51b5;
    color: #fff;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
.goals-range{
    position: relative;
    line-height: 30px;
    cursor: pointer;
    font-size: 16px;
    right: 20px;
    bottom: 30px;
}
.progress-bar-test{
    font-size: 10px;
}
.total-goals-logo{
    background-image: url('../../assets/img/project_total.png');
    width: 100px;
    height: 100px;
    background-size: 100%;
    /* margin:10px 0 0 15%;
     */
     /* margin-left:5%; */
     margin:0 auto;
    margin-top: 10px;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
    color: #3f51b5;
    font-weight: 600;
}
.total-goals-title{
    font-size: 10px;
    text-align: center;
    /* margin-left: 5px; */
    margin-top: 5px;
    width:100%;
}
.goals-percent-logo{
    background-image:url('../../assets/img/goals_percent.png');
    width:80px;
    height:80px;
    margin: 10px 0 0 20px;
    font-size: 20px;
    font-weight: 600;
    line-height: 80px;
    text-align: center;
    color: #ff9800;
    background-size: contain;
}
.panel{
    box-shadow: 0 0 0 0;
}

.page-item{
    cursor: pointer;
}
table tbody tr {
    cursor: pointer;
}
td{
    text-align: center;
}
th{
    text-align: center;

}
</style>

