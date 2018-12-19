<template>
    <div class="approval-text-container col-md-12">
        <span class="col-md-2 text-right">{{title || data[0].control_title || '测试文本输入框'}}</span>
        <input type="text" v-model="textContent" class="form-control col-md-10" :placeholder="data[0].control_placeholder">
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
