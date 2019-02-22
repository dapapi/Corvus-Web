<template>
    <div>
    <div v-for="(n,index) in Promptinglength" class="clearfix" :key="index">
        <div :id="'selector' + n" v-if="data.indexOf('selector' + n) === -1">
            <div class="float-left col-md-11 p-0">
                  <selectors :options="options" ref="scheduleRemind"></selectors> 
            </div>
            <div class="float-left col-md-1 pb-5">
                <i class="iconfont icon-guanbi font-size-18" aria-hidden="true" style="line-height: 36px;"
                    @click="delSelector('selector' + n)"></i>
            </div>
        </div>
    </div>
    
    <span @click="addCondition">+<a href="javascript:;" style="color:#000">添加更多条件</a></span>
    
    </div>
</template>
<script>
    export default {
        name: "",
        props: ['options','conditionLength','selectorHidden'],
        data() {
            return {
                Promptinglength:this.conditionLength,
                data:this.selectorHidden
            }
        },
        methods: {
            addCondition: function () {
                this.Promptinglength += 1
            },
            delSelector: function (id) {
                this.data.push(id);
            }
        }
    }
</script>
