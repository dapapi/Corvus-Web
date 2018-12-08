<template>
    <div class="input-daterange input-group date"
         data-date-format="yyyy-mm-dd" data-date-today-highlight="true" data-date-autoclose="true"
         style="padding: 0">
        <span class="input-group-addon">
            <i class="icon md-calendar" aria-hidden="true"></i>
        </span>
        <input type="text" class="form-control" id="start" name="start">
        <span class="input-group-addon">to</span>
        <input type="text" class="form-control" id="end" name="end">
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
                console.log('change');
                self.$emit('change', $('#start').val(), $('#end').val());
            });

        },
        methods: {
            setValue(start, end) {
                $('#start').datepicker('update', start);
                $('#end').datepicker('update', end);
            },

            destroy() {
                $(this.$el).datepicker('destroy');
            }
        }
    }
</script>