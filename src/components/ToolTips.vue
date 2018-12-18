<template>
    <span data-toggle="tooltip"><slot></slot></span>
</template>

<script>
export default {
    name: 'ToolTips',
    props: ['title', 'placement'], // title为内容 placement为展示位置，参数：top left bottom等
    data() {
        return {
            propsTitle:''
        }
    },
    mounted() {
        this.getCount()
    },
    watch:{
        title:function(){
            this.getCount()
        }
    },
    methods:{
        getCount(){
            $('[data-toggle="tooltip"]').tooltip({
                title: `<div>${this.title}</div>`, // 内容
                placement: this.placement ? this.placement : 'bottom', // 位置
                template: `<div class="tooltip bs-tooltip-bottom"  // 模板
                    role="tooltip">
                    <div class="arrow"></div>
                    <div class="tooltip-inner"></div>
                    </div>`,
                html: true
            });
        }
    }
}
</script>

<style>
    .tooltip.show {
        opacity: 1;
    }
    .tooltip-inner {
        background-color: #fff!important;
        color: rgb(117, 117, 117);
        border: 1px solid #eee;
        padding: 10px 20px;
        font-size: 14px;
    }

</style>

