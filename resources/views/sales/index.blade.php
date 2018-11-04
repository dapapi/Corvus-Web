@extends('layouts.master')

@section('title','销售线索管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">销售线索管理</h1>
            <div class="page-header-actions">
                <i class="icon md-download px-5 font-size-20 pr-20" aria-hidden="true"></i>
                <i class="icon md-upload font-size-20" aria-hidden="true"></i>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 page-content">
                <table class="table is-indent" data-plugin="animateList" data-animate="fade"
                       data-child="tr"
                       data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <th class="pre-cell"></th>
                        <th class="cell-300" scope="col">线索名称</th>
                        <th class="cell-300" scope="col">线索来源</th>
                        <th class="cell-300" scope="col">销售进展</th>
                        <th class="cell-300" scope="col">公司名称</th>
                        <th class="cell-300" scope="col">级别</th>
                        <th class="cell-300" scope="col">负责人</th>
                        <th class="suf-cell"></th>
                    </tr>
                    {{--<tr v-for="task in tasksInfo ">--}}
                    {{--<td class="pre-cell"></td>--}}
                    {{--<td>@{{ task.name }}</td>--}}
                    {{--<td>@{{ task.principal }}</td>--}}
                    {{--<td>@{{ task.progress }}</td>--}}
                    {{--<td>@{{ task.sign_time }}</td>--}}
                    {{--<td>@{{ task.delivery }}</td>--}}
                    {{--<td>@{{ task.follow_time }}</td>--}}
                    {{--<td class="suf-cell"></td>--}}
                    {{--</tr>--}}
                </table>
                <pagination :current_page="current_page" :method="getSales" :total_pages="total_pages"
                            :total="total"></pagination>
            </div>
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
                        <h4 class="modal-title">新增销售线索</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                <normal-linkage-selectors @change="changeLinkage"></normal-linkage-selectors>
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
                                <input-selectors :placeholder="memberPlaceholder" :multiple="multiple"
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
                            <div class="col-md-4 float-left pl-0">
                                <datepicker @change="changeStartTime"></datepicker>
                            </div>
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-4 float-left pl-0">
                                <datepicker @change="changeEndTime"></datepicker>
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

    <script src="{{ mix('js/sales.index.js') }}"></script>

@endsection






