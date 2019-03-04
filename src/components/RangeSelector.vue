<template>  
    <select class="form-control" data-plugin="select2" multiple="multiple" searchable='true'>  
        <RangeSelectorChild v-for="option in options" v-bind:key="option.id" :val="option.id">{{option.name}} 
        </RangeSelectorChild>  
    </select> 
</template> 
<script>  
import RangeSelectorChild from './RangeSelectorChild'
export default { 
    props: ['options'],
    components:{
        RangeSelectorChild
    },
        data() { 
          return {
          }
        },  
        mounted(){
            let self = this
            $(this.$el).select2().on('select2:select', function (e) {
                self.$emit('change', $(this).val(), 'select', e.params.data.id)
            }).on('select2:unselect', function (e) {

                self.$emit('change', $(this).val(), 'unselect', e.params.data.id)
            })
        },
        methods: {
            destroy(){
                $(this.$el).select2('destroy')
            },
            setValue(value){
                $(this.$el).val(value).trigger('change')
            }
        }
    } 
</script>