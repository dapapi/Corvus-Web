import Cookies from 'js-cookie'
import redirect from "./bootstrap";

let config = {
    tokenString: 'CORVUS-ACCESS-TOKEN',
    apiUrl: 'https://sandbox-api-crm.papitube.com',
    imgUrl: 'https://res.papitube.com/',

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

    trailOrigin: function () {
        if (Cookies.get('companyType') === '泰洋川禾') {
            return [
                {
                    name: '请选择线索来源',
                    value: 0
                },
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
            ]
        } else {
            return [
                {
                    name: '请选择线索来源',
                    value: 0
                },
                {
                    name: '商务邮箱',
                    value: 1
                },
                {
                    name: '员工',
                    value: 4
                },
                {
                    name: '公司高管',
                    value: 5
                }
            ]
        }
    },
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
            name: '请选择任务类型',
            value: 0
        },
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
            name: '请选择优先级',
            value: 0
        },
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


};

export default config