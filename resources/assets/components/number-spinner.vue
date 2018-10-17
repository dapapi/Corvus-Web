<template>

    <div>
        <input type="text" class="form-control asSpinnerUi" data-plugin="asSpinner" value="0">
    </div>

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

        methods: {}
    }
</script>
