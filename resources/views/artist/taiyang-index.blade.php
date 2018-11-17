@extends('layouts.master')

@section('title','艺人管理')

@section('style')
    <link rel="stylesheet" href="{{ mix('css/task.css') }}">
@endsection


@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')
    @include('layouts.grid-menu')

    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">艺人管理</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="">导入</a>
                    <a class="dropdown-item" role="menuitem" @click="">导出</a>
                    <a class="dropdown-item" role="menuitem" @click="">分配制作人</a>
                    <a class="dropdown-item" role="menuitem" @click="">分配宣传人</a>
                </div>
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
                        <selectors :options="projectStatus"
                                   :placeholder="'请选择项目状态'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :placeholder="'请选择负责人'"></selectors>
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
                        <li class="nav-item" role="presentation" @click="getArtists(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">签约中</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtists(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已签约</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtists(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已解约</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                        <table class="table table-hover" data-plugin="selectable"
                               data-row-selectable="true">
                            <tr>
                                <th class="w-50">
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox" @change="selectArtists('all')">
                                            <label></label>
                                        </span>
                                </th>
                                <th class="cell-300" scope="col">姓名</th>
                                <th class="cell-300" scope="col">年龄</th>
                                <th class="cell-300" scope="col">艺人来源</th>
                                <th class="cell-300" scope="col">沟通状态</th>
                                <th class="cell-300" scope="col">签约状态</th>
                                <th class="cell-300" scope="col">录入时间</th>
                                <th class="cell-300" scope="col">最后跟进时间</th>
                                <th class="suf-cell"></th>
                            </tr>
                            <tr v-for="artist in artistsInfo">
                                <td>
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-item" type="checkbox" :id="'row-' + artist.id"
                                               :value="artist.id" @change="selectArtists(artist.id)">
                                        <label :for="'row-' + artist.id"></label>
                                    </span>
                                </td>
                                <td class="pointer-content" @click="redirectArtistDetail(artist.id)">
                                    @{{ artist.name }}
                                </td>
                                <td>根据日期生成年龄</td>
                                <td>
                                    <template v-if="artist.source">
                                        @{{ artistOriginArr.find(item => item.value == artist.source).name}}
                                    </template>
                                </td>
                                <td>
                                    <template v-if="artist.communication_status">
                                        @{{ taiyangCommunicationStatusArr.find(item => item.value ==
                                        artist.communication_status).name}}
                                    </template>
                                </td>
                                <td>不知道那个字段</td>
                                <td>暂无</td>
                                <td>暂无</td>
                                <td class="suf-cell"></td>
                            </tr>
                            </tbody>
                        </table>
                        <pagination :current_page="current_page" :method="getArtists" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>

            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

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
                        <h4 class="modal-title">新增艺人</h4>
                    </div>
                    <div class="modal-body">
                        {{-- todo 复选框单选 --}}
                        <div class="example">
                            <div class="col-md-2 text-right float-left">姓名</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入昵称" v-model="artistName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">性别</div>
                            <div class="col-md-4 float-left row">
                                <selectors :options="genderArr" placeholder="请选择性别" @change="changeGender"></selectors>
                            </div>
                            <div class="col-md-2 text-right float-left pr-0">出生日期</div>
                            <div class="col-md-4 float-left pr-0">
                                <datepicker @change="changeBirthday"></datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">艺人来源</div>
                            <div class="col-md-4 float-left row">
                                <selectors :options="artistOriginArr" placeholder="请选择艺人来源"
                                           @change="changeSource"></selectors>
                            </div>
                            <div class="col-md-2 text-right float-left pr-0">邮箱</div>
                            <div class="col-md-4 float-left pr-0">
                                <input type="text" class="form-control" title="" v-model="artistEmail"
                                       placeholder="请输入邮箱">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">手机号</div>
                            <div class="col-md-4 float-left row">
                                <input type="text" class="form-control" title="" v-model="artistPhone"
                                       placeholder="请输入手机号">
                            </div>
                            <div class="col-md-2 text-right float-left pr-0">微信</div>
                            <div class="col-md-4 float-left pr-0">
                                <input type="text" class="form-control" title="" v-model="artistWeiXin"
                                       placeholder="请输入微信号码">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">星探</div>
                            <div class="col-md-4 float-left row">
                                <input type="text" class="form-control" title="" v-model="artistScoutName"
                                       placeholder="请输入星探姓名">
                            </div>
                            <div class="col-md-2 text-right float-left pr-0">地区</div>
                            <div class="col-md-4 float-left pr-0">
                                <input type="text" class="form-control" title="" v-model="artistLocation"
                                       placeholder="请输入地区">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">平台</div>
                            <div class="col-md-10 float-left pl-0 ">
                                {{-- @todo 全选checkbox--}}
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" title="" @change="changeCheckbox(1)">
                                    <label for="platformAll">全选</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" title="" @change="changeCheckbox(2)">
                                    <label for="platformWeibo">微博</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" title="" @change="changeCheckbox(3)">
                                    <label for="platformDouyin">抖音</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" title="" @change="changeCheckbox(4)">
                                    <label for="platformXHS">百科</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" title="" @change="changeCheckbox(5)">
                                    <label for="platformXHS">其他</label>
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">微博主页地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="weiboUrl">
                            </div>
                            <div class="col-md-3 text-right float-left">微博粉丝数</div>
                            <div class="col-md-3 float-left pl-0">
                                <input type="text" class="form-control" v-model="weiboFansNum">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">百科地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="baikeUrl">
                            </div>
                            <div class="col-md-3 text-right float-left">百科粉丝数</div>
                            <div class="col-md-3 float-left pl-0">
                                <input type="text" class="form-control" v-model="baikeFansNum">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">抖音ID</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="douyinId">
                            </div>
                            <div class="col-md-3 text-right float-left">抖音粉丝数</div>
                            <div class="col-md-3 float-left pl-0">
                                <input type="text" class="form-control" v-model="douyinFansNum">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">其他地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="qitaUrl">
                            </div>
                            <div class="col-md-3 text-right float-left">其他地址粉丝数</div>
                            <div class="col-md-3 float-left pl-0">
                                <input type="text" class="form-control" v-model="qitaFansNum">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">沟通状态</div>
                            <div class="col-md-3 float-left pl-0">
                                <selectors :options="taiyangCommunicationStatusArr"
                                           @change="changeCommunicationType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">与我司签约意向</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" :placeholder="'请选择签约意向'"
                                           @change="changeSignIntention"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="!signIntention">
                                <textarea name="" class="form-control" rows="1" placeholder="请填写不签约理由"
                                          v-model="notSignReason"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">是否签约其他公司</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" :placeholder="'请选择是否签约其他公司'"
                                           @change="isSignCompany"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="signCompany == 1">
                                <input type="text" class="form-control" placeholder="请输入已签约公司名称">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">上传附件</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="attachmentTypeArr" :placeholder="'请选择附件类型'"
                                           @change="changeAttachmentType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入备注" v-model="artistDesc">
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

    <script src="{{ mix('js/taiyang.index.js') }}"></script>

@endsection






