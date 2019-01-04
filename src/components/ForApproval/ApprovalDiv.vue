<template>
    <div class="approval-text-container col-md-12 pl-0">
        <p class="pl-30">{{data[0].control_title}}</p>
        <!-- <span class="col-md-2 text-right">{{title || data[0].control_title || '测试文本输入框'}}</span>
        <input type="text" v-model="texdtContent" class="form-control col-md-10" placeholder="请输入"> -->
    </div>    
</template>

<script>
export default {
    props:['title','n','data'],
    data(){
        return {
            
        }
    },
    methods:{
        // emitText(){
        //     let {id} = this.data[0]
        //     // let data = {}
        //     // data[id]= this.textContent
        //     this.$emit('change',{key:id,value:this.textContent,type:null})
        // }
    },
    watch:{
        // textContent:function(){
        //     this.emitText()
        // }
    }

}
</script>

<style> 
</style>
