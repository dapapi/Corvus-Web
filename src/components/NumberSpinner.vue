<template>

    <input type="text" class="form-control" data-plugin="asSpinner" value="0"
           :class="[shortInput ? 'short-spinner-input' : '' , addtrail?'addtrail':'']">

</template>

<script>
    export default {
        props: ['shortInput','addtrail'],
        mounted() {
            let self = this;
            $(this.$el).asSpinner(
                {
                    format: function format(value) {
                        return value;
                    },
                    min: 0,
                    max: 100000000,
                }
            ).on('asSpinner::change', function (e) {
                self.$emit('change', e.currentTarget.value)
            })
        },

        methods: {
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
    .addtrail{
        width: 180px !important;
    }
    .short-spinner-input {
        width: 76% !important;
    }
</style>
