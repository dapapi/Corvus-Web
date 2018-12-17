<template>
    <div class="page page-aside-left">
        <second-left :leftData="leftData" :title="'考勤'"></second-left>
        <router-view/>
    </div>
</template>
<script>

import secondLeft from '@/components/SecondLeft.vue'
export default {
     components:{
       secondLeft
     },
     data(){
         return {
            leftData:{
               topData:[],
               bottomData:[] 
            },
         }
     },
     mounted(){
        this.setData()
     },
     methods:{
        setData:function(){
            this.leftData.topData =[
                {
                value:1,
                name:'提交申请',
                url:'/attendance'
                },
                {
                value:2,
                name:'我申请的',
                url:'/attendance/apply'
                },
                {
                value:3,
                name:'我审批的',
                url:'/attendance/approval'
                },
                {
                value:4,
                name:'知会我的',
                url:'/attendance/tellme'
                },
                {
                value:5,
                name:'考勤日历',
                url:'/attendance/calendar'
                }
            ]
            this.leftData.bottomData=[
                {
                    value:6,
                    name:'我的考勤',
                    data:[
                        {
                            value:1,
                            name:'考勤统计',
                            url:'/attendance/myAttend'
                        },
                        {
                            value:2,
                            name:'请假统计',
                            url:'/attendance/myLeave'
                        }
                    ]
                },
                {
                    value:7,
                    name:'成员考勤',
                    data:[
                        {
                            value:1,
                            name:'考勤统计',
                            url:'/attendance/memberAttend'
                        },
                        {
                            value:2,
                            name:'请假统计',
                            url:'/attendance/memberLeave'
                        }
                    ]
                },
                {
                    value:8,
                    name:'考勤汇总',
                    data:[
                        {
                            value:1,
                            name:'请假',
                            url:'/attendance/all/',
                            params: {id: 1}
                        },
                        {
                            value:2,
                            name:'加班',
                            url:'/attendance/all/',
                            params: {id:2}
                        },
                        {
                            value:3,
                            name:'出差',
                            url:'/attendance/all/',
                            params: {id: 3}
                        },
                        {
                            value:4,
                            name:'外勤',
                            url:'/attendance/all/',
                            params: {id: 4}
                        },
                    ]
                }
            ]
        },
       
     }
}
</script>


