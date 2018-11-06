@extends('layouts.master')

@section('title','项目管理')
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
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
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
                        <td class="pointer-content" @click="redirectProjectDetail(project.id)">@{{ project.name }}</td>
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

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addProject">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="addProject" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增项目</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">项目类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">销售线索</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">项目名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入项目名称" v-model="projectName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联公司</div>
                            <div class="col-md-10 float-left pl-0">
                                <edit-company :options="companyArr" @change="changeLinkageCompany"></edit-company>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">目标艺人</div>
                            <div class="col-md-4 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" :multiple="true" :searchable="true"
                                           @change="changeTargetArtist"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addProject">确定</button>
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

    <script src="{{ mix('js/project.index.js') }}"></script>

@endsection






