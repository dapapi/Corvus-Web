<template>
    <div class="page-main">
        <div class="page-header page-header-bordered clearfix">
            <h1 class="page-title float-left">我的考勤统计</h1>
            <div class="float-right mr-20">
                <inlineDatepicker @change="getYear"></inlineDatepicker>
            </div>
        </div>
        <div class="page-content container-fluid">
            
            <div class="panel p-20">
                <h4 class="text-center pb-10">2018年度考勤统计报表</h4>
                 <table class="table">
                    <tr>
                        <th class="cell-300" scope="col">月份</th>
                        <th class="cell-300" scope="col">请假</th>  
                        <th class="cell-300" scope="col">加班</th>  
                        <th class="cell-300" scope="col">出差</th>
                        <th class="cell-300" scope="col">外勤</th>
                    </tr>
                    <tr v-for="(item,index) in list" :key="index">
                        <td class="pointer-content">{{item.name}}</td>
                        <td class="cell-300">1</td>
                        <td class="cell-300">2</td>
                        <td class="cell-300">4</td>
                        <td class="cell-300">5</td>

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
            year:'2018'
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        getYear:function(value){
            this.year = value
            alert(this.year)
        },
        getList:function(){
            fetch('get', 'attendance/myselfleavelstatistics',{year:this.year}).then(function (res) {
                
                console.log(res)
            })
        }
    }
}
</script>


