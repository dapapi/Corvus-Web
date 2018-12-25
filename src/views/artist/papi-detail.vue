<template>
    <div class="page">
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">博主详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem">分享</a>
                    <a class="dropdown-item" role="menuitem">分配制作人</a>
                    <a class="dropdown-item" role="menuitem">自定义字段</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addPrivacy">隐私设置</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block" v-if="artistInfo">
                    <h4 class="card-title">{{ artistInfo.nickname }}</h4>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0" v-if="totalData.publicity">
                            <div class="float-left pl-0 pr-2 col-md-2 pt-10">
                                <i class="iconfont icon-yonghu"></i>
                                制作人
                            </div>
                            <div class="font-weight-bold float-left p-10" v-for="item in totalData.publicity.data"
                                 :key="item.id">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="col-md-6 float-left pl-0 mb-20" style="border-right: 1px solid #eee" v-if="tasksInfo.length>0">
                        <div class="col-md-6"><i class="iconfont icon-iconset0399"></i> 任务{{taskNum}}</div>
                        <div class="clearfix example" v-for="(task,index) in tasksInfo" :key="index">
                            <div class="col-md-3 float-left">{{task.title}}</div>
                            <div class="col-md-3 float-left">{{task.principal.data.name}}</div>
                            <div class="col-md-3 float-left">{{task.end_at}}</div>
                            <div class="col-md-3 float-left">
                                <template v-if="task.status === 1"><span style="color:#FF9800">进行中</span></template>
                                <template v-if="task.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                <template v-if="task.status === 3"><span style="color:#9E9E9E">已停止</span></template>
                                <template v-if="task.status === 4"><span style="color:#F44336">延期</span></template>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 float-left pl-0 mb-20" v-if="ProjectsInfo.length>0">
                        <div class="col-md-6"><i class="iconfont icon-ego-box"></i>项目</div>
                        <div class="clearfix example" v-for="(item,index) in ProjectsInfo" :key="index">
                            <div class="col-md-3 float-left">{{item.title}}</div>
                            <div class="col-md-3 float-left">{{item.principal.data.name}}</div>
                            <div class="col-md-3 float-left">{{item.end_at}}</div>
                            <div class="col-md-3 float-left">
                                <template v-if="item.status === 1"><span style="color:#FF9800">进行中</span></template>
                                <template v-if="item.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                <template v-if="item.status === 3"><span style="color:#9E9E9E">撤单</span></template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 panel">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist-schedule"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">日程</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-projects"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">项目</a>
                        </li>
                        <li class="nav-item" role="presentation" >
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-tasks"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">
                                <template v-if="tasksInfo.length > 0">
                                    <ToolTips :title="`已完成数量${completeNum}`">
                                        任务 ({{completeNum}}/{{tasksInfo.length}})
                                    </ToolTips>
                                </template>
                                <template v-if="tasksInfo.length == 0">
                                    <ToolTips :title="`已完成数量${0}`">
                                        任务 ({{0}}/{{tasksInfo.length}})
                                    </ToolTips>
                                </template>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-work"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">作品库</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-fans"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">粉丝数据</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtistsBill">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-bill"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">账单</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-base"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">概况</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate bg-white col-md-12">
                        <div class="tab-pane animation-fade active pb-20 fixed-button-father" id="forum-artist-schedule"
                             role="tabpanel">
                            <div class="col-md-12">
                                <calendar></calendar>
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
                                    <th class="cell-300" scope="col">项目状态</th>
                                    <th class="cell-300" scope="col">负责人</th>
                                    <th class="cell-300" scope="col">关联公司</th>
                                    <th class="cell-300" scope="col">录入日期</th>
                                </tr>
                                <tr v-for="(item,index) in ProjectsInfo" :key="index">
                                    <td @click="projectdetil(v.project.data.id)" class="Jump">{{item.title}}</td>
                                    <td>
                                        <template v-if="item.status === 1"><span style="color:#FF9800">进行中</span>
                                        </template>
                                        <template v-if="item.status === 2"><span style="color:#4CAF50">已完成</span>
                                        </template>
                                        <template v-if="item.status === 3"><span style="color:#9E9E9E">撤单</span>
                                        </template>
                                    </td>
                                    <td>{{item.principal.data.name}}</td>
                                    <td>{{item.company}}</td>
                                    <td>{{item.created_at}}</td>
                                </tr>
                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="ProjectsInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-tasks"
                             role="tabpanel">
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
                                <tr v-for="(task,index) in tasksInfo" :key="index" v-if="task">
                                    <td @click="taskdetail(task.id)" class="Jump">{{task.title}}</td>
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
                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="tasksInfo.length==0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                 data-target="#addTask">
                                <button type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon iconfont icon-tianjia animation-scale-up"
                                       aria-hidden="true"></i>
                                    <i class="back-icon iconfont icon-tianjia animation-scale-up"
                                       aria-hidden="true"></i>
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
                                    <i class="front-icon iconfont icon-tianjia animation-scale-up"
                                       aria-hidden="true"></i>
                                    <i class="back-icon iconfont icon-tianjia animation-scale-up"
                                       aria-hidden="true"></i>
                                    
                                </button>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-fans"
                             role="tabpanel">
                            粉丝
                            <div id="myChart"
                                 style="width:80vw ;height:400px; margin-top:30px;padding-bottom: 20px"></div>
                        </div>
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-bill"
                             role="tabpanel">
                            <div class="clearfix my-10">
                                <div style="padding: .715rem 1.429rem">
                                    <div class="float-left pr-40">收款金额</div>
                                    <div class="float-left pr-40 money-color">10000000元</div>
                                    <div class="float-left pr-40">付款金额</div>
                                    <div class="float-left pr-40 money-color">10000000元</div>
                                </div>
                            </div>

                            <table class="table table-hover" data-child="tr">
                                <tr>
                                    <th class="cell-300" scope="col">费用类型</th>
                                    <th class="cell-300 position-relative" scope="col">
                                        <template v-if="filterFee === 1">全部</template>
                                        <template v-if="filterFee === 2">成本</template>
                                        <template v-if="filterFee === 3">收入</template>
                                        <i class="iconfont icon-gengduo1 pl-2" aria-hidden="true"
                                           id="projectDropdown" data-toggle="dropdown" aria-expanded="false"></i>
                                        <div class="dropdown-menu" aria-labelledby="projectDropdown" role="menu">
                                            <a class="dropdown-item" role="menuitem" v-show="filterFee !== 1"
                                               @click="filterProjectFee(1)">全部</a>
                                            <a class="dropdown-item" role="menuitem" v-show="filterFee !== 2"
                                               @click="filterProjectFee(2)">成本</a>
                                            <a class="dropdown-item" role="menuitem" v-show="filterFee !== 3"
                                               @click="filterProjectFee(3)">收入</a>
                                        </div>
                                    </th>
                                    <th class="cell-300" scope="col">项目名称</th>
                                    <th class="cell-300" scope="col">金额</th>
                                    <th class="cell-300" scope="col">收款/审批时间</th>
                                    <th class="cell-300" scope="col">操作人</th>
                                </tr>
                                <tbody>
                                <tr v-for="bill in artistBillsInfo">
                                    <td>{{ bill.expence_name }}</td>
                                    <td>{{ bill.expense_type }}</td>
                                    <td>{{ bill.project_kd_name }}</td>
                                    <td>{{ bill.money }}</td>
                                    <td>{{ bill.pay_rec_time }}</td>
                                    <td>{{ bill.action_user }}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="artistBillsInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                        <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-base"
                             role="tabpanel">
                            <div class="card">
                                <div class="card-header card-header-transparent card-header-bordered">
                                    <div class="float-left font-weight-bold third-title">艺人信息</div>
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
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">昵称</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.nickname" :is-edit="isEdit"
                                                           @change="changArtistName"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">类型</div>
                                            <div class="col-md-10 float-left font-weight-bold" v-if="artistInfo.type">
                                                <EditSelector :content="artistInfo.type.data.id"
                                                              :options="artistTypeArr"
                                                              :is-edit="isEdit"
                                                              @change="changArtistType"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">沟通状态</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :content="artistInfo.communication_status"
                                                              :options="papiCommunicationStatusArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistCommunication"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">与我司签约意向</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :content="updateType"
                                                              :options="yesOrNoArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistIntention"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">是否签约其他公司</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :content="updateSign_contract_other"
                                                              :options="yesOrNoArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistSignStatus"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">社交平台</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :multiple="true"
                                                              :content="artistInfo.platform ? artistInfo.platform.split(',') : ''"
                                                              :options="artistSocialPlatform"
                                                              @valuelistener="changeArtistPlatform_id"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">微博主页地址</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.weibo_url" :is-edit="isEdit"
                                                           @change="changeArtistWeibo_url"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">微博粉丝数</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.weibo_fans_num" :is-edit="isEdit"
                                                           @change="changeArtistWeibo_fans_num"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">抖音Id</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.douyin_id" :is-edit="isEdit"
                                                           @change="changeArtistDouyin_id"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">抖音粉丝数</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.douyin_fans_num" :is-edit="isEdit"
                                                           @change="changeArtistDouyin_fans_num"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">小红书链接</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.xiaohongshu_url" :is-edit="isEdit"
                                                           @change="changeArtistXiaohongshu_url"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">小红书粉丝数</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.xiaohongshu_fans_num" :is-edit="isEdit"
                                                           @change="changeArtistXiaohongshu_fans_num"></EditInput>
                                            </div>
                                        </div>

                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">备注</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.desc" :is-edit="isEdit"
                                                           @change="changeArtistDesc"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">博主级别</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :content="artistInfo.level"
                                                              :options="taskLevelArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistLevel"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">孵化期</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditGroupDatePicker :content="Incubationperiod" :is-edit="isEdit"
                                                                     @change="changeArtistHatch"></EditGroupDatePicker>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                            <div class="col-md-2 float-left text-right pl-0">商务合作要求</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.cooperation_demand" :is-edit="isEdit"
                                                           @change="changeArtistDemand"></EditInput>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">录入人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{artistInfo.name}}
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">录入时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{artistInfo.created_at}}
                                        </div>
                                    </div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">最近更新人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{artistInfo.name}}
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">最近更新时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{artistInfo.updated_at}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="col-md-12">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered">
                            <h5>博主跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <TaskFollowUp :follow-type="'博主'" trailType='blogger'
                                              :trailId="$route.params.id"></TaskFollowUp>
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
                                艺人 - {{ artistInfo.name }}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="tasksType" :placeholder="'请选择任务类型'"
                                           @change="changeTaskType" ref="mold"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">任务名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入任务名称" v-model="taskName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">负责人</div>
                            <div class="col-md-5 float-left pl-0">
                                <InputSelectors
                                        :placeholder="'请选择负责人'"
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
                            <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskLevelArr" :placeholder="'请选择任务优先级'"
                                           @change="changeTaskLevel" ref="taskpriority"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime" ref="startTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="startMinutes" @change="changeStartMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">截止时间</div>
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
                                <selectors :options="yesOrNoArr" @change="changeWorkAd" placeholder="请选择是否广告"
                                           ref="advertisingType"></selectors>
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
                            <div class="col-md-2 text-right float-left">收款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'collect'"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">付款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'pay'"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">合同类型</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'contract'"></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">分成比例</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'division'"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">孵化期</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'incubation'"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">账单</div>
                            <div class="col-md-10 float-left">
                                <add-member :type="'bill'"></add-member>
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
                updateStar_weibo_infos: {},//修改微博
                updateStar_douyin_infos: {},//修改抖音
                updateStar_xiaohongshu_infos: {},//修改小红书
                updatePlatform: '',//修改平台
                isLoading: true,
                participant: '',
                tasksInfo: '',
                taskNum: '',
                ProjectsInfo: [],
                start_Time: '',
                end_Time: '',
                principalId: '',
                principalIds: [],
                updatelevel: '',//博主级别
                updatedemand: '',//合作需求
                updatehatch_start: '',//孵化期开始
                updatehatch_end: '',//孵化期截止
                Incubationperiod: '',
                filterFee: 1,

            }
        },
        computed: {
            completeNum() {
                return this.tasksInfo.filter(n => n.status === 2).length
            }
        },
        mounted() {
            this.getArtist()

            this.charts()
            let _this = this;
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
                            saveAsImage: {}
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

            getArtist: function () {
                this.artistId = this.$route.params.id;
                let _this = this;
                let data = {
                    include: 'creator,tasks,affixes,producer,type',
                };
                fetch('get', '/bloggers/' + this.artistId, data).then(function (response) {
                    let doneTaskNum = 0
                    _this.artistInfo = response.data;
                    _this.tasksInfo = response.data.tasks.data
                    if (_this.tasksInfo.length > 0) {
                        for (let i = 0; i < _this.tasksInfo.length; i++) {
                            if (_this.tasksInfo[i].status == 2) {
                                doneTaskNum = doneTaskNum + 1
                            }

                        }
                    }

                    _this.Incubationperiod = _this.artistInfo.hatch_star_at + '|' + _this.artistInfo.hatch_end_at

                    _this.taskNum = `${doneTaskNum}/${_this.tasksInfo.length}`
                    if (_this.artistInfo.intention == false) {
                        _this.updateType = 2
                    } else {
                        _this.updateType = 1
                    }
                    if (_this.artistInfo.sign_contract_other == false) {
                        _this.updateSign_contract_other = 2
                    } else {
                        _this.updateSign_contract_other = 1
                    }
                    if (_this.artistInfo.artistWorkProportion == 1) {
                        _this.artistInfo.artistWorkProportion = true
                    } else {
                        _this.artistInfo.artistWorkProportion = false
                    }


                });
                //项目
                fetch('get', '/bloggers/' + this.artistId + '?include=tasks.type,trails.project.principal,trails.client,producer,creator,affixes,type,publicity').then(function (response) {
                    _this.totalData = response.data
                    for (let i = 0; i < response.data.trails.data.length; i++) {
                        if (response.data.trails.data[i].project) {
                            response.data.trails.data[i].project.data.company = response.data.trails.data[i].client.data.company
                            _this.ProjectsInfo.push(response.data.trails.data[i].project.data)
                        }
                    }
                    // _this.isLoading=false
                })

                //作品
                fetch('get', '/bloggers/index/production?blogger_id=' + this.artistId + '').then(function (response) {
                    _this.worksData = response.data
                });
                //负责人
                fetch('get', '/users/').then(function (response) {

                    _this.Users = response.data;
                })
                //任务状态跑组。试戏
                fetch('get', '/task_types').then(function (response) {
                    _this.tasksType = response.data;
                })
                fetch('get', '/bloggers/gettype').then(function (response) {
                    _this.artistTypeArr = response.data
                })
                fetch('get', '/users/my?include=department').then(function (response) {
                    _this.principalId = response.data.id
                })
                fetch('get', '/bloggers/select?include=users').then(function (response) {
                    response.data.forEach(item => {
                        _this.principalIds.push(item.users.data.id)
                    })

                })
            },

            getArtistsBill: function () {
                if (this.artistBillsInfo.length > 0) {
                    return;
                }
                fetch('get', '/artists/' + this.projectId + '/bill').then(response => {
                    this.artistBillsInfo = response.data
                })
            },

            getArtistTasks: function () {
                let _this = this;
                fetch('get', '/stars/' + this.artistId).then(function (response) {
                    _this.artistTasksInfo = response.data;
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
                this.isEdit = false;
                this.isStatrtEdit = true
            },
            //类型
            changArtistType: function (value) {

                this.artistInfo.type.data.id = value

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
            //修改
            changeArtistBaseInfo: function () {
                this.isEdit = false;
                this.isStatrtEdit = true;
                let _this = this;
                this.artistId = this.$route.params.id;
                if (this.artistInfo.intention == 1) {
                    this.updateType = true
                } else {
                    this.updateType = false
                }
                if (this.artistInfo.sign_contract_other == 1) {
                    this.updateSign_contract_other = true
                } else {
                    this.updateSign_contract_other = false
                }
                let data = {
                    nickname: this.artistInfo.name,
                    type_id: this.artistInfo.type.data.id,
                    communication_status: this.artistInfo.communication_status,
                    intention: this.artistInfo.intention,
                    sign_contract_other: this.artistInfo.sign_contract_other,
                    desc: this.artistInfo.desc,
                    star_douyin_infos: this.updateStar_douyin_infos,
                    star_weibo_infos: this.updateStar_weibo_infos,
                    star_xiaohongshu_infos: this.updateStar_xiaohongshu_infos,
                    platform: this.updatePlatform,
                    level: this.artistInfo.level,
                    cooperation_demand: this.updatedemand,
                    hatch_star_at: _this.artistInfo.hatch_star_at,
                    hatch_end_at: _this.artistInfo.hatch_end_at
                }
                fetch('put', '/bloggers/' + this.artistId, data).then(function (response) {
                    toastr.success('修改成功');
                    _this.artistTasksInfo = response.data;

                    if (_this.artistInfo.intention == false) {
                        _this.updateType = 2
                    } else {
                        _this.updateType = 1
                    }
                    if (_this.artistInfo.sign_contract_other == false) {
                        _this.updateSign_contract_other = 2
                    } else {
                        _this.updateSign_contract_other = 1
                    }

                    _this.getArtist()
                    $('.selectpicker').selectpicker('refresh')
                })

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

                    _this.getArtist()

                })
               
                let obj={
                    title:'制作人视频评分-视频评分',
                    principal_id:this.principalId,
                    start_at:this.start_Time,
                    end_at:this.end_Time,
                    participant_ids:this.principalIds,
                    resource_type:1,
                    resourceable_id:this.artistId,
                    desc:'这是一个评分问卷任务',//默认
                    type:1609922710//评分问卷
                }
                fetch('post', '/tasks', obj
                ).then(function (response) {
                    _this.getArtist()
                })
            },
            getTimes: function () {
                let end_date = '';
                let end_hour = '';
                let end_minute = '';
                let end_second = '';
                let end_timeStamp = '';
                let time = new Date;
                let start_year = time.getFullYear();
                let start_month = time.getMonth() + 1;
                if (start_month < 10) {
                    start_month = "0" + start_month;
                }
                let start_date = time.getDate();
                if (start_date < 10) {
                    start_date = "0" + start_date;
                }
                let start_hour = time.getHours();
                end_hour = (23 - start_hour) * 60 * 60 * 1000
                if (start_hour < 10) {
                    start_hour = "0" + start_hour;
                }
                let start_minute = time.getMinutes();
                console.log(start_minute)
                end_minute = (59 - start_minute) * 60 * 1000
                if (start_minute < 10) {
                    start_minute = start_minute;
                }
                let start_second = time.getSeconds();

                end_second = (60 - start_second) * 1000
                if (start_minute < 10) {
                    start_minute = "0" + start_minute;
                }
                this.start_Time = start_year + "-" + start_month + "-" + start_date + " " + start_hour + ":" + start_minute + ":" + start_second
                if (time.getDay() <= 5) {
                    end_date = (5 - time.getDay()) * 60 * 60 * 1000 * 24
                    end_timeStamp = time.getTime() + end_date + end_hour + end_minute + end_second

                } else if (time.getDay() > 5) {
                    end_date = (7 - time.getDay() + 5) * 60 * 60 * 1000 * 24
                    end_timeStamp = time.getTime() + end_date + end_hour + end_minute + end_second

                }
                let end = new Date(end_timeStamp)
                let Y = end.getFullYear() + '-';
                let M = (end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1) + '-';
                let D = end.getDate() + ' ';
                let h = end.getHours() + ':';
                let m = end.getMinutes() + ':';
                let s = end.getSeconds();
                this.end_Time = Y + M + D + h + m + s
            },
            //添加任务
            addTask: function () {
                let _this = this;
                let data = {
                    title: this.taskName,
                    principal_id: this.Person_id,
                    start_at: this.startTime,
                    end_at: this.endTime,
                    resource_type: 1,
                    resourceable_id: this.artistInfo.id,
                    desc: this.taskIntroduce,
                    type: this.taskType
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
                this.artistInfo.name = value
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
                console.log(value)

                this.artistInfo.level = value
            }
            ,
            //孵化期
            changeArtistHatch: function (start, end) {

                console.log(start, end)
                this.artistInfo.hatch_star_at = start
                this.artistInfo.hatch_end_at = end


                console.log(this.updatehatch_start, this.updatehatch_end)
            }
            ,
            //合作需求
            changeArtistDemand: function (value) {
                this.updatedemand = value
            }
            ,
            taskdetail(id) {
                console.log(id)
                this.$router.push({path: '/tasks/' + id})
            },
            projectdetil(id) {
                this.$router.push({path: '/projects/' + id})
            },
            Jump(value) {
                let price = value;
                let str = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?///网址是否合法检测
                let regex = /(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi//http,https有无检测
                var re = new RegExp(str);

                if (!re.test(value)) {
                    alert('您的网址不正确')
                } else {
                    value = value.replace(regex, function (match, capture) {
                        if (capture) {
                            console.log(price)
                            window.open(price)
                        }
                        else {
                            window.open('http://' + match)
                        }
                    })

                }
            }
        }
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

    .edit-height {
        height: 57px;
    }

    .Jump {
        cursor: pointer;
    }
</style>
