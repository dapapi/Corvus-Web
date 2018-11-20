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
<<<<<<< HEAD
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
=======

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目昵称"
                               style="width: 220px">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors @change="projectChange"
                                   :placeholder="'请选择项目状态'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors @change="projectPrincipalChange"
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

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getProjects(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">所有项目</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjects(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getProjects(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我参与的</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-300" scope="col">项目名称</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">目标艺人</th>
                                <th class="cell-300" scope="col">预计订单收入</th>
                                <th class="cell-300" scope="col">优先级</th>
                                <th class="cell-300" scope="col">跟进时间</th>
                            </tr>
                            <tr v-for="project in projectsInfo ">
                                <td class="pointer-content" @click="redirectProjectDetail(project.id)">@{{ project.title
                                    }}
                                </td>
                                <td>@{{ project.principal }}</td>
                                <td>@{{ project.progress }}</td>
                                <td>@{{ project.sign_time }}</td>
                                <td>@{{ project.delivery }}</td>
                                <td>@{{ project.follow_time }}</td>
                            </tr>
                        </table>
                        <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>


            </div>

>>>>>>> develop
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
<<<<<<< HEAD
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
                                <textarea class="form-control" name="taskDescription" id="" cols="30"
                                        rows="5" title="" v-model="taskIntroduce"></textarea>
=======
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
                                <selectors :options="visibleRange"
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
>>>>>>> develop
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

    <script src="{{ mix('js/project.index.js') }}"></script>

@endsection






