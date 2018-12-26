<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">项目详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right"
                 v-if="projectInfo.approval_status == 1">
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
                </div>
            </div>

        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block" v-if="projectInfo.title">
                    <h4 class="card-title">{{ projectInfo.title }}</h4>

                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>负责人
                            </div>
                            <div class="font-weight-bold float-left" v-if="projectInfo.principal">
                                {{ projectInfo.principal.data.name }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0" v-if="projectInfo.type != 5">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>目标艺人
                            </div>
                            <div class="font-weight-bold float-left" v-if="projectInfo.trail.data.expectations">
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
                                <template v-if="projectInfo.status === 1"><span style="color:#FF9800">进行中</span>
                                </template>
                                <template v-if="projectInfo.status === 2"><span style="color:#4CAF50">已完成</span>
                                </template>
                                <template v-if="projectInfo.status === 3"><span style="color:#9E9E9E">撤单</span>
                                </template>

                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="col-md-6 float-left pl-0 mb-20" style="border-right: 1px solid #eee">
                            <div class="col-md-6 pl-0"><i class="iconfont icon-iconset0399"></i> 任务 5/12</div>
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
                            <div class="clearfix example">
                                <div class="col-md-3 float-left">电话会议</div>
                                <div class="col-md-3 float-left">张佳佳</div>
                                <div class="col-md-3 float-left">2018-12-03 11:10</div>
                                <div class="col-md-3 float-left">进行中</div>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0 mb-20">
                            <div class="mb-20 float-left clearfix col-md-6">
                                <div class="float-left col-md-5 pr-0">预计订单收入</div>
                                <div class="float-left col-md-7">100000元</div>
                            </div>
                            <div class="mb-20 float-left clearfix col-md-6">
                                <div class="float-left col-md-5 pr-0">预计支出</div>
                                <div class="float-left col-md-7">10000元</div>
                            </div>
                            <div class="mb-20 float-left clearfix col-md-6">
                                <div class="float-left col-md-5 pr-0">实际收入</div>
                                <div class="float-left col-md-7">100000元</div>
                            </div>
                            <div class="mb-20 float-left clearfix col-md-6">
                                <div class="float-left col-md-5 pr-0">实际支出</div>
                                <div class="float-left col-md-7">10000元</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-md-12 panel" v-if="projectInfo.title">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation"
                            v-if="projectInfo.type != 5 && projectInfo.approval_status == 1">
                            <a class="nav-link" :class="projectInfo.type != 5 ? 'active' : ''" data-toggle="tab"
                               href="#forum-project-follow"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">项目进度</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjectTasks"
                            v-if="projectInfo.approval_status == 1">
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
                            v-if="projectInfo.type != 5 && projectInfo.approval_status == 1">
                            <a class="nav-link" data-toggle="tab" href="#forum-project-contract"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">合同</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjectBill"
                            v-if="projectInfo.type != 5 && projectInfo.approval_status == 1">
                            <a class="nav-link" data-toggle="tab" href="#forum-project-bill"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">账单</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjectReturned"
                            v-if="projectInfo.type != 5 && projectInfo.approval_status == 1">
                            <a class="nav-link" data-toggle="tab" href="#forum-project-payback"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">回款</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link"
                               :class="(projectInfo.type == 5 || projectInfo.approval_status != 1) ? 'active' : ''"
                               data-toggle="tab"
                               href="#forum-project-base"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">概况</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate bg-white">
                        <!-- 项目进度 -->
                        <div class="tab-pane animation-fade pb-10"
                             v-if="projectInfo.type != 5 && projectInfo.approval_status == 1"
                             :class="projectInfo.type != 5 ? 'active' : ''"
                             id="forum-project-follow" role="tabpanel">
                            <div class="clearfix mt-20">
                                <div class="project-progress" v-for="item in projectProgressInfo">
                                    <div class="clearfix pointer-content">
                                        <div class="col-md-4 p-0 float-left">
                                            <div class="image-wraper">
                                                <template v-if="item.isFinish == 1">
                                                    <img src="https://res-crm.papitube.com/progress-selected.png"
                                                         alt="">
                                                </template>
                                                <template v-else>
                                                    <img src="https://res-crm.papitube.com/progress.png" alt="">
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col-md-8 float-left pr-0 pl-10"
                                             :class="item.isFinish == 1 ? 'finish-font-color' : ''"
                                             style=" line-height: 40px;">
                                            {{ item.name }}
                                        </div>
                                    </div>
                                    <div class="pt-20">
                                        <div class="points" :class="item.isFinish == 1 ? 'finish-color' : ''"></div>
                                        <div class="line"
                                             :class="item.isFinish == 1 ? 'finish-color' : 'unfinish-color'"></div>
                                    </div>
                                    <div class="pt-10" v-if="item.finisher">
                                        <div>张测试完成</div>
                                        <div>2018-09-19 10:10</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 任务 -->
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-project-tasks"
                             role="tabpanel" v-if="projectInfo.approval_status == 1">
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
                                <tr v-for="task in projectTasksInfo">
                                    <td class="pointer-content" @click="redirectTask(task.id)">{{ task.title }}</td>
                                    <td>{{ task.type.data.title }}</td>
                                    <td>{{ task.status }}</td>
                                    <td>{{ task.principal.data.name }}</td>
                                    <td>{{ task.end_at }}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="projectTasksInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>

                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                 data-target="#addTask">
                                <button type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                                       style="font-size:30px"></i>
                                    <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                                       style="font-size:30px"></i>
                                </button>
                            </div>

                        </div>
                        <!-- 合同 -->
                        <div class="tab-pane animation-fade py-10"
                             v-if="projectInfo.type != 5 && projectInfo.approval_status == 1"
                             id="forum-project-contract"
                             role="tabpanel">
                            <table class="table table-hover example"
                                   data-child="tr">
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
                                <tr>
                                    <td>#12312sdf231</td>
                                    <td>测试合同</td>
                                    <td>papi、bigger</td>
                                    <td>收入</td>
                                    <td>陈晓禹</td>
                                    <td>2018-12-27</td>
                                    <td>审批中</td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                        <!-- 账单 -->
                        <div class="tab-pane animation-fade py-10"
                             v-if="projectInfo.type != 5 && projectInfo.approval_status == 1" id="forum-project-bill"
                             role="tabpanel">
                            <div class="clearfix">
                                <div class="float-left" style="padding: .715rem 1.429rem">
                                    <div class="float-left pr-40">合同金额 <span class="money-color">10000元</span></div>
                                    <div class="float-left pr-40">支出金额 <span class="money-color">1000元</span></div>
                                    <div class="float-left pr-40">税费 <span class="money-color">10000元</span></div>
                                    <div class="float-left pr-40">papi分成 <span class="money-color">10000元</span></div>
                                    <div class="float-left pr-40">bigger分成 <span class="money-color">10000元</span></div>
                                    <div class="float-left pr-40">我司分成 <span class="money-color">10000元</span></div>
                                </div>
                                <div class="float-right" style="padding: .715rem 0">
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
                            <div class="col-md-1" style="margin: 6rem auto" v-if="projectBillsInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                        <!-- 回款 -->
                        <div class="tab-pane animation-fade pt-10 pb-20"
                             v-if="projectInfo.type != 5 && projectInfo.approval_status == 1"
                             id="forum-project-payback" role="tabpanel">
                            <div class="clearfix">
                                <ul class="nav nav-tabs nav-tabs-line float-left" role="tablist"
                                    style="border-bottom: 0">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" data-toggle="tab" href="#forum-item-bill"
                                           aria-controls="forum-base"
                                           aria-expanded="true" role="tab">bigger研究所/papi酱</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" data-toggle="tab" href="#forum-item-bill"
                                           aria-controls="forum-base"
                                           aria-expanded="true" role="tab">周冬雨</a>
                                    </li>
                                </ul>
                                <div class="float-right" style="padding: .715rem 1.429rem">
                                    <span class="pointer-content hover-content" data-toggle="modal"
                                          data-target="#addPaybackTime" @click="editProjectPaybackTime(false)">
                                                <i class="iconfont icon-tianjia pr-5"></i>新建回款期次</span>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade" id="forum-item-payback">
                                <div class="example" v-if="projectReturnInfo.meta">
                                    <div class="col-md-3 float-left pl-0">
                                        <div>合同金额<span class="money-color pl-5">
                                            {{ projectReturnInfo.meta.contractReturnedMoney ? projectReturnInfo.meta.contractReturnedMoney : 0}}</span>/元
                                        </div>
                                    </div>
                                    <div class="col-md-3 float-left pl-0">
                                        <div>已回款<span class="money-color pl-5">
                                            {{ projectReturnInfo.meta.alreadyReturnedMoney ? projectReturnInfo.meta.alreadyReturnedMoney : 0}}</span>/元
                                        </div>
                                    </div>
                                    <div class="col-md-3 float-left pl-0">
                                        <div>未回款<span class="money-color pl-5">
                                            {{ projectReturnInfo.meta.notReturnedMoney ? projectReturnInfo.meta.notReturnedMoney : 0}}</span>/元
                                        </div>
                                    </div>
                                    <div class="col-md-3 float-left pl-0">
                                        <div>已开票<span class="money-color pl-5">
                                            {{ projectReturnInfo.meta.alreadyinvoice ? projectReturnInfo.meta.alreadyinvoice : 0}}</span>/元
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
                                                  data-target="#addInvoice" @click="selectedPaybackTime(returnMoney)">
                                                <i class="iconfont icon-tianjia pr-5"></i>开票记录</span>
                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class="col-md-2 float-left pl-0">回款日期<span class="pl-5">{{ returnMoney.plan_returned_time }}</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">计划回款
                                            <span class="money-color pl-5">
                                                {{ returnMoney.plan_returned_money }}元
                                            </span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">实际回款<span class="money-color pl-5">22312031203元</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">开票金额<span
                                                class="money-color pl-5">12312222元</span>
                                        </div>
                                        <div class="col-md-2 float-right pr-0 text-right" style="color: #cccccc;">
                                            <i class="iconfont icon-bianji2 pr-40 pointer-content" data-toggle="modal"
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
                                                <div class="col-md-2 float-left pl-0">回款日期<span
                                                        class="pl-5">{{ item.plan_returned_time }}</span>
                                                </div>
                                                <div class="col-md-2 float-left pl-0">回款金额<span
                                                        class="money-color pl-5">{{ item.plan_returned_money }}元</span>
                                                </div>
                                                <div class="col-md-2 float-left pl-0">付款方式<span
                                                        class="pl-5">{{ item.type.data.plan_returned_money }}</span>
                                                </div>
                                                <div class="col-md-2 float-right pr-0 text-right"
                                                     style="color: #cccccc;">
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
                                                <div class="col-md-2 float-left pl-0">开票日期<span
                                                        class="pl-5">{{ item.plan_returned_time }}</span>
                                                </div>
                                                <div class="col-md-2 float-left pl-0">开票金额<span
                                                        class="money-color pl-5">{{ item.plan_returned_money }}元</span>
                                                </div>
                                                <div class="col-md-2 float-left pl-0">票据类型<span class="pl-5">{{ item.type.data.plan_returned_money }}</span>
                                                </div>
                                                <div class="col-md-2 float-right pr-0 text-right"
                                                     style="color: #cccccc;">
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
                        <div class="tab-pane animation-fade"
                             :class="(projectInfo.type == 5 || projectInfo.approval_status != 1) ? 'active' : ''"
                             id="forum-project-base"
                             role="tabpanel">
                            <div class="card">
                                <div class="card-header card-header-transparent card-header-bordered">
                                    <div class="float-left font-weight-bold third-title">项目信息</div>
                                    <div class="float-right"
                                         v-show="!isEdit && projectInfo.approval_status == 1">
                                        <i class="iconfont icon-bianji2 pointer-content" aria-hidden="true"
                                           @click="editBaseInfo"></i>
                                    </div>
                                    <div class="float-right mr-40" v-show="isEdit">
                                        <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消
                                        </button>
                                        <button class="btn btn-primary" @click="changeProjectInfo">确定</button>
                                    </div>
                                </div>
                                <div class="card-block" v-if="projectInfo.title">
                                    <div class="clearfix">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">项目名称</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="projectInfo.title" :is-edit="isEdit"
                                                           @change="(value) => changeProjectBaseInfo(value, 'title')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">负责人</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInputSelector :is-edit="isEdit"
                                                                   @change="(value) => changeProjectBaseInfo(value, 'principal_id')"></EditInputSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">参与人</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditAddMember :is-edit="isEdit"
                                                               @change="(value) => changeProjectBaseInfo(value, 'participant_ids')"></EditAddMember>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height"
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
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height"
                                             v-if="projectInfo.type != 5">
                                            <div class="col-md-2 float-left text-right pl-0">目标艺人</div>
                                            <div class="col-md-10 float-left font-weight-bold"
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
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height"
                                             v-if="projectInfo.type == 5">
                                            <div class="col-md-2 float-left text-right pl-0">可见范围</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :content="projectInfo.privacy"
                                                              :options="visibleRangeArr"
                                                              @change="(value) => changeProjectBaseInfo(value, 'privacy')"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height"
                                             v-if="projectInfo.type != 5">
                                            <div class="col-md-2 float-left text-right pl-0">合同金额</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditNumberSpinner :is-edit="isEdit"
                                                                   :content="projectInfo.trail.data.fee"
                                                                   @change="(value) => changeProjectBaseInfo(value, 'fee')"></EditNumberSpinner>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">优先级</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :options="levelArr"
                                                              :content="projectInfo.priority"
                                                              @change="(value) => changeProjectBaseInfo(value, 'priority')"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">开始时间</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditDatepicker :is-edit="isEdit"
                                                                :content="projectInfo.start_at"
                                                                @change="(value) => changeProjectBaseInfo(value, 'start_at')"></EditDatepicker>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">截止时间</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditDatepicker :is-edit="isEdit"
                                                                :content="projectInfo.end_at"
                                                                @change="(value) => changeProjectBaseInfo(value, 'end_at')"></EditDatepicker>
                                            </div>
                                        </div>
                                        <div v-if="projectInfo.fields">
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height"
                                                 v-for="field in projectInfo.fields">
                                                <div class="col-md-2 float-left text-right pl-0">{{ field.key }}
                                                </div>
                                                <div class="col-md-10 float-left font-weight-bold">
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
                                                    <template v-else-if="field.field_type === 3">
                                                        <EditableSearchBox :options="starsArr" :multiple="true"
                                                                           :is-edit="isEdit"
                                                                           @change="(value) => addInfo(value, field.id )"></EditableSearchBox>
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
                                                                :content="field.values ? field.values.data.value.split('|') : ''"
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
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">备注</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditTextarea :is-edit="isEdit" :content="projectInfo.desc"
                                                              @change="(value) => changeProjectBaseInfo(value, 'desc')"></EditTextarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>

                                    <div class="card-text py-5 clearfix edit-height">
                                        <div class="col-md-1 float-left text-right pl-0">录入人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{ projectInfo.creator.data.name }}
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">录入时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{ projectInfo.created_at }}
                                        </div>
                                    </div>
                                    <div class="card-text py-5 clearfix edit-height">
                                        <div class="col-md-1 float-left text-right pl-0">最近更新人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{ projectInfo.last_follow_up_user }}
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">最近更新时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{ projectInfo.last_updated_at }}
                                        </div>
                                    </div>
                                    <div class="card-text py-5 clearfix edit-height">
                                        <div class="col-md-1 float-left text-right pl-0">关联项目</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            <template v-for="project in projectInfo.relate_projects.data">
                                                {{project.title }}
                                            </template>
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">关联任务</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            <template v-for="task in projectInfo.relate_tasks.data">
                                                {{ task.title }}
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="panel" v-if="projectId">
                <div class="col-md-12">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered">
                            <h5>项目跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <TaskFollowUp :follow-type="'项目'" :trailId="projectId"
                                              trailType="projects"></TaskFollowUp>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新建任务 -->
        <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
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
                                <selectors :options="taskTypeArr" ref="projectTaskType" placeholder="请选择任务类型"
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
                                <selectors :options="taskLevelArr" @change="changeTaskLevel"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="startMinutes" @change="changeStartMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="endMinutes" @change="changeEndMinutes"></timepicker>
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
             role="dialog" tabindex="-1">
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
                            <div class="col-md-2 text-right float-left">合同金额</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'contract'"></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">收款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'collect'"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">付款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'pay'"></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">税</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'incubation'"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">账单</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'bill'"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">回款</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'division'"></add-member>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addPrivacy">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 撤单原因 -->
        <div class="modal fade" id="withdrawal" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
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
             role="dialog" tabindex="-1">
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
                                {{ projectInfo.creator.data.name }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left px-0">期次名称</div>
                            <div class="col-md-10 float-left">
                                <template v-if="!isEditProjectPayback">第{{ paybackLength }}期</template>
                                <template v-else>{{ projectReturnName }}</template>
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
             role="dialog" tabindex="-1">
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
                                {{ projectInfo.creator.data.name }}
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
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple" v-if="projectInfo.title">
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
                                {{ projectInfo.creator.data.name }}
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
             role="dialog" tabindex="-1">
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
             role="dialog" tabindex="-1">
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
    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        data: function () {
            return {
                projectId: '',
                changeInfo: {},
                isEdit: false,
                projectInfo: '',
                trailInfo: {},
                taskTypeArr: [],
                taskLevelArr: config.taskLevelArr,
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
                        name: '评估中',
                        isFinish: 1,
                        finisher: {
                            data: {
                                name: '张测试'
                            }
                        },
                        finish_at: '2018-10-09 10:10'
                    },
                    {
                        name: '评估完成',
                        isFinish: 1,
                        finisher: {
                            data: {
                                name: '张测试'
                            }
                        },
                        finish_at: '2018-10-10 22:10'
                    },
                    {
                        name: '签约中',
                        isFinish: 0,
                    },
                    {
                        name: '签约完成',
                        isFinish: 0,
                    },
                    {
                        name: '执行中',
                        isFinish: 0,
                    },
                    {
                        name: '执行完成',
                        isFinish: 0,
                    },
                    {
                        name: '回款中',
                        isFinish: 0,
                    },
                    {
                        name: '回款完成',
                        isFinish: 0,
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
                paybackLength: 0,
            }
        },

        mounted() {
            this.getProject();
            this.getClients();
            this.getTaskType();
            this.getStars();
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
        },

        watch: {
            projectReturnDesc: function (newValue) {
                this.addProjectReturn(newValue, 'desc')
            },
        },
        computed: {
            completeNum() {
                return this.projectTasksInfo.filter(n => n.status === 2).length
            }
        },

        methods: {

            getProject: function () {
                this.projectId = this.$route.params.id;
                let _this = this;
                let data = {
                    include: 'principal,participants,creator,fields,trail.expectations,trail.client,relate_tasks,relate_projects,type',
                };
                fetch('get', '/projects/' + this.projectId, data).then(function (response) {
                    let fieldsArr = response.meta.fields.data;
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
                    _this.projectInfo = response.data;
                    _this.projectInfo.approval_status = 1;
                    let params = {
                        type: 'change',
                    };
                    params.data = response.data.principal.data;
                    _this.$store.dispatch('changePrincipal', params);
                    if (response.data.participants) {
                        for (let i = 0; i < response.data.participants.data.length; i++) {
                            _this.flagParticipantsIdArr.push(response.data.participants.data[i].id)
                        }
                        params.data = JSON.parse(JSON.stringify(response.data.participants.data));
                        _this.$store.dispatch('changeParticipantsInfo', params);
                    }

                    for (let i = 0; i < response.data.relate_tasks.data.length; i++) {
                        _this.linkageSelectedIds.tasks.push(response.data.relate_tasks.data[i].id)
                    }
                    for (let i = 0; i < response.data.relate_projects.data.length; i++) {
                        _this.linkageSelectedIds.projects.push(response.data.relate_projects.data[i].id)
                    }
                    if (response.data.trail) {
                        for (let i = 0; i < response.data.trail.data.expectations.data.length; i++) {
                            _this.selectedExpectationsArr.push(response.data.trail.data.expectations.data[i].id)
                        }
                    }

                })
            },

            getStars: function () {
                let _this = this;
                fetch('get', '/stars/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.starsArr.push({
                            name: response.data[i].name,
                            id: response.data[i].id,
                            value: response.data[i].id
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
                    this.projectTasksInfo = response.data
                })
            },

            getProjectBill: function () {
                if (this.projectBillsInfo.length > 0) {
                    return;
                }
                fetch('get', '/projects/' + this.projectId + '/bill').then(response => {
                    this.projectBillsInfo = response.data
                });

                // fetch('get', '/projects/' + this.projectId + '/store/bill').then(response => {
                //     console.log(response)
                // })
            },

            addProjectBill: function () {
                let data = {
                    expenses: '',
                };
                fetch('post', '/projects/' + this.projectId + '/store/bill', data).then(response => {

                })
            },

            getProjectReturned: function () {
                let data = {
                    include: 'money.type'
                };
                fetch('get', '/projects/' + this.projectId + '/returned/money', data).then(response => {
                    this.projectReturnInfo = response;
                    this.paybackLength = response.data.length + 1
                });

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

            addProjectReturn: function (value, name) {
                if (name === 'principal_id') {
                    value = this.$store.state.newPrincipalInfo.id
                }
                this.projectReturnData[name] = value
            },

            addProjectPayback: function () {
                // todo 合同id没有做修改，需要等合同确定才可以
                this.projectReturnData.contract_id = 22;
                this.projectReturnData.principal_id = this.projectInfo.creator.data.id;
                this.projectReturnData.issue_name = this.paybackLength;
                fetch('post', '/projects/' + this.projectId + '/returned/money', this.projectReturnData).then(response => {
                    $('#addPaybackTime').modal('hide');
                    toastr.success('添加成功');
                    this.getProjectReturned()
                })
            },

            editProjectPayback: function () {
                fetch('put', '/returned/money/' + this.projectReturnId, this.projectReturnData).then(response => {
                    $('#addPaybackTime').modal('hide');
                    $('#addPayback').modal('hide');
                    $('#addInvoice').modal('hide');
                    toastr.success('修改成功');
                    this.getProjectReturned()
                })
            },

            delProjectPayback: function (paybackId) {
                this.delPaybackId = paybackId
            },

            delProjectPaybackCallback: function () {
                fetch('delete', '/returned/money/' + this.delPaybackId).then(response => {
                    toastr.success('删除成功');
                    this.getProjectReturned()
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
                this.projectReturnData.contract_id = 22;
                this.projectReturnData.principal_id = this.projectInfo.creator.data.id;
                fetch('post', '/projects/' + this.projectId + '/returned/' + this.paybackTime.id + '/money', this.projectReturnData).then(response => {
                    $('#addPayback').modal('hide');
                    $('#addInvoice').modal('hide');
                    toastr.success('添加成功');
                    this.getProjectReturned()
                })
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

            redirectTask: function (taskId) {
                this.$router.push({path: '/tasks/' + taskId})
            },

            filterProjectFee: function (value) {
                this.filterFee = value;
            },

            changeTrailOrigin: function (value) {
                // this.$store.state.newPrincipalInfo = this.trailInfo.resource;
                this.trailInfo.resource = '';
                this.email = '';
                this.trailOriginPerson = '';
                this.changeInfo.resource_type = value;
                this.trailOrigin = value
            },

            addTask: function () {
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }
                let _this = this;
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
                fetch('post', '/tasks', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    _this.projectTasksInfo.push(response.data)
                })
            },

            getTaskType: function () {
                let _this = this;
                fetch('get', '/task_types').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.taskTypeArr.push({
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

            addPrivacy: function () {

                $('#addPrivacy').modal('hide')
                this.$store.state.collectInfo = []
                this.$store.state.payInfo = []
                this.$store.state.contractInfo = []
                this.$store.state.divisionInfo = []
                this.$store.state.incubationInfo = []
                this.$store.state.billInfo = []
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
                    case 'expectations':
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
                        if (this.changeInfo.trail) {
                            this.changeInfo.trail.resource = value
                        } else {
                            this.changeInfo['trail'] = {
                                id: this.projectInfo.trail.data.id,
                                resource: value
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
                if (JSON.stringify(this.addInfoArr) !== "{}") {
                    data.fields = this.addInfoArr;
                }
                let _this = this;
                let flagInfo = this.projectInfo.participants;
                data.participant_del_ids = [];
                if (data.participant_ids && flagInfo) {
                    for (let j = 0; j < flagInfo.data.length; j++) {
                        if (data.participant_ids.map(item => item.id).indexOf(flagInfo.data[j].id) === -1) {
                            data.participant_del_ids.push(flagInfo.data[j].id)
                        }
                    }
                } else if (flagInfo && !data.participant_ids) {
                    let participantsInfo = this.$store.state.participantsInfo;
                    for (let i = 0; i < flagInfo.data.length; i++) {
                        if (participantsInfo.map(item => item.id).indexOf(flagInfo.data[i].id) === -1) {
                            data.participant_del_ids.push(flagInfo.data[i].id)
                        }
                    }
                }

                fetch('put', '/projects/' + this.projectId, data).then(function () {
                    toastr.success('修改成功');
                    _this.isEdit = false;
                    _this.getProject()
                })
            },

            cancelEdit: function () {
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
        width: 40px;
        height: 40px;
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

</style>
