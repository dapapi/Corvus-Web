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
    getIsSelected:function(state){
        return state.isSelected
    },
    getIsExpanded:function(state){
        return state.isExpanded
    }
}