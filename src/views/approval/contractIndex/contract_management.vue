<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">合同管理</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" style="position: relative;">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab" @click="getList('project')">项目合同</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab" @click="getList('economic')">经纪合同</a>
                        </li>
                        <!-- <i v-if="isShow"
                           style="position: absolute;right:10px;top:10px;color: rgb(0, 176, 255);font-style: normal;"
                           @click="getArtists(1,1)">签约中</i>
                        <i v-if="!isShow"
                           style="position: absolute;right:10px;top:10px;color: rgb(0, 176, 255);font-style: normal;"
                           @click="getBlogger(1,1)">签约中</i> -->
                    </ul>
                </div>

                <div class="tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade" id="forum-artist" role="tabpanel">
                        <div class="clearfix my-20">
                            <div class="col-md-3 example float-left">
                                <input type="text" v-model="listData.name" class="form-control"
                                       placeholder="请输入合同编号"
                                       >
                            </div>
                            <div class="col-md-3 example float-left">
                                <selectors  placeholder="请选择项目类型"
                                           ></selectors>
                            </div>
                            <div class="col-md-3 example float-left">
                                <selectors  placeholder="请选择项目名称"
                                          ></selectors>
                            </div>
                            <div class="col-md-3 example float-left" >
                                <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                                data-toggle="modal" data-target="#customizeContent"
                                data-placement="right" title="">
                                自定义筛选
                                </button>
                            </div>
                        </div>
                        <table class="table table-hover is-indent ml-5" data-plugin="selectable"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">合同编号</th>
                                <th class="cell-300" scope="col">项目名称</th>
                                <th class="cell-300" scope="col">合同类型</th>
                                <th class="cell-300" scope="col">创建人</th>
                                <th class="cell-300" scope="col">创建时间</th>
                                <th class="cell-300" scope="col">审批状态</th>
                            </tr>
                            <tbody>

                            <tr v-for="(item,index) in pageList" :key="index" class="pointer-content">
                                <td @click="redirectContractDetail(item.form_instance_number)">{{ item.contract_number }}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.title}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.form_name}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.name}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.created_at}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{getProgressName(item.form_status)}}</td>
                            </tr>
                            </tbody>

                        </table>
                        <div v-if="pageList.length === 0" style="margin: 6rem auto;width: 100px">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <pagination :current_page="current_page" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                    <div class="tab-pane animation-fade active" id="forum-blogger" role="tabpanel">
                        <div class="clearfix my-20">
                            <div class="col-md-3 example float-left">
                                <input type="text" class="form-control"  placeholder="请输入合同编号"
                                       v-model="blogName" >
                            </div>
                             <div class="col-md-3 example float-left" v-if="currentStatus == 'project'">
                                <selectors  @change="typeFilter" 
                                           placeholder='请选择项目类型'></selectors>
                            </div>
                            <div class="col-md-3 example float-left" v-if="currentStatus == 'economic'">
                                <selectors  @change="typeFilter" 
                                           placeholder="请输入艺人名称'"></selectors>
                            </div> 
                           
                            <div class="col-md-3 example float-left">
                                <selectors  @change="CommunicationStatus"
                                           placeholder="请选择Talent"></selectors>
                            </div>
                            <div class="col-md-3 example float-left" >
                                <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                                data-toggle="modal" data-target="#customizeContent"
                                data-placement="right" title="">
                                自定义筛选
                                </button>
                            </div>
                        </div>
                        <table class="table table-hover is-indent ml-5" data-plugin="selectable"
                               data-selectable="selectable">
                            <tr >
                                <!-- <th class="w-50">
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox"
                                                   @change="selectArtists('all')" v-model="selectAllBlogger">
                                            <label></label>
                                        </span>
                                </th> -->
                                <th class="cell-300" scope="col">合同编号</th>
                                <th class="cell-300" scope="col">合同名称</th>
                                <th class="cell-300" scope="col">合同类型</th>
                                <th class="cell-300" scope="col">创建人</th>
                                <th class="cell-300" scope="col">创建时间</th>
                                <th class="cell-300" scope="col">审批状态</th>
                            </tr>
                            <tbody>

                           <tr v-for="(item,index) in pageList" :key="index" class="pointer-content">
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.contract_number }}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.title}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.form_name}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.name}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.created_at}}</td>
                                <td @click="redirectContractDetail(item.form_instance_number)">{{getProgressName(item.form_status)}}</td>
                            </tr>

                            </tbody>

                        </table>
                        <div style="margin: 6rem auto;width: 100px" v-if="pageList.length==0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <pagination :current_page="current_page"  :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination>

                    </div>
                </div>

            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>
    </div>
