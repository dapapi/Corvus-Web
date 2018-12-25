<template>
    <div id="app">
        <template v-if="isLeftMenuShow">
            <LeftMenu/>
            <get-message/>
        </template>
        <template v-else-if="isLeftManageShow">
            <LeftManage/>
        </template>
        <router-view/>
    </div>
</template>

<script>

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
                if (this.$route.path === '/login' || this.$route.path === '/informationForm') {
                    this.isLeftMenuShow = false
                }
                else if (this.$route.path === '/management'
                    || this.$route.path === '/rolemanagement'
                    || this.$route.path === '/appmanagement'
                    || this.$route.path === '/organization'
                    || this.$route.path === '/organization/management'){
                     this.isLeftMenuShow = false
                     this.isLeftManageShow = true
                } else{
                    this.isLeftMenuShow = true
                    this.isLeftManageShow = false 
                }
            },

        },
        methods: {}
    };
</script>

<style>
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

    .fixed-button {
        position: absolute;
        bottom: 20px;
        right: 0;
    }

    .page {
        margin-left: 100px !important;
        min-height: 100vh;
    }

    /* .require {
        position: relative;
    }

    .require:before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #F44336;
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
    } */
    .require::before {
        content: '*';
        position: relative;
        left: -4px;
        vertical-align: middle;
        color: #F44336;
        font-size: 16px;
        /* line-height: 1; */
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
        left: 100px;
    }

    .modal-header {
        border-bottom: 1px solid #eee;
    }

    .edit-height {
        /*height: 57px;*/
    }
    .label-name {
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

</style>
