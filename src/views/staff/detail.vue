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
                            <div class="col-md-3 text-right float-left">姓名(中文)</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" :disabled="!editInfo" v-model="info.name" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">手机</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" :disabled="!editInfo" v-model="info.phone" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">最高学历</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" :disabled="!editInfo" v-model="info.highSchool" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">部门</div>
                            <div class="col-md-9 float-left pl-0">
                                <DropDepartment v-if="editInfo" :data="department" @change="selectDepartment"/>
                                <span v-else>未分配部门</span>
                                <!-- <StaffEditSelect :isEdit="editInfo" :options="departmentArr" :value="info.departmentId" changeKey="info.departmentId" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">工作邮箱</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" :disabled="!editInfo" v-model="info.workEmail" placeholder="" class="form-control">
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
                                <input type="text" :disabled="!editInfo" v-model="info.age" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">出生日期</div>
                            <div class="col-md-9 float-left pl-0">
                                <input v-if="!editInfo" type="text" disabled v-model="info.birthTime" placeholder="" class="form-control">
                                <template v-else>
                                    <datepicker :disabled="!editInfo" changeKey="info.birthTime" @select="changeState"></datepicker>
                                </template>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">岗位</div>
                            <div class="col-md-9 float-left pl-0">
                                <EditSelector
                                    :options="jobArr" 
                                    :isEdit="editInfo" 
                                    :content="info.jobs"
                                    @change="item => changeState('info.jobs', item)"
                                />
                                <!-- <input type="text" :disabled="!editInfo" v-model="info.jobs" placeholder="" class="form-control"> -->
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
                            <upload>
                                <div class="upload-head" style="margin-top: 52px;">
                                    上传头像
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
                                    <input type="text" :disabled="!editDetail" v-model="detail.idNumber" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">身份证照</div>
                                <div class="col-md-6 float-left pl-0">
                                    <upload>
                                        <div class="id-upload">
                                            <!-- <i class="iconfont icon-tianjia" style="font-size: 50px" aria-hidden="true"></i> -->
                                            +
                                        </div>
                                    </upload>
                                    <small style="color: #F44336;">图片格式为JPG/JPEG/PNG/PDF 大小在2MB内</small>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">护照号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.passportCode" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">地址</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.currentAddress" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">个人邮箱</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.email" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工资银行卡号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.cardNumberOne" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">开户行</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.opening" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">信用卡号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.creditCard" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">公积金号</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.accumulationFund" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">上家公司</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.lastCompany" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">岗位职责</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.responsibility" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">签署合同</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.contract" placeholder="" class="form-control">
                                    <!-- <StaffEditSelect :isEdit="editDetail" :options="companyArr" :value="detail.contract" changeKey="detail.contract" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
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
                                    <!-- <StaffEditSelect :isEdit="editDetail" :options="workPlaceArr" :value="detail.address" changeKey="detail.address" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">聘用形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <EditSelector 
                                        :options="employmentArr" 
                                        :isEdit="editDetail" 
                                        :content="detail.hireShape"
                                        @change="item => changeState('detail.hireShape', item)"
                                    />
                                    <!-- <StaffEditSelect :isEdit="editDetail" :options="employmentArr" :value="detail.hireShape" changeKey="detail.hireShape" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
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
                                    <input type="text" :disabled="!editJob" v-model="job.rank" placeholder="" class="form-control">
                                </div>
                            </div>

                            <!-- 入职日期 -->
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">入职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editJob" type="text" v-model="job.entryTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="detail.entryTime" @select="changeState"></datepicker>
                                    </template>
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
                                    <!-- <StaffEditSelect :isEdit="editJob" :options="positiveStateArr" :value="job.status" changeKey="job.status" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">转正日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editJob" type="text" v-model="job.positiveTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="job.positiveTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">离职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editJob" type="text" v-model="job.pdepartureTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="job.pdepartureTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">司龄</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.siling" :disabled="!editJob" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">首次参加工作时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editJob" type="text" v-model="job.firstWorkTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="job.firstWorkTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工龄</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.workLing" :disabled="!editJob" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">调整工龄(天)</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.modulationWorkLing" :disabled="!editJob" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">直接下属数量</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.subordinateSum" :disabled="!editJob" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工作城市</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editJob" v-model="job.workCity" placeholder="" class="form-control">
                                    <!-- <StaffEditSelect :isEdit="editJob" :options="companyCityArr" :value="job.workCity" changeKey="job.workCity" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">纳税城市</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editJob" v-model="job.taxcity" placeholder="" class="form-control">
                                    <!-- <StaffEditSelect :isEdit="editJob" :options="companyCityArr" :value="job.taxcity" changeKey="job.taxcity" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">现合同开始时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editJob" type="text" v-model="job.contractStartTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="job.contractStartTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">现合同结束时间</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editJob" type="text" v-model="job.contractEndTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="job.contractEndTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">招聘渠道</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.recruitmentDitch" :disabled="!editJob" placeholder="" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">校招/社招</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.recruitmentType" :disabled="!editJob" placeholder="" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">其他招聘渠道</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.otherDitch" :disabled="!editJob" placeholder="" class="form-control">
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
                                    <input type="text" v-model="salary.shareDepartment" :disabled="!editSalary" placeholder="" class="form-control">
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
                                    <!-- <StaffEditSelect :isEdit="editSalary" :options="incomeTaxTypeArr" :value="salary.incomeTax" changeKey="salary.incomeTax" @change="changeState" placeholder="请选择" :defaultValue="0" /> -->
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="entryInfoTab" role="tabpanel">
                            <!-- 员工信息 -->
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
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
                </div>
                
                <!-- 底部按钮 -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-default">取消</button>
                    <button type="button" class="btn btn-primary">提交</button>
                </div>
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
const { workPlaceArr, employment, 
        positiveStateArr,
        incomeTaxTypeArr, genderArr
    } = config
