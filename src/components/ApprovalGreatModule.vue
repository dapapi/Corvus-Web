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
                            <div :is='sortChecker(item)' :data='item' :singlemode='singlemode'></div>
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
        <div class="panel col-md-12 col-lg-12">
                    <div class="caption" style="border:0;">
                        <h6 class="page-title pb-20" style="border-bottom:1px solid #ccc">审批流程</h6>
                        <div class="setp pt-20">
                            <div class="left col-md-2">
                                <em class="mr-10"><i class="md-check-circle pr-5" style="color:#4DAF50"></i></em>
                                <div class="left-cont">
                                    <b class="branch">泰洋系</b>
                                    <b class="type" style="color:#999;width:48px;">提交审批</b>
                                </div>
                            </div>
                            <div class="middle col-md-2">
                                <template v-if="item.type==0">
                                    <em><i class="md-check-circle pr-5" style="color:#4DAF50"></i></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">待审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==1">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">待审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==2">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">待审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==3">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">已审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==4">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">已拒绝</b>
                                    </div>
                                </template>
                                
                            </div>
                             <div class="right col-md-2">
                                <template v-if="item.type==0">
                                    <div class="right-cont" style="color:#4DAF50">
                                        <i class="md-check-circle pr-5"></i>
                                        <b>审批通过</b>
                                    </div>
                                </template>
                                <template v-if="item.type==1">
                                    <div class="right-cont" style="color:#E0E0E0">
                                        <i class="md-check-circle pr-5"></i>
                                        <b>审批通过</b>
                                    </div>
                                </template>
                                <template v-if="item.type==2">
                                    <div class="right-cont">
                                        <i class="md-close-circle pr-5"></i>
                                        <b>已撤回</b>
                                    </div>
                                </template>
                                <template v-if="item.type==3">               
                                    <div class="right-cont">
                                        <i class="md-close-circle pr-5"></i>
                                        <b>已作废</b>
                                    </div>
                                </template>
                                <template v-if="item.type==4">
                                    <div class="right-cont" style="color:red">
                                        <i class="md-close-circle pr-5"></i>
                                        <b>已拒绝</b>
                                    </div>
                                </template>
                                
                            </div>
                        </div>
                    </div> 
                                
                </div>
    </div>    
</template>

<script>
import pageData from '@/views/approval/approval_form'
import papiContractConfig from '@/components/ForApproval/papiContractConfig.json'
import papiContractBrokenConfig from '@/components/ForApproval/papiContractBrokenConfig.json'
import mttopContractConfig from '@/components/ForApproval/mttopContractConfig.json'
import mttopContractBrokenConfig from '@/components/ForApproval/mttopContractBrokenConfig.json'
import mttopProjectContract from '@/components/ForApproval/mttopProjectContract.json'
import papiProjectContract from '@/components/ForApproval/papiProjectContract.json'
import ApprovalSummerNote from '@/components/ForApproval/ApprovalSummerNote'
import ApprovalUploader from '@/components/ForApproval/ApprovalUploader'
import ApprovalImageUploader from '@/components/ForApproval/ApprovalImageUploader'
import ApprovalMultiple from '@/components/ForApproval/ApprovalMultiple'
import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker'
import ApprovalText from '@/components/ForApproval/ApprovalText'
import ApprovalTextArea from '@/components/ForApproval/ApprovalTextArea'
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
import ApprovalNumber from '@/components/ForApproval/ApprovalNumber'

export default {
    props:['type','singlemode'],
    data(){
        return{
            importData:pageData,
            pageInfo:{
                title:'',
                description:'',
            },
            moduleInfo:[],
            item:{type:1},
        }
    },
    mounted(){
        this.dataInit()
        this.refresh()
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
        ApprovalNumber,
    },
    watch:{
        type:function(){
            this.typeWatcher()
            this.dataInit()
        }
    },
    methods:{
        typeWatcher(){
            switch (this.type){
                case 1 : 
                    this.importData = papiContractConfig
                    break
                case 2 :
                    this.importData = papiContractBrokenConfig
                    break
                case 3 :
                    this.importData = mttopContractConfig
                    break
                case 4 :
                    this.importData = mttopContractBrokenConfig
                    break
                case 5 :
                    this.importData = mttopProjectContract
                    break
                case 6 :
                    this.importData = papiProjectContract
                    break
                default: this.importData = pageData
            }
        },
        refresh(){
            $('.selectpicker').selectpicker('render');
            $('.selectpicker').selectpicker('refresh');   
        },
        dataInit(){
            let {name,description,approval_form_controls} = this.importData[0]
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
            descriptionArr.push(tempArr)
            this.moduleInfo = descriptionArr
            this.$nextTick((params) => {
                this.refresh()
            })
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
