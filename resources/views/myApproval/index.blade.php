@extends('layouts.master')

@section('title','项目管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')


    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的审批</h1>
        </div>
        <div class="cont">
        <div class="top">
            <div class="top-left">
                <input type="text" placeholder="输入编号、类型或者申请人">  
            </div>
            
            <div class="top-right">
                <span class="active">待审批</span>
                <span>已审批</span>
            </div>
        </div>
        <table class="list">
            <thead>
                <tr>
                    <th>审批编号</th>
                    <th>申请人</th>
                    <th>类型<span class="sj"></span></th>
                    <th>申请时间</th>
                    <th>审批状态</th>
                </tr>
            </thead>
            <tbody></tbody> 
        </table>
            
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
                        <input type="text" placeholder="输入编号、类型或者申请人">
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
    <link rel="stylesheet" href="{{ mix('css/myApplication.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/project.index.js') }}"></script>

@endsection






