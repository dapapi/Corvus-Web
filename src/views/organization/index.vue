<template>
    <div class="page-main" style="background-color:#f3f4f5">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">组织架构</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix" style="padding-bottom: 20px;">
                    <!-- <div class="col-md-3 example float-left">
                        <div class="input-search">
                            <button type="button" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                            </button>
                            <input type="text" v-model="keyword" class="form-control" placeholder="搜索部门" />
                        </div>
                    </div> -->

                    <div class="col-md-12 float-left">
                        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-toggle="tab" href="#member"
                                   aria-controls="forum-present"
                                   aria-expanded="true" role="tab">企业成员</a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" href="#position"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">企业职位</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" href="#disabled-account"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">已禁用账号</a>
                            </li>
                        </ul>

                        <div class="tab-content nav-tabs-animate bg-white col-md-12">
                            <div class="tab-pane animation-fade active pt-10" id="member" role="tabpanel">
                                <h5>泰洋系 
                                    <span class="color999" style="font-weight: 300;">（{{count}}人）</span> 
                                    <span class="principal">负责人</span>
                                    <span style="float: right; cursor: pointer;"><router-link to="/organization/management">管理部门</router-link></span>
                                </h5>
                                <template v-for="(item, index) in department">
                                    <Department 
                                        :data="item" 
                                        :dIndex="index"
                                        :bgColor="dIndex === index" 
                                        :checkMember="checkMember"
                                        @changeIndex="changeIndex"
                                        :key="index" />
                                </template>
                            </div>
                            <div class="tab-pane animation-fade" id="position" role="tabpanel">
                                <table class="table table-hover is-indent position-table" data-plugin="animateList"
                                    data-animate="fade"
                                    data-child="tr"
                                    data-selectable="selectable">
                                    <thead>
                                        <tr class="animation-fade">
                                            <th>职位名称</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="position in positionArr" :key="position.id">
                                            <td>{{ position.name }}</td>
                                            <td>
                                                <i class="iconfont icon-bianji2" aria-hidden="true" @click="showEditPosition(position)"></i>&nbsp;&nbsp;
                                                <i class="iconfont icon-shanchu1" aria-hidden="true" @click="shouleDelPosition(position.id)"></i>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <pagination :current_page="currentPage" :method="getPositionList" :total_pages="totalPages"
                                        :total="total"></pagination>

                                    <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#position-add">
                                        <button type="button"
                                                class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                            <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                                            style="font-size:30px"></i>
                                            <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                                            style="font-size:30px"></i>
                                        </button>
                                    </div>
                                </table>
                            </div>
                            <div class="tab-pane animation-fade" id="disabled-account" role="tabpanel">
                                <table class="table table-hover is-indent" data-plugin="animateList"
                                    data-animate="fade"
                                    data-child="tr"
                                    data-selectable="selectable">
                                    <thead>
                                        <tr class="animation-fade">
                                            <th>姓名</th>
                                            <th>手机号</th>
                                            <th>邮箱</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="list in disabledArr" :key="list.id">
                                            <td>{{ list.name }}</td>
                                            <td>{{ list.phone }}</td>
                                            <td>{{ list.email }}</td>
                                            <td><span @click="enable(list.id)">启用</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <pagination :current_page="disCurrentPage" :method="getDisabledList" :total_pages="disTotalPages"
                                    :total="disTotal"></pagination>
                            </div>
                        </div>
                        
                    </div>

                    <!-- 选择成员 -->
                    <Modal id="check-member" title="选择成员" @onOK="sureCheckMember">
                        <ListSelectMember />
                    </Modal>
                    <!-- 确认删除 -->
                    <flag :id="'delPosition'" @confirmFlag="deletePosition"/>
                    <!-- 职位新增 -->
                    <Modal id="position-add" title="职位" @onOK="handlePosition">
                        <div class="example">
                            <div class="col-md-3 text-right float-left">职位名称</div>
                            <div class="col-md-8 float-left pl-0">
                                <input type="text" v-model="positionName" placeholder="" class="form-control">
                            </div>
                        </div>
                    </Modal>
                    <!-- 职位编辑 -->
                    <Modal id="position-edit" title="职位" @onOK="editPosition">
                        <div class="example">
                            <div class="col-md-3 text-right float-left">职位名称</div>
                            <div class="col-md-8 float-left pl-0">
                                <input type="text" v-model="positionName" placeholder="" class="form-control">
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import fetch from '../../assets/utils/fetch.js'
import { mapState, mapActions } from 'vuex'

    export default {
        name: 'Organization',
        data() {
            return {
                keyword: '',
                count: 0,
                dIndex: -1,
                positionArr: [], // 职位列表
                positionName: '', // 职位名称
                positionId: '',
                currentPage: 1, //
                total: 0,
                totalPages: 0,
                disabledArr: [], //
                disCurrentPage: 1, //
                disTotal: 0,
                disTotalPages: 0,
            }
        },

        computed: {
            ...mapState([
                'department',
            ]),
            _department () {
                return this.department
            }
        },

        mounted () {
            this.count = this.countNum(this._department)
            this.getPositionList()
            this.getDisabledList()
            // 清除state
            $('#position-add').on('hidden.bs.modal', () => {
                // 清空state
                this.positionName = ''
            })
            $('#position-edit').on('hidden.bs.modal', () => {
                // 清空state
                this.positionName = ''
                this.positionId = ''
            })
        },

        watch: {
            _department () {
                this.count = this.countNum(this._department)
            }
        },

        methods: {
            ...mapActions([
                'getDepartment', // 获取部门数据
            ]),
            // 计算人数
            countNum (data) {
                let count = 0
                data.map(n => {
                    count += n.users.data.length + this.countNum(n.departments.data)
                })
                return count
            },
            // 选择
            checkMember (data) {
                this.departmentId = data.id
                this.$store.commit('changeNewParticipantsInfo', JSON.parse(JSON.stringify(data.users.data)))
                $('#check-member').modal()
            },
            // 选择成员
            sureCheckMember () {
                let length = this.$store.state.newParticipantsInfo.length
                const params = {
                    user: length > 0 ? this.$store.state.newParticipantsInfo.map(n => n.id): ''
                }
                fetch('put', `/departments/member/${this.departmentId}`, params).then(res => {
                    $('#check-member').modal('hide')
                    toastr.success('成员选择成功')
                    this.getDepartment()
                })
            },
            // index
            changeIndex (index) {
                this.dIndex = index
            },
            // 获取职位列表
            getPositionList (page = 1) {
                const params = {
                    page: page
                }
                fetch('get', '/position', params).then(res => {
                    this.positionArr = res.data
                    const meta = res.meta
                    this.currentPage = meta.pagination.current_page || 1;
                    this.totalPages = meta.pagination.total_pages || 1;
                    this.total = meta.pagination.total || 1;
                })
            },
            // 是否删除职位
            shouleDelPosition (id) {
                this.positionId = ''
                this.positionId = id
                $("#delPosition").modal();
            },
            // 删除职位
            deletePosition () {
                fetch('delete', `/position/${this.positionId}`).then(res => {
                    this.getPositionList()
                })
            },
            // 编辑职位
            showEditPosition (data) {
                this.positionName = data.name
                this.positionId = data.id
                $("#position-edit").modal()
            },
            // 编辑职位
            editPosition () {
                const params = {
                    name: this.positionName
                }
                fetch('put', `/position/${this.positionId}`, params).then(res => {
                    toastr.success('编辑成功！')
                    this.positionId = ''
                    this.positionName = ''
                    $("#position-edit").modal('hide')
                    this.getPositionList()
                })
            },
            // 新增职位
            handlePosition () {
                if (!this.positionName) {
                    toastr.error('职位不能为空！')
                    return
                }
                const params = {
                    name: this.positionName
                }
                fetch('post', '/position', params).then(res => {
                    toastr.success('添加成功！')
                    this.getPositionList()
                    this.positionName = ''
                    $("#position-add").modal('hide')
                })
            },
            // 获取禁用账号列表
            getDisabledList (page = 1) {
                const params = {
                    page: page,
                    disable: 2
                }
                fetch('get', '/position/disable', params).then(res => {
                    this.disabledArr = res.data
                    const meta = res.meta
                    this.disCurrentPage = meta.pagination.current_page || 1;
                    this.disTotalPages = meta.pagination.total_pages || 1;
                    this.disTotal = meta.pagination.total || 1;
                })
            },
            // 启用账号
            enable (id) {
                const params = {
                    disable: 1 // 1 启用；2 禁用
                }

                fetch('put', `/position/disable/${id}`, params).then(res => {
                    toastr.success('启用成功！')
                    this.getDisabledList()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .color999 {
        color: #999;
    }
    .input-search i {
        cursor: pointer;
    }
    h5 {
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    h5 a{
        color: #333;
    }
    h5 a:hover {
        text-decoration: none;
    }
    .principal {
        position: absolute;
        left: 300px;
    }
    .nav {
        justify-content: flex-end;
    }
    .position-table {
        tr {
            td:last-child {
                float: right;
                i:hover {
                    cursor: pointer;
                    color: #3f51b5;
                }
            }
        }
    }
    tr {
        td {
            span {
                cursor: pointer;
                &:hover {
                    color: #3f51b5;
                }
            }
        }
    }
</style>

