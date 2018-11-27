<template>
    <!-- Page -->
    <div class="page">

        <NavBack title="测试-测试部" href="/staff"></NavBack>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="edit">
                    <i v-if="!editInfo" @click="handleEdit('editInfo')" class="icon md-edit"></i>
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
                                <input type="text" :disabled="!editInfo" v-model="info.highestDegree" placeholder="" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">部门</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" :disabled="!editInfo" v-model="info.department"  placeholder="" class="form-control">
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
                                <input type="text" :disabled="!editInfo" v-model="info.sex" placeholder="" class="form-control">
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
                                <input v-if="!editInfo" type="text" disabled v-model="info.birthDay" placeholder="" class="form-control">
                                <template v-else>
                                    <datepicker :disabled="!editInfo" changeKey="info.birthDay" @select="changeState"></datepicker>
                                </template>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-3 text-right float-left">岗位</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" :disabled="!editInfo" v-model="info.position" placeholder="" class="form-control">
                            </div>
                        </div>
                        <!-- <div class="example">
                            <div class="col-md-3 text-right float-left">工号</div>
                            <div class="col-md-9 float-left pl-0">
                                <input type="text" placeholder="" class="form-control">
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
                            <a class="nav-link" 
                                data-toggle="tab" 
                                href="#entryInfoTab" 
                                aria-controls="entryInfoTab" 
                                role="tab" 
                                aria-selected="false">
                                入职信息表
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content pt-10">
                        <div class="tab-pane active" id="infoTab" role="tabpanel">
                            <div class="edit">
                                <i v-if="!editDetail" @click="handleEdit('editDetail')" class="icon md-edit"></i>
                                <template v-else>
                                    <span class="save" @click="save('editDetail')">保存</span> <span class="cancel" @click="cancel('editDetail')">取消</span>
                                </template>
                            </div>
                            <div class="col-md-8 example">
                                <!-- <div class="example"> -->
                                    <div class="col-md-2 text-right float-left pl-0">身份证号</div>
                                    <div class="col-md-6 float-left pl-0">
                                        <input type="text" :disabled="!editDetail" v-model="detail.idNumber" placeholder="" class="form-control">
                                    </div>
                                <!-- </div> -->
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">身份证照</div>
                                <div class="col-md-6 float-left pl-0">
                                    <upload>
                                        <div class="id-upload">
                                            <!-- <i class="icon md-plus" style="font-size: 50px" aria-hidden="true"></i> -->
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
                                    <input type="text" :disabled="!editDetail" v-model="detail.address" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">个人邮箱</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.email" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工资银行卡号1</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.cardNumberOne" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工资银行卡号2</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.cardNumberTwo" placeholder="" class="form-control">
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
                                <div class="col-md-2 text-right float-left">开户行</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editDetail" v-model="detail.opening" placeholder="" class="form-control">
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
                                    <StaffEditSelect :isEdit="editDetail" :options="companyArr" changeKey="detail.contract" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">工作地点</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editDetail" :options="workPlaceArr" changeKey="detail.workPlace" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">聘用形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editDetail" :options="employmentArr" changeKey="detail.employment" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">部门</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">入职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editDetail" type="text" v-model="detail.entryTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="detail.entryTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane" id="workTab" role="tabpanel">
                            <div class="edit">
                                <i v-if="!editJob" @click="handleEdit('editJob')" class="icon md-edit"></i>
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
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">汇报对象</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editJob" :options="eportArr" changeKey="job.eport" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">转正状态</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editJob" :options="positiveStateArr" changeKey="" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">转正日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" :disabled="!editJob" v-model="job.positiveTime" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">聘用形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">管理形式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.management" :disabled="!editJob" placeholder="" class="form-control">
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
                                    <input v-if="!editJob" type="text" v-model="job.firstWrokTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="job.firstWrokTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">调整司龄(天)</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.modulationSiling" :disabled="!editJob" placeholder="" class="form-control">
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
                                    <StaffEditSelect :isEdit="editJob" :options="companyCityArr" changeKey="job.workCity" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">纳税城市</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editJob" :options="companyCityArr" changeKey="job.taxcity" @change="changeState" placeholder="请选择" :defaultValue="0" />
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
                                    <StaffEditSelect :isEdit="editJob" :options="recruitWayArr" changeKey="job.recruitmentDispatch" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">校招/社招</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editJob" :options="recruitWayArr" changeKey="job.recruitTypeArr" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">其他招聘渠道</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="job.otherDispatch" :disabled="!editJob" placeholder="" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="salaryTab" role="tabpanel">
                            <div class="edit">
                                <i v-if="!editSalary" @click="handleEdit('editSalary')" class="icon md-edit"></i>
                                <template v-else>
                                    <span class="save" @click="save('editSalary')">保存</span> <span class="cancel" @click="cancel('editSalary')">取消</span>
                                </template>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">入职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editSalary" type="text" v-model="salary.entryTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="salary.entryTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">试用期截止日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editSalary" type="text" v-model="salary.trialEndTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="salary.trialEndTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">离职日期</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input v-if="!editSalary" type="text" v-model="salary.pdepartureTime" placeholder="" disabled class="form-control">
                                    <template v-else>
                                        <datepicker changeKey="salary.pdepartureTime" @select="changeState"></datepicker>
                                    </template>
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">分摊部门</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="salary.shareDepartment" :disabled="!editSalary" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">岗位</div>
                                <div class="col-md-6 float-left pl-0">
                                    <input type="text" v-model="salary.jobs" :disabled="!editSalary" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">个税缴纳方式</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editSalary" :options="incomeTaxTypeArr" changeKey="salary.incomeTax" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                            <div class="col-md-8 example">
                                <div class="col-md-2 text-right float-left">人员类别</div>
                                <div class="col-md-6 float-left pl-0">
                                    <StaffEditSelect :isEdit="editSalary" :options="personnelCategoryArr" changeKey="salary.personnelCategory" @change="changeState" placeholder="请选择" :defaultValue="0" />
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="entryInfoTab" role="tabpanel">
                            员工信息
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
const { workPlaceArr, companyArr, employment, eportArr, 
        positiveStateArr, companyCityArr, recruitWayArr, recruitTypeArr,
        incomeTaxTypeArr, personnelCategoryArr
    } = config
