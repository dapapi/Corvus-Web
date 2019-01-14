<template>
<!-- 文件预览组件 by王骁
    需要url和文件名  
    模态框组件，需要父组件设置data-target='#docPreview'触发
    内置下载按钮
-->
    <div>
        <div class="modal fade  bootbox" id="docPreview" aria-labelledby="docPreviewPositionCenter" role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple modal-center modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title">文件预览{{fileNameHandler}}</h4>{{fileNameHandler}}
                </div>
                <div class="modal-body">
                    <iframe v-if="['doc','docx','xls','xlsx','ppt','pptx'].includes(fileNameHandler)" class="mt-20 ml-30" :src='"https://view.officeapps.live.com/op/view.aspx?src="+url' width='800px' height='500px' frameborder='1'>
			        </iframe>
                    <img v-else-if="['png','gif','bmp','jpg','jpeg'].includes(fileNameHandler)" :src="url">
                    <embed v-else-if="fileNameHandler === 'pdf'" :src="url" type="application/pdf" width="100%" height="100%">
                    <div v-else>不支持此文件格式预览</div>
                </div>
                <div class="modal-footer">
                    <span>图片文件请使用右键另存为</span>
                    <a :href="url" download="">
                        <button type="button" class="btn btn-success waves-effect waves-light waves-round">
                            <i class="icon md-download" aria-hidden="true"></i>下载附件
                        </button>
                    </a>
                    <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round" data-dismiss="modal">关闭</button>
                </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    name:'docPreview',
        //文件url     文件名
    props:['url','givenFileName'],
    created(){
        
    },
    mounted(){

    },
    computed:{
        //获取扩展名
        fileNameHandler(){
            if(this.givenFileName){
                return String(this.givenFileName).split('.').pop()
            }else{
                return String(this.url).split('.').pop()
            }

        }
    }
}
</script>

<style scoped>
img{
    max-width: 860px !important;
    /* height: 500px !important; */
}
</style>

