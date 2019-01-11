<template>
    <!-- Page -->
    <div class="page">
        <NavBack title="添加员工" href="/staff"></NavBack>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="nav-tabs-horizontal" data-plugin="tabs">

                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active"
                                data-toggle="tab"
                                href="#exampleTabsOne"
                                aria-controls="exampleTabsOne"
                                role="tab" aria-selected="true">
                                添加员工
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link"
                                data-toggle="tab"
                                href="#exampleTabsTwo"
                                aria-controls="exampleTabsTwo"
                                role="tab"
                                aria-selected="false">
                                邀请员工
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content pt-20">
                      <div class="tab-pane active" id="exampleTabsOne" role="tabpanel">
                        <div class="formName pd-b-15">个人资料 <span class="note require" style="margin-left: 10px;">为必填项</span></div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left require">姓名(中文)</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ nameCN }}
                                        </template>
                                        <input type="text"
                                            v-else
                                            :disabled="isLook"
                                            v-model="nameCN"
                                            placeholder="1-30个字符"
                                            maxlength="30"
                                            class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">姓名(英文)</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ nameEN }}
                                        </template>
                                        <input type="text"
                                            v-else
                                            :disabled="isLook"
                                            v-model="nameEN"
                                            placeholder="1-30个字符"
                                            maxlength="30"
                                            class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left require">性别</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <EditSelector 
                                            :options="genderArr" 
                                            :isEdit="!isLook" 
                                            :content="gender"
                                            @change="item => changeState('gender', item)"
                                        />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left require">身份证号</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ IDNum }}
                                        </template>
                                        <input v-else type="text" placeholder="" v-model="IDNum" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left"></div>
                                    <div class="col-md-8 float-left pl-0">
                                        <Avatar v-if="isLook" :imgUrl="avatar" style="width: 90px; height: 90px; font-size: 24px;" />
                                        <upload @change="uploadImg" v-else accept="image/png, image/jpeg, image/gif, image/jpg">
                                            <div class="upload-head">
                                                <img v-if="avatar" :src="avatar" alt="头像" />
                                                <template v-else>
                                                    上传头像
                                                </template>
                                            </div>
                                        </upload>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" style="margin-top: -20px;">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left require">手机号</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ phoneNum }}
                                        </template>
                                        <input v-else type="text" v-model="phoneNum" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <!-- <div class="example">
                                    <div class="col-md-3 text-right float-left require">入职时间</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ entryTime }}
                                        </template>
                                        <datepicker v-else change-key="entryTime" @select="changeState"></datepicker>
                                    </div>
                                </div> -->
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">政治面目</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ politicalFace }}
                                        </template>
                                        <input v-else type="text" v-model="politicalFace" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left require">婚姻状况</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <EditSelector 
                                            :options="maritalStatusArr" 
                                            :isEdit="!isLook" 
                                            :content="maritalStatus"
                                            @change="item => changeState('maritalStatus', item)"
                                        />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left require">电子邮件</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ email }}
                                        </template>
                                        <input v-else type="text" v-model="email" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">民族</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <EditSelector 
                                            :options="nationalityArr" 
                                            :isEdit="!isLook" 
                                            :content="nationality"
                                            @change="item => changeState('nationality', item)"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" style="margin-top: -20px;">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left require">出生日期</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ birthDay }}
                                        </template>
                                        <datepicker v-else change-key="birthDay" @select="changeState"></datepicker>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">户籍所在地详细地址</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ householdAddress }}
                                        </template>
                                        <input v-else type="text" placeholder="" v-model="householdAddress" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">血型</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <EditSelector 
                                            :options="bloodTypeArr" 
                                            :isEdit="!isLook" 
                                            :content="bloodType" 
                                            @change="item => changeState('bloodType', item)"
                                        />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">现居住地址</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ homeAddress }}
                                        </template>
                                        <input v-else type="text" v-model="homeAddress" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="formName pd-b-15">个人技能</div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">外语水平</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ foreignLanguageLevel }}
                                        </template>
                                        <input v-else type="text" v-model="foreignLanguageLevel" placeholder="" class="form-control" />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">所获证书</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ certificate }}
                                        </template>
                                        <input v-else type="text" v-model="certificate" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">计算机水平</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ computerSkill }}
                                        </template>
                                        <input v-else type="text" v-model="computerSkill" placeholder="" class="form-control" />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">个人特长</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <template v-if="isLook">
                                            {{ specialty }}
                                        </template>
                                        <input v-else type="text" v-model="specialty" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="formName pd-b-15">教育背景 <i v-if="!isLook" class="iconfont icon-tianjia add-icon" @click="tableAdd('education')"></i></div>
                        <div class="example table-responsive padding15">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in education.tHead" :key="index">{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in education.tBody" :key="index">
                                        <td v-for="(item, key) in items" :key="index + ''+ key">
                                            <template v-if="isLook">
                                                {{ education.tBody[index][key] }}
                                            </template>
                                            <input v-else type="text" v-model="education.tBody[index][key]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">培训经历<i v-if="!isLook" class="iconfont icon-tianjia add-icon" @click="tableAdd('train')"></i></div>
                        <div class="example table-responsive padding15">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in train.tHead" :key="index">{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in train.tBody" :key="index">
                                        <td v-for="(item, key) in items" :key="index + ''+ key">
                                            <template v-if="isLook">
                                                {{ train.tBody[index][key] }}
                                            </template>
                                            <input v-else type="text" v-model="train.tBody[index][key]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">
                            任职履历<span class="note" style="margin-left: 16px;">从最近的任职单位开始填写</span>
                            <i v-if="!isLook" class="iconfont icon-tianjia add-icon" @click="tableAdd('work')"></i>
                        </div>
                        <div class="example table-responsive padding15">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in work.tHead" :key="index">{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in work.tBody" :key="index">
                                        <td v-for="(item, key) in items" :key="index + '' + key">
                                             <template v-if="isLook">
                                                {{ work.tBody[index][key] }}
                                            </template>
                                            <input v-else type="text" v-model="work.tBody[index][key]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">家庭资料
                            <span class="note" style="margin-left: 16px;">请列出直系亲属资料和紧急联系人信息</span>
                            <i v-if="!isLook" class="iconfont icon-tianjia add-icon" @click="tableAdd('home')"></i>
                        </div>
                        <div class="example table-responsive padding15">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in home.tHead" :key="index">{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in home.tBody" :key="index">
                                        <td v-for="(item, key) in items" :key="index + '' + key">
                                            <!-- <input type="text" v-model="home.tBody[index][_index]" /> -->
                                            <template v-if="isLook">
                                                {{ home.tBody[index][key] }}
                                            </template>
                                            <input v-else type="text" v-model="home.tBody[index][key]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15"></div>
                        <div class="row example padding15">
                            <div class="col-md-7" style="margin-top: 4px;">1、现在或以前是否患有任何的身体缺陷或疾病，包括心脏病、肝炎、神经衰弱等</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" :disabled="isLook" id="inputRadiosCheckedOne" value="1" name="inputRadioOne" v-model="isIll">
                                    <label for="inputRadiosCheckedOne">是</label>&nbsp;&nbsp;
                                    <input type="radio" :disabled="isLook" id="inputRadiosUncheckedOne" value="2" name="inputRadioOne" v-model="isIll">
                                    <label for="inputRadiosUncheckedOne">否</label>
                                </div>
                            </div>
                            <div class="col-md-7" style="margin-top: 4px;">2、如属女性，请说明是否怀孕？</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" :disabled="isLook" id="inputRadiosCheckedTwo" value="1" name="inputRadioTwo" v-model="isPregnancy">
                                    <label for="inputRadiosCheckedTwo">是</label>&nbsp;&nbsp;
                                    <input type="radio" :disabled="isLook" id="inputRadiosUncheckedTwo" value="2" name="inputRadioTwo" v-model="isPregnancy">
                                    <label for="inputRadiosUncheckedTwo">否</label>
                                </div>
                            </div>
                            <div class="col-md-7" style="margin-top: 4px;">3、是否同意工作迁移到集团其他城市</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" :disabled="isLook" id="inputRadiosCheckedThree" value="1" name="inputRadioThree" v-model="agreeMove">
                                    <label for="inputRadiosCheckedThree">是</label>&nbsp;&nbsp;
                                    <input type="radio" :disabled="isLook" id="inputRadiosUncheckedThree" value="2" name="inputRadioThree" v-model="agreeMove">
                                    <label for="inputRadiosUncheckedThree">否</label>
                                </div>
                            </div>
                        </div>

                        <div class="formName pd-b-15">其他备注</div>
                        <div class="example padding15">
                            <template v-if="isLook">
                                {{ remarks }}
                            </template>
                            <textarea v-else class="form-control" rows="4" v-model="remarks"></textarea>
                        </div>

                        <div class="modal-footer">
                            <!-- <button class="btn btn-sm btn-white btn-pure waves-effect waves-classic" data-dismiss="modal"  @click="handleCancel">取消</button> -->
                            <button class="btn btn-primary waves-effect waves-classic" v-if="!isLook" type="submit" @click="submit">提交</button>
                        </div>
                    </div>

                    <div class="tab-pane" id="exampleTabsTwo" role="tabpanel">
                        <div style="color: #01bcd4;">
                            {{ addUrl }}
                            <button class="btn btn-primary" style="margin-left: 10px" @click="copy">复制链接</button>
                            <input ref="input" id="demoInput" :value="addUrl" style="opacity: 0" />
                            </div>
                      </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <!-- End Page -->
