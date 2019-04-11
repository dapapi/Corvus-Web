<template>
<!-- 文件预览组件 by王骁
    需要url和文件名
    模态框组件，需要父组件设置data-target='#docPreview'触发
    内置下载按钮
-->
    <div id="">
        <div class="modal fade  bootbox" id="docPreview" :class='givenid' style='z-index:10086' aria-labelledby="docPreviewPositionCenter" role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog" style="min-width:90%;height:95%;margin-left:8%;">
                <div class="modal-content preview-content" style="width:100%;height:105%;margin-top:-2%;background-color:rgba(7,17,27,0);overflow:auto;">
                <!-- <div class="modal-header">
                    <button type="button" class="close" >
                        <i class="iconfont px-20" :class="!isFullScreen?'icon-quanping':'icon-quxiaoquanping'" @click='fullScreenHandler'></i>
                        <span aria-hidden="true" data-dismiss="modal" aria-label="Close" @click="exitFullscreen()">×</span>
                    </button>
                    <i class="iconfont icon-quanping"></i>

                    <h4 class="modal-title">文件预览{{fileNameHandler}}</h4>{{fileNameHandler}}
                </div> -->
                <!-- <div class="modal-body"> -->
                    <iframe v-if="['doc','docx','document','xls','xlsx','ppt','pptx'].includes(fileNameHandler)" class=" mt-30" :src='"https://view.officeapps.live.com/op/view.aspx?src="+url' width='100%' height='90%' frameborder='1'>
			              </iframe>
                    <img style="width:70vw;" v-else-if="['png','gif','bmp','jpg','jpeg'].includes(fileNameHandler)" :src="url">
                    <embed v-else-if="fileNameHandler === 'pdf'" :src="url" type="application/pdf" width="100%" height="100%">
                    <!-- <video v-else-if="['mp4','MP4','MOV','mov'].includes(fileNameHandler)" :src="url" controls height='100%' width='100%' type="video/mov"> -->
                        <!-- <source :src="url" type="video/mov"> -->
                    <!-- </video> -->
                    <div v-else>不支持此文件格式预览</div>
                <!-- </div> -->
                    <div class="modal-footer">
                        <span>图片文件请使用右键另存为</span>
                        <a :href="url+'?attname='+givenFileName" download="">
                            <button type="button" class="btn btn-success waves-effect waves-light waves-round">
                                <i class="icon md-download" aria-hidden="true"></i>下载附件
                            </button>
                        </a>
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round" data-dismiss="modal" @click='closePreview'>关闭</button>
                    </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'docPreview',
  // 文件url     文件名
  props: ['url', 'givenFileName', 'detailpage', 'givenid'],
  data() {
    return {
      isFullScreen: 0,
    };
  },
  created() {

  },
  mounted() {
    if (!this.detailpage) {
      $('#docPreview').on('hidden.bs.modal', () => {
        document.getElementsByTagName('body')[0].classList.add('modal-open');
      });
    } else {
    }
  },
  watch: {
    detailpage(value) {
      if (!value) {
        $('#docPreview').on('hidden.bs.modal', () => {
          document.getElementsByTagName('body')[0].classList.add('modal-open');
        });
      }
    },
  },
  computed: {
    // 获取扩展名
    fileNameHandler() {
      if (this.givenFileName) {
        return String(this.givenFileName).split('.').pop();
      }
      return String(this.url).split('.').pop();
    },
  },
  methods: {
    closePreview(){
      // $("#docPreview").css("display","none")
      // $(".modal-backdrop").css("display","none")
      // modal-backdrop fade show

    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.isFullScreen = 0;
    },
    fullScreenHandler() {
       if(document.requestFullscreen) {
           $('.preview-content')[0].requestFullscreen();
        } else if(document.mozRequestFullScreen) {
           $('.preview-content')[0].mozRequestFullScreen();
        } else if(document.webkitRequestFullscreen) {
           $('.preview-content')[0].webkitRequestFullscreen();
        } else if(document.msRequestFullscreen) {
           $('.preview-content')[0].msRequestFullscreen();
        }
      // if (!document.fullscreenElement) {
      //   $('.preview-content')[0].webkitRequestFullscreen();
      //   this.isFullScreen = 1;
      // } else if (document.exitFullscreen) {
      //   // $('.modal-content')[0].webkitExitFullscreen();
      //   this.exitFullscreen();
      // }
    },
  },
};
</script>

<style scoped>
img{
  margin-left:15vh;
}
.modal-body{
    max-width:100vw !important; 
}
</style>
