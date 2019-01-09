<template>
    <div class="col-md-12 pl-0 pr-0">
        <div v-for="i in n" :key="i" class="approval-multiple">
            <span v-if="!singlemode">{{consdata[0].control_title}}({{i}})</span>
            <hr v-if="!singlemode">
            <div :is='sortChecker(item)' class="approval-multiple-option"
                v-for="(item, index) in data" ref='selectpicker'
                :key="index+Math.random()" 
                :n="n"
                :index = "index"
                :title='item.control_title'
                :options='item.control_enums'
                :placeholder='item.control_placeholder'
                v-show="!isShow[index]"
                @change='saveChangeData'></div>
        </div>
        <span @click="addOption" class="add-option" v-if="!singlemode">添加选项+</span>
        <hr v-if="!singlemode">
    </div>
</template>

<script>
import ApprovalSummerNote from '@/components/ForApproval/ApprovalSummerNote'
import ApprovalUploader from '@/components/ForApproval/ApprovalUploader'
import ApprovalImageUploader from '@/components/ForApproval/ApprovalImageUploader'
import ApprovalMultiple from '@/components/ForApproval/ApprovalMultiple'
import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker'
import ApprovalText from '@/components/ForApproval/ApprovalText'
import ApprovalTextArea from '@/components/ForApproval/ApprovalTextArea'
import ApprovalNumber from '@/components/ForApproval/ApprovalNumber'
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
export default {
    name:'ApprovalMultiple',
    props:['consdata','singlemode'],
    components:{
        ApprovalMultiple,
        ApprovalText,
        ApprovalSelector,
        ApprovalTimePicker,
        ApprovalImageUploader,
        ApprovalUploader,
        ApprovalSummerNote,
        ApprovalTextArea,
        ApprovalNumber,
    },
    data(){
        return{
            n:1,
            changeData:[],
            isShow:{0:false,1:true},
        }
    },
    computed:{
        // isShow(params) {
        //     return (params)=>{
        //     console.log(this.changeData[0]==1);
        //         if(this.data[params].form_control_pid == 1 && this.singlemode == 'true' && this.changeData[0] == 1){
        //             return false
        //         }else{
        //             return  true
        //         }
        // }
        // },
    },
    mounted(){
        this.refresh()
    },
    methods:{
        saveChangeData(params,index){
            this.changeData[index] = params
            this.isShowhandler(1)
        },
        isShowhandler(params){
            if(this.data[params].form_control_pid == 1 && this.singlemode == 'true' && this.changeData[0] == 1){
                this.isShow[1] = false
            }else{
                this.isShow[1] = true
            }
            this.$nextTick(() => {
                this.refresh()
            })
        },
        addOption(){
            this.n++
            this.$nextTick(() => {
                this.refresh()
            })
        },
        refresh(){
            $('.selectpicker').selectpicker('render');   
        },
        sortChecker(params){
            switch (Number(params.control.data_dictionary_id)){
            case 78 :
                return this.$options.components.ApprovalText
            case 79 :
                return this.$options.components.ApprovalTextArea
            case 80 :
                return this.$options.components.ApprovalTimePicker
            case 82 :
                return this.$options.components.ApprovalSelector
            case 83 :
                return this.$options.components.ApprovalNumber
            case 86 :
                return this.$options.components.ApprovalTextArea
            case 88 :
                return this.$options.components.ApprovalText
            case 91 : 
                return this.$options.components.ApprovalImageUploader
            case 92 : 
                return this.$options.components.ApprovalUploader
            

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
