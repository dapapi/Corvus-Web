<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">待我审批</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" placeholder="搜索成员、简报类型">
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
                                <th class="cell-300" scope="col">简报类型</th>
                                <th class="cell-300" scope="col">成员</th>
                                <th class="cell-300" scope="col">简报周期</th>
                                <th class="cell-300" scope="col">提交时间</th>
                                <th class="cell-300" scope="col">状态</th>
                                
                            </tr>
                            <tr >
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        的爽肤水地方
                                    </div>
                                </td>
                                <td><div data-toggle="modal" data-target="#submitReport">
                                        屈素芳
                                    </div></td>
                                <td><div data-toggle="modal" data-target="#submitReport">
                                        每周
                                    </div></td>
                                <td><div data-toggle="modal" data-target="#submitReport">
                                        2018-11-23
                                    </div></td>
                                <td><div data-toggle="modal" data-target="#submitReport">的方式地方</div></td>
                                
                            </tr>
                            <tr data-toggle="modal" data-target="#submitReport">
                                <td class="pointer-content">
                                    的爽肤水地方
                                </td>
                                <td>屈素芳</td>
                                <td>每周</td>
                                <td>2018-11-23</td>
                                <td>的方式地方</td>
                                
                            </tr>
                            <tr data-toggle="modal" data-target="#submitReport">
                                <td class="pointer-content">
                                    的爽肤水地方
                                </td>
                                <td>屈素芳</td>
                                <td>每周</td>
                                <td>2018-11-23</td>
                                <td>的方式地方</td>
                                
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
        <Submitreport></Submitreport>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[], 
        }
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




    
    






