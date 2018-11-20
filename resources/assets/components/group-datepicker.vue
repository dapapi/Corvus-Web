<template>
    <div class="input-daterange datepicker"
         data-date-format="yyyy-mm-dd" data-date-today-highlight="true" data-date-autoclose="true"
         style="padding: 0">
        <div class="input-group">
                <span class="input-group-addon">
                  <i class="icon md-calendar" aria-hidden="true"></i>
                </span>
            <input type="text" class="form-control" id="start">
        </div>
        <div class="input-group">
            <span class="input-group-addon">to</span>
            <input type="text" class="form-control" id="end">
        </div>
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
                self.$emit('change', $('#start').val(), $('#end').val());
            });

        },
        methods: {
            setValue(start, end) {
                $(this.$el).datepicker('update', start, end);
            },

            destroy() {
                $(this.$el).datepicker('destroy');
            }
        }
    }
</script>