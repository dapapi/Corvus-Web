<template>
    <div class="modal fade" id="customizeFieldContent" aria-hidden="true" aria-labelledby="addLabelForm"
         role="dialog" tabindex="-1">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                    </button>
                    <h4 class="modal-title">自定义字段设置</h4>
                </div>
                <div class="modal-body">

                    <div>
                        <span></span>
                    </div>
                    <div class="text-right">
                        <span @click="addCondition">
                           <i class="iconfont icon-tianjia pr-5"></i>添加更多条件
                        </span>
                    </div>

                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                    <button class="btn btn-primary" type="submit" @click="">确定</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "customize-field",
        methods: {
            addCondition: function () {

            }
        }
    }
</script>

<style scoped>

</style>