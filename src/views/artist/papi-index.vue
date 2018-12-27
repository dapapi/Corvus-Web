<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">博主管理</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right" style="z-index:1000">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" >导入</a>
                    <a class="dropdown-item" role="menuitem" >导出</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" :data-target="selectedArtistsArr.length>0&&'#giveBroker'" @click="judge">分配制作人</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入博主昵称"
                               style="width: 220px" v-model="blogName" @blur='getArtists()'>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="artistTypeArr" @change="typeFilter" placeholder="请选择博主分类"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="papiCommunicationStatusArr" @change="CommunicationStatus" placeholder="请选择沟通状态"></selectors>
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
                                <th class="cell-300" scope="col">沟通状态</th>
                                <th class="cell-300" scope="col">制作人</th>
                                <th class="cell-300" scope="col">录入时间</th>
                                <th class="cell-300" scope="col">最后跟进时间</th>
                            </tr>
                            <tbody>
                            
                            <tr v-for="artist in artistsInfo" :key="artist.id" class="pointer-content">
                                <td>
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-item" type="checkbox" :id="'row-' + artist.id"
                                               :value="artist.id" @change="selectArtists(artist.id)">
                                        <label :for="'row-' + artist.id"></label>
                                    </span>
                                </td>
                                <td @click="redirectArtistDetail(artist.id)">{{ artist.nickname
                                    }}
                                </td>
                                <td>{{ artist.type.data.name }}</td>
                                <td>
                                    <template v-if="artist.communication_status">
                                        <span :style="{color:papiCommunicationStatusArr.find(item => item.value ==
                                            artist.communication_status).color}">
                                            {{ papiCommunicationStatusArr.find(item => item.value ==
                                            artist.communication_status).name}}
                                        </span>
                                        
                                    </template>
                                </td>
                                <td >
                                    <span v-for="(v,index) in artist.publicity.data" :key="index">
                                        {{v.name}}
                                    </span>
                                </td>
                                <td>{{artist.created_at}}</td>
                                <td v-for="(v,index) in artist.operatelogs.data" :key="index">{{v.created_at}}</td>
                            </tr>
                            
                            </tbody>
                            
                        </table>
                        <div class="col-md-1" style="margin: 6rem auto"  v-if="artistsInfo.length==0">
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
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
            </button>
        </div>

        <div class="modal fade" id="addArtist" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
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
                                 <CheckboxGroup :optionData="platformList" @change="changeCheckbox" :isLine="true">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.name}}</span>
                                    </template>
                                </CheckboxGroup>
                            </div>
                        </div>
                        
                        <div class="example" v-show="platformType.find(item => item ==1)">
                            <div class="col-md-2 text-right float-left">微博主页地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="star_weibo_infos.url">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时微博粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeWeiboFansNum" style="width:130px" ref="weibo"></number-spinner>
                            </div>
                        </div>
                        <div class="example" v-show="platformType.find(item => item ==2)">
                            <div class="col-md-2 text-right float-left">抖音ID</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="star_douyin_infos.url">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时抖音粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeDouyinFansNum" style="width:130px" ref="douyin"></number-spinner>
                            </div>
                        </div>
                        <div class="example" v-show="platformType.find(item => item ==3)">
                            <div class="col-md-2 text-right float-left">小红书链接</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="star_xiaohongshu_infos.url">
                            </div>
                            <div class="col-md-2 text-right float-left pl-0">签约时小红书粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeXHSFansNum" style="width:130px" ref="xiaohongshu"></number-spinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="artistTypeArr" @change="changeArtistType" ref="papitype"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">沟通状态</div>
                            <div class="col-md-3 float-left pl-0">
                                <selectors :options="papiCommunicationStatusArr"
                                           @change="changeCommunicationType" ref="communicationType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">与我司签约意向</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" @change="changeSignIntention" ref="signIntention"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="signIntention === '0'">
                                <textarea name="" rows="1" class="form-control" placeholder="请填写不签约理由"
                                          v-model="intention_desc"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">是否签约其他公司</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" @change="isSignCompany" ref="isSign"></selectors>
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
        <div class="modal fade" id="giveBroker" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">分配制作人</h4>
                    </div>
                    <div class="modal-body">
                        <ListSelectMember :listName="'成员列表'" :selectName="'已选择成员'" :type="'change'"></ListSelectMember>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="giveBroker()">确定</button>
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
                yesOrNoArr:[
                    {
                        name: '是',
                        value: '1'
                    },
                    {
                        name: '否',
                        value: '0'
                    }
                ],
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
                platformType: [],//平台类型
                signIntention: '',
                signCompany: '',
                artistDesc: '',
                artistTypeArr: [],
                artistTypeId:'',
                signCompanyName: '',
                companyCityArr: config.companyCityArr,
                trailFilter: '',
                userData: '',
                communicationArr: '',
                communication: '',
                intention_desc: '',
                typeF: '',
                statusF: '',
                checkboxedone: '',
                checkboxtow: '',
                checkboxedthree: '',
                checkoutfix: '',
                filetData: {
                    include: 'type,creator,tasks,affixes,producer',
                },
                filterObject:{
                    include:'type,creator,tasks,affixes,producer',
                },
                platformList:[
                    {
                        value:1,
                        name:'微博'
                    },
                    {
                        value:2,
                        name:'抖音'
                    },
                    {
                        value:3,
                        name:'小红书'
                    },
                ],
                star_douyin_infos:{
                    // open_id:1,
                    url:'',
                    // nickname:'',
                    avatar:'',
                },
                star_weibo_infos:{
                    // open_id:2,
                    url:'',
                    // nickname:'',
                    avatar:'',
                },
                star_xiaohongshu_infos:{
                    // open_id:3,
                    url:'',
                    // nickname:'',
                    avatar:'',
                },
                blogCommunication:'',//沟通状态
                bolgType:'',//博主类型
                blogName:'',//博主名称
                blogStatus:1,//博主状态
                selectedArtistsArr: [],
            }
        },
        watch:{
            platformType:function(){
                return  this.platformType
            }
        },
        mounted() {
            this.getArtists();
            this.getBlogType() //获取博主类型
            $('table').asSelectable();
             let _this = this;
             $('#addArtist').on('hidden.bs.modal',function() {
                 
                    _this.artistName='';//昵称
                    _this.star_weibo_infos.url='';//微博地址
                    _this.$refs.weibo.setValue('0');//微博粉丝
                    _this.star_douyin_infos.url='';//抖音地址
                    _this.$refs.douyin.setValue('0');//抖音粉丝
                    _this.star_xiaohongshu_infos.url='';//小红书地址
                    _this.$refs.xiaohongshu.setValue('0')//小红书粉丝
                    _this.$refs.papitype.setValue('')//类型
                    _this.$refs.communicationType.setValue('')//沟通类型 
                    _this.$refs.signIntention.setValue('')//我公司意向
                    _this.$refs.isSign.setValue('')//其他公司意向 
                    _this.artistDesc='';//备注
                    _this.platformType=[];
             })
        },
        methods: {
            getArtists: function (page = 1,signStatus) {
                let data={
                    include:'type,creator,tasks,affixes,producer,publicity,operatelogs',
        
                }
                let _this = this;
                
                //博主状态
                if(signStatus){
                    this.blogStatus = signStatus
                }
                data.status = this.blogStatus
                //博主类型
                if(this.bolgType){
                    data.type = this.bolgType
                }
                //沟通状态
                if(this.blogCommunication){
                    data.communication_status = this.blogCommunication
                }
                //博主名称
                if(this.blogName){
                    data.name = this.blogName
                }
                data.page = page
                fetch('get', '/bloggers', data).then(function (response) {
                    
                    _this.artistsInfo = response.data;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                });
            },

            //获取博主类型
            getBlogType(){
                let _this = this
                fetch('get','/bloggers/gettype').then(function(response){    
                    let data = {
                        id:'',
                        name:'全部'
                    }  
                    _this.artistTypeArr = response.data
                    _this.artistTypeArr.unshift(data) 
                    
                })
            },
            //选择博主类型
            typeFilter(value){
                this.bolgType  = value
                this.getArtists()
                
            },
            //沟通状态
            CommunicationStatus(value){
                this.blogCommunication  = value
                this.getArtists()
            },
            customize: function (value) {

            },
            changeArtistStatus: function (value) {
                this.artistStatus = value
            },

            changeCheckbox: function (value) {
                this.platformType = []
                for (let i = 0; i < value.length; i++) {
                    this.platformType.push(value[i].value)
                }
            },

            changeCommunicationType: function (value) {
                this.communication = value

            },

            changeSignIntention: function (value) {
                
                this.signIntention = value  
                
              
            },

            isSignCompany: function (value) {
            
                this.signCompany = value  
               
            },

            changeWeiboFansNum: function (value) {
                this.star_weibo_infos.avatar = value
            },

            changeDouyinFansNum: function (value) {
                this.star_douyin_infos.avatar = value
            },

            changeXHSFansNum: function (value) {
                this.star_xiaohongshu_infos. avatar= value
            },
             changeArtistType: function (value) {
                this.artistTypeId=value
            },
            addArtist: function () {
                let _this=this;
                if(!this.artistName){
                    toastr.error('请输入博主名称');
                    return false
                }
                let platform = this.platformType.join(',');
                let data = {
                    //微博,抖音,小红书
                    nickname: this.artistName,
                    gender: this.artistGender,
                    type_id: this.artistTypeId,
                    communication_status: this.communication,
                    intention: this.signIntention,
                    intention_desc: this.intention_desc,
                    sign_contract_other: this.signCompany,
                    sign_contract_other_name: this.signCompanyName,
                    desc:this.artistDesc,
                    platform:platform,//平台id
                    star_douyin_infos:this.star_douyin_infos,
                    star_weibo_infos:this.star_weibo_infos,
                    star_xiaohongshu_infos:this.star_xiaohongshu_infos,
                    
                };
                fetch('post', '/bloggers', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addArtist').modal('hide');
                    _this.getArtists()

                })

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
            },


            redirectArtistDetail: function (artistId) {
                this.$router.push({path: 'blogger/' + artistId})
            },
            //分配制作人
            giveBroker:function(){
               
                let _this = this
                let data = {}
                data = {
                    person_ids:[],
                    del_person_ids:[],//删除
                    moduleable_ids:this.selectedArtistsArr,//
                    moduleable_type:'blogger',
                    type:4, //制作人
                }
                for (let  i= 0;  i< this.$store.state.participantsInfo.length; i++) {
                    data.person_ids.push(this.$store.state.participantsInfo[i].id)
                    
                }
                fetch('post', 'distribution/person', data).then(function (response) {
                    if(_this.selectedArtistsArr.length==0){
                        return  false
                    }
                    toastr.success('分配制作人成功')
                    $('#giveBroker').modal('hide')
                    _this.getArtists()
                    _this.$store.state.participantsInfo = []
                    _this.selectedArtistsArr=[]
                })
               
            },
            judge(){
                 if(this.selectedArtistsArr.length==0){
                        toastr.error('请先选择博主，再进行分配')
                        $('#giveBroker').modal('hide')
                        this.$store.state.participantsInfo = []
                        return  false
                    }
            }
        }
    }
</script>
<style lang="scss" scoped>
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
    #giveBroker .modal-body{
        padding:0px;
    }
    #giveBroker .assistor{
        position: relative;
        border:0px
    }
</style>




