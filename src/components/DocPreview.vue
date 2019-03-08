<template>
<!-- 文件预览组件 by王骁
    需要url和文件名  
    模态框组件，需要父组件设置data-target='#docPreview'触发
    内置下载按钮
-->
    <div>
        <div class="modal fade  bootbox" id="docPreview" :class='givenid' style='z-index:10086' aria-labelledby="docPreviewPositionCenter" role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple modal-center modal-lg">
                <div class="modal-content preview-content">
                <div class="modal-header">
                    <button type="button" class="close" >
                        <i class="iconfont px-20" :class="!isFullScreen?'icon-quanping':'icon-quxiaoquanping'" @click='fullScreenHandler'></i>
                        <span aria-hidden="true" data-dismiss="modal" aria-label="Close" @click="exitFullscreen()">×</span>
                    </button>
                    <!-- <i class="iconfont icon-quanping"></i> -->

                    <h4 class="modal-title">文件预览{{fileNameHandler}}</h4>{{fileNameHandler}}
                </div>
                <div class="modal-body">
                    <iframe v-if="['doc','docx','xls','xlsx','ppt','pptx'].includes(fileNameHandler)" class=" mt-30" :src='"https://view.officeapps.live.com/op/view.aspx?src="+url' width='100%' height='90%' frameborder='1'>
			        </iframe>
                    <img style="max-width:100%;" v-else-if="['png','gif','bmp','jpg','jpeg'].includes(fileNameHandler)" :src="url">
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
    props:['url','givenFileName','detailpage','givenid'],
    data(){
        return {
            isFullScreen:0,
        }
    },
    created(){
        
    },
    mounted(){
        if(!this.detailpage){
            $('#docPreview').on('hidden.bs.modal',function(){
                    document.getElementsByTagName('body')[0].classList.add('modal-open')
            })
            
        }else{
            console.log(this.detailpage);
        }
    },
    watch:{
        detailpage:function(value){
            if(!value){
                $('#docPreview').on('hidden.bs.modal',function(){
                    document.getElementsByTagName('body')[0].classList.add('modal-open')
                })
            }
            
        }
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
    },
    methods:{
        exitFullscreen(){
           if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.isFullScreen = 0
        },
        fullScreenHandler(){
                if (!document.fullscreenElement) {
                    $('.preview-content')[0].webkitRequestFullscreen();
                    this.isFullScreen = 1
                } else {
                    if (document.exitFullscreen) {
                        // $('.modal-content')[0].webkitExitFullscreen();
                        this.exitFullscreen()
                    }
                }
        }
    }
}
</script>

<style scoped>
img{
    width: 100%;
    /* height: 500px !important; */
}
.modal-body{
    height: 500px;
}
</style>

