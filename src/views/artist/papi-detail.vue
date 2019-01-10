<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">博主详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                       data-target="#distributionproducer" @click="distributionPerson('publicity')">分配制作人</a>
                    <!--<a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addPrivacy">隐私设置</a>-->
                    <!--<a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addPrivacy">-->
                        <!--<template v-if="artistInfo.sign_contract_status == 1">签约</template>-->
                        <!--<template v-if="artistInfo.sign_contract_status == 2">解约</template>-->
                    <!--</a>-->
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block">
                    <h4 class="card-title">{{artistInfo.nickname}}</h4>
                     <div class="clearfix">
                        <div class=" clearfix example">
                        <div class="col-md-6 float-left pl-0"  v-if ="artistInfo.publicity" v-show="artistInfo.sign_contract_status == 2&&artistInfo.publicity.data.length>0">
                            <div class="float-left pl-0 col-md-2">
                                <i class="iconfont icon-yonghu pr-2"></i>
                                <span>制作人</span>
                            </div>
                            <div class="font-weight-bold float-left pr-10" v-for="(item,index) in artistInfo.publicity.data" :key="index">
                                <template  >
                                    {{item.name}}
                                </template>
                            </div>
                        </div>
                         <div class="col-md-6 float-left pl-0" v-show="artistInfo.sign_contract_status == 1">
                            <div class="float-left pl-0 pr-2 col-md-4">
                                <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>录入人
                            </div>
                            <div class="font-weight-bold float-left"   v-for="(entry,index) in artistInfo.creator" :key="index">
                                <template v-if="artistInfo.creator">
                                    {{ entry.name}}
                                </template>
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-18" v-show="artistInfo.sign_contract_status == 1">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>录入时间
                            </div>
                            <div class="font-weight-bold float-left" v-if="principalName">
                                <template>
                                     {{artistInfo.created_at}}
                                </template>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="col-md-6 float-left pl-1 mb-20 pr-1"  v-if="tasksInfo.length>0">
                        <div class="col-md-6"><i class="iconfont icon-iconset0399 pr-2"></i> 任务</div>
                        <div class="clearfix example taskshow" v-for="(task,index) in tasksInfo" :key="index" @click="JumpDetails(task.id)">
                            <div class="col-md-3 float-left">{{task.title}}</div>
                            <div class="col-md-2 float-left">{{task.principal.data.name}}</div>
                            <div class="col-md-4 float-left">{{task.end_at}}</div>
                            <div class="col-md-3 float-left">
                                <template v-if="task.status === 1"><span style="color:#FF9800">进行中</span></template>
                                <template v-if="task.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                <template v-if="task.status === 3"><span style="color:#9E9E9E">已停止</span></template>
                                <template v-if="task.status === 4"><span style="color:#F44336">延期</span></template>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 float-left pl-0 mb-20" >
                        <div class="col-md-12" v-if="artistInfo.sign_contract_status == 2&&ProjectsInfo.length>0" >
                            <div class="col-md-12"><i class="iconfont icon-ego-box pr-2"></i>项目</div>
                            <div class="clearfix example projectshow" v-for="(item,index) in ProjectsInfo" :key="index" @click="projectDetails(item.id)">
                                <div class="col-md-3 float-left">{{item.title}}</div>
                                <div class="col-md-2 float-left">{{item.principal.data.name}}</div>
                                <div class="col-md-4 float-left">{{item.end_at}}</div>
                                <div class="col-md-3 float-left">
                                    <template v-if="item.status === 1"><span style="color:#FF9800">进行中</span></template>
                                    <template v-if="item.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                    <template v-if="item.status === 3"><span style="color:#9E9E9E">撤单</span></template>
                                </div>
                            </div>
                        </div>
                       <div class="col-md-6 pl-3" v-show="artistInfo.sign_contract_status == 1">
                            <div class="clearfix">
                                <div class="col-md-8 float-left"><span>沟通状态</span></div>
                                <div class="col-md-4 float-left font-weight-bold "  v-if="artistInfo.communication_status">
                                    <template >
                                            {{ papiCommunicationStatusArr.find(item => item.value ==
                                            artistInfo.communication_status).name}}
                                    </template>
                                </div>
                            </div>
                            <div class="clearfix example ">
                                <div class="col-md-8 float-left"><span>平台</span></div>
                                <div class="col-md-4 float-left font-weight-bold " v-if="artistInfo.platform">
                                            <template v-if="artistInfo.platform==1">
                                                    微博
                                            </template>
                                            <template v-else-if="artistInfo.platform==2">
                                                    抖音
                                            </template>
                                            <template v-else-if="artistInfo.platform==3">
                                                    小红书
                                            </template>
                                            <template v-else>
                                                微博,抖音,小红书
                                            </template>
                                </div>
                            </div>
                            <div class="clearfix example " >
                                <div class="col-md-8 float-left" >
                                    <template v-if="artistInfo.platform==1">
                                            微博地址
                                    </template>
                                    <template v-else-if="artistInfo.platform==2">
                                            抖音地址
                                    </template>
                                    <template v-else-if="artistInfo.platform==3">
                                            小红书地址
                                    </template>
                                    <template v-else>
                                            微博,抖音,小红书地址
                                    </template>
                                </div>
                                <div class="col-md-4 float-left font-weight-bold ">
                                    <template v-if="artistInfo.platform==1">
                                            {{artistInfo.weibo_url}}
                                    </template>
                                    <template v-else-if="artistInfo.platform==2">
                                            {{artistInfo.douyin_id}}
                                    </template>
                                    <template v-else-if="artistInfo.platform==3">
                                            {{artistInfo.xiaohongshu_url}}
                                    </template>
                                    <template v-else>
                                            {{artistInfo.weibo_url}}
                                            {{artistInfo.douyin_id}}
                                            {{artistInfo.xiaohongshu_url}}
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start">
                <div class="panel" style="width: calc(66% - 15px);">
                    <div class="col-md-12">
                        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2" >
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-schedule"
                                aria-controls="forum-base"
                                aria-expanded="true" role="tab"  :class="artistInfo.sign_contract_status == 2?'active':''">日程</a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-projects"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" >项目</a>
                            </li>
                            <li class="nav-item" role="presentation" >
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-tasks"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" >
                                    <!-- <template v-if="tasksInfo.length > 0">
                                        <ToolTips :title="`已完成数量${completeNum}`">
                                            任务 ({{completeNum}}/{{tasksInfo.length}})
                                        </ToolTips>
                                    </template> -->
                                    <!-- <template v-if="tasksInfo.length == 0">
                                        <ToolTips :title="`已完成数量${0}`">
                                            任务 ({{0}}/{{tasksInfo.length}})
                                        </ToolTips>
                                    </template> -->
                                    <ToolTips v-if="alltaskshow.length > 0" :title="`已完成数量${completeNum}`">
                                        任务 ({{completeNum}}/{{alltaskshow.length}})
                                    </ToolTips>
                                    <span v-else>任务</span>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-work"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" >作品库</a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 3">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-fans"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" >粉丝数据</a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2" @click="getArtistsBill">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-bill"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" >账单</a>
                            </li>
                            <li class="nav-item" role="presentation" >
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-base"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab" :class="artistInfo.sign_contract_status == 2?'':'active'">概况</a>
                            </li>
                        </ul>
                        <div class="tab-content nav-tabs-animate bg-white col-md-12">
                            <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-schedule"
                                role="tabpanel" :class="artistInfo.sign_contract_status == 2?'active':''">
                                <div class="col-md-12">
                                    <calendar  :calendars="calendarId" ref="calendar" :isModel="true" @scheduleClick="showScheduleModal"></calendar>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-projects"
                                role="tabpanel">
                                <table class="table table-hover is-indent example" data-plugin="animateList"
                                    data-animate="fade"
                                    data-child="tr"
                                    data-selectable="selectable">
                                    <tr class="animation-fade"
                                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                        <th class="cell-300" scope="col">项目名称</th>
                                        <th class="cell-300" scope="col">负责人</th>
                                        <th class="cell-300" scope="col">关联公司</th>
                                        <th class="cell-300" scope="col">录入日期</th>
                                        <th class="cell-300" scope="col">博主分成</th>
                                    </tr>
                                    <tr v-for="(item,index) in ProjectsInfo" :key="index" @click="projectdetil(item.id)" class="Jump">
                                        <td>{{item.title}}</td>
                                        <td>{{item.principal.data.name}}</td>
                                        <td>{{item.company}}</td>
                                        <td>{{item.created_at}}</td>
                                        <td v-for="(v,index) in item.relate_project_bills_resource.data" :key="index">{{v.bigger_divide}}</td>
                                    </tr>
                                </table>
                                <div class="col-md-1" style="margin: 6rem auto" v-if="ProjectsInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                        style="width: 100%">
                                </div>
                            </div>
                            <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-tasks"
                                role="tabpanel" >
                                <table class="table table-hover is-indent example" data-plugin="animateList"
                                    data-animate="fade"
                                    data-child="tr"
                                    data-selectable="selectable">
                                    <tr class="animation-fade"
                                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                        <th class="cell-300" scope="col">任务名称</th>
                                        <th class="cell-300" scope="col">任务类型</th>
                                        <th class="cell-300" scope="col">状态</th>
                                        <th class="cell-300" scope="col">负责人</th>
                                        <th class="cell-300" scope="col">截止日期</th>
                                    </tr>
                                    <template v-if="alltaskshow">
                                    <tr v-for="(task,index) in alltaskshow" :key="index"  @click="taskdetail(task.id)" class="Jump">
                                        <td>{{task.title}}</td>
                                        <td v-if="task.type">{{task.type.data.title}}</td>
                                        <td v-if="!task.type">未选择</td>
                                        <td>
                                            <template v-if="task.status === 1"><span style="color:#FF9800">进行中</span>
                                            </template>
                                            <template v-if="task.status === 2"><span style="color:#4CAF50">已完成</span>
                                            </template>
                                            <template v-if="task.status === 3"><span style="color:#9E9E9E">已停止</span>
                                            </template>
                                            <template v-if="task.status === 4"><span style="color:#F44336">延期</span>
                                            </template>
                                        </td>
                                        <td>{{task.principal.data.name}}</td>
                                        <td>{{task.end_at}}</td>
                                    </tr>
                                    </template>
                                </table>
                                <div class="col-md-1" style="margin: 6rem auto" v-if="tasksInfo.length==0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                        style="width: 100%">
                                </div>
                                <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                    data-target="#addTask">
                                    <button type="button"
                                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                                        <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-work"
                                role="tabpanel">
                                <table class="table table-hover is-indent example" data-plugin="animateList"
                                    data-animate="fade" data-child="tr">
                                    <tr class="animation-fade"
                                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                        <th class="cell-300" scope="col">昵称</th>
                                        <th class="cell-300" scope="col">视频名称</th>
                                        <th class="cell-300" scope="col">视频发布时间</th>
                                        <th class="cell-300" scope="col">阅转比</th>
                                        <th class="cell-300" scope="col">视频链接</th>
                                        <th class="cell-300" scope="col">是否广告</th>
                                    </tr>
                                    <tbody>
                                    <tr v-for="work in worksData" :key="work.id">
                                        <td>{{work.nickname}}</td>
                                        <td>{{work.videoname}}</td>
                                        <td>{{work.release_time}}</td>
                                        <td>{{work.read_proportion}}</td>
                                        <td @click="Jump(work.link)">
                                            <template v-show="work.link">
                                                {{work.link}}
                                            </template>
                                        </td>
                                        <td v-if="work.advertising==1">
                                            是
                                        </td>
                                        <td v-else-if="work.advertising==0">
                                            否
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="col-md-1" style="margin: 6rem auto" v-if="worksData.length==0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                        style="width: 100%">
                                </div>
                                <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                    data-target="#addWork">
                                    <button type="button"
                                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                                        <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-fans"
                                role="tabpanel" v-show="artistInfo.sign_contract_status == 3">
                                <div id="myChart"
                                    style="width:50vw ;height:400px; margin-top:30px;padding-bottom: 20px"></div>
                            </div>
                        <!-- 账单 -->
                            <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-bill"
                                role="tabpanel">
                                <div class="clearfix my-10">
                                    <div style="padding: .715rem .6rem">
                                        <div class="income" v-if="calculatedAmount.incomesum">
                                            <div class="float-left pr-40">收款金额</div>
                                            <div class="float-left pr-40 money-color">{{calculatedAmount.incomesum}}元</div>
                                        </div>
                                        <div class="income" v-if="!calculatedAmount.incomesum">
                                            <div class="float-left pr-40">收款金额</div>
                                            <div class="float-left pr-40 money-color">0元</div>
                                        </div>
                                        <div class="expendituresum" v-if="calculatedAmount.expendituresum">
                                            <div class="float-left pr-40">付款金额</div>
                                            <div class="float-left pr-40 money-color">{{calculatedAmount.expendituresum}}元</div>
                                        </div>
                                        <div class="expendituresum" v-if="!calculatedAmount.expendituresum">
                                            <div class="float-left pr-40">付款金额</div>
                                            <div class="float-left pr-40 money-color">0元</div>
                                        </div>
                                    </div>
                                </div>

                            <table class="table table-hover"
                                    data-child="tr">
                                    <tr>
                                        <th class="cell-300" scope="col">费用类型</th>
                                        <th class="cell-300 position-relative" scope="col">
                                            <template v-if="expense_type == 0">全部</template>
                                            <template v-if="expense_type == 2">成本</template>
                                            <template v-if="expense_type == 1">收入</template>
                                            <i class="iconfont icon-plus-select-down pl-2" aria-hidden="true"
                                            id="projectDropdown" data-toggle="dropdown" aria-expanded="false"></i>
                                            <div class="dropdown-menu" aria-labelledby="projectDropdown" role="menu">
                                                <a class="dropdown-item" role="menuitem" v-show="expense_type !== 0"
                                                @click="getArtistsBill(1,0)">全部</a>
                                                <a class="dropdown-item" role="menuitem" v-show="expense_type !== 2"
                                                @click="getArtistsBill(1,2)">成本</a>
                                                <a class="dropdown-item" role="menuitem" v-show="expense_type !== 1"
                                                @click="getArtistsBill(1,1)">收入</a>
                                            </div>
                                        </th>
                                        <th class="cell-300" scope="col">项目名称</th>
                                        <th class="cell-300" scope="col">金额</th>
                                        <th class="cell-300" scope="col">收款/审批时间</th>
                                        <th class="cell-300" scope="col">操作人</th>
                                    </tr>
                                    <tbody>
                                    <tr v-for="(item,index) in artistBillsInfo" :key="index">
                                        <td>{{item.expense_name}}</td>
                                        <td>{{item.expense_type}}</td>
                                        <td>{{item.project_kd_name}}</td>
                                        <td>{{item.money}}元</td>
                                        <td>{{item.pay_rec_time}}</td>
                                        <td>{{item.action_user}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="col-md-1" style="margin: 6rem auto" v-if="artistBillsInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                        style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getArtistsBill" :total_pages="total_pages"
                                            :total="total"></pagination>
                            </div>
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-base"
                                role="tabpanel" :class="artistInfo.sign_contract_status == 2?'':'active'">
                                <div class="card">
                                    <div class="card-header card-header-transparent card-header-bordered">
                                        <div class="float-left font-weight-bold third-title">博主信息</div>
                                        <div class="float-right pointer-content" v-show="isStatrtEdit">
                                            <i class="iconfont icon-bianji2" aria-hidden="true" @click="editBaseInfo"></i>
                                        </div>
                                        <div class="float-right mr-40" v-show="isEdit">
                                            <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                                            <button class="btn btn-primary" @click="changeArtistBaseInfo">确定</button>
                                        </div>
                                    </div>
                                    <div class="card-block" v-if="artistInfo">
                                        <div class="clearfix">
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">昵称</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.nickname" :is-edit="isEdit"
                                                            @change="changArtistName"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">类型</div>
                                                <div class="col-md-8 float-left font-weight-bold" v-if="artistInfo.type">
                                                    <EditSelector :content="artistInfo.type.data.id"
                                                                :options="artistTypeArr"
                                                                :is-edit="isEdit"
                                                                @change="changArtistType"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">沟通状态</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditSelector :content="artistInfo.communication_status"
                                                                :options="papiCommunicationStatusArr"
                                                                :is-edit="isEdit"
                                                                @change="changeArtistCommunication"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">社交平台</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditSelector :is-edit="isEdit" :multiple="true"
                                                                :content="artistInfo.platform ? artistInfo.platform.split(',') : ''"
                                                                :options="artistSocialPlatform"
                                                                @valuelistener="changeArtistPlatform_id"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-4 float-left text-right pl-0">与我司签约意向</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <ConditionalInput ref="condition" :is-edit="isEdit" :content="artistInfo.intention"
                                                                    :input-content="artistInfo.intention_desc"
                                                                    :condition="2"
                                                                    @change="(value) => changeArtistSigning(value, 'intention')"></ConditionalInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-4 float-left text-right pl-0">签约其他公司</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <ConditionalInput ref="condition1" :is-edit="isEdit"
                                                                    :content="artistInfo.sign_contract_other"
                                                                    :input-content="artistInfo.sign_contract_other_name"
                                                                    :condition="1"
                                                                    @change="(value) => changeArtistSigning(value, 'sign_contract_other')"></ConditionalInput>
                                                </div>
                                            </div>
                                           
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">微博链接</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.weibo_url" :is-edit="isEdit"
                                                            @change="changeArtistWeibo_url"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">微博粉丝数</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.weibo_fans_num" :is-edit="isEdit"
                                                            @change="changeArtistWeibo_fans_num"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">抖音Id</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.douyin_id" :is-edit="isEdit"
                                                            @change="changeArtistDouyin_id"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">抖音粉丝数</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.douyin_fans_num" :is-edit="isEdit"
                                                            @change="changeArtistDouyin_fans_num"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">小红书链接</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.xiaohongshu_url" :is-edit="isEdit"
                                                            @change="changeArtistXiaohongshu_url"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">小红书粉丝数</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.xiaohongshu_fans_num" :is-edit="isEdit"
                                                            @change="changeArtistXiaohongshu_fans_num"></EditInput>
                                                </div>
                                            </div>

                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">备注</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.desc" :is-edit="isEdit"
                                                            @change="changeArtistDesc"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">博主级别</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditSelector :content="artistInfo.level"
                                                                :options="taskLevelArr"
                                                                :is-edit="isEdit"
                                                                @change="changeArtistLevel"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">孵化期</div>
                                                <div class="col-md-8 float-left font-weight-bold" >
                                                    <EditGroupDatePicker :content="Incubationperiod" :is-edit="isEdit"
                                                                        @change="changeArtistHatch"></EditGroupDatePicker>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">商务合作要求</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.cooperation_demand" :is-edit="isEdit"
                                                            @change="changeArtistDemand"></EditInput>
                                                </div>
                                            </div>
                                           

                                            <div class="segmentation-line example float-left"></div>

                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">录入人</div>
                                                <div class="col-md-8 float-left font-weight-bold"  v-for="(entry,index) in artistInfo.creator" :key="index">
                                                    <template v-if="artistInfo.creator">
                                                    {{entry.name}}
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">录入时间</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    {{artistInfo.created_at}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">最近更新人</div>
                                                <div class="col-md-8 float-left font-weight-bold" v-for="(entry,index) in artistInfo.creator" :key="index">
                                                    <template v-if="artistInfo.creator">
                                                    {{entry.name}}
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">最近更新时间</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    {{artistInfo.updated_at}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel" style="width: calc(34% - 15px);">
                    <div class="col-md-12">
                        <div class="card col-md-12">
                            <div class="card-header card-header-transparent card-header-bordered">
                                <h5>博主跟进</h5>
                            </div>
                            <div class="card-block">
                                <div class="col-md-12 pl-0">
                                    <TaskFollowUp :follow-type="'博主'" trailType='blogger'
                                                :trailId="$route.params.id"></TaskFollowUp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增任务</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left">
                                博主 - {{ artistInfo.nickname}}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="tasksType" @change="changeTaskType" ref="mold"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称" v-model="taskName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人</div>
                            <div class="col-md-5 float-left pl-0">
                                    <InputSelectors
                                        @change="principalChange">
                                    </InputSelectors>
                            </div>

                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member @change="participantChange"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0 require">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskLevelArr" @change="changeTaskLevel" ref="taskpriority"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime" ref="startTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="startMinutes" @change="changeStartMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime" ref="deadline"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="endMinutes" @change="changeEndMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务说明</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" name="taskDescription" id="" cols="30"
                                          rows="5" title="" v-model="taskIntroduce"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addTask">确定</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="addWork" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增视频</h4>
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left">昵称</div>
                            <div class="col-md-10 float-left">{{ artistInfo.nickname}}</div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">视频名称</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control" v-model="artistWorkName"
                                       placeholder="请输入作品名称">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">视频发布时间</div>
                            <div class="col-md-10 float-left">
                                <datepicker @change="changeWorkReleaseTime" ref="workReleaseTime"></datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">阅转比</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control" v-model="artistWorkProportion"
                                       placeholder="请输入阅转比">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">视频链接</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control" v-model="videoUrl"
                                       placeholder="请输入视频链接">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">是否广告</div>
                            <div class="col-md-10 float-left">
                                <selectors :options="yesOrNoArr" @change="changeWorkAd" ref="advertisingType"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addWork">确定</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="addPrivacy" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">隐私设置</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">孵化期</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'incubation'"></add-member>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addPrivacy">确定</button>
                    </div>
                </div>
            </div>
        </div>
<!-- 分配制作人-->
        <div class="modal fade" id="distributionproducer" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple" style="max-width: 50rem;">

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <template>
                            <h4 class="modal-title">分配制作人</h4>
                        </template>
                    </div>
                    <div class="modal-body">
                        <div class="py-20">
                            <ListSelectMember type="change"></ListSelectMember>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addDistributionPerson">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="checkSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content" v-if="scheduleData">
                    <div class="modal-header">
                        <div style="order: 2">
                            <!-- <i class="iconfont icon-bianji2 pr-4 font-size-16 pointer-content"
                               @click="changeScheduleType('edit')" aria-hidden="true"></i>
                            <FileUploader is-icon="true" class="float-left" @change="fileUpload"></FileUploader>
                            <i class="iconfont icon-shanchu1 pr-4 font-size-16 pointer-content" data-toggle="modal"
                               data-target="#delModel" aria-hidden="true" @click="deleteToastr('schedule')"></i> -->
                            <i class="iconfont icon-guanbi pointer-content" aria-hidden="true" data-dismiss="modal"></i>
                        </div>
                        <h5 class="modal-title">{{ scheduleData.calendar.data.title }}</h5>
                    </div>
                    <div class="modal-body px-40">
                        <div class="">
                            <h4 class="my-20">{{ scheduleData.title }}</h4>
                        </div>
                        <div class="example">
                            <div class="">
                                <div class="col-md-3 float-left px-0">
                                    <div class="">{{ (scheduleData.start_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (scheduleData.start_at.split(' ')[0]).split('-')[2] }}日
                                        {{ scheduleData.start_at|getWeek(scheduleData.start_at) }}
                                    </div>
                                    <div class="big-time">{{ (scheduleData.start_at.split(' ')[1]).slice(0,5) }}</div>
                                </div>
                                <div class="col-md-2 float-left pl-0">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time text-center"> -</div>
                                </div>
                                <div class="col-md-3 float-left px-0">
                                    <div class="">{{ (scheduleData.end_at.split(' ')[0]).split('-')[1] }}月
                                        {{ (scheduleData.end_at.split(' ')[0]).split('-')[2] }}日
                                        {{ scheduleData.end_at|getWeek(scheduleData.end_at) }}
                                    </div>
                                    <div class="big-time">{{ (scheduleData.end_at.split(' ')[1]).slice(0,5) }}</div>
                                </div>
                                <div class="col-md-2 float-left" v-show="scheduleData.is_allday">
                                    <div class="" style="color: white"> -</div>
                                    <div class="big-time font-size-18" style="line-height: 75px">全天</div>
                                </div>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.position">
                            <div class="col-md-1 px-0 float-left">地点</div>
                            <div class="col-md-10 float-left">{{ scheduleData.position }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.material">
                            <div class="col-md-1 px-0 float-left">资源</div>
                            <div class="col-md-10 float-left">{{ scheduleData.material.data.name }}</div>
                        </div>
                        <div class="example">
                            <div class="col-md-1 px-0 float-left">组织人</div>
                            <div class="col-md-10 float-left">
                                <div class="creator-avatar float-left">
                                    <img src="https://res.papitube.com/no-icon.png" alt="">
                                </div>
                                <div class="float-left pl-2">{{ scheduleData.creator.data.name }}</div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-1 px-0 float-left">参与人</div>
                            <div class="col-md-10 float-left">
                                <span class="mr-5" v-for="(item,index) in scheduleParticipants" :key="index">{{item.name}}</span>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.desc">
                            <div class="col-md-1 px-0 float-left">备注</div>
                            <div class="col-md-10 float-left">{{ scheduleData.desc }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.affixes.data.length > 0">
                            <div>附件</div>
                            <div>
                                <div class="col-md-3 float-left text-center position-relative file-item"
                                     v-for="(affix,index) in scheduleData.affixes.data" :key="index">

                                    <div><i class="iconfont icon-wenjian" style="font-size: 36px"></i></div>
                                    <div @click="openFile(affix.url)" class="pointer-content">{{ affix.title }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    export default {
        data: function () {
            return {
                artistId: '',
                artistInfo: {},
                calculatedAmount:'',//计算金额
                artistBillsInfo: [],//账单
                artistWorkProportion: '',
                yesOrNoArr: config.yesOrNoArr,
                videoUrl: '',
                artistWorksInfo: [],
                taskTypeArr: config.taskTypeArr,
                taskName: '',
                taskLevelArr: config.taskLevelArr,
                taskType: '',
                taskLevel: '',
                startTime: '',
                startMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                taskIntroduce: '',
                artistWorkName: '',
                isEdit: false,
                isStatrtEdit: true,
                papiCommunicationStatusArr: config.papiCommunicationStatusArr,
                updateNickname:'',
                updateType:'',
                updateSign_contract_other:'',
                totalData:'',
                worksData:'',
                advertisingType:'',
                Person_id:'',
                tasksType:'',
                tasksData:'',
                artistTypeArr:'',
                trueOrFalse: config.trueOrFalse,
                artistSocialPlatform: config.artistSocialPlatform,
                petName:'',//昵称
                updateStar_weibo_infos:{},//修改微博
                updateStar_douyin_infos:{},//修改抖音
                updateStar_xiaohongshu_infos:{},//修改小红书
                updatePlatform:'',//修改平台
                participant:'',
                tasksInfo:'',
                ProjectsInfo:[],
                start_Time:'',
                end_Time:'',
                principalId:'',
                principalIds:[],
                taskLevelArr:config.taskLevelArr,
                updatelevel:'',//博主级别
                updatedemand:'',//合作需求
                updatehatch_start:'',//孵化期开始
                updatehatch_end:'',//孵化期截止
                Incubationperiod:'',
                principalName:'',
                expense_type:0,
                platformArr:config.platformArr,
                selectedCalendar:[],
                selectedDate:'',
                Namevalue:'',
                total: 0,
                current_page: 1,
                total_pages: 1,
                artistype:'',
                bloggerlevel:'',
                isLoading: true,
                distributionType:'',
                alltaskshow:[],
                changeArtistInfo:{},
                calendarId:[],
                scheduleData:''
            }
        },
        computed: {
            completeNum() {
                return this.tasksInfo.filter(n => n.status === 2).length
            }
        },
        created(){
            this.getArtist()
        },
        mounted() {
            this.getTaskDate();
            this.charts();
            this.getArtistTasks();
            let _this = this;
            this.user = JSON.parse(Cookies.get('user'))
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            })
            this.principalName = this.user.nickname;
            //  清空任务
            $('#addTask').on('hidden.bs.modal', function () {
                _this.$refs.mold.setValue('');//类型
                _this.taskType = ''
                _this.Person_id = '';//负责人
                _this.$refs.taskpriority.setValue('');
                _this.$refs.startTime.setValue('');
                _this.$refs.deadline.setValue('');
                _this.participant = '';//参与人
                _this.taskIntroduce = '';
                _this.taskName = '';
                _this.startMinutes = '00:00';
                _this.endMinutes = '00:00';
            })
            //  清空视频
            $('#addWork').on('hidden.bs.modal', function () {
                _this.artistInfo.nickname = '';
                _this.artistWorkName = '';
                _this.artistWorkProportion = '';
                _this.videoUrl = '';
                _this.artistInfo.id = '';
                _this.$refs.advertisingType.setValue('');
                _this.$refs.workReleaseTime.setValue('');
            })
            this.getTimes()
            this.getArtistsBill()
        },
        methods: {
            charts: function () {
                let myChart = echarts.init(document.getElementById('myChart'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '粉丝统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['微博', '百科', '抖音', '其他']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                              title:'保存'
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '微博',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '百科',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '抖音',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '其他',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
          
            // selectDate: function (value) {
            //     this.selectedDate = value;
            //     this.$refs.meetingRoom.setDate(value)
            // },
            getArtist: function () {
                this.artistId = this.$route.params.id;
                let _this = this;
                let data = {
                    include: 'creator,tasks,affixes,producer,type,publicity,trails.project,trails.client,trails.project.principal,trails.project.relate_project_bills_resource,calendar',
                };
                fetch('get', '/bloggers/' + this.artistId, data).then(function (response) {
                  
                    let doneTaskNum = 0
                    _this.artistInfo = response.data;
                    if(_this.artistInfo.intention){
                        _this.artistInfo.intention = 1
                    }else{
                        _this.artistInfo.intention = 2
                    }
                    if(_this.artistInfo.sign_contract_other){
                        _this.artistInfo.sign_contract_other=1
                    }else{
                        _this.artistInfo.sign_contract_other=2
                    }
                    _this.tasksInfo = response.data.tasks.data
                    if (_this.tasksInfo.length > 0) {
                        for (let i = 0; i < _this.tasksInfo.length; i++) {
                            if (_this.tasksInfo[i].status == 2) {
                                doneTaskNum = doneTaskNum + 1
                            }
                        }
                    }
                    if(response.data.calendar.data.id){
                        _this.calendarId.push(response.data.calendar.data.id)
                    }
                     //项目
                     if(response.data.trails){
                        for (let i = 0; i < response.data.trails.data.length; i++) {
                            if (response.data.trails.data[i].project.data) {
                                response.data.trails.data[i].project.data.company = response.data.trails.data[i].client.data.company
                                _this.ProjectsInfo.push(response.data.trails.data[i].project.data)
                            }
                        }
                     }
                    //孵化期时间 
                    if(_this.artistInfo.hatch_star_at&&_this.artistInfo.hatch_end_at){
                        _this.Incubationperiod = _this.artistInfo.hatch_star_at+'|'+_this.artistInfo.hatch_end_at
                    }
                    _this.isLoading = false;
                });
                //任务状态跑组。试戏
                fetch('get', '/task_types').then(function (response) {
                    _this.tasksType = response.data;
                })
                fetch('get', '/bloggers/gettype').then(function (response) {
                    _this.artistTypeArr = response.data
                })
                //  fetch('get','/bloggers/select?include=users').then(function(response){
                //     response.data.forEach(item=>{
                //          _this.principalIds.push(item.users.data.id)
                //     })
                // })
            },
             showScheduleModal: function (schedule) {
                let data = {
                    include: 'calendar,participants,creator,material,affixes',
                };
                fetch('get', '/schedules/' + this.calendarId, data).then(response => {
                    this.scheduleData = response.data;
                    this.scheduleParticipants = JSON.parse(JSON.stringify(response.data.participants.data));
                    this.$store.dispatch('changeParticipantsInfo', {data: response.data.participants.data});
                });
                $('#checkSchedule').modal('show')
            },
            //账单
            getArtistsBill(page = 1,expense_type){
                let _this=this;
                if(!expense_type){
                    _this.expense_type =0 
                }else{
                    _this.expense_type = expense_type
                }
               
                fetch('get','/bloggers/'+this.artistId +'/bill',{page: page,expense_type:expense_type}).then(function(response){
                    _this.artistBillsInfo = response.data
                    _this.calculatedAmount=response.meta;
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                })
            },
            //作品
            getTaskDate:function(){
                let _this = this;
                fetch('get','/bloggers/index/production?blogger_id='+this.artistId+'').then(function(response){
                    _this.worksData=response.data
                    response.data.forEach(item=>{
                        let time=new Date(item.release_time)
                        let Y = time.getFullYear() + '-';
                        let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
                        let D = time.getDate() + ' ';
                        item.release_time=Y+M+D
                    })
                });
            },
            getArtistTasks: function () {
                let _this = this;
                fetch('get', '/bloggers/' + this.artistId+'/tasks').then(function (response) {
                    _this.alltaskshow = response.data
                })
            },
            addPrivacy: function () {
                $('#addPrivacy').modal('hide')
                this.$store.state.collectInfo = []
                this.$store.state.payInfo = []
                this.$store.state.contractInfo = []
                this.$store.state.divisionInfo = []
                this.$store.state.incubationInfo = []
                this.$store.state.billInfo = []
            },
            editBaseInfo: function () {
                this.isEdit = true;
                this.isStatrtEdit = false
                this.changeInfo = [];
            },
            cancelEdit: function () {
                this.getArtist()
                this.isEdit = false;
                this.isStatrtEdit = true
            },
            distributionPerson: function (value) {
                this.distributionType = value;
                if (this.artistInfo[value].data.length > 0) {
                    this.$store.state.participantsInfo = Object.assign([], this.artistInfo[value].data)
                }
            },
            //分配制作人
             addDistributionPerson: function () {
                let toast
                let data = {
                    person_ids: [],
                    del_person_ids: [],
                    moduleable_type: 'blogger',
                    moduleable_ids: [this.artistId],
                    type:4
                };
                let personInfo = this.$store.state.participantsInfo;
                let oldPersonInfo = this.artistInfo[this.distributionType].data
                //todo 删除和新增的数据有问题
                if (this.artistInfo[this.distributionType].data.length > 0) {
                    for (let i = 0; i < this.artistInfo[this.distributionType].data.length; i++) {
                        if (personInfo.map(item => item.id).indexOf(this.artistInfo[this.distributionType].data[i].id) === -1) {
                            data.del_person_ids.push(this.artistInfo[this.distributionType].data[i].id)
                        }
                    }
                }
                for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                    data.person_ids.push(this.$store.state.participantsInfo[i].id)
                }
                if (this.distributionType === 'publicity') {
                    data.type = 4
                    toast = '分配制作人成功'
                }
                let _this = this;
                fetch('post', '/distribution/person', data).then(function (response) {
                    toastr.success(toast)
                    $('#distributionproducer').modal('hide');
                    _this.getArtist();
                    _this.$store.state.participantsInfo = []
                })
            },
            //类型
            changArtistType: function (value) {
                this.artistInfo.type.data.id= value
            },
            //沟通状态
            changeArtistCommunication: function (value) {
                this.artistInfo.communication_status = value
            },
            //我公司签约
            changeArtistIntention: function (value) {
                if (value == 1) {
                    this.artistInfo.intention = true
                } else {
                    this.artistInfo.intention = false
                }
            },
            //签约其他公司
            changeArtistSignStatus: function (value) {
                if (value == 1) {
                    this.artistInfo.sign_contract_other = true
                } else {
                    this.artistInfo.sign_contract_other = false
                }
            },
            //平台id
            changeArtistPlatform_id(value) {
                this.updatePlatform = value.join(',')
            },
            changeArtistSigning(value,name){
                if(name === 'intention'){
                    if (value.key === 'value') {
                        name = 'intention_desc'
                        this.artistInfo.intention_desc = value.value
                    }
                    if(value.key === 'condition'){
                        name = 'intention'
                        this.artistInfo.intention = value.value
                    }
                  
                }else if(name === 'sign_contract_other'){
                    if (value.key === 'value') {
                        name = 'sign_contract_other_name'
                        this.artistInfo.sign_contract_other_name = value.value
                    }
                    if(value.key === 'condition'){
                        name = 'sign_contract_other'
                        this.artistInfo.sign_contract_other= value.value
                    }
                   
                }
            },
            //修改
            changeArtistBaseInfo: function () {
                
                this.isEdit = false;
                this.isStatrtEdit = true;
                let _this = this;
                this.artistId = this.$route.params.id;
                if(this.artistInfo.intention==1){
                        this.artistInfo.intention = true
                }else{
                        this.artistInfo.intention = false
                }
                if(this.artistInfo.sign_contract_other==1){
                        this.artistInfo.sign_contract_other=true
                }else{
                    this.artistInfo.sign_contract_other=false
                }
                this.changeArtistInfo = {
                    nickname:this.Namevalue,
                    type_id:this.artistInfo.type.data.id,
                    communication_status:this.artistInfo.communication_status,
                    intention:this.artistInfo.intention,
                    sign_contract_other: this.artistInfo.sign_contract_other,
                    desc: this.artistInfo.desc,
                    star_douyin_infos: this.updateStar_douyin_infos,
                    star_weibo_infos: this.updateStar_weibo_infos,
                    star_xiaohongshu_infos: this.updateStar_xiaohongshu_infos,
                    platform: this.updatePlatform,
                    level:this.updatelevel,
                    cooperation_demand: this.updatedemand,
                    hatch_star_at: this.artistInfo.hatch_star_at,
                    hatch_end_at: this.artistInfo.hatch_end_at,
                    intention_desc:this.artistInfo.intention_desc,
                    sign_contract_other_name:this.artistInfo.sign_contract_other_name
                }
                if(!this.updatelevel){
                    delete(this.changeArtistInfo.level)
                }
                if(!this.artistInfo.hatch_star_at||!this.artistInfo.hatch_end_at){
                    delete(this.changeArtistInfo.hatch_star_at)
                    delete(this.changeArtistInfo.hatch_end_at)
                }
                // if (JSON.stringify(this.changeArtistInfo) !== "{}"){
                //     return
                // }
                fetch('put', '/bloggers/' + this.artistId, this.changeArtistInfo).then(function (response) {
                    toastr.success('修改成功');
                    _this.getArtist()
                    $('.selectpicker').selectpicker('refresh')
                })
                if(this.artistInfo.intention==true){
                    this.artistInfo.intention=1
                }else{
                    this.artistInfo.intention=2
                }

                if(this.artistInfo.sign_contract_other==true){
                        this.artistInfo.sign_contract_other=1
                }else{
                    this.artistInfo.sign_contract_other=2
                }
            },
            changeWorkAd: function (value) {
                if (value) {
                    this.advertisingType = value.id;
                } else {
                    this.advertisingType = 0;
                }
            },
            //添加作品
            addWork: function () {
                if (this.advertisingType == 2) {
                    this.advertisingType = 0
                }
                let _this = this;
                let data = {
                    nickname: this.artistInfo.nickname,
                    videoname: this.artistWorkName,
                    release_time: this.workReleaseTime,
                    read_proportion: this.artistWorkProportion,
                    link: this.videoUrl,
                    advertising: this.advertisingType,
                    blogger_id: this.artistInfo.id
                }
                fetch('post', '/bloggers/new/production', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addWork').modal('hide');
                    _this.getTaskDate()
                })
                // let obj={
                //     title:'制作人视频评分-视频评分',
                //     principal_id:this.user.id,
                //     start_at:this.start_Time,
                //     end_at:this.end_Time,
                //     participant_ids:this.principalIds,
                //     resource_type:1,
                //     resourceable_id:this.artistId,
                //     desc:'这是一个评分问卷任务',//默认
                //     type:1609922710//评分问卷
                // }
                // fetch('post', '/tasks', obj
                // ).then(function (response) {
                //     _this.getArtist()
                // })
            },
            //孵化期截止时间计算
            getTimes:function(){
                let end_date='';
                let end_hour='';
                let end_minute='';
                let end_second='';
                let end_timeStamp ='';
                let time = new Date;
                let start_year = time.getFullYear();
                let start_month = time.getMonth()+1;
                    if(start_month<10){
                        start_month="0"+start_month;
                    }
                    let start_date=time.getDate();
                    if(start_date<10){
                        start_date="0"+start_date;
                    }
                    let start_hour=time.getHours();
                    end_hour=(23-start_hour)*60*60*1000
                    if(start_hour<10){
                        start_hour="0"+start_hour;
                    }
                    let start_minute=time.getMinutes();
                    end_minute=(59-start_minute)*60*1000
                    if(start_minute<10){
                        start_minute=start_minute;
                    }
                    let start_second=time.getSeconds();
                    end_second=(60-start_second)*1000
                    if(start_minute<10){
                        start_minute="0"+start_minute;
                    }
                    this.start_Time = start_year+"-"+start_month+"-"+start_date+" "+start_hour+":"+start_minute+":"+start_second
                     if(time.getDay()<=5){
                        end_date = (5-time.getDay())*60*60*1000*24
                        end_timeStamp = time.getTime()+end_date+end_hour+end_minute+end_second
                    }else if(time.getDay()>5){
                        end_date = (7-time.getDay()+5)*60*60*1000*24
                        end_timeStamp = time.getTime()+end_date+end_hour+end_minute+end_second
                    }
                    let end = new Date(end_timeStamp)
                    let Y = end.getFullYear() + '-';
                    let M = (end.getMonth()+1 < 10 ? '0'+(end.getMonth()+1) : end.getMonth()+1) + '-';
                    let D = end.getDate() + ' ';
                    let h = end.getHours() + ':';
                    let m = end.getMinutes() + ':';
                    let s = end.getSeconds();
                    this.end_Time=Y+M+D+h+m+s
            },
            //添加任务
            addTask: function () {
                if (!this.taskName) {
                    toastr.error('请填写任务名称！')
                    return
                }
                if (!this.taskType) {
                    toastr.error('请选择任务类型！')
                    return
                }
                if (!this.taskLevel) {
                    toastr.error('请选择任务优先级！')
                    return
                }
                if (!this.startTime || !this.endTime) {
                    toastr.error('请选择时间!')
                    return
                }
                // if ((this.startTime + " " + this.startMinutes) > (this.endTime + " " + this.endMinutes)) {
                //     toastr.error('开始时间不能晚于截止时间');
                //     return
                // }
                let start,end,startMin,endMin
                startMin = this.startMinutes.split(':')
                endMin = this.endMinutes.split(':')
                start =new Date(this.startTime).getTime()+startMin[0]*60*60*1000+startMin[1]*60*1000
                end = new Date(this.endTime).getTime()+endMin[0]*60*60*1000+endMin[1]*60*1000
                if(start>end){
                    toastr.error('开始时间不能晚于截止时间');
                    return false;
                }
                let _this=this;
                let data={
                   title:this.taskName,
                   principal_id:this.Person_id,
                   start_at: this.startTime + ' ' + this.startMinutes,
                   end_at: this.endTime + ' ' + this.endMinutes,
                   resource_type:1,
                   resourceable_id:this.artistInfo.id,
                   priority: this.taskLevel,
                   desc:this.taskIntroduce,
                   type:this.taskType
                }
                fetch('post', '/tasks', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    _this.tasksData = response.data;
                    _this.getArtist()
                    $('.selectpicker').selectpicker('refresh')
                })
            }
            ,
            changeTaskType: function (value) {
                this.taskType = value
            }
            ,
            principalChange: function (value) {
                this.Person_id = value = this.$store.state.newPrincipalInfo.id
            }
            ,
            participantChange: function (value) {
                this.participant = value
            }
            ,
            changeTaskLevel: function (value) {
                this.taskLevel = value
            }
            ,
            changeStartTime: function (value) {
                this.startTime = value
            }
            ,
            changeStartMinutes: function (value) {
                this.startMinutes = value
            }
            ,
            changeEndTime: function (value) {
                this.endTime = value
            }
            ,
            changeEndMinutes: function (value) {
                this.endMinutes = value
            }
            ,
            //视频时间
            changeWorkReleaseTime: function (value) {
                this.workReleaseTime = value
            }
            ,
            //昵称
            changArtistName: function (value) {
                this.Namevalue = value
            }
            ,
            //微博地址
            changeArtistWeibo_url(value) {
                this.updateStar_weibo_infos.url = value
            }
            ,
            //微博粉丝
            changeArtistWeibo_fans_num(value) {
                this.updateStar_weibo_infos.avatar = value
            }
            ,
            //抖音id
            changeArtistDouyin_id(value) {
                this.updateStar_douyin_infos.url = value
            }
            ,
            //抖音粉丝数
            changeArtistDouyin_fans_num(value) {
                this.updateStar_douyin_infos.avatar = value
            }
            ,
            //小红书地址
            changeArtistXiaohongshu_url(value) {
                this.updateStar_xiaohongshu_infos.url = value
            }
            ,
            //小红书粉丝数
            changeArtistXiaohongshu_fans_num(value) {
                this.updateStar_xiaohongshu_infos.avatar = value
            }
            ,
            //备注
            changeArtistDesc: function (value) {
                this.artistInfo.desc = value
            }
            ,
            //博主级别
            changeArtistLevel: function (value) {
               this.updatelevel= value
            }
            ,
            //孵化期
            changeArtistHatch: function (start, end) {
                this.artistInfo.hatch_star_at = start
                this.artistInfo.hatch_end_at = end
            }
            ,
            //合作需求
            changeArtistDemand: function (value) {
                this.updatedemand = value
            }
            ,
            taskdetail(id) {
                this.$router.push({path: '/tasks/' + id})
            },
            projectdetil(id) {
                this.$router.push({path: '/projects/' + id})
            },
            Jump(value){
              let price = value;
              let str=/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?///网址是否合法检测
              let regex = /(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi//http,https有无检测
              var re=new RegExp(str);
                if (!re.test(value)) {
                     alert('您的网址不正确')
                }else{
                   value = value.replace(regex, function (match, capture) {
                    if (capture) {
                         window.open(price)
                    }
                    else {
                         window.open('http://' + match)
                    }
                   })
                }
            },
            JumpDetails(id){
                this.$router.push({path: '/tasks/' + id})
            },
            projectDetails(id){
                this.$router.push({path: '/projects/' + id})
            },
        },
        filters: {
            getWeek: function (date) {
                let week = new Date(date).getDay();
                let value = '';
                switch (week) {
                    case 0:
                        value = '周日';
                        break;
                    case 1:
                        value = '周一';
                        break;
                    case 2:
                        value = '周二';
                        break;
                    case 3:
                        value = '周三';
                        break;
                    case 4:
                        value = '周四';
                        break;
                    case 5:
                        value = '周五';
                        break;
                    case 6:
                        value = '周六';
                        break;
                }
                return value;
            }
        },
    }
</script>

<style>
    .task-dropdown {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2;
    }
    .task-dropdown-item {
        position: absolute;
        transform: translate3d(299px, 36px, 0px);
        top: 0;
        left: 0;
        will-change: transform;
    }
    .Jump,.taskshow,.projectshow{
        cursor:pointer;
    }
    textarea{
        overflow: hidden;
    }
    .card-block .card-text {
        display: flex;
        align-items: center;
    }

    .creator-avatar {
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius: 100%;
    }

    li {
        list-style: none;
    }

    .calendar-color-list li {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin-right: 10px;
    }

    .calendar-color-list li i {
        line-height: 20px;
        color: white;
        text-align: center;
        position: absolute;
        left: 5px;
    }

    .calendar-checkbox {
        width: 20px;
        height: 20px;
        border-radius: 2px;
    }

    .calendar-title {
        padding: 20px 20px 10px;
    }

    .calendar-list ul li {
        padding: 7px 0;
        border-bottom: 1px solid #E0E0E0;
    }

    .calendar-list ul {
        padding: 0 20px;
        margin-top: 10px;

    }

    .calendar-list ul li .calendar-checkbox i {
        color: white;
        text-align: center;
        left: 5px;
    }

    .big-time {
        font-size: 48px;
        color: #3F51B5;
        font-weight: bold;
    }

    .follow-avatar {
        border-radius: 100%;
        overflow: hidden;
        width: 40px;
        height: 40px;
    }

    .creator-avatar {
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius: 100%;
    }
</style>