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
            <div class="col-md-12 py-5">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" >
                            <a class="nav-link active" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab" @click='getModuleData(1)'>未读</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-task"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" @click='getModuleData(2)'>已读</a>
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
                                <li class="mb-30 row" v-for="(item2,index2) in item" :key="index2">
                                    <!-- <router-link class="row" :to="msgLink.find(link => link.value == item2.module).name+'/'+item2.module_data_id"> -->
                                        <div class="clearfix col-md-12 module">
                                            <div class="float-left mr-10 pic col-md-1">
                                                <i class="iconfont  font-size-30 icon-color" :class="iconList[moduleList.find(item => item.id == moduleType).val]"></i>
                                            </div>
                                            <div class="float-left mb-10 col-md-11" style="margin-left:-10px">
                                                <p class="mb-5"><span class="module_title mr-5 title">{{moduleList.find(item=>item.id ==moduleType).name}}助手</span><i class="timesR">{{item2.created_at}}</i></p>
                                                <p class="desc txt font-size-16">{{item2.message_title}}</p>
                                            </div>
                                        </div>
                                        <div class="content py-15 pl-40 col-md-8 ml-80" @click="msgStatus(item2.message_id,item2.module,item2.module_data_id)">
                                                <span class="is_read" v-show="item2.state == 1"></span>
                                                <div class="title font-size-16 mb-15">{{item2.message_subheading}}</div>
                                                <div class="row">
                                                     <div class="col-md-5" v-for="(item3,index3) in item2.body" :key="index3">
                                                         <div class="mb-5">{{item3.title}}</div>
                                                         <div>{{item3.value}}</div>
                                                     </div>
                                                </div>                                                                                 
                                        </div>
                                    <!-- </router-link> -->
                                </li>
                            </ul>
                        </div>
                        <div v-if="messageList.length === 0" style="margin: 6rem auto;width: 100px">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                        <!--list-->
                    </div>
                </div>
            </div>
            </div>
        </div>
        <Flag typeText="全部标记为已读" @confirmFlag="msgStatus('','','',moduleType)"/>
        <!-- 查看日程 -->
        <div class="modal fade" id="checkSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content" v-if="scheduleData">
                    <div class="modal-header">
                        <div style="order: 2">
                            <i class="iconfont icon-guanbi pointer-content" aria-hidden="true" data-dismiss="modal"></i>
                        </div>
                        <h5 class="modal-title" v-if="scheduleData.calendar">{{ scheduleData.calendar.data.title }}</h5>
                    </div>
                    <div class="modal-body px-40">
                        <div class="">
                            <h4 class="my-20">{{ scheduleData.title }}</h4>
                        </div>
                        <div class="example">
                            <div class="">
                                <div  class="col-md-3 float-left px-0">
                                    <div class="" >{{ (start_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (start_at.split(' ')[0]).split('-')[2] }}日
                                        {{ start_at|getWeek(start_at) }}
                                    </div>
                                    <div  class="big-time">{{startBigTime}}</div>
                                </div>
                                <div class="col-md-2 float-left pl-0">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time text-center"> -</div>
                                </div>
                                <div class="col-md-3 float-left px-0">
                                    <div class="">{{ (end_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (end_at.split(' ')[0]).split('-')[2] }}日
                                        {{ end_at|getWeek(end_at) }}
                                    </div>
                                    <div class="big-time">{{ endBigTime }}</div>
                                </div>
                                <div class="col-md-2 float-left" v-show="scheduleData.is_allday">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time font-size-18" style="line-height: 75px">全天</div>
                                </div>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.position">
                            <div class="col-md-2 px-0 float-left">地点</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.position }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.material">
                            <div class="col-md-2 px-0 float-left">资源</div>
                            <div class="col-md-10 pl-0 float-left" v-if="scheduleData.material">{{ scheduleData.material.data.name }}</div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 px-0 float-left">组织人</div>
                            <div class="col-md-10 pl-0 float-left" v-if="scheduleData.creator">
                                {{ scheduleData.creator.data.name }}
                            </div>
                        </div>
                        <div class="example"
                             v-if="((scheduleData.project && scheduleData.project.data.length > 0) || (scheduleData.task && scheduleData.task.data.length > 0))">
                            <div class="col-md-2 px-0 float-left">关联资源</div>
                            <div class="col-md-10 pl-0 float-left">
                                <div class="pb-5" v-if="scheduleData.project"
                                     v-for="project in scheduleData.project.data">
                                    <span>项目 - {{ project.title }}</span>
                                </div>
                                <div class="pb-5" v-if="scheduleData.task" v-for="task in scheduleData.task.data">
                                    <span>任务 - {{ task.title }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.participants">
                            <div class="col-md-2 px-0 float-left">参与人</div>
                            <div class="col-md-10 pl-0 float-left">
                                <span v-for="(person,index) in scheduleParticipants" :key="index" class="mr-5">{{person}}</span>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.desc">
                            <div class="col-md-2 px-0 float-left">备注</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.desc }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.affixes && scheduleData.affixes.data.length > 0">
                            <div>附件</div>
                            <div>
                                <div class="col-md-3 float-left text-center position-relative file-item"
                                     v-for="(affix,index) in scheduleData.affixes.data" :key="index">
                                    <div class="del-affix iconfont icon-zuofei position-absolute pointer-content"
                                         @click="delAffix(affix.id)"></div>
                                    <div><i class="iconfont icon-wenjian" style="font-size: 36px"></i></div>
                                    <div @click="openFile(affix.url)" class="pointer-content">{{ affix.title }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Main from './detail.vue';
import messagesData from './messages.json'
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
import {mapState, mapGetters,mapActions} from 'vuex'
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
    //   moduleList:[],//模块list
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
      websocket:null,
      msgLink:config.msgLink,//模块跳转link
      scheduleData:{},
      scheduleParticipants:[],
      end_at:'',
      start_at:'',
      endBigTime:'',
      startBigTime:''

    };
  },
  mounted() {
      //数据初始化
      this.getModule()
      console.log(this.$route.fullPath)
      
  },
  computed:{
      ...mapState([
         'unReadMsg',
         'moduleList' 
      ])      
  },
  watch:{
       unReadMsg:function(){
           this.getModule();
           
       },
       moduleList:function(){
           this.renderMsg()
       },
       scheduleData:function(){
           this.end_at = this.scheduleData.end_at
           this.start_at = this.scheduleData.start_at
           this.endBigTime = (this.end_at.split(' ')[1]).slice(0,5)
           this.startBigTime = (this.start_at.split(' ')[1]).slice(0,5)
       },
       "$route":"renderMsg"
  },
  methods: {
    ...mapActions([
         'getModuleList'
    ]),
    getModuleData:function(state){
        this.state = state
        if(this.state == 1){
            this.readFilter = true
        }else{
            this.readFilter = false
        }
        this.renderMsg()
    },
    renderMsg:function(){
        if(this.$route.query.moduleType){
            this.moduleType = this.$route.query.moduleType
            fetch('get',`${config.apiUrl}/getmsg?include=recive.data&module=${this.moduleType}&state=${this.state}`).then((res) => {
        
            this.messageList = res.data
        })
        }else{
            //如果没有moduleType  跳转
            this.$router.push(`/my/message?moduleType=${this.moduleList[0].id}`)
        }
        
        
    },
    getModule:function(){
        this.getModuleList()
    },
    //修改消息状态
    msgStatus:function(id,module_id,module_data_id,type){
        if(this.state == 2){
            this.isAuthority(module_id,module_data_id)
        }else{
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
                if(!type){
                    this.isAuthority(module_id,module_data_id)
                }
            })
        }
    },
    //是否有权限进行跳转
    isAuthority:function(module_id,module_data_id){
        let data = {
            method:'get',
            uri:`${this.msgLink.find(item => item.value == module_id).url}${module_data_id}`,
            id:module_data_id
        }
        // console.log(`${config.apiUrl}${this.msgLink.find(item => item.value == module_id).url}${module_data_id}`)
        fetch('get', '/console/checkpower', data).then(response => {
            // console.log(response.data.power)
            //日历模块显示弹框
            
            if(response.data.power === 'true'){
                if(module_id == 214){
                    this.showScheduleModal(module_data_id)
                }else{
                    this.$router.push(`${this.msgLink.find(item =>item.value == module_id).name}/${module_data_id}`) 
                }
            }
            
        });
    },
    //获取日历详情
    showScheduleModal: function (scheduleId) {
        let data = {
            include: 'calendar,participants,creator,material,affixes,project,task',
        };
        fetch('get', '/schedules/' + scheduleId, data).then(response => {
            
            this.scheduleData = response.data;
            for (let i = 0; i < this.scheduleData.participants.data.length; i++) {
                this.scheduleParticipants.push(this.scheduleData.participants.data[i].name)
                
            }
            $('#checkSchedule').modal('show')
            // this.scheduleParticipants 
        });
        
    }

  },
  filters: {
            getWeek: function (date) {
                let week = new Date(date).getDay();
                let value = '';
                switch (week) {
                    case 0:
                        value = '周日';
                        break;
                    case 1:
                        value = '周一';
                        break;
                    case 2:
                        value = '周二';
                        break;
                    case 3:
                        value = '周三';
                        break;
                    case 4:
                        value = '周四';
                        break;
                    case 5:
                        value = '周五';
                        break;
                    case 6:
                        value = '周六';
                        break;
                }
                return value;
            }
        },
};
</script>

<style lang="scss" scoped>
.big-time {
        font-size: 48px;
        color: #3F51B5;
        font-weight: bold;
    }
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
        padding:0px;
        
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
