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
                    </ul>
                </div>

                <div class="tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                        <div class="clearfix my-20">
                            <div class="col-md-3 example float-left">
                                <input type="text" v-model="number" class="form-control"
                                       placeholder="请输入合同编号" @keyup.enter='filterGo(number)' @blur='filterGo(number)'
                                       >
                            </div>
                            <div class="col-md-3 example float-left">
                                <selectors  placeholder="请选择项目类型" @change="typeFilter"
                                          :options='platformLists' ></selectors>
                            </div>
                            <div class="col-md-3 example float-left">
                                <!-- <selectors  placeholder="请选择项目名称"
                                          ></selectors> -->
                                <input type="text" class="form-control" @keyup.enter='filterGo(keyword)' @blur='filterGo(keyword)'
                                       placeholder="请输入项目名称" v-model="keyword"
                                       >
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
                                <th class="cell-300" scope="col">合同名称</th>
                                <th class="cell-300" scope="col">合同类型</th>
                                <th class="cell-300" scope="col">创建人</th>
                                <th class="cell-300" scope="col">创建时间</th>
                                <th class="cell-300" scope="col">审批状态</th>
                            </tr>
                            <tbody>

                            <tr v-for="(item,index) in pageList" :key="index" class="pointer-content">
                                <td @click="redirectContractDetail(item.form_instance_number)">{{item.contract_number}}</td>
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
                    <div class="tab-pane animation-fade " id="forum-blogger" role="tabpanel">
                        <div class="clearfix my-20">
                            <div class="col-md-3 example float-left">
                                <input type="text" class="form-control"  placeholder="请输入合同编号"
                                       v-model="number" @keyup.enter='filterGo(number)' @blur='filterGo(number)' >
                            </div>
                            <!-- <div class="col-md-3 example float-left" v-if="currentStatus == 'project'">
                                <selectors  @change="typeFilter" 
                                           placeholder='请选择项目类型'></selectors>
                            </div> -->
                            <div class="col-md-3 example float-left" v-if="currentStatus == 'economic'">
                                <!-- <selectors  @change="typeFilter" 
                                           placeholder="请输入艺人名称'"></selectors> -->
                               <input type="text" class="form-control" @keyup.enter='filterGo(keyword)' @blur='filterGo(keyword)'
                                       placeholder="请输入项目名称" v-model="keyword"
                                       >
                            </div> 
                            <div class="col-md-3 example float-left">
                                <selectors  @change="typeFilter" :options='talentArr'
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

        <customize-filter ref='customize' :data="customizeInfo" @change="customize"></customize-filter>
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
                weiboFansNum: '',
                platformType: [],//平台类型
                signIntention: '',
                signCompany: '',
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
                        value: '',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '影视项目'
                    },
                    {
                        value: 2,
                        name: '综艺项目'
                    },
                    {
                        value: 3,
                        name: '商务项目'
                    },
                ],
                talentArr: [
                    {
                        value: '',
                        name: '全部'
                    },
                    {
                        value: 'stars',
                        name: '艺人'
                    },
                    {
                        value: 'bloggers',
                        name: '博主'
                    }
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
                artistType: '',
                communicationStatus: '',
                weiboUrl: '',
                weiboFansNum: '',
                // platform:[],
                platformType: [],
                signIntention: '',
                signCompany: '',
                sign_contract_other_name: '',
                baikeUrl: '',
                baikeFansNum: '',
                selectAllStars: false,
                bloggerInfo: '',
                affixes: [],
                affixesType: '',//附件类型
                isShow: '',
                projectProgress:PROJECT_CONFIG.approvalProgress,
                currentStatus:'project',
                customizeCondition:{},
                fetchData: {},
                contractFilter:'',
                keyword:'',
                number:'',

            }
        },
        watch: {
            platformType: function () {
                return this.platformType
            },
            currentStatus:function(){
                this.keyword = '',
                this.number = '',
                this.fetchData = {}
                this.customizeCondition={},
                this.$refs.customize.reset()
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
            filterGo(params) {
                this.fetchData.keyword = this.keyword
                this.fetchData.number = this.number
                this.fetchHandler('post', '/'+this.typeHandler+'/filter', 'filter')
                // this.fetchHandler('get', '/trails/filter')

            },
            typeFilter(value){
                this.fetchData.type = value
                this.fetchHandler('post', '/'+this.typeHandler+'/filter','filter')
            },
            // projectTypeFilter(value) {
            //     this.fetchData.type = value
            //     this.fetchHandler('post', '/'+this.typeHandler+'/filter','filter')
            // },
            fetchHandler(methods, url,type,pageNum = 1) {
                let _this = this,
                fetchData = this.fetchData,
                newUrl
                
                this.fetchData.include = 'include=principal,client,contact,recommendations,expectations'
                if(type=='filter'){
                    fetchData = this.customizeCondition 
                    let keyword,number,principal_ids,pagenumber
                    if(this.fetchData.keyword){
                        keyword = '&keyword='+this.fetchData.keyword
                    }else{
                        keyword = ''
                    }
                    if(this.fetchData.number){
                        number = '&number='+this.fetchData.number
                    }else{
                        number = ''
                    }
                     if(this.fetchData.type){
                        type = '&type='+this.fetchData.type
                    }else{
                        type = ''
                    }
                    pagenumber = '&page=' + pageNum
                    newUrl = url+'?'+this.fetchData.include+keyword+number+type+pagenumber
                }
                this.exportParams = {
                    keyword: this.fetchData.keyword,
                    status: this.fetchData.status,
                    principal_ids: this.fetchData.principal_ids,
                }
                fetch(methods, newUrl || url, fetchData).then((response) => {
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
            getProjects: function (pageNum = 1) {
                this.fetchHandler('post', '/trails/filter', 'filter',pageNum)

                // let _this = this
                // let data = {
                //     page: pageNum,
                //     // include: 'principal,trail.expectations',
                //     status:this.pageType
                // };
                // fetch('get', '/approvals_contract/'+this.currentStatus, data).then(response => {
                //     _this.pageList = response.data                    
                //    _this.total = response.meta.pagination.total;
                //         _this.current_page = response.meta.pagination.current_page;
                //         _this.total_pages = response.meta.pagination.total_pages;
                // })
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