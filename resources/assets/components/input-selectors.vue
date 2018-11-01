<template>
    <div class="selector" id="inputSelectMember">
        <div class="float-left edit-wrap">
            <input type="text" class="form-control" title="" @focus="showMember" :placeholder="this.placeholder">
        </div>
        <div class="float-left">
            <select-staff class="selector" v-show="selectMemberShow"></select-staff>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['placeholder'],
        data() {
            return {
                selectMemberShow: false,
                randomId: '',
            }
        },

        mounted() {
            this.globalClick(this.removeSelect);
        },

        methods: {
            showMember: function () {
                this.selectMemberShow = true;
            },

            removeSelect(event) {
                let i = document.getElementById("inputSelectMember");
                if (i) {
                    if (!i.contains(event.target)) {
                        console.log(this);
                        this.selectMemberShow = false;
                    }
                }
            },
        }
    }
</script>

<style>
    .selector {
        position: relative;
    }
</style>
