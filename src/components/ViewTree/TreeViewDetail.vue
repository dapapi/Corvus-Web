<template>
    <h3>这里是{{currentRoute}}导航详情</h3>
</template>
<script>
export default {
    name:'TreeViewDetail',
    data(){
        return{
            currentRoute:this.$route.path
        }
    },
    watch:{
        $route:{
            handler:function(val,oldVal){
                this.currentRoute= val.name
            },
            deep:true
        }
    }
}
</script>
<style scoped>
    h3 {
        margin-top: 10px;
        font-weight: normal;
    }
</style>


