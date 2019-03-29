<template>
    <div class="assistor" id="assistor" :class='submit?"normal-width":""'>
        <div class="bg-white select-staff">
            <div class="page-nav-tabs">
                <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                    <li class="nav-item col-md-6" role="presentation">
                        <a class="nav-link active" data-toggle="tab" :href="'#forum-team' + this._uid"
                           aria-controls="forum-base"
                           aria-expanded="true" role="tab"> 团队 </a>
                    </li>
                    <li class="nav-item col-md-6" role="presentation">
                        <a class="nav-link" data-toggle="tab" :href="'#forum-department' + this._uid"
                           aria-controls="forum-present"
                           aria-expanded="false" role="tab"> 部门 </a>
                    </li>
                </ul>
            </div>

            <div class="page-content tab-content nav-tabs-animate bg-white selector-page-content">
                <div class="tab-pane animation-fade active" :id="'forum-team' + this._uid" role="tabpanel">
                    <div class="input-search example">
                        <button type="submit" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" name="" placeholder="搜索成员..." v-model="searchKeyWord">
                    </div>

                    <div class="person-content">
                        <div class="team-title">
                            <span class="team-title-icon" @click="closeTeam">
                                <i class="icon md-caret-down" v-show="teamShow"></i>
                                <i class="icon md-caret-right" v-show="!teamShow"></i>
                            </span>
                            <span>
                                 <i class="iconfont icon-chengyuannew pl-2"></i>
                            泰洋系（{{ normalUsers.length }}人)
                            </span>
                            <span class="team-add-all pl-2" @click="selectAllMember" v-if="multiple">
                                <i class="icon iconfont icon-tianjia"></i>
                            </span>
                        </div>
                        <div v-show="teamShow">
                            <div class="users" v-for="user in normalUsers"
                                 v-show="user.name.indexOf(searchKeyWord) > -1"
                                 @click="selectMember(user)" :key='user.id+Math.random()'>
                                <a class="avatar" href="javascript:void(0)">
                                    <Avatar :imgUrl="user.icon_url" style="margin-right: 10px;"/>
                                </a>
                                <span class="pl-1">{{ user.name }}</span>
                                <template v-if="memberType === 'principal'">
                                    <span class="float-right"
                                          v-show="principalInfo.id == user.id">
                                        <i class="icon md-check"></i>
                                    </span>
                                </template>
                                <template v-else-if="memberType === 'participant'">
                                    <span class="float-right"
                                          v-show="participantsInfo.find(item => item.id == user.id)">
                                        <i class="icon md-check"></i>
                                    </span>
                                </template>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="tab-pane animation-fade" :id="'forum-department' + this._uid" role="tabpanel">
                    <div v-for="department in departmentUsers" :key='department.id+Math.random()'>
                        <departments-item :data="department" @change="memberChange" :type="type" :otherslot='otherslot'
                                          :multiple="multiple" :member-type="memberType"></departments-item>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import fetch from '../assets/utils/fetch.js';

export default {
  props: ['multiple', 'member-type', 'type', 'otherslot', 'submit'],
  data() {
    return {
      normalUsers: {},
      departmentUsers: {},
      teamShow: true,
      searchKeyWord: '',
      params: {
        type: this.type,
        data: '',
      },
    };
  },

  computed: {
    ...mapState([
      'department',
      'userList',
    ]),

    _department() {
      return this.department;
    },
    _userList() {
      return this.userList;
    },
    principalInfo() {
                if (this.type === 'change') {
                    return this.$store.state.principalInfo
                } if (this.type === 'selector') {
                    return this.$store.state.selectPrincipalInfo
                }else if(this.otherslot){
                    return this.$store.state.otherSlot
                } else {
                    return this.$store.state.newPrincipalInfo
                }
            },

    participantsInfo() {
                if (this.type === 'change') {
                    return this.$store.state.participantsInfo
                } if(this.type ==='collect'){
                    return this.$store.state.collectInfo
                }else if(this.type === 'pay'){
                    return this.$store.state.payInfo
                }else if(this.type === 'contract'){
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
                }else if(this.otherslot){
                    return this.$store.state.otherSlot
                }
                else {
                    return this.$store.state.newParticipantsInfo
                }
            },
  },

  mounted() {
    if (this.department.length > 0) {
      this.departmentUsers = this.department;
    }
    if (this.userList.length > 0) {
      this.normalUsers = this.userList;
    }
  },

  watch: {
    _department() {
      this.departmentUsers = this.department;
    },
    _userList() {
      this.normalUsers = this.userList;
    },
  },

  methods: {
    closeTeam() {
      this.teamShow = !this.teamShow;
    },

    selectAllMember() {
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
    }else if (this.otherslot) {
        participantInfo = this.$store.state.otherSlot;
      } else {
        participantInfo = this.$store.state.newParticipantsInfo;
      }
      for (let i = 0; i < this.normalUsers.length; i++) {
        if (!participantInfo.find(item => item.id == this.normalUsers[i].id)) {
          participantInfo.push(this.normalUsers[i]);
        }
      }
      this.params.data = participantInfo;
      if (this.otherslot) {
        this.$store.dispatch('changeOtherSlot', this.params.data);
      }else {
        this.$store.dispatch('changeParticipantsInfo', this.params);
      }
      this.$emit('change', false);
    },

    selectMember(user) {
      if (this.memberType === 'principal') {
        this.params.data = user;
        this.$store.dispatch('changePrincipal', this.params);
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

        if (participantInfo.find(item => item.id == user.id)) {
          participantInfo.splice(participantInfo.map(item => item.id).indexOf(user.id), 1);
        } else {
          participantInfo.push(user);
        }
        this.params.data = participantInfo;
        if (this.otherslot) {
          this.$store.dispatch('changeOtherSlot', this.params.data);
        }else {
          this.$store.dispatch('changeParticipantsInfo', this.params);
        }
      }
      this.$emit('change', false);
    },

    memberChange() {
      this.$emit('change', false);
    },
  },
};
</script>

<style>

    .nav-item {
        padding: 0 !important;
        text-align: center;
        word-break: keep-all;
    }

    button:focus {
        outline: none;
    }

    .team-title-icon {
        width: 4px;
        display: inline-block;
    }

    .team-add-all {
        display: none;
    }

    .team-title:hover .team-add-all {
        display: inline-block;
    }

    .users {
        padding-top: 15px;
        line-height: 30px;
        padding-left: 15px;
        cursor: pointer;
    }

    .users:hover {
        color: #3f51b5;
    }

    .users .avatar {
        width: 30px;
        height: 30px;
    }

    .selector-page-content {
        padding: 0 30px;
        height: 355px;
        overflow-x: hidden!important;
        overflow-y: auto!important;
        position: relative;
        top: 45px;
    }

    .assistor {
        position: absolute;
        height: 400px;
        width: 20rem;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid #f2f2f2;
        overflow: hidden;
        z-index: 100000000 !important;
    }
    .normal-width{
        width: 100%;
    }
    .page-nav-tabs {
        position: absolute;
        z-index: 2;
        top: 0;
        background: white;
        width: 100%;
    }

    .select-staff {
        height: 400px;
    }

    .team-title {
        font-weight: 400;
    }
</style>
