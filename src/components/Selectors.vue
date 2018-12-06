<template>
    <select data-plugin="selectpicker" :value="value" :data-live-search="multiple" :multiple="multiple"
            :title="placeholder" v-model="valueListener">
        <selectorsOptions v-for="option in options" v-bind:id="option.id" :val="option.value || option.id"
                          :key="option.id">
            {{option.name || option.title}}
            <!-- 增强组件扩展性和数据通用性 -->
        </selectorsOptions>
    </select>

</template>
<script>
    export default {
        props: ['options', 'disable', 'multiple', 'placeholder', 'changeKey', 'value', 'resetinfo','preinfo'], // changeKey为父组件的data，且可以被改变
        data() {
            return {
                isDisable: this.disable,
                valueListener: []
            }
        },
        created() {

        },
        mounted() {
            let self = this;
            $(this.$el).selectpicker().on('hidden.bs.select', function () {
                self.$emit('change', $(this).val(), $(this)[0].selectedOptions[0].label, $(this)[0].selectedOptions[0].id);
                // 可以通过调用select方法，去改变父组件传过来的changeKey
                if (self.changeKey) {
                    self.$emit('select', self.changeKey, $(this).val(), $(this)[0].selectedOptions[0].label)
                }
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


