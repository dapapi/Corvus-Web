import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state = {
    participantsInfo: [],
    newParticipantsInfo: [],
    principalInfo: {},
    newPrincipalInfo: {},
    companyInfo: {},
    selectPrincipalInfo: {},
    otherSlot:{},
    unReadMsg:0,//未读消息
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});