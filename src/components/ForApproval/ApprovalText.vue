<template>
    <div class="approval-text-container col-md-12 pl-0">
        <span class="col-md-2 text-right">{{title || data[0].control_title || '测试文本输入框'}}</span>
        <input type="text" v-model="textContent" class="form-control col-md-10" placeholder="请输入">
    </div>    
</template>

<script>
export default {
    props:['title','n','data','clear'],
    data(){
        return {
            textContent:'',
        }
    },
    methods:{
        emitText(){
            let {id} = this.data[0]
            // let data = {}
            // data[id]= this.textContent
            this.$emit('change',{key:id,value:this.textContent,type:null})
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
