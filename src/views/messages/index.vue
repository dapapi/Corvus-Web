<template>
   <div class="page">
        <div class="page-header page-header-bordered">
            <div class="filter-container" >
                <div class="dropdown">
                    <div class=" text-right text-filter-all" id="" data-toggle="dropdown" aria-expanded="false" @click="readTypeToggle">
                        {{messageFilter}}
                        <i class="icon"
                        :class="readTypeShow?'md-chevron-up':'md-chevron-down'"></i>
                    </div>
                    <div class="dropdown-menu" role="menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 36px, 0px); top: 0px; left: 0px; will-change: transform;">
                        <a v-for="(item,key) in moduleList" :key="key" class="dropdown-item" href="javascript:void(0)" role="menuitem" @click="renderMsg(1,key)">{{item}}</a>
                    </div>
                </div>
                <div class="text-right mark-all-read">
                    <i class="md-circle-o" v-if="readFilter && !isNoUnread" data-target="#confirmFlag"
                    data-toggle="modal"></i>&nbsp;
                    <span v-if="readFilter && !isNoUnread" 
                    data-target="#confirmFlag" 
                    data-toggle="modal">全部标记为已读</span> 
                </div>
            </div>
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
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="pt-10 list">
                        <div class="message" :class="moduleType" v-for="(item, index) in pageData" :key="index+100" @click="messageClickHandler(index)">
                            <div class="time_line">
                                <span class="time_con bg-white font-size-18">10月15日星期一</span>
                            </div>
                            <ul class="list mt-40 ml-0 pl-0">
                                <li class="row">
                                    <div class="clearfix col-md-12 module">
                                        <div class="float-left mr-10 pic">
                                            <i class=" font-size-30 icon-color" :class="iconList[moduleType]"></i>
                                            <!-- <i class="md-layers font-size-30 icon-color"></i> -->
                                        </div>
                                        <div class="float-left mb-10">
                                            <p class="mb-5"><span class="module_title mr-5 title">考勤助手</span><i class="timesR">21:12</i></p>
                                            <p class="desc txt font-size-16">您的加班 刘素欣已同意</p>
                                        </div>
                                    </div>
                                    <div class="content py-15 pl-40 col-md-8 ml-80">
                                            <span class="is_read"></span>
                                            <div class="title font-size-16 mb-15">孙誉倬-加班</div>
                                            <div class="row mb-5">
                                                <div class="col-md-4">提交人</div>
                                                <div class="col-md-8">提交时间</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">孙誉倬</div>
                                                <div class="col-md-8">2018年10月15日 12:14</div>
                                            </div> 
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-1" style="margin: 6rem auto" v-if="isNoUnread" >
                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                </div>
            </div>
        </div>
        <Flag typeText="全部标记为已读" @confirmFlag='emitMarkasRead'/>
        <!-- <div class="col-md-1" style="margin: 6rem auto" >
          <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
      </div> -->
    </div>
</template>

<script>
import Main from './detail.vue';
import messagesData from './messages.json'
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

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
      messageFilter:"全部消息",   //消息过滤器状态
      moduleList:{},
      moduleType:'',
      iconList:{
        announcement: "md-time",
        attendance: "md-time",
        blogger: "md-time",
        calendar: "md-time",
        client: "md-time",
        contact: "md-time",
        department: "md-time",
        groupRoles: "md-time",
        issues: "md-time",
        personalJob: "md-time",
        personalSalary: "md-time",
        project: "md-layers",
        report: "md-time",
        role: "md-time",
        schedule: "md-time",
        star: "md-time",
        task: "md-time",
        trail: "md-time",
        user: "md-time",
        work: "md-time"
      }
    };
  },
  mounted() {
      //数据初始化
      this.dataInit()
      this.getModule()
      this.receive()
      this.renderMsg(1,'project')
      
      
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
    receive:function(){
            let login = {}
            let user = JSON.parse(Cookies.get('user'))
            login.username = user.nickname
            login.userId = user.id
            // console.log(login.username,login.userId)
            login.action = "login"
            // 初始化一个 WebSocket 对象
            var ws = new WebSocket(config.socketUrl);

            // 建立 web socket 连接成功触发事件
            ws.onopen = function () {
            // 使用 send() 方法发送数据
            ws.send(JSON.stringify(login));
            console.log("数据发送中...");
            };

            // 接收服务端数据时触发事件
            ws.onmessage = function (evt) {
            var received_msg = evt.data;
            // console.log("数据已接收...");
            // console.log(evt.data)
            let msg = eval("'" + evt.data + "'")
            toastr.success(msg)
            // console.log(msg)
        
        };
    },
    renderMsg:function(page=1,type){
        this.moduleType = type 
        console.log(type)
        fetch('get',`${config.apiUrl}/getmsg?include=recive.data&page_size=${page}&module=${type}`).then((res) => {
            // this.moduleList = res
            // console.log(this.moduleList)
        })
    },
    getModule:function(){
        fetch('get',`${config.apiUrl}/getmodules`).then((res) => {
            this.moduleList = res
            
            // console.log(this.moduleList)
        })
    },
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

<style lang="scss" scoped>

.message{
    .time_line{
        border-bottom:1px dashed #CECECE;

        span{
            position: relative;
            bottom:-15px;
            display: inline-block;
            padding-right:10px

        } 
        
    }
    .module{
        i{
            font-style: normal
        }
    }
    .content{
        position: relative;
        color:#999
    }
    .is_read{
        display: inline-block;
        position: absolute;
        top:0px;
        right: 0px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: #F44336;
    }
    .txt{
        color:#999
    }
    .title{
        color:#333
    }
    .icon-color{
        color:#fff
    }
    .pic{
        
        width: 50px;
        height: 50px;
        border-radius: 50%;
        text-align: center;
        padding-top:10px;
    }
}
.announcement{
    .pic{
        background-color:#B53FAF
    }
    .content{
        background:rgba(181,63,175,0.02);
        border-left:2px solid #B53FAF;
    }
    
}
.project{
    .pic{
        background-color:#536DFE
    }
    .content{
        background:rgba(83,109,254,0.02);
        border-left:2px solid #536DFE;
    }
    
}
.star{
    .pic{
        background-color:#A953FE
    }
    .content{
        background:rgba(169,83,254,0.02);
        border-left:2px solid #A953FE;
    }
    
}
.trail{
    
    .pic{
        background-color:#E040FB
    }
    .content{
        background:rgba(224,64,251,0.02);
        border-left:2px solid #E040FB;
    }
}

// .trail{
    
//     .pic{
//         background-color:#7C4DFF
//     }
//     .content{
//         background:rgba(224,64,251,0.02);
//         border-left:2px solid #7C4DFF;
//     }
// }
.calendar{
    
    .pic{
        background-color:#FF6F3F
    }
    .content{
        background:rgba(255,111,63,0.02);
        border-left:2px solid #FF6F3F;
    }
}
.personalJob{
    
    .pic{
        background-color:#3F51B5
    }
    .content{
        background:rgba(63,81,181,0.02);
        border-left:2px solid #3F51B5;
    }
}
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
