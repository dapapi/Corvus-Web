<template>
    <div class=" col-md-12">
        <div v-for="i in n" :key="i" class="approval-multiple">
            <span>{{data[0].control_title}}({{i}})</span>
            <hr>
            <div :is='sortChecker(item)' class="approval-multiple-option"
                v-for="(item, index) in data" ref='selectpicker'
                :key="index+Math.random()" 
                :n="n"
                :title='item.control_title'
                :options='item.control_enums'
                :placeholder='item.control_placeholder'>{{123}}</div>
        </div>
        <span @click="addOption" class="add-option">添加选项+</span>
        <hr>
    </div>
</template>

<script>
import ApprovalMultiple from '@/components/ForApproval/ApprovalMultiple'
import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker'
import ApprovalText from '@/components/ForApproval/ApprovalText'
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
export default {
    name:'ApprovalMultiple',
    props:['data'],
    components:{
        ApprovalMultiple,ApprovalText,ApprovalSelector,ApprovalTimePicker
    },
    data(){
        return{
            n:1,
        }
    },
    methods:{
        addOption(){
            this.n++
            this.$nextTick(() => {
                $('.selectpicker').selectpicker('render');   
            })
        },
        sortChecker(params){
            switch (Number(params.control.data_dictionary_id)){
                case 78 :
                    return this.$options.components.ApprovalText
                case 79 :
                    return this.$options.components.ApprovalTextArea
                case 82 :
                    return this.$options.components.ApprovalSelector
                case 86 :
                    return this.$options.components.ApprovalTimePicker
                case 88 :
                    return this.$options.components.ApprovalText
                case 91 : 
                    return this.$options.components.ApprovalText
                case 92 : 
                    return this.$options.components.ApprovalSelector
                

                default : 
                    return this.$options.components.Approvaltext
            }
        }
    }
}
</script>

<style scoped>
.approval-multiple{
    margin-bottom: 20px ;
}
.approval-multiple-option{
    margin-bottom: 20px;
}
.add-option{
    cursor: pointer;
    color:royalblue;
    margin-left: 50px;
}
</style>
