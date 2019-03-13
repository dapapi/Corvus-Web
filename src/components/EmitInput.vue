<template>
    <input type="text" class="form-control" title="" v-model="value">
</template>

<script>
    export default {
        props:['default'],
        name: "emit-input",
        data() {
            return {
                value: ''
            }
        },
        mounted(){
            if(this.default){
                this.value = this.default.values.data.value
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
            refresh(params) {
                this.value = params
            },
            // setValue(params){
            //     this.$nextTick(() => {
            //         this.value = params   
            //     })
            // }
        }
    }
</script>

<style scoped>

</style>