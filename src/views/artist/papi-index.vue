<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">博主管理</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="">导入</a>
                    <a class="dropdown-item" role="menuitem" @click="">导出</a>
                    <a class="dropdown-item" role="menuitem" @click="">分配制作人</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入博主昵称"
                               style="width: 220px" v-model="trailFilter" @blur='filterGo'>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="artistTypeArr"
                                   :placeholder="'请选择博主类型'"  @change="typeFilter" v-model="typeF"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :placeholder="'请选择博主状态'" :options="papiCommunicationStatusArr" @change="CommunicationStatus" v-model="statusF"></selectors>
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
                        <li class="nav-item" role="presentation" @click="getArtists(2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已签约</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtists(3)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已解约</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="selectable"
                               data-selectable="selectable">
                            <tr>
                                <th class="w-50">
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox"
                                                   @change="selectArtists('all')">
                                            <label></label>
                                        </span>
                                </th>
                                <th class="cell-300" scope="col">昵称</th>
                                <th class="cell-300" scope="col">类型</th>
                                <th class="cell-300" scope="col">微博平台粉丝数</th>
                                <th class="cell-300" scope="col">与我司签约意向</th>
                                <th class="cell-300" scope="col">沟通状态</th>
                                <th class="cell-300" scope="col">制作人</th>
                                <th class="cell-300" scope="col">录入时间</th>
                            </tr>
                            <tbody>
                            <tr v-for="artist in artistsInfo" :key="artist.id" class="pointer-content" >
                                <td>
                                    <span class="checkbox-custom checkbox-primary" >
                                        <input class="selectable-item" type="checkbox" :id="'row-' + artist.id"
                                               :value="artist.id" @change="selectArtists(artist.id)">
                                        <label :for="'row-' + artist.id"></label>
                                    </span>
                                </td>
                                <td  @click="redirectArtistDetail(artist.id)">{{ artist.nickname
                                    }}
                                </td>
                                <td>{{ artist.type.name }}</td>
                                <td>暂无</td>
                                <td>
                                    <template v-if="artist.intention">是</template>
                                    <template v-else>否</template>
                                </td>
                                <td>
                                    <template v-if="artist.communication_status">
                                        {{ papiCommunicationStatusArr.find(item => item.value ==
                                        artist.communication_status).name}}
                                    </template>
                                </td>
                                <td>
                                    <template v-if="artist.producer">
                                        {{ artist.producer.data.name }}
                                    </template>
                                </td>
                                <td>{{artist.created_at.date}}</td>
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
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformAll" @change="changeCheckbox(1)" v-model="checkboxedone">
                                    <label for="platformAll">全选</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformWeibo"
                                           @change="changeCheckbox(2)" v-model="checkboxtow">
                                    <label for="platformWeibo">微博</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformDouyin"
                                           @change="changeCheckbox(3)" v-model="checkboxedthree">
                                    <label for="platformDouyin">抖音</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformXHS" @change="changeCheckbox(4)" v-model="checkoutfix">
                                    <label for="platformXHS">小红书</label>
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="artistTypeArr" :placeholder="'请选择类型'"
                                           @change="changeArtistType"></selectors>
                            </div>
                        </div>
                        <div class="example" v-if="checkboxtow">
                            <div class="col-md-2 text-right float-left">微博主页地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="weiboUrl">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时微博粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeWeiboFansNum" style="width:130px"></number-spinner>
                            </div>
                        </div>
                        <div class="example" v-if="checkboxedthree">
                            <div class="col-md-2 text-right float-left">抖音ID</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="douyinId">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时抖音粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeDouyinFansNum" style="width:130px"></number-spinner>
                            </div>
                        </div>
                        <div class="example" v-if="checkoutfix">
                            <div class="col-md-2 text-right float-left">小红书链接</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="xhsUrl">
                            </div>
                            <div class="col-md-2 text-right float-left pl-0">签约时小红书粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeXHSFansNum" style="width:130px"></number-spinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">沟通状态</div>
                            <div class="col-md-3 float-left pl-0">
                                <selectors :options="papiCommunicationStatusArr"
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
                                <textarea name="" rows="1" class="form-control" placeholder="请填写不签约理由"
                                          v-model="intention_desc"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">是否签约其他公司</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" :placeholder="'请选择是否签约其他公司'"
                                           @change="isSignCompany"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="signCompany == 1">
                                <input type="text" class="form-control" placeholder="请输入已签约公司名称"
                                       v-model="signCompanyName">
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
                customizeInfo: config.customizeInfo,
                projectStatus: config.projectStatus,
                yesOrNoArr: config.yesOrNoArr,
                artistStatusArr: config.artistStatusArr,
                papiCommunicationStatusArr: config.papiCommunicationStatusArr,
                artistsInfo: '',
                artistStatus: '',
                artistName: '',
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
                artistTypeArr: '',
                artistTypeId:'',
                signCompanyName: '',
                companyCityArr:config. companyCityArr,
                trailFilter:'',
                userData:'',
                communicationArr:'',
                communication:'',
                intention_desc:'',
                typeF:'',
                statusF:'',
                checkboxedone:'',
                checkboxtow:'',
                checkboxedthree:'',
                checkoutfix:''
            }
        },

        mounted() {
            this.getArtists();
            this.getUser();
            $('table').asSelectable();
        },

        methods: {
            getArtists: function (page = 1) {
                let data = {
                    page: page,
                    include:'creator,tasks,affixes,producer'
                };
                let _this = this;
                fetch('get', '/bloggers', data).then(function (response) {
                    
                    _this.artistsInfo = response.data;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                    console.log(response.data) 
                });
                fetch('get','/bloggers/gettype').then(function(response){ 
                   
                    _this.artistTypeArr=response.data  
                    
                })
            },
            filterGo(){
                
                let _this = this;
                fetch('get','/bloggers?name='+ this.trailFilter).then(function(response){
                    
                     _this.artistsInfo = response.data
                })
              
            },
            typeFilter(value){
                this.typeF=value;
                let _this = this;
                fetch('get','/bloggers?type='+ this.typeF).then(function(response){
                     _this.artistsInfo = response.data
                })
            },
            CommunicationStatus(value){
                this.statusF=value;
                let _this = this;
                fetch('get','/bloggers?communication_status='+ this.statusF).then(function(response){
                     _this.artistsInfo = response.data
                })
            },
            customize: function (value) {

            },
            getUser(){
                let _this = this;
                fetch('get', '/users').then(function (response) {
                    _this.userData = response.data
                })
            },
            changeArtistStatus: function (value) {
                this.artistStatus = value
            },

            changeCheckbox: function (value) {
                 
                this.platformType = value
            },

            changeCommunicationType: function (value) {
                this.communication=value
           
            },

            changeSignIntention: function (value) {
                if(value){
                    this.signIntention = value  
                }else{
                    this.signIntention = 0
                }
                console.log( this.signIntention )
              
            },

            isSignCompany: function (value) {
                 
                if(value){
                    this.signCompany = value  
                }else{
                    this.signCompany = 0
                }
               console.log(this.signCompany)
            },

            changeWeiboFansNum: function (value) {
                this.weiboFansNum = value
            },

            changeDouyinFansNum: function (value) {
                this.douyinFansNum = value
            },

            changeXHSFansNum: function (value) {
                this.xhsFansNum = value
            },
             changeArtistType: function (value) {
                this.artistTypeId=value
                console.log(this.artistTypeId)
            },
            addArtist: function () {
                let _this=this;
                let data = {
                    // 没有平台,微博,抖音,小红书
                    nickname: this.artistName,
                    gender: this.artistGender,
                    type_id: this.artistTypeId,
                    communication_status: this.communication,
                    intention: this.signIntention,
                    intention_desc: this.intention_desc,
                    sign_contract_other: this.signCompany,
                    sign_contract_other_name: this.signCompanyName,
                    desc:this.artistDesc,
                    
                };
                fetch('post', '/bloggers', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addArtist').modal('hide');
                    _this.getArtists()
                 
                })
                
            },

            selectArtists: function (value) {
                console.log(value)
                if (value === 'all') {
                    this.selectedArtistsArr = [];
                    for (let i = 0; i < this.artistsInfo.length; i++) {
                        this.selectedArtistsArr.push(this.artistsInfo[i].id)
                    }
                } else {
                    console.log(this.selectedArtistsArr)
                    let index = this.selectedArtistsArr.indexOf(value);
                    if (index > -1) {
                        this.selectedArtistsArr.splice(index, 1)
                    } else {
                        this.selectedArtistsArr.push(value)
                    }
                }
            },

           

            redirectArtistDetail: function (artistId) {
                this.$router.push({path: 'blogger/' + artistId})
            }
        }
    }
</script>






