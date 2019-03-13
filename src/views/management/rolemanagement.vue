<template>
    
    <div class="page-main" style="background-color:#f3f4f5">
         <Loading :is-loading="isLoading" style="margin-left:200px"></Loading>
        <div class="page-header page-header-bordered mb-0">
            <h1 class="page-title">角色管理</h1>
        </div>
        <div class="page-content container-fluid pt-30">
            
            <div class="panel col-md-12 clearfix py-5">
                <div class="col-md-3 float-left ">
                    <div class=" py-20 px-0 float-left fuound col-md-12 clearfix"
                         style="border-bottom:1px solid #e3e3e3">
                        <span class="pl-0" style="color:#3F51B5" data-toggle="modal" data-target="#addRole">
                            <i class="iconfont icon-tianjiarenyuan pr-5" style="font-size:12px"></i>
                            <a href="javascript:0;">新增角色</a>
                        </span>
                        <span class="pl-60" style="color:#3F51B5" data-toggle="modal" data-target="#addSubgroup">
                            <i class="iconfont icon-renyuanfenzu pr-5" style="font-size:12px"></i>
                            <a href="javascript:0;">新建分组</a> 
                        </span>
                    </div>
                    <div class="clearfix py-50">
                        
                        <section class="page-aside-section">
                            <div class="site-menubar-body" style="width:260px;">
                                <!--渲染分组 -->
                                <ul class="menu pl-0">
                                    <li class="site-menu-item has-sub  pb-10" v-for="(item,index) in groupingDate"
                                        :key="index" style="width:260px;">
                                        <a href="javascript:void(0) " class="p-10" @click="switchMenu(item.id)" >
                                            <i v-show="visible"
                                               class="iconfont icon-plus-select-down showList font-size:25px pr-10"></i>
                                               <span class="icon md-caret-right font-size-20 mr-10 leftImg " :class="switchId.includes(item.id)?'anmite':''"></span>
                                            <i class="iconfont icon-chengyuannew pr-10"
                                               style="vertical-align: middle;"></i>
                                            <span class="site-menu-title">{{item.name}}</span>
                                        </a>
                                        <div class="drop-parent" style="position: absolute; right:23px;top:0;"
                                             v-if="item.id" @click="grouping(item.id)" v-show="index!==0">
                                            <i class="iconfont icon-gengduo1 font-size-20 parent" aria-hidden="true"
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
                                        
                                        <ul class="administration-subordinate-item m-0" v-for="n in roleDate"
                                            :key="n.id" >
                                            <li  v-show="item.id==n.group_id && switchId.includes(n.group_id)"
                                                class="p-10"
                                                style="position:relative;" @click="changeCont(n.id,index)"
                                                :class="n.id==jobCont?'back':''">
                                                <template >
                                                    <i class="iconfont icon-chengyuannew pr-10"
                                                       style="vertical-align: middle;"></i>
                                                    <span class="site-menu-title">{{n.name}}</span>
                                                </template>
                                                <div class="drop-son" style="position: absolute; right:23px;top:0px;"
                                                     @click="role(n.id)" v-if="n.group_id!==1994731356">
                                                    <i class="iconfont icon-gengduo1 font-size-20 son"
                                                       aria-hidden="true"
                                                       data-toggle="dropdown" aria-expanded="false"
                                                       style="cursor: pointer; float: right;line-height: 40px;">
                                                    </i>
                                                    <div class="dropdown-menu dropdown-menu-left "
                                                         aria-labelledby="org-dropdown" role="menu"
                                                         x-placement="bottom-start" style="">
                                                        <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                                           data-target="#addMember"
                                                           @click="getmemberDate(n.id)">添加成员</a>
                                                        <a class="dropdown-item" role="menuitem" data-toggle="modal"
                                                           data-target="#updateSubgroup"
                                                           @click="Modifyingroles(n.id,item.id)">修改角色</a>
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
                <div class="col-md-9 float-left" v-for="item in roleDate" :key="item.id" v-show="item.id==jobCont"
                     style="border-left:1px solid #e3e3e3;">
                    <div class="page-header py-10">
                        <h5>{{item.name}}<span class=" pl-10"
                                               style="font-weight: 300" v-if="item.group_id!==1994731356">全部人员，共{{item.users.data.length}}人</span><span class=" pl-10" style="font-weight:300;color:#999999;font-size:12px;" v-if="item.group_id==1994731356">系统默认角色，此处仅显示企业组织架构中已设置的“部门主管”</span>
                        </h5>

                    </div>
                    <div class="col-md-12">
                        <ul class="nav nav-tabs nav-tabs-line" role="tablist" ref="tableft">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link " :class="isAactive?'active':''" data-toggle="tab" :href="'#forum-member'+ item.id"
                                   aria-controls="forum-base"
                                   aria-expanded="true" role="tab">角色成员</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" :href="'#forum-authority'+ item.id"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab" v-if="item.group_id!==1994731356">功能权限</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" :href="'#forum-scope'+ item.id"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab" v-if="item.group_id!==1994731356">数据范围</a>
                            </li>
                        </ul>
                    </div>
                    <div class="page-content tab-content nav-tabs-animate bg-white pt-20">
                        <div class="tab-pane animation-fade " :class="isAactive?'active':''" :id="'forum-member'+item.id" role="tabpanel">
                            <!-- <span style="font-weight:300;color:#999999;font-size:12px;" v-if="item.group_id==1994731356">如需添加“部门主管”，请到【成员管理】页面，在【编辑部门】中设置“部门主管”，设置完成后自动同步。</span> -->
                            <table class="table table-hover" data-plugin="selectable" data-selectable="selectable">
                               
                                <tr>
                                    <th class="w-50" v-if="item.group_id!==1994731356">
                                       <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox"
                                                   @change="selectArtists('all',item.id)">
                                            <label></label>
                                        </span>

                                    </th>
                                    <th class="cell-300" scope="col">姓名</th>
                                    <th class="cell-300" scope="col">手机号</th>
                                    <th class="cell-300" scope="col">邮箱</th>
                                </tr>
                                <tbody style="border-top:1px solid #e3e3e3" v-if="item.group_id==1994731356">
                                <tr v-for="v in defaultDate" :key="v.id" class="pointer-content">
                                    <td>
                                        <Avatar :imgUrl="v.icon_url"
                                                style="margin-right: 10px; width: 28px;height: 28px;"/>
                                        {{v.name}}
                                    </td>
                                    <td>{{v.phone}}</td>
                                    <td>{{v.email}}</td>
                                </tr>
                                </tbody>
                                <tbody style="border-top:1px solid #e3e3e3" v-if="item.group_id!==1994731356">
                                <tr v-for="v in item.users.data" :key="v.id" class="pointer-content">
                                     <td>
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-item" type="checkbox" :id="'row-' + v.id"
                                                   :value="v.id" @change="selectArtists(v.id)">
                                            <label :for="'row-' + v.id"></label>
                                        </span>
                                    </td>
                                    <td>
                                        <Avatar :imgUrl="v.icon_url"
                                                style="margin-right: 10px; width: 28px;height: 28px;"/>
                                        {{v.name}}
                                    </td>
                                    <td>{{v.phone}}</td>
                                    <td>{{v.email}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <pagination :current_page="current_page" :method="getDefaultDate"
                                        :total_pages="total_pages"
                                        :total="total" v-if="item.group_id==1994731356"></pagination>
                        </div>
                        <div class="tab-pane animation-fade selectable-wrap" :id="'forum-authority'+item.id"
                             role="tabpanel"
                             data-plugin="selectable" data-selectable="selectable">
                            <div class="title py-20"
                                 style="color:#999999;font-size:12px;font-weight:300;position: relative;">
                                设置角色对应到功能操作、应用管理、后台管理权限
                                <div style="font-weight:600;position:absolute;right:10px;top:9px;">
                                     <span class="checkbox-custom checkbox-primary pr-10">
                                            <input class="selectable-all" id="selectAll" type="checkbox"
                                                   @change="selectedAll">
                                            <label for="selectAll">全选</label>
                                    </span>
                                </div>
                            </div>
                            <table class="table table-hover">
                                <tbody>
                                <tr class="pointer-cont" style="border:1px solid #e3e3e3;" v-for="item in powerDate"
                                    :key="item.id">
                                    <td class="cell-200" style="border:1px solid #e3e3e3;position: relative;">
                                        <div class="power-cont text-left">
                                            <span class="checkbox-custom checkbox-primary" style="">
                                            <input class="selectable-item" type="checkbox" :id="'row-' + item.id"
                                                   :value="item.id" @change="selectAllItem"
                                                   v-model="item.selected">
                                            <label :for="'row-' + item.id">{{item.name}}</label>
                                            </span>
                                        </div>
                                    </td>

                                    <td style="display:flex;flex-wrap:wrap;" class="cell-600" scope="col">
                                        <div v-for="one in item.data" :key="one.id" class="text-left pl-10"
                                             style="width:33%;">
                                            <span class="checkbox-custom checkbox-primary" style="">
                                            <input class="selectable-item" type="checkbox" :id="'row-' + one.id"
                                                   :value="one.id" v-model="one.selected" @change="selectedItem">
                                            <label :for="'row-' + one.id">{{one.name}}</label>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                <button class="btn btn-primary m-20 px-30" type="submit" @click="powerkeep"
                                        style="border-radius: 20px">保存
                                </button>
                            </table>
                        </div>
                        <div class="tab-pane animation-fade " :id="'forum-scope'+item.id" role="tabpanel">
                            <div class="title py-20" style="color:#999999;font-size:12px;font-weight:300;">
                                针对审批、考勤、简报、销售等应用、设置该查看、管理数据范围
                            </div>
                            <table class="table" data-plugin="selectable" data-selectable="selectable">
                                <tr>
                                    <th class="cell-300 pl-0" scope="col">应用名</th>
                                    <th class="cell-300" scope="col">查看数据范围</th>
                                    <th class="cell-300" scope="col">管理数据范围</th>
                                </tr>
                                <tbody>
                                <tr class="pointer-content" style="border-top:1px solid #e3e3e3"
                                    v-for="(item,index) in rangeDate" :key="index">
                                    <td style="font-weight:400;position: relative;">
                                        <div class="range-cont">{{item.name}}</div>
                                    </td>
                                    <td>
                                        <form action="">
                                            <div v-for="(v,i) in item.data1" :key="i">
                                                <input type="radio" class="mr-10" @click="radioed(v,item)" name='radio'
                                                       :value="index+v.id" :checked="v.selected">{{v.name}}
                                            </div>
                                        </form>
                                    </td>
                                    <td style="color:#333">
                                        <div v-for="(n,m) in item.data2" :key="m">
                                            <input type="checkbox" @click="checked(n,item)" :name="item.id"
                                                   :checked="n.selected" class="mr-10">{{n.name}}
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                <button class="btn btn-primary m-20 px-30" type="submit" @click="rangekeep"
                                        style="border-radius: 20px">保存
                                </button>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addRole">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
            </button>
        </div>
        <!--新增角色 -->
        <div class="modal fade" id="addRole" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增角色</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example label-center">
                            <div class="col-md-2 text-right float-left ">角色名</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入角色称" v-model="roleName">
                            </div>
                        </div>
                        <div class="example  label-center">
                            <div class="col-md-2 text-right float-left ">资源类型</div>
                            <div class="col-md-10 float-left pl-0" >
                                <Selectors @change="changeRolejob"
                                           :options="selectgroupingDate" ref="resourceType" ></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" v-model="emptydescribe"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancelrole">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addrole">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--新增分组-->
        <div class="modal fade" id="addSubgroup" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
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
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">移动到分组</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">角色组</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors class="form-control" @change="moveGrouping"
                                           :options="selectgroupingDate"></selectors>
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
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
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
                                <Selectors @change="updateRolejob"
                                           :options="selectgroupingDate" ref="roleGroup"></Selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" 
                                          v-model="emptyrole_describe" ></textarea>
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
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
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
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">删除</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
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
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
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
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
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
    import data from './data.json'

    export default {
        data() {
            return {
                job: [{
                    value: 1,
                    name: '默认',

                }],
                jobData: [
                    {
                        id: 1,
                        name: '所有者',
                    },
                ],
                visible: false,//渲染部分隐藏显示管理
                conceal: true,//默认部分隐藏显示管理
                roleId: '',
                jobCont: '358554270',
                isShow: true,
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
                memberDate: '',
                radio: [],
                radiotow: '7',
                check: '',
                defaultId: '0',
                defaultpitchon: '1',
                funDate: data,
                switchId: ['1994731356'],
                rolepower: [],
                powerDate: [],
                powerInfo: [],
                rangeDate: '',
                rangecheck: [],
                picked: [],
                selected: [],
                funArr: [],
                owmArr: [],
                scope: [],
                rangeoneId: '',
                rangetowId: [],
                powerId: [],
                sendData: [],//改变的值
                checkBox: [],
                checkarr: [],
                selectedIds: [],
                panelName: '',
                emptydescribe: '',
                modifyName: '',
                roleGroupId: '',
                rolegroupName: '',
                emptyrole_describe: '',
                isAactive:true,
                idArray:[],
                defaultDate:'',
                selectgroupingDate:[],
                isLoading:true,
                total: 0,
                current_page: 1,
                total_pages: 1,
            }
        },
        mounted() {
            this.getroleDate();
            this.getgroupingDate();
            this.getDefaultDate();
            $('#addRole').on('hidden.bs.modal', function () {
                this.roleName = "请输入角色称"
            })
        },
        updated() {
            $('.selectable-wrap').asSelectable();
            $('.table').asSelectable();
        },

        methods: {
            //获取角色数据
            getroleDate() {
                let _this = this;
                fetch('get', '/console/role').then(function (response) {
                    console.log(response)
                    _this.roleDate = response.data;
                    _this.isLoading = false
                });
            },
            //获取默认数据
            getDefaultDate(page = 1){
                let _this = this;
                fetch('get','/console/director',{
                     page:page
                 }).then(function(resouce){
                     console.log(resouce)
                    _this.defaultDate = resouce.data
                    _this.current_page = parseInt(resouce.meta.pagination.current_page);
                    _this.total = resouce.meta.pagination.total;
                    _this.total_pages = resouce.meta.pagination.total_pages;
                })
            },
            //获取分组数据
            getgroupingDate() {
                let _this = this;
                fetch('get', '/console/group?Accept=application/vnd.Corvus.v1+json').then(function (response) {
                   
                    _this.groupingDate = response.data;
                    response.data.forEach(item=>{
                       _this.idArray.push(item.id) 
                    })
                    _this.groupingDate.map(item=>{
                        if(item.id!==1994731356){
                           _this.selectgroupingDate.push(item) 
                        }
                    })
                });
                
            },
            //获取成员数据
            getmemberDate(id) {
                let _this = this;
                fetch('get', '/console/person/' + id).then(function (response) {
                     console.log(response)
                    _this.memberDate = response.data;
                    let datas = []
                    _this.memberDate.forEach(item => {
                        item.users.data.forEach(v => {
                            datas.push(v)
                        })
                    })
                    _this.$store.state.participantsInfo = datas
                })
            },
            //切换内容
            changeCont(value,index) {
                this.jobCont = value
                this.selectedIds = []
                this.defaultId = index
                fetch('get', '/console/feature/' + this.jobCont).then(response => {
                    this.powerlist = [];
                    for (this.powerlist in response) {

                        let selectedLength = 0;
                        response[this.powerlist].data.forEach(item => {
                            if (item.selected) {
                                this.powerId.push(item.id)
                                this.funArr.push(item.id)
                                selectedLength += 1;
                                this.selectedIds.push(item.id)
                            } else {
                                item.selected = false
                            }
                        });
                        if (selectedLength === response[this.powerlist].data.length && response[this.powerlist].length > 0) {
                            response[this.powerlist].selected = true;
                        } else {
                            response[this.powerlist].selected = false;
                        }
                    }
                    this.powerDate = response;
                    let list = [];
                    let item = [];
                    for (list in this.powerDate) {
                        let selectedLength = 0;
                        for (item in this.powerDate[list].data) {
                            if (this.powerDate[list].data[item].selected) {
                                selectedLength += 1
                            }
                        }
                        if (selectedLength === this.powerDate[list].data.length) {
                            this.powerDate[list].selected = true
                        } else {
                            this.powerDate[list].selected = false
                        }
                    }

                });
                this.sendData = [];
                fetch('get', '/console/scope/' + this.jobCont).then(response => {
                    this.rangeDate = response;
                    this.rangelist = [];
                    let i = 0;
                    for (this.rangelist in response) {

                        let obj = {
                            resource_id: response[this.rangelist].id,
                            scope: '',
                            manage: []
                        }
                        response[this.rangelist].data1.forEach(item => {

                            if (item.selected) {
                                obj.scope = item.id
                                this.picked = this.rangeDate[this.rangelist].id.toString() + item.id
                            }
                        })
                        response[this.rangelist].data2.forEach(v => {

                            if (v.selected) {
                                obj.manage.push(v.id)

                                this.scope.push(response[this.rangelist].id.toString() + v.id)
                            }
                        })
                        if (response[this.rangelist].data1.length !== 0 || response[this.rangelist].data2.length !== 0) {
                            this.sendData.push(obj)
                        }

                        i++;
                    }

                })


            },
            powerkeep() {
                fetch('post', '/console/feature/' + this.jobCont, {resouce: this.selectedIds}).then(function (response) {
                    toastr.success('保存成功');
                })
            },
            rangekeep() {
                fetch('post', '/console/scope/' + this.jobCont, this.sendData).then(function (response) {
                    toastr.success('保存成功');
                })
            },
            //全选反选
            selectArtists: function (value, id) {

                if (value === 'all') {
                    this.selectedArtistsArr = [];
                    this.roleDate.forEach(item => {
                        if (item.id == id) {
                            item.users.data.forEach(v => {
                                this.selectedArtistsArr.push(v.id)
                            })
                        }
                    })
                } else {
                    let index = this.selectedArtistsArr.indexOf(value);
                    if (index > -1) {
                        this.selectedArtistsArr.splice(index, 1)
                    } else {
                        this.selectedArtistsArr.push(value)
                    }
                }
            },

            selectedAll: function (e) {
                this.selectedIds = [];
                let selectedStatus = e.target.checked;
                let list = [];
                let item = [];
                for (list in this.powerDate) {
                    for (item in this.powerDate[list].data) {
                        if (selectedStatus) {
                            this.selectedIds.push(this.powerDate[list].data[item].id)
                        }
                        this.powerDate[list].data[item].selected = selectedStatus;
                    }
                    this.powerDate[list].selected = selectedStatus;
                }
            },

            selectAllItem: function (e) {
                let id = e.target.value;
                let selectedStatus = e.target.checked;
                let list = [];
                let item = [];
                for (list in this.powerDate) {
                    if (id == this.powerDate[list].id) {
                        for (item in this.powerDate[list].data) {
                            let index = this.selectedIds.indexOf(this.powerDate[list].data[item].id);
                            if (selectedStatus) {
                                if (index === -1) {
                                    this.selectedIds.push(this.powerDate[list].data[item].id);
                                }
                            } else {
                                if (index > -1) {
                                    this.selectedIds.splice(index, 1)
                                }
                            }
                            this.powerDate[list].data[item].selected = selectedStatus;
                        }
                    }
                }
            },

            selectedItem: function (e) {
                let id = e.target.value;
                let selectedStatus = e.target.checked;
                let list = [];
                let item = [];
                for (list in this.powerDate) {
                    let selectedLength = 0;
                    for (item in this.powerDate[list].data) {
                        if (id == this.powerDate[list].data[item].id) {
                            if (selectedStatus) {
                                this.selectedIds.push(this.powerDate[list].data[item].id)
                            } else {
                                let index = this.selectedIds.indexOf(Number(id));
                                this.selectedIds.splice(index, 1)
                            }
                            this.powerDate[list].data[item].selected = selectedStatus;
                        }
                        if (this.powerDate[list].data[item].selected) {
                            selectedLength += 1
                        }
                    }
                    if (selectedLength === this.powerDate[list].data.length) {
                        this.powerDate[list].selected = true
                    } else {
                        this.powerDate[list].selected = false
                    }
                }
            },

            //获取新增角色的类别
            changeRolejob(value) {
                this.groupingId = value
            },
            roletype(){
                this.roleName = ""
                this.emptydescribe = ""
                this.$refs.resourceType.setValue("")
            },
            cancelrole(){
               this.roletype()
            },
            //新增角色
            addrole() {
                let _this = this;
                let data = {
                    name: this.roleName,
                    group_id: this.groupingId,
                    description: this.emptydescribe
                }
                fetch('post', '/console/role', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addRole').modal('hide');
                    _this.roletype()
                    _this.getroleDate()
                   
                });
            },
            //添加成员
            addmember() {
                let _this = this;
                let data = {
                    user: []
                }
                for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                    data.user.push(this.$store.state.participantsInfo[i].id)

                }
                fetch('post', '/console/relevancy/' + this.roleId, data).then(function (response) {
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
            updateDescribe(value) {
                console.log(value)
            },
            Modifyingroles(value, id) {
                this.updateType = id//角色组id获取
                this.roleGroupId = value;//角色id获取
                this.modifyName = this.roleDate.find(item => item.id == this.roleGroupId).name
                this.rolegroupName = this.groupingDate.find(item => item.id == id).name//把角色组id转为name
                this.updateName = this.modifyName//角色名默认带出值设置
                this.$refs.roleGroup.setValue(id,this.roleGroupId)//角色组默认带出值设置
                for(let i = 0;i<this.roleDate.length;i++){
                    if(this.roleDate[i].id==value){
                      this.emptyrole_describe=this.roleDate[i].description
                    }
                    
                }
              
                
            },
            //修改角色
            updaterole() {
                let _this = this;
                let data = {
                    name: this.updateName,
                    group_id: this.updateType,
                    description: this.emptyrole_describe
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
            moverole() {
                let _this = this;
                let data = {
                    group_id: this.movegroupingId
                }
                fetch('put', '/console/mobile/' + this.roleId, data).then(function (response) {
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
                    toastr.success('新增成功');
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
                if (!this.switchId.includes(id)) {
                    this.switchId.push(id)

                } else {
                    this.switchId.splice(this.switchId.indexOf(id), 1)
                }
                
                
            },
            //删除的名字id获取
            role(value) {
                this.roleId = value
            },
            grouping(value) {
                this.groupingId = value
                this.panelName = this.groupingDate.find(item => item.id == this.groupingId).name
                this.$refs.resourceType.setValue(value, this.panelName)
                this.roleName = ""

            },
            clickdefault() {
                this.conceal = !this.conceal;
            },
            defaultcontent(value) {
                this.defaultId = value
                this.jobCont = ''
            },
            seerange(i, v) {
                this.valueId.push(i.toString() + v)
            },
            radioed(params, value) {
                let index = this.sendData.find(item => item.resource_id === value.id)
                if (index) {
                    index.scope = params.id
                } else {
                    let tempObj = {}
                    Object.assign(tempObj, {resource_id: value.id})
                    Object.assign(tempObj, {scope: params.id})
                    this.sendData.push(tempObj)
                }
            },
            checked(params, value) {
                let index = this.sendData.find(item => item.resource_id === value.id)
                if (index) {
                    if (index.manage.indexOf(params.id) > -1) {

                        index.manage.splice(index.manage.indexOf(params.id), 1)
                    } else {
                        index.manage.push(params.id)
                    }
                } else {
                    let tempObj = {}
                    this.checkarr.push(params.id)
                    Object.assign(tempObj, {resource_id: value.id})
                    Object.assign(tempObj, {manage: this.checkarr})
                    this.sendData.push(tempObj)
                }

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

    .leftImg {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
        vertical-align: middle;
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

    /* .dropdown-item:hover {
        cursor: pointer;
    } */

    #org-dropdown {
        font-size: 20px !important;

    }

    /* .pointer-content input[type=radio]:hover{
        cursor:no-drop;
    } */
    .power-cont {
        position: absolute;
        top: 50%;
        left: 10%;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
    }

    .range-cont {
        position: absolute;
        top: 50%;
        left: 10px;
        margin-top: -10px;
    }

    .checkbox-custom, .radio-custom {
        display: inline-block
    }

    .pointer-cont:hover {
        background: #fff;
    }

    .back {
        background: #F5F5F5;
    }

    .avatar {
        vertical-align: inherit;
        margin-top: -2px;
    }
    .anmite {
      transform: rotate(90deg);
      -ms-transform: rotate(90deg); /* IE 9 */
      -moz-transform: rotate(90deg); /* Firefox */
      -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
      -o-transform: rotate(90deg);
    }
</style>

