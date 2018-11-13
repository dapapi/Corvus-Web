<template>

    <div class="department-item example">
        <div class="pt-2 team-title">
            <span class="team-title-icon pr-2" @click="departmentClose">
                <i class="icon md-caret-down" v-show="departmentsShow"></i>
                <i class="icon md-caret-right" v-show="!departmentsShow"></i>
            </span>
            <span>
                 <i class="icon md-balance"></i>
                {{ this.data.name }}（{{ this.total }}人)
            </span>
            <span class="team-add-all pl-2" @click="selectAllMember" v-if="multiple">
                <i class="icon md-plus"></i>
            </span>
        </div>

        <div class="items" v-show="departmentsShow">
            <div>
                <div class="users" v-for="user in this.data.users.data" @click="selectMember(user)">
                    <a class="avatar" href="javascript:void(0)">
                        <img src="https://res.papitube.com/no-icon.png" alt="...">
                    </a>
                    <span class="pl-1">{{ user.name }}</span>
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
                </div>
            </div>

            <div v-if="this.data.departments.data.length > 0">
                <div v-for="departmentData in this.data.departments.data">
                    <departments-item :data="departmentData" :member-type="memberType"
                                      :multiple="multiple" @change="memberChange"></departments-item>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "departments-item",
        props: ['data', 'select', 'multiple', 'member-type'],
        data() {
            return {
                departmentsShow: false,
                total: 0,
                selectArr: [],
            }
        },

        computed: {
            principalInfo: function () {
                return this.$store.state.principalInfo
            },

            participantsInfo: function () {
                return this.$store.state.participantsInfo
            }
        },

        mounted() {
            this.total = this.memberNum(this.data);
        },

        methods: {
            departmentClose: function () {
                this.departmentsShow = !this.departmentsShow
            },

            memberChange: function (value) {
                if (this.memberType === 'principal') {
                    this.$emit('change', false)
                }
            },

            selectMember: function (user) {
                if (this.memberType === 'principal') {
                    this.$store.commit('changePrincipal', user);
                    this.$emit('change', false)
                } else if (this.memberType === 'participant') {
                    let participantInfo = this.$store.state.participantsInfo;
                    if (participantInfo.find(item => item.id == user.id)) {
                        participantInfo.splice(participantInfo.map(item => item.id).indexOf(user.id), 1)
                    } else {
                        participantInfo.push(user)
                    }
                    this.$store.commit('changeParticipantsInfo', participantInfo);
                }
            },

            selectAllMember: function () {
                this.checkMember(this.data)
            },

            checkMember: function (data) {
                for (let i = 0; i < data.users.data.length; i++) {
                    let userId = data.users.data[i].id;
                    let participantInfo = this.$store.state.participantsInfo;

                    if (!participantInfo.find(item => item.id == userId)) {
                        participantInfo.push(user)
                    }
                }
                for (let i = 0; i < data.departments.data.length; i++) {
                    this.checkMember(data.departments.data[i])
                }
            },

            memberNum: function (data) {
                let firstLevelUsers = data.users.data.length;
                let nextLevelUsers = 0;
                for (let i = 0; i < data.departments.data.length; i++) {
                    nextLevelUsers += this.memberNum(data.departments.data[i])
                }
                return firstLevelUsers + nextLevelUsers;
            }
        }
    }
</script>

<style scoped>

    .department-item {
        position: relative;
        left: 0.8rem;
        width: calc(100% - 0.8rem);
    }

</style>