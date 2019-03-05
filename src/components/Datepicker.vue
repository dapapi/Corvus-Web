<template>
    <div class="date">
        <div class="input-group">
        <input type="text" id="dateInput" autocomplete="off" class="form-control" title=""
               :placeholder="this.placeholder" :disabled='isDisabled' 
               @change="getInputValue">
        <span class="input-group-addon">
            <i class="icon md-apps" aria-hidden="true"></i>
        </span>
        </div>
        <div  class="clearfix checkbox-custom checkbox-primary my-5 " v-if="infinite">
            <input id="infinite" class="" @change="infiniteSelector" type="checkbox" v-model="infiniteCheck">
            <label for="infinite">无限期</label>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['placeholder', 'changeKey', 'startDate', 'default', 'clear','infinite'],
        data() {
            return {
                isDisabled:false,
                infiniteCheck:'',
            }
        },
        mounted() {

            let self = this;
        //    $('#dateInput').focus(function(){
        //        console.log(123);
        //    }) 
            $(this.$el).datepicker({
                format: "yyyy-mm-dd",
                language: "zh-CN",
                autoclose: true,
                todayHighlight: true
            }).on("changeDate", function () {
                self.$emit('change', $(this)[0].children[0].children[0].value);
                if (self.changeKey) {
                    self.$emit('select', self.changeKey, $(this)[0].children[0].children[0].value)
                }
            });
            if (this.default) {
                if (this.default.values) {
                    this.setValue(this.default.values.data.value)
                } else {
                    this.$nextTick(() => {
                        this.setValue(this.default)

                    })
                }
            }

        },
        watch: {
            /**
             * 设置时间选择范围，一般用于设置截止时间大于开始时间
             * */
            default(value) {
                if (this.default.values) {
                    this.setValue(this.default.values.data.value)
                } else {
                    this.setValue(this.default)
                }
            },
            startDate(newValue) {
                $(this.$el).datepicker('setStartDate', newValue);
                if(this.infiniteCheck===true){
                    this.placeholder = '无限期'
                }
            },
            clear: function (value) {
                if (value === true) {
                    this.setValue('')
                }
            }
        },
        methods: {
            /**
             * 在清空选择时间时，可设置value为空
             * */
            setValue(value) {
                $(this.$el).datepicker('update', value);
                // this.getInputValue()
            },

            destroy() {
                $(this.$el).datepicker('destroy');
            },
            //输入日期时获取值
            getInputValue(value) {
                // console.log($('#dateInput').val())
                this.$emit('change', $('#dateInput').val());
                console.log(value);

            },
            infiniteSelector(params){
                console.log(params);
                // $(this.$el).datepicker('update', 'infinite');
                if(this.infiniteCheck === true){
                    // this.destroy()
                    this.$emit('change','无限期')
                    $('.datepicker').css('display','none')
                    $(this.$el).datepicker('update', '');
                    this.placeholder = '无限期'
                }else{
                    this.placeholder = '请选择合同终止日期'
                }
                this.isDisabled = this.infiniteCheck
            }

        }
    }
</script>
<style>
    .infinite{
        vertical-align: middle;
    }
</style>

