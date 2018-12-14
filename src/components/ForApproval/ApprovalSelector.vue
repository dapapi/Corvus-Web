<template>
    <div class="approval-text-container col-md-12">
        <span class="col-md-2 text-right">{{title || '测试文本下拉框'}}</span>
        <select class="selectpicker col-md-10" data-plugin="selectpicker" :value="value" :data-live-search="isSelectable"
            :data-show-subtext="isSelectable"
            :multiple="multiple" :title="placeholder" v-model="valueListener">
            <option value="">ceshi 111</option>
            <option value="">ceshi 222</option>
        <selectorsOptions v-for="option in options" :id="option.id" :val="option.value || option.id"
                          :key="option.id">
            {{option.name || option.title}}
            <!-- 增强组件扩展性和数据通用性 -->
        </selectorsOptions>
    </select>

    </div>
</template>

<script>
export default {
     // 凡是多选，都有搜索框；不是多选传入selectable为true也可以有搜索框
        // changeKey为父组件的data，且可以被改变
        props: ['options', 'disable', 'multiple', 'placeholder', 'changeKey', 'value', 'resetinfo', 'selectable'],
        data() {
            return {
                title:'',
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
            if(!this.multiple){
                let self = this;
                $(this.$el).selectpicker().on('hidden.bs.select', function () {
                    self.$emit('change', $(this).val(), $(this)[0].selectedOptions[0].label, $(this)[0].selectedOptions[0].id);
                    // 可以通过调用select方法，去改变父组件传过来的changeKey
                    if (self.changeKey) {
                        self.$emit('select', self.changeKey, $(this).val(), $(this)[0].selectedOptions[0].label)
                    }
                });
            }else{
                $(this.$el).selectpicker()
            }
           
        },
        watch: {
            resetinfo: function (value) {
                if (value) {

                }
            },
            valueListener: function (newValue) {
                this.$emit('valuelistener', newValue)
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
            }

        }
    }
</script>

<style>
.col-md-10{
    padding: 0;
}
</style>
