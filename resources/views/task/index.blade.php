@extends('layouts.master')

@section('title','任务管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">任务管理</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入任务名称"
                               style="width: 220px">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :placeholder="'请选择任务类型'"></selectors>
                    </div>
                    {{-- todo 任务类型暂无--}}
                    <div class="col-md-3 example float-left">
                        <selectors :placeholder="'请选择任务状态'"></selectors>
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
                        <li class="nav-item" role="presentation" @click="getTasks(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">所有任务</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1,3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我负责的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1,2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我参与的</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1,1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">我创建的</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-task" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="pre-cell"></th>
                                <th class="cell-300" scope="col">任务名称</th>
                                <th class="cell-300" scope="col">关联资源</th>
                                <th class="cell-300" scope="col">任务类型</th>
                                <th class="cell-300" scope="col">任务状态</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">截止时间</th>
                                <th class="suf-cell"></th>
                            </tr>
                            <tr v-for="task in tasksInfo">
                                <td class="pre-cell"></td>
                                <td class="pointer-content" @click="redirectTaskDetail(task.id)">@{{ task.title }}</td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td>
                                    <template v-if="task.status === 1">进行中</template>
                                    <template v-if="task.status === 2">已完成</template>
                                    <template v-if="task.status === 3">已停止</template>
                                </td>
                                <td>
                                    <template v-if="task.principal">@{{ task.principal.data.name }}</template>
                                </td>
                                <td>@{{ task.end_at }}</td>
                                <td class="suf-cell"></td>
                            </tr>
                        </table>
                        <template v-if="!taskStatus">
                            <pagination :current_page="current_page" :method="getTasks" :total_pages="total_pages"
                                        :total="total"></pagination>
                        </template>
                        <template v-else>
                            <pagination :current_page="current_page" :method="getMyTasks" :total_pages="total_pages"
                                        :total="total"></pagination>
                        </template>
                    </div>
                </div>


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

    <script src="{{ mix('js/task.index.js') }}"></script>

@endsection






