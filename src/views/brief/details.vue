<template>
    <!-- Page -->
<div class="page-main">
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
                 <ul class="list-group mt-40">
                        <li class="list-group-item p-0 mb-10">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么<span style="color:#01BCD4;cursor:pointer" data-toggle="modal" data-target="#selectTask" class="px-5">选任务</span></p>
                            <p>文本</p>
                            <p>数字</p>
                            <p>链接</p>
                            <p>附件</p>
                        </li>
                        <li class="list-group-item mb-10 p-0">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么</p>
                            <p>文本</p>
                            <p>数字</p>
                            <p>链接</p>
                            <p>附件</p>
                        </li>
                        <li class="list-group-item mb-10 p-0">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么</p>
                            <p>文本</p>
                            <p>数字</p>
                            <p>链接</p>
                            <p>附件</p>
                        </li>
                    </ul>
                <!--问题列表结束-->
             </div>
        </div>
    </div>
    <!-- <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
        <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
            <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
            <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
        </button>
    </div> -->
    <div class="modal fade" id="selectTask" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
        {<div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="md-close"></i></button>
                    <h4 class="modal-title">任务</h4>
                </div>
                <div class="modal-body clearfix">
                     <ul class="list-group ">
                        <li class="list-group-item p-0 mb-10">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么</p>
                        </li>
                        <li class="list-group-item mb-10 p-0">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么</p>
                           
                        </li>
                        <li class="list-group-item mb-10 p-0">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么</p>
                            
                        </li>
                    </ul>
                </div>
                <div class="modal-footer pl-5">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                    <button class="btn btn-primary" type="submit">确定</button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<style lang="scss" scoped>
    .page-main{
        background-color:#f3f4f5 !important;
    }
    .list-group-item{
        border-bottom:1px solid #f4f4f4;
    }
</style>
