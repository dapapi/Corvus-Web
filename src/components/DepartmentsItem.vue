<template>

    <div class="department-item example">
        <div class="pt-2 team-title">
            <span @click="departmentClose" class="pointer-content">
                <span class="team-title-icon" style="padding-right: 10px">
                    <i class="icon md-caret-down" v-show="departmentsShow"></i>
                    <i class="icon md-caret-right" v-show="!departmentsShow"></i>
                </span>
                <span>
                    <i class="iconfont icon-hierarchy"></i>
                    {{ this.data.name }}（{{ this.total }}人)
                </span>
            </span>
            <span class="team-add-all pl-2" @click="selectAllMember" v-if="multiple">
                <i class="icon iconfont icon-tianjia"></i>
            </span>
        </div>

        <div class="items" v-show="departmentsShow">
            <div>
                <div class="users" v-for="user in data.users.data" @click="selectMember(user)">
                    <a class="avatar" href="javascript:void(0)">
                        <Avatar :imgUrl="user.user_url" style="margin-right: 10px;"/>
                    </a>
                    <span class="pl-1">{{ user.name }}</span>
                    <template v-if="!selectHidden">
                        <template v-if="memberType === 'principal'">
                        <span class="float-right" v-show="principalInfo.id == user.id">
                            <i class="icon md-check"></i>
                        </span>
                        </template>
                        <template v-else-if="memberType === 'participant'">
                        <span class="float-right" v-show="participantsInfo.find(item => item.id == user.id)">
                            <i class="icon md-check"></i>
                        </span>
                        </template>
                    </template>
                </div>
            </div>

            <div v-if="this.data.departments.data.length > 0">
                <div v-for="departmentData in data.departments.data">
                    <departments-item :data="departmentData" :member-type="memberType" :type="type" :otherslot='otherslot'
                                      :multiple="multiple" :select-hidden="selectHidden" @change="memberChange"></departments-item>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
export default {
  name: 'departments-item',
  props: ['data', 'select-hidden', 'multiple', 'member-type', 'type', 'otherslot'],
  data() {
    return {
      departmentsShow: false,
      total: 0,
      params: {
        type: this.type,
        data: '',
      },
    };
  },

  computed: {
    principalInfo() {
      if (this.type === 'change') {
        return this.$store.state.principalInfo;
      } if (this.type === 'selector') {
        return this.$store.state.selectPrincipalInfo;
      } if (this.otherslot) {
        return this.$store.state.otherSlot;
      }
      return this.$store.state.newPrincipalInfo;
    },

    participantsInfo() {
                if (this.type === 'change') {
                    return this.$store.state.participantsInfo
                } if(this.type ==='collect'){
                    return this.$store.state.collectInfo
                }if(this.type === 'pay'){
                    return this.$store.state.payInfo
                }if(this.type === 'contract'){
                    return this.$store.state.contractInfo
                }if(this.type === 'division'){
                    return this.$store.state.divisionInfo
                }if(this.type === 'incubation'){
                    return this.$store.state.incubationInfo
                }if(this.type === 'bill'){
                    return this.$store.state.billInfo
                }else if(this.otherslot){
                    return this.$store.state.otherSlot
                }
                else {
                    return this.$store.state.newParticipantsInfo
                }
            },
  },

  mounted() {
    this.total = this.memberNum(this.data);
  },

  methods: {
    departmentClose() {
      this.departmentsShow = !this.departmentsShow;
    },

    memberChange(value) {
      if (this.memberType === 'principal') {
        this.$emit('change', false);
      }
    },

    selectMember(user) {
      if (this.memberType === 'principal') {
        this.params.data = user;
        this.$store.dispatch('changePrincipal', this.params);
        this.$emit('change', false);
      } else if (this.memberType === 'participant') {
        let participantInfo = '';
        if (this.type === 'change') {
          participantInfo = this.$store.state.participantsInfo;
        } else if (this.type === 'collect') {
          participantInfo = this.$store.state.collectInfo;
        } else if (this.type === 'pay') {
          participantInfo = this.$store.state.payInfo;
        } else if (this.type === 'contract') {
          participantInfo = this.$store.state.contractInfo;
        } else if (this.type === 'division') {
          participantInfo = this.$store.state.divisionInfo;
        } else if (this.type === 'incubation') {
          participantInfo = this.$store.state.incubationInfo;
        } else if (this.type === 'bill') {
          participantInfo = this.$store.state.billInfo;
        } else if (this.otherslot) {
          participantInfo = this.$store.state.otherSlot;
        } else {
          participantInfo = this.$store.state.newParticipantsInfo;
        }
        if (!participantInfo.find(item => item.id == user.id)) {
          participantInfo.push(user);
        } else {
          participantInfo.splice(participantInfo.map(item => item.id).indexOf(user.id), 1);
        }
        this.params.data = participantInfo;
        if (this.otherslot) {
          this.$store.dispatch('changeOtherSlot', this.params.data);
        } else {
          this.$store.dispatch('changeParticipantsInfo', this.params);
        }
        // this.$store.dispatch('changeParticipantsInfo', this.params);
      }
    },

    selectAllMember() {
      this.checkMember(this.data);
    },

    checkMember(data) {
      let participantInfo = '';
      if (this.type === 'change') {
        participantInfo = this.$store.state.participantsInfo;
      } else if (this.type === 'collect') {
        participantInfo = this.$store.state.collectInfo;
      } else if (this.type === 'pay') {
        participantInfo = this.$store.state.payInfo;
      } else if (this.type === 'contract') {
        participantInfo = this.$store.state.contractInfo;
      } else if (this.type === 'division') {
        participantInfo = this.$store.state.divisionInfo;
      } else if (this.type === 'incubation') {
        participantInfo = this.$store.state.incubationInfo;
      } else if (this.type === 'bill') {
        participantInfo = this.$store.state.billInfo;
      } else if (this.otherslot) {
        participantInfo = this.$store.state.otherSlot;
      } else {
        participantInfo = this.$store.state.newParticipantsInfo;
      }
      for (let i = 0; i < data.users.data.length; i++) {
        const user = data.users.data[i];
        if (!participantInfo.find(item => item.id == user.id)) {
          participantInfo.push(user);
        }
      }
      for (let i = 0; i < data.departments.data.length; i++) {
        this.checkMember(data.departments.data[i]);
      }
      this.params.data = participantInfo;
      if (this.otherslot) {
        this.$store.dispatch('changeOtherSlot', this.params.data);
      } else {
        this.$store.dispatch('changeParticipantsInfo', this.params);
      }
      // this.$store.dispatch('changeParticipantsInfo', this.params);
    },

    memberNum(data) {
      const firstLevelUsers = data.users.data.length;
      let nextLevelUsers = 0;
      for (let i = 0; i < data.departments.data.length; i++) {
        nextLevelUsers += this.memberNum(data.departments.data[i]);
      }
      return firstLevelUsers + nextLevelUsers;
    },
  },
};
</script>

<style scoped>

    .department-item {
        position: relative;
        left: 0.8rem;
        width: calc(100% - 0.8rem);
    }

</style>
