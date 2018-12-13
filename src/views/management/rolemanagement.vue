<template>
    
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered mb-0">
            <h1 class="page-title">角色管理</h1>
        </div>
        <div class="page-content container-fluid pt-30" >
            <div class="panel col-md-12 clearfix py-5">      
                <div class="col-md-3 float-left ">
                    <div class=" py-20 float-left fuound col-md-12 clearfix" style="border-bottom:1px solid #e3e3e3">
                        <span class="pl-10" style="color:#3F51B5" data-toggle="modal" data-target="#addRole">
                      <i class="iconfont icon-tianjiarenyuan pr-5" style="font-size:12px"></i>
                       <a href="javascript:0;">新增角色</a>
                    </span>
                        <span class="pl-30" style="color:#3F51B5" data-toggle="modal" data-target="#addSubgroup">
                       <i class="iconfont icon-renyuanfenzu pr-5" style="font-size:12px"></i>
                       <a href="javascript:0;">新建分组</a> 
                    </span>
                    </div>
                    <div class="clearfix py-50">
                        <section class="page-aside-section" >
                        <div class="site-menubar-body" style="width:260px;">
                               <!--默认分组-->
                            <ul class="menu pl-30 m-0 ">
                                <li class="site-menu-item has-sub  pb-10" v-for="item in job" :key="item.id">
                                    <a href="javascript:void(0) " class="p-10">
                                        <span class="icon md-caret-right font-size-18 mr-10 leftImg"
                                              style="position:relative;top:2px"
                                              :class="isShow == item.value?'anmite':''"></span>
                                        <i class="iconfont icon-renyuan1 pr-10" style="vertical-align: middle;"></i>
                                        <span class="site-menu-title">{{item.name}}</span>
                                    </a>
                                </li>
                            </ul>
                              <!--渲染分组 -->
                            <ul class="menu pl-30">
                                <li class="site-menu-item has-sub  pb-10" v-for="(item,index) in groupingDate"
                                    :key="index">
                                    <a href="javascript:void(0) " class="p-10" @click="switchMenu(item.id)">
                                        <span class="icon md-caret-right font-size-20 mr-10 leftImg"
                                              style="position:relative;top:2px"
                                              :class="isShow == item.id?'anmite':''"></span>
                                        <i class="iconfont icon-renyuan1 pr-10" style="vertical-align: middle;"></i>
                                        <span class="site-menu-title">{{item.name}}</span>
                                    </a>
                                    <div class="drop-parent" style="position: absolute; right:23px;top:0;"
                                         v-if="item.id" @click="grouping(item.id)">
                                        <i class="icon md-more font-size-20 parent" aria-hidden="true"
                                           data-toggle="dropdown" aria-expanded="false"
                                           style="cursor: pointer; float: right;line-height: 40px;">
                                        </i>
                                        <div class="dropdown-menu dropdown-menu-left" aria-labelledby="org-dropdown"
                                             role="menu" x-placement="bottom-start" style="min-width: 0;">
                                            <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                               data-target="#addRole">新增角色</a>
                                            <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                               data-target="#Rename">重命名</a>
                                            <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                               data-target="#deleteGrouping">删除分组</a>
                                        </div>
                                    </div>
                                    <ul class="administration-subordinate-item m-0" v-for="n in roleDate" :key="n.id" v-show="isShow == item.id">
                                        <li v-if="item.id==n.group_id" class="py-10" 
                                            style="position:relative;" @click="changeCont(n.id)">
                                            <template>
                                                <i class="iconfont icon-renyuan1 pr-10"
                                                   style="vertical-align: middle;"></i>
                                                <span class="site-menu-title">{{n.name}}</span>
                                            </template>
                                            <div class="drop-son" style="position: absolute; right:23px;top:0px;"
                                                 @click="role(n.id)">
                                                <i class="icon md-more font-size-20 son" aria-hidden="true"
                                                   data-toggle="dropdown" aria-expanded="false"
                                                   style="cursor: pointer; float: right;line-height: 40px;">
                                                </i>
                                                <div class="dropdown-menu dropdown-menu-left "
                                                     aria-labelledby="org-dropdown" role="menu"
                                                     x-placement="bottom-start" style="">
                                                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                                       data-target="#addMember" @click="getmemberDate(n.id)">添加成员</a>
                                                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                                       data-target="#updateSubgroup">修改角色</a>
                                                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                                       data-target="#moveSubgroup ">移动到分组</a>
                                                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                                       data-target="#deleteRole">删除角色</a>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </section>
                    </div>
                    
                </div>
              
                <div class="col-md-9 float-left" v-for="item in roleDate" :key="item.id" v-show="item.id==jobCont" style="border-left:1px solid #e3e3e3;">
                    <div class="page-header py-10" >
                        <h5>{{item.name}}<span class=" pl-10"
                                               style="font-weight: 300">全部人员，共{{item.users.data.length}}人</span></h5>

                    </div>
                    <div class="page-content tab-content nav-tabs-animate bg-white" >
                        <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                            <table class="table table-hover" data-plugin="selectable" data-selectable="selectable">
                                <tr>
                                    <th class="w-50">
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox"
                                                   @change="selectArtists('all')">
                                            <label></label>
                                        </span>
                                    </th>
                                    <th class="cell-300" scope="col">姓名</th>
                                    <th class="cell-300" scope="col">手机号</th>
                                    <th class="cell-300" scope="col">邮箱</th>
                                </tr>
                                <tbody style="border-top:1px solid #e3e3e3">
                                <tr v-for="v in item.users.data" :key="v.id" class="pointer-content" >
                                    <td>
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-item" type="checkbox" :id="'row-' + v.id"
                                                   :value="v.id" @change="selectArtists(v.id)">
                                            <label :for="'row-' + v.id"></label>
                                        </span>
                                    </td>
                                    <td><em></em>{{v.name}}</td>
                                    <td>{{v.phone}}</td>
                                    <td>{{v.email}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addRole">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
        <!--新增角色 -->
        <div class="modal fade" id="addRole" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增角色</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">角色名</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入角色称" v-model="roleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">资源类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors :placeholder="'职务'" @change="changeRolejob"
                                           :options="groupingDate"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" @change="describe"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addrole">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--新增分组-->
        <div class="modal fade" id="addSubgroup" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增分组</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">分组名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入分组名称" v-model="groupingName">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addSubgroup">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--移动到分组-->
        <div class="modal fade" id="moveSubgroup" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">移动到分组</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">角色组</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors class="form-control" placeholder="职务" @change="moveGrouping"
                                           :options="groupingDate"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="moverole">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--修改角色-->
        <div class="modal fade" id="updateSubgroup" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">修改角色</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">角色名</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" v-model="updateName" :placeholder="'请输入角色名'">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">角色组</div>
                            <div class="col-md-10 float-left pl-0">
                                <Selectors :placeholder="'职务'" @change="updateRolejob"
                                           :options="groupingDate"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" @change="updateDescribe"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="updaterole">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--重命名-->
        <div class="modal fade" id="Rename" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">重命名</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">角色组</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入分组名称" v-model="updategrouping">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="editgroup">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--删除分组-->
        <div class="modal fade" id="deleteGrouping" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">删除</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-for="item in groupingDate" :key="item.id" v-if="item.id==groupingId">
                            <div class="col-md-12  pl-0">
                                <p class="modal-title text-center">确认删除{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-danger" type="submit" @click="deleteGrouping">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--删除角色-->
        <div class="modal fade" id="deleteRole" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">删除</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-12  pl-0">
                                <p class="modal-title text-center">确认删除</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-danger" type="submit" @click="deleterole">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--添加成员-->
        <div class="modal fade" id="addMember" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">选择成员</h4>
                    </div>
                    <div class="modal-body">
                        <ListSelectMember :listName="'成员列表'" :selectName="'已选择成员'" :type="'change'"></ListSelectMember>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addmember">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import fetch from '../../assets/utils/fetch.js'

    export default {
        data() {
            return {
                job: [{
                    value: 1,
                    id: 1,
                    name: '默认',
                    
                }],
                jobData: [
                        {
                            value: 1,
                            name: '所有者',
                        },
                        {
                            value: 1,
                            name: '管理员',
                        },
                        {
                            value: 1,
                            name: '部门主管',
                        },
                        {
                            value: 1,
                            name: '成员',
                        }
                    ],
                visible: false,
                roleId: '',
                jobCont: '',
                isShow:true,
                selectedArtistsArr: [],
                isSelectAll: false,
                roleDate: '',//数据
                roleName: '',//新增名字
                roleType: '',//新增角色的类别
                roledescribe: '', //新增角色描述
                updateName: '',
                updateType: '',
                updateDes: '',
                movegroupingId: '',
                groupingName: '',//分组名称
                groupingDate: '',
                groupingId: '',
                updategrouping: '',
                memberDate:'',
                rolenameId:''
            }
        },
        mounted() {
            this.getroleDate();
            this.getgroupingDate();
            this.getrolenameId()
            // console.log($('table'));
            $('table').asSelectable();
        },
        methods: {
            //获取角色数据
            getroleDate() {
                let _this = this;
                fetch('get', '/console/role').then(function (response) {
                    _this.roleDate = response.data;
                   console.log(_this.roleDate)
                });
            },
            getrolenameId(){
                console.log(this.roleDate)
                // this.roleDate.forEach(item=>{
                //     this.rolenameId=item.group_id
                // })
                // console.log(this.rolenameId)
            },
            //获取分组数据
            getgroupingDate() {
                let _this = this;
                fetch('get', '/console/group?Accept=application/vnd.Corvus.v1+json').then(function (response) {
                    _this.groupingDate = response.data;
                    console.log(_this.groupingDate)
                });
            },
            //获取成员数据
            getmemberDate(id){
                 let _this=this;
                fetch('get', '/console/person/'+id).then(function (response) {  
                    _this.memberDate = response.data;
                    let datas=[]
                    _this.memberDate.forEach(item=>{
                        item.users.data.forEach(v=>{
                            datas.push(v)
                        })
                    })
                    _this.$store.state.participantsInfo=datas
                })       
             },       
            //全选反选
            selectArtists: function (value) {
                if (value === 'all') {
                    this.selectedArtistsArr = [];
                    for (let i = 0; i < this.list.length; i++) {
                        this.selectedArtistsArr.push(this.list[i].id)

                    }
                    if(this.selectedArtistsArr.length==this.list.length){
                        this.isSelectAll=true;
                    }
                } else {
                    let index = this.selectedArtistsArr.indexOf(value);
                    if (index > -1) {
                        this.selectedArtistsArr.splice(index, 1)
                    } else {
                        this.selectedArtistsArr.push(value)
                    }
                }
            },
            //切换内容
            changeCont(value,id) {
                this.jobCont = value
                this.rolenameId=id
            },
            //获取新增角色的类别
            changeRolejob(value) {
                this.roleType = value
            },
            //获取新增角色的描述
            describe(value) {
                this.roledescribe = value
            },
            //新增角色
            addrole() {
                let _this = this;
                let data = {
                    name: this.roleName,
                    group_id: this.roleType
                }
                fetch('post', '/console/role', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addRole').modal('hide');
                    _this.getroleDate()

                });
            },
            //添加成员
            addmember(){
                let _this=this;
                let data={
                    user:[]
                }
                for (let  i= 0;  i< this.$store.state.participantsInfo.length; i++) {
                    data.user.push(this.$store.state.participantsInfo[i].id)
                    
                }
                fetch('post', '/console/relevancy/'+this.roleId,data).then(function (response) {  
                toastr.success('添加成功');
                $('#addMember').modal('hide');
                _this.getroleDate()
            });
            },
            //修改类型
            updateRolejob(value) {
                this.updateType = value
            },
            //修改描述
            updateDescribe() {

            },
            //修改角色
            updaterole() {
                let _this = this;
                let data = {
                    name: this.updateName,
                    group_id: this.updateType
                }
                fetch('put', '/console/role/' + this.roleId, data).then(function (response) {
                    toastr.success('修改成功');
                    $('#updateSubgroup').modal('hide');
                    _this.getroleDate()

                });
            },
            //删除角色
            deleterole() {
                let _this = this;
                fetch('delete', '/console/role/' + this.roleId).then(function (response) {
                    toastr.success('删除成功');
                    $('#deleteRole').modal('hide');
                    _this.getroleDate()
                });
            },
            moveGrouping(value) {
                this.movegroupingId = value
            },
             //移动角色
            moverole(){
                let _this=this;
                let data={
                    group_id:this.movegroupingId
                }
                fetch('put', '/console/mobile/'+this.roleId,data).then(function (response) {  
                    toastr.success('移动成功');
                    $('#moveSubgroup').modal('hide');
                    _this.getroleDate()
                });
            },
            //新增分组
            addSubgroup() {
                let _this = this;
                let data = {
                    name: this.groupingName
                }
                fetch('post', '/console/group/', data).then(function (response) {
                    toastr.success('删除成功');
                    $('#addSubgroup').modal('hide');
                    _this.getgroupingDate()

                });
            },
            //修改分组
            editgroup() {
                let _this = this;
                let data = {
                    name: this.updategrouping,
                }
                console.log(this.groupingId)
                fetch('put', '/console/group/' + this.groupingId, data).then(function (response) {
                    toastr.success('修改成功');
                    $('#Rename').modal('hide');
                    _this.getgroupingDate()

                });
            },
            //删除分组
            deleteGrouping() {
                let _this = this;
                fetch('delete', '/console/group/' + this.groupingId).then(function (response) {
                    toastr.success('删除成功');
                    $('#deleteGrouping').modal('hide');
                    _this.getgroupingDate()
                });
            },
            switchMenu: function (id) {
                    if (this.isShow == id) {
                        this.isShow = 0;
                    } else {
                        this.isShow = id;
                    }
                     this.visible = !this.visible
            
               
            },
            //删除的名字id获取
            role(value) {
                this.roleId = value
            },
            grouping(value) {
                this.groupingId = value
            }
        }
    }
</script>

<style scoped>

    li {
        list-style: none;
    }

    a {
        text-decoration: none;

    }

    .pointer-content em {
        width: 25px;
        height: 25px;
        display: inline-block;
        background-image: url('../../assets/head.jpg');
        background-size: 25px;
        border-radius: 50%;
        margin: 0 10px;
        vertical-align: middle;

    }

    .anmite {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg); /* IE 9 */
        -moz-transform: rotate(90deg); /* Firefox */
        -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
        -o-transform: rotate(90deg);
    }

    .leftImg {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
    }

    .table tr td {
        color: #333333;
    }

    .site-menu-item a:hover {
        background: #F5F5F5;
    }

    .administration-subordinate-item li:hover {
        background: #F5F5F5;
        cursor: pointer;
    }

    .administration-subordinate-item :hover span {
        color: #3F51B5;
    }

    .dropdown-item:hover {
        cursor: pointer;
    }

    #org-dropdown {
        font-size: 20px !important;
    }

    /* .drop-parent{
        display: none;
    }
    .site-menu-item:hover .drop-parent{
        display: block;
    } */
</style>

