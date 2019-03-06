<template>
    <div class="page-main">
        <div class="page-header page-header-bordered clearfix">
            <h1 class="page-title float-left">我的考勤统计</h1>
            <div class="float-right">
                <switch-year @click="getYear" :type="5"></switch-year>
            </div>
        </div>
        <div class="page-content container-fluid">
            
            <div class="panel p-20">
                <h4 class="text-center pb-10">{{year}}年度考勤统计报表</h4>
                 <table v-if="dataList.length>0" class="table">
                    <tr>
                        <th class="cell-300" scope="col">月份</th>
                        <th class="cell-300" scope="col">请假</th>  
                        <th class="cell-300" scope="col">加班</th>  
                        <th class="cell-300" scope="col">出差</th>
                        <th class="cell-300" scope="col">外勤</th>
                    </tr>
                    <tr v-for="(item,index) in dataList" :key="index">
                        <td class="pointer-content">{{item.month}}月</td>
                        
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
                <div v-else style="margin: 6rem auto;width: 100px">
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

export default {
    data(){
        return {
            list:[
                {
                    id:1,
                    name:'1月'
                },
                {
                    id:2,
                    name:'2月'
                },
                {
                    id:3,
                    name:'3月'
                },
                {
                    id:4,
                    name:'4月'
                },
                {
                    id:5,
                    name:'5月'
                },
                {
                    id:6,
                    name:'6月'
                },
                {
                    id:7,
                    name:'7月'
                },
                {
                    id:8,
                    name:'8月'
                },
                {
                    id:9,
                    name:'9月'
                },
                {
                    id:10,
                    name:'10月'
                },
                {
                    id:11,
                    name:'11月'
                },
                {
                    id:12,
                    name:'12月'
                }
                
            ],
            dataList:[],
            year:new Date().getFullYear()
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        getYear:function(value){
            this.year = value
            this.getList()
        },
        getList:function(){
            let _this = this
            fetch('get', 'attendance/myselfstatistics',{year:this.year}).then(function (res) {
                
                _this.dataList = res.data

                //按照月份排序
                var min;
                for(var i=0; i<_this.dataList.length; i++){
                    for(var j=i; j<_this.dataList.length;j++){
                        if(_this.dataList[i].month>_this.dataList[j].month){
                        min=_this.dataList[j];
                        _this.dataList[j]=_this.dataList[i];
                        _this.dataList[i]=min;
                        }
                    }
                }
                
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
            })
        }
    }
}
</script>


