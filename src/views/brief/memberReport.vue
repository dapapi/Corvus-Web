<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered clearfix">
            <h1 class="page-title float-left">成员{{templateName}}</h1>
            <switch-year class="float-right" :type="type" @click="selectDate"></switch-year>
        </div>
        <div class="page-content container-fluid">
            <div class="panel mb-0">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" placeholder="搜索成员、周期" v-model="search" @blur="getlist()">
                    </div>
                </div>
                
            </div>
            <div class="col-md-12 panel">
                    <div>
                    <div class="pb-5">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">成员</th>
                                <th class="cell-300" scope="col">简报周期</th>
                                <th class="cell-300" scope="col">提交时间</th>
                                <th class="cell-300" scope="col">状态</th>
                               
                                
                            </tr>
                            <tr data-toggle="modal" data-target="#submitReport" @click="getProps(item.id,item.status,item.member,item.template)" v-for="(item,index) in list" :key="index">
                                <td>{{item.member}}</td>
                                <td>
                                    <div>{{item.title[0]}}</div>
                                    <div>{{item.title[1]}}</div>
                                </td>
                                <td class="pointer-content">{{item.created_at}}</td>
                                <td>
                                    <template v-if="item.status === null">未提交</template>
                                    <template v-else-if="item.status == 1" ><span style="background:#FF9800;color:#fff">未审核</span> </template>
                                    <template v-else ><span style="background:#4CAF50;color:#fff">已审核</span></template>
                                </td>
                                <td>
                                    <i class="iconfont icon-iconfontzhizuobiaozhun023132"></i>
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
        <submit-report :templateId="temId" :templateStatus="status" :tempName="tempName"></submit-report>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[], 
            current_page:0,
            total_pages:0,
            total:0,
            search:'',
            templateName:'',
            start_time:'',
            end_time:'',
            type:(this.$route.query.type-0),
            temId:'',
            status:'',
            tempName:''

        }
    },
    watch:{
        //检测路由参数变化  调用函数
       "$route":"getlist",

    },
    // mounted(){
    //     this.getlist()
    // },
    methods:{
        getProps:function(id,status,name,temName){
            this.temId = id
            this.status = status
            this.tempName = `${name}的${temName}`
        },
        selectDate:function(start,end){
            this.start_time = start
            this.end_time = end
            this.getlist()
        },
        redirectBriefDetails:function(id){
            this.$router.push({path:'/brief/details',query:{id:id}})
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
        getlist:function(page = 1){ 
            this.templateName = this.$route.query.name
            let _this  = this
            let data = {
                template_id:this.$route.query.id,
                search:this.search,
                start_time:this.start_time,
                end_time:this.end_time

            }
            fetch('get',`${config.apiUrl}/review/member/template`,data).then((res) => {
                
                _this.list = res.data
                for (let i = 0; i < _this.list.length; i++) {
                    _this.list[i].title = _this.list[i].title.split(',')
                    
                }
                _this.current_page  = res.meta.pagination.current_page
                _this.total_pages  = res.meta.pagination.total_pages
                _this.total  = res.meta.pagination.total

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




    
    






