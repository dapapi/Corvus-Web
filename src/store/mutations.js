// import menusModule from "./menusModule"; 
export default {
    changeParticipantsInfo(state, data) {
        state.participantsInfo = data
    },
    //collectInfo:[],//收款金额
    //payInfo:[],//付款金额
    //contractInfo:[],//合同类型
    //divisionInfo:[],//分成比例
    //incubationInfo:[],//孵化期
    //bilInfo:[],//账单
    changeCollectInfo: function (state,data) {
        state.collectInfo = data
    },
    changePayInfo: function (state,data) {
        state.payInfo = data
    },
    changeContractInfo: function (state,data) {
        state.contractInfo =data
    },
    changeDivisionInfo: function (state,data) {
        state.divisionInfo = data
    },
    changeIncubationInfo: function (state,data) {
        state.incubationInfo = data
    },
    changeBillInfo: function (state,data) {
        state.billInfo = data
    },
    changePrincipal:function(state,data){
        state.principalInfo = data
    },
    changeNewParticipantsInfo(state, data) {
        state.newParticipantsInfo = data
    },

    changeNewPrincipal(state, data) {
        state.newPrincipalInfo = data
    },

    changeCompany(state, data) {
        state.companyInfo = data
    },

    changeSelectorPrincipal(state, data) {
        state.selectPrincipalInfo = data
    },

    changeOtherSlot(state,data){
        state.otherSlot = data
    },
    changeUnReadMsg(state,data){
        state.unReadMsg = data
    },
    changeIsSelected(state,data){
        state.isSelected = data
    },
    changeIsExpanded(state, data) {
        state.isExpanded = data
    },
}