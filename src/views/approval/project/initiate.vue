<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">发起审批</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="">
                <div class="row py-5">
                    <div class="col-lg-4" v-for="item in list" :key="item.id" @click="addProject(item.value)">
                        <div class="card">
                            <div class="card-block clearfix">
                                <div class="float-left" style="width: 40px;height: 40px;">
                                    <img src="https://res-crm.papitube.com/contract-dark-blue.png" alt=""
                                         style="width: 100%">
                                </div>
                                <div class="float-left" style="line-height: 40px;margin-left: 1rem">
                                    <div>{{item.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BuildProject :project-type="projectType" :project-fieldsA-arr="projectFieldsArr"></BuildProject>
    </div>
</template>

<script>
    import fetch from '../../../assets/utils/fetch.js'

    export default {
        name: "initiate",
        data() {
            return {
                list: [
                    {
                        name: '影视项目立项',
                        value: 1
                    },
                    {
                        name: '综艺项目立项',
                        value: 2
                    },
                    {
                        name: '商务项目立项',
                        value: 3
                    },
                    {
                        name: 'papi项目立项',
                        value: 4
                    },
                ],
                projectType: '',
                projectFieldsArr: [],
            }
        },
        methods: {
            addProject(value) {
                this.projectType = value;
                this.selectProjectType(function () {
                    $('#addProject').modal('show')
                });
            },

            selectProjectType(callback) {
                fetch('get', '/project_fields', {
                    type: this.projectType,
                    status: 1,
                }).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].field_type === 2 || response.data[i].field_type === 6) {
                            response.data[i].contentArr = [];
                            for (let j = 0; j < response.data[i].content.length; j++) {
                                response.data[i].contentArr.push({
                                    value: response.data[i].content[j],
                                    name: response.data[i].content[j]
                                })
                            }
                        }
                    }
                    this.projectFieldsArr = response.data;
                    callback();
                });
            },
        }
    }
</script>

<style scoped>

</style>