<template>
    <!-- Page -->
<div class="page" id="root">
    <div class="page-header page-header-bordered">
        <h1 class="page-title">简报</h1>
        <div class="page-header-actions">
            <button type="button" class="btn btn-primary mr-20">提交</button>
            <button type="button" class="btn btn-default">保存草稿</button>
        </div>
        
    </div>
    <div class="page-content container-fluid">
        <div class="col-md-12 panel example clearfix p-20">
            <span class="float-left pr-10">评审人</span>
            <add-member class="float-left pr-20" @change="participantChange"></add-member>
            <span class="float-left pr-10">谁可以看</span>
            <add-member @change="participantChange"></add-member>

        </div>
        <div class="panel col-md-12 p-20">
             <div class="panel-header clearfix">
                 <div class="float-left">
                      日历控件
                 </div>
                 <button type="button" class="btn btn-primary float-right">状态--待审批</button>
             </div>
             <div class="panel-content">
                 <!--问题列表开始-->
                <ul>
                    <li class="">
                        <p></p>
                    </li>
                </ul>
                <!--问题列表结束-->
             </div>
        </div>
    </div>
    <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
        <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
            <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
            <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
        </button>
    </div>
</div>

</template>

