<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">统计</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" placeholder="搜索成员、周期">
                    </div>
                </div>
                
            </div>
            <div class="col-md-12 panel">
                    <div>
                    <div class="example p-5 pt-20">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">成员</th>
                                <th class="cell-300">已提交</th>
                                <th class="cell-300">未提交</th>
                                <th class="cell-300">第一周</th>
                                <th class="cell-300">第二周</th>
                                <th class="cell-300">第三周</th>
                                <th class="cell-300">第四周</th>
                                <th class="cell-300">第五周</th>
                                <th class="cell-300">第六周</th>
                                <th class="cell-300">第七周</th>
                                
                            </tr>
                            <tr >
                                <td class="pointer-content">屈素芳</td>
                                <td>0</td>
                                <td>20</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                
                            </tr>
                            <tr >
                                <td class="pointer-content">李乐</td>
                                <td>0</td>
                                <td>20</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                        <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination> -->
                    </div>
                </div>
                </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
            <button type="button"  class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
        <submitreport></submitreport>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
import submitreport from '@/components/SubmitReport'

export default {
    data(){
        return {
            list:[], 
        }
    },
    components:{
        submitreport
    },
    mounted(){
        this.getlist()
    },
    methods:{
        redirectBriefDetails:function(id){
            this.$router.push({path:'/brief/details',query:{id:id}})
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
        getlist:function(){
            fetch('get',`${config.apiUrl}/launch`).then((res) => {
                this.list = res.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-main{
        background-color:#f3f4f5 !important;
    }
    tr{
        &:hover{
            background-color:#f5f5f5;
            cursor: pointer;
        }
    }
</style>




    
    






