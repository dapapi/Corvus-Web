<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">发起审批</h1>
        </div>
        <div class="page-content container-fluid" v-if="myOrganization">
            <div class="">
                <div class="row py-5">
                    <div class="col-lg-4 pointer-content" v-for="item in list" :key="item.id" @click="addProject(item.value)" v-if="(myOrganization === 411 && item.value === 3) || (myOrganization === 412 && item.value === 4) || item.value === 1 || item.value === 2">
                        <div class="card" >
                            <div class="card-block clearfix" >
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

        <BuildProject :project-type="projectType" :project-fields-arr="projectFieldsArr" v-if="canShow"></BuildProject>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';

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
                        name: '商务项目立项',
                        value: 4
                    },
                ],
                projectType: '',
                projectFieldsArr: [],
                myOrganization:'',
                canShow:false,
            }
        },
        created(){
            this.whoAmI()
        },
        mounted(){
        },
        methods: {
            addProject(value) {
                this.projectType = value;
                this.selectProjectType();
            },
            whoAmI(){
                this.myOrganization = JSON.parse(Cookies.get('user')).organization_id
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
                    this.canShow = true
                    this.projectFieldsArr = response.data;
                    this.$nextTick((params) => {
                        $('#addProject').modal('show')   
                    })
                });
            },
        }
    }
</script>

<style scoped>

</style>