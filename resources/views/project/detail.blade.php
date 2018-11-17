@extends('layouts.master')

@section('title','项目详情')

@section('body-class','dashboard')


@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">项目详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <div class="font-info pointer-content">拒绝</div>
            </div>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12 pb-20">
                <div class="card-block">
                    <h4 class="card-title">@{{ projectInfo.title }}</h4>
                </div>
                <div class="card-text clearfix mb-20">
                    <div class="col-md-6 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>负责人
                        </div>
                        <div class="font-weight-bold float-left">
                            @{{ projectInfo.principal.data.name }}
                        </div>
                    </div>
                    <div class="col-md-6 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>预计费用
                        </div>
                        <div class="font-weight-bold float-left">
                            {{--@{{ projectInfo.fee }} /元--}}
                        </div>
                    </div>
                </div>
                <div class="card-text clearfix example">
                    <div class="col-md-6 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>目标艺人
                        </div>
                        <div class="font-weight-bold float-left">
                            {{--<span v-for="expectation in trailInfo.expectations.data">--}}
                            {{--@{{ expectation.name }}--}}
                            {{--</span>--}}
                        </div>
                    </div>
                    {{--<div class="col-md-6 float-left">--}}
                        {{--<div class="float-left pl-0 pr-2 col-md-3">--}}
                            {{--<i class="md-plus pr-2" aria-hidden="true"></i>推荐艺人--}}
                        {{--</div>--}}
                        {{--<div class="font-weight-bold float-left">--}}
                                {{--<span v-for="recommendation in trailInfo.recommendations.data">--}}
                                    {{--@{{ recommendation.name }}--}}
                                {{--</span>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                </div>
            <div class="col-md-12 panel">
                <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-toggle="tab" href="#forum-trail-base"
                           aria-controls="forum-base"
                           aria-expanded="true" role="tab">项目跟进</a>
                    </li>
                    <li class="nav-item" role="presentation">
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
                                <div class="float-right">
                                    <i class="icon md-edit" aria-hidden="true" @click="editBaseInfo"></i>
                                </div>
                                <div class="float-right mr-40" v-show="isEdit">
                                    <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                                    <button class="btn btn-primary" @click="changeTrailBaseInfo">确定</button>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">线索名称</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input :content="trailInfo.title"></edit-input>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">线索来源</div>
                                    <div class="col-md-5 float-left font-weight-bold">

                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">负责人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">预计费用</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">品牌名称</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">公司名称</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">目标艺人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">推荐艺人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">级别</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">联系人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">联系电话</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">是否锁价</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">备注</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">销售进展</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">保护截止日期</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">锁价人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">锁价日期</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>

                                <div class="segmentation-line example"></div>

                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">录入人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">录入时间</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">最近更新人</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-selector></edit-selector>
                                    </div>
                                    <div class="col-md-1 float-left text-right pl-0">最近更新时间</div>
                                    <div class="col-md-5 float-left font-weight-bold">
                                        <edit-input></edit-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-trail-tasks"
                         role="tabpanel">
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="pre-cell"></th>
                                <th class="cell-300" scope="col">任务名称</th>
                                <th class="cell-300" scope="col">任务类型</th>
                                <th class="cell-300" scope="col">状态</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">截止日期</th>
                                <th class="suf-cell"></th>
                            </tr>
                            <tr>
                                <td class="pre-cell"></td>
                                <td>电话组织会议</td>
                                <td>类型一</td>
                                <td>进行中</td>
                                <td>张测试</td>
                                <td>2018-09-23 10:23</td>
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
                                <task-follow-up :follow-type="'线索'"></task-follow-up>
                            </div>
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
                            销售线索 - @{{ trailInfo.title }}
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
                            <timepicker></timepicker>
                        </div>
                        <div class="col-md-2 text-right float-left">截止时间</div>
                        <div class="col-md-5 float-left pl-0">
                            <datepicker @change="changeEndTime"></datepicker>
                        </div>
                        <div class="col-md-5 float-left pl-0">
                            <timepicker></timepicker>
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

    <script src="{{ mix('js/project.detail.js') }}"></script>

@endsection






