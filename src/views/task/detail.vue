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
                    <a class="dropdown-item" role="menuitem" @click="privacyTask">{{taskInfo.privacy == 1?'转公开':'转私密'}}</a>
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
<<<<<<< HEAD
                    <div>
                        <!-- <i class="iconfont icon-tubiaochicundaochuSVGshangchuandaoalibaba- pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-zuzhijiagou pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-zhengque pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-xiaoshoushichang pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-tianjiajiahaowubiankuang pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-tijiaoshenqing pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-iconfontshijian pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-xiaoshou pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-tianjiarenyuan pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-renyuanfenzu pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-wenjian pr-2" aria-hidden="true"></i>
                        <i class="iconfont icon-nianling pr-2" aria-hidden="true"></i> -->

                    </div>
=======
>>>>>>> c0efbb502e4d332618058c7556baa0a871efeef9
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
                            <template v-if="taskInfo.status === 1">进行中</template>
                            <template v-else-if="taskInfo.status === 2">已完成</template>
                            <template v-else-if="taskInfo.status === 3">已停止</template>
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
                                        <EditSelector :content="taskInfo.priority?taskInfo.priority: ''" :is-edit="isEdit"
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
                                    <i class="md-attachment-alt" aria-hidden="true"></i>
                                    <FileUploader @change="uploadAttachment"></FileUploader>
                                </div>
                            </div>
                            <div class="card-block">
                                <ul class="file-list">
                                    <li v-for="attachment in taskInfo.affixes?taskInfo.affixes.data:[]">
                                        <i class="md-file pr-5"></i>{{ attachment.title }}
                                        <span class="float-right pl-10 pointer-content"
                                         data-plugin="actionBtn" @click="setDelInfo(attachment.id)" data-toggle="modal"
                                            data-target="#confirmFlag">删除</span>

                                        <!-- <span class="pl-20 d-block float-left pointer-content" style="color: #b9b9b9"typeText="删除">
                                        <i class="md-delete" aria-hidden="true"></i> -->
                                    <!-- </span> -->
                                        <span class="float-right px-10">|</span>
                                        <span class="float-right px-10 pointer-content"
                                              @click="downloadAttachment(attachment.id, attachment.url)">下载</span>
                                        <span class="float-right px-10">{{ attachment.size }}</span>
                                    </li>
                                </ul>
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

                        <div class="col-md-1" style="margin: 6rem auto" v-if="taskInfo.tasks&&taskInfo.tasks.data.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>

                        <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                             data-target="#addChildTask">
                            <button type="button"
                                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                <i class="front-icon iconfont icon-tianjiajiahaowubiankuang1 animation-scale-up" aria-hidden="true"></i>
                                <i class="back-icon iconfont icon-tianjiajiahaowubiankuang1 animation-scale-up" aria-hidden="true"></i>
                            </button>
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
                                <normal-linkage-selectors ref="linkage" v-if="linkData.length>0" :myData="linkData" :data="linkData" @change="addLinkage"></normal-linkage-selectors>
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
                                <timepicker ref="startMinutes" :default="startMinutes" @change="addStartMinutes"></timepicker>
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
        <flag @confirmFlag="deleteAttachment" />

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
            }
        },
        created () {
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
            routerId (id) {
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
            routerId () {
                return this.$route.params.id
            }
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
                    toastr.success(self.taskInfo.privacy == 1?'转公开成功!':'转私密成功!');
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
                    resource_type: this.resourceType?this.resourceType:this.linkData[0].id,
                    resourceable_id: this.resourceableId?this.resourceableId:this.linkData[0].child[0].id,
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
            getLinkData () {
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
            getChildLinkData (url, index) {
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
            getTaskType () {
                fetch('get', '/task_types').then(res => {
                    const data = res.data
                    this.taskTypeArr = data.map(n => {
                        return {name: n.title, value: n.id}
                    })
                    this.taskTypeArr.unshift({name: '全部', value: ''})
                })
            },
            setDelInfo (id) {
                this.attachmentId = id
            },
            // 关闭新增任务
            closeAddTask () {
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
            setDefaultPrincipal () {
                this.$store.commit('changeNewPrincipal', {
                    name: this.user.nickname,
                    id: this.user.id
                })
                this.$store.commit('changeNewParticipantsInfo', [])
            },
        }
    }
</script>

<style>
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

</style>
