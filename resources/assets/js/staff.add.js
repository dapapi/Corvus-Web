import config from "./config";
import redirect from './bootstrap';

const { sex } = config

let app = new Vue({
        el: '#root',
        data: {
			sexArr: sex,
            education: {
				tHead: [{
						key: 'school',
						value:'学校',
					}, {
						key: 'profession',
						value:'专业',
					}, {
						key: 'beginDate',
						value:'入学时间',
					}, {
						key: 'endDate',
						value: '离校时间',
					}, {
						key: 'graduation',
						value:'是否毕业',
					}, {
						key: 'degree',
						value: '所获学位'
					},
				],
				tBody: [
					[,,,,,,]
				]
			},
			train: {
				tHead: [{
						key: 'trainCourse',
						value:'培训课程名称',
					}, {
						key: 'trainOrg',
						value:'培训机构名称',
					}, {
						key: 'place',
						value:'地点',
					}, {
						key: 'trainDate',
						value: '受训时间',
					}
				],
				tBody: [
					[,,,,]
				]
			},
			work: {
				tHead: [
					{
						key: 'companyName',
						value:'单位名称',
					}, {
						key: 'department',
						value:'部门',
					}, {
						key: 'position',
						value:'职位',
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
				tBody: [
					[,,,,,,,]
				]
			},
			home: {
				tHead: [
					{
						key: 'name',
						value:'姓名',
					}, {
						key: 'relationShip',
						value:'与本人关系',
					}, {
						key: 'birthDay',
						value:'出生日期',
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
				tBody: [
					[,,,,,,]
				]
			},
			isIll: '',
			isPregnancy: '',
			agreeMove: '',
			remarks: '',
		},

        mounted() {
		},

        methods: {
        }
    })
;