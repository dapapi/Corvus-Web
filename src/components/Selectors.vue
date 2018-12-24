<template>
    <select class="selectpicker show-tick" data-plugin="selectpicker" :value="value" :data-live-search="isSelectable"
            :data-show-subtext="isSelectable" :id="_uid"
            :multiple="multiple" :title="placeholder" v-model="valueListener">
        <selectorsOptions v-for="option in options" v-bind:id="option.id" :val="option.value || option.id"
                          :key="option.id">
            {{option.name || option.title}}
            <!-- 增强组件扩展性和数据通用性 -->
        </selectorsOptions>
    </select>

</template>
<script>
    export default {
        // 凡是多选，都有搜索框；不是多选传入selectable为true也可以有搜索框
        // changeKey为父组件的data，且可以被改变
        props: ['options', 'disable', 'multiple', 'placeholder', 'changeKey', 'value', 'resetinfo', 'selectable'],
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
    .btn-default {
        background: white;
    }
</style>


