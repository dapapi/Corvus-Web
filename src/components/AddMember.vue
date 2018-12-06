<template>
    <div class="addMember">
        <ul class="addMember-items">
            <li class="addMember-item mb-5" v-for="member in selectMemberArr" :key="member.id">
                <img onerror="noneAvatar(this)" class="avatar" :src="member.avatar" title="Herman Beck" >
                <span class="addMember-remove" @click="removeMember(member.id)">
                    <i class="md-minus-circle"></i>
                </span>
            </li>
        </ul>
        <div class="addMember-trigger" :class="isMemberShow ? 'addMember-active': ''" :id="'selectStaff' + this._uid">
            <div class="addMember-trigger-button" @click="showMember"><i class="md-plus"></i></div>
            <div class="addMember-trigger-dropdown">
                <select-staff :multiple="true" :member-type="'participant'" :type="type"
                              @change="changeSelectedMember"></select-staff>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['type'],
        data() {
            return {
                isMemberShow: false,
            }
        },
        mounted() {
            this.globalClick(this.removeSelect);
        },

        computed: {
            selectMemberArr: function () {
                if (this.type === 'change') {
                    return this.$store.state.participantsInfo
                } else {
                    return this.$store.state.newParticipantsInfo
                }
            }
        },

        methods: {

            showMember: function () {
                this.isMemberShow = true;
            },

            removeSelect: function (event) {
                let tag = document.getElementById("selectStaff" + this._uid);
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.isMemberShow = false;
                    }
                }
            },

            removeMember: function (userId) {
                let participantInfo = '';
                if (this.type === 'add') {
                    participantInfo = this.$store.state.newParticipantsInfo;
                } else {
                    participantInfo = this.$store.state.participantsInfo;
                }
                participantInfo.splice(participantInfo.map(item => item.id).indexOf(userId), 1);
                let params = {
                    type: this.type,
                    data: participantInfo
                };
                this.$store.dispatch('changeParticipantsInfo', params);
            },

            changeSelectedMember: function () {
                this.$emit('change', false)
            }

        }
    }

</script>

<style scoped>
.addMember-trigger-button{
   
    margin-left:10px;
  }
  .addMember-item{
    margin-left:10px;
    margin-right: 0;
  }
</style>