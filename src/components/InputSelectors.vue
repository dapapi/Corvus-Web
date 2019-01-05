<!-- 选择员工，单人 -->
<template>
    <div class="selector" :id="'inputSelectMember' + _uid">
        <div class="float-left input-selectors-div" :class='otherslot?"":"input-selectors-add"'>
            <input type="text" class="form-control" title="" @focus="showMember" :placeholder="placeholder"
                   v-model="selectedMemberName">
        </div>
        <!-- <div class="addMember-trigger-button float input-selectors-div" :class="selectedMemberName?'addMember-trigger-left' : ''"
                 @click="showMember"><i class="iconfont icon-tianjia"></i></div> -->
        <div class="float-left" v-show="selectMemberShow">
            <select-staff class="selector" @change="changeSelectMember" :member-type="'principal'"
                          :type="type"></select-staff>
        </div>
    </div>
</template>
jj
<script>
    export default {
        props: ['placeholder', 'type', 'propSelectMemberName', 'otherslot'],
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
                if (this.propSelectMemberName) {
                    return this.propSelectMemberName
                } else {
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
                }
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
    .input-selectors-div {
        display: flex;

    }

    .input-selectors-add {
        width: 100%;
        width:140px;
    }

    .input-selectors-span {
        line-height: 30px;
        margin-left: 10px;
        cursor: pointer;
    }

    .selector {
        position: relative;
    }
</style>
