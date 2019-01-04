<template>
    <div class="approval-text-container col-md-12 pl-0">
        <span class="col-md-2 text-right">{{title || data[0].control_title}}</span>
        <select class="good-picker selectpicker col-md-10" data-plugin="" :value="value" :data-live-search="isSelectable"
            :data-show-subtext="isSelectable" 
            :multiple="multiple" :title="placeholder || data[0].control_placeholder" v-model="valueListener">
            <selectorsOptions v-for="option in options" :id="option.enum_sort" :val="option.enum_value || {name:option.id,id:option.id}"
                            :key="option.enum_sort">
                {{option.name || option.nickname || option.enum_value || option.title}}
                <!-- 增强组件扩展性和数据通用性 -->
            </selectorsOptions>
        </select>

    </div>
</template>

<script>
import config from '@/assets/js/config.js'
import fetch from '@/assets/utils/fetch.js'
export default {
     // 凡是多选，都有搜索框；不是多选传入selectable为true也可以有搜索框
        // changeKey为父组件的data，且可以被改变
        name:'selector',
        props: ['n', 'multiple', 'placeholder','formid', 'value', 'resetinfo', 'selectable','title','data','index','clear'],
        data() {
            return {
                isDisable: this.disable,
                valueListener: [],
                options:[],
            }
        },
        computed: {
            isSelectable: function () {
                if (this.selectable) {
                    return true
                }
                if (this.multiple) {
                    return true
                }
                return false
            },
            
        },

        mounted() {
            this.sourceChecker()
        },
        update(){
            this.refresh()
        },
        watch: {
            n:function(value){

            },
            valueListener: function (newValue) {
                let {id} = this.data[0]
                if(Array.isArray(this.valueListener)){
                    if(this.valueListener.length>0){
                        this.$emit('change',{key:id,value:this.valueListener,type:null})
                    }
                }else{
                    this.$emit('change',{key:id,value:this.valueListener,type:null})                    
                }
            },
            disable: function (newValue) {
                this.isDisable = newValue;
                if (newValue) {
                    $(this.$el).attr('disabled', 'disabled');
                    this.refresh()
                } else {
                    $(this.$el).removeAttr('disabled');
                    this.refresh()
                }
            },
            options: function (newValue) {
                this.$nextTick(() => {
                    this.refresh()
                })
            },
            clear:function(value){
                if(value===true){
                    this.setValue('')
                    this.valueListener = []
                }
            },
            formid:function(){
                this.sourceChecker()
            }
        },
        methods: {
            sourceChecker(){
                let _this = this
                if(this.data[0].control_source){
                    fetch('get',this.data[0].control_source.url).then((params) => {
                        _this.options = params.data
                        _this.$nextTick(() => {
                            _this.refresh()
                        })
                    })
                }else{
                    _this.options = this.data[0].control_enums
                }
                this.$nextTick(() => {
                    
                })
            },
            destroy() {
                $(this.$el).selectpicker('destroy');
            },

            /**
             * 在清空选择时，可设置value为空
             * */
            setValue(value) {
                $(this.$el).selectpicker('val', value);
            },

            getValue() {
                return $(this.$el).selectpicker('val');
            },

            refresh() {
                $('.selectpicker').selectpicker('refresh');
            },
        }
    }
</script>

<style>
.good-picker{
    padding: 0;
}
</style>
