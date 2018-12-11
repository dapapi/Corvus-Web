<template>
    <div>
        <div class="modal fade  bootbox" id="docPreview" aria-labelledby="docPreviewPositionCenter" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple modal-center modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title">文件预览</h4>
                </div>
                <div class="modal-body">
                    <iframe v-if="['doc','docx','xls','xlsx','ppt','pptx'].includes(fileNameHandler)" class="mt-20 ml-30" :src='"https://view.officeapps.live.com/op/view.aspx?src="+url' width='800px' height='500px' frameborder='1'>
			        </iframe>
                    <img v-else-if="['png','gif','bmp','jpg','jpeg'].includes(fileNameHandler)" :src="url">
                    <div v-else>不支持此文件格式预览{{fileNameHandler}}</div>
                </div>
                <div class="modal-footer">
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
    props:['url','givenFileName'],
    created(){
        
    },
    mounted(){
        console.log(this.url);
    },
    computed:{
        fileNameHandler(){
            return String(this.givenFileName).split('.').pop()
        }
    }
}
</script>

<style>

</style>

