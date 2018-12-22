<template>
    <div class="page-content container-fluid">
        <hr>
        <div class="approver-row">
            <span>审批人</span>
            <div class="approver-container" v-for="(item, index) in approver" :key="index">
                <div class="approver" :style="randomColor()">{{item.name.slice(-1)}}</div>
                <div class="splicer" v-if="index !== (approver.length - 1)"></div>
                <!-- <em><i class="md-check-circle pr-5" style="color:#4DAF50"></i></em>
                <div class="middle-cont">
                    <b class="branch">泰洋系</b>
                    <b class="type" style="color:#999">待审批</b>
                </div> -->
            </div>
        </div>
        <div class="approver-row">
            <span>知会人</span>
            <AddMember />
        </div>
    </div>
</template>

<script>
export default {
    props:['approver'],
    data(){
        return{
            colorArr:['#F23E7C','#FF68E2','#FB8C00','#B53FAF','#27D3A8','#2CCCDA','#38BA5D','#3F51B5'],
        }
    },
    computed:{
       
    },
    methods:{
         randomColor(){
            let n = Math.floor(Math.random()*5+1)
            console.log(n);
            return {backgroundColor:this.colorArr[n]}
        }
    }
}
</script>

<style scoped>
.approver-row{
    display: flex;
    margin-top: 30px; 
    margin-left: 10%;  
}
.approver-row span{
    margin-right: 20px;
    line-height: 40px;
}

.approver-container{
    display: flex;
}
.splicer{
    width: 60px;
    height: 2px;
    margin: 20px 20px 0 20px;
    background-color: #E0E0E0;
}
.approver{
    font-size: 18px;
    font-weight: 800;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    /* background-color: rgba(7, 17, 27, 0.2); */
    text-align: center;
    line-height: 40px;
}
</style>
