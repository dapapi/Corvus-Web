import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);

const state = {
    previewurl:'',
    participantsInfo: [],
    newParticipantsInfo: [],
    //隐私设置--参数
    collectInfo:[],
    payInfo:[],
    contractInfo:[],
    divisionInfo:[],
    incubationInfo:[],
    billInfo:[],
    birthdayInfo:[],
    star_risk_pointInfo:[],
    phoneInfo:[],
    wechatInfo:[],
    emailInfo:[],
    //隐私设置--参数结束
    principalInfo: {},
    newPrincipalInfo: {},
    companyInfo: {},
    selectPrincipalInfo: {},
    otherSlot:[],
    
    isSelected:'',
    isExpanded:[],
    department: [], // 部门数据
    userList: [], // 用户列表
    canPassBack: false, // 能否进入后台

    //消息模块列表
    moduleList:[],
    unReadMsg: 0, //未读消息

    // 个人信息
    avatar: '', // 用户头像
    supplierDetails:{},//供应商详情
    listPower:{},//列表里边的导入导出和新增的权限
    approvalNum:{},
    previewname:''
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});