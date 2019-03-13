<template>
    <div class="page">

        <NavBack title="历史归档" href="/staff"></NavBack>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade" data-child="tr"
                       data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <!-- <th class="cell-300" scope="col">序号</th> -->
                        <th class="cell-300" scope="col">姓名</th>
                        <th class="cell-300" scope="col">手机</th>
                        <th class="cell-300" scope="col">归档日期</th>
                    </tr>
                    <tbody>
                    <tr v-for="(item, index) in data" :key="index" @click="goDetail(item.id)">
                        <!-- <th scope="row">1</th> -->
                        <td>{{ item.name }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.archive_time }}</td>
                    </tr>
                    </tbody>

                </table>

                <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                            :total="total"></pagination> -->
            </div>
        </div>
        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>
<script>
import fetch from '../../assets/utils/fetch'

export default {
    name: 'staffHistory',
    data () {
        return {
            data: []
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            fetch ('get', '/archive').then((res) => {
                this.data = res.data
            })
        },
        goDetail (id) {
            this.$router.push({name: 'staffDetail', params: { id: id }})
        }
    }
}
</script>

<style scoped>
.page {
    margin-left: 0px!important;
}
table tbody tr {
    cursor: pointer;
}
</style>

