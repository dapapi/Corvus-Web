<template>
    <div class="col-md-12 approval-text-container">
        <span class="col-md-2 text-right" >{{title || data[0].control_title || "时间选择器测试"}}</span>
        <datepicker class="col-md-10" v-if="!duration"/>
    </div>
</template>

<script>
export default {
    props:['duration','title','data'],
}
</script>

<style>

</style>
