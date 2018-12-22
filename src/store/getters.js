export default {
    getParticipantsInfo: function (state) {
        return state.participantsInfo
    },
    //collectInfo:[],//收款金额
    //payInfo:[],//付款金额
    //contractInfo:[],//合同类型
    //divisionInfo:[],//分成比例
    //incubationInfo:[],//孵化期
    //bilInfo:[],//账单
    getCollectInfo:function(state){
        return state.collectInfo
    },
    getPayInfo: function (state){
        return state.payInfo
    },
    getContractInfo: function (state) {
        return state.contractInfo
    },
    getDivisionInfo: function (state) {
        return state.divisionInfo
    },
    getIncubationInfo: function (state) {
        return state.incubationInfo
    },
    getBillInfo: function (state) {
        return state.billInfo
    },

    getUnReadMsg:function(state){
        return state.unReadMsg
    },
    getIsSelected:function(state){
        return state.isSelected
    },
    getIsExpanded:function(state){
        return state.isExpanded
    }
}