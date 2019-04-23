<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">客户管理
                <!-- <router-link :to="{path:'/supplier/list'}" style="color: #3298dc;" class="pl-20 font-size-20 pointer-content"><i
                        class="iconfont icon-jiantou_xiayiye font-size-22 pr-5"></i>供应商</router-link> -->
            </h1>
            <div class="page-header-actions">
                <ImportAndExport class="float-left" :type="'export'" :moduleName="'clients'" :power="'client'" :params="exportParams">
                    <i class="iconfont icon-daochu px-5 font-size-20 pr-20 pointer-content" title="导出"
                       aria-hidden="true"></i>
                </ImportAndExport>
                <ImportAndExport class="float-left" :type="'import'" :moduleName="'clients'" :power="'client'" @reload="getClients">
                    <i class="iconfont icon-daoru font-size-20 pointer-content" title="导入" aria-hidden="true"></i>
                </ImportAndExport>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" placeholder="请输入公司名称"
                               @keyup.enter='filterGo' @blur='filterGo'>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="userList" @change="changePrincipalSelect" placeholder="请选择负责人"
                                   :multiple="true"/>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="clientLevelArr" @change="changeClientLevelSelect"
                                   placeholder="请选择公司级别"></selectors>
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
                        <tr v-for="client in clientsInfo " :key="client.id" @click="goDetail(client.id)">
                            <td class="pointer-content">
                                {{ client.company }}
                            </td>
                            <td>
                                <template v-if="client.grade === 1">直客</template>
                                <template v-if="client.grade === 2">代理公司</template>
                            </td>
                            <td>
                                <template v-if="companyName || clientLevelSearch || clientPrincipalIdSearch.length > 0">
                                    {{ client.principal ? client.principal.data.name : '' }}
                                </template>
                                <template v-else>
                                    {{ client.name }}
                                </template>
                                </td>
                            <td>{{ client.created_at ? common.timeProcessing(client.created_at) : '' }}</td>
                            <td>
                                <template v-if="companyName || clientLevelSearch || clientPrincipalIdSearch.length > 0">
                                    {{ client.last_follow_up_at ? common.timeProcessing(client.last_follow_up_at) : '' }}
                                </template>
                                <template v-else>
                                    {{ client.up_time ? common.timeProcessing(client.up_time) : '' }}
                                </template>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div style="margin: 6rem auto;width: 100px" v-if="clientsInfo.length === 0">
                        <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                    </div>

                    <pagination :current_page="current_page" :method="getClients" :total_pages="total_pages"
                                :total="total"></pagination>
                </div>

            </div>

        </div>

        <customize-filter v-if="canShow" :data="customizeInfo" @change="customize" :cleanup="cleanUp"
                          @cleanupdone='cleanUp=false'></customize-filter>

        <AddClientType  v-if="canShow" :hidden="listPower.client?listPower.client.add === 'false':true" @change="showAddModal"/>

        <div v-if="canShow" class="modal fade" id="addClient" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增客户</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-if="clientType === 1 || clientType === 2">
                            <div class="col-md-2 text-right float-left require">客户名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" v-model="clientName">
                            </div>
                        </div>

                        <div class="example" v-if="clientType === 3">
                            <div class="col-md-2 text-right float-left require">品牌名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="brand">
                            </div>
                        </div>

                        <div class="example">
                            <div class="col-md-2 text-right float-left require">公司名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="company">
                            </div>
                        </div>

                        <div class="example" v-if="clientType === 3">
                            <div class="col-md-2 text-right float-left require">所属行业</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors ref="industryElm" :options="industriesArr"
                                           @change="changeIndustry"></selectors>
                                <!-- <input type="text" class="form-control" title="" v-model="industry"> -->
                            </div>
                        </div>

                        <div class="example" v-if="clientType === 1 || clientType === 2">
                            <div class="col-md-2 text-right float-left require">公司性质</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors ref="natureElm" :options="natureArr"
                                           @change="changeNature"></selectors>
                            </div>
                        </div>

                         <div class="example" v-show="clientType === 3">
                         <!-- <div class="example"> -->
                            <div class="col-md-2 text-right float-left require">地区</div>
                            <div class="col-md-10 float-left pl-0 region">
                                <RegionSelector :hideArea="true" ref="region" @setAreaData="changeAreaData"/>
                            </div>
                        </div>

                        <div class="example" v-if="clientType === 3">
                            <div class="col-md-2 text-right float-left">详细地址</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入详细地址"
                                       v-model="clientAddressDetail">
                            </div>
                        </div>

                         <div class="example" style="display: unset" v-if="clientType === 1 || clientType === 2">
                            <div class="col-md-2 text-right float-left require">代表作品</div>
                            <div class="col-md-10 float-left pl-0" >
                                <input type="text" class="form-control" style="margin-bottom: 10px" v-model="work[0]">
                                <template v-for="(item, index) in work">
                                    <div :key="index" v-if="index > 0">
                                        <div class="col-md-11 float-left pl-0">
                                            <input type="text" class="form-control" style="margin-bottom: 10px" v-model="work[index]">
                                        </div>
                                        <div class="col-md-1 float-left pl-0">
                                            <i class="iconfont icon-shanchu1" style="color: #f44336; font-size: 22px; cursor: pointer;" @click="delWork(index)"></i>
                                        </div>
                                    </div>
                                </template>
                                <div class="col-md-12 float-left pl-0">
                                    <span @click="work.push('')" style="color: #3298DC; cursor: pointer">新增作品+</span>
                                </div>
                            </div>

                        </div>

                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人员</div>
                            <div class="col-md-10 float-left pl-0">
                                <input-selectors :placeholder="'请选择负责人'" @change="changePrincipal"></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">联系人名</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientContact">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">是否为关键决策人</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors ref="clientContactType" :options="keyMasterArr"
                                           @change="changeContactClientType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">联系电话</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientContactPhone">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">微信号码</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="wechat">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">其他联系方式</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="otherContactWays">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">所属职位</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" v-model="clientContactPosition">
                            </div>
                        </div>
                        <div class="example" v-if="clientType === 3">
                            <div class="col-md-2 text-right float-left">客户规模</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors ref="clientScale" :options="clientScaleArr"
                                           @change="changeCompanySize"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">客户评级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors ref="clientLevel" :options="taskLevelArr"
                                           @change="changeClientScale"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" id="" title="" class="form-control" v-model="clientRemark"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                            <button class="btn btn-primary" type="submit" :disable="isAddButtonDisable" @click="addClient">确定</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import fetch from '../../assets/utils/fetch.js'
