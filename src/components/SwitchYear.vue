<template>
    <div>
        <i class="icon md-chevron-left font-size-20" @click="changeYear('left')"></i>
        <span class="mx-30">{{year}}</span>
        <i class="icon md-chevron-right font-size-20" @click="changeYear('right')"></i>
    </div>
</template>
<script>

export default {
    props:{
        type:{
            type:String
        }
    },
    data(){
        return {
           year:new Date().getFullYear()
        }
    },
    methods:{
        changeYear:function(move){
            if(move == 'left'){
                this.year = this.year-1
            }else{
                this.year = this.year+1
            }
            this.$emit('click',this.year)
        }
    }
}
</script>

