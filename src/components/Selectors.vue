<template>
    <select class="selectpicker show-tick form-control" data-plugin="selectpicker" :value="value"
            :data-live-search="isSelectable"
            :data-show-subtext="isSelectable" :id="_uid"
            :multiple="multiple" :title="title" v-model="valueListener">
            <option v-if="!options" value=""></option>
        <selectorsOptions v-for="option in options" v-bind:id="option.id" :val="option.value || option.id"
                          :key="option.id">
            {{option.name || option.title || option.nickname}}
            <!-- 增强组件扩展性和数据通用性 -->
        </selectorsOptions>
    </select>

</template>
<script>
    export default {
        // 凡是多选，都有搜索框；不是多选传入selectable为true也可以有搜索框
        // changeKey为父组件的data，且可以被改变
        props: ['options', 'disable', 'multiple', 'placeholder', 'changeKey', 'value', 'resetinfo', 'selectable', 'default', 'defaultFirst'],
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
            title: function () {
                if (this.placeholder) {
                    return this.placeholder
                } else {
                    return "请选择"
                }
            }
        },

        mounted() {
            let self = this;
            $(this.$el).selectpicker().on('hidden.bs.select', function () {
                // 可以通过调用select方法，去改变父组件传过来的changeKey
                if (self.changeKey) {
                    self.$emit('select', self.changeKey, $(this).val(), $(this)[0].selectedOptions[0].label)
                }
                if (!$(this).val() || $(this).val().length === 0) {
                    self.$emit('change', $(this).val());
                    return
                }
                self.$emit('change', $(this).val(), $(this)[0].selectedOptions[0].label, $(this)[0].selectedOptions[0].id);

            });
            // 默认选中第一项
            if (this.options && this.options.length > 0 && this.defaultFirst) {
                this.setValue(0)
                // this.$emit('change', this.options[0].value, this.options[0].name, this.options[0].id);
                // self.$emit('select', this.options[0].value, this.options[0].name)
            }
            if (this.default) {
                if(this.default.values){
                    this.setValue(this.default.values.data.value)
                }else{
                    this.setValue(this.default)
                }
            }
            if (this.getValue()) {
                this.$emit('change', this.getValue())
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
            },
            default:function(value){
                this.setValue(this.default)
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
    .btn-default {
        background: white;
    }

    .btn-group .bootstrap-select .show-tick {
        height: 36.02px;
    }
</style>


