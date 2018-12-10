<template>
    <div class="page-main" style="background-color:#f3f4f5">
      <div class="page-header page-header-bordered mb-0">
        <h1 class="page-title">角色管理</h1>
      </div>
       <div class="page-content container-fluid pt-30" >
            <div class="panel col-md-12 clearfix py-5" style="height:520px">
                <div class="col-md-2  float-left" style="position:relative;">
                    <div class=" py-20 float-left fuound " style="border-bottom:1px solid #e3e3e3">
                        <span data-toggle="modal" data-target="#addTask">
                      <i class="icon md-search" aria-hidden="true"></i>
                       <a href="javascript:0;" >新增角色</a> 
                    </span>
                    <span class="pl-20">
                       <i class="icon md-search" aria-hidden="true"></i>
                       <a href="javascript:0;">新建分组</a> 
                    </span>
                    </div>
                    
                    
                        <!-- <div class="drop-son" style="position: absolute; right:10px;top:-10px;">
                            <i class="icon md-more font-size-24" aria-hidden="true" id="org-dropdown"
                                data-toggle="dropdown" aria-expanded="false" style="cursor: pointer; float: right;line-height: 40px;">
                            </i>
                            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="org-dropdown" role="menu" x-placement="bottom-start" style="min-width: 0">
                                <a class="dropdown-item" role="menuitem">添加成员</a>
                                <a class="dropdown-item" role="menuitem">修改角色</a>
                                <a class="dropdown-item" role="menuitem">移动到分组</a>
                                <a class="dropdown-item" role="menuitem">删除角色</a>
                            </div>
                        </div>  -->
                <section class="page-aside-section" >
                    <div class="site-menubar-body" style="position:relative;left:-150px;top:70px; width:260px;">
                        <ul  class="menu pl-30">
                        <li class="site-menu-item has-sub pt-10" v-for="(item,index) in job" :key="index" @click="switchMenu(item.value)">
                                <a href="javascript:void(0)">
                                <span class="icon md-caret-right font-size-20 mr-10 leftImg" style="position:relative;top:2px" :class="isShow == item.value?'anmite':''"></span>
                                <span class="icon md-file-text font-size-18 mr-10" style=" vertical-align: middle"></span>
                                <span class="site-menu-title">{{item.name}}</span>
                                </a>
                               <ul class="site-menu-sub" v-show="isShow == item.id">
                                    <li class="site-menu-item" v-for="item2 in  item.data" :key="item2.id">
                                        <router-link v-if="item.value == '1'" >
                                            <span class="icon md-file-text font-size-18 mr-10"></span>
                                            <span class="site-menu-title" >{{item2.name}}</span>
                                        </router-link>
                                    </li>
                                </ul>
                                <ul class="site-menu-sub" v-show="isShow == item.id">
                                    <li class="site-menu-item" v-for="item2 in  item.data" :key="item2.id">
                                        <router-link v-if="item.value == '2'" >
                                            <span class="icon md-file-text font-size-18 mr-10"></span>
                                            <span class="site-menu-title" >{{item2.name}}</span>
                                        </router-link>
                                    </li>
                                </ul>
                        </li>
                        </ul>
                         <!-- <div class="drop-parent " style="position: absolute; right:10px;top:0;">
                            <i class="icon md-more font-size-24" aria-hidden="true" id="org-dropdown"
                                data-toggle="dropdown" aria-expanded="false" style="cursor: pointer; float: right;line-height: 40px;">
                            </i>
                            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="org-dropdown" role="menu" x-placement="bottom-start" style="min-width: 0">
                                <a class="dropdown-item" role="menuitem">新增角色</a>
                                <a class="dropdown-item" role="menuitem">重命名</a>
                                <a class="dropdown-item" role="menuitem">删除角色</a>
                            </div>
                        </div> -->
                    </div>      
                </section>
                    
                  
                </div>
                <div class="col-md-9 float-left ml-20" style="border-left:1px solid #e3e3e3">    
                        <div class="top">
                            <h4 class="float-left" style="line-height:3">子管理员</h4>
                            <span class="float-left pl-10" style="line-height:5.5">全部人员，共1人</span>
                        </div>
                        <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="selectable"
                               data-selectable="selectable" >
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
        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addTask">
      <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
        <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
        <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
      </button>
    </div>
    <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
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
            job: [ {
                    value:1,
                    name:'默认',
                    data:[
                        {
                            value:1,
                            name:'所有者',
                        },
                        {
                            value:2,
                            name:'管理员',
                        }
                    ]
                },
                {
                    value:2,
                    name:'职务',
                    data:[
                        {
                            value:1,
                            name:'子管理员',
                          
                        },
                        {
                            value:2,
                            name:'子管理员',
                        },
                        {
                            value:3,
                            name:'子管理员',
                        
                        },
                        {
                            value:4,
                            name:'子管理员',
                        
                        }
                    ]
                }],
            visible:false,
            roleName:'',
            isShow:'0'
        }
    },
    methods:{
            selectArtists: function (value) {
                    // console.log(value)
                if (value === 'all') {
                    this.selectedArtistsArr = [];
                    for (let i = 0; i < this.list.length; i++) {
                        this.selectedArtistsArr.push(this.list[i].id)
                    }
                } else {
                    // console.log(this.selectedArtistsArr)
                    let index = this.selectedArtistsArr.indexOf(value);
                    if (index > -1) {
                        this.selectedArtistsArr.splice(index, 1)
                    } else {
                        this.selectedArtistsArr.push(value)
                    }
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
/* .drop-parent{
    display: none;
}
.defaultTow:hover .drop-parent {
    display: block;
} */
</style>