import { toHump, toLine } from '../../assets/utils/tool'

const employmentArr = Object.entries(employment).map(n => {
    return {
        name: n[1],
        value: n[0]
    }
})

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
            companyArr: companyArr,
            workPlaceArr: workPlaceArr,
            eportArr: eportArr,
            positiveStateArr: positiveStateArr,
            companyCityArr: companyCityArr,
            recruitWayArr: recruitWayArr,
            recruitTypeArr: recruitTypeArr,
            incomeTaxTypeArr: incomeTaxTypeArr,
            personnelCategoryArr: personnelCategoryArr,
            info: {
                name: '',
                phone: '',
                department: '',
                workEmail: '',
                sex: '',
                age: '',
                birthDay: '',
                position: '',
                highestDegree: ''
            },
            infoCopy: {
            },
            detail: {
                idCardUrl: '',
                idNumber: '',
                passportCode: '',
                address: '',
                email: '',
                cardNumberOne: '',
                cardNumberTwo: '',
                creditCard: '', // 信用卡
                accumulationFund: '', // 公积金
                opening: '',
                lastCompany: '',
                responsibility: '', // 职责
                entryTime: '',
                contract: '', // 合同
                department: '',
                currentAddress: '',
                workPlace: '',
                employment: '',
            },
            detailCopy: {
            },
            job: {
                rank: '', // 职级
                eport: '', // 汇报对象
                s: '', // 转正状态
                ss: '', // 聘用形式
                positiveTime: '', // 转正时间
                management: '', // 管理形式
                siling: '', // 司龄
                firstWrokTime: '', // 首次工作时间
                modulationSiling: '', // 调整司龄
                workLing: '', // 工龄
                modulationWorkLing: '', // 调整工龄
                subordinateSum: '', // 直接下属数量
                workCity: '', // 工作城市
                taxcity: '', // 纳税城市
                contractStartTime: '', //合同开始时间
                contractEndTime: '', //合同结束时间
                recruitmentDispatch: '', // 招聘渠道
                recruitmentType: '', // 招聘方式
                otherDispatch: '', // 其他招聘渠道
            },
            jobCopy: {},
            salary: {
                entryTime: '', // 入职日期
                trialEndTime: '', // 试用期截止日期
                pdepartureTime: '', // 离职时间
                shareDepartment: '', // 分摊部门
                jobs: '', // 岗位
                incomeTax: '', // 个税缴纳方式
                personnelCategory: '' // 人员类别
            },
            salaryCopy: {},
        }
    },
    computed: {
    },
    mounted () {
        this.getData()
    },
    methods: {
        // 获取数据
        getData () {
            fetch('get', `/personnel/${this.userId}?include=detail,job,salary`).then((res) => {
                const data = res.data
                this.info.email = data.email || ''
                this.info.currentAddress = data.currentAddress || ''
                Object.keys(this.info).map((n) => {
                    this['info'][`${n}`] = toHump(data[n] || '') || ''
                    this['infoCopy'][`${n}`] = toHump(data[n] || '') || ''
                })

                Object.keys(this.detail).map((n) => {
                    this['detail'][`${n}`] = toHump(data[n] || '') || ''
                    this['detailCopy'][`${n}`] = toHump(data[n] || '') || ''
                })

                Object.keys(this.job).map((n) => {
                    this['job'][`${n}`] = toHump(data[n] || '') || ''
                    this['jobCopy'][`${n}`] = toHump(data[n] || '') || ''
                })

                Object.keys(this.salary).map((n) => {
                    this['salary'][`${n}`] = toHump(data[n] || '') || ''
                    this['salaryCopy'][`${n}`] = toHump(data[n] || '') || ''
                })
            })
        },
        // 改变data的值
		changeState (name, value) {
            const tempArr = name.split('.')
            let state = this
            for (let i = 0; i < tempArr.length; i++) {
                if (i === tempArr.length - 1) {
                    state[`${tempArr[i]}`] = value
                } else {
                    state = state[`${tempArr[i]}`]
                }
            }
        },
        handleEdit (name) {
            this[name] = !this[name]
        },
        save (name) {
            this.handleEdit(name)
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
</style>
