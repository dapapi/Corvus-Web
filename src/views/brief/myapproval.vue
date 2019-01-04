<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">待我审批</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel mb-0 pb-10">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" placeholder="搜索成员、简报类型" v-model="search" @blur="getlist()">
                    </div>
                </div>
                
            </div>
            <div class="col-md-12 panel">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab" @click="getlist(1,1)">待评审</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab" @click="getlist(1,2)">已审批</a>
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
                            
                            <tr data-toggle="modal" data-target="#submitReport" v-for="(item,index) in list" :key="index" @click="getId(item.id)">
                                <td class="pointer-content">{{item.template}}</td>
                                <td>{{item.member}}</td>
                                <td>
                                    <div>{{item.title[0]}}</div>
                                    <div style="color:#ccc">{{item.title[1]}}</div>
                                </td>
                                <td>{{item.updated_at}}</td>
                                <td>
                                    <template v-if="item.status == 1">未评审</template>
                                    <template v-if="item.status == 2">已评审</template>
                                </td>
                                
                            </tr>
                        </table>
                        <div v-if="list.length === 0" class="col-md-1" style="margin: 6rem auto">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                        <pagination :current_page="current_page" :method="getlist" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>
                </div>
        </div>
        <!-- <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
            <button type="button"  class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
            </button>
        </div> -->
        <submit-report :templateId="temId" :templateStatus="status" @refresh="getlist"></submit-report>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[], 
            search:'',
            status:1,//status 1 未评审  2已评审
            temId:'',
            current_page:0,
            total_pages:0,
            total:0,
        }
    },
    mounted(){
        this.getlist(1,1)
    },
    methods:{
        getId:function(id){
            this.temId = id
        },
        redirectBriefDetails:function(id){
            
            this.$router.push({path:'/brief/details',query:{id:id}})
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
        getlist:function(page = 1,status){
            let _this = this
            if(status){
                this.status = status
            }
           
            fetch('get',`${config.apiUrl}/review`,{search:this.search,status:this.status}).then((res) => {
                _this.list = res.data
                // console.log(_this.list)
                for (let i = 0; i < _this.list.length; i++) {
                    if(_this.list[i].title){
                        console.log(_this.list[i].title)
                        _this.list[i].title = _this.list[i].title.split(',')
                    }else{
                         _this.list[i].title = ['','']

                    }
                    
                }
                _this.current_page = res.meta.pagination.current_page
                _this.total_pages = res.meta.pagination.total_pages
                _this.total = res.meta.pagination.total
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




    
    






