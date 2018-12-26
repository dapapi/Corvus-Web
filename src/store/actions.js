import fetch from '../assets/utils/fetch'

export default {
    changeParticipantsInfo: function (data, params) {

        //collectInfo:[],//收款金额
            //payInfo:[],//付款金额
            //contractInfo:[],//合同类型
            //divisionInfo:[],//分成比例
            //incubationInfo:[],//孵化期
            //bilInfo:[],//账单
        if (params.type === 'change') {
            data.commit('changeParticipantsInfo', params.data);
        }
        else if(params.type === 'role'){
            data.commit('changeRole',params.data)
        } else if (params.type === 'collect'){
            data.commit('changeCollectInfo', params.data)
        } else if (params.type === 'pay'){
            data.commit('changePayInfo', params.data)
        } else if (params.type === 'contract'){
            data.commit('changeContractInfo', params.data)
        } else if (params.type === 'division'){
            data.commit('changeDivisionInfo', params.data)
        } else if (params.type === 'incubation'){
            data.commit('changeIncubationInfo', params.data)
        } else if (params.type === 'bill'){
            data.commit('changeBillInfo', params.data)
        }else {
            data.commit('changeNewParticipantsInfo', params.data);
        }
        
    },

    changePrincipal: function (data, params) {
        if (params.type === 'change') {
            data.commit('changePrincipal', params.data)
        } else if (params.type === 'selector') {
            data.commit('changeSelectorPrincipal', params.data)
        } else {
            data.commit('changeNewPrincipal', params.data)
        }
    },

    changeCompany: function (data, params) {
        data.commit('changeCompany', params)
    },
    changeOtherSlot: function(data,params){
        data.commit('changeOtherSlot',params)
    },
    changeUnReadMsg:function(data,params){
        data.commit('changeUnReadMsg', params)
    },
    changeIsSelected:function(data,params){
       
        data.commit('changeIsSelected',params)
    },
    changeIsExpanded: function (data, params) {
        data.commit('changeIsExpanded', params)
    },

    // 获取部门数据
    getDepartment ({commit}) {
        fetch('get', '/departments').then(res => {
            commit('setDepartment', res.data)
        })
    },
    // 获取用户列表
    getUserList ({commit}) {
        fetch('get', '/users').then(res => {
            commit('setUserList', res.data)
        })
    }
}