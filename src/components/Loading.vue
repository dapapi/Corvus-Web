<template>
    <div class="loader-overlay" v-if="isLoading">
        <div class="loader-content">
            <div class="loader-index">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        props: ['isLoading']
    }
</script>

<style lang="css" scoped>
    .loader-overlay {
        margin-left: 80px;
        background-color: rgba(7, 17, 27, 0.2)
    }
</style>