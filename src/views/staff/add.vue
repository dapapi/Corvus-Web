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
                        <div class="edit">
                            <i v-if="!isEdit" @click="editInfo" class="icon md-edit"></i>
                            <template v-else>
                                <span class="save" @click="save">保存</span> <span class="cancel" @click="cancel">取消</span>
                            </template>
                        </div>
                        <div class="formName pd-b-15">个人资料 <span class="point"></span><span class="note">为必填项</span></div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">姓名(中文)</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" :disabled="(!!userId) && !isEdit" v-model="nameCN" placeholder="1-30个字符" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">姓名(英文)</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" :disabled="(!!userId) && !isEdit" v-model="nameEN" placeholder="1-30个字符" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">性别</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <selectors :options="genderArr" change-key="gender" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">身份证号</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" :disabled="(!!userId) && !isEdit" placeholder="" v-model="IDNum" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left"></div>
                                    <div class="col-md-8 float-left pl-0">
                                        <upload @change="uploadImg">
                                            <div class="upload-head">
                                                {{ !avatar ? '上传头像':null }}
                                                <img v-if="avatar" :src="avatar" alt="头像" />
                                            </div>
                                        </upload>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" style="margin-top: -20px;">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">手机号</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="phoneNum" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">入职时间</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                    <datepicker change-key="entryTime" @select="changeState"></datepicker>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">政治面目</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="politicalFace" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">婚姻状况</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <selectors :options="maritalStatusArr" change-key="maritalStatus" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">电子邮件</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="email" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" style="margin-top: -20px;">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">出生日期</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <datepicker change-key="birthDay" @select="changeState"></datepicker>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">户籍所在地详细地址</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" placeholder="" v-model="householdAddress" class="form-control">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">民族</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <selectors :options="nationalityArr" change-key="nationality" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">血型</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <selectors :options="bloodTypeArr" change-key="bloodType" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">现居住地址</div>
                                    <div class="col-md-8 float-left pl-0 require">
                                        <input type="text" v-model="homeAddress" placeholder="" class="form-control">
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
                                        <input type="text" v-model="foreignLanguageLevel" placeholder="" class="form-control" />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">所获证书</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="certificate" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">计算机水平</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="computerSkill" placeholder="" class="form-control" />
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-3 text-right float-left">个人特长</div>
                                    <div class="col-md-8 float-left pl-0">
                                        <input type="text" v-model="specialty" placeholder="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="formName pd-b-15">教育背景 <i class="icon md-plus add-icon" @click="tableAdd('education')"></i></div>
                        <div class="example table-responsive padding15">
                            <!-- <mtp-table :data-source="education" :columns="eduColumns" /> -->
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in education.tHead" :key="index">{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in education.tBody" :key="index">
                                        <td v-for="(item, key, _index) in items" :key="index + '_' + _index">
                                            <!-- <input type="text" v-model="education.tBody[index]" /> -->
                                            <input type="text" v-model="education.tBody[index][key]" />
                                            <!-- @{{ item }} -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">培训经历<i class="icon md-plus add-icon" @click="tableAdd('train')"></i></div>
                        <div class="example table-responsive padding15">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in train.tHead" :key="index">{{ item.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items, index) in train.tBody" :key="index">
                                        <td v-for="(item, _index) in items" :key="_index">
                                            <input type="text" v-model="train.tBody[index][_index]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">
                            任职履历<span class="note" style="margin-left: 16px;">从最近的任职单位开始填写</span>
                            <i class="icon md-plus add-icon" @click="tableAdd('work')"></i>
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
                                        <td v-for="(item, _index) in items" :key="_index">
                                            <input type="text" v-model="work.tBody[index][_index]" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="formName pd-b-15">家庭资料
                            <span class="note" style="margin-left: 16px;">请列出直系亲属资料和紧急联系人信息</span>
                            <i class="icon md-plus add-icon" @click="tableAdd('home')"></i>
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
                                        <td v-for="(item, _index) in items" :key="_index">
                                            <input type="text" v-model="home.tBody[index][_index]" />
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
                                    <input type="radio" id="inputRadiosCheckedOne" value="1" name="inputRadioOne" v-model="isIll">
                                    <label for="inputRadiosCheckedOne">是</label>&nbsp;&nbsp;
                                    <input type="radio" id="inputRadiosUncheckedOne" value="2" name="inputRadioOne" v-model="isIll">
                                    <label for="inputRadiosUncheckedOne">否</label>
                                </div>
                            </div>
                            <div class="col-md-7" style="margin-top: 4px;">2、如属女性，请说明是否怀孕？</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" id="inputRadiosCheckedTwo" value="1" name="inputRadioTwo" v-model="isPregnancy">
                                    <label for="inputRadiosCheckedTwo">是</label>&nbsp;&nbsp;
                                    <input type="radio" id="inputRadiosUncheckedTwo" value="2" name="inputRadioTwo" v-model="isPregnancy">
                                    <label for="inputRadiosUncheckedTwo">否</label>
                                </div>
                            </div>
                            <div class="col-md-7" style="margin-top: 4px;">3、是否同意工作迁移到集团其他城市</div>
                            <div class="col-md-5">
                                <div class="checkbox-custom checkbox-primary staff-radio">
                                    <input type="radio" id="inputRadiosCheckedThree" value="1" name="inputRadioThree" v-model="agreeMove">
                                    <label for="inputRadiosCheckedThree">是</label>&nbsp;&nbsp;
                                    <input type="radio" id="inputRadiosUncheckedThree" value="2" name="inputRadioThree" v-model="agreeMove">
                                    <label for="inputRadiosUncheckedThree">否</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="formName pd-b-15">其他备注</div>
                        <div class="example padding15">
                            <textarea class="form-control" rows="4" v-model="remarks"></textarea>
                        </div>
                        
                        <div class="modal-footer">
                            <!-- <button class="btn btn-sm btn-white btn-pure waves-effect waves-classic" data-dismiss="modal"  @click="handleCancel">取消</button> -->
                            <button class="btn btn-primary waves-effect waves-classic" type="submit" @click="submit">提交</button>
                        </div>
                    </div>

                    <div class="tab-pane" id="exampleTabsTwo" role="tabpanel">
                        <div style="color: #01bcd4; cursor: pointer">http://www.iconfont.cn/search/index?q=</div>
                        点击复制此链接
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
            isEdit: false,
            userId: '',
            genderArr: genderArr,
            maritalStatusArr: maritalStatusArr,
            nationalityArr: tempArr,
            bloodTypeArr: bloodTypeArr,
            nameCN: '',
            nameEN: '',
            gender: '',
            IDNum: '',
            phoneNum: '',
            entryTime: '', // 入职时间
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
                profession: '',
                beginDate: '',
                endDate: '',
                graduation: '',
                degree: ''
            },
            trainInfo: {
                trainCourse: '',
                trainOrg: '',
                place: '',
                trainDate: '',
            },
            workInfo: {
                companyName: '',
                department: '',
                position: '',
                entryDate: '',
                separationTime: '',
                salary: '',
                reason: '',
            },
            homeInfo: {
                name: '',
                relationShip: '',
                birthDay: '',
                employer: '',
                position: '',
                phoneNum: '',
            },
            education: {
                tHead: [
                    {
                        key: 'school',
                        value: '学校',
                    }, {
                        key: 'profession',
                        value: '专业',
                    }, {
                        key: 'beginDate',
                        value: '入学时间',
                    }, {
                        key: 'endDate',
                        value: '离校时间',
                    }, {
                        key: 'graduation',
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
                        key: 'trainCourse',
                        value: '培训课程名称',
                    }, {
                        key: 'trainOrg',
                        value: '培训机构名称',
                    }, {
                        key: 'place',
                        value: '地点',
                    }, {
                        key: 'trainDate',
                        value: '受训时间',
                    }
                ],
                tBody: []
            },
            work: {
                tHead: [
                    {
                        key: 'companyName',
                        value: '单位名称',
                    }, {
                        key: 'department',
                        value: '部门',
                    }, {
                        key: 'position',
                        value: '职位',
                    }, {
                        key: 'entryDate',
                        value: '入职时间',
                    }, {
                        key: 'separationTime',
                        value: '离职时间'
                    }, {
                        key: 'salary',
                        value: '月薪'
                    }, {
                        key: 'reason',
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
                        key: 'relationShip',
                        value: '与本人关系',
                    }, {
                        key: 'birthDay',
                        value: '出生日期',
                    }, {
                        key: 'employer',
                        value: '工作单位',
                    }, {
                        key: 'position',
                        value: '职务'
                    }, {
                        key: 'phoneNum',
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
                name: 'entryTime',
                msg: '请填写入职时间'
            }, {
                name: 'politicalFace',
                msg: '请填写政治面目'
            }, {
                name: 'maritalStatus',
                msg: '请选择婚姻状况'
            }, {
                name: 'email',
                msg: '请填写电子邮件'
            }, {
                name: 'birthDay',
                msg: '请选择出生日期'
            }, {
                name: 'householdAddress',
                msg: '请填写户籍所在地址'
            }, {
                name: 'nationality',
                msg: '请选择民族'
            }, {
                name: 'bloodType',
                msg: '请选择血型'
            }, {
                name: 'homeAddress',
                msg: '请填写现居住地址'
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
        if (route.name === 'staffEdit') {
            this.userId = route.params.id
            this.getData()
        }
        console.log(!!(this.userId && this.isEdit))
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
				birty_time: this.birthDay,
				entty_time: this.entryTime,
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
				education: [
					// {
					// 	school: 'xx',
					// 	specialty: '',
					// 	start_time: '',
					// 	end_time: '',
					// 	graduate: '',
					// 	degree: '',
					// }
				],
				training: [
					// {
					// 	address: '',
					// 	course_name: '',
					// 	certificate: '',
					// 	trained_time: '',
					// }
				],
				record: [
					// {
					// 	unit_name: '',
					// 	department: '',
					// 	position: '',
					// 	entry_time: '',
					// 	departure_time: '',
					// 	monthly_pay: '',
					// 	departure_why: ''
					// }
				],
				family: [
					// {
					// 	name: '',
					// 	relation: '',
					// 	birth_time: '',
					// 	work_units: '',
					// 	position: '',
					// 	contact_phone: ''
					// }
				]
			}
	
			fetch('post', '/personnel' ,params).then(result => {
                toastr.success('添加成功')
			})
        },
        // 获取员工数据
        getData () {
            fetch('get', `/personnel/entry/${this.userId}?include=skills,education,training,record,familyData`).then(res => {
                const data = res.data
                console.log(data)
                this.nameCN = data.name
                this.nameEN = data.en_name
                this.gender = data.gender
                this.IDNum = data.id_number
                this.phoneNum = data.phone
                this.entryTime = data.entry_time
                this.politicalFace = data.political
                this.maritalStatus = data.marriage
                this.email = data.email
                this.avatar = data.icon_url
                this.birthDay = data.birth_time
                this.householdAddress = data.current_address
                this.nationality = data.national
                this.bloodType = data.blood_type
                this.homeAddress = data.cadastral_address
                this.foreignLanguageLevel = data.language_level
                this.computerSkill = data.computer_level
                this.certificate = data.certificate
                this.specialty = data.specialty
                this.remarks = data.remark
				this.isIll = data.disease
                this.isPregnancy = data.pregnancy
				this.agreeMove = data.migration
            })
        },
        editInfo () {
            this.isEdit = !this.isEdit
        },
        save () {
            this.editInfo()
        },
        cancel () {
            this.editInfo()
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
</style>

