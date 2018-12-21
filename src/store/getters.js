export default {
    getParticipantsInfo: function (state) {
        return state.participantsInfo
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