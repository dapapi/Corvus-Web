// import menusModule from "./menusModule"; 
import router from '../router'
import backRouter from '../backRouter'

export default {
    changeParticipantsInfo(state, data) {
        state.participantsInfo = data
    },
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
    // 设置部门数据
    setDepartment (state, data) {
        state.department = data
    },
    // 设置用户列表
    setUserList (state, data) {
        state.userList = data
    },
    // 进入后台权限
    setPassBack (state, data) {
        state.canPassBack = data
        if (data) {
            router.addRoutes(backRouter)
        } else {
            router.addRoutes([{
                path: "*",
                redirect: "/404"
            }])
        }
    },
    setModule(state,data){
        state.moduleList = data.moduleList
        state.unReadMsg = data.num
    }
}