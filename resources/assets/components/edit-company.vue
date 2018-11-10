<template>
    <div class="clearfix">
        <div class="float-left">
            <editable-search-box :options="clientArr" @change="changeSelects"></editable-search-box>
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
                emitCompany: {},
                clientArr: []
            }
        },

        watch: {
            isWrite: function (newValue) {
                this.isDisable = !newValue;
            },
        },

        mounted() {
            this.getClients();
        },

        methods: {
            getClients: function () {
                let _this = this;
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/clients/all',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.clientArr.push({
                            name: response.data[i].company,
                            value: response.data[i].id,
                            grade: response.data[i].grade
                        })
                    }
                })
            },

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