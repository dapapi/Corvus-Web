<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">销售线索管理</h1>
            <div class="page-header-actions">
                <i class="icon md-download px-5 font-size-20 pr-20" aria-hidden="true"></i>
                <i class="icon md-upload font-size-20" aria-hidden="true"></i>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入销售线索名称"
                               style="width: 220px" v-model="trailFilter" @blur='filterGo'>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :placeholder="'请选择销售进展'" 
                                :options="progressStatus"
                                @change="progressStatusFilter"
                                ></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors placeholder="请选择负责人" 
                                :options="memberList" multiple
                                @change="principalFilter"
                                ></selectors>
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
                            <th class="cell-300" scope="col">预计费用</th>
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
                            <td>目标艺人</td>
                            <td>{{ trail.fee }}</td>
                            <td>
                                <template v-if="trail.principal">
                                    {{ trail.principal.data.name }}
                                </template>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                    <pagination :current_page="current_page" :method="getSales" :total_pages="total_pages"
                                :total="total"></pagination>
                </div>
            </div>
        </div>


        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addTrail">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="addTrail" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增销售线索</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">线索类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :placeholder="'请选择销售线索'" :options="trailTypeArr"
                                           @change="changeTrailType"></selectors>
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
                            <div class="col-md-2 text-right float-left">线索来源</div>
                            <div class="float-left" v-if="trailOriginArr.length > 0">
                                <selectors :options="trailOriginArr" @change="changeTrailOriginType"
                                           :placeholder="'请选择线索来源'"></selectors>
                            </div>
                            <template v-if="trailOrigin === '1' || trailOrigin === '2' || trailOrigin === '3'">
                                <div class="col-md-5 float-left pr-0">
                                    <input type="text" class="form-control" title="" v-model="email">
                                </div>
                            </template>
                            <template v-else-if="trailOrigin === '4' || trailOrigin === '5'">
                                <div class="col-md-5 float-left pr-0">
                                    <input-selectors @change="changeTrailOrigin"></input-selectors>
                                </div>
                            </template>

                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">行业</div>
                            <div class="col-md-10 float-left pl-0" v-if="industriesArr.length > 0">
                                <selectors :options="industriesArr" :placeholder="'请选择行业'"
                                           @change="changeIndustry"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input-selectors :placeholder="'请选择负责人'"
                                                 @change="changePrincipal"></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">目标艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" @change="changeTargetStars" :multiple="true"
                                           :placeholder="'请选择目标艺人'"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">推荐艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <selectors :options="starsArr" @change="changeRecommendStars" :multiple="true"
                                           :placeholder="'请选择推荐艺人'"></selectors>
                            </div>
                        </div>
                        <div class="example" v-show="trailType != 4">
                            <div class="col-md-2 text-right float-left">合作类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="cooperationTypeArr" @change="changeCooperationType"
                                           :placeholder="'请选择合作类型'"></selectors>
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
                                       v-model="trailContactPhone">
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
                            <div class="col-md-2 text-right float-left">预计费用</div>
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
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
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
                customizeInfo: config.customizeInfo,
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
                filterData:'',
                progressStatus:[{
                    'name':'已拒绝',
                    'value':0
                },{
                    'name':'未确定合作',
                    'value':1
                },{
                    'name':'已确定合作',
                    'value':2
                }],
                memberList:[],
            }
        },
        created(){
            this.getMembers()
        },
        mounted() {
            this.getSales();
            this.getClients();
            this.getStars();
            this.getIndustries();
        },
        watch:{
            memberList:function(value){
                this.$nextTick(() => {
                    $('.selectpicker').selectpicker('render');
                    $('.selectpicker').selectpicker('refresh');
                })
            }
        },
        methods: {
            getMembers(){
                let _this = this
                fetch('get', '/users').then(function (response) {
                         _this.memberList = response.data
                })
            },
            principalFilter(value){
                if(value){
                    let _this = this;
                    fetch('get', '/trails/filter?principal_ids='+value+'&include=principal,client,contact,recommendations,expectations').then(function (response) {
                        _this.trailsInfo = response.data
                    })
                }
                
            },
            filterGo(){
                let _this = this;
                fetch('get', '/trails/filter?keyword='+this.trailFilter+'&include=principal,client,contact,recommendations,expectations').then(function (response) {
                    _this.trailsInfo = response.data
                })
            },
            progressStatusFilter(value){
                 let _this = this;
                 fetch('get', '/trails/filter?status='+value+'&include=principal,client,contact,recommendations,expectations').then(function (response) {
                    _this.trailsInfo = response.data
                    _this.trailFilter = ''
                })
            },
            getSales: function (pageNum = 1) {
                let _this = this;
                let data = {
                    page: pageNum,
                    include: 'principal,client',
                };
                fetch('get', '/trails', data).then(function (response) {
                    _this.trailsInfo = response.data;
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
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
                let _this = this;
                fetch('get', '/stars/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.starsArr.push({
                            id: response.data[i].id,
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
                })
            },

            customize: function () {

            },

            addTrail: function () {
                let data = {
                    title: this.trailName,
                    brand: this.brandName,
                    client: this.selectCompany,
                    resource_type: this.trailOrigin,
                    principal_id: this.$store.state.newPrincipalInfo.id,
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
                    priority: this.priority
                };
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
                fetch('post', '/trails', data).then(function (response) {
                    $('#addTrail').modal('hide');
                    _this.$router.push({path: '/trails/' + response.data.id})
                })
            },

            redirectTrailDetail: function (trailId) {
                this.$router.push({path: '/trails/' + trailId})
            },

            changeTrailOrigin: function (value) {
                this.trailOriginPerson = value
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
                this.trailPrincipal = value
            },

            changeTargetStars: function (value) {
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
                this.trailType = value
            },

            changeTrailStatus: function (value) {
                this.trailStatus = value
            },

            changeCooperationType: function (value) {
                this.cooperation = value
            },
            

        }
    }
</script>






