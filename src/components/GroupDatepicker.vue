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
        props: ['placeholder','default'],
        data() {
            return {
                timeGroup:[],
            }
        },
        mounted() {
            this.defaultDataHandler()
            this.setValue(this.timeGroup[0],this.timeGroup[1])
            let self = this;

            $(this.$el).datepicker({
                format: "yyyy-mm-dd",
                language: "zh-CN",
            }).on("changeDate", function () {
                self.$emit('change', $('#start').val(), $('#end').val());
            });

        },
        methods: {
            defaultDataHandler(){
                if(this.default){
                    let timeGroupA = this.default.values.data.value.split('|')
                    this.timeGroup = timeGroupA.map((params) => {
                        let tempGroup = params.split('-')
                        tempGroup.push(tempGroup.shift())
                        let finalGroup = tempGroup.join('/')
                        return finalGroup
                        })
                }
            },
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