<template>
    <div>
        <div class="modal fade" id="goals-add" aria-labelledby="approval-great-module" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalTitle">新建目标</h4>
                    </div>
                    <div class="modal-body modal-greater ">
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标范围</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails"
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">选择部门</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails"
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标周期</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails"
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标名称</div>
                            <div class="col-md-10 float-left">
                                <input ref="trails" class="form-control"
                                        >
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标类型</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails"
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标级别</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails"
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors
                                        ></InputSelectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标描述</div>
                            <div class="col-md-10 float-left">
                                <textarea class="form-control"
                                        ></textarea>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">父目标</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails"
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                        <!-- <div v-for="(item, index) in moduleInfo" :key="index" class="great-option example ">
                            <div :is='sortChecker(item)' :ref='item[0].control.data_dictionary_id'
                                 :consdata='item' :predata='sendData' class="container"
                                 :singlemode='singlemode' :clear='clearFlag' :directional-sender='directionalData'
                                 @change="changeHandler" @directional='directionalWatcher' is-selectable='true'
                                 :formid='form_id' :startDate="start_date"></div>
                        </div> -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round"
                                data-dismiss="modal" >取消
                        </button>
                        <button type="button" class="btn btn-primary waves-effect waves-light waves-round"
                                >提交
                        </button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
export default {

}
</script>

<style scope>
.modal-body .example {
        display: flex;
        align-items: center;
    }
</style>
