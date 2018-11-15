import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
import Vuex from 'vuex'

const state = {
    participantsInfo: [],
    newParticipantsInfo: [],
    principalInfo: {},
    newPrincipalInfo: {},
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});