<template>

    <input type="text" class="form-control" data-plugin="asSpinner" value="0"/>

</template>

<script>
    export default {
        props: [],
        mounted() {
            let self = this;
            $(this.$el).asSpinner(
                {
                    format: function format(value) {
                        return value;
                    },
                    min: 0,
                    max: 100,
                }
            ).on('asSpinner::change', function (e) {
                self.$emit('change', e.currentTarget.value)
            })
        },

        methods: {
            destroy() {
                $(this.$el).asSpinner('destroy');
            }
        }
    }
</script>
