<template>
    <!-- Page -->
    <div class="page">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">合同管理</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" placeholder="请输入合同编号" style="width: 220px;" />
                    </div>
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" placeholder="请输入艺人姓名" style="width: 220px;" />
                    </div>
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" placeholder="请输入合同性质" style="width: 220px;" />
                    </div>
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" placeholder="自定义筛选" style="width: 220px;" />
                    </div>
                </div>
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" 
                                data-toggle="tab" 
                                href="#my-create" 
                                aria-controls="unsure" 
                                role="tab" aria-selected="true">
                                我创建的
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#approval" 
                                aria-controls="approval" 
                                role="tab" 
                                aria-selected="false">
                                我审批的
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#informed" 
                                aria-controls="informed" 
                                role="tab" 
                                aria-selected="false">
                                知会我的
                            </a>
                        </li>
                    </ul>
                    <div class="page-content tab-content nav-tabs-animate bg-white">
                        <div class="tab-pane animation-fade active" id="my-create" role="tabpanel">
                            111
                        </div>
                        <div class="tab-pane animation-fade" id="approval" role="tabpanel">
                            222
                        </div>
                        <div class="tab-pane animation-fade" id="informed" role="informed">
                            333
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>

<script>
import fetch from "../../assets/utils/fetch";

export default {
    name: 'Contracts',
    data() {
        return {
        };
    },

    mounted() {
    },

    methods: {
    }
};
</script>

<style lang="scss" scoped>

</style>
