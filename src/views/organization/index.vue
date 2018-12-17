<template>
    <div class="page-main" style="background-color:#f3f4f5">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">组织架构</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix" style="padding-bottom: 20px;">
                    <div class="col-md-3 example float-left">
                        <div class="input-search">
                            <button type="button" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                            </button>
                            <input type="text" v-model="keyword" class="form-control" placeholder="搜索部门" />
                        </div>
                    </div>

                    <div class="col-md-12 float-left" style="magin-top: -20px;">
                        <h5>泰洋系 
                            <span class="color999" style="font-weight: 300;">（{{count}}人）</span> 
                            <span class="principal">负责人</span>
                            <span style="float: right; cursor: pointer;"><router-link to="/organization/management">管理部门</router-link></span>
                        </h5>
                        <template v-for="(item, index) in data">
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

    export default {
        data() {
            return {
                keyword: '',
                data: [],
                count: 0,
                dIndex: -1,
            }
        },

        mounted() {
            this.getDepartment()
        },

        methods: {
            // 获取部门数据
            getDepartment () {
                fetch('get', '/departments').then(res => {
                    this.data = res.data
                    this.count = this.countNum(this.data)
                })
            },
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
                this.$store.commit('changeNewParticipantsInfo', data.users.data)
                $('#check-member').modal()
            },
            // 选择成员
            sureCheckMember () {
                const params = {
                    user: this.$store.state.newParticipantsInfo.map(n => n.id)
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

