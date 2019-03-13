<template>
    <div class="modal fade" id="customizeContent" aria-hidden="true" aria-labelledby="addLabelForm"
         role="dialog" tabindex="-1" data-backdrop="static">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                    </button>
                    <h4 class="modal-title">自定义筛选</h4>
                </div>
                <div class="modal-body">

                    <!-- <h5>筛选关键字</h5>
                    <input type="text" class="form-control" id="inputPlaceholder" placeholder="输入筛选名称"
                           v-model="customizeKeyWords"> -->

                    <h5>筛选条件</h5>
                    <div v-for="n in conditionLength" class="clearfix" :key="n">
                        <div :id="'selector' + n" v-show="selectorHidden.indexOf('selector' + n) === -1">
                            <div class="float-left col-md-11 p-0">
                                <customize-linkage-selectors :data="data,n,stararr" @sendcusdata='getCusData'
                                                          @change="conditionChange"></customize-linkage-selectors>
                            </div>
                            <div class="float-left col-md-1 pb-5">
                                <i class="iconfont icon-guanbi font-size-18" aria-hidden="true" style="line-height: 36px;"
                                   @click="delSelector(n)"></i>
                            </div>
                        </div>
                    </div>

                    <div class="example">
                        <span @click="addCondition">添加更多条件</span>
                    </div>

                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                    <button class="btn btn-primary" type="submit" @click="filter">确定</button>
                </div>

            </div>
        </div>
    </div>
</template>

<style></style>

<script>
    export default {
        name: "",
        props: ['data','stararr','cleanup'],
        data() {
            return {
                conditionLength: 1,
                selectorHidden: [],
                selectorIdHidden:[],
                conditionData: {},
                customizeKeyWords: '',
                sendFilterData:{
                    'conditions':[]
                },
            }
        },
        watch:{
            cleanup:function(value){
                if(value===true){
                    this.sendFilterData.conditions = []
                    this.$emit('cleanupdone')
                }
            }
        },
        mounted() {
            let _this = this;
             $(this.$el).on('show.bs.modal',function () {
             _this.$nextTick((params) => {
                $('.selectpicker').selectpicker('refresh')
             })
            })
            
            // $(this.$el).on('hidden.bs.modal',function () {
            //     _this.conditionLength = 0;
            //     _this.selectorHidden = [];
            //     _this.conditionData = {};
            //     _this.customizeKeyWords = '';
            //     setTimeout(function () {
            //         _this.conditionLength = 1;
            //     }, 0);
            // })
        },

        methods: {
            refresh: function () {
                $('#condition').selectpicker('refresh');
            },
            addCondition: function () {
                this.conditionLength += 1
            },
            delSelector: function (id) {
                this.selectorHidden.push('selector'+id);
                this.selectorIdHidden.push(id)
            },
            conditionChange: function (e) {
                this.conditionData[e.n] = e
            },
            filter: function () {
                let tempArr = {
                    conditions:[]
                }
                console.log(this.sendFilterData.conditions.length);
                for (let key = 0;key <= this.sendFilterData.conditions.length;key++) {
                    if (this.selectorIdHidden.includes(key+1)) {
                        continue  
                    }else{
                        tempArr.conditions.push(this.sendFilterData.conditions[key])
                    }
                }
                this.$emit('change', tempArr);
                $('.modal').modal('hide');
            },
            setValue:function(value){
                this.sendFilterData = value
            },
            getCusData:function(data,n){
                
                this.sendFilterData.conditions[n-1]=data
            },
        }
    }
</script>