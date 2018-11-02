export default {
    el: '#root',
    data: {
        total: 0,
        current_page: 1,
        total_pages: 1,
        memberPlaceholder: '请选择负责人',
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
    },

    methods: {



    }

}
