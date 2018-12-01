<!-- 选择员工，单人 -->
<template>
    <div class="selector" :id="'inputSelectMember' + _uid">
        <div class="float-left">
            <input type="text" class="form-control" title="" @focus="showMember" :placeholder="placeholder"
                   v-model="selectedMemberName">
        </div>
        <div class="float-left" v-show="selectMemberShow">
            <select-staff class="selector" @change="changeSelectMember" :member-type="'principal'"
                          :type="type"></select-staff>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['placeholder', 'type'],
        data() {
            return {
                selectMemberShow: false
            }
        },

        mounted() {
            this.globalClick(this.removeInputSelect);
        },

        computed: {
            selectedMemberName: function () {
                if (this.type === 'change') {
                    this.$emit('change', this.$store.state.principalInfo.name)
                    return this.$store.state.principalInfo.name
                } else if (this.type === 'selector') {
                    this.$emit('change', this.$store.state.selectPrincipalInfo)
                    return this.$store.state.selectPrincipalInfo.name
                } else {
                    this.$emit('change', this.$store.state.newPrincipalInfo)
                    return this.$store.state.newPrincipalInfo.name
                }
            },

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
