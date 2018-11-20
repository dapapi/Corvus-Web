@extends('layouts.master')

@section('title','员工管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')

    <!-- Page -->
    <div class="page" id="root">

        <nav-back title="历史归档" href="/staff/index"></nav-back>


        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <table class="table is-indent example" data-plugin="animateList" data-animate="fade" data-child="tr"
                       data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <th class="pre-cell"></th>
                        <th class="cell-300" scope="col">序号</th>
                        <th class="cell-300" scope="col">姓名</th>
                        <th class="cell-300" scope="col">手机</th>
                        <th class="cell-300" scope="col">归档日期</th>
                        <th class="suf-cell"></th>
                    </tr>
                    <tr>
                        <th class="pre-cell"></th>
                        <th scope="row">1</th>
                        <td>bqx</td>
                        <td>1871111222</td>
                        <td>2018-01-02</td>
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

                <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                            :total="total"></pagination> -->
            </div>

        </div>

        <!-- <customize-filter :data="customizeInfo" @change="customize"></customize-filter> -->
        <!-- <Modal /> -->
    </div>
    <!-- End Page -->

@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
    <!-- <link rel="stylesheet" href="{{ mix('css/staff.css') }}"> -->
@endsection

@section('script')

    <script src="{{ mix('js/staff.history.js') }}"></script>

@endsection






