<template>
    <textarea title="" v-model="content"></textarea>
</template>

<script>
    export default {
        props:['default'],
        name: "NormalTextarea",
        data() {
            return {
                content: '',
            }
        },
        mounted(){
            if(this.default){
                this.content = this.default.values.data.value   
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