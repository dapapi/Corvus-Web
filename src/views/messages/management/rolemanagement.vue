<template>
    <div class="page-main" style="background-color:#f3f4f5">
      <div class="page-header page-header-bordered mb-0">
        <h1 class="page-title">角色管理</h1>
      </div>
       <div class="page-content container-fluid pt-30" >
            <div class="panel col-md-12 clearfix py-5" style="height:520px">
                <div class="col-md-3 float-left" style="height:100%;position: relative;">
                    <div class=" py-20 float-left fuound col-md-12 clearfix" style="border-bottom:1px solid #e3e3e3">
                        <span class="pl-10"  style="color:#3F51B5" data-toggle="modal" data-target="#addRole">
                      <i class="iconfont icon-tianjiarenyuan pr-5" style="font-size:12px"  ></i>
                       <a href="javascript:0;" >新增角色</a> 
                    </span>
                    <span class="pl-30" style="color:#3F51B5" data-toggle="modal" data-target="#addSubgroup" >
                       <i class="iconfont icon-renyuanfenzu pr-5" style="font-size:12px"></i>
                       <a href="javascript:0;">新建分组</a> 
                    </span>
                    </div>
                    <section class="page-aside-section" style=" position: absolute; top:70px;left:0px;">
                    <div class="site-menubar-body" style="width:260px;">
                        <ul  class="menu pl-30">
                        <li class="site-menu-item has-sub  pb-10" v-for="(item,index) in job" :key="index" >
                                <a href="javascript:void(0) " class="p-10" @click="switchMenu(item.value)">
                                <span class="icon md-caret-right font-size-20 mr-10 leftImg" style="position:relative;top:2px" :class="isShow == item.value?'anmite':''"></span>
                                <i class="iconfont icon-renyuan1 pr-10" style="vertical-align: middle;"></i>
                                <span class="site-menu-title">{{item.name}}</span>
                                </a>
                                <div class="drop-parent" style="position: absolute; right:0px;top:0;" v-if="item.value==2">
                                    <i class="icon md-more font-size-24 parent" aria-hidden="true" id="org-dropdown"
                                        data-toggle="dropdown" aria-expanded="false" style="cursor: pointer; float: right;line-height: 40px;">
                                    </i>
                                    <div class="dropdown-menu dropdown-menu-left" aria-labelledby="org-dropdown" role="menu" x-placement="bottom-start" style="min-width: 0;">
                                        <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addRole">新增角色</a>
                                        <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#Rename">重命名</a>
                                        <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#deleteGrouping" >删除分组</a>
                                    </div>
                                </div> 
                                <ul class="administration-subordinate-item m-0" v-show="isShow == item.id" v-for="v in  item.data" :key="v.id" style="position:relative;">
                                <li   v-if="item.value == 1" class="py-10">
                                    <template >
                                        <i class="iconfont icon-renyuan1 pr-10" style="vertical-align: middle;"></i>
                                        <span class="site-menu-title" >{{v.name}}</span>
                                    </template>
                                </li>
                                <li  v-if="item.value == 2" class="py-10">
                                    <template >
                                        <i class="iconfont icon-renyuan1 pr-10" style="vertical-align: middle;"></i>
                                        <span class="site-menu-title" >{{v.name}}</span>
                                    </template>
                                    
                                </li>
                                <div class="drop-son" style="position: absolute; right:10px;top:0px;" v-if="item.value==2" @click="role(v.id)">
                                    <i class="icon md-more font-size-24 son" aria-hidden="true" id="org-dropdown"
                                        data-toggle="dropdown" aria-expanded="false" style="cursor: pointer; float: right;line-height: 40px;">
                                    </i>
                                    <div class="dropdown-menu dropdown-menu-left box" aria-labelledby="org-dropdown" role="menu" x-placement="bottom-start" style="">
                                        <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addMember">添加成员</a>
                                        <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#updateSubgroup">修改角色</a>
                                        <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#moveSubgroup ">移动到分组</a>
                                        <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#deleteRole">删除角色</a>
                                    </div>
                                    </div> 
                                 </ul>
                                </li>
                                </ul>
                            </div>               
                        </section> 
                </div>
                <div class="col-md-9 float-left " style="border-left:1px solid #e3e3e3;height:100%">    
                        <div class="top">
                            <h4 class="float-left" style="line-height:3">子管理员</h4>
                            <span class="float-left pl-10" style="line-height:5.5">全部人员，共1人</span>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate bg-white">
                            <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                                <table class="table table-hover" data-plugin="selectable"  data-selectable="selectable">
                                    <tr style="border-bottom:1px solid #e3e3e3">
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
                                    <tbody>
                                        <tr v-for="item in list" :key="item.id" class="pointer-content">
                                            <td>
                                                <span class="checkbox-custom checkbox-primary">
                                                    <input class="selectable-item" type="checkbox" :id="'row-' + item.id"
                                                        :value="item.id" @change="selectArtists(item.id)">
                                                    <label :for="'row-' + item.id"></label>
                                                </span>
                                            </td>
                                            <td><em></em>{{item.name}}</td>
                                            <td>{{item.phone}}</td>
                                        
                                            <td>{{item.email}}</td>
                                        </tr>
                                    </tbody>        
                                </table>             
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addRole">
            <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
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
                        <Selectors  :placeholder="'职务'" @change="changeRolejob"></Selectors>
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
                    <button class="btn btn-primary" type="submit" >确定</button>
                </div>
                </div>
            </div>
        </div>
         <div class="modal fade" id="addSubgroup" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
        tabindex="-1" >
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
                        <input type="text" class="form-control" placeholder="请输入分组名称" v-model="roleName">
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
        <div class="modal fade" id="moveSubgroup" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
        tabindex="-1" >
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
                        <selectors  class="form-control" placeholder="职务" v-model="roleName"></selectors>
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
        <div class="modal fade" id="updateSubgroup" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
        tabindex="-1" >
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
                        <input type="text" class="form-control" placeholder="请输入角色称" v-model="roleName">
                    </div>
                    </div>
                    <div class="example">
                    <div class="col-md-2 text-right float-left">角色组</div>
                    <div class="col-md-10 float-left pl-0">
                        <Selectors  :placeholder="'职务'" @change="changeRolejob"></Selectors>
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
                    <button class="btn btn-primary" type="submit" >确定</button>
                </div>
            </div>
        </div>
        </div>
          <div class="modal fade" id="Rename" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
        tabindex="-1" >
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
                        <input type="text" class="form-control" placeholder="职务" v-model="roleName">
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
            <div class="modal fade" id="deleteGrouping" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
                tabindex="-1" >
                <div class="modal-dialog modal-simple">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">删除</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-for="item in job" :key="item.id" v-if="item.id==2">
                        <div class="col-md-12  pl-0">
                             <p class="modal-title text-center">确认删除{{item.name}}</p>   
                        </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-danger" type="submit" >确定</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="deleteRole" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
                tabindex="-1" >
                <div class="modal-dialog modal-simple">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">删除</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example" v-for="item in job" :key="item.id" v-if="item.id==2">
                        <div class="col-md-12  pl-0" v-for="v in item.data" :key="v.id" v-if="roleId==v.id">
                             <p class="modal-title text-center">确认删除{{v.name}}</p>   
                        </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-danger" type="submit" >确定</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addMember" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
            tabindex="-1" >
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
                    <button class="btn btn-primary" type="submit" >确定</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            list:[{
                id:1,
                name:'big研究所',
                phone:145255366147,
                email:'gaoyangyi@mttp.cn'
            },{
                id:2,
                name:'big研究所',
                phone:145255366147,
                email:'gaoyangyi@mttp.cn'
            },{
                id:3,
                name:'big研究所',
                phone:145255366147,
                email:'gaoyangyi@mttp.cn'
            },{
                id:4,
                name:'big研究所',
                phone:145255366147,
                email:'gaoyangyi@mttp.cn'
            }],
            job:[ {
                    value:1,
                    id:1,
                    name:'默认',
                    data:[
                        {           
                            value:1,
                            name:'所有者',
                        },
                        {
                            value:1,
                            name:'管理员',
                        }
                    ],
                },
                {
                    value:2,
                    id:2,
                    name:'职务',
                    data:[
                        {
                            id:1,
                            value:2,
                            name:'子管理员1',
                            
                        },
                        {
                            id:2,
                            value:2,
                            name:'子管理员2',
                        },
                        {
                            id:3,
                            value:2,
                            name:'子管理员3',
                        
                        },
                        {
                            id:4,
                            value:2,
                            name:'子管理员4',
                        
                        }
                    ]
                }],
            visible:false,
            roleName:'',
            roleId:'',
            isShow:'0',
            selectedArtistsArr: [],
            isSelectAll:false
        }
    },
    methods:{
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
                    console.log(this.selectedArtistsArr)
                }
            },
            showList () {
                this.visible = !this.visible
            },
            changeRolejob(){

            },
            describe(){

            },
            switchMenu:function(id){
                if(this.isShow == id){
                    this.isShow = 0
                }else{
                    this.isShow = id;
                }
                
            },
            role(value){
              this.roleId=value
            }
    }
}
</script>

<style scoped>

li{
    list-style: none;
}
a{
    text-decoration: none;
     
   
}
.pointer-content em{
    width: 25px;
    height:25px;
    display: inline-block;
    background-image: url('../../assets/head.jpg');
    background-size:25px;
    border-radius: 50%;
    margin: 0 10px;
    vertical-align: middle;
   
}
.anmite{
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	/* IE 9 */
    -moz-transform:rotate(90deg); 	/* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg);
  }
.leftImg{
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
  }
.table tr td{
    color: #333333;
}
.site-menu-item a:hover{
    background: #F5F5F5;
}
.administration-subordinate-item:hover{
    background: #F5F5F5;
    cursor: pointer;
    
}
/* .drop-son{
    display: none;
}
.administration-subordinate-item:hover .drop-son{
    display: block;
} */
.administration-subordinate-item :hover span{
    color: #3F51B5;
} 
.dropdown-item:hover{
    cursor: pointer;
}
</style>

