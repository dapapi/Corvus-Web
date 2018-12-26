import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);

const state = {
    participantsInfo: [],
    newParticipantsInfo: [],
    //隐私设置
    collectInfo:[],//收款金额
    payInfo:[],//付款金额
    contractInfo:[],//合同类型
    divisionInfo:[],//分成比例
    incubationInfo:[],//孵化期
    billInfo:[],//账单
    principalInfo: {},
    newPrincipalInfo: {},
    companyInfo: {},
    selectPrincipalInfo: {},
    otherSlot:{},
    unReadMsg:0,//未读消息
    isSelected:'',
    isExpanded:[],
    department: [], // 部门数据
    userList: [], // 用户列表
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});