<template>
    <div>
    <div v-for="n in Promptinglength" class="clearfix" :key="n">
        <div :id="'selector' + n" v-show="data.indexOf('selector' + n) === -1">
            <div class="float-left col-md-11 p-0">
                  <selectors :options="options" ref="scheduleRemind"  @change="(value) => changeScheduleRemind(value, 'selector' + n)"></selectors> 
            </div>
            <div class="float-left col-md-1 pb-5">
                <i class="iconfont icon-guanbi font-size-18" aria-hidden="true" style="line-height: 36px;"
                    @click="delSelector('selector' + n)"></i>
            </div>
        </div>
    </div>
    
    <span @click="addCondition">+<a href="javascript:;" style="color:#000">添加新提醒</a></span>
    
    </div>
</template>
<script>
    export default {
        name: "",
        props: ['options','conditionLength','selectorHidden','isCancel'],
        data() {
            return {
                Promptinglength:this.conditionLength,
                data:this.selectorHidden,
                Remind:{},
                RemindDate:[]
            }
        },
        
        watch:{
           isCancel:function(){
               if(this.isCancel == true){
                   this.$nextTick(function(){
                       this.Promptinglength = 0
                   })
               }
           }
        },
        methods: {
            addCondition: function () {
                this.Promptinglength += 1
            },
            delSelector: function (id) {
                console.error(id)
                this.data.push(id);
                delete this.Remind[id]
            },
            cancelSelector:function(){
                this.$nextTick(function(){
                    this.Promptinglength = 0
                })
            },
            changeScheduleRemind:function(value,id){
                this.Remind[id] = value
                console.log( this.Remind)
                this.$emit('change',this.Remind)
            }
        }
    }
</script>
