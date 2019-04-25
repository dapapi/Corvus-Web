<template>
    <div class="clearfix">
        <div class="float-left col-md-12 px-0">
            <editable-search-box style="width:100%" :options="brandArr" :type="'changeCompany'"
                                 @change="changeSelects"></editable-search-box>
        </div>
    </div>
</template>

<script>
    import config from '../assets/js/config'
    import env from '../assets/js/env'

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
                brandArr: []
            }
        },

        watch: {
            isWrite: function (newValue) {
                this.isDisable = !newValue;
            },
        },

        computed: {
            getCompanyInfo: function () {
                return this.$store.state.companyInfo
            }
        },

        mounted() {
            this.getClients();
        },

        methods: {

            getClients: function () {
                let _this = this;
                $.ajax({
                    type: 'get',
                    url: env.apiUrl + '/getCompanyBrand',
                    headers: env.getHeaders(),
                    
                }).done(function (response) {
                    for (let i = 0; i < response.length; i++) {
                        if(!response[i].brand) continue
                        _this.brandArr.push({
                            name: response[i].brand,
                            value: response[i].id,
                            grade: response[i].grade
                        })
                    }
                      
                })
              
            },

            changeCompanyLevel: function (value) {
                this.emitCompany.grade = value;
                let companyInfo = this.$store.state.companyInfo;
                companyInfo.grade = value;
                this.$store.commit('changeCompany', companyInfo);
                this.$emit('change', true)
            },

            changeSelects: function () {
                let companyInfo = this.$store.state.companyInfo;
                if (companyInfo.grade) {
                    this.$refs.companyLevel.setValue(companyInfo.grade);
                    this.isWrite = false;
                } else {
                    this.isWrite = true;
                }
                this.$emit('change', true)
            }

        },

    }
</script>

<style scoped>

</style>