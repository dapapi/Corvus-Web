<template>
   <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered clearfix">
            <h1 class="page-title float-left">我的消息</h1>
            <div class="filter-container float-right" >
                <div class="text-right mark-all-read">
                    <i class="icon md-circle-o" v-show="readFilter && messageList" data-target="#confirmFlag"
                    data-toggle="modal"></i>&nbsp;
                    <span v-show="readFilter && messageList" 
                    data-target="#confirmFlag" 
                    data-toggle="modal">全部标记为已读</span> 
                </div>
            </div>
        </div>
        <div class="page-content container-fluid" >
            <div class="row mx-0" style="background-color:#fff">
                <div class="col-md-2">
                 <div class="list-group mt-20" style="border-right:1px solid #E0E0E0">
                    <a :class="item.id == moduleType?'checked list-group-item mr-10 px-10':'list-group-item mr-10 px-10'" v-for="(item,index) in moduleList" :key="index" href="javascript:void(0)" role="menuitem" @click="renderMsg(item.id,state)">{{item.name}}<span v-show="item.un_read>0" class="unRead ml-5">{{item.un_read}}</span></a>
                </div>
            </div>
            <div class="col-md-10 py-5">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" >
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab" @click='renderMsg(moduleType,1)'>未读</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" @click='renderMsg(moduleType,2)'>已读</a>
                        </li>
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="pt-10 list">
                        <!--list-->
                        <div class="message" :class="moduleList.find(item => item.id == moduleType).val" v-for="(item, key) in messageList" :key="key">
                            <div class="time_line">
                                <span class="time_con bg-white font-size-18">{{key}} 星期{{week.find(item => item.value == new Date(key).getDay()).name}}</span>
                            </div>
                            <ul class="list mt-40 ml-0 pl-0">
                                <li class="mb-30" v-for="(item2,index2) in item" :key="index2">
                                    <router-link class="row" :to="item2.link">
                                        <div class="clearfix col-md-12 module">
                                            <div class="float-left mr-10 pic">
                                                <i class="iconfont  font-size-30 icon-color" :class="iconList[moduleList.find(item => item.id == moduleType).val]"></i>
                                            </div>
                                            <div class="float-left mb-10">
                                                <p class="mb-5"><span class="module_title mr-5 title">{{moduleList.find(item=>item.id ==moduleType).name}}助手</span><i class="timesR">{{item2.created_at}}</i></p>
                                                <p class="desc txt font-size-16">{{item2.message_title}}</p>
                                            </div>
                                        </div>
                                        <div class="content py-15 pl-40 col-md-8 ml-80" @click="msgStatus(item2.message_id)">
                                                <span class="is_read" v-show="item2.state == 1"></span>
                                                <div class="title font-size-16 mb-15">{{item2.message_subheading}}</div>
                                                <div class="row">
                                                     <div class="col-md-5" v-for="(item3,index3) in item2.body" :key="index3">
                                                         <div class="mb-5">{{item3.title}}</div>
                                                         <div>{{item3.value}}</div>
                                                     </div>
                                                </div>                                                                                 
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div v-if="messageList.length === 0" class="col-md-1" style="margin: 6rem auto">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                        <!--list-->
                    </div>
                </div>
            </div>
            </div>
        </div>
        <Flag typeText="全部标记为已读" @confirmFlag="msgStatus('',moduleType)"/>
    </div>
</template>

