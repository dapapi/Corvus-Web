<template>
    <div class="example">
        
        <div class="col-md-2 text-right float-left">{{typeName}}来源</div>
        <div v-if="isEditSituation">
            <div :class="detailPage?'col-md-10 float-left font-weight-bold expfee':''">
                <div class="float-left" v-if="trailOriginArr.length > 0" >
                    <selectors :options="trailOriginArr" @change="changeTrailOriginType" ref='contentType'
                                :placeholder="'请选择线索来源'"></selectors>
                </div>
                <template v-if="trailOrigin === '1' || trailOrigin === '2' || trailOrigin === '3'">
                    <div class="col-md-5 float-left pr-0">
                        <input type="text" class="form-control" title="" v-model="email">
                    </div>
                </template>
                <template v-else-if="trailOrigin === '4' || trailOrigin === '5'">
                    <div class="col-md-5 float-left pr-0">
                        <input-selectors @change="changeTrailOrigin" :propSelectMemberName='trailOriginPerson.name'></input-selectors>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="!isEditSituation" class="col-md-10 float-left font-weight-bold expfee">
            <span v-if="trailOriginArr[0] && contentType">{{trailOriginArr.find(item=>item.value == contentType).name}}-{{content}}</span>
        </div>
    </div>    
</template>

<script>
import config from '@/assets/js/config'
import fetch from '@/assets/utils/fetch.js'
export default {
    
    props:['trailType','typeName','isEdit','detailPage','content','contentType'],
    data(){
        return {
            trailOriginArr: config.trailOrigin,
            trailOrigin:'',
            trailOriginPerson:'',
            email:'',
            starsArr:[],
            isEditSituation:'',
        }
    },
    watch:{
        contentType(value){
            this.trailOrigin = String(value)
        },
        isEdit(value){
            this.isEditSituation = value
            this.$nextTick(() => {
                this.$refs.contentType.setValue(this.contentType)           //设置默认值
            })
        },
        trailType:function(){
            if(this.trailType == 4){
                this.trailOriginArr = config.trailBloggerOrigin
            }
            this.getStars()
            this.$nextTick(() => {
                $('.selectpicker').selectpicker('render');
                $('.selectpicker').selectpicker('refresh');
            })
        },
        trailOrigin:function(){
            this.$emit('changeTrailOrigin',this.trailOrigin)
        },
        email:function(){
            this.$emit('changeEmail',this.email)
        },
        trailOriginPerson:function(){
            this.$emit('changeTrailOriginPerson',this.trailOriginPerson)
        }
    },
    methods:{
        changeTrailOriginType: function (value) {
            this.trailOrigin = value
        },
        changeTrailOrigin: function (value) {
            this.trailOriginPerson = value
        },
        getStars: function () {
            this.starsArr=[]
            let _this = this;
            if(this.trailType == 4){
                fetch('get', '/bloggers/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.starsArr.push({
                            id: response.data[i].id,
                            name: response.data[i].nickname,
                            value: response.data[i].id
                        })
                    }
                })
            }else{
                fetch('get', '/stars/all').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.starsArr.push({
                            id: response.data[i].id,
                            name: response.data[i].name,
                            value: response.data[i].id
                        })
                    }
                })
            }
            
            },
    }
}
</script>

<style>

</style>

