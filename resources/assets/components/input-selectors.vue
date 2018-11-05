<template>
    <div class="selector" :id="'inputSelectMember' + this._uid">
        <div class="float-left">
            <input type="text" class="form-control" title="" @focus="showMember" :placeholder="this.placeholder"
                   v-model="inputContent">
        </div>
        <div class="float-left" v-show="selectMemberShow">
            <select-staff class="selector" :multiple="this.multiple" @change="changeSelectMember"></select-staff>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['placeholder', 'multiple', 'selected-members'],
        data() {
            return {
                selectMemberShow: false,
                randomId: '',
                inputContent: '',
                selectMember: []
            }
        },

        mounted() {
            this.globalClick(this.removeInputSelect);
            this.randomId = this._uid;
        },

        watch: {
            selectMember: function (newValue) {
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

            changeSelectMember: function (value) {
                if (value.length <= 0) {
                    return
                }
                if (!this.multiple) {
                    this.selectMemberShow = false;
                    this.inputContent = value[0].name;
                    this.$emit('change', value[0].id)
                } else {
                    // @todo 多选显示与返回
                }
            }
        }
    }
</script>

<style>
    .selector {
        position: relative;
    }
</style>
