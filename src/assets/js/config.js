import Cookies from 'js-cookie'
import redirect from "./bootstrap";

let config = {
        tokenString: 'CORVUS-ACCESS-TOKEN',
        apiUrl: 'https://sandbox-api-crm.papitube.com',
        imgUrl: 'https://res-crm.papitube.com/',

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

        companyType: Cookies.get('companyType'),

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
        classifyArr:[
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
            },
            {
                name: '类型1',
                value: 3
            },
        ],

        taskLevelArr: [
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
            },
        ],

        taskStatusArr: [
            {
                name: '进行中',
                value: 1
            },
            {
                name: '已完成',
                value: 2
            },
            {
                name: '已停止',
                value: 3
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
            {
                name: 'papi项目',
                value: 4
            },
            {
                name: '基础项目',
                value: 5
            },
        ],
        projectStatusArr: [
            {
                name: '进行中',
                value: 1
            },
            {
                name: '已完成',
                value: 2
            },
            {
                name: '撤单',
                value: 3
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
            {
                name: 'papi客户',
                value: 4
            },
        ],
        // 员工状态
        staffStatus: [
            {
                value: 1,
                name: '在职',
            },
            {
                value: 2,
                name: '离职',
            },
            {
                value: '',
                name: '全部',
            }
        ],
        // 员工类型
        staffType: [
            {
                value: 1,
                name: '正式员工'
            },
            {
                value: 2,
                name: '实习生'
            },
            {
                value: 3,
                name: '管培生'
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

            //沟通状态
        artistStatusArr: [
            {
                name: '已签约',
                value: 1
            },
            {
                name: '经理人沟通中',
                value: 2
            },
            {
                name: '兼职星探沟通中',
                value: 3
            },
            {
                name: '待定',
                value: 4
            },
            {
                name: '淘汰',
                value: 5
            },
            {
                name: '合同中',
                value: 6
            },
            {
                name: '联系但无回复',
                value: 7
            },
        ],

        priorityArr: [
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
                value: 0
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
        trailStatusArr: [
            {
                name: '开始接洽',
                value: 1
            },
            {
                name: '主动拒绝',
                value: 2
            },
            {
                name: '客户拒绝',
                value: 3
            },
            {
                name: '进入谈判',
                value: 4
            },
            {
                name: '意向签约',
                value: 5
            },
            {
                name: '签约中',
                value: 6
            },
            {
                name: '签约完成',
                value: 7
            },
            {
                name: '待执行',
                value: 8
            },
            {
                name: '在执行',
                value: 9
            },
            {
                name: '已执行',
                value: 10
            },
            {
                name: '客户回款',
                value: 11
            },
            {
                name: '客户反馈分析及项目复盘',
                value: 12
            },
        ],
        papiCommunicationStatusArr: [
            {
                name: '初步接触',
                value: 1
            },
            {
                name: '沟通中',
                value: 2
            },
            {
                name: '合同中',
                value: 3
            },
            {
                name: '沟通完成',
                value: 4
            },
        ],
        taiyangCommunicationStatusArr: [
            {
                name: '已签约',
                value: 1
            },
            {
                name: '经理人沟通中',
                value: 2
            },
            {
                name: '兼职星探沟通中',
                value: 3
            },
            {
                name: '待定',
                value: 4
            },
            {
                name: '淘汰',
                value: 5
            },
            {
                name: '合同中',
                value: 6
            },
            {
                name: '联系但无回复',
                value: 7
            },
        ],
        yesOrNoArr: [
            {
                name: '是',
                value: 1
            },
            {
                name: '否',
                value: 0
            }
        ],
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
                value: 1
            },
            {
                name: '独白视频',
                value: 1
            },
            {
                name: '艺人规划',
                value: 1
            },
            {
                name: '自我介绍视频',
                value: 1
            },
            {
                name: '其他',
                value: 1
            },

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
                value: 1
            },
            {
                name: '公开',
                value: 0
            }
        ],
        remindArr: [
            {
                name: '无',
                value: 0
            },
            {
                name: '日程发生时',
                value: 1
            },
            {
                name: '5分钟前',
                value: 2
            },
            {
                name: '10分钟给前',
                value: 3
            },
            {
                name: '15分钟前',
                value: 4
            },
            {
                name: '30分钟前',
                value: 5
            },
            {
                name: '1小时前',
                value: 6
            },
            {
                name: '2小时前',
                value: 7
            },
            {
                name: '1天前',
                value: 8
            },
            {
                name: '2天前',
                value: 9
            }
        ],
        meetingRomeArr: [
            {
                name: '1801会议室',
                value: 1
            },
            {
                name: '1802会议室',
                value: 2
            },
            {
                name: '1803会议室',
                value: 3
            },
        ],
        repeatArr: [
            {
                name: '从不重复',
                value: 1
            },
            {
                name: '每天',
                value: 2
            },
            {
                name: '每周',
                value: 3
            },
            {
                name: '每月',
                value: 4
            },
        ],
        colorArr: ['FFCDD2', 'F06293', 'FDD835', 'FB8C00', 'FFB300', 'E53935', 'D81B60', '8E25AA', '5E35B1', '02ACC1', '1D88E5', '3A49AB', '546E7A', '757575', '6D4C41'],
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
        // 汇报对象
        eportArr: [
            {
                name: '总裁办',
                value: 1
            },
            {
                name: 'CEO',
                value: 2
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
        ]
    }
;

export default config
