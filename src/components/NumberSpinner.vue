<template>

<<<<<<< HEAD

    <input type="text" class="form-control addtrail" data-plugin="asSpinner"  increment="0.1" :value="value"
           :class="[shortInput ? 'short-spinner-input' : '']">
=======
    <input type="text" class="form-control addtrail" data-plugin="asSpinner"  :value="value" increment="0.1"
           :class="[shortInput ? 'short-spinner-input' : '']" >
>>>>>>> 34cf3078d554a69fda51b94662e9488528549505

</template>

<script>
    export default {
        props: ['shortInput','min','max','precision','value'],
        mounted() {
            let self = this;
            console.log(this)
            $(this.$el).asSpinner(
                
                {
                    format: function format(value) {
                        if(this.max == 23||this.max == 59){
                            if(value<10){
                             return '0'+value;
                            }else{
                                 return value
                            }
                        }else{
                             return value
                        }
                       
                    },
                    min: this.min,
                    max: this.max,
                    precision: this.precision
                }
                
            ).on('asSpinner::change', function (e) {

                self.$emit('change', e.currentTarget.value)
            });
           
            $('.asSpinner').parent().css('width', '100%')
        },

        methods: {
            /**
             * 重置value为0时，value值 '0' 为字符串
             * */
            setValue(value) {
                $(this.$el).asSpinner('val', value);
            },
            refresh() {
                $(this.$el).asSpinner('refresh');
            },
            destroy() {
                $(this.$el).asSpinner('destroy');
            }
        }
    }
</script>

<style>
    .addtrail {
        width: calc(100% - 40px) !important;
    }

    .short-spinner-input {
        width: 76% !important;
    }

    .asSpinner {
        width: 100%;
        
    }
</style>
