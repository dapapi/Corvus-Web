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
            leftData:[
                {
                    id:1,
                    level:1,
                    name:'提交申请',
                    url:'/attendance',
                    type:'link',
                    
                    isSelected:false,
                },
                {
                    id:2,
                    level:1,
                    name:'我申请的',
                    url:'/attendance/apply',
                    type:'link',
                    
                    isSelected:false,

                },
                {
                    id:3,
                    level:1,
                    name:'我审批的',
                    url:'/attendance/approval',
                    type:'link',
                    
                    isSelected:false,

                },
                {
                    id:4,
                    level:1,
                    name:'知会我的',
                    url:'/attendance/tellme',
                    type:'link',
                    
                    isSelected:false,

                },
                {
                    id:5,
                    level:1,
                    name:'考勤日历',
                    url:'/attendance/calendar',
                    type:'link',
                    
                    isSelected:false,

                },
                {
                    id:6,
                    level:1,
                    name:'我的考勤',
                    type:"button",
                    isExpanded:false,
                    isSelected:false,
                    subMenu:[
                        {
                            id:61,
                            level:2,
                            name:'考勤统计',
                            url:'/attendance/myAttend',
                            type:'link',
                            isExpanded:false,
                            isSelected:false,
                        },
                        {
                            id:62,
                            level:2,
                            name:'请假统计',
                            url:'/attendance/myLeave',
                            type:'link',
                            isExpanded:false,
                            isSelected:false,
                        }
                    ]
                },
                {
                    id:7,
                    level:1,
                    name:'成员考勤',
                    type:'button',
                    isExpanded:false,
                    isSelected:false,
                    subMenu:[
                        {
                            id:71,
                            level:2,
                            name:'考勤统计',
                            url:'/attendance/memberAttend',
                            isExpanded:false,
                            isSelected:false,
                            type:'link'
                            },
                        {
                            id:72,
                            level:2,
                            name:'请假统计',
                            url:'/attendance/memberLeave',
                            isExpanded:false,
                            isSelected:false,
                            type:'link'
                            }
                    ]
                },
                {
                    id:8,
                    level:1,
                    name:'考勤汇总',
                    type:'button',
                    isExpanded:false,
                    isSelected:false,
                    subMenu:[
                        {
                            id:81,
                            level:2,
                            name:'请假',
                            url:'/attendance/all?id=1',
                            isExpanded:false,
                            isSelected:false,
                            type:'link'
                        },
                        {
                            id:82,
                            level:2,
                            name:'加班',
                            url:'/attendance/all?id=2',
                            isExpanded:false,
                            isSelected:false,
                            type:'link'
                        },
                        {
                            id:83,
                            level:2,
                            name:'出差',
                            url:'/attendance/all?id=3',
                            isExpanded:false,
                            isSelected:false,
                            type:'link'
                        },
                        {
                            id:84,
                            level:2,
                            name:'外勤',
                            url:'/attendance/all?id=4',
                            isExpanded:false,
                            isSelected:false,
                            type:'link'
                        },
                    ]
                }
            ]
         }
     },
}
</script>


