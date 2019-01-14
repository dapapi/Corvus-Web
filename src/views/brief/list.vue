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
                                        <!-- <div>{{item.title[1]}}</div> -->
                                    </td>
                                    <td>{{item.updated_at}}</td>
                                    <td>
                                        <button class="btn-warning" v-if="item.status === null">未提交</button>
                                        <button class="btn-warning" v-else-if="item.status ==1">未审核</button>
                                        <button class="btn-success" v-else>已审核</button>
                                    </td>
                                    <td>
                                        <router-link v-if="item.status === null" :to="{path:'/brief/details',query:{id:item.id}}">写{{item.template.template_name}}</router-link>
                                        <router-link v-else-if="item.status ==1"  :to="{path:'/brief/details',query:{id:item.template_id,type:item.template_type,name:item.template}}">编辑</router-link>
                                        <span v-else data-toggle="modal" data-target="#submitReport" @click="getProps(item.id,item.status,item.member,item.template)">查看</span>
                                    </td>
                                
                                </tr>
                            </table>
                            <div v-if="list.length === 0" style="margin: 6rem auto;width: 100px">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                            </div>
                        </div>
                    </div>
                <briefright :type="type" @getDate="selectDate"></briefright>
                </div>
                <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                            :total="total"></pagination> -->

                <submit-report :templateId="temId" :templateStatus="status" :tempName="tempName"></submit-report>
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
            status:'',
            // type:(this.$route.query.type-0),
            start_time:'',
            end_time:'',
            tempName:''

            
        }
    },
    components:{
        briefright
    },
    watch:{
        //检测路由参数变化  调用函数
       "$route":"getlist",
    },
    computed:{
        type:function(){
            return (this.$route.query.type-0)
        }
    },
    methods:{
        selectDate:function(start,end){
            // console.log(start,end)
            this.start_time = start
            this.end_time = end
            this.getlist()
        },
        getProps:function(id,status,name,temName){
            this.temId = id
            this.status = status
            this.tempName = `${name}的${temName}`
        },
        
        getlist:function(){
            this.template_name= this.$route.query.name
            let data={
                template_id:this.$route.query.id,
                start_time:this.start_time,
                end_time:this.end_time
            }
            
            fetch('get',`${config.apiUrl}/review/my/template`,data).then((res) => {
                
                this.list = res.data
                
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].title = this.list[i].title.split(',');
                    
                }
            })
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
    }
}
</script>
<style lang="scss" scoped>
    .page-main{
        background-color:#f3f4f5 !important;
    }
</style>




    
    








