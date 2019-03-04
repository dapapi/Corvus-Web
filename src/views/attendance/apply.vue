<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我申请的</h1>
        </div>
        <div class="page-content container-fluid">
            <!--<div class="panel">-->
                <!--<div class="col-md-4  p-20">-->
                    <!--<div class="input-search">-->
                        <!--<button type="button" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>-->
                        <!--</button>-->
                        <!--<input v-model="sendData.search" type="text" class="form-control" placeholder="输入编号、类型或申请人" @blur="getlist">-->
                    <!--</div>-->
                <!--</div>-->
                <!---->
            <!--</div>-->
            <div class="col-md-12 panel">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getlist(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">待审批</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getlist(2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已审批</a>
                        </li>
                    </ul>
                    <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                        <table v-if="list.length>0" class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">类型</th>
                                <th class="cell-300" scope="col">开始时间</th>
                                <th class="cell-300" scope="col">结束时间</th>
                                <th class="cell-300" scope="col">天数</th>
                                <th class="cell-300" scope="col">审批状态</th>
                                
                            </tr>
                            <tr v-for="(item,index) in list" :key="index" @click="toDetails(item.id)">
                                <td class="pointer-content">{{allType[item.type]}}</td>
                                <td>{{item.start_at}}</td>
                                <td>{{item.end_at}}</td>
                                <td>{{item.number}}</td>
                                <td>
                                    <div>
                                        <button v-show="item.status == '待审批'" class="btn btn-primary">待审批</button>
                                        <button v-show="item.status == '已同意'" class="btn btn-warning">已同意</button>
                                        <button v-show="item.status == '已拒绝'" class="btn btn-danger">已拒绝</button>
                                        <button v-show="item.status == '已作废'" class="btn btn-danger">已作废</button>
                                    </div>
                                </td>
                                
                            </tr>
                            
                        </table>
                        <div v-else style="margin: 6rem auto;width: 100px">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                        <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination> -->
                    </div>
                </div>
                </div>
        </div>
        
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import env from '@/assets/js/env'

export default {
    data(){
        return {
            list:[],
            allType:{1:'请假',2:'加班',3:'出差',4:'外勤'}, 
            sendData:{
                status:[1],
                search:''
            }
               
    
        }
    },
    mounted(){
        this.getlist()
    },
    methods:{
        
        getlist:function(type){
            type == 2?this.sendData.status =[2,3,4]:this.sendData.status = [1]
            fetch('get',`${env.apiUrl}/attendance/myapply`,this.sendData).then((res) => {
                this.list = res.data
            })
        },
        toDetails:function(id){
            this.$router.push({path:'/attendance/details',params:{id:id}})
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




    
    







