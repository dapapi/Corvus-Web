<template>
    <div class="assistor" id="assistor">
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
                        <button type="submit" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
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
                                 @click="selectMember(user)" :key='user.name+Math.random()'>
                                <a class="avatar" href="javascript:void(0)">
                                    <img src="https://res.papitube.com/no-icon.png" alt="...">
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
                        <departments-item :data="department" @change="memberChange" :type="type"
                                          :multiple="multiple" :member-type="memberType"></departments-item>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import fetch from '../assets/utils/fetch.js'

    export default {
        props: ['multiple', 'member-type', 'type', 'otherslot'],
        data() {
            return {
                normalUsers: {},
                departmentUsers: {},
                teamShow: true,
                searchKeyWord: '',
                params: {
                    type: this.type,
                    data: ''
                }
            }
        },

        computed: {
            principalInfo: function () {
                if (this.type === 'change') {
                    return this.$store.state.principalInfo
                } else if (this.type === 'selector') {
                    return this.$store.state.selectPrincipalInfo
                } else {
                    return this.$store.state.newPrincipalInfo
                }
            },

            participantsInfo: function () {
                if (this.type === 'change') {
                    return this.$store.state.participantsInfo
                } else {
                    return this.$store.state.newParticipantsInfo
                }
            }
        },

        mounted() {
            fetch('get', '/users').then(response => {
                this.normalUsers = response.data;
            });
            fetch('get', '/departments').then(response => {
                this.departmentUsers = response.data;
            });
        },

        methods: {
            closeTeam: function () {
                this.teamShow = !this.teamShow
            },

            selectAllMember: function () {
                let participantInfo = '';
                if (this.type === 'change') {
                    participantInfo = this.$store.state.participantsInfo;
                } else {
                    participantInfo = this.$store.state.newParticipantsInfo;
                }
                for (let i = 0; i < this.normalUsers.length; i++) {
                    if (!participantInfo.find(item => item.id == this.normalUsers[i].id)) {
                        participantInfo.push(this.normalUsers[i])
                    }
                }
                this.params.data = participantInfo;
                this.$store.dispatch('changeParticipantsInfo', this.params);
                this.$emit('change', false)
            },

            selectMember: function (user) {
                if (this.memberType === 'principal') {
                    this.params.data = user;
                    this.$store.dispatch('changePrincipal', this.params);
                } else if (this.memberType === 'participant') {
                    let participantInfo = '';
                    if (this.type === 'change') {
                        participantInfo = this.$store.state.participantsInfo;
                    } else {
                        participantInfo = this.$store.state.newParticipantsInfo;
                    }

                    if (participantInfo.find(item => item.id == user.id)) {
                        participantInfo.splice(participantInfo.map(item => item.id).indexOf(user.id), 1)
                    } else {
                        participantInfo.push(user)
                    }
                    this.params.data = participantInfo;
                    this.$store.dispatch('changeParticipantsInfo', this.params);
                }
                if (this.otherslot) {
                    this.$store.dispatch('changeOtherSlot', this.params);
                }
                this.$emit('change', false)
            },

            memberChange: function () {
                this.$emit('change', false)
            }
        }
    }
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
        overflow: hidden;
    }

    .selector-page-content {
        padding: 0 30px;
        height: 355px;
        overflow-x: hidden;
        overflow-y: auto;
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
        z-index: 10;
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

