<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">提交简报</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="">
                <div class="row py-5">
                    <div class="col-lg-4" v-for="item in list" :key="item.id" >
                        <div v-if="item.status === null" class="card" @click="redirectBriefDetails(item.id,item.frequency,item.template_name)">
                            <div class="card-block clearfix">
                                <img :src="item.type === 2?'https://res-crm.papitube.com/contract-blue.png':'https://res-crm.papitube.com/contract-dark-blue.png'" alt=""
                                         style="width: 40px;height: 40px;" class="float-left mr-10 mt-10">
                                
                                <div class="float-left my-10">
                                    <div >{{item.template_name}}</div>
                                    <div class="lightColor">未提交</div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="card" data-toggle="modal" data-target="#submitReport" @click="getId(item.status,item.template_name)">
                            <div class="card-block clearfix">
                                
                                 <img :src="item.type === 2?'https://res-crm.papitube.com/contract-blue.png':'https://res-crm.papitube.com/contract-dark-blue.png'" alt=""
                                         style="width: 40px;height: 40px;" class="float-left mr-10 mt-10">
                                
                                <div class="float-left my-10">
                                     <div>{{item.template_name}}</div>
                                     <div class="lightColor">
                                        <template v-if="item.status.status == 1">未审核</template>
                                        <template v-else>已审核</template>
                                     </div>
                                </div>
                            </div>
                        </div>
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
        <submit-report :templateId="temId" :templateStatus="temStatus" :tempName="tempName" @refresh="getlist()"></submit-report>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[], 
            temId:'',//简报id
            temStatus:'',//提交状态
            tempName:'',//模版名称
        }
    },
    mounted(){
        this.getlist()
    },
    methods:{
        getId:function(status,name){
            this.temId = status.id
            this.temStatus = status.status
            this.tempName = name
        },
        redirectBriefDetails:function(id,type,name){
            
            this.$router.push({path:'/brief/details',query:{id:id,type:type,name:name}})
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
    .lightColor{
        color:#aaa;
        font-size: 12px
    }
</style>




    
    






