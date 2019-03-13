<template>
    <!-- Page -->
    <div class="page">

        <NavBack title="测试-测试部" href="/staff"></NavBack>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="edit">
                    <i v-if="!editInfo" @click="handleEdit('editInfo')" class="iconfont icon-bianji2"></i>
                    <template v-else>
                        <span class="save" @click="save('editInfo')">保存</span> <span class="cancel" @click="cancel('editInfo')">取消</span>
                    </template>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="example">
                            <div class="col-md-3 text-right float-left">昵称</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditInput :content="info.name" :isEdit="editInfo" @change="item => changeState('info.name', item)" />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">姓名(中文)</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditInput :content="info.realName" :isEdit="editInfo" @change="item => changeState('info.realName', item)" />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">手机</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditInput :content="info.phone" :isEdit="editInfo" @change="item => changeState('info.phone', item)" />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">最高学历</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditSelector 
                                    :options="schoolRecordArr" 
                                    :isEdit="editInfo" 
                                    :content="info.highSchool"
                                    @change="item => changeState('info.highSchool', item)"
                                />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">部门</div>
                            <div class="col-md-9 float-left pl-0">
                                <DropDepartment v-if="editInfo" :data="department" @change="selectDepartment"/>
                                <span v-else>{{ info.department }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="example">
                            <div class="col-md-3 text-right float-left">性别</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditSelector 
                                    :options="genderArr" 
                                    :isEdit="editInfo" 
                                    :content="info.gender"
                                    @change="item => changeState('info.gender', item)"
                                />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">年龄</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditInput :content="info.age" :isEdit="editInfo" @change="item => changeState('info.age', item)" />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">出生日期</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditDatepicker :content="info.birthTime" :isEdit="editInfo" @change="item => changeState('info.birthTime', item)" />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">岗位</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditSelector
                                    :options="jobArr" 
                                    :isEdit="editInfo" 
                                    :content="info.positionId"
                                    @change="item => changeState('info.positionId', item)"
                                />
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">工作邮箱</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditInput :content="info.email" :isEdit="editInfo" @change="item => changeState('info.email', item)" />
                            </div>
                        </div>
                        <!-- <div class="example">
                            <div class="col-md-3 text-right float-left">工号</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" :disabled="!editInfo" v-model="info.number" placeholder="" class="form-control">

                            </div>
                        </div> -->
                    </div>

                    <div class="col-md-4">
                        <div class="example" style="text-align: center;">
                            <!-- <upload>
                                <div class="upload-head" style="margin-top: 52px;">
                                    上传头像
                                </div>
                            </upload> -->
                        <!-- </div> -->
                            <Avatar v-if="!editInfo" :imgUrl="info.iconUrl" style="width: 120px; height: 120px; font-size: 24px;" />
                            <upload @change="uploadImg" v-else accept="image/png, image/jpeg, image/gif, image/jpg">
                                <div class="upload-head">
                                    <img v-if="info.iconUrl" :src="info.iconUrl" alt="头像" />
                                    <template v-else>
                                        上传头像
                                    </template>
                                </div>
                            </upload>
                        </div>
                    </div>
                </div>

                <div class="nav-tabs-horizontal" data-plugin="tabs">

                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" style="margin: 0 30px">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" 
                                data-toggle="tab" 
                                href="#infoTab" 
                                aria-controls="infoTab" 
                                role="tab" aria-selected="true">
                                个人信息
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#workTab" 
                                aria-controls="workTab" 
                                role="tab" 
                                aria-selected="false">
                                岗位信息
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#salaryTab" 
                                aria-controls="salaryTab" 
                                role="tab" 
                                aria-selected="false">
                                薪资信息
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <router-link :to="{name: 'entryDetail', params: { id: this.userId }}">
                                <a class="nav-link" 
                                    data-toggle="tab" 
                                    href="#entryInfoTab" 
                                    aria-controls="entryInfoTab" 
                                    role="tab" 
                                    aria-selected="false">
                                    入职信息表
                                </a>
                            </router-link>
                        </li>
                    </ul>

                    <div class="tab-content pt-10">
                        <div class="tab-pane active" id="infoTab" role="tabpanel">
                            <div class="edit">
                                <i v-if="!editDetail" @click="handleEdit('editDetail')" class="iconfont icon-bianji2"></i>
                                <template v-else>
                                    <span class="save" @click="save('editDetail')">保存</span> <span class="cancel" @click="cancel('editDetail')">取消</span>
                                </template>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left pl-0">身份证号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.idNumber" :isEdit="editDetail" @change="item => changeState('detail.idNumber', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">身份证照</div>
                                <div class="col-md-6 float-left pl-0">
                                    <!-- <upload>
                                        <div class="id-upload"> -->
                                            <!-- <i class="iconfont icon-tianjia" style="font-size: 50px" aria-hidden="true"></i> -->
                                            <!-- +
                                        </div>
                                    </upload> -->
                                    <!-- <Avatar v-if="!editDetail" :imgUrl="detail.idCardUrl" style="width: 60px; height: 60px; font-size: 24px;" /> -->
                                    <img v-if="!editDetail" :src="detail.idCardUrl?detail.idCardUrl:'https://res-crm.papitube.com/image/artist-no-avatar.png'" style="width: 60px; height: 60px;" />
                                    <upload @change="uploadIDImg" v-else accept="image/png, image/jpeg, image/gif, image/jpg" class="idImg">
                                        <div class="upload-head">
                                            <img v-if="detail.idCardUrl" :src="detail.idCardUrl" alt="图片暂无" />
                                            <template v-else>
                                                +
                                            </template>
                                        </div>
                                    </upload>
                                    <small style="color: #F44336;">图片格式为JPG/JPEG/PNG/PDF 大小在2MB内</small>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">护照号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.passportCode" :isEdit="editDetail" @change="item => changeState('detail.passportCode', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">现居住地址</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.currentAddress" :isEdit="editDetail" @change="item => changeState('detail.currentAddress', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">户籍地址</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.cadastralAddress" :isEdit="editDetail" @change="item => changeState('detail.cadastralAddress', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">个人邮箱</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.workEmail" :isEdit="editDetail" @change="item => changeState('detail.workEmail', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工资银行卡号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.cardNumberOne" :isEdit="editDetail" @change="item => changeState('detail.cardNumberOne', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">开户行</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.opening" :isEdit="editDetail" @change="item => changeState('detail.opening', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">信用卡号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.creditCard" :isEdit="editDetail" @change="item => changeState('detail.creditCard', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">公积金号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.accumulationFund" :isEdit="editDetail" @change="item => changeState('detail.accumulationFund', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">上家公司</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.lastCompany" :isEdit="editDetail" @change="item => changeState('detail.lastCompany', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">岗位职责</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.responsibility" :isEdit="editDetail" @change="item => changeState('detail.responsibility', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">签署合同</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="detail.contract" :isEdit="editDetail" @change="item => changeState('detail.contract', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工作地点</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditSelector 
                                        :options="workPlaceArr" 
                                        :isEdit="editDetail" 
                                        :content="detail.address"
                                        @change="item => changeState('detail.address', item)"
                                    />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left require">聘用形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditSelector 
                                        :options="hireShapeArr" 
                                        :isEdit="editDetail" 
                                        :content="detail.hireShape"
                                        @change="item => changeState('detail.hireShape', item)"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="workTab" role="tabpanel">
                            <div class="edit">
                                <i v-if="!editJob" @click="handleEdit('editJob')" class="iconfont icon-bianji2"></i>
                                <template v-else>
                                    <span class="save" @click="save('editJob')">保存</span> <span class="cancel" @click="cancel('editJob')">取消</span>
                                </template>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">职级</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.rank" :isEdit="editJob" @change="item => changeState('job.rank', item)" />
                                </div>
                            </div>

                            <!-- 入职日期 -->
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">入职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditDatepicker :content="job.entryTime" :isEdit="editJob" @change="item => changeState('job.entryTime', item)" />
                                </div>
                            </div>

                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">转正状态</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditSelector 
                                        :options="positiveStateArr" 
                                        :isEdit="editJob" 
                                        :content="job.status"
                                        @change="item => changeState('job.status', item)"
                                    />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">转正日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditDatepicker :content="job.positiveTime" :isEdit="editJob" @change="item => changeState('job.positiveTime', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">离职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                   <EditDatepicker :content="job.pdepartureTime" :isEdit="editJob" @change="item => changeState('job.pdepartureTime', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">司龄</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.siling" :isEdit="editJob" @change="item => changeState('job.siling', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">首次参加工作时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditDatepicker :content="job.firstWorkTime" :isEdit="editJob" @change="item => changeState('job.firstWorkTime', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工龄</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.workLing" :isEdit="editJob" @change="item => changeState('job.workLing', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">调整工龄(天)</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.modulationWorkLing" :isEdit="editJob" @change="item => changeState('job.modulationWorkLing', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">直接下属数量</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.subordinateSum" :isEdit="editJob" @change="item => changeState('job.subordinateSum', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工作城市</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.workCity" :isEdit="editJob" @change="item => changeState('job.workCity', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">纳税城市</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.taxcity" :isEdit="editJob" @change="item => changeState('job.taxcity', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">现合同开始时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditDatepicker :content="job.contractStartTime" :isEdit="editJob" @change="item => changeState('job.contractStartTime', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">现合同结束时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditDatepicker :content="job.contractEndTime" :isEdit="editJob" @change="item => changeState('job.contractEndTime', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">招聘渠道</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.recruitmentDitch" :isEdit="editJob" @change="item => changeState('job.recruitmentDitch', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">校招/社招</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.recruitmentType" :isEdit="editJob" @change="item => changeState('job.recruitmentType', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">其他招聘渠道</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="job.otherDitch" :isEdit="editJob" @change="item => changeState('job.otherDitch', item)" />
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="salaryTab" role="tabpanel">
                            <div class="edit">
                                <i v-if="!editSalary" @click="handleEdit('editSalary')" class="iconfont icon-bianji2"></i>
                                <template v-else>
                                    <span class="save" @click="save('editSalary')">保存</span> <span class="cancel" @click="cancel('editSalary')">取消</span>
                                </template>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">分摊部门</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditInput :content="salary.shareDepartment" :isEdit="editSalary" @change="item => changeState('salary.shareDepartment', item)" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">个税缴纳方式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditSelector 
                                        :options="incomeTaxTypeArr" 
                                        :isEdit="editSalary" 
                                        :content="salary.incomeTax"
                                        @change="item => changeState('salary.incomeTax', item)"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="entryInfoTab" role="tabpanel">
                            <!-- 员工信息 -->
                        </div>
                    </div>
                </div>

                <!-- <div class="col-md-12">
                    <div class="formName example" style="border: none;">个人成长记录</div>
                    <ul class="task-follow">
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-md-12">
                    <div class="formName example" style="border: none;">操作日志</div>
                    <ul class="task-follow example">
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>

<script>
import fetch from '../../assets/utils/fetch'
import config from '../../assets/js/config'
import { mapState, mapActions } from 'vuex'
const { workPlaceArr, employment, hireShape,
        positiveStateArr, schoolRecordArr,
        incomeTaxTypeArr, genderArr
    } = config
import { toHump, toLine } from '../../assets/utils/tool'

export default {
    name: 'staffDetail',
    data () {
        return {
            editInfo: false,
            editDetail: false,
            editJob: false,
            editSalary: false,
            userId: this.$route.params.id,
            // employmentArr: employmentArr,
            hireShapeArr: hireShape,
            workPlaceArr: workPlaceArr,
            genderArr: genderArr,
            positiveStateArr: positiveStateArr,
            incomeTaxTypeArr: incomeTaxTypeArr,
            schoolRecordArr: schoolRecordArr, // 学历
            // iconUrlCopy: '', // 头像原始url
            info: {
                name: '', // 昵称
                realName: '', // 真实姓名
                phone: '',
                iconUrl: '',
                department: '',
                departmentId: '',
                // workEmail: '',
                email: '',
                gender: '',
                age: '',
                birthTime: '',
                positionId: '', // 岗位
                highSchool: '', // 最高学历
                number: '',
            },
            infoCopy: {
            },
            detailId: '',
            detail: {
                idCardUrl: '',
                idNumber: '',
                passportCode: '',
                workEmail: '',
                cardNumberOne: '',
                creditCard: '', // 信用卡
                accumulationFund: '', // 公积金
                opening: '',
                lastCompany: '',
                responsibility: '', // 职责
                contract: '', // 合同
                currentAddress: '',
                cadastralAddress: '', // 户籍地址
                address: '', // 工作地点
                hireShape: '', // 聘用形式
            },
            detailCopy: {
            },
            jobId: '',
            job: {
                rank: '', // 职级
                eport: '', // 汇报对象
                status: '', // 转正状态
                positiveTime: '', // 转正时间
                pdepartureTime: '', // 离职日期
                siling: '', // 司龄
                firstWorkTime: '', // 首次工作时间
                workLing: '', // 工龄
                modulationWorkLing: '', // 调整工龄
                subordinateSum: '', // 直接下属数量
                workCity: '', // 工作城市
                taxcity: '', // 纳税城市
                contractStartTime: '', //合同开始时间
                contractEndTime: '', //合同结束时间
                recruitmentDitch: '', // 招聘渠道
                recruitmentType: '', // 招聘方式
                otherDitch: '', // 其他招聘渠道
                entryTime: ''
            },
            jobCopy: {},
            salaryId: '',
            salary: {
                shareDepartment: '', // 分摊部门
                incomeTax: '', // 个税缴纳方式
            },
            salaryCopy: {},
            // departmentId: '', // 部门id
            jobArr: [],
        }
    },
    computed: {
        ...mapState([
            'department'
        ])
    },
    mounted () {
        this.getData()
        this.getJobs()
    },
    methods: {
        ...mapActions([
            'getDepartment'
        ]),
        // 获取数据
        getData () {
            fetch('get', `/personnel/${this.userId}?include=detail,job,salary,position`).then((res) => {
                const data = res.data
                Object.keys(this.info).map((n) => {
                    this['info'][`${n}`] = data[toLine(n || '')] || ''
                })
                if (data.detail) {
                    this.detailId = data.detail.data.id
                    Object.keys(this.detail).map((n) => {
                        this['detail'][`${n}`] = data.detail.data[toLine(n)] || ''
                    })
                }

                if (data.job) {
                    this.jobId = data.job.data.id
                    Object.keys(this.job).map((n) => {
                        this['job'][`${n}`] = data.job.data[toLine(n)] || ''
                    })
                }
                if (data.salary) {
                    this.salaryId = data.salary.data.id
                    Object.keys(this.salary).map((n) => {
                        this['salary'][`${n}`] = data.salary.data[toLine(n)] || ''
                    })
                }
                this.detail.email = data.email || ''
                this.detail.currentAddress = data.current_address || ''
                this.detail.cadastralAddress = data.cadastral_address || ''
                this.info.departmentId = data.department ? data.department.id : ''
                this.info.department = data.department ? data.department.name : ''
                this.job.status = data.status || ''
                this.detail.hireShape = data.hire_shape && data.hire_shape != 0 ? data.hire_shape : ''
                this.info.positionId = data.position && data.position.data ? data.position.data.id : ''

                this.info.email = data.email || ''
                this.detail.workEmail = data.work_email || ''

                this.infoCopy = JSON.parse(JSON.stringify(this.info))
                this.detailCopy = JSON.parse(JSON.stringify(this.detail))
                this.jobCopy = JSON.parse(JSON.stringify(this.job))
                this.salaryCopy = JSON.parse(JSON.stringify(this.salary))
            })
        },
        // 改变data的值
		changeState (name, value, keyName) {
            const tempArr = name.split('.')
            let state = this
            if (name.indexOf('department') > -1) {
                this.info.departmentId = value
                this.info.department = keyName
            } else {
                for (let i = 0; i < tempArr.length; i++) {
                    if (i === tempArr.length - 1) {
                        state[`${tempArr[i]}`] = value
                    } else {
                        state = state[`${tempArr[i]}`]
                    }
                }
            }
        },
        handleEdit (name) {
            this[name] = !this[name]
        },
        // 修改基本信息
        saveEdit (name) {
            const params = {}
            let _data = this.info
            if (this.info.name !== this.infoCopy.name) {
                _data.iconUrl = ''  
            }
            let url = `/edit/${this.userId}/personal`
            let type = 'put' 
            if (name === 'editDetail') {
                _data = this.detail
                url = `/edit/${this.userId}/detail`
                type = 'put'
                if (!this.detail.hireShape) {
                    toastr.error('聘用形式必须填写！')
                    return
                }
            } else if (name === 'editJob') {
                _data = this.job
                url = !this.jobId ? `/jobs/${this.userId}` :`/edit/${this.userId}/jobs/${this.jobId}`
                type = !this.jobId ? 'post' : 'put' 
            } else if (name === 'editSalary') {
                _data = this.salary
                url =`/edit/${this.userId}/salary`
                type = 'put'
            }
            Object.keys(_data).map((n) => {
                params[toLine(n)] = _data[n] || ''
            })

            fetch(type, url, params).then(res => {
                toastr.success('保存成功！')
                this.getData()
                this.getDepartment()
            })
        },
        save (name) {
            this.handleEdit(name)
            this.saveEdit(name)
        },
        cancel (name) {
            if (name === 'editInfo') {
                this.info = this.infoCopy
            } else if (name === 'editDetail') {
                this.detail = this.detailCopy
            }else if (name === 'editJob') {
                this.job = this.jobCopy
            } else {
                this.salary = this.salaryCopy
            }
            this.handleEdit(name)
        },
        // 改变部门
        selectDepartment(data) {
            this.info.departmentId = data.id
        },
        // 获取岗位
        getJobs (data) {
            fetch('get', '/departments_jobs').then(res => {
                this.jobArr = res.data.map(n => {
                    return {
                        name: n.name,
                        value: n.id
                    }
                })
            })
        },
        // 头像修改
        uploadImg (fileUrl, fileName, fileSize) {
            this.info.iconUrl = fileUrl
        },
        // 身份证号修改
        uploadIDImg (fileUrl, fileName, fileSize) {
            this.detail.idCardUrl = fileUrl
        },
    },
}

</script>

<style>
@import '../../assets/css/staff.scss';
</style>

<style lang="scss" scoped>
.edit {
    display: inline-block;
    position: absolute;
    top: 24px;
    right: 34px;
    text-align: center;
    z-index: 1000;
    i {
        display: inline-block;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    span {
        cursor: pointer;
    }
    .save {
        color: #3F51B5;
        margin-right: 20px;
    }
    .cancel {
        color: #e0e0e0;
    }
}
.form-control:disabled, .form-control[readonly] {
    background-color: #fff;
    opacity: 1;
    border: none;
}
.btn-group, .bootstrap-select {
    width: 100%;
}
.tab-content {
    position: relative;
    .edit {
        top: 30px;
        right: 24px;
    }
}
.task-follow {
    padding: 0 15px;
}

.task-follow li {
    list-style: none;
    position: relative;
    padding-bottom: 10px;
    border-left: 1px solid #E0E0E0;
}
.page {
    margin-left: 0px!important;
}
.example {
    display: flex;
    align-items: center;
}
.idImg {
    .upload-head {
        width: 60px;
        height: 60px;
        line-height: 60px;
    }
}
</style>
