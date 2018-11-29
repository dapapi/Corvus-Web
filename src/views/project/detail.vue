<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">项目详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="">关联</a>
                    <a class="dropdown-item" role="menuitem" @click="">完成</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#withdrawal">撤单</a>
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
                                <i class="md-plus pr-2" aria-hidden="true"></i>负责人
                            </div>
                            <div class="font-weight-bold float-left" v-if="projectInfo.principal">
                                {{ projectInfo.principal.data.name }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="md-plus pr-2" aria-hidden="true"></i>目标艺人
                            </div>
                            <div class="font-weight-bold float-left" v-if="projectInfo.expectations">
                                <template v-for="artist in projectInfo.expectations.data">
                                    {{ artist.name }}
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="md-plus pr-2" aria-hidden="true"></i>组别
                            </div>
                            <div class="font-weight-bold float-left">
                                {{ projectInfo.principal.data.name }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-3">
                                <i class="md-plus pr-2" aria-hidden="true"></i>项目状态
                            </div>
                            <div class="font-weight-bold float-left">
                                <template v-if="projectInfo.status === 1">进行中</template>
                                <template v-if="projectInfo.status === 2">完成</template>
                                <template v-if="projectInfo.status === 3">终止</template>
                                <template v-if="projectInfo.status === 4">删除</template>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-md-12 panel">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" :class="projectInfo.type != 5 ? '' : 'active'" data-toggle="tab"
                               href="#forum-project-follow"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">项目跟进</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjectTasks">
                            <a class="nav-link" data-toggle="tab" href="#forum-project-tasks"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">任务</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-project-contract"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">合同</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-project-bill"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">账单</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-project-payback"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">回款</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" :class="projectInfo.type == 5 ? '' : 'active'" data-toggle="tab"
                               href="#forum-project-base"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">概况</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate bg-white">
                        <div class="tab-pane animation-fade" v-if="projectInfo.type != 5"
                             id="forum-project-follow" role="tabpanel">
                            <div class="clearfix py-20">
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="evaluation" name="remember">
                                    <label for="evaluation">评估中</label>
                                </div>
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="evaluationCompleted" name="remember">
                                    <label for="evaluationCompleted">评估完成</label>
                                </div>
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="sign" name="remember">
                                    <label for="sign">签约中</label>
                                </div>
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="signCompleted" name="remember">
                                    <label for="signCompleted">签约完成</label>
                                </div>
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="carry" name="remember">
                                    <label for="carry">执行中</label>
                                </div>
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="carryCompleted" name="remember">
                                    <label for="carryCompleted">执行完成</label>
                                </div>
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="payback" name="remember">
                                    <label for="payback">回款中</label>
                                </div>
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="paybackComplated" name="remember">
                                    <label for="paybackComplated">回款完成</label>
                                </div>
                            </div>
                            <div class="clearfix pb-20">
                                <div class="float-left col-md-3 px-0">
                                    <div class="text-center py-10">2016-09-23 12:00</div>
                                    <div class="project-time-item">
                                        <div class="project-time-line"></div>
                                        <div class="project-time-circle"></div>
                                    </div>
                                    <div class="text-center py-10">张测试 评估中</div>
                                </div>
                                <div class="float-left col-md-3 px-0">
                                    <div class="text-center py-10">2016-09-23 12:00</div>
                                    <div class="project-time-item">
                                        <div class="project-time-line"></div>
                                        <div class="project-time-circle"></div>
                                    </div>
                                    <div class="text-center py-10">张测试 评估完成</div>
                                </div>
                                <div class="float-left col-md-3 px-0">
                                    <div class="text-center py-10">2016-09-23 12:00</div>
                                    <div class="project-time-item">
                                        <div class="project-time-line"></div>
                                        <div class="project-time-circle"></div>
                                    </div>
                                    <div class="text-center py-10">张测试 评估中</div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-project-tasks"
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
                                <tr v-for="task in projectTasksInfo">
                                    <td class="pointer-content" @click="redirectTask(task.id)">{{ task.title }}</td>
                                    <td>{{ task.type }}</td>
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
                                    <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                                    <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
                                </button>
                            </div>

                        </div>
                        <div class="tab-pane animation-fade py-10" v-if="projectInfo.type != 5"
                             id="forum-project-contract"
                             role="tabpanel">
                            <ul class="nav nav-tabs nav-tabs-line" role="tablist" style="border-bottom: 0">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active" data-toggle="tab" href="#forum-item-contract"
                                       aria-controls="forum-base"
                                       aria-expanded="true" role="tab">bigger研究所</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" data-toggle="tab" href="#forum-item-contract"
                                       aria-controls="forum-base"
                                       aria-expanded="true" role="tab">papi酱</a>
                                </li>
                            </ul>
                            <div class="tab-pane animation-fade"
                                 id="forum-item-contract">
                                <table class="table table-hover example"
                                       data-child="tr">
                                    <tr>
                                        <th class="cell-300" scope="col">合同编号</th>
                                        <th class="cell-300" scope="col">项目名称</th>
                                        <th class="cell-300" scope="col">公司</th>
                                        <th class="cell-300" scope="col">审批状态</th>
                                        <th class="cell-300" scope="col">艺人</th>
                                    </tr>
                                    <tbody>
                                    <tr>
                                        <td>#12312sdf231</td>
                                        <td>测试合同</td>
                                        <td>泰洋川禾</td>
                                        <td>审批中</td>
                                        <td>papi</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="tab-pane animation-fade py-10" v-if="projectInfo.type != 5" id="forum-project-bill"
                             role="tabpanel">
                            <div class="clearfix">
                                <ul class="nav nav-tabs nav-tabs-line float-left" role="tablist"
                                    style="border-bottom: 0">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" data-toggle="tab" href="#forum-item-bill"
                                           aria-controls="forum-base"
                                           aria-expanded="true" role="tab">bigger研究所</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" data-toggle="tab" href="#forum-item-bill"
                                           aria-controls="forum-base"
                                           aria-expanded="true" role="tab">papi酱</a>
                                    </li>
                                </ul>
                                <div class="float-right" style="padding: .715rem 1.429rem">
                                    <div class="float-left pr-40">收款金额 <span class="money-color">10000</span></div>
                                    <div class="float-left">付款金额 <span class="money-color">10000</span></div>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade"
                                 id="forum-item-bill">
                                <table class="table table-hover example"
                                       data-child="tr">
                                    <tr>
                                        <th class="cell-300" scope="col">科目类别</th>
                                        <th class="cell-300" scope="col">金额</th>
                                        <th class="cell-300" scope="col">收款时间</th>
                                        <th class="cell-300" scope="col">付款时间</th>
                                        <th class="cell-300" scope="col">操作人</th>
                                    </tr>
                                    <tbody>
                                    <tr>
                                        <td>测试类别</td>
                                        <td>1233030</td>
                                        <td>2018-10-31</td>
                                        <td>2018-12-20</td>
                                        <td>陈晓禹</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade pt-10 pb-20" v-if="projectInfo.type != 5"
                             id="forum-project-payback" role="tabpanel">
                            <div class="clearfix">
                                <ul class="nav nav-tabs nav-tabs-line float-left" role="tablist"
                                    style="border-bottom: 0">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" data-toggle="tab" href="#forum-item-bill"
                                           aria-controls="forum-base"
                                           aria-expanded="true" role="tab">bigger研究所</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" data-toggle="tab" href="#forum-item-bill"
                                           aria-controls="forum-base"
                                           aria-expanded="true" role="tab">papi酱</a>
                                    </li>
                                </ul>
                                <div class="float-right" style="padding: .715rem 1.429rem">
                                    <span class="pointer-content hover-content" data-toggle="modal"
                                          data-target="#addPaybackTime">
                                                <i class="icon md-plus pr-5"></i>新建回款期次</span>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade" id="forum-item-payback">
                                <div class="example">
                                    <div class="col-md-3 float-left pl-0">
                                        <div>合同金额<span class="money-color pl-5"> 1000000000000</span> /元</div>
                                    </div>
                                    <div class="col-md-3 float-left pl-0">
                                        <div>已回款<span class="money-color pl-5"> 1000000000000</span> /元</div>
                                    </div>
                                    <div class="col-md-3 float-left pl-0">
                                        <div>未回款<span class="money-color pl-5"> 1000000000000</span> /元</div>
                                    </div>
                                    <div class="col-md-3 float-left pl-0">
                                        <div>已开票<span class="money-color pl-5"> 1000000000000</span> /元</div>
                                    </div>
                                </div>
                                <div class="dividing-line"></div>
                                <div>
                                    <div class="clearfix py-20">
                                        <div class="float-left font-weight-bold">第一期</div>
                                        <div class="float-right">
                                            <span class="mr-40 pointer-content hover-content" data-toggle="modal"
                                                  data-target="#addPayback">
                                                <i class="icon md-plus pr-5"></i>回款记录</span>
                                            <span class="pointer-content hover-content" data-toggle="modal"
                                                  data-target="#addInvoice">
                                                <i class="icon md-plus pr-5"></i>开票记录</span>
                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class="col-md-2 float-left pl-0">回款日期<span class="pl-5">2018-09-28</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">计划回款<span class="money-color pl-5">23492394元</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">实际回款<span class="money-color pl-5">22312031203元</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">开票金额<span class="money-color pl-5">12312222元</span>
                                        </div>
                                        <div class="col-md-2 float-right pr-0 text-right" style="color: #cccccc;">
                                            <i class="icon md-eye pr-40 pointer-content"></i>
                                            <i class="icon md-edit pr-40 pointer-content"></i>
                                            <i class="icon md-delete pointer-content"></i>
                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>

                                    <div>
                                        <div class="font-weight-bold">回款记录</div>
                                        <div class="clearfix">
                                            <div class="col-md-2 float-left pl-0">计划回款<span class="money-color pl-5">23492394元</span>
                                            </div>
                                            <div class="col-md-2 float-left pl-0">回款日期<span
                                                    class="pl-5">2018-12-30</span>
                                            </div>
                                            <div class="col-md-2 float-left pl-0">付款方式<span
                                                    class="pl-5">现金</span>
                                            </div>
                                            <div class="col-md-2 float-right pr-0 text-right" style="color: #cccccc;">
                                                <i class="icon md-eye pr-40 pointer-content"></i>
                                                <i class="icon md-edit pr-40 pointer-content"></i>
                                                <i class="icon md-delete pointer-content"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>

                                    <div>
                                        <div class="font-weight-bold">开票记录</div>
                                        <div class="clearfix">
                                            <div class="col-md-2 float-left pl-0">开票日期<span
                                                    class="pl-5">2018-12-30</span>
                                            </div>
                                            <div class="col-md-2 float-left pl-0">计划回款<span class="money-color pl-5">23492394元</span>
                                            </div>
                                            <div class="col-md-2 float-left pl-0">票据类型<span class="pl-5">增值税普通发票</span>
                                            </div>
                                            <div class="col-md-2 float-right pr-0 text-right" style="color: #cccccc;">
                                                <i class="icon md-eye pr-40 pointer-content"></i>
                                                <i class="icon md-edit pr-40 pointer-content"></i>
                                                <i class="icon md-delete pointer-content"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="dividing-line example"></div>

                                </div>
                                <div>
                                    <div class="clearfix py-20">
                                        <div class="float-left font-weight-bold">第二期</div>
                                        <div class="float-right">
                                            <span class="mr-40 pointer-content hover-content" data-toggle="modal"
                                                  data-target="#addPayback">
                                                <i class="icon md-plus pr-5"></i>回款记录</span>
                                            <span class="pointer-content hover-content" data-toggle="modal"
                                                  data-target="#addInvoice">
                                                <i class="icon md-plus pr-5"></i>开票记录</span>
                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class="col-md-2 float-left pl-0">回款日期<span class="pl-5">2018-09-28</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">计划回款<span class="money-color pl-5">23492394元</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">实际回款<span class="money-color pl-5">22312031203元</span>
                                        </div>
                                        <div class="col-md-2 float-left pl-0">开票金额<span class="money-color pl-5">12312222元</span>
                                        </div>
                                        <div class="col-md-2 float-right pr-0 text-right" style="color: #cccccc;">
                                            <i class="icon md-eye pr-40 pointer-content"></i>
                                            <i class="icon md-edit pr-40 pointer-content"></i>
                                            <i class="icon md-delete pointer-content"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade" :class="projectInfo.type == 5 ? '' : 'active'"
                             id="forum-project-base"
                             role="tabpanel">
                            <div class="card">
                                <div class="card-header card-header-transparent card-header-bordered">
                                    <div class="float-left font-weight-bold third-title">项目信息</div>
                                    <div class="float-right">
                                        <i class="icon md-edit pointer-content" aria-hidden="true"
                                           @click="editBaseInfo"></i>
                                    </div>
                                    <div class="float-right mr-40" v-show="isEdit">
                                        <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                                        <button class="btn btn-primary" @click="changeProjectBaseInfo">确定</button>
                                    </div>
                                </div>
                                <div class="card-block">
                                    <div class="clearfix">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">项目名称</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :is-edit="isEdit" :content="projectInfo.title"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">负责人</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInputSelector :is-edit="isEdit"></EditInputSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">可见范围</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :content="projectInfo.privacy"
                                                              :options="visibleRangeArr"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">优先级</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :options="levelArr"
                                                              :content="projectInfo.priority"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">开始时间</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditDatepicker :is-edit="isEdit"
                                                                :content="projectInfo.start_at"></EditDatepicker>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">截止时间</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditDatepicker :is-edit="isEdit"
                                                                :content="projectInfo.end_at"></EditDatepicker>
                                            </div>
                                        </div>
                                        <div v-if="projectInfo.fields">
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                                 :class="isEdit ? 'edit-height':'' "
                                                 v-for="field in projectInfo.fields.data">
                                                <div class="col-md-2 float-left text-right pl-0">{{ field.field.key }}
                                                </div>
                                                <div class="col-md-10 float-left font-weight-bold">
                                                    <template v-if="field.field.field_type === 1">
                                                        <EditInput :content="field.value" :is-edit="isEdit"
                                                                   @change="(value) => addInfo(value, field.id )"></EditInput>
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 2">
                                                        <EditSelector :content="field.value" :is-edit="isEdit"
                                                                      :options="field.field.contentArr"
                                                                      @change="(value) => addInfo(value, field.id )"></EditSelector>
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 3">
                                                        <EditableSearchBox :options="starsArr" :multiple="true"
                                                                           @change="(value) => addInfo(value, field.id )"></EditableSearchBox>
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 4">
                                                        <EditDatepicker :content="field.value"
                                                                        @change="(value) => addInfo(value, field.id )"></EditDatepicker>
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 5">
                                                        <EditTextarea :content="field.value"
                                                                      @change="(value) => addInfo(value, field.id )"></EditTextarea>
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 6">
                                                        <!--<EditSelector :content="field.value" :multiple="true"-->
                                                        <!--@change="(value) => addInfo(value.join('|'), field.id )"></EditSelector>-->
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 8">
                                                        <EditGroupDatePicker :content="field.value" :is-edit="isEdit"
                                                                             @change="(from, to) => addInfo(from + '|' + to, field.id )">

                                                        </EditGroupDatePicker>
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 10">
                                                        <EditInputSelector
                                                                @change="(value) => addInfo(value, field.id )"></EditInputSelector>
                                                    </template>
                                                    <template v-else-if="field.field.field_type === 11">
                                                        <EditNumberSpinner :content="field.value"
                                                                           @change="(value) => addInfo(value, field.id )"></EditNumberSpinner>
                                                    </template>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left"
                                             :class="isEdit ? 'edit-height':'' ">
                                            <div class="col-md-2 float-left text-right pl-0">备注</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditTextarea :is-edit="isEdit"
                                                              :content="projectInfo.desc"></EditTextarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>

                                    <!--<div class="card-text py-5 clearfix">-->
                                    <!--<div class="col-md-1 float-left text-right pl-0">录入人</div>-->
                                    <!--<div class="col-md-5 float-left font-weight-bold">-->
                                    <!--<EditSelector></EditSelector>-->
                                    <!--</div>-->
                                    <!--<div class="col-md-1 float-left text-right pl-0">录入时间</div>-->
                                    <!--<div class="col-md-5 float-left font-weight-bold">-->
                                    <!--<EditInput></EditInput>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="card-text py-5 clearfix">-->
                                    <!--<div class="col-md-1 float-left text-right pl-0">最近更新人</div>-->
                                    <!--<div class="col-md-5 float-left font-weight-bold">-->
                                    <!--<EditSelector></EditSelector>-->
                                    <!--</div>-->
                                    <!--<div class="col-md-1 float-left text-right pl-0">最近更新时间</div>-->
                                    <!--<div class="col-md-5 float-left font-weight-bold">-->
                                    <!--<EditInput></EditInput>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="card-text py-5 clearfix">-->
                                    <!--<div class="col-md-1 float-left text-right pl-0">关联项目</div>-->
                                    <!--<div class="col-md-5 float-left font-weight-bold">-->
                                    <!--</div>-->
                                    <!--<div class="col-md-1 float-left text-right pl-0">关联任务</div>-->
                                    <!--<div class="col-md-5 float-left font-weight-bold">-->
                                    <!--</div>-->
                                    <!--</div>-->
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
                            <h5>项目跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <TaskFollowUp :follow-type="'项目'"></TaskFollowUp>
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
                            <div class="col-md-10 float-left pl-0">
                                项目 - {{ projectInfo.title }}
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

        <div class="modal fade" id="addPrivacy" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">隐私设置</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">预计费用</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">收款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">付款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">合约费用(含税)</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">税</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">账单</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">回款</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
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

        <div class="modal fade" id="withdrawal" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
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

        <div class="modal fade" id="addPaybackTime" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新建回款期次</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-if="companyArr.length > 0">
                            <div class="col-md-2 text-right float-left">关联公司</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="companyArr"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联项目</div>
                            <div class="col-md-10 float-left">
                                <Selectors></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors></InputSelectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">期次名称</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">计划回款金额</div>
                            <div class="col-md-10 float-left">
                                <NumberSpinner></NumberSpinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">计划回款日期</div>
                            <div class="col-md-10 float-left">
                                <Datepicker></Datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left">
                                <textarea title="" class="form-control" placeholder="请输入备注"></textarea>
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

        <div class="modal fade" id="addPayback" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新建回款记录</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-if="companyArr.length > 0">
                            <div class="col-md-2 text-right float-left">关联公司</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="companyArr"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联项目</div>
                            <div class="col-md-10 float-left">
                                <Selectors></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors></InputSelectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">回款期次</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">回款金额</div>
                            <div class="col-md-10 float-left">
                                <NumberSpinner></NumberSpinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">回款日期</div>
                            <div class="col-md-10 float-left">
                                <Datepicker></Datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">付款方式</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="payMethodsArr"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left">
                                <textarea title="" class="form-control" placeholder="请输入备注"></textarea>
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

        <div class="modal fade" id="addInvoice" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新建开票记录</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-if="companyArr.length > 0">
                            <div class="col-md-2 text-right float-left">关联公司</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="companyArr"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联项目</div>
                            <div class="col-md-10 float-left">
                                <Selectors></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors></InputSelectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">回款期次</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开票金额</div>
                            <div class="col-md-10 float-left">
                                <NumberSpinner></NumberSpinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开票日期</div>
                            <div class="col-md-10 float-left">
                                <Datepicker></Datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">票据类型</div>
                            <div class="col-md-10 float-left">
                                <Selectors :options="invoiceTypeArr"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left">
                                <textarea title="" class="form-control" placeholder="请输入备注"></textarea>
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

    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        data: function () {
            return {
                taskId: '',
                changeInfo: {},
                isEdit: false,
                projectInfo: '',
                trailInfo: {},
                taskTypeArr: config.taskTypeArr,
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
                payMethodsArr: config.payMethodsArr,
                invoiceTypeArr: config.invoiceTypeArr,
                visibleRangeArr: config.visibleRangeArr,
                levelArr: config.levelArr,
                addInfoArr: [],

            }
        },

        mounted() {
            this.getProject();
            this.getClients();
        },

        watch: {},

        methods: {

            getProject: function () {
                this.projectId = this.$route.params.id;
                let _this = this;
                let data = {
                    include: 'principal,creator,fields,expectations',
                };
                fetch('get', '/projects/' + this.projectId, data).then(function (response) {
                    for (let i = 0; i < response.data.fields.length; i++) {
                        if (response.data.fields[i].field.field_type === 2 || response.data.fields[i].field.field_type === 6) {
                            response.data.fields[i].field.contentArr = response.data.fields[i].field.content.split('|')
                        }
                    }
                    _this.projectInfo = response.data
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
                let _this = this;
                fetch('get', '/projects/' + this.projectId + '/tasks').then(function (response) {
                    _this.projectTasksInfo = response.data
                })
            },

            redirectTask: function (taskId) {
                this.$router.push({path: '/tasks/' + taskId})
            },

            addTask: function () {
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }
                let _this = this;
                let data = {
                    // resource_type: '1718463094',
                    // resourceable_id: '1994731356',
                    // type: app.taskType,
                    // @todo 任务类型前端维护
                    title: app.taskName,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    priority: app.taskLevel,
                    start_at: app.startTime + ' ' + app.startMinutes,
                    end_at: app.endTime + ' ' + app.endMinutes,
                    desc: app.taskIntroduce
                };
                fetch('post', '/tasks', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    _this.projectTasksInfo.push(response.data)
                })
            },

            addPrivacy: function () {

            },

            editBaseInfo: function () {
                this.isEdit = true;
                this.changeInfo = {};
            },

            changeProjectBaseInfo: function () {

            },

            cancelEdit: function () {
                this.isEdit = false;
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

    .money-color {
        color: #ff9800;
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

</style>
