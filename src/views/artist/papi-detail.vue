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
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addPrivacy">隐私设置</a>
                    <a class="dropdown-item" role="menuitem" @click="contractlist(artistInfo.sign_contract_status)">
                        <template v-if="artistInfo.sign_contract_status == 1">签约</template>
                        <template v-if="artistInfo.sign_contract_status == 2">解约</template>
                    </a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12">
                <div class="card-block clearfix pb-0">
                    <Upload @change='getUploadUrl' class="upload-image float-left mr-5"
                            style="width:80px;height:80px;border-radius:50%;position:relative">
                        <div class="puls" :style="{ backgroundImage: 'url(' + uploadUrl + ')' }" v-if="uploadUrl">
                        </div>
                        <div class="puls" v-if="!uploadUrl">
                            <img src="https://res-crm.papitube.com/image/artist-no-avatar.png" alt="">
                        </div>
                    </Upload>
                    <div class="float-left ml-10 mt-10" style="width:calc(100% - 100px)">
                        <h4 class="card-title">{{artistInfo.nickname}}</h4>
                        <div class=" clearfix example">
                            <div class="col-md-5 float-left pl-0 mr-15" v-if="artistInfo.publicity">
                                <div class="float-left pl-0 pr-2 col-md-12 mr-20">
                                    <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>制作人
                                    <span class="font-weight-bold pr-10"
                                          style="padding-top:1.5px" v-if="artistInfo.publicity">
                                        <span v-for="(item,index) in artistInfo.publicity.data" :key="index"
                                              class="pl-10">
                                            <span>{{item.department.data.name}}</span>
                                            <span v-if="item.department">-</span>
                                            <span>{{item.name}}</span>
                                        </span>
                                    </span>
                                </div>


                            </div>
                            <div class="col-md-6 float-left pl-0 ml-50" v-show="artistInfo.sign_contract_status == 1">
                                <div class="float-left pl-0 pr-2 col-md-2">
                                    <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>录入人
                                </div>
                                <div class="font-weight-bold float-left" v-for="(entry,index) in artistInfo.creator"
                                     :key="index" style="padding-top:1.5px">
                                    <span>{{entry.department.name}}</span>
                                    <span v-if="entry.company">-</span>
                                    <span>{{ entry.name }}</span>
                                </div>
                            </div>
                            <div class="col-md-6 float-left pl-0 pt-10" v-show="artistInfo.sign_contract_status == 1">
                                <div class="float-left pl-0 pr-2 col-md-3">
                                    <i class="iconfont icon-jieshushijian pr-2" aria-hidden="true"></i>录入时间
                                </div>
                                <div class="font-weight-bold float-left" v-if="principalName" style="padding-top:1.5px">
                                    <template>
                                        {{common.timeProcessing(artistInfo.created_at)}}
                                    </template>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix">
                    <div class="col-md-6 float-left pl-1 mb-20 pr-1" v-if="tasksInfo.length>0">
                        <div class="col-md-6"><i class="iconfont icon-iconset0399 pr-2"></i> 任务</div>
                        <div class="clearfix example taskshow" v-for="(task,index) in tasksInfo" :key="index"
                             @click="JumpDetails(task.id)">
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
                    <div class="col-md-6 float-left pl-0 ">
                        <div class="col-md-13" v-if="artistInfo.sign_contract_status == 2&&scheduleShow.length>0">
                            <div class="col-md-12"><i class="iconfont icon-ego-box pr-2"></i>日程</div>
                            <div class="clearfix example projectshow" v-for="(item,index) in scheduleShow" :key="index"
                                 @click="ScheduleBox(item)">
                                <div class="col-md-2 float-left"
                                     style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{item.title}}
                                </div>
                                <div class="col-md-2 float-left">{{item.creator.data.name}}</div>
                                <div class="col-md-4 float-left">{{item.start_at}}</div>
                                <div class="col-md-4 float-left">{{item.end_at}}</div>
                            </div>
                        </div>
                        <div class="col-md-12 pl-10 mt-45" v-show="artistInfo.sign_contract_status == 1">
                            <div class="clearfix">
                                <div class="col-md-8 float-left"><span>沟通状态</span></div>
                                <div class="col-md-4 float-left font-weight-bold "
                                     v-if="artistInfo.communication_status">
                                    <template>
                                        {{ papiCommunicationStatusArr.find(item => item.value ==
                                        artistInfo.communication_status).name}}
                                    </template>
                                </div>
                            </div>
                            <div class="clearfix example ">
                                <div class="col-md-8 float-left"><span>平台</span></div>
                                <div class="col-md-4 float-left font-weight-bold " v-if="artistInfo.platform">
                                    {{platformDate}}
                                </div>
                            </div>
                            <div class="clearfix example " v-if="artistInfo.platform">
                                <div class="col-md-8 float-left">
                                    <div v-for="(item,index) in artistInfo.platform.split(',')" :key="index">
                                        <template v-if="item==1">
                                            微博地址
                                        </template>
                                        <template v-if="item==2">
                                            抖音ID
                                        </template>
                                        <template v-if="item==3">
                                            小红书地址
                                        </template>
                                    </div>

                                </div>
                                <div class="col-md-4 float-left font-weight-bold ">
                                    <div v-for="(item,index) in artistInfo.platform.split(',')" :key="index">
                                        <template v-if="item==1">
                                            {{artistInfo.weibo_url}}
                                        </template>
                                        <template v-if="item==2">
                                            {{artistInfo.douyin_id}}
                                        </template>
                                        <template v-if="item==3">
                                            {{artistInfo.xiaohongshu_url}}
                                        </template>
                                    </div>
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
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-schedule"
                                   aria-controls="forum-base"
                                   aria-expanded="true" role="tab"
                                   :class="artistInfo.sign_contract_status == 2?'active':''">日程</a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-projects"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab" @click="getProject()">项目</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-tasks"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab" @click="getArtistTasks()">
                                    <template v-if="alltaskshow.length > 0">
                                        <ToolTips :title="`已完成数量${doneTaskNum}`">
                                            任务 ({{taskNum}})
                                        </ToolTips>
                                    </template>
                                    <template v-else>
                                        任务
                                    </template>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-work"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab" @click="getTaskDate()">作品库</a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 3">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-fans"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">粉丝数据</a>
                            </li>
                            <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2"
                                @click="getArtistsBill()">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-bill"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab">账单</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-base"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab"
                                   :class="artistInfo.sign_contract_status == 2?'':'active'">概况</a>
                            </li>
                        </ul>
                        <div class="tab-content  px-0 nav-tabs-animate bg-white col-md-12">
                            <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-schedule"
                                 role="tabpanel" :class="artistInfo.sign_contract_status == 2 ? 'active':''">
                                <div class="col-md-12">
                                    <calendar v-if="artistInfo.sign_contract_status == 2" :goto-date="selectedDate"
                                              :calendars="calendarId" ref="calendar"
                                              @showToast="showToast"
                                              @scheduleClick="showScheduleModal"
                                              @dayClick="showAddScheduleModal"></calendar>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-projects"
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
                                    <tr v-for="(item,index) in ProjectsInfo" :key="index" @click="projectdetil(item.id)"
                                        class="Jump projectcontent">
                                        <td>{{item.title}}</td>
                                        <td v-if="item.principal">{{item.principal}}</td>
                                        <td v-if="!item.principal"></td>
                                        <td>{{item.company}}</td>
                                        <td>{{item.created_at}}</td>
                                        <td>
                                            <template v-if="item.contract_sharing_ratio">
                                                {{item.contract_sharing_ratio}}
                                            </template>
                                            <template v-if="!item.contract_sharing_ratio">0</template>
                                        </td>
                                    </tr>
                                </table>
                                <div style="margin: 6rem auto;width: 100px" v-if="ProjectsInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getProject" :total_pages="total_pages"
                                            :total="total"></pagination>
                            </div>
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-tasks"
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
                                    <template v-if="alltaskshow">
                                        <tr v-for="(task,index) in alltaskshow" :key="index"
                                            @click="taskdetail(task.id)" class="Jump taskcontent">
                                            <td>{{task.title}}</td>
                                            <td v-if="task.type">{{task.type.data.title}}</td>
                                            <td v-if="!task.type">未选择</td>
                                            <td>
                                                <template v-if="task.status === 1"><span
                                                        style="color:#FF9800">进行中</span>
                                                </template>
                                                <template v-if="task.status === 2"><span
                                                        style="color:#4CAF50">已完成</span>
                                                </template>
                                                <template v-if="task.status === 3"><span
                                                        style="color:#9E9E9E">已停止</span>
                                                </template>
                                                <template v-if="task.status === 4"><span style="color:#F44336">延期</span>
                                                </template>
                                            </td>
                                            <td>{{task.principal.data.name}}</td>
                                            <td>{{task.end_at}}</td>
                                        </tr>
                                    </template>
                                </table>
                                <div style="margin: 6rem auto;width: 100px" v-if="alltaskshow.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getArtistTasks"
                                            :total_pages="total_pages"
                                            :total="total"></pagination>
                                <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                     data-target="#addTask">
                                    <button type="button"
                                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true" style="font-size:30px"></i>
                                        <i class="back-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true" style="font-size:30px"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-work"
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
                                        <td>{{common.timeProcessing(work.release_time)}}</td>
                                        <td>{{work.read_proportion}}</td>
                                        <td @click="Jump(work.link)">
                                            <template v-show="work.link">
                                                {{work.link}}
                                            </template>
                                        </td>
                                        <td v-if="work.advertising==1">
                                            是
                                        </td>
                                        <td v-if="work.advertising==0">
                                            否
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style="margin: 6rem auto;width: 100px" v-if="worksData.length==0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getTaskDate"
                                            :total_pages="total_pages"
                                            :total="total"></pagination>
                                <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                     data-target="#addWork">
                                    <button type="button"
                                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true" style="font-size:30px"></i>
                                        <i class="back-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true" style="font-size:30px"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-fans"
                                 role="tabpanel" v-show="artistInfo.sign_contract_status == 3">
                                <div id="myChart"
                                     style="width:50vw ;height:400px; margin-top:30px;padding-bottom: 20px"></div>
                            </div>
                            <!-- 账单 -->
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-bill"
                                 role="tabpanel">
                                <div class="clearfix my-10">
                                    <div style="padding: .715rem .6rem">
                                        <div class="income" v-if="calculatedAmount.incomesum">
                                            <div class="float-left pr-40">收款金额</div>
                                            <div class="float-left pr-40 money-color">{{calculatedAmount.incomesum}}元
                                            </div>
                                        </div>
                                        <div class="income" v-if="!calculatedAmount.incomesum">
                                            <div class="float-left pr-40">收款金额</div>
                                            <div class="float-left pr-40 money-color">0元</div>
                                        </div>
                                        <div class="expendituresum" v-if="calculatedAmount.expendituresum">
                                            <div class="float-left pr-40">付款金额</div>
                                            <div class="float-left pr-40 money-color">
                                                {{calculatedAmount.expendituresum}}元
                                            </div>
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
                                        <td>{{common.timeProcessing(item.pay_rec_time)}}</td>
                                        <td>{{item.action_user}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style="margin: 6rem auto;width: 100px" v-if="artistBillsInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getArtistsBill"
                                            :total_pages="total_pages"
                                            :total="total"></pagination>
                            </div>
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-base"
                                 role="tabpanel" :class="artistInfo.sign_contract_status == 2?'':'active'">
                                <div class="card">
                                    <div class="card-header card-header-transparent card-header-bordered"
                                         style="position: relative;">
                                        <div class="float-left font-weight-bold third-title">博主信息</div>
                                        <div class="float-right pointer-content" v-show="isStatrtEdit"
                                             style="position:absolute;top:10px;right:30px;">
                                            <i class="iconfont icon-bianji2" aria-hidden="true"
                                               @click="editBaseInfo"></i>
                                        </div>
                                        <div class="float-right mr-40" v-show="isEdit"
                                             style="position:absolute;top:5px;right:0px;">
                                            <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消
                                            </button>
                                            <button class="btn btn-primary" @click="changeArtistBaseInfo">确定</button>
                                        </div>
                                    </div>
                                    <div class="card-block px-0" v-if="artistInfo">
                                        <h5 class="pl-15">基本资料</h5>
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
                                                <div class="col-md-8 float-left font-weight-bold"
                                                     v-if="artistInfo.type">
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

                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-4 float-left text-right pl-0 pr-2">与我司签约意向</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <ConditionalInput ref="condition" :is-edit="isEdit"
                                                                      :content="artistInfo.intention"
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
                                            <h5 class="pl-15 pt-10 clearfix col-md-12 float-left">联系信息</h5>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">平台</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditSelector :is-edit="isEdit" :multiple="true"
                                                                  :content="artistInfo.platform ? artistInfo.platform.split(',') : ''"
                                                                  :options="artistSocialPlatform"
                                                                  @valuelistener="changeArtistPlatform_id"></EditSelector>
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
                                                <div class="col-md-4 float-left text-right pl-0">抖音ID</div>
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
                                                    <EditInput :content="artistInfo.xiaohongshu_fans_num"
                                                               :is-edit="isEdit"
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
                                                <div class="col-md-4 float-left text-right pl-0">商务合作要求</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.cooperation_demand"
                                                               :is-edit="isEdit"
                                                               @change="changeArtistDemand"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">签约状态</div>
                                                <div class="col-md-8 float-left font-weight-bold"
                                                     v-if="artistInfo.sign_contract_status" :class="isEdit?'py-10':''">
                                                    {{signState.find(item=>item.value ===
                                                    artistInfo.sign_contract_status).name}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-12 float-left"
                                                >
                                                <div class="col-md-2 float-left text-right pl-0">孵化期</div>
                                                <div class="col-md-10 float-left font-weight-bold" v-if="Incubationperiod!=='**'">
                                                    <EditGroupDatePicker :content="Incubationperiod" :is-edit="isEdit"
                                                                         @change="changeArtistHatch"></EditGroupDatePicker>
                                                </div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                                v-if="Incubationperiod =='**'">
                                                            {{Incubationperiod}}
                                                </div>
                                            </div>
                                            <h5 class=" pt-10 clearfix col-md-12 float-left">更新信息</h5>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">录入人</div>
                                                <div class="col-md-8 float-left font-weight-bold"
                                                     v-for="(entry,index) in artistInfo.creator" :key="index">
                                                    <template v-if="artistInfo.creator">
                                                        {{entry.name}}
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">录入时间</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    {{common.timeProcessing(artistInfo.created_at)}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">最近更新人</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <template v-if="artistInfo.last_updated_user">
                                                        {{artistInfo.last_updated_user}}
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-4 float-left text-right pl-0">最近更新时间</div>
                                                <div class="col-md-8 float-left font-weight-bold">
                                                    {{common.timeProcessing(artistInfo.updated_at)}}
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
                            <div class="card-header card-header-transparent card-header-bordered p-10"
                                 style="font-size: 16px;font-weight: bold;">
                                <div>博主跟进</div>
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

        <div class="calendar-toast" v-show="toastShow"
             :style="'position: absolute;top:' + toastY + 'px; left: ' + toastX + 'px;'">双击创建日程
        </div>

        <AddTask :resourceable_id="artistId" resource_type="1" :resource_title="artistName" resource_name="博主"
                 @success="addTask"></AddTask>

        <div class="modal fade" id="addWork" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
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
                                <selectors :options="yesOrNoArr" @change="changeWorkAd"
                                           ref="advertisingType"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" :disabled="isAddWorkButtonDisable"
                                @click="addWork">确定
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <!--隐私设置-->
        <div class="modal fade" id="addPrivacy" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
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
                        <button class="btn btn-primary" type="submit" @click="setPrivacy">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分配制作人-->
        <div class="modal fade" id="distributionproducer" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
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
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="abrogate">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addDistributionPerson">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <ApprovalGreatModule :formData="formDate"
                             :default-value="{value:projectContractDefault,id:$route.params.id}"></ApprovalGreatModule>
        <!-- 新建/修改 日程 -->
        <div class="modal fade line-center" id="changeSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <div style="order: 2">
                            <span class="pointer-content hover-content mr-4" data-toggle="modal"
                                  data-target="#addLinkage">关联</span>
                            <i class="iconfont icon-guanbi pointer-content" aria-hidden="true" data-dismiss="modal"></i>
                        </div>
                        <h5 class="modal-title">
                            <template v-if="scheduleType === 'add'">
                                <h4 class="modal-title">新建日程</h4>
                            </template>
                            <template v-else>
                                <h4 class="modal-title">修改日程</h4>
                            </template>
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">标题</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入标题"
                                       v-model="scheduleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">日历</div>
                            <div class="col-md-10 float-left pl-0">{{calendarName}}</div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime" ref="scheduleStartDate"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-show="!isAllday">
                                <TimeChoice @change="changeStartMinutes" ref="scheduleStartMinute"></TimeChoice>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left line-fixed-height">结束时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime" ref="scheduleEndDate"
                                            :startDate="startTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-show="!isAllday">
                                <TimeChoice @change="changeEndMinutes" ref="scheduleEndMinute"></TimeChoice>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-custom checkbox-primary">
                                    <input type="checkbox" id="isAllDay" @change="changeIsAllDay" v-model="isAllday">
                                    <label for="isAllDay">全天</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix py-10">
                            <div class="col-md-2 text-right float-left line-fixed-height">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <AddMember type="add"></AddMember>
                            </div>
                        </div>
                        <div class="my-10 clearfix"
                             v-show="linkageSelectedIds.projects.length > 0 || linkageSelectedIds.tasks.length > 0">
                            <div class="col-md-2 text-right float-left">关联资源</div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="clearfix" v-for="(id,index) in linkageSelectedIds.projects" :key="index">
                                    <span class="float-left">
                                        项目 - {{ allProjectsInfo.find(item => item.id == id).title }}
                                    </span>
                                    <span class="float-right icon iconfont icon-shanchu1"
                                          @click="delNewScheduleLinkage('projects', id)"></span>
                                </div>
                                <div class="clearfix" v-for="(id,index) in linkageSelectedIds.tasks" :key="index">
                                    <span class="float-left">
                                        任务 - {{ allTasksInfo.find(item => item.id == id).title }}
                                    </span>
                                    <span class="float-right icon iconfont icon-shanchu1"
                                          @click="delNewScheduleLinkage('tasks', id)"></span>
                                </div>
                            </div>
                        </div>
                        <div v-show="showMore">
                            <div class="pt-10 mb-20 clearfix">
                                <div class="col-md-2 text-right float-left line-fixed-height">资源</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="allMeetingRomeList" ref="scheduleResource"
                                               @change="changeScheduleMaterial"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">提醒</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="remindArr" ref="scheduleRemind"
                                               @change="changeScheduleRemind"></selectors>
                                </div>
                            </div>
                            <div class="clearfix my-20">
                                <div class="col-md-2 text-right float-left line-fixed-height">重复</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors :options="repeatArr" ref="scheduleRepeat"
                                               @change="changeScheduleRepeat"></selectors>
                                </div>
                                <div class="col-md-2 float-left"></div>
                                <div class="col-md-10 float-left pl-0 font-12 mt-5" style="color: #c3c3c3">重复周期为1年</div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">位置</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" class="form-control" title="" v-model="eventPlace">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">备注</div>
                                <div class="col-md-10 float-left pl-0">
                                    <textarea class="form-control" title="" v-model="eventDesc"></textarea>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="col-md-2 text-right float-left"></div>
                                <div class="col-md-10 float-left pl-0">
                                    <div class="checkbox-custom checkbox-primary">
                                        <input type="checkbox" id="onlyParticipantVisible" v-model="schedulePrivacy">
                                        <label for="onlyParticipantVisible">仅参与人可见</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pointer-content hover-content mt-20" @click="isShowMore">
                            <div class="col-md-2 float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <template v-if="showMore">隐藏更多选项</template>
                                <template v-else>添加更多选项</template>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancelSchedule">取消
                        </button>
                        <template v-if="scheduleType === 'add'">
                            <button class="btn btn-primary" type="submit" :disabled="isAddScheduleButtonDisable"
                                    @click="addSchedule">确定
                            </button>
                        </template>
                        <template v-if="scheduleType === 'edit'">
                            <button class="btn btn-primary" type="submit" @click="changeSchedule">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addLinkage" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">关联资源</h4>
                    </div>
                    <div class="modal-body">
                        <div class="tab-pane p-20" role="tabpanel">
                            <div class="nav-tabs-vertical" data-plugin="tabs" style="margin: 0 -20px -30px  -20px ">
                                <ul class="nav nav-tabs nav-tabs-line mr-25" role="tablist">
                                    <li class="nav-item" role="presentation" @click="getAllProjects">
                                        <a class="nav-link active" data-toggle="tab" href="#projectsPane"
                                           aria-controls="exampleTabsLineLeftOne" role="tab" aria-selected="false">
                                            项目</a>
                                    </li>
                                    <li class="nav-item" role="presentation" @click="getAllTasks">
                                        <a class="nav-link" data-toggle="tab" href="#tasksPane"
                                           aria-controls="exampleTabsLineLeftOne" role="tab" aria-selected="false">
                                            任务</a>
                                    </li>
                                </ul>
                                <div class="tab-content px-0" style="max-height: 70vh;overflow-y: auto">
                                    <div class="tab-pane active" id="projectsPane" role="tabpanel">
                                        <div class="input-search mb-20" style="width: 70%">
                                            <button type="submit" class="input-search-btn">
                                                <i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" class="form-control" name="" placeholder="搜索关键字..."
                                                   v-model="searchKeyWord">
                                        </div>
                                        <ul class="nav">
                                            <li class="nav-link pointer-content" style="width: 95%"
                                                v-for="(project,index) in allProjectsInfo" :key="index"
                                                v-show="project.title.indexOf(searchKeyWord) > -1"
                                                @click="selectResource('projects', project.id)">{{ project.title }}
                                                <span class="float-right"
                                                      v-show="linkageSelectedIds.projects.indexOf(project.id) > -1">
                                                    <i class="md-check"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane" id="tasksPane" role="tabpanel">
                                        <div class="input-search mb-20" style="width: 70%">
                                            <button type="submit" class="input-search-btn">
                                                <i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" class="form-control" name="" placeholder="搜索关键字..."
                                                   v-model="searchKeyWord">
                                        </div>
                                        <ul class="nav">
                                            <li class="nav-link pointer-content" style="width: 95%"
                                                v-for="(task,index) in allTasksInfo" :key="index"
                                                v-show="task.title.indexOf(searchKeyWord) > -1"
                                                @click="selectResource('tasks', task.id)">{{ task.title }}
                                                <span class="float-right"
                                                      v-show="linkageSelectedIds.tasks.indexOf(task.id) > -1">
                                                    <i class="md-check"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addLinkageResource">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 查看日程 -->
        <div class="modal fade" id="checkSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content" v-if="scheduleData">
                    <div class="modal-header">
                        <div style="order: 2">
                            <span v-show="!noPermission">
                                <i class="iconfont icon-bianji2 pr-4 font-size-16 pointer-content"
                                   @click="changeScheduleType('edit')" aria-hidden="true"></i>
                                <FileUploader is-icon="true" class="float-left" @change="fileUpload"
                                              mulId="cal"></FileUploader>
                                <i class="iconfont icon-shanchu1 pr-4 font-size-16 pointer-content" data-toggle="modal"
                                   data-target="#delModel" aria-hidden="true" @click="deleteToastr('schedule')"></i>
                            </span>
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
                            <div class="col-md-2 px-0 float-left">地点</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.position }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.material">
                            <div class="col-md-2 px-0 float-left">资源</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.material.data.name }}</div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 px-0 float-left">组织人</div>
                            <div class="col-md-10 pl-0 float-left">
                                {{ scheduleData.creator.data.name }}
                            </div>
                        </div>
                        <div class="example"
                             v-if="((scheduleData.project && scheduleData.project.data.length > 0) || (scheduleData.task && scheduleData.task.data.length > 0)) && !noPermission">
                            <div class="col-md-2 px-0 float-left">关联资源</div>
                            <div class="col-md-10 pl-0 float-left">
                                <div class="pb-5" v-if="scheduleData.project"
                                     v-for="project in scheduleData.project.data">
                                    <span>项目 - {{ project.title }}</span>
                                </div>
                                <div class="pb-5" v-if="scheduleData.task" v-for="task in scheduleData.task.data">
                                    <span>任务 - {{ task.title }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.participants && !noPermission">
                            <div class="col-md-2 px-0 float-left">参与人</div>
                            <div class="col-md-10 pl-0 float-left">
                                <AddMember type="add" @change="changeScheduleParticipants"></AddMember>
                            </div>
                        </div>
                        <div class="example" v-if="scheduleData.desc && !noPermission">
                            <div class="col-md-2 px-0 float-left">备注</div>
                            <div class="col-md-10 pl-0 float-left">{{ scheduleData.desc }}</div>
                        </div>
                        <div class="example" v-if="scheduleData.affixes && scheduleData.affixes.data.length > 0">
                            <div>附件</div>
                            <div>
                                <div class="col-md-3 float-left text-center position-relative file-item"
                                     v-for="(affix,index) in scheduleData.affixes.data" :key="index">
                                    <div class="del-affix iconfont icon-zuofei position-absolute pointer-content"
                                         @click="delAffix(affix.id)"></div>
                                    <div><i class="iconfont icon-wenjian" style="font-size: 36px"></i></div>
                                    <div @click="openFile(affix.url)" class="pointer-content">{{ affix.title }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除日历/日程 -->
        <div class="modal fade" id="delModel" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i
                                aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">确认删除</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <template v-if="delType === 'calendar'">
                                <p>确认删除日历 “{{ delCalendarInfo.title }}” </p>
                            </template>
                            <template v-if="delType === 'schedule'">
                                <p>确认删除日程 “{{ scheduleData.title }}” </p>
                            </template>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <template v-if="delType === 'calendar'">
                            <button class="btn btn-primary" @click="deleteCalendar">确定</button>
                        </template>
                        <template v-if="delType === 'schedule'">
                            <button class="btn btn-primary" @click="deleteSchedule">确定</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '../../assets/utils/fetch.js';
import config from '../../assets/js/config';
import common from '../../assets/js/common';
import Cookies from 'js-cookie';

import ApprovalGreatModule from '../../components/ApprovalGreatModule';

export default {
  data () {
            return {
                common: common,
                artistId: '',
                artistName: '',
                artistInfo: {},
                calculatedAmount: '',//计算金额
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
                startTaskMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                endTaskMinutes: '00:00',
                taskIntroduce: '',
                artistWorkName: '',
                isEdit: false,
                isStatrtEdit: true,
                papiCommunicationStatusArr: config.papiCommunicationStatusArr,
                signState: config.signState,
                updateNickname: '',
                updateType: '',
                updateSign_contract_other: '',
                totalData: '',
                worksData: '',
                advertisingType: '',
                Person_id: '',
                tasksType: '',
                artistTypeArr: '',
                trueOrFalse: config.trueOrFalse,
                artistSocialPlatform: config.artistSocialPlatform,
                petName: '',//昵称
                updateStar_weibo_infos: {},//修改微博
                updateStar_douyin_infos: {},//修改抖音
                updateStar_xiaohongshu_infos: {},//修改小红书
                updatePlatform: '',//修改平台
                participant: '',
                tasksInfo: [],
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
                principalName: '',
                expense_type: 0,
                platformArr: config.platformArr,
                selectedCalendar: [],
                selectedDate: '',
                Namevalue: '',
                total: 0,
                current_page: 1,
                total_pages: 1,
                artistype: '',
                bloggerlevel: '',
                isLoading: true,
                distributionType: '',
                alltaskshow: [],
                changeArtistInfo: {},
                calendarId: [],
                scheduleData: '',
                uploadUrl: '',
                taskNum: '',
                doneTaskNum: 0,
                participant_ids: [],
                delType: '',
                isAllday: false,
                showMore: false,
                schedulePrivacy: false,
                noPermission: false,
                scheduleType: 'add',
                scheduleName: '',
                calendarName: '',
                remindArr: config.remindArr,
                repeatArr: config.repeatArr,
                eventPlace: '',
                eventDesc: '',
                allMeetingRomeList: '',
                linkageSelectedIds: {
                    projects: [],
                    tasks: []
                },
                scheduleShow: [],
                contractType: 'bloggers',
                formDate: '',
                priorityArr: config.priorityArr,
                platformDate: '',
                scoreId: '',
                artistProjectsInfo: '',
                allProjectsInfo: '',
                searchKeyWord: '',
                allTasksInfo: '',
                isScheduleAllday: 0,
                scheduleRepeat: 0,
                scheduleCalendar: '',
                toastShow: false,
                toastX: 0,
                toastY: 0,
                scheduleRemind: '',
                projectContractDefault: '',
                projectPage: '',
                conditionLength: 0,
                selectorHidden: [],
                isAddScheduleButtonDisable: false,
                isAddWorkButtonDisable: false,
            }
        },
        components: {
            ApprovalGreatModule
        },
        created() {
            this.getArtist()
        },
        mounted() {
            this.getTaskDate();
            this.getCalendar();
            this.charts();
            this.getTaskNum();
            let _this = this;
            this.user = JSON.parse(Cookies.get('user'));
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            });
            this.principalName = this.user.nickname;
            //  清空视频
            $('#addWork').on('hidden.bs.modal', function () {
                _this.artistWorkName = '';
                _this.artistWorkProportion = '';
                _this.videoUrl = '';
                _this.artistInfo.id = '';
                _this.$refs.advertisingType.setValue('');
                _this.$refs.workReleaseTime.setValue('');
            })
            this.getTimes()
            this.getResources();
            this.getPrivacy() //获取隐私设置
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
                                title: '保存'
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

    getArtist () {
                this.artistId = this.$route.params.id;
                let _this = this;
                let data = {
                    include: 'creator,tasks,affixes,producer,type,publicity,trails.project,trails.client,trails.project.principal,trails.project.relate_project_bills_resource,operatelogs,publicity.department',
                };
                fetch('get', '/bloggers/' + this.artistId, data).then(response => {
                    this.artistInfo = response.data;
                    this.uploadUrl = _this.artistInfo.avatar;
                    this.artistName = response.data.nickname;
                    if (this.artistInfo.intention) {
                        this.artistInfo.intention = 1
                    } else {
                        this.artistInfo.intention = 2
                    }
                    if (this.artistInfo.sign_contract_other) {
                        this.artistInfo.sign_contract_other = 1
                    } else {
                        this.artistInfo.sign_contract_other = 2
                    }
                    if (response.data.tasks) {
                        this.tasksInfo = response.data.tasks.data

                    }
                    //任务数据
                    let data = [];
                    this.artistInfo.platform.split(',').forEach(item => {
                        data.push(_this.artistSocialPlatform.find(i => i.value == item).name)
                    });
                    this.platformDate = data.join(',');
                    //孵化期时间 
                    if (this.artistInfo.hatch_star_at !== "privacy" && this.artistInfo.hatch_end_at !== "privacy") {
                        if(this.artistInfo.hatch_star_at !== null || this.artistInfo.hatch_end_at !== null){
                            this.Incubationperiod = this.artistInfo.hatch_star_at + '|' + this.artistInfo.hatch_end_at 
                        }else{
                            this.Incubationperiod = ''  
                        }        
                    }else{
                        this.Incubationperiod = '**'
                    }
                    this.projectContractDefault = {
                        '昵称': response.data.nickname
                    };
                    this.isLoading = false;
                });
                //任务状态跑组。试戏
                fetch('get', '/task_types').then(response => {

                    this.tasksType = response.data;
                    response.data.forEach(item => {

                        if (item.title == '视频评分') {
                            this.scoreId = item.id
                        }
                    })
                });
                fetch('get', '/bloggers/gettype').then(response => {
                    this.artistTypeArr = response.data
                });
                fetch('get', '/bloggers/select?include=users').then(response => {
                    response.data.forEach(item => {
                        _this.principalIds.push(item.users.data.id)
                    })
                })
            },
            getProject(page = 1) {
                fetch('get', '/bloggers/' + this.artistId + '/project', {
                    page: page
                }).then(response => {
                    this.ProjectsInfo = response.data;
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                })
            },
            //上传头像 ---修改头像
            getUploadUrl(res) {
                if (!this.isEdit) {
                    this.changeArtistInfo = {}
                }
                this.uploadUrl = res;
                this.changeArtistBaseInfo()
            },
            selectDate: function (value) {
                this.selectedDate = value;
                this.$refs.meetingRoom.setDate(value)
            },
    getCalendar () {
                this.artistId = this.$route.params.id;

                let data = {
                    include: 'calendar,schedule,schedule.creator',
                };
                fetch('get', '/bloggers/' + this.artistId, data).then(response => {
                    if (response.data.calendar) {
                        this.calendarId.push(response.data.calendar.data.id)
                        this.calendarName = response.data.calendar.data.title
                    }
                    //日程展示
                    if (response.data.schedule) {
                        for (let i = 0; i < response.data.schedule.data.length; i++) {
                            this.scheduleShow.push(response.data.schedule.data[i])
                        }
                    }
                })

            },
            changeScheduleRemind: function (value) {
                this.scheduleRemind = value;
            },
    getAllProjects () {
                fetch('get', '/projects/all').then(response => {
                    this.allProjectsInfo = response.data
                })
            },
    getAllTasks () {
                fetch('get', '/tasksAll').then(response => {
                    this.allTasksInfo = response.data
                })
            },
    addLinkageResource () {
                $('#addLinkage').modal('hide');
            },
    ScheduleBox (value) {
                this.showScheduleModal(value)
                console.log(value)
            },
    addSchedule () {
                let startTime = '';
                let endTime = '';
                if (this.isScheduleAllday) {
                    startTime = this.startTime;
                    endTime = this.endTime;
                } else {
                    startTime = this.startTime + ' ' + this.startMinutes;
                    endTime = this.endTime + ' ' + this.endMinutes;

                    if (startTime > endTime) {
                        toastr.error('开始时间不能晚于截止时间');
                        return
                    }

                    if (this.startTime === this.endTime) {
                        let startMinutesArr = this.startMinutes.split(':');
                        let endMinutesArr = this.endMinutes.split(':');
                        if (startMinutesArr[0] === endMinutesArr[0]) {
                            if ((Number(endMinutesArr[1]) - Number(startMinutesArr[1])) < 30) {
                                toastr.error('日程时间不能小于30分钟');
                                return
                            }

                        }
                    }
                }
                this.isAddScheduleButtonDisable = true;
                let data = {
                    title: this.scheduleName,
                    calendar_id: this.calendarId[0],
                    is_allday: this.isScheduleAllday,
                    privacy: Number(this.schedulePrivacy),
                    start_at: startTime,
                    end_at: endTime,
                    repeat: this.scheduleRepeat,
                    desc: this.eventDesc,

                };
                if (this.eventPlace) {
                    data.position = this.eventPlace;
                }
                if (this.scheduleMaterialId) {
                    data.material_id = this.scheduleMaterialId;
                }
                if (this.$store.state.newParticipantsInfo) {
                    data.participant_ids = [];
                    let newParticipantsInfo = this.$store.state.newParticipantsInfo;
                    for (let i = 0; i < newParticipantsInfo.length; i++) {
                        data.participant_ids.push(newParticipantsInfo[i].id)
                    }
                }
                if (this.linkageSelectedIds.projects.length > 0) {
                    data.project_ids = this.linkageSelectedIds.projects;
                }
                if (this.linkageSelectedIds.tasks.length > 0) {
                    data.task_ids = this.linkageSelectedIds.tasks;
                }
                fetch('post', '/schedules', data).then(() => {
                    this.isAddScheduleButtonDisable = false;
                    this.$refs.calendar.refresh();
                    $('#changeSchedule').modal('hide');
                    toastr.success('添加成功')
                    this.initAddScheduleModal()
                })
            },
    showScheduleModal (schedule) {
                let data = {
                    include: 'calendar,participants,creator,material,affixes,project,task',
                };
                fetch('get', '/schedules/' + schedule.id, data).then(response => {
                    if (response.data.length > 0) {
                        this.scheduleData = schedule;
                        this.noPermission = true;
                        return
                    }
                    this.noPermission = false;
                    this.scheduleData = response.data;
                    this.scheduleParticipants = JSON.parse(JSON.stringify(response.data.participants.data));
                    this.$store.dispatch('changeParticipantsInfo', {data: response.data.participants.data});
                });
                $('#checkSchedule').modal('show')
            },
    showToast (clientX, clientY) {
                this.toastX = clientX - 100;
                this.toastY = clientY - 25;
                this.toastShow = true;
                setTimeout(() => {
                    this.toastShow = false
                }, 1000)
            },
    changeIsAllDay (e) {
                this.isScheduleAllday = Number(e.target.checked);
            },
    fileUpload (url, name, size) {
                let data = {
                    title: name,
                    url: url,
                    size: size,
                    type: 1
                };
                fetch('post', '/schedules/' + this.scheduleData.id + '/affix', data).then(response => {
                    toastr.success('上传成功');
                    if (this.scheduleData.affixes) {
                        this.scheduleData.affixes.data.push(response.data)
                    } else {
                        this.scheduleData.affixes = {data: []};
                        this.scheduleData.affixes.data.push(response.data)
                    }
                })
            },
    cancelSchedule () {
                this.scheduleType = 'add'
                this.initAddScheduleModal()
            },
    showAddScheduleModal (date) {
                if (this.calendarId.length > 0) {
                    this.$refs.scheduleStartDate.setValue(date);
                    this.$refs.scheduleEndDate.setValue(date);
                    this.startTime = date;
                    this.endTime = date;
                    $('#changeSchedule').modal('show')
                } else {
                    toastr.error('该艺人无对应艺人日历，请先创建艺人日历')
                }
            },
    getResources(type) {
      let data = {};
      if (type) {
        data = {
          type,
        };
      }
      fetch('get', '/materials/all', data).then((response) => {
        if (type) {
          this.meetingRomeList = response.data;
        } else {
          this.allMeetingRomeList = response.data;
        }
      });
    },
    changeSchedule () {
                let startTime = '';
                let endTime = '';
                if (this.isScheduleAllday) {
                    startTime = this.startTime;
                    endTime = this.endTime;
                } else {
                    startTime = this.startTime + ' ' + this.startMinutes;
                    endTime = this.endTime + ' ' + this.endMinutes;
                }
                let data = {
                    title: this.scheduleName,
                    calendar_id: this.scheduleCalendar,
                    is_allday: this.isScheduleAllday,
                    privacy: Number(this.schedulePrivacy),
                    start_at: startTime,
                    end_at: endTime,
                    repeat: this.scheduleRepeat,
                    desc: this.eventDesc,
                    material_id: this.scheduleMaterialId
                };
                if (this.eventPlace) {
                    data.position = this.eventPlace;
                }

                data.participant_del_ids = [];
                data.participant_ids = [];
                let flagInfo = this.$store.state.newParticipantsInfo;
                for (let i = 0; i < this.scheduleParticipants.length; i++) {
                    if (flagInfo.map(item => item.id).indexOf(this.scheduleParticipants[i].id) === -1) {
                        data.participant_del_ids.push(this.scheduleParticipants[i].id)
                    }
                }
                for (let i = 0; i < flagInfo.length; i++) {
                    if (this.scheduleParticipants.map(item => item.id).indexOf(flagInfo[i].id) === -1) {
                        data.participant_ids.push(flagInfo[i].id)
                    }
                }

                if (this.linkageSelectedIds.projects.length > 0) {
                    data.project_ids = this.linkageSelectedIds.projects;
                }
                if (this.linkageSelectedIds.tasks.length > 0) {
                    data.task_ids = this.linkageSelectedIds.tasks;
                }

                fetch('put', '/schedules/' + this.scheduleData.id, data).then(() => {
                    this.$refs.calendar.refresh();
                    $('#changeSchedule').modal('hide');
                    toastr.success('修改成功')
                    this.initAddScheduleModal()
                })
            },
    changeScheduleParticipants (value) {
                let data = {};
                if (value) {
                    data.participant_del_ids = [value];
                } else {
                    let participantsInfo = this.$store.state.newParticipantsInfo;
                    data.participant_ids = [];
                    data.participant_del_ids = [];
                    for (let i = 0; i < participantsInfo.length; i++) {
                        if (this.scheduleParticipants.map(item => item.id).indexOf(participantsInfo[i].id) === -1) {
                            data.participant_ids.push(participantsInfo[i].id)
                        }
                    }
                    for (let i = 0; i < this.scheduleParticipants.length; i++) {
                        if (participantsInfo.map(item => item.id).indexOf(this.scheduleParticipants[i].id) === -1) {
                            data.participant_del_ids.push(this.scheduleParticipants[i].id)
                        }
                    }
                }
                fetch('put', '/schedules/' + this.scheduleData.id, data).then(() => {
                    this.$refs.calendar.refresh();
                    this.scheduleParticipants = JSON.parse(JSON.stringify(this.$store.state.newParticipantsInfo));
                })
            },
    changeScheduleType (type) {
                this.scheduleType = type;
                $('#checkSchedule').modal('hide');
                setTimeout(function () {
                    $('#changeSchedule').modal('show');
                }, 400);
                if (type === 'edit') {
                    this.scheduleName = this.scheduleData.title;
                    this.scheduleCalendar = this.scheduleData.calendar.data.id;
                    this.$refs.scheduleStartDate.setValue(this.scheduleData.start_at.split(' ')[0]);
                    let startMinutes = this.scheduleData.start_at.split(' ')[1].split(':');
                    this.$refs.scheduleStartMinute.setValue(startMinutes);
                    this.startTime = this.scheduleData.start_at.split(' ')[0];
                    this.startMinutes = startMinutes[0] + ':' + startMinutes[1];
                    this.$refs.scheduleEndDate.setValue(this.scheduleData.end_at.split(' ')[0]);
                    let endMinutes = this.scheduleData.end_at.split(' ')[1].split(':');
                    this.$refs.scheduleEndMinute.setValue(endMinutes);
                    this.endTime = this.scheduleData.end_at.split(' ')[0];
                    this.endMinutes = endMinutes[0] + ':' + endMinutes[1];
                    this.$refs.scheduleRemind.setValue(this.scheduleData.remind);
                    this.isAllday = this.scheduleData.is_allday;
                    this.eventDesc = this.scheduleData.desc;
                    this.eventPlace = this.scheduleData.position;
                    this.$store.dispatch('changeParticipantsInfo', {data: this.scheduleData.participants.data});
                    if (this.scheduleData.material) {
                        this.$refs.scheduleResource.setValue(this.scheduleData.material.data.id);
                        this.scheduleMaterialId = this.scheduleData.material.data.id;
                    }
                    if (this.scheduleData.project.data.length > 0) {
                        this.linkageSelectedIds.projects = [];
                        for (let i = 0; i < this.scheduleData.project.data.length; i++) {
                            this.linkageSelectedIds.projects.push(this.scheduleData.project.data[i].moduleable_id)
                        }
                    }
                    if (this.scheduleData.task.data.length > 0) {
                        this.linkageSelectedIds.tasks = [];
                        for (let i = 0; i < this.scheduleData.task.data.length; i++) {
                            this.linkageSelectedIds.tasks.push(this.scheduleData.task.data[i].moduleable_id)
                        }
                    }
                }
            },
    deleteToastr (type, calendar = null) {
                this.delType = type;
                if (calendar) {
                    this.delCalendarInfo = calendar
                }
                if (type === 'schedule') {
                    $('#checkSchedule').modal('hide');
                }
            },
    deleteSchedule () {
                fetch('delete', '/schedules/' + this.scheduleData.id).then(() => {
                    $('#delModel').modal('hide');
                    toastr.success('删除成功');
                    this.$refs.calendar.refresh()
                })
            },
    initAddScheduleModal () {
                this.showMore = false;
                this.$store.dispatch('changeParticipantsInfo', {data: []});
                this.scheduleName = '';
                this.scheduleCalendar = '';
                this.isScheduleAllday = 0;
                this.privacy = 1;
                this.startTime = '';
                this.startMinutes = '00:00';
                this.endTime = '';
                this.endMinutes = '00:00';
                this.eventPlace = '';
                this.scheduleRepeat = 0;
                this.scheduleMaterialId = '';
                this.eventDesc = '';
                this.isAllday = false;
                this.schedulePrivacy = false;
                this.scheduleType = 'add';
                this.linkageSelectedIds = {
                    projects: [],
                    tasks: []
                };
                this.$refs.scheduleStartDate.setValue('');
                this.$refs.scheduleEndDate.setValue('');
                this.$refs.scheduleStartMinute.setValue('0');
                this.$refs.scheduleEndMinute.setValue('0');
                this.$refs.scheduleResource.setValue('');
                this.$refs.scheduleRepeat.setValue('0');
                this.$refs.scheduleNotice.setValue('0');
                this.$refs.scheduleRemind.setValue('0');
            },
    changeScheduleRepeat (value) {
                this.scheduleRepeat = value;
            },
    isShowMore () {
                this.showMore = !this.showMore
            },
    changeScheduleMaterial (value) {
                this.scheduleMaterialId = value;
            },
            //账单
            getArtistsBill(page = 1, expense_type) {
                if (!expense_type) {
                    this.expense_type = 0
                } else {
                    this.expense_type = expense_type
                }

                fetch('get', `/bloggers/${this.artistId}/bill`, {
                    page: page,
                    expense_type: expense_type
                }).then(response => {
                    this.artistBillsInfo = response.data;
                    this.calculatedAmount = response.meta;
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                })
            },
            //作品
            getTaskDate: function (data = 1) {
                fetch('get', '/bloggers/index/production?blogger_id=' + this.artistId + '', {
                    page: data
                }).then(response => {
                    this.worksData = response.data
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                    response.data.forEach(item => {
                        let time = new Date(item.release_time);
                        let Y = time.getFullYear() + '-';
                        let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
                        let D = time.getDate() + ' ';
                        item.release_time = Y + M + D
                    })
                });
            },
            //任务数据
            getArtistTasks: function (page = 1) {
                fetch('get', '/bloggers/' + this.artistId + '/tasks', {
                    page: page
                }).then(response => {
                    this.alltaskshow = response.data;
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                })
            },
    taskcancel () {
                this.$store.state.newParticipantsInfo = []
            },
            getTaskNum: function () {
                this.alltaskshow = [];
                this.doneTaskNum = 0;
                fetch('get', '/bloggers/' + this.artistId + '/tasks').then(response => {

                    this.alltaskshow = response.data;
                    if (this.alltaskshow.length > 0) {
                        for (let i = 0; i < this.alltaskshow.length; i++) {
                            if (this.alltaskshow[i].status == 2) {
                                this.doneTaskNum = this.doneTaskNum + 1
                            }
                        }
                    }
                    this.taskNum = `${this.doneTaskNum}/${response.meta.pagination.total}`
                })
            },
    editBaseInfo () {
                 if(this.$store.state.power.blogger.add !=='true'){
                    toastr.error('当前用户没有权限编辑博主')
                    return
                }
                this.isEdit = true;
                this.isStatrtEdit = false
            },
    cancelEdit () {
                this.getArtist()
                this.isEdit = false;
                this.isStatrtEdit = true
            },
    distributionPerson (value) {
                this.distributionType = value;
                if (this.artistInfo[value].data.length > 0) {
                    this.$store.state.participantsInfo = Object.assign([], this.artistInfo[value].data)
                }
            },
    abrogate () {
                this.$store.state.participantsInfo = []
            },
    // 分配制作人
    addDistributionPerson () {
                let toast
                let data = {
                    person_ids: [],
                    del_person_ids: [],
                };
                let personInfo = this.$store.state.participantsInfo;
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
                    toast = '分配制作人成功'
                }
                fetch('post', `/bloggers/${this.artistId}/produser`, data).then(() => {
                    toastr.success(toast)
                    $('#distributionproducer').modal('hide');
                    this.getArtist();
                    this.$store.state.participantsInfo = []
                })
            },

            //隐私设置
            setPrivacy: function () {
                let data = {
                    hatch_at: this.$store.state.incubationInfo, //孵化期
                };
                let sendData = {
                    hatch_at: [],
                };
                for (const key in data) {
                    for (let i = 0; i < data[key].length; i++) {
                        sendData[key].push(data[key][i].id)
                    }
                }
                fetch('put', `/bloggers/${this.$route.params.id}/privacyUser`, sendData).then(function () {
                    toastr.success('隐私设置成功')
                    $('#addPrivacy').modal('hide')
                })
            },
    getPrivacy () {
                let data = {
                    blogger_id: this.$route.params.id
                };
                fetch('get', `/privacyUsers?include=creator`, data).then(response => {
                    let allPrivacyUsers = response.data;
                    this.$store.state.incubationInfo = [];

                    if (allPrivacyUsers) {
                        for (let i = 0; i < allPrivacyUsers.length; i++) {
                            this.$store.state.incubationInfo.push(allPrivacyUsers[i].creator.data)

                        }
                    }
                })
            },
    // 类型
    changArtistType (value) {
                this.artistInfo.type.data.id = value
            },
    // 沟通状态
    changeArtistCommunication (value) {
                this.artistInfo.communication_status = value
            },
            //平台id
            changeArtistPlatform_id(value) {
                this.updatePlatform = value.join(',')
            },
            changeArtistSigning(value, name) {
                if (name === 'intention') {
                    if (value.key === 'value') {
                        name = 'intention_desc'
                        this.artistInfo.intention_desc = value.value
                    }
                    if (value.key === 'condition') {
                        name = 'intention'
                        this.artistInfo.intention = value.value
                    }

                } else if (name === 'sign_contract_other') {
                    if (value.key === 'value') {
                        name = 'sign_contract_other_name'
                        this.artistInfo.sign_contract_other_name = value.value
                    }
                    if (value.key === 'condition') {
                        name = 'sign_contract_other'
                        this.artistInfo.sign_contract_other = value.value
                    }

                }
            },
            //修改
            changeArtistBaseInfo: function () {

                this.isEdit = false;
                this.isStatrtEdit = true;
                this.artistId = this.$route.params.id;
                if (this.artistInfo.intention == 1) {
                    this.artistInfo.intention = 1
                } else {
                    this.artistInfo.intention = 0
                }
                if (this.artistInfo.sign_contract_other == 1) {
                    this.artistInfo.sign_contract_other = 1
                } else {
                    this.artistInfo.sign_contract_other = 0
                }
               
                this.changeArtistInfo = {
                    nickname: this.Namevalue,
                    type_id: this.artistInfo.type.data.id,
                    communication_status: this.artistInfo.communication_status,
                    intention: this.artistInfo.intention,
                    sign_contract_other: this.artistInfo.sign_contract_other,
                    desc: this.artistInfo.desc,
                    star_douyin_infos: this.updateStar_douyin_infos,
                    star_weibo_infos: this.updateStar_weibo_infos,
                    star_xiaohongshu_infos: this.updateStar_xiaohongshu_infos,
                    platform: this.updatePlatform,
                    level: this.updatelevel,
                    cooperation_demand: this.updatedemand,
                    hatch_star_at: this.artistInfo.hatch_star_at,
                    hatch_end_at: this.artistInfo.hatch_end_at,
                    intention_desc: this.artistInfo.intention_desc,
                    sign_contract_other_name: this.artistInfo.sign_contract_other_name,
                    sign_contract_status: this.artistInfo.sign_contract_status,
                    avatar: this.uploadUrl
                }
                if (!this.updatelevel) {
                    delete(this.changeArtistInfo.level)
                }
                if(this.artistInfo.hatch_star_at == null || this.artistInfo.hatch_end_at == null){
                    delete(this.changeArtistInfo.hatch_star_at)
                    delete(this.changeArtistInfo.hatch_end_at)
                }
                fetch('put', '/bloggers/' + this.artistId, this.changeArtistInfo).then(() => {
                    toastr.success('修改成功');
                    this.getArtist()
                    $('.selectpicker').selectpicker('refresh')
                })
                if (this.artistInfo.intention == true) {
                    this.artistInfo.intention = 1
                } else {
                    this.artistInfo.intention = 2
                }

                if (this.artistInfo.sign_contract_other == true) {
                    this.artistInfo.sign_contract_other = 1
                } else {
                    this.artistInfo.sign_contract_other = 2
                }
            },
    changeWorkAd (value) {
                if (value == 1) {
                    this.advertisingType = 1
                }
                else if (value == 2) {
                    this.advertisingType = 0;
                }
            },
            //添加作品
            addWork: function () {
                this.isAddWorkButtonDisable = true;
                let data = {
                    nickname: this.artistInfo.nickname,
                    videoname: this.artistWorkName,
                    release_time: this.workReleaseTime,
                    read_proportion: this.artistWorkProportion,
                    link: this.videoUrl,
                    advertising: this.advertisingType,
                    blogger_id: this.$route.params.id
                }
                fetch('post', '/bloggers/new/production', data).then(() => {
                    this.isAddWorkButtonDisable = false;
                    toastr.success('创建成功');
                    $('#addWork').modal('hide');
                    this.getTaskDate()
                })
            },
    // 孵化期截止时间计算
    getTimes () {
                let end_date = '';
                let end_hour;
                let end_minute;
                let end_second;
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
                end_minute = (59 - start_minute) * 60 * 1000
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
                this.getArtist()
                this.getArtistTasks()
                this.getTaskNum()
                $('.selectpicker').selectpicker('refresh')
            },
            changeTaskType: function (value) {
                this.taskType = value
            },
            principalChange: function (value) {
                this.Person_id = value = this.$store.state.newPrincipalInfo.id
            },
            participantChange: function (value) {
                this.participant = value
            },
            changeTaskLevel: function (value) {
                this.taskLevel = value
            },
            changeStartTime: function (value) {
                this.startTime = value
            },
            changeStartMinutes: function (value) {
                this.startMinutes = value
            },
            changeEndTime: function (value) {
                this.endTime = value
            },
            changeEndMinutes: function (value) {
                this.endMinutes = value
            },
            //视频时间
            changeWorkReleaseTime (value) {
                this.workReleaseTime = value
            },
            //昵称
            changArtistName (value) {
                this.Namevalue = value
            },
            //微博地址
            changeArtistWeibo_url(value) {
                this.updateStar_weibo_infos.url = value
            },
            //微博粉丝
            changeArtistWeibo_fans_num(value) {
                this.updateStar_weibo_infos.avatar = value
            },
            //抖音id
            changeArtistDouyin_id(value) {
                this.updateStar_douyin_infos.url = value
            },
            //抖音粉丝数
            changeArtistDouyin_fans_num(value) {
                this.updateStar_douyin_infos.avatar = value
            },
            //小红书地址
            changeArtistXiaohongshu_url(value) {
                this.updateStar_xiaohongshu_infos.url = value
            },
            //小红书粉丝数
            changeArtistXiaohongshu_fans_num(value) {
                this.updateStar_xiaohongshu_infos.avatar = value
            },
            //备注
            changeArtistDesc (value) {
                this.artistInfo.desc = value
            },
            //博主级别
            changeArtistLevel (value) {
                this.updatelevel = value
            },
            //孵化期
            changeArtistHatch (start, end) {
                this.artistInfo.hatch_star_at = start
                this.artistInfo.hatch_end_at = end

            },
            //合作需求
            changeArtistDemand (value) {
                this.updatedemand = value
            },
            taskdetail(id) {
      this.$router.push({ path: `/tasks/${  id}` });
    },
    projectdetil(id) {
      this.$router.push({ path: `/projects/${  id}` });
    },
    Jump(value) {
      const price = value;
      const str = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;// 网址是否合法检测
      const regex = /(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi;// http,https有无检测
      let re = new RegExp(str);
      if (!re.test(value)) {
        toastr.error('您的网址不正确');
      } else {
        value = value.replace(regex, (match, capture) => {
                        if (capture) {
                            window.open(price)
                        }
                        else {
                            window.open('http://' + match)
                        }
                    })
                }
            },
            JumpDetails(id) {
                this.$router.push({path: '/tasks/' + id})
            },
            contractlist(status) {
                let data = {
                    type: this.contractType
                }
                data.status = status
                fetch('get', 'approvals/specific_contract', data).then(response => {

                    this.formDate = response.data
                    $('#approval-great-module').modal('show')
                });
    },
  },
  filters: {
    getWeek (date) {
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
            },
  },
};
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

    .Jump, .taskshow, .projectshow {
        cursor: pointer;
    }

    /* .Jump:hover{

    } */
    textarea {
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

    .puls {
        display: inline-block;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 76px;
        border-radius: 50%;
        border: 1px solid #eee;
        background-repeat: no-repeat;
        background-size: 100%;
        -moz-background-size: 100% 100%;
    }

    .puls span {
        font-size: 30px;
    }

    .puls img {
        width: 100%;
        height: 100%;
    }

    .card-header:first-child {
        border-radius: calc(.215rem - 1px) calc(.215rem - 1px) 0 0;
        display: flex;
        align-items: center;
    }

    .fileupload {
        position: absolute;
        top: 0px;
        left: 0px;
        opacity: 0;
    }

    .calendar-toast {
        background: #f5f5f5;
        padding: 2px 3px;
        border-radius: 2px;
        z-index: 1000;
    }

    .projectcontent:hover, .taskcontent:hover {
        background: #eee
    }
</style>
