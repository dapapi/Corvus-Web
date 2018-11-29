<template>
    <textarea title="" v-model="content"></textarea>
</template>

<script>
    export default {
        name: "NormalTextarea",
        data() {
            return {
                content: '',
            }
        },
        watch: {
            content: function (newValue) {
                this.$emit('change', newValue)
            }
        }
    }
</script>

<style scoped>

</style>