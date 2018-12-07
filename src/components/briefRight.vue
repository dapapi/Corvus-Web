<template>
    <div class="col-md-4 pl-10">
        <div class="panel pt-15" style="width:100%">
            <switchWeek></switchWeek>
            <!-- <InlineDatepicker @change="selectDate"></InlineDatepicker> -->
            <div class="footer mx-30 py-10 mt-30">
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

import switchWeek from '@/components/SwitchWeek.vue'
export default {
    data(){
        return {

        }
    },
    components:{
       switchWeek
    },
    methods:{
        selectDate:function(){

        }
    }
}
</script>





