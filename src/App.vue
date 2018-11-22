<template>
    <div id="app">
        <template v-if="isLeftMenuShow">
            <LeftMenu/>   
        </template>
        <router-view/>
    </div>
</template>

<script>
    import LeftMenu from '@/components/LeftMenu.vue'
    import Approval from '@/components/Approval.vue'
    export default {
        name: 'app',
        data: function () {
            return {
                isLeftMenuShow: true
            }
        },
        components: {
            LeftMenu
        },
        watch: {
            '$route': function (to, from) {
                if (this.$route.path === '/login') {
                    this.isLeftMenuShow = false
                }
            }
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

    .asSpinner input {
        width: 78% !important;
    }

    .asSpinner {
        height: 36px;
        display: flex;
    }

    .site-menubar-body {
        height: 100% !important;
    }

    .table td, .table th {
        border-top: none;
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

    .require {
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

</style>
