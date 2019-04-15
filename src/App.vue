<template>
    <div id="app">
        <template v-if="isLeftMenuShow">
            <LeftMenu/>
            <get-message/>
        </template>
        <template v-if="isLeftManageShow">
            <LeftManage/>
        </template>
        <router-view/>
        <NetError />
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import Cookies from 'js-cookie'
    import LeftMenu from '@/components/LeftMenu.vue'
    import getMessage from '@/components/getMessage.vue'
    import LeftManage from '@/components/LeftManage.vue'

    export default {
        name: 'app',
        data: function () {
            return {
                isLeftMenuShow: true,
                isLeftManageShow: false
            }
        },
        components: {
            LeftMenu,
            LeftManage,
            getMessage
        },
        watch: {
            '$route': function (to, from) {
                if (this.$route.path === '/login' || this.$route.path === '/informationForm' || this.$route.path === '/404') {
                    this.isLeftMenuShow = false
                    this.isLeftManageShow = false
                }
                else if (this.$route.path.indexOf('apps') > 0
                    || this.$route.path === '/rolemanagement'
                    || this.$route.path === '/appmanagement'
                    || this.$route.path === '/organization'
                    || this.$route.path.indexOf('staff') > 0
                    || this.$route.path === '/organization/management') {
                    this.isLeftMenuShow = false
                    this.isLeftManageShow = true
                } else {
                    this.isLeftMenuShow = true
                    this.isLeftManageShow = false
                }
                this.$store.state.participantsInfo = [];
                this.$store.state.newParticipantsInfo = [];
                this.$store.state.collectInfo = [];
                this.$store.state.payInfo = [];
                this.$store.state.contractInfo = [];
                this.$store.state.divisionInfo = [];
                this.$store.state.incubationInfo = [];
                this.$store.state.billInfo = [];
                this.$store.state.principalInfo = {};
                this.$store.state.newPrincipalInfo = {};
                this.$store.state.selectPrincipalInfo = {};
                this.$store.state.otherSlot = [];
                this.$store.state.principalInfo = [];
            },

        },
        beforeMount() {
            if (Cookies.get('user')) {
                this.getUserList()
                this.getDepartment()
                this.getModuleRole()
                this.getListPower()
                //  this.getDashboard()
            }
            // this.getApprovalNum()
           
        },
        mounted(){
          
               
        //      $('.modal-dialog').click(function(){
        //       console.log(1111);
        //         document.getElementsByTagName('body')[0].classList.add('modal-open');
        //  }),
        },
        methods: {
            ...mapActions([
                'getUserList',
                'getDepartment',
                'getModuleRole',
                'getListPower',
                'getApprovalNum',
                // 'getDashboard'
            ])
        }
    };
</script>

<style>
    .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .popover {
        max-width: 100%;
    }

    .popover.bs-popover-bottom .arrow {
        left: 95%;
    }

    .popover.bs-popover-bottom .arrow::after, .popover.popover-auto[x-placement^=bottom] .arrow::after, .popover.popover-bottom .arrow::after {
        border-bottom-color: white;
    }

    .modal-header .close {
        padding: 0;
        margin: 0;
    }

    .asSpinner {
        height: 36.02px;
    }
    .site-menubar{
        z-index:9999999 !important;
    }
    .site-menubar-body {
        height: 100% !important;
        
    }

    .table td, .table th {
        border-top: none;
    }

    .table a {
        text-decoration: none;
        color: rgb(117, 117, 117);;
    }

    .table td {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .edit-wrap {
        width: 220px;
    }

    .third-title {
        color: #424242;
    }

    .pointer-content:hover {
        cursor: pointer;
    }

    .font-info {
        color: #1e88e5;
    }

    .font-danger {
        color: #e53935;
    }

    .segmentation-line {
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed #E0E0E0;
    }

    .dividing-line {
        width: 100%;
        height: 1px;
        background-color: #E0E0E0;
    }

    .hover-content:hover {
        color: #3f51b5;
    }

    .fixed-button-father {
        position: relative;
    }

    .page {
        margin-left: 80px !important;
        min-height: 100vh;
    }

    .require::before {
        content: '*';
        position: absolute;
        margin-left: -14px;
        vertical-align: middle;
        color: #F44336;
        font-size: 16px;
    }

    .point {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #F44336;
        margin: 0 4px;
        position: relative;
        top: -1px;
    }

    .site-menu > .site-menu-item > .site-menu-sub {
        left: 80px;
        
    }

    .modal-header {
        border-bottom: 1px solid #eee;
    }

    .label-center {
        display: flex;
        align-items: center;
    }

    *::-webkit-scrollbar {
        width: 6px;
        height: 12px;
        -webkit-appearance: none;
    }

    *::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 10px;
    }

    *::-webkit-scrollbar-track-piece {
        background: #eee;
        border-radius: 3px;
    }

    .bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
        width: 100%;
    }

    .money-color {
        color: #ff9800;
    }

    .vertical-line {
        width: 1px;
        height: 100%;
        background-color: #eee;
    }

    .bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
        height: 36.02px;
    }

    .fc-unthemed .fc-today {
        background: #eee;
    }

    .fixed-button {
        position: absolute;
        bottom: 0px;
        right: 0;
    }

    body {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none
    }

    .datepicker table tr td.today {
        background: #e5e5e5 !important;
        color: black !important;
    }

    .exceeded-display {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .search-button {
        background: white;
        color: #4caf50;
    }

    .search-button:disabled {
        background: #4caf50;
        color: white;
        opacity: 1;
    }

    .search-button:hover {
        color: #fff;
        background-color: #4caf50;
        border-color: #4caf50;
        opacity: 0.65;
    }
    .site-menu>.site-menu-item>a{
        padding:8px !important;
    }
    a:hover{
        cursor: pointer;
        text-decoration: none;
    }

    .fade {
        opacity: 0;
        transition: opacity .05s linear!important;
    }
</style>
