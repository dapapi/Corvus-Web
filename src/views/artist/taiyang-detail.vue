<template>
    <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">艺人详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <!-- <a class="dropdown-item" role="menuitem" >分享</a> -->
                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                       data-target="#distributionBroker" @click="distributionPerson('broker')">分配经理人</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                       data-target="#distributionBroker" @click="distributionPerson('publicity')">分配宣传人</a>
                    <!-- <a class="dropdown-item" role="menuitem" >自定义字段</a>
                    <a class="dropdown-item" role="menuitem"  data-toggle="modal" data-target="#addPrivacy">隐私设置</a>
                    <a class="dropdown-item" role="menuitem"  data-toggle="modal" data-target="#addPrivacy">
                        <template v-if="artistInfo.sign_contract_status == 1">签约</template>
                        <template v-if="artistInfo.sign_contract_status == 2">解约</template>
                    </a> -->
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block clearfix">
                    <Upload @change='getUploadUrl' class="upload-image float-left mr-5" style="width:80px;height:80px;border-radius:50%;position:relative">
                        <div  class="puls" :style="{ backgroundImage: 'url(' + uploadUrl + ')' }" v-if="uploadUrl">
                        </div>
                        <div class="puls" v-if="!uploadUrl">
                            <img src="https://res-crm.papitube.com/image/artist-no-avatar.png" alt="">
                        </div>

                    </Upload>
                    <div class="float-left ml-10" style="width:calc(100% - 100px)">
                        <h4 class="card-title">{{artistInfo.name}}</h4>
                        <div class=" clearfix example">
                            <div class="col-md-6 float-left pl-0">
                                <div class="float-left pl-0 pr-2 col-md-2">
                                    <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>经理人
                                </div>
                                <div class="font-weight-bold float-left col-md-10 pl-0" v-if="artistInfo.broker">
                                    <span v-for="(broker,index) in artistInfo.broker.data" :key="index" class="mr-10">
                                        <span>{{broker.company}}</span>
                                        <span v-if="broker.company">-</span>
                                        <span>{{ broker.name }}</span>
                                        
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-6 float-left pl-0">
                                <div class="float-left pl-0 pr-2 col-md-2">
                                    <i class="iconfont icon-yonghu pr-2" aria-hidden="true"></i>宣传人
                                </div>
                                <div class="font-weight-bold float-left col-md-10 pl-0" v-if="artistInfo.publicity">
                                    <span v-for="(publicity,index) in artistInfo.publicity.data" :key="index" class="mr-10">
                                        <span>{{publicity.company}}</span>
                                        <span v-if="publicity.company">-</span>
                                        <span>{{ publicity.name }}</span>
                                        
                                    </span>
                                    <!-- <template v-for="publicity in artistInfo.publicity.data">
                                        {{ publicity.name }}
                                    </template> -->
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
                            <div class="col-md-3 float-left">{{item.principal.data.name}}</div>
                            <div class="col-md-3 float-left">{{item.end_at}}</div>
                            <div class="col-md-3 float-left">
                                <template v-if="item.status === 1">进行中</template>
                                <template v-if="item.status === 2">已完成</template>
                                <template v-if="item.status === 3">已停止</template>
                            </div>
                        </div>
                    </div>
                    <div v-if="threeProjectList.length>0" class="col-md-6 float-left pl-20 mb-20">
                        <div class="col-md-6"><i class="iconfont icon-ego-box"></i>项目</div>
                        <div class="clearfix example" v-for="(item,index) in artistProjectsInfo" :key="index"
                             style="cursor: pointer">
                            <div class="col-md-3 float-left">
                                {{item.title}}
                            </div>
                            <div class="col-md-3 float-left">{{item.principal.data.name}}</div>
                            <div class="col-md-3 float-left">{{item.end_at}}</div>
                            <div class="col-md-3 float-left">
                                <!-- <template v-if="item.status === 1">进行中</template>
                                <template v-if="item.status === 2">已完成</template>
                                <template v-if="item.status === 3">已停止</template> -->
                                <template v-if="item.relate_project_bills_resource">
                                    {{item.relate_project_bills_resource}}
                                </template>
                                <template>0</template>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="col-md-12 panel">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                            <a class="nav-link" :class="artistInfo.sign_contract_status == 2?'active':''"
                               data-toggle="tab" href="#forum-artist-schedule"
                               aria-controls="forum-base"
                               aria-expanded="false" role="tab">日程</a>
                        </li>
                        <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-projects"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">项目</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                               data-toggle="tab" href="#forum-artist-tasks"
                               aria-controls="forum-present"
                               aria-expanded="true" role="tab">
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
                        <li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-work"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">作品库</a>
                        </li>
                        <!--<li class="nav-item" role="presentation" v-show="artistInfo.sign_contract_status == 2">-->
                            <!--<a class="nav-link" data-toggle="tab" href="#forum-artist-fans"-->
                               <!--aria-controls="forum-present"-->
                               <!--aria-expanded="false" role="tab">粉丝数据</a>-->
                        <!--</li>-->
                        <li class="nav-item" role="presentation" @click="getArtistsBill"
                            v-show="artistInfo.sign_contract_status == 2">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-bill"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">账单</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-base"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab" :class="artistInfo.sign_contract_status == 2?'':'active'">概况</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate bg-white col-md-12">
                        <!--日历日程-->
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-schedule"
                             role="tabpanel" :class="artistInfo.sign_contract_status == 2?'active':''">
                            <div class="col-md-12">
                                <calendar :goto-date="selectedDate" :calendars="calendarId" ref="calendar"
                                          @scheduleClick="showScheduleModal"></calendar>
                            </div>
                        </div>
                        <!--项目-->
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
                                    <th class="cell-300" scope="col">艺人分成</th>
                                </tr>
                                <tr v-for="(item,index) in artistProjectsInfo" :key="index" @click="toProject(item.id)" style="cursor: pointer;">
                                    <td>
                                        {{item.title}}
                                    </td>
                                    
                                    <td>{{item.principal.data.name}}</td>
                                    <td>{{item.company}}</td>
                                    <td>{{item.created_at}}</td>
                                    <td>
                                        <template v-if="item.relate_project_bills_resource">
                                            {{item.relate_project_bills_resource}}
                                        </template>
                                        <template>0</template>
                                        <!-- <template v-if="item.status === 1"><span style="color:#FF9800">进行中</span>
                                        </template>
                                        <template v-if="item.status === 2"><span style="color:#4CAF50">已完成</span>
                                        </template>
                                        <template v-if="item.status === 3"><span style="color:#9E9E9E">撤单</span>
                                        </template> -->
                                    </td>
                                </tr>
                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="artistProjectsInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                        <!--任务-->
                        <div class="tab-pane animation-fade pb-20 fixed-button-father"
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
                                <tr v-for="(task,index) in allTaskList" :key="index" @click="toTask(task.id)" style="cursor: pointer;">
                                    <td>
                                        {{task.title}}
                                    </td>
                                    <td>
                                        <template v-if="task.type">{{task.type.data.title}}</template>
                                        <template v-else></template>
                                    </td>
                                    <td>
                                        <template v-if="task.status === 1">进行中</template>
                                        <template v-if="task.status === 2">已完成</template>
                                        <template v-if="task.status === 3">已停止</template>
                                    </td>
                                    <td>{{ task.principal.data.name }}</td>
                                    <td>{{ task.end_at }}</td>
                                </tr>

                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="artistTasksInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                 data-target="#addTask">
                                <button type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                                       style="font-size:30px"></i>
                                    <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                                       style="font-size:30px"></i>
                                </button>
                            </div>
                        </div>
                        <!--作品库-->
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-work"
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
                                    <td>{{work.release_time}}</td>
                                    <td>{{workTypeArr.find(item => item.value == work.works_type).name}}</td>
                                    <td>{{work.role}}</td>
                                    <td>{{work.co_star}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="col-md-1" style="margin: 6rem auto" v-if="artistWorksInfo.length === 0">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>

                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                 data-target="#addWork">
                                <button type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon iconfont icon-tianjia1 animation-scale-up"
                                       aria-hidden="true"></i>
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
                        <div class="tab-pane animation-fade  pb-20 fixed-button-father" id="forum-artist-bill"
                             role="tabpanel">
                            <div class="clearfix my-10">
                                <div class="float-left my-10 ml-10">
                                    <div class="float-left pr-40">收款金额 <span class="money-color">{{incomesum}}元</span></div>
                                    <div class="float-left pr-40">付款金额 <span class="money-color">{{expendituresum}}元</span></div>
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
                                    <td>{{ bill.pay_rec_time }}</td>
                                    <td>{{ bill.action_user }}</td>
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
                        <!--概况-->
                        <div class="tab-pane animation-fade  pb-20 fixed-button-father" id="forum-artist-base"
                             role="tabpanel" :class="artistInfo.sign_contract_status == 2?'':'active'">
                            <div class="card">
                                <div class="card-header card-header-transparent card-header-bordered">
                                    <div class="float-left font-weight-bold third-title">艺人信息</div>
                                    <div class="float-right pointer-content" v-show="!isEdit">
                                        <i class="iconfont icon-bianji2" aria-hidden="true" @click="editBaseInfo"></i>
                                    </div>
                                    <div class="float-right mr-40" v-show="isEdit">
                                        <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消
                                        </button>
                                        <button class="btn btn-primary" @click="changeArtist">确定</button>
                                    </div>
                                </div>
                                <div class="card-block" v-if="artistInfo.name">
                                    <div class="clearfix">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">姓名</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.name" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'name')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">性别</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :options="genderArr" :content="artistInfo.gender"
                                                              :is-edit="isEdit"
                                                              @change="(value) => changeArtistBaseInfo(value, 'gender')"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">出生日期</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditDatepicker :content="artistInfo.birthday"
                                                                :is-edit="isEdit"
                                                                @change="(value) => changeArtistBaseInfo(value, 'birthday')"></EditDatepicker>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">艺人来源</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :content="artistInfo.source"
                                                              :options="artistSourceArr"
                                                              :is-edit="isEdit"
                                                              @change="(value) => changeArtistBaseInfo(value, 'source')"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">沟通状态</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :content="artistInfo.communication_status"
                                                              :options="taiyangCommunicationStatusArr"
                                                              :is-edit="isEdit"
                                                              @change="(value) => changeArtistBaseInfo(value, 'communication_status')"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">星探</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.artist_scout_name" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'artist_scout_name')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">与我司签约意向</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <ConditionalInput ref="condition" :is-edit="isEdit" :content="artistInfo.intention"
                                                                  :input-content="artistInfo.intention_desc"
                                                                  :condition="2"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'intention')"></ConditionalInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">是否签约其他公司</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <ConditionalInput ref="condition1" :is-edit="isEdit"
                                                                  :content="artistInfo.sign_contract_other"
                                                                  :input-content="artistInfo.sign_contract_other_name"
                                                                  :condition="1"
                                                                  @change="(value) => changeArtistBaseInfo(value, 'sign_contract_other')"></ConditionalInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">地区</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput  :content="artistInfo.star_location" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'star_location')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">手机号</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.phone" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'phone')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">微信</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput  :content="artistInfo.wechat" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'wechat')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">邮箱</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.email" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'email')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">社交平台</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditSelector :is-edit="isEdit" :multiple="true"
                                                              :content="artistInfo.platform ? artistInfo.platform.split(',') : []"
                                                              :options="artistSocialPlatform"
                                                              @change="(value) => changeArtistBaseInfo(value, 'platform')"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">微博主页地址</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.weibo_url" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'weibo_url')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">微博粉丝数</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.weibo_fans_num" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'weibo_fans_num')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">抖音Id</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.douyin_id" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'douyin_id')"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">抖音粉丝数</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <EditInput :content="artistInfo.douyin_fans_num" :is-edit="isEdit"
                                                           @change="(value) => changeArtistBaseInfo(value, 'douyin_fans_num')"></EditInput>
                                            </div>
                                        </div>

                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">备注</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <editTextarea :content="artistInfo.desc" :is-edit="isEdit"
                                                              @change="(value) => changeArtistBaseInfo(value, 'desc')"></editTextarea>
                                            </div>
                                        </div>
                                        <div v-show="isEdit"
                                             class="card-text py-10 px-0 clearfix col-md-6 float-left ">
                                            <div class="col-md-2 float-left text-right pl-0">附件类型</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                <selectors v-show="isEdit" :options="attachmentTypeArr"
                                                           @change="changeAttachmentType" ref="attachType"></selectors>

                                            </div>
                                        </div>
                                        <div class=" py-10 px-0 clearfix col-md-6 float-left mt-10"
                                             style="min-height:57px">
                                            <div class="col-md-2 float-left text-right pl-0">附件</div>
                                            <div class="col-md-10 float-left font-weight-bold">
                                                    <span v-show="isEdit"
                                                          style="color:#01BCD4;cursor:pointer">上传附件</span>
                                                <FileUploader v-show="isEdit" class="uploadAttach"
                                                              @change="uploadAttachment"></FileUploader>
                                                <div class="mt-5" v-for="(attach,index) in affixes" :key="index">
                                                    <span class="mr-20">{{attachmentTypeArr.find(item => item.value == attach.type).name}} - {{attach.title}}</span>

                                                    <i class="iconfont icon-shanchu1 mr-10" data-toggle="modal"
                                                       data-target="#affix" @click="getAffixId(attach.id)"></i>
                                                    <a data-toggle="modal" data-target='#docPreview'
                                                       @click="previewFile(attach.url,attach.title)"
                                                       class="md-download"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">录入人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{ artistInfo.creator.data.name }}
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">录入时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            {{ artistInfo.created_at }}
                                        </div>
                                    </div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">最近更新人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            <template v-if="artistInfo.last_updated_user">
                                                {{artistInfo.last_updated_user}}
                                            </template>
                                            <template v-else>{{ artistInfo.created_at }}</template>

                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">最近更新时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                            <template v-if="artistInfo.last_follow_up_at">
                                                {{artistInfo.last_follow_up_at}}
                                            </template>
                                            <template v-else>{{ artistInfo.created_at }}</template>
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
                            <h5>艺人跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-7 pl-0">
                                <TaskFollowUp :follow-type="'艺人'" :trailId="$route.params.id"
                                              trailType="stars"></TaskFollowUp>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <modal :id="'affix'" :title="'删除附件'" @onOK="deleteAffix">
            <div class="text-center m-20">您确认删除该附件吗？</div>
        </modal>
        <!-- 新增任务 -->
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
                                <selectors :options="taskTypeArr" @change="changeTaskType" ref="taskType"></selectors>
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
                                <input-selectors :placeholder="'请选择负责人'"></input-selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">参与人</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left pl-0">任务优先级</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taskLevelArr" @change="changeTaskLevel" ref="taskLevel"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime" :placeholder="'请输入开始时间'"
                                            ref="taskStartDate"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="startMinutes" @change="changeStartMinutes"
                                            ref="taskStartTime"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime" :placeholder="'请输入结束时间'"
                                            ref="taskEndDate"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="endMinutes" @change="changeEndMinutes"
                                            ref="taskEndTime"></timepicker>
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

        <!--作品库-->
        <div class="modal fade" id="addWork" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
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
                            <div class="col-md-2 text-right float-left">作品名称</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control" v-model="artistWorkName"
                                       placeholder="请输入作品名称">
                            </div>
                        </div>

                        <div class="example">
                            <div class="col-md-2 text-right float-left">导演</div>
                            <div class="col-md-10 float-left">
                                <input type="text" title="" class="form-control" v-model="artistWorkDirector"
                                       placeholder="请输入导演姓名">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">作品发布时间</div>
                            <div class="col-md-10 float-left">
                                <datepicker @change="changeWorkReleaseTime" ref="workTime"
                                            placeholder="请选择时间"></datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">作品类型</div>
                            <div class="col-md-10 float-left">
                                <selectors :options="workTypeArr" @change="changeWorkType" ref="workType"></selectors>
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
                        <button class="btn btn-primary" type="submit" @click="addWork">确定</button>
                    </div>

                </div>
            </div>
        </div>
        <!--隐私设置-->
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
        <!--分配经纪人和宣传人-->
        <div class="modal fade" id="distributionBroker" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
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
        <!-- 查看日程 -->
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
                                <!-- <AddMember type="add" @change="changeScheduleParticipants"></AddMember> -->
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
        <!--附件预览-->
        <DocPreview :url="previewUrl" :givenFileName="previewName"/>
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
                taskTypeArr: [],
                taskLevelArr: config.taskLevelArr,
                attachmentTypeArr: config.attachmentTypeArr,
                taskType: '',
                taskName: '',
                taskLevel: '',
                startTime: '',
                startMinutes: '00:00',
                endTime: '',
                endMinutes: '00:00',
                taskIntroduce: '',
                artistTasksInfo: [],//任务
                artistWorksInfo: [],//作品库
                artistProjectsInfo: [],//项目
                artistWorkName: '', //作品名称
                artistWorkDirector: '',//导演名称
                artistBillsInfo: [],//账单
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
                changeArtistInfo: {},
                artistSocialPlatform: [
                    {
                        value: 1,
                        name: '微博'
                    },
                    {
                        value: 2,
                        name: '百科'
                    },
                    {
                        value: 3,
                        name: '抖音'
                    },
                    {
                        value: 4,
                        name: '其他'
                    },
                ],
                distributionType: '',
                affixes: [], //附件
                affixesType: '',//附件类型
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
                allTaskList:[], //获取任务列表
                threeProjectList:[],//获取三个项目
                expense_type:0,
                incomesum:0,//账单 -- 收入总和
                expendituresum:0,//账单 -- 支出总和
                isLoading: true,
                uploadUrl:'',
                calendarId:[]//艺人关联日历id

            }
        },

        created() {
            this.getArtist()

        },
        mounted() {

            this.getTaskType();
            this.draw();
            this.getArtistsBill()
            this.getTaskList()
            this.getProjectList()
            this.user = JSON.parse(Cookies.get('user'))
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            })
            let _this = this;
            $('#distributionBroker').on('hidden.bs.modal', function () {
                _this.$store.commit('changeParticipantsInfo', [])
            })
        },
        
        methods: {
            
            //获取艺人信息
            getArtist: function () {
                this.artistId = this.$route.params.id;

                let data = {
                    include: 'publicity,broker,creator,tasks,affixes,trails.project.principal,works,trails.client,relate_project_bills_resource,calendar',
                };
                let _this = this;
                fetch('get', '/stars/' + this.artistId, data).then(function (response) {

                    _this.artistInfo = response.data;
                    _this.uploadUrl = _this.artistInfo.avatar
                    _this.artistProjectsInfo = []
                    _this.artistTasksInfo = response.data.tasks.data
                    if(response.data.calendar.data){
                        _this.calendarId.push(response.data.calendar.data.id)
                    }
                    _this.artistWorksInfo = response.data.works.data
                    _this.affixes = response.data.affixes.data
                    for (let i = 0; i < response.data.trails.data.length; i++) {
                        if (response.data.trails.data[i].project) {
                            response.data.trails.data[i].project.data.company = response.data.trails.data[i].client.data.company
                            _this.artistProjectsInfo.push(response.data.trails.data[i].project.data)
                        }
                    }
                    _this.isLoading = false
                })

            },

            //获取日历详情
            showScheduleModal: function (schedule) {
                let data = {
                    include: 'calendar,participants,creator,material,affixes',
                };
                fetch('get', '/schedules/' + schedule.id, data).then(response => {
                    // console.log(response)
                    if (!response) {
                        this.scheduleData = schedule;
                        // this.noPermission = true;
                        return
                    }
                    // this.noPermission = false;
                    this.scheduleData = response.data;
                    this.scheduleParticipants = JSON.parse(JSON.stringify(response.data.participants.data));
                    this.$store.dispatch('changeParticipantsInfo', {data: response.data.participants.data});
                });
                $('#checkSchedule').modal('show')
                // console.log(data)
                // this.scheduleData = data;
                // if (data.participants.data) {
                //     this.scheduleParticipants = JSON.parse(JSON.stringify(data.participants.data));
                // }
                // $('#checkSchedule').modal('show')
            },
            //获取账单
            getArtistsBill: function (page = 1,expense_type) {
                
                let _this = this
                if(expense_type){
                    _this.expense_type = expense_type
                }
                fetch('get', `/stars/${this.$route.params.id}/bill`, {page: page,expense_type:_this.expense_type}).then(response => {
                    _this.artistBillsInfo = response.data
                    _this.current_page = response.meta.pagination.current_page;
                    _this.total = response.meta.pagination.total;
                    _this.total_pages = response.meta.pagination.total_pages;
                    if(response.meta.incomesum){
                        _this.incomesum = response.meta.incomesum.toFixed(2)//收入总和
                    }
                    if(response.meta.expendituresum){
                        _this.expendituresum = response.meta.expendituresum.toFixed(2)//支出总和
                    }
                })
            },

            getTaskType: function () {
                let _this = this;
                fetch('get', '/task_types').then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        _this.taskTypeArr.push({
                            value: response.data[i].id,
                            name: response.data[i].title
                        })
                    }
                })
            },
            //获取任务列表
            getTaskList:function(){
                let _this = this
                fetch('get', `/stars/${this.$route.params.id}/tasks`).then(response => {
                    _this.allTaskList = response.data
                    if (_this.allTaskList.length > 0) {
                        for (let i = 0; i < _this.allTaskList.length; i++) {
                            if (_this.allTaskList[i].status == 2) {
                                _this.doneTaskNum = _this.doneTaskNum + 1
                            }

                        }
                    }
                    _this.taskNum = `${_this.doneTaskNum}/${_this.allTaskList.length}`
                })
            },
            selectDate: function (value) {
                this.selectedDate = value;
                this.$refs.meetingRoom.setDate(value)
            },
            //获取三个项目
            getProjectList:function(){
                let _this = this
                fetch('get', `/projects/star/${this.$route.params.id}`).then(response => {
                    // console.log(response)
                    // if(){
                        _this.threeProjectList = response
                    // }
                })
            },
            //粉丝数据
            draw: function () {
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
                        right: '5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: true,
                                title: '保存',
                                iconStyle: {
                                    textPosition: 10000,
                                    textAlign: 'left'
                                }

                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2018', '2017', '2016', '2015', '2014', '2013', '2012']
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
                        // {
                        //     name:'搜索引擎',
                        //     type:'line',
                        //     stack: '总量',
                        //     data:[820, 932, 901, 934, 1290, 1330, 1320]
                        // }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            getArtistWorks: function () {

            },
            run:function(res,callback){
                this.changeArtistBaseInfo(res,'avatar') 
                return callback()
            },
            //上传头像 ---修改头像
            getUploadUrl(res) {
                let _this = this
                if(!this.isEdit) {
                    this.changeArtistInfo = {}
                }
                _this.uploadUrl = res
                _this.run(res,function(){
                    _this.changeArtist()
                })                         
            },
            changeTaskType: function (value) {
                this.taskType = value
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
            //设置默认负责人
            // setDefault:function(){
            //     // let defaultParams = 

            //     this.$store.state.newPrincipalInfo = {id:this.$route.params.id}
            // },

            //添加任务
            addTask: function () {
                let participant_ids = [];
                let start, end, startMin, endMin
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }

                if (!this.taskType) {
                    toastr.error('请选择任务类型')
                    return false
                }
                if (!this.taskName) {
                    toastr.error('请输入任务名称')
                    return false
                }
                if (!this.$store.state.newPrincipalInfo.id) {
                    toastr.error('请选择负责人')
                    return false
                }
                if (participant_ids.length <= 0) {
                    toastr.error('请选择参与人')
                    return false
                }
                if (!this.taskLevel) {
                    toastr.error('请选择任务优先级')
                    return false
                }
                if (!this.startTime) {
                    toastr.error('请选择任务开始日期')
                    return false
                }
                if (!this.startMinutes) {
                    toastr.error('请选择任务开始时间')
                    return false
                }
                if (!this.endTime) {
                    toastr.error('请选择任务结束日期')
                    return false
                }
                if (!this.endMinutes) {
                    toastr.error('请选择任务结束时间')
                    return false
                }

                //判断开始时间必须早于结束时间
                startMin = this.startMinutes.split(':')
                endMin = this.endMinutes.split(':')
                start = new Date(this.startTime).getTime() + startMin[0] * 60 * 60 * 1000 + startMin[1] * 60 * 1000
                end = new Date(this.endTime).getTime() + endMin[0] * 60 * 60 * 1000 + endMin[1] * 60 * 1000
                if (start > end) {
                    toastr.error('开始时间不能晚于截止时间');
                    return false;
                }

                let data = {
                    title:this.taskName,
                    principal_id:this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    start_at: this.startTime + ' ' + this.startMinutes,
                    end_at: this.endTime + ' ' + this.endMinutes,
                    resource_type:2,
                    resourceable_id:this.artistId,
                    priority: this.taskLevel,
                    desc:this.taskIntroduce,
                    type:this.taskType
                };
                let _this = this;
                fetch('post', '/tasks', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    _this.artistTasksInfo.push(response.data)
                    _this.setDefaultPrincipal()
                    // _this.$store.state.newPrincipalInfo = []
                    _this.$store.state.newParticipantsInfo = []
                    _this.taskType = ''
                    _this.taskName = ''
                    _this.taskLevel = ''
                    _this.startTime = ''
                    _this.endTime = ''
                    _this.startMinutes = ''
                    _this.endMinutes = ''
                    _this.$refs.taskType.setValue('')
                    _this.$refs.taskStartTime.setValue('')
                    _this.$refs.taskStartDate.setValue('')
                    _this.$refs.taskEndDate.setValue('')
                    _this.$refs.taskEndTime.setValue('')
                    _this.$refs.taskLevel.setValue('')
                })
            },
            //设置默认负责人
            setDefaultPrincipal() {
                this.$store.commit('changeNewPrincipal', {
                    name: this.user.nickname,
                    id: this.user.id
                })
                this.$store.commit('changeNewParticipantsInfo', [])
            },
            //添加作品
            addWork: function () {
                if (!this.artistWorkName) {
                    toastr.error('请填写作品名称')
                    return false
                }
                if (!this.workReleaseTime) {
                    toastr.error('请选择作品发布时间')
                    return false
                }
                if (!this.workType) {
                    toastr.error('请选择作品类型')
                    return false
                }
                if (!this.character) {
                    toastr.error('请选择角色')
                    return false
                }
                if (!this.coActor) {
                    toastr.error('请填写合作演员')
                    return false
                }
                let data = {
                    name: this.artistWorkName,
                    director: this.artistWorkDirector,
                    role: this.character,
                    co_star: this.coActor,
                    release_time: this.workReleaseTime,
                    works_type: this.workType
                };
                let _this = this;
                fetch('post', `/stars/${this.$route.params.id}/works`, data).then(function (response) {
                    toastr.success('新增成功');
                    $('#addWork').modal('hide');
                    _this.artistWorksInfo.push(response.data)
                    _this.artistWorkName = ''
                    _this.artistWorkDirector = ''
                    _this.character = ''
                    _this.coActor = ''
                    _this.workReleaseTime = ''
                    _this.workType = ''
                    _this.$refs.workType.setValue('')
                    _this.$refs.workTime.setValue('');
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

            changeWorkReleaseTime: function (value) {
                this.workReleaseTime = value
            },

            changeWorkType: function (value) {
                this.workType = value
            },

            editBaseInfo: function () {
                this.isEdit = true;
                this.changeArtistInfo = {};
            },

            cancelEdit: function () {
                this.isEdit = false
            },
            //修改基本信息
            changeArtistBaseInfo: function (value, name) {
                // alert('是否一开始就调用')
                // console.log(value,name)
                if (name === 'platform') {
                    value = value.join(',')
                }
                if (name === 'broker_id') {
                    if (value) {
                        value = this.$store.state.principalInfo.id
                    } else {
                        return
                    }
                } else if (name === 'intention') {
                    if (value.key === 'value') {
                        name = 'intention_desc'
                    }
                    if(value.key === 'condition'){
                        name = 'intention'
                    }
                    value = value.value

                } else if (name === 'sign_contract_other') {
                    if (value.key === 'value') {
                        name = 'sign_contract_other_name'
                    }
                    if(value.key === 'condition'){
                        name = 'sign_contract_other'
                    }
                    value = value.value
                }
                this.changeArtistInfo[name] = value
            },

            changeArtist: function () {
                
                if(this.changeArtistInfo.intention||this.changeArtistInfo.hasOwnProperty("intention_desc")){
                    if(this.$refs.condition.getSelectorValue() ==2){
                        if(!this.changeArtistInfo.intention_desc){
                            toastr.error('请填写不签约理由')
                            return false
                        }
                    }else{
                        this.changeArtistInfo.intention_desc = ''
                    }
                }
                if(this.changeArtistInfo.sign_contract_other||this.changeArtistInfo.hasOwnProperty("sign_contract_other_name")){
                    if(this.$refs.condition1.getSelectorValue() ==1){
                        if(!this.changeArtistInfo.sign_contract_other_name){
                            toastr.error('请输入已签约公司名称')
                             return false
                        }
                    }else{
                        this.changeArtistInfo.sign_contract_other_name
                    }
                }
                if (JSON.stringify(this.changeArtistInfo) === "{}") {
                    this.isEdit = false;
                    return
                }
                let _this = this;
                fetch('put', '/stars/' + this.artistId, this.changeArtistInfo).then(function (response) {
                    toastr.success('修改成功');
                    if(_this.isEdit) {
                        _this.isEdit = false;
                    }
                    _this.getArtist();
                })
            },

            distributionPerson: function (value) {
                
                this.distributionType = value;
                if (this.artistInfo[value].data.length > 0) {
                    this.$store.state.participantsInfo = Object.assign([], this.artistInfo[value].data)
                }
                // if (value === 'broker') {
                //     if (this.artistInfo.broker) {
                //         let params = {
                //             type: 'change',
                //             data: JSON.parse(JSON.stringify(this.artistInfo.broker.data))
                //         };
                //         this.$store.dispatch('changeParticipantsInfo', params);
                //     }
                // } else {
                //     if (this.artistInfo.publicity) {
                //         let params = {
                //             type: 'change',
                //             data: JSON.parse(JSON.stringify(this.artistInfo.publicity.data))
                //         };
                //         this.$store.dispatch('changeParticipantsInfo', params);
                //     }
                // }
            },

            addDistributionPerson: function () {
                let toast
                let data = {
                    person_ids: [],
                    del_person_ids: [],
                    moduleable_type: 'star',
                    moduleable_ids: [this.artistId]
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
                

                if (this.distributionType === 'broker') {
                    data.type = 3
                    toast = '分配经理人成功'
                } else {
                    data.type = 2
                    toast = '分配宣传人成功'
                }
                let _this = this;
                console.log(this.$store.state.participantsInfo)
                fetch('post', '/distribution/person', data).then(function (response) {
                    toastr.success(toast)
                    $('#distributionBroker').modal('hide');
                    _this.getArtist();
                    _this.$store.state.participantsInfo = []
                })
            },
            //获取附件类型
            changeAttachmentType: function (value) {
                this.affixesType = value
            },
            //上传附件
            uploadAttachment: function (url, name, size) {
                if (!this.affixesType) {
                    toastr.error('请选择上传附件类型');
                    return false
                }

                //删除已存在的数据
                for (let i = 0; i < this.affixes.length; i++) {
                    if (this.affixes[i].type == this.affixesType) {

                        this.affixes.splice(i, 1)
                    }

                }
                //添加新的数据
                this.affixes.push({
                    title: name,
                    size: size,
                    url: url,
                    type: this.affixesType
                })
                this.changeArtistBaseInfo(this.affixes, 'affix')

            },
            //获取附件id
            getAffixId: function (id) {
                this.affixId = id
            },
            previewFile: function (url, name) {
                console.log(url, name)
                this.previewUrl = url
                this.previewName = name
            },
            //删除附件
            deleteAffix: function () {
                let _this = this
                fetch('delete', `/star/${this.$route.params.id}/affixes/${this.affixId}`).then(function (response) {
                    $('#affix').modal('hide');
                    toastr.success('删除成功');
                    _this.isEdit = false;
                    _this.getArtist();
                })
            },
            filterProjectFee: function (value) {
                this.filterFee = value;
            },
            toProject: function (id) {
                this.$router.push({path: '/projects/' + id});

            },
            toTask: function (id) {
                this.$router.push({path: '/tasks/' + id});
            }

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

    . {
        height: 57px;
    }

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
</style>

