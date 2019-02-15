import Cookies from 'js-cookie'
import redirect from "./bootstrap";

let config = {
        tokenString: 'CORVUS-ACCESS-TOKEN',
        // apiUrl: '/api/',
        apiUrl: 'https://test-api-crm.papitube.com',
        imgUrl: 'https://res-crm.papitube.com/',
        socketUrl: 'wss://sandbox-corvus.papitube.com:8081',

        getHeaders: function () {
            let headers = {
                'Accept': 'application/vnd.Corvus.v1+json',
                'Access-Control-Expose-Headers': 'Location',
                'Access-Control-Allow-Headers': 'Authorization'
            };
            let token = this.getAccessToken();
            if (token) {
                headers.Authorization = 'Bearer ' + token
            }
            return headers
        },
        getAccessToken: function () {
            return Cookies.get(this.tokenString)
        },
        setAccessToken: function (token) {
            Cookies.set(this.tokenString, token)
        },
        deleteAccessToken: function () {
            Cookies.remove(this.tokenString);
        },

        clientId: '2',
        clientSecret: 'B7l68XEz38cHE8VqTZPzyYnSBgo17eaCRyuLtpul',
        getStatusCode: function () {
            let that = this;
            return {
                401: function () {
                    Cookies.remove(that.tokenString);
                    redirect('/login')
                },
                403: function () {
                    redirect('/errors/403')
                },
                404: function () {
                    redirect('/errors/404')
                },
                500: function () {
                    redirect('/errors/500')
                },
                503: function () {
                    redirect('/errors/503')
                }
            }
        },

        trailOrigin: [
            {
                name: '商务邮箱',
                value: 1
            },
            {
                name: '工作室邮箱',
                value: 2
            },
            {
                name: '微信公众号',
                value: 3
            },
            {
                name: '员工',
                value: 4
            },
            {
                name: '公司高管',
                value: 5
            },
            {
                name: '纯中介',
                value: 6
            },
            {
                name: '香港中介',
                value: 7
            },
            {
                name: '台湾中介',
                value: 8
            },
            {
                name: '复购直客',
                value: 9
            },
            {
                name: '媒体介绍',
                value: 10
            },
            {
                name: '公关or广告公司',
                value: 11
            }
        ],
        trailBloggerOrigin: [
            {
                name: '个人',
                value: '4'
            },
            {
                name: '商务邮箱/微信',
                value: '1'
            },
            {
                name: '高层推荐',
                value: '5'
            }
        ],
        trailTypeArr: [
            {
                name: '影视线索',
                value: 1
            },
            {
                name: '综艺线索',
                value: 2
            },
            {
                name: '商务线索',
                value: 3
            },
            {
                name: 'papi线索',
                value: 4
            },
        ],
        publicTrailTypeArr: [
            {
                name: '全部',
                value: ''
            },
            {
                name: '影视公海池',
                value: 1
            },
            {
                name: '综艺公海池',
                value: 2
            },
            {
                name: '商务公海池',
                value: 3
            },
        ],
        publicTrailTakeType: [
            {
                name: '全部',
                value: ''
            },
            {
                name: '未领取',
                value: 1
            },
            {
                name: '已领取',
                value: 2
            },
        ],
        classifyArr: [
            {
                name: '规则制度',
                value: 1
            },
            {
                name: '内部公告',
                value: 2
            }
        ],
        customizeInfo: [
            {
                id: 0,
                name: '选择条件',
                value: 0,
                child: [
                    {
                        name: '选择对应关系',
                        value: 0
                    }
                ],
                type: 'disable'
            },
            {
                id: 1,
                name: '负责人',
                value: 1,
                child: [
                    {
                        name: '等于',
                        value: 1
                    }
                ],
                type: 'person'
            },
            {
                id: 2,
                name: '下次跟进时间',
                value: 2,
                child: [
                    {
                        name: '等于',
                        value: 1
                    },
                    {
                        name: '大于',
                        value: 2
                    },
                ],
                type: 'date'
            },
            {
                id: 3,
                name: '未跟进天数',
                value: 3,
                child: [
                    {
                        name: '等于',
                        value: 1
                    },
                    {
                        name: '大于',
                        value: 2
                    },
                    {
                        name: '大于等于',
                        value: 2
                    },
                ],
                type: 'number'
            },
        ],

        taskTypeArr: [
            {
                name: '跑组',
                value: 1
            },
            {
                name: '试戏',
                value: 2
            }
        ],

        taskLevelArr: [
            {
                name: 'S',
                value: 4
            },
            {
                name: 'A',
                value: 3
            },
            {
                name: 'B',
                value: 2
            },
            {
                name: 'C',
                value: 1
            },
        ],

        //任务状态
        taskStatusArr: [
            {
                name: '进行中',
                value: 1,
                color: '#FF9800'
            },
            {
                name: '已完成',
                value: 2,
                color: '#4CAF50'
            },
            {
                name: '已停止',
                value: 3,
                color: '#9E9E9E'
            },
            {
                name: '延期',
                value: 4,
                color: '#F44336'
            }
        ],

        clientLevelArr: [
            {
                name: '直客',
                value: 1
            },
            {
                name: '代理公司',
                value: 2
            }
        ],
        projectTypeArr: [
            {
                name: '影视项目',
                value: 1
            },
            {
                name: '综艺项目',
                value: 2
            },
            {
                name: '商务项目',
                value: 3
            },
            // {
            //     name: 'papi项目',
            //     value: 4
            // },
            {
                name: '基础项目',
                value: 5
            },
        ],

        // 项目状态
        projectStatusArr: [
            {
                name: '进行中',
                value: 1,
                color: '#FF9800'
            },
            {
                name: '已完成',
                value: 2,
                color: '#4CAF50'
            },
            {
                name: '撤单',
                value: 3,
                color: '#9E9E9E'
            }
        ],
        clientScaleArr: [
            {
                name: '上市公司',
                value: 1
            },
            {
                name: '500强',
                value: 2
            },
        ],
        clientTypeArr: [
            {
                name: '影视客户',
                value: 1
            },
            {
                name: '综艺客户',
                value: 2
            },
            {
                name: '商务客户',
                value: 3
            },
            // {
            //     name: 'papi客户',
            //     value: 4
            // },
        ],
        // 员工状态
        staffStatus: [
            {
                value: 1,
                name: '试用期',
            },
            {
                value: 2,
                name: '已转正',
            },
            {
                value: 3,
                name: '已离职',
            },
            {
                value: 4,
                name: '实习期',
            },
        ],
        // 员工在职状态
        staffPositionStatus: [
            {
                value: 1,
                name: '在职',
            },
            {
                value: 2,
                name: '离职',
            },
        ],
        // 聘用形式
        hireShape: [
            {
                value: 1,
                name: '劳务'
            },
            {
                value: 2,
                name: '劳动'
            },
            {
                value: 3,
                name: '实习'
            },
            {
                value: 4,
                name: '外包'
            }
        ],
        // 婚姻状况
        maritalStatusArr: [
            {
                name: '未婚',
                value: 1,
            }, {
                name: '已婚',
                value: 2,
            }
        ],
        nationalityArr: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族",
            "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族",
            "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族",
            "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"], // 民族

        // 艺人沟通状态
        artistStatusArr: [
            {
                name: '全部',
                value: '',
                color: ''
            },
            {
                name: '已签约',
                value: 1,
                color: '#4CAF50'
            },
            {
                name: '经理人沟通中',
                value: 2,
                color: "#00BCD4"
            },
            {
                name: '兼职星探沟通中',
                value: 3,
                color: "#00B0FF"
            },
            {
                name: '待定',
                value: 4,
                color: '#FF9800'
            },
            {
                name: '淘汰',
                value: 5,
                color: '#9e9e9e'
            },
            {
                name: '合同中',
                value: 6,
                color: '#9c27b0'
            },
            {
                name: '联系但无回复',
                value: 7,
                color: '#f44336'
            },
        ],

        priorityArr: [
            // {
            //     name: '无',
            //     value: 0
            // },
            {
                name: '高',
                value: 1
            },
            {
                name: '中',
                value: 2
            },
            {
                name: '低',
                value: 3
            }
        ],

        levelArr: [
            {
                name: 'S',
                value: 4
            },
            {
                name: 'A',
                value: 3
            },
            {
                name: 'B',
                value: 2
            },
            {
                name: 'C',
                value: 1
            }
        ],

        lockArr: [
            {
                name: '否',
                value: 2
            },
            {
                name: '是',
                value: 1
            }
        ],
        cooperationTypeArr: [
            {
                name: '代言',
                value: 1
            },
            {
                name: '合作',
                value: 2
            },
            {
                name: '活动',
                value: 3
            },
            {
                name: '微博',
                value: 4
            },
            {
                name: '抖音',
                value: 5
            },
            {
                name: '短期代言',
                value: 6
            },
            {
                name: '时装周',
                value: 7
            },
            {
                name: '未确定',
                value: 8
            }
        ],
        //销售线索状态
        trailStatusArr: [
            {
                name: '开始接洽',
                value: 1,
                color: '#00b0ff'
            },
            {
                name: '主动拒绝',
                value: 2,
                color: '#9e9e9e'
            },
            {
                name: '客户拒绝',
                value: 3,
                color: '#f44336'
            },
            {
                name: '进入谈判',
                value: 4,
                color: '#00bcd4'
            },
            {
                name: '意向签约',
                value: 5,
                color: '#f44336'
            },
            {
                name: '签约中',
                value: 6,
                color: '#ff9800'
            },
            {
                name: '签约完成',
                value: 7,
                color: '#4caf50'
            },
            {
                name: '待执行',
                value: 8,
                color: '#ff9800'
            },
            {
                name: '在执行',
                value: 9,
                color: '#00bcd4'
            },
            {
                name: '已执行',
                value: 10,
                color: '#4caf50'
            },
            {
                name: '客户回款',
                value: 11,
                color: '#9c27b0'
            },
            {
                name: '客户反馈分析及项目复盘',
                value: 12,
                color: '#3f51b5'
            },
        ],
        // papi沟通状态
        papiCommunicationStatusArr: [
            {
                name: '全部',
                value: '',
                color: ''
            },
            {
                name: '初步接触',
                value: 1,
                color: '#00bcd4'
            },
            {
                name: '沟通中',
                value: 2,
                color: '#00b0ff'
            },
            {
                name: '合同中',
                value: 3,
                color: '#ff9800'
            },
            {
                name: '沟通完成',
                value: 4,
                color: '#4caf50'
            },
        ],
        //泰洋艺人沟通状态
        taiyangCommunicationStatusArr: [
            {
                name: '已签约',
                value: 1,
                color: '#4caf50'
            },
            {
                name: '经理人沟通中',
                value: 2,
                color: '#00bcd4'
            },
            {
                name: '兼职星探沟通中',
                value: 3,
                color: '#00b0ff'
            },
            {
                name: '待定',
                value: 4,
                color: '#ff9800'
            },
            {
                name: '淘汰',
                value: 5,
                color: '#9e9e9e'
            },
            {
                name: '合同中',
                value: 6,
                color: '#9c27b0'
            },
            {
                name: '联系但无回复',
                value: 7,
                color: '#f44336'
            },
        ],
        yesOrNoArr: [
            {
                name: '是',
                value: 1
            },
            {
                name: '否',
                value: 2
            }
        ],
        //社交平台
        platformArr: [{
            value: 1,
            name: '微博'
        }, {
            value: 2,
            name: '抖音'
        }, {
            value: 3,
            name: '小红书',
        }, {
            value: ["1", "2", "3"],
            name: ('微博', '抖音', '小红书')
        }],
        // 性别
        genderArr: [
            {
                name: '男',
                value: 1
            },
            {
                name: '女',
                value: 2
            }
        ],
        //艺人来源
        artistSourceArr: [
            {
                name: '全部',
                value: ''
            },
            {
                name: '线上',
                value: 1
            },
            {
                name: '线下',
                value: 2
            },
            {
                name: '抖音',
                value: 3
            },
            {
                name: '微博',
                value: 4
            },
            {
                name: '陈赫',
                value: 5
            },
            {
                name: '北电',
                value: 6
            },
            {
                name: '杨光',
                value: 7
            },
            {
                name: '中戏',
                value: 8
            },
            {
                name: 'papitube推荐',
                value: 9
            },
            {
                name: '地标商圈',
                value: 10
            },
        ],
        attachmentTypeArr: [
            {
                name: '艺人简报',
                value: 2
            },
            {
                name: '独白视频',
                value: 3
            },
            {
                name: '艺人规划',
                value: 4
            },
            {
                name: '自我介绍视频',
                value: 5
            },
            {
                name: '其他',
                value: 6
            }

        ],
        workTypeArr: [
            {
                name: '电影',
                value: 1
            },
            {
                name: '电视剧',
                value: 2
            },
            {
                name: '综艺',
                value: 3
            },
            {
                name: '网剧',
                value: 4
            }
        ],
        visibleRangeArr: [
            {
                name: '私有',
                value: '1'
            },
            {
                name: '公开',
                value: '0'
            }
        ],
        remindArr: [
            {
                name: '无',
                value: 1
            },
            {
                name: '日程发生时',
                value: 2
            },
            {
                name: '5分钟前',
                value: 3
            },
            {
                name: '10分钟前',
                value: 4
            },
            {
                name: '15分钟前',
                value: 5
            },
            {
                name: '30分钟前',
                value: 6
            },
            {
                name: '1小时前',
                value: 7
            },
            {
                name: '2小时前',
                value: 8
            },
            {
                name: '1天前',
                value: 9
            },
            {
                name: '2天前',
                value: 10
            }
        ],
        repeatArr: [
            {
                name: '从不重复',
                value: 0
            },
            {
                name: '每天',
                value: 1
            },
            {
                name: '每周',
                value: 2
            },
            {
                name: '每月',
                value: 3
            },
        ],
        colorArr: ['#FF40D0', '#F06293', '#FDD420', '#FB8C00', '#FFB300', '#E53935', '#EC407A', '#8E25AA', '#6520FF', '#28CC2D', '#27D3A8', '#448AFF', '#536DFE', '#01B0FF', '#304FFE'],
        // 聘用形式
        employment: {
            1: '正式',
            2: '实习生',
            3: '管培生',
            4: '外包'
        },
        refuseTypeArr: [
            {
                name: '我方拒绝',
                value: 1
            },
            {
                name: '他方拒绝',
                value: 2
            }
        ],
        // 工作状态
        workStatus: {
            1: '试用期',
            2: '已转正',
            3: '离职',
            4: '实习期',
            5: '外包',
        },
        // 血型
        bloodTypeArr: [
            {
                name: 'A',
                value: 1
            },
            {
                name: 'B',
                value: 2
            },
            {
                name: 'AB',
                value: 3
            }, {
                name: 'O',
                value: 4
            }
        ],
        // 公司
        companyArr: [
            {
                name: '泰洋川禾',
                value: 1
            }, {
                name: '泰洋明山',
                value: 2
            }, {
                name: '春雨听雷',
                value: 3
            }, {
                name: '泰洋星河',
                value: 4
            }
        ],
        // 工作地点
        workPlaceArr: [
            {
                name: '北京市朝阳区诺金中心',
                value: 1
            }, {
                name: '北京市朝阳区梵石iTOWN',
                value: 2
            }, {
                name: '上海市',
                value: 3
            }, {
                name: '广东省深圳市',
                value: 4
            }
        ],
        // 转正状态
        positiveStateArr: [
            {
                name: '已转正',
                value: 1
            },
            {
                name: '试用期',
                value: 2
            }
        ],
        companyCityArr: [
            {
                name: '北京总部',
                value: 1
            },
            {
                name: '上海分部',
                value: 2
            },
            {
                name: '深圳分部',
                value: 3
            }
        ],
        //  招聘渠道
        recruitWayArr: [
            {
                name: '拉勾网',
                value: 1
            },
            {
                name: '猎聘网',
                value: 2
            },
            {
                name: '智联招聘',
                value: 3
            }
        ],
        // 招聘方式
        recruitTypeArr: [
            {
                name: '校招',
                value: 1
            },
            {
                name: '社招',
                value: 2,
            }
        ],
        // 个税缴纳方式
        incomeTaxTypeArr: [
            {
                name: '正常酬金个税',
                value: 1
            },
            {
                name: '劳务报酬所得',
                value: 2,
            },
            {
                name: '其他',
                value: 3
            }
        ],
        personnelCategoryArr: [
            {
                name: '正式',
                value: 1
            },
            {
                name: '劳务',
                value: 2,
            },
            {
                name: '实习',
                value: 3
            }
        ],
        payMethodsArr: [
            {
                name: '现金',
                value: 1
            },
            {
                name: '刷卡',
                value: 2
            },
            {
                name: '转账',
                value: 3
            },
            {
                name: '其他',
                value: 4
            }
        ],
        invoiceTypeArr: [
            {
                name: '增值税普通发票',
                value: 1
            },
            {
                name: '增值税专用发票',
                value: 2
            }
        ],
        artistSocialPlatform: [
            {
                name: '微博',
                value: 1
            },
            {
                name: '抖音',
                value: 2
            },
            {
                name: '小红书',
                value: 3
            }
        ],
        // 签约状态
        signState: [
            {
                name: '签约中',
                value: 1,
                color: '#ff9800'
            },
            {
                name: '已签约',
                value: 2,
                color: '#4caf50'
            },
            {
                name: '已解约',
                value: 3,
                color: '#f44336'
            }
        ],

        // 合同状态
        contractState: [
            {
                name: '待审批',
                value: 1,
                color: '#ff9800'
            },
            {
                name: '已同意',
                value: 2,
                color: '#4caf50'
            },
            {
                name: '已拒绝',
                value: 3,
                color: '#f44336'
            },
            {
                name: '已撤销',
                value: 4,
                color: '#eeeeee'
            },
            {
                name: '已作废',
                value: 5,
                color: '#eeeeee'
            }
        ],

        // 审批状态（合同）
        approvalState: [
            {
                name: '待审批',
                value: 1,
                color: '#ff9800'
            },
            {
                name: '已同意',
                value: 2,
                color: '#4caf50'
            },
            {
                name: '已拒绝',
                value: 3,
                color: '#f44336'
            },
            {
                name: '已撤销',
                value: 4,
                color: '#eeeeee'
            },
            {
                name: '已作废',
                value: 5,
                color: '#eeeeee'
            }

        ],
        //简报 --频次
        briefTime: [
            {
                value: 1,
                name: '每天'
            },
            {
                value: 2,
                name: '每周'
            },
            {
                value: 3,
                name: '每月'
            },
            {
                value: 4,
                name: '每季'
            },
            {
                value: 5,
                name: '每年'
            },
        ],
        //简报问题--类型
        briefType: [
            {
                value: 1,
                name: '文本'
            },
            {
                value: 2,
                name: '数字'
            },
            {
                value: 3,
                name: '日期'
            },
            {
                value: 4,
                name: '任务'
            },
            {
                value: 5,
                name: '附件'
            },

        ],
        //季节
        season: [
            {
                value: 1,
                name: '第1季度',
                start: '1月1日',
                end: '3月31日',
                startTime: '1-1',
                endTime: '3-31'

            },
            {
                value: 2,
                name: '第2季度',
                start: '4月1日',
                end: '6月30日',
                startTime: '4-1',
                endTime: '6-30'
            },
            {
                value: 3,
                name: '第3季度',
                start: '7月1日',
                end: '9月30日',
                startTime: '7-1',
                endTime: '9-30'

            },
            {
                value: 4,
                name: '第4季度',
                start: '10月1日',
                end: '12月31日',
                startTime: '10-1',
                endTime: '12-31'

            }
        ],
        // 是否是关键决策人
        isKeyMasterArr: [
            {
                name: '是',
                value: 2
            },
            {
                name: '否',
                value: 1
            }
        ],
        week: [
            {
                name: '日',
                value: 0

            },
            {
                name: '一',
                value: 1
            },
            {
                name: '二',
                value: 2
            },
            {
                name: '三',
                value: 3
            },
            {
                name: '四',
                value: 4
            },
            {
                name: '五',
                value: 5
            },
            {
                name: '六',
                value: 6
            }
        ],
        // 部门所属城市
        departmentCityArr: [
            {
                name: '北京',
                value: 1,
            }, {
                name: '上海',
                value: 2
            }
        ],
        // 学历
        schoolRecordArr: [
            {
                name: '博士',
                value: 1,
            },
            {
                name: '硕士',
                value: 2,
            },
            {
                name: '本科',
                value: 3,
            },
            {
                name: '大专',
                value: 4,
            },
            {
                name: '高中',
                value: 5,
            },
            {
                name: '中专/中技',
                value: 6,
            },
            {
                name: '初中及以下',
                value: 7,
            }
        ],
        //消息模块link
        msgLink:[
            {
                value: '207',
                name: '/artists',//艺人管理
                url: '/stars/'
            },
            {
                 value: '208',
                 name: '/blogger', //博主管理
                 url: '/bloggers/'
            },
            {
              value: '209',
              name: '/trails', //销售线索管理
              url: '/trails/'
            },
            {
              value: '210',
              name: '/clients', //客户管理
              url: '/clients/'
            },
            {
              value: '211',
              name: '/projects', //项目管理
              url: '/projects/'
            },
            {
              value: '212',
              name: '/tasks', //任务管理
              url: '/tasks/'
            },
            {
              value: '213',
              name: '/approval', //合同管理
              url: '/approval_instances/'
            },
            {
              value: '214',
              name: '/calendar', //日历管理
              url: '/calendar/'
            },
            {
              value: '216',
              name: '/approval', //审批管理
              url: '/approval_instances/'
            },
            {
              value: '218',
              name: '/broadcast', //公告
              url: '/announcements/'
            },
        ]


    }
;

export default config
