<template>
    <div class="modal fade modal-simple  neterror" style="z-index:9999999"
         :id="id? id : 'confirmFlag'"
         aria-labelledby="exampleModalTitle"
         role="dialog" tabindex="-1"
         data-backdrop="static"
         aria-hidden="true">
        <div class="modal-dialog modal-center modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                    </button>
                    <h4 class="modal-title">掉线了？</h4>
                </div>
                <div class="modal-body">
                    <p class="mt-20 errortext" >连接不稳定，请检查网络设置!</p>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button"
                            class="btn btn-default btn-pure waves-effect waves-classic"
                            data-dismiss="modal">取消
                    </button> -->
                    <button type="button" 
                            class="btn btn-info waves-effect waves-classic errorbutton"
                            data-dismiss="modal" >好的，知道了
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['typeText', 'id'], // 当一个页面有多个这个组件 需要赋值不同id
        methods: {
            //发送
            confirmFlag() {
                this.$emit('confirmFlag')
            }
        }
    };
</script>

<style>
.errortext{
    font-size: 30px;
}
.errorbutton{
    font-size: 20px;
    font-weight: 400;
}
</style>
