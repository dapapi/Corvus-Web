@extends('layouts.master')

@section('title','员工管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">员工档案</h1>
            <div class="page-header-actions">
                历史归档
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="col-md-12 clearfix py-5">
                    <div class="col-md-2 example float-left">
                        <selectors :options="staffStatus" @change="projectChange" :defaultValue="0"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="dateArr" @change="projectChange"></selectors>
                    </div>
                    <div class="col-md-2 example float-left">
                        <selectors :options="stuffType" @change="projectChange"></selectors>
                    </div>
                    <div class="col-md-4 example float-left">
                        <div class="input-search">
                            <button type="submit" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                            </button>
                            <input type="text" class="form-control" name="" placeholder="请搜索姓名/手机号/职位">
                        </div>
                    </div>
                    <div class="col-md-1 example float-left" 
                        style="height: 36px; line-height: 36px; text-align: right;"
                    >
                        <span style="cursor: pointer" data-target="#examplePositionCenter" data-toggle="modal">报表</span>
                        <!-- <button class="btn btn-primary" data-target="#examplePositionCenter"  type="button">Generate</button> -->
                    </div>
                    <Modal 
                        id="examplePositionCenter"
                        title="选择报表字段"
                    >
                        <checkbox-group :option-data="filterConditions" @onchange="changeSelectOption" />
                    </Modal>
                </div>
                <div>&nbsp;&nbsp;&nbsp;在职 23    入职 8     离职 2</div>
                <table class="table is-indent example" data-plugin="animateList" data-animate="fade" data-child="tr"
                       data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <th class="pre-cell"></th>
                        <th class="cell-300" scope="col">序号</th>
                        <th class="cell-300" scope="col">姓名</th>
                        <th class="cell-300" scope="col">手机</th>
                        <th class="cell-300" scope="col">工号</th>
                        <th class="cell-300" scope="col">状态</th>
                        <th class="cell-300" scope="col">部门</th>
                        <th class="cell-300" scope="col">入职日期</th>
                        <th class="cell-300" scope="col">绑定状态</th>
                        <th class="cell-300" scope="col">操作</th>
                        <th class="suf-cell"></th>
                    </tr>
                    <tr>
                        <th class="pre-cell"></th>
                        <th scope="row">1</th>
                        <td>bqx</td>
                        <td>1871111222</td>
                        <td>0086</td>
                        <td>正式</td>
                        <td>财务</td>
                        <td>2018-01-02</td>
                        <td>未绑定</td>
                        <td>
                            <div class="dropdown show task-dropdown">
                                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                                data-toggle="dropdown" aria-expanded="false"></i>
                                <div class="dropdown-menu dropdown-menu-left task-dropdown-item" aria-labelledby="taskDropdown"
                                    role="menu" x-placement="bottom-end" style="min-width: 0;">
                                    <a class="dropdown-item" role="menuitem" @click="">转正</a>
                                    <a class="dropdown-item" role="menuitem" @click="">调岗</a>
                                    <a class="dropdown-item" role="menuitem" @click="">离职</a>
                                    <a class="dropdown-item" role="menuitem" @click="">归档</a>
                                </div>
                            </div>
                        </td>
                        <td class="suf-cell"></td>
                    </tr>
                    <!-- <tr v-for="project in projectsInfo ">
                        <td class="pre-cell"></td>
                        <td class="pointer-content" @click="redirectProjectDetail(project.id)">@{{ project.name }}</td>
                        <td>@{{ project.principal }}</td>
                        <td>@{{ project.progress }}</td>
                        <td>@{{ project.sign_time }}</td>
                        <td>@{{ project.delivery }}</td>
                        <td>@{{ project.follow_time }}</td>
                        <td class="suf-cell"></td>
                    </tr> -->
                </table>

                <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                            :total="total"></pagination>
            </div>

        </div>

        <!-- <customize-filter :data="customizeInfo" @change="customize"></customize-filter> -->
        <!-- <Modal /> -->
    </div>
    <!-- End Page -->

@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
    <link rel="stylesheet" href="{{ mix('css/staff.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/staff.index.js') }}"></script>

@endsection






