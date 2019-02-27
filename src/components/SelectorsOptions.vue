<template>
    <option :value="val" class="test"><slot></slot></option>
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

<style scope>
    .test{
        z-index: 10000;
    }
</style>
