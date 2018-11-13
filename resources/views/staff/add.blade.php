@extends('layouts.master')

@section('title','员工管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <nav-back title="添加员工" href="/staff/index"></nav-back>
        
        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="nav-tabs-horizontal" data-plugin="tabs">

                    <ul class="nav nav-tabs" role="tablist">
                      <li class="nav-item" role="presentation"><a class="nav-link active" data-toggle="tab" href="#exampleTabsOne" aria-controls="exampleTabsOne" role="tab" aria-selected="true">添加员工</a></li>
                      <li class="nav-item" role="presentation"><a class="nav-link" data-toggle="tab" href="#exampleTabsTwo" aria-controls="exampleTabsTwo" role="tab" aria-selected="false">邀请员工</a></li>
                    </ul>

                    <div class="tab-content pt-20">
                      <div class="tab-pane active" id="exampleTabsOne" role="tabpanel">

                        <div class="formName">个人资料 <span class="point"></span><span class="note">为必填项</span></div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">姓名(中文)</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="1-30个字符" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">姓名(英文)</div>
                                    <div class="col-md-9 float-left pl-0">
                                        <input type="text" placeholder="1-30个字符" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">性别</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <selectors :options="sexArr" placeholder="请选择" @change="" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">身份证号</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                            <div class="example">
                                <div class="col-md-3 text-right float-left"></div>
                                <div class="col-md-9 float-left pl-0">
                                    <upload>
                                        <div class="upload-head">
                                            上传头像
                                        </div>
                                    </upload>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">手机号</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">出生日期</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">入职时间</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">户籍所在地详细地址</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">政治面目</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">民族</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">婚姻状况</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">血型</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">电子邮件</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">现居住地址</div>
                                    <div class="col-md-9 float-left pl-0 require">
                                        <input type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="formName">个人技能</div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">外语水平</div>
                                    <div class="col-md-9 float-left pl-0">
                                        <input type="text" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">计算机水平</div>
                                    <div class="col-md-9 float-left pl-0">
                                        <input type="text" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">所获证书</div>
                                    <div class="col-md-9 float-left pl-0">
                                        <input type="text" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">个人特长</div>
                                    <div class="col-md-9 float-left pl-0">
                                        <input type="text" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="formName">教育背景</div>
                        <div class="example table-responsive">
                            <mtp-table :data-source="education" :columns="eduColumns" />
                        </div>
                    </div>

                    <div class="tab-pane" id="exampleTabsTwo" role="tabpanel">
                        <div style="color: #01bcd4; cursor: pointer">http://www.iconfont.cn/search/index?q=</div>
                        点击复制此链接
                      </div>
                    </div>
                  </div>
            </div>

        </div>

    </div>
    <!-- End Page -->

@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
    <link rel="stylesheet" href="{{ mix('css/staff.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/staff.add.js') }}"></script>

@endsection






