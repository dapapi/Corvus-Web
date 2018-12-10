<template>
    <!-- Page -->
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的{{template_name}}</h1>
        </div>
        <div class="page-content container-fluid">
                
                <div class="row">
                    <div class="col-md-8 ">
                         <div class="panel p-20">
                            <table class="table  table-hover is-indent mb-20" >
                                <tr>
                                    <th class="cell-300" scope="col">简报周期</th>
                                    <th class="cell-200" scope="col">提交时间</th>
                                    <th class="cell-200" scope="col">状态</th>
                                    <th class="cell-200" scope="col">操作</th>
                                    
                                </tr>
                                <tr v-for="(item,index) in list" :key="index">
                                    <td class="pointer-content">
                                        <div>{{item.title[0]}}</div>
                                        <div>{{item.title[1]}}</div>
                                    </td>
                                    <td>{{item.template.updated_at}}</td>
                                    <td>
                                        <button class="btn-warning" v-if="item.status === null">未提交</button>
                                        <button class="btn-primary" v-else-if="item.status ==1">未审核</button>
                                        <button class="btn-success" v-else>已审核</button>
                                    </td>
                                    <td>
                                        <router-link v-if="item.status === null" :to="{path:'/brief/details',query:{id:item.id}}">写{{item.template.template_name}}</router-link>
                                        <router-link v-else-if="item.status ==1"  :to="{path:'/brief/details',query:{id:item.id}}">编辑</router-link>
                                        <span v-else data-toggle="modal" data-target="#submitReport">查看</span>
                                    </td>
                                
                                </tr>
                            </table>
                        </div>
                    </div>
                <briefright></briefright>
                </div>
                <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                            :total="total"></pagination> -->

                <submit-report :templateId="temId" :templateStatus="status"></submit-report>
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
            template_name:'',
            temId:'',
            status:''
            
        }
    },
    components:{
        briefright
    },
    watch:{
        
       "$route":"getlist",

    },
    created(){
        this.getlist()
    },
    
    methods:{
        
        getlist:function(){
            
            fetch('get',`${config.apiUrl}/review/my/template`,{template_id:this.$route.params.id}).then((res) => {
                this.list = res.data
                this.template_name = res.data[0].template.template_name
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].title = this.list[i].title.split(',');
                    
                }
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




    
    








