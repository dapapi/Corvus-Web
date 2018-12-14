
<script>
export default {
    data(){
       return {

       }
    },
    mounted(){
        this.receive()       
    },
    methods:{
        receive:function(){
            alert(222)
            let login = {}
            let user = JSON.parse(Cookies.get('user'))
            login.username = user.nickname
            login.userId = user.id
            // console.log(login.username,login.userId)
            login.action = "login"
            // 初始化一个 WebSocket 对象
            var ws = new WebSocket("ws://sandbox-corvus.papitube.com:8081");

            // 建立 web socket 连接成功触发事件
            ws.onopen = function () {
            // 使用 send() 方法发送数据
            ws.send(JSON.stringify(login));
                console.log("数据发送中...");
            };

            // 接收服务端数据时触发事件
            ws.onmessage = function (evt) {
                alert(111)
                var received_msg = evt.data;
                let msg = eval("'" + evt.data + "'")
                toastr.success(msg)
                
         
            };
        
        // 断开 web socket 连接成功触发事件
        // ws.onclose = function () {
        // console.log("连接已关闭...");
        // };

       },
    }
}
</script>


