<template>
<div>
    <div class="col-md-12 approval-text-container">
        <span class="col-md-2" >{{title || "时间选择器测试"}}</span>
        <datepicker class="col-md-10" v-if="!duration"/>
        <GroupDatepicker class="col-md-10" v-if="duration"/>
    </div>
</div>
</template>

<script>
export default {
    props:['duration','title'],
}
</script>

<style>

</style>
