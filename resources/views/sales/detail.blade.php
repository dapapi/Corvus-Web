@extends('layouts.master')

@section('title','销售线索')

@section('style')
    <link rel="stylesheet" href="{{ mix('css/task.css') }}">
@endsection

@section('body-class','dashboard')


@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">销售线索</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="editBaseInfo">编辑</a>
                    <a class="dropdown-item" role="menuitem">暂停</a>
                    <a class="dropdown-item" role="menuitem">完成</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#customizeFieldContent">自定义字段</a>
                    <a class="dropdown-item" role="menuitem">专私密</a>
                    <a class="dropdown-item" role="menuitem">删除</a>
                </div>
            </div>
            <span class="float-right mr-40" v-show="isEdit">
                <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                <button class="btn btn-primary">确定</button>
            </span>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12 col-lg-12">
                <div class="card-block">
                    <h4 class="card-title">组织电话会议</h4>
                    <div class="card-text clearfix example">
                        <div class="float-left pl-0 pr-2 col-md-1">
                            <i class="md-plus pr-2" aria-hidden="true"></i>负责人
                        </div>
                        <div class="font-weight-bold float-left">
                            <edit-input-selector :content="'张测试'" :is-edit="isEdit" @change=""></edit-input-selector>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="float-left pl-0 pr-2 col-md-1">
                            <i class="md-plus pr-2" aria-hidden="true"></i>任务状态
                        </div>
                        <div class="font-weight-bold float-left">
                            <edit-selector :content="'2'" :is-edit="isEdit" @change=""></edit-selector>
                        </div>
                    </div>
                    <div class="card-text clearfix example">
                        <div class="pl-0">
                            <div class="float-left pl-0 pr-2 col-md-1">
                                <i class="md-plus pr-2" aria-hidden="true"></i>结束时间
                            </div>
                            <div class="font-weight-bold float-left">
                                <edit-datepicker :content="'2018-09-03'" :is-edit="isEdit" @change=""></edit-datepicker>
                            </div>
                        </div>
                        <div class="float-right text-right pr-0">
                            <span>关联资源</span>
                            <span class="pl-2 font-weight-bold">博主-bigger研究所</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel col-md-12 col-lg-12">

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task-base"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">概况</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task-annex"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">附件</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task-subtasks"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">子任务</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content nav-tabs-animate bg-white col-md-12">
                    <div class="tab-pane animation-fade active" id="forum-task-base" role="tabpanel">
                        <div class="card">
                            <div class="card-header card-header-transparent card-header-bordered">
                                <h5>任务详情</h5>
                            </div>
                            <div class="card-block">
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">参与人</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <edit-add-member :content="'测试1、测试2'" :is-edit="isEdit"></edit-add-member>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">开始时间</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <edit-datepicker :content="'2018-09-03'" :is-edit="isEdit"
                                                         @change=""></edit-datepicker>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">优先级</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <edit-selector :content="'2'" :is-edit="isEdit" @change=""></edit-selector>
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">任务说明</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        <edit-textarea :content="'要求所有参与人必须参加此电话会议'" :is-edit="isEdit"></edit-textarea>
                                    </div>
                                </div>

                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">完成时间</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        2018-09-03
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">停止时间</div>
                                    <div class="col-md-11 float-left font-weight-bold">
                                        2018-09-03
                                    </div>
                                </div>
                                <div class="card-text py-5 clearfix">
                                    <div class="col-md-1 float-left text-right pl-0">创建人</div>
                                    <div class="col-md-11 float-left font-weight-bold">测试1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-task-annex" role="tabpanel">
                        <div class="card">
                            <div class="card-header card-header-transparent card-header-bordered attachment-upload">
                                <h5 class="d-inline float-left">上传附件</h5>
                                <div class="d-inline float-right">
                                    <i class="md-attachment-alt" aria-hidden="true"></i>
                                    <input type="file">
                                </div>
                            </div>
                            <div class="card-block">
                                <ul class="file-list">
                                    <li>
                                        <i class="md-file pr-5"></i> 会议记要模版
                                        <span class="float-right pl-10">删除</span>
                                        <span class="float-right px-10">|</span>
                                        <span class="float-right px-10">下载</span>
                                        <span class="float-right px-10">200kb</span>
                                    </li>
                                    <li>
                                        <i class="md-file pr-5"></i> 会议记要模版
                                        <span class="float-right pl-10">删除</span>
                                        <span class="float-right px-10">|</span>
                                        <span class="float-right px-10">下载</span>
                                        <span class="float-right px-10">200kb</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade pb-20 child-task-content" id="forum-task-subtasks"
                         role="tabpanel">
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

                        <div class="site-action add-child-task" data-plugin="actionBtn" data-toggle="modal"
                             data-target="#addChildTask">
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
                            <h5>任务跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <task-follow-up></task-follow-up>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div class="modal fade" id="addChildTask" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增子任务</h4>
                    </div>
                    <div class="modal-body" v-if="showChildTask">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                <normal-linkage-selectors></normal-linkage-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-5 float-left pl-0">
                                <input-selectors :placeholder="memberPlaceholder"></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-4 float-left pl-0">
                                <datepicker></datepicker>
                            </div>
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-4 float-left pl-0">
                                <datepicker></datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务说明</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" name="taskDescription" id="" cols="30"
                                          rows="5" title=""></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-inline float-right child-attachment-upload">
                                <span><i class="md-upload pr-5" aria-hidden="true"></i>上传文件</span>
                                <input type="file">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit">确定</button>
                    </div>
                </div>
            </div>
        </div>

        <customize-field></customize-field>

    </div>
    <!-- End Page -->

@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/task.detail.js') }}"></script>

@endsection






