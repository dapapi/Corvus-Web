<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">日历</h1>
            <div class="page-header-actions" data-toggle="modal" data-target="#addCalendar"
                 @click="changeCalendarActionType('add')">
                <i class="iconfont icon-tianjia font-size-20" aria-hidden="true"></i>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5 clearfix px-0 mb-0">
                <div class="float-left py-30" style="width: 20%;">
                    <div style="border-bottom: 1px solid #D8D8D8;width: 90%;margin: 0 auto">
                        <InlineDatepicker @change="selectDate"></InlineDatepicker>
                    </div>
                    <div class="calendar-list">
                        <div>
                            <div class="calendar-title position-relative" style="line-height: 20px">
                                <i class="iconfont icon-richeng pr-5"></i>
                                <span @click="displayMeetingRoom" class="pointer-content">所有日历</span>
                                <span class="px-5 pointer-content" @click="allCalendarShow">
                                    <template v-if="showAllCalendar">
                                        <i class="iconfont icon-xiajiantou" style="font-size:12px"></i>
                                    </template>
                                    <template v-else>
                                        <i class="iconfont icon-xiangshangjiantou" style="font-size:12px"></i>
                                    </template>
                                </span>
                                <span class="float-right pointer-content" data-toggle="modal" data-target="#addMembers">
                                    <i class="iconfont icon-tianjiarenyuan"></i>
                                </span>
                            </div>
                            <div v-show="showAllCalendar">
                                <ul>
                                    <li v-for="calendar in calendarList" class="clearfix">
                                        <div class="calendar-checkbox float-left pointer-content"
                                             :style="'background-color:' + calendar.color"
                                             @click="checkCalendar(calendar.id)">
                                            <i class="md-check"
                                               v-show="selectedCalendar.indexOf(calendar.id) > -1"></i>
                                        </div>
                                        <div class="float-left ml-10">{{ calendar.title }}</div>
                                        <div class="float-right position-relative">
                                            <i class="iconfont icon-gengduo1" aria-hidden="true" id="taskDropdown"
                                               data-toggle="dropdown" aria-expanded="false"></i>
                                            <div class="dropdown-menu" aria-labelledby="taskDropdown">
                                                <a class="dropdown-item" @click="getCalendarDetail(calendar.id)"
                                                   data-target="#addCalendar" data-toggle="modal">编辑</a>
                                                <a class="dropdown-item" data-target="#delModel" data-toggle="modal"
                                                   @click="deleteToastr('calendar', calendar)">删除</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="px-20">
                                    <div class="checkbox-custom checkbox-primary">
                                        <input type="checkbox" id="inputUnchecked" @change="selectAllCalendar">
                                        <label for="inputUnchecked">全选</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="calendar-title">
                                <i class="iconfont icon-richeng pr-5"></i>资源
                                <span class="px-5 pointer-content" @click="allResourceShow">
                                    <template v-if="showAllResource">
                                        <i class="iconfont icon-xiajiantou" style="font-size:12px"></i>
                                    </template>
                                    <template v-else>
                                        <i class="iconfont icon-xiangshangjiantou" style="font-size:12px"></i>
                                    </template>
                                </span>
                            </div>
                            <div v-show="showAllResource">
                                <div class="text-center pb-10">
                                    <span class="pointer-content hover-content"
                                          @click="checkMeetingRoom(1)">会议室占用情况</span>
                                </div>
                                <div class="text-center pb-10">
                                    <span class="pointer-content hover-content"
                                          @click="checkMeetingRoom(2)">摄影棚占用情况</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vertical-line float-left"></div>
                <div class="float-left p-0" style="width: 79%;">
                    <calendar :goto-date="selectedDate" v-show="!meetingRomeShow" @dayClick="showAddScheduleModal"
                              :calendars="selectedCalendar" :meeting-rome-list="meetingRomeList" ref="calendar"
                              :is-meeting="isMeeting" @calendarDisplay="checkMeetingRoom"
                              @scheduleClick="showScheduleModal"></calendar>
                    <MeetingRoomCalendar v-show="meetingRomeShow" :meetingRomeList="meetingRomeList" ref="meetingRoom"
                                         @change="changeToCalendar" @return="displayMeetingRoom"></MeetingRoomCalendar>
                </div>

            </div>
        </div>

        <!-- 新建/修改 日程 -->
        <div class="modal fade" id="changeSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <div style="order: 2">
                            <span class="pointer-content hover-content mr-4" data-toggle="modal"
                                  data-target="#addLinkage" @click="selectProjectLinkage">关联</span>
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
                            <div class="col-md-2 text-right float-left">标题</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入标题"
                                       v-model="scheduleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">日历</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="calendarList" ref="calendarSelector" @change="selectScheduleCalendar"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime" ref="scheduleStartDate"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-show="!isAllday">
                                <timepicker :default="startMinutes" @change="changeStartMinutes"
                                            ref="scheduleStartMinute"></timepicker>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left">结束时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime" ref="scheduleEndDate"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-show="!isAllday">
                                <timepicker :default="endMinutes" @change="changeEndMinutes"
                                            ref="scheduleEndMinute"></timepicker>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="isAllDay" @change="changeIsAllDay" v-model="isAllday">
                                    <label for="isAllDay">全天</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix py-10">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <AddMember type="add"></AddMember>
                            </div>
                        </div>
                        <div class="my-10 clearfix"
                             v-show="linkageSelectedIds.projects.length > 0 || linkageSelectedIds.tasks.length > 0">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="clearfix" v-for="id in linkageSelectedIds.projects">
                                    <span class="float-left">
                                        项目 - {{ allProjectsInfo.find(item => item.id == id).title }}
                                    </span>
                                    <span class="float-right icon iconfont icon-shanchu1"
                                          @click="delNewScheduleLinkage('projects', id)"></span>
                                </div>
                                <div class="clearfix" v-for="id in linkageSelectedIds.tasks">
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
                                <div class="col-md-2 text-right float-left">会议室</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="allMeetingRomeList" ref="scheduleResource"
                                                @change="changeScheduleMaterial"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">提醒</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="remindArr" ref="scheduleNotice"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">重复</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="repeatArr" ref="scheduleRepeat" @change="changeScheduleRepeat"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">位置</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" class="form-control" title="" v-model="eventPlace">
                                </div>
                            </div>
                            <div class="mt-20">
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
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <template v-if="scheduleType === 'add'">
                            <button class="btn btn-primary" type="submit" @click="addSchedule">确定</button>
                        </template>
                        <template v-if="scheduleType === 'edit'">
                            <button class="btn btn-primary" type="submit" @click="changeSchedule">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- 查看日程 -->
        <div class="modal fade" id="checkSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content" v-if="scheduleData">
                    <div class="modal-header">
                        <div style="order: 2">
                            <i class="iconfont icon-bianji2 pr-4 font-size-16 pointer-content"
                               @click="changeScheduleType('edit')" aria-hidden="true"></i>
                            <FileUploader is-icon="true" class="float-left" @change="fileUpload"></FileUploader>
                            <i class="iconfont icon-shanchu1 pr-4 font-size-16 pointer-content" data-toggle="modal"
                               data-target="#delModel" aria-hidden="true" @click="deleteToastr('schedule')"></i>
                            <i class="iconfont icon-guanbi pointer-content" aria-hidden="true" data-dismiss="modal"></i>
                        </div>
                        <h5 class="modal-title">{{ scheduleData.calendar.data.title }}</h5>
                    </div>
                    <div class="modal-body px-40">
                        <div class="">
                            <h4 class="my-20">{{ scheduleData.title }}</h4>
                        </div>
                        <div class="example">
                            <div class="">
                                <div class="col-md-3 float-left px-0">
                                    <div class="">{{ (scheduleData.start_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (scheduleData.start_at.split(' ')[0]).split('-')[2] }}日
                                        {{ scheduleData.start_at|getWeek(scheduleData.start_at) }}
                                    </div>
                                    <div class="big-time">{{ (scheduleData.start_at.split(' ')[1]).slice(0,5) }}</div>
                                </div>
                                <div class="col-md-2 float-left pl-0">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time text-center"> -</div>
                                </div>
                                <div class="col-md-3 float-left px-0">
                                    <div class="">{{ (scheduleData.end_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (scheduleData.end_at.split(' ')[0]).split('-')[2] }}日
                                        {{ scheduleData.end_at|getWeek(scheduleData.end_at) }}
                                    </div>
                                    <div class="big-time">{{ (scheduleData.end_at.split(' ')[1]).slice(0,5) }}</div>
                                </div>
                                <div class="col-md-2 float-left" v-show="scheduleData.is_allday">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time font-size-18" style="line-height: 75px">全天</div>
                                </div>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.position">
                            <div class="col-md-1 px-0 float-left">地点</div>
                            <div class="col-md-10 float-left">{{ scheduleData.position }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.material">
                            <div class="col-md-1 px-0 float-left">资源</div>
                            <div class="col-md-10 float-left">{{ scheduleData.material.data.name }}</div>
                        </div>
                        <div class="example">
                            <div class="col-md-1 px-0 float-left">组织人</div>
                            <div class="col-md-10 float-left">
                                {{ scheduleData.creator.data.name }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-1 px-0 float-left">参与人</div>
                            <div class="col-md-10 float-left">
                                <AddMember type="add" @change="changeScheduleParticipants"></AddMember>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.desc">
                            <div class="col-md-1 px-0 float-left">备注</div>
                            <div class="col-md-10 float-left">{{ scheduleData.desc }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.affixes.data.length > 0">
                            <div>附件</div>
                            <div>
                                <div class="col-md-3 float-left text-center position-relative file-item"
                                     v-for="affix in scheduleData.affixes.data">
                                    <div class="del-affix iconfont icon-zuofei position-absolute pointer-content"
                                         @click="delAffix(affix.id)"></div>
                                    <div><i class="iconfont icon-wenjian" style="font-size: 36px"></i></div>
                                    <div @click="openFile(affix.url)" class="pointer-content">{{ affix.title }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加/修改 日历 -->
        <div class="modal fade" id="addCalendar" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <template v-if="calendarActionType === 'add'">
                            <h4 class="modal-title">添加日历</h4>
                        </template>
                        <template v-else>
                            <h4 class="modal-title">修改日历</h4>
                        </template>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">标题</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入标题"
                                       v-model="scheduleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <ul class="color-selector calendar-color-list">
                                    <li v-for="color in colorArr" :style="'background-color: ' + color"
                                        @click="changeCalendarColor(color)">
                                        <i class="md-check" v-if="color === checkColor"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">可见范围</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="visibleRangeArr" ref="visibleSelector" @change="addCalendarVisible"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" ref="linkageStar" @change="addCalendarStar"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member @change="addParticipant"></add-member>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                            <template v-if="calendarActionType === 'add'">
                                <button class="btn btn-primary" type="submit" @click="addCalendar">确定</button>
                            </template>
                            <template v-else>
                                <button class="btn btn-primary" type="submit" @click="changeCalendar">确定</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 删除日历/日程 -->
        <div class="modal fade" id="delModel" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i
                                aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">确认删除</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <template v-if="delType === 'calendar'">
                                <p>确认删除日历 “{{ delCalendarInfo.title }}” </p>
                            </template>
                            <template v-if="delType === 'schedule'">
                                <p>确认删除日程 “{{ scheduleData.title }}” </p>
                            </template>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <template v-if="delType === 'calendar'">
                            <button class="btn btn-primary" @click="deleteCalendar">确定</button>
                        </template>
                        <template v-if="delType === 'schedule'">
                            <button class="btn btn-primary" @click="deleteSchedule">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- 日历批量添加成员 -->
        <div class="modal fade" id="addMembers" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple" style="max-width: 50rem;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i
                                aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">批量添加成员</h4>
                    </div>
                    <div class="modal-body clearfix pt-10">
                        <ListSelectMember :type="'change'"></ListSelectMember>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" @click="">确定</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 关联资源 -->
        <div class="modal fade" id="addLinkage" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
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
                                                v-for="project in allProjectsInfo"
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
                                                v-for="task in allTasksInfo"
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

    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    import Cookies from 'js-cookie';

    export default {
        data: function () {
            return {
                scheduleName: '',
                startTime: '',
                startMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                remindArr: config.remindArr,
                repeatArr: config.repeatArr,
                visibleRangeArr: config.visibleRangeArr,
                colorArr: config.colorArr,
                showMore: false,
                eventPlace: '',
                eventDesc: '',
                starsArr: [
                    {
                        name: '无',
                        value: ''
                    }
                ],
                checkColor: '',
                selectedDate: '',
                calendarColor: '',
                selectedCalendar: [],
                delCalendarInfo: '',
                meetingRomeShow: false,
                calendarList: [],
                showAllCalendar: true,
                showAllResource: true,
                selectMemberShow: false,
                starId: '',
                calendarVisible: 1,
                calendarDetailInfo: '',
                calendarActionType: '',
                scheduleCalendar: '',
                isScheduleAllday: 0,
                scheduleRepeat: 1,
                scheduleData: '',
                scheduleParticipants: '',
                isAllday: false,
                schedulePrivacy: false,
                meetingRomeList: '',
                allMeetingRomeList: '',
                delType: '',
                scheduleType: 'add',
                scheduleMaterialId: '',
                linkageResource: '',
                allProjectsInfo: '',
                allTasksInfo: '',
                searchKeyWord: '',
                linkageSelectedIds: {
                    projects: [],
                    tasks: []
                },
                isMeeting: false,
                materialsIds: [],
                meetingRomeType: '',
            }
        },

        mounted() {
            this.getStars();
            this.getCalendarList();
            this.getResources();
            let _this = this;
            $('#addCalendar').on('hidden.bs.modal', function () {
                _this.$store.dispatch('changeParticipantsInfo', {data: []});
                _this.starId = '';
                _this.scheduleName = '';
                _this.checkColor = '';
                _this.calendarVisible = 1;
                _this.$refs.linkageStar.setValue('');
                _this.$refs.visibleSelector.setValue('');
            });

            $('#changeSchedule').on('hidden.bs.modal', function () {
                _this.initAddScheduleModal();
            });

            $('#checkSchedule').on('hidden.bs.modal', function () {
                _this.$store.dispatch('changeParticipantsInfo', {data: []});
            });
            this.globalClick(this.removeSelector);
            this.initCalendar();
            let pageContent = $('.container-fluid');
            $('.vertical-line').css('height', (pageContent[0].offsetHeight - 60) + 'px');
        },

        watch: {
            selectedCalendar(newValue) {
                Cookies.set('selectedCalendar', newValue.join(','))
            }
        },

        filters: {
            getWeek: function (date) {
                let week = new Date(date).getDay();
                let value = '';
                switch (week) {
                    case 0:
                        value = '周日';
                        break;
                    case 1:
                        value = '周一';
                        break;
                    case 2:
                        value = '周二';
                        break;
                    case 3:
                        value = '周三';
                        break;
                    case 4:
                        value = '周四';
                        break;
                    case 5:
                        value = '周五';
                        break;
                    case 6:
                        value = '周六';
                        break;
                }
                return value;
            }
        },

        methods: {
            initCalendar: function () {
                let data = Cookies.get('selectedCalendar');
                if (Cookies.get('selectedCalendar')) {
                    data = data.split(',');
                    for (let i = 0; i < data.length; i++) {
                        data[i] = parseInt(data[i]);
                    }
                    this.selectedCalendar = data;
                }
            },

            getClients: function () {
                fetch('get', '/clients').then(function (response) {
                    console.log(response)
                })
            },

            getResources(type) {
                let data = {};
                if (type) {
                    data = {
                        type: type
                    };
                }
                fetch('get', '/materials/all', data).then(response => {
                    this.allMeetingRomeList = response.data;
                    if (type) {
                        this.meetingRomeList = response.data;
                    }
                })
            },

            getStars: function () {
                if (Cookies.get('companyType') === '泰洋川禾') {
                    fetch('get', '/stars/all').then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            this.starsArr.push({
                                value: response.data[i].id,
                                name: response.data[i].name
                            })
                        }
                    })
                } else {
                    fetch('get', '/bloggers/all').then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            this.starsArr.push({
                                value: response.data[i].id,
                                name: response.data[i].nickname
                            })
                        }
                    })
                }

            },

            getCalendarList: function () {
                this.calendarList = [];
                fetch('get', '/calendars/all').then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        response.data[i].name = response.data[i].title;
                        response.data[i].value = response.data[i].id;
                        this.calendarList.push(response.data[i])
                    }
                })

            },

            getCalendarDetail: function (calendarId) {
                this.calendarActionType = 'change';
                this.calendarId = calendarId;
                let data = {
                    include: 'starable,participants',
                };
                fetch('get', '/calendars/' + calendarId, data).then(response => {
                    this.scheduleName = response.data.title;
                    this.checkColor = response.data.color;
                    this.calendarVisible = response.data.privacy;
                    this.$refs.visibleSelector.setValue(response.data.privacy);
                    this.$store.dispatch('changeParticipantsInfo', {data: response.data.participants.data});
                    if (response.data.starable) {
                        let starId = response.data.starable.data.id;
                        this.starId = starId;
                        this.$refs.linkageStar.setValue(starId)
                    }
                })
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

            fileUpload: function (url, name, size) {
                console.log(url);
                console.log(name)
                let data = {
                    title: name,
                    url: url,
                    size: size,
                    type: 1
                };
                fetch('post', '/schedules/' + this.scheduleData.id + '/affix', data).then(response => {
                    toastr.success('上传成功');
                    if (this.scheduleData.affixes) {
                        this.scheduleData.affixes.data.push(response.data)
                    } else {
                        this.scheduleData.affixes = {data: []};
                        this.scheduleData.affixes.data.push(response.data)
                    }
                })
            },

            openFile: function (url) {
                window.open(url)
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

            selectResource: function (type, value) {
                let index = this.linkageSelectedIds[type].indexOf(value);
                if (index > -1) {
                    this.linkageSelectedIds[type].splice(index, 1)
                } else {
                    this.linkageSelectedIds[type].push(value)
                }
            },

            delAffix: function (affixId) {
                fetch('delete', '/schedules/' + this.scheduleData.id + '/affixes/' + affixId).then(response => {
                    toastr.success('删除成功')
                    this.scheduleData.affixes.data.splice(this.scheduleData.affixes.data.map(item => item.id).indexOf(affixId), 1)
                })
            },

            delNewScheduleLinkage: function (type, value) {
                console.log(this.linkageSelectedIds[type]);
                let index = this.linkageSelectedIds[type].indexOf(value);
                this.linkageSelectedIds[type].splice(index, 1)
            },

            addLinkageResource: function () {
                console.log(this.linkageSelectedIds);
                $('#addLinkage').modal('hide');
            },

            changeScheduleMaterial: function (value) {
                this.scheduleMaterialId = value;
            },

            changeScheduleParticipants: function (value) {
                let data = {};
                if (value) {
                    data.participant_del_ids = [value];
                } else {
                    let participantsInfo = this.$store.state.newParticipantsInfo;
                    data.participant_ids = [];
                    data.participant_del_ids = [];
                    for (let i = 0; i < participantsInfo.length; i++) {
                        if (this.scheduleParticipants.indexOf(participantsInfo[i].id) === -1) {
                            data.participant_ids.push(participantsInfo[i].id)
                        }
                    }
                    for (let i = 0; i < this.scheduleParticipants.length; i++) {
                        if (participantsInfo.indexOf(this.scheduleParticipants[i].id) === -1) {
                            data.participant_del_ids.push(this.scheduleParticipants[i].id)
                        }
                    }
                }
                fetch('put', '/schedules/' + this.scheduleData.id, data).then(response => {
                    this.$refs.calendar.refresh();
                    this.scheduleParticipants = JSON.parse(JSON.stringify(this.$store.state.newParticipantsInfo));
                })
            },

            showScheduleModal: function (data) {
                this.scheduleData = data;
                this.scheduleParticipants = JSON.parse(JSON.stringify(data.participants.data));
                this.$store.dispatch('changeParticipantsInfo', {data: data.participants.data});
                $('#checkSchedule').modal('show')
            },

            showAddScheduleModal: function (date) {
                this.$refs.scheduleStartDate.setValue(date);
                this.$refs.scheduleEndDate.setValue(date);
                this.startTime = date;
                this.endTime = date;
                $('#changeSchedule').modal('show')
            },

            deleteToastr: function (type, calendar = null) {
                this.delType = type;
                if (calendar) {
                    this.delCalendarInfo = calendar
                }
                if (type === 'schedule') {
                    $('#checkSchedule').modal('hide');
                }
            },

            changeScheduleType: function (type) {
                this.scheduleType = type;
                $('#checkSchedule').modal('hide');
                setTimeout(function () {
                    $('#changeSchedule').modal('show');
                }, 400);
                if (type === 'edit') {
                    this.scheduleName = this.scheduleData.title;
                    this.$refs.calendarSelector.setValue(this.scheduleData.calendar.data.id);
                    this.scheduleCalendar = this.scheduleData.calendar.data.id;
                    this.$refs.scheduleStartDate.setValue(this.scheduleData.start_at.split(' ')[0]);
                    let startMinutes = this.scheduleData.start_at.split(' ')[1].split(':');
                    this.$refs.scheduleStartMinute.setValue(startMinutes[0] + ':' + startMinutes[1]);
                    this.startTime = this.scheduleData.start_at.split(' ')[0];
                    this.startMinutes = startMinutes[0] + ':' + startMinutes[1];
                    this.$refs.scheduleEndDate.setValue(this.scheduleData.end_at.split(' ')[0]);
                    let endMinutes = this.scheduleData.end_at.split(' ')[1].split(':');
                    this.$refs.scheduleEndMinute.setValue(endMinutes[0] + ':' + endMinutes[1]);
                    this.endTime = this.scheduleData.end_at.split(' ')[0];
                    this.endMinutes = endMinutes[0] + ':' + endMinutes[1];
                    this.isAllday = this.scheduleData.is_allday;
                    this.eventDesc = this.scheduleData.desc;
                    this.eventPlace = this.scheduleData.position;
                    if (this.scheduleData.material) {
                        this.$refs.scheduleResource.setValue(this.scheduleData.material.data.id);
                        this.scheduleMaterialId = this.scheduleData.material.data.id;
                    }
                }
            },

            deleteSchedule: function () {
                fetch('delete', '/schedules/' + this.scheduleData.id).then(response => {
                    $('#delModel').modal('hide');
                    toastr.success('删除成功');
                    this.$refs.calendar.refresh()
                })
            },

            changeSchedule: function () {
                let startTime = '';
                let endTime = '';
                if (this.isScheduleAllday) {
                    startTime = this.startTime;
                    endTime = this.endTime;
                } else {
                    startTime = this.startTime + ' ' + this.startMinutes;
                    endTime = this.endTime + ' ' + this.endMinutes;
                }
                let data = {
                    title: this.scheduleName,
                    calendar_id: this.scheduleCalendar,
                    is_allday: this.isScheduleAllday,
                    privacy: Number(this.schedulePrivacy),
                    start_at: startTime,
                    end_at: endTime,
                    repeat: this.scheduleRepeat,
                    desc: this.eventDesc,
                    material_id: this.scheduleMaterialId
                };
                if (this.eventPlace) {
                    data.position = this.eventPlace;
                }

                data.participant_del_ids = [];
                data.participant_ids = [];
                let flagInfo = this.$store.state.newParticipantsInfo;
                for (let i = 0; i < this.scheduleParticipants.length; i++) {
                    if (flagInfo.map(item => item.id).indexOf(this.scheduleParticipants[i].id) === -1) {
                        data.participant_del_ids.push(this.scheduleParticipants[i].id)
                    }
                }
                for (let i = 0; i < flagInfo.length; i++) {
                    if (this.scheduleParticipants.map(item => item.id).indexOf(flagInfo[i].id) === -1) {
                        data.participant_ids.push(flagInfo[i].id)
                    }
                }

                fetch('put', '/schedules/' + this.scheduleData.id, data).then(response => {
                    this.$refs.calendar.refresh();
                    $('#changeSchedule').modal('hide');
                    toastr.success('修改成功')
                })
            },

            selectScheduleCalendar: function (value) {
                this.scheduleCalendar = value
            },

            changeCalendarActionType: function (value) {
                this.calendarActionType = value
            },

            changeScheduleRepeat: function (value) {
                this.scheduleRepeat = value;
            },

            removeSelector: function (event) {
                let tag = document.getElementById("selectMember");
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.selectMemberShow = false;
                    }
                }
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
                }
                let data = {
                    title: this.scheduleName,
                    calendar_id: this.scheduleCalendar,
                    is_allday: this.isScheduleAllday,
                    privacy: Number(this.schedulePrivacy),
                    start_at: startTime,
                    end_at: endTime,
                    repeat: this.scheduleRepeat,
                    desc: this.eventDesc
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
                fetch('post', '/schedules', data).then(response => {
                    this.$refs.calendar.refresh();
                    $('#changeSchedule').modal('hide');
                    toastr.success('添加成功')
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
                this.scheduleRepeat = 1;
                this.eventDesc = '';
                this.isAllday = false;
                this.schedulePrivacy = false;
                this.scheduleType = 'add';
                this.linkageSelectedIds = {
                    projects: [],
                    tasks: []
                };
                this.$refs.calendarSelector.setValue('');
                this.$refs.scheduleStartDate.setValue('');
                this.$refs.scheduleEndDate.setValue('');
                this.$refs.scheduleStartMinute.setValue('00:00');
                this.$refs.scheduleEndMinute.setValue('00:00');
                this.$refs.scheduleResource.setValue('');
                this.$refs.scheduleRepeat.setValue(1);
                this.$refs.scheduleNotice.setValue('0');
            },

            addCalendarVisible: function (value) {
                this.calendarVisible = value
            },

            addCalendarStar: function (value) {
                this.starId = value
            },

            changeStartTime: function (value) {
                this.startTime = value
            },

            changeStartMinutes: function (value) {
                this.startMinutes = value
            },

            changeEndTime: function (value) {
                this.endTime = value
            },

            changeEndMinutes: function (value) {
                this.endMinutes = value
            },

            changeIsAllDay: function (e) {
                this.isScheduleAllday = Number(e.target.checked);
            },

            isShowMore: function () {
                this.showMore = !this.showMore
            },

            addCalendar: function () {
                let data = {
                    title: this.scheduleName,
                    color: this.checkColor,
                    privacy: this.calendarVisible,
                };
                if (this.starId.length > 0) {
                    data.star = this.starId
                }
                let participants = this.$store.state.newParticipantsInfo;
                if (participants.length > 0) {
                    data.participant_ids = [];
                    for (let i = 0; i < participants.length; i++) {
                        data.participant_ids.push(participants[i].id)
                    }
                }
                fetch('post', '/calendars', data).then(response => {
                    $('#addCalendar').modal('hide');
                    this.calendarList.push(response.data);
                    toastr.success('添加成功')
                })
            },

            changeCalendar: function () {
                let data = {
                    title: this.scheduleName,
                    color: this.checkColor,
                    privacy: this.calendarVisible,
                };
                if (this.starId.length > 0) {
                    data.star = this.starId
                }
                let participants = this.$store.state.newParticipantsInfo;
                if (participants.length > 0) {
                    data.participant_ids = [];
                    for (let i = 0; i < participants.length; i++) {
                        data.participant_ids.push(participants[i].id)
                    }
                }
                fetch('put', '/calendars/' + this.calendarId, data).then(response => {
                    this.getCalendarList();
                    this.$refs.calendar.refresh();
                    $('#addCalendar').modal('hide');
                    toastr.success('修改成功')
                })
            },

            addParticipant: function () {

            },

            changeCalendarColor: function (value) {
                this.checkColor = value;
            },

            selectDate: function (value) {
                this.selectedDate = value;
                this.$refs.meetingRoom.setDate(value)
            },

            checkCalendar: function (value) {
                let index = this.selectedCalendar.indexOf(value);
                if (index > -1) {
                    this.selectedCalendar.splice(index, 1)
                } else {
                    this.selectedCalendar.push(value)
                }
            },

            editCalendar: function () {

            },

            selectAllCalendar: function (e) {
                this.selectedCalendar = [];
                if (e.target.checked) {
                    for (let i = 0; i < this.calendarList.length; i++) {
                        this.selectedCalendar.push(this.calendarList[i].id)
                    }
                }
            },

            deleteCalendar: function () {
                fetch('delete', '/calendars/' + this.delCalendarInfo.id).then(response => {
                    toastr.success('删除成功');
                    $('#delModel').modal('hide');
                    this.getCalendarList();
                    this.$refs.calendar.refresh()
                })
            },

            checkMeetingRoom: function (type) {
                if (type) {
                    this.meetingRomeType = type;
                }
                this.getResources(this.meetingRomeType);
                this.isMeeting = true;
                this.meetingRomeShow = true
            },

            displayMeetingRoom: function () {
                this.meetingRomeShow = false;
                this.isMeeting = false;
                this.meetingRomeList = '';
            },

            changeToCalendar: function (type) {
                this.meetingRomeShow = false;
                this.$refs.calendar.changeView(type)
            },

            allCalendarShow: function () {
                this.showAllCalendar = !this.showAllCalendar
            },

            allResourceShow: function () {
                this.showAllResource = !this.showAllResource
            },

            addCalendarMember: function () {
                this.selectMemberShow = true
            }


        }
    }
</script>

<style>
    li {
        list-style: none;
    }

    .calendar-color-list li {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin-right: 10px;
    }

    .calendar-color-list li i {
        line-height: 20px;
        color: white;
        text-align: center;
        position: absolute;
        left: 5px;
    }

    .calendar-checkbox {
        width: 20px;
        height: 20px;
        border-radius: 2px;
    }

    .calendar-title {
        padding: 20px 20px 10px;
    }

    .calendar-list ul li {
        padding: 7px 0;
        border-bottom: 1px solid #E0E0E0;
    }

    .calendar-list ul {
        padding: 0 20px;
        margin-top: 10px;
    }

    .calendar-list ul li .calendar-checkbox i {
        color: white;
        text-align: center;
        left: 5px;
    }

    .big-time {
        font-size: 48px;
        color: #3F51B5;
        font-weight: bold;
    }

    .follow-avatar {
        border-radius: 100%;
        overflow: hidden;
        width: 40px;
        height: 40px;
    }

    .creator-avatar {
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius: 100%;
    }

    .del-affix {
        right: 15px;
        display: none;
        color: red;
    }

    .file-item:hover .del-affix {
        display: block;
    }

</style>
