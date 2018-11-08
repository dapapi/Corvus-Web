@extends('layouts.master')

@section('title','客户管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">客户管理</h1>
            <div class="page-header-actions">
                <i class="icon md-download px-5 font-size-20 pr-20" aria-hidden="true"></i>
                <i class="icon md-upload font-size-20" aria-hidden="true"></i>
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
                        <selectors @change=""
                                   :placeholder="'请选择行业'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors @change=""
                                   :placeholder="'请选择级别'"></selectors>
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
                        <th class="cell-300" scope="col">公司名称</th>
                        <th class="cell-300" scope="col">级别</th>
                        <th class="cell-300" scope="col">行业</th>
                        <th class="cell-300" scope="col">负责人</th>
                        <th class="cell-300" scope="col">录入时间</th>
                        <th class="cell-300" scope="col">跟进时间</th>
                        <th class="suf-cell"></th>
                    </tr>
                    <tr v-for="client in clientsInfo ">
                        <td class="pre-cell"></td>
                        <td class="pointer-content" @click="redirectClientDetail(client.id)">@{{ client.company }}</td>
                        <td>
                            <template v-if="client.grade === 1">直客</template>
                            <template v-if="client.grade === 2">代理公司</template>
                        </td>
                        <td>@{{ client.industry }}</td>
                        <td>@{{ client.principal }}</td>
                        <td>@{{ client.delivery }}</td>
                        <td>@{{ client.follow_time }}</td>
                        {{-- @todo 录入时间、跟进时间没有 --}}
                        <td class="suf-cell"></td>
                    </tr>
                </table>

                <pagination :current_page="current_page" :method="getClients" :total_pages="total_pages"
                            :total="total"></pagination>

            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addClient">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="addClient" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增客户</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">客户类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="clientTypeArr" :placeholder="'请选择客户类型'"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addClient">确定</button>
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

    <script src="{{ mix('js/client.index.js') }}"></script>

@endsection






