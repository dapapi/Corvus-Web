<template>
    <div class="page-main">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">成员请假统计</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel p-20 clearfix">
                <!-- <div class="col-md-4  p-20"> -->
                    <div class="col-md-4 input-search float-left">
                        <selectors :option='companyArr' @change="getCompany"></selectors>
                    </div>
                    <div class="col-md-4 float-left">
                        <Datepicker :placeholder="'开始时间'" @change="getStartTime"></Datepicker>
                    </div>
                    <div class="col-md-4 float-left">
                        <Datepicker :placeholder="'结束时间'" @change="getEndTime"></Datepicker>
                    </div>
                <!-- </div> -->
                
            </div>
            
            <div class="panel p-20 pr-0">
                 <table class="table">
                    <tr>
                        <th class="cell-200">工号</th>
                        <th class="cell-200">姓名</th>
                        <th class="cell-200">部门</th>
                        <th class="cell-200" scope="col" v-for="(item,index) in leaveType" :key="index">{{item.name}}</th>
                        
                        <th class="cell-200" scope="col">合计</th>
                    </tr>
                    <tr v-for="(item,index) in list" :key="index">
                        <td class="cell-300">{{item.creator_id}}</td>
                        <td class="cell-300">{{item.name}}</td>
                        <td class="cell-300">{{item.department_name}}</td>
                        <td v-if="item2.leave_type_name == '事假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '病假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '调休假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '年假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '婚假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '产假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '陪产假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '丧假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type_name == '其他'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td>{{item.total}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
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
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
export default {
    data(){
        return {
            list:[],
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
            companyArr:config.companyArr,
            searchData:{
                start_time:'',
                end_time:'',
                department:6
            },
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
            fetch('get', 'attendance/leavestatistics',this.searchData).then(function (res) {
                _this.list = res
                console.log(_this.list)
                for (let i = 0; i < _this.list.length; i++) {
                    if(_this.list[i].daynumber){
                        let newArr = []
                        _this.list[i].total =0
                        for (let t = 0; t < _this.list[i].daynumber.length; t++) {
                            _this.list[i].total = _this.list[i].total+_this.list[i].daynumber[t].number
                            newArr.push(_this.list[i].daynumber[t].leave_type_name)
                        }
                        for (let j = 0; j < _this.leaveType.length; j++) {
                            if(newArr.indexOf(_this.leaveType[j].name) == -1){
                                _this.list[i].daynumber.push({
                                    leave_type_name:_this.leaveType[j].name,
                                    leave_type:_this.leaveType[j].value,
                                    number:0
                                })
                            }
                        }
                            
                    }else{
                        _this.list[i].daynumber =[]
                        _this.list[i].total = 0
                        for (let l = 0; l< _this.leaveType.length; l++) {
                            
                            _this.list[i].daynumber.push({
                                leave_type_name:_this.leaveType[l].name,
                                leave_type:_this.leaveType[j].value,
                                number:0
                            })
                            
                        }
                    }
                    
                }
            })
        }
    }
}
</script>


