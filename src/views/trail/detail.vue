<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">销售线索</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <div class="font-info pointer-content" data-target="#refuseTrail" data-toggle="modal">拒绝</div>
            </div>
        </div>

        <div class="page-content container-fluid" v-if="trailInfo">

            <div class="panel col-md-12">
                <div class="card-block">
                    <h4 class="card-title">{{ trailInfo.title }}</h4>

                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>线索类型
                            </div>
                            <div class="font-weight-bold float-left">
                                <template v-if="trailInfo.type === 1">影视线索</template>
                                <template v-if="trailInfo.type === 2">综艺线索</template>
                                <template v-if="trailInfo.type === 3">商务线索</template>
                                <template v-if="trailInfo.type === 4">papi线索</template>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>负责人
                            </div>
                            <div class="font-weight-bold float-left" v-if="trailInfo.principal">
                                {{ trailInfo.principal.data.name }}
                            </div>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>销售进展
                            </div>
                            <div class="font-weight-bold float-left">
                                <template v-if="trailInfo.progress_status === 1">未确定合作</template>
                                <template v-else-if="trailInfo.progress_status === 2">确定合作</template>
                                <template v-else-if="trailInfo.progress_status === 0">已拒绝</template>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>预计费用
                            </div>
                            <div class="font-weight-bold float-left">
                                <template v-if="trailInfo.fee">
                                    {{ trailInfo.fee }}
                                </template>
                                <template v-else>
                                    0
                                </template>
                                /元
                            </div>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>目标艺人
                            </div>
                            <div class="font-weight-bold float-left" v-if="trailInfo.expectations">
                            <span v-for="expectation in trailInfo.expectations.data" :key="expectation.name">
                                {{ expectation.name }}
                            </span>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>推荐艺人
                            </div>
                            <div class="font-weight-bold float-left" v-if="trailInfo.recommendations">
                            <span v-for="recommendation in trailInfo.recommendations.data" :key="recommendation.name">
                                {{ recommendation.name }}
                            </span>
                            </div>
                        </div>
                    </div>

                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>公司
                            </div>
                            <div class="font-weight-bold float-left pointer-content hover-content"
                                 @click="redirectCompany(trailInfo.client.data.id)" v-if="trailInfo.client">
                                {{ trailInfo.client.data.company }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>项目
                            </div>
                            <div class="font-weight-bold float-left pointer-content hover-content"
                                 @click="redirectProject(trailInfo.project.data.id)" v-if="trailInfo.project">
                                {{ trailInfo.project.data.title }}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-12 panel">

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-trail-base"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">概况</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getTrailTask">
                            <a class="nav-link" data-toggle="tab" href="#forum-trail-tasks"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">任务</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate bg-white col-md-12">
                        <div class="tab-pane animation-fade active" id="forum-trail-base" role="tabpanel">
                            <div class="card">
                                <div class="card-header card-header-transparent card-header-bordered">
                                    <div class="float-left font-weight-bold third-title">销售线索信息</div>
                                    <div class="float-right pointer-content">
                                        <i class="icon md-edit" aria-hidden="true" @click="editBaseInfo"></i>
                                    </div>
                                    <div class="float-right mr-40" v-show="isEdit">
                                        <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                                        <button class="btn btn-primary" @click="changeTrailBaseInfo">确定</button>
                                    </div>
                                </div>
                                <div class="card-block">
                                    <div class="clearfix">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">线索名称</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <span v-show="!isEdit">{{trailInfo.title}}</span>
                                                <EditInput :is-edit="isEdit" v-show="isEdit" :content='trailInfo.title'
                                                           @change="changeTrailName"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">线索来源</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <div class="float-left" v-if="trailOriginArr.length > 0">
                                                    <span v-show="!isEdit">{{getResourceType}}</span>
                                                    <EditSelector :options="trailOriginArr"
                                                                  :is-edit="isEdit"
                                                                  @change="changeResourceType"></EditSelector>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">负责人</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <!-- <span v-show="!isEdit" >{{ trailInfo.principal.data.name }}</span> -->
                                                <EditInput-selector :is-edit="isEdit"
                                                                    @change="changeTrailPrincipal"></EditInput-selector>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">预计费用</div>
                                            <div class="col-md-10 float-left font-weight-bold expfee">
                                                <edit-number-spinner :content="trailInfo.fee" :is-edit="isEdit"
                                                                     @change="changeTrailFee"></edit-number-spinner>
                                                元
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">目标艺人</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <span v-for="expectation in trailInfo.expectations.data"
                                                      :key="expectation.name" v-if="!isEdit">
                                                    {{ expectation.name }}
                                                </span>
                                                <EditSelector :options="starsArr" :is-edit="isEdit"
                                                              :multiple="true" :content="selectedExpectationsArr"
                                                              :contentHide='true'
                                                              @valuelistener="changeExpectations"></EditSelector>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">推荐艺人</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                 <span v-for="recommendations in trailInfo.recommendations.data"
                                                       :key="recommendations.name" v-if="!isEdit">
                                                    {{ recommendations.name }}
                                                </span>
                                                <EditSelector :options="starsArr" :is-edit="isEdit"
                                                              :content="selectedRecommendationsArr"
                                                              :multiple="true" :contentHide='true'
                                                              @change="changeRecommendations"></EditSelector>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">行业</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :options="industriesArr"
                                                              :content="trailInfo.industry_id"
                                                              @change="changeIndustry"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">优先级</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit"
                                                              :options="taskLevelArr"
                                                              :content="trailInfo.priority"
                                                              @change='changeTrailTaskLevel'></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             v-if="trailInfo.type === 4" :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">是否锁价</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :options="lockArr"
                                                              :content="trailInfo.lock_status"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             v-if="trailInfo.type !== 4" :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">线索状态</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <!-- <span v-if="!isEdit">{{trailStatus}}</span> -->
                                                <EditSelector :is-edit="isEdit"
                                                              :options="trailStatusArr"
                                                              @change="changeTrailStatus"
                                                              :content="trailInfo.status"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">合作类型</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit"
                                                              :options="cooperationTypeArr"
                                                              @change='changeCooperationType'
                                                              :content='trailInfo.cooperation_type'></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">品牌名称</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="trailInfo.brand" :is-edit="isEdit"
                                                           @change="changeTrailBrand"></EditInput>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">公司名称</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="trailInfo.client.data.company" :is-edit="isEdit"
                                                           @change="changeTrailCompany" disabled></EditInput>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">级别</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :content="trailInfo.client.data.grade" :is-edit="isEdit"
                                                              @change="changeTrailCompanyLevel"
                                                              :options="clientLevelArr"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">联系人</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="trailInfo.contact.data.name" :is-edit="isEdit"
                                                           @change="changeTrailContact"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">联系人电话</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="trailInfo.contact.data.phone" :is-edit="isEdit"
                                                           @change="changeTrailContactPhone"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">备注</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <editTextarea :content="trailInfo.desc" :is-edit="isEdit"
                                                              @change="changeTrailDesc"></editTextarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">录入人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">录入时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                        </div>
                                    </div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">最近更新人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">最近更新时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                        </div>
                                    </div>
                                    <div v-if="trailInfo.type === 4">
                                        <div class="card-text py-5 clearfix">
                                            <div class="col-md-1 float-left text-right pl-0">锁价人</div>
                                            <div class="col-md-5 float-left font-weight-bold">
                                            </div>
                                            <div class="col-md-1 float-left text-right pl-0">锁价日期</div>
                                            <div class="col-md-5 float-left font-weight-bold">
                                            </div>
                                        </div>
                                        <div class="card-text py-5 clearfix">
                                            <div class="col-md-1 float-left text-right pl-0">保护截止日期</div>
                                            <div class="col-md-5 float-left font-weight-bold">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-trail-tasks"
                             role="tabpanel">
                            <table class="table table-hover is-indent example" data-plugin="animateList"
                                   data-animate="fade"
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
                                <tr v-for="task in trailTasksInfo">
                                    <td>{{ task.title }}</td>
                                    <td>{{ task.type }}</td>
                                    <td>
                                        <template v-if="task.status === 1">进行中</template>
                                        <template v-else-if="task.status === 2">已完成</template>
                                        <template v-else-if="task.status === 3">已停止</template>
                                    </td>
                                    <td>{{ task.principal.data.name }}</td>
                                    <td>{{ task.end_at }}</td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                 data-target="#addTask">
                                <button type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                                    <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div class="panel">
                <div class="col-md-12">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered">
                            <h5>销售线索跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <TaskFollowUp :follow-type="'线索'" :trailId="trailId" trailType='trails'
                                              v-if="trailId"></TaskFollowUp>
                            </div>
                        </div>
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
                                销售线索 - {{ trailInfo.title }}
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
                                                 @change="principalChange"></input-selectors>
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

        <div class="modal fade" id="refuseTrail" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">拒绝原因</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">拒绝类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="refuseTypeArr" @change="changeRefuseType"
                                           placeholder="请选择拒绝种类"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">拒绝原因</div>
                            <div class="col-md-10 float-left pl-0">
                                 <textarea class="form-control" title="" placeholder="请输入拒绝原因"
                                           v-model="refuseReason"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="refuseTrail">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        data: function () {
            return {
                total: 0,
                current_page: 0,
                total_pages: 0,
                trailId: '',
                trailInfo: {},
                trailOrigin: '',
                taskName: '',
                taskIntroduce: '',
                multiple: false,
                isEdit: false,
                starsArr: [],
                industriesArr: [],
                memberPlaceholder: '请选择负责人',
                companyType: config.companyType,
                customizeInfo: config.customizeInfo,
                taskTypeArr: config.taskTypeArr,
                taskLevelArr: config.taskLevelArr,
                taskPrincipal: '',
                startMinutes: '00:00',
                taskType: '',
                endMinutes: '00:00',
                trailTasksInfo: [],
                clientLevelArr: config.clientLevelArr,
                trailOriginArr: config.trailOrigin,
                salesProgressText: '未确定合作',
                changeInfo: {},
                selectedExpectationsArr: [],
                selectedRecommendationsArr: [],
                recommendations: [],
                lockArr: config.lockArr,
                refuseTypeArr: config.refuseTypeArr,
                refuseType: '',
                refuseReason: '',
                oldInfo: '',
                expectations: [],
                getTrailTaskLevel: '',
                trailStatusArr: config.trailStatusArr,
                trailStatus: '',
                cooperationTypeArr: config.cooperationTypeArr,
            }

        },

        mounted() {
            this.getTrail();
            this.getStars();
            this.getIndustries();
        },
        computed: {
            getResourceType() {
                for (const key in this.trailOriginArr) {
                    if (this.trailOriginArr[key].value == this.trailInfo.resource_type) {
                        return this.trailOriginArr[key].name
                    }
                }
            },
            getClientLevel() {
                for (const key in this.clientLevelArr) {
                    if (this.clientLevelArr[key].value == this.trailInfo.client.data.grade) {
                        return this.clientLevelArr[key].name
                    }
                }
            }
        },
        watch: {
            'trailInfo.resource': function (newValue) {
                this.changeInfo.resource = newValue
            },
            'trailInfo.priority': function (newValue) {
                this.changeInfo.priority = newValue
            },
            'trailInfo.title': function (newValue) {
                this.changeInfo.title = newValue
            },
            'trailInfo.principal.data': {
                handler(newValue, oldValue) {
                    if (newValue != oldValue) {
                        this.changeInfo.principal_id = this.$store.state.principalInfo.id
                    }
                },
                deep: true
            },
            'trailInfo.fee': function (newValue) {
                this.changeInfo.fee = newValue
            },
            'trailInfo.brand': function (newValue) {
                this.changeInfo.brand = newValue
            },
            'trailInfo.client.data.company': function (newValue) {
                if (this.changeInfo.client) {
                    this.changeInfo.client.data.company = newValue
                } else {
                    this.changeInfo.client = {
                        data: {
                            company: newValue
                        }
                    }
                }

            },
            'trailInfo.contact.data.name': function (newValue) {
                if (this.changeInfo.contact) {
                    this.changeInfo.contact.name = newValue
                } else {
                    this.changeInfo.contact = {
                        data: {
                            name: newValue
                        }
                    }
                }
            },
            'trailInfo.desc': function (newValue) {
                this.changeInfo.desc = newValue
            },
            'trailInfo.resource_type': function (newValue) {
                this.changeInfo.resource_type = newValue
            },
            'trailInfo.contact.data.phone': function (newValue) {
                if (this.changeInfo.contact) {
                    this.changeInfo.contact.phone = newValue
                } else {
                    this.changeInfo.contact = {
                        phone: newValue
                    }
                }
            },
            'trailInfo.client.data.company': function (newValue) {
                if (this.changeInfo.client) {
                    this.changeInfo.client.company = newValue
                } else {
                    this.changeInfo.client = {
                        company: newValue
                    }
                }
            },
            'trailInfo.industry_id': function (newValue) {
                this.changeInfo.industry_id = newValue
            },
            'trailInfo.expectations': function (newValue) {
                this.changeInfo.expectations = newValue
            },
            'trailInfo.recommendations': function (newValue) {
                this.changeInfo.recommendations = newValue
            },
            'trailStatus': function (newValue) {
                this.changeInfo.status = newValue
            },
            'trailInfo.cooperation_type': function (newValue) {
                this.changeInfo.cooperation_type = newValue
            },
            'expectations': function (newValue) {
                this.changeInfo.expectation = newValue
            }
        },

        methods: {
            trailTypeValidate(){
                if(!this.trailInfo.principal){
                    toastr.error("负责人为必填");
                    return false;
                }else if(!this.trailInfo.fee){
                    toastr.error("费用为必填")
                    return false;
                }else if(!this.trailInfo.client.data.company){
                    toastr.error("公司名称为必填")
                    return false;
                }else if(!this.trailInfo.title){
                    toastr.error("线索名称为必填")
                    return false;
                }else if(!this.trailInfo.expectations){
                    toastr.error("目标艺人为必填")
                    return false; 
                }else if(!this.trailInfo.contact.data.name){
                    toastr.error("联系人为必填")
                    return false;
                }else if(this.trailInfo.contact.data.phone){
                    let phone = this.trailInfo.contact.data.phone
                    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
                        // alert("手机号码有误，请重填");  
                        toastr.error("请输入正确的手机号码");
                        return false; 
                    }else{
                        return true;
                    }  
                }else if(!this.trailInfo.contact.data.phone){
                    toastr.error("手机号码为必填")
                    return false;
                }else{
                    console.log(ture);
                    return true
                }
            },
            getTrail: function () {
                this.trailId = this.$route.params.id;
                let _this = this;
                let data = {
                    include: 'principal,client,contact,recommendations,expectations,project',
                };
                fetch('get', '/trails/' + this.trailId, data).then(function (response) {
                    console.log(response);
                    _this.trailInfo = response.data;
                    _this.oldInfo = JSON.parse(JSON.stringify(response.data));
                    for (let i = 0; i < _this.trailInfo.expectations.data.length; i++) {
                        _this.selectedExpectationsArr.push(_this.trailInfo.expectations.data[i].id)
                    }
                    for (let i = 0; i < _this.trailInfo.recommendations.data.length; i++) {
                        _this.selectedRecommendationsArr.push(_this.trailInfo.recommendations.data[i].id)
                    }
                    if (response.data.principal) {
                        let params = {
                            type: 'change',
                            data: response.data.principal.data
                        };
                        _this.$store.dispatch('changePrincipal', params);
                    }
                })
            },

            getIndustries: function () {
                let _this = this;
                fetch('get', '/industries/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.industriesArr.push({
                            id: response.data[i].id,
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
                })
            },
            changeTrailOrigin: function (value) {
                this.trailOrigin = value
            },

            changeTrailBaseInfo: function () {
                if (this.trailTypeValidate()){
                    let _this = this;
                    let data = _this.changeInfo;
                    fetch('put', '/trails/' + this.trailId, data).then(function () {
                        toastr.success('修改成功');
                        _this.isEdit = false
                        _this.getTrail()
                    })
                }
            },

            getStars: function () {
                let _this = this;
                fetch('get', '/stars/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.starsArr.push({
                            id: response.data[i].id,
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
                })
            },

            editBaseInfo: function () {
                this.isEdit = true;
                this.changeInfo = {};
            },

            cancelEdit: function () {
                this.getTrail();
                this.isEdit = false;
                this.trailInfo = JSON.parse(JSON.stringify(this.oldInfo));
                for (let i = 0; i < this.trailInfo.expectations.data.length; i++) {
                    this.selectedExpectationsArr.push(this.trailInfo.expectations.data[i].id)
                }
                for (let i = 0; i < this.trailInfo.recommendations.data.length; i++) {
                    this.selectedRecommendationsArr.push(this.trailInfo.recommendations.data[i].id)
                }
                if (this.trailInfo.principal) {
                    let params = {
                        type: 'change',
                        data: response.data.principal.data
                    };
                    store.dispatch('changePrincipal', params);
                }
            },

            getTrailTask: function () {
                if (this.trailTasksInfo.length > 0) {
                    return
                }
                let _this = this;
                fetch('get', '/trails/' + this.trailId + '/tasks').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.trailTasksInfo = response.data
                    }
                })
            },

            addTask: function () {
                let _this = this;
                let data = {
                    resource_type: 5,
                    resourceable_id: this.trailId,
                    title: this.taskName,
                    type: this.taskType,
                    principal_id: this.principal,
                    priority: this.taskLevel,
                    start_at: this.startTime + ' ' + this.startMinutes,
                    end_at: this.endTime + ' ' + this.endMinutes,
                    desc: this.taskIntroduce,
                    participant_ids: this.participants
                };
                fetch('post', '/tasks', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    _this.trailTasksInfo.push(response.data);
                })
            },

            redirectCompany: function (companyId) {
                this.$router.replace({path: '/clients/' + companyId});
            },
            redirectProject: function (projectId){
                this.$router.replace({path: '/project/' + projectId});
            },
            changeLinkage: function (value) {
                console.log(value)
            },

            changeTaskType: function (value) {
                this.taskType = value
            },

            principalChange: function (value) {
                this.principal = value.id
            },

            participantChange: function (value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id)
                }
                this.participants = flagArr
            },

            changeTaskLevel: function (value) {
                this.taskLevel = value
            },
            changeTrailTaskLevel: function (value) {
                this.trailInfo.priority = value
            },

            changeStartTime: function (value) {
                this.startTime = value
            },

            changeEndTime: function (value) {
                this.endTime = value
            },

            taskParticipantChange: function (value) {
                this.taskParticipant.data = value
            },

            changeTrailName: function (value) {
                this.trailInfo.title = value
            },
            changeResource: function (value) {
                this.trailInfo.resource = value
            },
            changeTrailPrincipal: function (value) {
                if (this.trailInfo.principal) {
                    this.trailInfo.principal.data = value
                } else {
                    this.trailInfo.principal = {
                        data: value
                    };
                    this.changeInfo.principal = this.$store.state.principalInfo.id
                }
            },

            changeTrailFee: function (value) {
                this.trailInfo.fee = value
            },

            changeTrailBrand: function (value) {
                this.trailInfo.brand = value
            },

            changeTrailCompany: function (value) {
                this.trailInfo.client.data.company = value
            },

            changeTrailCompanyLevel: function (value) {
                this.trailInfo.client.data.grade = value
            },

            changeTrailContact: function (value) {
                this.trailInfo.contact.data.name = value
            },

            changeTrailContactPhone: function (value) {
                this.trailInfo.contact.data.phone = value
            },

            changeTrailExpectations: function (value) {

            },

            changeTrailRecommend: function (value) {

            },

            changeTrailDesc: function (value) {
                this.trailInfo.desc = value
            },
            changeResourceType: function (value) {
                this.trailInfo.resource_type = value
            },
            changeExpectations: function (value) {
                this.trailInfo.expectations = value
            },

            changeRecommendations: function (value) {
                this.trailInfo.recommendations = value
            },

            changePriority: function (value) {
                console.log(value)
            },

            changeRefuseType: function (value) {
                if (value == 1) {
                    this.refuseType = '我方拒绝'
                } else {
                    this.refuseType = '客户拒绝'
                }
            },
            changeIndustry(value) {
                this.trailInfo.industry_id = value
            },
            changeTrailStatus(value) {
                this.trailStatus = value
            },
            changeCooperationType(value) {
                this.trailInfo.cooperation_type = value
            },
            refuseTrail: function () {
                let data = {
                    'type': this.refuseType,
                    'reason': this.refuseReason,
                }
                fetch('put', '/trails/' + this.trailInfo.id + '/refuse', data).then(function (response) {
                    toastr.success('拒绝成功');
                    $('#refuseTrail').modal('hide');
                })
                this.trailInfo.progress_status = 0
            },
        }
    }
</script>

<style>
    .expfee {
        display: flex;
    }

    .task-dropdown {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2;
    }

    .edit-height {
        height: 57px;
    }
</style>
