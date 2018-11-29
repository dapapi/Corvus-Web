<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">成员</h1>
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
                    <div class="example pt-20 pb-5">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">成员</th>
                                <th class="cell-300" scope="col">简报周期</th>
                                <th class="cell-300" scope="col">提交时间</th>
                                <th class="cell-300" scope="col">状态</th>
                               
                                
                            </tr>
                            <tr >
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        屈素芳
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        每周
                                    </div>
                                </td>
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018-11-22
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">已提交</div>
                                </td>
                                
                            </tr>
                            <tr >
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        屈素芳
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        每周
                                    </div>
                                </td>
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018-11-22
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">已提交</div>
                                </td>
                                
                            </tr>
                            <tr >
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        屈素芳
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        每周
                                    </div>
                                </td>
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018-11-22
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">已提交</div>
                                </td>
                                
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
        <submit-report></submit-report>
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




    
    






