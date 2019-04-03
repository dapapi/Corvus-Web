<template>
     <div class="page page-aside-left">
        <div class="page-aside">
            <div class="page-aside-switch">
                <i class="wb-chevron-left" aria-hidden="true"></i>
                <i class="wb-chevron-right" aria-hidden="true"></i>
            </div>
            <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical"
                 style="position: relative;">
                <div data-role="container" class="scrollable-container" style="height: 100%; width: 259px;">
                    <div data-role="content" class="scrollable-content" style="width: 259px;">
                        <section class="page-aside-section">
                            <h5 class="page-title pl-30 mb-45">审批</h5>
                            <treeView :menus="leftData"></treeView>
                        </section>
                    </div>
                </div>
                <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false">
                    <div class="scrollable-bar-handle"></div>
                </div>
            </div>
        </div>
        <router-view @unreadupdate='getUnread'/>
    </div>
</template>

<script>
    import {APPROVAL_CONFIG} from '@/components/ForApproval/config.js'
    import Approval from '@/components/Approval.vue'
    import SecondLeft from '@/components/SecondLeft.vue'
    import fetch from '@/assets/utils/fetch.js'
    import config from '@/assets/js/config'
    export default {
        components: {
            Approval,SecondLeft
        },
        data(){
            return{
                unreadInfo:{},
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
    },
    created(){
        this.getUnread()
    },
    methods:{
        getUnread(){
            // this.leftData[0].subMenu[2].num = this.$store.state.approvalNum.project
            // this.leftData[1].subMenu[2].num = this.$store.state.approvalNum.contract
            // this.leftData[2].subMenu[2].num = this.$store.state.approvalNum.general
            let _this = this
            fetch('get','/pending_sum').then((params) => {
                _this.unreadInfo = params
                _this.leftData[0].subMenu[2].num = params.project
                _this.leftData[1].subMenu[2].num = params.contract
                _this.leftData[2].subMenu[2].num = params.general
            })
        }
    }
}

</script>
<style scoped>
    /* .page-aside{
        overflow-x: hidden !important;
        overflow-y: scroll !important;

        position: fixed;
        left: 100px;
    } */
    /* .page-aside::-webkit-scrollbar { width: 0 !important } */
</style>

