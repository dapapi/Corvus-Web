<template>
    <div>

    </div>
</template>

<script>
import env from '@/assets/js/env'
import {mapState, mapGetters,mapActions} from 'vuex'
import Cookies from 'js-cookie'
export default {
    data(){
        return {
            websocket:null,
            errorNum:0
        }
    },
    computed:{
        ...mapState([
          'unReadMsg',
          'moduleList'
      ])   
    },
    created(){
      if(Cookies.get('user')&&this.errorNum<=3){
          this.initWebSocket()
          this.getModule()
      }
      
    },
    destroyed(){
        if(Cookies.get('user')&&this.errorNum<=3){
          this.websocket.close()
        }
        
    },
    methods:{
        ...mapActions([
             'getModuleList'
        ]),
        initWebSocket:function(){
            this.websocket = new WebSocket(env.socketUrl)
            this.websocket.onmessage = this.websocketonmessage
            this.websocket.onopen = this.websocketonopen
            this.websocket.onerror = this.websocketonerror
            this.websocket.onclose = this.websocketclose
        },
        websocketonopen:function(){

            //websoket 发送数据
            let login = {}
            let user = JSON.parse(Cookies.get('user'))
            login.username = user.nickname
            login.userId = user.id
            login.authorization = 'Bearer ' + env.getAccessToken() || ''
            login.action = "login"

            this.websocketsend(JSON.stringify(login))
        },
        websocketonmessage:function(evt){
            var received_msg = evt.data;
            let msg = eval("'" + evt.data + "'")
            msg = JSON.parse(msg)
            if(msg.action == 'sendmessage'){
                toastr.success(msg.title)
                this.suportNotify(msg.title)
                this.getModule()
            }
        },
        websocketsend:function(data){
            this.websocket.send(data) 
        },
        websocketonerror:function(){
            this.errorNum = this.errorNum+1
            this.initWebSocket()
        },
        websocketclose:function(){

        },
        getModule:function(){
            this.getModuleList()
            // fetch('get',`/getmodules`).then((res) => {
            //     let unRead =0
            //     for (let i = 0; i < res.data.length; i++) {
            //         if(res.data[i].unread){
            //             unRead = unRead+res.data[i].unread
            //         }
            //     }
            //     this.$store.state.unReadMsg = unRead
                
            // })
        },
        suportNotify:function (content){
            if (window.Notification) {
                // 支持
                console.log("支持"+"Web Notifications API");
                //如果支持Web Notifications API，再判断浏览器是否支持弹出实例
                this.showMess(content)
            } else {
                // 不支持
                alert("不支持 Web Notifications API");
            }
        },
        //判断浏览器是否支持弹出实例
        showMess:function(content){
            setTimeout(function () {
                //如果支持window.Notification 并且 许可不是拒绝状态
                if(window.Notification && Notification.permission !== "denied") {
                    //Notification.requestPermission这是一个静态方法，作用就是让浏览器出现是否允许通知的提示
                    Notification.requestPermission(function(status) {
                        //如果状态是同意
                        if (status === "granted") {
                            var m = new Notification('收到信息', {
                                body: content,　　//消息体内容
                                icon:"https://res.papitube.com/corvus/images/taiyang-icon.png"　　//消息图片
                            });
                            m.onclick = function () {//点击当前消息提示框后，跳转到当前页面
                                window.focus();
                            }
                        } else{
                            console.log('当前浏览器不支持弹出消息')
                        }
                    });
                }
            },1000)
        }
    }
}
</script>


