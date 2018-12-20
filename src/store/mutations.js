// import menusModule from "./menusModule"; 
export default {
    changeParticipantsInfo(state, data) {
        state.participantsInfo = data
    },

    changePrincipal(state, data) {
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