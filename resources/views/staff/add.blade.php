@extends('layouts.master')

@section('title','员工管理')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')

    <!-- Page -->
    <div class="page" id="root">

        <nav-back title="添加员工" href="/staff/index"></nav-back>
        
        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="nav-tabs-horizontal" data-plugin="tabs">

                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" 
                                data-toggle="tab" 
                                href="#exampleTabsOne" 
                                aria-controls="exampleTabsOne" 
                                role="tab" aria-selected="true">
                                添加员工
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#exampleTabsTwo" 
                                aria-controls="exampleTabsTwo" 
                                role="tab" 
                                aria-selected="false">
                                邀请员工
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content pt-20">
                      <div class="tab-pane active" id="exampleTabsOne" role="tabpanel">

                        <div class="formName pd-b-15">个人资料 <span class="point"></span><span class="note">为必填项</span></div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">姓名(中文)</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="nameCN" placeholder="1-30个字符" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">姓名(英文)</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="nameEN" placeholder="1-30个字符" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">性别</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <selectors :options="sexArr" change-key="sex" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">身份证号</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" placeholder="" v-model="IDNum" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left"></div>
                                    <div class="col-md-8 float-left pl-0">
                                        <upload>
                                            <div class="upload-head">
                                                上传头像
                                            </div>
                                        </upload>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" style="margin-top: -20px;">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">手机号</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="phoneNum" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">入职时间</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                    <datepicker change-key="entryTime" @select="changeState"></datepicker>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">政治面目</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="politicalFace" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">婚姻状况</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <selectors :options="maritalStatusArr" change-key="maritalStatus" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">电子邮件</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="email" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" style="margin-top: -20px;">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">出生日期</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <datepicker change-key="birthDay" @select="changeState"></datepicker>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">户籍所在地详细地址</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" placeholder="" v-model="householdAddress" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">民族</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <selectors :options="nationalityArr" change-key="nationality" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">血型</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="bloodType" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">现居住地址</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="homeAddress" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="formName pd-b-15">个人技能</div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">外语水平</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="foreignLanguageLevel" placeholder="" class="form-control" />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">所获证书</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="certificate" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">计算机水平</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="computerSkill" placeholder="" class="form-control" />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">个人特长</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="specialty" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="formName pd-b-15">教育背景 <i class="icon md-plus add-icon" @click="tableAdd('education')"></i></div>
                        <div class="example table-responsive padding15">
                            <!-- <mtp-table :data-source="education" :columns="eduColumns" /> -->
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in education.tHead" :key="index">@{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in education.tBody" :key="index">
                                        <td v-for="(item, key, _index) in items" :key="index + '_' + _index">
                                            <!-- <input type="text" v-model="education.tBody[index]" /> -->
                                            <input type="text" v-model="education.tBody[index][key]" />
                                            <!-- @{{ item }} -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">培训经历<i class="icon md-plus add-icon" @click="tableAdd('train')"></i></div>
                        <div class="example table-responsive padding15">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in train.tHead" :key="index">@{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in train.tBody" :key="index">
                                        <td v-for="(item, _index) in items" :key="_index">
                                            <input type="text" v-model="train.tBody[index][_index]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">
                            任职履历<span class="note" style="margin-left: 16px;">从最近的任职单位开始填写</span>
                            <i class="icon md-plus add-icon" @click="tableAdd('work')"></i>
                        </div>
                        <div class="example table-responsive padding15">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in work.tHead" :key="index">@{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in work.tBody" :key="index">
                                        <td v-for="(item, _index) in items" :key="_index">
                                            <input type="text" v-model="work.tBody[index][_index]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">家庭资料
                            <span class="note" style="margin-left: 16px;">请列出直系亲属资料和紧急联系人信息</span>
                            <i class="icon md-plus add-icon" @click="tableAdd('home')"></i>
                        </div>
                        <div class="example table-responsive padding15">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in home.tHead" :key="index">@{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in home.tBody" :key="index">
                                        <td v-for="(item, _index) in items" :key="_index">
                                            <input type="text" v-model="home.tBody[index][_index]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15"></div>
                        <div class="row example padding15">
                            <div class="col-md-7" style="margin-top: 4px;">1、现在或以前是否患有任何的身体缺陷或疾病，包括心脏病、肝炎、神经衰弱等</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" id="inputRadiosCheckedOne" value="1" name="inputRadioOne" v-model="isIll">
                                    <label for="inputRadiosCheckedOne">是</label>&nbsp;&nbsp;
                                    <input type="radio" id="inputRadiosUncheckedOne" value="2" name="inputRadioOne" v-model="isIll">
                                    <label for="inputRadiosUncheckedOne">否</label>
                                </div>
                            </div>
                            <div class="col-md-7" style="margin-top: 4px;">2、如属女性，请说明是否怀孕？</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" id="inputRadiosCheckedTwo" value="1" name="inputRadioTwo" v-model="isPregnancy">
                                    <label for="inputRadiosCheckedTwo">是</label>&nbsp;&nbsp;
                                    <input type="radio" id="inputRadiosUncheckedTwo" value="2" name="inputRadioTwo" v-model="isPregnancy">
                                    <label for="inputRadiosUncheckedTwo">否</label>
                                </div>
                            </div>
                            <div class="col-md-7" style="margin-top: 4px;">3、是否同意工作迁移到集团其他城市</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" id="inputRadiosCheckedThree" value="1" name="inputRadioThree" v-model="agreeMove">
                                    <label for="inputRadiosCheckedThree">是</label>&nbsp;&nbsp;
                                    <input type="radio" id="inputRadiosUncheckedThree" value="2" name="inputRadioThree" v-model="agreeMove">
                                    <label for="inputRadiosUncheckedThree">否</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="formName pd-b-15">其他备注</div>
                        <div class="example padding15">
                            <textarea class="form-control" rows="4" v-model="remarks"></textarea>
                        </div>
                        
                        <div class="modal-footer">
                            <!-- <button class="btn btn-sm btn-white btn-pure waves-effect waves-classic" data-dismiss="modal"  @click="handleCancel">取消</button> -->
                            <button class="btn btn-primary waves-effect waves-classic" type="submit" @click="submit">提交</button>
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