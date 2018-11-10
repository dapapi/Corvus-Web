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
            <div class="panel col-md-12 col-lg-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入昵称"
                               style="width: 220px">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors></selectors>
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
                        <tr v-for="trail in trailsInfo ">
                            <td class="pre-cell"></td>
                            <td class="pointer-content" @click="redirectTrailDetail(trail.id)">@{{ trail.title }}</td>
                            <td>@{{ trail.resource.name }}</td>
                            <td>
                                <template v-if="trail.progress_status === 1">未确定合作</template>
                                <template v-if="trail.progress_status === 2">已确定合作</template>
                                <template v-if="trail.progress_status === 0">已拒绝</template>
                            </td>
                            <td>@{{ trail.brand }}</td>
                            <td>
                                <template v-if="trail.client.data.grade === 1">直客</template>
                                <template v-if="trail.client.data.grade === 2">代理公司</template>
                            </td>
                            <td>@{{ trail.principal.data.name }}</td>
                            <td class="suf-cell"></td>
                        </tr>
                    </table>
                    <pagination :current_page="current_page" :method="getSales" :total_pages="total_pages"
                                :total="total"></pagination>
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
                        <h4 class="modal-title">新增销售线索</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">品牌名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入品牌名称">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">公司名称</div>
                            <div class="col-md-4 float-left pr-0 row">
                                <input type="text" class="form-control" title="" placeholder="请输入公司名称">
                            </div>
                            <div class="col-md-2 text-right float-left">级别</div>
                            <div class="col-md-4 float-left pr-0 row">
                                <selectors :options="clientLevelArr"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">线索名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入线索名称">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">线索来源</div>
                            <div class="col-md-4 float-left  row" v-if="trailOriginArr.length > 0">
                                <selectors :options="trailOriginArr" @change="changeTrailOrigin"></selectors>
                            </div>
                            <template v-if="trailOrigin === '1' || trailOrigin === '2' || trailOrigin === '3'">
                                <div class="col-md-6 float-left">
                                    <input type="text" class="form-control" title="">
                                </div>
                            </template>
                            <template v-else-if="trailOrigin === '4' || trailOrigin === '5'">
                                <div class="col-md-6 float-left">
                                    <input-selectors></input-selectors>
                                </div>
                            </template>

                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input-selectors></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">目标艺人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入目标艺人">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">推荐艺人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入推荐艺人">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入推联系人">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人电话</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入联系电话">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">销售进展</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" :placeholder="salesProgressText"
                                       disabled>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">预计费用</div>
                            <div class="col-md-7 float-left pl-0">
                                <number-spinner></number-spinner>
                            </div>
                            <div class="col-md-3 float-left" v-if="companyType !== '泰洋川禾'">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="isLocked">
                                    <label for="isLocked">锁价</label>
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea title="" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addTrail">确定</button>
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

    <script src="{{ mix('js/trail.index.js') }}"></script>

@endsection






