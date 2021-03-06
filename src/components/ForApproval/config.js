export const APPROVAL_CONFIG = {
    approvalSort: [
        {
            key: 1,
            value: '项目立项',
            url: 'project',
        },
        {
            key: 2,
            value: '合同',
            url: 'contract',
        },
        {
            key: 3,
            value: '一般审批',
            url: 'common',
        }
    ],
    approvalSubSort: [
        {
            key: 1,
            value: '发起审批',
            url: 'initiate',
        },
        {
            key: 2,
            value: '我申请的',
            url: 'application',
        },
        {
            key: 3,
            value: '我审批的',
            url: 'my',
        },
        {
            key:4,
            value:'知会我的',
            url: 'only'
        }
    ],
    imgIcon:['@/img/sp1.png','@/img/sp2.png','@/img/sp3.png'],
    leftData : [
        {
            id: 0,
            name: '项目立项',
            url: '/approval/project',
            type: 'button',
            level: 1,
            subMenu:[
                {
                    id:1,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"发起审批",
                    num:0,
                    type:"link",
                    url:"/approval/project/initiate",
                },{
                    id:2,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"我申请的",
                    num:0,
                    type:"link",
                    url:"/approval/project/application",
                },{
                    id:3,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"我审批的",
                    num:0,
                    type:"link",
                    url:"/approval/project/my",
                },{
                    id:4,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"知会我的",
                    num:0,
                    type:"link",
                    url:"/approval/project/only",
                },
            ],
        },
        {
            id: 5,
            name: '合同',
            url: '/approval/contract',
            type: 'button',
            level: 1,
            subMenu:[
                {
                    id:6,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"发起审批",
                    num:0,
                    type:"link",
                    url:"/approval/contract/initiate",
                },{
                    id:7,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"我申请的",
                    num:0,
                    type:"link",
                    url:"/approval/contract/application",
                },{
                    id:8,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"我审批的",
                    num:0,
                    type:"link",
                    url:"/approval/contract/my",
                },{
                    id:9,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"知会我的",
                    num:0,
                    type:"link",
                    url:"/approval/contract/only",
                },{
                    id:15,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"合同管理",
                    num:0,
                    type:"link",
                    url:"/approval/contract/contract_management",
                },
            ],
        },
        {
            id: 10,
            name: '一般审批',
            url: '/approval/common',
            type: 'button',
            level: 1,
            subMenu:[
                {
                    id:11,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"发起审批",
                    num:0,
                    type:"link",
                    url:"/approval/common/initiate",
                },{
                    id:12,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"我申请的",
                    num:0,
                    type:"link",
                    url:"/approval/common/application",
                },{
                    id:13,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"我审批的",
                    num:0,
                    type:"link",
                    url:"/approval/common/my",
                },{
                    id:14,
                    isExpanded:false,
                    isSelected:false,
                    level:2,
                    name:"知会我的",
                    num:0,
                    type:"link",
                    url:"/approval/common/only",
                },
            ],
        }]
}