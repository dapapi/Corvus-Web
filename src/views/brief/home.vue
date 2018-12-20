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
            leftData:[],
         }
     },
     mounted(){
        this.setData()
     },
     methods:{
        setData:function(){
            this.leftData=[
                {
                    id:1,
                    level:1,
                    name:'提交简报',
                    url:'/brief/index',
                    type:'link',
                    
                    isSelected:false,
                },
                {
                    id:2,
                    level:1,
                    name:'我审批的',
                    url:'/brief/myapproval',
                    type:'link',
                    
                    isSelected:false,
                },
                {
                    id:3,
                    level:1,
                    name:'我的简报',
                    type:'button',
                    isExpanded:false,
                    isSelected:false,
                    subMenu:[]
                },
                {
                    id:4,
                    level:1,
                    name:'成员简报',
                    type:'button',
                    isExpanded:false,
                    isSelected:false,
                    subMenu:[]
                },
                {
                    id:5,
                    level:1,
                    name:'简报统计',
                    type:'button',
                    isExpanded:false,
                    isSelected:false,
                    subMenu:[]
                },
            ]
            this.getlist()
        },
        getlist:function(){
            fetch('get',`${config.apiUrl}/launch`).then((res) => {
                // console.log(res.data)
                let data={}
                for (let i = 0; i < this.leftData.length; i++) {
                    if(this.leftData[i].id == 3){
                        
                        for (let t = 0; t < res.data.length; t++) {
                            data={
                                id:`3${res.data[t].id}`,
                                name:`我的${res.data[t].template_name}`,
                                url:`/brief/list?id=${res.data[t].id}&type=${res.data[t].frequency}&name=${res.data[t].template_name}`,
                                type:'link',
                                level:2,
                                isExpanded:false,
                                isSelected:false,
                            }
                            this.leftData[i].subMenu.push(data)
                            
                        }
                    }else if(this.leftData[i].id == 4){
                        for (let t = 0; t < res.data.length; t++) {
                            data={
                                id:`4${res.data[t].id}`,
                                name:`成员${res.data[t].template_name}`,
                                url:`/brief/memberReport?id=${res.data[t].id}&type=${res.data[t].frequency}&name=${res.data[t].template_name}`,
                                type:'link',
                                level:2,
                                isExpanded:false,
                                isSelected:false,
                            }
                            this.leftData[i].subMenu.push(data)
                            
                        }
                    }else if(this.leftData[i].id == 5){
                        for (let t = 0; t < res.data.length; t++) {
                            data={
                                id:`5${res.data[t].id}`,
                                name:`统计${res.data[t].template_name}`,
                                url:`/brief/statistics?id=${res.data[t].id}&type=${res.data[t].frequency}&name=${res.data[t].template_name}`,
                                type:'link',
                                level:2,
                                isExpanded:false,
                                isSelected:false,
                            }
                            this.leftData[i].subMenu.push(data)
                            
                        }
                    }
                    
                }
                // console.log(this.leftData)
            })
        }
     }
}
</script>


