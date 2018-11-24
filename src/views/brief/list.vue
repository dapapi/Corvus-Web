<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的简报</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="col-md-12 row">
                
                <div class="col-md-10 panel p-20">
                    <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                        data-child="tr"
                        data-selectable="selectable">
                        <tr>
                            <th class="cell-300" scope="col">简报周期</th>
                            <th class="cell-300" scope="col">提交时间</th>
                            <!-- <th class="cell-300" scope="col">活动</th> -->
                            <th class="cell-300" scope="col">状态</th>
                            <th class="cell-300" scope="col">操作</th>
                            
                        </tr>
                        <tr>
                            <td class="pointer-content">
                                2018年第4季度
                            </td>
                            <!-- <td>sdfsdf</td> -->
                            <td>sdfsdf</td>
                            <td>
                                <button class="btn-success">已审批</button>
                            </td>
                            <td>写季报</td>
                        </tr>
                        <tr>
                            <td class="pointer-content">
                                2018年第4季度
                            </td>
                            <td>sdfsdf</td>
                            <!-- <td>sdfsdf</td> -->
                            <td>
                                <button class="btn-success">已审批</button>
                            </td>
                            <td>写季报</td>
                        </tr>
                        <tr>
                            <td class="pointer-content">
                                2018年第4季度
                            </td>
                            <td>sdfsdf</td>
                            <!-- <td>sdfsdf</td> -->
                            <td>
                                <button class="btn-success">已审批</button>
                            </td>
                            <td>写季报</td>
                        </tr>
                    </table>
                </div>
                <briefright></briefright>
                <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                            :total="total"></pagination> -->
            </div>
                
        </div>
        <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
            <button type="button"  class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
import briefright from '@/components/briefRight'

export default {
    data(){
        return {
            list:[], 
        }
    },
    components:{
        briefright
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
</style>




    
    








