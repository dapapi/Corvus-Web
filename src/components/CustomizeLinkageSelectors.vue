<template>

    <div class="clearfix pb-5">
        <select :id="'father' + n" title="" class="col-md-4 pl-0 float-left selectpicker" v-model="fatherData">
            <option value='' disabled selected style='display:none' >请选择</option>
            <selectorsOptions v-for="option in data" v-bind:id="option.id" :val="option.value"
                              :key="option.id">
                {{option.value}}
            </selectorsOptions>
        </select>
        <select :id="'child' + n" title="" class="col-md-4 pl-0 float-left" v-model="childData">
            <option value='' disabled selected style='display:none'>请选择</option>
            <selectorsOptions v-for="option in item" v-bind:id="option.id" :val="option.value"
                              :key="option.id">
                {{option.value}}
            </selectorsOptions>
        </select>
        <div class="col-md-4 float-left p-0">
            <input type="text" class="form-control" disabled v-if="valueType === 'disable'" v-model="disableInput">
            <input type="text" class="form-control" v-if="valueType === 1" v-model="normalInput"
                   :onchange="inputChange">
            <datepicker v-if="valueType === 3" @change="datePickerChange"></datepicker>
            <number-spinner v-if="valueType === 2" ref="numberSpinner" :shortInput="true"
                            @change="numberSpinnerChange"></number-spinner>
            <!-- <input-selectors v-if="valueType === 6"></input-selectors> -->
            <div v-if="valueType === 6" class="">
                <selectors class="pr-40" ref='selectors' :options="users" @valuelistener="changeUsers" :multiple="true"
                                        :placeholder="'请选择'"></selectors>
            </div>
            <div v-if="valueType === 5" class="">
                <selectors class="pr-40" ref='selectors' :options="stararr" @valuelistener="changeTargetStars" :multiple="true"
                                        :placeholder="'请选择'"></selectors>
            </div>
            <div class="" v-if="[4,7].includes(valueType) ">
                <selectors  class="scopeSelector pr-40" ref='selectors' :options="valueType===7?departments:optionsData" 
                @valuelistener="changeDepartments"  multiple='true' :placeholder='"请选择"'></selectors>
            </div>
        </div>
    </div>

</template>
<script>
import { mapState, mapActions } from 'vuex'
import fetch from '@/assets/utils/fetch.js'
import config from '@/assets/js/config'

    export default {
        props: ['data', 'n','stararr'],
        data() {
            return {
                valueType: 'disable',
                disableInput: '',
                normalInput: '',
                keyId: '',
                conditionId: '',
                item: function () {
                    return this.data[0].operator
                },
                departmentShow:false,
                departments:{},
                optionsData:{},
                fatherData:'',
                childData:'',
                detailData:'',
                trailTypeArr:config.trailTypeArr,
                users: [],
                sendData:{
                    value:[],
                    field:'',
                    type:'',
                    operator:'',
                },
            }
        },
        computed: {
            ...mapState([
                'department',
                'userList'
            ]),

            _department () {
                return this.department
            },
            _userList () {
                return this.userList
            }
        },
        watch:{
            _department () {
                this.departments = this.department
            },
            _userList () {
                this.users = this.userList
            },
            'sendData.value':function(value){
                this.$emit('sendcusdata',this.sendData,this.n)
            },
            normalInput:function(){
                this.sendData.value = this.normalInput
            },
            fatherData:function(){
                let currentData = this.data.find(item => item.value == this.fatherData)
                this.sendData.field = currentData.code
                this.sendData.type = currentData.type
                this.sendData.value = ''
            },
            childData:function(){
                let currentData = this.item.find(item =>item.value == this.childData)
                this.sendData.operator = currentData.code
            }
        },
        created(){
            if (this.department.length === 0) {
                this.getDepartment()
            } else {
                this.departments = this.department
            }
            if (this.userList.length === 0) {
                this.getUserList()
            } else {
                this.users = this.userList
            }
        },
        beforeMount() {
            if(this.data[0]){
                return this.data[0].operator
            }
            this.$nextTick(() => {
                this.refresh()
            })
        },
        mounted() {
            $('.selectpicker').selectpicker('refresh')
            let _this = this;
            let father = $('#father' + _this.n);
            let child = $('#child' + _this.n);

            father.selectpicker().on('hidden.bs.select', function () {
                let id = $(this)[0].selectedOptions[0].id;
                console.log(id);
                let father = _this.data.find(item => item.id === parseInt(id));
                _this.item = father.operator;
                _this.optionsData = father.content
                if(id == 255353757){
                    _this.optionsData = _this.trailTypeArr
                }
                _this.refresh()
                if (_this.valueType === 'number') {
                    _this.$refs.numberSpinner.destroy();
                }
                _this.valueType = father.type;
                _this.$nextTick(() => {
                    _this.refresh()
                })
                _this.keyId = $(this)[0].selectedOptions[0].id;
                _this.conditionId = _this.item[0].value;
            });

            child.selectpicker().on('hidden.bs.select', function () {
                _this.conditionId = $(this)[0].value;
            });
        },

        methods: {
            ...mapActions([
                'getDepartment', // 获取部门数据
                'getUserList'
            ]),
            refresh: function () {
                $('#child' + this.n).selectpicker('refresh');
            },
            datePickerChange: function (params) {
                this.sendData.value = params
            },
            inputChange: function () {
               this.sendData.value = params
            },
            numberSpinnerChange: function (params) {
                this.sendData.value = params
            },
            basicEmit: function (params) {
                let data = {
                    key: this.keyId,
                    condition: this.conditionId,
                    value: params,
                    n: this.n
                };
                this.$emit('change', data)
            },
            changeTargetStars(params){
                this.sendData.value = params 
            },
            changeDepartments(value){
                this.sendData.value = value 
            },
            changeUsers(params){
                this.sendData.value = params 
            }
        }
    }
</script>

<style scoped>
.scopeSelector{
    width: 200px !important;
    overflow: hidden !important;
}
.selectorsABC{
    width: 20px !important; 
}
    .btn-default {
        background: white;
    }
</style>


