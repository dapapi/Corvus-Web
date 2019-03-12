<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">销售线索管理
                <span style="color: #3298dc;" class="pl-20 font-size-20 pointer-content" @click="redirectPublicTrail"><i
                        class="iconfont icon-jiantou_xiayiye font-size-22 pr-5"></i>公海池</span>
            </h1>
            <div class="page-header-actions">
                <import-and-export class="float-left" :type="'export'" :moduleName="'trails'" :params="exportParams">
                    <i class="iconfont icon-daochu font-size-20 pr-20" aria-hidden="true"></i>
                </import-and-export>
                <import-and-export class="float-left" :type="'import'" :moduleName="'trails'" >
                    <i class="iconfont icon-daoru px-5 font-size-20 " aria-hidden="true"></i>
                </import-and-export>
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
                        <selectors :options="currentUser.organization_id === 411?businessStatus:papiStatus"
                                   :resetinfo='resetInfo' @change="progressStatusFilter"
                                   placeholder="请选择线索类型"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors ref='principal_id' :options="memberList" multiple='true'
                                   @valuelistener="principalFilter" placeholder="请选择负责人"></selectors>
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
                    <table class="table table-hover is-indent" data-plugin="animateList" data-animate="fade"
                           data-child="tr"
                           data-selectable="selectable">
                        <tr class="animation-fade"
                            style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                            <th class="cell-300" scope="col">线索名称</th>
                            <th class="cell-300" scope="col">公司名称</th>
                            <th class="cell-300" scope="col">目标艺人</th>
                            <th class="cell-300" scope="col">预计订单收入</th>
                            <th class="cell-300" scope="col">负责人</th>
                            <th class="cell-300" scope="col">跟进时间</th>
                        </tr>
                        <tbody>
                        <tr v-for="trail in trailsInfo" :key='trail.id' @click="goDetail(trail.id)">
                            <!-- trailFilter?filterData:trailsInfo -->
                            <td class="pointer-content">
                                {{ trail.title }}
                            </td>

                            <td>{{ trail.client.data.company }}</td>
                            <td>
                                <span class="overflowsp" v-for="(item , index) in trail.expectations.data" :key="index"
                                      v-if="index < 2">{{item.name || item.nickname}}&nbsp;&nbsp;</span>
                            </td>
                            <td class="">{{ trail.fee }}元</td>
                            <td>
                                <template v-if="trail.principal">
                                    {{ trail.principal.data.name }}
                                </template>
                            </td>
                            <td>
                                <template>{{trail.last_follow_up_at}}</template>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                    <div style="margin: 6rem auto;width: 100px" v-if="trailsInfo.length === 0">
                        <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                    </div>
                    <pagination :current_page="current_page" :method="getSales" :total_pages="total_pages"
                                :total="total"></pagination>
                </div>
            </div>
        </div>


        <customize-filter :data="customizeInfo" :stararr='starsArr' @change="customize" 
                          ></customize-filter>
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
                                         @changeEmail='changeEmail' submit='true'
                                         @changeTrailOriginPerson='changeTrailOriginPerson'/>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">行业</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors ref='industries' :options="industriesArr"
                                           @change="changeIndustry"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input-selectors :placeholder="'请选择负责人'"
                                                 @change="changePrincipal" otherslot=true
                                                 :propSelectMemberName='$store.state.newPrincipalInfo.name?$store.state.newPrincipalInfo.name:currentUser.name'></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">目标艺人</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="starsArr" @change="changeTargetStars"
                                           :multiple="true"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">推荐艺人</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="starsArr" @change="changeRecommendStars"
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
                            <div class="col-md-2 text-right float-left require">预计订单收入/元</div>
                            <div class="col-md-5 float-left pl-0 pr-0">
                                <number-spinner @change="changeTrailFee" :min="0" :max="1000000000" :precision="2"
                                                :value="0"></number-spinner>
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

    </div>

