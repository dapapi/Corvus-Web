<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">艺人详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right" v-if="canShow&&artistInfo.name">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <!-- <a class="dropdown-item" role="menuitem" >分享</a> -->
                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                       @click="distributionPerson('broker')">分配经理人</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                        @click="distributionPerson('publicity')">分配宣传人</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#addPrivacy" v-if="PrivacyShow">隐私设置</a>
                    <a class="dropdown-item" role="menuitem" @click="contractlist(artistInfo.sign_contract_status)">
                        <template v-if="artistInfo.sign_contract_status == 1">签约</template>
                        <template v-if="artistInfo.sign_contract_status == 2">解约</template>
                    </a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block clearfix">
                    <Upload @change='getUploadUrl' class="upload-image float-left mr-5"
                            style="width:80px;height:80px;border-radius:50%;position:relative">
                        <div class="puls" :style="{ backgroundImage: 'url(' + uploadUrl + ')' }" v-if="uploadUrl">
                        </div>
                        <div class="puls" v-if="!uploadUrl">
                            <img src="https://res-crm.papitube.com/image/artist-no-avatar.png" alt="">
                        </div>

                    </Upload>
                    <div class="float-left ml-10 mt-10" style="width:calc(100% - 100px)">
                        <h4 class="card-title">{{artistInfo.name}}</h4>
                        <div class=" clearfix example">
                            <div class="col-md-6 float-left pl-0">
                                <div class="float-left pl-0 pr-2 col-md-2">
                                    <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>经理人
                                </div>
                                <div class="font-weight-bold float-left col-md-10 pl-0" v-if="artistInfo.broker"
                                     style="padding-top:1.5px">
                                    <span v-for="(broker,index) in artistInfo.broker" :key="index" class="mr-10">
                                        <span>{{broker.department}}</span>
                                        <span v-if="broker.department">-</span>
                                        <span>{{ broker.name }}</span>

                                    </span>
                                </div>
                            </div>
                            <div class="col-md-6 float-left pl-0">
                                <div class="float-left pl-0 pr-2 col-md-2">
                                    <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>宣传人
                                </div>
                                <div class="font-weight-bold float-left col-md-10 pl-0" v-if="artistInfo.publicity"
                                     style="padding-top:2px">
                                    <span v-for="(publicity,index) in artistInfo.publicity" :key="index"
                                          class="mr-10">
                                        <span>{{publicity.department}}</span>
                                        <span v-if="publicity.department">-</span>
                                        <span>{{ publicity.name }}</span>

                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="clearfix ml-10">
                    <div v-if="artistTasksInfo.length>0" class="col-md-6 float-left pl-0 mb-20">
                        <div class="col-md-6"><i class="iconfont icon-iconset0399"></i> 任务</div>
                        <div class="clearfix example" v-for="(item,index) in artistTasksInfo" :key="index"
                             @click="toTask(item.id)" style="cursor: pointer;">
                            <div class="col-md-3 float-left">
                                {{item.title}}
                            </div>
                            <div class="col-md-2 float-left">{{item.principal_name}}</div>
                            <div class="col-md-4 float-left">{{item.end_at}}</div>
                            <div class="col-md-3 float-left">
                                <template v-if="item.status === 1"><span style="color:#FF9800">进行中</span></template>
                                <template v-if="item.status === 2"><span style="color:#4CAF50">已完成</span></template>
                                <template v-if="item.status === 3"><span style="color:#9E9E9E">已停止</span></template>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 float-left pl-0 mb-20">
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
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start">
                <div class="panel" style="width: calc(66% - 15px);float:left;margin-right:30px;">
                    <div class="col-md-12">
                        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                            <li class="nav-item" role="presentation" v-if="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" :class="artistInfo.sign_contract_status == 2?'active':''"
                                   data-toggle="tab" href="#forum-artist-schedule"
                                   aria-controls="forum-base"
                                   aria-expanded="false" role="tab">日程</a>
                            </li>
                            <li class="nav-item" role="presentation" v-if="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-projects"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab" @click="getProject()">项目</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link"
                                   data-toggle="tab" href="#forum-artist-tasks"
                                   aria-controls="forum-present"
                                   aria-expanded="true" role="tab" @click="getTaskList()">
                                    <template v-if="allTaskList.length > 0">
                                        <ToolTips :title="`已完成数量${doneTaskNum}`">
                                            任务 ({{taskNum}})
                                        </ToolTips>
                                    </template>
                                    <template v-else>
                                        任务
                                    </template>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation" v-if="artistInfo.sign_contract_status == 2">
                                <a class="nav-link" data-toggle="tab" href="#forum-artist-work"
                                   aria-controls="forum-present"
                                   aria-expanded="false" role="tab" @click="getWoks()">作品库</a>
                            </li>
                            <!--<li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">-->
                            <!--<a class="nav-link" data-toggle="tab" href="#forum-artist-fans"-->
                            <!--aria-controls="forum-present"-->
                            <!--aria-expanded="false" role="tab">粉丝数据</a>-->
                            <!--</li>-->
                            <li class="nav-item" role="presentation" @click="getArtistsBill()"
                                v-if="artistInfo.sign_contract_status == 2">
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
                        <div class="tab-content px-0 nav-tabs-animate bg-white col-md-12">
                            <!--日历日程-->
                            <div class="tab-pane animation-fade  fixed-button-father" id="forum-artist-schedule"
                                 role="tabpanel" :class="artistInfo.sign_contract_status == 2?'active':''">
                                <div class="col-md-12">
                                    <calendar v-if="artistInfo.sign_contract_status == 2" :goto-date="selectedDate"
                                              :calendars="calendarId" ref="calendar" @showToast="showToast"
                                              @scheduleClick="showScheduleModal" :isModel="true"
                                              @dayClick="showAddScheduleModal"></calendar>
                                </div>
                            </div>
                            <!--项目-->
                            <div class="tab-pane animation-fade  fixed-button-father" id="forum-artist-projects"
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
                                        <th class="cell-300" scope="col">艺人分成</th>
                                    </tr>
                                    <tr v-for="(item,index) in artistProjectsInfo" :key="index"
                                        @click="toProject(item.id)" style="cursor: pointer;" class="projectcontent">
                                        <td>
                                            {{item.title}}
                                        </td>

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
                                <div style="margin: 6rem auto;width: 100px" v-if="artistProjectsInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getProject" :total_pages="total_pages"
                                            :total="total"></pagination>
                            </div>
                            <!--任务-->
                            <div class="tab-pane animation-fade  fixed-button-father"
                                 id="forum-artist-tasks"
                                 role="tabpanel">
                                <table class="table table-hover is-indent example" data-plugin="animateList"
                                       data-animate="fade" data-child="tr">
                                    <tr class="animation-fade"
                                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                        <th class="cell-300" scope="col">任务名称</th>
                                        <th class="cell-300" scope="col">任务类型</th>
                                        <th class="cell-300" scope="col">状态</th>
                                        <th class="cell-300" scope="col">负责人</th>
                                        <th class="cell-300" scope="col">截止时间</th>
                                    </tr>
                                    <tr v-for="(task,index) in allTaskList" :key="index" @click="toTask(task.id)"
                                        style="cursor: pointer;" class="taskcontent">
                                        <td>
                                            {{task.title}}
                                        </td>
                                        <td>
                                            <template v-if="task.type">{{task.type.data.title}}</template>
                                            <template v-else></template>
                                        </td>
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
                                        <td><span v-if="task.principal">{{ task.principal.data.name }}</span></td>
                                        <td>{{ task.end_at }}</td>
                                    </tr>

                                </table>
                                <div style="margin: 6rem auto;width: 100px" v-if="allTaskList.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>
                                <pagination :current_page="current_page" :method="getTaskList"
                                            :total_pages="total_pages"
                                            :total="total"></pagination>
                                <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                     data-target="#addTask">
                                    <button type="button"
                                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true"
                                           style="font-size:30px"></i>
                                        <i class="back-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true"
                                           style="font-size:30px"></i>
                                    </button>
                                </div>
                            </div>
                            <!--作品库-->
                            <div class="tab-pane animation-fade  fixed-button-father" id="forum-artist-work"
                                 role="tabpanel">
                                <table class="table table-hover is-indent example" data-plugin="animateList"
                                       data-animate="fade" data-child="tr">
                                    <tr class="animation-fade"
                                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                        <th class="cell-300" scope="col">作品名称</th>
                                        <th class="cell-300" scope="col">导演</th>
                                        <th class="cell-300" scope="col">作品发布时间</th>
                                        <th class="cell-300" scope="col">作品类型</th>
                                        <th class="cell-300" scope="col">角色</th>
                                        <th class="cell-300" scope="col">合作演员</th>
                                    </tr>
                                    <tbody>
                                    <tr v-for="(work,index) in artistWorksInfo" :key="index">
                                        <td>{{work.name}}</td>
                                        <td>{{work.director}}</td>
                                        <td>{{common.timeProcessing(work.release_time)}}</td>
                                        <td>{{workTypeArr.find(item => item.value == work.works_type).name}}</td>
                                        <td>{{work.role}}</td>
                                        <td>{{work.co_star}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style="margin: 6rem auto;width: 100px" v-if="artistWorksInfo.length === 0">
                                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                         style="width: 100%">
                                </div>

                                <pagination :current_page="current_page" :method="getWoks" :total_pages="total_pages"
                                            :total="total"></pagination>
                                <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                     @click="canAddWork">
                                    <button type="button"
                                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up"
                                           aria-hidden="true" style="font-size:30px"></i>
                                        <i class="back-icon md-close animation-scale-up" aria-hidden="true"></i>
                                    </button>
                                </div>

                            </div>
                            <!--粉丝数据-->
                            <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-fans"
                                 role="tabpanel">
                                <div id="myChart"
                                     style="width:80vw ;height:400px; margin-top:30px;padding-bottom: 20px"></div>
                            </div>
                            <!--账单-->
                            <div class="tab-pane animation-fade   fixed-button-father" id="forum-artist-bill"
                                 role="tabpanel">
                                <div class="clearfix my-10">
                                    <div class="float-left my-10 ml-10">
                                        <div class="float-left pr-40">收款金额 <span
                                                class="money-color">{{incomesum}}元</span></div>
                                        <div class="float-left pr-40">付款金额 <span
                                                class="money-color">{{expendituresum}}元</span></div>
                                    </div>
                                </div>
                                <table class="table table-hover" data-child="tr">
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
                                    <tr v-for="(bill,index) in artistBillsInfo" :key="index">
                                        <td>{{ bill.expense_name }}</td>
                                        <td>{{ bill.expense_type }}</td>
                                        <td>{{ bill.project_kd_name }}</td>
                                        <td>{{ bill.money }}</td>
                                        <td>{{ common.timeProcessing(bill.pay_rec_time) }}</td>
                                        <td>{{ bill.action_user }}</td>
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
                            <!--概况-->
                            <div class="tab-pane animation-fade   fixed-button-father" id="forum-artist-base"
                                 role="tabpanel" :class="artistInfo.sign_contract_status == 2?'':'active'">
                                <div class="card">
                                    <div class="card-header card-header-transparent card-header-bordered"
                                         style="position: relative;">
                                        <div class="float-left font-weight-bold third-title">艺人信息</div>
                                        <div class="float-right pointer-content" v-show="!isEdit"
                                             style="position:absolute;top:10px;right:30px;">
                                            <i class="iconfont icon-bianji2" aria-hidden="true"
                                               @click="editBaseInfo" v-if="artistInfo.name"></i>
                                        </div>
                                        <div class="float-right mr-40" v-show="isEdit"
                                             style="position:absolute;top:5px;right:0px;">
                                            <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消
                                            </button>
                                            <button class="btn btn-primary" @click="changeArtist">确定</button>
                                        </div>
                                    </div>
                                    <div class="card-block px-0" v-if="artistInfo.name">
                                        <h5 class="pl-15">基本资料</h5>
                                        <div class="clearfix">
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">姓名</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.name" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'name')"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">性别</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :options="genderArr" :content="artistInfo.gender"
                                                                  :is-edit="isEdit"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'gender')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">出生日期</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.birthday!=='**'">
                                                    <EditDatepicker :content="artistInfo.birthday"
                                                                    :is-edit="isEdit"
                                                                    @change="(value) => changeArtistBaseInfo(value, 'birthday')"></EditDatepicker>
                                                </div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.birthday=='**'">
                                                    {{artistInfo.birthday}}
                                                </div>
                                            </div>
                                            <div class="card-text py-20 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">年龄</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.birthday!=='**'">
                                                    {{artistInfo.birthday|jsGetAge}}
                                                </div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.birthday=='**'">
                                                    {{artistInfo.birthday}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">艺人来源</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :content="artistInfo.source"
                                                                  :options="artistSourceArr"
                                                                  :is-edit="isEdit"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'source')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">沟通状态</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :content="artistInfo.communication_status"
                                                                  :options="taiyangCommunicationStatusArr"
                                                                  :is-edit="isEdit"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'communication_status')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">星探</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.artist_scout_name" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'artist_scout_name')"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height"
                                                 style="height:64px;">
                                                <div class="col-md-3 float-left text-right pl-0">地区</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.star_location" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'star_location')"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">与我司签约意向</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <ConditionalInput ref="condition" :is-edit="isEdit"
                                                                      :content="artistInfo.intention"
                                                                      :input-content="artistInfo.intention_desc"
                                                                      :condition="2"
                                                                      @change="(value) => changeArtistBaseInfo(value, 'intention')"></ConditionalInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">是否签约其他公司</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <ConditionalInput ref="condition1" :is-edit="isEdit"
                                                                      :content="artistInfo.sign_contract_other"
                                                                      :input-content="artistInfo.sign_contract_other_name"
                                                                      :condition="1"
                                                                      @change="(value) => changeArtistBaseInfo(value, 'sign_contract_other')"></ConditionalInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">潜在风险点</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.star_risk_point!=='**'">
                                                    <editTextarea :content="artistInfo.star_risk_point"
                                                                  :is-edit="isEdit"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'star_risk_point')"></editTextarea>
                                                </div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.star_risk_point=='**'">
                                                    {{artistInfo.star_risk_point}}
                                                </div>
                                            </div>
                                            <h5 class="pl-15 pt-10 clearfix col-md-12 float-left">联系信息</h5>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">手机号</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.phone!=='**'">
                                                    <EditInput :content="artistInfo.phone" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'phone')"></EditInput>
                                                </div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.phone=='**'">
                                                    {{artistInfo.phone}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">微信</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.wechat!=='**'">
                                                    <EditInput :content="artistInfo.wechat" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'wechat')"></EditInput>
                                                </div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.wechat=='**'">
                                                    {{artistInfo.wechat}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">邮箱</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.email!=='**'">
                                                    <EditInput :content="artistInfo.email" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'email')"></EditInput>
                                                </div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.email=='**'">
                                                    {{artistInfo.email}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">社交平台</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditSelector :is-edit="isEdit" :multiple="true"
                                                                  :content="artistInfo.platform ? artistInfo.platform.split(',') : []"
                                                                  :options="artistSocialPlatform"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'platform')"></EditSelector>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">微博主页地址</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.weibo_url" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'weibo_url')"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">微博粉丝数</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.weibo_fans_num"
                                                               :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'weibo_fans_num')"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">抖音ID</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.douyin_id" :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'douyin_id')"></EditInput>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">抖音粉丝数</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <EditInput :content="artistInfo.douyin_fans_num"
                                                               :is-edit="isEdit"
                                                               @change="(value) => changeArtistBaseInfo(value, 'douyin_fans_num')"></EditInput>
                                                </div>
                                            </div>

                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">备注</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <editTextarea :content="artistInfo.desc" :is-edit="isEdit"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'desc')"></editTextarea>
                                                </div>
                                            </div>

                                            <div v-show="isEdit"
                                                 class="card-text py-10 px-0 clearfix col-md-6 float-left edit-height">
                                                <div class="col-md-3 float-left text-right pl-0">附件类型</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <selectors v-show="isEdit" :options="attachmentTypeArr"
                                                               @change="changeAttachmentType"
                                                               ref="attachType"></selectors>

                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                                <div class="col-md-3 float-left text-right pl-0">签约状态</div>
                                                <div class="col-md-9 float-left font-weight-bold"
                                                     v-if="artistInfo.sign_contract_status"
                                                     :class="isEdit?'py-10':''">
                                                    {{signState.find(item=>item.value ===
                                                    artistInfo.sign_contract_status).name}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left mt-10"
                                                 style="min-height:57px">
                                                <div class="col-md-3 float-left text-right pl-0">附件</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <span v-show="isEdit"
                                                          style="color:#01BCD4;cursor:pointer">上传附件</span>
                                                    <FileUploader v-show="isEdit" class="uploadAttach"
                                                                  @change="uploadAttachment"
                                                                  mulId="aff"></FileUploader>
                                                    <div class="mt-5">
                                                        <div class="row" v-for="(attach,index) in affixes"
                                                             :key="index">
                                                            <div class="col-md-2 p-0">
                                                                <i class="iconfont icon-wenjian"
                                                                   style="color:#1e88e5;font-size:36px"></i>
                                                            </div>

                                                            <div class="col-md-10 mt-5">
                                                                <span class="mr-20 single">{{attachmentTypeArr.find(item => item.value == attach.type).name}} - {{attach.title}}</span>
                                                                <a data-toggle="modal" data-target='#docPreview'
                                                                   @click="previewFile(attach.url,attach.title)"
                                                                   class="iconfont icon-liulan  mr-15"
                                                                   style="color:#3f51b5"></a>
                                                                <i class="iconfont icon-shanchu1"
                                                                   data-toggle="modal"
                                                                   data-target="#affix"
                                                                   @click="getAffixId(attach.id)"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <h5 class="pl-15 pt-10 clearfix col-md-12 float-left">更新信息</h5>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">录入人</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    {{ artistInfo.creator.name}}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">录入时间</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    {{ common.timeProcessing(artistInfo.created_at) }}
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">最近更新人</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <template v-if="artistInfo.last_updated_user">
                                                        {{artistInfo.last_updated_user}}
                                                    </template>
                                                    <template v-else>{{ artistInfo.creator.name}}</template>
                                                </div>
                                            </div>
                                            <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                                <div class="col-md-3 float-left text-right pl-0">最近更新时间</div>
                                                <div class="col-md-9 float-left font-weight-bold">
                                                    <template v-if="artistInfo.last_updated_at">
                                                        {{ common.timeProcessing(artistInfo.last_updated_at)}}
                                                    </template>
                                                    <template v-else>{{ common.timeProcessing(artistInfo.created_at) }}
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="panel" style="width: calc(34% - 15px);min-height:100%">
                    <div class="col-md-12">
                        <div class="card col-md-12">
                            <div class="card-header card-header-transparent card-header-bordered p-10"
                                 style="font-size: 16px;font-weight: bold;">
                                <div>艺人跟进</div>
                            </div>
                            <div class="card-block">
                                <div class="col-md-12 pl-0">
                                    <TaskFollowUp :follow-type="'艺人'" :trailId="$route.query.id"
                                                  trailType="stars"></TaskFollowUp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div v-if="canShow" class="calendar-toast" v-show="toastShow"
                 :style="'position: absolute;top:' + toastY + 'px; left: ' + toastX + 'px;'">双击创建日程
            </div>

            <modal v-if="canShow" :id="'affix'" :title="'删除附件'" @onOK="deleteAffix">
                <div class="text-center m-20">您确认删除该附件吗？</div>
            </modal>
            <!-- 新增任务 -->
            <AddTask v-if="canShow" :resourceable_id="artistId" resource_type="2" :resource_title="artistName"
                     resource_name="艺人"
                     @success="addTask"></AddTask>

            <!--作品库-->
            <div v-if="canShow" class="modal fade" id="addWork" aria-hidden="true" aria-labelledby="addLabelForm"
                 role="dialog" tabindex="-1" data-backdrop="static">
                <div class="modal-dialog modal-simple">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                                <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                            </button>
                            <h4 class="modal-title">新增作品</h4>
                        </div>
                        <div class="modal-body">

                            <div class="example">
                                <div class="col-md-2 text-right float-left">艺人</div>
                                <div class="col-md-10 float-left">{{ artistInfo.name }}</div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">作品名称</div>
                                <div class="col-md-10 float-left">
                                    <input type="text" title="" class="form-control" v-model="artistWorkName"
                                           placeholder="请输入作品名称">
                                </div>
                            </div>

                            <div class="example">
                                <div class="col-md-2 text-right float-left require">导演</div>
                                <div class="col-md-10 float-left">
                                    <input type="text" title="" class="form-control" v-model="artistWorkDirector"
                                           placeholder="请输入导演姓名">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">作品发布时间</div>
                                <div class="col-md-10 float-left">
                                    <datepicker @change="changeWorkReleaseTime" ref="workTime"
                                                placeholder="请选择时间"></datepicker>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">作品类型</div>
                                <div class="col-md-10 float-left">
                                    <selectors :options="workTypeArr" @change="changeWorkType"
                                               ref="workType"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">角色</div>
                                <div class="col-md-10 float-left">
                                    <input type="text" title="" class="form-control" v-model="character"
                                           placeholder="请输入角色">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">合作演员</div>
                                <div class="col-md-10 float-left">
                                    <input type="text" title="" class="form-control" v-model="coActor"
                                           placeholder="请输入合作演员">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                            <button class="btn btn-primary" type="submit" :disable="isAddWorkButtonDisable"
                                    @click="addWork">确定
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <!--分配经纪人和宣传人-->
            <div v-if="canShow" class="modal fade" id="distributionBroker" aria-hidden="true"
                 aria-labelledby="addLabelForm"
                 role="dialog" tabindex="-1" data-backdrop="static">
                <div class="modal-dialog modal-simple" style="max-width: 50rem;">

                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                                <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                            </button>
                            <template v-if="distributionType === 'broker'">
                                <h4 class="modal-title">分配经理人</h4>
                            </template>
                            <template v-else>
                                <h4 class="modal-title">分配宣传人</h4>
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
            <!-- 新建/修改 日程 -->
            <div v-if="canShow" class="modal fade line-center" id="changeSchedule" aria-hidden="true"
                 aria-labelledby="addLabelForm"
                 role="dialog" tabindex="-1" data-backdrop="static">
                <div class="modal-dialog modal-simple">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div style="order: 2">
                            <span class="pointer-content hover-content mr-4" data-toggle="modal"
                                  data-target="#addLinkage" @click="getRelationDate">关联</span>
                                <i class="iconfont icon-guanbi pointer-content" aria-hidden="true"
                                   data-dismiss="modal"></i>
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
                                        <input type="checkbox" id="isAllDay" @change="changeIsAllDay"
                                               v-model="isAllday">
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
                                        <selectors :options="remindArr" ref="scheduleRemind"></selectors>
                                    </div>
                                </div>
                                <div class="clearfix my-20">
                                    <div class="col-md-2 text-right float-left line-fixed-height">重复</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <selectors :options="repeatArr" ref="scheduleRepeat"
                                                   @change="changeScheduleRepeat"></selectors>
                                    </div>
                                    <div class="col-md-2 float-left"></div>
                                    <div class="col-md-10 float-left pl-0 font-12 mt-5" style="color: #c3c3c3">重复周期为1年
                                    </div>
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
                                            <input type="checkbox" id="onlyParticipantVisible"
                                                   v-model="schedulePrivacy">
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
                            <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
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
            <!-- 关联资源 -->
            <div v-if="canShow" class="modal fade" id="addLinkage" aria-hidden="true" aria-labelledby="addLabelForm"
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
                                        <li class="nav-item" role="presentation"
                                            @click="selectProjectLinkage('project')">
                                            <a class="nav-link active" data-toggle="tab" href="#projectsPane"
                                               aria-controls="exampleTabsLineLeftOne" role="tab" aria-selected="false">
                                                项目</a>
                                        </li>
                                        <li class="nav-item" role="presentation" @click="selectProjectLinkage('task')">
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
            <div v-if="canShow" class="modal fade" id="checkSchedule" aria-hidden="true" aria-labelledby="addLabelForm"
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
                                <i class="iconfont icon-guanbi pointer-content" aria-hidden="true"
                                   data-dismiss="modal"></i>
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
                                        <div class="big-time">{{ (scheduleData.start_at.split(' ')[1]).slice(0,5) }}
                                        </div>
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
                                        <div @click="openFile(affix.url)" class="pointer-content">{{ affix.title }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 删除日历/日程 -->
            <div v-if="canShow" class="modal fade" id="delModel" aria-hidden="true" aria-labelledby="addLabelForm"
                 role="dialog"
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
            <!--隐私设置-->
            <div v-if="canShow" class="modal fade" id="addPrivacy" aria-hidden="true" aria-labelledby="addLabelForm"
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
                                <div class="col-md-2 text-right float-left">年龄</div>
                                <div class="col-md-10 float-left">
                                    <add-member :type="'birthday'"></add-member>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">潜在风险点</div>
                                <div class="col-md-10 float-left">
                                    <add-member :type="'star_risk_point'"></add-member>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">手机号</div>
                                <div class="col-md-10 float-left">
                                    <add-member :type="'phone'"></add-member>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">微信</div>
                                <div class="col-md-10 float-left">
                                    <add-member :type="'wechat'"></add-member>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left">邮箱</div>
                                <div class="col-md-10 float-left">
                                    <add-member :type="'email'"></add-member>
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
            <div v-if="canShow" class="modal fade" id="permissionPrompt" aria-hidden="true" aria-labelledby="addLabelForm"
                role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">提示</h4>
                    </div>
                    <div class="modal-body pt-20 pb-10">
                        <div class="example">
                            <div class="col-md-12 text-center " style="font-size:20px;">该艺人无对应艺人日历，请先创建艺人日历</div>
                        </div>
                       
                    </div>
                    <div class="modal-body pt-10 pb-20">
                        <div class="example">
                            <div class="col-md-12 text-center pb-10">
                                <button class="btn btn-primary" type="submit" @click="changeCalendarActionType('add')"><i class="iconfont icon-tianjiarili px-5"></i>快捷创建日历</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <!-- 添加/修改 日历 -->
        <div v-if="canShow" class="modal fade line-center" id="addCalendar" aria-hidden="true"
             aria-labelledby="addLabelForm" role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <template v-if="calendarActionType === 'add'">
                            <h4 class="modal-title">添加日历</h4>
                        </template>
                        <template v-else>
                            <h4 class="modal-title">修改日历</h4>
                        </template>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">标题</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" title="" placeholder="请输入标题"
                                       v-model="scheduleName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <ul class="color-selector calendar-color-list">
                                    <li class="pointer-content" v-for="(color,index) in colorArr"
                                        :style="'background-color: ' + color"
                                        :key="index" @click="changeCalendarColor(color)">
                                        <i class="md-check" v-if="color === checkColor"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">可见范围</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="visibleRangeArr" ref="visibleSelector"
                                           @change="addCalendarVisible"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">关联艺人</div>
                            <div class="col-md-10 float-left pl-0" v-if="starsArr.length > 0">
                                <!-- <selectors :options="starsArr" ref="linkageStar"
                                           @change="addCalendarStar"></selectors> -->
                                 <input type="text" class="form-control" 
                                       v-model="artistInfo.name">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">负责人</div>
                            <div class="col-md-10 float-left pl-0">
                                <InputSelectors placeholder="请选择负责人" @change="principalChange"></InputSelectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <AddMember></AddMember>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                            <template v-if="calendarActionType === 'add'">
                                <button class="btn btn-primary" type="submit" :disable="isAddCalendarButtonDisable"
                                        @click="addCalendar">确定
                                </button>
                            </template>
                            <template v-else>
                                <button class="btn btn-primary" type="submit" @click="changeCalendar">确定</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <!--附件预览-->
            <ApprovalGreatModule v-if="canShow" :formData='formDate' :detailpage='isDetail'
                                 :default-value="{value:projectContractDefault,id:$route.query.id}"></ApprovalGreatModule>
            <DocPreview :url='$store.state.previewurl' :givenFileName="previewName" :detailpage='isDetail'/>
        </div>
    </div>
</template>

<script>

    // 项目列表include 头部三个项目单独接口  作品include 任务列表单独接口  头部三个任务include
    import Cookies from 'js-cookie';
    import fetch from '../../assets/utils/fetch.js';
    import config from '../../assets/js/config';
    import common from '../../assets/js/common';

    import ApprovalGreatModule from '../../components/ApprovalGreatModule';

    export default {
        data() {
            return {
                common,
                artistId: '',
                artistName: '',
                artistInfo: {},
                taskTypeArr: [],
                taskLevelArr: config.taskLevelArr,
                attachmentTypeArr: config.attachmentTypeArr,
                taskType: '',
                startTime: '',
                startMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                taskIntroduce: '',
                artistTasksInfo: [], // 任务
                artistWorksInfo: [], // 作品库
                artistProjectsInfo: '', // 项目
                artistWorkName: '', // 作品名称
                artistWorkDirector: '', // 导演名称
                artistBillsInfo: [], // 账单
                workReleaseTime: '',
                workTypeArr: config.workTypeArr,
                workType: '',
                character: '',
                coActor: '',
                isEdit: '',
                genderArr: config.genderArr,
                artistDesc: '',
                artistSourceArr: config.artistSourceArr,
                taiyangCommunicationStatusArr: config.taiyangCommunicationStatusArr,
                yesOrNoArr: config.yesOrNoArr,
                signState: config.signState,
                changeArtistInfo: {},
                artistSocialPlatform: [
                    {
                        value: 1,
                        name: '微博',
                    },
                    {
                        value: 2,
                        name: '百科',
                    },
                    {
                        value: 3,
                        name: '抖音',
                    },
                    {
                        value: 4,
                        name: '其他',
                    },
  
                ],
                distributionType: '',
                affixes: [], // 附件
                affixesType: '', // 附件类型
                affixId: '',
                taskNum: '',
                doneTaskNum: 0,
                filterFee: 1,
                avatar: '',
                selectedDate: '',
                scheduleData: '',
                scheduleParticipants: [],
                previewUrl: '',
                previewName: '',
                user: {},
                total: 0,
                current_page: 1,
                total_pages: 1,
                allTaskList: [], // 获取任务列表
                //   threeProjectList: [], // 获取三个项目
                expense_type: 0,
                incomesum: 0, // 账单 -- 收入总和
                expendituresum: 0, // 账单 -- 支出总和
                isLoading: true,
                uploadUrl: '',
                calendarId: [], // 艺人关联日历id
                scheduleType: 'add',
                scheduleName: '',
                calendarList: [],
                scheduleCalendar: '',
                isAllday: false,
                isScheduleAllday: 0,
                linkageSelectedIds: {
                    projects: [],
                    tasks: [],
                },
                showMore: false,
                searchKeyWord: '',
                allProjectsInfo: '',
                allTasksInfo: '',
                colorArr: config.colorArr,
                checkColor: '',
                allMeetingRomeList: '',
                remindArr: config.remindArr,
                repeatArr: config.repeatArr,
                eventPlace: '',
                eventDesc: '',
                schedulePrivacy: false,
                scheduleMaterialId: '',
                noPermission: false,
                delType: '',
                calendarName: '',
                scheduleRepeat: 0,
                contractType: 'stars',
                formDate: '',
                scheduleShow: [],
                priorityArr: config.priorityArr,
                scheduleStartTime: '',
                scheduleEndTime: '',
                toastShow: false,
                toastX: 0,
                toastY: 0,
                projectContractDefault: '',
                taskDate: {},
                scheduleRemind: '',
                conditionLength: 0,
                selectorHidden: [],
                isCancel: false,
                scheduleRemindDate: [],
                isDetail: true,
                isAddScheduleButtonDisable: false,
                isAddWorkButtonDisable: false,
                canShow : false,
                PrivacyShow:false,
                calendarActionType:'add',
                visibleRangeArr: config.visibleRangeArr,
                starsArr: [
                    {
                        name: '无',
                        value: ''
                    }
                ],
                starId: '',
                starFlag: '',
                isAddCalendarButtonDisable: false,
                };
            },

  created() {
    this.getArtist();
  },
  components: {
    ApprovalGreatModule,
  },

  mounted() {
    this.getCalendar();
    // this.draw();
    this.getTaskDate();
    this.getStars()
    this.getResources();
  


    this.user = JSON.parse(Cookies.get('user'));
    this.$store.commit('changeNewPrincipal', {
      name: this.user.nickname,
      id: this.user.id,
    });
    this.principal = this.user.id;
    const _this = this;
    $('#distributionBroker').on('hidden.bs.modal', () => {
      _this.$store.commit('changeParticipantsInfo', []);
    });
    $('#changeSchedule').on('hidden.bs.modal', () => {
      _this.initAddScheduleModal();
    });
    this.getPrivacy() //获取隐私设置
  },

  methods: {
            canAddWork(){
                if (this.artistInfo.powers.add_work !== 'true') {
                    toastr.error('当前用户没有权限新增作品');
                    return;
                }
                $('#addWork').modal('show')
            },
            // 获取艺人信息
            getArtist() {
                let url
                this.artistId = this.$route.query.id;
                if( this.$route.query.sign_contract_status == 2){
                    url =`stars/detail/${this.artistId}`
                }else if (this.$route.query.sign_contract_status == 1){
                    url =`/signing/stars/detail/${this.artistId}`
                }
                fetch('get', url).then((response) => {
                    if (JSON.stringify(response.data ) === '[]') {
                        toastr.error('您没有查看艺人详情的权限')   
                    }else{ 
                        this.artistInfo = response.data; 
                    }
                    this.isLoading = false;
                    setTimeout(() => {
                        this.canShow = true
                    }, 200);
                    this.artistName = response.data.name;
                    if (response.data.star_risk_point == 'privacy') {
                    this.artistInfo.star_risk_point = '**';
                    } else {
                    this.artistInfo.star_risk_point = response.data.star_risk_point;
                    }
                    if (response.data.birthday == 'privacy') {
                    this.artistInfo.birthday = '**';
                    } else {
                    this.artistInfo.birthday = response.data.birthday;
                    }
                    if (response.data.phone == 'privacy') {
                    this.artistInfo.phone = '**';
                    } else {
                    this.artistInfo.phone = response.data.phone;
                    }
                    if (response.data.wechat == 'privacy') {
                    this.artistInfo.wechat = '**';
                    } else {
                    this.artistInfo.wechat = response.data.wechat;
                    }
                    if (response.data.email == 'privacy') {
                    this.artistInfo.email = '**';
                    } else {
                    this.artistInfo.email = response.data.email;
                    }
                    this.uploadUrl = this.artistInfo.avatar;
                    if(response.data.tasks){
                        this.artistTasksInfo = response.data.tasks;// 任务数据
                    }
                    
                    // this.artistWorksInfo = response.data.works.data;// 作品数据
                    if(response.data.affixes){
                        this.affixes = response.data.affixes.data;
                    }
                    if(this.artistInfo.creator){
                        if(this.user.nickname == this.artistInfo.creator.name){
                            this.PrivacyShow = true
                        }
                    }
                });
            },
            getProject(page = 1) {
            fetch('get', `/stars/${this.artistId}/project`, { page }).then((response) => {
                this.artistProjectsInfo = response.data;
                this.current_page = response.meta.pagination.current_page;
                this.total = response.meta.pagination.total;
                this.total_pages = response.meta.pagination.total_pages;
            });
            },
            getWoks() {
            fetch('get', `/stars/${this.artistId}/works`).then((response) => {
                this.artistWorksInfo = response.data;
                this.current_page = response.meta.pagination.current_page;
                this.total = response.meta.pagination.total;
                this.total_pages = response.meta.pagination.total_pages;
            });
            },
            //隐私设置
            setPrivacy:function(){
                let data = {
                        birthday: this.$store.state.birthdayInfo, //年龄
                        star_risk_point: this.$store.state.star_risk_pointInfo,//潜在风险点
                        phone: this.$store.state.phoneInfo,//手机号
                        wechat: this.$store.state.wechatInfo,//微信
                        email: this.$store.state.emailInfo,//邮箱
                    };
                    let sendData = {
                        birthday: [],
                        star_risk_point: [],
                        phone: [],
                        wechat: [],
                        email: []
                    };
                    for (const key in data) {
                        for (let i = 0; i < data[key].length; i++) {
                            sendData[key].push(data[key][i].id)
                        }
                    }
                    fetch('post', `/stars/${this.$route.query.id}/privacyUser`, sendData).then(function () {
                        toastr.success('隐私设置成功')
                        $('#addPrivacy').modal('hide')
                    })
                },
            getPrivacy() {
                let data = {
                    star_id: this.$route.query.id
                };
                
                fetch('get', `/privacyUsers?include=creator`, data).then(response => {
                    let allPrivacyUsers = response.data;
                    this.$store.state.birthdayInfo = [];
                    this.$store.state.star_risk_pointInfo = []
                    this.$store.state.phoneInfo = []
                    this.$store.state.wechatInfo = []
                    this.$store.state.emailInfo = []
                    if (allPrivacyUsers) {
                        for (let i = 0; i < allPrivacyUsers.length; i++) {
                            if (allPrivacyUsers[i].field == 'birthday') {
                                this.$store.state.birthdayInfo.push(allPrivacyUsers[i].creator.data)
                            }
                            if (allPrivacyUsers[i].field == 'star_risk_point') {
                                this.$store.state.star_risk_pointInfo.push(allPrivacyUsers[i].creator.data)
                            }
                            if (allPrivacyUsers[i].field == 'phone') {
                                this.$store.state.phoneInfo.push(allPrivacyUsers[i].creator.data)
                            }
                            if (allPrivacyUsers[i].field == 'wechat') {
                                this.$store.state.wechatInfo.push(allPrivacyUsers[i].creator.data)
                            }
                            if (allPrivacyUsers[i].field == 'email') {
                                this.$store.state.emailInfo.push(allPrivacyUsers[i].creator.data)
                            }
                        }
                    }
                })
                
            },

            getCalendar() {
                this.artistId = this.$route.query.id;


                const data = {
                    include: 'calendar,schedule,schedule.creator',
                };
                fetch('get', `/stars/${this.artistId}`, data).then((response) => {
                    if (response.data.calendar) {
                        this.calendarId.push(response.data.calendar.data.id);
                        this.calendarName = response.data.calendar.data.title;
                    }
                    // 日程展示
                    if (response.data.schedule) {
                        for (let i = 0; i < response.data.schedule.data.length; i++) {
                            this.scheduleShow.push(response.data.schedule.data[i]);
                        }
                    }
                });
            },

            ScheduleBox(value) {
                this.showScheduleModal(value);
            },
            /* 查看日历详情 --添加日历 -- 修改日历 */

            // 获取日历详情
            showScheduleModal(schedule) {
                
                const data = {
                    include: 'calendar,participants,creator,material,affixes,project,task',
                };
                fetch('get', `/schedules/${schedule.id}`, data).then((response) => {
                    if (!response) {
                        this.scheduleData = schedule;
                        this.noPermission = true;
                        return;
                    }
                    this.noPermission = false;
                    this.scheduleData = response.data;
                    this.scheduleParticipants = JSON.parse(JSON.stringify(response.data.participants.data));
                    this.$store.dispatch('changeParticipantsInfo', {data: response.data.participants.data});
                });
                $('#checkSchedule').modal('show');
            },
            addSchedule() {
                let startTime = '';
                let endTime = '';
                if (this.isScheduleAllday) {
                    startTime = this.startTime;
                    endTime = this.endTime;
                } else {
                    startTime = `${this.startTime} ${this.startMinutes}`;
                    endTime = `${this.endTime} ${this.endMinutes}`;

                    if (startTime > endTime) {
                        toastr.error('开始时间不能晚于截止时间');
                        return;
                    }

                    if (this.startTime === this.endTime) {
                        const startMinutesArr = this.startMinutes.split(':');
                        const endMinutesArr = this.endMinutes.split(':');
                        if (startMinutesArr[0] === endMinutesArr[0]) {
                            if ((Number(endMinutesArr[1]) - Number(startMinutesArr[1])) < 30) {
                                toastr.error('日程时间不能小于30分钟');
                                return;
                            }
                        }
                    }
                }
                this.isAddScheduleButtonDisable = true;
                const data = {
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
                    const newParticipantsInfo = this.$store.state.newParticipantsInfo;
                    for (let i = 0; i < newParticipantsInfo.length; i++) {
                        data.participant_ids.push(newParticipantsInfo[i].id);
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
                    toastr.success('添加成功');
                });
            },
            showToast(clientX, clientY) {
                this.toastX = clientX - 100;
                this.toastY = clientY - 25;
                this.toastShow = true;
                setTimeout(() => {
                    this.toastShow = false;
                }, 1000);
            },
            changeSchedule() {
                let startTime = '';
                let endTime = '';
                if (this.isScheduleAllday) {
                    startTime = this.startTime;
                    endTime = this.endTime;
                } else {
                    startTime = `${this.startTime} ${this.startMinutes}`;
                    endTime = `${this.endTime} ${this.endMinutes}`;
                }
                const data = {
                    title: this.scheduleName,
                    calendar_id: this.scheduleCalendar,
                    is_allday: this.isScheduleAllday,
                    privacy: Number(this.schedulePrivacy),
                    start_at: startTime,
                    end_at: endTime,
                    repeat: this.scheduleRepeat,
                    desc: this.eventDesc,
                    material_id: this.scheduleMaterialId,
                };
                if (this.eventPlace) {
                    data.position = this.eventPlace;
                }

                data.participant_del_ids = [];
                data.participant_ids = [];
                const flagInfo = this.$store.state.newParticipantsInfo;
                for (let i = 0; i < this.scheduleParticipants.length; i++) {
                    if (flagInfo.map(item => item.id).indexOf(this.scheduleParticipants[i].id) === -1) {
                        data.participant_del_ids.push(this.scheduleParticipants[i].id);
                    }
                }
                for (let i = 0; i < flagInfo.length; i++) {
                    if (this.scheduleParticipants.map(item => item.id).indexOf(flagInfo[i].id) === -1) {
                        data.participant_ids.push(flagInfo[i].id);
                    }
                }

                if (this.linkageSelectedIds.projects.length > 0) {
                    data.project_ids = this.linkageSelectedIds.projects;
                }
                if (this.linkageSelectedIds.tasks.length > 0) {
                    data.task_ids = this.linkageSelectedIds.tasks;
                }

                fetch('put', `/schedules/${this.scheduleData.id}`, data).then(() => {
                    this.$refs.calendar.refresh();
                    $('#changeSchedule').modal('hide');
                    toastr.success('修改成功');
                });
            },
            taskcancel() {
                this.getTaskList();
                this.getArtist();
                this.setDefaultPrincipal();
                this.$store.state.newParticipantsInfo = [];
                this.taskType = '';
                this.taskName = '';
                this.taskLevel = '';
                this.startTime = '';
                this.endTime = '';
                this.startMinutes = '';
                this.endMinutes = '';
                this.taskIntroduce = '';
                this.$refs.taskType.setValue('');
                this.$refs.taskStartTime.setValue('0');
                this.$refs.taskStartDate.setValue('');
                this.$refs.taskEndDate.setValue('');
                this.$refs.taskEndTime.setValue('0');
                this.$refs.taskLevel.setValue('');
            },
            selectScheduleCalendar(value) {
                this.scheduleCalendar = value;
            },
            changeIsAllDay(e) {
                this.isScheduleAllday = Number(e.target.checked);
            },
            showAddScheduleModal(data) {
                if (this.calendarId.length > 0) {
                    this.$refs.scheduleStartDate.setValue(data.start_day);
                    this.$refs.scheduleEndDate.setValue(data.end_day);
                    this.$refs.scheduleStartMinute.setValue(data.start_time);
                    this.$refs.scheduleEndMinute.setValue(data.end_time);
                    this.startTime = data.start_day;
                    this.endTime = data.end_day;
                    $('#changeSchedule').modal('show');
                } else {
                    // toastr.error('该艺人无对应艺人日历，请先创建艺人日历');
                    $('#permissionPrompt').modal('show');
                }
            },
            getRelationDate: function () {
                this.selectProjectLinkage();
            },
            selectProjectLinkage(value) {
                if (!this.allProjectsInfo) {
                    this.getAllProjects();
                }
                if (!this.allTasksInfo) {
                    this.getAllTasks();
                }
            },
            getAllProjects() {
                fetch('get', '/projects/all').then((response) => {
                    this.allProjectsInfo = response.data;
                });
            },
            getAllTasks() {
                fetch('get', '/tasksAll').then((response) => {
                    this.allTasksInfo = response.data;
                });
            },
            addLinkageResource() {
                $('#addLinkage').modal('hide');
            },
            selectResource(type, value) {
                const index = this.linkageSelectedIds[type].indexOf(value);
                if (index > -1) {
                    this.linkageSelectedIds[type].splice(index, 1);
                } else {
                    this.linkageSelectedIds[type].push(value);
                }
            },
            delNewScheduleLinkage(type, value) {
                const index = this.linkageSelectedIds[type].indexOf(value);
                this.linkageSelectedIds[type].splice(index, 1);
            },
            changeCalendarColor(value) {
                this.checkColor = value;
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
            changeScheduleRepeat(value) {
                this.scheduleRepeat = value;
            },
            isShowMore() {
                this.showMore = !this.showMore;
            },
            changeScheduleMaterial(value) {
                this.scheduleMaterialId = value;
            },
            fileUpload(url, name, size) {
                const data = {
                    title: name,
                    url,
                    size,
                    type: 1,
                };
                fetch('post', `/schedules/${this.scheduleData.id}/affix`, data).then((response) => {
                    toastr.success('上传成功');
                    if (this.scheduleData.affixes) {
                        this.scheduleData.affixes.data.push(response.data);
                    } else {
                        this.scheduleData.affixes = {data: []};
                        this.scheduleData.affixes.data.push(response.data);
                    }
                });
            },
            changeScheduleParticipants(value) {
                const data = {};
                if (value) {
                    data.participant_del_ids = [value];
                } else {
                    const participantsInfo = this.$store.state.newParticipantsInfo;
                    data.participant_ids = [];
                    data.participant_del_ids = [];
                    for (let i = 0; i < participantsInfo.length; i++) {
                        if (this.scheduleParticipants.map(item => item.id).indexOf(participantsInfo[i].id) === -1) {
                            data.participant_ids.push(participantsInfo[i].id);
                        }
                    }
                    for (let i = 0; i < this.scheduleParticipants.length; i++) {
                        if (participantsInfo.map(item => item.id).indexOf(this.scheduleParticipants[i].id) === -1) {
                            data.participant_del_ids.push(this.scheduleParticipants[i].id);
                        }
                    }
                }
                fetch('put', `/schedules/${this.scheduleData.id}`, data).then(() => {
                    this.$refs.calendar.refresh();
                    this.scheduleParticipants = JSON.parse(JSON.stringify(this.$store.state.newParticipantsInfo));
                });
            },
            changeScheduleType(type) {
                this.scheduleType = type;
                $('#checkSchedule').modal('hide');
                setTimeout(() => {
                    $('#changeSchedule').modal('show');
                }, 400);
                if (type === 'edit') {
                    this.scheduleName = this.scheduleData.title;
                    this.scheduleCalendar = this.scheduleData.calendar.data.id;
                    this.$refs.scheduleStartDate.setValue(this.scheduleData.start_at.split(' ')[0]);
                    const startMinutes = this.scheduleData.start_at.split(' ')[1].split(':');
                    this.$refs.scheduleStartMinute.setValue(startMinutes);
                    this.startTime = this.scheduleData.start_at.split(' ')[0];
                    this.startMinutes = `${startMinutes[0]}:${startMinutes[1]}`;
                    this.$refs.scheduleEndDate.setValue(this.scheduleData.end_at.split(' ')[0]);
                    const endMinutes = this.scheduleData.end_at.split(' ')[1].split(':');
                    this.$refs.scheduleEndMinute.setValue(endMinutes);
                    this.endTime = this.scheduleData.end_at.split(' ')[0];
                    this.endMinutes = `${endMinutes[0]}:${endMinutes[1]}`;
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
                            this.linkageSelectedIds.projects.push(this.scheduleData.project.data[i].moduleable_id);
                        }
                    }
                    if (this.scheduleData.task.data.length > 0) {
                        this.linkageSelectedIds.tasks = [];
                        for (let i = 0; i < this.scheduleData.task.data.length; i++) {
                            this.linkageSelectedIds.tasks.push(this.scheduleData.task.data[i].moduleable_id);
                        }
                    }
                }
            },
            deleteToastr(type, calendar = null) {
                this.delType = type;
                if (calendar) {
                    this.delCalendarInfo = calendar;
                }
                if (type === 'schedule') {
                    $('#checkSchedule').modal('hide');
                }
            },
            deleteSchedule() {
                fetch('delete', `/schedules/${this.scheduleData.id}`).then(() => {
                    $('#delModel').modal('hide');
                    toastr.success('删除成功');
                    this.$refs.calendar.refresh();
                });
            },
            changeScheduleRemind(value) {
                this.scheduleRemind = value;
            },
            initAddScheduleModal() {
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
                    tasks: [],
                };
                this.$refs.scheduleStartDate.setValue('');
                this.$refs.scheduleEndDate.setValue('');
                this.$refs.scheduleStartMinute.setValue('0');
                this.$refs.scheduleEndMinute.setValue('0');
                this.$refs.scheduleResource.setValue('');
                this.$refs.scheduleRepeat.setValue('0');
                // this.$refs.scheduleNotice.setValue('0');
                this.$refs.scheduleRemind.setValue('0');
                // this.this.scheduleRemindDate = []
            },
            /* 查看日历详情 --添加日历 -- 修改日历 --结束 */

            // 获取账单
            getArtistsBill(page = 1, expense_type) {
                if (expense_type) {
                    this.expense_type = expense_type;
                } else {
                    this.expense_type = 0;
                }
                fetch('get', `/stars/${this.$route.query.id}/bill`, {
                    page,
                    expense_type: this.expense_type,
                }).then((response) => {
                    this.artistBillsInfo = response.data;
                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                    if (response.meta.incomesum) {
                        this.incomesum = response.meta.incomesum.toFixed(2);// 收入总和
                    }
                    if (response.meta.expendituresum) {
                        this.expendituresum = response.meta.expendituresum.toFixed(2);// 支出总和
                    }
                });
            },

            getTaskType() {
                fetch('get', '/task_types').then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.taskTypeArr.push({
                            value: response.data[i].id,
                            name: response.data[i].title,
                        });
                    }
                });
            },
            // 获取任务列表
            getTaskList(page = 1) {
                this.getTaskType();
                fetch('get', `/stars/${this.$route.query.id}/tasks/`, {
                    page,
                }).then((response) => {
                    this.allTaskList = response.data;

                    this.current_page = response.meta.pagination.current_page;
                    this.total = response.meta.pagination.total;
                    this.total_pages = response.meta.pagination.total_pages;
                    response.data.forEach((item) => {
                        if (item.status !== 2 && new Date(item.end_at).getTime() < new Date().getTime()) {
                            item.status = 4;
                        }
                    });
                });
            },
            getTaskDate() {
                this.doneTaskNum = 0;
                fetch('get', `/stars/${this.$route.query.id}/tasks`).then((response) => {
                    this.allTaskList = response.data;
                    if (this.allTaskList.length > 0) {
                        for (let i = 0; i < this.allTaskList.length; i++) {
                            if (this.allTaskList[i].status == 2) {
                                this.doneTaskNum += 1;
                            }
                        }
                    }

                    this.taskNum = `${this.doneTaskNum}/${response.meta.pagination.total}`;
                });
            },
            selectDate(value) {
                this.selectedDate = value;
                this.$refs.meetingRoom.setDate(value);
            },
            // // 获取三个项目
            // getProjectList() {
            //   fetch('get', `/projects/star/${this.$route.params.id}`).then((response) => {
            //     this.threeProjectList = response;
            //   });
            // },
            // 粉丝数据
            draw() {
                const myChart = echarts.init(document.getElementById('myChart'));

                // 指定图表的配置项和数据
                const option = {
                    title: {
                        text: '粉丝统计',
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        data: ['微博', '百科', '抖音', '其他'],
                    },
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: true,
                                title: '保存',
                                iconStyle: {
                                    textPosition: 10000,
                                    textAlign: 'left',
                                },

                            },
                        },
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2018', '2017', '2016', '2015', '2014', '2013', '2012'],
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            name: '微博',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210],
                        },
                        {
                            name: '百科',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310],
                        },
                        {
                            name: '抖音',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410],
                        },
                        {
                            name: '其他',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320],
                        },
                    ],
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },

            run(res, callback) {
                this.changeArtistBaseInfo(res, 'avatar');
                return callback();
            },
            // 上传头像 ---修改头像
            getUploadUrl(res) {
                if (!this.isEdit) {
                    this.changeArtistInfo = {};
                }
                this.uploadUrl = res;
                this.run(res, () => {
                    this.changeArtist();
                });
            },
            changeTaskType(value) {
                this.taskType = value;
            },

            changeTaskLevel(value) {
                this.taskLevel = value;
            },

            changeStartTime(value) {
                this.startTime = value;
            },

            changeStartMinutes(value) {
                this.startMinutes = value;
            },

            changeEndTime(value) {
                this.endTime = value;
            },

            changeEndMinutes(value) {
                this.endMinutes = value;
            },

            // 添加任务
            addTask(response) {

                this.allTaskList.push(response.data);

                fetch('get', `/stars/${this.$route.query.id}/tasks`).then((response) => {
                    this.allTaskList = response.data;
                    if (this.allTaskList.length > 0) {
                        for (let i = 0; i < this.allTaskList.length; i++) {
                            if (this.allTaskList[i].status == 2) {
                                this.doneTaskNum += 1;
                            }
                        }
                    }

                    this.taskNum = `${this.doneTaskNum}/${response.meta.pagination.total}`;
                });
            },
            // 设置默认负责人
            setDefaultPrincipal() {
                this.$store.commit('changeNewPrincipal', {
                    name: this.user.nickname,
                    id: this.user.id,
                });
                this.$store.commit('changeNewParticipantsInfo', []);
            },
            // 添加作品
            addWork() {
                if (!this.artistWorkName) {
                    toastr.error('请填写作品名称');
                    return false;
                }
                if (!this.workReleaseTime) {
                    toastr.error('请选择作品发布时间');
                    return false;
                }
                if (!this.workType) {
                    toastr.error('请选择作品类型');
                    return false;
                }
                if (!this.character) {
                    toastr.error('请选择角色');
                    return false;
                }
                if (!this.coActor) {
                    toastr.error('请填写合作演员');
                    return false;
                }
                this.isAddWorkButtonDisable = true;
                const data = {
                    name: this.artistWorkName,
                    director: this.artistWorkDirector,
                    role: this.character,
                    co_star: this.coActor,
                    release_time: this.workReleaseTime,
                    works_type: this.workType,
                };
                fetch('post', `/stars/${this.$route.query.id}/works`, data).then((response) => {
                    toastr.success('新增成功');
                    $('#addWork').modal('hide');
                    this.isAddWorkButtonDisable = false;
                    this.artistWorksInfo.push(response.data);
                    this.artistWorkName = '';
                    this.artistWorkDirector = '';
                    this.character = '';
                    this.coActor = '';
                    this.workReleaseTime = '';
                    this.workType = '';
                    this.$refs.workType.setValue('');
                    this.$refs.workTime.setValue('');
                });
            },

            addPrivacy() {
                $('#addPrivacy').modal('hide');
                this.$store.state.collectInfo = [];
                this.$store.state.payInfo = [];
                this.$store.state.contractInfo = [];
                this.$store.state.divisionInfo = [];
                this.$store.state.incubationInfo = [];
                this.$store.state.billInfo = [];
            },

            changeWorkReleaseTime(value) {
                this.workReleaseTime = value;
            },

            changeWorkType(value) {
                this.workType = value;
            },

            editBaseInfo() {
                if (this.artistInfo.powers.edit_star !== 'true') {
                    toastr.error('当前用户没有权限编辑艺人');
                    return;
                }
                this.isEdit = true;
                this.changeArtistInfo = {};
            },

            cancelEdit() {
                this.isEdit = false;
            },
            // 修改基本信息
            changeArtistBaseInfo(value, name) {
                if (name === 'platform') {
                    value = value.join(',');
                }

                if (name === 'broker_id') {
                    if (value) {
                        value = this.$store.state.principalInfo.id;
                    } else {
                        return;
                    }
                } else if (name === 'intention') {
                    if (value.key === 'value') {
                        name = 'intention_desc';
                    }
                    if (value.key === 'condition') {
                        name = 'intention';
                    }
                    value = value.value;
                } else if (name === 'sign_contract_other') {
                    if (value.key === 'value') {
                        name = 'sign_contract_other_name';
                    }
                    if (value.key === 'condition') {
                        name = 'sign_contract_other';
                    }
                    value = value.value;
                }
                this.changeArtistInfo[name] = value;
            },

            changeArtist() {
                if (this.changeArtistInfo.intention || this.changeArtistInfo.hasOwnProperty('intention_desc')) {
                    if (this.$refs.condition.getSelectorValue() == 2) {
                        if (!this.changeArtistInfo.intention_desc) {
                            toastr.error('请填写不签约理由');
                            return false;
                        }
                    } else {
                        this.changeArtistInfo.intention_desc = '';
                    }
                }
                if (this.changeArtistInfo.sign_contract_other || this.changeArtistInfo.hasOwnProperty('sign_contract_other_name')) {
                    if (this.$refs.condition1.getSelectorValue() == 1) {
                        if (!this.changeArtistInfo.sign_contract_other_name) {
                            toastr.error('请输入已签约公司名称');
                            return false;
                        }
                    } else {
                        this.changeArtistInfo.sign_contract_other_name;
                    }
                }

                if (JSON.stringify(this.changeArtistInfo) === '{}') {
                    this.isEdit = false;
                    return;
                }
                const _this = this;
                fetch('put', `/stars/${this.artistId}`, this.changeArtistInfo).then((response) => {
                    toastr.success('修改成功');
                    if (_this.isEdit) {
                        _this.isEdit = false;
                    }
                    _this.getArtist();
                });
            },

            distributionPerson(value) {
                if (value == 'publicity' && this.artistInfo.powers.edit_publicity !== 'true') {
                    toastr.error('当前用户没有权限分配宣传人');
                    //  this.$nextTick((params) => {
                    //     $('#distributionBroker').modal('hide')
                    // })
                    return;
                }
                if (value == 'broker' && this.artistInfo.powers.edit_broker !== 'true') {
                    toastr.error('当前用户没有权限分配经理人');
                    // this.$nextTick((params) => {
                    //     $('#distributionBroker').modal('hide')
                    // })
                    return;
                }
                $('#distributionBroker').modal('show')
                // $('#distributionBroker').modal('hidden')
                this.distributionType = value;
                if (this.artistInfo[value].length > 0) {
                    this.$store.state.participantsInfo = Object.assign([], this.artistInfo[value]);
                }
            },
            // 分配经理人和分配宣传人
            addDistributionPerson() {
                let toast,
                    url;
                const data = {
                    person_ids: [],
                    del_person_ids: [],
                };


                const personInfo = this.$store.state.participantsInfo;
                const oldPersonInfo = this.artistInfo[this.distributionType];
                // todo 删除和新增的数据有问题
                if (this.artistInfo[this.distributionType].length > 0) {
                    for (let i = 0; i < this.artistInfo[this.distributionType].length; i++) {

                        if (personInfo.map(item => item.id).indexOf(this.artistInfo[this.distributionType][i].id) === -1) {

                            data.del_person_ids.push(this.artistInfo[this.distributionType][i].id);
                        }
                    }
                }
                for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                    data.person_ids.push(this.$store.state.participantsInfo[i].id);
                }

                if (this.distributionType === 'broker') {
                    // data.type = 3
                    toast = '分配经理人成功',
                        url = `stars/${this.artistId}/broker`;
                } else {
                    // data.type = 2
                    toast = '分配宣传人成功';
                    url = `stars/${this.artistId}/publicity`;
                }
                const _this = this;
                fetch('post', url, data).then((response) => {
                    toastr.success(toast);
                    $('#distributionBroker').modal('hide');
                    _this.getArtist();
                    _this.$store.state.participantsInfo = [];
                });
            },
            // 获取附件类型
            changeAttachmentType(value) {
                this.affixesType = value;
            },
            // 上传附件
            uploadAttachment(url, name, size) {
                if (!this.affixesType) {
                    toastr.error('请选择上传附件类型');
                    return false;
                }

                // 删除已存在的数据
                for (let i = 0; i < this.affixes.length; i++) {
                    if (this.affixes[i].type == this.affixesType) {
                        this.affixes.splice(i, 1);
                    }
                }
                // 添加新的数据
                this.affixes.push({
                    title: name,
                    size,
                    url,
                    type: this.affixesType,
                });
                this.changeArtistBaseInfo(this.affixes, 'affix');
            },
            // 获取附件id
            getAffixId(id) {
                this.affixId = id;
            },
            previewFile(url, name) {
                // console.log(url,name);
                // :url='$store.state.previewurl'
                this.$store.state.previewurl = url;
                this.previewName = name;
            },
            // 删除附件
            deleteAffix() {
                const _this = this;
                fetch('delete', `/star/${this.$route.query.id}/affixes/${this.affixId}`).then((response) => {
                    $('#affix').modal('hide');
                    toastr.success('删除成功');
                    _this.isEdit = false;
                    _this.getArtist();
                });
            },
            contractlist(status) {
                this.isDetail = false;
                const _this = this;
                this.isDetail = false;
                const data = {
                    type: this.contractType,
                };
                data.status = status;
                fetch('get', 'approvals/specific_contract', data).then((response) => {
                    _this.formDate = response.data;
                    $('#approval-great-module').modal('show');
                });
            },
            filterProjectFee(value) {
                this.filterFee = value;
            },
            toProject(id) {
                this.$router.push({path: `/projects/${id}`});
            },
            toTask(id) {
                this.$router.push({path: `/tasks/${id}`});
            },
             getStars: function () {
                fetch('get', '/starandblogger', {sign_contract_status: 2}).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        // this.starsArr.push({
                        //     value: response.data[i].flag + '-' + response.data[i].id,
                        //     name: response.data[i].name,
                        // })
                        if(response.data[i].name == this.artistInfo.name){
                            this.starFlag = response.data[i].flag
                            this.starId = response.data[i].id
                        }
                    }
                })
            },
             changeCalendarActionType: function (value) {
                this.calendarActionType = value
                $('#addCalendar').modal('show')
                $('#permissionPrompt').modal('hide')
            },
             addCalendarVisible: function (value) {
                this.calendarVisible = value
            },
            //  addCalendarStar: function (value) {
            //      console.log(value)
            //     value = value.split('-');
            //     this.starFlag = value[0];
            //     this.starId = value[1]
            // },

            principalChange(value) {
                if (value) {
                    this.principal = value.id;
                }
            },
            addCalendar: function () {
                this.isAddCalendarButtonDisable = true;
                let data = {
                    title: this.scheduleName,
                    color: this.checkColor,
                    privacy: this.calendarVisible,
                    principal_id: this.principal
                };
                if (this.starId) {
                    data.star = {
                        id: this.starId,
                        flag: this.starFlag
                    }
                }
                let participants = this.$store.state.newParticipantsInfo;
                if (participants.length > 0) {
                    data.participant_ids = [];
                    for (let i = 0; i < participants.length; i++) {
                        data.participant_ids.push(participants[i].id)
                    }
                }
                fetch('post', '/calendars', data).then(response => {
                    this.isAddCalendarButtonDisable = false;
                    $('#addCalendar').modal('hide');
                    this.calendarList.push(response.data);
                    toastr.success('添加成功')
                    this.initAddScheduleModal();
                    this.getCalendar()
                })
            },
        },
        
        filters: {
            getWeek(date) {
                const week = new Date(date).getDay();
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
           
            jsGetAge(strBirthday) {
                if (strBirthday) {
                    let returnAge;
                    // 根据生日计算年龄（"1995-09-25"）
                    // 以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
                    const strBirthdayArr = strBirthday.split('-');
                    const birthYear = strBirthdayArr[0];
                    const birthMonth = strBirthdayArr[1];
                    const birthDay = strBirthdayArr[2];

                    const d = new Date();
                    const nowYear = d.getFullYear();
                    const nowMonth = d.getMonth() + 1;
                    const nowDay = d.getDate();

                    if (nowYear == birthYear) {
                        returnAge = 0;// 同年 则为0岁
                    } else {
                        const ageDiff = nowYear - birthYear; // 年之差
                        if (ageDiff > 0) {
                            if (nowMonth == birthMonth) {
                                const dayDiff = nowDay - birthDay;// 日之差
                                if (dayDiff < 0) {
                                    returnAge = ageDiff - 1;
                                } else {
                                    returnAge = ageDiff;
                                }
                            } else {
                                const monthDiff = nowMonth - birthMonth;// 月之差
                                if (monthDiff < 0) {
                                    returnAge = ageDiff - 1;
                                } else {
                                    returnAge = ageDiff;
                                }
                            }
                        } else {
                            returnAge = -1;// 返回-1 表示出生日期输入错误 晚于今天
                        }
                    }
                    return returnAge;// 返回周岁年龄
                }
                return strBirthday;
            },
        },
    };

