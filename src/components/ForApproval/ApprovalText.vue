<template>
    <div class="approval-text-container col-md-12">
        <span class="col-md-2 text-right">{{title || '测试文本输入框'}}</span>
        <input type="text" v-model="textContent" class="form-control col-md-10" v-if="!type">
        <textarea name="" id="" class="form-control" v-model="textContent" v-if="type"></textarea>  
    </div>    
</template>

<script>
export default {
    props:['title','type'],
    data(){
        return {
            textContent:''
        }
    },
    methods:{
        emitText(){
            this.$emit('change',this.textContent)
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
