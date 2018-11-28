<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered clearfix">
            <h1 class="page-title float-left">填写申请类型和名称</h1>
            <button class="btn btn-warning float-left ml-10">待审批</button>
            <!-- <button class="btn btn-success float-left ml-10">已审批</button>
            <button class="btn btn-default float-left ml-10">已撤销</button>
            <button class="btn btn-default float-left ml-10">已作废</button>

            <button class="btn btn-default">同意</button>
            <button class="btn btn-danger">拒绝</button>
            <button class="btn btn-default">转交</button> -->
        </div>
        <div class="page-content container-fluid">
            <div class="panel p-20">
                <div class="row">
                     <div class="col-md-2">当前状态</div>
                    <div class="col-md-10 clearfix">
                        <div class="float-left">
                            <img src="../../assets/logo.png" alt="" width="20px" height="20px" style="border-radius:50%;background-color:#f1f1f1">
                            <span class="ml-5 mr-30">待屈素芳审批</span>
                            <button class="btn-primary">待审批</button>
                            <!-- <button class="btn-success">已审批</button>
                            <button class="btn-default">已撤销</button>
                            <button class="btn-default">已作废</button>
                            <button class="btn-danger">已拒绝</button>
                            <button class="btn-danger">已作废</button> -->
                        </div>
                        <div class="float-right">
                            <button class="btn-primary mr-10">撤销</button>
                            <button class="btn-danger">提醒</button>


                            <!-- <button class="btn-primary">作废</button>
                            <button class="btn-primary">重新提交</button>
                            <button class="btn-primary">重新提交</button>
                            <button class="btn-danger">作废</button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 p-0">
                
                <div class="card panel p-20">
                    <div class="card-header card-header-transparent card-header-bordered clearfix">
                        
                        <span class="float-left">屈素芳-加班</span>
                        <span class="float-right">编号:2019230923801298</span>
                    </div>
                    <div class="card-block ">
                        <div class="card-text py-5 row">
                            <div class="col-md-1 text-right pr-5">申请人</div>
                            <div class="col-md-4 text-left">
                                <img src="../../assets/logo.png" alt="" width="20px" height="20px" style="border-radius:50%;background-color:#f1f1f1">
                                <span class="ml-5 mr-30">屈素芳</span>
                            </div>
                            <div class="col-md-2 text-right pr-5">部门</div>
                            <div class="col-md-4 text-left">泰阳系</div>
                        </div>
                        <div class="card-text  py-5 row">
                            <div class="col-md-1 text-right pr-5">部门</div>
                            <div class="col-md-4 text-left">泰阳系</div>
                            <div class="col-md-2 text-right pr-5">申请时间</div>
                            <div class="col-md-4 text-left">2018-12-24</div>
                        </div>
                    </div>
                    <div style="border-bottom:2px dashed #f4f4f4;"></div>
                    <div class="card-block">
                        <div class="card-text  py-5 row">
                            <div class="col-md-1 text-right pr-5">地点</div>
                            <div class="col-md-4 text-left">泰阳系</div>
                            <div class="col-md-2 text-right pr-5">天数</div>
                            <div class="col-md-4 text-left">4</div>
                        </div>
                        <div class="card-text  py-5 row">
                            <div class="col-md-1 text-right">开始时间</div>
                            <div class="col-md-4 text-left">2018-12-23</div>
                            <div class="col-md-2 text-right pr-5">结束时间</div>
                            <div class="col-md-4 text-left">2018-10-12</div>
                        </div>
                         <div class="card-text  py-5 row">
                            <div class="col-md-1 text-right pr-5">事由</div>
                            <div class="col-md-4 text-left">水电费水电费</div>
                            <div class="col-md-2 text-right pr-5">附件</div>
                            <div class="col-md-4 text-left">测试合同.eps</div>
                        </div>
                    </div>
                </div>
                <div class="card panel p-20 ">
                    <div class="card-header card-header-transparent card-header-bordered">
                        审批流程
                    </div>
                    <div class="card-block">
                       <div class="pearls row">
                      <div class="pearl current col-4">
                        <div class="pearl-icon"><i class="icon wb-user" aria-hidden="true"></i></div>
                        <span class="pearl-title">Account Info</span>
                      </div>
                      <div class="pearl disabled col-4">
                        <div class="pearl-icon"><i class="icon wb-payment" aria-hidden="true"></i></div>
                        <span class="pearl-title">Billing Info</span>
                      </div>
                      <div class="pearl disabled col-4">
                        <div class="pearl-icon"><i class="icon wb-check" aria-hidden="true"></i></div>
                        <span class="pearl-title">Confirmation</span>
                      </div>
                    </div>
                    </div>
                </div>
                <div class="card panel pt-0 p-20 ">
                    <div class="card-block p-0">
                         <ul class="list-group list-group-dividered p-10">
                             <li class="list-group-item px-0 row clearfix">
                                <div class="col-md-3 float-left">
                                    <span class="pr-10">审批</span>
                                    <img src="../../assets/logo.png" alt="" width="20px" height="20px" style="border-radius:50%;background-color:#f1f1f1">
                                    <span class="pl-5">屈素芳</span>
                                </div>
                                <div class="col-md-3 float-left">
                                    <span class="pr-10">操作</span>
                                    
                                    <span>同意审批</span>
                                </div>
                                <div class="col-md-6 float-left">
                                    <span class="pr-10">审批时间</span>
                                    
                                    <span>2018-12-20</span>
                                </div>
                             </li>
                             <li class="list-group-item px-0 row clearfix">
                                <div class="col-md-3 float-left">
                                    <span class="pr-10">审批</span>
                                    <img src="../../assets/logo.png" alt="" width="20px" height="20px" style="border-radius:50%;background-color:#f1f1f1">
                                    <span class="pl-5">屈素芳</span>
                                </div>
                                <div class="col-md-3 float-left">
                                    <span class="pr-10">操作</span>
                                    
                                    <span>同意审批</span>
                                </div>
                                <div class="col-md-6 float-left">
                                    <span class="pr-10">审批时间</span>
                                    
                                    <span>2018-12-20</span>
                                </div>
                             </li>
                             <li class="list-group-item px-0 row clearfix">
                                <div class="col-md-3 float-left">
                                    <span class="pr-10">审批</span>
                                    <img src="../../assets/logo.png" alt="" width="20px" height="20px" style="border-radius:50%;background-color:#f1f1f1">
                                    <span class="pl-5">屈素芳</span>
                                </div>
                                <div class="col-md-3 float-left">
                                    <span class="pr-10">操作</span>
                                    
                                    <span>同意审批</span>
                                </div>
                                <div class="col-md-6 float-left">
                                    <span class="pr-10">审批时间</span>
                                    
                                    <span>2018-12-20</span>
                                </div>
                             </li>
                             <li class="list-group-item px-0 row clearfix">
                                <div class="float-left mr-5 pl-10 ml-5">知会人</div>
                                <div class="col-md-10">
                                    <addMember></addMember>
                                </div>
                             </li>
                         </ul>
                    </div>
                </div>
                <div class="card panel p-20">
                    <div class="card-header card-header-transparent card-header-bordered">
                       审批意见
                    </div> 
                    <div class="card-block">
                        <textarea class="form-control"></textarea>
                    </div>
                </div>
            </div>
                
        </div>
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




    
    






