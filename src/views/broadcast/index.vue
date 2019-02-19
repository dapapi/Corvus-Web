<template>
    <div class="page page-aside-left">
        <div class="page-aside">
            <SecondLeft :leftData="leftData"  :title="'公告'"/>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import SecondLeft from '@/components/SecondLeft.vue'
    export default {
        components: {
            SecondLeft
        },
        data(){
            return{
                leftData:[{
                    id:0,
                    level:1,
                    name:"我接收的",
                    type:"link",
                    url:"/broadcast/receive",

                },{
                    id:1,
                    level:1,
                    name:"我发布的",
                    type:"link",
                    url:"/broadcast/send",
                }]
            }
        }
    }
</script>
<style scoped>
    .page-aside{
        overflow: hidden !important;
        position: fixed;
        left: 100px;
    }
</style>