import { toHump, toLine } from '../../assets/utils/tool'

const employmentArr = Object.entries(employment).map(n => {
    return {
        name: n[1],
        value: n[0]
    }
})

console.log(employmentArr)

export default {
    name: 'staffDetail',
    data () {
        return {
            editInfo: false,
            editDetail: false,
            editJob: false,
            editSalary: false,
            userId: this.$route.params.id,
            employmentArr: employmentArr,
            workPlaceArr: workPlaceArr,
            genderArr: genderArr,
            positiveStateArr: positiveStateArr,
            incomeTaxTypeArr: incomeTaxTypeArr,
            info: {
                name: '',
                phone: '',
                department: '',
                departmentId: '',
                workEmail: '',
                gender: '',
                age: '',
                birthTime: '',
                jobs: '',
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
                email: '',
                cardNumberOne: '',
                creditCard: '', // 信用卡
                accumulationFund: '', // 公积金
                opening: '',
                lastCompany: '',
                responsibility: '', // 职责
                entryTime: '',
                contract: '', // 合同
                department: '',
                currentAddress: '',
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
            },
            jobCopy: {},
            salaryId: '',
            salary: {
                shareDepartment: '', // 分摊部门
                incomeTax: '', // 个税缴纳方式
            },
            salaryCopy: {},
            departmentId: '', // 部门id
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
            fetch('get', `/personnel/${this.userId}?include=detail,job,salary`).then((res) => {
                const data = res.data
                Object.keys(this.info).map((n) => {
                    this['info'][`${n}`] = data[toLine(n || '')] || ''
                    this['infoCopy'][`${n}`] = data[toLine(n || '')] || ''
                })
                if (data.detail) {
                    this.detailId = data.detail.data.id
                    Object.keys(this.detail).map((n) => {
                        this['detail'][`${n}`] = data.detail.data[toLine(n)] || ''
                        this['detailCopy'][`${n}`] = data.detail.data[toLine(n)] || ''
                    })
                }

                if (data.job) {
                    this.jobId = data.job.data.id
                    Object.keys(this.job).map((n) => {
                        this['job'][`${n}`] = data.job.data[toLine(n)] || ''
                        this['jobCopy'][`${n}`] = data.job.data[toLine(n)] || ''
                    })
                }
                if (data.salary) {
                    this.salaryId = data.salary.data.id
                    Object.keys(this.salary).map((n) => {
                        this['salary'][`${n}`] = data.salary.data[toLine(n)] || ''
                        this['salaryCopy'][`${n}`] = data.salary.data[toLine(n)] || ''
                    })
                }
                this.detail.email = data.email || ''
                this.detail.currentAddress = data.current_address || ''
                this.detail.departmentId = data.department_id || ''
                this.detail.department = data.department || ''
                this.job.status = data.status || ''
                this.detail.hireShape = data.hire_shape || ''
            })
        },
        // 改变data的值
		changeState (name, value, keyName) {
            const tempArr = name.split('.')
            let state = this
            if (name.indexOf('department') > -1) {
                this.detail.departmentId = value
                this.detail.department = keyName
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
            let url = `/personal/edit/${this.userId}`
            let type = 'put' 
            if (name === 'editDetail') {
                _data = this.detail
                url = !this.detailId ? `/personal/${this.userId}` :`/edit/${this.userId}/personal/${this.detailId}`
                type = !this.detailId ? 'post' : 'put' 
            } else if (name === 'editJob') {
                _data = this.job
                url = !this.jobId ? `/jobs/${this.userId}` :`/edit/${this.userId}/jobs/${this.jobId}`
                type = !this.jobId ? 'post' : 'put' 
            } else if (name === 'editSalary') {
                _data = this.salary
                url = !this.salaryId ? `/jobs/${this.userId}` :`/edit/${this.userId}/jobs/${this.salaryId}`
                type = !this.salaryId ? 'post' : 'put' 
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
                this.info = JSON.parse(JSON.stringify(this.infoCopy))
            } else if (name === 'editDetail') {
                this.detail = JSON.parse(JSON.stringify(this.detailCopy))
            }else if (name === 'editJob') {
                this.job = JSON.parse(JSON.stringify(this.jobCopy))
            } else {
                this.salary = JSON.parse(JSON.stringify(this.salaryCopy))
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
        }
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
</style>
