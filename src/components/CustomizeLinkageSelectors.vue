<template>

    <div class="clearfix pb-5">
        <select :id="'father' + this.n" title="" class="col-md-4 pl-0 float-left">
            <selectorsOptions v-for="option in this.data" v-bind:id="option.id" :val="option.value"
                              :key="option.id">
                {{option.name}}
            </selectorsOptions>
        </select>
        <select :id="'child' + this.n" title="" class="col-md-4 pl-0 float-left">
            <selectorsOptions v-for="option in this.item" v-bind:id="option.id" :val="option.value"
                              :key="option.id">
                {{option.name}}
            </selectorsOptions>
        </select>
        <div class="col-md-4 float-left p-0">
            <input type="text" class="form-control" disabled v-if="valueType === 'disable'" v-model="disableInput">
            <input type="text" class="form-control" v-if="valueType === 'input'" v-model="normalInput"
                   :onchange="inputChange">
            <datepicker v-if="valueType === 'date'" @change="datePickerChange"></datepicker>
            <number-spinner v-if="valueType === 'number'" ref="numberSpinner"
                            @change="numberSpinnerChange"></number-spinner>
            <input-selectors v-if="valueType === 'person'"></input-selectors>
        </div>
    </div>

</template>
<script>
    export default {
        props: ['data', 'n'],
        data() {
            return {
                item: function () {
                    return this.data[0].child
                },
                valueType: 'disable',
                disableInput: '',
                normalInput: '',
                keyId: '',
                conditionId: '',
            }
        },

        beforeMount() {
            this.item = this.data[0].child;
            setTimeout(() => {
                this.refresh();
            }, 0)
        },

        mounted() {
            let self = this;

            let father = $('#father' + self.n);
            let child = $('#child' + self.n);

            father.selectpicker().on('hidden.bs.select', function () {
                let id = $(this)[0].selectedOptions[0].id;
                let father = self.data.find(item => item.id === parseInt(id));
                self.item = father['child'];
                if (self.valueType === 'number') {
                    self.$refs.numberSpinner.destroy();
                }
                self.valueType = father['type'];
                setTimeout(function () {
                    self.refresh();
                }, 0);
                self.keyId = $(this)[0].selectedOptions[0].id;
                self.conditionId = self.item[0].value;
            });

            child.selectpicker().on('hidden.bs.select', function () {
                self.conditionId = $(this)[0].value;
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
            }
        }
    }
</script>

<style>
    .btn-default {
        background: white;
    }
</style>


