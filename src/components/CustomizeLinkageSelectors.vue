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
            <input-selectors v-if="valueType === 6"></input-selectors>
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
                sendData:{
                    value:[],
                    field:'',
                    type:'',
                    operator:'',
                },
            }
        },
        computed:{
           
        },
        watch:{
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
                console.log(this.item);
                let currentData = this.item.find(item =>item.value == this.childData)
                this.sendData.operator = currentData.code
            }
        },
        created(){
            this.getDepartmets()    
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
                let father = _this.data.find(item => item.id === parseInt(id));
                _this.item = father.operator;
                _this.optionsData = father.content
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
            refresh: function () {
                $('#child' + this.n).selectpicker('refresh');
            },
            datePickerChange: function (value) {
                this.sendData.value = value
            },
            inputChange: function () {
               this.sendData.value = value
            },
            numberSpinnerChange: function (value) {
                this.sendData.value = value
            },
            basicEmit: function (value) {
                let data = {
                    key: this.keyId,
                    condition: this.conditionId,
                    value: value,
                    n: this.n
                };
                this.$emit('change', data)
            },
            changeTargetStars(value){
                this.sendData.value = value 
            },
            getDepartmets(value){
                let _this = this
                fetch('get','/departments').then((params) => {
                    _this.departments = params.data
                })
            },
            changeDepartments(value){
                this.sendData.value = value 
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


