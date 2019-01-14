<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title"><i class="iconfont icon-zuojiantou pr-5" style="color:#CACACA"></i>Talent</h1>
        </div>
        <div class="page-content container-fluid ">
            <div class="panel col-md-12 clearfix py-5">
            <div class="col-md-12">
                <ul class="nav nav-tabs nav-tabs-line" role="tablist" ref="tableft">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active"  data-toggle="tab" :href="'#blogger'"
                            aria-controls="forum-base"
                            aria-expanded="true" role="tab">博主</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-toggle="tab" :href="'#artist'"
                            aria-controls="forum-present"
                            aria-expanded="false" role="tab">艺人</a>
                    </li>
                </ul>
            </div>
            <div class="page-content tab-content nav-tabs-animate bg-white pt-20">
                <div class="tab-pane animation-fade active"  :id="'blogger'" role="tabpanel">
                    <div class="pb-20" style="position: relative;"><span class="pr-20">版本</span><span class="pl-20">(文本)</span><span style="position: absolute;top:0;right:10px;"><i class="iconfont icon-bianji2 pr-20"></i><i class="iconfont icon-ban"></i></span></div>
                    <div style="position: relative;"><span class="pr-2" >预计费用</span><span style="padding-left:4px">(数字)</span><span style="position: absolute;top:0;right:10px;"><i class="iconfont icon-bianji2 pr-20"></i><i class="iconfont icon-ban"></i></span></div>
                </div>
                <div class="tab-pane animation-fade" :id="'artist'"role="tabpanel">

                </div>
            </div>
                    
            </div>
        </div>
         <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#createField">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
            </button>
        </div>
         <div class="modal fade" id="createField" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">创建字段</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example label-center">
                            <div class="col-md-2 text-right float-left ">字段名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入字段名称">
                            </div>
                        </div>
                        <div class="example  label-center">
                            <div class="col-md-2 text-right float-left ">字段类型</div>
                            <div class="col-md-10 float-left pl-0">
                                 <Selectors  placeholder="文本"></Selectors>
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
<style>
    .page-title{
        font-size:18px;
    }
</style>