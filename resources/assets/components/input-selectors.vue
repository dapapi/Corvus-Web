<template>
    <div class="selector" id="inputSelectMember">
        <div class="float-left edit-wrap">
            <input type="text" class="form-control" title="" @focus="showMember" :placeholder="this.placeholder">
        </div>
        <div class="float-left" v-show="selectMemberShow">
            <select-staff class="selector"></select-staff>
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
            this.globalClick(this.removeInputSelect);
        },

        methods: {
            showMember: function () {
                this.selectMemberShow = true;
            },

            removeInputSelect(event) {
                let tag = document.getElementById("inputSelectMember");
                if (tag) {
                    if (!tag.contains(event.target)) {
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
