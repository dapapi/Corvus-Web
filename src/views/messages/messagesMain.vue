<template>
     <div class="page-content container-fluid">
        <div class="col-md-12 col-lg-12 row">
          <div class="rounded-circle img-thumbnail messages-img"></div>
          <div class="">
            <p class="">20:30</p>
            <h6 class="">测试邀请你参与任务</h6>
            <h5 class="">[AB巧乐滋续约] &nbsp;&nbsp;主体确认事宜 </h5>
            <h6 class="">测试人</h6>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['messageData'],
  data() {
    return {

    };
  },
};
</script>

<style>
.messages-img{
  width: 40px;
  height: 40px;
  background: #D8D8D8;
  border: 1px solid #979797;
  margin-right: 17px;
}

</style>