</script>

<style scoped>
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

    /*
        . {
            height: 57px;
        } */

    .uploadContent {
        position: relative;
    }

    .uploadAttach {
        position: absolute;
        top: 0px;
        left: 0px;
        opacity: 0;

    }

    .money-color {
        color: #ff9800;
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

    .del-affix {
        right: 15px;
        display: none;
        color: red;
    }

    .file-item:hover .del-affix {
        display: block;
    }

    .uploadContent {
        position: relative;
    }

    .puls {
        display: inline-block;
        background-size: 100px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 76px;
        border-radius: 50%;
        border: 1px solid #eee;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }

    .puls span {
        font-size: 30px;
    }

    .fileupload {
        position: absolute;
        top: 0px;
        left: 0px;
        opacity: 0;

    }

    .card-block .card-text {
        display: flex;
        align-items: center;
    }

    .card-header:first-child {
        border-radius: calc(.215rem - 1px) calc(.215rem - 1px) 0 0;
        display: flex;
        align-items: center;
    }

    .projectshow:hover {
        cursor: pointer;
    }

    .single {
        display: inline-block;
        width: 100%;
        overflow: hidden; /*内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
        white-space: nowrap;
    }

    .projectcontent:hover, .taskcontent:hover {
        background: #eee
    }
</style>
