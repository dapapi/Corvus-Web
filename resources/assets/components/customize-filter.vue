<template>
    <div class="modal fade" id="customizeContent" aria-hidden="true" aria-labelledby="addLabelForm"
         role="dialog" tabindex="-1">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="md-close" aria-hidden="true"></i>
                    </button>
                    <h4 class="modal-title">自定义筛选</h4>
                </div>
                <div class="modal-body">

                    <h5>筛选名称</h5>
                    <input type="text" class="form-control" id="inputPlaceholder" placeholder="输入筛选名称">

                    <h5>筛选条件</h5>
                    <div v-for="n in conditionLength" class="clearfix">
                        <div :id="'selector' + n" v-if="selectorHidden !== ('selector' + n)">
                            <div class="float-left col-md-11 p-0">
                                <normal-linkage-selectors :data="data,n"></normal-linkage-selectors>
                            </div>
                            <div class="float-left col-md-1 pb-5">
                                <i class="md-close font-size-18" aria-hidden="true" style="line-height: 36px;"
                                   @click="delSelector('selector' + n)"></i>
                            </div>
                        </div>
                    </div>

                    <div class="example">
                        <span @click="addCondition">添加更多条件</span>
                    </div>

                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                    <button class="btn btn-primary" data-dismiss="modal" type="submit">确定</button>
                </div>

            </div>
        </div>
    </div>
</template>

<style></style>

<script>
    export default {
        name: "",
        props: ['data'],
        data() {
            return {
                conditionLength: 1,
                selectorHidden: ''
            }
        },

        mounted() {
            let self = this;

        },

        methods: {
            refresh() {
                $('#condition').selectpicker('refresh');
            },
            addCondition() {
                this.conditionLength += 1
            },
            delSelector: function (id) {
                this.selectorHidden = id;
                this.conditionLength -= 1
            }
        }
    }
</script>