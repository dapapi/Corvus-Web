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
        },
        methods: {
            /**
             * 清空input内容
             * */
            refresh() {
                this.value = ''
            }
        }
    }
</script>

<style scoped>

</style>