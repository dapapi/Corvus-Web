@extends('layouts.master')

@section('title','博主详情')

@section('body-class','dashboard')


@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">博主详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="">分享</a>
                    <a class="dropdown-item" role="menuitem" @click="">分配制作人</a>
                    <a class="dropdown-item" role="menuitem" @click="">自定义字段</a>
                    <a class="dropdown-item" role="menuitem" @click="">隐私设置</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12 pb-20">
                <div class="card-block">
                    <h4 class="card-title">蔡徐坤</h4>
                </div>
                <div class="card-text clearfix mb-20">
                    <div class="col-md-4 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>沟通状态
                        </div>
                        <div class="font-weight-bold float-left">
                            沟通中
                        </div>
                    </div>
                    <div class="col-md-4 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>微博地址
                        </div>
                        <div class="font-weight-bold float-left">
                            www.weibo.com
                        </div>
                    </div>
                    <div class="col-md-4 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>录入时间
                        </div>
                        <div class="font-weight-bold float-left">
                            5/12
                        </div>
                    </div>
                </div>
                <div class="card-text clearfix example">
                    <div class="col-md-6 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>平台
                        </div>
                        <div class="font-weight-bold float-left">
                            微博
                        </div>
                    </div>
                </div>
                <div class="card-text clearfix example">
                    <div class="col-md-6 float-left">
                        <div class="float-left pl-0 pr-2 col-md-3">
                            <i class="md-plus pr-2" aria-hidden="true"></i>录入人
                        </div>
                        <div class="font-weight-bold float-left">
                            测试
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 panel">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist-schedule"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">日程</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-projects"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">项目</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-tasks"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">任务</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-work"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">作品库</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-fans"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">粉丝数据</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-bill"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">账单</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-base"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">概况</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate bg-white col-md-12">
                        <div class="tab-pane animation-fade active pb-20 fixed-button-father" id="forum-artist-schedule"
                             role="tabpanel">
                            <div class="col-md-12">
                                <calendar></calendar>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-projects"
                             role="tabpanel">
                            <table class="table table-hover is-indent example" data-plugin="animateList"
                                   data-animate="fade"
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
                            </table>
                        </div>
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-tasks"
                             role="tabpanel">
                            <table class="table table-hover is-indent example" data-plugin="animateList"
                                   data-animate="fade"
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
                        <div class="tab-pane animation-fadefixed-button-father" id="forum-artist-work"
                             role="tabpanel">
                            作品
                        </div>
                        <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-fans"
                             role="tabpanel">
                            粉丝
                        </div>
                        <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-bill"
                             role="tabpanel">
                            账单
                        </div>
                        <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-base"
                             role="tabpanel">
                            基本信息
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="col-md-12">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered">
                            <h5>博主跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <task-follow-up :follow-type="'博主'"></task-follow-up>
                            </div>
                        </div>
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

    <script src="{{ mix('js/papi.detail.js') }}"></script>

@endsection






