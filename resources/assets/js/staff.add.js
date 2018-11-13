import config from "./config";
import redirect from './bootstrap';

const { sex } = config

const education = [{
    school: '',
    profession: '计算机',
    beginDate: '2012-1-1',
    endDate: '2016-1-1',
    isGraduation: '是',
    degree: '学士'
  }, {
    school: '',
    profession: '计算机',
    beginDate: '2012-1-1',
    endDate: '2016-1-1',
    isGraduation: '是',
    degree: '学士'
  }];
  
  const eduColumns = [{
    title: '学校',
    key: 'school',
    render: '<input type="text" />',
  }, {
    title: '专业',
    key: 'profession',
  }, {
    title: '入学时间',
    key: 'beginDate',
  }, {
    title: '离校时间',
    key: 'endDate',
  }, {
    title: '是否毕业',
    key: 'isGraduation'
  }, {
    title: '所获学位',
    key: 'degree'
  }];

let app = new Vue({
        el: '#root',
        data: {
            sexArr: sex,
            education: education,
            eduColumns: eduColumns
        },

        mounted() {
        },
 
        methods: {
        }
    })
;