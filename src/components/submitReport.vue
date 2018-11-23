<template>
    <div class="modal fade" ref="addModelDetails" id="submitReport" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" aria-hidden="true" data-dismiss="modal" class="close" @click="modalclose"><i aria-hidden="true" class="md-close"></i></button>
                        <h4 class="modal-title">简报</h4> 
                </div>
                <div class="modal-body clearfix">
                    <div class="row example">
                         <div class="col-md-4">
                            <p>测试甲的周报-第12周</p>
                            <p>10月15日-10月21日</p>
                         </div>
                         <div class="col-md-8 clearfix text-right mb-20">
                            <div class="right mb-10">
                                <span class="pr-10">创建人</span>
                                <span>测试</span>
                                <span class="pr-10 pl-30">当前状态</span>
                                <span>待屈素芳评审</span>
                            </div>
                            <button class="btn btn-primary">评审</button>
                            <button class="btn btn-primary" style='display:none'>评审通过</button>
                         </div>
                    </div>
                    <ul class="list-group ">
                        <li class="list-group-item p-0 mb-10">
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
                        <li class="list-group-item mb-10 p-0">
                            <p class="list-group-item-heading mt-0 mb-5">1.本周你完成了哪些工作？最有成就的是什么</p>
                            <p>文本</p>
                            <p>数字</p>
                            <p>链接</p>
                            <p>附件</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .list-group-item{
        border-bottom:1px solid #f4f4f4;
    }
</style>
<script>
export default {
    
}
</script>
<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
         
    },
    methods:{
        modalclose(){
           $('.modal-backdrop').remove()
        }
    }
}
</script>