</template>
<script>
    import fetch from '@/assets/utils/fetch.js'
    import config from '@/assets/js/config'
    import Cookies from 'js-cookie'
    import {PROJECT_CONFIG} from '@/views/approval/project/projectConfig.js'

    export default {
        data: function () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                customizeInfo: {},
                pageList: [],
                artistStatus: '',
                bolggerName: '',
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
                artistTypeId: '',
                signCompanyName: '',
                communicationArr: '',
                communication: '',
                uploadUrl: '',
                intention_desc: '',
                giveType: 1,
                filterObject: {
                    include: 'type,creator,tasks,affixes,producer',
                },
                platformLists: [
                    {
                        value: 1,
                        name: '微博'
                    },
                    {
                        value: 2,
                        name: '抖音'
                    },
                    {
                        value: 3,
                        name: '小红书'
                    },
                ],
                platformList: [
                    {
                        value: 1,
                        name: '微博'
                    },
                    {
                        value: 2,
                        name: '百科'
                    },
                    {
                        value: 3,
                        name: '抖音'
                    },
                    {
                        value: 4,
                        name: '其他'
                    },
                ],
                star_douyin_infos: {
                    url: '',
                    avatar: '',
                },
                star_weibo_infos: {
                    url: '',
                    avatar: '',
                },
                star_xiaohongshu_infos: {
                    url: '',
                    avatar: '',
                },
                blogCommunication: '',//沟通状态
                blogType: '',//博主类型
                blogName: '',//博主名称
                blogStatus: 2,//博主状态
                selectedArtistsArr: [],
                isLoading: true,
                selectAllBlogger: false,
                listData: {
                    include: 'broker,creator',
                    name: '',
                    sign_contract_status: 2,//  签约状态
                    communication_status: '', //沟通状态
                    source: '', // 艺人来源
                },
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
                // platform:[],
                platformType: [],
                signIntention: '',
                signCompany: '',
                sign_contract_other_name: '',
                artistDesc: '',
                baikeUrl: '',
                baikeFansNum: '',
                qitaUrl: '',
                qitaFansNum: '',
                artistScoutName: '',
                artistLocation: '',
                notSignReason: '',
                selectAllStars: false,
                bloggerInfo: '',
                affixes: [],
                affixesType: '',//附件类型
                isShow: '',
                projectProgress:PROJECT_CONFIG.approvalProgress,
                currentStatus:'project',
                customizeCondition:{},
                fetchData: {},
            }
        },
        watch: {
            platformType: function () {
                return this.platformType
            },
            currentStatus:function(){
                this.getField()
            }
        },
        mounted() {
            this.getField()
            this.getList('project')
        },
        computed:{
            getProgressName(){
                return function(params){
                   return  this.projectProgress.find(item=>item.id == params).value
                }
            },
            typeHandler(){
                if(this.currentStatus === 'project'){
                    return 'approvals_project'
                }else if(this.currentStatus === 'economic'){
                    return 'approvals_contract'
                }
            },
            statusHandler(){
                 if(this.currentStatus === 'project'){
                    return 'project'
                }else if(this.currentStatus === 'economic'){
                    return 'contract'
                }
            }
        },
        methods: {
            fetchHandler(methods, url,type) {
                let _this = this,
                fetchData = this.fetchData,
                newUrl
                this.fetchData.include = 'include=principal,client,contact,recommendations,expectations'
                if(type=='filter'){
                    fetchData = this.customizeCondition 
                    let keyword,status,principal_ids
                    if(this.fetchData.keyword){
                        keyword = '&keyword='+this.fetchData.keyword
                    }else{
                        keyword = ''
                    }
                    if(this.fetchData.status){
                        status = '&status='+this.fetchData.status
                    }else{
                        status = ''
                    }
                     if(this.fetchData.principal_ids){
                        principal_ids = '&principal_ids='+this.fetchData.principal_ids
                    }else{
                        principal_ids = ''
                    }
                    newUrl = url+'?'+this.fetchData.include+keyword+status+principal_ids
                }
                // console.log(this.fetchData)
                this.exportParams = {
                    keyword: this.fetchData.keyword,
                    status: this.fetchData.status,
                    principal_ids: this.fetchData.principal_ids,
                }
                fetch(methods, newUrl || url, fetchData).then((response) => {
                    console.log(response);
                    _this.pageList = response.data
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.isLoading = false;
                })
            },
            getField() {
                let _this = this
                fetch('get', '/'+this.statusHandler+'/filter_fields').then((params) => {
                    _this.customizeInfo = params.data
                })
            },
            getProjects: function (pageNum = 1, signStatus) {
                let _this = this
                let data = {
                    page: pageNum,
                    // include: 'principal,trail.expectations',
                    status:this.pageType
                };
                fetch('get', '/approvals_contract/'+this.currentStatus, data).then(response => {
                    _this.pageList = response.data                    
                   _this.total = response.meta.pagination.total;
                        _this.current_page = response.meta.pagination.current_page;
                        _this.total_pages = response.meta.pagination.total_pages;
                })
            },
            //查询列表
            getList: function (params) {
                this.currentStatus = params
                let _this = this;
                fetch('get', '/approvals_contract/'+this.currentStatus).then(function (response) {
                    _this.pageList = response.data
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.isLoading = false;
                })
            },
            //获取博主类型
            getBlogType() {
                let _this = this
                fetch('get', '/bloggers/gettype').then(function (response) {
                    let data = {
                        id: '',
                        name: '全部'
                    }
                    _this.artistTypeArr = response.data
                    _this.artistTypeArr.unshift(data)

                })
            },
            //选择博主类型
            typeFilter(value) {
                this.blogType = value
                // this.getBlogger()

            },
            //沟通状态
            CommunicationStatus(value) {
                this.blogCommunication = value
                // this.getBlogger()
            },
             customize: function (value) {
                 // let _this = this
                 console.log(value);
                this.customizeCondition = value
                this.fetchHandler('post', '/'+this.typeHandler+'/filter','filter')
                // fetch('post', '/trails/filter?include=principal,client,contact,recommendations,expectations', value).then((params) => {
                //     _this.trailsInfo = params.data
                //     _this.total = params.meta.pagination.total;
                //     _this.total_pages = params.meta.pagination.total_pages;
                //     _this.current_page = params.meta.pagination.current_page
                //     _this.cleanUp = true
                // })
            },
            changeArtistStatus: function (value) {
                this.artistStatus = value
            },
            //头像
            getUploadUrl(value) {
                this.uploadUrl = value
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
                this.star_xiaohongshu_infos.avatar = value
            },
            changeArtistType: function (value) {
                this.artistTypeId = value
            },
            selectArtists: function (value) {
                
                if (value === 'all') {
                    this.selectedArtistsArr = [];
                    for (let i = 0; i < this.bloggerInfo.length; i++) {
                        this.selectedArtistsArr.push(this.bloggerInfo[i].id)
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


            redirectContractDetail: function (params) {
                this.$router.push({path: '/approval/' + params})
            },
            changeMember: function (type) {
                this.giveType = type
            },
            //分配制作人
            // giveProducer: function () {

            //     let _this = this
            //     let data = {}
            //     data = {
            //         person_ids: [],
            //         del_person_ids: [],//删除
            //         moduleable_ids: this.selectedArtistsArr,//
            //         moduleable_type: 'blogger',
            //         type: 4, //制作人
            //     }
            //     for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
            //         data.person_ids.push(this.$store.state.participantsInfo[i].id)

            //     }
            //     fetch('post', 'distribution/person', data).then(function (response) {
            //         if (_this.selectedArtistsArr.length == 0) {
            //             return false
            //         }
            //         toastr.success('分配制作人成功')
            //         $('#giveProducer').modal('hide')
            //         _this.getBlogger()
            //         _this.$store.state.participantsInfo = []
            //         _this.selectedArtistsArr = []
            //     })

            // },
            judge() {
                if (this.selectedArtistsArr.length == 0) {
                    toastr.error('请先选择博主，再进行分配')
                    $('#giveProducer').modal('hide')
                    this.$store.state.participantsInfo = []
                    return false
                }
            },
            getStars: function () {
                let organization_id = JSON.parse(Cookies.get('user')).organization_id
                if (organization_id == 411) {
                    this.isShow = true
                } else if (organization_id == 412) {
                    this.isShow = false
                }
            },
            // tab:function(value){
            //     this.selectedArtistsArr = []
            //     if(value == 0){
            //         this.getArtists()

            //     } else if (value == 1) {
            //         this.getBlogger()

            //     }
            //     this.isShow = !this.isShow
            // },
            giveBroker: function () {
                let url, toast, data
                let _this = this
                if (this.selectedArtistsArr.length <= 0) {
                    toastr.error('请选择分配艺人')
                    return false
                }
                if (this.giveType == 1) {
                    url = 'distribution/person'
                    toast = '分配经理人成功'
                    data = {
                        person_ids: [],//经理人数组
                        del_person_ids: [],//删除
                        moduleable_ids: this.selectedArtistsArr,//艺人
                        moduleable_type: 'star',
                        type: 3,//经理人
                    }
                } else {
                    url = 'distribution/person'
                    toast = '分配宣传人成功'
                    data = {
                        person_ids: [],//宣传人数组
                        del_person_ids: [],//删除
                        moduleable_ids: this.selectedArtistsArr,//艺人
                        moduleable_type: 'star',
                        type: 2, //宣传人
                    }
                }

                for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                    data.person_ids.push(this.$store.state.participantsInfo[i].id)

                }
                fetch('post', url, data).then(function (response) {
                    toastr.success(toast)
                    $('#giveBroker').modal('hide')
                    _this.$store.state.participantsInfo = []
                })
            },
            cancelGiveBroker: function () {
                this.$store.state.participantsInfo = []
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

            changeGender: function (value) {
                this.artistGender = value
            },

            changeBirthday: function (value) {
                this.artistBirthday = value
            },

            changeSource: function (value) {
                this.artistSource = value
            },
            uploadAttachment: function (url, name, size) {
                for (let i = 0; i < this.affixes.length; i++) {
                    if (this.affixes[i].type == this.affixesType) {

                        this.affixes.splice(i, 1)
                    }

                }
                this.affixes.push({
                    title: name,
                    size: size,
                    url: url,
                    type: this.affixesType
                })
            },
        },
        filters: {
            jsGetAge: function (strBirthday) {
                if (strBirthday) {
                    var returnAge;
                    // 根据生日计算年龄（"1995-09-25"）
                    //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
                    var strBirthdayArr = strBirthday.split("-");
                    var birthYear = strBirthdayArr[0];
                    var birthMonth = strBirthdayArr[1];
                    var birthDay = strBirthdayArr[2];

                    var d = new Date();
                    var nowYear = d.getFullYear();
                    var nowMonth = d.getMonth() + 1;
                    var nowDay = d.getDate();

                    if (nowYear == birthYear) {
                        returnAge = 0;//同年 则为0岁
                    }
                    else {
                        var ageDiff = nowYear - birthYear; //年之差
                        if (ageDiff > 0) {
                            if (nowMonth == birthMonth) {
                                var dayDiff = nowDay - birthDay;//日之差
                                if (dayDiff < 0) {
                                    returnAge = ageDiff - 1;
                                }
                                else {
                                    returnAge = ageDiff;
                                }
                            }
                            else {
                                var monthDiff = nowMonth - birthMonth;//月之差
                                if (monthDiff < 0) {
                                    returnAge = ageDiff - 1;
                                }
                                else {
                                    returnAge = ageDiff;
                                }
                            }
                        }
                        else {
                            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                        }
                    }
                    return returnAge;//返回周岁年龄
                } else {
                    return strBirthday
                }
            },
        }
    }
</script>
<style>

</style>