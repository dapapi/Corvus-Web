<template>
    <div class="numberInput">
        <input class="form-control" type="text" v-model="number" v-on:input="inputNumber">
        <div class="numberBtn">
            <i class="icon md-caret-up font-size-20 up" @click="add"></i>
            <i class="icon md-caret-down font-size-20 down" @click="minus"></i>
        </div>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return {
            number:0,
        }
    },
    mounted(){
        
    },
    methods:{
        inputNumber:function(){
           this.number = this.number.replace(/[^0-9]+/g,'')
           this.$emit('input',this.number,this.id)
        },
        add:function(){
            this.number = this.number+1
            this.$emit('click',this.number,this.id)
        },
        minus:function(){
            this.number = this.number-1
            this.$emit('click',this.number,this.id)
        }
    }
}
</script>
<style lang="scss" scoped>
    .numberInput{
        position: relative;
    }
    .numberBtn{
        position: absolute;
        right: 1px;
        width: 40px;
        text-align: center;
        top:1px;
        height: calc(100% - 2px);
        background-color:#f2f2f2;
        border-top-right-radius: .215rem;
        border-bottom-right-radius: .215rem
    }
    .up{
        position: absolute;
        right: 5px;
        top:0px
        
    }
    .down{
        position: absolute;
        right: 5px;
        bottom:0px;
        
    }
</style>


