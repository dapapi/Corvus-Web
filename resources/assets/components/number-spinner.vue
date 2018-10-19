<template>

    <input type="text" class="form-control" data-plugin="asSpinner" value="0" />

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
                    }
                }
            )
        },

        methods: {
            destroy() {
                $(this.$el).asSpinner('destroy');
            }
        }
    }
</script>
