<template>
    <div class="col-md-12 approval-text-container">
        <span class="col-md-2 text-right" >{{title || data[0].control_title || "时间选择器测试"}}</span>
        <datepicker class="col-md-10 time-picker" v-if="!duration" :placeholder="data[0].control_placeholder"/>
    </div>
</template>

<script>
export default {
    props:['duration','title','data'],
}
</script>

<style scoped>
.approval-text-container span{
    height: 30px;
}
    .col-md-10{
        padding:0 !important;
    }
</style>
