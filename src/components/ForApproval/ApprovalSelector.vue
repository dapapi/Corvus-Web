<template>
    <div class="approval-text-container col-md-12">
        <span class="col-md-2 text-right">{{title || data[0].control_title}}</span>
        <select class="good-picker selectpicker col-md-10" data-plugin="" :value="value" :data-live-search="isSelectable"
            :data-show-subtext="isSelectable" 
            :multiple="multiple" :title="placeholder || data[0].control_placeholder" v-model="valueListener">
        <selectorsOptions v-for="option in options || data[0].control_enums" :id="option.enum_sort" :val="option.enum_sort"
                          :key="option.enum_sort">
            {{option.enum_value}}
            <!-- 增强组件扩展性和数据通用性 -->
        </selectorsOptions>
    </select>

    </div>
</template>

<script>
export default {
     // 凡是多选，都有搜索框；不是多选传入selectable为true也可以有搜索框
        // changeKey为父组件的data，且可以被改变
        props: ['options', 'n', 'multiple', 'placeholder', 'changeKey', 'value', 'resetinfo', 'selectable','title','data','index'],
        data() {
            return {
                isDisable: this.disable,
                valueListener: [],
            }
        },
        computed: {
            isSelectable: function () {
                if (this.selectable) {
                    return true
                }
                if (this.multiple) {
                    return true
                }
                return false
            },
        },

        mounted() {
            // if(!this.multiple){
            //     let self = this;
            //     $(this.$el).selectpicker().on('hidden.bs.select', function () {
            //         console.log($(this).val());
            //         self.$emit('change', $(this).val(), $(this)[0].selectedOptions[0].label, $(this)[0].selectedOptions[0].id);
            //         // 可以通过调用select方法，去改变父组件传过来的changeKey
            //         if (self.changeKey) {
            //             self.$emit('select', self.changeKey, $(this).val(), $(this)[0].selectedOptions[0].label)
            //         }
            //     });
            // }else{
            //     $(this.$el).selectpicker()
            // }
           
        },
        watch: {
            n:function(value){

            },
            valueListener: function (newValue) {
                this.$emit('change', newValue,this.index)
            },
            disable: function (newValue) {
                this.isDisable = newValue;
                if (newValue) {
                    $(this.$el).attr('disabled', 'disabled');
                    this.refresh()
                } else {
                    $(this.$el).removeAttr('disabled');
                    this.refresh()
                }
            },
            options: function (newValue) {
                this.$nextTick(() => {
                    this.refresh()
                })
            }
        },
        methods: {

            destroy() {
                $(this.$el).selectpicker('destroy');
            },

            /**
             * 在清空选择时，可设置value为空
             * */
            setValue(value) {
                $(this.$el).selectpicker('val', value);
            },

            getValue() {
                return $(this.$el).selectpicker('val');
            },

            refresh() {
                $(this.$el).selectpicker('refresh');
            },
        }
    }
</script>

<style>
.good-picker{
    padding: 0;
}
</style>
