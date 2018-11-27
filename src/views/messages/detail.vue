<template>
     <div class="page-content container-fluid">
      <div class="col-md-12 col-lg-12 row">
        <div class="rounded-circle img-thumbnail messages-img" 
        :style="{ backgroundImage: 'url('+pageData.cover+')'}"></div>
        <div class="">
          <p class="">{{pageData.timeYMD}}  {{pageData.timehms}}&nbsp;&nbsp;&nbsp;
            <i class="icon md-flag" 
            aria-hidden="true" 
            title="点击设为未读" 
            v-if="!pageData.readflag" 
            @click.stop="markAsUnread"></i></p>
            <!-- ⬆️阻止冒泡 -->
          <h6 class="">{{pageData.name}}邀请你参与{{pageData.task}}</h6>
          <h5 class="">[{{pageData.detail.kind}}] &nbsp;&nbsp;{{pageData.detail.step}} </h5>
          <h6 class="">{{pageData.name}}</h6>
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
    
  },
  methods:{
    //通知父组件标记当前消息为未读
    markAsUnread(){
      this.$emit('markasunread',this.pageData.messageid)
    }
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
.md-flag{
  color: rgba(7, 17, 27, 0.14)
}
.md-flag:hover{
  color: #00bcd4
}
</style>
