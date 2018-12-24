<template>
    <div class="page">
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">任务</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="changeTaskStatus(3)">终止</a>
                    <a class="dropdown-item" role="menuitem" @click="changeTaskStatus(2)">完成</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#customizeFieldContent">自定义字段</a>
                    <a class="dropdown-item" role="menuitem" @click="privacyTask">
                        {{taskInfo.privacy == 1 ? '转公开':'转私密'}}</a>
                    <a class="dropdown-item" role="menuitem" @click="deleteTask">删除</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12">
                <div class="card-block">
                    <h4 class="card-title">{{ taskInfo.title }}
                        <template v-if="!taskInfo.task_p">
                           <span class="font-size-14 pl-10 pointer-content hover-content"
                                 @click="redirectTaskDetail(taskInfo.pTask?taskInfo.pTask.data.id: '')">
                           <i class="md-chevron-left"></i>回到主任务
                            </span>
                        </template>
                    </h4>
                    <div class="card-text clearfix example">
                        <div class="float-left pl-0 pr-2 col-md-1">
                            <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>负责人
                        </div>
                        <div class="font-weight-bold float-left" v-if="taskInfo">
                            {{ taskInfo.principal?taskInfo.principal.data.name: '' }}
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="float-left pl-0 pr-2 col-md-1">
                            <i class="iconfont icon-initiate-task pr-2" aria-hidden="true"></i>任务状态
                        </div>
                        <div class="font-weight-bold float-left">
                            <template v-if="taskInfo.status === 1"><span style="color:#FF9800">进行中</span></template>
                            <template v-if="taskInfo.status === 2"><span style="color:#4CAF50">已完成</span></template>
                            <template v-if="taskInfo.status === 3"><span style="color:#9E9E9E">已停止</span></template>
                            <template v-if="taskInfo.status === 4"><span style="color:#F44336">延期</span></template>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="pl-0">
                            <div class="float-left pl-0 pr-2 col-md-1">
                                <i class="iconfont icon-jieshushijian pr-2" aria-hidden="true"></i>结束时间
                            </div>
                            <div class="font-weight-bold float-left">
                                {{ taskInfo.end_at }}
                            </div>
                        </div>
                        <div class="float-right text-right pr-0">
                            <span>关联资源</span>
                            <span class="pl-2 font-weight-bold">
                                {{taskInfo.resource?taskInfo.resource.data.resource.data.title:''}}-
                                {{taskInfo.resource? taskInfo.resource.data.resourceable.data.name
                                                    || taskInfo.resource.data.resourceable.data.nickname
                                                    || taskInfo.resource.data.resourceable.data.title
                                                    || taskInfo.resource.data.resourceable.data.company:''}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel col-md-12 col-lg-12">

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task-base"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">概况</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task-annex"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">附件</a>
                        </li>
                        <li class="nav-item" role="presentation" v-if="taskInfo.task_p">
                            <a class="nav-link" data-toggle="tab" href="#forum-task-subtasks"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">子任务</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content nav-tabs-animate bg-white col-md-12" v-if="taskInfo">
                    <div class="tab-pane animation-fade active" id="forum-task-base" role="tabpanel">
                        <div class="card">
                            <div class="card-header card-header-transparent card-header-bordered">
                                <div class="float-left font-weight-bold third-title">任务详情</div>
                                <div class="float-right pointer-content">
                                    <i class="iconfont icon-bianji" aria-hidden="true" @click="editBaseInfo"></i>
                                </div>
                                <div class="float-right mr-40" v-show="isEdit">
                                    <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                                    <button class="btn btn-primary" @click="changeTaskBaseInfo">确定</button>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">负责人</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <div class="edit-wrap">
                                            <EditInputSelector :is-edit="isEdit" :select-type="'principal'"
                                                               @change="changeTaskPrincipal"></EditInputSelector>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">参与人</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <EditAddMember :is-edit="isEdit"></EditAddMember>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">开始时间</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <div class="edit-wrap">
                                            <EditDatepicker :content="taskInfo.start_at" :is-edit="isEdit"
                                                            @change="changeTaskStartTime"></EditDatepicker>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">结束时间</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <div class="edit-wrap">
                                            <EditDatepicker :content="taskInfo.end_at" :is-edit="isEdit"
                                                            @change="changeEndTime"></EditDatepicker>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">优先级</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <EditSelector :content="taskInfo.priority?taskInfo.priority: ''"
                                                      :is-edit="isEdit"
                                                      :options="priorityArr" @change="changeTaskLevel"></EditSelector>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">任务说明</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <div class="">
                                            <editTextarea :content="taskInfo.desc"
                                                          :is-edit="isEdit"
                                                          @change="changeTaskIntroduce"></editTextarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">完成时间</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        暂无
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix" v-if="taskInfo.stop_at">
                                    <div class="col-md-1 float-left text-right pl-0">停止时间</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        {{ taskInfo.stop_at }}
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">创建人</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        {{ taskInfo.creator?taskInfo.creator.data.name:'' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-task-annex" role="tabpanel">
                        <div class="card">
                            <div class="card-header card-header-transparent card-header-bordered attachment-upload">
                                <div class="float-left font-weight-bold third-title">上传附件</div>
                                <div class="d-inline float-right">
                                    <FileUploader is-icon="true" @change="uploadAttachment"></FileUploader>
                                </div>
                            </div>
                            <div class="card-block">
                                <ul class="file-list">
                                    <li v-for="attachment in taskInfo.affixes?taskInfo.affixes.data:[]">
                                        <i class="md-file pr-5"></i>{{ attachment.title }}
                                        <span class="float-right pl-10 pointer-content"
                                              data-plugin="actionBtn" @click="setDelInfo(attachment.id)"
                                              data-toggle="modal"
                                              data-target="#confirmFlag">删除</span>
                                        <span class="float-right px-10">|</span>
                                        <span class="float-right px-10 pointer-content"
                                              @click="downloadAttachment(attachment.id, attachment.url)">下载</span>
                                        <span class="float-right px-10">{{ attachment.size }}</span>
                                    </li>
                                </ul>
                                <div class="col-md-1" style="margin: 6rem auto"
                                     v-if="taskInfo.affixes&&taskInfo.affixes.data.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-task-subtasks"
                         role="tabpanel">
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">任务名称</th>
                                <th class="cell-300" scope="col">任务类型</th>
                                <th class="cell-300" scope="col">状态</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">截止日期</th>
                            </tr>
                            <tbody>
                            <tr v-for="task in taskInfo.tasks?taskInfo.tasks.data:[]">
                                <td @click="redirectTaskDetail(task.id)" class="pointer-content">{{ task.title }}</td>
                                <td>{{ task.type.data.title }}</td>
                                <td>
                                    <template v-if="task.status === 1">进行中</template>
                                    <template v-if="task.status === 2">已完成</template>
                                    <template v-if="task.status === 3">已停止</template>
                                </td>
                                <td>{{ task.principal?task.principal.data.name:'' }}</td>
                                <td>{{ task.end_at }}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="col-md-1" style="margin: 6rem auto"
                             v-if="taskInfo.tasks&&taskInfo.tasks.data.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>

                        <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                             data-target="#addChildTask">
                            <button type="button"
                                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                <i class="front-icon iconfont icon-tianjia animation-scale-up" aria-hidden="true"></i>
                                <i class="back-icon iconfont icon-tianjia animation-scale-up" aria-hidden="true"></i>
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            <div class="panel col-md-12 col-lg-12" v-if="questionId && visible">
                <div class="tab-content nav-tabs-animate bg-white">
                    <div class="card">
                        <div class="card-header card-header-transparent card-header-bordered"
                             style="display: flex; justify-content: space-between; align-items: center;">
                            <div class="font-weight-bold third-title">问卷详情</div>
                            <div class="">
                                <button type="button"
                                        class="btn btn-primary"
                                        v-if="!~hasAnsweredArr.indexOf(user.id)"
                                        @click="submit">提交
                                </button>
                                <button type="button" class="btn btn-primary" data-plugin="actionBtn"
                                        data-toggle="modal"
                                        v-if="questionInfo.reviewanswer
                                        && principalId === user.id 
                                        && hasAnsweredArr.length > 0 
                                        && hasAnsweredArr.length === questionInfo.reviewanswer.data.length"
                                        && !questionInfo.excellent
                                        data-target="#push-reason">推优
                                </button>
                            </div>
                        </div>
                        <div class="card-block">
                            <h4 style="color: #3F51B5">平均分
                                {{ questionInfo.sum ? (questionInfo.sum.data[0]
                                ?questionInfo.sum.data[0].truncate : 0) : 0}}
                            </h4>
                            <div class="row">
                                <div class="col-md-8 clearfix" style="padding-right: 0;">
                                    <div class="progress" data-labeltype="percentage" data-goal="-40"
                                         data-plugin="progress" style="width: calc(100% - 100px); float:left;">
                                        <div class="progress-bar progress-bar-warning" aria-valuemin="-100"
                                             aria-valuemax="0" aria-valuenow="-40" role="progressbar"
                                             :style="{width: `${questionInfo.reviewanswer.length === 0 ? 0 : hasAnsweredArr.length / questionInfo.reviewanswer.data.length * 100}%`}">
                                            <!-- <span class="progress-label">{{questionInfo.reviewanswer.length === 0 ? 0 : ~~((hasAnsweredArr.length / questionInfo.reviewanswer.data.length * 100))}}%</span> -->
                                        </div>
                                    </div>
                                    <div style="width: 50px; padding-left: 10px; float: left;">
                                        {{questionInfo.reviewanswer.length === 0 ? 0 : ~~((hasAnsweredArr.length /
                                        questionInfo.reviewanswer.data.length * 100))}}%
                                    </div>
                                </div>
                            </div>
                            <div class="all-menber clearfix">
                                <div class="question-avatar" v-for="(item, index) in questionInfo.reviewanswer.data"
                                     :key="index">
                                    <div :class="~hasAnsweredArr.indexOf(item.users.data.id) ? 'unselect-avatar':'select-avatar'"></div>
                                    {{ item.users.data.name.substr(item.users.data.name.length - 2, 2) }}
                                </div>
                                <!-- reviewanswer -->
                            </div>
                            <div class="card-text py-5 clearfix">
                                <div class="col-md-1 float-left text-right pl-0">作者</div>
                                <div class="col-md-11 float-left font-weight-bold">
                                    <div class="edit-wrap">
                                        {{ questionInfo.creator ? questionInfo.creator.data.name : '' }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-text py-5 clearfix">
                                <div class="col-md-1 float-left text-right pl-0">视频名称</div>
                                <div class="col-md-11 float-left font-weight-bold">
                                    <div class="edit-wrap">
                                        {{ questionInfo.production ? questionInfo.production.data[0].nickname : '' }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-text py-5 clearfix">
                                <div class="col-md-1 float-left text-right pl-0">阅转比</div>
                                <div class="col-md-11 float-left font-weight-bold">
                                    <div class="edit-wrap">
                                        {{ questionInfo.production ? questionInfo.production.data[0].read_proportion :
                                        '' }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-text py-5 clearfix" v-if="questionInfo.excellent">
                                <div class="col-md-1 float-left text-right pl-0">推优分</div>
                                <div class="col-md-11 float-left font-weight-bold">
                                    <div class="edit-wrap">
                                        {{ questionInfo.excellent_sum }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-text py-5 clearfix" v-if="questionInfo.excellent">
                                <div class="col-md-1 float-left text-right pl-0">推优原因</div>
                                <div class="col-md-11 float-left font-weight-bold">
                                    <div class="edit-wrap">
                                        {{ questionInfo.excellent }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-text py-5 clearfix">
                                <div class="col-md-1 float-left text-right pl-0">视频链接</div>
                                <div class="col-md-11 float-left font-weight-bold">
                                    <router-link :to="questionInfo.production ? questionInfo.production.data[0].link : ''">
                                        <div class="edit-wrap" style="color: #3298DC; cursor: pointer; width: 100%;">
                                            {{ questionInfo.production ? questionInfo.production.data[0].link : '' }}
                                        </div>
                                    </router-link>
                                </div>
                            </div>

                            <div class="question" v-for="(items, index) in questionData" :key="index">
                                <div class="name">{{index + 1}}. {{ items.title }}</div>
                                <div class="options clearfix" v-for="(item, _index) in items.items.data" :key="_index">
                                    <div class="title">
                                        <label>
                                            <div class="radio-custom radio-primary" style="display: inline-block;">
                                                <input type="radio" @click="answerList[index] = item"
                                                       :disabled="hasAnsweredArr.includes(user.id)"
                                                       :checked="answerList[index] === item.value
                                                        || items.selectrows.data.find(n => n.review_question_item_id === item.id && n.creator.data.id === user.id)"
                                                       :name="items.id"/>
                                                <label></label>
                                            </div>
                                            {{ item.value }}: {{ item.title }}
                                        </label>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-8" style="padding-right: 0;">
                                            <div class="progress" data-labeltype="percentage" data-goal="-40"
                                                 data-plugin="progress" style="width: calc(100% - 100px); float: left;">
                                                <div class="progress-bar progress-bar-warning" aria-valuemin="-100"
                                                     aria-valuemax="0" aria-valuenow="-40" role="progressbar"
                                                     :style="{width: `${items.selectrows.data.filter(n => n.review_question_item_id === item.id).length / hasAnsweredArr.length * 100}%`}">
                                                    <!-- <span class="progress-label">100%</span> -->
                                                </div>
                                            </div>
                                            <div style="width: 50px; padding-left: 10px; float: left;">
                                                <!-- {{ items.selectrows.data.filter(n => n.review_question_item_id ===
                                                item.id).length / hasAnsweredArr.length * 100 }}% -->
                                                 {{ hasAnsweredArr.length > 0 ? items.selectrows.data.filter(n => n.review_question_item_id ===
                                                item.id).length / hasAnsweredArr.length * 100: '0' }}%
                                            </div>
                                            <div style="width: 50px; padding-left: 10px; float: right;">
                                                {{items.selectrows.data.filter(n => n.review_question_item_id ===
                                                item.id)?
                                                items.selectrows.data.filter(n => n.review_question_item_id ===
                                                item.id).length
                                                :0}}票
                                            </div>
                                        </div>
                                        <div class="col-md-4 clearfix" style="padding-left: 0;">
                                            <template v-for="(_item, nameIndex) in items.selectrows.data">
                                                <div class="question-avatar"
                                                     v-if="_item.review_question_item_id === item.id" :key="nameIndex">
                                                    {{_item.creator.data.name.substr(_item.creator.data.name.length - 2,
                                                    2)}}
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="col-md-12">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered">
                            <h5>任务跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <TaskFollowUp :follow-type="'任务'" :trailId='taskId' trailType='tasks'></TaskFollowUp>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div class="modal fade" id="addChildTask" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增子任务</h4>
                    </div>
                    <div class="modal-body">
                        <!-- 报错？？ -->
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                <normal-linkage-selectors ref="linkage" v-if="linkData.length>0" :myData="linkData"
                                                          :data="linkData"
                                                          @change="addLinkage"></normal-linkage-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors ref="taskType" :options="taskTypeArr" @change="addTaskType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称" v-model="taskName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-5 float-left pl-0">
                                <input-selectors :placeholder="'请选择负责人'"
                                                 @change="addPrincipal"></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member @change="addParticipant"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskLevelArr" ref="taskLevel" @change="addTaskLevel"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker ref='startTime' @change="addStartTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker ref="startMinutes" :default="startMinutes"
                                            @change="addStartMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker ref="endTime" @change="addEndTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker ref="endMinutes" :default="endMinutes" @change="addEndMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务说明</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" name="taskDescription" id="" cols="30"
                                          rows="5" title="" v-model="taskIntroduce"></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- 是否确认删除 -->

                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" @click="addChildTask">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <flag @confirmFlag="deleteAttachment"/>
        <Modal id="push-reason" title="推荐原因" @onOK="submitPush">
            <div class="example">
                <div class="col-md-2 text-right float-left">推荐原因</div>
                <div class="col-md-10 float-left pl-0">
                    <textarea class="form-control" cols="30" rows="5"
                              title="" v-model="pushReason"></textarea>
                </div>
            </div>
        </Modal>
        <customize-field></customize-field>

    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {

        data: function () {
            return {
                taskId: this.$route.params.id,
                changeInfo: {},
                isEdit: false,
                total: 0,
                current_page: 0,
                total_pages: 0,
                // showChildTask: false,
                taskInfo: {},
                participantsArr: [],
                flagParticipantsIdArr: [],
                changeParticipantInfo: '',
                newChildTask: {},
                taskName: '',
                taskIntroduce: '',
                taskType: '',
                principal: '',
                participants: '',
                taskLevel: 1,
                startTime: '',
                endTime: '',
                startMinutes: '00:00',
                endMinutes: '00:00',
                taskLevelArr: config.taskLevelArr,
                taskTypeArr: [],
                customizeInfo: config.customizeInfo,
                priorityArr: config.priorityArr,
                taskStatusArr: config.taskStatusArr.push({name: '全部', value: ''}),
                oldInfo: '',
                linkData: [],
                resourceType: '', // 资源type
                resourceableId: '', // 资源id
                user: {}, // 个人信息
                attachmentId: '', // 附件id
                // routerId: this.$route.params.id || '',// 路由
                questionData: [], // 问卷列表
                answerList: [], // 答题列表
                questionInfo: {
                    reviewanswer: [], // 部门人员列表
                }, // 问卷信息
                hasAnsweredArr: [], // 答过题的人
                pushReason: '', // 推荐原因
                principalId: '', // 负责人id
                questionId: '', // 问卷id
                visible: false, // 是否展示问卷
            }
        },
        created() {
            this.getLinkData()
        },

        mounted() {
            this.getTask();
            $('#addChildTask').on('show.bs.modal', function () {
                // this.showChildTask = true;
                this.isEdit = false;
            }).on('hidden.bs.modal', function () {
                // this.showChildTask = false;
            })
            this.user = JSON.parse(Cookies.get('user'))
            // 负责人默认值的设置
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            })
            this.getTaskType()
            $('#addChildTask').on('hidden.bs.modal', () => {
                // 清空state
                this.closeAddTask()
            })

            $('#push-reason').on('hidden.bs.modal', () => {
                this.pushReason = ''
            })
            this.getQuestionId()
        },

        watch: {
            'taskInfo.principal_id': function (newValue) {
                this.changeInfo.principal_id = newValue
            },
            'taskInfo.participants.data': {
                handler(newValue, oldValue) {
                    if (newValue && oldValue) {
                        this.changeParticipantInfo = newValue
                    }
                },
                deep: true
            },
            'taskInfo.start_at': function (newValue) {
                this.changeInfo.start_at = newValue
            },
            'taskInfo.status': function (newValue) {
                this.changeInfo.status = newValue
            },
            'taskInfo.priority': function (newValue) {
                this.changeInfo.priority = newValue
            },
            'taskInfo.desc': function (newValue) {
                this.changeInfo.desc = newValue
            },
            'taskInfo.end_at': function (newValue) {
                this.changeInfo.end_at = newValue
            },
            routerId(id) {
                this.taskId = id
                setTimeout(() => {
                    this.getTask();
                }, 100)
                $('#taskTab a:first').tab('show')
            }
        },

        computed: {
            principalName: function () {
                return this.$store.state.principalInfo.name
            },
            routerId() {
                return this.$route.params.id
            },
        },

        methods: {

            getTask: function () {

                let data = {
                    include: 'creator,principal,pTask,tasks.type,resource.resourceable,resource.resource,affixes,participants',
                };

                let _this = this;

                fetch('get', '/tasks/' + this.taskId, data).then(function (response) {
                    if (response.data.affixes) {
                        for (let i = 0; i < response.data.affixes.data.length; i++) {
                            let size = response.data.affixes.data[i].size;
                            response.data.affixes.data[i].size = _this.unitConversion(size)
                        }
                    }

                    _this.taskInfo = response.data;
                    _this.oldInfo = JSON.parse(JSON.stringify(response.data))
                    for (let i = 0; i < response.data.participants.data.length; i++) {
                        _this.flagParticipantsIdArr.push(response.data.participants.data[i].id)
                    }
                    let params = {
                        type: 'change',
                        data: response.data.participants.data
                    };
                    _this.$store.dispatch('changeParticipantsInfo', params);
                    params.data = response.data.principal.data;
                    _this.$store.dispatch('changePrincipal', params)
                })
            },

            editBaseInfo: function () {
                this.isEdit = true;
                this.changeInfo = {};
            },

            customize: function (value) {
                console.log(value)
            },

            showSelectMember: function (value) {
                this.isInputSelectShow = value
            },

            cancelEdit: function () {
                this.isEdit = false;
                // this.taskInfo = JSON.parse(JSON.stringify(this.oldInfo))
                this.taskInfo = this.oldInfo
            },

            changeTaskStatus: function (status) {
                let _this = this;
                fetch('put', '/tasks/' + this.taskId + '/status', {status: status}).then(function (response) {
                    if (status === 2) {
                        _this.taskInfo.status = status;
                        toastr.success("完成任务成功");

                    } else if (status === 3) {
                        toastr.success("暂停任务成功");
                    }
                })
            },

            privacyTask: function () {
                let self = this
                fetch('put', '/tasks/' + this.taskId + '/privacy').then(function () {
                    toastr.success(self.taskInfo.privacy == 1 ? '转公开成功!' : '转私密成功!');
                    self.getTask()
                })
            },

            deleteTask: function () {
                let _this = this;
                fetch('delete', '/tasks/' + this.taskId).then(function () {
                    toastr.success("删除任务成功");
                    this.$router.push({path: '/tasks'})
                })
            },

            unitConversion: function (size) {
                if (size < 1024) {
                    size = size + "B"
                } else if (size < 1024 * 1024) {
                    size = (size / 1024).toFixed(2) + "KB"
                } else if (size < 1024 * 1024 * 1024) {
                    size = (size / (1024 * 1024)).toFixed(2) + "MB"
                } else {
                    size = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB"
                }
                let sizeStr = size + "";
                let index = sizeStr.indexOf(".");
                let dou = sizeStr.substr(index + 1, 2);
                if (dou === "00") {
                    size = sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
                }
                return size
            },

            changeTaskBaseInfo: function () {
                let _this = this;
                if (this.changeInfo) {
                    fetch('put', '/tasks/' + this.taskId, this.changeInfo).then(function (response) {
                        _this.isEdit = false;
                        if (_this.changeInfo.principal_id) {
                            _this.taskInfo.principal.data = _this.$store.state.principalInfo
                        }
                    })
                }
                // @todo 修改时间组件
                if (this.changeParticipantInfo) {
                    let changeInfo = this.changeParticipantInfo;
                    let participant_ids = [];
                    for (let i = 0; i < changeInfo.length; i++) {
                        participant_ids.push(changeInfo[i].id)
                    }

                    let flagInfo = this.flagParticipantsIdArr;
                    let del_participant_ids = [];
                    for (let j = 0; j < flagInfo.length; j++) {
                        if (changeInfo.map(item => item.id).indexOf(flagInfo[j]) === -1) {
                            del_participant_ids.push(flagInfo[j])
                        }
                    }
                    let data = {
                        person_ids: participant_ids,
                        del_person_ids: del_participant_ids
                    };
                    fetch('post', '/tasks/' + this.taskId + '/participant', data).then(function () {
                        _this.isEdit = false;

                    })
                }

                toastr.success('修改成功')

            },

            changeEndTime: function (value) {
                this.taskInfo.end_at = value
            },

            changeTaskIntroduce: function (value) {
                this.taskInfo.desc = value
            },

            changeTaskLevel: function (value) {
                this.taskInfo.priority = value
            },

            changeTaskStartTime: function (value) {
                this.taskInfo.start_at = value
            },

            changeTaskPrincipal: function () {
                this.changeInfo.principal_id = this.$store.state.principalInfo.id;
            },

            uploadAttachment: function (url, name, size) {
                let _this = this;
                let data = {
                    title: name,
                    url: url,
                    size: size,
                    type: 1
                };
                fetch('post', '/tasks/' + this.taskId + '/affix', data).then(function (response) {
                    toastr.success("上传成功");
                    response.data.size = _this.unitConversion(response.data.size);
                    _this.taskInfo.affixes.data.push(response.data)
                })
            },

            deleteAttachment: function () {
                fetch('delete', '/tasks/' + this.taskId + '/affixes/' + this.attachmentId, this.changeInfo).then(response => {
                    toastr.success("删除成功");
                    let index = this.taskInfo.affixes.data.indexOf(this.taskInfo.affixes.data.find(item => item.id == this.attachmentId));
                    this.taskInfo.affixes.data.splice(index, 1);
                })
            },

            downloadAttachment: function (attachmentId, attachmentUrl) {
                window.open(attachmentUrl, '_blank');
            },
            // 添加子任务
            addChildTask: function () {
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }
                let data = {
                    title: this.taskName,
                    type: this.taskType,
                    resource_type: this.resourceType ? this.resourceType : this.linkData[0].id,
                    resourceable_id: this.resourceableId ? this.resourceableId : this.linkData[0].child[0].id,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    priority: this.taskLevel,
                    start_at: this.startTime + ' ' + this.startMinutes,
                    end_at: this.endTime + ' ' + this.endMinutes,
                    desc: this.taskIntroduce,
                };
                // 校验
                if (!data.title) {
                    toastr.error('请填写任务名称！')
                    return
                }
                if (!data.type) {
                    toastr.error('请选择任务类型！')
                    return
                }
                if (!data.priority) {
                    toastr.error('请选择任务优先级！')
                    return
                }
                if (!this.startTime || !this.endTime) {
                    toastr.error('请选择时间!')
                    return
                }
                if (data.start_at > data.end_at) {
                    toastr.error('开始时间不能晚于截止时间!')
                    return
                }
                let self = this
                fetch('post', '/tasks/' + this.taskId + '/subtask', data).then(function (response) {
                    toastr.success('添加成功');
                    $('#addChildTask').modal('hide');
                    // this.taskInfo.tasks.data.push(response.data)
                    self.getTask();
                })
            },

            addTaskType: function (value) {
                this.taskType = value
            },

            addPrincipal: function (value) {
                this.principal = value
            },

            addParticipant: function (value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id)
                }
                this.participants = flagArr
            },

            addTaskLevel: function (value) {
                this.taskLevel = value
            },

            addStartTime: function (value) {
                this.startTime = value
            },

            addEndTime: function (value) {
                this.endTime = value
            },

            addLinkage: function (type, value, id, index) {
                if (type === 'father') {
                    this.getChildLinkData(value, index)
                    this.resourceType = id
                } else if (type === 'child') {
                    this.resourceableId = value
                }
            },

            addStartMinutes: function (value) {
                this.startMinutes = value
            },

            addEndMinutes: function (value) {
                this.endMinutes = value
            },
            redirectTaskDetail: function (taskId) {
                this.$router.push({path: '/tasks/' + taskId, force: true})
                // this.$router.replace({path: '/tasks/' + taskId})
            },
            // 获取关联父资源数据
            getLinkData() {
                fetch('get', '/resources').then(res => {
                    let code = 0
                    this.linkData = res.data.map((n, i) => {
                        if (i === 0) {
                            code = n.code
                        }
                        return {
                            name: n.title,
                            id: n.type,
                            value: n.code,
                            // type: n.type,
                            child: []
                        }
                    })
                    if (this.linkData[0].child.length === 0) {
                        this.getChildLinkData(code, 0)
                    }
                })
            },
            // 获取关联子资源数据
            getChildLinkData(url, index) {
                fetch('get', `/${url}`).then(res => {
                    const temp = this.linkData[index]
                    temp.child = res.data.map(n => {
                        return {
                            name: n.name || n.nickname || n.title || n.company,
                            id: n.id,
                            value: n.id,
                        }
                    })
                    this.resourceableId = temp.child[0].id
                    this.$set(this.linkData, index, temp)
                    setTimeout(() => {
                        this.$refs.linkage.refresh()
                    }, 100)
                })
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
            setDelInfo(id) {
                this.attachmentId = id
            },
            // 关闭新增任务
            closeAddTask() {
                this.taskName = ''
                this.taskLevel = ''
                this.$refs.taskLevel.setValue('1')
                this.taskType = ''
                this.$refs.taskType.setValue('')
                this.startTime = ''
                this.endTime = ''
                this.startMinutes = ''
                this.endMinutes = ''
                this.taskIntroduce = ''
                this.$refs.startTime.setValue('')
                this.$refs.startMinutes.setValue('00:00')
                this.$refs.endTime.setValue('')
                this.$refs.endMinutes.setValue('00:00')
                this.linkData = []
                this.getLinkData()
                this.setDefaultPrincipal()
            },
            // 设置默认负责人
            setDefaultPrincipal() {
                this.$store.commit('changeNewPrincipal', {
                    name: this.user.nickname,
                    id: this.user.id
                })
                this.$store.commit('changeNewParticipantsInfo', [])
            },
            // 获取问卷内容 
            getQuestionData(id) {
                fetch('get', `/reviewquestionnaires/${id}/show?include=sum,creator,production,reviewanswer.users`).then(res => {
                    this.questionInfo = res.data[0]
                    // 如果res为空表示无权限访问问卷
                    if (!this.questionInfo) {
                        return
                    }
                    for(const n of this.questionInfo.reviewanswer.data) {
                        if (n.user_id === this.user.id) {
                            this.visible = true
                            fetch('get', `/reviews/${id}/questions/?include=items,selectrows.creator`).then(res => {
                                // if (res.meta.error) {
                                    // 此处为问卷过期判断
                                // }
                                this.questionData = res.data
                                this.answerList = new Array(this.questionData.length)
                                res.data.map(n => {
                                    n.selectrows.data.map(m => {
                                        if (m.creator.data.is_department_principal === 1) {
                                            this.principalId = m.creator.data.id
                                        }
                                        if (!~this.hasAnsweredArr.indexOf(m.creator.data.id)) {
                                            this.hasAnsweredArr.push(m.creator.data.id)
                                        }
                                    })
                                })
                            })
                            break
                        } else {
                            this.visible = false
                        }
                    }
                })
            },
            // 试卷提交
            submit() {
                let canSubmit = true
                const params = {
                    review_question_item: {}
                }

                for (const n of this.answerList) {
                    if (!n || isNaN(n.value)) {
                        canSubmit = false
                        break
                    }
                    params.review_question_item[n.review_question_id] = n.id
                }
                if (!canSubmit) {
                    toastr.error('您有未作答题目，请作答完成后提交！')
                    return
                }
                fetch('post', `/reviews/${this.questionId}/store/Answer`, params).then(res => {
                    toastr.success('问卷提交成功！')
                    this.getQuestionData()

                })
            },
            // 推优原因提交
            submitPush() {
                if (!this.pushReason) {
                    toastr.error('请填写推优原因！')
                    return
                }
                const params = {
                    excellent: this.pushReason,
                    excellent_sum: this.questionInfo.sum.data[0].truncate
                }
                fetch('post', `/reviewquestionnaires/${this.questionId}/create/excellent`, params).then(res => {
                    $("#push-reason").modal("hide");
                    toastr.success('推优成功！')
                    this.getQuestionData()
                })
            },
            // 根据任务id获取是否有问卷
            getQuestionId() {
                fetch('get', `/bloggers/${this.taskId}/taskblogger`).then(res => {
                    if (res.data) {
                        this.questionId = res.data.id
                        this.getQuestionData(res.data.id)
                    }
                })
            }
        }
    }
</script>

<style scoped>
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

    .attachment-upload {
        position: relative;
        display: inline-block;
    }

    .attachment-upload i {
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
    }

    .attachment-upload input {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        width: 25px;
        margin: 10px;
    }

    .child-attachment-upload input {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        width: 80px;
        cursor: pointer;
    }

    .file-list {
        padding: 0;
    }

    .file-list li {
        list-style: none;
        padding-bottom: 15px;
    }

    .file-list li:last-child {
        padding-bottom: 0;
    }

    .progress-bar-warning {
        background-color: #4253B6;
        position: relative;
    }

    .question {
        margin: 20px 0;
    }

    .question .name {
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .progress {
        height: 4px;
        margin-bottom: 0;
        margin-top: 10px;
        overflow: unset;
    }

    .progress-label {
        color: #333;
        font-size: 14px;
        top: -5px;
        position: absolute;
        right: -46px;
    }

    .progress-label:after {
        /* content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        background: #fff;
        right: 38px;
        border: 1px solid #eee;
        border-radius: 50%; */
    }

    .options {
        margin: 10px 0;
    }

    .options .title label {
        cursor: pointer;
    }

    .question-avatar {
        /* display: inline-block; */
        float: left;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        background: #3188E6;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        top: -4px;
    }

    .select-avatar {
        position: absolute;
        /* background: rgba(0, 0, 0, 0.2); */
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .select-avatar:before, .unselect-avatar:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
    }

    .select-avatar:after, .unselect-avatar:after {
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        right: 2px;
        bottom: 2px;
        background: #4CAF50;
    }

    .unselect-avatar:after {
        background: #FF9800;
    }

    .all-menber {
        margin-top: 20px;
    }

    .radio-custom label::before {
        width: 14px;
        height: 14px;
    }

    .radio-custom input[type=radio]:checked + input[type=hidden] + label::before, .radio-custom input[type=radio]:checked + label::before {
        border-width: 7px;
        border-color: #3298DC;
    }

    .radio-custom label::after {
        top: 4px;
        left: 4px;
    }

    .radio-custom label {
        top: 2px;
    }
</style>