import config from '../../assets/js/config'
import Cookies from 'js-cookie'
import common from '../../assets/js/common'

const clientLevelArr = [{name: '全部', value: ''}, ...config.clientLevelArr]
export default {
    data: function () {
        return {
            common: common,
            total: 0,
            current_page: 0,
            total_pages: 1,
            customizeInfo: {},
            clientTypeArr: config.clientTypeArr,
            clientLevelArr: clientLevelArr,
            keyMasterArr: config.isKeyMasterArr,
            clientsInfo: [],
            clientScaleArr: config.clientScaleArr,
            clientType: '',
            clientName: '',
            company: '', // 公司名称
            brand: '', // 品牌名称
            clientLevel: '',
            industriesArr: [], // 行业列表
            industry: '', // 行业
            natureArr: config.natureArr, // 公司性质
            nature: '', // 性质
            work: [''], // 代表作品
            clientAddressDetail: '',
            clientPrincipal: '',
            clientContact: '',
            clientContactPhone: '',
            clientContactPosition: '',
            otherContactWays: '', // 其他联系方式
            wechat: '', // 微信
            clientContactType: '', // 是否是关键人
            clientRemark: '',
            // clientPrincipalSearch: '', // 条件筛选的负责人
            clientPrincipalIdSearch: [], // 负责人id
            clientLevelSearch: '', // 条件筛选的公司级别
            companyName: '', // 公司名称
            user: {}, // 个人信息
            ragion: {}, // 区域
            clientScale: '',
            isLoading: true,
            taskLevelArr: config.taskLevelArr,
            cleanUp: false,
            exportParams: {},//导出参数
            canAdd: false, // 可以新增吗
            fetchData: {},
            customizeCondition: {},
            isAddButtonDisable: false,
            canShow:false,
            // canAdd: false, // 可以新增吗
        }
    },

    created () {
        this.getClients();
    },

    watch: {
        work () {
            console.log(this.work)
        }
    },

    mounted() {
        this.getField()
        // this.getClients();
        this.user = JSON.parse(Cookies.get('user'))
        // 清除负责人默认值的设置
        this.clearDefaultPrincipal()
        $('#addClient').on('hidden.bs.modal', () => {
            // 清空state
            this.cancelClient()
        })
        this.getIndustries()
    },

    computed: {
        ...mapState([
            'userList',
            'listPower'
        ])
    },

    methods: {
        getField() {
            let _this = this
            fetch('get', '/clients/filter_fields').then((params) => {
                _this.customizeInfo = params.data
            })
        },
        getClients: function (pageNum = 1) {
            const params = {
                page: pageNum,
                // include: 'principal',
            };

            // let url = '/clients'
            let url = '/clients_list'
            
            if (this.companyName) {
                params.keyword = this.companyName
            }
            if (this.clientLevelSearch) {
                params.grade = this.clientLevelSearch
            }
            if (this.clientPrincipalIdSearch.length > 0) {
                params.principal_ids = this.clientPrincipalIdSearch
            }
            let type = 'get'
            if (this.companyName || this.clientLevelSearch || this.clientPrincipalIdSearch.length > 0) {
                url = '/clients/filter'
                params.include = 'principal'
                type = 'post'
            }

            fetch(type, url, params).then(response => {
                this.isLoading = false;
                this.canShow = true
                this.clientsInfo = response.data;
                if (this.companyName || this.clientLevelSearch || this.clientPrincipalIdSearch.length > 0) {
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                } else {
                    this.current_page = response.current_page;
                    this.total = response.total;
                    this.total_pages = response.per_page != 0 ? Math.ceil(response.total / response.per_page) : 1;
                }
            }).catch(() => {
                this.isLoading = false;
            })
        },

        addClient: function () {
            if (!this.company) {
                toastr.error('请输入公司名称！');
                return
            }
            // if (!this.clientLevel) {
            //     toastr.error('请选择公司级别！');
            //     return
            // }
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
            if (!this.clientScale) {
                toastr.error('请选择客户评级！')
                return
            }
            if (this.clientContactPhone.length !== 11) {
                toastr.error('手机号码格式不对！');
                return
            }
            // if (!this.clientContactPosition) {
            //     toastr.error('请填写所属职位！')
            //     return
            // }
            if (!this.$store.state.newPrincipalInfo.id) {
                toastr.error('请选择负责人！')
                return
            }
            this.isAddButtonDisable = true;

            if (this.clientType === 1 || this.clientType === 2) {
                if (!this.clientName) {
                    toastr.error('请输入客户名称！');
                    return
                }

                if (!this.nature) {
                    toastr.error('请选择公司性质！')
                    return
                }

                let workCount = 0
                this.work.map(n => {
                    if (n) {
                        workCount++
                    }
                })

                if (workCount === 0) {
                    toastr.error('请输入代表作品！')
                    return
                }
            } else if (this.clientType === 3) {
                if (!this.brand) {
                    toastr.error('请填写品牌名称！')
                    return
                }
                if (!this.industry) {
                    toastr.error('请选择行业！')
                    return
                }
                if (!this.ragion.city) {
                    toastr.error('请选择地区！')
                    return
                }

            }
            let data = {
                type: this.clientType,
                company: this.company,
                // grade: this.clientLevel,
                // province: this.ragion.province || '',
                // city: this.ragion.city || '',
                // district: this.ragion.district || '',
                principal_id: this.$store.state.newPrincipalInfo.id,
                // address: this.clientAddressDetail,
                contact: {
                    name: this.clientContact,
                    phone: this.clientContactPhone,
                    position: this.clientContactPosition,
                    type: this.clientContactType,
                    other_contact_ways: this.otherContactWays,
                    wechat: this.wechat
                },
                client_rating: this.clientScale,
                desc: this.clientRemark
            }

            if (this.clientType === 1 || this.clientType === 2) {
                data.customer = this.clientName
                data.work = this.work
                data.nature = this.nature
            } else if (this.clientType === 3) {
                data.brand = this.brand
                data.industry = this.industry
                data.province = this.ragion.province || ''
                data.city = this.ragion.city || ''
                data.address = this.clientAddressDetail
                data.size = this.size
            }
            // /clients/store
            // fetch('post', '/clients', data).then(response => {
            fetch('post', '/clients/store', data).then(response => {
                this.isAddButtonDisable = false;
                toastr.success('创建成功');
                $("#addClient").modal("hide");
                this.$router.push({path: 'clients/' + response.data.id});
            })
        },

        customize: function (value) {
            this.customizeCondition = value
            this.fetchHandler('post', '/clients/filter', 'filter')
        },
        fetchHandler(methods, url, type) {
            let _this = this,
                fetchData = this.fetchData,
                newUrl
            this.fetchData.include = 'include=principal'
            this.fetchData.page = '&page='+this.current_page
            if (type == 'filter') {
                fetchData = this.customizeCondition
                let keyword, status, principal_ids
                if (this.fetchData.keyword) {
                    keyword = '&keyword=' + this.fetchData.keyword
                } else {
                    keyword = ''
                }
                if (this.clientPrincipalIdSearch.length > 0) {
                    this.customizeCondition.principal_ids = this.clientPrincipalIdSearch
                }
                if (this.clientLevelSearch) {
                    status= '&grade=' + this.clientLevelSearch
                } else {
                    status= ''
                }
                newUrl = url + '?' + this.fetchData.include + keyword + status +this.fetchData.page 
            }
            
            fetch(methods, newUrl || url, fetchData).then((response) => {
                

                _this.clientsInfo = response.data
                _this.total = response.meta.pagination.total;
                _this.current_page = response.meta.pagination.current_page;
                _this.total_pages = response.meta.pagination.total_pages;
                _this.isLoading = false;
                this.canShow = true
            })
        },

        changeClientType: function (value) {
            this.clientType = value;
        },

        changeClientLevel: function (value) {
            this.clientLevel = value
        },

        changePrincipal: function (value) {
            this.clientPrincipal = value
        },
        filterGo(e) {
            // console.log(e.target.value)
            this.companyName = e.target.value.trim()
            this.fetchData.keyword = this.companyName
            this.exportParams.keyword = this.companyName
            this.fetchHandler('post', '/clients/filter', 'filter')

        },
        changePrincipalSelect(value) {
            this.clientPrincipalIdSearch = value
            this.exportParams.principal_ids = value
            this.fetchHandler('post', '/clients/filter', 'filter')
        },

        changeClientLevelSelect(value) {
            
            this.clientLevelSearch = value
            this.exportParams.status = value
            this.fetchHandler('post', '/clients/filter', 'filter')
        },

        changeClientScale: function (value) {
            this.clientScale = value
        },
        // 选择地区
        changeAreaData(val) {
            if (val.city.name) {
                this.ragion.province = val.province.name
                this.ragion.city = val.city.name !== '市辖区' ? val.city.name : val.province.name
                // this.ragion.district = val.area.name
            }
        },
        // show add
        showAddModal(val) {
            // let organization_id = JSON.parse(Cookies.get('user')).organization_id
            // if (val == 3) {
            //     if (organization_id == 411) {
            //         val = 3
            //     } else if (organization_id == 412) {
            //         val = 4
            //     }
            // }
            this.setDefaultPrincipal()
            this.clientType = val
            $('#addClient').modal()
        },
        // 关键决策人
        changeContactClientType(val) {
            this.clientContactType = val
        },
        // 设置默认负责人
        setDefaultPrincipal() {
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            })
        },
        // 清空默认负责人
        clearDefaultPrincipal() {
            this.$store.commit('changeNewPrincipal', {name: '', id: ''})
        },
        // 关闭弹窗
        cancelClient() {
            this.clientType = ''
            this.clientName = ''
            this.clientLevel = ''
            this.clientContactType = ''
            this.brand = ''
            this.industry = ''
            this.company = ''
            this.size = ''
            this.nature = ''
            this.work = ''
            this.$refs.clientLevel.setValue('')
            this.$refs.clientContactType.setValue('')
            this.$refs.industryElm.setValue('')
            this.$refs.natureElm.setValue('')
            this.$refs.region.reset()
            this.ragion.province = {}
            this.clientContact = ''
            this.clientContactPhone = ''
            this.clientContactPosition = ''
            this.wechat = ''
            this.otherContactWays = ''
            this.clientContactType = ''
            this.clientScale = ''
            this.$refs.clientScale.setValue('')
            this.clientRemark = ''
            this.clientAddressDetail = ''
            this.clearDefaultPrincipal()
        },
        goDetail(id) {
            this.$router.push('/clients/' + id)
        },
        // 获取行业
        getIndustries () {
            fetch('get', '/industries/all').then(res => {
                res.data.map(n => {
                    this.industriesArr.push({
                        name: n.name,
                        value: n.id
                    })
                })
            })
        },
        // 选择公司性质
        changeNature (val) {
            this.nature = val
        },
        //  选择行业
        changeIndustry (val) {
            this.industry = val
        },
        // 删除代表作品
        delWork (index) {
            const arr = this.work
            arr.splice(index, 1)
            this.work = arr
        },
        // 改变公司规模
        changeCompanySize (val) {
            this.size = val
        }
    },
};
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

    table tbody tr {
        cursor: pointer;
    }

    .modal-body .example {
        display: flex;
        align-items: center;
    }
    .example {
        input {
            margin-top: 0;
            &:nth-of-type(n + 2) {
                margin: 10px 0;
            }
        }
    }
</style>
