<template>
    <div class="list">
        <div class="left">
            <div class="left-cont">
                <SelectStaff :member-type="memberType" :multiple="!isSingle" :type="type"></SelectStaff>
            </div>
        </div>
        <div class="middle">
            <div class="middle-icon">
                <i class="icon md-caret-right"></i>
            </div>
        </div>
        <div class="right">
            <div class="right-cont">
                <div class="right-head">已选择成员</div>
                <template v-if="memberType === 'principal'">
                    <ul class="pointer-content selected-member" v-if="participantsInfo.name">
                        <li class="users">
                            <a class="avatar" href="javascript:void(0)">
                                <Avatar :imgUrl="participantsInfo.icon_url" style="margin-right: 10px;"/>
                            </a>
                            <span class="pl-1">{{ participantsInfo.name }}</span>
                            <span class="float-right" @click="delMember(participantsInfo.id)">
                            <i class="icon iconfont icon-guanbi"></i>
                        </span>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <ul class="pointer-content selected-member">
                        <li v-for="(item,index) in participantsInfo" :key="index" class="users">
                            <a class="avatar" href="javascript:void(0)">
                                <Avatar :imgUrl="item.icon_url" style="margin-right: 10px;"/>
                            </a>
                            <span class="pl-1">{{ item.name }}</span>
                            <span class="float-right" @click="delMember(item.id)">
                            <i class="icon iconfont icon-guanbi"></i>
                        </span>
                        </li>
                    </ul>
                </template>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ListSelectMember",
        props: ['type', 'isSingle'],
        data() {
            return {
                params: {
                    type: this.type,
                    data: ''
                }
            }
        },

        computed: {
            participantsInfo: function () {
                if (this.type === 'change') {
                    if (this.memberType === 'principal') {
                        return this.$store.state.principalInfo
                    } else {
                        return this.$store.state.participantsInfo
                    }
                } else {
                    if (this.memberType === 'principal') {
                        return this.$store.state.newPrincipalInfo
                    } else {
                        return this.$store.state.newParticipantsInfo
                    }
                }

            },
            memberType: function () {
                if (this.isSingle) {
                    return 'principal'
                } else {
                    return 'participant'
                }
            }

        },

        methods: {
            delMember(memberId) {
                if (this.memberType === 'principal') {
                    this.params.data = [];
                    this.$store.dispatch('changePrincipal', this.params);
                } else {
                    let participantInfo = '';
                    if (this.type === 'change') {
                        participantInfo = this.$store.state.participantsInfo;
                    } else {
                        participantInfo = this.$store.state.newParticipantsInfo;
                    }
                    participantInfo.splice(participantInfo.map(item => item.id).indexOf(memberId), 1)

                    this.params.data = participantInfo;
                    this.$store.dispatch('changeParticipantsInfo', this.params);
                }
            }
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
    }

    .list {
        display: flex;
        justify-content: center;
        position: relative;
    }

    .left-cont, .right-cont {
        width: 20rem;
        height: 400px;
        overflow: hidden;
    }

    .right-cont {
        border: 1px solid #f2f2f2;
    }

    .left ul li:hover, .right ul li:hover {
        background: #f2f2f2;
    }

    .middle {
        position: relative;
        font-size: 24px;
        padding: 0 20px;
    }

    .middle-icon {
        position: absolute;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }

    .right-head {
        height: 45px;
        padding: 0 20px;
        line-height: 45px;
        border-bottom: 1px solid #f2f2f2;
    }

    .right ul {
        padding: 20px 0 0;
    }

    .avatar {
        width: 30px;
        height: 30px;
        overflow: hidden;
    }

    .avatar img {
        width: 100%;
    }

    .users {
        line-height: 30px;
        padding: 10px 20px;
    }

    .selected-member {
        height: 355px;
        overflow-y: auto;
    }

</style>