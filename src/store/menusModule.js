let menus = [
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
    },
]
let levelNum = 1;
let startExpand = []; // 保存刷新后当前要展开的菜单项
function setExpand(source, url) {
    let sourceItem = '';
    for (let i = 0; i < source.length; i++) {
        sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
        if (sourceItem.indexOf(url) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
            if (source[i].type === 'button') { // 导航菜单为按钮
                source[i].isSelected = true; // 设置选中高亮
                source[i].isExpanded = true; // 设置为展开
                startExpand.push(source[i]);
                // 递归下一级菜单，以此类推
                setExpand(source[i].subMenu, url);
            }
            break;
        }
    }
}