<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered" style="z-index: 10">
            <h1 class="page-title">线索公海池管理</h1>
            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="receiveTrails">领取</a>
                    <a class="dropdown-item" role="menuitem" @click="showAllotContent">分配</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入销售线索名称"
                               v-model="trailFilter" @keyup.enter='filterGo' @blur='filterGo'>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="publicTrailTypeArr" @change="searchTrailType"
                                   placeholder="请选择所属公海"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="publicTrailTakeType" @change="progressStatusFilter"
                                   placeholder="请选择线索状态"></selectors>
                    </div>
                    <!--<div class="col-md-3 example float-left">-->
                    <!--<button type="button" class="btn btn-default waves-effect waves-classic float-right"-->
                    <!--data-toggle="modal" data-target="#customizeContent"-->
                    <!--data-placement="right" title="">-->
                    <!--自定义筛选-->
                    <!--</button>-->
                    <!--</div>-->
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getTrails(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">所有线索</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getTrails(1, 1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">未被领取</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="w-50">
                                <span class="checkbox-custom checkbox-primary">
                                    <input class="selectable-all" type="checkbox"
                                           @change="selectTrail('all')" v-model="selectAllTrail">
                                    <label></label>
                                </span>
                                </th>
                                <th class="cell-300" scope="col">线索名称</th>
                                <th class="cell-300" scope="col">所属公海</th>
                                <th class="cell-300" scope="col">负责人</th>
                                <th class="cell-300" scope="col">领取状态</th>
                                <th class="cell-300" scope="col">创建人</th>
                                <th class="cell-300" scope="col">最近跟进时间</th>
                            </tr>
                            <tbody>
                            <tr class="pointer-content" v-for="trail in trailsInfo" :key='trail.id'>
                                <td>
                                <span class="checkbox-custom checkbox-primary">
                                    <input class="selectable-item" type="checkbox" :id="'row-' + trail.id"
                                           :value="trail.id" @change="selectTrail(trail.id)">
                                    <label :for="'row-' + trail.id"></label>
                                </span>
                                </td>
                                <td @click="goDetail(trail.id)">{{ trail.title }}</td>
                                <td @click="goDetail(trail.id)">
                                    <template v-if="publicTrailTypeArr.find(item => item.value == trail.pool_type)">
                                        {{ publicTrailTypeArr.find(item => item.value == trail.pool_type).name }}
                                    </template>
                                </td>
                                <td @click="goDetail(trail.id)">
                                    <template v-if="trail.principal_name">
                                        {{ trail.principal_name.name }}
                                    </template>
                                </td>
                                <td @click="goDetail(trail.id)">
                                    <template v-if="publicTrailTakeType.find(item => item.value == trail.take_type)">
                                        {{ publicTrailTakeType.find(item => item.value == trail.take_type).name }}
                                    </template>
                                </td>
                                <td @click="goDetail(trail.id)">{{ trail.creator }}</td>
                                <td @click="goDetail(trail.id)">{{ trail.last_updated_at }}</td>
                            </tr>
                            </tbody>

                        </table>
                        <div style="margin: 6rem auto;width: 100px" v-if="trailsInfo.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <pagination :current_page="current_page" :method="getTrails" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>
            </div>
        </div>


        <customize-filter :data="customizeInfo" :stararr='starsArr' @change="customize" :cleanup="cleanUp"
                          @cleanupdone='cleanUp=false'></customize-filter>
        <AddClientType @change="changeTrailType"></AddClientType>

        <div class="modal fade" id="addTrail" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增销售线索</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-show="trailType != 4">
                            <div class="col-md-2 text-right float-left">合作类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="cooperationTypeArr" @change="changeCooperationType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">品牌名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入品牌名称"
                                       v-model="brandName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">公司名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <edit-company @change="changeCompanyName"></edit-company>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">线索名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入线索名称"
                                       v-model="trailName">
                            </div>
                        </div>
                        <div class="my-20 trial-origin clearfix">
                            <TrailOrigin class="require" :trailType='trailType'
                                         typeName='线索' alwaysShow='true'
                                         @changeTrailOrigin='changeTrailOrigin'
                                         @changeEmail='changeEmail'
                                         @changeTrailOriginPerson='changeTrailOriginPerson'/>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">行业</div>
                            <div class="col-md-10 float-left pl-0" v-if="industriesArr.length > 0">
                                <selectors ref='industries' :options="industriesArr"
                                           @change="changeIndustry"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input-selectors :placeholder="'请选择负责人'"
                                                 @change="changePrincipal" otherslot=true
                                                 :propSelectMemberName='$store.state.otherSlot.data?$store.state.otherSlot.data.name:currentUser.name'></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">目标艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" @valuelistener="changeTargetStars"
                                           :multiple="true"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">推荐艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" @valuelistener="changeRecommendStars"
                                           :multiple="true"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="priorityArr" @change="changePriority"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">联系人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入联系人"
                                       v-model="trailContact">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">联系人电话</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入联系电话"
                                       v-model="trailContactPhone" @blur='phoneValidate'>
                            </div>
                        </div>
                        <div class="example" v-show="trailType != 4">
                            <div class="col-md-2 text-right float-left">线索状态</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="trailStatusArr" @change="changeTrailStatus"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">销售进展</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" :placeholder="salesProgressText"
                                       disabled>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">预计订单收入</div>
                            <div class="col-md-5 float-left pl-0 pr-0">
                                <number-spinner @change="changeTrailFee"></number-spinner>
                            </div>
                            <div class="col-md-3 float-left" v-if="trailType == 4">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="isLocked" @change="changeCheckbox">
                                    <label for="isLocked">锁价</label>
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea title="" class="form-control" v-model="trailDesc"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click='cleanTempData'>取消
                        </button>
                        <button class="btn btn-primary" type="submit" @click="addTrail">确定</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="addMembers" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple" style="max-width: 50rem;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i
                                aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">分配负责人</h4>
                    </div>
                    <div class="modal-body clearfix pt-10">
                        <ListSelectMember :type="'change'" isSingle="true"></ListSelectMember>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" @click="allotTrail">确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    import {mapState} from 'vuex'
    import Cookies from 'js-cookie'

    export default {
        data: function () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                trailsInfo: '',
                trailOrigin: '',
                trailType: '',
                trailTypeArr: config.trailTypeArr,
                companyType: config.companyType,
                publicTrailTypeArr: config.publicTrailTypeArr,
                publicTrailTakeType: config.publicTrailTakeType,
                companyArr: [],
                starsArr: [],
                customizeInfo: {},
                clientLevelArr: config.clientLevelArr,
                trailOriginArr: config.trailOrigin,
                salesProgressText: '未确定合作',
                cooperationTypeArr: config.cooperationTypeArr,
                trailStatusArr: config.trailStatusArr,
                selectCompany: '',
                trailName: '',
                targetStars: '',
                recommendStars: '',
                trailPrincipal: '',
                trailContact: '',
                trailContactPhone: '',
                trailFilter: '',
                email: '',
                trailFee: '',
                trailDesc: '',
                brandName: '',
                trailOriginPerson: '',
                industriesArr: [],
                industry: '',
                priority: '',
                priorityArr: config.priorityArr,
                trailStatus: '',
                cooperation: '',
                filterData: '',
                memberList: [],
                fetchData: {},
                currentUser: {},
                resetInfo: false,
                isLoading: true,
                cleanUp: false,
                selectAllTrail: false,
                selectedTrailsArr: [],
                keyword: '',
                take_type: '',
                pool_type: '',
            }
        },
        created() {
            this.getField();
            this.getCurrentUser()
        },
        mounted() {
            this.getTrails();
            this.getClients();
            this.getStars();
            this.getIndustries();
            $('table').asSelectable();
        },

        watch: {
            trailType: function () {
                this.trailOriginArr = config.trailOrigin;
                if (this.trailType == 4) {
                    this.trailOriginArr = config.trailBloggerOrigin
                }
                this.getStars();
                this.$nextTick(() => {
                    $('.selectpicker').selectpicker('render');
                    $('.selectpicker').selectpicker('refresh');
                })
            },
        },
        methods: {
            getField() {
                let _this = this
                fetch('get', '/trails/filter_fields').then((params) => {
                    _this.customizeInfo = params.data
                })
            },
            changeEmail(value) {
                this.email = value
            },
            getCurrentUser() {
                fetch('get', '/users/my').then((response) => {
                    this.currentUser = response.data
                })
            },
            phoneValidate() {
                let phone = this.trailContactPhone
                if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                    return false;
                }
            },
            trailTypeValidate() {
                if (!this.trailType) {
                    toastr.error("销售线索为必填");
                    return false;
                } else if (!this.brandName) {
                    toastr.error("品牌名称为必填")
                    return false;
                } else if (!this.selectCompany) {
                    toastr.error("公司名称为必填")
                    return false;
                } else if (!this.trailName) {
                    toastr.error("线索名称为必填")
                    return false;
                } else if (!this.trailOrigin) {
                    toastr.error("线索来源为必填")
                    return false;
                } else if (!this.trailPrincipal && !this.currentUser) {
                    toastr.error("负责人为必填")
                    return false;
                } else if (!this.targetStars) {
                    toastr.error("目标艺人为必填")
                    return false;
                } else if (!this.priority) {
                    toastr.error("优先级为必填")
                    return false;
                } else if (!this.industry) {
                    toastr.error("行业为必填")
                    return false;
                } else if (!this.industry) {
                    toastr.error("行业为必填")
                    return false;
                } else if (!this.trailContact) {
                    toastr.error("联系人为必填")
                    return false;
                }
                else if (!this.trailFee) {
                    toastr.error("预计订单收入为必填")
                    return false;
                } else if (this.trailContactPhone) {
                    let phone = this.trailContactPhone
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                        // alert("手机号码有误，请重填");
                        toastr.error("请输入正确的手机号码");
                        return false;
                    } else {
                        return true;
                    }
                } else if (!this.trailContactPhone) {
                    toastr.error("手机号码为必填")
                    return false;
                } else {
                    return true
                }
            },

            getTrails(pageNum = 1, type) {
                this.selectedTrailsArr = [];
                let data = {
                    page: pageNum
                };
                if (type) {
                    data.take_type = type
                }
                if (this.keyword) {
                    data.keyword = this.keyword
                }
                if (this.pool_type) {
                    data.pool_type = this.pool_type
                }
                if (this.receive_type) {
                    data.receive_type = this.receive_type
                }
                fetch('get', '/pool', data).then(response => {
                    this.trailsInfo = response.data;
                    this.total = response.meta.pagination.total;
                    this.current_page = response.meta.pagination.current_page;
                    this.total_pages = response.meta.pagination.total_pages;
                    this.isLoading = false;
                })
            },

            selectTrail(value) {
                if (value === 'all') {
                    if (this.trailsInfo.length === this.selectedTrailsArr.length) {
                        this.selectedTrailsArr = [];
                    } else {
                        this.selectedTrailsArr = [];
                        for (let i = 0; i < this.trailsInfo.length; i++) {
                            this.selectedTrailsArr.push(this.trailsInfo[i].id)
                        }
                    }
                } else {
                    let index = this.selectedTrailsArr.indexOf(value);
                    if (index > -1) {
                        this.selectedTrailsArr.splice(index, 1)
                    } else {
                        this.selectedTrailsArr.push(value)
                    }
                }
            },

            receiveTrails() {
                if (this.selectedTrailsArr.length === 0) {
                    toastr.error('请选择销售线索，再进行领取');
                    return
                }
                fetch('post', '/pool/receive', {id: this.selectedTrailsArr}).then(response => {
                    this.getTrails();
                    toastr.success('领取成功');
                })
            },

            showAllotContent() {
                if (this.selectedTrailsArr.length === 0) {
                    toastr.error('请选择销售线索，再进行分配');
                    return
                }
                $('#addMembers').modal('show');
            },

            allotTrail() {
                let data = {
                    user_id: this.$store.state.principalInfo.id,
                    id: this.selectedTrailsArr
                };
                fetch('post', '/pool/allot', data).then(response => {
                    this.getTrails()
                    toastr.success('分配成功');
                    $('#addMembers').modal('hide');
                })
            },

            filterGo() {
                this.keyword = this.trailFilter;
                this.getTrails()
            },

            progressStatusFilter(value) {
                this.receive_type = value;
                this.getTrails();
            },

            searchTrailType(value) {
                this.pool_type = value;
                this.getTrails();
            },

            getIndustries: function () {
                let _this = this;
                fetch('get', '/industries/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.industriesArr.push({
                            id: response.data[i].id,
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
                })
            },

            getClients: function () {
                let _this = this;
                fetch('get', '/clients/all').then(function (response) {
                    _this.companyArr = response.data
                })
            },

            getStars: function () {
                if (this.starsArr.length > 0) {
                    return
                }
                fetch('get', '/starandblogger', {sign_contract_status: 2}).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.starsArr.push({
                            name: response.data[i].name,
                            value: response.data[i].flag + '-' + response.data[i].id,
                        })
                    }
                })
            },

            customize: function (value) {
                let _this = this
                fetch('post', '/trails/filter?include=principal,client,contact,recommendations,expectations', value).then((params) => {
                    _this.trailsInfo = params.data
                    _this.total = params.meta.pagination.total;
                    _this.cleanUp = true
                })

            },

            addTrail: function () {

                let data = {
                    title: this.trailName,
                    brand: this.brandName,
                    client: this.selectCompany,
                    resource_type: this.trailOrigin,
                    recommendations: this.recommendStars,
                    expectations: this.targetStars,
                    contact: {
                        name: this.trailContact,
                        phone: this.trailContactPhone
                    },
                    fee: this.trailFee,
                    desc: this.trailDesc,
                    industry_id: this.industry,
                    type: this.trailType,
                    priority: this.priority,
                    cooperation_type: this.cooperation * 1
                };
                if (!this.$store.state.otherSlot.data && this.currentUser) {
                    data.principal_id = this.currentUser.id
                } else {
                    data.principal_id = this.$store.state.otherSlot.data.id
                }
                if (this.trailType != 4) {
                    //    todo 添加线索状态
                }
                if (this.trailOrigin == 1 || this.trailOrigin == 2 || this.trailOrigin == 3) {
                    data.resource = this.email
                } else if (this.trailOrigin == 4 || this.trailOrigin == 5) {
                    data.resource = this.trailOriginPerson.id
                } else {
                    data.resource = ''
                }
                let organization_id = JSON.parse(Cookies.get('user')).organization_id
                if (organization_id !== 411) {
                    data.lock = this.trailIsLocked
                }
                let _this = this;
                if (this.trailTypeValidate()) {
                    fetch('post', '/trails', data).then(function (response) {
                        $('#addTrail').modal('hide');
                        _this.$router.push({path: '/trails/' + response.data.id})
                        _this.cleanTempData()

                    })
                }
            },
            cleanTempData() {
                this.trailName = ''
                this.brandName = ''
                this.selectCompany = ''
                this.recommendStars = ''
                this.targetStars = ''
                this.trailContact = ''
                this.trailContactPhone = ''
                this.trailFee = ''
                this.trailDesc = ''
                this.industry = ''
                this.trailType = ''
                this.priority = ''
                this.cooperation = ''
            },
            redirectTrailDetail: function (trailId) {
                this.$router.push({path: '/trails/' + trailId})
            },
            changeTrailOriginPerson(value) {
                this.trailOriginPerson = value
            },
            changeTrailOrigin: function (value) {
                this.trailOrigin = value
            },

            changeTrailOriginType: function (value) {
                this.trailOrigin = value
            },

            changeCompanyName: function () {
                let companyInfo = this.$store.state.companyInfo;
                if (companyInfo.value) {
                    this.selectCompany = {
                        id: companyInfo.value
                    }
                } else {
                    this.selectCompany = {
                        grade: companyInfo.grade,
                        company: companyInfo.name
                    }
                }
            },

            changePrincipal: function (value) {
                if (this.$store.state.otherSlot.data) {
                    this.trailPrincipal = this.$store.state.otherSlot.data.name
                } else {
                    this.trailPrincipal = ''
                }
            },

            changeTargetStars: function (value) {
                for (let i = 0; i < value.length; i++) {
                    let item = value[i].split('-');
                    value[i] = {
                        id: item[1],
                        flag: item[0]
                    };
                }
                this.targetStars = value
            },

            changeRecommendStars: function (value) {
                for (let i = 0; i < value.length; i++) {
                    let item = value[i].split('-');
                    value[i] = {
                        id: item[1],
                        flag: item[0]
                    };
                }
                this.recommendStars = value
            },

            changeTrailFee: function (value) {
                this.trailFee = value
            },

            changeCheckbox: function (e) {
                this.trailIsLocked = e.target.checked
            },

            changeIndustry: function (value) {
                this.industry = value
            },

            changePriority: function (value) {
                this.priority = value
            },

            changeTrailType: function (value) {
                let organization_id = JSON.parse(Cookies.get('user')).organization_id
                if (value == 3) {
                    if (organization_id == 411) {
                        value = 3
                    } else if (organization_id == 412) {
                        value = 4
                    }
                }
                this.trailType = value;
                $('#addTrail').modal('show')
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 500);
            },

            changeTrailStatus: function (value) {
                this.trailStatus = value
            },

            changeCooperationType: function (value) {
                this.cooperation = value
            },
            clearPrincipalFilter: function () {
                this.fetchData.principal_ids = ''
                this.fetchHandler('get', '/trails/filter')
                this.$refs.principal_id.setValue('')
            },
            goDetail(id) {
                this.$router.push({path: '/publictrails/' + id})
            }
        }
    }
</script>
<style scoped>

    .error {
        border: 1px solid red;
        border-radius: 5px;
    }

    .clear-principal-filter {
        cursor: pointer;
    }

    .trial-origin .require::before {
        margin-left: 9px;
        line-height: 34px;
    }

    table tbody tr {
        cursor: pointer;
    }

    .modal-body .example {
        display: flex;
        align-items: center;
    }
</style>





