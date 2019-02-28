<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">仪表盘</h1>
        </div>
         <div class="page-content container-fluid">
                <div class="clearfix" style="color:#fff">

                    <div class="panel mb-0 task-panel">
                        <div  class="circular m-30 float-left">
                                <span>90</span>

                        </div>
                        <div class="mx-30 py-10 title-wrap float-left">
                            <h5>任务<span>查看更多</span></h5> 
                        </div>
                        <div class="page-content tab-content nav-tabs-animate overflowY py-0">
                            <div class="list-wrap">
                                <div class="flex">
                                    <!-- <Avatar class="small-avatar" :imgUrl="item.principal.data.icon_url"/> -->
                                    吃火锅底料
                                </div>
                                <div class="">2018-02-01 10:23</div>
                            </div>
                            <!-- <div style="margin: 6rem auto;width: 100px">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<style>
    .circular{
        width:100px;
        height:100px;
        border-radius: 50%;
        background-clip:padding-box,border-box;
        background-origin:padding-box,border-box;
        background-image:linear-gradient(135deg,#fff,#fff),linear-gradient(180deg,rgb(5, 169, 219),#FFF);
        border:1px transparent solid;
        line-height:100px;
        text-align: center;
        font-size: 30px;
        color: rgb(5, 169, 219);
        font-weight: bold;
    }
</style>

