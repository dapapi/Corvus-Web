<template>
    <option :value="val" :selected='selected' class="test"><slot></slot></option>
</template>
<script>
    export default {
        props: ['val','selected'],
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
