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
        <div class="home-title">
            <h6>泰洋人事审批</h6>
        </div>
        <div class="cont-nav">
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋招聘申请</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt> 
                <dd>工作室注册审批</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋离职申请单</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋招聘申请</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>工作室注册审批</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋离职申请单</dd>
            </dl>
        </div>
        <div class="home-title">
            <h6>泰洋人事审批</h6>
        </div>
        <div class="cont-nav">
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋招聘申请</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt> 
                <dd>工作室注册审批</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋离职申请单</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋招聘申请</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>工作室注册审批</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋离职申请单</dd>
            </dl>
        </div>
        <div class="home-title">
            <h6>泰洋人事审批</h6>
        </div>
        <div class="cont-nav">
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋招聘申请</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt> 
                <dd>工作室注册审批</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋离职申请单</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋招聘申请</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>工作室注册审批</dd>
            </dl>
            <dl>
                <dt><i class="site-menu-icon md-widgets" aria-hidden="true"></i></dt>
                <dd>泰洋离职申请单</dd>
            </dl>
        </div>
        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addTask">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
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
                                {{-- todo 资源未关联--}}
                                {{--<normal-linkage-selectors @change="changeLinkage"></normal-linkage-selectors>--}}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskTypeArr" :placeholder="'请选择任务类型'"
                                        @change="changeTaskType"></selectors>
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
                                <selectors :options="taskLevelArr" :placeholder="'请选择任务优先级'"
                                        @change="changeTaskLevel"></selectors>
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
                                <textarea class="form-control" name="taskDescription" id="" cols="30" rows="5" title="" v-model="taskIntroduce"></textarea>
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






