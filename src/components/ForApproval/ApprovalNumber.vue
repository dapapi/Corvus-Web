<template>
    <div class="approval-text-container spinnerUi col-md-12">
        <span class="col-md-2 text-right">{{title || data[0].control_title}}</span>
        <!-- <input type="text" class="form-control col-md-10" data-plugin="asSpinner" value="0"
            :class="[shortInput ? 'short-spinner-input' : '' , addtrail?'addtrail':'']"> -->
        <!-- <input type="text" class="form-control" data-plugin="asSpinner" value="0">
        <div class="spinnerUi-control">
            <span class="spinnerUi-up"></span>
            <span class="spinnerUi-down"></span>
        </div> -->
        <div class="input-group bootstrap-touchspin">
            <span class="input-group-addon bootstrap-touchspin-prefix" style="display: none;"></span>
            <input type="text" class="form-control" name="touchSpinVertical" data-plugin="TouchSpin" data-verticalbuttons="true" value="0" style="display: block;">
            <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;"></span>
            <span class="input-group-btn-vertical">
                <button class="btn btn-default bootstrap-touchspin-up waves-effect waves-light waves-round" type="button">
                    <i class="md-plus"></i>
                </button>
            <button class="btn btn-default bootstrap-touchspin-down waves-effect waves-light waves-round" type="button">
                <i class="md-minus"></i></button></span></div>
    </div>
</template>

<script>
    export default {
        props: ['shortInput', 'addtrail','title','n','data'],
        mounted() {
            let self = this;
            // $(this.$el).asSpinner(
            //     {
            //         format: function format(value) {
            //             return value;
            //         },
             
            //         min: 0,
            //         max: 100000000,
            //     }
            // )
            // .on('asSpinner::change', function (e) {
            //     self.$emit('change', e.currentTarget.value)
            // })
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

<style scoped>
.spinnerUi-up{
    
}
    /* .addtrail {
        width: 180px !important;
    }

    .short-spinner-input {
        width: 76% !important;
    } */
</style>
