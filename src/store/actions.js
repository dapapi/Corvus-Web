export default {
    changeParticipantsInfo: function (data, params) {
        if (params.type === 'change') {
            data.commit('changeParticipantsInfo', params.data);
        }
        else if(params.type === 'role'){
            data.commit('changeRole',params.data)
        } 
        else {
            data.commit('changeNewParticipantsInfo', params.data);
        }
        
    },

    changePrincipal: function (data, params) {
        if (params.type === 'change') {
            data.commit('changePrincipal', params.data)
        } else if (params.type === 'selector') {
            data.commit('changeSelectorPrincipal', params.data)
        } else {
            data.commit('changeNewPrincipal', params.data)
        }
    },

    changeCompany: function (data, params) {
        data.commit('changeCompany', params)
    },
    changeOtherSlot: function(data,params){
        data.commit('changeOtherSlot',params)
    },
    changeUnReadMsg:function(data,params){
        data.commit('changeUnReadMsg', params)
    }
}