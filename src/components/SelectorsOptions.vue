<template>
    <option :value="val" ><slot></slot></option>
</template>
<script>
    export default {
        props: ['val'],
        data() {
            return {
                value: ''
            }
        },
        mounted() {
        },
        methods:{
        }
    }
</script>


