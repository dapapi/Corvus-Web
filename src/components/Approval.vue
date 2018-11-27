<template>
    <div class="page-aside" style="width:240px">
        <div class="page-aside-switch">
            <i class="icon wb-chevron-left" aria-hidden="true"></i>
            <i class="icon wb-chevron-right" aria-hidden="true"></i>
        </div>
        <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical"
             style="position: relative;">
            <div data-role="container" class="scrollable-container" style="height: 691px; width: 259px;">
                <div data-role="content" class="scrollable-content" style="width: 259px;">
                    <section class="page-aside-section">
                        <h5 class="page-title pl-30 mb-40">审批</h5>
                        <div class="list-group">
                            <router-link class="list-group-item" to="/approval/initiate">发起审批</router-link>
                            <router-link class="list-group-item" to="/approval/application">我的申请</router-link>
                            <router-link class="list-group-item" to="/approval/my">我的审批</router-link>
                            <router-link class="list-group-item" to="/approval/only">知会我的</router-link>
                        </div>
                    </section>
                    <section class="page-aside-section">
                        <div class="site-menubar-body" style="width:260px;">
                            <ul class="menu pl-20">

                                <li class="site-menu-item has-sub" v-for="item in list" :key="item.id"
                                    @click="switchMenu(item.id)">
                                    <a href="javascript:void(0)">
                                        <span class="icon md-caret-right font-size-20 mr-10 leftImg"
                                              :class="isShow == item.id?'anmite':''"></span>
                                        <span class="site-menu-title">{{item.value}}</span>
                                    </a>
                                    <div class="action" data-plugin="actionBtn" data-toggle="modal"
                                         data-target="#addModel">
                                        <button type="button"
                                                class="site-action-toggle btn-raised btn  btn-floating waves-effect waves-classic">
                                            <i class="front-icon md-plus " aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <ul class="site-menu-sub" v-show="isShow == item.id">
                                        <li class="site-menu-item" v-for="item2 in  reportList" :key="item2.id">
                                            <router-link v-if="item.id == '2'" to="/approval/general">
                                                <span class="icon md-file-text font-size-18 mr-10"></span>
                                                <span class="site-menu-title">{{item2.title}}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    </section>
                </div>
            </div>
            <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false">
                <div class="scrollable-bar-handle"></div>
            </div>
        </div>
        <div class="modal fade" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" id="addModel">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header" style="border:1px solid #ccc">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">创建新审批报表</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="pearls pearls-xs row">
                                <div class="pearl col-4" v-for="v in setp.data" :key="v.id"
                                     :class="setp.iSactive==v.id?'done':''">
                                    <span class="pearl-number">{{v.num}}</span>
                                    <span class="pearl-title">{{v.title}}</span>
                                </div>
                            </div>
                        </div>
                        <template v-if="setp.iSactive=='1'">

                            <div class="example">
                                <div class="col-md-2 text-right float-left pl-0">审批类型</div>
                                <div class="col-md-10 float-left pl-0">
                                    <Selectors :placeholder="'请选择任务优先级'"></Selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">报表名称</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" class="form-control" placeholder="请输入任务名称">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">报表描述</div>
                                <div class="col-md-10 float-left pl-0">
                          <textarea class="form-control" name="taskDescription" id="" cols="30"
                                    rows="5" title="" placeholder="请填写审批报表描述"></textarea>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="setp.iSactive=='2'">
                            <div class="example">
                                <ListSelection :listName="'表单中所有字段'" :selectName="'显示字段'"></ListSelection>
                            </div>
                        </template>
                        <template v-if="setp.iSactive=='3'">

                            <div class="example">
                                <div class="col-md-2 text-right float-left pl-0">审批类型</div>
                                <div class="col-md-10 float-left pl-0">
                                    <Selectors :placeholder="'请选择任务优先级'"></Selectors>
                                </div>
                            </div>

                        </template>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" v-show="iScancel"
                                @click="cancel(setp.iSactive)">取消
                        </button>
                        <button class="btn " type="submit"
                                data-toggle="modal" data-target="#addProject" v-show="iSminus"
                                @click="minus(--setp.iSactive)">上一步
                        </button>
                        <button class="btn btn-primary" type="submit"
                                data-toggle="modal" data-target="#addProject" @click="next(++setp.iSactive)"
                                v-show="iSplus">下一步
                        </button>
                        <button class="btn btn-primary" type="submit"
                                data-toggle="modal" data-target="#addProject" v-show="iSkeep"> 保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    li {
        list-style: none;
    }

    li a:hover {
        text-decoration: none;
    }

    .site-menu-sub {
        padding-left: 20px;
    }

    .menu li {
        margin: 20px 0;
    }

    .leftImg {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
    }

    .anmite {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg); /* IE 9 */
        -moz-transform: rotate(90deg); /* Firefox */
        -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
        -o-transform: rotate(90deg);
    }

    .animsition-link b {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .action {
        display: none;
        position: absolute;
        left: 170px;
        top: 0px;
    }

    .action button {
        width: 15px;
        height: 15px;
        border: 1px solid #484848;
        position: relative;
    }

    .action button i {
        font-size: 14px;
        position: absolute;
        top: -4px;
        left: 3px;
    }

    .menu li:first-child:hover .action {
        display: block;
    }

    .bootstrap-select {

        width: 100% !important;
    }
</style>
<script>
    import fetch from "@/assets/utils/fetch";
    import config from "@/assets/js/config";

    export default {
        data() {
            return {
                list: [
                    {
                        id: "1",
                        value: "审批报表"
                    },
                    {
                        id: "2",
                        value: "审批汇总"
                    }
                ],
                reportList: [
                    {
                        title: "报销",
                        head: "审批添增"
                    },
                    {
                        title: "通用审批",
                        head: "审批删除"
                    },
                    {
                        title: "报销",
                        head: "审批添增"
                    },
                    {title: "通用审批", head: "审批删除"}
                ],
                isShow: "0",
                setp: {
                    iSactive: "1",
                    data: [
                        {
                            id: "1",
                            title: "填写基本信息",
                            num: "1",
                            cont: [
                                {id: 1, key: "所属部门", field_type: 2},
                                {id: 2, key: "招聘职务", field_type: 1},
                                {id: 3, key: "招聘人数", field_type: 5},
                            ]
                        },
                        {
                            id: "2",
                            title: "填写基本信息",
                            num: "2",
                        },
                        {
                            id: "3",
                            title: "填写基本信息",
                            num: "3",
                        },
                    ],
                },
                iSminus: false,
                iSplus: true,
                iScancel: true,
                iSkeep: false
            }
        },
        mounted() {
        },
        methods: {
            switchMenu: function (id) {
                if (this.isShow == id) {
                    this.isShow = 0;
                } else {
                    this.isShow = id;
                }
            },
            next(id) {
                if (id !== '1') {
                    this.iSminus = true
                }
                if (id == '3') {
                    this.iSplus = false;
                    this.iSkeep = true;
                    this.iScancel = true
                }
                if (id == '2') {
                    this.iScancel = false

                }
            },
            minus(id) {
                if (id == '1') {
                    this.iSminus = false;
                    this.iSplus = true;
                    this.iSkeep = false;
                    this.iScancel = true;
                }
                if (id == '2') {
                    this.iSplus = true;
                    this.iSkeep = false;
                    this.iScancel = false
                }
            },
        },
        cancel() {

        },
    };
</script>







