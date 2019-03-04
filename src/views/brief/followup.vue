<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">跟进的问题</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="col-md-12 panel">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">待处理</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已处理</a>
                        </li>
                    </ul>
                    <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                        <ul class="list-group ">
                        <li class="list-group-item p-0 mb-10">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么<span class="px-5" style="color:#01BCD4;cursor:pointer" data-toggle="modal" data-target="#submitReport">查看简报</span></p>
                            <span class="float-righticonfont icon-bianji2"></span>
                            <p>文本</p>
                            <p>数字</p>
                            <p>链接</p>
                            <p>附件</p>
                        </li>
                        <li class="list-group-item mb-10 p-0" >
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么<span class="px-5" style="color:#01BCD4;cursor:pointer" data-toggle="modal" data-target="#submitReport">查看简报</span></p>
                            <span class="float-righticonfont icon-bianji2"></span>
                            <p>文本</p>
                            <p>数字</p>
                            <p>链接</p>
                            <p>附件</p>
                        </li>
                        <li class="list-group-item mb-10 p-0" >
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么<span class="px-5" style="color:#01BCD4; cursor:pointer" data-toggle="modal" data-target="#submitReport">查看简报</span></p>
                            <span class="float-righticonfont icon-bianji2"></span>
                            <p>文本</p>
                            <p>数字</p>
                            <p>链接</p>
                            <p>附件</p>
                        </li>
                    </ul>
                        <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination> -->
                    </div>
                </div>
                </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
            <button type="button"  class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
            </button>
        </div>
        <submit-report></submit-report>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import env from '@/assets/js/env'

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
            fetch('get',`${env.apiUrl}/issues/1293569893/operate_log`).then((res) => {
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




    
    






