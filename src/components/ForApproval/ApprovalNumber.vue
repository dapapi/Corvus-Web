<template>
<div class="col-md-12 approval-text-container">
    <span class="col-md-2 text-right">预计费用</span>
    <input ref='number' type="text" class="form-control addtrail" data-plugin="asSpinner" value="0"
           :class="[shortInput ? 'short-spinner-input' : '']">
</div>
</template>

<script>
    export default {
        props: ['shortInput'],
        mounted() {
            console.log(this.$el);
            let self = this;
            $(this.$refs.number).asSpinner(
                {
                    format: function format(value) {
                        return value;
                    },
                    min: 0,
                    max: 100000000,
                }
            ).on('asSpinner::change', function (e) {
                self.$emit('change', e.currentTarget.value)
            });
            $('.asSpinner').parent().css('width', '50%')
        },

        methods: {
            /**
             * 重置value为0时，value值 '0' 为字符串
             * */
            setValue(value) {
                $(this.$refs.number).asSpinner('val', value);
            },
            refresh() {
                $(this.$refs.number).asSpinner('refresh');
            },
            destroy() {
                $(this.$refs.number).asSpinner('destroy');
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
