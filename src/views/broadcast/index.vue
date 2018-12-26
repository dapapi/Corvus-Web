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
            <h1 class="page-title">公告&nbsp;&nbsp;({{broadCastInfo.length}})</h1>
        </div> 
        <div class="page-content container-fluid">
            <div class="panel " id="">
                <div class="panel-body">
                    <div class="">
                        <div class="table-responsive">
                            <table class="table table-hover" data-role="content" data-plugin="selectable" data-row-selectable="true">
                                <tr>
                                    <th class="cell-300" scope="col"><i class="iconfont icon-T"></i> 标题</th>
                                    <th class="cell-300" scope="col">分类</th>
                                    <th class="cell-300" scope="col">发布时间</th>
                                    <th class="cell-300" scope="col">发布人</th>
                                </tr>
                                <tbody>
                                <tr class="broadcast-tr" v-for="item in broadCastInfo" :key="item.id" v-if="memberList">
                                    <td class="broadcast-title">
                                        <span class="broadcast-title-div">
                                            <router-link :to="{name:'broadcast/detail', params: {id: item.id}}">
                                                <span class="">{{item.title}}</span>
                                            </router-link>
                                        </span>
                                        <span class="broadcast-top-flag badge badge-outline badge-info" 
                                            v-if="item.stick">置顶</span>
                                        <span class="broadcast-new-flag" v-if="!item.readflag">
                                           NEW
                                        </span>
                                    </td>
                                    <td>{{classifyArr.find(classifyArr => classifyArr.value == item.classify).name}}</td>
                                    <td>
                                        <span>{{item.created_at}}</span>
                                    </td>
                                    <td v-if="memberList[0]">
                                        {{memberList.find(memberList => memberList.id == item.creator.data.id).name}}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="broadCastInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                            </div>
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
import config from '../../assets/js/config'
import {mapState, mapActions} from 'vuex'

export default {
    data(){
        return{
             broadCastInfo:{},
             classifyArr:config.classifyArr,
             memberList:[],
             isLoading:true,
        }
          
    },
    created() {
        if (this.userList.length === 0) {
            this.getUserList()
        } else {
            this.memberList = this.userList
        }
        this.dataInit()    
    },
    mounted(){
    },
    computed: {
        ...mapState([
            'userList'
        ]),
        _userList () {
            return this.userList
        }
    },
    watch:{
        _userList () {
            this.memberList = this.userList
        }
    },
    methods:{
        ...mapActions([
            'getUserList'
        ]),
        //初始化数据
        dataInit(){
            let _this = this
                fetch('get', '/announcements?include=creator').then(function (response) {
                    _this.broadCastInfo = response.data
                    _this.isLoading = false
            })
        },
        // 重新请求
        refreshList(){
            this.dataInit()
        }
    }
}
</script>

<style scoped>
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
    color: #3298DC !important;
}
.broadcast-new-flag{
    margin-left: 20px;
    color: #F44336;
    font-size: 5px;
}
.loader-overlay{
        margin-left: 100px;
        background-color: rgba(7, 17, 27, 0.2)
}
</style>
