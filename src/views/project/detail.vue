<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">项目详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right"
                 v-if="projectInfo.approval_status == 232 || projectInfo.type == 5">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addLinkage"
                       @click="selectProjectLinkage">关联</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#confirmFlag"
                       @click="changeToastrText(1)" v-show="projectInfo.status != 1">激活</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#confirmFlag"
                       @click="changeToastrText(2)" v-show="projectInfo.status != 2">完成</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#confirmFlag"
                       @click="changeToastrText(3)" v-show="projectInfo.status != 3">撤单</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addPrivacy">隐私设置</a>
                    <a class="dropdown-item" role="menuitem" @click="getApprovalsFormData"
                       v-if="projectInfo.approval_status == 232 || projectInfo.type == 5">创建合同</a>
                </div>
            </div>

        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block">
                    <h4 class="card-title">{{ projectInfo.title }}</h4>

                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>负责人
                            </div>
                            <div class="font-weight-bold float-left" v-if="projectInfo.principal">
                                {{ projectInfo.principal.data.department.name }} -
                                {{ projectInfo.principal.data.name }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0" v-if="projectInfo.type != 5">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>目标艺人
                            </div>
                            <div class="font-weight-bold float-left"
                                 v-if="projectInfo.trail && projectInfo.trail.data.expectations">
                                <template v-for="artist in projectInfo.trail.data.expectations.data">
                                    <template v-if="artist.name">
                                        {{ artist.name }}
                                    </template>
                                    <template v-else>
                                        {{ artist.nickname }}
                                    </template>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-tubiao- pr-2" aria-hidden="true"></i>项目状态
                            </div>
                            <div class="font-weight-bold float-left">
                                <template v-if="projectInfo.approval_status != 232 && projectInfo.type != 5">
                                    <span style="color:#FF9800">审批中</span>
                                </template>
                                <template v-else>
                                    <template v-if="projectInfo.status === 1"><span style="color:#FF9800">进行中</span>
                                    </template>
                                    <template v-if="projectInfo.status === 2"><span style="color:#4CAF50">已完成</span>
                                    </template>
                                    <template v-if="projectInfo.status === 3"><span style="color:#9E9E9E">撤单</span>
                                    </template>
                                </template>

                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div v-if="projectTaskingInfo.length > 0" class="col-md-6 float-left pl-0">
                            <div class="col-md-6 pl-0"><i class="iconfont icon-iconset0399  pr-2"></i> 任务</div>
                            <div class="clearfix example" v-for="(task,index) in projectTaskingInfo" v-if="index < 3">
                                <div class="col-md-3 float-left pl-0 exceeded-display">{{ task.title }}</div>
                                <div class="col-md-2 float-left pl-0">{{ task.principal.data.name }}</div>
                                <div class="col-md-4 float-left pl-0">{{ task.end_at }}</div>
                                <div class="col-md-3 float-left pl-0">
                                    <template v-if="task.status === 1"><span style="color: #FF9800;">进行中</span>
                                    </template>
                                    <template v-if="task.status === 2"><span style="color: #4CAF50;">已完成</span>
                                    </template>
                                    <template v-if="task.status === 3"><span style="color: #9E9E9E;">已停止</span>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0 px-0" v-if="projectInfo.type != 5">
                            <div class="mb-20 float-left clearfix col-md-6 pl-0">
                                <div class="float-left col-md-5 px-0"><i class="iconfont icon-renminbi1688  pr-2"></i>预计订单收入
                                </div>
                                <div class="float-left col-md-7">
                                    {{ (projectInfo.trail && projectInfo.trail.data.fee) ? projectInfo.trail.data.fee :
                                    0 }}元
                                </div>
                            </div>
                            <div class="mb-20 float-left clearfix col-md-6 pl-0">
                                <div class="float-left col-md-5 px-0 pt-3"><i class="iconfont icon-renminbi1688  pr-2"></i>预计支出</div>
                                <div class="float-left col-md-7">
                                    {{ projectInfo.projected_expenditure ? projectInfo.projected_expenditure : 0 }}元
                                </div>
                            </div>
                            <div class="mb-20 float-left clearfix col-md-6 pl-0">
                                <div class="float-left col-md-5 px-0"><i class="iconfont icon-renminbi1688  pr-2"></i>实际收入
                                </div>
                                <div class="float-left col-md-7">
                                    {{ metaInfo.contractmoney ? metaInfo.contractmoney : 0 }}元
                                </div>
                            </div>
                            <div class="mb-20 float-left clearfix col-md-6 pl-0">
                                <div class="float-left col-md-5 px-0 pt-3"><i class="iconfont icon-renminbi1688  pr-2"></i>实际支出</div>
                                <div class="float-left col-md-7">
                                    {{ metaInfo.expendituresum ? metaInfo.expendituresum : 0 }}元
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-start">
                <div class="panel" style="width: calc(66% - 15px);z-index: 100;" v-if="projectInfo.title">
                    <div class="col-md-12">
                        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                            <li class="nav-item" role="presentation"
                                v-if="projectInfo.type != 5 && projectInfo.approval_status == 232">
                                <a class="nav-link" :class="projectInfo.type != 5 ? 'active' : ''" data-toggle="tab"
                                   href="#forum-project-follow"
                                   aria-controls="forum-base"
                                   aria-expanded="true" role="tab">项目进度</a>
                            </li>
                            <li class="nav-item" role="presentation" @click="getProjectTasks"
                                v-if="projectInfo.type == 5 || projectInfo.approval_status == 232">
                                <a class="nav-link" data-toggle="tab" href="#forum-project-tasks"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">
                                    <template v-if="projectTasksInfo.length > 0">
                                        <ToolTips :title="`已完成数量${completeNum}`">
                                            任务 ({{completeNum}}/{{projectTasksInfo.length}})
                                        </ToolTips>
                                    </template>
                                    <template v-else>
                                        任务
                                    </template>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation"
                                v-if="projectInfo.type != 5 && projectInfo.approval_status == 232">
                                <a class="nav-link" data-toggle="tab" href="#forum-project-contract"
                                   aria-controls="forum-present" @click="getProjectContract()"
                                   aria-expanded="false" role="tab">合同</a>
                            </li>
                            <li class="nav-item" role="presentation" @click="getProjectBill"
                                v-if="projectInfo.type != 5 && projectInfo.approval_status == 232">
                                <a class="nav-link" data-toggle="tab" href="#forum-project-bill"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">账单</a>
                            </li>
                            <li class="nav-item" role="presentation" @click="getProjectsReturned"
                                v-if="projectInfo.type != 5 && projectInfo.approval_status == 232">
                                <a class="nav-link" data-toggle="tab" href="#forum-project-payback"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">回款</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link"
                                   :class="(projectInfo.type == 5 || projectInfo.approval_status != 232) ? 'active' : ''"
                                   data-toggle="tab"
                                   href="#forum-project-base"
                                   aria-controls="forum-base"
                                   aria-expanded="true" role="tab">概况</a>
                            </li>
                        </ul>
                        <div class="tab-content nav-tabs-animate bg-white">
                            <!-- 项目进度 -->
                            <div class="tab-pane animation-fade pb-10" @click="getProjectProgress"
                                 v-if="projectInfo.type != 5 && projectInfo.approval_status == 232"
                                 :class="projectInfo.type != 5 ? 'active' : ''"
                                 id="forum-project-follow" role="tabpanel">
                                <div class="clearfix mt-20">
                                    <div class="project-progress" v-for="item in projectProgressInfo">
                                        <template v-if="!item.isFinish">
                                            <div class="clearfix pointer-content"
                                                 @click="addProjectProgress(item.status)">
                                                <div class="col-md-4 p-0 float-left">
                                                    <div class="image-wraper">
                                                        <template v-if="item.isFinish == 1">
                                                            <img src="https://res-crm.papitube.com/progress-selected.png"
                                                                 alt="">
                                                        </template>
                                                        <template v-else>
                                                            <img src="https://res-crm.papitube.com/progress.png"
                                                                 alt="">
                                                        </template>
                                                    </div>
                                                </div>
                                                <div class="col-md-8 float-left pr-0 pl-5"
                                                     :class="item.isFinish == 1 ? 'finish-font-color' : ''"
                                                     style=" line-height: 30px;font-size: 12px;">
                                                    {{ item.name }}
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="clearfix">
                                                <div class="col-md-4 p-0 float-left">
                                                    <div class="image-wraper">
                                                        <template v-if="item.isFinish == 1">
                                                            <img src="https://res-crm.papitube.com/progress-selected.png"
                                                                 alt="">
                                                        </template>
                                                        <template v-else>
                                                            <img src="https://res-crm.papitube.com/progress.png"
                                                                 alt="">
                                                        </template>
                                                    </div>
                                                </div>
                                                <div class="col-md-8 float-left pr-0 pl-5"
                                                     :class="item.isFinish == 1 ? 'finish-font-color' : ''"
                                                     style=" line-height: 30px;font-size: 12px;">
                                                    {{ item.name }}
                                                </div>
                                            </div>
                                        </template>
                                        <div class="pt-20">
                                            <div class="points"
                                                 :class="item.isFinish == 1 ? 'finish-color' : ''"></div>
                                            <div class="line"
                                                 :class="item.isFinish == 1 ? 'finish-color' : 'unfinish-color'"></div>
                                        </div>
                                        <div class="pt-10 font-size-14" v-if="item.isFinish">
                                            <div>{{ item.finisher }}</div>
                                            <div>{{ item.finish_at }}</div>
                                        </div>
                                    </div>
                                    <div class="bar-wrap float-left ml-10">
                                        <ul>
                                            <li v-for="(item, index) in new Array(36)" :key="index"
                                                :style="{transform: `rotate(${index * 10}deg)`, opacity:`${index <= coursesLength/8 * 36 ? 1: 0.3}`}"></li>
                                        </ul>
                                        <div class="percent">{{ coursesLength / 8 * 100 }}%</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 任务 -->
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-project-tasks"
                                 role="tabpanel" v-if="projectInfo.approval_status == 232 || projectInfo.type == 5">
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
                                    <tr v-for="task in projectTasksInfo" @click="redirectTask(task.id)">
                                        <td class="pointer-content">
                                            {{ task.title }}
                                        </td>
                                        <td>{{ task.type.data.title }}</td>
                                        <td>
                                            <template v-if="task.status === 1"><span style="color: #FF9800;">进行中</span>
                                            </template>
                                            <template v-if="task.status === 2"><span style="color: #4CAF50;">已完成</span>
                                            </template>
                                            <template v-if="task.status === 3"><span style="color: #9E9E9E;">已停止</span>
                                            </template>
                                            <template v-if="task.status === 4"><span style="color: #F44336;">已延期</span>
                                            </template>
                                        </td>
                                        <td>{{ task.principal.data.name }}</td>
                                        <td>{{ task.end_at }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style="margin: 6rem auto;width: 100px"
                                     v-if="projectTasksInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getProjectTasks"
                                            :total_pages="total_pages" :total="total"></pagination>

                                <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                     data-target="#addTask">
                                    <button type="button" @click="setTaskPrincipal"
                                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true"
                                           style="font-size:30px"></i>
                                        <i class="back-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true"
                                           style="font-size:30px"></i>
                                    </button>
                                </div>

                            </div>
                            <!-- 合同 -->
                            <div class="tab-pane animation-fade"
                                 v-if="projectInfo.type != 5 && projectInfo.approval_status == 232"
                                 id="forum-project-contract"
                                 role="tabpanel">
                                <table class="table table-hover example"
                                       data-child="tr" v-if="projectContractInfo">
                                    <tr>
                                        <th class="cell-300" scope="col">合同编号</th>
                                        <th class="cell-300" scope="col">项目名称</th>
                                        <th class="cell-300" scope="col">艺人</th>
                                        <th class="cell-300" scope="col">合同类型</th>
                                        <th class="cell-300" scope="col">创建人</th>
                                        <th class="cell-300" scope="col">创建时间</th>
                                        <th class="cell-300" scope="col">审批状态</th>
                                    </tr>
                                    <tbody>
                                    <tr v-for="contract in projectContractInfo"
                                        @click="redirectContract(contract.form_instance_number)">
                                        <td>{{ contract.form_instance_number }}</td>
                                        <td>{{ contract.title }}</td>
                                        <td>
                                            <template v-for="star in contract.stars_name">
                                                {{ star.name }}
                                            </template>
                                        </td>
                                        <td>收入</td>
                                        <td>{{ contract.creator_name }}</td>
                                        <td>{{ contract.created_at.split(' ')[0] }}</td>
                                        <td>
                                            <template v-if="contract.form_status === 231">待审批</template>
                                            <template v-if="contract.form_status === 232">已同意</template>
                                            <template v-if="contract.form_status === 233">已拒绝</template>
                                            <template v-if="contract.form_status === 234">已撤销</template>
                                            <template v-if="contract.form_status === 235">已作废</template>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style="margin: 6rem auto;width: 100px"
                                     v-if="projectContractInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getProjectContract"
                                            :total_pages="total_pages"
                                            :total="total"></pagination>

                            </div>
                            <!-- 账单 -->
                            <div class="tab-pane animation-fade"
                                 v-if="projectInfo.type != 5 && projectInfo.approval_status == 232"
                                 id="forum-project-bill"
                                 role="tabpanel">
                                <div class="clearfix">
                                    <div class="float-left col-md-10" style="padding: .715rem 1.429rem">
                                        <div class="float-left pr-40">合同金额 <span class="money-color">10000元</span></div>
                                        <div class="float-left pr-40">支出金额 <span class="money-color">1000元</span></div>
                                        <div class="float-left pr-40">税费 <span class="money-color">10000元</span></div>
                                        <div class="float-left pr-40">papi分成 <span class="money-color">10000元</span>
                                        </div>
                                        <div class="float-left pr-40">bigger分成 <span class="money-color">10000元</span>
                                        </div>
                                        <div class="float-left pr-40">我司分成 <span class="money-color">10000元</span></div>
                                    </div>
                                    <div class="float-left col-md-2 text-right" style="padding: .715rem 0">
                                        <span class="pointer-content hover-content" data-toggle="modal"
                                              data-target="#addBill">
                                            <i class="iconfont icon-tianjia pr-5"></i>新增结算单</span>
                                    </div>
                                </div>
                                <table class="table table-hover" data-child="tr">
                                    <tr>
                                        <th class="cell-300" scope="col">费用类型</th>
                                        <th class="cell-300 position-relative" scope="col">
                                            <template v-if="filterFee === 1">全部</template>
                                            <template v-if="filterFee === 2">成本</template>
                                            <template v-if="filterFee === 3">收入</template>
                                            <i class="iconfont icon-plus-select-down pl-2" aria-hidden="true"
                                               id="projectDropdown" data-toggle="dropdown" aria-expanded="false"></i>
                                            <div class="dropdown-menu" aria-labelledby="projectDropdown" role="menu">
                                                <a class="dropdown-item" role="menuitem" v-show="filterFee !== 1"
                                                   @click="filterProjectFee(1)">全部</a>
                                                <a class="dropdown-item" role="menuitem" v-show="filterFee !== 2"
                                                   @click="filterProjectFee(2)">成本</a>
                                                <a class="dropdown-item" role="menuitem" v-show="filterFee !== 3"
                                                   @click="filterProjectFee(3)">收入</a>
                                            </div>
                                        </th>
                                        <th class="cell-300" scope="col">艺人</th>
                                        <th class="cell-300" scope="col">金额</th>
                                        <th class="cell-300" scope="col">收款/审批时间</th>
                                        <th class="cell-300" scope="col">操作人</th>
                                    </tr>
                                    <tbody>
                                    <tr v-for="bill in projectBillsInfo">
                                        <td>{{ bill.expence_name }}</td>
                                        <td>{{ bill.expense_type }}</td>
                                        <td>{{ bill.artist_name }}</td>
                                        <td>{{ bill.money }}</td>
                                        <td>{{ bill.pay_rec_time }}</td>
                                        <td>{{ bill.action_user }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style="margin: 6rem auto;width: 100px" v-if="projectBillsInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getProjectBill"
                                            :total_pages="total_pages"
                                            :total="total"></pagination>
                            </div>
                            <!-- 回款 -->
                            <div class="tab-pane animation-fade pt-10 pb-20"
                                 v-if="projectInfo.type != 5 && projectInfo.approval_status == 232"
                                 id="forum-project-payback" role="tabpanel">
                                <div class="clearfix">
                                    <ul class="nav nav-tabs nav-tabs-line float-left" role="tablist"
                                        style="border-bottom: 0">
                                        <li class="nav-item" role="presentation"
                                            v-for="(contract,index) in projectContractInfo">
                                            <a class="nav-link" :class="index === 0 ? 'active': ''" data-toggle="tab"
                                               href="#forum-item-bill"
                                               @click="getProjectReturned(contract.form_instance_number)"
                                               aria-controls="forum-base"
                                               aria-expanded="true" role="tab">
                                                <template v-for="(star,index) in contract.stars_name">
                                                    {{ star.name }}
                                                    <template v-if="(index + 1) !== contract.stars_name.length">/
                                                    </template>
                                                </template>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="float-right" style="padding: .715rem 0">
                                        <span class="pointer-content hover-content" data-toggle="modal"
                                              data-target="#addPaybackTime" @click="editProjectPaybackTime(false)">
                                            <i class="iconfont icon-tianjia pr-5"></i>新建回款期次</span>
                                    </div>
                                </div>
                                <div class="tab-pane animation-fade" id="forum-item-payback">
                                    <div class="example" v-if="projectReturnInfo.meta">
                                        <div class="col-md-3 float-left pl-0">
                                            <div>合同金额<span class="money-color pl-5">
                            {{ projectReturnInfo.meta.appoval ? projectReturnInfo.meta.appoval.money : 0}}</span>元
                                            </div>
                                        </div>
                                        <div class="col-md-3 float-left pl-0">
                                            <div>已回款<span class="money-color pl-5">
                            {{ projectReturnInfo.meta.alreadyReturnedMoney ? projectReturnInfo.meta.alreadyReturnedMoney : 0}}</span>元
                                            </div>
                                        </div>
                                        <div class="col-md-3 float-left pl-0">
                                            <div>未回款<span class="money-color pl-5">
                            {{ projectReturnInfo.meta.notReturnedMoney ? projectReturnInfo.meta.notReturnedMoney : 0}}</span>元
                                            </div>
                                        </div>
                                        <div class="col-md-3 float-left pl-0">
                                            <div>已开票<span class="money-color pl-5">
                            {{ projectReturnInfo.meta.alreadyinvoice ? projectReturnInfo.meta.alreadyinvoice : 0}}</span>元
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dividing-line"></div>
                                    <div v-for="returnMoney in projectReturnInfo.data">
                                        <div class="clearfix py-20">
                                            <div class="float-left font-weight-bold">{{ returnMoney.issue_name }}</div>
                                            <div class="float-right">
                            <span class="mr-40 pointer-content hover-content" data-toggle="modal"
                                  data-target="#addPayback" @click="selectedPaybackTime(returnMoney)">
                            <i class="iconfont icon-tianjia pr-5"></i>回款记录</span>
                                                <span class="pointer-content hover-content" data-toggle="modal"
                                                      data-target="#addInvoice"
                                                      @click="selectedPaybackTime(returnMoney)">
                            <i class="iconfont icon-tianjia pr-5"></i>开票记录</span>
                                            </div>
                                        </div>
                                        <div class="clearfix">
                                            <div class="float-left" style="width: 20%">回款日期
                                                <span class="pl-5">{{ returnMoney.plan_returned_time }}</span>
                                            </div>
                                            <div class="float-left" style="width: 20%">计划回款
                                                <span class="money-color pl-5">
                                                    {{ returnMoney.plan_returned_money }}元
                                                </span>
                                            </div>
                                            <div class="float-left" style="width: 20%">实际回款
                                                <span class="money-color pl-5">
                                                <template v-if="returnMoney.practicalsum">
                                                    {{ returnMoney.practicalsum.data.practicalsum ? returnMoney.practicalsum.data.practicalsum:'0' }}元
                                                </template>
                                                <template v-else>
                                                    0元
                                                </template>
                                                </span>
                                            </div>
                                            <div class="float-left" style="width: 20%">开票金额<span
                                                    class="money-color pl-5">
                                                <template v-if="returnMoney.invoicesum">
                                                    {{ returnMoney.invoicesum.data.invoicesum ? returnMoney.invoicesum.data.invoicesum:'0' }}元
                                                </template>
                                                <template v-else>
                                                    0元
                                                </template>
                                                </span>
                                            </div>
                                            <div class="float-right text-right" style="color: #cccccc;width: 20%;">
                                                <i class="iconfont icon-bianji2 pr-40 pointer-content"
                                                   data-toggle="modal"
                                                   data-target="#addPaybackTime"
                                                   @click="editProjectPaybackTime(true, returnMoney)"></i>
                                                <i class="iconfont icon-shanchu1 pointer-content"
                                                   data-toggle="modal" data-target="#paybackDel"
                                                   @click="delProjectPayback(returnMoney.id)"></i>
                                            </div>
                                        </div>

                                        <div v-for="item in returnMoney.money.data">
                                            <div class="segmentation-line example"></div>
                                            <div v-if="item.type.data.type === 1">
                                                <div class="font-weight-bold">回款记录</div>
                                                <div class="clearfix">
                                                    <div class="float-left" style="width: 20%">回款日期<span
                                                            class="pl-5">{{ item.plan_returned_time }}</span>
                                                    </div>
                                                    <div class="float-left" style="width: 20%">回款金额<span
                                                            class="money-color pl-5">{{ item.plan_returned_money }}元</span>
                                                    </div>
                                                    <div class="col-md-2 float-left pl-0">付款方式<span
                                                            class="pl-5">{{ item.type.data.plan_returned_money }}</span>
                                                    </div>
                                                    <div class="float-right text-right"
                                                         style="color: #cccccc;width: 20%;">
                                                        <i class="iconfont icon-bianji2 pr-40 pointer-content"
                                                           data-toggle="modal" data-target="#addPayback"
                                                           @click="editProjectPaybackRecording(item, returnMoney, 'payback')"></i>
                                                        <i class="iconfont icon-shanchu1 pointer-content"
                                                           data-toggle="modal" data-target="#paybackDel"
                                                           @click="delProjectPayback(item.id)"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="item.type.data.type === 2">
                                                <div class="font-weight-bold">开票记录</div>
                                                <div class="clearfix">
                                                    <div class="float-left" style="width: 20%">开票日期<span
                                                            class="pl-5">{{ item.plan_returned_time }}</span>
                                                    </div>
                                                    <div class="float-left" style="width: 20%">开票金额<span
                                                            class="money-color pl-5">{{ item.plan_returned_money }}元</span>
                                                    </div>
                                                    <div class="float-left" style="width: 20%">票据类型<span class="pl-5">{{ item.type.data.plan_returned_money }}</span>
                                                    </div>
                                                    <div class="float-right text-right"
                                                         style="color: #cccccc;width: 20%;">
                                                        <i class="iconfont icon-bianji2 pr-40 pointer-content"
                                                           data-toggle="modal" data-target="#addInvoice"
                                                           @click="editProjectPaybackRecording(item, returnMoney)"></i>
                                                        <i class="iconfont icon-shanchu1 pointer-content"
                                                           data-toggle="modal" data-target="#paybackDel"
                                                           @click="delProjectPayback(item.id)"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="dividing-line example"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- 概况 -->
                            <div class="tab-pane animation-fade" v-if="projectInfo"
                                 :class="(projectInfo.type == 5 || projectInfo.approval_status != 232) ? 'active' : ''"
                                 id="forum-project-base"
                                 role="tabpanel">
                                <div class="card">
                                    <div class="card-header card-header-transparent card-header-bordered">
                                        <div class="float-left font-weight-bold third-title">项目信息</div>
                                        <div class="float-right"
                                             v-show="(!isEdit && projectInfo.approval_status == 232) || (!isEdit && projectInfo.type == 5)">
                                            <i class="iconfont icon-bianji2 pointer-content" aria-hidden="true"
                                               @click="editBaseInfo"></i>
                                        </div>
                                        <div class="float-right mr-40" v-show="isEdit">
                                            <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消
                                            </button>
                                            <button class="btn btn-primary" @click="changeProjectInfo">确定</button>
                                        </div>
                                    </div>
                                    <div class="py-20" v-if="projectInfo.title">
                                        <div class="clearfix">
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">项目名称</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="projectInfo.title" :is-edit="isEdit"
                                                               @change="(value) => changeProjectBaseInfo(value, 'title')"></EditInput>
                                                </div>
                                            </div>
                                            <div class="py-10 px-0 clearfix col-md-6 float-left "
                                                 v-if="projectInfo.type != 5">
                                                <TrailOrigin :trailType='projectInfo.trail.data.type'
                                                             typeName='项目' :isEdit='isEdit'
                                                             :content='projectInfo.trail.data.resource'
                                                             @changeTrailOrigin="(value) => changeProjectBaseInfo(value, 'resource_type')"
                                                             :contentType='projectInfo.trail.data.resource_type'
                                                             @changeEmail="(value) => changeProjectBaseInfo(value, 'resource')"
                                                             detailPage='true'
                                                             @changeTrailOriginPerson="(value) => changeProjectBaseInfo(value.id, 'resource')"/>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">负责人</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInputSelector :is-edit="isEdit"
                                                                       @change="(value) => changeProjectBaseInfo(value, 'principal_id')"></EditInputSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">参与人</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditAddMember :is-edit="isEdit"
                                                                   @change="(value) => changeProjectBaseInfo(value, 'participant_ids')"></EditAddMember>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left "
                                                 v-if="projectInfo.type != 5">
                                                <div class="col-md-3 float-left text-right pl-0">目标艺人</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="projectInfo.trail.data.expectations">
                                                    <span v-for="expectation in projectInfo.trail.data.expectations.data"
                                                          :key="expectation.name" v-if="!isEdit">
                                                        {{ expectation.name || expectation.nickname}}
                                                    </span>
                                                    <EditSelector :options="starsArr" :is-edit="isEdit"
                                                                  :multiple="true"
                                                                  :content="selectedExpectationsArr"
                                                                  :contentHide='true'
                                                                  @change="(value) => changeProjectBaseInfo(value, 'expectations')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left "
                                                 v-if="projectInfo.type == 5">
                                                <div class="col-md-3 float-left text-right pl-0">可见范围</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :is-edit="isEdit" :content="projectInfo.privacy"
                                                                  :options="visibleRangeArr"
                                                                  @change="(value) => changeProjectBaseInfo(value, 'privacy')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left "
                                                 v-if="projectInfo.type != 5">
                                                <div class="col-md-3 float-left text-right pl-0">预计订单收入/元</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditNumberSpinner :is-edit="isEdit"
                                                                       :content="projectInfo.trail.data.fee"
                                                                       @change="(value) => changeProjectBaseInfo(value, 'fee')"></EditNumberSpinner>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left "
                                                 v-if="projectInfo.type != 5">
                                                <div class="col-md-3 float-left text-right pl-0">预计支出/元</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditNumberSpinner :is-edit="isEdit"
                                                                       :content="projectInfo.projected_expenditure"
                                                                       @change="(value) => changeProjectBaseInfo(value, 'projected_expenditure')"></EditNumberSpinner>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">优先级</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :is-edit="isEdit" :options="levelArr"
                                                                  :content="projectInfo.priority"
                                                                  @change="(value) => changeProjectBaseInfo(value, 'priority')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">合作类型</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :is-edit="isEdit" :options="cooperationTypeArr"
                                                                  :content="projectInfo.trail.data.cooperation_type"
                                                                  @change="(value) => changeProjectBaseInfo(value, 'cooperation_type')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">状态</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :is-edit="isEdit" :options="trailStatusArr"
                                                                    :content="projectInfo.trail.data.status"
                                                                    @change="(value) => changeProjectBaseInfo(value, 'status')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">截止时间</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditDatepicker :is-edit="isEdit"
                                                                    :content="projectInfo.end_at"
                                                                    @change="(value) => changeProjectBaseInfo(value, 'end_at')"></EditDatepicker>
                                                </div>
                                            </div>
                                            <div v-if="projectInfo.type != 5 && projectInfo.fields">
                                                <div class="card-text py-10 px-0 clearfix col-md-6 float-left "
                                                     v-for="field in projectInfo.fields">
                                                    <div class="col-md-3 float-left text-right pl-0">{{ field.key }}
                                                    </div>
                                                    <div class="col-md-9 float-left font-weight-bold">
                                                        <template v-if="field.field_type === 1">
                                                            <EditInput
                                                                    :content="field.values ? field.values.data.value : ''"
                                                                    :is-edit="isEdit"
                                                                    @change="(value) => addInfo(value, field.id )"></EditInput>
                                                        </template>
                                                        <template v-else-if="field.field_type === 2">
                                                            <EditSelector :placeholder="'请选择' + field.key"
                                                                          :content="field.values ? field.values.data.value : ''"
                                                                          :is-edit="isEdit"
                                                                          :options="field.contentArr"
                                                                          @change="(value) => addInfo(value, field.id )"></EditSelector>
                                                        </template>
                                                        <template v-else-if="field.field_type === 4">
                                                            <EditDatepicker
                                                                    :content="field.values ? field.values.data.value : ''"
                                                                    :is-edit="isEdit"
                                                                    @change="(value) => addInfo(value, field.id )"></EditDatepicker>
                                                        </template>
                                                        <template v-else-if="field.field_type === 5">
                                                            <EditTextarea
                                                                    :content="field.values ? field.values.data.value : ''"
                                                                    :is-edit="isEdit"
                                                                    @change="(value) => addInfo(value, field.id )"></EditTextarea>
                                                        </template>
                                                        <template v-else-if="field.field_type === 6">
                                                            <EditSelector
                                                                    :content="field.values && field.values.data.value ? field.values.data.value.split('|') : []"
                                                                    :multiple="true"
                                                                    :is-edit="isEdit"
                                                                    :options="field.contentArr"
                                                                    @change="(value) => addInfo(value.join('|'), field.id )"></EditSelector>
                                                        </template>
                                                        <template v-else-if="field.field_type === 8">
                                                            <EditGroupDatePicker
                                                                    :content="field.values ? field.values.data.value : ''"
                                                                    :is-edit="isEdit"
                                                                    @change="(start, end) => addInfo(start + '|' + end, field.id )">
                                                            </EditGroupDatePicker>
                                                        </template>
                                                        <template v-else-if="field.field_type === 10">
                                                            <EditInputSelector :is-edit="isEdit"
                                                                               @change="(value) => addInfo(value, field.id )"></EditInputSelector>
                                                        </template>
                                                        <template v-else-if="field.field_type === 11">
                                                            <EditNumberSpinner
                                                                    :content="field.values ? field.values.data.value : ''"
                                                                    :is-edit="isEdit"
                                                                    @change="(value) => addInfo(value, field.id )"></EditNumberSpinner>
                                                        </template>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">备注</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditTextarea :is-edit="isEdit" :content="projectInfo.desc"
                                                                  @change="(value) => changeProjectBaseInfo(value, 'desc')"></EditTextarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="segmentation-line example"></div>

                                        <div class="clearfix">
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                                 v-if="projectInfo.creator">
                                                <div class="col-md-3 float-left text-right pl-0">录入人</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    {{ projectInfo.creator.data.name }}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">录入时间</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    {{ projectInfo.created_at }}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">最近更新人</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    {{ projectInfo.last_updated_user }}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">最近更新时间</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    {{ projectInfo.last_updated_at }}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                                 v-if="projectInfo.relate_projects">
                                                <div class="col-md-3 float-left text-right pl-0">关联项目</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <template v-for="project in projectInfo.relate_projects.data">
                                                        <span class="pointer-content"
                                                              @click="redirectProject(project.id)">{{project.title }}</span>
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                                 v-if="projectInfo.relate_tasks">
                                                <div class="col-md-3 float-left text-right pl-0">关联任务</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <template v-for="task in projectInfo.relate_tasks.data">
                                                        <span class="pointer-content" @click="redirectTask(task.id)">{{ task.title }}</span>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="segmentation-line example float-left"></div>

                                        <div v-if="projectInfo.type != 5">
                                            <ApprovalProgress :formid="projectInfo.form_instance_number"
                                                              :formstatus="projectInfo.approval_text" projcetinfo='true'
                                                              mode="detail"></ApprovalProgress>
                                        </div>
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
                                    <TaskFollowUp :follow-type="'项目'" :trailId="projectId"
                                                  trailType="projects"></TaskFollowUp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新建任务 -->
        <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
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
                            <div class="col-md-10 float-left pl-0">
                                项目 - {{ projectInfo.title }}
                            </div>
                        </div>
                        <div class="example" v-if="taskTypeArr.length > 0">
                            <div class="col-md-2 text-right float-left">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskTypeArr" ref="taskType"
                                           @change="changeTaskType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称"
                                       v-model="taskName">
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
                                <add-member @change="participantChange"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="priorityArr" ref="taskLevel"
                                           @change="changeTaskLevel"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker ref="startTime" @change="changeStartTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker ref="startMinutes" :default="startMinutes"
                                            @change="changeStartMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker ref="endTime" @change="changeEndTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker ref="endMinutes" :default="endMinutes"
                                            @change="changeEndMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务说明</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" name="taskDescription" title=""
                                          v-model="taskIntroduce"></textarea>
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
        <!-- 隐私设置 -->
        <div class="modal fade" id="addPrivacy" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">隐私设置</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">预计订单收入</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'pay'"></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">预计支出</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'division'"></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">实际收入</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'contract'"></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">实际支出</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'collect'"></add-member>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancelPrivacy">取消
                        </button>
                        <button class="btn btn-primary" type="submit" @click="setPrivacy">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 撤单原因 -->
        <div class="modal fade" id="withdrawal" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" v-if="projectInfo.type != 5" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">撤单原因</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">撤单原因</div>
                            <div class="col-md-10 float-left">
                                <textarea placeholder="请输入撤单原因" class="form-control"
                                          v-model="withdrawalReason"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="doWithdrawal">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新建/修改回款期次 -->
        <div class="modal fade" id="addPaybackTime" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static" v-if="projectInfo.type != 5">
            <div class="modal-dialog modal-simple" v-if="projectInfo.title">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">
                            <template v-if="!isEditProjectPayback">新建回款期次</template>
                            <template v-else>修改回款期次</template>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-if="projectInfo.trail">
                            <div class="col-md-2 text-right float-left px-0">关联公司</div>
                            <div class="col-md-10 float-left">
                                {{ projectInfo.trail.data.client.data.company }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">关联项目</div>
                            <div class="col-md-10 float-left">
                                {{ projectInfo.title }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">负责人</div>
                            <div class="col-md-10 float-left">
                                {{ user.nickname }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">期次名称</div>
                            <div class="col-md-10 float-left">
                                <template v-if="!isEditProjectPayback">第{{ paybackLength }}期</template>
                                <template v-else>第{{ projectReturnName }}期</template>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">计划回款金额</div>
                            <div class="col-md-10 float-left">
                                <NumberSpinner ref="paybackMoney"
                                               @change="(value) => addProjectReturn(value, 'plan_returned_money')"></NumberSpinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">计划回款日期</div>
                            <div class="col-md-10 float-left">
                                <Datepicker ref="paybackTime"
                                            @change="(value) => addProjectReturn(value, 'plan_returned_time')"></Datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">备注</div>
                            <div class="col-md-10 float-left">
                                <textarea title="" class="form-control" placeholder="请输入备注"
                                          v-model="projectReturnDesc"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <template v-if="!isEditProjectPayback">
                            <button class="btn btn-primary" type="submit" @click="addProjectPayback">确定</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-primary" type="submit" @click="editProjectPayback">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新建/修改回款记录 -->
        <div class="modal fade" id="addPayback" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static" v-if="projectInfo.type != 5">
            <div class="modal-dialog modal-simple" v-if="projectInfo.title">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <template v-if="!isEditProjectPaybackTime">
                            <h4 class="modal-title">新建回款记录</h4>
                        </template>
                        <template v-else>
                            <h4 class="modal-title">修改回款记录</h4>
                        </template>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-if="companyArr.length > 0">
                            <div class="col-md-2 text-right float-left px-0">关联公司</div>
                            <div class="col-md-10 float-left">
                                {{ projectInfo.trail.data.client.data.company }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">关联项目</div>
                            <div class="col-md-10 float-left">
                                {{ projectInfo.title }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">负责人</div>
                            <div class="col-md-10 float-left">
                                {{ user.nickname }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">回款期次</div>
                            <div class="col-md-10 float-left">
                                {{ paybackTime.issue_name }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">回款金额</div>
                            <div class="col-md-10 float-left">
                                <NumberSpinner ref="paybackMoney1"
                                               @change="(value) => addProjectReturn(value, 'plan_returned_money')"></NumberSpinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">回款日期</div>
                            <div class="col-md-10 float-left">
                                <Datepicker ref="paybackTime1"
                                            @change="(value) => addProjectReturn(value, 'plan_returned_time')"></Datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">付款方式</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="payMethodsArr" ref="payMethod"
                                           @change="(value) => addProjectReturn(value, 'project_returned_money_type_id')"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">备注</div>
                            <div class="col-md-10 float-left">
                                <textarea title="" class="form-control" placeholder="请输入备注"
                                          v-model="projectReturnDesc"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消
                        </button>
                        <template v-if="!isEditProjectPaybackTime">
                            <button class="btn btn-primary" type="submit" @click="addProjectPaybackTime">确定</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-primary" type="submit" @click="editProjectPayback">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新建/修改开票记录 -->
        <div class="modal fade" id="addInvoice" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" v-if="projectInfo.type != 5">
            <div class="modal-dialog modal-simple" data-backdrop="static" v-if="projectInfo.title">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新建开票记录</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-if="companyArr.length > 0">
                            <div class="col-md-2 text-right float-left px-0">关联公司</div>
                            <div class="col-md-10 float-left">
                                {{ projectInfo.trail.data.client.data.company }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">关联项目</div>
                            <div class="col-md-10 float-left">
                                {{ projectInfo.title }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">负责人</div>
                            <div class="col-md-10 float-left">
                                {{ user.nickname }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">回款期次</div>
                            <div class="col-md-10 float-left">
                                {{ paybackTime.issue_name }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">开票金额</div>
                            <div class="col-md-10 float-left">
                                <NumberSpinner ref="paybackMoney2"
                                               @change="(value) => addProjectReturn(value, 'plan_returned_money')"></NumberSpinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">开票日期</div>
                            <div class="col-md-10 float-left">
                                <Datepicker ref="paybackTime2"
                                            @change="(value) => addProjectReturn(value, 'plan_returned_time')"></Datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">票据类型</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="invoiceTypeArr" ref="payMethod1"
                                           @change="(value) => addProjectReturn(value, 'project_returned_money_type_id')"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">备注</div>
                            <div class="col-md-10 float-left">
                                <textarea title="" class="form-control" placeholder="请输入备注"
                                          v-model="projectReturnDesc"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <template v-if="!isEditProjectPaybackTime">
                            <button class="btn btn-primary" type="submit" @click="addProjectPaybackTime">确定</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-primary" type="submit" @click="editProjectPayback">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <!-- 关联资源 -->
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
        <!-- 新增结算单 -->
        <div class="modal fade" id="addBill" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static" v-if="projectInfo.type != 5">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增结算单</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">税费</div>
                            <div class="col-md-10 float-left">
                                <input type="text" class="form-control" title="">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">papi分成</div>
                            <div class="col-md-10 float-left">
                                <input type="text" class="form-control" title="">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">bigger分成</div>
                            <div class="col-md-10 float-left">
                                <input type="text" class="form-control" title="">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">我司分成</div>
                            <div class="col-md-10 float-left">
                                <input type="text" class="form-control" title="">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="">确定</button>
                    </div>
                </div>
            </div>
        </div>

        <Flag :typeText="changeProjectStatusText" @confirmFlag='changeProjectStatus'/>
        <!-- 删除回款相关 -->
        <div class="modal fade" id="paybackDel" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">确认删除{{delText}}</h4>
                    </div>
                    <div class="modal-body">
                        <p class="mt-20">此更改不可撤销</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-default btn-pure waves-effect waves-classic"
                                data-dismiss="modal">取消
                        </button>
                        <button type="button"
                                class="btn btn-primary waves-effect waves-classic"
                                data-dismiss="modal" @click='delProjectPaybackCallback'>确认
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <ApprovalGreatModule :formData="formData" :default-value="projectContractDefault"></ApprovalGreatModule>
    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    import Cookies from 'js-cookie'

    export default {
        data: function () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                isLoading: true,
                projectId: '',
                changeInfo: {},
                isEdit: false,
                projectInfo: '',
                trailInfo: {},
                taskTypeArr: [],
                priorityArr: config.priorityArr,
                cooperationTypeArr: config.cooperationTypeArr,
                trailStatusArr: config.trailStatusArr,
                taskLevel: '',
                taskName: '',
                startTime: '',
                endTime: '',
                startMinutes: '00:00',
                endMinutes: '00:00',
                taskIntroduce: '',
                projectTasksInfo: [],
                withdrawalReason: '',
                companyArr: [],
                payMethodsArr: [],
                invoiceTypeArr: [],
                visibleRangeArr: config.visibleRangeArr,
                levelArr: config.levelArr,
                selectedExpectationsArr: [],
                addInfoArr: {},
                followStatus: '',
                flagParticipantsIdArr: [],
                starsArr: [],
                changeProjectStatusText: '',
                allProjectsInfo: '',
                allTasksInfo: '',
                projectChangeStatus: '',
                linkageResource: '',
                searchKeyWord: '',
                filterFee: 1,
                projectBillsInfo: [],
                projectReturnInfo: '',
                linkageSelectedIds: {
                    projects: [],
                    tasks: []
                },
                projectLinkageInfo: [
                    {
                        name: '项目',
                        value: 1,
                        child: []
                    },
                    {
                        name: '任务',
                        value: 2,
                        child: []
                    }
                ],
                projectProgressInfo: [
                    {
                        status: 1,
                        name: '评估中',
                        isFinish: 0,
                        finish_at: ''
                    },
                    {
                        status: 2,
                        name: '评估完成',
                        isFinish: 0,
                        finish_at: ''
                    },
                    {
                        status: 3,
                        name: '签约中',
                        isFinish: 0,
                        finish_at: ''
                    },
                    {
                        status: 4,
                        name: '签约完成',
                        isFinish: 0,
                        finish_at: ''
                    },
                    {
                        status: 5,
                        name: '执行中',
                        isFinish: 0,
                        finish_at: ''
                    },
                    {
                        status: 6,
                        name: '执行完成',
                        isFinish: 0,
                        finish_at: ''
                    },
                    {
                        status: 7,
                        name: '回款中',
                        isFinish: 0,
                        finish_at: ''
                    },
                    {
                        status: 8,
                        name: '回款完成',
                        isFinish: 0,
                        finish_at: ''
                    }
                ],
                projectReturnDesc: '',
                projectReturnData: {},
                projectReturnName: '',
                isEditProjectPayback: false,
                projectReturnId: '',
                isEditProjectPaybackTime: false,
                paybackTime: '',
                delText: '',
                paybackLength: 1,
                user: '',
                projectTaskingInfo: [],
                metaInfo: '',
                oldInfo: '',
                coursesLength: 0,
                formData: '',
                projectContractInfo: '',
                contractId: '',
                projectContractDefault: '',
            }
        },

        mounted() {
            this.projectId = this.$route.params.id;
            this.getPrivacy() //获取隐私设置列表
            this.getProject();
            this.getClients();
            this.getTaskType();
            this.getProjectTasking();
            this.getProjectProgress();
            this.user = JSON.parse(Cookies.get('user'));
            let _this = this;
            $('#addPaybackTime').on('hidden.bs.modal', function () {
                _this.projectReturnDesc = '';
                _this.$refs.paybackMoney.setValue('0');
                _this.$refs.paybackTime.setValue();
                _this.projectReturnData = {};
            });

            $('#addPayback').on('hidden.bs.modal', function () {
                _this.$refs.paybackMoney1.setValue('0');
                _this.$refs.paybackTime1.setValue();
                _this.$refs.payMethod.setValue();
                _this.projectReturnData = {};
            });

            $('#addInvoice').on('hidden.bs.modal', function () {
                _this.$refs.paybackMoney2.setValue('0');
                _this.$refs.paybackTime2.setValue();
                _this.$refs.payMethod1.setValue();
                _this.projectReturnData = {};
            });

            $('#addTask').on('hidden.bs.modal', function () {
                _this.taskName = '';
                _this.taskLevel = '';
                _this.$refs.taskLevel.setValue('');
                _this.taskType = '';
                _this.$refs.taskType.setValue('');
                _this.startTime = '';
                _this.endTime = '';
                _this.startMinutes = '';
                _this.endMinutes = '';
                _this.taskIntroduce = '';
                _this.$refs.startTime.setValue('');
                _this.$refs.startMinutes.setValue('00:00');
                _this.$refs.endTime.setValue('');
                _this.$refs.endMinutes.setValue('00:00');
                _this.$store.commit('changeNewPrincipal', {});
                _this.$store.commit('changeNewParticipantsInfo', [])
            })
        },

        watch: {
            projectReturnDesc: function (newValue) {
                this.addProjectReturn(newValue, 'desc')
            },
            routerId(id) {
                this.projectId = id;
                setTimeout(() => {
                    this.getProject();
                }, 100);
            }
        },
        computed: {
            completeNum() {
                return this.projectTasksInfo.filter(n => n.status === 2).length
            },
            routerId() {
                return this.$route.params.id
            },
        },

        methods: {

            getProject: function () {
                let data = {
                    include: 'principal,participants,creator,fields,trail.expectations,trail.client,relate_tasks,relate_projects,type',
                };
                fetch('get', '/projects/' + this.projectId, data).then(response => {
                    this.oldInfo = JSON.parse(JSON.stringify(response));
                    let fieldsArr = response.meta.fields.data;
                    this.metaInfo = response.meta;
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
                    response.data.fields = fieldsArr;
                    this.projectInfo = response.data;
                    this.projectContractDefault = {
                        '项目名称': response.data.title
                    };
                    let params = {
                        type: 'change',
                    };
                    params.data = response.data.principal.data;
                    this.$store.dispatch('changePrincipal', params);
                    if (response.data.participants) {
                        for (let i = 0; i < response.data.participants.data.length; i++) {
                            this.flagParticipantsIdArr.push(response.data.participants.data[i].id)
                        }
                        params.data = JSON.parse(JSON.stringify(response.data.participants.data));
                        this.$store.dispatch('changeParticipantsInfo', params);
                    }

                    if (response.data.relate_tasks) {
                        for (let i = 0; i < response.data.relate_tasks.data.length; i++) {
                            this.linkageSelectedIds.tasks.push(response.data.relate_tasks.data[i].id)
                        }
                    }
                    if (response.data.relate_projects) {
                        for (let i = 0; i < response.data.relate_projects.data.length; i++) {
                            this.linkageSelectedIds.projects.push(response.data.relate_projects.data[i].id)
                        }
                    }
                    if (response.data.trail) {
                        this.selectedExpectationsArr = [];
                        for (let i = 0; i < response.data.trail.data.expectations.data.length; i++) {
                            this.selectedExpectationsArr.push(response.data.trail.data.expectations.data[i].moduleable_type + '-' + response.data.trail.data.expectations.data[i].id)
                        }
                    }

                    if (response.data.approval_status === 231) {
                        this.projectInfo.approval_text = '待审批'
                    } else if (response.data.approval_status === 232) {
                        this.projectInfo.approval_text = '已审批'
                    }

                    this.isLoading = false
                    this.getStars()
                })
            },
            //隐私设置
            setPrivacy: function () {

                let data = {
                    fee: this.$store.state.payInfo, //预计订单收入
                    projected_expenditure: this.$store.state.divisionInfo,//预计支出
                    expendituresum: this.$store.state.contractInfo,//实际收入
                    contractmoney: this.$store.state.collectInfo,//实际支出
                }
                let sendData = {
                    fee: [],
                    projected_expenditure: [],
                    expendituresum: [],
                    contractmoney: [],
                }
                for (const key in data) {
                    for (let i = 0; i < data[key].length; i++) {
                        sendData[key].push(data[key][i].id)
                    }
                }
                fetch('put', `/projects/${this.$route.params.id}/privacyUser`, sendData).then(() => {
                    toastr.success('隐私设置成功')
                    $('#addPrivacy').modal('hide')
                })
            },
            getPrivacy: function () {
                let data = {
                    project_id: this.$route.params.id
                };
                fetch('get', `/privacyUsers?include=user`, data).then(response => {
                    let allPrivacyUsers = response.data;
                    this.$store.state.divisionInfo = [];
                    this.$store.state.payInfo = [];
                    this.$store.state.contractInfo = [];
                    this.$store.state.collectInfo = [];
                    if (allPrivacyUsers) {
                        for (let i = 0; i < allPrivacyUsers.length; i++) {
                            if (allPrivacyUsers[i].field === 'fee') {
                                this.$store.state.payInfo.push(allPrivacyUsers[i].user.data)
                            } else if (allPrivacyUsers[i].field === 'projected_expenditure') {
                                this.$store.state.divisionInfo.push(allPrivacyUsers[i].user.data)
                            } else if (allPrivacyUsers[i].field === 'expendituresum') {
                                this.$store.state.contractInfo.push(allPrivacyUsers[i].user.data)
                            } else if (allPrivacyUsers[i].field === 'contractmoney') {
                                this.$store.state.collectInfo.push(allPrivacyUsers[i].user.data)
                            } else {
                            }

                        }
                    }

                })
            },

            getApprovalsFormData: function () {
                let data = {
                    type: 'projects'
                };
                let organization_id = Number(JSON.parse(Cookies.get('user')).organization_id);
                if (organization_id === 411) {
                    data.status = 1
                } else if (organization_id === 412) {
                    data.status = 2
                }
                fetch('get', 'approvals/specific_contract', data).then(response => {
                    this.formData = response.data;
                    $('#approval-great-module').modal('show')
                })
            },

            cancelPrivacy: function () {
                this.$store.state.divisionInfo = [];
                this.$store.state.payInfo = [];
                this.$store.state.contractInfo = [];
                this.$store.state.collectInfo = []
            },

            getStars: function () {
                if (this.starsArr.length > 0) {
                    return
                }
                fetch('get', '/starandblogger', {sign_contract_status: 2}).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.starsArr.push({
                            name: response.data[i].name,
                            value: response.data[i].flag + '-' + response.data[i].id,
                        })
                    }

                })
            },

            getClients: function () {
                let _this = this;
                fetch('get', '/clients/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.companyArr.push({
                            name: response.data[i].company,
                            id: response.data[i].id,
                            grade: response.data[i].grade
                        })
                    }

                })
            },

            getProjectTasks: function () {
                fetch('get', '/projects/' + this.projectId + '/tasks').then(response => {
                    this.projectTasksInfo = response.data;
                    this.total = response.meta.pagination.total;
                    this.current_page = response.meta.pagination.current_page;
                    this.total_pages = response.meta.pagination.total_pages;
                })
            },

            getProjectTasking: function () {
                let data = {
                    status: 1,
                };
                fetch('get', '/projects/' + this.projectId + '/tasks', data).then(response => {
                    this.projectTaskingInfo = response.data.slice(0, 5)
                })
            },

            getProjectBill: function () {
                fetch('get', '/projects/' + this.projectId + '/bill').then(response => {
                    this.projectBillsInfo = response.data;
                    this.total = response.meta.pagination.total;
                    this.current_page = response.meta.pagination.current_page;
                    this.total_pages = response.meta.pagination.total_pages;
                });
            },

            getProjectContract: function (callback) {
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

            getProjectReturned: function (contractId) {
                this.contractId = contractId;
                let data = {
                    include: 'money.type,practicalsum,invoicesum',
                    contract_id: contractId
                };
                fetch('get', '/projects/' + this.projectId + '/returned/money', data).then(response => {
                    this.projectReturnInfo = response;
                    for (let i = 0; i < response.data.length; i++) {
                        let length = Number(response.data[i].issue_name.slice(1, -1));
                        if (length >= this.paybackLength) {
                            this.paybackLength = length + 1
                        }
                    }
                });
            },

            getProjectsReturned: function () {
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

            addProjectProgress: function (status) {
                fetch('put', '/projects/' + this.projectId + '/course', {status: status}).then(response => {
                    let flagInfo = this.projectProgressInfo.find(item => item.status == status);
                    flagInfo['finisher'] = response.data.user;
                    flagInfo['finish_at'] = response.data.updated_at;
                    flagInfo['isFinish'] = 1;
                    this.coursesLength += 1;
                    toastr.success('修改成功');
                    this.getProjectProgress();
                })
            },

            getProjectProgress: function () {
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

            addProjectReturn: function (value, name) {
                if (name === 'principal_id') {
                    value = this.$store.state.newPrincipalInfo.id
                }
                this.projectReturnData[name] = value
            },

            addProjectPayback: function () {
                this.projectReturnData.contract_id = this.contractId;
                this.projectReturnData.principal_id = this.user.id;
                this.projectReturnData.issue_name = this.paybackLength;
                fetch('post', '/projects/' + this.projectId + '/returned/money', this.projectReturnData).then(() => {
                    $('#addPaybackTime').modal('hide');
                    toastr.success('添加成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            editProjectPayback: function () {
                fetch('put', '/returned/money/' + this.projectReturnId, this.projectReturnData).then(() => {
                    $('#addPaybackTime').modal('hide');
                    $('#addPayback').modal('hide');
                    $('#addInvoice').modal('hide');
                    toastr.success('修改成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            delProjectPayback: function (paybackId) {
                this.delPaybackId = paybackId
            },

            delProjectPaybackCallback: function () {
                fetch('delete', '/returned/money/' + this.delPaybackId).then(() => {
                    toastr.success('删除成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            editProjectPaybackTime: function (type, payback) {
                this.isEditProjectPayback = type;
                if (type) {
                    this.projectReturnName = payback.issue_name;
                    this.projectReturnDesc = payback.desc;
                    this.$refs.paybackMoney.setValue(payback.plan_returned_money);
                    this.$refs.paybackTime.setValue(payback.plan_returned_time);
                    this.projectReturnId = payback.id;
                }
            },

            addProjectPaybackTime: function () {
                if (!this.projectReturnData.project_returned_money_type_id) {
                    toastr.error('请选择票据类型或付款方式')
                    return
                }
                this.projectReturnData.contract_id = this.contractId;
                this.projectReturnData.principal_id = this.user.id;
                fetch('post', '/projects/' + this.projectId + '/returned/' + this.paybackTime.id + '/money', this.projectReturnData).then(response => {
                    $('#addPayback').modal('hide');
                    $('#addInvoice').modal('hide');
                    toastr.success('添加成功');
                    this.getProjectReturned(this.contractId)
                })
            },

            redirectContract: function (contractId) {
                this.$router.push({path: '/approval/' + contractId})
            },

            selectedPaybackTime: function (payback) {
                this.paybackTime = payback;
            },

            editProjectPaybackRecording: function (recording, payback, type) {
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

            setTaskPrincipal: function () {
                this.$store.dispatch('changePrincipal', {data: {id: this.user.id, name: this.user.nickname}})
            },

            redirectTask: function (taskId) {
                this.$router.push({path: '/tasks/' + taskId})
            },

            redirectProject: function (projectId) {
                this.$router.push({path: '/projects/' + projectId})
            },

            filterProjectFee: function (value) {
                this.filterFee = value;
            },

            changeTrailOrigin: function (value) {
                this.trailInfo.resource = '';
                this.email = '';
                this.changeInfo.resource_type = value;
            },

            addTask: function () {
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }
                let data = {
                    resource_type: 3,
                    resourceable_id: this.projectId,
                    type: this.taskType,
                    title: this.taskName,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    priority: this.taskLevel,
                    start_at: this.startTime + ' ' + this.startMinutes,
                    end_at: this.endTime + ' ' + this.endMinutes,
                    desc: this.taskIntroduce
                };
                fetch('post', '/tasks', data).then(response => {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    this.projectTasksInfo.push(response.data);
                    this.getProjectTasking();
                })
            },

            getTaskType: function () {
                fetch('get', '/task_types').then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.taskTypeArr.push({
                            name: response.data[i].title,
                            value: response.data[i].id
                        })
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
            editBaseInfo: function () {
                this.isEdit = true;
                this.changeInfo = {};
                this.addInfoArr = {};
            },

            changeProjectBaseInfo: function (value, name) {
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

            changeProjectInfo: function () {
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

            cancelEdit: function () {
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

            changeTaskType: function (value) {
                this.taskType = value
            },

            principalChange: function (value) {

            },

            participantChange: function (value) {

            },

            changeTaskLevel: function (value) {
                this.taskLevel = value
            },

            changeStartTime: function (value) {
                this.startTime = value
            },

            changeStartMinutes: function (value) {
                this.startMinutes = value
            },

            changeEndMinutes: function (value) {
                this.endMinutes = value
            },

            changeEndTime: function (value) {
                this.endTime = value
            },

            doWithdrawal: function (value) {

            },

            addInfo: function (value, name) {
                if (this.projectInfo.fields.find(item => item.id == name).values.data.value == value) {
                    return
                }
                this.addInfoArr[name] = value
            },

            changeToastrText: function (status) {
                if (status === 2) {
                    this.changeProjectStatusText = '完成 " ' + this.projectInfo.title + ' " 项目吗？'
                } else if (status === 3) {
                    this.changeProjectStatusText = '撤单 " ' + this.projectInfo.title + ' " 项目吗？'
                } else if (status === 1) {
                    this.changeProjectStatusText = '激活 " ' + this.projectInfo.title + ' " 项目吗？'
                }
                this.projectChangeStatus = status
            },

            changeProjectStatus: function () {
                let _this = this;
                fetch('put', '/projects/' + this.projectId + '/status', {status: this.projectChangeStatus}).then(function () {
                    toastr.success('修改成功');
                    _this.projectInfo.status = _this.projectChangeStatus
                })
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

            addLinkageResource: function () {
                let _this = this;
                fetch('post', '/projects/' + this.projectId + '/relates', this.linkageSelectedIds).then(function () {
                    toastr.success('关联成功');
                    $('#addLinkage').modal('hide');
                    _this.getProject()
                })
            }

        }
    }
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
