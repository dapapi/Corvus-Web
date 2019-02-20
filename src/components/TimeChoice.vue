<template>
    <div>
        <input type="text" value="0" data-plugin="hourChoice" class="form-control addtrail col-md-2" >
        <span>:</span>
        <input type="text" value="0" data-plugin="minuteChoice" class="form-control addtrail col-md-2" >
    </div>
    
    
</template>
<script>
    export default {
        // props: ['shortInput'],
        mounted() {
            let self = this;
            $(this.$el).hourChoice(
                {
                    format: function format(value) {
                        return value;
                    },
                    min: 0,
                    max: 23,
                    precision: 2
                }
            )
            $(this.$el).minuteChoice(
                {
                    format: function format(value) {
                        return value;
                    },
                    min: 0,
                    max: 59,
                    precision: 2
                }
            )
        },

        methods: {
           
        }
    }
</script>
