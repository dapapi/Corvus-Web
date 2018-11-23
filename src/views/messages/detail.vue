<template>
     <div class="page-content container-fluid">
       <!-- <div class="comment media">
        <div class="pr-20">
          
          <a class="avatar avatar-lg" href="javascript:void(0)">
            <div class="rounded-circle img-thumbnail messages-img" 
            :style="{ backgroundImage: 'url('+pageData.cover+')'}"></div>
          </a>
        </div>
        <div class="comment-body media-body">
          <a class="comment-author" href="javascript:void(0)">{{pageData.name}}</a>&nbsp;&nbsp;邀请你参与{{pageData.task}}
          <div class="comment-meta">
            
            <span class="date">{{pageData.timeYMD}}  {{pageData.timehms}}</span>
          </div>
          
          <div class="comment-content">
            <p>[{{pageData.detail.kind}}] &nbsp;&nbsp;{{pageData.detail.step}}</p>
          </div>
        </div>
      </div> -->
      <div class="col-md-12 col-lg-12 row">
        <div class="rounded-circle img-thumbnail messages-img" 
        :style="{ backgroundImage: 'url('+pageData.cover+')'}"></div>
        <div class="">
          <p class="">{{pageData.timeYMD}}  {{pageData.timehms}}</p>
          <h6 class="">{{pageData.name}}邀请你参与{{pageData.task}}</h6>
          <h5 class="">[{{pageData.detail.kind}}] &nbsp;&nbsp;{{pageData.detail.step}} </h5>
          <h6 class="">{{pageData.name}}</h6>
        </div>
        <div class="ribbon ribbon-badge ribbon-info ribbon-reverse" v-if="pageData.readflag">
          <span class="ribbon-inner">未读消息</span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  //接受父组件参数
  props: ['pageData'],
  data() {
    return {

    };
  },
  mounted(){
    
  }
};
</script>

<style>
.messages-img{
  width: 40px;
  height: 40px;
  background: #D8D8D8;
  border: 1px solid #979797;
  margin-right: 17px;
  background-size: 40px 40px;
}

</style>
