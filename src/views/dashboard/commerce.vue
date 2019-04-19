<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered mb-0">
            <h1 class="page-title">{{DashboardName}}</h1>
        </div>
        <div class="page-content container-fluid px-20">
                <div class="tab  my-20 " style="display:flex">
                        <div class="task mx-20" data-plugin="actionBtn" data-toggle="modal" @click="addTask">创建任务</div>
                        <div class="target mx-20" @click="addGoal">创建目标</div>
                        <div class="schedule mx-20" data-plugin="actionBtn" data-toggle="modal" @click="addCalendar">创建日程</div>
                </div>
                <div class="clearfix  mt-30">
                    <div class="panel mb-0 ml-0 exhibition-panel" style="background:#fff;height:400px; position: relative;">
                        <div  class="circular m-30">
                                <span>{{Tasktotal}}</span>
                                <div>所有任务数</div>
                        </div>
                        <div class="example-wrap" style="width:200px">
                        
                        <div class="progress progress-sm mb-0">
                          <div class="progress-bar progress-bar-indicating active" :style="{width:TaskPercentage}" role="progressbar"></div>
                        </div>
                       
                        <h5 class="m-0"><font style="vertical-align: inherit;font-size:12px"><font style="vertical-align: inherit;">已完成<span style="color:rgb(5, 169, 219);">{{Taskcompleted}}</span>个
                           </font><i class="pl-70" style="font-style:normal">待完成{{Taskprogressing}}个</i></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                          <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:TaskDelay}"></div>
                        </div>
                        <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;font-size:12px">延期<span style="color:rgb(5, 169, 219);">{{Taskdelayed}}个</span>
                           </font></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                          <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:TaskPercentage}"></div>
                        </div>
                         <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">近7天新增<span style="color:rgb(5, 169, 219);">{{Taskcompleted}}</span>
                           </font></font>
                        </h5>
                      </div>
                    </div>
                    <div class="panel mb-0 ml-0 task-panel" style="background:#fff;height:400px;">
                        <div class="mx-30 py-10 title-wrap" style="border-bottom: 1px solid #eee; position: relative;"> 
                            <h5>任务</h5>
                            <span style="position: absolute;right:10px;top:15px;" @click="tasklist" class="view-more">查看更多</span>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0" >
                            <div class="list-wrap" v-for="(item,index) in DashboardTask" :key="index">
                                <div class="flex" @click="taskdetail(item.id)">
                                     <Avatar :imgUrl="item.avatar" style="margin-right: 10px; "/>
                                    {{item.name}}
                                </div>
                                <div class="">{{item.created_at}}</div>
                            </div>
                            <div style="margin: 6rem auto;width: 100px" v-if="DashboardTask.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>

                </div>
                 <div class="clearfix mt-30">
                    <div class="panel mb-0 ml-0 exhibition-panel" style="background:#fff;height:400px; position: relative;">
                        <div  class="circular m-30">
                                <span>{{ProjectTotal}}</span>
                                <div>所有项目数</div>
                        </div>
                        <div class="example-wrap" style="width:200px">
                        
                        <div class="progress progress-sm mb-0">
                          <div class="progress-bar progress-bar-indicating active" :style="{width:parseInt(this.Projectprogressing/this.ProjectTotal*100)+ '%'}" role="progressbar" v-if="ProjectTotal!=0"></div>
                          <div class="progress-bar progress-bar-indicating active" style="width:0%" role="progressbar" v-else-if="ProjectTotal=0"></div>
                        </div>
                       
                        <h5 class="m-0"><font style="vertical-align: inherit;font-size:12px"><font style="vertical-align: inherit;">近7天跟进<span style="color:rgb(5, 169, 219);">{{Projectprogressing}}个</span>
                           </font><i class="pl-60" style="font-style:normal">未跟进{{projectNot}}个</i></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                          <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:ProjectPercentage}"></div>
                        </div>
                        <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;font-size:12px">已完成<span style="color:rgb(5, 169, 219);">{{Projectcompleted}}个</span>
                           </font></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                          <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:ProjectSign}"></div>
                        </div>
                         <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">已签约<span style="color:rgb(5, 169, 219);">{{Projectsigned}}个</span>
                           </font></font>
                        </h5>
                      </div>
                    </div>
                    <div class="panel mb-0 ml-0 task-panel" style="background:#fff;height:400px;">
                        <div class="mx-30 py-10 title-wrap" style="border-bottom: 1px solid #eee; position: relative;"> 
                            <h5>项目</h5>
                            <span style="position: absolute;right:10px;top:15px;" @click="projectlist" class="view-more">查看更多</span>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0" >
                            <div class="list-wrap" v-for="(item,index) in DashboardProjects" :key="index">
                                <div class="flex" @click="projectdetail(item.id)">
                                    <Avatar :imgUrl="item.avatar" style="margin-right: 10px; "/>
                                    {{item.name}}
                                </div>
                                <div class="">{{item.created_at}}</div>
                            </div>
                            <div style="margin: 6rem auto;width: 100px" v-if="DashboardProjects.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="clearfix mt-30">
                    <div class="panel mb-0 ml-0 exhibition-panel" style="background:#fff;height:400px; position: relative;">
                        <div  class="circular m-30">
                                <span>{{ClientTotal}}</span>
                                <div>所有客户数</div>
                        </div>
                        <div class="example-wrap" style="width:200px">
                        
                        <div class="progress progress-sm mb-0">
                            <div class="progress-bar progress-bar-indicating active" :style="{width:parseInt(this.Clientlatest_follow/this.ClientTotal*100)+ '%'}" role="progressbar" v-if="ClientTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active" style="width:0%" role="progressbar" v-else-if="ClientTotal== 0"></div>
                        </div>
                       
                        <h5 class="m-0"><font style="vertical-align: inherit;font-size:12px"><font style="vertical-align: inherit;">近7天跟进<span style="color:rgb(5, 169, 219);">{{Clientlatest_follow}}个</span>
                           </font><i class="pl-60" style="font-style:normal">未跟进{{clientNot}}个</i></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:parseInt(this.Clientwith_trail/this.ClientTotal*100)+ '%'}" v-if="ClientTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active" style="width:0%" role="progressbar" v-else-if="ClientTotal== 0"></div>
                        </div>
                        <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;font-size:12px">近7天关联线索<span style="color:rgb(5, 169, 219);">{{Clientwith_trail}}个</span>
                           </font></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:parseInt(this.Clientwith_project/this.ClientTotal*100)+ '%'}" v-if="ClientTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active" style="width:0%" role="progressbar" v-else-if="ClientTotal== 0"></div>
                        </div>
                         <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">近7天关联项目<span style="color:rgb(5, 169, 219);">{{Clientwith_project}}个</span>
                           </font></font>
                        </h5>
                      </div>
                    </div>
                    <div class="panel mb-0 ml-0 task-panel" style="background:#fff;height:400px;">
                        <div class="mx-30 py-10 title-wrap" style="border-bottom: 1px solid #eee; position: relative;"> 
                            <h5>客户</h5>
                            <span style="position: absolute;right:10px;top:15px;" @click="clientlist" class="view-more">查看更多</span>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0" >
                            <div class="list-wrap" v-for="(item,index) in DashboardClients" :key="index">
                                <div class="flex" @click="clientdetail(item.id)">
                                    <Avatar :imgUrl="item.avatar" style="margin-right: 10px; "/>
                                    {{item.name}}
                                </div>
                                <div class="">{{item.created_at}}</div>
                            </div>
                            <div style="margin: 6rem auto;width: 100px" v-if="DashboardClients.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>

                </div>
                 <div class="clearfix mt-30">
                    <div class="panel mb-0 ml-0 exhibition-panel" style="background:#fff;height:400px; position: relative;">
                        <div  class="circular m-30">
                                <span>{{StarTotal}}</span>
                                <div>所有艺人数</div>
                        </div>
                        <div class="example-wrap" style="width:200px">
                        
                        <div class="progress progress-sm mb-0">
                            <div class="progress-bar progress-bar-indicating active" :style="{width:parseInt(this.Starlatest_follow/this.StarTotal*100)+ '%'}" role="progressbar" v-if="StarTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" style="width:0%" v-else-if="StarTotal=0"></div>
                        </div>
                       
                        <h5 class="m-0"><font style="vertical-align: inherit;font-size:12px"><font style="vertical-align: inherit;">近7天跟进<span style="color:rgb(5, 169, 219);">{{Starlatest_follow}}个</span>
                           </font><i class="pl-60" style="font-style:normal">未跟进{{starNot}}个</i></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:parseInt(this.Starwith_trail/this.StarTotal*100)+ '%'}" v-if="StarTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" style="width:0%" v-else-if="StarTotal=0"></div>
                        </div>
                        <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;font-size:12px">近7天关联线索<span style="color:rgb(5, 169, 219);">{{Starwith_trail}}个</span>
                           </font></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:parseInt(this.Starwith_project/this.StarTotal*100)+ '%'}" v-if="StarTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" style="width:0%" v-else-if="StarTotal=0"></div>
                        </div>
                         <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">近7天关联项目<span style="color:rgb(5, 169, 219);">{{Starwith_project}}个</span>
                           </font></font>
                        </h5>
                      </div>
                    </div>
                    <div class="panel mb-0 ml-0 task-panel" style="background:#fff;height:400px;">
                        <div class="mx-30 py-10 title-wrap" style="border-bottom: 1px solid #eee; position: relative;"> 
                            <h5>艺人</h5>
                            <span style="position: absolute;right:10px;top:15px;" @click="starlist" class="view-more">查看更多</span>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0" >
                            <div class="list-wrap" v-for="(item,index) in DashboardStars" :key="index">
                                <div class="flex" @click="stardetail(item.id)">
                                    <Avatar :imgUrl="item.avatar" style="margin-right: 10px; "/>
                                    {{item.name}}
                                </div>
                                <div class="">{{item.created_at}}</div>
                            </div>
                            <div style="margin: 6rem auto;width: 100px" v-if="DashboardStars.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="clearfix mt-30">
                    <div class="panel mb-0 ml-0 exhibition-panel" style="background:#fff;height:400px; position: relative;">
                        <div  class="circular m-30">
                                <span>{{BloggerTotal}}</span>
                                <div>所有博主数</div>
                        </div>
                        <div class="example-wrap" style="width:200px">
                        
                        <div class="progress progress-sm mb-0">
                            <div class="progress-bar progress-bar-indicating active" :style="{width:parseInt(this.Bloggerlatest_follow/this.BloggerTotal*100)+ '%'}" role="progressbar" v-if="BloggerTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" style="width:0%" v-else-if="BloggerTotal=0"></div>
                        </div>
                       
                        <h5 class="m-0"><font style="vertical-align: inherit;font-size:12px"><font style="vertical-align: inherit;">近7天跟进<span style="color:rgb(5, 169, 219);">{{Bloggerlatest_follow}}个</span>
                           </font><i class="pl-60" style="font-style:normal">未跟进{{BloggerNot}}个</i></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:parseInt(this.Bloggerwith_trail/this.BloggerTotal*100)+ '%'}" v-if="BloggerTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" style="width:0%" v-else-if="BloggerTotal=0"></div>
                        </div>
                        <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;font-size:12px">近7天关联线索<span style="color:rgb(5, 169, 219);">{{Bloggerwith_trail}}个</span>
                           </font></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" :style="{width:parseInt(this.Bloggerwith_project/this.BloggerTotal*100)+ '%'}" v-if="BloggerTotal!=0"></div>
                            <div class="progress-bar progress-bar-indicating active"  role="progressbar" style="width:0%" v-else-if="BloggerTotal=0"></div>
                        </div>
                         <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">近7天关联项目<span style="color:rgb(5, 169, 219);">{{Bloggerwith_project}}个</span>
                           </font></font>
                        </h5>
                      </div>
                    </div>
                    <div class="panel mb-0 ml-0 task-panel" style="background:#fff;height:400px;">
                        <div class="mx-30 py-10 title-wrap" style="border-bottom: 1px solid #eee; position: relative;"> 
                            <h5>博主</h5>
                            <span style="position: absolute;right:10px;top:15px;" @click="bloggerlist" class="view-more">查看更多</span>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0" >
                            <div class="list-wrap" v-for="(item,index) in DashboardBloggers" :key="index">
                                <div class="flex" @click="bloggerdetail(item.id)">
                                    <Avatar :imgUrl="item.avatar" style="margin-right: 10px;"/>
                                    {{item.name}}
                                </div>
                                <div class="">{{item.created_at}}</div>
                            </div>
                            <div style="margin: 6rem auto;width: 100px" v-if="DashboardBloggers.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>

                </div>
        </div>
        <!-- <div class="modal fade"
             id="addTask"
             aria-hidden="true"
             aria-labelledby="addLabelForm"
             role="dialog"
             data-backdrop="static"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增任务</h4>
                    </div>
                     <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                <normal-linkage-selectors ref="linkage" v-if="linkData.length>0" :myData="linkData"
                                                          :data="linkData"
                                                          @change="addLinkage"></normal-linkage-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors :options="taskTypeArr" ref="taskType"
                                           @change="changeTaskType"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称" v-model="taskName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人</div>
                            <div class="col-md-5 float-left pl-0">
                                <InputSelectors :placeholder="'请选择负责人'" @change="principalChange"></InputSelectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <AddMember @change="participantChange"></AddMember>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0 require">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors
                                        :options="priorityArr"
                                        @change="changeTaskLevel"
                                        ref="taskLevel"
                                ></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker ref="startTime" @change="changeStartTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                 <TimeChoice @change="changeStartMinutes" ref="startMinutes"></TimeChoice>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker ref="endTime" @change="changeEndTime" :startDate="startTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <TimeChoice @change="changeEndMinutes" ref="endMinutes"></TimeChoice>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务说明</div>
                            <div class="col-md-10 float-left pl-0">
                        <textarea class="form-control"
                          name="taskDescription"
                          id
                          cols="30"
                          rows="5"
                          title
                          v-model="taskIntroduce"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addtask">确定</button>
                    </div>
                </div>
            </div>
        </div> -->
         <div class="modal fade line-center" id="changeSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <div style="order: 2">
                            <span class="pointer-content hover-content mr-4" data-toggle="modal"
                                  data-target="#addLinkage">关联</span>
                            <i class="iconfont icon-guanbi pointer-content" aria-hidden="true" data-dismiss="modal"></i>
                        </div>
                        <h5 class="modal-title">
                            <template v-if="scheduleType === 'add'">
                                <h4 class="modal-title">新建日程</h4>
                            </template>
                            <template v-else>
                                <h4 class="modal-title">修改日程</h4>
                            </template>
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">标题</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入标题"
                                       v-model="scheduleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">日历</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="calendarList" ref="calendarSelector"
                                           @change="selectScheduleCalendar"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime" ref="scheduleStartDate"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-show="!isScheduleAllday">
                                <TimeChoice @change="changeStartMinutes" ref="scheduleStartMinute"></TimeChoice>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left line-fixed-height require">结束时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime" ref="scheduleEndDate"
                                            :startDate="startTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-show="!isScheduleAllday">
                                <TimeChoice @change="changeEndMinutes" ref="scheduleEndMinute"></TimeChoice>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="isScheduleAllday" @change="changeIsAllDay"
                                           v-model="isScheduleAllday">
                                    <label for="isScheduleAllday">全天</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix py-10">
                            <div class="col-md-2 text-right float-left line-fixed-height">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <AddMember type="add"></AddMember>
                            </div>
                        </div>
                        <div class="my-10 clearfix"
                             v-show="linkageSelectedIds.projects.length > 0 || linkageSelectedIds.tasks.length > 0">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="clearfix" v-for="(id,index) in linkageSelectedIds.projects" :key="index">
                                    <span class="float-left">
                                        项目 - {{ allProjectsInfo.find(item => item.id == id).title }}
                                    </span>
                                    <span class="float-right icon iconfont icon-shanchu1"
                                          @click="delNewScheduleLinkage('projects', id)"></span>
                                </div>
                                <div class="clearfix" v-for="(id,index) in linkageSelectedIds.tasks" :key="index">
                                    <span class="float-left">
                                        任务 - {{ allTasksInfo.find(item => item.id == id).title }}
                                    </span>
                                    <span class="float-right icon iconfont icon-shanchu1"
                                          @click="delNewScheduleLinkage('tasks', id)"></span>
                                </div>
                            </div>
                        </div>
                        <div v-show="showMore">
                            <div class="pt-10 mb-20 clearfix">
                                <div class="col-md-2 text-right float-left line-fixed-height">资源</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="allMeetingRomeList" ref="scheduleResource"
                                               @change="changeScheduleMaterial"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">提醒</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="remindArr" ref="scheduleRemind"
                                               @change="changeScheduleRemind"></selectors>
                                </div>
                            </div>
                            <div class="clearfix my-20">
                                <div class="col-md-2 text-right float-left line-fixed-height">重复</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="repeatArr" ref="scheduleRepeat"
                                               @change="changeScheduleRepeat"></selectors>
                                </div>
                                <div class="col-md-2 float-left"></div>
                                <div class="col-md-10 float-left pl-0 font-12 mt-5" style="color: #c3c3c3">重复周期为1年</div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">位置</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" class="form-control" title="" v-model="eventPlace">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">备注</div>
                                <div class="col-md-10 float-left pl-0">
                                    <textarea class="form-control" title="" v-model="eventDesc"></textarea>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="col-md-2 text-right float-left"></div>
                                <div class="col-md-10 float-left pl-0">
                                    <div class="checkbox-custom checkbox-primary">
                                        <input type="checkbox" id="onlyParticipantVisible" v-model="schedulePrivacy">
                                        <label for="onlyParticipantVisible">仅参与人可见</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pointer-content hover-content mt-20" @click="isShowMore">
                            <div class="col-md-2 float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <template v-if="showMore">隐藏更多选项</template>
                                <template v-else>添加更多选项</template>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" >取消
                        </button>
                        <template v-if="scheduleType === 'add'">
                            <button class="btn btn-primary" type="submit" @click="addSchedule">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addLinkage" aria-hidden="true" aria-labelledby="addLabelForm"
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
                            <div class="nav-tabs-vertical" data-plugin="tabs" style="margin: 0 -20px -30px  -20px ">
                                <ul class="nav nav-tabs nav-tabs-line mr-25" role="tablist">
                                    <li class="nav-item" role="presentation" @click="selectProjectLinkage('project')">
                                        <a class="nav-link active" data-toggle="tab" href="#projectsPane"
                                           aria-controls="exampleTabsLineLeftOne" role="tab" aria-selected="false">
                                            项目</a>
                                    </li>
                                    <li class="nav-item" role="presentation" @click="selectProjectLinkage('task')">
                                        <a class="nav-link" data-toggle="tab" href="#tasksPane"
                                           aria-controls="exampleTabsLineLeftOne" role="tab" aria-selected="false">
                                            任务</a>
                                    </li>
                                </ul>
                                <div class="tab-content" style="max-height: 70vh;overflow-y: auto">
                                    <div class="tab-pane active" id="projectsPane" role="tabpanel">
                                        <div class="input-search mb-20" style="width: 70%">
                                            <button type="submit" class="input-search-btn">
                                                <i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" class="form-control" name="" placeholder="搜索关键字..."
                                                   v-model="searchKeyWord">
                                        </div>
                                        <ul class="nav">
                                            <li class="nav-link pointer-content" style="width: 95%"
                                                v-for="(project,index) in allProjectsInfo" :key="index"
                                                v-show="project.title.indexOf(searchKeyWord) > -1"
                                                @click="selectResource('projects', project.id)">{{ project.title }}
                                                <span class="float-right"
                                                      v-show="linkageSelectedIds.projects.indexOf(project.id) > -1">
                                                    <i class="md-check"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane" id="tasksPane" role="tabpanel">
                                        <div class="input-search mb-20" style="width: 70%">
                                            <button type="submit" class="input-search-btn">
                                                <i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" class="form-control" name="" placeholder="搜索关键字..."
                                                   v-model="searchKeyWord">
                                        </div>
                                        <ul class="nav">
                                            <li class="nav-link pointer-content" style="width: 95%"
                                                v-for="(task,index) in allTasksInfo" :key="index"
                                                v-show="task.title.indexOf(searchKeyWord) > -1"
                                                @click="selectResource('tasks', task.id)">{{ task.title }}
                                                <span class="float-right"
                                                      v-show="linkageSelectedIds.tasks.indexOf(task.id) > -1">
                                                    <i class="md-check"></i>
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
        <AddTask />
        <addGoals :goalperiod='periods.data' @submitDone='submitDone'/>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import fetch from '../../assets/utils/fetch.js'
    import config from "../../assets/js/config";
    import addGoals from "../goal/addGoals"
    export default {
        data(){
            return{
                DashboardInfo:'',
                DashboardName:'',//仪表盘名称
                DashboardId:'',//仪表盘id
                DashboardTask:'',//仪表盘任务信息
                DashboardStars:'',//仪表盘艺人信息
                DashboardBloggers:'',//仪表盘博主信息
                DashboardClients:'',//仪表盘客户信息
                DashboardProjects:'',//仪表盘项目信息
                Tasktotal:'',//任务总数
                Taskcompleted:'',//任务完成
                Taskprogressing:'',//任务进展
                Taskdelayed:'',//任务延期
                ProjectTotal:'',//项目总数
                Projectcompleted:'',//项目完成
                Projectprogressing:'',//项目进展
                Projectsigned:'',//项目签署
                ClientTotal:'',//客户总数
                Clientwith_trail:'',//客户关联线索
                Clientlatest_follow:'',//客户最近跟进
                Clientwith_project:'',//客户关联项目
                StarTotal:'',//艺人总数
                Starwith_trail:'',//艺人关联线索
                Starlatest_follow:'',//艺人最近跟进
                Starwith_project:'',//艺人关联项目
                BloggerTotal:'',//博主总数
                Bloggerwith_trail:'',//博主关联线索
                Bloggerlatest_follow:'',//博主最近跟进
                Bloggerwith_project:'',//博主关联项目
                taskTypeArr: [],
                taskType: "",
                taskName: "",
                principal:'',
                participants:[],
                priorityArr:config.priorityArr,
                taskLevel: "",
                startTime: "",
                startMinutes: "00:00",
                endTime: "",
                endMinutes: "",
                taskIntroduce: "",
                linkData: [],
                scheduleType: 'add',
                scheduleName: '',
                calendarList: [],
                scheduleCalendar: '',
                isScheduleAllday: 0,
                linkageSelectedIds: {
                    projects: [],
                    tasks: []
                },
                showMore: false,
                meetingRomeList: '',
                allMeetingRomeList: '',
                scheduleMaterialId: '',
                remindArr: config.remindArr,
                scheduleRemind:'',
                repeatArr: config.repeatArr,
                scheduleRepeat: 0,
                eventPlace: '',
                eventDesc: '',
                schedulePrivacy: false,
                allTasksInfo: '',
                allProjectsInfo: '',
                searchKeyWord: '',
                isLoading: false,
                periods:[],
            }
        },
        created(){
            this.getName()
            // this.getLinkData()
            this.getPeriods()
            this.init()
        },
        mounted(){
            this.getResources();
            this.getCalendarList()
            this.selectProjectLinkage()
         
            this.user = JSON.parse(Cookies.get('user'))
                // 负责人默认值的设置
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            })
            // $('#addTask').on('hidden.bs.modal', () => {
            //     // 清空state
            //     this.closeAddTask()
            // })
          
            let _this = this;
            $('#changeSchedule').on('hidden.bs.modal', function () {
                _this.initAddScheduleModal();
            });
            $('#changeSchedule').on('show.bs.modal', function () {
                _this.setTime()
            });
        },
        watch: {
        '$route' (to, from) { //监听路由是否变化
            if(this.$route.query.id){//判断id是否有值
               this.init() 
              
            }
        },
         dashboardList:function(){
                this.init() 

            }
        },
        computed:{
            TaskPercentage:function(){
                if(this.Tasktotal!=0){
                    return parseInt(this.Taskcompleted/this.Tasktotal*100)+ '%'
                }else{
                    return 0 + '%'
                } 
            },
            TaskDelay:function(){
                if(this.Tasktotal!=0){
                    return parseInt(this.Taskdelayed/this.Tasktotal*100)+ '%'
                }else{
                    return 0 + '%'
                }  
            },
            projectNot:function(){
                return this.ProjectTotal - this.Projectprogressing
            },
            ProjectSign:function(){
                if(this.ProjectTotal!=0){
                    return parseInt(this.Projectsigned/this.ProjectTotal*100)+ '%'
                }else{
                    return 0 + '%'
                } 
            },
            ProjectPercentage:function(){
                if(this.ProjectTotal!=0){
                    return parseInt(this.Projectcompleted/this.ProjectTotal*100)+ '%'
                }else{
                    return 0 + '%'
                }     
            },
            clientNot:function(){
                return this.ClientTotal - this.Clientlatest_follow
            },
            starNot:function(){
                return this.StarTotal - this.Starlatest_follow
            },
            BloggerNot:function(){
                return this.BloggerTotal - this.Bloggerlatest_follow
            },
            ...mapState([
                'dashboardList',
            ]) 
        },
        components:{
            addGoals
        },
        methods:{
             getName:function(){
                this.DashboardName = this.$route.query.name
            },
            init:function(){
                if(this.$route.query.id){
                    this.getName()
                    this.getTask()
                    this.getStars()
                    // this.getBloggers()
                    this.getClients()
                    this.getProjects()
                    this.getTaskType()
                }else{ 
                  if(this.dashboardList.length>0){  
                      this.$router.push(`/dashboard?id=${this.dashboardList[0].id}&name=${this.dashboardList[0].name}`) }  
                } 
            },
                    
               
            //获取仪表盘任务信息
            getTask:function(){
                let _this = this
                  this.DashboardId = this.$route.query.id;
                fetch('get', '/departments/'+this.DashboardId +'/dashboard/tasks').then(function (response) {  
                    _this.DashboardTask = response.data 
                    _this.Tasktotal = response.meta.count.total//总数
                    _this.Taskcompleted = response.meta.count.completed//完成
                    _this.Taskprogressing = response.meta.count.progressing//进展
                    _this.Taskdelayed = response.meta.count.delayed//延期
                })
            },
            //获取仪表盘艺人信息
            getStars:function(){
                let _this = this
                  this.DashboardId = this.$route.query.id;
                fetch('get', '/departments/'+this.DashboardId +'/dashboard/stars').then(function (response) {  
                    _this.DashboardStars = response.data
                    _this.StarTotal= response.meta.count.total//总数
                    _this.Starwith_trail = response.meta.count.with_trail//关联线索
                    _this.Starlatest_follow = response.meta.count.latest_follow//最近更新
                    _this.Starwith_project = response.meta.count.with_project//关联项目 
                })
            },
             //获取仪表盘博主信息
            getBloggers:function(){
                let _this = this
                  this.DashboardId = this.$route.query.id;
                fetch('get', '/departments/'+this.DashboardId +'/dashboard/bloggers').then(function (response) {  
                    _this.DashboardBloggers = response.data
                    _this.BloggerTotal= response.meta.count.total//总数
                    _this.Bloggerwith_trail = response.meta.count.with_trail//关联线索
                    _this.Bloggerlatest_follow = response.meta.count.latest_follow//最近更新
                    _this.Bloggerwith_project = response.meta.count.with_project//关联项目 
                })
            },
            //获取仪表盘客户信息
            getClients:function(){
                let _this = this
                  this.DashboardId = this.$route.query.id;
                fetch('get', '/departments/'+this.DashboardId +'/dashboard/clients').then(function (response) {  
                    _this.DashboardClients = response.data 
                    _this.ClientTotal= response.meta.count.total//总数
                    _this.Clientwith_trail = response.meta.count.with_trail//关联线索
                    _this.Clientlatest_follow = response.meta.count.latest_follow//最近更新
                    _this.Clientwith_project = response.meta.count.with_project//关联项目
                })
            },
             //获取仪表盘项目信息
            getProjects:function(){
                let _this = this
                  this.DashboardId = this.$route.query.id;
                fetch('get', '/departments/'+this.DashboardId +'/dashboard/projects').then(function (response) {  
                    _this.DashboardProjects = response.data 
                    _this.ProjectTotal = response.meta.count.total//总数
                    _this.Projectcompleted = response.meta.count.completed//完成
                    _this.Projectprogressing = response.meta.count.latest_follow//最近更新
                    _this.Projectsigned = response.meta.count.signed//签署
                    _this.isLoading = false;
                })
            },
            addTask:function(){
                $("#addTask").modal("show");
            },
            addCalendar:function(){
                $('#changeSchedule').modal("show")
            },
            addGoal:function(){
                $("#goals-add").modal("show"); 
            },
            //任务跳转详情
            taskdetail:function(taskId){
                this.$router.push({path: '/tasks/' + taskId})
            },
            tasklist:function(){
                this.$router.push({path: '/tasks'})
            },
             //项目跳转详情
            projectdetail:function(projectId){
                this.$router.push({path: '/projects/' + projectId})
            },
            projectlist:function(){
                this.$router.push({path: '/projects'})
            },
            clientdetail:function(clientId){
                this.$router.push({path: '/clients/' + clientId})
            },
            clientlist:function(){
                this.$router.push({path: '/clients'})
            },
            stardetail:function(starId){
                this.$router.push({path: '/artists/' + starId})
            },
            starlist:function(){
                this.$router.push({path: '/talent'})
            },
            bloggerdetail:function(bloggerId){
                this.$router.push({path: '/blogger/' + bloggerId})
            },
            bloggerlist:function(){
                this.$router.push({path: '/talent'})
            },
            // 获取任务类型列表
            getTaskType() {
                fetch('get', '/task_types').then(res => {
                    const data = res.data
                    this.taskTypeArr = data.map(n => {
                        return {name: n.title, value: n.id}
                    })
                    this.taskTypeArr.unshift({name: '全部', value: ''})
                })
            },
            changeTaskType(value) {
                this.taskType = value;
            },
            principalChange(value) {
                this.principal = value;
            },
            participantChange(value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id);
                }
                this.participants = flagArr;
            },
            changeTaskLevel(value) {
                this.taskLevel = value;
            },
            changeStartTime(value) {
                this.startTime = value;
            },

            changeStartMinutes(value) {
                this.startMinutes = value;
            },

            changeEndTime(value) {
                this.endTime = value;
            },

            changeEndMinutes(value) {
                this.endMinutes = value;
                console.log(this.endMinutes)
            },
            // addLinkage: function (type, value, id, index) {
            //     if (type === 'father') {
            //         this.getChildLinkData(value, index)
            //         this.resourceType = id
            //     } else if (type === 'child') {
            //         this.resourceableId = value
            //     }
            // },
            // getLinkData() {
            //     fetch('get', '/resources').then(res => {
            //         this.linkData = res.data.map((n, i) => {
            //             return {
            //                 name: n.title,
            //                 id: n.type,
            //                 value: n.code,
            //                 child: []
            //             }
            //         })
            //         this.linkData.unshift({
            //                 name: '暂不关联任何资源',
            //                 id: '',
            //                 value: '',
            //                 child: []
            //             })
            //         if (this.linkData[0].child.length === 0) {
            //             this.getChildLinkData('', 0)
            //         }
            //     })
            // },
            // // 获取关联子资源数据
            // getChildLinkData(url, index) {
            //     if (url) {
            //         let data = {}
            //         this.linkCode = url
            //         this.linkIndex = index

            //         let _url = url.substr(0, url.length - 1) + '/related'
            //         if (url === 'bloggers') {
            //             _url = url + '/all'
            //             data.sign_contract_status = 2
            //         }
            //         fetch('get', _url, data).then(res => {
            //             const temp = this.linkData[index]
            //             if (res.meta && res.meta.pagination) {
            //                 this.canLoadMore = true
            //                 this.linkTotalPage = res.meta.pagination.total_pages
            //             } else {
            //                 this.canLoadMore = false
            //             }
            //             temp.child = res.data.map(n => {
            //                 return {
            //                     name: n.name || n.nickname || n.title || n.company,
            //                     id: n.id,
            //                     value: n.id,
            //                 }
            //             })
            //             this.resourceableId = temp.child[0].id
            //             this.$set(this.linkData, index, temp)
            //             setTimeout(() => {
            //                 this.$refs.linkage.refresh()
            //             }, 100)
            //         })
            //     } else {
            //         const temp = this.linkData[index]
            //         temp.child = [{
            //             name: '暂不关联任何资源',
            //             id: '',
            //             value: '',
            //         }]
            //         this.resourceableId = temp.child[0].id
            //         this.$set(this.linkData, index, temp)
            //         setTimeout(() => {
            //             this.$refs.linkage.refresh()
            //         }, 100)
            //     }
            // },
            // addtask() {
              
            //     // 校验
            //     if (!this.taskName) {
            //         toastr.error('请填写任务名称！')
            //         return
            //     }
            //     if (!this.$store.state.newPrincipalInfo.id) {
            //         toastr.error('请选择负责人！')
            //         return
            //     }
            //     if (!this.taskType) {
            //         toastr.error('请选择任务类型！')
            //         return
            //     }
            //     if (!this.taskLevel) {
            //         toastr.error('请选择任务优先级！')
            //         return
            //     }
            //     if (!this.startTime || !this.endTime) {
            //         toastr.error('请选择时间!')
            //         return
            //     }
            //     if ((this.startTime + " " + this.startMinutes) > (this.endTime + " " + this.endMinutes)) {
            //         toastr.error('开始时间不能晚于截止时间');
            //         return
            //     }

            //     let participant_ids = [];
            //     for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
            //         participant_ids.push(this.$store.state.newParticipantsInfo[i].id);
            //     }

            //     let data = {
            //         // resource_type: this.resourceType ,
            //         // resourceable_id: this.resourceableId,
            //         type: this.taskType,
            //         title: this.taskName,
            //         principal_id: this.$store.state.newPrincipalInfo.id,
            //         participant_ids: participant_ids,
            //         priority: this.taskLevel,
            //         start_at: this.startTime + " " + this.startMinutes,
            //         end_at: this.endTime + " " + this.endMinutes,
            //         desc: this.taskIntroduce
            //     };

            //     if (this.resourceType) {
            //         data.resource_type = this.resourceType
            //     }
            //     if (this.resourceableId) {
            //         data.resourceable_id = this.resourceableId
            //     }

            //     fetch('post', '/tasks', data).then(res => {
            //         toastr.success("创建成功");
            //         $("#addTask").modal("hide");
            //         this.getTask()
            //     })
            // },
            // closeAddTask() {
            //     this.taskName = ''
            //     this.taskLevel = ''
            //     this.$refs.taskLevel.setValue('')
            //     this.taskType = ''
            //     this.$refs.taskType.setValue('')
            //     this.startTime = ''
            //     this.endTime = ''
            //     this.startMinutes = ''
            //     this.endMinutes = ''
            //     this.taskIntroduce = ''
            //     this.$refs.startTime.setValue('')
            //     this.$refs.startMinutes.setValue('0')
            //     this.$refs.endTime.setValue('')
            //     this.$refs.endMinutes.setValue('0')
            //     this.linkData = []
            //     this.getLinkData()
            //     this.setDefaultPrincipal()
            // },
            // // 设置默认负责人
            // setDefaultPrincipal() {
            //     this.$store.commit('changeNewPrincipal', {
            //         name: this.user.nickname,
            //         id: this.user.id
            //     })
            //     this.$store.commit('changeNewParticipantsInfo', [])
            // },
            selectScheduleCalendar: function (value) {
                this.scheduleCalendar = value
            },
            changeStartTime: function (value) {
                this.startTime = value
            },

            changeStartMinutes: function (value) {
                this.startMinutes = value
            },
            changeIsAllDay: function (e) {
                this.isScheduleAllday = Number(e.target.checked);
            },
            isShowMore: function () {
                this.showMore = !this.showMore
            },
             changeScheduleMaterial: function (value) {
                this.scheduleMaterialId = value;
            },
             getResources(type) {
                let data = {};
                if (type) {
                    data = {
                        type: type
                    };
                }
                fetch('get', '/materials/all', data).then(response => {
                    if (type) {
                        this.meetingRomeList = response.data;
                    } else {
                        this.allMeetingRomeList = response.data;
                    }
                })
            },
            changeScheduleRemind: function (value) {
                this.scheduleRemind = value
            },
            changeScheduleRepeat: function (value) {
                this.scheduleRepeat = value;
            },
            addSchedule: function () {
                let startTime = '';
                let endTime = '';
                if (this.isScheduleAllday) {
                    startTime = this.startTime;
                    endTime = this.endTime;
                } else {
                    startTime = this.startTime + ' ' + this.startMinutes;
                    endTime = this.endTime + ' ' + this.endMinutes;

                    if (startTime > endTime) {
                        toastr.error('开始时间不能晚于截止时间');
                        return
                    }

                    if (this.startTime === this.endTime) {
                        let startMinutesArr = this.startMinutes.split(':');
                        let endMinutesArr = this.endMinutes.split(':');
                        if (startMinutesArr[0] === endMinutesArr[0]) {
                            if ((Number(endMinutesArr[1]) - Number(startMinutesArr[1])) < 30) {
                                toastr.error('日程时间不能小于30分钟');
                                return
                            }

                        }
                    }
                }
                let data = {
                    title: this.scheduleName,
                    calendar_id: this.scheduleCalendar,
                    is_allday: Number(this.isScheduleAllday),
                    privacy: Number(this.schedulePrivacy),
                    start_at: startTime,
                    end_at: endTime,
                    repeat: this.scheduleRepeat,
                    desc: this.eventDesc,
                };
                if (this.eventPlace) {
                    data.position = this.eventPlace;
                }
                if (this.scheduleMaterialId) {
                    data.material_id = this.scheduleMaterialId;
                }
                if (this.$store.state.newParticipantsInfo) {
                    data.participant_ids = [];
                    let newParticipantsInfo = this.$store.state.newParticipantsInfo;
                    for (let i = 0; i < newParticipantsInfo.length; i++) {
                        data.participant_ids.push(newParticipantsInfo[i].id)
                    }
                }
                if (this.linkageSelectedIds.projects.length > 0) {
                    data.project_ids = this.linkageSelectedIds.projects;
                }
                if (this.linkageSelectedIds.tasks.length > 0) {
                    data.task_ids = this.linkageSelectedIds.tasks;
                }
                fetch('post', '/schedules', data).then(() => {
                    $('#changeSchedule').modal('hide');
                    toastr.success('添加成功')
                })
            },
            getCalendarList: function () {
                this.calendarList = [];
                let data = {};
                if (this.calendarTitle) {
                    data.title = this.calendarTitle
                }
                fetch('get', '/calendars/all', data).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        response.data[i].name = response.data[i].title;
                        response.data[i].value = response.data[i].id;
                        this.calendarList.push(response.data[i])
                    }
                    if (data.title) {
                        this.oldSelectedCalendar = this.selectedCalendar;
                        this.selectedCalendar = [];
                        for (let i = 0; i < response.data.length; i++) {
                            this.selectedCalendar.push(response.data[i].id)
                        }
                    } else {
                        this.selectedCalendar = this.oldSelectedCalendar;
                    }
                })

            },
             initAddScheduleModal: function () {
                this.showMore = false;
                this.$store.dispatch('changeParticipantsInfo', {data: []});
                this.scheduleName = '';
                this.scheduleCalendar = '';
                this.isScheduleAllday = 0;
                this.privacy = 1;
                this.startTime = '';
                this.startMinutes = '00:00';
                this.endTime = '';
                this.endMinutes = '00:00';
                this.eventPlace = '';
                this.scheduleRepeat = 0;
                this.scheduleMaterialId = '';
                this.eventDesc = '';
                this.isScheduleAllday = false;
                this.schedulePrivacy = false;
                this.scheduleType = 'add';
                this.linkageSelectedIds = {
                    projects: [],
                    tasks: []
                };
                this.$refs.calendarSelector.setValue('');
                this.$refs.scheduleStartDate.setValue('');
                this.$refs.scheduleEndDate.setValue('');
                this.$refs.scheduleStartMinute.setValue('0');
                this.$refs.scheduleEndMinute.setValue('0');
                this.$refs.scheduleResource.setValue('');
                this.$refs.scheduleRepeat.setValue('0');
                this.$refs.scheduleRemind.setValue('0');
            },
            setTime:function(){
                let now = new Date();
                let hour = now.getHours();
                let minutes = now.getMinutes();
                let remainder = minutes % 10;
                let start_minutes = minutes;
                let start_hour = hour;
                let end_minutes = '';
                let end_hour = hour;
                if (remainder) {
                    start_minutes = start_minutes - remainder + 10;
                    if (start_minutes === 60) {
                        start_minutes = 0;
                        start_hour += 1;
                        end_hour += 1;
                    }
                }
                if (start_minutes < 30) {
                    end_minutes = start_minutes + 30
                } else {
                    end_minutes = start_minutes + 30 - 60;
                    end_hour += 1
                }
                let alreadyRemainder = false;
                if (start_hour >= 24) {
                    start_hour -= 24;
                    alreadyRemainder = true;
                }
                let increment = false;
                if (end_hour >= 24) {
                    end_hour -= 24;
                    if (!alreadyRemainder) {
                        increment = true;
                    }
                }
                this.$refs.scheduleStartMinute.setValue((start_hour + ',' + start_minutes).split(','))
                this.$refs.scheduleEndMinute.setValue((end_hour + ',' + end_minutes).split(','))
            },
             selectProjectLinkage: function (value) {
                this.linkageResource = value;
                if (!this.allProjectsInfo) {
                    this.getAllProjects()
                }
                if (!this.allTasksInfo) {
                    this.getAllTasks()
                }
            },
            getAllProjects: function () {
                fetch('get', '/projects/all').then(response => {
                    this.allProjectsInfo = response.data
                })
            },

            getAllTasks: function () {
                fetch('get', '/tasksAll').then(response => {
                    this.allTasksInfo = response.data
                })
            },
            addLinkageResource: function () {
                $('#addLinkage').modal('hide');
                setTimeout(function () {
                    $('body').addClass('modal-open')
                }, 1000)
            },
            selectResource: function (type, value) {
                let index = this.linkageSelectedIds[type].indexOf(value);
                if (index > -1) {
                    this.linkageSelectedIds[type].splice(index, 1)
                } else {
                    this.linkageSelectedIds[type].push(value)
                }
            },
            getPeriods(){
                fetch('get','/periods/all').then((params) => {
                    this.periods = params
                })
            },
            submitDone(){
                $('#goals-add').modal('hide')
            },
        }
    }
