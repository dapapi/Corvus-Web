<template>

    <input type="text" class="form-control addtrail" data-plugin="asSpinner"  increment="0.1"
           :class="[shortInput ? 'short-spinner-input' : '']">

</template>

<script>
    export default {
        props: ['shortInput'],
        mounted() {
            let self = this;
            $(this.$el).asSpinner(
                {
                    format: function format(value) {
                        return value;
                    },
                    min: 0,
                    max: 1000000000,
                    precision: 2
                }
            ).on('asSpinner::change', function (e) {
                self.$emit('change', e.currentTarget.value)
            });
            $('.asSpinner').parent().css('width', '100%')
        },

        methods: {
            /**
             * 重置value为0时，value值 '0' 为字符串
             * */
            setValue(value) {
                $(this.$el).asSpinner('val', value);
            },
            refresh() {
                $(this.$el).asSpinner('refresh');
            },
            destroy() {
                $(this.$el).asSpinner('destroy');
            }
        }
    }
</script>

<style>
    .addtrail {
        width: calc(100% - 40px) !important;
    }

    .short-spinner-input {
        width: 76% !important;
    }

    .asSpinner {
        width: 100%;
    }
</style>
