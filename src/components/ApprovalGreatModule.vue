<template>
    <div>
        <div class="modal fade" id="approval-great-module" aria-labelledby="approval-great-module" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple modal-top modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="exampleModalTitle">{{pageInfo.title}}</h4>
                </div>
                <div class="modal-body modal-greater">
                    <div v-for="(item, index) in moduleInfo" :key="index" class="great-option">
                        <div :is='sortChecker(item)' :data='item'></div>
                        <!-- ⬆️核心模块 -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary waves-effect waves-light waves-round">提交</button>
                </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import pageData from '@/views/approval/approval_form'
import contractConfig from '@/components/ForApproval/contractConfig'
import ApprovalSummerNote from '@/components/ForApproval/ApprovalSummerNote'
import ApprovalUploader from '@/components/ForApproval/ApprovalUploader'
import ApprovalImageUploader from '@/components/ForApproval/ApprovalImageUploader'
import ApprovalMultiple from '@/components/ForApproval/ApprovalMultiple'
import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker'
import ApprovalText from '@/components/ForApproval/ApprovalText'
import ApprovalTextArea from '@/components/ForApproval/ApprovalTextArea'
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
export default {
    data(){
        return{
            pageInfo:{
                title:'',
                description:'',
            },
            moduleInfo:[]
        }
    },
    mounted(){
        this.dataInit()
    },
    components:{
        ApprovalMultiple,
        ApprovalText,
        ApprovalSelector,
        ApprovalTimePicker,
        ApprovalImageUploader,
        ApprovalUploader,
        ApprovalSummerNote,
        ApprovalTextArea,
    },
    methods:{
        dataInit(){
            let {name,description,approval_form_controls} = pageData[0]
            let controlArr= Array.from(approval_form_controls)
            this.pageInfo.title = name
            let descriptionArr = []
            let tempArr = []
            for (const key in controlArr) {
                if (controlArr[key].form_control_pid === 0) {
                    if(key>0){
                        descriptionArr.push(tempArr)
                    }
                    tempArr = []
                    tempArr.push(controlArr[key])
                }else{
                    tempArr.push(controlArr[key])
                }
            }
            this.moduleInfo = descriptionArr
        },
        sortChecker(params){
            if(params.length>1){
                return this.$options.components.ApprovalMultiple
            }else{
                switch (params[0].control.data_dictionary_id){
                case 78 :
                    return this.$options.components.ApprovalText
                case 79 :
                    return this.$options.components.ApprovalTextArea
                case 80 :
                    return this.$options.components.ApprovalTimePicker
                case 82 :
                    return this.$options.components.ApprovalSelector
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
}
</script>

<style scoped>
.modal-greater{
    margin-top: 20px !important;
    height: 100%;
    /* overflow-y:scroll; */
}
.great-option{
    display: flex;
    /* height: 50px; */
    
    margin: 20px 30px;
}
</style>
