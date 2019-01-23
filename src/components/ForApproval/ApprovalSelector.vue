<template>
    <div class="approval-text-container col-md-12 pl-0" v-show="['昵称','项目名称','相关艺人','签约主体'].includes(consdata[0].control_title) || options.length > 0 || consdata[0].disabled">
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
import config from '@/assets/js/config.js'
import fetch from '@/assets/utils/fetch.js'
export default {
     // 凡是多选，都有搜索框；不是多选传入selectable为true也可以有搜索框
        // changeKey为父组件的data，且可以被改变
        name:'ApprovalSelector',
        props: ['n', 'multiple', 'placeholder', 'changeKey' , 'value', 'resetinfo', 'selectable','title','consdata','index','clear','directionalSender','defaultData','isSelectable'],
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
            // if(!this.multiple){
            //     let self = this;
            //     $(this.$el).selectpicker().on('hidden.bs.select', function () {
            //         console.log($(this).val());
            //         self.$emit('change', $(this).val(), $(this)[0].selectedOptions[0].label, $(this)[0].selectedOptions[0].id);
            //         // 可以通过调用select方法，去改变父组件传过来的changeKey
            //         if (self.changeKey) {
            //             self.$emit('select', self.changeKey, $(this).val(), $(this)[0].selectedOptions[0].label)
            //         }
            //     });
            // }else{
            //     $(this.$el).selectpicker()
            // }
           
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
                                _this.valueListener={name:_this.options[0].title,id:_this.options[0].client_id}                            
                                _this.refresh()
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
                    if(control_source.to_sort_number){
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
                }
        }
        },
        methods: {
            defaultDataChecker(){
                if(this.consdata[0].control_value){
                    console.log(this.consdata[0].control_value);
                        this.valueListener = this.consdata[0].control_value
                        this.setValue(this.consdata[0].control_value)
                        this.refresh()
                }
                // if(this.defaultData && this.consdata){
                //     for (const i in this.defaultData) {
                //         if(params){
                //             this.$nextTick(() => {
                //                 this.valueListener = params.find(item=>item.title === this.defaultData[i].key).id
                //             })
                //         }else{
                //             if (this.defaultData[i].key === this.consdata[0].control_title) {
                //                 this.$nextTick(() => {
                //                     this.valueListener = this.defaultData[i].values.data.value
                //                     this.setValue(this.defaultData[i].values.data.value)
                //                 })
                //             }
                //         }
                //     }
                // }
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
                            // if(_this.defaultData){
                            //     if(params.data[0].id){
                            //         // _this.valueListener = params.data.find(item=>item.title === _this.defaultData)
                            //         _this.defaultDataChecker()
                            //     }
                            //     _this.$nextTick(() => {
                            //         _this.defaultDataChecker()
                            //     })
                            // }
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
