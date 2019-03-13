<template>
    <div style="height: 100vh;width: calc(100% - 100px);margin-left: 100px;">
        <!--<div>-->
            <!--<button @click="getIdTest">获取</button>-->
        <!--</div>-->
        <iframe src="https://exmail.qq.com" width='100%' height='100%' frameborder='0' name="_blank"
                id="_blank"></iframe>
    </div>
</template>

<script>
    export default {
        name: "collaboration",
        mounted() {
        },

        methods: {
            getIdTest() {
                let item = $(window.parent.document.getElementById('_blank').contentWindow.document).find("#folder_online_doc_tag_td");

            }
        }
    }
</script>

<style>
    body {
        margin-left: 0px;
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        overflow: hidden;
    }
</style>