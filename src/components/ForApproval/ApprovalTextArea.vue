<template>
    <div class="approval-text-container col-md-12">
        <span class="col-md-2 text-right">{{title || data[0].control_title || '测试文本输入框'}}</span>
        <textarea name="" id="" class="form-control" v-model="textContent"></textarea>  
    </div>    
</template>

<script>
export default {
    props:['title','n','data'],
    data(){
        return {
            textContent:''
        }
    },
    methods:{
        emitText(){
            let {id} = this.data[0]
            this.$emit('change',{key:id,value:this.textContent,type:null})
        }
    },
    watch:{
        textContent:function(){
            this.emitText()
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
