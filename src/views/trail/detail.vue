<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">销售线索</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right"
                 v-if="trailInfo.progress_status !== 0">
                <div class="font-info pointer-content" data-target="#refuseTrail" data-toggle="modal">拒绝</div>
            </div>
            <div class="page-header-actions dropdown show task-dropdown float-right"
                 v-if="trailInfo.progress_status == 0">
                <div class="font-info pointer-content" data-target="#recoverTrail" data-toggle="modal">激活</div>
            </div>
        </div>

        <div class="page-content container-fluid" v-if="trailInfo">
            <div class="panel col-md-12">
                <div class="card-block">
                    <h4 class="card-title">{{ trailInfo.title }}</h4>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-laiyuanguanli pr-5" aria-hidden="true"></i>线索类型
                            </div>
                            <div class="font-weight-bold float-left">
                                <template v-if="trailInfo.type === 1">影视线索</template>
                                <template v-if="trailInfo.type === 2">综艺线索</template>
                                <template v-if="trailInfo.type === 3">商务线索</template>
                                <template v-if="trailInfo.type === 4">papi线索</template>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-kehu pr-2" aria-hidden="true"></i>负责人
                            </div>
                            <div class="font-weight-bold float-left" v-if="trailInfo.principal">
                                {{ principalName }}
                            </div>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-xiaoshouguanli pr-2" aria-hidden="true"></i>销售进展
                            </div>
                            <div class="font-weight-bold float-left">
                                <span v-if="trailInfo.progress_status === 1" style="color:#ff9800">未确定合作</span>
                                <span v-else-if="trailInfo.progress_status === 2" style="color:#4caf50">确定合作</span>
                                <span v-else-if="trailInfo.progress_status === 0" style="color:#f44336">已拒绝</span>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-renminbi1688 pr-2" aria-hidden="true"></i>预计订单收入
                            </div>
                            <div class="font-weight-bold float-left">
                                <template v-if="trailInfo.fee">
                                    {{ trailInfo.fee }}
                                </template>
                                <template v-else>
                                    0
                                </template>
                                元
                            </div>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-yiren pr-2" aria-hidden="true"></i>目标艺人
                            </div>
                            <div class="font-weight-bold float-left" v-if="trailInfo.title">
                                <span v-if="trailInfo.expectations"
                                      v-for="expectation in trailInfo.expectations.data"
                                      :key="expectation.nickname">
                                    {{ expectation.nickname}}
                                </span>
                                <span v-if="trailInfo.expectations"
                                      v-for="expectation in trailInfo.expectations.data" :key="expectation.name">
                                    {{ expectation.name}}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-tuijian pr-2" aria-hidden="true" style="font-size:17px;"></i>推荐艺人
                            </div>
                            <div class="font-weight-bold float-left" v-if="trailInfo.title">
                                <span v-if="trailInfo.recommendations"
                                      v-for="recommendation in trailInfo.recommendations.data"
                                      :key="recommendation.nickname">
                                    {{ recommendation.nickname }}
                                </span>
                                <span v-if="trailInfo.recommendations"
                                      v-for="recommendation in trailInfo.recommendations.data"
                                      :key="recommendation.name">
                                    {{ recommendation.name }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-gongsiguanli pr-2" aria-hidden="true"></i>公司
                            </div>
                            <div class="font-weight-bold float-left pointer-content hover-content"
                                 @click="redirectCompany(trailInfo.client.data.id)" v-if="trailInfo.client"
                                 style="color:#3298DC">
                                {{ trailInfo.client.data.company }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-xiangmu1 pr-2" aria-hidden="true"></i>项目
                            </div>
                            <div class="font-weight-bold float-left pointer-content hover-content"
                                 @click="redirectProject(trailInfo.project.data.id)" v-if="trailInfo.project"
                                 style="color:#3298DC">
                                {{ trailInfo.project.data.title }}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div v-if="canShow" style="display: flex; justify-content: space-between; align-items: flex-start">
                <div class="panel" style="width: calc(66% - 15px);z-index: 100;float:left;margin-right:30px;">

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
                                   aria-expanded="false" role="tab">
                                    <span v-if="!taskCount.count">任务</span>
                                    <ToolTips :title="'已完成数量'+taskCount.finished" v-if="taskCount.count">
                                        任务（{{taskCount.finished}}/{{taskCount.count}}）
                                    </ToolTips>
                                </a>
                            </li>
                        </ul>

                    </div>
                    <div class="tab-content nav-tabs-animate bg-white col-md-12">
                        <div class="tab-pane animation-fade active col-md-12 px-0" id="forum-trail-base"
                             role="tabpanel">
                            <div class="card">
                                <div class="card-header card-header-transparent card-header-bordered">
                                    <div class="float-left font-weight-bold third-title">销售线索信息</div>
                                    <div class="float-right pointer-content">
                                        <i class="iconfont icon-bianji2" aria-hidden="true" v-show="!isEdit"
                                           @click="editBaseInfo"></i>
                                    </div>
                                    <div class="float-right mr-40" v-show="isEdit">
                                        <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消
                                        </button>
                                        <button class="btn btn-primary" @click="changeTrailBaseInfo">确定</button>
                                    </div>
                                </div>
                                <div class="card-block px-0" v-if="trailInfo.title">
                                    <h5 class="pl-15">基本资料</h5>
                                    <div class="clearfix">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-3 float-left text-right pl-0">线索名称</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                <span v-show="!isEdit">{{trailInfo.title}}</span>
                                                <EditInput :is-edit="isEdit" v-show="isEdit"
                                                           :content='trailInfo.title'
                                                           @change="changeTrailName"></EditInput>
                                            </div>
                                        </div>
                                        <div class="py-10 px-0 clearfix col-md-6 float-left ">
                                            <TrailOrigin :trailType='trailType'
                                                         typeName='线索' :isEdit='isEdit'
                                                         :content='trailInfo.resource || oldInfo.resource'
                                                         @changeTrailOrigin='changeTrailOrigin'
                                                         :contentType='trailInfo.resource_type'
                                                         @changeEmail='changeEmail' detailPage='true'
                                                         @changeTrailOriginPerson='changeTrailOriginPerson'/>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">负责人</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                <EditInput-selector :is-edit="isEdit"
                                                                    @change="changeTrailPrincipal"></EditInput-selector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">预计订单收入/元</div>
                                            <div class="col-md-9 float-left font-weight-bold expfee">
                                                <edit-number-spinner :content="trailInfo.fee" :is-edit="isEdit"
                                                                     @change="changeTrailFee"></edit-number-spinner>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">目标艺人</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.title">
                                                <EditSelector :options="starsArr" :is-edit="isEdit"
                                                              :multiple="true" :content="selectedExpectationsArr"
                                                              @change="changeExpectations"></EditSelector>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">推荐艺人</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.title">
                                                <EditSelector :options="starsArr" :is-edit="isEdit"
                                                              @refresh='getTrail'
                                                              :content="selectedRecommendationsArr"
                                                              :multiple="true"
                                                              @change="changeRecommendations"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">行业</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :options="industriesArr"
                                                              :content="trailInfo.industry_id"
                                                              @change="changeIndustry"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">优先级</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit"
                                                              :options="trailLevelArr"
                                                              :content="trailInfo.priority"
                                                              @change='changeTrailTaskLevel'></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             v-if="trailInfo.type === 4">
                                            <div class="col-md-3 float-left text-right pl-0">是否锁价</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :options="lockArr"
                                                              @change='changeLockStatus'
                                                              :content="trailInfo.lock_status==0?2:1"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             v-if="trailInfo.type !== 4">
                                            <div class="col-md-3 float-left text-right pl-0">线索状态</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit"
                                                              :options="trailStatusArr"
                                                              @change="changeTrailStatus"
                                                              :content="trailInfo.status"></EditSelector>
                                            </div>
                                        </div>
                                        <div v-if="trailInfo.type !== 4"
                                             class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">合作类型</div>
                                            <div class="col-md-9 float-left font-weight-bold">

                                                <EditSelector :is-edit="isEdit"
                                                              :options="cooperationTypeArr"
                                                              @change='changeCooperationType'
                                                              :content='trailInfo.cooperation_type'></EditSelector>
                                            </div>
                                        </div>
                                        <h5 class="pl-15 pt-10 clearfix col-md-12 float-left">客户资料</h5>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">品牌名称</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                <EditInput :content="trailInfo.brand" :is-edit="isEdit"
                                                           @change="changeTrailBrand"></EditInput>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">公司名称</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.client">
                                                <EditInput :content="trailInfo.client.data.company"
                                                           :is-edit="isEdit"
                                                           @change="changeTrailCompany"></EditInput>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">级别</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.client">
                                                <EditSelector :content="trailInfo.client.data.grade"
                                                              :is-edit="isEdit"
                                                              @change="changeTrailCompanyLevel"
                                                              :options="clientLevelArr"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">联系人</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.contact">
                                                <EditInput :content="trailInfo.contact.data.name" :is-edit="isEdit"
                                                           @change="changeTrailContact"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">联系方式</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.contact">
                                                <EditInput :content="trailInfo.contact.data.phone" :is-edit="isEdit"
                                                           @change="changeTrailContactPhone"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">备注</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.contact">
                                                <editTextarea :content="trailInfo.desc" :is-edit="isEdit"
                                                              @change="changeTrailDesc"></editTextarea>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">微信</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.contact">
                                                <EditInput :content="trailInfo.contact.data.wechat" :is-edit="isEdit"
                                                           @change="changeTrailContactWechat"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">其他联系方式</div>
                                            <div class="col-md-9 float-left font-weight-bold"
                                                 v-if="trailInfo.contact">
                                                <EditInput :content="trailInfo.contact.data.other_contact_ways"
                                                           :is-edit="isEdit"
                                                           @change="changeTrailContactOthers"></EditInput>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 class="pl-15 pt-10">更新信息</h5>
                                    <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                        <div class="col-md-3 float-left text-right pl-0">录入人</div>
                                        <div class="col-md-9 float-left font-weight-bold">{{trailInfo.creator}}
                                        </div>
                                    </div>
                                    <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                        <div class="col-md-3 float-left text-right pl-0">录入时间</div>
                                        <div class="col-md-9 float-left font-weight-bold">
                                            {{common.timeProcessing(trailInfo.created_at)}}
                                        </div>
                                    </div>
                                    <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                        <div class="col-md-3 float-left text-right pl-0">最近更新人</div>
                                        <div class="col-md-9 float-left font-weight-bold">
                                            {{trailInfo.last_updated_user}}
                                        </div>
                                    </div>
                                    <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                        <div class="col-md-3 float-left text-right pl-0">最近更新时间</div>
                                        <div class="col-md-9 float-left font-weight-bold">
                                            {{ common.timeProcessing(trailInfo.last_updated_at)
                                            || common.timeProcessing(trailInfo.last_follow_up_at) }}
                                        </div>
                                    </div>
                                    <div v-if="trailInfo.progress_status === 0 && trailInfo.refused_user && trailInfo.refused_at">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">拒绝人</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                {{ trailInfo.refused_user }}
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">拒绝日期</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                {{ common.timeProcessing(trailInfo.refused_at, 'day') }}
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">拒绝原因</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                {{trailInfo.refused_detail}}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="trailInfo.type === 4 && trailInfo.lock_status === 1">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">锁价人</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                {{lockUser.data.name}}
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-3 float-left text-right pl-0">锁价日期</div>
                                            <div class="col-md-9 float-left font-weight-bold">
                                                {{ common.timeProcessing(trailInfo.lock_at, 'day') }}
                                            </div>
                                        </div>
                                        <!-- <div class="card-text py-5 clearfix">
                                            <div class="col-md-1 float-left text-right pl-0">保护截止日期</div>
                                            <div class="col-md-5 float-left font-weight-bold">
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade fixed-button-father" id="forum-trail-tasks"
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
                                <tr v-for="task in trailTasksInfo" v-if="trailTasksInfo" :key="task.id"
                                    @click="goTask(task.id)">
                                    <td>{{ task.title }}</td>
                                    <td v-if="task.type">{{ task.type.data.title }}</td>
                                    <td v-if="!task.type">{{ '' }}</td>
                                    <td>
                                        <template v-if="task.status === 1">进行中</template>
                                        <template v-else-if="task.status === 2">已完成</template>
                                        <template v-else-if="task.status === 3">已停止</template>
                                    </td>
                                    <td v-if="task.principal">{{ task.principal.data.name }}</td>
                                    <td v-if="!task.principal">{{ '' }}</td>
                                    <td>{{ common.timeProcessing(task.end_at) }}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div style="margin: 6rem auto;width: 100px" v-if="trailTasksInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                            <pagination :current_page="current_page" :method="getTrailTask"
                                        :total_pages="total_pages" :total="total"></pagination>
                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                 data-target="#addTask">
                                <button data-v-0aeb4e71="" type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon iconfont icon-tianjia1 animation-scale-up"
                                       aria-hidden="true"
                                       style="font-size: 30px"></i>
                                    <i class="back-icon iconfont icon-tianjia1 animation-scale-up"
                                       aria-hidden="true"
                                       style="font-size: 30px"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel" style="width: calc(34% - 15px);">
                    <div class="col-md-12">
                        <div class="card col-md-12">
                            <div class="card-header card-header-transparent card-header-bordered p-10"
                                 style="font-size: 16px;font-weight: bold;">
                                <div>销售线索跟进</div>
                            </div>
                            <div class="card-block">
                                <div class="col-md-12 pl-0">
                                    <TaskFollowUp :follow-type="'线索'" :trailId="trailId" trailType='trails'
                                                  v-if="trailId"></TaskFollowUp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <addTask v-if="canShow" :resourceable_id="trailId" resource_type="5" :resource_title="trailName"
                 resource_name="销售线索" :lock_status="trailInfo.lock_status" @success="addTask"></addTask>

        <div v-if="canShow" class="modal fade" id="refuseTrail" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">拒绝原因</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">拒绝类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="refuseTypeArr" @change="changeRefuseType"></selectors>
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
        <div v-if="canShow" class="modal fade" id="recoverTrail" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">确认激活</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <h5>请确认激活</h5>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="recoverTrail">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import fetch from '../../assets/utils/fetch.js';
import config from '../../assets/js/config';
import common from '../../assets/js/common';
import Cookies from 'js-cookie';


export default {
  data() {
    return {
      common,
      total: 0,
      current_page: 1,
      total_pages: 1,
      trailId: '',
      trailInfo: {},
      trailOrigin: '',
      taskName: '',
      taskIntroduce: '',
      multiple: false,
      isEdit: false,
      starsArr: [],
      industriesArr: [],
      companyType: config.companyType,
      customizeInfo: config.customizeInfo,
      taskTypeArr: {},
      taskLevelArr: config.priorityArr,
      trailLevelArr: config.levelArr,
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
      trailType: '',
      isLoading: true,
      email: '',
      trailOriginPerson: '',
      taskCount: {},
      currentUser: {},
      principalName: '',
      lockUser: {},
      startTime: '',
      trailName: '',
      canShow:false
    };
  },
  created() {
    this.getAllType();
    this.getTrail();
    this.getTrailTask();
    this.getCurrentUser();
  },
  mounted() {
    this.getStars();
    this.getIndustries();
  },
  computed: {
    getResourceType() {
      for (const key in this.trailOriginArr) {
        if (this.trailOriginArr[key].value == this.trailInfo.resource_type) {
          return this.trailOriginArr[key].name;
        }
      }
    },
    getClientLevel() {
      for (const key in this.clientLevelArr) {
        if (this.clientLevelArr[key].value == this.trailInfo.client.data.grade) {
          return this.clientLevelArr[key].name;
        }
      }
    },
  },
  watch: {
    'trailInfo.type': function () {
      if (this.trailInfo.type === 4) {
        this.trailOriginArr = config.trailBloggerOrigin;
        this.getStars();
        this.$nextTick(() => {
          $('.selectpicker').selectpicker('render');
          $('.selectpicker').selectpicker('refresh');
        });
      }
    },
    'trailInfo.resource': function (newValue, oldValue) {
      if (oldValue) {
        if (newValue != this.oldInfo.resource) {
          this.changeInfo.resource = newValue;
        }
      }
    },
    'trailInfo.priority': function (newValue) {
      this.changeInfo.priority = newValue;
    },
    'trailInfo.title': function (newValue) {
      this.changeInfo.title = newValue;
    },
    'trailInfo.principal.data': {
      handler(newValue, oldValue) {
        if (oldValue) {
          if (newValue != oldValue.id) {
            this.changeInfo.principal_id = this.$store.state.principalInfo.id;
          }
        }
      },
      deep: true,
    },
    'trailInfo.brand': function (newValue) {
      this.changeInfo.brand = newValue;
    },
    'trailInfo.client.data.company': function (newValue) {
      if (this.changeInfo.client) {
        this.changeInfo.client.data.company = newValue;
      } else {
        this.changeInfo.client = {
          data: {
            company: newValue,
          },
        };
      }
    },
    'trailInfo.contact.data.name': function (newValue) {
      if (this.changeInfo.contact) {
        this.changeInfo.contact.name = newValue;
      } else {
        this.changeInfo.contact = {
          data: {
            name: newValue,
          },
        };
      }
    },
    'trailInfo.desc': function (newValue) {
      this.changeInfo.desc = newValue;
    },
    'trailInfo.resource_type': function (newValue) {
      this.changeInfo.resource_type = newValue;
    },
    'trailInfo.contact.data.phone': function (newValue) {
      if (this.changeInfo.contact) {
        this.changeInfo.contact.phone = newValue;
      } else {
        this.changeInfo.contact = {
          phone: newValue,
        };
      }
    },
    'trailInfo.industry_id': function (newValue) {
      this.changeInfo.industry_id = newValue;
    },
    'trailInfo.expectations': function (newValue) {
      this.changeInfo.expectations = newValue;
    },
    'trailInfo.recommendations': function (newValue) {
      this.changeInfo.recommendations = newValue;
    },
    trailStatus(newValue) {
      this.changeInfo.status = Number(newValue);
    },
    'trailInfo.cooperation_type': function (newValue) {
      this.changeInfo.cooperation_type = Number(newValue);
    },
    'trailInfo.lock_status': function (newValue) {
      this.changeInfo.lock_status = newValue;
    },
  },

  methods: {
    changeTrailOriginPerson(value) {
      this.changeInfo.resource = value.id;
    },
    changeEmail(value) {
      this.changeInfo.resource = value;
    },
    getAllType() {
      const _this = this;
      fetch('get', '/task_types').then((response) => {
        _this.taskTypeArr = response.data;
      });
    },
    trailTypeValidate() {
                if (!this.trailInfo.principal) {
                    toastr.error("负责人为必填");
                    return false;
                }
                if (!this.trailInfo.fee) {
                    toastr.error("费用为必填")
                    return false;
                }
                if (!this.trailInfo.client.data.company) {
                    toastr.error("公司名称为必填")
                    return false;
                }
                if (!this.trailInfo.title) {
                    toastr.error("线索名称为必填")
                    return false;
                } if (!this.trailInfo.contact.data.name) {
                    toastr.error("联系人为必填")
                    return false;
                } if (this.trailInfo.contact.data.phone) {
                    let phone = this.trailInfo.contact.data.phone
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                        // alert("手机号码有误，请重填");  
                        toastr.error("请输入正确的手机号码");
                        return false;
                    }
                    return true;

                } else {
                    return true
                }
            },

    getTrail() {
      this.trailId = this.$route.params.id;
      const data = {
      //  include: 'client,lockuser,contact,starexpectations,bloggerexpectations,starrecommendations,bloggerrecommendations',
          include: 'client,lockuser,contact,expectations,recommendations',
      };
      fetch('get', `/trailsAll/${this.trailId}`, data).then((response) => {
        this.canShow = true
        this.lockUser = response.data.lockuser;
        this.trailType = response.data.type;
        this.trailInfo = response.data;
        this.trailName = response.data.title;
        this.oldInfo = JSON.parse(JSON.stringify(response.data));
        this.selectedExpectationsArr = [];
        this.selectedRecommendationsArr = [];
        for (let i = 0; i < this.trailInfo.expectations.data.length; i++) {
          this.selectedExpectationsArr.push(`${this.trailInfo.expectations.data[i].flag}-${this.trailInfo.expectations.data[i].id}`);
        }
        // for (let i = 0; i < this.trailInfo.bloggerexpectations.data.length; i++) {
        //   this.selectedExpectationsArr.push(`${this.trailInfo.bloggerexpectations.data[i].flag}-${this.trailInfo.bloggerexpectations.data[i].id}`);
        // }
        for (let i = 0; i < this.trailInfo.recommendations.data.length; i++) {
          this.selectedRecommendationsArr.push(`${this.trailInfo.recommendations.data[i].flag}-${this.trailInfo.recommendations.data[i].id}`);
        }
        // for (let i = 0; i < this.trailInfo.bloggerrecommendations.data.length; i++) {
        //   this.selectedRecommendationsArr.push(`${this.trailInfo.bloggerrecommendations.data[i].flag}-${this.trailInfo.bloggerrecommendations.data[i].id}`);
        // }
        if (response.data.principal) {
          const params = {
            type: 'change',
            data: response.data.principal.data,
          };
          this.$store.dispatch('changePrincipal', params);
        }
        this.isLoading = false;
        this.$nextTick(() => {
          this.$store.state.newPrincipalInfo.id = Number(this.trailInfo.resource);
          if (this.trailInfo.principal) {
            this.$store.state.principalInfo = this.trailInfo.principal.data;
          }
        });
        if (this.trailInfo.principal) {
          this.principalName = this.trailInfo.principal.data.name;
        }
      });
    },

    getIndustries() {
      const _this = this;
      fetch('get', '/industries/all').then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          _this.industriesArr.push({
            id: response.data[i].id,
            name: response.data[i].name,
            value: response.data[i].id,
          });
        }
      });
    },
    changeTrailOrigin(value) {
      this.trailInfo.resource = '';
      this.changeInfo.resource_type = value;
      this.trailOrigin = value;
    },

    changeTrailBaseInfo() {
      if (this.changeInfo.resource_type) {
        this.changeInfo.resource_type = Number(this.changeInfo.resource_type);
      } else {
        this.changeInfo.resource_type = Number(this.oldInfo.resource_type);
      }
      if (this.changeInfo.hasOwnProperty('resource') && this.changeInfo.resource != this.oldInfo.resource) {
        if (!this.changeInfo.resource_type) {
          this.changeInfo.resource_type = Number(this.oldInfo.resource_type);
        }
      }
      if (this.changeInfo.contact && this.changeInfo.contact.id) {
        // this.changeInfo.resource_type = Number(this.changeInfo.resource_type)
        this.changeInfo.contact.name = this.changeInfo.contact.id;
      } else if (this.changeInfo.contact) {
        this.changeInfo.contact.id = this.trailInfo.contact.data.name;
        this.changeInfo.contact.name = this.trailInfo.contact.data.name;
      } else {
        Object.assign(this.changeInfo, { contact: { id: this.trailInfo.contact.data.name, name: this.trailInfo.contact.data.name } });
      }
      if (this.trailTypeValidate()) {
        const data = this.changeInfo;
        if (JSON.stringify(this.changeInfo) === '{}') {
          this.isEdit = false;
          return;
        }
        if ([1, 2, 3, 4, 5].includes(this.trailOrigin)) {
          if (!this.changeInfo.resource && !this.oldInfo.resource) {
            toastr.error('线索来源不能为空');
            return;
          }
          if (!this.changeInfo.resource) {
            this.changeInfo.resource = this.oldInfo.resource;
          }
        }
        fetch('put', `/trails/${this.trailId}`, data).then(() => {
          toastr.success('修改成功');
          this.isEdit = false;
          this.getTrail();
        });
      }
    },
    getStars() {
      fetch('get', '/starandblogger', { sign_contract_status: 2 }).then((response) => {
        this.starsArr = [];
        for (let i = 0; i < response.data.length; i++) {
          this.starsArr.push({
            name: response.data[i].name,
            value: `${response.data[i].flag}-${response.data[i].id}`,
          });
        }
      });
    },

    editBaseInfo() {
      if (this.trailInfo.powers.edit_trail !== 'true') {
        toastr.error('当前用户没有编辑销售线索的权限');
        return;
      }
      this.isEdit = true;
      this.changeInfo = {};
    },

    cancelEdit() {
      this.getTrail();
      this.isEdit = false;
      this.trailInfo = JSON.parse(JSON.stringify(this.oldInfo));
      for (let i = 0; i < this.trailInfo.starexpectations.data.length; i++) {
        this.selectedExpectationsArr.push(`${this.trailInfo.starexpectations.data[i].flag}-${this.trailInfo.starexpectations.data[i].id}`);
      }
      for (let i = 0; i < this.trailInfo.bloggerexpectations.data.length; i++) {
        this.selectedExpectationsArr.push(`${this.trailInfo.bloggerexpectations.data[i].flag}-${this.trailInfo.bloggerexpectations.data[i].id}`);
      }
      for (let i = 0; i < this.trailInfo.starrecommendations.data.length; i++) {
        this.selectedRecommendationsArr.push(`${this.trailInfo.starrecommendations.data[i].flag}-${this.trailInfo.starrecommendations.data[i].id}`);
      }
      for (let i = 0; i < this.trailInfo.bloggerrecommendations.data.length; i++) {
        this.selectedRecommendationsArr.push(`${this.trailInfo.bloggerrecommendations.data[i].flag}-${this.trailInfo.bloggerrecommendations.data[i].id}`);
      }
      if (this.trailInfo.principal) {
        const params = {
          type: 'change',
          data: this.trailInfo.principal.data,
        };
        this.$store.dispatch('changePrincipal', params);
      }
    },

    getTrailTask() {
      fetch('get', `/trails/${this.trailId}/tasks`).then((response) => {
        this.trailTasksInfo = response.data;
        this.total = response.meta.pagination.total;
        this.current_page = response.meta.pagination.current_page;
        this.total_pages = response.meta.pagination.total_pages;
        // @todo 任务的已完成任务需要后端返回
        let n = 0;
        for (const key in response.data) {
          if (response.data[key].status == 2) {
            n++;
          }
        }
        this.taskCount = {
          count: response.data.length,
          finished: n,
        };
      });
    },
    changeLockStatus(value) {
      if (value == 2) {
        value = 0;
      }
      this.changeInfo.lock = Number(value);
    },
    getCurrentUser() {
        this.currentUser = JSON.parse(Cookies.get('user'))
        if (!this.$store.state.newPrincipalInfo.id && this.currentUser) {
          this.principal = this.currentUser.id;
        } else {
          this.principal = this.$store.state.newPrincipalInfo.id;
        }
    },
    addTask() {
      this.getTrailTask();
    },

    redirectCompany(companyId) {
      this.$router.replace({ path: `/clients/${companyId}` });
    },
    redirectProject(projectId) {
      this.$router.replace({ path: `/projects/${projectId}` });
    },
    changeLinkage(value) {
      console.log(value);
    },

    changeTaskType(value) {
      this.taskType = value;
    },

    principalChange(value) {
      this.principal = value.id;
    },

    participantChange(value) {
      const flagArr = [];
      for (let i = 0; i < value.length; i++) {
        flagArr.push(value[i].id);
      }
      this.participants = flagArr;
    },

    changeTaskLevel(value) {
      this.taskLevel = value;
    },
    changeTrailTaskLevel(value) {
      this.trailInfo.priority = value;
    },

    changeStartTime(value) {
      this.startTime = value;
    },

    changeEndTime(value) {
      this.endTime = value;
    },

    changeTrailName(value) {
      this.trailInfo.title = value;
    },
    changeResource(value) {
      this.trailInfo.resource = value;
    },
    changeTrailPrincipal(value) {
      if (this.trailInfo.principal) {
        this.trailInfo.principal.data = value;
      } else {
        this.trailInfo.principal = {
          data: value,
        };
      }
      this.changeInfo.principal_id = value;
    },

    changeTrailFee(value) {
      if (value == this.trailInfo.fee) {
        if (this.changeInfo.fee) {
          delete this.changeInfo.fee;
        } else {
          return;
        }
      }
      this.changeInfo.fee = value;
    },

    changeTrailBrand(value) {
      this.trailInfo.brand = value;
    },

    changeTrailCompany(value) {
      this.trailInfo.client.data.company = value;
    },

    changeTrailCompanyLevel(value) {
      this.trailInfo.client.data.grade = value;
      if (this.changeInfo.client) {
        this.changeInfo.client.grade = value;
      } else {
        Object.assign(this.changeInfo, { client: { grade: value } });
      }
    },

    changeTrailContact(value) {
      this.trailInfo.contact.data.name = value;
      if (this.changeInfo.contact) {
        this.changeInfo.contact.id = value;
      } else {
        Object.assign(this.changeInfo, { contact: { id: value } });
      }
    },
    changeTrailContactWechat(value) {
      this.trailInfo.contact.data.wechat = value;
      if (this.changeInfo.contact) {
        this.changeInfo.contact.wechat = value;
      } else {
        Object.assign(this.changeInfo, { contact: { wechat: value } });
      }
    },
    changeTrailContactOthers(value) {
      this.trailInfo.contact.data.other_contact_ways = value;
      if (this.changeInfo.contact) {
        this.changeInfo.contact.other_contact_ways = value;
      } else {
        Object.assign(this.changeInfo, { contact: { other_contact_ways: value } });
      }
    },
    changeTrailContactPhone(value) {
      this.trailInfo.contact.data.phone = value;
    },

    changeTrailDesc(value) {
      this.trailInfo.desc = value;
    },
    changeResourceType(value) {
      this.trailInfo.resource_type = value;
    },
    changeExpectations(value) {
      if (value.length === 0) {
        toastr.error('目标艺人不能为空');
        return;
      }
      for (let i = 0; i < value.length; i++) {
        const item = value[i].split('-');
        value[i] = {
          id: item[1],
          flag: item[0],
        };
      }
      this.changeInfo.expectations = value;
    },

    changeRecommendations(value) {
      if (value.length === 0) {
        toastr.error('推荐艺人不能为空');
        return;
      }
      for (let i = 0; i < value.length; i++) {
        const item = value[i].split('-');
        value[i] = {
          id: item[1],
          flag: item[0],
        };
      }
      this.changeInfo.recommendations = value;
    },

    changePriority(value) {
      console.log(value);
    },

    changeRefuseType(value) {
      if (value == 1) {
        this.refuseType = '我方拒绝';
      } else {
        this.refuseType = '客户拒绝';
      }
    },
    changeIndustry(value) {
      this.trailInfo.industry_id = value;
    },
    changeTrailStatus(value) {
      this.trailStatus = value;
    },
    changeCooperationType(value) {
      this.trailInfo.cooperation_type = value;
    },
    recoverTrail() {
      const _this = this;
      fetch('put', `/trails/${this.trailInfo.id}/recover`).then((response) => {
        toastr.success('激活成功');
        $('#recoverTrail').modal('hide');
        _this.getTrail();
      });
      this.trailInfo.progress_status = 1;
    },
    refuseTrail() {
      if (!this.refuseType) {
        toastr.error('请选择拒绝原因');
      } else if (!this.refuseReason) {
        toastr.error('请输入拒绝理由');
      } else {
        const data = {
          type: this.refuseType,
          reason: this.refuseReason,
        };
        fetch('put', `/trails/${this.trailInfo.id}/refuse`, data).then(() => {
          toastr.success('拒绝成功');
          $('#refuseTrail').modal('hide');
          this.getTrail();
        });
      }
    },
    goTask(id) {
      this.$router.push({ path: `/tasks/${id}` });
    },
  },
};
</script>

<style scoped>
    .follow-task {
        height: 500px;
        overflow: scroll;
    }

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

    table tbody tr {
        cursor: pointer;
    }

    .page-content {
        border: none !important;
    }
</style>