</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    import {mapState} from 'vuex'
    import Cookies from 'js-cookie'
    import ImportAndExport from '@/components/ImportAndExport.vue'

    export default {
        components: {
            ImportAndExport
        },
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
                priorityArr: config.taskLevelArr,
                trailStatus: '',
                cooperation: '',
                filterData: '',
                businessStatus: [{
                    'name': '全部',
                    'value': ''
                }, {
                    'name': '商务线索',
                    'value': '3,4'
                }, {
                    'name': '影视线索',
                    'value': '1'
                }, {
                    'name': '综艺线索',
                    'value': '2'
                }],
                papiStatus: [{
                    'name': '全部',
                    'value': ''
                }, {
                    'name': '商务线索',
                    'value': '3,4'
                }, {
                    'name': '影视线索',
                    'value': '1'
                }, {
                    'name': '综艺线索',
                    'value': '2'
                }],
                memberList: [],
                fetchData: {},
                currentUser: {},
                resetInfo: false,
                isLoading: true,
                cleanUp: false,
                trailIsLocked: '',
                exportParams: {},//导出参数
                customizeCondition: {}
            }
        },
        created() {
            this.getField()
            if (this.userList.length > 0) {
                this.memberList = this.userList
            }
            this.getCurrentUser()
        },
        mounted() {
            this.getSales();
            this.getClients();
            this.getStars();
            this.getIndustries();
        },
        computed: {
            ...mapState([
                'userList'
            ]),
            _userList() {
                return this.userList
            }
        },
        watch: {
            _userList() {
                this.memberList = this.userList
            },
            trailType: function () {
                this.trailOriginArr = config.trailOrigin
                if (this.trailType == 4) {
                    this.trailOriginArr = config.trailBloggerOrigin
                }
                this.getStars()
                this.$nextTick(() => {
                    $('.selectpicker').selectpicker('render');
                    $('.selectpicker').selectpicker('refresh');
                })
            },
            memberList: function (value) {
                this.$nextTick(() => {
                    $('.selectpicker').selectpicker('render');
                    $('.selectpicker').selectpicker('refresh');
                })
            }
        },
        methods: {
            getField() {
                let _this = this
                fetch('get', '/trails/filter_fields').then((params) => {
                    _this.customizeInfo = params.data
                })
            },
            changeTrailOriginPerson(value) {
                this.trailOriginPerson = value
            },
            changeEmail(value) {
                this.email = value
            },
            getCurrentUser() {
                fetch('get', '/users/my').then((response) => {
                    this.currentUser = response.data
                })
            },
            principalFilter(value) {
                if (value) {
                    this.fetchData.principal_ids = value.join(',')
                }
                this.fetchHandler('get', '/trails/filter')
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
            redirectPublicTrail() {
                this.$router.push({path: '/publictrails'})
            },
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
                    _this.trailsInfo = response.data
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.isLoading = false;
                })
            },
            filterGo() {
                this.fetchData.keyword = this.trailFilter
                this.fetchHandler('post', '/trails/filter', 'filter')
                // this.fetchHandler('get', '/trails/filter')

            },
            progressStatusFilter(value) {
                this.fetchData.status = value
                this.fetchHandler('post', '/trails/filter', 'filter')
                // this.fetchHandler('get', '/trails/filter')
            },
            // progressStatusFilter(value) {
            //     this.fetchData.status = value
            //     this.fetchHandler('get', '/trails/filter')
            // },
            getSales: function (pageNum = 1) {
                let _this = this;
                let data = {
                    page: pageNum,
                    include: 'principal,client,expectations',
                };
                Object.assign(data, this.fetchData)
                fetch('get', '/trails', data).then(function (response) {
                    _this.trailsInfo = response.data;
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.isLoading = false;
                })
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
                 // let _this = this
                this.customizeCondition = value
                this.fetchHandler('post', '/trails/filter','filter')
                // fetch('post', '/trails/filter?include=principal,client,contact,recommendations,expectations', value).then((params) => {
                //     _this.trailsInfo = params.data
                //     _this.total = params.meta.pagination.total;
                //     _this.total_pages = params.meta.pagination.total_pages;
                //     _this.current_page = params.meta.pagination.current_page
                //     _this.cleanUp = true
                // })
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
                    data.status = this.trailStatus
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
                this.trailIsLocked = Number(e.target.checked)
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
                this.trailType = value
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
                this.$router.push({path: '/trails/' + id})
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