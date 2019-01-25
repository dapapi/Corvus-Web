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
                                   placeholder="请选择领取状态"></selectors>
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
                        <li class="nav-item" role="presentation" @click="changeTakeType()">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">所有线索</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="changeTakeType(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">未被领取</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white pb-0">
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
                starsArr: [],
                customizeInfo: {},
                clientLevelArr: config.clientLevelArr,
                trailOriginArr: config.trailOrigin,
                selectCompany: '',
                targetStars: '',
                recommendStars: '',
                trailPrincipal: '',
                trailFilter: '',
                email: '',
                trailFee: '',
                trailOriginPerson: '',
                industry: '',
                priority: '',
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
                trailTakeType: '',
            }
        },
        created() {
            this.getField();
            this.getCurrentUser()
        },
        mounted() {
            this.getTrails();
            this.getStars();
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

                fetch('get', '/pool/filter_fields').then((params) => {
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

            changeTakeType(type) {
                this.trailTakeType = type;
                this.getTrails()
            },

            getTrails(pageNum = 1) {
                this.selectedTrailsArr = [];
                this.selectAllTrail = false;
                let data = {
                    page: pageNum
                };
                if (this.trailTakeType) {
                    data.take_type = this.trailTakeType
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
                fetch('post', '/pool/allot', data).then(() => {
                    this.getTrails();
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
                    _this.total_pages = params.meta.pagination.total_pages
                    _this.cleanUp = true
                })

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





