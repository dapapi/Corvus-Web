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
                <div class="users" v-for="user in this.data.users.data" @click="selectMember(user.id)">
                    <a class="avatar" href="javascript:void(0)">
                        <img src="https://res.papitube.com/no-icon.png" alt="...">
                    </a>
                    <span class="pl-1">{{ user.name }}</span>
                    <span class="float-right" v-show="selectArr.indexOf(user.id) > -1">
                        <i class="icon md-check"></i>
                    </span>
                </div>
            </div>

            <div v-if="this.data.departments.data.length > 0">
                <div v-for="departmentData in this.data.departments.data">
                    <departments-item :data="departmentData" :select="selectArr"
                                      @change="memberChange" :multiple="isMultiple"></departments-item>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "departments-item",
        props: ['data', 'select', 'multiple'],
        data() {
            return {
                departmentsShow: false,
                total: 0,
                selectArr: [],
                isMultiple: '',
            }
        },

        mounted() {
            this.total = this.memberNum(this.data);
            this.isMultiple = this.multiple;
            this.selectArr = this.select;
        },

        watch: {
            selectArr: function (newValue) {
                if (this.isParent) {
                    return
                }
                this.$emit('change', newValue)
            },

            select: function (newValue) {
                this.isParent = true;
                this.selectArr = newValue
            }
        },

        methods: {
            departmentClose: function () {
                this.departmentsShow = !this.departmentsShow
            },

            memberChange: function (value) {
                this.selectArr = value
            },

            selectMember: function (userId) {
                let index = this.selectArr.indexOf(userId);
                if (index > -1) {
                    this.selectArr.splice(index, 1)
                } else {
                    if (!this.multiple && this.selectArr.length > 0) {
                        this.selectArr = []
                    }
                    this.selectArr.push(userId)
                }
            },

            selectAllMember: function () {
                this.checkMember(this.data)
            },

            checkMember: function (data) {
                for (let i = 0; i < data.users.data.length; i++) {
                    let userId = data.users.data[i].id;
                    let index = this.selectArr.indexOf(userId);
                    if (index === -1) {
                        this.selectArr.push(userId)
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