<template>
    <div>
        <div class="modal fade show" id="approval-great-module" aria-labelledby="approval-great-module" role="dialog" tabindex="-1" style="display: block;">
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
                        <div :is='sortChecker(i)'></div>
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
import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker'
import ApprovalText from '@/components/ForApproval/ApprovalText'
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
export default {
    data(){
        return{
            pageInfo:{
                title:'',
                description:''
            },
            moduleInfo:[]
        }
    },
    mounted(){
        console.log(pageData);
        this.dataInit()
    },
    components:{
        ApprovalText,ApprovalSelector,ApprovalTimePicker
    },
    methods:{
        dataInit(){
            let {name,description,approval_form_controls} = pageData[0]
            let controlArr= Array.from(approval_form_controls)
            this.moduleInfo = controlArr
            this.pageInfo.title = name
            this.pageInfo.description= description
        },
        sortChecker(params){
            switch (params){
                case 1 :
                    return this.$options.components.ApprovalTimePicker
                    break
                case 2 : 
                    return this.$options.components.ApprovalText
                    break
                case 3 : 
                    return this.$options.components.ApprovalSelector
                    break
                default : 
                    return this.$options.components.Selectors
                    break
            }
        }
    }
}
</script>

<style scoped>
.modal-greater{
    margin-top: 20px !important;
    height: 61.8vh;
    overflow-y:scroll;
}
.great-option{
    /* height: 50px; */
    
    margin: 20px 30px;
}
</style>
