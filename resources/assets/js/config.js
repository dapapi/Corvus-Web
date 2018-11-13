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


};

export default config