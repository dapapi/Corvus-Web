<template>
    <div class="page">

        <div class="page-header page-header-bordered">
            <h1 class="page-title d-inline">艺人详情</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="">分享</a>
                    <a class="dropdown-item" role="menuitem" @click="">分配制作人</a>
                    <a class="dropdown-item" role="menuitem" @click="">分配宣传人</a>
                    <a class="dropdown-item" role="menuitem" @click="">自定义字段</a>
                    <a class="dropdown-item" role="menuitem" @click="" data-toggle="modal" data-target="#addPrivacy">隐私设置</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">

            <div class="panel col-md-12">
                <div class="card-block">
                    <h4 class="card-title">{{artistInfo.name}}</h4>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>经纪人
                            </div>
                            <div class="font-weight-bold float-left">
                                {{broker}}
                            </div>
                        </div>
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>宣传人
                            </div>
                            <div class="font-weight-bold float-left">
                                {{publicity}}
                            </div>
                        </div>

                    </div>
                    <div class="card-text clearfix example">
                        <div class="col-md-6 float-left pl-0">
                            <div class="float-left pl-0 pr-2 col-md-2">
                                <i class="md-plus pr-2" aria-hidden="true"></i>艺人状态
                            </div>
                            <div class="font-weight-bold float-left">
                                5/12
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
                        <li class="nav-item" role="presentation" >
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-projects"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">项目</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist-tasks"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">任务</a>
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
                        <li class="nav-item" role="presentation">
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
                        <!--日历日程-->
                        <div class="tab-pane animation-fade active pb-20 fixed-button-father" id="forum-artist-schedule"
                             role="tabpanel">
                            <div class="col-md-12">
                                <calendar></calendar>
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
                                    <th class="cell-300" scope="col">项目状态</th>
                                    <th class="cell-300" scope="col">负责人</th>
                                    <th class="cell-300" scope="col">关联公司</th>
                                    <th class="cell-300" scope="col">录入日期</th>
                                </tr>
                                <tr v-for="(item,index) in artistProjectsInfo" :key="index">
                                    <td>{{item.title}}</td>
                                    <td>{{item.status}}</td>
                                    <td>{{item.principal.data.name}}</td>
                                    <td>{{item.company}}</td>
                                    <td>{{item.created_at}}</td>
                                </tr>
                            </table>
                        </div>
                        <!--任务-->
                        <div class="tab-pane animation-fade pb-20 fixed-button-father" id="forum-artist-tasks"
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
                                <tbody>
                                <tr v-for="task in artistTasksInfo">
                                    <td>{{task.title}}</td>
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
                                </tbody>
                            </table>
                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                 data-target="#addTask">
                                <button type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                                    <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
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
                                <tr v-for="work in artistWorksInfo">
                                    <td>{{work.name}}</td>
                                    <td>{{work.director}}</td>
                                    <td>{{work.release_time}}</td>
                                    <td>{{workTypeArr.find(item => item.value == work.works_type).name}}</td>
                                    <td>{{work.role}}</td>
                                    <td>{{work.co_star}}</td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                                            data-target="#addWork">
                                <button type="button"
                                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                                    <i class="front-icon md-edit animation-scale-up" aria-hidden="true"></i>
                                    <i class="back-icon md-close animation-scale-up" aria-hidden="true"></i>
                                </button>
                                <div class="site-action-buttons">
                                    <button type="button" data-action="trash"
                                            class="btn-raised btn btn-success btn-floating animation-slide-bottom waves-effect waves-classic">
                                        <i class="icon md-download" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" data-action="trash"
                                            class="btn-raised btn btn-success btn-floating animation-slide-bottom waves-effect waves-classic">
                                        <i class="icon md-upload" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" data-action="trash" 
                                            class="btn-raised btn btn-success btn-floating animation-slide-bottom waves-effect waves-classic">
                                        <i class="icon md-plus" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <!--粉丝数据-->
                        <div class="tab-pane animation-fade fixed-button-father" id="forum-artist-fans"
                             role="tabpanel">
                            <div id="myChart" style="width:80vw ;height:400px; margin-top:30px"></div>
                        </div>
                         <!--账单-->
                        <div class="tab-pane animation-fade  pb-20 fixed-button-father" id="forum-artist-bill"
                             role="tabpanel">
                            <div class="example">
                                <div class="col-md-1 float-left pl-0">收款金额</div>
                                <div class="col-md-2 float-left">10000000元</div>
                                <div class="col-md-1 float-left pl-0">付款金额</div>
                                <div class="col-md-2 float-left">10000000元</div>
                            </div>
                           
                            <table class="table table-hover is-indent example" data-plugin="animateList"
                                   data-animate="fade" data-child="tr">
                                <tr class="animation-fade"
                                    style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                    <th class="cell-300" scope="col">科目类别</th>
                                    <th class="cell-300" scope="col">金额</th>
                                    <th class="cell-300" scope="col">收款时间</th>
                                    <th class="cell-300" scope="col">付款时间</th>
                                    <th class="cell-300" scope="col">操作人</th>
                                </tr>
                                <tbody>
                                <tr v-for="work in artistWorksInfo">
                                    <td>暂无</td>
                                    <td>暂无</td>
                                    <td>暂无</td>
                                    <td>暂无</td>
                                    <td>暂无</td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                        <!--概况-->
                        <div class="tab-pane animation-fade  pb-20 fixed-button-father" id="forum-artist-base"
                             role="tabpanel">
                            <div class="card">
                                <div class="card-header card-header-transparent card-header-bordered">
                                    <div class="float-left font-weight-bold third-title">艺人信息</div>
                                    <div class="float-right pointer-content" v-show="!isEdit">
                                        <i class="icon md-edit" aria-hidden="true" @click="editBaseInfo"></i>
                                    </div>
                                    <div class="float-right mr-40" v-show="isEdit">
                                        <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                                        <button class="btn btn-primary" @click="changeArtistBaseInfo">确定</button>
                                    </div>
                                </div>
                                <div class="card-block" v-if="artistInfo.name">
                                    <div class="clearfix">
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">姓名</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditInput :content="artistInfo.name" :is-edit="isEdit"
                                                           @change="changArtistName"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">性别</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditSelector :options="genderArr" :content="artistInfo.gender"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistGender"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">出生日期</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditDatepicker :content="artistInfo.birthday"
                                                                :is-edit="isEdit"></EditDatepicker>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">年龄？</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditInput :content="artistInfo.name" :is-edit="isEdit"
                                                           @change="changArtistName"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">艺人来源</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditSelector :content="artistInfo.source" :options="artistSourceArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistSource"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">沟通状态</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditSelector :content="artistInfo.communication_status"
                                                              :options="taiyangCommunicationStatusArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistCommunication"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">与我司签约意向</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditSelector :content="artistInfo.intention" :options="yesOrNoArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistIntention"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">是否签约其他公司</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditSelector :content="artistInfo.sign_contract_other"
                                                              :options="yesOrNoArr"
                                                              :is-edit="isEdit"
                                                              @change="changeArtistSignStatus"></EditSelector>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">星探</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <input v-show='isEdit' type="number" class="form-control"  placeholder="请输入星探名称">
                                                <span v-show='!isEdit'>{{artistInfo.weibo_url}}</span>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">地区</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <input v-show='isEdit' type="number" class="form-control"  placeholder="请输入地区">
                                                <span v-show='!isEdit'>{{artistInfo.weibo_url}}</span>
                                            </div>       
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">艺人规划</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">

                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">手机号</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditInput :content="artistInfo.phone" :is-edit="isEdit"
                                                           @change="changeArtistPhone"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">微信</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditInput :content="artistInfo.wechat" :is-edit="isEdit"
                                                           @change="changeArtistWeixin"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">邮箱</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <EditInput :content="artistInfo.email" :is-edit="isEdit"
                                                           @change="changeArtistEmail"></EditInput>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">社交平台</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''"> 

                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">微博主页地址</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <input v-show='isEdit' type="number" class="form-control"  placeholder="请输入微博Id">
                                                <span v-show='!isEdit'>{{artistInfo.weibo_url}}</span>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">微博粉丝数</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                 <input v-show='isEdit' type="number" class="form-control"  placeholder="请输入微博粉丝数">
                                                <span v-show='!isEdit'>{{artistInfo.weibo_fans_num}}</span>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">抖音Id</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <input v-show='isEdit' type="number" class="form-control"  placeholder="请输入抖音Id">
                                                <span v-show='!isEdit'>{{artistInfo.douyin_id}}</span>
                                            </div>
                                        </div>
                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">抖音粉丝数</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                 <input v-show='isEdit' type="number" class="form-control"  placeholder="请输入抖音粉丝数">
                                                 <span v-show='!isEdit'>{{artistInfo.douyin_fans_num}}</span>
                                            </div>
                                        </div>

                                        <div class="card-text py-10 px-0 clearfix col-md-6 float-left">
                                            <div class="col-md-2 float-left text-right pl-0">备注</div>
                                            <div class="col-md-10 float-left font-weight-bold" :class="isEdit?'height':''">
                                                <editTextarea :content="artistInfo.desc" :is-edit="isEdit"
                                                              @change="changeArtistDesc"></editTextarea>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="segmentation-line example"></div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">录入人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">录入时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                        </div>
                                    </div>
                                    <div class="card-text py-5 clearfix">
                                        <div class="col-md-1 float-left text-right pl-0">最近更新人</div>
                                        <div class="col-md-5 float-left font-weight-bold">
                                        </div>
                                        <div class="col-md-1 float-left text-right pl-0">最近更新时间</div>
                                        <div class="col-md-5 float-left font-weight-bold">
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
                                <TaskFollowUp :follow-type="'艺人'" :trailId="$route.params.id" trailType="stars"></TaskFollowUp>
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
                            <i class="md-close" aria-hidden="true"></i>
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
                                <selectors :options="taskTypeArr" :placeholder="'请选择任务类型'"
                                           @change="changeTaskType"></selectors>
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
                                <input-selectors :placeholder="'请选择负责人'"
                                                 @change="principalChange"></input-selectors>
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
                                           @change="changeTaskLevel"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeStartTime"></datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <timepicker :default="startMinutes" @change="changeStartMinutes"></timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">截止时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <datepicker @change="changeEndTime"></datepicker>
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
        
        <!--作品库-->
        <div class="modal fade" id="addWork" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
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
                                <datepicker @change="changeWorkReleaseTime"></datepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">作品类型</div>
                            <div class="col-md-10 float-left">
                                <selectors :options="workTypeArr" @change="changeWorkType"></selectors>
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

        <div class="modal fade" id="addPrivacy" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">隐私设置</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">收款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">付款金额</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">合同类型</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>

                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">分成比例</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">孵化期</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">账单</div>
                            <div class="col-md-10 float-left">
                                <add-member></add-member>
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
                artistInfo: {
                    sign_contract_other:0
                },
                taskTypeArr: config.taskTypeArr,
                taskLevelArr: config.taskLevelArr,
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
                artistWorkDirector:'',//导演名称
                broker:'',//经纪人
                publicity:'',//宣传人
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
            }
        },

        mounted() {
            this.getArtist()
            // this.drawLine()
            // this.$nextTick(function() {
            //     this.myChart = echarts.init(document.getElementById('myChart'));  //初始化echarts实例
            //     // this.draw();
            // })
            this.draw()
        },

        methods: {

            //获取艺人信息
            getArtist: function () {
                this.artistId = this.$route.params.id;

                let data = {
                    include: 'broker,creator,tasks,affixes,trails.project.principal,works,trails.client,publicity',
                };
                let _this = this;
                fetch('get', '/stars/' + this.artistId, data).then(function (response) {
                    _this.artistInfo = response.data;
                    _this.artistTasksInfo = response.data.tasks.data
                    _this.artistWorksInfo = response.data.works.data
                    if(response.data.broker){
                        _this.broker = response.data.broker.data.name
                    }
                    if(response.data.publicity){
                        _this.publicity = response.data.publicity.data.name
                    }
                    for (let i = 0; i < response.data.trails.data.length; i++) {
                        if(response.data.trails.data[i].project){
                            response.data.trails.data[i].project.data.company = response.data.trails.data[i].client.data.company
                            _this.artistProjectsInfo.push(response.data.trails.data[i].project.data)
                        }
                    }
                    console.log(_this.artistProjectsInfo)
                })
            },

            //粉丝数据
             draw:function(){
                var myChart = echarts.init(document.getElementById('myChart'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '粉丝统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['微博','百科','抖音','其他']
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
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'微博',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'百科',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'抖音',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'其他',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
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

            changeTaskType: function (value) {
                this.taskType = value
            },

            principalChange: function (value) {

            },

            participantChange: function (value) {

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

            addTask: function () {
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id)
                }
                let data = {
                    // resource_type: '1718463094',
                    // resourceable_id: '1994731356',
                    // type: this.taskType,
                    // @todo 任务类型前端维护
                    title: this.taskName,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    participant_ids: participant_ids,
                    priority: this.taskLevel,
                    start_at: this.startTime + ' ' + this.startMinutes,
                    end_at: this.endTime + ' ' + this.endMinutes,
                    desc: this.taskIntroduce,
                    resource_type:2,
                    resourceable_id:this.artistId,
                    type: this.taskType,
                };
                let _this = this;
                fetch('post', '/tasks', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addTask').modal('hide');
                    _this.artistTasksInfo.push(response.data)
                })
            },

            addWork: function () {
                let data = {
                    name:this.artistWorkName,
                    director:this.artistWorkDirector,
                    role:this.character,
                    co_star:this.coActor,
                    release_time:this.workReleaseTime,
                    works_type:this.workType
                };
                let _this = this;
                fetch('post', `/stars/${this.$route.params.id}/works`,data).then(function (response) {
                    toastr.success('新增成功');
                    $('#addWork').modal('hide');
                    _this.artistWorksInfo.push(response.data)
                })
            },

            addPrivacy: function () {

            },

            changeWorkReleaseTime: function (value) {
                this.workReleaseTime = value
            },

            changeWorkType: function (value) {
                this.workType = value
            },

            editBaseInfo: function () {
                this.isEdit = true;
                this.changeInfo = [];
            },

            cancelEdit: function () {
                this.isEdit = false
            },

            changeArtistBaseInfo: function () {

            },

            changArtistName: function (value) {
                this.artistInfo.name = value
            },

            changeArtistGender: function (value) {
                this.artistInfo.gender = value
            },

            changeArtistDesc: function (value) {
                this.artistInfo.desc = value
            },

            changeArtistSource: function (value) {
                this.artistInfo.source = value
            },

            changeArtistCommunication: function (value) {
                this.artistInfo.communication_status = value
            },

            changeArtistIntention: function (value) {
                this.artistInfo.intention = value
            },

            changeArtistSignStatus: function (value) {
                console.log(value)
                this.artistInfo.sign_contract_other = value
            },

            changeArtistPhone: function (value) {
                this.artistInfo.phone = value
            },

            changeArtistWeixin: function (value) {
                this.artistInfo.wechat = value
            },

            changeArtistEmail: function (value) {
                this.artistInfo.email = value
            },

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
    .height{
        height: 57px;
    }
</style>
