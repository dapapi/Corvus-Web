export default {
    changeParticipantsInfo: function (data, params) {
        if (params.type === 'change') {
            data.commit('changeParticipantsInfo', params.data);
        } else {
            data.commit('changeNewParticipantsInfo', params.data);
        }
    },

    changePrincipal: function (data, params) {
        if (params.type === 'change') {
            data.commit('changePrincipal', params.data)
        } else {
            data.commit('changeNewPrincipal', params.data)
        }
    },

    changeCompany: function (data, params) {
        data.commit('changeCompany', params)
    }
}