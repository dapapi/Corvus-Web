<template>
    <div class="page">
        <div class="loader-overlay" v-if="isLoading">
            <div class="loader-content">
                <div class="loader-index">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
        </div>
      </div>
      </div>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">
                <i class="icon md-chevron-left" @click="goBack"></i>公告&nbsp;&nbsp;</h1>
            <i class="icon md-flower" 
            data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#addNewBroadcast"
            aria-hidden="true"
            data-backdrop="static"></i>
        </div> 
        <div class="page-content container-fluid">
            <div class="panel" id="">
                <div class="panel-body">
                    <div class="panel-title"><h4>{{currentData.title}}</h4></div>
                    <div class="panel-content info" v-if="currentData.creator">
                        <div class="rounded-circle img-thumbnail messages-img" 
                            :style="{ backgroundImage: 'url('+currentData.cover+')'}"></div>
                        <span class="">{{currentData.creator.data.name}}</span>
                        <span class="">{{currentData.created_at}}</span>
                        <span v-if="classifyArr[0]" class="">{{classifyArr.find(classifyArr => classifyArr.value == currentData.classify).name}}</span>
                    </div>
                    <br>
                    <hr/>
                    <br>
                    <div class="panel-content" v-if="currentData.scope && departments">
                        <h5 v-html="currentData.desc" class="broadcast-content"></h5>
                        <h5>公告范围
                            <span  v-for=" item in currentData.scope.data" :key="item.department_id">&nbsp;&nbsp;
                                <span v-if="departments[0]" class="badge badge-round badge-dark">{{departments.find(departments => departments.id == item.department_id).name}}</span>
                            </span>
                        </h5>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
        <AddModifyBroadCast :notedata='currentData' position='broadCast' @goback='goBack' />
    </div>   
</template>

<script>
import fetch from '../../assets/utils/fetch.js'
import config from '../../assets/js/config'
export default {
    data(){
        return{
            broadCastInfo:{},
            currentId:'',
            currentData:{},
            classifyArr:config.classifyArr,
            broadCastPost:{},
            paramsId:'',
            isLoading:true,
            departments:[],
        } 
    },
    created() { 
        this.getCurrentId()
        this.dataInit()
        this.getDepartments()

    },
    mounted(){
        
    },
    methods:{
        //初始化数据
        dataInit(){
            let _this = this
                fetch('get', '/announcements/'+this.currentId+'?include=scope,creator').then(function (response) {
                    _this.currentData = response.data
                    _this.isLoading = false
            })
        },
        //获取公告id
        getCurrentId(){
            this.currentId = this.$route.params.id
        },
        //后退
        goBack(){
            history.go(-1)
        },
        //获取部门数据
        getDepartments(){
            fetch('get','/departments').then((params) => {
                this.departments = params.data
            })
        },
    }
}

</script>

<style scoped>
.loader-overlay{
        margin-left: 100px;
        background-color: rgba(7, 17, 27, 0.2)
    }
.broadcast-content{
    min-height: 200px;
}
.md-flower{
    position: absolute;
    right: 41px;
    top: 28px;
    cursor: pointer;
}
.md-chevron-left{
    font-size: 30px;
    cursor: pointer;
    color:#CACACA;
}
.panel-content{
    margin-left: 20px;
    margin-right: 20px; 
}
.panel-title{
    padding-left: 10px;
}
h5{
    margin-bottom: 20px;
    line-height: 25px;
}
.info span{
    margin-left: 20px;
}
span{
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
/* margin-left: 20px; */
}
.badge-dark{
    background-color: rgba(236, 236, 236, 1);
    color: #999999;
}
.messages-img{
    display: inline-flex;
    width: 24px;
    height: 24px;
    background: #D8D8D8;
    border: 1px solid #979797;
    background-size: 24px 24px;
}
</style>
