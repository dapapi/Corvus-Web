<template>
    <div class="page-main">
        <div class="page-header page-header-bordered clearfix">
            <h1 class="page-title float-left">我的请假统计</h1>
            <div class="float-right">
                <switch-year @click="getYear" :type="5"></switch-year>
            </div>
        </div>
        <div class="page-content container-fluid">
            
            <div class="panel p-20 pr-0">
                <h4 class="text-center pb-10">{{this.year}}年度考勤统计报表</h4>
                 <table v-if="list.length>0" class="table">
                    <tr>
                        <th class="cell-300">月份／类型</th>
                        <th class="cell-150" scope="col" v-for="(item,index) in leaveType" :key="index">{{item.name}}</th>
                        
                        <th class="cell-100" scope="col">合计</th>
                    </tr>
                    <tr v-for="(item,index) in list" :key="index">
                        
                        <td class="pointer-content">{{item.month}}月</td>
                        <td v-if="item2.leave_type == '事假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '病假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '调休假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '年假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '婚假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '产假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '陪产假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '丧假'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td v-if="item2.leave_type == '其他'" v-for="(item2,index) in item.daynumber" :key="index">
                            <template v-if="item2.number>0">{{item2.number}}</template>
                            <template v-else>-</template>
                        </td>
                        <td>{{item.total}}</td>
                    </tr>
                </table>
                <div v-else class="col-md-1" style="margin: 6rem auto">
                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                </div>
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
            MyLeave:[],
            year:new Date().getFullYear()

        }
    },

    mounted(){
        this.getMyLeave()
    },
    methods:{
        getYear:function(value){
            this.year = value
            this.getMyLeave()
        },
        getMyLeave:function(){
            let _this =this
            fetch('get', 'attendance/myselfleavelstatistics',{year:this.year}).then(function (res) {
                _this.list = res.data
                for (let i = 0; i < _this.list.length; i++) {
                    if(_this.list[i].daynumber){
                        let newArr = []
                        _this.list[i].total =0
                        for (let t = 0; t < _this.list[i].daynumber.length; t++) {
                            _this.list[i].total = _this.list[i].total+_this.list[i].daynumber[t].number
                            newArr.push(_this.list[i].daynumber[t].leave_type)
                        }
                        for (let j = 0; j < _this.leaveType.length; j++) {
                            if(newArr.indexOf(_this.leaveType[j].name) == -1){
                                _this.list[i].daynumber.push({
                                    leave_type:_this.leaveType[j].name,
                                    number:0
                                })
                            }
                        }
                            
                    }else{
                        _this.list[i].daynumber =[]
                        _this.list[i].total = 0
                        for (let l = 0; l< _this.leaveType.length; l++) {
                            
                            _this.list[i].daynumber.push({
                                leave_type:_this.leaveType[l].name,
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


