<template>
    <div class="col-md-12 approval-text-container pl-0">
        <span class="col-md-2 text-right pl-0" :class="consdata[0].required===1?'require':''">{{title || consdata[0].control_title || "时间选择器测试"}}</span>
        <datepicker class="col-md-10 time-picker" v-if="!duration" :placeholder="consdata[0].control_placeholder" @change='change' :clear='clear' />
    </div>
</template>

<script>
export default {
    props:['duration','title','consdata','refresh','clear'],
    data(){
        return{

        }
    },
    methods:{
        change(params){ 
            console.log(params);
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
