<template>
    <div class="input-group date">
        <input type="text" class="form-control" title="" :placeholder="this.placeholder">
        <span class="input-group-addon">
                <i class="icon md-apps" aria-hidden="true"></i>
            </span>
    </div>
</template>
<script>
    export default {
        props: ['placeholder'],
        data() {
            return {}
        },
        mounted() {

            let self = this;

            $(this.$el).datepicker({
                format: "yyyy-mm-dd",
                language: "zh-CN",
            }).on("changeDate", function () {
                self.$emit('change', $(this)[0].children[0].value);
            });

        },
        methods: {
            setValue(value) {
                $(this.$el).datepicker('update', value);
            },

            destroy() {
                $(this.$el).datepicker('destroy');
            }
        }
    }
</script>


