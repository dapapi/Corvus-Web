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
                    <div v-for="n in conditionLength">
                        <normal-linkage-selectors :data="data,n"></normal-linkage-selectors>
                    </div>

                    <div class="example">
                        <i class="icon md-plus" aria-hidden="true"></i><span @click="addCondition">添加更多条件</span>
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
                // condition: function () {
                //     return this.data[0].condition
                // },
                conditionLength: 1
            }
        },

        //
        // beforeMount() {
        //     this.condition = this.data[0].condition;
        //     setTimeout(() => {
        //         this.refresh();
        //     }, 0)
        // },

        mounted() {
            let self = this;

            // let key = $('.key');
            // let condition = $('.condition');
            //
            // key.selectpicker().on('hidden.bs.select', function () {
            //     let id = $(this)[0].selectedOptions[0].id;
            //     self.condition = self.data.find(item => item.id === parseInt(id))['condition'];
            //     setTimeout(function () {
            //         self.refresh();
            //     }, 0);
            //     self.$emit('change', 'key', $(this).val(), $(this)[0].selectedOptions[0].id);
            // });
            //
            // condition.selectpicker().on('hidden.bs.select', function () {
            //     self.$emit('change', 'condition', $(this).val(), $(this)[0].selectedOptions[0].id);
            // });

        },

        methods: {
            refresh() {
                $('#condition').selectpicker('refresh');
            },
            addCondition() {
                this.conditionLength += 1
            }
        }
    }
</script>