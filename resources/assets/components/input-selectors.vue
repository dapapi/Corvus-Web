<template>
    <div class="selector" id="inputSelectMember">
        <div class="float-left">
            <input type="text" class="form-control" title="" @focus="showMember" :placeholder="this.placeholder">
        </div>
        <div class="float-left" >
            <select-staff class="selector" v-show="selectMemberShow"></select-staff>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['placeholder', 'inputselectshow'],
        data() {
            return {
                selectMemberShow: false,
            }
        },

        mounted() {

        },

        watch: {
            inputselectshow(newValue) {
                this.selectMemberShow = newValue
            }
        },

        methods: {
            showMember: function () {
                this.selectMemberShow = true;
                this.$emit('change', this.selectMemberShow);
            }
        }
    }
</script>

<style>
    .selector {
        position: relative;
    }
</style>
