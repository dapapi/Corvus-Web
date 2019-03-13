<template>
    <div style="display:flex" @change="timechoice">
        <NumberSpinner :min="hour" :max="23" :precision="0" ref="timehour" @change="changehour" :value="value"></NumberSpinner> <span style="font-size:20px;" class="px-5">:</span> <NumberSpinner :min="minute" :max="59" :precision="0" @change="changeminute" ref="minute" :value="value"></NumberSpinner>
    </div>
</template>
  <script>
  export default {
        data (){
            return{
                hour:'00',
                minute:'00',
                value:'00'
            }
        },
        watch:{
            hour:function(value){
                this.timechoice()
            },
            minute:function(){
                this.timechoice()
            }
        },
        methods: {
            changehour(value){
                 this.hour = value
                
            },
            changeminute(value){
                 this.minute = value
            },
            timechoice(){
              this.$emit('change',this.hour+':'+this.minute)  
            },
            setValue(value) {
                this.$refs.timehour.setValue(value)
                this.$refs.minute.setValue(value)
            },

            destroy() {
                this.$refs.timehour.destroy()
                this.$refs.minute.destroy()
            },

        }
  }
  </script>
  
<style >

</style>
