<template>
    <div class="modal fade" :id="id" aria-labelledby="examplePositionCenter" role="dialog" tabindex="-1" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-simple modal-center">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="handleOk">确认</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click="handleCancel">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // name: 'Modal',
    props: ['id', 'title'],
    data () {
        return {
            // visible: false,
        }
    },
    mounted () {
    },
    methods: {
        // 点击确定按钮触发的事件
        handleOk () {
            this.$emit('onOK')
        },
        // 点击取消按钮触发的事件
        handleCancel () {
            this.$emit('onCancel')
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-header {
    margin: 0px 20px;
    padding: 12px 0;
    border-bottom: 1px solid #d8d8d8;
}
</style>

