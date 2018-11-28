<template>
    <div>
        <input id="allCheck" @click="setAllCheck" type="checkbox" v-model="allCheck">
        <label for="allCheck">全选</label>
        <ul>
            <li v-for="(item,index) in optionData" :key="index">
                <input v-model="item.isCheck" class="mr-10" type="checkbox" @click="getCheck(item,index)"/>
                <slot :row="item" :$index="index"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        optionData:{
            type:Array,
            required: true
        },
        propCheck:''
    },
    data () {
        return {
            checkData: [], 
            allCheck:false,
            
        }
    },
    computed:{
        
    },
    watch: {
        // checkData() {
        //     this.$emit('click', this.checkData)
        // }
    },
    created (){
        
    },
    mounted () {
        this.setCheck()
    },
    methods: {
        setCheck:function(){
            for (let i = 0; i < this.optionData.length; i++) {
                
                this.optionData[i].isCheck = false
                // if(this.optionData[i][`${this.propCheck}`]){
                //     this.optionData[i].isCheck = true
                // }
                this.optionData[i].checkId = i  
            }
        },
        getCheck:function(item,index){
            item.isCheck = !item.isCheck
            if(item.isCheck == true){
               this.checkData.push(item)
            }else{
                for (let i = 0; i < this.checkData.length; i++) {
                    if(this.checkData[i].checkId == index){
                        this.checkData.splice(i,1);
                    }
                    
                }
            }
            this.$emit('click', this.checkData)
           
        },
        setAllCheck:function(){
            
            this.allCheck = !this.allCheck;
            for (let i = 0; i < this.optionData.length; i++) {
                if(this.allCheck == true){
                    this.optionData[i].isCheck = true
                    this.checkData[i] = this.optionData[i]
                }else{
                    // alert(111)
                    this.optionData[i].isCheck = false
                    this.checkData = []
                }
                              
            }
            this.$emit('click', this.checkData)
        }
       
    }
}
</script>

<style lang="scss" scoped>
    li{
        list-style: none;
    }
</style>

