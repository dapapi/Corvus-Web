<template>
    <div>
        <input type="hidden" id="inputHiddenInline"/>
    </div>
</template>

<script>
    export default {
        props: [],
        data() {
            return {}
        },
        mounted() {

            let self = this;

            $(this.$el).datepicker({
                inline: true,
                format: "yyyy-mm-dd",
                language: "zh-CN",
            }).on("changeDate", function () {
                self.$emit('change', $(this)[0].children[0].value);
            });

        },
        methods: {}
    }
</script>