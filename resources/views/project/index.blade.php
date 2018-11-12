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
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目昵称"
                               style="width: 220px">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="projectStatus" @change="projectChange"
                                   :placeholder="'请选择项目状态'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="projectPrincipalType" @change="projectPrincipalChange"
                                   :placeholder="'请选择负责人'"></selectors>
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
                        <th class="cell-300" scope="col">项目名称</th>
                        <th class="cell-300" scope="col">负责人</th>
                        <th class="cell-300" scope="col">目标艺人</th>
                        <th class="cell-300" scope="col">预计订单收入</th>
                        <th class="cell-300" scope="col">优先级</th>
                        <th class="cell-300" scope="col">跟进时间</th>
                        <th class="suf-cell"></th>
                    </tr>
                    <tr v-for="project in projectsInfo ">
                        <td class="pre-cell"></td>
                        <td class="pointer-content" @click="redirectProjectDetail(project.id)">@{{ project.title }}</td>
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

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#selectProjectType">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="selectProjectType" aria-hidden="true" aria-labelledby="addLabelForm"
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
                                <selectors :options="projectTypeArr" @change="changeProjectType"
                                           :placeholder="'请选择项目类型'"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="selectProjectType">确定</button>
                    </div>

                </div>
            </div>
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
                        <div class="col-md-6 float-left pb-10" v-for="field in projectFields">
                            <div class="col-md-5 text-right float-left pl-0">@{{ field.key }}</div>
                            <div class="col-md-7 float-left pl-0">
                                <template v-if="field.field_type === 1"></template>
                                <template v-else-if="field.field_type === 2"></template>
                                <template v-else-if="field.field_type === 3"></template>
                                <template v-else-if="field.field_type === 4"></template>
                                <template v-else-if="field.field_type === 5"></template>
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






