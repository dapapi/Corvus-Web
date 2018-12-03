<template>
    <div :class="isLine?'clearfix':''">
        <div :class="isLine?'float-left':''">
            <input id="allCheck" class="mr-10" @change="setAllCheck" type="checkbox" v-model="allCheck">
            <label for="allCheck">全选</label>
        </div>
        <ul :class="isLine?'clearfix float-left':''">
            <li :class="isLine?'float-left mr-20':''" v-for="(item,index) in optionData" :key="index">
                <input v-model="item.isCheck" class="mr-5" type="checkbox" @change="getCheck(item)"/>
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
        propCheck:'',
        isLine:{
            type:Boolean,
            default:false
        }
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
            }
        },
        getCheck:function(item){
            if(item.isCheck == true){
               this.checkData.push(item)
            }else{
                for (let i = 0; i < this.checkData.length; i++) {
                    if(this.Compare(this.checkData[i],item)){
                        this.checkData.splice(i,1);
                    }
                    
                }
            }
            this.$emit('change', this.checkData)
           
        },
        setAllCheck:function(){
            
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
            this.$emit('change', this.checkData)
        },
        isObj:function (object) {
            return object && typeof(object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
        },
        isArray:function (object) {
            return object && typeof(object) == 'object' && object.constructor == Array;
        },
        getLength:function (object) {
            var count = 0;
            for(var i in object) count++;
            return count;
        },
        Compare:function (objA, objB) {
            if(!this.isObj(objA) || !this.isObj(objB)) return false; //判断类型是否正确
            if(this.getLength(objA) != this.getLength(objB)) return false; //判断长度是否一致
            return this.CompareObj(objA, objB, true); //默认为true
        },

        CompareObj:function (objA, objB, flag) {
            for(var key in objA) {
                if(!flag) //跳出整个循环
                    break;
                if(!objB.hasOwnProperty(key)) {
                    flag = false;
                    break;
                }
                if(!this.isArray(objA[key])) { //子级不是数组时,比较属性值
                    if(objB[key] != objA[key]) {
                        flag = false;
                        break;
                    }
                } else {
                    if(!this.isArray(objB[key])) {
                        flag = false;
                        break;
                    }
                    var oA = objA[key],
                        oB = objB[key];
                    if(oA.length != oB.length) {
                        flag = false;
                        break;
                    }
                    for(var k in oA) {
                        if(!flag) //这里跳出循环是为了不让递归继续
                            break;
                        flag = CompareObj(oA[k], oB[k], flag);
                    }
                }
            }
            return flag;
        }
       
    }
}
</script>

<style lang="scss" scoped>
    li{
        list-style: none;
    }
</style>

