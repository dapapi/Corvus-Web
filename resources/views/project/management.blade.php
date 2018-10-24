@extends('layouts.master')

@section('title','控制台')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">项目管理</h1>
            <div class="page-header-actions">
                <i class="icon md-plus font-size-24" aria-hidden="true"></i>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 clearfix">
                <div class="col-md-3 example float-left">
                    <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目昵称"
                           style="width: 220px">
                </div>
                <div class="col-md-3 example float-left">
                    <selectors :options="projectType" @change="projectChange"></selectors>
                </div>
                <div class="col-md-3 example float-left">
                    <selectors :options="projectPrincipalType" @change="projectPrincipalChange"></selectors>
                </div>
                <div class="col-md-3 example float-left">
                    <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                            data-toggle="modal" data-target="#customizeContent"
                            data-placement="right" title="">
                        自定义筛选
                    </button>
                </div>


            </div>

            <div class="panel col-md-12 col-lg-12 clearfix py-5">
                <table class="table is-indent example" data-plugin="animateList" data-animate="fade" data-child="tr"
                       data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <th class="pre-cell"></th>
                        <th class="cell-300" scope="col">项目昵称</th>
                        <th class="cell-300" scope="col">负责人</th>
                        <th class="cell-300" scope="col">项目进展</th>
                        <th class="cell-300" scope="col">签单时间</th>
                        <th class="cell-300" scope="col">投放方式</th>
                        <th class="cell-300" scope="col">跟进时间</th>
                        <th class="suf-cell"></th>
                    </tr>
                    <tr v-for="project in projectsInfo ">
                        <td class="pre-cell"></td>
                        <td @click="redirectProjectPage(project.id)">@{{ project.name }}</td>
                        <td>@{{ project.principal }}</td>
                        <td>@{{ project.progress }}</td>
                        <td>@{{ project.sign_time }}</td>
                        <td>@{{ project.delivery }}</td>
                        <td>@{{ project.follow_time }}</td>
                        <td class="suf-cell"></td>
                    </tr>
                </table>

                <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                            :total="total"></pagination>

            </div>

        </div>

        <div class="col-md-3">
            <select-staff></select-staff>
        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

    </div>
    <!-- End Page -->


    @include('layouts.footer')
@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/app.js') }}"></script>
    <script src="{{ mix('js/left-menu.js') }}"></script>
    <script src="{{ mix('js/project.management.js') }}"></script>

@endsection






