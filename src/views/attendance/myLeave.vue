<template>
    <div class="page-main">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的考勤统计</h1>
        </div>
        <div class="page-content container-fluid">
            
            <div class="panel p-20 pr-0">
                <h4 class="text-center pb-10">2018年度考勤统计报表</h4>
                 <table class="table">
                    <tr>
                        <th class="cell-300">月份／类型</th>
                        <th class="cell-150" scope="col" v-for="(item,index) in leaveType" :key="index">{{item.name}}</th>
                        
                        <th class="cell-100" scope="col">合计</th>
                    </tr>
                    <tr v-for="(item,index) in list" :key="index">
                        <td>{{item.name}}</td>
                        <td class="pointer-content" v-for="(item,index) in leaveType" :key="index">11</td>
                        <!-- <td class="cell-300">1</td>
                        <td class="cell-300">2</td>
                        <td class="cell-300">4</td> -->
                        <td class="cell-300">520</td>

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
                    name:'调休'
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
        }
    }
}
</script>


