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

                    <div class="col-md-12 float-left" style="magin-top: -20px;">
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

                    <!-- 选择成员 -->
                    <Modal id="check-member" title="选择成员" @onOK="sureCheckMember">
                        <ListSelectMember />
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
</style>

