<template>
    <div class="approval-text-container col-md-12 pl-0">
        <span class="col-md-2 text-right pl-0 " :class="consdata[0].required===1?'require':''">{{title || consdata[0].control_title || '测试文本输入框'}}</span>
        <textarea name="" id="" class="form-control" v-model="textContent"></textarea>  
    </div>    
</template>

<script>
export default {
    props:['title','n','consdata','clear'],
    data(){
        return {
            textContent:''
        }
    },
    mounted(){
        this.defaultDataChecker()
    },
    methods:{
         defaultDataChecker(){
            if(this.consdata[0].control_value){
                this.textContent = this.consdata[0].control_value
                // for (const i in this.defaultData) {
                //     if (this.defaultData[i].key === this.consdata[0].control_title) {
                //         console.log(this.defaultData[i].key);
                //         this.$nextTick((params) => {
                //             // $(this.$el).selectpicker('val', this.defaultData[i].values.data.value);
                //             this.textContent = this.defaultData[i].values.data.value
                //         })
                //     }
                }
        },
        emitText(){
            let {id} = this.consdata[0]
            let {related_field} = this.consdata[0]
            this.$emit('change',{key:id,value:this.textContent,type:related_field})
        }
    },
    watch:{
        textContent:function(){
            this.emitText()
        },
        clear:function(value){
            if(value===true){
                this.textContent = ''
            }
        }
    }

}
</script>

<style>
.approval-text-container{
    display: flex;
    /* margin: 20px; */
}
</style>
