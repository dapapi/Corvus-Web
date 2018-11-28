<template>
   <div class="page">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">消息
            <div class="filter-container" >
                <div class="dropdown">
                    <div class=" text-right text-filter-all" id="" data-toggle="dropdown" aria-expanded="false" @click="readTypeToggle">
                        {{messageFilter}}
                        <i class="icon"
                        :class="readTypeShow?'md-chevron-up':'md-chevron-down'"></i>
                    </div>
                    <div class="dropdown-menu" role="menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 36px, 0px); top: 0px; left: 0px; will-change: transform;">
                        <a :class="messageFilter === '全部消息' ? 'active' :''" class="dropdown-item" href="javascript:void(0)" role="menuitem" @click="messageFilterHandler('全部消息')">全部消息</a>
                        <a :class="messageFilter === '任务消息' ? 'active' :''" class="dropdown-item" href="javascript:void(0)" role="menuitem" @click="messageFilterHandler('任务消息')">任务消息</a>
                        <a :class="messageFilter === '简报消息' ? 'active' :''" class="dropdown-item" href="javascript:void(0)" role="menuitem" @click="messageFilterHandler('简报消息')">简报消息</a>
                        <a :class="messageFilter === '加班消息' ? 'active' :''" class="dropdown-item" href="javascript:void(0)" role="menuitem" @click="messageFilterHandler('加班消息')">加班消息</a>
                    </div>
                </div>
                <div class="text-right mark-all-read">
                    <i class="icon md-circle-o" v-if="readFilter && !isNoUnread" data-target="#confirmFlag" 
                    data-toggle="modal"></i>&nbsp;
                    <span v-if="readFilter && !isNoUnread" 
                    data-target="#confirmFlag" 
                    data-toggle="modal">全部标记为已读</span> 
                </div>
            </div>
            </h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 col-lg-12 py-5 ">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" >
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab" @click='readFilter=true'>未读</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" @click='readFilter=false'>已读</a>
                        </li>
                    </ul>
                </div>
                <div class="" 
                    v-for="(item, index) in pageData" 
                    :key="index+100" 
                    @click="messageClickHandler(index)">
                    <Main :pageData='item' 
                    class="message-main-container" 
                    v-if="item.readflag === readFilter"
                    @markasunread='markAsUnread'/>
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
        <Flag typeText="全部标记为已读" @confirmFlag='emitMarkasRead'/>
    </div>
</template>

<script>
import Main from './detail.vue';
import messagesData from './messages.json'

export default {
  name: 'messagesIndex',
  components: {
    Main,
  },
  data() {
    return {
      messageStatus: null,      //消息状态
      readTypeShow: false,      //全部消息列表展开控制
      pageData:{},              //页面数据
      readFilter:true,          //阅读状态筛选
      messageFilter:"全部消息"   //消息过滤器状态
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
                if (this.pageData[key].readflag === true) {
                    counter++
                }
            }
            if(counter === 0 && this.readFilter == true){
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
        this.pageData[ref].readflag = false
    },
    //全部消息已读接收器
    emitMarkasRead(){
        for (const key in this.pageData) {
            this.pageData[key].readflag = false
        }
    },
    //设置当前消息为未读
    markAsUnread(ref){
        for (const key in this.pageData) {
            if(this.pageData[key].messageid == ref) {
                this.pageData[key].readflag = true
            }
        }
    },
    messageFilterHandler(ref){
        this.messageFilter = ref
    }
  },
};
</script>

<style>
.filter-container{
    display: inline-block;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    user-select: none; 
    margin-top: 5px;

}
.dropdown{
    margin-left: 20px;
    display: inline-block;
}
.mark-all-read{
    position: absolute;
    right: 41px;
    top: 31px;
}
.message-main-container>:first-child:hover{
    background: rgba(87, 140, 242, 0.14);
}
.messages-date{
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #C4C4C4;
    letter-spacing: 0;
}
li{
    list-style-type: none;
}
</style>
