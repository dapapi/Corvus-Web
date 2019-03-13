<template>
    <div class="page" @click='departmentShow = false'>
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
            <h1 class="page-title">知识库&nbsp;&nbsp;({{broadCastInfo.length}})</h1>
            <div class="department-picker" @click.stop="departmentShow = !departmentShow">
                选择部门 
                <i class="icon"
                    :class=" departmentShow?'iconfont icon-xiangshangjiantou':'iconfont icon-xiajiantou'"></i>
                <DepartmentPicker @departmentsget='departmentsGet' v-show="departmentShow"/>
            </div>
        </div> 
        
        <div class="page-content container-fluid">
            <div class="panel " id="">
                <div class="panel-body">
                    <div class="">
                        <div class="table-responsive">
                            <table class="table table-hover" data-role="content" data-plugin="selectable" data-row-selectable="true">
                                <thead class="">
                                <tr>
                                    <td class="broadcast-title"><i class="iconfont icon-T"></i><strong>标题</strong>
                                    </td>
                                    <td>
                                    </td>
                                    <td></td>
                                    <td>
                                        <strong>发布时间</strong>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <strong>发布人</strong>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="broadcast-tr" v-for="item in broadCastInfo" :key="item.id" v-if="memberList">
                                    <td class="broadcast-title">
                                        <span class="broadcast-title-div">
                                            <router-link :to="{name:'knowledgebase/detail', params: {id: item.id}}">
                                                <span class="">{{item.title}}</span>
                                            </router-link>
                                        </span>
                                        <span class="broadcast-top-flag badge badge-outline badge-info" 
                                            v-if="item.stick">置顶</span>
                                        <span class="broadcast-new-flag" v-if="!item.readflag">
                                            <strong>NEW</strong>
                                        </span>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <span>{{item.created_at}}</span>
                                        <i class="iconfont icon-shijian ml-10" aria-hidden="true"></i>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td v-if="memberList[0]">
                                        {{memberList.find(memberList => memberList.id == item.creator.data.id).name}}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div style="margin: 6rem auto;width: 100px" v-if="broadCastInfo.length === 0">
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
import {mapState} from 'vuex'

export default {
    data(){
        return{
             broadCastInfo:{},
             classifyArr:config.classifyArr,
             memberList:[],
             isLoading:true,
             departmentShow:false,

        }
          
    },
    created() {
        if (this.userList.length > 0) {
            this.memberList = this.userList
        }
        this.dataInit()    
    },
    computed: {
        ...mapState([
            'userList'
        ]),
        _userList () {
            return this.userList
        }
    },
    mounted(){
    },
    watch:{
        _userList () {
            this.memberList = this.userList
        }
    },
    methods:{
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
        },
        departmentsGet(params){
            console.log(params);
        },
        
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
}
.loader-overlay{
        margin-left: 100px;
        background-color: rgba(7, 17, 27, 0.2)
}
.department-picker{
    position: absolute;
    right: 65px;
    bottom: 5px;
    cursor: pointer;
    width:112px;
    height:40px;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);

}
</style>
