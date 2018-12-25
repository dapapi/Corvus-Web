<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">员工{{allType[type]}}汇总</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel p-20 clearfix">
                <!-- <div class="col-md-4  p-20"> -->
                    <div class="col-md-3 input-search float-left">
                        <selectors :options="companyArr" @change="getCompany"></selectors>
                    </div>
                    <div v-if="this.$route.query.id == 1" class="col-md-3 float-left">
                        <selectors :options='leaveType' @change="getLeave"></selectors>
                        
                    </div>
                    <div class="col-md-3 float-left">
                        <Datepicker :placeholder="'开始时间'" @change="getStartTime"></Datepicker>
                    </div>
                    <div class="col-md-3 float-left">
                        <Datepicker :placeholder="'结束时间'" @change="getEndTime"></Datepicker>
                    </div>
                <!-- </div> -->
                
            </div>
            <div class="col-md-12 panel">
                    <div>
                    <div class="example pt-20 pb-5">
                        <table v-if="list.length" class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
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
                            <tr v-for="(item,index) in list" :key="index">
                                <td>{{item.creator_id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.department_name}}</td>
                                <td v-show="type == 1">{{item.leave_type}}</td>
                                <td>{{item.daynumber}}</td>
                                <td class="pointer-content" v-show="type == 3||type ==4">{{item.place}}</td>
                                <td>{{item.start_at}}</td>
                                <td class="pointer-content">{{item.end_at}}</td>
                                <td></td>
                                
                            </tr>        
                        </table>
                        <div v-else class="col-md-1" style="margin: 6rem auto">
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
import config from '@/assets/js/config'
// const allType = {1:'请假',2:'加班',3:'出差',4:'外勤'}
export default {
    data(){
        return {
            list:[], 
            allType:{1:'请假',2:'加班',3:'出差',4:'外勤'},
            companyArr:config.companyArr,
            leaveType:[
                {
                    value:1,
                    name:'事假'
                },
                {
                    value:2,
                    name:'病假'
                },
                {
                    value:3,
                    name:'调休假'
                },
                {
                    value:4,
                    name:'年假'
                },
                {
                    value:5,
                    name:'婚假'
                },
                {
                    value:6,
                    name:'产假'
                },
                {
                    value:7,
                    name:'陪产假'
                },
                {
                    value:8,
                    name:'丧假'
                },
                {
                    value:9,
                    name:'其他'
                },
                
            ],
            searchData:{
                type:'',
                start_time:'2018-10-11',
                end_time:'2018-11-29',
                department:6,
                leaveType:1  //后台还没有添加字段
                
            },
        }
    },
    computed:{
        type(){
            this.getlist(this.$route.query.id)
            return this.$route.query.id
        }
    },
    mounted(){
        
        this.getlist(this.$route.query.id)
    },
    methods:{
        getCompany:function(value){
            this.searchData.department = value
            this.getlist()
        },
        getLeave:function(value){
            this.searchData.leaveType = value
            this.getlist() 
        },
        getStartTime:function(value){
            this.searchData.start_time = value
            this.getlist()
        },
        getEndTime:function(value){
            this.searchData.end_time = value
            this.getlist()
        },
        getlist:function(type){
            this.searchData.type = type
            fetch('get',`${config.apiUrl}/attendance/collect`,this.searchData).then((res) => {
                this.list = res
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




    
    







