<template>
   <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的项目</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getTasks(1,1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab">所有项目</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getDate(1,2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getDate(1,3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">我参与的</a>
                        </li>
                        
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active pt-20" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                                data-child="tr"
                                data-selectable="selectable" >
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">项目名称</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">项目状态</th>
                                <th class="cell-300" scope="col">合作类型</th>
                                <th class="cell-300" scope="col">优先级</th>
                                <th class="cell-300" scope="col">跟进时间</th>
                            </tr>
                            <tbody>
                            <tr v-for="item in projectInfo" :key="item.id">
                                <td class="pointer-content" @click="projectDetail(item.id)">
                                    {{item.title}}
                                </td>
                                <td >{{item.principal.data.name}}</td>
                                <td>
                                    <template v-if="item.status === 1"><span style="color:#FF9800">进行中</span></template>
                                    <template v-if="item.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                    <template v-if="item.status === 3"><span style="color:#9E9E9E">撤单</span></template>
                                    
                                </td>
                                <td v-if="item.trail">
                                    <template v-if="item.trail.data.cooperation_type ==1">
                                        代言 
                                    </template>
                                    <template v-if="item.trail.data.cooperation_type ==2">
                                        合作 
                                    </template>
                                        <template v-if="item.trail.data.cooperation_type ==3">
                                        活动 
                                    </template>
                                    <template v-if="item.trail.data.cooperation_type ==4">
                                        微博 
                                    </template>
                                        <template v-if="item.trail.data.cooperation_type ==5">
                                        抖音 
                                    </template>
                                        <template v-if="item.trail.data.cooperation_type ==6">
                                        短期代言 
                                    </template>
                                        <template v-if="item.trail.data.cooperation_type ==7">
                                        时装周 
                                    </template>
                                        <template v-if="item.trail.data.cooperation_type ==8">
                                        未确定 
                                    </template>
                                </td>
                                <td v-if="!item.trail"></td>
                                <td v-if="item.priority">
                                    <template v-if="item.priority === 1">高</template>
                                    <template v-if="item.priority === 2">中</template>
                                    <template v-if="item.priority === 3">低</template>
                                </td>
                                <td>
                                    {{item.last_follow_up_at}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                            <div class="col-md-1" style="margin: 6rem auto"  v-if="projectInfo.length==0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                            </div>
                        <template>
                            <Pagination :current_page="current_page" :method="getTasks" :total_pages="total_pages"
                                        :total="total"></Pagination>
                        </template>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
import fetch from '../../assets/utils/fetch.js';
import config from '../../assets/js/config';
export default {
  name: '',
  data () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                participants: [],
                multiple: false,
                taskIntroduce: '',
                startTime: '',
                startMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                tasksInfo: '',
                taskStatus: 0,
                newTask: {},
                taskType: '',
                taskFinishType: '',
                taskName: '',
                taskLevel: '',
                taskLevelArr: config.taskLevelArr,
                taskTypeArr: config.taskTypeArr,
                customizeInfo: config.customizeInfo,
                projectStatus:1,//项目区别
                projectInfo:'',
                myType:''
            }


        },

  mounted() {
    this.getTasks();
    this.getDate();
 
  },

  methods: {
            getTasks: function (page = 1,signStatus) {
                let data={
                    include:'principal,trail.expectations',
                    status:this.projectStatus
                }
                let _this = this;
                // if(signStatus){
                //     this.projectStatus = signStatus
                // }
                fetch('get', '/projects/my_all', data).then(function (response) {
                    console.log(response.data)
                    _this.projectInfo = response.data;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                });
            },
            getDate: function (page = 1,type) {
                let data={
                    include:'principal,trail.expectations',
                    // status:this.projectStatus,
                   
                }
                let _this = this;
                if(type){
                    this.myType = type
                }
                data.type=this.myType
                fetch('get', '/projects/my', data).then(function (response) {
                    console.log(response.data)
                    _this.projectInfo = response.data;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                });
            },
            projectDetail(projectId){
                this.$router.push({path: '/projects/' + projectId})
            },
            customize (value) {
                console.log(value)
            },

            changeLinkage (value) {
                console.log(value)
            },

            changeTaskType (value) {
                this.taskType = value
            },

            principalChange (value) {
                this.principal = value
            },

            participantChange (value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id)
                }
                this.participants = flagArr
            },

            changeTaskLevel (value) {
                this.taskLevel = value
            },

            changeStartTime (value) {
                this.startTime = value
            },

            changeStartMinutes (value) {
                this.startMinutes = value
            },

            changeEndTime (value) {
                this.endTime = value
            },

            changeEndMinutes (value) {
                this.endMinutes = value
            },
    },

    };

    </script>
    <style>
    .panel{
        box-shadow: 0 0 0 0;
    }
    </style>

