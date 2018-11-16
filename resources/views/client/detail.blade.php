@extends('layouts.master')

@section('title','客户')

@section('body-class','dashboard')


@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">客户</h1>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12 col-lg-12">
                <div class="card-block">
                    <h4 class="card-title">@{{ clientInfo.company }}</h4>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left clearfix">
                            <div class="float-left pl-0 pr-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>负责人
                            </div>
                            <div class="font-weight-bold float-left" v-if="clientInfo.principal">
                                @{{ clientInfo.principal.data.name }}
                            </div>
                        </div>
                        <div class="col-md-6 float-left clearfix"></div>

                        <div class="float-left pl-0 pr-2">
                            <i class="md-plus pr-2" aria-hidden="true"></i>决策关键人/部门
                        </div>
                        <div class="font-weight-bold float-left">
                            @{{ clientInfo.keyman }}
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left"></div>
                        <div class="col-md-6 float-left"></div>
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
                        <table class="table is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="pre-cell"></th>
                                <th class="cell-300" scope="col">线索务名称</th>
                                <th class="cell-300" scope="col">销售进展</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">关联公司</th>
                                <th class="cell-300" scope="col">录入日期</th>
                                <th class="suf-cell"></th>
                            </tr>
                            <tr v-for="trail in clientTrailsInfo">
                                <td class="pre-cell"></td>
                                <td>@{{ trail.title }}</td>
                                <td>
                                    <template v-if="trail.progress_status === 1">未确定合作</template>
                                    <template v-if="trail.progress_status === 2">已确定合作</template>
                                    <template v-if="trail.progress_status === 0">已拒绝</template>
                                </td>
                                <td>@{{ trail.principal.data.name }}</td>
                                <td>@{{ trail.client.data.company }}</td>
                                <td>@{{ trail.end_at }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="tab-pane animation-fade pb-20" id="forum-project" role="tabpanel">
                        <table class="table is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="pre-cell"></th>
                                <th class="cell-300" scope="col">项目名称</th>
                                <th class="cell-300" scope="col">项目状态</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">关联公司</th>
                                <th class="cell-300" scope="col">录入日期</th>
                                <th class="suf-cell"></th>
                            </tr>
                            {{--<tr v-for="task in taskInfo.tasks.data">--}}
                            {{--<td class="pre-cell"></td>--}}
                            {{--<td>@{{ task.title }}</td>--}}
                            {{--<td>@{{ task.type }}</td>--}}
                            {{--<td>--}}
                            {{--<template v-if="task.status === 1">进行中</template>--}}
                            {{--<template v-if="task.status === 2">已完成</template>--}}
                            {{--<template v-if="task.status === 3">已停止</template>--}}
                            {{--</td>--}}
                            {{--<td>@{{ task.principal }}</td>--}}
                            {{--<td>@{{ task.end_at }}</td>--}}
                            {{--</tr>--}}
                        </table>
                    </div>
                    <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-task" role="tabpanel">
                        <table class="table is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="pre-cell"></th>
                                <th class="cell-300" scope="col">任务名称</th>
                                <th class="cell-300" scope="col">任务类型</th>
                                <th class="cell-300" scope="col">状态</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">截止时间</th>
                                <th class="suf-cell"></th>
                            </tr>
                            <tr v-for="task in clientTasksInfo">
                                <td class="pre-cell"></td>
                                <td>@{{ task.title }}</td>
                                <td>@{{ task.type }}</td>
                                <td>
                                    <template v-if="task.status === 1">进行中</template>
                                    <template v-if="task.status === 2">已完成</template>
                                    <template v-if="task.status === 3">已停止</template>
                                </td>
                                <td>@{{ task.principal.data.name }}</td>
                                <td>@{{ task.end_at }}</td>
                            </tr>
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
                    <div class="tab-pane animation-fade pb-20" id="forum-base" role="tabpanel">
                        <div class="card">
                            <div class="card-header card-header-transparent card-header-bordered">
                                <div class="float-left font-weight-bold third-title">任务详情</div>
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
                                        <edit-input :content="clientInfo.company" :is-edit="isEdit"
                                                    @change="changClientName"></edit-input>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">级别</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector :options="clientLevelArr" :is-edit="isEdit"
                                                       :content="clientInfo.grade"
                                                       @change="changeClientLevel"></edit-selector>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">决策关键人/部门</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input :content="clientInfo.keyman"
                                                    :is-edit="isEdit" @change="changeClientDecision"></edit-input>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">负责人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input-selector :is-edit="isEdit"
                                                             :select-type="'principal'"></edit-input-selector>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">地区</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector :options="clientTypeArr" :is-edit="isEdit"
                                                       :content="clientInfo.type"></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">详细地址</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input :content="clientInfo.company" :is-edit="isEdit"></edit-input>
                                    </div>
                                </div>

                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">规模</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector :options="clientScaleArr" :is-edit="isEdit"
                                                       :content="clientInfo.size"
                                                       @change="changeClientScale"></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">备注</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-textarea :content="clientInfo.desc"
                                                       :is-edit="isEdit" @change="changeClientDesc"></edit-textarea>
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
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-contact"
                         role="tabpanel">
                        <table class="table is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="pre-cell"></th>
                                <th class="cell-300" scope="col">联系人</th>
                                <th class="cell-300" scope="col">关联公司</th>
                                <th class="cell-300" scope="col">联系人电话</th>
                                <th class="cell-300" scope="col">职位</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">操作</th>
                                <th class="suf-cell"></th>
                            </tr>
                            <tr v-for="contact in clientContactsInfo">
                                <td class="pre-cell"></td>
                                <td>@{{ contact.name }}</td>
                                <td>@{{ clientInfo.company }}</td>
                                <td>@{{ contact.phone }}</td>
                                <td>@{{ contact.position }}</td>
                                <td>@{{ clientInfo.principal.data.name }}</td>
                                <td>
                                    <span class="pr-20 d-block float-left pointer-content"
                                          style="color: #b9b9b9;">
                                        <i class="icon md-edit" aria-hidden="true"></i>
                                    </span>
                                    <span class="d-block float-left"
                                          style="width: 1px; height: 14px;border-right: 1px solid #b9b9b9;margin: 3px;"></span>
                                    <span class="pl-20 d-block float-left pointer-content" style="color: #b9b9b9">
                                        <i class="icon md-delete" aria-hidden="true"></i>
                                    </span>
                                </td>
                            </tr>
                        </table>

                        <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                             data-target="#addContact">
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
                                <task-follow-up :follow-type="'客户'"></task-follow-up>
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
                        <h4 class="modal-title">新增联系人</h4>
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
                                       placeholder="请输入联系人" v-model="contactName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人电话</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control"
                                       placeholder="请输入联系人电话" v-model="contactPhone">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">职位</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control"
                                       placeholder="请输入联系人职位" v-model="contactPosition">
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
                                客户 - @{{ clientInfo.company }}
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

    </div>
    <!-- End Page -->

@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/client.detail.js') }}"></script>

@endsection






