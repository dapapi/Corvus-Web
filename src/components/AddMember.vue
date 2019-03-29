<template>
    <div class="addMember">
        <ul class="addMember-items">
            <li class="addMember-item" v-for="(member,index) in selectMemberArr" :key="member.id" :style="otherslot?'display:flex':''">
                <Avatar :imgUrl="member.icon_url" :title='member.name'/>
                <span class="addMember-remove" @click="removeMember(member.id)" :class="otherslot?'addmember-other':''">
                    <i class="md-minus-circle"></i>
                </span>
                <div class="splicer" v-if="otherslot && (index < selectMemberArr.length-1)"></div>
            </li>
            <li class="addMember-item" v-show="!participantsSingle">
                <div class="addMember-trigger" :class="isMemberShow ? 'addMember-active': ''" :id="'selectStaff' + this._uid">
                    <div class="addMember-trigger-button" :class="selectMemberArr.length > 0 ? 'addMember-trigger-left' : ''"
                         @click="showMember"><i class="iconfont icon-tianjia"></i></div>
                    <div class="addMember-trigger-dropdown">
                        <select-staff :multiple="true" :member-type="'participant'" :type="type"
                                      @change="changeSelectedMember" :otherslot='otherslot'></select-staff>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: '',
  props: ['type', 'otherslot', 'participantsSingle'],
  data() {
    return {
      isMemberShow: false,
    };
  },
  mounted() {
    this.globalClick(this.removeSelect);
  },

  computed: {
    // collectInfo:[],//收款金额
    // payInfo:[],//付款金额
    // contractInfo:[],//合同类型
    // divisionInfo:[],//分成比例
    // incubationInfo:[],//孵化期
    // billInfo:[],//账单
    selectMemberArr() {
                if (this.type === 'change') {

                    return this.$store.state.participantsInfo
                }if(this.type ==='collect'){
                    return this.$store.state.collectInfo
                }if(this.type === 'pay'){
                    return this.$store.state.payInfo
                }if(this.type === 'contract'){
                    return this.$store.state.contractInfo
                }else if(this.type === 'division'){
                    return this.$store.state.divisionInfo
                }else if(this.type === 'incubation'){
                    return this.$store.state.incubationInfo
                }else if(this.type === 'bill'){
                    return this.$store.state.billInfo
                }else if(this.type === 'birthday'){
                    return this.$store.state.birthdayInfo
                }else if(this.type === 'star_risk_point'){
                    return this.$store.state.star_risk_pointInfo
                }else if(this.type === 'phone'){
                    return this.$store.state.phoneInfo
                }else if(this.type === 'wechat'){
                    return this.$store.state.wechatInfo
                }else if(this.type === 'email'){
                    return this.$store.state.emailInfo
                }
                else if(this.otherslot){
                    return this.$store.state.otherSlot
                }
                
                else {
                    
                    return this.$store.state.newParticipantsInfo
                }
            },
  },

  methods: {

    showMember() {
      this.isMemberShow = true;
    },

    removeSelect(event) {
      // alert(9999)
      const tag = document.getElementById(`selectStaff${this._uid}`);
      if (tag) {
        // alert(222)
        if (!tag.contains(event.target)) {
          // alert(333)
          this.isMemberShow = false;
        }
      }
    },

    removeMember(userId) {
      // collectInfo:[],//收款金额
      // payInfo:[],//付款金额
      // contractInfo:[],//合同类型
      // divisionInfo:[],//分成比例
      // incubationInfo:[],//孵化期
      // billInfo:[],//账单
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
      }else if(this.type === 'birthday'){
        participantInfo = this.$store.state.birthdayInfo
    }else if(this.type === 'star_risk_point'){
        participantInfo = this.$store.state.star_risk_pointInfo
    }else if(this.type === 'phone'){
        participantInfo = this.$store.state.phoneInfo
    }else if(this.type === 'wechat'){
        participantInfo = this.$store.state.wechatInfo
    }else if(this.type === 'email'){
        participantInfo = this.$store.state.emailInfo
    } else if (this.otherslot) {
        participantInfo = this.$store.state.otherSlot;
      } else {
        participantInfo = this.$store.state.newParticipantsInfo;
      }
      participantInfo.splice(participantInfo.map(item => item.id).indexOf(userId), 1);
      const params = {
        type: this.type,
        data: participantInfo,
      };
      if (this.otherslot) {
        this.$store.dispatch('changeOtherSlot', params.data);
      } else {
        this.$store.dispatch('changeParticipantsInfo', params);
      }
      this.$emit('change', userId);
    },

    changeSelectedMember() {
      this.$emit('change', false);
    },

  },
};

</script>
<style scoped>

    .addMember-items {
        display: flex;
        flex-wrap: wrap;
        margin-left: -10px;
    }

    .addMember-item {
        margin-left: 10px;
        margin-right: 0;
        vertical-align: middle;
        margin-bottom: 10px;
    }

    .splicer {
        width: 30px;
        height: 2px;
        margin: 15px 10px 0 10px;
        background-color: #E0E0E0;
    }
    .addmember-other{
        left: 22px;
    }

</style>
