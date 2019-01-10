<template>
    <div class="approval-text-container col-md-12 pl-0">
        <span class="col-md-2 text-right ml-0 pl-0" :class="consdata[0].required===1?'require':''">{{title || consdata[0].control_title || '测试文本输入框'}}</span>
        <input type="text" v-model="textContent" class="form-control col-md-10" placeholder="请输入">
    </div>    
</template>

<script>
export default {
    props:['title','n','consdata','clear'],
    data(){
        return {
            textContent:'',
        }
    },
    methods:{
        emitText(){
            let {id} = this.consdata[0]
            // let data = {}
            // data[id]= this.textContent
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
