<template>
    <div class="input-daterange datepicker"
         data-date-format="yyyy-mm-dd" data-date-today-highlight="true" data-date-autoclose="true"
         style="padding: 0">
        <div class="input-group">
                <span class="input-group-addon">
                  <i class="icon md-calendar" aria-hidden="true"></i>
                </span>
            <input type="text" class="form-control" id="start" name="start">
        </div>
        <div class="input-group">
            <span class="input-group-addon">to</span>
            <input type="text" class="form-control" id="end" name="end">
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
                console.log(start);
                console.log(end);
                console.log($(this.$el));
                $(this.$el).datepicker('update', start, end);
            },

            destroy() {
                $(this.$el).datepicker('destroy');
            }
        }
    }
</script>