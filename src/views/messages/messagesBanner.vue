<template>
    <div class="messages-banner-container">
        <div class="col-md-12">
            <ul role="tablist" class="nav nav-tabs nav-tabs-line">
                <li role="presentation" class="nav-item">
                    <a data-toggle="tab"
                    href="#forum-task"
                    aria-controls="forum-base"
                    aria-expanded="true"
                    role="tab"
                    class="nav-link active"
                    aria-selected="false">未读</a>
                </li>
                <li role="presentation" class="nav-item">
                    <a data-toggle="tab"
                    href="#forum-task"
                    aria-controls="forum-present"
                    aria-expanded="false"
                    role="tab"
                    class="nav-link"
                    aria-selected="true">已读</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.messages-banner-container{
    margin-left: 47px;
    margin-right: 47px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #999999;
    letter-spacing: 0;
    text-align: right;
}
.nav-link{

    height: 100px;
    padding-top: 30px;

}
.active{
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: right;
}
</style>
