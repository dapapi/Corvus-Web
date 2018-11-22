<template>
   <div class="page">
        <div class="page-header page-header-bordered ">
            <h1 class="page-title">消息</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5 ">
                <div class="col-md-12 row filter-container" >
                    <div class="offset-md-8 col-md-2 text-right "
                    data-target="#exampleNiftyFadeScale" data-toggle="modal" >
                        <i class="icon md-circle-o" ></i>&nbsp;&nbsp;全部标记为已读
                    </div>
                    <div class="col-md-2 text-right text-filter-all" @click="readTypeToggle">全部消息
                        <i class="icon"
                        :class="readTypeShow?'md-chevron-up':'md-chevron-down'"
                        ></i>
                    </div>
                </div>
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" >
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">未读</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已读</a>
                        </li>
                    </ul>
                </div>
                <div class="" v-for="i in 5" :key="i">
                     <div class="page-content col-md-12 col-lg-12 row" >
                        <p class="messages-date">1970年1月1日</p>
                        <hr class="col-md-10 col-lg-10">
                    </div>
                    <Main :messageData='messageData' class="message-main-container"/>
                </div>
            </div>
        </div>
        <FlagConfirm />
    </div>
</template>

<script>
import Main from './messagesMain.vue';
import FlagConfirm from './messagesFlagConfirm.vue';

export default {
  name: 'messagesIndex',
  components: {
    Main, FlagConfirm,
  },
  data() {
    return {
      messageStatus: null,
      messageData: {},
      readTypeShow: false,
    };
  },
  mounted() {

  },
  methods: {
    readTypeToggle() {
      this.readTypeShow = !this.readTypeShow;
    },
    messageStatusChange(ref) {
      console.log(ref);
      this.messageStatus = ref;
    },
  },
};
</script>

<style>
.filter-container{
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    margin-top: 30px;
    user-select: none;
}
.message-main-container:hover{
    background: rgba(87, 140, 242, 0.14);
}
.messages-date{
    font-family: PingFangSC-Regular;
font-size: 18px;
color: #C4C4C4;
letter-spacing: 0;
}
</style>
