<template>
<div class="col-md-12 p-0">
    <div class="approval-text-container col-md-12">
        <span class="col-md-2 text-right">{{title || data[0].control_title || '测试文本输入框'}}</span>
         <selectors :options="starsArr" @valuelistener="changeTargetStars" :multiple="true"
                                           :placeholder="formid===3?'请选择签约艺人':'请选择解约艺人'"></selectors>
        <!-- <input type="text" v-model="textContent" class="form-control col-md-5" placeholder="请输入"> -->
        <input v-if="formid === 3" type="text" v-model="textContent" class="form-control col-md-5" placeholder="请输入工作室">
    </div>  
    <span class="double-span" v-if="formid === 3">提示：若艺人选择用工作室与我司签约，则输入工作室名称，否则不用输入</span>
</div>  
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

export default {
    props:['title','n','data','formid'],
    data(){
        return {
            textContent:'',
            starsArr : []
        }
    },
    mounted(){
        this.getStars()
        console.log(this.formid);
    },
    methods:{
        changeTargetStars(params){
            console.log(params);
        },
        emitText(){
            this.$emit('change',this.textContent)
        },
        getStars(){
            let _this = this
            fetch('get', '/stars/all').then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    _this.starsArr.push({
                        id: response.data[i].id,
                        name: response.data[i].name,
                        value: response.data[i].id
                        
                    })
                    _this.refresh()
                }
            })
        },
        refresh(){
            this.$nextTick(() => {
                    $('.selectpicker').selectpicker('render');
                    $('.selectpicker').selectpicker('refresh');
            })
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
.double-span{
    margin-left: 50px;
}
</style>
