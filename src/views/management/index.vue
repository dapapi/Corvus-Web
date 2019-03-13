<template>
    <div class="page col-md-10.5">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="css" scoped>
    .page {
        margin-left: 200px!important;
        height: 100%;
        padding: 0;
    }
</style>