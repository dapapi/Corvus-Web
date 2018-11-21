@extends('layouts.master')

@section('title','项目管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')


    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">发起审批</h1>
        </div>
        <div class="cont-title">
            <h6>泰洋人事审批</h6>
            <ul>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋招聘申请</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>工作室注册审批</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋离职申请单</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋招聘申请</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>工作室注册审批</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋离职申请单</p>
                </li>
            </ul>
        </div>
        <div class="cont-title">
            <h6>泰洋人事审批</h6>
            <ul>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋招聘申请</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>工作室注册审批</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋离职申请单</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋招聘申请</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>工作室注册审批</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋离职申请单</p>
                </li>
            </ul>
        </div>
        <div class="cont-title">
            <h6>泰洋人事审批</h6>
            <ul>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋招聘申请</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>工作室注册审批</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋离职申请单</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋招聘申请</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>工作室注册审批</p>
                </li>
                <li>
                   <span><i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i></span>
                   <p>泰洋离职申请单</p>
                </li>
            </ul>
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
                        <button class="btn btn-primary" type="submit" @click="selectProjectType" data-toggle="modal"
                                data-target="#addProject">确定
                        </button>
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
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">销售线索</div>
                            <div class="col-md-10 float-left">
                                <selectors @change="(value) => addInfo(value, 'name')"></selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">项目名称</div>
                            <div class="col-md-10 float-left">
                                <emit-input @change="(value) => addInfo(value, 'name')"></emit-input>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">项目负责人</div>
                            <div class="col-md-10 float-left">
                                <input-selectors @change="(value) => addInfo(value, 'principal_id')"></input-selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">优先级</div>
                            <div class="col-md-10 float-left">
                                <selectors :options="levelArr"
                                           @change="(value) => addInfo(value, 'priority')"></selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">可见范围</div>
                            <div class="col-md-10 float-left">
                                <selectors 
                                           @change="(value) => addInfo(value, 'name')"></selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">开始时间</div>
                            <div class="col-md-10 float-left">
                                <datepicker @change="(value) => addInfo(value, 'start_at')"></datepicker>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">截止时间</div>
                            <div class="col-md-10 float-left">
                                <datepicker @change="(value) => addInfo(value, 'end_at')"></datepicker>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix" v-for="field in projectFieldsArr">
                            <div class="col-md-2 text-right float-left pl-0">@{{ field.key }}</div>
                            <div class="col-md-10 float-left">
                                <template v-if="field.field_type === 1">
                                    <emit-input @change="(value) => addInfo(value, field.key )"></emit-input>
                                </template>
                                <template v-else-if="field.field_type === 2">
                                    <selectors :options="field.contentArr"
                                               @change="(value) => addInfo(value, field.key )"></selectors>
                                </template>
                                <template v-else-if="field.field_type === 3">
                                    <editable-search-box :options="starsArr" :multiple="true"
                                                         @change="(value) => addInfo(value, field.key )"></editable-search-box>
                                </template>
                                <template v-else-if="field.field_type === 4">
                                    <datepicker @change="(value) => addInfo(value, field.key )"></datepicker>
                                </template>
                                <template v-else-if="field.field_type === 5">
                                    <textarea title="" class="form-control"
                                              @change="(value) => addInfo(value, field.key )"></textarea>
                                </template>
                                <template v-else-if="field.field_type === 6">
                                    <selectors :options="field.contentArr" :multiple="true"
                                               @change="(value) => addInfo(value, field.key )"></selectors>
                                </template>
                                <template v-else-if="field.field_type === 8">
                                    <group-datepicker
                                            @change="(value) => addInfo(value, field.key )"></group-datepicker>
                                </template>
                                <template v-else-if="field.field_type === 10">
                                    <input-selectors @change="(value) => addInfo(value, field.key )"></input-selectors>
                                </template>
                                <template v-else-if="field.field_type === 11">
                                    <number-spinner @change="(value) => addInfo(value, field.key )"></number-spinner>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left pl-0">备注</div>
                            <div class="col-md-10 float-left">
                                <emit-input @change="(value) => addInfo(value, 'desc')"></emit-input>
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
    <link rel="stylesheet" href="{{ mix('css/Inapproval.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/project.index.js') }}"></script>

@endsection






