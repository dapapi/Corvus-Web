<template>
    <div class="col-md-12 approval-text-container pl-0">
        <span class="col-md-2 text-right pl-0" :class="consdata[0].required===1?'require':''">{{title || consdata[0].control_title || "时间选择器测试"}}</span>
        <datepicker class="col-md-10 time-picker" :default='defaultDate' v-if="!duration" :placeholder="consdata[0].control_placeholder" @change='change' :clear='clear' />
    </div>
</template>

<script>
export default {
    props:['duration','title','consdata','refresh','clear','defaultData'],
    data(){
        return{
            defaultDate:''
        }
    },
    mounted(){
        this.defaultDataChecker()
    },
    methods:{
        defaultDataChecker(){
            if(this.consdata[0].control_value){
                this.defaultDate = this.consdata[0].control_value
                // for (const i in this.defaultData) {
                //     if (this.defaultData[i].key === this.consdata[0].control_title) {
                //         console.log(this.defaultData[i]);
                //         this.$nextTick((params) => {
                //             // $(this.$el).selectpicker('val', this.defaultData[i].values.data.value);
                //             this.defaultDate = this.defaultData[i]
                //         })
                //     }
                // }
            }
        },
        change(params){
            let {id} = this.consdata[0]
            let {related_field} = this.consdata[0]
            this.$emit('change',{key:id,value:params,type:related_field})
        }
    },
    watch:{
       
    }
}
</script>

<style scoped>
.approval-text-container span{
    height: 30px;
}
    .col-md-10{
        padding:0 !important;
    }
</style>
