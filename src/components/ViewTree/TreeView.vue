<template>
    <div class="tree-view-menu">
        <Tree-view-item :menus="menus"></Tree-view-item>
    </div>
</template>
<script>
import TreeViewItem from "./TreeViewItem";
const menusData = [];
export default {
    name:"TreeViewMenu",
    components:{
        TreeViewItem
    },
    data(){
        return {
            menus:[
                {
                    id:1,
                    level:1,
                    name:'提交申请',
                    url:'/attendance'
                            },
                {
                    id:2,
                    level:1,
                    name:'我申请的',
                    url:'/attendance/apply'
                            },
                {
                    id:3,
                    level:1,
                    name:'我审批的',
                    url:'/attendance/approval'
                            },
                {
                    id:4,
                    level:1,
                    name:'知会我的',
                    url:'/attendance/tellme'
                            },
                {
                    id:5,
                    level:1,
                    name:'考勤日历',
                    url:'/attendance/calendar'
                            },
                {
                    id:6,
                    level:1,
                    name:'我的考勤',
                    type:"button",
                    isExpanded:false,
                    isSelected:false,
                    subMenu: [
                        {
                            id:61,
                            level:2,
                            name:'考勤统计',
                            url:'/attendance/myAttend'
                                    },
                        {
                            id:62,
                            level:2,
                            name:'请假统计',
                            url:'/attendance/myLeave'
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
                    subMenu: [
                        {
                            id:71,
                            level:2,
                            name:'考勤统计',
                            url:'/attendance/memberAttend'
                                    },
                        {
                            id:72,
                            level:2,
                            name:'请假统计',
                            url:'/attendance/memberLeave'
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
                    subMenu: [
                        {
                            id:81,
                            level:2,
                            name:'请假',
                            url:'/attendance/all/',
                            params: { id: 1}
                        },
                        {
                            id:82,
                            level:2,
                            name:'请假',
                            url:'/attendance/all/',
                            params: { id: 2}
                        },
                        {
                            id:83,
                            level:2,
                            name:'请假',
                            url:'/attendance/all/',
                            params: { id: 3}
                        },
                        {
                            id:84,
                            level:2,
                            name:'请假',
                            url:'/attendance/all/',
                            params: { id: 4}
                        },
                    ]
                }
            ]  
        }
    }
}
</script>
<style scoped>
    .tree-view-menu {
width: 300px;
height: 100%;
overflow-y: auto;
overflow-x: hidden;
}
.tree-view-menu::-webkit-scrollbar {
height: 6px;
width: 6px;
}
.tree-view-menu::-webkit-scrollbar-trac {
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.tree-view-menu::-webkit-scrollbar-thumb {
background-color: #6e6e6e;
outline: 1px solid #333;
}
.tree-view-menu::-webkit-scrollbar {
height: 4px;
width: 4px;
}
.tree-view-menu::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.tree-view-menu::-webkit-scrollbar-thumb {
background-color: #6e6e6e;
outline: 1px solid #708090;
}
</style>


