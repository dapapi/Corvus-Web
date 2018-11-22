<template>
    <div>
        <div class="messages-main-date" v-if="messageData.date">
          <div>{{messageData.date}}}</div>
          <div class="messages-main-line"></div>
        </div>
        <div class="messages-main-list">
          <div class="messages-main-img">
          </div>
          <div class="messages-main-detail">
            <div class="messages-main-time">20:30</div>
            <div class="messages-main-inv">测试邀请你参与任务</div>
            <div class="messages-main-type">
              <div class="messages-main-issue">[AB巧乐滋续约]</div>
              <div class="messages-main-progress">主体确认事宜</div>
            </div>
            <div class="messages-main-owner">测试人</div>
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
.messages-main-container{
  overflow: scroll;
  height: 1014px;
}
.messages-main-date{
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #C4C4C4;
    letter-spacing: 0;
    margin: 36px 0 0 56px;
}
.messages-main-list{
  display: flex;
  width: 1671px;
  height: 207px;
  margin: 17px 47px 17px 33px;

}
.messages-main-list:hover{
  background: rgba(87, 140, 242, 0.14);
}
.messages-main-img{
  width: 60px;
  height: 60px;
  background: #D8D8D8;
  border: 1px solid #979797;
  border-radius: 50%;
  margin: 17px 0 17px 17px;
}
.messages-main-detail{
  margin: 17px;
}
.messages-main-time{
  font-family: PingFangSC-Regular;
  font-size: 22px;
  color: #999999;
  letter-spacing: 0;
}
.messages-main-type{
  display: flex;
  margin-top: 11px;
}
.messages-main-inv{
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #333333;
  letter-spacing: 0;
}
.messages-main-issue{
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #333333;
  letter-spacing: 0;
}
.messages-main-progress{
  margin-left: 24px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #333333;
  letter-spacing: 0;
}
.messages-main-owner{
  margin-top: 12px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #333333;
  letter-spacing: 0;
}
</style>
