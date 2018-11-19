import config from "./config";
import redirect from './bootstrap';
import fetch from '../utils/fetch'

const { sexArr, maritalStatusArr, nationalityArr } = config

let tempArr = []
for (let i = 0; i < nationalityArr.length; i++) {
	let temp = {}
	temp.name = nationalityArr[i]
	temp.value = i + 1
	tempArr.push(temp)
}

let app = new Vue({
	el: '#root',
	data: {
		sexArr: sexArr,
		maritalStatusArr: maritalStatusArr,
		nationalityArr: tempArr,
		nameCN: '',
		nameEN: '',
		sex: '',
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
	},

	watch: {
		education () {
			console.log(this.education)
		}
	},

	mounted () {
		// 深拷贝添加数组，否则改变一个会影响其他的数组
		let tempInfoArr = ['education', 'work', 'home', 'train']
		tempInfoArr.map((n) => {
			for (let i = 0; i < 4; i++) {
				this[n].tBody.push(JSON.parse(JSON.stringify(this[n+'Info'])))
			}
		})
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
		// 提交
		submit () {
			// todo
			let params = {
				name: this.nameCN,
				en_name: this.nameEN,
				gender: this.sex,
				id_number: this.IDNum,
				phone: this.phoneNum,
				political: this.politicalFace,
				marriage: this.maritalStatus,
				cadastral_address: this.homeAddress,
				national: this.nationality,
				current_address: this.householdAddress,
				birty_time: this.birthDay,
				entty_time: this.entryTime,
				bloodType: this.bloodType,
				email: this.email,
				language_level: this.foreignLanguageLevel,
				certificate: this.certificate,
				computer_level: this.computerSkill,
				specialty: this.specialty,
				remark: this.remarks,
				disease: this.isIll,
				pregnancy: this.isPregnancy,
				migration: this.agreeMove
			}
			fetch('post', '/personnel' ,params).then(result => {
				console.log(result)
			})
		}
	}
});