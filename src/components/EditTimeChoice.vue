<template>
    <div>
        <template v-if="isEditDatePicker">
             <div style="display:flex" @change="timechoice">
                <NumberSpinner :min="hour" :max="23" :precision="0" ref="timehour" @change="changehour" :value="value"></NumberSpinner> <span style="font-size:20px;" class="px-5">:</span> <NumberSpinner :min="minute" :max="59" :precision="0" @change="changeminute" ref="minute" :value="value"></NumberSpinner>
            </div>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "TimeChoice",
        props: ['is-edit', 'content'],
        data() {
            return {
                isEditDatePicker: false,
                hour:'00',
                minute:'00',
                value:'00'
            }
        },

        watch: {
            isEdit(newValue) {
                this.isEditDatePicker = newValue;
            },
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
            timechoice: function () {
                this.$emit('change',this.hour+':'+this.minute);
            }
        }
    }
</script>

<style scoped>

</style>