<template>
    <div class="px-0 mx-0 approval-chain-container">
        <ApprovalSelector  ref='main' :consdata='options' :title='consdata[0].control_title' @change='mainSelectorHandler'/>
        <ApprovalSelector class="pt-20 sub-selector" ref='sub' :consdata='subOptions' @change='subSelectorHandler'/>
    </div>
</template>

<script>
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
export default {
    components:{
        ApprovalSelector,
    },
    name:'ApprovalChainReaction',
    props: ['n', 'placeholder', 'value', 'resetinfo', 'selectable','title','consdata','index','clear','directionalSender'],
    data(){
        return{
            count:0,
            options:[{
                    control_enums:[],
                    control_placeholder:'请选择',
                    required:this.consdata[0].required,
                    
            }],
            subOptions:[{
                    control_enums:[],
                    control_placeholder:'请选择',
                    required:this.consdata[0].required,
                    control_title:'',
            }],
            hasList:[],
            emitData:{
                mainValue:'',
                subValue:'',
            }
        }
    },
    mounted(){
        this.dataInit()
    },
    methods:{
        dataInit(){
            this.consdata[0].control_enums.forEach(element => {
                if(element.enum_value.hasOwnProperty('list')){
                    this.hasList.push({name:element.enum_value.column,list:element.enum_value.list})
                    let tempObj = {enum_value:element.enum_value.column}
                    this.options[0].control_enums.push(tempObj)
                }else{
                    this.options[0].control_enums.push(element)
                }
            });
        },
        mainSelectorHandler(params){
            let preList = this.hasList.find(item=>item.name === params.value)
            this.emitData.mainValue = params.value
            this.emitData.subValue = ''
            let {id} = this.consdata[0]
            let {related_field} = this.consdata[0]
            this.$emit('change',{key:id,value:[this.emitData.mainValue,this.emitData.subValue],type:related_field})
            if(preList){
                let preArr = []
                preList.list.forEach(element => {
                    preArr.push({enum_value:element})
                });
                this.subOptions[0].control_title = params.value+'类别'
                this.subOptions[0].control_enums = preArr
            }else{
                this.subOptions[0].control_enums = []
            }
            this.$refs.sub.sourceChecker()
        },
        subSelectorHandler(params){
            let {id} = this.consdata[0]
            let {related_field} = this.consdata[0]

            this.emitData.subValue = params.value
            this.$emit('change',{key:id,value:[this.emitData.mainValue,this.emitData.subValue],type:related_field})
        }
    }
}
</script>

<style >
 .approval-chain-container{
     display: block !important;
 }
 .sub-selector{
     /* position: relative; */
     /* margin-left: -1px; */
     padding-left: -1px;

 }
</style>
