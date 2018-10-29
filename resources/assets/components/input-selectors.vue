<template>
    <div class="selector">
        <input type="text" class="form-control" title="" @focus="showMember">
        <select-staff class="selector" v-show="selectMemberShow"></select-staff>
    </div>
</template>

<script>
    export default {
        props: [],
        data() {
            return {
                selectMemberShow: false,
            }
        },

        mounted() {

        },

        methods: {
            showMember: function () {
                this.selectMemberShow = !this.selectMemberShow
            }
        }
    }
</script>

<style>
    .selector {
        position: relative;
    }
</style>
