<template>
<div class="col-md-12 approval-text-container pl-0">
    <span class="col-md-2 text-right">预计费用</span>
    <input ref='number' type="text" class="form-control addtrail" data-plugin="asSpinner" value="0"
           :class="[shortInput ? 'short-spinner-input' : '']">
</div>
</template>

<script>
    export default {
        props: ['shortInput','data'],
        data(){
            return {

            }
        },
        mounted() {
            console.log(this.$el);
            let _this = this;
            $(this.$refs.number).asSpinner(
                {
                    format: function format(value) {
                        return value;
                    },
                    min: 0,
                    max: 100000000,
                }
            ).on('asSpinner::change', function (e) {
                let {id} = _this.data[0]
                _this.$emit('change', {key:id,value:e.currentTarget.value,type:null})
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
