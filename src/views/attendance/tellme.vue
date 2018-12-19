<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">知会我的</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="md-search" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" placeholder="输入编号、类型或申请人">
                    </div>
                </div>
                
            </div>
            <div class="col-md-12 panel">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">待审批</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已审批</a>
                        </li>
                    </ul>
                    <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-200" scope="col">申请人</th>
                                <th class="cell-200" scope="col">类型</th>
                                <th class="cell-300" scope="col">开始时间</th>
                                <th class="cell-300" scope="col">结束时间</th>
                                <th class="cell-200" scope="col">天数</th>
                                <th class="cell-100" scope="col">审批状态</th>
                                
                            </tr>
                            <tr v-for="(item,index) in list" :key="index">
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        屈素芳{{item.id}}
                                    </div>
                                </td>
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        加班{{item.id}}
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018-12-27 19:00
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018-12-27 21:00
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2小时
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        <button class="btn btn-primary">待审核</button>
                                        <!-- <button class="btn btn-warning">已同意</button>
                                        <button class="btn btn-danger">已拒绝</button> -->

                                    </div>
                                </td>
                                
                            </tr>
                            
                        </table>
                        <pagination></pagination>
                        <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination> -->
                    </div>
                </div>
                </div>
        </div>
        
        <submit-report></submit-report>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[
                {
                    id:1,
                    name:'sjdks'
                },
                {
                    id:2,
                    name:'sjdks'
                },
                {
                    id:3,
                    name:'sjdks'
                },
                {
                    id:4,
                    name:'sjdks'
                },
                {
                    id:5,
                    name:'sjdks'
                },
                {
                    id:6,
                    name:'sjdks'
                }
            ], 
        }
    },
    mounted(){
        // this.getlist()
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




    
    









