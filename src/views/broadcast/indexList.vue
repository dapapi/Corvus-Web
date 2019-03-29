<template>
        <div class="page-main" style="background-color:#f3f4f5">
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
        <div class="page-header page-header-bordered pb-30">
            <h1 class="page-title">{{titleHandler}}</h1>
        </div> 
       
        <div class="page-content container-fluid">
            
            <div class="panel " id="">
                 <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item active" role="presentation" @click="dataInit(2)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">未读</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="dataInit(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已读</a>
                        </li>
                    </ul>
                </div>
                <div class="panel-body">
                    <div class="">
                        <div class="table-responsive">
                            <table class="table table-hover" data-role="content" data-plugin="selectable" data-row-selectable="true">
                                <tr>
                                    <th class="cell-300" scope="col">标题</th>
                                    <th class="cell-300" scope="col">分类</th>
                                    <th class="cell-300" scope="col">发布时间</th>
                                    <th class="cell-300" scope="col">发布人</th>
                                </tr>
                                <tbody>
                                <tr class="broadcast-tr" v-for="item in broadCastInfo" :key="item.id" v-if="memberList" @click="goDetail(item.id)">
                                    <td class="broadcast-title">
                                        <span class="broadcast-title-div">
                                            <router-link :to="{name:'broadcast/detail', params: {id: item.id}}">
                                                <span class="">{{item.title}}</span>
                                                <span class="broadcast-top-flag badge badge-outline badge-info ml-20" 
                                                v-if="item.stick">置顶</span>
                                            </router-link>
                                        </span>
                                        <!-- <span class="broadcast-new-flag" v-if="!item.readflag">
                                           NEW
                                        </span> -->
                                    </td>
                                    <td>{{classifyArr.find(classifyArr => classifyArr.id == item.classify).name}}</td>
                                    <td>
                                        <span>{{common.timeProcessing(item.created_at)}}</span>
                                    </td>
                                    <td v-if="memberList[0]">
                                        {{memberList.find(memberList => memberList.id == item.creator.data.id).name}}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                           
                            <div style="margin: 6rem auto;width: 100px" v-if="broadCastInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                            </div>
                             <pagination :current_page="current_page" :method="getSales" :total_pages="total_pages"
                                :total="total"></pagination>
                        </div>
                    </div>
                </div>
            </div>
            <AddModifyBroadCast @refresh='refreshList' />
        </div>
                        

    </div>
</template>

<script>
import fetch from '../../assets/utils/fetch.js'
import common from '../../assets/js/common'
import {mapState} from 'vuex'

export default {
    data(){
        return{
            common: common,
             broadCastInfo:{},
             classifyArr:[],
             memberList:[],
             isLoading:true,
             status:'',
             total: 0,
            current_page: 1,
            total_pages: 1,
            readFlag:2,
        }
          
    },
    created() {
        this.getClassify()

        if (this.userList.length > 0) {
            this.memberList = this.userList
        }
        
    },
    mounted(){

         if(this.$route.path.split('/').pop() === 'receive'){
                this.status = 1
                this.dataInit(2)
            }else if(this.$route.path.split('/').pop() === 'send'){
                this.status = 2
                this.dataInit(2)
            }
    },
    computed: {
        ...mapState([
            'userList'
        ]),
        _userList () {
            return this.userList
        },
        titleHandler(){
            if(this.$route.path.split('/').pop() === 'receive'){
                this.status = 1
                this.dataInit()
                return '我接收的'
            }else if(this.$route.path.split('/').pop() === 'send'){
                this.status = 2
                this.dataInit()
                return '我发布的'
            }
        }
    },
    watch:{
        _userList () {
            this.memberList = this.userList
        }
    },
    methods:{
        getClassify(){
            let _this = this
            fetch('get','/announcements/Classify/').then((params) => {
                _this.classifyArr = params.data
            })
        },
        //初始化数据
        dataInit(params = 2){
            this.readFlag = params
            let _this = this
                fetch('get', '/announcements?include=creator&status='+this.status+'&readflag='+params).then(function (response) {
                    _this.broadCastInfo = response.data
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.isLoading = false
            })
        },
        getSales (pageNum = 1) {
                let _this = this;
                let data = {
                    page: pageNum,
                    include: 'principal,client,expectations',
                };
                Object.assign(data, this.fetchData)
                fetch('get', '/announcements?include=creator&status='+this.status+'&readflag='+this.readFlag).then(function (response) {
                    _this.broadCastInfo = response.data;
                    _this.total = response.meta.pagination.total;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total_pages = response.meta.pagination.total_pages;
                    _this.isLoading = false;
                })
            },            
        // 重新请求
        refreshList(){
            this.dataInit()
        },
        goDetail (id) {
            this.$router.push({
                name: 'broadcast/detail',
                params: {id: id}
            })
        }
    }
}
</script>

<style scoped>
.page{
    position: relative;
    margin-left:260px !important;
}
.broadcast-title{
    display: flex;
}
.broadcast-title-div{
    display: inline-block;
    min-width: 200px;
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.broadcast-top-flag{
    margin-left: 20px;
    color: #00bcd4 !important;
}
.broadcast-new-flag{
    margin-left: 20px;
    color: #F44336;
    font-size: 5px;
}
.loader-overlay{
        margin-left: 80px;
        background-color: rgba(7, 17, 27, 0.2)
}
table tbody tr {
    cursor: pointer;
}
</style>