<script>
import Main from './detail.vue';
import messagesData from './messages.json'
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'messagesIndex',
  components: {
    Main,
  },
  computed:{
    
  },
  data() {
    return {
      messageStatus: null,      //消息状态
      readTypeShow: false,      //全部消息列表展开控制
      pageData:{},              //页面数据
      readFilter:true,          //阅读状态筛选
      messageFilter:"全部消息",   //消息过滤器状态
      moduleList:{},//模块list
      moduleType:'',
      messageList:[],//消息list
      iconList:{//每个模块的icon
        announcenment: "icon-notice",
        attendance: "icon-shijian",
        blogger: "icon-huangguan1",
        calendar: "icon-richeng",
        client: "icon-kehu1",
        contact: "md-time",
        department: "md-time",
        groupRoles: "md-time",
        issues: "md-time",
        personalJob: "md-time",
        personalSalary: "md-time",
        project: "icon-xiangmu1",
        report: "icon-wenzhang",
        role: "md-time",
        schedule: "icon-richeng",
        star: "icon-yiren",
        task: "icon-qizi",
        trails: "icon-xiaoshoushichang",
        user: "md-time",
        work: "md-time",
        contract:"icon-hetong",
        approval:'icon-shenqingshenpi',
        repository:'icon-xiangzi',
        personnelmanage:'icon-renshi'
      },
      week:config.week,
      state:1,// 1未读 2已读
      websocket:null
    };
  },
  mounted() {
      //数据初始化
      this.getModule()
      
      
  },
  computed:{
      ...mapState([
          'unReadMsg'
      ])      
  },
  watch:{
       unReadMsg:function(){
        //    alert(222)
        //    console.log(this.unReadMsg)
           this.getModule()
       }
  },
  methods: {
    renderMsg:function(type,state){
       
        if(type){
            this.moduleType = type
        }
        if(state ==1){
            this.state = state
            this.readFilter = true
        }else{
            this.state = state
            this.readFilter = false
        }
        
        fetch('get',`${config.apiUrl}/getmsg?include=recive.data&module=${this.moduleType}&state=${this.state}`).then((res) => {
        
            this.messageList = res.data
           

        })
    },
    getModule:function(){
        fetch('get',`${config.apiUrl}/getmodules`).then((res) => {
            this.moduleList = res
            let num = 0
            for (let i = 0; i < res.length; i++) {
                num = num + res[i].un_read
            }
            this.$store.state.unReadMsg = num
            if(this.moduleType){
                this.renderMsg(this.moduleType,this.state)
            }else{
                this.renderMsg(this.moduleList[0].id,1)
            }
        })
        // console.log(this.moduleList)
        // console.log(this.moduleType)
    },
    msgStatus:function(id,type){
        let data = {}
        if(type){
            data={
                module:this.moduleType,
                all:'yes'
            }
        }else{
            data ={
               message_id:id
            }
        }

        fetch('get',`${config.apiUrl}/changestae`,data).then((res) => {
            this.getModule()
        })
    }
  },
};
</script>

<style lang="scss" scoped>
a:hover{
    text-decoration: none;
    cursor: pointer;
}
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
        width: 10px;
        height: 10px;
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
        
    }
    
}
.unRead{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color:red;
    color:#fff;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    line-height: 16px;
    border-radius: 50%;
    position: absolute;
    right:10px;
    top:15px
}
.checked{
    background-color:#eee
}
.announcenment{
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
.trails{
    
    .pic{
        background-color:#E040FB
    }
    .content{
        background:rgba(224,64,251,0.02);
        border-left:2px solid #E040FB;
    }
}

.task{
    
    .pic{
        background-color:#448aff
    }
    .content{
        background:rgba(68,138,255,0.02);
        border-left:2px solid #448aff;
    }
}
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
.blogger{
    .pic{
        background-color:#FF5252
    }
    .content{
        background:rgba(255,82,82,0.02);
        border-left:2px solid #FF5252;
    }
}
.client{
    .pic{
        background-color:#7C4DFF
    }
    .content{
        background:rgba(124,77,255,0.02);
        border-left:2px solid #7C4DFF;
    }
    
}
.contract{
    .pic{
        background-color:#40C4FE
    }
    .content{
        background:rgba(64,196,254,0.02);
        border-left:2px solid #40C4FE;
    }
}
.schedule{
    .pic{
        background-color:#40C4FE
    }
    .content{
        background:rgba(64,196,254,0.02);
        border-left:2px solid #40C4FE;
    }
}
.attendance{
    .pic{
        background-color:#FF9800
    }
    .content{
        background:rgba(255,152,0,0.02);
        border-left:2px solid #FF9800;
    }
}
.approval{
    .pic{
        background-color:#00BCD4
    }
    .content{
        background:rgba(0,188,212,0.02);
        border-left:2px solid #00BCD4;
    }
}
.repository{
    .pic{
        background-color:#B53FAF
    }
    .content{
        background:rgba(181,63,175,0.02);
        border-left:2px solid #B53FAF;
    }
}
.report{
    .pic{
        background-color:#AF4C4C
    }
    .content{
        background:rgba(175,76,76,0.02);
        border-left:2px solid #AF4C4C;
    }
}
.personnelmanage{
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
