<template>
    <div class="modal fade" id="approvalGo" aria-labelledby="examplePositionTop" role="dialog" tabindex="-1" data-backdrop="static" style='z-index:1700'>
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="exampleModalTitle">{{titleHandler}}</h4>
                </div>
                <div class="modal-body col-md-12 row px-50 pt-20" v-if="mode === 'transfer'">
                    <span class="col-md-4">请选择转交目标</span>
                    <InputSelectors @change='transferTo()'/>
                </div>
                <div class="col-md-12 px-50">
                    <div class="example" v-if="mode !== 'archive'">审批留言</div>
                    <div class="example" v-if="mode === 'archive'">归档描述</div>
                    <textarea class="approval-comment form-control" name="" id="" rows="5"
                              v-model="approvalComment"></textarea>
                </div>
                <Upload  class="py-20" @change="uploadControl">
                    <p class="upload-file" v-if="mode === 'archive'">
                        <i class="iconfont icon-fujian"></i>
                        合同扫描上传</p>
                </Upload>

                <div v-if="mode === 'archive'" class="row px-50 pb-40">
                    <figure v-for="(item, index) in fileArr" :key="index" style="margin-right:0px;width:100px;overfolw:hidden;" class="ml-10">
                    <!-- <div class="image-show" v-if="fileInfo.length > 0" style="backgroundImage:url(../../../assets/img/attachment.png)"></div> -->
                        <figure style="text-align:center;margin-top:30px;" class="attachdetail"> 
                            <img src="@/assets/img/attachment.png" alt="" style="width:40px">
                            <p style='text-overflow: ellipsis;'>{{item}}</p>
                            <div class="img-control">
                                <!-- <hr> -->
                                <div class="icon-control">
                                    <a >
                                        <i class="iconfont icon-liulan" @click='previewHandler(item)'></i>
                                    </a>
                                    <i class="iconfont icon-shanchu1" @click="imgDelete(item)"></i>
                                </div>
                            </div>
                        </figure>
            
            <!-- <p>{{item.fileName.split('.')[0]}}</p> -->
                    </figure>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary waves-effect waves-light waves-round"
                            @click='approvalGo()'>确认
                    </button>
                    <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round"
                            data-dismiss="modal">取消
                    </button>
                </div>
            </div>
            
        </div>
        <!-- <DocPreview :url='$store.state.previewurl'  /> -->

    </div>
</template>

<script>
    import fetch from '@/assets/utils/fetch.js'
    import config from '@/assets/js/config'
    import ApprovalImageUploader from '@/components/ForApproval/ApprovalImageUploader'
    export default {
         components: {
            ApprovalImageUploader,
        },
        props: ['mode', 'id'],
        data() {
            return {
                approvalComment: '',
                next_id: '',
                fileArr:[],
                previewUrl:'',
            }
        },
        computed:{
            titleHandler(){
                switch(this.mode){
                    case 'cancel':
                        return '取消审批'
                    case 'agree':
                        return '同意审批'
                    case 'refuse':
                        return '拒绝审批'
                    case 'transfer':
                        return '转交审批'
                    case 'archive':
                        return '合同归档'
                    case 'discard':
                        return '审批作废'
                }
            }
        },
        methods: {
            previewHandler(params) {
                console.log(params);
            this.$store.dispatch('changePreview',params)
            console.log(this.$store.state.previewurl);
                $('#docPreviewSelector').modal('hide')
                this.previewUrlArr = String(params).split(',')
                if (this.previewUrlArr.length === 1) {
                    $('#docPreview').modal('show')
                    this.previewUrl = this.fileArr[0]
                } else {
                    $('#docPreviewSelector').modal('show')
                }
            },
            imgDelete(params){
            // let {id} = this.consdata[0]
            // let {related_field} = this.consdata[0]

            this.$delete(this.fileArr,this.fileArr.indexOf(params))
            // this.$emit('change',{key:id,value:this.fileInfo,type:related_field})
            },
            uploadControl(params){
                console.log(params);
                this.fileArr.push(params)
            },
            transferTo(params) {
                this.next_id = this.$store.state.newPrincipalInfo.id
            },
            approvalGo() {
                let data = {}
                Object.assign(data, {comment: this.approvalComment})
                if (this.next_id) {
                    Object.assign(data, {next_id: this.next_id})
                }
                let _this = this
                fetch('put', '/approval_instances/' + this.id + '/' + this.mode, data).then((params) => {
                    _this.$emit('approvaldone')
                })
                $('#approvalGo').modal('hide')
                this.approvalComment = ''
            },

        }
    }

</script>

<style>
p{
    text-align: center;
    margin-bottom: 0 !important;
    text-overflow: ellipsis;
    overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
    .upload-file{
        position: relative;
        top: 10px;
        left: 450px;
        color:#00bcd4;
        cursor: pointer;
    }
    .approval-comment {
        width: 100%;
    }
</style>
