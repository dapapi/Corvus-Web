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
            value: 'S'
        },
        {
            name: 'A',
            value: 'A'
        },
        {
            name: 'B',
            value: 'B'
        },
        {
            name: 'C',
            value: 'C'
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
    cooperationType: [
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
            value: 2
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


};

export default config