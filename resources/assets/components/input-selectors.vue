<!-- 选择员工，单人 -->
<template>
    <div class="selector" :id="'inputSelectMember' + this._uid">
        <div class="float-left">
            <input type="text" class="form-control" title="" @focus="showMember" :placeholder="this.placeholder"
                   v-model="selectedMemberName">
        </div>
        <div class="float-left" v-show="selectMemberShow">
            <select-staff class="selector" @change="changeSelectMember" :member-type="'principal'"></select-staff>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['placeholder'],
        data() {
            return {
                selectMemberShow: false,
            }
        },

        mounted() {
            this.globalClick(this.removeInputSelect);
        },

        computed: {
            selectedMemberName: function () {
                return this.$store.state.principalInfo.name
            }

        },

        methods: {
            showMember: function () {
                this.selectMemberShow = true;
            },

            removeInputSelect(event) {
                let tag = document.getElementById("inputSelectMember" + this._uid);
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.selectMemberShow = false;
                    }
                }
            },

            changeSelectMember: function () {
                this.selectMemberShow = false;
                this.$emit('change', false)
            }
        }
    }
</script>

<style>
    .selector {
        position: relative;
    }
</style>
