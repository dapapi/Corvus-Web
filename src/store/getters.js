export default {
    getParticipantsInfo: function (state) {
        return state.participantsInfo
    },
    getNewParticipantsInof:function(state){
        return state.NewParticipantsInfo
    },
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
    getModule:function(state){
        return state.moduleList
    },
    getDashboard:function(state){
        return state.dashboardList
    },
    getIsSelected:function(state){
        return state.isSelected
    },
    getselectId:function(state){
        return state.selectId
    },
    getIsExpanded:function(state){
        return state.isExpanded
    },
    getSupplierDetails:function(state){
        return state.supplierDetails
    },
    getListPower:function(state){
        return state.listPower
    }
}