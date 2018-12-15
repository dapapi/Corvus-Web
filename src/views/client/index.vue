<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">客户管理</h1>
            <div class="page-header-actions">
                <i class="icon md-download px-5 font-size-20 pr-20" aria-hidden="true"></i>
                <i class="icon md-upload font-size-20" aria-hidden="true"></i>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <!-- <input type="text" class="form-control" placeholder="请输入公司名称"
                               style="width: 220px" @change="changeCompany"> -->
                        <selectors :options="companiesArr" :placeholder="'请选择公司'"
                                   @change="changeCompany"></selectors>
                               
                    </div>
                    <div class="col-md-3 example float-left">
                        <input-selectors :key="'inputSelect'" :placeholder="'请选择负责人'"
                                         @change="changePrincipalSelect"></input-selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <!-- <selectors @change=""
                                   :placeholder="'请选择级别'"></selectors> -->
                        <selectors :options="clientLevelArr" :placeholder="'请选择公司级别'"
                                   @change="changeClientLevelSelect"></selectors>
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
                    <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                           data-child="tr"
                           data-selectable="selectable">
                        <tr class="animation-fade"
                            style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                            <th class="cell-300" scope="col">公司名称</th>
                            <th class="cell-300" scope="col">级别</th>
                            <th class="cell-300" scope="col">负责人</th>
                            <th class="cell-300" scope="col">录入时间</th>
                            <th class="cell-300" scope="col">跟进时间</th>
                        </tr>
                        <tbody>
                        <tr v-for="client in clientsInfo ">
                            <td class="pointer-content">
                                <router-link :to="{name:'clients/detail', params: {id: client.id}}">
                                    {{ client.company }}
                                </router-link>
                            </td>
                            <td>
                                <template v-if="client.grade === 1">直客</template>
                                <template v-if="client.grade === 2">代理公司</template>
                            </td>
                            <td>{{ client.principal?client.principal.data.name:'' }}</td>
                            <td>{{ client.created_at?client.created_at:'' }}</td>
                            <td>{{ client.last_follow_up_at?client.last_follow_up_at:'' }}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div class="col-md-1" style="margin: 6rem auto" v-if="clientsInfo.length === 0">
                        <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                    </div>

                    <pagination :current_page="current_page" :method="getClients" :total_pages="total_pages"
                                :total="total"></pagination>
                </div>

            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <!-- <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addClient">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div> -->
        <AddClientType @change="showAddModal" />

        <div class="modal fade" id="addClient" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增客户</h4>
                    </div>
                    <div class="modal-body">

                        <!-- <div class="example">
                            <div class="col-md-2 text-right float-left">客户类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="clientTypeArr" :placeholder="'请选择客户类型'"
                                           @change="changeClientType"></selectors>
                            </div>
                        </div> -->
                        <div class="example">
                            <div class="col-md-2 text-right float-left">公司名称</div>
                            <div class="col-md-5 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientName">
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="clientLevelArr" :placeholder="'请选择公司级别'"
                                           @change="changeClientLevel"></selectors>
                            </div>
                        </div>
                        <!-- 暂时隐藏 -->
                        <div class="example">
                            <div class="col-md-2 text-right float-left">地区</div>
                            <div class="col-md-10 float-left pl-0 region">
                                <RegionSelector @setAreaData="changeAreaData" />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">详细地址</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入详细地址"
                                       v-model="clientAddressDetail">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input-selectors :placeholder="'请选择负责人'" @change="changePrincipal"></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientContact">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关键决策人</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="keyMasterArr" :placeholder="'请选择是否是关键决策人'"
                                           @change="changeContactClientType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">联系人电话</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientContactPhone">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">职位</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientContactPosition">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">规模</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="clientScaleArr" :placeholder="'请选择规模'"
                                           @change="changeClientScale"></selectors>
                            </div>
                        </div>
                        <!-- 注释掉 -->
                        <!-- <div class="example">
                            <div class="col-md-2 text-right float-left">决策关键人/部门</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientDecision">
                            </div>
                        </div> -->
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" id="" title="" class="form-control" v-model="clientRemark"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-sm btn-white btn-pure" @click="cancelClient" data-dismiss="modal">取消</button>
                            <button class="btn btn-primary" type="submit" @click="addClient">确定</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    const clientLevelArr = [{name: '全部', value: ''}, ...config.clientLevelArr]
    export default {
        data: function () {
            return {
                total: 0,
                current_page: 0,
                total_pages: 0,
                customizeInfo: config.customizeInfo,
                clientTypeArr: config.clientTypeArr,
                clientLevelArr: clientLevelArr,
                keyMasterArr: config.isKeyMasterArr,
                clientsInfo: [],
                companiesArr: [],
                clientScaleArr: config.clientScaleArr,
                clientType: '',
                clientName: '',
                clientLevel: '',
                clientAddressDetail: '',
                clientPrincipal: '',
                clientContact: '',
                clientContactPhone: '',
                clientContactPosition: '',
                clientContactType: '', // 是否是关键人
                // clientDecision: '',
                clientRemark: '',
                clientPrincipalSearch: '', // 条件筛选的负责人
                clientPrincipalIdSearch: '', // 负责人id
                clientLevelSearch: '', // 条件筛选的公司级别
                companyName: '', // 公司名称
                user: {}, // 个人信息
                ragion: {}, // 区域
            }
        },

        mounted() {
            this.getClients();
            this.getCompanies();
            this.user = JSON.parse(Cookies.get('user'))
            // 清除负责人默认值的设置
            this.clearDefaultPrincipal()
        },

        methods: {
            getClients: function (pageNum = 1) {
                const params = {
                    page: pageNum,
                    include: 'principal',
                };

                let url = '/clients'

                if (this.companyName) {
                    params.keyword = this.companyName
                }
                if (this.clientLevelSearch) {
                    params.grade = this.clientLevelSearch
                }
                if (this.clientPrincipalIdSearch) {
                    params.principal_id = this.clientPrincipalIdSearch
                }

                if (this.companyName || this.clientLevelSearch || this.clientPrincipalIdSearch) {
                    url = '/clients/filter'
                }

                fetch('get', url, params).then(response => {
                    this.clientsInfo = response.data;
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                })
            },

            getCompanies: function () {
                let _this = this;
                fetch('get', '/clients/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.companiesArr.push({
                            id: response.data[i].id,
                            name: response.data[i].company,
                            value: response.data[i].company,
                            grade: response.data[i].grade
                        })
                    }
                })
            },

            addClient: function () {
               
                if (this.clientContactPhone.length !== 11) {
                    toastr.error('手机号码格式不对！');
                    return
                }
                if (!this.clientName) {
                    toastr.error('请输入公司名称！');
                    return
                }
                if (!this.clientLevel) {
                    toastr.error('请选择公司级别！');
                    return
                }
                if (!this.clientType) {
                    toastr.error('请选择客户类型！')
                    return
                }
                if (!this.clientContact) {
                    toastr.error('请填写联系人！')
                    return
                }
                if (!this.clientContactType) {
                    toastr.error('请选择关键决策人！')
                    return
                }
                if (!this.clientContactPosition) {
                    toastr.error('请填写联系人职位！')
                    return
                }
                let data = {
                    type: this.clientType,
                    company: this.clientName,
                    grade: this.clientLevel,
                    // region_id: '',
                    province: this.ragion.province || '',
                    city: this.ragion.city || '',
                    district: this.ragion.district || '',
                    address: 'test',
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    contact: {
                        name: this.clientContact,
                        phone: this.clientContactPhone,
                        position: this.clientContactPosition,
                        type: this.clientContactType,
                    },
                    // keyman: this.clientDecision,
                    size: this.clientScale,
                    desc: this.clientRemark
                };
                if (!data.principal_id) {
                    toastr.error('请选择负责人！')
                }

                let _this = this;
                fetch('post', '/clients', data).then(function (response) {
                    toastr.success('创建成功');
                    $("#addClient").modal("hide");
                    _this.$router.push({path: 'clients/' + response.data.id});
                })
            },

            customize: function () {

            },

            redirectClientDetail: function (clientId) {
                this.$router.push({path: 'clients/' + clientId});
            },

            changeCompany: function (value) {
                this.companyName = value
                this.getClients()
            },

            changeClientType: function (value) {
                this.clientType = value;
                console.log(value)
            },

            changeClientLevel: function (value) {
                this.clientLevel = value
            },

            changePrincipal: function (value) {
                this.clientPrincipal = value
            },

            changePrincipalSelect(value) {
                this.clientPrincipalSearch = value
                this.clientPrincipalIdSearch = this.$store.state.newPrincipalInfo.id
                this.getClients()
                console.log(value.id)
            },

            changeClientLevelSelect(value) {
                this.clientLevelSearch = value
                this.getClients()
            },

            changeClientScale: function (value) {
                this.clientScale = value
            },
            // 选择地区
            changeAreaData (val) {
                if (val.area.name) {
                    this.ragion.province = val.province.name
                    this.ragion.city = val.city.name !== '市辖区' ? val.city.name : val.province.name
                    this.ragion.district = val.area.name
                }
            },
            // show add
            showAddModal (val) {
                this.setDefaultPrincipal()
                console.log(this.user)
                $('#addClient').modal()
                this.clientType = val
            },
            // 关键决策人
            changeContactClientType (val) {
                this.clientContactType = val
            },
            // 设置默认负责人
            setDefaultPrincipal () {
                this.$store.commit('changeNewPrincipal', {
                    name: this.user.nickname,
                    id: this.user.id
                })
            },
            // 清空默认负责人
            clearDefaultPrincipal () {
                this.$store.commit('changeNewPrincipal', {name: '', id: ''})
            },
            // 关闭弹窗
            cancelClient () {
                this.clearDefaultPrincipal()
            }
        }
    }
</script>

<style lang="scss" scoped>
    table td {
        position: relative;
        a:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: inline-block;
        }
    }
    .region {
        /deep/ .page-content {
            padding: 0;
            .modal-body {
                padding: 0;
                .form-group {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
