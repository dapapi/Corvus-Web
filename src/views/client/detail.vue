<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">客户</h1>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block">
                    <h4 class="card-title">{{ clientInfo.company }}</h4>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left clearfix pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>负责人
                            </div>
                            <div class="font-weight-bold float-left" v-if="clientInfo.principal">
                                {{ clientInfo.principal?clientInfo.principal.data.name:'' }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left clearfix pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="md-plus pr-2" aria-hidden="true"></i>决策关键人/部门
                            </div>
                            <div class="font-weight-bold float-left">
                                {{ clientInfo.keyman }}
                            </div>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left clearfix pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>类型
                            </div>
                            <div class="font-weight-bold float-left" v-if="clientInfo.type">
                                {{ clientTypeArr.find(item => item.value == clientInfo.type).name }}
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="col-md-6 float-left pl-0 mb-20" style="border-right: 1px solid #eee">
                            <div class="col-md-6">任务 5/12</div>
                            <div class="clearfix example">
                                <div class="col-md-3 float-left">电话会议</div>
                                <div class="col-md-3 float-left">张佳佳</div>
                                <div class="col-md-3 float-left">2018-12-03 11:10</div>
                                <div class="col-md-3 float-left">进行中</div>
                            </div>
                            <div class="clearfix example">
                                <div class="col-md-3 float-left">电话会议</div>
                                <div class="col-md-3 float-left">张佳佳</div>
                                <div class="col-md-3 float-left">2018-12-03 11:10</div>
                                <div class="col-md-3 float-left">进行中</div>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0 mb-20">
                            <div class="col-md-6">项目</div>
                            <div class="clearfix example">
                                <div class="col-md-3 float-left">Ugg代言</div>
                                <div class="col-md-3 float-left">商务项目</div>
                                <div class="col-md-3 float-left">2018-12-03 11:10</div>
                                <div class="col-md-3 float-left">进行中</div>
                            </div>
                            <div class="clearfix example">
                                <div class="col-md-3 float-left">星巴克代言</div>
                                <div class="col-md-3 float-left">商务项目</div>
                                <div class="col-md-3 float-left">2018-12-03 11:10</div>
                                <div class="col-md-3 float-left">进行中</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="panel col-md-12 col-lg-12">

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-trail"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">销售线索</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getClientProject">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">项目</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getClientTask">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">任务</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-base"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">概况</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getClientContact">
                            <a class="nav-link" data-toggle="tab" href="#forum-contact"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">联系人</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content nav-tabs-animate bg-white col-md-12" v-if="clientInfo">
                    <div class="tab-pane animation-fade pb-20 active" id="forum-trail" role="tabpanel">

                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">线索务名称</th>
                                <th class="cell-300" scope="col">销售进展</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">关联公司</th>
                                <th class="cell-300" scope="col">录入日期</th>
                            </tr>
                            <tbody>
                            <tr v-for="trail in clientTrailsInfo">
                                <td>
                                    <router-link :to="{name: 'trails/detail', params: {id: trail.id}}">{{ trail.title
                                        }}
                                    </router-link>
                                </td>
                                <td>
                                    <template v-if="trail.progress_status === 1">未确定合作</template>
                                    <template v-if="trail.progress_status === 2">已确定合作</template>
                                    <template v-if="trail.progress_status === 0">已拒绝</template>
                                </td>
                                <td>{{ trail.principal?trail.principal.data.name: '' }}</td>
                                <td>{{ trail.client?trail.client.data.company:'' }}</td>
                                <td>{{ trail.created_at }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="col-md-1" style="margin: 6rem auto" v-if="clientTrailsInfo.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20" id="forum-project" role="tabpanel">
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">项目名称</th>
                                <th class="cell-300" scope="col">项目状态</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">关联公司</th>
                                <th class="cell-300" scope="col">录入日期</th>
                            </tr>
                            <tr v-for="project in clientProjectsInfo">
                                <td>
                                    <router-link :to="{name: 'projects/detail', params: {id: project.id}}">{{
                                        project.title }}
                                    </router-link>
                                </td>
                                <td>
                                    <template v-if="project.status === 1">进行中</template>
                                    <template v-if="project.status === 2">完成</template>
                                    <template v-if="project.status === 3">终止</template>
                                    <template v-if="project.status === 4">删除</template>
                                </td>
                                <td>{{ project.principal?project.principal.data.name:'' }}</td>
                                <td>{{ project.trail.data.client.data.company}}</td>
                                <td>{{ project.created_at }}</td>
                            </tr>
                        </table>
                        <div class="col-md-1" v-if="clientProjectsInfo.length === 0" style="margin: 6rem auto">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">任务名称</th>
                                <th class="cell-300" scope="col">任务类型</th>
                                <th class="cell-300" scope="col">状态</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">截止时间</th>
                            </tr>
                            <tbody>
                            <tr v-for="task in clientTasksInfo">
                                <td>
                                    <router-link :to="{name: 'tasks/detail', params: {id: task.id}}">{{ task.title }}
                                    </router-link>
                                </td>
                                <td>{{ task.type?task.type.data.title:'' }}</td>
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
                        <div class="col-md-1" style="margin: 6rem auto" v-if="clientTasksInfo.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                             data-target="#addTask">
                            <button type="button"
                                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20" id="forum-base" role="tabpanel">
                        <div class="card" v-if="clientInfo.company">
                            <div class="card-header card-header-transparent card-header-bordered">
                                <div class="float-left font-weight-bold third-title">客户详情</div>
                                <div class="float-right pointer-content">
                                    <i class="icon md-edit" aria-hidden="true" @click="editBaseInfo"></i>
                                </div>
                                <div class="float-right mr-40" v-show="isEdit">
                                    <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                                    <button class="btn btn-primary" @click="changeClientBaseInfo">确定</button>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">公司名称</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <EditInput :content="clientInfo.company" :is-edit="isEdit"
                                                   @change="changeClientName"></EditInput>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">级别</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <EditSelector :options="clientLevelArr" :is-edit="isEdit"
                                                      :content="clientInfo.grade"
                                                      @change="changeClientLevel"></EditSelector>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">决策关键人/部门</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <EditInput :content="clientInfo.keyman"
                                                   :is-edit="isEdit" @change="changeClientDecision"></EditInput>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">负责人</div>
                                    <div class="col-md-5 float-left font-weight-bold">

                                        <EditInput-selector :is-edit="isEdit" :placeholder="'请选择负责人'"
                                                            @change="selectPrincipal"
                                                            :select-type="'principal'"></EditInput-selector>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">地区</div>
                                    <div class="col-md-5 float-left font-weight-bold region">
                                        <template v-if="!isEdit">
                                            {{clientInfo.province}}{{clientInfo.city}}{{clientInfo.district}}
                                        </template>
                                        <template v-else>
                                            <RegionSelector :provinceVal="clientInfo.province" :cityVal="clientInfo.city" :areaVal="clientInfo.district" @setAreaData="changeAreaData" />
                                        </template>

                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">详细地址</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <EditInput :content="clientInfo.address" :is-edit="isEdit"
                                                   @change="changeClientAddress"></EditInput>
                                    </div>
                                </div>

                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">规模</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <EditSelector :options="clientScaleArr" :is-edit="isEdit"
                                                      :content="clientInfo.size"
                                                      @change="changeClientScale"></EditSelector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">备注</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <editTextarea :content="clientInfo.desc"
                                                      :is-edit="isEdit" @change="changeClientDesc"></editTextarea>
                                    </div>
                                </div>

                                <div class="segmentation-line example"></div>

                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">录入人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        {{clientInfo.creator?clientInfo.creator.data.name:''}}
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">录入时间</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        {{clientInfo.created_at?clientInfo.created_at:''}}
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">最近更新人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                    {{clientInfo.last_updated_user?clientInfo.last_updated_user:''}}
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">最近更新时间</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        {{clientInfo.updated_at?clientInfo.updated_at:''}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-contact"
                         role="tabpanel">
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">联系人</th>
                                <th class="cell-300" scope="col">关联公司</th>
                                <th class="cell-300" scope="col">联系人电话</th>
                                <th class="cell-300" scope="col">职位</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">操作</th>
                            </tr>
                            <tbody>
                            <tr v-for="contact in clientContactsInfo">
                                <td>{{ contact.name }}</td>
                                <td>{{ clientInfo.company }}</td>
                                <td>{{ contact.phone }}</td>
                                <td>{{ contact.position }}</td>
                                <td>{{ clientInfo.principal?clientInfo.principal.data.name:'' }}</td>
                                <td>
                                    <span class="pr-20 d-block float-left pointer-content"
                                          style="color: #b9b9b9;"
                                          data-plugin="actionBtn" data-toggle="modal"
                                          data-target="#addContact"
                                          @click="changeEditStatus(false,contact)"
                                    >
                                        <i class="icon md-edit" aria-hidden="true"></i>
                                    </span>
                                    <span class="d-block float-left"
                                          style="width: 1px; height: 14px;border-right: 1px solid #b9b9b9;margin: 3px;"></span>
                                    <span class="pl-20 d-block float-left pointer-content" style="color: #b9b9b9"
                                          data-plugin="actionBtn" @click="setDelInfo(contact.id)" data-toggle="modal"
                                          data-target="#confirmFlag" typeText="删除">
                                        <i class="icon md-delete" aria-hidden="true"></i>
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="col-md-1" style="margin: 6rem auto" v-if="clientContactsInfo.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                             data-target="#addContact"
                             @click="changeEditStatus(true)">
                            <button type="button"
                                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            <div class="panel">
                <div class="col-md-12">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered">
                            <h5>客户跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <TaskFollowUp :follow-type="'客户'" :trailId='clientId'
                                              trailType='clients'></TaskFollowUp>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addContact" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">{{isEditContact?'新增联系人':'修改联系人'}}</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联公司</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control" disabled="disabled"
                                       :placeholder="clientInfo.company">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control"
                                       placeholder="请输入联系人" v-model="editConfig.name">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人电话</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control"
                                       placeholder="请输入联系人电话" v-model="editConfig.phone"/>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">职位</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control"
                                       placeholder="请输入联系人职位" v-model="editConfig.position">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" @click="addContact">确定</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增任务</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                客户 - {{ clientInfo.company }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskTypeArr" @change="changeTaskType"></selectors>
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
                                                 @change="taskPrincipalChange"></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member @change="taskParticipantChange"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskLevelArr" @change="changeTaskLevel"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-4 float-left pl-0">
                                <datepicker @change="changeStartTime"></datepicker>
                            </div>
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-4 float-left pl-0">
                                <datepicker @change="changeEndTime"></datepicker>
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
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addTask">确定</button>
                    </div>

                </div>
            </div>
        </div>

        <!-- 是否确认删除 -->
        <flag @confirmFlag="delContact"/>
    </div>

</template>

<script>

    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        data: function () {
            return {
                clientId: '',
                changeInfo: {},
                clientTypeArr: config.clientTypeArr,
                clientLevelArr: config.clientLevelArr,
                clientScaleArr: config.clientScaleArr,
                taskTypeArr: [],
                taskLevelArr: config.taskLevelArr,
                multiple: false,
                taskType: '',
                taskName: '',
                taskPrincipal: '',
                taskParticipant: '',
                taskIntroduce: '',
                taskStartTime: '',
                startMinutes: '00:00',
                endMinutes: '00:00',
                taskEndTime: '',
                taskLevel: 1,
                isEdit: false,
                clientInfo: {},
                clientTasksInfo: [],
                clientTrailsInfo: [],
                clientContactsInfo: [],
                contactName: '',
                contactPhone: '',
                contactPosition: '',
                clientProjectsInfo: '',
                taskPrincipalId: '', // 负责人
                participantIds: [], // 参与人
                isEditContact: true,
                editConfig: {
                    position: '',
                    name: '',
                    phone: ''
                }, // 修改的联系人信息
                contactId: '', // 联系人id
            }
        },
        beforeMount() {
            this.clientId = this.$route.params.id;
        },
        mounted() {
            let _this = this;
            setTimeout(function () {
                _this.getClient();
                _this.getClientTrail();
                _this.getClientProject()
            }, 100);
            this.getTaskType()
        },

        watch: {
            'clientInfo.company': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                this.changeInfo.company = newValue
            },
            'clientInfo.type': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                this.changeInfo.type = newValue
            },
            'clientInfo.grade': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                this.changeInfo.grade = newValue
            },
            'clientInfo.keyman': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                this.changeInfo.keyman = newValue
            },
            'clientInfo.size': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                this.changeInfo.size = newValue
            },
            'clientInfo.address': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                this.changeInfo.address = newValue
            },
            'clientInfo.desc': function (newValue, oldValue) {
                if (oldValue === undefined) {
                    return
                }
                this.changeInfo.desc = newValue
            },
        },

        methods: {

            getClient: function () {
                let _this = this;
                fetch('get', '/clients/' + this.clientId, {include: 'principal,creator'}).then(function (response) {
                    _this.clientInfo = response.data;

                    let params = {
                        type: 'change',
                        data: response.data.principal.data
                    };
                    _this.$store.dispatch('changePrincipal', params);
                })
            },

            getClientTrail: function () {
                if (this.clientTrailsInfo.length > 0) {
                    return
                }
                let _this = this;
                let data = {
                    type: 'clients',
                    id: this.clientId,
                    include: 'principal,client'
                };
                fetch('get', '/trails/search', data).then(function (response) {
                    _this.clientTrailsInfo = response.data
                })
            },

            getClientTask: function () {
                if (this.clientTasksInfo.length > 0) {
                    return
                }
                let data = {
                    type: 'clients',
                    id: this.clientId,
                    include: 'principal'
                };
                let _this = this;
                fetch('get', '/clients/' + this.clientId + '/tasks', data).then(function (response) {
                    _this.clientTasksInfo = response.data;
                })
            },

            getClientProject: function () {
                if (this.clientProjectsInfo.length > 0) {
                    return
                }
                let data = {
                    include: 'principal,trail.expectations,trail.client'
                };
                let _this = this;
                fetch('get', `/clients/${this.clientId}/projects`, data).then(function (response) {
                    _this.clientProjectsInfo = response.data
                })
            },

            getClientContact: function () {
                // if (this.clientContactsInfo.length > 0) {
                //     return
                // }
                let _this = this;
                fetch('get', '/clients/' + this.clientId + '/contacts').then(function (response) {
                    _this.clientContactsInfo = response.data

                })
            },

            addContact: function () {
                let data = {}

                if (this.editConfig.phone.length !== 11) {
                    toastr.error('手机号码格式不对！')
                    return
                }
                data = {
                    name: this.editConfig.name || '',
                    phone: this.editConfig.phone,
                    position: this.editConfig.position
                }

                let _this = this
                fetch(this.isEditContact ? 'post' : 'put', `/clients/${this.clientId}/contacts${!this.isEditContact ? '/' + this.editConfig.id : ''}`, data).then(function (response) {
                    _this.clientContactsInfo.push(response.data);
                    toastr.success(_this.isEditContact ? '添加成功！' : '修改成功')
                    _this.getClientContact()
                    $('#addContact').modal('hide')
                })
            },
            delContact() {
                let _this = this
                fetch('delete', `/clients/${this.clientId}/contacts/${this.contactId}`).then(function (response) {
                    toastr.success('删除成功')
                    _this.getClientContact()
                })
            },

            changeClientBaseInfo: function () {
                let _this = this;
                fetch('put', '/clients/' + this.clientId, this.changeInfo).then(function () {
                    _this.isEdit = false;
                    toastr.success('修改成功')
                    _this.getClient();
                    _this.getClientTrail();
                })
            },

            editBaseInfo: function () {
                this.isEdit = true;
                this.changeInfo = {};
            },

            cancelEdit: function () {
                this.isEdit = false
                this.getClient()
            },

            changeClientType: function (value) {
                this.clientInfo.type = value
            },

            changeClientName: function (value) {
                this.clientInfo.company = value
            },

            changeClientAddress: function (value) {
                this.clientInfo.address = value
            },

            changeClientLevel: function (value) {
                this.clientInfo.grade = value
            },

            changeClientDecision: function (value) {
                this.clientInfo.keyman = value
            },

            changeClientScale: function (value) {
                this.clientInfo.size = value
            },

            changeClientDesc: function (value) {
                this.clientInfo.desc = value
            },

            addTask: function () {
                let _this = this;
                let data = {
                    resource_type: 4,
                    resourceable_id: this.clientId,
                    title: this.taskName,
                    type: this.taskType,
                    principal_id: this.taskPrincipalId, // 负责人 principal_id
                    priority: this.taskLevel,
                    start_at: this.taskStartTime + ' ' + this.startMinutes,
                    end_at: this.taskEndTime + ' ' + this.endMinutes,
                    desc: this.taskIntroduce,
                    participant_ids: this.participantIds
                };
                if (!data.title) {
                    toastr.error('请填写任务名称')
                    return
                }

                if (!this.taskStartTime) {
                    toastr.error('请选择开始时间')
                    return
                }

                if (!this.taskEndTime) {
                    toastr.error('请选择截止时间')
                    return
                }

                if (this.taskStartTime > this.taskEndTime) {
                    toastr.error('开始时间不能晚于截止时间')
                    return
                }

                if (!data.principal_id) {
                    toastr.error('请选择负责人')
                }

                fetch('post', '/tasks', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    _this.editConfig = {}
                    _this.clientTasksInfo.push(response.data)
                    _this.getClient();
                    _this.getClientTrail();
                    _this.getClientProject()
                })
            },

            changeTaskType: function (value) {
                this.taskType = value
            },

            taskPrincipalChange: function (value) {
                this.taskPrincipalId = value.id
            },

            taskParticipantChange: function (value) {
                const _arr = this.$store.state.newParticipantsInfo.map(n => n.id)
                this.participantIds = _arr
            },

            changeStartTime: function (value) {
                this.taskStartTime = value
            },

            changeEndTime: function (value) {
                this.taskEndTime = value
            },

            changeTaskLevel: function (value) {
                this.taskLevel = value
            },
            selectPrincipal(value) {
                this.changeInfo.principal_id = value
            },
            changeEditStatus(value, config) {
                this.editConfig = config || {
                    position: '',
                    name: '',
                    phone: ''
                }
                this.isEditContact = value
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
            // 获取要删除的信息
            setDelInfo(id) {
                this.contactId = id
            },
            // 选择地区
            changeAreaData (val) {
                if (val.area.name) {
                    this.changeInfo.province = val.province.name
                    this.changeInfo.city = val.city.name !== '市辖区' ? val.city.name : val.province.name
                    this.changeInfo.district = val.area.name
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
 .region {
        /deep/ .page-content {
            padding: 0;
            .modal-body {
                padding: 0;
                .form-group {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
