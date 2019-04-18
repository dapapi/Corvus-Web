<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: function () {
            return {
            }
        },
        mounted(){
        },
        methods: {
        }
    };
</script>

<style>
 .require::before {
    content: '*';
    position: absolute;
    margin-left: -14px;
    vertical-align: middle;
    color: #F44336;
    font-size: 16px;
}
</style>
