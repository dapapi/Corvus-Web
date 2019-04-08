<template>
    <div class="col-md-4 pl-10">
        <div class="panel pt-15" style="width:100%">
            <switch-year :showDetails="true" :type="type" @click="selectDate"></switch-year>
            <div class="footer mx-20 py-10 mt-20">
                 <span class="inline-block btn-success mr-10"></span>
                 <span class="mr-30">已提交</span>
                 <span class="inline-block btn-warning mr-10"></span>
                 <span>未提交</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .inline-block{
        width: 10px;
        height: 10px;
        margin-top:2px;
    }
    .footer{
        border-top:1px solid #f5f5f5;
    }
</style>
<script>

// import switchWeek from '@/components/SwitchWeek.vue'
export default {
    props:{
        type:{
            type:Number,
            default:5
        }
    },
    data(){
        return {
           start:'',
           end:''
        }
    },
    // components:{
    //    switchWeek
    // },
    mounted(){
       this.$emit('getDate',this.start,this.end)
    },
    methods:{
        selectDate:function(start,end){
            this.start = start
            this.end = end
            this.$emit('getDate',start,end)
        }
    }
}
</script>