</script>

<style>
    .circular{
        width:100px;
        height:100px;
        line-height: 300px;
        border-radius: 50%;
        background-clip:padding-box,border-box;
        background-origin:padding-box,border-box;
        background-image:linear-gradient(135deg,#fff,#fff),linear-gradient(180deg,rgb(5, 169, 219),#FFF);
        border:1px transparent solid;
        line-height:100px;
        text-align: center;
        font-size: 30px;
        color: rgb(5, 169, 219);
        font-weight: bold;
        position: absolute;
        top:28%;
        left:10px;
       
    }
    .circular div{
        color: #868e96;
        font-size: 14px;
        position: absolute;
        bottom:-55px;
        left:15px;
    }
    .task,.target,.schedule{
        width: 250px;
        height:150px;
        line-height: 270px;
        background: #fff;
        background-repeat: no-repeat;
        background-size:40%;
        background-position:center 10px;
        color: #757575;
        text-align: center
    }
    .target{
        background-image: url('../../assets/target.png');
    }
    .task{
        background-image: url('../../assets/task.png');  
    }
    .schedule{
        background-image: url('../../assets/schedule.png');  
    }
    .tab{
        justify-content: space-between;
        align-items: center
    }
    .member-list {
        overflow-y: auto;
        position: relative;
        top: 45px;
        padding-top: 0;
        padding-bottom: 0;
        height: calc(100vh - 114px);
    }
    .exhibition-panel{
        width: 50%;
        float: left;  
        
    }
    .task-panel {
        width: 50%;
        float: left;
        border-left: 1px solid #eee;
    }
    .example-wrap{
        position: absolute;
        right:80px;
        top:95px;
    }
    .progress-bar{
        background: rgb(5, 169, 219); 
    }
    .overflowY {
        height: calc(100vh - 400px);
        overflow-y: auto;
    }

    .list-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }
    .list-wrap :hover{
        cursor: pointer;
    }
    .task,.target,.schedule,.view-more{
        cursor: pointer;
    }
</style>

