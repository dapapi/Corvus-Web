<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">组织架构</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <div class="input-search">
                            <button type="button" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                            </button>
                            <input type="text" v-model="keyword" class="form-control" placeholder="搜索部门" />
                        </div>
                    </div>

                    <div class="col-md-12 example float-left">
                        <h1 class="page-title">泰洋系 <span class="color999">（{{count}}人）</span></h1>
                        <template v-for="(item, index) in data">
                            <Department :data="item" :bgColor="true" :key="index" />
                        </template>
                        <!-- <Department v-for="da" :data="data" :bgColor="true" /> -->
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
        data() {
            return {
                keyword: '',
                data: [],
                count: 0,
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
</style>

