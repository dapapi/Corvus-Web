<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered mb-0">
            <h1 class="page-title">仪表盘</h1>
        </div>
         <div class="page-content container-fluid px-20">
                <div class="tab  my-20 pl-10" style="display:flex">
                        <div class="task mx-20">创建任务</div>
                        <div class="target mx-20">创建目标</div>
                        <div class="schedule mx-20">创建日程</div>
                </div>
                <div class="clearfix">
                    <div class="panel mb-0 ml-0 exhibition-panel" style="background:#fff;height:400px; position: relative;">
                        <div  class="circular m-30">
                                <span>90</span>
                                <div>所有目标数</div>
                        </div>
                        <div class="example-wrap" style="width:200px">
                        
                        <div class="progress progress-sm mb-0">
                          <div class="progress-bar progress-bar-indicating active" style="width:5%;" role="progressbar"></div>
                        </div>
                       
                        <h5 class="m-0"><font style="vertical-align: inherit;font-size:12px"><font style="vertical-align: inherit;">已完成<span>1</span>个
                           </font><i class="pl-70" style="font-style:normal">待完成800个</i></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                          <div class="progress-bar progress-bar-indicating active" style="width: 40%;" role="progressbar"></div>
                        </div>
                        <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;font-size:12px">近7天更新<span>100个</span>
                           </font></font>
                        </h5>
                        <div class="progress progress-sm mb-0 mt-40">
                          <div class="progress-bar progress-bar-indicating active" style="width: 80%;" role="progressbar"></div>
                        </div>
                         <h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">平均完成度<span>23%</span>
                           </font></font>
                        </h5>
                      </div>
                    </div>
                    <div class="panel mb-0 ml-0 task-panel" style="background:#fff;height:400px;">
                        <div class="mx-30 py-10 title-wrap" style="border-bottom: 1px solid #eee; position: relative;"> 
                            <h5>任务</h5>
                            <span style="position: absolute;right:10px;top:15px;">查看更多</span>
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
        line-height: 300px;
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
        position: absolute;
        top:30%;
        left:10px;
       
    }
    .circular div{
        color: #868e96;
        font-size: 14px;
        position: absolute;
        bottom:-55px;
        left:15px;
    }
    .task,.target,.schedule{
        width: 250px;
        height:150px;
        line-height: 270px;
        background: #fff;
        background-repeat: no-repeat;
        background-size:40%;
        background-position:center 10px;
        color: #757575;
        text-align: center
    }
    .target{
        background-image: url('../../assets/target.png');
    }
    .task{
        background-image: url('../../assets/task.png');  
    }
    .schedule{
        background-image: url('../../assets/schedule.png');  
    }
    .tab{
        justify-content: space-between;
        align-items: center
    }
    .member-list {
        overflow-y: auto;
        position: relative;
        top: 45px;
        padding-top: 0;
        padding-bottom: 0;
        height: calc(100vh - 114px);
    }
    .exhibition-panel{
        width: calc(50% - 15px);
        float: left;  
        
    }
    .task-panel {
        width: calc(50% - 15px);
        float: left;
        border-left: 1px solid #eee;
    }
    .example-wrap{
        position: absolute;
        right:80px;
        top:125px;
    }
    .progress-bar{
        background: rgb(5, 169, 219); 
    }
    .overflowY {
        height: calc(100vh - 400px);
        overflow-y: auto;
    }

    .list-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }
    .list-wrap :hover{
        cursor: pointer;
    }
</style>