</template>

<script>
import config from "../../assets/js/config";
const { genderArr, maritalStatusArr, nationalityArr, bloodTypeArr } = config;
import fetch from "../../assets/utils/fetch";

let tempArr = []
for (let i = 0; i < nationalityArr.length; i++) {
	let temp = {}
	temp.name = nationalityArr[i]
	temp.value = i + 1
	tempArr.push(temp)
}

export default {
    name: 'StaffDetail',
    data () {
        return {
            isLook: this.$route.name === 'entryDetail',
            userId: '',
            genderArr: genderArr,
            maritalStatusArr: maritalStatusArr,
            nationalityArr: tempArr,
            bloodTypeArr: bloodTypeArr,
            addUrl: window.location.origin + '/informationForm',
            nameCN: '',
            nameEN: '',
            gender: '',
            IDNum: '',
            phoneNum: '',
            // entryTime: '', // 入职时间
            politicalFace: '', // 政治面目
            maritalStatus: '', // 婚姻
            email: '',
            avatar: '',
            birthDay: '',
            householdAddress: '', // 户籍地址
            nationality: '', // 民族
            bloodType: '', // 血型
            homeAddress: '', // 居住地址
            foreignLanguageLevel: '', // 外语水平
            computerSkill: '', // 计算机水平
            certificate: '', // 证书
            specialty: '', // 特长,
            educationInfo: {
                school: '',
                specialty: '',
                start_time: '',
                end_time: '',
                graduate: '',
                degree: ''
            },
            trainInfo: {
                course_name: '',
                certificate: '',
                address: '',
                trained_time: '',
            },
            workInfo: {
                unit_name: '',
                department: '',
                position: '',
                entry_time: '',
                departure_time: '',
                monthly_pay: '',
                departure_why: '',
            },
            homeInfo: {
                name: '',
                relation: '',
                birth_time: '',
                work_units: '',
                position: '',
                contact_phone: '',
            },
            education: {
                tHead: [
                    {
                        key: 'school',
                        value: '学校',
                    }, {
                        key: 'specialty',
                        value: '专业',
                    }, {
                        key: 'start_time',
                        value: '入学时间',
                    }, {
                        key: 'end_time',
                        value: '离校时间',
                    }, {
                        key: 'graduate',
                        value: '是否毕业',
                    }, {
                        key: 'degree',
                        value: '所获学位'
                    },
                ],
                tBody: []
            },
            train: {
                tHead: [
                    {
                        key: 'course_name',
                        value: '培训课程名称',
                    }, {
                        key: 'certificate',
                        value: '培训机构名称',
                    }, {
                        key: 'address',
                        value: '地点',
                    }, {
                        key: 'trained_time',
                        value: '受训时间',
                    }
                ],
                tBody: []
            },
            work: {
                tHead: [
                    {
                        key: 'unit_name',
                        value: '单位名称',
                    }, {
                        key: 'department',
                        value: '部门',
                    }, {
                        key: 'position',
                        value: '职位',
                    }, {
                        key: 'entry_time',
                        value: '入职时间',
                    }, {
                        key: 'departure_time',
                        value: '离职时间'
                    }, {
                        key: 'monthly_pay',
                        value: '月薪'
                    }, {
                        key: 'departure_why',
                        value: '离职原因'
                    }
                ],
                tBody: []
            },
            home: {
                tHead: [
                    {
                        key: 'name',
                        value: '姓名',
                    }, {
                        key: 'relation',
                        value: '与本人关系',
                    }, {
                        key: 'birth_time',
                        value: '出生日期',
                    }, {
                        key: 'work_units',
                        value: '工作单位',
                    }, {
                        key: 'position',
                        value: '职务'
                    }, {
                        key: 'contact_phone',
                        value: '联系电话'
                    }
                ],
                tBody: []
            },
            isIll: '',
            isPregnancy: '',
            agreeMove: '',
            remarks: '',
            formCheck: [{
                name: 'nameCN',
                msg: '请填写姓名'
            }, {
                name: 'gender',
                msg: '请选择性别'
            }, {
                name: 'IDNum',
                msg: '请填写身份证号码'
            }, {
                name: 'phoneNum',
                msg: '请填写手机号'
            }, {
                name: 'maritalStatus',
                msg: '请选择婚姻状况'
            }, {
                name: 'email',
                msg: '请填写电子邮件'
            }, {
                name: 'birthDay',
                msg: '请选择出生日期'
            }]
        };
    },

	mounted () {
		// 深拷贝添加数组，否则改变一个会影响其他的数组
		let tempInfoArr = ['education', 'work', 'home', 'train']
		tempInfoArr.map((n) => {
			for (let i = 0; i < 4; i++) {
				this[n].tBody.push(JSON.parse(JSON.stringify(this[n+'Info'])))
			}
        })
        const route = this.$route
        if (route.name === 'entryDetail') {
            this.userId = route.params.id
            this.getData()
        }

    },

	methods: {
		// 改变data的值
		changeState (name, value) {
            this[name] = value
		},
		// 表格新增行
		tableAdd (name) {
			this[name].tBody.push(JSON.parse(JSON.stringify(this[name + 'Info'])))
		},
		// 上传图片
		uploadImg (fileUrl, fileName, fileSize) {
            this.avatar = fileUrl
		},
		// 提交
		submit () {
            let canSend = true
            for (let n of this.formCheck) {
                if (!this[n.name]) {
                    toastr.error(n.msg)
                    canSend = false
                    break
                }
            }

            const _education = this.filterData(this.education.tBody)
            const _training = this.filterData(this.train.tBody)
            const _record = this.filterData(this.work.tBody)
            const _family= this.filterData(this.home.tBody)
            if (!canSend) {
                return
            }
            let params = {
				name: this.nameCN,
				en_name: this.nameEN,
				gender: this.gender,
				id_number: this.IDNum,
				phone: this.phoneNum,
				political: this.politicalFace,
				marriage: this.maritalStatus,
				cadastral_address: this.homeAddress,
				national: this.nationality,
				current_address: this.householdAddress,
				birth_time: this.birthDay,
				// entry_time: this.entryTime,
				blood_type: this.bloodType,
				email: this.email,
				language_level: this.foreignLanguageLevel,
				certificate: this.certificate,
				computer_level: this.computerSkill,
				specialty: this.specialty,
				remark: this.remarks,
				disease: this.isIll,
				pregnancy: this.isPregnancy,
				migration: this.agreeMove,
				icon_url: this.avatar,
				status_type: 1, // 默认
				education: _education,
				training: _training,
				record: _record,
				family: _family
            }

			fetch('post', '/personnel' ,params).then(result => {
                toastr.success('添加成功')
                this.$router.push({ path: '/staff' });
			})
        },
        // 获取员工数据
        getData () {
            fetch('get', `/personnel/entry/${this.userId}?include=skills,education,training,record,familyData`).then(res => {
                const data = res.data
                this.nameCN = data.name
                this.nameEN = data.en_name
                this.gender = data.gender
                this.IDNum = data.id_number
                this.phoneNum = data.phone
                // this.entryTime = data.entry_time
                this.politicalFace = data.political
                this.maritalStatus = data.marriage
                this.email = data.email
                this.avatar = data.icon_url
                this.birthDay = data.birth_time
                this.householdAddress = data.current_address
                this.nationality = data.national
                this.bloodType = data.blood_type
                this.homeAddress = data.cadastral_address
                this.foreignLanguageLevel = data.skills.data[0].language_level
                this.computerSkill = data.skills.data[0].computer_level
                this.certificate = data.skills.data[0].certificate
                this.specialty = data.skills.data[0].specialty
                this.remarks = data.skills.data[0].remark
				this.isIll = data.skills.data[0].disease
                this.isPregnancy = data.skills.data[0].pregnancy
                this.agreeMove = data.skills.data[0].migration
                this.education.tBody = data.education.data.map(n => {
                    return this.education.tHead.map(m => {
                        return n[m.key]
                    })
                })
                this.train.tBody = data.training.data.map(n => {
                    return this.train.tHead.map(m => {
                        return n[m.key]
                    })
                })
                this.work.tBody = data.record.data.map(n => {
                    return this.work.tHead.map(m => {
                        return n[m.key]
                    })
                })
                this.home.tBody = data.familyData.data.map(n => {
                    return this.home.tHead.map(m => {
                        return n[m.key]
                    })
                })
                
            })
        },
        // 过滤有用数据
        filterData (data) {
            return JSON.parse(JSON.stringify(data)).filter(n => {
                let canPush = false
                Object.entries(n).map((m) => {
                    if (m[1]) {
                        canPush = true
                    } else {
                        n[m[0]] = 0
                    }
                })
                return canPush
            })
        },
        copy () {
            this.$refs.input.select()
            if (document.execCommand('copy')) {
                document.execCommand('copy')
                toastr.success('复制成功!')
            }
        }
	}
}
</script>

<style>
@import '../../assets/css/staff.scss';
</style>

<style lang="scss" scoped>
.edit {
    display: inline-block;
    position: absolute;
    top: 64px;
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
.example {
    display: flex;
    align-items: center;
}

.page {
    margin-left: 0px!important;
}
</style>

