<template>
    <div class="clearfix">
        <div class="float-left">
            <editable-search-box :options="options" @change="changeSelects"></editable-search-box>
        </div>
        <div class="float-left col-md-6">
            <selectors :options="clientLevelArr" ref="companyLevel" @change="changeCompanyLevel"
                       :disable="isDisable"></selectors>
        </div>
    </div>
</template>

<script>
    import config from '../js/config'

    export default {
        name: "edit-company",
        props: ['options'],
        data() {
            return {
                clientLevelArr: config.clientLevelArr,
                selectIdArr: [],
                isDisable: false,
                isWrite: true,
                emitCompany: {}
            }
        },

        watch: {
            isWrite: function (newValue) {
                this.isDisable = !newValue;
            },
        },

        mounted() {
        },

        methods: {

            changeCompanyLevel: function (value) {
                this.emitCompany.grade = value;
                this.$emit('change', this.emitCompany)
            },

            changeSelects: function (name, id, grade,) {
                this.$refs.companyLevel.setValue(grade);
                this.isWrite = !id;
                if (id) {
                    this.emitCompany = {
                        id: id
                    }
                } else {
                    this.emitCompany = {
                        company: name,
                    };
                    this.emitCompany.grade = this.$refs.companyLevel.getValue()
                }
                this.$emit('change', this.emitCompany)
            }

        },

    }
</script>

<style scoped>

</style>