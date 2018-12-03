<template>
    <div class="modal fade modal-simple"
         id="confirmFlag"
         aria-labelledby="exampleModalTitle"
         role="dialog" tabindex="-1"
         style="display: none;"
         aria-hidden="true">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title">确认{{typeText}}</h4>
                </div>
                <div class="modal-body">
                    <p class="mt-20">此更改不可撤销</p>
                </div>
                <div class="modal-footer">
                    <button type="button"
                            class="btn btn-default btn-pure waves-effect waves-classic"
                            data-dismiss="modal">取消
                    </button>
                    <button type="button"
                            class="btn btn-primary waves-effect waves-classic"
                            data-dismiss="modal" @click='confirmFlag'>确认
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['typeText'],
        methods: {
            //发送
            confirmFlag() {
                this.$emit('confirmFlag')
            }
        }
    };
</script>

<style>

</style>
