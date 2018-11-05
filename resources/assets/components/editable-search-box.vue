<template>
    <div class="clearfix">
        <div class="float-left company-select-wrap" id="companySelector">
            <div class="edit-wrap">
                <input type="text" title="" class="form-control" v-model="inputValue" @focus="showSelector">
            </div>
            <div class="company-selectors" v-show="selectorShow">
                <selectors :options="options" :searchable="true" @change="changeSelectors"></selectors>
            </div>
        </div>
        <div class="float-left col-md-6">
            <selectors :options="companyLevelArr" ref="companyLevel" @change="changeCompanyLevel"></selectors>
        </div>
    </div>
</template>

<script>
    import config from '../js/config'

    export default {
        name: "editable-search-box",
        props: ['options'],
        data() {
            return {
                inputValue: '',
                selectorShow: false,
                selectedCompany: '',
                companyLevelArr: config.companyLevelArr
            }
        },

        watch: {
            inputValue: function (newValue) {
                this.selectorShow = !newValue
            }
        },

        mounted() {
            this.globalClick(this.removeSelector);
        },

        methods: {
            changeSelectors: function (value, name, id) {
                this.inputValue = name
                this.selectedCompany = {
                    id: id,
                }
            },

            showSelector: function () {
                this.selectorShow = true
            },

            changeCompanyLevel: function () {

            },

            removeSelector: function (event) {
                let tag = document.getElementById("companySelector");
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.selectorShow = false;
                    }
                }
            }
        },

    }
</script>

<style scoped>
    .company-selectors {
        position: absolute;
    }

    .company-select-wrap {
        position: relative;
    }
</style>