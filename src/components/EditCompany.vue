<template>
    <div class="clearfix">
        <div class="float-left col-md-6 pl-0">
            <editable-search-box :options="clientArr" :type="'changeCompany'"
                                 @change="changeSelects"></editable-search-box>
        </div>
        <div class="float-left col-md-6 pr-0">
            <selectors :options="clientLevelArr" ref="companyLevel" @change="changeCompanyLevel"
                       :disable="isDisable" placeholder='请选择类别'></selectors>
        </div>
    </div>
</template>

<script>
    import config from '../assets/js/config'

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
                    url: config.apiUrl + '/clients/all',
                    headers: config.getHeaders(),
                    
                }).done(function (response) {
                    // console.log(response.data)
                    
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