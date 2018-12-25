<template>
    <div class="modal fade" id="approvalGo" aria-labelledby="examplePositionTop" role="dialog" tabindex="-1">
        <div class="modal-dialog modal-simple modal-top">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="exampleModalTitle">审批流转</h4>
                </div>
                <div class="modal-body col-md-12 row px-50 pt-20" v-if="mode === 'transfer'">
                    <span class="col-md-4">请选择转交目标</span>
                    <InputSelectors @change='transferTo()' />
                </div>
                <div class="col-md-12 px-50">
                    <span>审批留言</span>
                    <textarea class="approval-comment" name="" id=""  rows="5" v-model="approvalComment"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary waves-effect waves-light waves-round" @click='approvalGo()'>确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '@/assets/utils/fetch.js'
import config from '@/assets/js/config'
export default {
    props:['mode','id'],
    data(){
        return {
            approvalComment:'',
            next_id:'',
        }
    },
    methods:{
        transferTo(params){
            this.next_id = this.$store.state.newPrincipalInfo.id
        },
        approvalGo(){
            let data = {}
            Object.assign(data,{comment:this.approvalComment})
            if(this.next_id){
                Object.assign(data,{next_id:this.next_id})
            }
            let _this = this
            fetch('put','/approval_instances/'+this.id+'/'+this.mode,data).then((params) => {
                _this.$emit('approvaldone')
            })
            $('#approvalGo').modal('hide')
            this.approvalComment = ''
        },
        
    }
}

</script>

<style>
.approval-comment{
    width: 100%;
}
</style>
