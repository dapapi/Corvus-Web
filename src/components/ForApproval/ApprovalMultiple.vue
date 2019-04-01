<template>
    <div class="col-md-12 pl-0 pr-0 multiple-container container">
        <!-- <div v-for="i in n" :key="i" class="approval-multiple"> -->
            <ApprovalMultipleForm  v-for="i in n" :key="i" :consdata='consdata' :singlemode='singlemode' :n='i' :total='n' @change='multipleDataConstructor' @formMinus='formMinus' :default-data='multipleData'/>
            <!-- <span>{{consdata[0].control_title}}({{i}})</span>
            <hr>
            <div :is='sortChecker(item)' class="approval-multiple-option"
                v-for="(item, index) in consdata" ref='selectpicker'
                :key="index+Math.random()" 
                :n="n"
                :index = "index"
                :title='item.control_title'
                :options='item.control_enums'
                :placeholder='item.control_placeholder'
                v-show="!isShow[index]"
                :consdata='[item]'
                @change='saveChangeData'></div> -->
        <!-- </div> -->
        <span @click="addOption" class="add-option">添加选项+</span>
        <hr>
    </div>
</template>

<script>
import ApprovalMultipleForm from '@/components/ForApproval/ApprovalMultipleForm'
import ApprovalDiv from '@/components/ForApproval/ApprovalDiv'
import ApprovalSummerNote from '@/components/ForApproval/ApprovalSummerNote'
import ApprovalUploader from '@/components/ForApproval/ApprovalUploader'
import ApprovalImageUploader from '@/components/ForApproval/ApprovalImageUploader'
import ApprovalMultiple from '@/components/ForApproval/ApprovalMultiple'
import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker'
import ApprovalText from '@/components/ForApproval/ApprovalText'
import ApprovalTextArea from '@/components/ForApproval/ApprovalTextArea'
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
import ApprovalNumber from '@/components/ForApproval/ApprovalNumber'
import ApprovalProgress from '@/components/ForApproval/ApprovalProgress'
import ApprovalDouble from '@/components/ForApproval/ApprovalDouble'
import ApprovalMultipleSelector from '@/components/ForApproval/ApprovalMultipleSelector'
import ApprovalChainReaction from '@/components/ForApproval/ApprovalChainReaction'
export default {
    name:'ApprovalMultiple',
    props:['consdata','singlemode','clear'],
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
        ApprovalProgress,
        ApprovalDouble,
        ApprovalDiv,
        ApprovalMultipleSelector,
        ApprovalChainReaction,
        ApprovalMultipleForm
    },
    data(){
        return{
            n:1,
            changeData:[],
            isShow:{0:false,1:true},
            multipleData:[]
        }
    },
    computed:{
        // isShow(params) {
        //     return (params)=>{
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
    watch:{
        clear:function(){
            this.multipleData = []
            this.n =1
        }
    },
    methods:{
        formMinus(params){
            for (const key in this.consdata) {
                this.consdata[key].control_value = ''
            }
            this.n = this.n-1
            this.multipleData.splice(params-1,1)
            let {related_field} = this.consdata[0]
            let {id} = this.consdata[0]
            this.$emit('change',{key:id,value:this.multipleData,type:related_field})

        },
        multipleDataConstructor(params){
            this.multipleData[params.n-1] = params.data
            let {id} = this.consdata[0]
            let {related_field} = this.consdata[0]
            this.$emit('change',{key:id,value:this.multipleData,type:related_field})
            // this.$emit('change',this.multipleData)
        },
        saveChangeData(params,index){
            this.changeData[index] = params
            this.isShowhandler(1)
        },
        isShowhandler(params){
            if(this.consdata[params].form_control_pid == 1 && this.singlemode == 'true' && this.changeData[0] == 1){
                this.isShow[1] = false
            }else{
                this.isShow[1] = true
            }
            // this.$nextTick(() => {
            //     this.refresh()
            // })
        },
        addOption(){
            for (const key in this.consdata) {
                this.consdata[key].control_value = ''
            }
            this.n++
            // this.$nextTick(() => {
            //     this.refresh()
            // })
        },
        refresh(){
            // $('.selectpicker').selectpicker('render');   
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
                case 89 :
                    return this.$options.components.ApprovalDiv
                case 91 : 
                    return this.$options.components.ApprovalImageUploader
                case 92 : 
                    return this.$options.components.ApprovalUploader
                case 200 :
                    return this.$options.components.ApprovalDouble
                case 310 :
                    return this.$options.components.ApprovalMultipleSelector
                case 391 :
                    return this.$options.components.ApprovalChainReaction
                default : 
                    return this.$options.components.Approvaltext
            }
        }
    }
}
</script>

<style scoped>
.container{
    display: block !important;
}

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
