<template>
    <div class="page-content container-fluid">
        <hr>
        <div class="approver-row">
            <span>审批人</span>
            <div class="approver-container" v-for="(item, index) in 5" :key="index">
                <div class="approver">{{item}}</div>
                <div class="splicer" v-if="item !== 5"></div>
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

}
</script>

<style scoped>
.approver-row{
    display: flex;
    margin-top: 30px; 
    margin-left: 120px;  
}
.approver-row span{
    margin-right: 20px;
    line-height: 40px;
}

.approver-container{
    display: flex;
}
.splicer{
    width: 45px;
    height: 2px;
    margin-top: 20px;
    background-color: rgba(7, 17, 27, 0.2);
}
.approver{
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: rgba(7, 17, 27, 0.2);
    text-align: center;
    line-height: 40px;
}
</style>
