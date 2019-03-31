<template>
    <div class="approval-text-container col-md-12 pl-0" v-show="['昵称','项目名称','相关艺人','签约主体','解约主体'].includes(consdata[0].control_title) || options.length > 0 || consdata[0].disabled">
        <span class="col-md-2 text-right pl-0" :class="consdata[0].required===1?'require':''" v-if="title || consdata[0].control_title">{{title || consdata[0].control_title}}</span>
        <select class="good-picker selectpicker col-md-10" :disabled="consdata[0].disabled?true:false" data-plugin="" :value="value" data-live-search="true"
            :data-show-subtext="isSelectable" 
            :multiple="multiple" :title="placeholder || consdata[0].control_placeholder" v-model="valueListener">
            <option v-if="consdata[0].disabled?true:false" :value="valueListener.name" selected></option>
            <selectorsOptions v-for="option in options" :id="option.enum_sort" :val="option.enum_value || {name:option.name||option.title || option.nickname|| option.id,id:option.id || option.client_id}"
                            :key="option.enum_sort">
                {{option.name || option.nickname || option.enum_value || option.title}}
                <!-- 增强组件扩展性和数据通用性 -->
            </selectorsOptions>
        </select>

    </div>
</template>

<script>
import fetch from '@/assets/utils/fetch'
export default {
     // 凡是多选，都有搜索框；不是多选传入selectable为true也可以有搜索框
        // changeKey为父组件的data，且可以被改变
        name:'ApprovalSelector',
        props: ['n', 'multiple', ,'placeholder', 'changeKey' , 'value', 'resetinfo', 'selectable','title','consdata','index','clear','directionalSender','defaultData','isSelectable'],
        data() {
            return {
                isDisable: this.disable,
                valueListener: [],
                options:[],
            }
        },
        computed: {
            // isSelectable: function () {
            //     if (this.selectable) {
            //         return true
            //     }
            //     if (this.multiple) {
            //         return true
            //     }
            //     return false
            // },
            
        },

        mounted() {
            this.sourceChecker()
            this.defaultDataChecker()
        },
        update(){
            this.refresh()
        },
        watch: {
            consdata:function(value){
                 this.sourceChecker()
                 this.defaultDataChecker()
            },
            n:function(value){

            },
            directionalSender:function(value){
                if(value && value.to === this.consdata[0].sort_number){
                    let _this = this
                    if(this.consdata[0].control_source && value.data){
                        fetch('get',this.consdata[0].control_source.url+'?'+this.consdata[0].control_source.parameters+'='+value.data).then((params) => {
                            _this.options = params.data
                            _this.$nextTick(() => {
                                if(_this.options[0].title && _this.options[0].client_id){
                                    _this.valueListener={name:_this.options[0].title,id:_this.options[0].client_id}                        
                                }else{
                                    _this.defaultDataChecker()
                                }
                                _this.$nextTick(() => {
                                    _this.refresh()
                                })
                            })
                        })
                    }
                }
            },
            valueListener: function (newValue) {
                let {id} = this.consdata[0]
                let {control_source} = this.consdata[0]
                let {related_field} = this.consdata[0]
                if(Array.isArray(this.valueListener)){
                    if(this.valueListener.length>0){
                        this.$emit('change',{key:id,value:this.valueListener,type:related_field})
                    }
                }else{
                    this.$emit('change',{key:id,value:this.valueListener,type:related_field})                
                }
                if(control_source){
                    if(control_source.to_sort_number && this.valueListener){
                        this.$emit('directional',{to:control_source.to_sort_number,data:this.valueListener.id})
                    }
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
                    this.destroy()
                    this.refresh()
                }
        }
        },
        methods: {
            defaultDataChecker(){
                if(this.consdata[0].control_value){
                        if(this.options[0] && this.options[0].id){
                            if(this.options[0].title){
                                this.setValue({ id: this.options.find(item => item.title === this.consdata[0].control_value).id,name:this.consdata[0].control_value})
                                this.valueListener = { id: this.options.find(item => item.title === this.consdata[0].control_value).id,name:this.consdata[0].control_value}
                                return
                            }else if(this.options[0].nickname){
                                this.valueListener = { id: this.options.find(item => item.nickname === this.consdata[0].control_value).id,name:this.consdata[0].control_value}
                                this.setValue(this.valueListener)
                                return
                            }else if(this.options[0].name){
                                this.valueListener = { id: this.options.find(item => item.name === this.consdata[0].control_value).id,name:this.consdata[0].control_value}
                                this.setValue(this.valueListener)
                                return
                                // console.log(this.consdata[0].control_title,this.valueListener);
                            }
                        }else{
                            this.setValue(this.consdata[0].control_value.value)
                            this.valueListener = this.consdata[0].control_value


                        }
                        this.refresh()
                        this.$nextTick(() => {
                            this.refresh()  
                        })
                }
            },
            sourceChecker(){
                let _this = this
                if(this.consdata[0].control_source){
                    if(!this.consdata[0].disabled){
                        fetch('get',this.consdata[0].control_source.url).then((params) => {
                            _this.options = params.data
                            _this.$nextTick(() => {
                                _this.refresh()
                            })
                            _this.$nextTick(() => {
                                _this.defaultDataChecker()
                            })
                        })
                    }
                }else{
                    _this.options = this.consdata[0].control_enums
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
