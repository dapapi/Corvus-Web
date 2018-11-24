<template>
    <select data-plugin="selectpicker" :value="value" :data-live-search="searchable" :multiple="multiple" :title="placeholder">
        <selectorsOptions v-for="option in this.options" v-bind:id="option.id" :val="option.value" :key="option.id">
            {{option.name}}
        </selectorsOptions>
    </select>
</template>
<script>
    export default {
        props: ['options', 'searchable', 'disable', 'multiple', 'placeholder', 'changeKey', 'value'], // changeKey为父组件的data，且可以被改变
        data() {
            return {
                isDisable: this.disable,
            }
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
                console.log(newValue);
                this.refresh()
            }
        },
        methods: {
            destroy() {
                $(this.$el).selectpicker('destroy');
            },

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


