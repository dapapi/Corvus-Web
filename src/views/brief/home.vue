<template>
    <div class="page page-aside-left">
        <second-left :leftData="leftData" :title="'简报'"></second-left>
        <router-view/>
    </div>
</template>
<script>

import fetch from '@/assets/utils/fetch'
import secondLeft from '@/components/SecondLeft.vue'
import config from '@/assets/js/config'
export default {
     components:{
       secondLeft
     },
     data(){
         return {
            leftData:{
               topData:[],
               bottomData:[] 
            },
         }
     },
     mounted(){
        this.setData()
     },
     methods:{
        setData:function(){
            this.leftData.topData =[
                {
                value:1,
                name:'提交简报',
                url:'/brief'
                },
                {
                value:2,
                name:'我审批的',
                url:'/brief/myapproval'
                },
                {
                value:3,
                name:'跟进的问题',
                url:'/brief/followup'
                }
            ]
            this.leftData.bottomData=[
                {
                    value:1,
                    name:'我的简报',
                    data:[]
                },
                {
                    value:2,
                    name:'成员简报',
                    data:[]
                },
                {
                    value:3,
                    name:'简报统计',
                    data:[]
                }
            ]
            this.getlist()
        },
        getlist:function(){
            fetch('get',`${config.apiUrl}/launch`).then((res) => {
                let data={}
               
                for (let i = 0; i < this.leftData.bottomData.length; i++) {
                    if(this.leftData.bottomData[i].value == 1){
                        for (let t = 0; t < res.data.length; t++) {
                            data={
                                value:res.data[t].id,
                                name:`我的${res.data[t].template_name}`,
                                url:'/brief/list'
                            }
                            this.leftData.bottomData[i].data.push(data)
                            
                        }
                    }else if(this.leftData.bottomData[i].value == 2){
                        for (let t = 0; t < res.data.length; t++) {
                            data={
                                value:res.data[t].id,
                                name:`成员${res.data[t].template_name}`,
                                url:'/brief/memberReport'
                            }
                            this.leftData.bottomData[i].data.push(data)
                            
                        }
                    }else{
                        for (let t = 0; t < res.data.length; t++) {
                            data={
                                value:res.data[t].id,
                                name:`统计${res.data[t].template_name}`,
                                url:'/brief/statistics'
                            }
                            this.leftData.bottomData[i].data.push(data)
                            
                        }
                    }
                    
                }
            })
        }
     }
}
</script>


