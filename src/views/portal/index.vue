<template>
    <!-- Page -->
    <div class="page">
        <div class="row">
            <div class="col-md-3">
                <div class="page-header page-header-bordered">
                    <h1 class="page-title">通讯录</h1>
                    <!-- <div class="input-search">
                        <button type="submit" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" name="" placeholder="请搜索姓名/手机号/职位">
                    </div> -->
                    <!-- <select-staff></select-staff> -->
                </div>
            </div>

            <div class="col-md-9">
            
                <div class="page-header page-header-bordered">
                    <h1 class="page-title">xx的个人信息</h1>
                </div>

                <div class="page-content container-fluid">
                    <div class="panel col-md-12 clearfix py-5">
                        <div class="row" style="align-items: center">
                            <div class="col-md-2">
                                <div class="avatar"></div>
                            </div>
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-md-4">
                                        <p>测试</p>
                                        <p>xx@xx.com</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>部门 测试</p>
                                        <p>职位 产品经理</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>电话 123091283</p>
                                        <p>WeChat 测试</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" 
                                    data-toggle="tab" 
                                    href="#exampleTabsOne" 
                                    aria-controls="exampleTabsOne" 
                                    role="tab" aria-selected="true">
                                    正在进行
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" 
                                    data-toggle="tab" 
                                    href="#exampleTabsTwo" 
                                    aria-controls="exampleTabsTwo" 
                                    role="tab" 
                                    aria-selected="false">
                                    已完成
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" 
                                    data-toggle="tab" 
                                    href="#exampleTabsThree" 
                                    aria-controls="exampleTabsThree" 
                                    role="tab" 
                                    aria-selected="false">
                                    待完成
                                </a>
                            </li>
                        </ul>
                        
                        <div class="tab-content pt-20">
                            <div class="tab-pane active" id="exampleTabsOne" role="tabpanel">
                                <h3>测试正在进行的任务</h3>
                                <ul class="list-group list-group-dividered list-group-full">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                </ul>
                                <h3>最近日程</h3>
                                <ul class="list-group list-group-dividered list-group-full">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-pane" id="exampleTabsTwo" role="tabpanel">
                                <h3>测试已完成的任务</h3>
                                <ul class="list-group list-group-dividered list-group-full">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                </ul>
                                <h3>最近日程</h3>
                                <ul class="list-group list-group-dividered list-group-full">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-pane" id="exampleTabsThree" role="tabpanel">
                                <h3>测试待完成的任务</h3>
                                <ul class="list-group list-group-dividered list-group-full">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                </ul>
                                <h3>最近日程</h3>
                                <ul class="list-group list-group-dividered list-group-full">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-md-4">吃火锅</div>
                                            <div class="col-md-6">吃火锅底料</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <customize-filter :data="customizeInfo" @change="customize"></customize-filter> -->
        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>

<script>
export default {
    name: 'portal',
    data () {
        return {}
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 100%;
    height: 140px;
    margin: 20px 0;
    border: 1px solid #cacaca;
    border-radius: 0;
    padding: 0 20px;
}
</style>

