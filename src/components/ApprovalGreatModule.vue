<template>
    <div>
        <div class="modal fade" id="approval-great-module" aria-labelledby="approval-great-module" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple modal-top">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalTitle">{{pageInfo.title}}</h4>
                    </div>
                    <div class="modal-body modal-greater">
                        <div v-for="(item, index) in moduleInfo" :key="index" class="great-option example">
                            <div :is='sortChecker(item)' 
                            :data='item' :predata='sendData'
                            :singlemode='singlemode'
                            @change="changeHandler"
                            :formid='form_id'></div>
                            <!-- ⬆️核心模块 -->
                        </div>
                        <ApprovalProgress :formid='form_id'/>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary waves-effect waves-light waves-round" @click='approvalSubmit'>提交</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>    
</template>

<script>
import pageData from '@/views/approval/approval_form'
// import papiContractConfig from '@/components/ForApproval/papiContractConfig.json'
// import papiContractBrokenConfig from '@/components/ForApproval/papiContractBrokenConfig.json'
// import mttopContractConfig from '@/components/ForApproval/mttopContractConfig.json'
// import mttopContractBrokenConfig from '@/components/ForApproval/mttopContractBrokenConfig.json'
// import mttopProjectContract from '@/components/ForApproval/mttopProjectContract.json'
// import papiProjectContract from '@/components/ForApproval/papiProjectContract.json'
import config from '@/assets/js/config.js'
import fetch from '@/assets/utils/fetch.js'
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
export default {
    props:['formData','singlemode'],
    data(){
        return{
            importData:'',
            pageInfo:{
                title:'',
                description:'',
            },
            moduleInfo:[],
            item:{type:1},
            sendData:{
                values:[]
            },
            form_id:''
        }
    },
    created(){

    },
    mounted(){
        let _this = this
        $('#approval-great-module').on('show.bs.modal',function(){
                _this.$nextTick((params) => {
                    _this.getFormContractor() 
                })
        })
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
        ApprovalProgress,
        ApprovalDouble
    },
    watch:{
        formData:function(value){
            if(value){
                this.dataInit()
            this.getFormContractor()
            }
            
        }
    },
    methods:{
        approvalSubmit(){
            fetch('post','/approvals/'+this.formData.form_id,this.sendData).then((params) => {
                console.log(params)
            })
        },
        getFormContractor(){
            let _this = this
            if(this.formData.form_id){
                fetch('get','/approvals/'+this.formData.form_id+'/form_control?include=approval_form_controls').then((params) => {
                _this.importData = params.data
                _this.dataInit()
                })
            }   
        },
    
        changeHandler(params){
            switch (params.type){
                case 'upload':
                    if(!this.sendData.uploadfile){
                        this.sendData.uploadfile=[]
                    }
                    this.sendData.uploadfile.push({url:params.fileUrl,name:params.fileName})
            }
            if(!this.sendData.values.find(item=>item.key === params.key)){
                this.sendData.values.push(params)
            }else{
                Object.assign(this.sendData.values.find(item=>item.key === params.key),params)
            }
        },
        refresh(){
            $('.selectpicker').selectpicker('render');
            $('.selectpicker').selectpicker('refresh');   
        },
        dataInit(){
            let {name,description,approval_form_controls,form_id} = this.importData
            this.form_id = form_id
            let controlArr= Array.from(approval_form_controls.data)
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
                case 200 :
                    return this.$options.components.ApprovalDouble
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
    
    margin: 20px 5px ;
}
</style>
