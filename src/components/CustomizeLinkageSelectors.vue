<template>

    <div class="clearfix pb-5">
        <select :id="'father' + n" title="" class="col-md-4 pl-0 float-left selectpicker">
            <selectorsOptions v-for="option in data" v-bind:id="option.id" :val="option.value"
                              :key="option.id">
                {{option.value}}
            </selectorsOptions>
        </select>
        <select :id="'child' + n" title="" class="col-md-4 pl-0 float-left">
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
                <selectors  :options="stararr" @change="changeTargetStars" :multiple="true"
                                        :placeholder="'请选择目标艺人'"></selectors>
            </div>
        </div>
    </div>

</template>
<script>
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
            }
        },
        computed:{
           
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
                this.basicEmit(value)
            },
            inputChange: function () {
                this.basicEmit(this.normalInput)
            },
            numberSpinnerChange: function (value) {
                this.basicEmit(value)
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
            changeTargetStars(){
                
            }
        }
    }
</script>

<style scoped>
.selectorsABC{
    width: 20px !important; 
}
    .btn-default {
        background: white;
    }
</style>


