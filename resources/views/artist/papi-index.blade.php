@extends('layouts.master')

@section('title','艺人管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">艺人管理</h1>
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

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getTasks(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">签约中</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1,3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已签约</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getMyTasks(1,2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已解约</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                        <table class="table is-indent" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="pre-cell"></th>
                                <th class="cell-300" scope="col">昵称</th>
                                <th class="cell-300" scope="col">类型</th>
                                <th class="cell-300" scope="col">微博平台粉丝数</th>
                                <th class="cell-300" scope="col">与我司签约意向</th>
                                <th class="cell-300" scope="col">签约状态</th>
                                <th class="cell-300" scope="col">制作人</th>
                                <th class="cell-300" scope="col">录入时间</th>
                                <th class="suf-cell"></th>
                            </tr>
                            <tr v-for="artist in artistsInfo">
                                <td class="pre-cell"></td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td>暂无</td>
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

        {{--<customize-filter :data="customizeInfo" @change="customize"></customize-filter>--}}

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addArtist">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="addArtist" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增博主</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">昵称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入昵称" v-model="artistName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">平台</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入昵称" v-model="artistPlatform">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入类型" v-model="artistType">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">微博主页地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                            <div class="col-md-3 text-right float-left">签约时微博粉丝数量</div>
                            <div class="col-md-3 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">抖音ID</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                            <div class="col-md-3 text-right float-left">签约时抖音粉丝数量</div>
                            <div class="col-md-3 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">小红书链接</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                            <div class="col-md-3 text-right float-left">签约时小红书粉丝数量</div>
                            <div class="col-md-3 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">沟通状态</div>
                            <div class="col-md-3 float-left pl-0">
                                <selectors :options="artistStatusArr" @change="changeTaskType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">与我司签约意向</div>
                            <div class="col-md-3 float-left pl-0">
                                <selectors :options="artistStatusArr" @change="changeTaskType"></selectors>
                            </div>
                            <div class="col-md-3 text-right float-left">不与我司签约原因</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">是否签约其他公司</div>
                            <div class="col-md-3 float-left pl-0">
                                <selectors :options="artistStatusArr" @change="changeTaskType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">签约公司名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" v-model="artistType">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入备注" v-model="artistType">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addArtist">确定</button>
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

    <script src="{{ mix('js/artist.index.js') }}"></script>

@endsection






