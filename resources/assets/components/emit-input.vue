<template>
    <input type="text" class="form-control" title="" v-model="value">
</template>

<script>
    export default {
        name: "emit-input",
        data() {
            return {
                value: ''
            }
        },
        watch: {
            value: function (newValue) {
                this.$emit('change', newValue)
            }
        }
    }
</script>

<style scoped>

</style>