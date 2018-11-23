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
                               aria-expanded="true" role="tab" @click='readFilter=1'>未读</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab" @click='readFilter=0'>已读</a>
                        </li>
                    </ul>
                </div>
                <div class="" 
                    v-for="(item, index) in pageData" 
                    :key="index" 
                    @click="messageClickHandler(index)">
                    <Main :pageData='item' class="message-main-container" v-if="item.readflag === readFilter"/>
                </div>
                <div v-if="isNoUnread">
                    <div class="page-content vertical-align-middle">
                        <header>
                        <h1 class="animation-slide-top">oop,这里什么都没有</h1>
                        </header>
                        <p class="error-advise">你可以到已读消息中查看更多</p>
                    </div>
                 </div>
            </div>
        </div>
        <FlagConfirm @emitMarkasRead='emitMarkasRead'/>
        
    </div>
</template>

<script>
import Main from './detail.vue';
import FlagConfirm from './flag.vue';
import messagesData from './messages.json'

export default {
  name: 'messagesIndex',
  components: {
    Main, FlagConfirm,
  },
  data() {
    return {
      messageStatus: null,  //消息状态
      readTypeShow: false,  //全部消息列表展开控制
      pageData:{},          //页面数据
      readFilter:1          //阅读状态筛选
    };
  },
  mounted() {
      //数据初始化
      this.dataInit()
  },
  computed:{
      //是否有未读信息判断
      isNoUnread(){
            let counter = 0
            for (const key in this.pageData) {
                if (this.pageData[key].readflag === 1) {
                    counter++
                }
            }
            if(counter === 0 && this.readFilter == 1){
                return true
            }else{
                return false
            }
      }
  },
  methods: {
    //消息模式变更
    readTypeToggle() {
      this.readTypeShow = !this.readTypeShow;
    },
    //消息状态变更
    messageStatusChange(ref) {
      this.messageStatus = ref;
    },
    //初始化数据
    dataInit(){
        for (const key in messagesData) {
            let orignTime = messagesData[key].time
            messagesData[key].timeYMD = this.timeFormat(orignTime).formatYMD
            messagesData[key].timehms = this.timeFormat(orignTime).formathms
        }
        this.pageData = messagesData
    },
    //日期格式化
    timeFormat(ref){
        let date = new Date(ref);
        let Y = date.getFullYear()
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
        let D = date.getDate()
        let h = date.getHours()
        let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()):date.getMinutes())
        let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds())
        let formatYMD = Y+'-'+M+'-'+D
        let formathms = h+':'+m+':'+s
        return{
            formatYMD,formathms
        }
    },
    //已读、未读控制器
    messageClickHandler(ref){
        this.pageData[ref].readflag = 0
    },
    //全部消息已读接收器
    emitMarkasRead(){
        for (const key in this.pageData) {
            messagesData[key].readflag = 0
        }
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
