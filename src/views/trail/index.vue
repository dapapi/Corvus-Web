<template>
    <div class="page">
        <div class="loader-overlay" v-if="isLoading">
            <div class="loader-content">
                <div class="loader-index">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">销售线索管理</h1>
            <!-- <div class="page-header-actions">
                <i class="iconfont icon-daoru px-5 font-size-20 pr-20" aria-hidden="true"></i>
                <i class="iconfont icon-daochu font-size-20" aria-hidden="true"></i>
            </div> -->
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入销售线索名称"
                               style="width: 220px" v-model="trailFilter" @keyup.enter='filterGo' @blur='filterGo'>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :placeholder="'请选择销售进展'"
                                   :options="progressStatus" :resetinfo='resetInfo'
                                   @change="progressStatusFilter"
                        ></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors placeholder="请选择负责人" ref='principal_id'
                                   :options="memberList" multiple='true'
                                   @valuelistener="principalFilter"
                        ></selectors>
                        <span v-if="fetchData.principal_ids" class="clear-principal-filter"
                              @click="clearPrincipalFilter">&nbsp;&nbsp;x</span>
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
                            <th class="cell-300" scope="col">级别</th>
                            <th class="cell-300" scope="col">目标艺人</th>
                            <th class="cell-300" scope="col">预计订单收入</th>
                            <th class="cell-300" scope="col">负责人</th>
                        </tr>
                        <tbody>
                        <tr v-for="trail in trailsInfo" :key='trail.id'>
                            <!-- trailFilter?filterData:trailsInfo -->
                            <td class="pointer-content">
                                <router-link :to="{name:'trails/detail', params: {id: trail.id}}">
                                    {{ trail.title }}
                                </router-link>
                            </td>

                            <td>{{ trail.client.data.company }}</td>
                            <td>
                                <template v-if="trail.client.data.grade === 1">直客</template>
                                <template v-if="trail.client.data.grade === 2">代理公司</template>
                            </td>
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
                        </tr>
                        </tbody>

                    </table>
                    <div class="col-md-1" style="margin: 6rem auto" v-if="trailsInfo.length === 0">
                        <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                    </div>
                    <pagination :current_page="current_page" :method="getSales" :total_pages="total_pages"
                                :total="total"></pagination>
                </div>
            </div>
        </div>


        <customize-filter :data="customizeInfo" :stararr='starsArr' @change="customize" :cleanup="cleanUp"
                          @cleanupdone='cleanUp=false'></customize-filter>
        <AddClientType @change="changeTrailType"></AddClientType>

        <div class="modal fade" id="addTrail" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
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
                                <selectors :options="cooperationTypeArr" @change="changeCooperationType"
                                           :placeholder="'请选择合作类型'"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">品牌名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入品牌名称"
                                       v-model="brandName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">公司名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <edit-company @change="changeCompanyName"></edit-company>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">线索名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入线索名称"
                                       v-model="trailName">
                            </div>
                        </div>
                        <div class="example">
                            <TrailOrigin :trailType='trailType'
                                         typeName='线索' alwaysShow='true'
                                         @changeTrailOrigin='changeTrailOrigin'
                                         @changeEmail='changeEmail'
                                         @changeTrailOriginPerson='changeTrailOriginPerson'/>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">行业</div>
                            <div class="col-md-10 float-left pl-0" v-if="industriesArr.length > 0">
                                <selectors ref='industries' :options="industriesArr" :placeholder="'请选择行业'"
                                           @change="changeIndustry"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input-selectors :placeholder="'请选择负责人'" otherslot='otherslot'
                                                 @change="changePrincipal"
                                                 :propSelectMemberName='$store.state.otherSlot.data?$store.state.otherSlot.data.name:currentUser.name'></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">目标艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" @valuelistener="changeTargetStars" :multiple="true"
                                           :placeholder="'请选择目标艺人'"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">推荐艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" @valuelistener="changeRecommendStars" :multiple="true"
                                           :placeholder="'请选择推荐艺人'"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="priorityArr" :placeholder="'请选择优先级'"
                                           @change="changePriority"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入联系人"
                                       v-model="trailContact">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人电话</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入联系电话"
                                       v-model="trailContactPhone" @blur='phoneValidate'>
                            </div>
                        </div>
                        <div class="example" v-show="trailType != 4">
                            <div class="col-md-2 text-right float-left">线索状态</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="trailStatusArr" :placeholder="'请选择线索状态'"
                                           @change="changeTrailStatus"></selectors>
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
                            <div class="col-md-2 text-right float-left">预计订单收入</div>
                            <div class="col-md-5 float-left pl-0 pr-0">
                                <number-spinner @change="changeTrailFee" ></number-spinner>
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
                progressStatus: [{
                    'name': '全部',
                    'value': ''
                }, {
                    'name': '已拒绝',
                    'value': '0'
                }, {
                    'name': '未确定合作',
                    'value': '1'
                }, {
                    'name': '已确定合作',
                    'value': '2'
                }],
                memberList: [],
                fetchData: {},
                currentUser: {},
                resetInfo: false,
                isLoading: true,
                cleanUp: false,
            }
        },
        created() {
            this.getField()
            this.getMembers()
            this.getCurrentUser()
        },
        mounted() {
            this.getSales();
            this.getClients();
            this.getStars();
            this.getIndustries();
        },
        update(){


        },
        watch: {
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
            getMembers() {
                let _this = this
                fetch('get', '/users').then(function (response) {
                    _this.memberList = response.data
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
            fetchHandler(methods, url) {
                let _this = this
                this.fetchData.include = 'principal,client,contact,recommendations,expectations'
                fetch(methods, url, this.fetchData).then((response) => {
                    _this.trailsInfo = response.data
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.isLoading = false;
                })
            },
            filterGo() {
                this.fetchData.keyword = this.trailFilter
                this.fetchHandler('get', '/trails/filter')
            },
            progressStatusFilter(value) {
                this.fetchData.status = value
                this.fetchHandler('get', '/trails/filter')
            },
            getSales: function (pageNum = 1) {
                let _this = this;
                let data = {
                    page: pageNum,
                    include: 'principal,client,expectations',
                };
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
                this.starsArr = []
                let _this = this;
                if (this.trailType == 4) {
                    fetch('get', '/bloggers/all').then(function (response) {
                        for (let i = 0; i < response.data.length; i++) {
                            _this.starsArr.push({
                                id: response.data[i].id,
                                name: response.data[i].nickname,
                                value: response.data[i].id
                            })
                        }
                    })
                } else {
                    fetch('get', '/stars/all').then(function (response) {
                        for (let i = 0; i < response.data.length; i++) {
                            _this.starsArr.push({
                                id: response.data[i].id,
                                name: response.data[i].name,
                                value: response.data[i].id
                            })
                        }
                    })
                }

            },

            customize: function (value) {
                let _this = this
                console.log(value);
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
                if (this.companyType !== '泰洋川禾') {
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
                console.log(123);
                this.targetStars = value
            },

            changeRecommendStars: function (value) {
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
            }

        }
    }
</script>
<style scoped>
    .loader-overlay {
        margin-left: 100px;
        background-color: rgba(7, 17, 27, 0.2)
    }

    .error {
        border: 1px solid red;
        border-radius: 5px;
    }

    .clear-principal-filter {
        cursor: pointer;
    }
</style>





