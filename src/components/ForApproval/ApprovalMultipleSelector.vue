<template>
    <div class="approval-text-container col-md-12 pl-0">
        <span class="col-md-2 text-right pl-0" :class="consdata[0].required===1?'require':''">{{title || consdata[0].control_title}}</span>
        <select class="good-picker selectpicker col-md-10"  data-plugin="" :value="value" :data-live-search="true"
            :data-show-subtext="isSelectable" 
            multiple="true" :title="placeholder || consdata[0].control_placeholder" v-model="valueListener">
            <selectorsOptions v-for="option in options" :id="option.enum_sort" :val="option.enum_value || {name:option.name || option.id,id:option.id}"
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
        name:'ApprovalMultipleSelector',
        props: ['n', 'placeholder', 'changeKey', 'value', 'resetinfo', 'selectable','title','consdata','index','clear','directionalSender','defaultData'],
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
            n:function(value){

            },
            consdata:function(){
                this.sourceChecker()
            },
            directionalSender:function(value){
                if(value && value.to === this.consdata[0].sort_number){
                    let _this = this
                    if(this.consdata[0].control_source){
                        fetch('get',this.consdata[0].control_source.url+'?'+this.consdata[0].control_source.parameters+'='+value.data).then((params) => {
                            _this.options = params.data
                            
                            _this.$nextTick(() => {
                                _this.refresh()
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
           defaultDataChecker(params){
                if(params && this.consdata[0].control_value){
                            console.log(11111);
                            console.log(this.consdata[0].control_value.split(','));
                            let tempArr = this.consdata[0].control_value.split(',')
                            for (const j in tempArr) {
                                this.$nextTick(() => {
                                    this.valueListener.push({id:params.find(item=>item.name === tempArr[j]).id,name:params.find(item=>item.name === tempArr[j]).name})
                                    this.setValue(this.valueListener)
                                    this.$nextTick(() => {
                                    this.refresh()
                                        
                                    })
                                })
                            //     console.log(tempArr[j]);
                            //     console.log(params.find(item=>item.name === tempArr[j]).id);
                            //    this.valueListener.push(params.find(item=>item.name === tempArr[j]).id)
                            }
                        //     else{
                        //     if (this.defaultData[i].key === this.consdata[0].control_title) {
                        //         this.$nextTick(() => {
                        //             // console.log(this.defaultData[i].values.data.value);
                        //             // $(this.$el).selectpicker('val', this.defaultData[i].values.data.value);
                        //             // this.valueListener = this.defaultData[i].values.data.value
                        //             // this.setValue(this.defaultData[i].values.data.value)
                        //         })
                        //     }
                        // }
                }
            },
            sourceChecker(){
                let _this = this
                if(this.consdata[0].control_source){
                    fetch('get',this.consdata[0].control_source.url).then((params) => {
                        _this.options = params.data
                        _this.$nextTick(() => {
                            _this.refresh()
                        })
                        if(_this.consdata[0].control_value){
                                if(params.data[0].id){
                                    // _this.valueListener = params.data.find(item=>item.title === _this.defaultData)
                                    _this.defaultDataChecker(params.data)
                                }
                                _this.$nextTick(() => {
                                    _this.defaultDataChecker()
                                    
                                })
                            }
                    })
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
