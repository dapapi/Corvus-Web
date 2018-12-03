<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">成员考勤统计</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel p-20 clearfix">
                <!-- <div class="col-md-4  p-20"> -->
                    <div class="col-md-4 input-search float-left">
                        <selectors :options="companyArr" @change="getCompany"></selectors>
                    </div>
                    <div class="col-md-4 float-left">
                        <Datepicker :placeholder="'开始时间'" @change="getStartTime"></Datepicker>
                    </div>
                    <div class="col-md-4 float-left">
                        <Datepicker :placeholder="'结束时间'" @change="getEndTime"></Datepicker>
                    </div>
                <!-- </div> -->
                
            </div>
            <div class="col-md-12 panel">
                    <div>
                    <div class="example pt-20 pb-5">
                        <table v-if="dataList.length>0" class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">工号</th>
                                <th class="cell-300" scope="col">姓名</th>
                                <th class="cell-300" scope="col">部门</th>
                                <th class="cell-300" scope="col">请假</th>
                                <th class="cell-300" scope="col">加班</th>
                                <th class="cell-300" scope="col">出差</th>
                                <th class="cell-300" scope="col">外勤</th>
                               
                                
                            </tr>
                            <tr v-for="(item,index) in dataList" :key="index">
                                <td>{{item.creator_id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.department_name}}</td>
                                <td v-if="item2.type == 1" v-for="(item2,index) in item.daynumber" :key="index">
                                    <template v-if="item2.number>0">{{item2.number}}</template>
                                    <template v-else>-</template>
                                </td>
                                <td v-if="item2.type == 2" v-for="(item2,index) in item.daynumber" :key="index">
                                    <template v-if="item2.number>0">{{item2.number}}</template>
                                    <template v-else>-</template>
                                </td>
                                <td v-if="item2.type == 3" v-for="(item2,index) in item.daynumber" :key="index">
                                    <template v-if="item2.number>0">{{item2.number}}</template>
                                    <template v-else>-</template>
                                </td>
                                <td v-if="item2.type == 4" v-for="(item2,index) in item.daynumber" :key="index">
                                    <template v-if="item2.number>0">{{item2.number}}</template>
                                    <template v-else>-</template>
                                </td>
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

export default {
    data(){
        return {
            dataList:[], 
            companyArr:config.companyArr,
            searchData:{
                start_time:'2018-12-10',
                end_time:'2018-12-11',
                department:6
            }
            
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        getCompany:function(value){
            this.searchData.department = value
            this.getList()
        },
        getStartTime:function(value){
            this.searchData.start_time = value
            this.getList()
        },
        getEndTime:function(value){
            this.searchData.end_time = value
            this.getList()
        },
        getList:function(){
            let _this = this
            fetch('get', 'attendance/statistics',this.searchData).then(function (res) {
                _this.dataList = res.data
                //重构没有数组的项
                for (let i = 0; i < _this.dataList.length; i++) {
                    if(_this.dataList[i].daynumber){
                        let newArr = [];
                        for (let t = 0; t < _this.dataList[i].daynumber.length; t++) {
                            newArr.push(_this.dataList[i].daynumber[t].type)
                        }
                        if(newArr.indexOf(1) == -1){
                            _this.dataList[i].daynumber.push({
                                type:1,
                                number:0
                            })
                        }
                        if(newArr.indexOf(2) == -1){
                            _this.dataList[i].daynumber.push({
                                type:2,
                                number:0
                            })
                        }
                        if(newArr.indexOf(3) == -1){
                            _this.dataList[i].daynumber.push({
                                type:3,
                                number:0
                            })
                        }
                        if(newArr.indexOf(4) == -1){
                            _this.dataList[i].daynumber.push({
                                type:4,
                                number:0
                            })
                        }
                       
                    }else{
                        _this.dataList[i].daynumber = [
                            {
                                type:1,
                                number:0
                            },
                            {
                                type:2,
                                number:0
                            },
                            {
                                type:3,
                                number:0
                            },{
                                type:4,
                                number:0
                            }
                        ]
                    }
                    
                }
                console.log(_this.dataList);
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




    
    







