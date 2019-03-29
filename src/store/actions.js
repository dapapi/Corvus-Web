import fetch from '../assets/utils/fetch';

export default {
  changeParticipantsInfo (data, params) {

        //collectInfo:[],//收款金额
        //payInfo:[],//付款金额
        //contractInfo:[],//合同类型
        //divisionInfo:[],//分成比例
        //incubationInfo:[],//孵化期
        //bilInfo:[],//账单
        if (params.type === 'change') {
            data.commit('changeParticipantsInfo', params.data);
        }
        else if (params.type === 'role') {
            data.commit('changeRole', params.data)
        } else if (params.type === 'collect') {
            data.commit('changeCollectInfo', params.data)
        } else if (params.type === 'pay') {
            data.commit('changePayInfo', params.data)
        } else if (params.type === 'contract') {
            data.commit('changeContractInfo', params.data)
        } else if (params.type === 'division') {
            data.commit('changeDivisionInfo', params.data)
        } else if (params.type === 'incubation') {
            data.commit('changeIncubationInfo', params.data)
        } else if (params.type === 'birthday') {
            data.commit('changeBirthdayInfo', params.data)
        } else if (params.type === 'star_risk_point') {
            data.commit('changeStar_risk_pointInfo', params.data)
        } else if (params.type === 'phone') {
            data.commit('changePhoneInfo', params.data)
        } else if (params.type === 'wechat') {
            data.commit('changeWechatInfo', params.data)
        } else if (params.type === 'email') {
            data.commit('changeEmailInfo', params.data)
        } else if (params.type === 'bill') {
            data.commit('changeBillInfo', params.data)
        } else {
            data.commit('changeNewParticipantsInfo', params.data);
        }

    },

  changePrincipal (data, params) {
        if (params.type === 'change') {
            data.commit('changePrincipal', params.data)
        } else if (params.type === 'selector') {
            data.commit('changeSelectorPrincipal', params.data)
        } else {
            data.commit('changeNewPrincipal', params.data)
        }
    },

  changeCompany (data, params) {
        data.commit('changeCompany', params)
    },
    changeOtherSlot: function (data, params) {
        data.commit('changeOtherSlot', params)
    },
    changeUnReadMsg: function (data, params) {
        data.commit('changeUnReadMsg', params)
    },
    changeIsSelected: function (data, params) {

        data.commit('changeIsSelected', params)
    },
  changeIsExpanded (data, params) {
        data.commit('changeIsExpanded', params)
    },
    changePreview: function (data, params) {
        data.commit('changePreview', params)
    },
    // 获取部门数据
    getDepartment({commit}) {
        fetch('get', '/departments').then(res => {
            commit('setDepartment', res.data)
        })
    },
    // 获取用户列表
    getUserList({commit}) {
        fetch('get', '/user/all').then(res => {
            commit('setUserList', res.data)
        })
    },
    // 获取模块权限
    getModuleRole({commit}) {
        fetch('get', 'console/getpowermodel').then(res => {
            let canPassBack = false
            if (res.length > 0) {
                for (const n of res) {
                    if (n.code === 'back') {
                        canPassBack = true
                        break
                    }
                }
            }
            commit('setPassBack', canPassBack)
        })
    },
    getModuleList({commit}) {
        fetch('get', `/getmodules`).then((res) => {

            let num = 0
            let data = {}
            for (let i = 0; i < res.data.length; i++) {
                num = num + res.data[i].unread
            }
            data.num = num
            data.moduleList = res.data
            commit('setModule', data)
        })
    },
    getSupplierDetails({commit},params){
        fetch('get', `supplier/${params}`).then((res) =>{
            commit('setSupplierDetails', res.data)
        })
    },
    getListPower({commit}){
        fetch('get', `/user/list_power`).then((res) => {
            // console.log(res.data)
          commit('setListPower', res.data.power)
        })
    }
}
