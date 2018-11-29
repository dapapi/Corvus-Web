<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">员工考勤汇总</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel p-20 clearfix">
                <!-- <div class="col-md-4  p-20"> -->
                    <div class="col-md-4 input-search float-left">
                        <selectors></selectors>
                    </div>
                    <div class="col-md-4 float-left">
                        <Datepicker></Datepicker>
                    </div>
                    <div class="col-md-4 float-left">
                        <Datepicker></Datepicker>
                    </div>
                <!-- </div> -->
                
            </div>
            <div class="col-md-12 panel">
                    <div>
                    <div class="example pt-20 pb-5">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">工号</th>
                                <th class="cell-300" scope="col">姓名</th>
                                <th class="cell-300" scope="col">部门</th>
                                <th v-show="type == 1" class="cell-300" scope="col">{{allType[type]}}类型</th>
                                <th class="cell-300" scope="col">{{allType[type]}}天数</th>
                                <th v-show="type == 3||type ==4" class="cell-300" scope="col">{{allType[type]}}地点</th>
                                <th class="cell-300" scope="col">开始时间</th>
                                <th class="cell-300" scope="col">结束时间</th>
                                <th class="cell-300" scope="col">审批人</th>
                               
                                
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
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        屈素芳
                                    </div>
                                </td>
                                <td v-show="type == 1">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        每周
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        屈素芳
                                    </div>
                                </td>
                                <td class="pointer-content" v-show="type == 3||type ==4">
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018-11-22
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">已提交</div>
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
        <submitreport></submitreport>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
// const allType = {1:'请假',2:'加班',3:'出差',4:'外勤'}
export default {
    data(){
        return {
            list:[], 
            allType:{1:'请假',2:'加班',3:'出差',4:'外勤'}
        }
    },
    computed:{
       type(){
           return this.$route.query.id
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




    
    







