<template>
    <div class="page">

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
                        <input type="text" v-model="listData.name" class="form-control" id="inputPlaceholder" placeholder="请输入项目昵称"
                               style="width: 220px" @blur="getArtists"> 
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="artistStatusArr" :placeholder="'请选择沟通状态'" @change="getStatus"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="artistSourceArr" :placeholder="'请选择艺人来源'" @change="getSource"></selectors>
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
                        <li class="nav-item" role="presentation" @click="getArtists(1,1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">签约中</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtists(1,2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已签约</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtists(1,3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已解约</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                        <table v-if="artistsInfo.length>0" class="table table-hover" data-plugin="selectable" data-row-selectable="true">
                            <tr class="">
                                <th class="w-50">
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox" :checked="isSelectAll"
                                                   @change="selectArtists('all')">
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
                            </tr>
                            <tbody >
                                <tr  v-for="artist in artistsInfo">
                                    <td>
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-item" type="checkbox" :id="'row-' + artist.id"
                                                :value="artist.id" @change="selectArtists(artist.id)">
                                            <label :for="'row-' + artist.id"></label>
                                        </span>
                                    </td>
                                    <td class="pointer-content" @click="redirectArtistDetail(artist.id)">
                                        {{ artist.name }}
                                    </td>
                                    <td>{{artist.birthday|jsGetAge}}</td>
                                    <td>
                                        <template v-if="artist.source">
                                            {{ artistSourceArr.find(item => item.value == artist.source).name}}
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="artist.communication_status">
                                            {{ taiyangCommunicationStatusArr.find(item => item.value ==
                                            artist.communication_status).name}}
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="artist.sign_contract_status ==1">签约中</template>
                                        <template v-if="artist.sign_contract_status ==2">已签约</template>
                                        <template v-if="artist.sign_contract_status ==3">已解约</template>
                                        <!-- {{ artistSourceArr.find(item => item.value == artist.source).name}} -->
                                    </td>
                                    <td>{{artist.created_at}}</td>
                                    <td>{{artist.updated_at}}</td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <div v-else class="col-md-1" style="margin: 6rem auto">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                             
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
                                <selectors :options="artistSourceArr" placeholder="请选择艺人来源"
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
                                <!-- todo 全选 -->
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input id="platformAll" type="checkbox" name="platform" title=""
                                           @change="changeCheckbox(1)">
                                    <label for="platformAll">全选</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input id="platformWeibo" type="checkbox" name="platform" title=""
                                           @change="changeCheckbox(2)">
                                    <label for="platformWeibo">微博</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input id="platformDouyin" type="checkbox" name="platform" title=""
                                           @change="changeCheckbox(3)">
                                    <label for="platformDouyin">抖音</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input id="platformBK" type="checkbox" name="platform" title=""
                                           @change="changeCheckbox(4)">
                                    <label for="platformBK">百科</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input id="platformOther" type="checkbox" name="platform" title=""
                                           @change="changeCheckbox(5)">
                                    <label for="platformOther">其他</label>
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
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        data: function () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                genderArr: config.genderArr,
                artistSourceArr: config.artistSourceArr,
                customizeInfo: config.customizeInfo,
                projectStatus: config.projectStatus,
                yesOrNoArr: config.yesOrNoArr,
                artistStatusArr: config.artistStatusArr,
                taiyangCommunicationStatusArr: config.taiyangCommunicationStatusArr,
                attachmentTypeArr: config.attachmentTypeArr,
                artistEmail: '',
                artistPhone: '',
                artistWeiXin: '',
                artistsInfo: '',
                artistStatus: '',
                artistName: '',
                artistGender: '',
                artistBirthday: '',
                artistSource: '',
                artistType: '',
                communicationStatus: '',
                weiboUrl: '',
                weiboFansNum: '',
                douyinId: '',
                douyinFansNum: '',
                xhsUrl: '',
                xhsFansNum: '',
                platformType: '',
                signIntention: 1,
                signCompany: '',
                artistDesc: '',
                baikeUrl: '',
                baikeFansNum: '',
                qitaUrl: '',
                qitaFansNum: '',
                artistScoutName: '',
                artistLocation: '',
                notSignReason: '',
                selectedArtistsArr: [],
                isSelectAll: false,
                listData:{
                    include:'broker,creator',
                    name:'',
                    sign_contract_status:1,//  签约状态
                    communication_status:'', //沟通状态
                    source:'', // 艺人来源
                }
            }
        },

        mounted() {
            this.getArtists();
            $('table').asSelectable();
        },

        methods: {

            //获取沟通状态
            getStatus:function(value){
                this.listData.communication_status = value
                this.getArtists()
            },
            //获取艺人来源
            getSource:function(value){
                this.listData.source = value
                this.getArtists()
            },
            //查询列表
            getArtists: function (page = 1,signStatus) {
                let _this = this;
                if(signStatus){
                    this.listData.sign_contract_status = signStatus
                }
                this.listData.page=page
                fetch('get', '/stars', this.listData).then(function (response) {
                    _this.artistsInfo = response.data;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                    $('table').asSelectable('_trigger');
                })
            },
            
            customize: function (value) {

            },

            changeArtistStatus: function (value) {
                this.artistStatus = value
            },

            changeCheckbox: function (value) {
                this.platformType = value
            },

            changeCommunicationType: function (value) {
                this.communicationStatus = value
            },

            changeSignIntention: function (value) {
                this.signIntention = parseInt(value)
            },

            isSignCompany: function (value) {
                this.signCompany = value
            },

            changeGender: function (value) {
                this.artistGender = value
            },

            changeBirthday: function (value) {
                this.artistBirthday = value
            },

            changeSource: function (value) {
                this.artistSource = value
            },
      
            addArtist: function () {
                let data = {
                    name: this.artistName,
                    gender: this.artistGender,
                    birthday: this.artistBirthday,
                    source: this.artistSource,
                    email: this.artistEmail,
                    phone: this.artistPhone,
                    wechat: this.artistWeiXin,
                    communication_status: this.communicationStatus,
                    intention: this.signIntention,
                    intention_desc: this.notSignReason,
                    sign_contract_other: this.signCompany,
                };
                let _this = this;
                fetch('post', '/stars', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addArtist').modal('hide');
                    _this.$router.push({path: 'artists/' + response.data.id});
                })
            },

            changeAttachmentType: function (value) {

            },

            redirectArtistDetail: function (artistId) {
                this.$router.push({path: 'artists/' + artistId});
            },

            selectArtists: function (value) {
                if (value === 'all') {
                    this.selectedArtistsArr = [];
                    for (let i = 0; i < this.artistsInfo.length; i++) {
                        this.selectedArtistsArr.push(this.artistsInfo[i].id)
                    }
                } else {
                    let index = this.selectedArtistsArr.indexOf(value);
                    if (index > -1) {
                        this.selectedArtistsArr.splice(index, 1)
                    } else {
                        this.selectedArtistsArr.push(value)
                    }
                }
            }
        },
        filters:{
            jsGetAge:function(strBirthday){
                if(strBirthday){
                    var returnAge;
                    // 根据生日计算年龄（"1995-09-25"）
                    //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
                    var strBirthdayArr=strBirthday.split("-");
                    var birthYear = strBirthdayArr[0];
                    var birthMonth = strBirthdayArr[1];
                    var birthDay = strBirthdayArr[2];

                    var d = new Date();
                    var nowYear = d.getFullYear();
                    var nowMonth = d.getMonth() + 1;
                    var nowDay = d.getDate();

                    if(nowYear == birthYear){
                        returnAge = 0;//同年 则为0岁
                    }
                    else{
                        var ageDiff = nowYear - birthYear ; //年之差
                        if(ageDiff > 0){
                        if(nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay;//日之差
                            if(dayDiff < 0)
                            {
                            returnAge = ageDiff - 1;
                            }
                            else
                            {
                            returnAge = ageDiff ;
                            }
                        }
                        else
                        {
                            var monthDiff = nowMonth - birthMonth;//月之差
                            if(monthDiff < 0)
                            {
                            returnAge = ageDiff - 1;
                            }
                            else
                            {
                            returnAge = ageDiff ;
                            }
                        }
                        }
                        else
                        {
                        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                        }
                    }
                    return returnAge;//返回周岁年龄
                }else{
                    return strBirthday
                }
                
                
               
            },
        }
    }
</script>

<style>
    .task-dropdown {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2;
    }

    .task-dropdown-item {
        position: absolute;
        transform: translate3d(299px, 36px, 0px);
        top: 0;
        left: 0;
        will-change: transform;
    }
</style>
