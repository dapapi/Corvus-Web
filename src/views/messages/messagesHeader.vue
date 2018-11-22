<template>
    <div class="messages-header-container row">
        <div class="col-md-1 header-title">消息</div>
        <div class="offset-md-6 col-md-5 row filter-container">
            <div class="col-md-7 row ">
                <div class="circle-filter-all pull-right"></div>
                <div class="text-filter-all">全部标记为已读</div>
            </div>
            <div class="col-md-5">全部消息
                <i class="icon ml-chevron-down"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'messagesHeader',
  data() {
    return {

    };
  },
};
</script>

<style>
.messages-header-container{
    background-color:#ffffff;
    height: 120px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #333333;
    letter-spacing: 0;
}
.header-title{
    text-align: right;
    top: 36px;
}
.circle-filter-all{
    width: 22px;
    height: 22px;
    border-radius: 100%;
    border: 3px solid #D2D2D2;
    margin-top: 10px;

}
.filter-container div{
    top: 36px;
}
.text-filter-all{
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #333333;
    letter-spacing: 0;
    margin-left: 15px;
}

</style>
