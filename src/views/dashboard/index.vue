<template>
    <div class="page page-aside-left">
        <div class="page-aside">
            <div class="page-aside-switch">
                <i class="wb-chevron-left" aria-hidden="true"></i>
                <i class="wb-chevron-right" aria-hidden="true"></i>
            </div>
            <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical"
                 style="position: relative;">
                <div data-role="container" class="scrollable-container" style="height: 691px; width: 259px;">
                    <div data-role="content" class="scrollable-content" style="width: 259px;">
                        <section class="page-aside-section">
                            <h5 class="page-title pl-30 mb-20">仪表盘</h5>

                                <div class="level" :class="`level-${menu.level}`" v-for="(menu,index) in urlData" :key="index">
                                    <div class="list-group-item " v-if="menu.type ==='link'" @click="toggle(menu.id,menu.name)" :class="selectId == menu.id?'selected':''"> 
                                        <router-link class="link"   :class="menu.level>1?'pl-15':''"  :to="{ path:'/dashboard', query: {id: menu.id,name:menu.name} }">
                                        {{menu.name}}
                                        </router-link>     
                                    </div>
                                    <div class="drop-parent" style="position: absolute; right:30px;top:5px;">
                                        <i class="iconfont icon-gengduo1 font-size-20 parent" aria-hidden="true"
                                        data-toggle="dropdown" aria-expanded="false"
                                        style="cursor: pointer; float: right;line-height: 40px;" @click="getMembers(menu.id)">
                                        </i>
                                        <div class="dropdown-menu dropdown-menu-left" aria-labelledby="org-dropdown"
                                            role="menu" x-placement="bottom-start" style="min-width: 0;">
                                            <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                            data-target="#Editor" @click="getDashboardid(menu.id)">查看</a>
                                        </div>
                                    </div>
                                </div>
                        </section>
                    </div>
                </div>
                <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false">
                    <div class="scrollable-bar-handle"></div>
                </div>
            </div>
        </div>
        
        <router-view/>
        <!-- 新建仪表盘 -->
         <!-- <div class="modal fade" id="dashboard" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新建仪表盘</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">部门</div>
                            <div class="col-md-10 float-left pl-0">
                                 <Selectors @change="department"
                                            :placeholder="'研发管理部'"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">名称</div>
                            <div class="col-md-10 float-left pl-0">
                                 <input type="text" class="form-control" v-model="dashboardName" :placeholder="'研发管理部仪表盘'">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">仪表盘描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" 
                                          v-model="dashboard_describe" ></textarea>
                            </div>
                        </div>
                         <div class="example">
                            <div class="col-md-2 text-right float-left">成员</div>
                            <div class="col-md-10 float-left pl-0">
                                
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" >确定</button>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- 编辑仪表盘 -->
         <div class="modal fade" id="Editor" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">查看</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">部门</div>
                            <div class="col-md-10 float-left pl-0">
                                <!-- <Selectors @change="department"
                                            :placeholder="'研发管理部'"></Selectors> -->
                                {{Department_name}}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">名称</div>
                            <div class="col-md-10 float-left pl-0">
                                 <!-- <input type="text" class="form-control" v-model="dashboardName" :placeholder="'研发管理部仪表盘'"> -->
                                 {{Dashboardname}}
                            </div>
                        </div>
                        <!-- <div class="example">
                            <div class="col-md-2 text-right float-left">仪表盘描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" 
                                          v-model="dashboard_describe" ></textarea>
                            </div>
                        </div> -->
                         <div class="example">
                            <div class="col-md-2 text-right float-left">成员</div>
                            <div class="col-md-10 float-left pl-0">
                                <a class="avatar" href="javascript:void(0)" v-for="item in MembersDate" :key="item.id">
                                    <Avatar :imgUrl="item.icon_url" style="margin-right: 10px; "/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" >确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--删除仪表盘-->
        <!-- <div class="modal fade" id="Delete" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-12  pl-0">
                                <p class="modal-title text-center">是否确定删除?</p>
                                <p class="modal-title text-center">确定删除后将不会恢复</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-danger" type="submit" >确定</button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import fetch from '../../assets/utils/fetch.js'
    export default {
        name: "home",
        data() {
            return {
                urlData: [],
                departmentDate:'',//仪表盘部门值
                dashboardName:'',//仪表盘名称
                dashboard_describe:'',//仪表盘描述
                Dashboardname:'',
                Department_name:'',
                dashboardId:'',
                MembersDate:''
            }
        },
        computed:{
            ...mapState([
                'dashboardList',
                'selectId'
            ]) , 
          
        },
        watch:{
            dashboardList:function(){
                this.getList()
                if(this.dashboardList){
                    this.getid(this.dashboardList[0].id)
                }
            
                
            }
        },
        created(){
            this.getList()
            this.getDashboard()
           
        },
        // mounted(){

           
        // },
        methods:{
             ...mapActions([
               
                'getDashboard'
            ]),
            department:function(value){
                this.departmentDate = value
            },
            getList:function(){
                let data={}
                for (let t = 0; t < this.dashboardList.length; t++) {
                    data={
                        id:`${this.dashboardList[t].id}`,
                        name:`${this.dashboardList[t].name}`,
                        url:'/dashboard/'+ this.dashboardList[t].id,
                        type:'link',
                        level:2,
                        isExpanded:false,
                        isSelected:false,
                        department_name:this.dashboardList[t].department_name,
                    }
                    this.urlData.push(data)    
                }
            },
            toggle :function(id,name){
                this.$router.push({
            　　　　path: '/dashboard', query:{id:id,name:name}

            　　 });
                this.getid(id)
            },
            getDashboardid:function(id){
                this.urlData.forEach(item=>{
                    if(item.id == id){
                        this.Dashboardname = item.name
                        this.Department_name = item.department_name
                        console.log(item)
                    }
                    
                }) 
            },
            getid:function(id){
                
                // let url = location.search.split('?')[1].split('&')[0].split('=')[1]
                // console.log(url)
                // if(url){
                //    this.$store.dispatch('changeselectId',url) 
                // }
                this.urlData.forEach(item=>{
                     if(item.id == id){
                          this.$store.dispatch('changeselectId',item.id)
                     }
                    
                 })
                
            },
            getMembers:function(id){
                let _this = this
                 fetch('get', '/departments/'+id +'/users').then(function (response) { 
                     _this.MembersDate = response.data 
                })
            }
        }
    }
</script>

<style scoped>
     a{
        text-decoration: none;
        color:#333
    }
    .link,.button{
        display: block;
        /* padding:10px 15px; */
        transition: background-color 0.2s ease-in-out 0s, color 0.3s ease-in-out 0.1s;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        position: relative;
    }
    .selected {
       background-color:#eee
    }
    .level{
        position: relative;
    }
    .scrollable-container{
        position: fixed;
    }
</style>
