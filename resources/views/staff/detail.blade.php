@extends('layouts.master')

@section('title','员工管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')

    <!-- Page -->
    <div class="page" id="root">

        <nav-back title="测试-测试部" href="/staff/index"></nav-back>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="row">
                    <div class="col-md-4">
                        <div class="example">
                            <div class="col-md-3 text-right float-left">姓名(中文)</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">手机</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">最高学历</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">部门</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">工作邮箱</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="example">
                            <div class="col-md-3 text-right float-left">性别</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">年龄</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">出生日期</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">岗位</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">工号</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="example" style="text-align: center;">
                            <upload>
                                <div class="upload-head" style="margin-top: 52px;">
                                    上传头像
                                </div>
                            </upload>
                        </div>
                    </div>
                </div>

                <div class="nav-tabs-horizontal" data-plugin="tabs">

                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" style="margin: 0 30px">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" 
                                data-toggle="tab" 
                                href="#infoTab" 
                                aria-controls="infoTab" 
                                role="tab" aria-selected="true">
                                个人信息
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#workTab" 
                                aria-controls="workTab" 
                                role="tab" 
                                aria-selected="false">
                                岗位信息
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#salaryTab" 
                                aria-controls="salaryTab" 
                                role="tab" 
                                aria-selected="false">
                                薪资信息
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#entryInfoTab" 
                                aria-controls="entryInfoTab" 
                                role="tab" 
                                aria-selected="false">
                                入职信息表
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content pt-20">
                        <div class="tab-pane active" id="infoTab" role="tabpanel">
                            <div class="col-md-8 example">
                                <!-- <div class="example"> -->
                                    <div class="col-md-2 text-right float-left pl-0">身份证号</div>
                                    <div class="col-md-6 float-left pl-0">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                <!-- </div> -->
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">身份证照</div>
                                <div class="col-md-6 float-left pl-0">
                                    <upload>
                                        <div class="id-upload">
                                            <!-- <i class="icon md-plus" style="font-size: 50px" aria-hidden="true"></i> -->
                                            +
                                        </div>
                                    </upload>
                                    <small style="color: #F44336;">图片格式为JPG/JPEG/PNG/PDF 大小在2MB内</small>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">护照号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">地址</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">个人邮箱</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工资银行卡号1</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工资银行卡号2</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">信用卡号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">公积金号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">开户行</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">上家公司</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">岗位离职</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">签署合同</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工作地点</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">聘用形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">部门</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">入职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane" id="workTab" role="tabpanel">
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">汇报对象</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">转正状态</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">转正日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">职级</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">聘用形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">管理形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">司龄</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">首次参加工作时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">调整司龄</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工龄</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">调整工龄(天)</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">直接下属数量</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工作城市</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">缴纳城市</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">现合同开始时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">现合同结束时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">招聘渠道</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="salaryTab" role="tabpanel">
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">入职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">试用期截止日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">离职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">分摊部门</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">岗位</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">个税缴纳方式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">人员类别</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="entryInfoTab" role="tabpanel">
                            员工信息
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="formName example" style="border: none;">个人成长记录</div>
                    <ul class="task-follow">
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-md-12">
                    <div class="formName example" style="border: none;">操作日志</div>
                    <ul class="task-follow example">
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <!-- 底部按钮 -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-default">取消</button>
                    <button type="button" class="btn btn-primary">提交</button>
                </div>
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

    <script src="{{ mix('js/staff.detail.js') }}"></script>

@endsection
